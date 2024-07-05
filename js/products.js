export const createProduct = async (product) => {
    let req = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(product)
    });
    return req.json();
};

export const getProducts = async () => {
    let req = await fetch("http://localhost:3000/products");
    return req.json();
};
