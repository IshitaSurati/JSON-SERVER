import { getUser, updateUser } from '../api/user.api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    try {
        const user = await getUser(userId);
        document.getElementById('userId').value = user.id;
        document.getElementById('userName').value = user.name;
        document.getElementById('userEmail').value = user.email;
    } catch (error) {
        console.error('Error fetching user:', error);
    }

    document.getElementById('updateUserForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const userId = document.getElementById('userId').value;
        const userName = document.getElementById('userName').value;
        const userEmail = document.getElementById('userEmail').value;

        try {
            await updateUser(userId, { name: userName, email: userEmail });
            alert('User updated successfully!');
            window.location.href = '../index.html'; // Redirect to homepage after successful update
        } catch (error) {
            console.error('Error updating user:', error);
        }
    });
});
