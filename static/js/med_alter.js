document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const medicineName = urlParams.get('medicine_name'); // Get the medicine_name from the URL
  
    if (!medicineName) {
      alert("No medicine name provided.");
      return;
    }
  
    try {
      // Fetch alternatives from the backend using POST request
      const response = await fetch('/search-medicine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ medicine_name: medicineName }),
      });
  
      if (response.ok) {
        const result = await response.json();
  
        // Check if the result is empty
        if (!result || !result.result || result.result.length === 0) {
          document.getElementById('results-container').innerHTML = '<p>No alternatives found.</p>';
        } else {
          // Display the results dynamically
          displayResults(result.result);
          setupPagination(result.result);
        }
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Failed to fetch alternatives.'}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching data. Please try again.");
    }
  });
  
  // Function to display medicine results
  function displayResults(results) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ""; // Clear previous results
  
    results.forEach((medicine) => {
      const medicineElement = document.createElement('div');
      medicineElement.classList.add('medicine-card');
      medicineElement.innerHTML = `
        <div class="medicine-card-body">
          <h4>${medicine.medicine_name}</h4>
          <p><strong>Brand:</strong> ${medicine.manufacturer}</p>
          <p><strong>Salt:</strong> ${medicine.salt}</p>
          <p><strong>Pack Size:</strong> ${medicine.pack_size}</p>
          <p><strong>Discounted Price:</strong> Rs ${medicine.discounted_price}</p>
          <p><strong>Original Price:</strong> Rs ${medicine.original_price}</p>
          <a href="${medicine.link}" target="_blank">More Info</a>
        </div>
      `;
      resultsContainer.appendChild(medicineElement);
    });
  }
  
  // Function to set up pagination
  function setupPagination(allResults) {
    const totalResults = allResults.length;
    const resultsPerPage = 10; // Number of results per page
    const totalPages = Math.ceil(totalResults / resultsPerPage);
  
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = ""; // Clear previous pagination
  
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.classList.add('page-btn');
      pageButton.addEventListener('click', () => paginateResults(i, resultsPerPage, allResults));
      paginationContainer.appendChild(pageButton);
    }
  
    // Display the first page results by default
    paginateResults(1, resultsPerPage, allResults);
  }
  
  // Function to paginate results
  function paginateResults(page, resultsPerPage, allResults) {
    const resultsContainer = document.querySelector('.medicine-results');
    resultsContainer.innerHTML = ""; // Clear previous results
  
    const startIndex = (page - 1) * resultsPerPage;
    const endIndex = page * resultsPerPage;
    const currentPageResults = allResults.slice(startIndex, endIndex);
  
    currentPageResults.forEach(medicine => {
      const medicineElement = document.createElement('div');
      medicineElement.classList.add('medicine-card');
      medicineElement.innerHTML = `
        <div class="medicine-card-body">
          <h4>${medicine.medicine_name}</h4>
          <p><strong>Manufacturer:</strong> ${medicine.manufacturer}</p>
          <p><strong>Salt:</strong> ${medicine.salt}</p>
          <p><strong>Pack Size:</strong> ${medicine.pack_size}</p>
          <p><strong>Discounted Price:</strong> Rs ${medicine.discounted_price}</p>
          <p><strong>Original Price:</strong> Rs ${medicine.original_price}</p>
          <p><strong>Link:</strong> <a href="${medicine.link}" target="_blank">View Product</a></p>
        </div>
      `;
      resultsContainer.appendChild(medicineElement);
    });
  }
  