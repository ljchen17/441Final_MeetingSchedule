
$(document).ready(function () {

        // Using the core $.ajax() method
        $.ajax({

            // The URL for the request
            url: "https://api.ljchen17.me/v1/users/profiles/me",

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
                $("#firstName").html(userData.firstName);
                $("#lastName").html(userData.lastName);
            })
            // Code to run if the request fails; the raw request and
            // status codes are passed to the function
            .fail(function (xhr, status, errorThrown) {
                
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                console.dir(xhr);
            });

            $("#updatebtn").click(function (event) {

                // Using the core $.ajax() method
                $.ajax({
        
                    // The URL for the request
                    url: "https://api.ljchen17.me/v1/users/profiles/me",
        
                    // The data to send (will be converted to a query string)
                    data: JSON.stringify({
                        FirstName: $("#firstNameInput").val(),
                        LastName: $("#lastNameInput").val()
                    }),
        
                    // Whether this is a POST or GET request
                    type: "PATCH",
                    contentType: 'application/json',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', readCookie('auth-token'));
                    },
        
                    // The type of data we expect back
                    dataType: "json",
                })
                    // Code to run if the request succeeds (is done);
                    // The response is passed to the function
                    .done(function (jsonData,textStatus,request) {
                        window.location = "user-profile.html?id=me";
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