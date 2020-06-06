package model

// MeetingInvitation stores the meeting, guest information
// It's used to response to the guest page
type MeetingInvitation struct {
	MeetingName   string      `json:"meetingName"`
	MeetingDetail string      `json:"meetingDetail"`
	GuestName     string      `json:"guestName"`
	GuestEmail    string      `json:"guestEmail"`
	InvitedBy     string      `json:"invitedBy"`
	CreateDate    string      `json:"createDate"`
	Schedules     []*Schedule `json:"schedule"`
}

// Schedule is the schedule information that shows to the guest
type Schedule struct {
	ScheduleID int    `json:"scheduleID"`
	StartTime  string `json:"startTime"`
	EndTime    string `json:"endTime"`
	Votes      int    `json:"votes"`
}

// Meeting stores general information of a meeting that guest can view
// It will return to the client if it's confirmed
type Meeting struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	StartTime   string `json:"startTime"`
	EndTime     string `json:"endTime"`
	CreateDate  string `json:"createDate"`
	Confirmed   int    `json:"confirmed"`
}
