document.addEventListener('DOMContentLoaded', function () {
    // Select elements
    const submitBtn = document.querySelector(".submit-btn");
    const overlay = document.getElementById("overlay");
    const closeBtn = document.querySelector(".close-overlay");
  
    // Show the overlay when the submit button is clicked
    submitBtn.addEventListener("click", () => {
      overlay.classList.remove("hidden");
      overlay.classList.add("visible");
    });
  
    // Hide the overlay when the close button is clicked
    closeBtn.addEventListener("click", () => {
      overlay.classList.remove("visible");
      overlay.classList.add("hidden");
    });
  });
  