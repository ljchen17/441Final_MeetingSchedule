const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

$(document).ready(function () {

    // Using the core $.ajax() method
    $.ajax({

        // The URL for the request
        url: "https://api.ljchen17.me/v1/groups/" + urlParams.get('gid') + "/meetings/" + urlParams.get('mid'),

        // Whether this is a POST or GET request
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', readCookie('auth-token'));
        },

        contentType: 'application/json',
        // The type of data we expect back
        dataType: "json",
    })
        // Code to run if the request succeeds (is done);
        // The response is passed to the function
        .done(function (meetingData) {

            let meetingInfo = meetingData.MeetingInfo;
            let schedules = meetingData.Schedules? meetingData.Schedules : [];
            let members = meetingData.Participants ? meetingData.Participants : [];

            // set group general information
            $("#meeting_name").html(meetingInfo.name);
            $("#description").html(meetingInfo.description);
            $("#create_date").html(meetingInfo.createDate);

            $.ajax({
                // The URL for the request
                url: "https://api.ljchen17.me/v1/users/profiles/" + meetingInfo.creatorID,
                // Whether this is a POST or GET request
                type: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', readCookie('auth-token'));
                },
                // The type of data we expect back
                dataType: "json",
            })
                // Code to run if the request succeeds (is done);
                // The response is passed to the function
                .done(function (userData) {
                    var emailLink = "<br/><a href='mailto:" + userData.email + "'>" + userData.email + "</a>";
                    $("#creator_details").html("<br/>" + userData.firstName + " " + userData.lastName + " " + emailLink);

                })
                // Code to run if the request fails; the raw request and
                // status codes are passed to the function
                .fail(function (xhr, status, errorThrown) {

                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                    console.dir(xhr);
                });

            edit_url = "group-edit.html?id=" + meetingInfo.groupID;
            create_meeting_url = "meeting-create.html?id=" + meetingInfo.groupID;
            invite_url = "invite.html?gid=" + meetingInfo.groupID;
            $("#edit_link").attr("href", edit_url);
            $("#create_url").attr("href", create_meeting_url);
            $("#invite_url").attr("href", invite_url);

            // put each meeting in the meeting list
            for (scheduleId in schedules) {
                prependSchedule(schedules[scheduleId]);
            }

            for (userId in members) {
                var userData = members[userId];
                var emailLink = "<br/><a href='mailto:" + userData.email + "'>" + userData.email + "</a>";
                var nameDetails = userData.firstName + " " + userData.lastName + " " + emailLink;

                $("#participants_list").prepend("<li><span class='elem-title'>" + nameDetails + "</span></li>");
            }

        })
        // Code to run if the request fails; the raw request and
        // status codes are passed to the function
        .fail(function (xhr, status, errorThrown) {
            alert("Sorry, there was a problem!");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        });


        $("#scheduleaddbtn").click(function (event) {
            var startTime = $("#scheduledate").val() + " " + $("#schedulestarttime").val();
            var endTime = $("#scheduledate").val() + " " + $("#scheduleendtime").val();
            // Using the core $.ajax() method
            $.ajax({
    
                // The URL for the request
                url: "https://api.ljchen17.me/v1/groups/" + urlParams.get('gid') + "/meetings/" + urlParams.get('mid') + "/schedule",
                type: "POST",
                // The data to send (will be converted to a query string)
                data: JSON.stringify({
                    startTime: startTime,
                    endTime: endTime,
                    votes: 0
                }),
                dataType: "json",
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', readCookie('auth-token'));
                }
            })
                // Code to run if the request succeeds (is done);
                // The response is passed to the function
                .done(function (newSchedule) {
                    prependSchedule(newSchedule);
                })
                // Code to run if the request fails; the raw request and
                // status codes are passed to the function
                .fail(function (xhr, status, errorThrown) {
    
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                    console.dir(xhr);
                });
    
            event.preventDefault();
    
        });

        function prependSchedule(schedule) {
            const html = `     <li>
                      <span class="event-time"> ${schedule.startTime}</span>
                      <span class="event-time"> - </span>
                      <span class="event-time">${schedule.endTime} </span>
                      <span class="event-location"> Votes: </span>
                      <span class="event-location" >${schedule.votes}</span>
                  </li>`;
                  $("#meeting_schedules").prepend(html);
            
        }

        $("#participantaddbtn").click(function (event) {
            var inviteName = $("#invitename").val();
            var inviteEmail = $("#invitemail").val();
            // Using the core $.ajax() method
            $.ajax({
    
                // The URL for the request
                url: "https://api.ljchen17.me/v1/groups/" + urlParams.get('gid') + "/meetings/" + urlParams.get('mid'),
                type: "PATCH",
                // The data to send (will be converted to a query string)
                data: JSON.stringify({
                    email: inviteEmail,
                    name: inviteName
                }),
                dataType: "text",
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', readCookie('auth-token'));
                }
            })
                // Code to run if the request succeeds (is done);
                // The response is passed to the function
                .done(function (inviteLink) {
                    var emailLink = "<br/><a href='mailto:" + inviteEmail + "'>" + inviteEmail + "</a>";
                    var nameDetails = inviteName + " " + emailLink;
                    var newParticipant = nameDetails + `<br/>Invite Link: <a href='${inviteLink}'>${inviteLink}</a>`;

                    $("#participants_list").prepend("<li><span class='elem-title'>" + newParticipant + "</span></li>");

                })
                // Code to run if the request fails; the raw request and
                // status codes are passed to the function
                .fail(function (xhr, status, errorThrown) {
    
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                    console.dir(xhr);
                });
    
            event.preventDefault();
    
        });
});


// changToInput = () => {
//     document.getElementsById("group_name")
// }

