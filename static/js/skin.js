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
  

  document.addEventListener('DOMContentLoaded', function() {
    const fileUpload = document.getElementById('file-upload');
    const nextBtn = document.getElementById('next-btn');
    const overlay = document.getElementById('overlay');
    
    // Show overlay on Next button click
    nextBtn.addEventListener('click', () => {
      if (fileUpload.files.length > 0) {
        overlay.classList.add('visible');
      } else {
        alert('Please upload at least one file.');
      }
    });
    
    // Hide overlay if the user clicks anywhere outside the overlay content
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('visible');
      }
    });
  });

  
  document.addEventListener('DOMContentLoaded', function() {
    const fileUpload = document.getElementById('file-upload');
    const nextBtn = document.getElementById('next-btn');
    const overlay = document.getElementById('overlay');
    const submitBtn = document.getElementById('submit-Btn')
    
    // Allowed file extensions
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
  
    // Event listener for file validation
    fileUpload.addEventListener('change', () => {
      const files = Array.from(fileUpload.files);
      const invalidFiles = files.filter(file => {
        const fileExtension = file.name.split('.').pop().toLowerCase();
        return !allowedExtensions.includes(fileExtension);
      });
  
      // If there are invalid files
      if (invalidFiles.length > 0) {
        alert(`The following files are not allowed: ${invalidFiles.map(f => f.name).join(', ')}.\nOnly supports .jpg, .png, .jpeg files.`);
        fileUpload.value = ''; // Clear the input
      }
    });
  
    // Show overlay on Next button click
    nextBtn.addEventListener('click', () => {
      if (fileUpload.files.length > 0) {
        overlay.classList.add('visible');
      } else {
        alert('Please upload at least one valid file.');
      }
    });
  
    // Hide overlay if the user clicks anywhere outside the overlay content
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('visible');
      }
    });

    submitBtn.addEventListener('click', (e)=>{
    
        overlay.classList.remove('visible')
        
    }
    )
    
  });
  