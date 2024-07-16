const apiUrl = "http://localhost:3000/products";

export const createProduct = async (product) => {
    await fetch(`${apiUrl}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });
};

export const getProduct = async () => {
    const res = await fetch(`${apiUrl}`);
    return await res.json();
};

export const updateProduct = async (product) => {
    await fetch(`${apiUrl}/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });
};

export const deleteProduct = async (id) => {
    await fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    });
};