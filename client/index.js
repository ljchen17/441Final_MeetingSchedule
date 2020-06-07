$(function () {
    $(".btn").click(function () {
        $(".form-signin").toggleClass("form-signin-left");
        $(".form-signup").toggleClass("form-signup-left");
        $(".frame").toggleClass("frame-long");
        $(".signup-inactive").toggleClass("signup-active");
        $(".signin-active").toggleClass("signin-inactive");
        $(".forgot").toggleClass("forgot-left");
        $(this).removeClass("idle").addClass("active");
    });
});

$(function () {
    $(".btn-signup").click(function () {
        $(".nav").toggleClass("nav-up");
        $(".form-signup-left").toggleClass("form-signup-down");
        $(".success").toggleClass("success-left");
        $(".frame").toggleClass("frame-short");
    });
});

$(function () {
    $(".btn-signin").click(function () {
        $(".btn-animate").toggleClass("btn-animate-grow");
        $(".welcome").toggleClass("welcome-left");
        $(".cover-photo").toggleClass("cover-photo-down");
        $(".frame").toggleClass("frame-short");
        $(".profile-photo").toggleClass("profile-photo-down");
        $(".btn-goback").toggleClass("btn-goback-up");
        $(".forgot").toggleClass("forgot-fade");
    });
});


$(document).ready(function () {

    $("#loginbtn").click(function (event) {

        // Using the core $.ajax() method
        $.ajax({

            // The URL for the request
            url: "https://api.ljchen17.me/v1/sessions",

            // The data to send (will be converted to a query string)
            data: JSON.stringify({
                Email: $("#emailInputLogin").val(),
                Password: $("#passwordInputLogin").val(),
            }),

            // Whether this is a POST or GET request
            type: "POST",
            contentType: 'application/json',

            // The type of data we expect back
            dataType: "json",
        })
            // Code to run if the request succeeds (is done);
            // The response is passed to the function
            .done(function (data, textStatus, request) {
                createCookie('auth-token', request.getResponseHeader('Authorization'), 1);
                window.location = "group-create.html";
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

    $("#submitbtn").click(function (event) {

        // Using the core $.ajax() method
        $.ajax({

            // The URL for the request
            url: "https://api.ljchen17.me/v1/users/create",

            // The data to send (will be converted to a query string)
            data: JSON.stringify({
                UserName: $("#emailInput").val().split("@")[0],
                Email: $("#emailInput").val(),
                Password: $("#passwordInput").val(),
                PasswordConf: $("#passwordConfInput").val(),
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
            .done(function (jsonData, textStatus, request) {
                createCookie('auth-token', request.getResponseHeader('Authorization'), 1);
                window.location = "group-create.html";
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