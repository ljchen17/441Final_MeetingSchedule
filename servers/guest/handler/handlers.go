package handler

import (
	"encoding/json"
	"net/http"
	"net/url"
)

type Context struct {
	Store *model.GuestStore
}

func (ctx *Context) GroupGuestHandler(w http.ResponseWriter, r *http.Request) {

}

func (ctx *Context) MeetingGuestHandler(w http.ResponseWriter, r *http.Request) {

}

func (ctx *Context) VoteHandler(w http.ResponseWriter, r *http.Request) {

}

type Director func(r *http.Request)

// CustomDirector is used to route the response to other microservices
func (ctx *Context) CustomDirector(target *url.URL) Director {
	return func(r *http.Request) {
		if len(r.Header.Get("Authorization")) == 0 {
			r.Header.Del("X-User")
		} else {
			user := ctx.State.SessionUser
			response, err := json.Marshal(user)
			if err != nil {
				return
			}
			r.Header.Add("X-User", string(response))
		}
		r.Header.Add("X-Forwarded-Host", r.Host)
		r.Host = target.Host
		r.URL.Host = target.Host
		r.URL.Scheme = target.Scheme
	}
}
