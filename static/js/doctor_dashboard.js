document.addEventListener('DOMContentLoaded', () => {
    const viewButtons = document.querySelectorAll('.view-btn');
    const modal = document.getElementById('view-modal');
    const closeModal = document.querySelector('.close-btn');
    const patientDetails = document.getElementById('patient-details');
  
    // Open modal on View button click
    viewButtons.forEach(button => {
      button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const disease = button.getAttribute('data-disease');
        patientDetails.innerHTML = `<strong>Name:</strong> ${name}<br><strong>Disease:</strong> ${disease}`;
        modal.classList.remove('hidden');
      });
    });
  
    // Close modal
    closeModal.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  
    // Close modal when clicking outside content
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });
  