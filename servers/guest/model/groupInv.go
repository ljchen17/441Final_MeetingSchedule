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

// GroupInvitation stores group information that a guest can view
type Group struct {
	GroupName   string `json:"meetingName"`
	GroupDetail string `json:"meetingDetail"`
	CreatedID   string `json:"createdID"`
	CreateDate  string `json:"createDate"`
}
