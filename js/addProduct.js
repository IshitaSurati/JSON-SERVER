// addProduct.js
import { createProduct } from '../api/product.api.js';

document.getElementById('addProductForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const category = document.getElementById('productCategory').value;
    const description = document.getElementById('productDescription').value;
    const img = document.getElementById('img').value;

    try {
        await createProduct({ name, price, category, description,img });
        alert('Product added successfully!');
        document.getElementById('addProductForm').reset();
    } catch (error) {
        console.error('Error adding product:', error);
        alert('Error adding product. Please try again.');
    }
});
