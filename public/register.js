document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const cost_center = document.getElementById('cost_center').value;
    const secret_code = document.getElementById('secret_code').value;

    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, cost_center, secret_code })
    });

    if (response.ok) {
        alert('Analyst registered successfully');
        window.location.href = 'login.html';
    } else {
        alert('Failed to register analyst');
    }
});
