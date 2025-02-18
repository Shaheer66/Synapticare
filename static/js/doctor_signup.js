document.addEventListener("DOMContentLoaded", () => {
  const form1 = document.getElementById("form-1");
  const form2 = document.getElementById("form-2");
  const nextButton = document.getElementById("next-button");
  const togglePassword = document.getElementById("toggle-password");
  const passwordInput = document.getElementById("password");
  const signupButton = document.getElementById("signup");

  // Handle "Next" button click
  nextButton.addEventListener("click", () => {
    const form1Valid = validateForm1();
    if (form1Valid) {
      form1.style.display = "none"; 
      form2.style.display = "block"; // Show Form 2
    }
  });

  // Handle password visibility toggle
  togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      togglePassword.textContent = "👁️‍🗨️"; // Change icon
    } else {
      passwordInput.type = "password";
      togglePassword.textContent = "👁️";
    }
  });

  // Real-time validation for all input fields
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

  // Validate Form 1 (Doctor Signup Form Step 1)
  function validateForm1() {
    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const licenseNumber = document.getElementById("license-number");
    const specialization = document.getElementById("specialization");

    let isValid = true;

    if (firstName.value.trim() === "") {
      showError(firstName, "First Name is required.");
      isValid = false;
    } else {
      hideError(firstName);
    }

    if (lastName.value.trim() === "") {
      showError(lastName, "Last Name is required.");
      isValid = false;
    } else {
      hideError(lastName);
    }

    if (licenseNumber.value.trim() === "") {
      showError(licenseNumber, "Medical License Number is required.");
      isValid = false;
    } else {
      hideError(licenseNumber);
    }

    if (specialization.value.trim() === "") {
      showError(specialization, "Specialization is required.");
      isValid = false;
    } else {
      hideError(specialization);
    }

    return isValid;
  }

  // Validate Form 2 (Doctor Signup Form Step 2)
  form2.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission for validation
    const phoneNumber = document.getElementById("phone-number");
    const experience = document.getElementById("experience");
    const email = document.getElementById("email");

    let isValid = true;

    if (phoneNumber.value.trim() === "") {
      showError(phoneNumber, "Phone Number is required.");
      isValid = false;
    } else if (!/^\d{11}$/.test(phoneNumber.value.trim())) {
      showError(phoneNumber, "Phone Number must be 11 digits.");
      isValid = false;
    } else {
      hideError(phoneNumber);
    }

    if (experience.value.trim() === "") {
      showError(experience, "Experience is required. Enter 0 in case of Fresher");
      isValid = false;
    } else if (isNaN(experience.value.trim()) || experience.value <= 0) {
      showError(experience, "Experience must be a positive number.");
      isValid = false;
    } else {
      hideError(experience);
    }

    if (email.value.trim() === "") {
      showError(email, "Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email.value.trim())) {
      showError(email, "Invalid email format.");
      isValid = false;
    } else {
      hideError(email);
    }

    if (isValid) {
      form2.submit(); // Submit the form if all validations pass
    }
  });

  // Utility Functions for Showing and Hiding Errors Using Alerts
function showError(input, message) {
  alert(message); // Display the error message as an alert
  input.focus(); // Bring the user's focus to the problematic input field
}

function hideError(input) {
  const errorElement = input.nextElementSibling;
  if (errorElement) {
    errorElement.textContent = "";
    input.classList.remove("error");
  }
}
signupButton.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default form submission behavior
  //window.location.href = doctorsignupUrl;
});
});


document.addEventListener("DOMContentLoaded", () => {
  const form1 = document.getElementById("form-1");
  const form2 = document.getElementById("form-2");
  const nextButton = document.getElementById("next-button");
  const signupButton = document.getElementById("signup");

  // Show the next form
  nextButton.addEventListener("click", () => {
    form1.style.display = "none";
    form2.style.display = "block";
  });

  // Handle the signup button click
  signupButton.addEventListener("click", async (event) => {
    event.preventDefault();

    // Collect data from both forms
    const doctorData = {
      first_name: document.getElementById("first-name").value,
      last_name: document.getElementById("last-name").value,
      license_number: document.getElementById("license-number").value,
      specialization: document.getElementById("specialization").value,
      phone_number: document.getElementById("phone-number").value,
      experience: document.getElementById("experience").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    try {
      // Send data to the backend route
      const response = await fetch("/verify_doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctorData),
      });
  
      const data = await response.json(); // Parse the JSON response
  
      if (response.ok && data.message) {
        // Handle success (e.g., redirect or show success message)
        alert(data.message); // Display the success message from the server
        window.location.href = "/verify"; // Redirect to verification page
      } else {
        // Handle failure (e.g., show error message)
        alert(data.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred while signing up. Please try again.");
    }
  });
});
