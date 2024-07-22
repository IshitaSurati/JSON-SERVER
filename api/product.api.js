const BASE_URL = 'http://localhost:3000/products';

// Function to fetch all products
export const getProducts = async () => {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return await response.json();
};

// Function to fetch a single product by ID
export const getProduct = async (productId) => {
    const response = await fetch(`${BASE_URL}/products/${productId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch product ${productId}`);
    }
    return await response.json();
};

// Function to create a new product
export const createProduct = async (productData) => {
    const response = await fetch(`${BASE_URL}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    });
    if (!response.ok) {
        throw new Error('Failed to create product');
    }
};

// Function to update a product
export const updateProduct = async (productId, productData) => {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    });
    if (!response.ok) {
        throw new Error(`Failed to update product ${productId}`);
    }
};

// Function to delete a product
export const deleteProduct = async (productId) => {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`Failed to delete product ${productId}`);
    }
};
