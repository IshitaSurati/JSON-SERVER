import { createProduct } from '/api/product.api.js';

const handleProductInput = async (e) => {
    e.preventDefault();
    const product = {
        name: document.getElementById('productName').value,
        price: document.getElementById('productPrice').value,
        quantity: document.getElementById('productQuantity').value
    };

    await createProduct(product);
    alert("Product added successfully!");
    document.getElementById('productForm').reset();
};

document.getElementById('productForm').addEventListener('submit', handleProductInput);
