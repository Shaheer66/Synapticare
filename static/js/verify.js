const verify_btn=document.getElementById('verify-button')
verify_btn.addEventListener('click', function () {
    // Collect the verification code entered by the user
    const code = [
        document.getElementById('code1').value,
        document.getElementById('code2').value,
        document.getElementById('code3').value,
        document.getElementById('code4').value,
        document.getElementById('code5').value,
        document.getElementById('code6').value
    ].join("");  // Combine the individual inputs into a single string

    // Validate the code (ensure it's exactly 6 digits)
    if (code.length !== 6 || isNaN(code)) {
        alert("Please enter a valid 6-digit verification code.");
        return; // Stop further execution if the code is invalid
    }

    // Send the verification code to the Flask backend
    fetch("/verify_code", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: code }),  // Send the code as a JSON payload
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            // If the code is verified successfully, proceed to the next page or show a success message
            alert("Verification successful!");
            window.location.href = "/login"; // Redirect to the dashboard or another page
        } else {
            // If verification fails, show the error message
            alert("Error: " + (data.error || "Invalid verification code."));
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("There was an error with verifying the code.");
    });
});
