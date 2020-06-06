package handler

import (
	"MeetingScheduler/servers/guest/model"
	"net/http"
	"path"
)

// Context stoers the context for http request
type Context struct {
	Store *model.GuestStore
}

// GroupGuestHandler respondes to the GET method of a group invitation link
func (ctx *Context) GroupGuestHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, errUnsuportMethod, http.StatusMethodNotAllowed)
		return
	}

	// parse group id
	urlID := path.Base(r.URL.Path)
	gid := getIDfromURL(w, r, urlID)
	if gid < 0 {
		return
	}

	group, err := ctx.Store.GetGroupByID(gid)
	if !dbErrorHandle(w, "Get group by ID", err) {
		return
	}

	// marshal current group into response body
	response := marshalRep(w, group)
	if response == nil {
		return
	}

	// write into response
	respondWithHeader(w, typeJSON, response, http.StatusOK)

}

// MeetingGuestHandler respondes to the GET method of a meeting invitation link
func (ctx *Context) MeetingGuestHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, errUnsuportMethod, http.StatusMethodNotAllowed)
		return
	}

	// parse meeting id
	urlID := path.Base(r.URL.Path)
	mid := getIDfromURL(w, r, urlID)
	if mid < 0 {
		return
	}

	// parse guest id
	gid := path.Dir(path.Dir(path.Base(r.URL.Path)))
	guestID := getIDfromURL(w, r, gid)
	if guestID < 0 {
		return
	}

	meeting, err := ctx.Store.GetMeetingInfo(mid)
	if !dbErrorHandle(w, "Get meeting by ID", err) {
		return
	}

	guest, err := ctx.Store.GetGuest(guestID)
	if !dbErrorHandle(w, "Get guest by ID", err) {
		return
	}

	schedules, err := ctx.Store.GetAllSchedule(mid)
	if !dbErrorHandle(w, "Get schedules", err) {
		return
	}

	displayMeeting := model.CreateMeetingInfo(meeting, guest, schedules)

	// marshal current group into response body
	response := marshalRep(w, displayMeeting)
	if response == nil {
		return
	}

	// write into response
	respondWithHeader(w, typeJSON, response, http.StatusOK)
}

// VoteHandler increase the vote account of the handler
func (ctx *Context) VoteHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "PATCH" {
		http.Error(w, errUnsuportMethod, http.StatusMethodNotAllowed)
		return
	}

	// parse schedule id
	urlID := path.Base(r.URL.Path)
	sid := getIDfromURL(w, r, urlID)
	if sid < 0 {
		return
	}

	cnt, err := ctx.Store.Vote(sid)
	if !dbErrorHandle(w, "Increase votes", err) {
		return
	}

	respondWithHeader(w, typeText, make([]byte, cnt), http.StatusCreated)
}
