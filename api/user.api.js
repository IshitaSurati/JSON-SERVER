// /api/user.api.js
const API_URL = 'https://project-json-server-coov.onrender.com/user';

export const createUser = async (user) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const data = await response.json();
        localStorage.setItem('loggedInUser', JSON.stringify(data));
        window.location.href = '/index.html';
    } catch (error) {
        console.error('Error:', error);
    }
};

export const login = async (user) => {
    try {
        const response = await fetch(API_URL);
        const users = await response.json();

        const loggedInUser = users.find(u => u.email === user.email && u.password === user.password);

        if (loggedInUser) {
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
            window.location.href = '/index.html';
        } else {
            alert('Invalid email or password');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export const getUserInfo = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        return user;
    } catch (error) {
        console.error('Error:', error);
    }
};

export const deleteUser = async (id) => {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        localStorage.removeItem('loggedInUser');
        window.location.href = '/pages/signup.html';
    } catch (error) {
        console.error('Error:', error);
    }
};

export const updateUser = async (user) => {
    try {
        await fetch(`${API_URL}/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        localStorage.setItem('loggedInUser', JSON.stringify(user));
    } catch (error) {
        console.error('Error:', error);
    }
};
