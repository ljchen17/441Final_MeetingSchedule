// retrieve the form element, assuming it exists as "<div id="signup">

var apptForm = document.getElementById("apptForm");
var contactNumber = document.getElementById("contactNumber");

apptForm.addEventListener('submit', function (event) {
    if (validator.isPhoneNumber(contactNumber.value)) {
      contactNumber.className = "valid";
      contactNumber.style.borderColor = "lightgreen";
    } else {
      contactNumber.className = "invalid";
      contactNumber.style.borderColor = "red";
    }
    // stop the event from its default action: submitting the form (for our validation, submission is not desired)
    event.preventDefault();
});