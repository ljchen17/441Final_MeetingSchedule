const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

$(document).ready(function () {

    $("#submitbtn").click(function (event) {

        // Using the core $.ajax() method
        $.ajax({

            // The URL for the request
            url: "https://api.ljchen17.me/v1/groups/" + urlParams.get('id') + "/meetings",
            type: "POST",
            // The data to send (will be converted to a query string)
            data: JSON.stringify({
                name: $("#name").val(),
                description: $("#description").val()
            }),
            dataType: "json",
            contentType: 'application/json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', readCookie('auth-token'));
            }
        })
            // Code to run if the request succeeds (is done);
            // The response is passed to the function
            .done(function (newMeetingDetails) {
                window.location = "meeting.html?mid="+ newMeetingDetails.meetingID + "&gid=" + urlParams.get('id');
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