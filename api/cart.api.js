// /api/cart.api.js
const API_URL = 'https://project-json-server-coov.onrender.com/cart';

export const addToCart = async (product) => {
    try {
        let cart = await getCart();
        let cartItem = cart.find(item => item.id === product.id);

        if (cartItem) {
            cartItem.quantity += 1;
            await updateCart(cartItem.id, 'update', cartItem);
        } else {
            product.quantity = 1;
            await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export const getCart = async () => {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

export const updateCart = async (id, action, updatedItem = null) => {
    try {
        if (action === 'remove') {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
        } else if (action === 'update' && updatedItem) {
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedItem)
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export const getTotalPrice = async () => {
    try {
        let cart = await getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    } catch (error) {
        console.error('Error:', error);
        return 0;
    }
};
