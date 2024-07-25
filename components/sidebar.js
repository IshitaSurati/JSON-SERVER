import { getUserInfo, deleteUser, updateUser } from "../api/user.api.js";

export const displaySidebar = async () => {
    const user = await getUserInfo();
    const sidebar = document.querySelector('.sidebar');
    const userInfoDiv = document.createElement('div');
    userInfoDiv.id = "user-info";
    userInfoDiv.className = 'user-info';

    userInfoDiv.innerHTML = `
        <img src="${user.image}" alt="${user.name}" class="user-image">
        <h3 class="user-name">${user.username}</h3>
        <p class="user-email">${user.email}</p>
        <button id="update-user-btn" class="update-btn">Update</button>
        <button id="delete-user-btn" class="delete-btn">Delete</button>
        <nav id="pages">
            <ul>
                <li><a href="/index.html">Home</a></li>
                <li><a href="/pages/addProduct.html">Add Product</a></li>
                <li><a href="/pages/cart.html">Cart</a></li>
                <li><a href="/pages/signup.html">Sign Up</a></li>
                <li><a href="/pages/login.html">Login</a></li>
            </ul>
        </nav>
    `;

    sidebar.appendChild(userInfoDiv);

    document.getElementById("update-user-btn").addEventListener("click", () => {
        openUpdateModal(user);
    });

    document.getElementById("delete-user-btn").addEventListener("click", async () => {
        await deleteUser(user.id);
    });
};

const openUpdateModal = (user) => {
    const updateModal = document.getElementById("update-modal");
    const updateForm = document.getElementById("update-form");

    updateForm.name.value = user.name;
    updateForm.email.value = user.email;
    updateForm.image.value = user.image;

    updateModal.style.display = 'block';

    updateForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const updatedUser = {
            id: user.id,
            name: updateForm.name.value,
            email: updateForm.email.value,
            image: updateForm.image.value
        };

        await updateUser(updatedUser);
        updateModal.style.display = 'none';
        location.reload();
    });

    // Close modal when clicking outside or on the close button
    document.querySelector('.close').onclick = () => {
        updateModal.style.display = 'none';
    };
    
    window.onclick = (event) => {
        if (event.target === updateModal) {
            updateModal.style.display = 'none';
        }
    };
};
