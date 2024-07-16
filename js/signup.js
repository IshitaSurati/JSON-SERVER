import { createUser } from '../api/user.api.js';

document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const avatar = document.getElementById('avatar').value; // Assuming you have an input for avatar

    const user = { name, email, password, avatar };
    await createUser(user);
    window.location.href = '/index.html';
});
