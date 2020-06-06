package model

// Guest stores information for non-registered users
type Guest struct {
	GuestID     int64  `json:"guestID"`
	Email       string `json:"email"`
	DisplayName string `json:"name"`
	GroupID     int64  `json:"groupID"`
	MeetingID   int64  `json:"meetingID"`
	InvitedBy   int64  `json:"invitedBy"`
	Confirmed   int    `json:"confirmed"`
}

// DisplayGuest is used to display for the clients
type DisplayGuest struct {
	Email       string `json:"email"`
	DisplayName string `json:"name"`
	Confirmed   int    `json:"confirmed"`
}
