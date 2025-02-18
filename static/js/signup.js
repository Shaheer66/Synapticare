

// document.addEventListener("DOMContentLoaded", () => {
//   const form1 = document.getElementById("form-1");
//   const form2 = document.getElementById("form-2");
//   const nextButton = document.getElementById("next-button");
//   const togglePassword = document.getElementById("toggle-password");
//   const passwordInput = document.getElementById("password");
//   const confirmPasswordInput = document.getElementById("confirm-password");
//   const toggleConfirmPassword = document.getElementById("toggle-confirm-password");
//   const signupButton = document.getElementById("signup-button");

//   // Handle "Next" button click
//   nextButton.addEventListener("click", () => {
//     // Form 1 validation
//     const firstName = document.getElementById("first-name").value.trim();
//     const lastName = document.getElementById("last-name").value.trim();
//     const emailAddress = document.getElementById("license-number").value.trim();
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     let errors = [];

//     if (!firstName) errors.push("First Name is required.");
//     if (!lastName) errors.push("Last Name is required.");
//     if (!emailAddress) {
//       errors.push("Email Address is required.");
//     } else if (!emailRegex.test(emailAddress)) {
//       errors.push("Please enter a valid Email Address.");
//     }

//     if (errors.length > 0) {
//       alert(errors.join("\n")); // Display validation errors
//       return;
//     }

//     // If validation passes, move to Form 2
//     form1.style.display = "none"; // Hide Form 1
//     form2.style.display = "block"; // Show Form 2
//   });

//   // Handle password visibility toggle
//   togglePassword.addEventListener("click", () => {
//     if (passwordInput.type === "password") {
//       passwordInput.type = "text";
//       togglePassword.textContent = "👁️"; // Change icon
//     } else {
//       passwordInput.type = "password";
//       togglePassword.textContent = "🙈";
//     }
//   });

//   toggleConfirmPassword.addEventListener("click", () => {
//     if (confirmPasswordInput.type === "password") {
//       confirmPasswordInput.type = "text";
//       toggleConfirmPassword.textContent = "👁️"; // Change icon
//     } else {
//       confirmPasswordInput.type = "password";
//       toggleConfirmPassword.textContent = "🙈"; // Change icon back
//     }
//   });

//   // Real-time input validation for required fields
//   const inputs = document.querySelectorAll(".form-input");
//   const requiredStars = document.querySelectorAll(".required");

//   inputs.forEach((input, index) => {
//     input.addEventListener("input", () => {
//       if (input.value.trim() === "") {
//         // Show the red star if input is empty
//         requiredStars[index].style.visibility = "visible";
//       } else {
//         // Hide the red star if input is filled
//         requiredStars[index].style.visibility = "hidden";
//       }
//     });
//   });

//   // Redirect to verify.html on Sign Up button click
//   signupButton.addEventListener("click", () => {
//     // Form 2 validation
//     const phoneNumber = document.getElementById("phone-number").value.trim();
//     const password = passwordInput.value.trim();
//     const confirmPassword = confirmPasswordInput.value.trim();
//     const emailAddress = document.getElementById("license-number").value.trim(); // Get email from Form 1

//     let errors = [];

//     if (!phoneNumber) errors.push("Phone Number is required.");
//     if (password.length < 8) {
//       errors.push("Password must be at least 8 characters long.");
//     }
//     if (password !== confirmPassword) {
//       errors.push("Password and Confirm Password do not match.");
//     }

//     if (errors.length > 0) {
//       alert(errors.join("\n")); // Display validation errors
//       return;
//     }

//     // Send the email to Flask backend for verification
//     fetch("/send_verification", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: emailAddress, // Send email to backend
//       }),
//     })
//     .then(response => response.json())
//     .then(data => {
//       if (data.success) {
//         // If verification email is sent successfully, proceed to verify page
//         window.location.href = "/verify";  // Redirect to the verification page
//       } else {
//         alert(data.error || "Something went wrong, please try again.");
//       }
//     })
//     .catch(error => {
//       console.error("Error:", error);
//       alert("There was an error with sending the verification email.");
//     });
//   });
// });


document.addEventListener("DOMContentLoaded", () => {
  const form1 = document.getElementById("form-1");
  const form2 = document.getElementById("form-2");
  const nextButton = document.getElementById("next-button");
  const togglePassword = document.getElementById("toggle-password");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const toggleConfirmPassword = document.getElementById("toggle-confirm-password");
  const signupButton = document.getElementById("signup-button");

  // Handle "Next" button click
  nextButton.addEventListener("click", () => {
    // Form 1 validation
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const emailAddress = document.getElementById("license-number").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let errors = [];

    if (!firstName) errors.push("First Name is required.");
    if (!lastName) errors.push("Last Name is required.");
    if (!emailAddress) {
      errors.push("Email Address is required.");
    } else if (!emailRegex.test(emailAddress)) {
      errors.push("Please enter a valid Email Address.");
    }

    if (errors.length > 0) {
      alert(errors.join("\n")); // Display validation errors
      return;
    }

    // If validation passes, move to Form 2
    form1.style.display = "none"; // Hide Form 1
    form2.style.display = "block"; // Show Form 2
  });

  // Handle password visibility toggle
  togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      togglePassword.textContent = "👁️"; // Change icon
    } else {
      passwordInput.type = "password";
      togglePassword.textContent = "🙈";
    }
  });

  toggleConfirmPassword.addEventListener("click", () => {
    if (confirmPasswordInput.type === "password") {
      confirmPasswordInput.type = "text";
      toggleConfirmPassword.textContent = "👁️"; // Change icon
    } else {
      confirmPasswordInput.type = "password";
      toggleConfirmPassword.textContent = "🙈"; // Change icon back
    }
  });

  // Real-time input validation for required fields
  const inputs = document.querySelectorAll(".form-input");
  const requiredStars = document.querySelectorAll(".required");

  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      if (input.value.trim() === "") {
        // Show the red star if input is empty
        requiredStars[index].style.visibility = "visible";
      } else {
        // Hide the red star if input is filled
        requiredStars[index].style.visibility = "hidden";
      }
    });
  });

  // Redirect to verify.html on Sign Up button click
  signupButton.addEventListener("click", () => {
    // Form 2 validation
    const phoneNumber = document.getElementById("phone-number").value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    // Collect other form fields
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const emailAddress = document.getElementById("license-number").value.trim();

    let errors = [];

    if (!phoneNumber) errors.push("Phone Number is required.");
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }
    if (password !== confirmPassword) {
      errors.push("Password and Confirm Password do not match.");
    }

    if (errors.length > 0) {
      alert(errors.join("\n")); // Display validation errors
      return;
    }
    alert("Hello");
    // Send all form data to Flask backend for processing
    fetch("/send_verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: emailAddress,
        phone_number: phoneNumber,
        password: password,
        
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // If verification email is sent successfully, proceed to verify page
          alert(data.message)
          window.location.href = "/verify"; // Redirect to the verification page
        } else {
          alert(data.error || "Something went wrong, please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error with sending the data.");
      });
      
  });
});

