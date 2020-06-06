const $ = (s) => document.getElementById(s);
let submitbtn = $('submitbtn');

submitbtn.click(function(e){
    e.preventDefault();

    $.ajax({
        url: "https://api.ljchen17.me/v1/groups",
        type:"POST",
        contentType:"application/json",
        data: JSON.stringify({
            name: $("#name").val(),
            description:$("#description").val()
        })

    }).done(function(data){
        let res_id = data.split("id:")[1]
        window.location="group-info.html?id="+res_id
    }). fail(function (xhr, status, errorThrown) {
        alert("Sorry, there was a problem!");
        console.log("Error: " + errorThrown);
        console.log("Status: " + status);
        console.dir(xhr);
    });

});