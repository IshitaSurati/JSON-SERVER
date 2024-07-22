const BASE_URL = 'http://localhost:3000/products';

// Function to fetch cart items
export const getCartItems = async () => {
    const response = await fetch(`${BASE_URL}/cart`);
    if (!response.ok) {
        throw new Error('Failed to fetch cart items');
    }
    return await response.json();
};

// Function to add an item to the cart
export const addToCart = async (itemId) => {
    const response = await fetch(`${BASE_URL}/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId }),
    });
    if (!response.ok) {
        throw new Error('Failed to add item to cart');
    }
};

// Function to update an item in the cart
export const updateCartItem = async (itemId, quantity) => {
    const response = await fetch(`${BASE_URL}/cart/${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
    });
    if (!response.ok) {
        throw new Error('Failed to update cart item');
    }
};

// Function to remove an item from the cart
export const removeFromCart = async (itemId) => {
    const response = await fetch(`${BASE_URL}/cart/${itemId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to remove item from cart');
    }
};

// Function to clear the cart
export const clearCart = async () => {
    const response = await fetch(`${BASE_URL}/cart/clear`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to clear cart');
    }
};
