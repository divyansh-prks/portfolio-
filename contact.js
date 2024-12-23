document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Prepare the data to be sent
    const formData = {
        name: name,
        email: email,
        message: message
    };

    // Send data to the server (replace with your server's URL)
    fetch('http://localhost:4001/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)  // Convert form data to JSON
    })
    .then(response => response.json())  // Parse the response as JSON
    .then(data => {
        // Show success or error message based on the response
        if (data.success) {
            document.getElementById('status').textContent = 'Thank you for your message!';
        } else {
            document.getElementById('status').textContent = 'Something went wrong, please try again.';
        }
    })
    .catch(error => {
        // Handle any errors that occur during the fetch request
        console.error('Error:', error);
        document.getElementById('status').textContent = 'An error occurred, please try again later.';
    });
});
