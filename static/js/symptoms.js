// JavaScript for Sidebar Toggle
document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const toggleButton = document.getElementById("toggleSidebar");
  
    // Toggle Sidebar visibility
    toggleButton.addEventListener("click", () => {
      sidebar.classList.toggle("hidden");
  
      // Adjust toggle button position
      if (sidebar.classList.contains("hidden")) {
        toggleButton.style.left = "20px";
      } else {
        toggleButton.style.left = "300px";
      }
    });
  });
  