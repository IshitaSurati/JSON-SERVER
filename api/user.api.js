const apiUrl = "http://localhost:3000/user";

export const isUserExists = async (email) => {
    console.log(`Checking if user exists with email: ${email}`);
    const req = await fetch(`${apiUrl}?email=${email}`);
    if (!req.ok) {
        console.error(`Failed to check user existence: ${req.status}`);
        throw new Error(`Failed to check user existence: ${req.status}`);
    }
    const res = await req.json();
    return res.length > 0;
};

export const createUser = async (user) => {
    if (await isUserExists(user.email)) {
        alert("User already exists");
    } else {
        const req = await fetch(`${apiUrl}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        if (!req.ok) {
            console.error(`Failed to create user: ${req.status}`);
            throw new Error(`Failed to create user: ${req.status}`);
        }
    }
};

export const loginUser = async (user) => {
    const req = await fetch(`${apiUrl}?email=${user.email}&password=${user.password}`);
    if (!req.ok) {
        console.error(`Failed to login: ${req.status}`);
        throw new Error(`Failed to login: ${req.status}`);
    }
    const res = await req.json();
    return res.length > 0;
};

export const getUser = async () => {
    const req = await fetch(`${apiUrl}`);
    if (!req.ok) {
        console.error(`Failed to get users: ${req.status}`);
        throw new Error(`Failed to get users: ${req.status}`);
    }
    return await req.json();
};

export const updateUser = async (user) => {
    const req = await fetch(`${apiUrl}/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });
    if (!req.ok) {
        console.error(`Failed to update user: ${req.status}`);
        throw new Error(`Failed to update user: ${req.status}`);
    }
};

export const deleteUser = async (id) => {
    const req = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    });
    if (!req.ok) {
        console.error(`Failed to delete user: ${req.status}`);
        throw new Error(`Failed to delete user: ${req.status}`);
    }
};