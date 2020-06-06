$(document).ready(function () {

    $("#loginbtn").click(function (event) {

        // Using the core $.ajax() method
        $.ajax({

            // The URL for the request
            url: "https://api.ljchen17.me/v1/sessions",

            // The data to send (will be converted to a query string)
            data: JSON.stringify({
                Email: $("#emailInput").val(),
                Password: $("#passwordInput").val(),
            }),

            // Whether this is a POST or GET request
            type: "POST",
            contentType: 'application/json',

            // The type of data we expect back
            dataType: "json",
        })
            // Code to run if the request succeeds (is done);
            // The response is passed to the function
            .done(function (data,textStatus,request) {
                setCookie('auth-token',request.getResponseHeader('Authorization'),1);
                window.location = "meetings.html";
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