package model

// GroupInvitation is used to return to the client when a group invitation is request
type GroupInvitation struct {
	GroupName   string `json:"meetingName"`
	GroupDetail string `json:"meetingDetail"`
	GuestName   string `json:"guestName"`
	GuestEmail  string `json:"guestEmail"`
	InvitedBy   string `json:"invitedBy"`
	CreateDate  string `json:"createDate"`
}

//Group struct contains fileds of a group of users
type Group struct {
	GroupID     int64  `json:"groupID"`
	Description string `json:"description"`
	Name        string `json:"name"`
	CreatorID   int64  `json:"creatorID"`
	CreateDate  string `json:"createDate"`
}
