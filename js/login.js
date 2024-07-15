import { loginUser } from '/api/user.api.js';

const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
        email: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value
    };

    const loggedIn = await loginUser(user);

    if (loggedIn) {
        alert("Logged in successfully!");
        // Redirect or perform other actions after login
    } else {
        alert("Incorrect email or password.");
    }
};

document.getElementById('loginForm').addEventListener('submit', handleLogin);
