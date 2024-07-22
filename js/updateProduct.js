import { getProduct, updateProduct } from '../api/product.api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');

    try {
        const product = await getProduct(productId);
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productPrice').value = product.price;
        const img = document.getElementById('img').value=product.img;
    } catch (error) {
        console.error('Error fetching product:', error);
    }

    document.getElementById('updateProductForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const productId = document.getElementById('productId').value;
        const productName = document.getElementById('productName').value;
        const productDescription = document.getElementById('productDescription').value;
        const productPrice = document.getElementById('productPrice').value;
        const img = document.getElementById('img').value;
        try {
            await updateProduct(productId, {
                name: productName,
                description: productDescription,
                img:img,
                price: parseFloat(productPrice)
            });
            alert('Product updated successfully!');
            window.location.href = '../index.html'; // Redirect to homepage after successful update
        } catch (error) {
            console.error('Error updating product:', error);
        }
    });
});
