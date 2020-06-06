$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
}

$(document).ready(function () {

        // Using the core $.ajax() method
        $.ajax({

            // The URL for the request
            url: "https://api.ljchen17.me/v1/users/profiles/"+$.urlParam('id'),

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
                $("#userName").html(userData.userName);
                $("#email").html(userData.email);
                $("#firstName").html(userData.firstName);
                $("#lastName").html(userData.lastName);
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