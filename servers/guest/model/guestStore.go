package model

import (
	"database/sql"
)

type GuestStore struct {
	Db *sql.DB
}

var getGuestInfo = "SELECT Email, DisplayName, Confirmed, GuestID, GroupID, MeetingID, InvitedBy FROM guest WHERE guestID = ?"
var getMeetingSchedule = "SELECT scheduleID, StartTime, EndTime, votes FROM schedule WHERE MeetingID = ?"
var getGroupInfo = "SELECT name, description, createDate, CreatorID FROM userGroups where groupID = ?"
var getMeetingInfo = "SELECT name, description, StartTime, EndTime, createDate, confirmed FROM meetings where meetingID = ?"
var updateSchedule = "UPDATE schedule SET votes = votes+1 WHERE scheduleID = ?"
var deleteGuest = "DELETE FROM guest WHERE guestID = ?"

//GetAllSchedule returns all schedules unser a meeting
func (store *Store) GetAllSchedule(meetingID int64) ([]*Schedule, error) {

	var schedules []*Schedule
	//uid, email, userName, firstName, lastName
	rows, err := store.Db.Query(getMeetingSchedule, meetingID)
	if err != nil {
		return schedules, err
	}

	defer rows.Close()

	for rows.Next() {
		var sch Schedule
		err = rows.Scan(&sch.ScheduleID, &sch.StartTime, &sch.EndTime, &sch.Votes)
		if err != nil {
			return schedules, err
		}
		schedules = append(schedules, &sch)
	}

	// get any error encountered during iteration
	return schedules, rows.Err()
}

//GetMeetingInfo looks for the meeting with given meeting id
func (store *Store) GetMeetingInfo(meetingID int64) (*Meeting, error) {
	var meeting Meeting
	// Execute the query
	err := store.Db.QueryRow(queryGetMeeting, id).Scan(&meeting.Name,
		&meeting.Description, &meeting.StartTime, &meeting.EndTime,
		&meeting.CreateDate, &meeting.Confirmed)
	return &meeting, err
}

//GetGroupByID returns the Group with the given ID
func (store *Store) GetGroupByID(id int64) (*Group, error) {
	var group Group
	err := store.Db.QueryRow(getGroupInfo, id).Scan(&group.Name, &group.Description, &group.CreateDate, &group.CreatorID)
	return &group, err
}

//GetGuest looks for the guest with given guest id
func (store *Store) GetGuest(guestID int64) (*Guest, error) {
	var guest Guest
	// Execute the query
	//Email, DisplayName, Confirmed, GuestID, GroupID, MeetingID, InvitedBy
	err := store.Db.QueryRow(getGuestInfo, id).Scan(&guest.Email, &guest.DisplayName, &guest.Confirmed, &guest.GuestID,
		&guest.GroupID, &guest.MeetingID, &guest.InvitedBy)
	return &guest, err
}

//Vote increase the votes for a Schedule
func (store *Store) Vote(id int64) (int, error) {
	_, err := store.Db.Exec(updateSchedule, id)
	if err != nil {
		return 0, err
	}
	voteCount := 0
	err = store.Db.QueryRow(updateSchedule, id).Scan(&voteCount)
	return voteCount, err
}

//DeleteGuest deletes the Schedule with the given ID
func (store *Store) DeleteGuest(id int64) error {
	_, err := store.Db.Exec(deleteGuest, id)
	return err
}
