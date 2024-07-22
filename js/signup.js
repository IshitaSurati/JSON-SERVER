import { createUser } from '../api/user.api.js';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('signupForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const userName = document.getElementById('userName').value;
        const userEmail = document.getElementById('userEmail').value;
        const userPassword = document.getElementById('userPassword').value;

        try {
            await createUser({ name: userName, email: userEmail, password: userPassword });
            alert('Signup successful!');
            window.location.href = '../index.html'; // Redirect to homepage after successful signup
        } catch (error) {
            console.error('Error signing up:', error);
        }
    });
});
