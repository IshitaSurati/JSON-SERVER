import { login } from '../api/user.api.js';

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = { email, password };
    const result = await login(user);

    if (result.success) {
        alert('Login successful');
        window.location.href = '/index.html';
    } else {
        alert('Login failed: ' + result.message);
    }
});
