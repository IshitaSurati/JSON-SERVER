// /api/product.api.js
const API_URL = 'http://localhost:3000/products';

export const addProduct = async (product) => {
    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        window.location.href = '/index.html';
    } catch (error) {
        console.error('Error:', error);
    }
};

export const getProducts = async () => {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};
