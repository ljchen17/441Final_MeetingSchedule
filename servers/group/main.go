package main

import (
	"database/sql"
	"html/template"
	"log"
	"net/http"
	"os"

	"MeetingScheduler/servers/group/dao"
	h "MeetingScheduler/servers/group/handler"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

func main() {
	ADDR := os.Getenv("ADDR")
	dsn := os.Getenv("DSN")

	// Open MySQL database
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("Error opening database: %v", err)
	}

	var tml []*template.Template
	tmpl := template.Must(template.ParseFiles("/static/group_list.html"))
	tmpl2 := template.Must(template.ParseFiles("/static/meeting_list.html"))
	tml = append(tml, tmpl)
	tml = append(tml, tmpl2)

	//context
	ctx := h.Context{
		Store: &dao.Store{db},
		Tml:   tml,
	}

	// handlers
	route := mux.NewRouter()
	route.HandleFunc("/v1/user/groups", ctx.UserGroupsHandler)
	route.HandleFunc("/v1/user/meetings", ctx.UserMeetingsHandler)

	route.HandleFunc("/v1/groups", ctx.GroupsHandler)
	route.HandleFunc("/v1/groups/{group_id}", ctx.SpecificGroupsHandler)
	route.HandleFunc("/v1/groups/{group_id}/meetings", ctx.GroupsMeetingHandler)
	route.HandleFunc("/v1/groups/{group_id}/meetings/{meeting_id}", ctx.SpecificGroupsMeetingHandler)
	route.HandleFunc("/v1/groups/{group_id}/meetings/{meeting_id}/schedule", ctx.ScheduleHandler)
	route.HandleFunc("/v1/groups/{group_id}/meetings/{meeting_id}/schedule/{schedule_id}", ctx.SpecificScheduleHandler)

	// start server
	log.Printf("Server is listening at %s...", ADDR)
	log.Fatal(http.ListenAndServe(ADDR, route))
}
