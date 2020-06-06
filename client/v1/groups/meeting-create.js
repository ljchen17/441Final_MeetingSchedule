const $ = (s) => document.getElementById(s);
let submitbtn = $('submitbtn');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

submitbtn.click(function(e){
    e.preventDefault();

    $.ajax({
        url: "https://api.ljchen17.me/v1/groups/" + urlParams.get("id") + "/meetings",
        type:"POST",
        contentType:"application/json",
        data: JSON.stringify({
            name: $("#name").val(),
            description:$("#description").val()
        })

    }).done(function(data){
        
        window.location="meeting.html?id="+data.meetingID
    }). fail(function (xhr, status, errorThrown) {
        alert("Sorry, there was a problem!");
        console.log("Error: " + errorThrown);
        console.log("Status: " + status);
        console.dir(xhr);
    });

});