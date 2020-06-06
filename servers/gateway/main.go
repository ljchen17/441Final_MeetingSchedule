package main

import (
	"MeetingScheduler/servers/gateway/handlers"
	"MeetingScheduler/servers/gateway/model"
	"MeetingScheduler/servers/gateway/sessions"
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"net/http/httputil"
	"os"
	"time"

	"github.com/go-redis/redis"
	"github.com/gorilla/mux"
)

const headerCORS = "Access-Control-Allow-Origin"
const corsAnyOrigin = "*"
const headerContentType = "Content-Type"
const contentTypePlainText = "text/plain"

// reqEnv requires that a given environment variable be set
func reqEnv(name string) string {
	val := os.Getenv(name)
	if len(val) == 0 {
		log.Fatalf("no %s environment variable set", name)
	}
	return val
}

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello from API Gateway"))
}

/**
Main function that handles the web summarizing request
*/
func main() {

	ADDR := os.Getenv("ADDR")
	if len(ADDR) == 0 {
		ADDR = ":443"
	}

	tlsKey := reqEnv("TLSKEY")
	tlsCert := reqEnv("TLSCERT")
	sessionKey := reqEnv("SESSIONKEY")
	redisAddr := reqEnv("REDISADDR")
	dsn := reqEnv("DSN")
	groupAddr := reqEnv("GROUPADDR")
	//guestAddr := reqEnv("GUESTADDR")

	// Open redis client
	redisClient := redis.NewClient(&redis.Options{Addr: redisAddr})
	sessionStore := sessions.NewRedisStore(redisClient, time.Hour)

	// Open MySQL database
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("error opening database: %v", err)
	}
	defer db.Close()

	userStore := model.MySqlStore{Db: db}

	// Set up context
	ctx := &handlers.HandlerCtx{
		SigningKey:   sessionKey,
		SessionStore: sessionStore,
		UserStore:    &userStore,
	}

	// Create mux and set up handler
	r := mux.NewRouter()
	r.HandleFunc("/v1/users/create", ctx.UsersHandler)
	r.HandleFunc("/v1/users/profiles/{id}", ctx.SpecificUserHandler)
	r.HandleFunc("/v1/sessions", ctx.SessionsHandler)
	r.HandleFunc("/v1/sessions/{id}", ctx.SpecificSessionHandler)
	r.HandleFunc("/v1/users/meetings", ctx.GetUserMeetingsHandler).Methods("GET")
	r.HandleFunc("/v1/users/meetings/{meetingid}", ctx.GetMeetingByIDHandler).Methods("GET")

	// Set up proxy
	groupDirector := func(r *http.Request) {
		r.Header.Add(headerCORS, corsAnyOrigin)

		session, _ := sessions.GetSessionID(r, ctx.SigningKey)

		stateRet := handlers.SessionState{}
		err := ctx.SessionStore.Get(session, &stateRet)

		if err != nil {
			return
		}

		// Respond to client
		response, err := json.Marshal(stateRet.User)
		if err != nil {
			return
		}

		if stateRet.User != nil {
			r.Header.Set("X-User", string(response))
		}

		r.Header.Add("X-Forwarded-Host", r.Host)

		r.Host = groupAddr
		r.URL.Host = groupAddr
		r.URL.Scheme = "http"
	}

	groupProxy := &httputil.ReverseProxy{Director: groupDirector}

	//guestProxy := httputil.NewSingleHostReverseProxy(&url.URL{Scheme: "http", Host: guestAddr})

	r.Handle("/v1/groups", groupProxy)
	r.Handle("/v1/groups/{group_id}", groupProxy)
	r.Handle("/v1/groups/{group_id}/meetings", groupProxy)
	r.Handle("/v1/groups/{group_id}/meetings/{meeting_id}", groupProxy)
	r.Handle("/v1/groups/{group_id}/meetings/{meeting_id}/schedule", groupProxy)

	// Start the server
	log.Printf("Server is listening at %s...", ADDR)
	log.Fatal(http.ListenAndServeTLS(ADDR, tlsCert, tlsKey, handlers.SetCors(r)))

}
