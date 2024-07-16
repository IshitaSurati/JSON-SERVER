import { Navbar } from "/components/navbar.js";
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('navbar').innerHTML = Navbar();
});

import { createUser, deleteUser, getUser, updateUser } from "/api/user.api.js";

let id = -1;

const handleData = (e) => {
    e.preventDefault();

    let user = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    if (id === -1) {
        // Creating new user
        createUser(user)
            .then(() => {
                clearForm();
                fetchAndMapUsers();
            })
            .catch(error => console.error('Error creating user:', error));
    } else {
        // Updating existing user
        updateUser(id, user)
            .then(() => {
                clearForm();
                fetchAndMapUsers();
                id = -1; // Reset id after update
            })
            .catch(error => console.error('Error updating user:', error));
    }
};

const updateInputValue = (ele) => {
    document.getElementById('username').value = ele.username;
    document.getElementById('email').value = ele.email;
    document.getElementById('password').value = ele.password;
    id = ele.id;
};

const fetchAndMapUsers = async () => {
    try {
        let data = await getUser();
        clearUserList();
        Mapper(data);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

const Mapper = (data) => {
    data.forEach((ele) => {
        let username = document.createElement("h3");
        username.innerHTML = ele.username;
        let email = document.createElement("h4");
        email.innerHTML = ele.email;
        let password = document.createElement("p");
        password.innerHTML = ele.password;
        let update = document.createElement("button");
        update.innerHTML = "Update User";
        update.addEventListener("click", () => updateInputValue(ele));
        let deleteUser = document.createElement("button");
        deleteUser.innerHTML = "Delete User";
        deleteUser.addEventListener("click", () => {
            handleDeleteUser(ele.id);
        });
        let div = document.createElement("div");
        div.append(username, email, password, update, deleteUser);
        document.getElementById("userList").append(div);
    });
};

const handleDeleteUser = (id) => {
    deleteUser(id)
        .then(() => {
            clearUserList();
            fetchAndMapUsers();
            id = -1; // Reset id after delete if needed
        })
        .catch(error => console.error('Error deleting user:', error));
};

const clearForm = () => {
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    id = -1; // Reset id after form clear
};

const clearUserList = () => {
    document.getElementById("userList").innerHTML = "";
};

// Initial load of users
fetchAndMapUsers();

// Event listener for form submission
document.getElementById("userData").addEventListener("submit", handleData);
