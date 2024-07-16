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
        document.getElementById('signupForm').reset();
    }
};

document.getElementById('signupForm').addEventListener('submit', handleSignup);