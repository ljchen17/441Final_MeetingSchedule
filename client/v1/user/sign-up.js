$(document).ready(function () {

    $("#submitbtn").click(function (event) {

        // Using the core $.ajax() method
        $.ajax({

            // The URL for the request
            url: "https://api.ljchen17.me/v1/users/create",

            // The data to send (will be converted to a query string)
            data: JSON.stringify({
                Email: $("#emailInput").val(),
                Password: $("#passwordInput").val(),
                PasswordConf: $("#passwordConfInput").val(),
                UserName: $("#userNameInput").val(),
                FirstName: $("#firstNameInput").val(),
                LastName: $("#lastNameInput").val()
            }),

            // Whether this is a POST or GET request
            type: "POST",
            contentType: 'application/json',

            // The type of data we expect back
            dataType: "json",
        })
            // Code to run if the request succeeds (is done);
            // The response is passed to the function
            .done(function (jsonData,textStatus,request) {
                createCookie('auth-token',request.getResponseHeader('Authorization'),1);
                window.location = "user-profile.html?id="+'me';
            })
            // Code to run if the request fails; the raw request and
            // status codes are passed to the function
            .fail(function (xhr, status, errorThrown) {
                alert("Sorry, there was a problem!");
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                console.dir(xhr);
            });

        event.preventDefault();

    });

});