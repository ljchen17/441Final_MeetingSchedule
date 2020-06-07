const $ = (s) => document.getElementById(s);
let submitbtn = $('submitbtn');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const Url = window.location.split();

submitbtn.addEventListener('click', (e) => {
    e.preventDefault();
    let failed = false

    let server_url = Url + urlParams.get("id")
    let fectchParam = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: $("#name").val(),
            description:$("#description").val()
        }) 
    }

    fetch(server_url, fectchParam).then(d => {
        if (d.status >= 400) {
            console.log(d.text())
            failed = true;
            return d.text();
        }
        return d.json();
    }).then(d => {
        if (failed) {
            throw new Error(d);
        }
        window.location = "group-info.html?id=" + d.groupID

    }).catch(e => {
        alert("Sorry, there was a problem!");
        console.log("Error: " + errorThrown);
        console.log("Status: " + status);
        console.dir(xhr);
    });
});
