import { loginUser } from "/api/user.api.js";

const handleLogin = async (e) => {
    e.preventDefault();
    
    const user = {
        email: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value
    };

    try {
        const loggedIn = await loginUser(user);

        if (loggedIn) {
            alert("Logged in successfully!");
            window.location.href = "/index.html";
        } else {
            alert("Login failed. Please check your credentials.");
        }
    } catch (error) {
        console.error('Login failed:', error.message);
        alert("Login failed. Please try again later.");
    }
};

document.getElementById("loginForm").addEventListener("submit", handleLogin);