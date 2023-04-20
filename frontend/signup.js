document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
    const contact = document.getElementById('contact').value;

    try {
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                username: username,
                password: password,
                email: email,
                role: role,
                contact: contact
            })
        });
        const data = await response.text();

        if (data === "User Signup") {
            alert('Signup successful! Please login.');
            window.location.href = 'login.html';
        } else {
            alert('Error signing up. Please try again.');
        }
    } catch (error) {
        console.error(error);
        alert('Error signing up');
    }
});
