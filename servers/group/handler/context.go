package handler

import (
	"MeetingScheduler/servers/group/dao"
	"html/template"
)

//Context stores the userID, sessionID and SQL database
type Context struct {
	Sid   int64
	Store *dao.Store
	Tml   *template.Template
}
