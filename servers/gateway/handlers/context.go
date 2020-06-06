package handlers

import (
	"MeetingScheduler/servers/gateway/model"
	"MeetingScheduler/servers/gateway/sessions"
)

// HandlerCtx provides access to context for HTTP handler functions
type HandlerCtx struct {
	SigningKey   string
	SessionStore sessions.Store
	UserStore    model.Store
}
