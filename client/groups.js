const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

$(document).ready(function () {

    // Using the core $.ajax() method
    $.ajax({

        // The URL for the request
        url: "https://api.ljchen17.me/v1/groups/" + urlParams.get('id'),

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
        .done(function (groupData) {
            let groupInfo = groupData.GroupInfo;
            let meetings = groupData.Meetings? groupData.Meetings : [];
            let members = groupData.Members ? groupData.Members : [];

            // set group general information
            $("#group_name").html(groupInfo.name);
            $("#description").html(groupInfo.description);
            $("#group_id").html(groupInfo.groupID);
            $("#create_date").html(groupInfo.createDate);

            $.ajax({
                // The URL for the request
                url: "https://api.ljchen17.me/v1/users/profiles/" + groupInfo.creatorID,
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

            edit_url = "group-edit.html?id=" + groupInfo.groupID;
            create_meeting_url = "meeting-create.html?id=" + groupInfo.groupID;
            invite_url = "invite.html?gid=" + groupInfo.groupID;
            $("#edit_link").attr("href", edit_url);
            $("#create_url").attr("href", create_meeting_url);
            $("#invite_url").attr("href", invite_url);

            // put each meeting in the meeting list
            for (meeting in meetings) {
                // prepare notes
                let span = document.createElement("span");
                let para = document.createElement("p");
                let ahref = document.createElement("a")
                let li = document.createElement("li");
                let span_title = document.createTextNode("Meeting Name: " + meeting.name);
                let para_text = document.createTextNode(meeting.description);
                let attr = document.createAttribute("class");
                let attr_link = document.createAttribute("href");

                // set attribute values
                attr.value = "elem-title";
                span.attr(attr);
                attr.value = "elem-name";
                para.attr(attr);
                attr_link = "https://api.ljchen17.me/v1/groups/" + meeting.meetingID;

                // append the nodes
                span.appendChild(span_title);
                para.appendChild(para_text);

                ahref.appendChild(span);
                ahref.appendChild(para);

                li.appendChild(ahref);

                $("#meeting_list").appendChild(li);
            }

            for (person in members) {
                // prepare notes
                let para = document.createElement("p");
                let li = document.createElement("li");
                let span_title = document.createTextNode(person.username);
                let attr = document.createAttribute("class");
                // set attribute values
                attr.value = "elem-title";
                para.attr(attr);

                para.appendChild(span_title);
                li.appendChild(para);
                $("#meeting_list").appendChild(li);
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

});


// changToInput = () => {
//     document.getElementsById("group_name")
// }

