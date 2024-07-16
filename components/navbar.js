import { deleteUser, updateUser, getUser } from "../api/user.api.js";

export const Navbar = () => {
    const handleDeleteUser = (id) => {
        deleteUser(id)
            .then(() => {
                // After deletion, clear user data and show signup page
                document.getElementById('userList').innerHTML = '';
                window.location.href = '/pages/signup.html';
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
            });
    };

    const handleUpdateUser = (id) => {
        // Implement logic to update user data
        // For example, update email and password
        const updatedUserData = {
            email: 'updatedemail@example.com',
            password: 'newpassword'
        };

        updateUser(id, updatedUserData)
            .then(() => {
                // After updating, clear user data and show login page
                document.getElementById('userList').innerHTML = '';
                window.location.href = '/pages/login.html';
            })
            .catch((error) => {
                console.error('Error updating user:', error);
            });
    };

    const displayUserData = async () => {
        const users = await getUser();
        const userListElement = document.getElementById('userList');
        
        // Displaying the first user found (you might need to iterate through users)
        if (users.length > 0) {
            const user = users[0];
            userListElement.innerHTML = `
                <div class="user-info">
                    <img src="${user.avatar}" alt="User Avatar">
                    <span>${user.name}</span>
                </div>
                <div class="user-actions">
                    <button class="btn btn-sm btn-primary" onclick="handleUpdateUser(${user.id})">Update</button>
                    <button class="btn btn-sm btn-danger" onclick="handleDeleteUser(${user.id})">Delete</button>
                </div>
            `;
        }
    };

    displayUserData(); // Display user data on page load

    return `<nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Your Website Name</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="/index.html">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/pages/addProduct.html">Add Products</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/pages/signup.html">Signup</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/pages/login.html">Login</a>
                </li>
            </ul>
        </div>
        <!-- Sidebar -->
        <div class="sidebar">
            <div class="search">
                <input type="text" placeholder="Search...">
                <button type="submit"><i class="fa fa-search"></i></button>
            </div>
            <div class="user-section" id="userList">
                <!-- User data will be displayed here -->
            </div>
        </div>
    </nav>`;
};
