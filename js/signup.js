// /js/signup.js
import { displaySidebar } from '../components/sidebar.js';
import { createUser } from "../api/user.api.js";
document.getElementById('sidebar').innerHTML = displaySidebar();
const handleData = async (e) => {
    e.preventDefault();

    let user = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    }

    const imageInput = document.getElementById('image');
    const imageFile = imageInput.files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = async (event) => {
            user.image = event.target.result;
            await createUser(user);
        }
        reader.readAsDataURL(imageFile);
    } else {
        await createUser(user);
    }
}

document.getElementById("userData").addEventListener("submit", handleData);
