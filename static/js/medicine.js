

// document.querySelector(".submit-btn").addEventListener("click", async (e) => {
//   e.preventDefault(); // Prevent default behavior (if the button is inside a form)

//   const inputField = document.querySelector(".medicine-input");
//   let medicineName = inputField.value.trim();

//   // Check if the input field is empty
//   if (!medicineName) {
//     alert("Please enter a medicine name.");
//     return;
//   }

//   // Normalize input: Remove extra spaces, convert to lowercase
//   medicineName = medicineName.toLowerCase();

//   // Validate input: Ensure it's alphanumeric and not overly long
//   const maxLength = 100; // Arbitrary max length to avoid abuse
//   const validInput = /^[a-z0-9\s\-()]+$/; // Allow letters, numbers, spaces, dashes, and parentheses
//   if (medicineName.length > maxLength || !validInput.test(medicineName)) {
//     alert(
//       "Invalid input. Please enter a valid medicine name (letters, numbers, spaces, dashes, and parentheses only)."
//     );
//     return;
//   }

//   try {
//     // Send the input to the Flask backend (async request)
//     await fetch("/search-medicine", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ medicine_name: medicineName }),
//     });

//     // Redirect the user to the results page
//     window.location.href = "med_alter.html"; // Redirect to med_alter.html after sending the data

//   } catch (error) {
//     console.error("Error:", error);

//     // Handle network or unexpected errors
//     alert(
//       "Something went wrong. Please check your internet connection and try again."
//     );
//   }
// });


document.querySelector(".submit-btn").addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default form behavior if inside a form

  const inputField = document.querySelector(".medicine-input");
  let medicineName = inputField.value.trim();

  // Check if the input field is empty
  if (!medicineName) {
    alert("Please enter a medicine name.");
    return;
  }

  // Normalize input: Remove extra spaces, convert to lowercase
  medicineName = medicineName.toLowerCase();

  // Validate input: Ensure it's alphanumeric and not overly long
  const maxLength = 100; // Arbitrary max length to avoid abuse
  const validInput = /^[a-z0-9\s\-()]+$/; // Allow letters, numbers, spaces, dashes, and parentheses
  if (medicineName.length > maxLength || !validInput.test(medicineName)) {
    alert(
      "Invalid input. Please enter a valid medicine name (letters, numbers, spaces, dashes, and parentheses only)."
    );
    return;
  }

  // Redirect to med_alter.html with the medicine name as a query parameter
  const redirectUrl = `/med_alter.html?medicine_name=${encodeURIComponent(medicineName)}`;
  window.location.href = redirectUrl;
});
