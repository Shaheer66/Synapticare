document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const signupModal = document.getElementById("signup-modal");
    const openModalButton = document.getElementById("open-modal");
    const closeModalButton = document.getElementById("close-modal");
    const normalUserButton = document.getElementById("normal-user");
    const doctorUserButton = document.getElementById("doctor-user");
  
    // Open modal when "Sign Up" link is clicked
    openModalButton.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default link behavior
        signupModal.style.display = "flex"; // Show the modal
    });
  
    // Close modal when close button is clicked
    closeModalButton.addEventListener("click", () => {
        signupModal.style.display = "none"; // Hide the modal
    });
  
    // Close modal when clicking outside of modal content
    signupModal.addEventListener("click", (e) => {
        if (e.target === signupModal) {
            signupModal.style.display = "none"; // Hide modal if clicked outside
        }
    });
  
    // Redirect to Normal User signup
    normalUserButton.addEventListener("click", () => {
        window.location.href = signupUrl; // Redirect to normal user signup page
    });
  
    // Redirect to Doctor/Healthcare Professional signup
    doctorUserButton.addEventListener("click", () => {
        window.location.href = doctorSignupUrl; // Redirect to doctor signup page
    });
  });


  
  document.addEventListener('DOMContentLoaded', () => {
    // Get the signup button and modal elements
    const signupButton = document.getElementById('signup-btn');
    const signupModal = document.getElementById('signup-modal');
    const closeModal = document.getElementById('close-modal');
  
    // Show the modal when the Sign Up button is clicked
    signupButton.addEventListener('click', () => {
      signupModal.style.display = 'flex';
    });
  
    // Close the modal when the close button is clicked
    closeModal.addEventListener('click', () => {
      signupModal.style.display = 'none';
    });
  
    // Close the modal if the user clicks outside the modal content
    window.addEventListener('click', (event) => {
      if (event.target === signupModal) {
        signupModal.style.display = 'none';
      }
    });
  
    // Handle Normal User and Doctor button clicks
    document.getElementById('normal-user').addEventListener('click', () => {
      window.location.href = signupUrl; // Redirect to normal user signup
    });
  
    document.getElementById('doctor-user').addEventListener('click', () => {
      window.location.href = doctorSignupUrl; // Redirect to doctor signup
    });
  });
  

  // Get the Sign In button
  const signinBtn = document.querySelector('.signin-btn');
  
  // Add event listener to handle the click event
  signinBtn.addEventListener('click', function (event) {
      event.preventDefault(); // Prevent the form from submitting normally
  
      // Extract email and password from the input fields
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
  
      // Validate the input fields
      if (!email || !password) {
          alert("Both email and password are required.");
          return; // Stop further execution if any field is empty
      }
  
      // Send the email and password to the Flask backend via the /auth_login route
      fetch('/auth_login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email, password: password }), // Send as JSON payload
      })
          .then((response) => response.json())
          .then((data) => {
              if (data.success) {
                  // If login is successful, redirect to the patient_home page
                  window.location.href = data.redirect_url; // Redirect to the URL returned by the backend
              } else {
                  // Show the error message from the backend
                  alert(data.error || 'Invalid email or password.');
              }
          })
          .catch((error) => {
              console.error('Error:', error);
              alert('An error occurred while processing your request. Please try again.');
          });
  });
  