import { createUser, loginUser, getUser } from "/api/user.api.js";
import { createProduct, getProduct } from "/api/product.api.js";

// User Signup
const handleSignup = async (e) => {
    e.preventDefault();
    const user = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };
    await createUser(user);
    window.location.href = 'index.html';
};

if (document.getElementById("signupForm")) {
    document.getElementById("signupForm").addEventListener("submit", handleSignup);
}

// User Login
const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
        email: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value
    };
    await loginUser(user);
    window.location.href = '/index.html';
};

if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", handleLogin);
}

// Product Input
const handleProductInput = async (e) => {
    e.preventDefault();
    const product = {
        name: document.getElementById('productName').value,
        price: document.getElementById('productPrice').value,
        quantity: document.getElementById('productQuantity').value
    };
    await createProduct(product);
    loadProducts();
};

if (document.getElementById("productForm")) {
    document.getElementById("productForm").addEventListener("submit", handleProductInput);
}

// Load Products
const loadProducts = async () => {
    const products = await getProduct();
    const productList = document.getElementById("products");
    productList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("col-md-4", "mb-4");
        productDiv.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Price: $${product.price}</p>
                    <p class="card-text">Quantity: ${product.quantity}</p>
                </div>
            </div>
        `;
        productList.appendChild(productDiv);
    });
};

if (document.getElementById("products")) {
    loadProducts();
}
