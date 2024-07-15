const apiUrl = "http://localhost:2025/user";

const isExists = async (email) => {
    const req = await fetch(`${apiUrl}/user?email=${email}`);
    const res = await req.json();
    return res.length > 0;
};

export const createUser = async (user) => {
    if (await isExists(user.email)) {
        alert("User already exists");
    } else {
        await fetch(`${apiUrl}/user`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
    }
};

export const loginUser = async (user) => {
    const req = await fetch(`${apiUrl}/user?email=${user.email}&password=${user.password}`);
    const res = await req.json();
    if (res.length > 0) {
        alert("Login successful");
    } else {
        alert("Invalid email or password");
    }
};

export const getUser = async () => {
    const res = await fetch(`${apiUrl}/user`);
    return await res.json();
};
