import { loginUser } from '../api/user.api.js';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const userEmail = document.getElementById('userEmail').value;
        const userPassword = document.getElementById('userPassword').value;

        try {
            const loggedInUser = await loginUser(userEmail, userPassword);
            if (loggedInUser) {
                alert(`Welcome back, ${loggedInUser.name}!`);
                window.location.href = '../index.html'; // Redirect to homepage after successful login
            } else {
                alert('Invalid email or password. Please try again.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    });
});
