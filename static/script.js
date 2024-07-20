//Itamar Shapira : 315387902
//Ofir Roditi : 208647297
// Get references to the form elements
 const form = document.getElementById("registrationForm");

 const firstNameInput = document.getElementById("firstName");
 const lastNameInput = document.getElementById("lastName");
 const emailInput = document.getElementById("email");
 
 
 
 function validateFirstName() {
    // Check if the first name is valid
    if (firstNameInput.value.length === 0) {
        firstNameInput.style.backgroundColor = "#ff4d4d";
    } else {
        firstNameInput.style.backgroundColor = "#1dcd59";
    }
}


 // Add event listeners to the form elements for validation
 
 //emailInput.addEventListener("input", validateEmail);
 
 lastNameInput.addEventListener("input", validateLastName);
function validateLastName() {
    // Check if the last name is valid
    if (lastNameInput.value.trim() === "") {
        lastNameInput.classList.add("is-invalid");
    } else {
        lastNameInput.classList.remove("is-invalid");
    }
}


// function validateEmail() {
//     // Check if the email is valid
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     if (!re.test(emailInput.value.trim())) { // Using test() method
//         emailInput.classList.add("is-invalid");
//     } else {
//         emailInput.classList.remove("is-invalid");
//     }
// }




// document.addEventListener("DOMContentLoaded", function() {
//     const form = document.getElementById("registrationForm");

//     form.addEventListener("submit", function(event) {
//         // Call the checkPassword function
//         checkPassword();
//     });
// });

function checkPassword() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const message = document.getElementById("message");

    if (password.length !== 0) {
        if (password === confirmPassword) {
            message.textContent = "Passwords match";
            message.style.backgroundColor = "#1dcd59";

           
        } else {
            message.textContent = "Passwords don't match";
            message.style.backgroundColor = "#ff4d4d";

            // // Prevent form submission when passwords don't match
            // event.preventDefault();
        }
    } else {
        alert("Password can't be empty!");
        message.textContent = "Must have a password!";
        message.style.backgroundColor = "#ff4d4d";

        // // Prevent form submission when password is empty
        // event.preventDefault();
    }
}
