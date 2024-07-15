const apiUrl = "http://localhost:2025/products";

export const createProduct = async (product) => {
    await fetch(`${apiUrl}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });
};

export const getProduct = async () => {
    const res = await fetch(`${apiUrl}/products`);
    return await res.json();
};
