import { displaySidebar } from '../components/sidebar.js';
import { createUser } from "../api/user.api.js";

document.addEventListener('DOMContentLoaded', () => {
    displaySidebar();
});

const handleData = async (e) => {
    e.preventDefault();

    let user = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        image: document.getElementById('image').value // Get the image URL from the input
    };

    await createUser(user);
    location.reload();
}

document.getElementById("userData").addEventListener("submit", handleData);
