const BASE_URL = 'http://localhost:3000/user';

// Function to fetch all users
export const getUsers = async () => {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return await response.json();
};

// Function to fetch a single user by ID
export const getUser = async (userId) => {
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch user ${userId}`);
    }
    return await response.json();
};

// Function to create a new user
export const createUser = async (userData) => {
    const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error('Failed to create user');
    }
};

// Function to update a user
export const updateUser = async (userId, userData) => {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error(`Failed to update user ${userId}`);
    }
};

// Function to delete a user
export const deleteUser = async (userId) => {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`Failed to delete user ${userId}`);
    }
};

// Function to authenticate user login
export const loginUser = async (email, password) => {
    const response = await fetch(`${BASE_URL}/users?email=${email}&password=${password}`);
    if (!response.ok) {
        throw new Error('Login failed');
    }
    const users = await response.json();
    return users.length > 0 ? users[0] : null;
};
