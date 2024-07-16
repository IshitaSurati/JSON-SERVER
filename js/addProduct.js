import { createProduct } from "/api/product.api.js";

const handleProductInput = async (e) => {
    e.preventDefault();

    const product = {
        name: document.getElementById('productName').value,
        price: document.getElementById('productPrice').value,
        quantity: document.getElementById('productQuantity').value
    };

    try {
        await createProduct(product);
        alert("Product added successfully!");
        document.getElementById('productForm').reset();
    } catch (error) {
        console.error('Failed to add product:', error.message);
        alert("Failed to add product. Please try again later.");
    }
};

document.getElementById("productForm").addEventListener("submit", handleProductInput);