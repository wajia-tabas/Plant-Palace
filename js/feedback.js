document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Ensure all required fields are filled
    if (this.checkValidity()) {
        // Display the success message
        document.getElementById('popup').style.display = 'flex';

        // Automatically close the pop-up and redirect to index.html after 2 seconds
        setTimeout(function() {
            window.location.href = 'index.html'; // Redirect to index.html
        }, 2000);
    } else {
        // If fields are not filled, let the browser handle validation feedback
        this.reportValidity();
    }
});

// Optionally, allow closing the pop-up manually
document.getElementById('popupClose').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
    window.location.href = 'index.html';
});
