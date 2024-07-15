import { createUser, isUserExists } from '/api/user.api.js';

const handleSignup = async (e) => {
    e.preventDefault();
    const user = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    if (await isUserExists(user.email)) {
        alert("User already exists!");
    } else {
        await createUser(user);
        alert("User created successfully!");
        // Clear the form
        document.getElementById('signupForm').reset();
        // Reload user list or perform other actions
    }
};

document.getElementById('signupForm').addEventListener('submit', handleSignup);

const isUserExists = async (email) => {
    const res = await fetch(`http://localhost:2025/user?email=${email}`);
    const data = await res.json();
    return data.length > 0;
};
