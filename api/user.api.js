export const deleteUser = async (id) => {
    let req = await fetch(`http://localhost:3000/user/${id}`, {
        method: "DELETE",
    });
    return req.ok;
};

export const isExists = async (email) => {
    let req = await fetch(`http://localhost:3000/user?email=${email}`);
    let res = await req.json();

    return res.length > 0;
};

// create a new user
export const createUser = async (user) => {
    if (await isExists(user.email)) {
        alert("User already exists");
    } else {
        let req = await fetch("http://localhost:3000/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });

        return req.json();
    }
};

// get user
export const getUser = async () => {
    let req = await fetch("http://localhost:3000/user");
    let res = await req.json();
    return res;
};

// login user
export const login = async (user) => {
    let req = await fetch(`http://localhost:3000/user?email=${user.email}`);
    let res = await req.json();

    if (res.length == 0) {
        alert("User not found");
    } else {
        if (res[0].password == user.password) {
            alert("Logged in");
        } else {
            alert("Password is incorrect");
        }
    }
};

// update patch
export const updateUser = async (id, data) => {
    let req = await fetch(`http://localhost:3000/user/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    return req.ok;
};
