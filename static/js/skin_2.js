document.addEventListener('DOMContentLoaded', function () {
    // Select elements by ID
    const submitBtn = document.getElementById("submit-btn");
    const overlay = document.getElementById("overlay");
    const closeBtn = document.getElementById("close-overlay");
  
    // Show the overlay when the submit button is clicked
    submitBtn.addEventListener("click", () => {
      overlay.classList.remove("hidden");
      overlay.classList.add("show");
    });
  
    // Hide the overlay when the close button is clicked
    closeBtn.addEventListener("click", () => {
      overlay.classList.remove("show");
      overlay.classList.add("hidden");
    });
  });
  