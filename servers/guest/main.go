package main

import (
	"MeetingScheduler/servers/guest/model"
	"database/sql"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	_ "github.com/go-sql-driver/mysql"
)

/**
Main function that handles the web summarizing request
*/
func main() {
	ADDR := os.Getenv("ADDR")
	DSN := os.Getenv("DSN")
	if len(ADDR) == 0 || len(DSN) == 0 {
		panic("Can't get port number or dsn")
	}

	// Open MySQL database
	db, err := sql.Open("mysql", DSN)
	if err != nil {
		log.Fatalf("Error opening database: %v", err)
	}

	//context
	ctx := handler.Context{
		Store: &model.GuestStore{db}
	}

	// Create mux and set up handler
	r := mux.NewRouter()
	// Guests entry point
	r.HandleFunc("/v1/guest/{guest_id}/meetings/{meeting_id}", ctx.MeetingGuestHandler)
	r.HandleFunc("/v1/guest/{guest_id}/groups/{group_id}", ctx.GroupGuestHandler)
	r.HandleFunc("/v1/guest/{guest_id}/meetings/{meeting_id}/schedule/{scheduleID}", ctx.VoteHandler)

	// // Start the server
	log.Printf("Server is listening at %s...", ADDR)
	log.Fatal(http.ListenAndServe(ADDR, route))

}
