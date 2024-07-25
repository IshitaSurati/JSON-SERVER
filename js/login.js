// /js/login.js
import { displaySidebar } from "../components/sidebar.js";
import { login } from "../api/user.api.js";
document.getElementById('sidebar').innerHTML = displaySidebar();
const handleData = async (e) => {
    e.preventDefault();

    let user = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    }

    await login(user);
}

document.getElementById("userData").addEventListener("submit", handleData);
