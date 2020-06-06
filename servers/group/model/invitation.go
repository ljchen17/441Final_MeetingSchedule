package model

import (
	"fmt"
	"math"
	"math/rand"
)

// NewGuest is used for accept request body
type NewGuest struct {
	Email       string `json:"email"`
	DisplayName string `json:"name"`
}

// DisplayGuest is used to display for the clients
type DisplayGuest struct {
	Email       string `json:"email"`
	DisplayName string `json:"name"`
	Confirmed   int    `json:"confirmed"`
}

// GenerateRandomID generates a random 7-digits number for guestID
func GenerateRandomID() int64 {
	return int64(rand.Float64() * math.Pow(10, 7))
}

// CreateMeetingInvitation generates a random link for guest
func CreateMeetingInvitation(guestName string, email string, mid int64) string {
	return fmt.Sprintf("m=%d&name=%s&email=%s&id=%d", mid, guestName, email, GenerateRandomID())
}

// CreateGroupInvitation generates a random link for guest
func CreateGroupInvitation(guestName string, email string, gid int64) string {
	return fmt.Sprintf("g=%d&name=%s&email=%s&id=%d", gid, guestName, email, GenerateRandomID())
}
