import { createUser, loginUser, getUser, updateUser, deleteUser } from "/api/user.api";
import { createProduct, getProduct, updateProduct, deleteProduct } from "/api/product.api.js";

// Handle Signup
const handleSignup = async (e) => {
    e.preventDefault();
    const user = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };
    await createUser(user);
    window.location.href = '/index.html';
};

if (document.getElementById("signupForm")) {
    document.getElementById("signupForm").addEventListener("submit", handleSignup);
}

// Handle Login
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

// Handle Product Input
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
                    <button class="btn btn-primary update-product" data-id="${product.id}">Update</button>
                    <button class="btn btn-danger delete-product" data-id="${product.id}">Delete</button>
                </div>
            </div>
        `;
        productList.appendChild(productDiv);
    });

    document.querySelectorAll(".update-product").forEach(button => {
        button.addEventListener("click", async (e) => {
            const id = e.target.dataset.id;
            const product = products.find(p => p.id === id);
            // Assume a modal or another form is used to update product details
            document.getElementById('productName').value = product.name;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productQuantity').value = product.quantity;
            document.getElementById('productId').value = product.id;
        });
    });

    document.querySelectorAll(".delete-product").forEach(button => {
        button.addEventListener("click", async (e) => {
            const id = e.target.dataset.id;
            await deleteProduct(id);
            loadProducts();
        });
    });
};

if (document.getElementById("products")) {
    loadProducts();
}

// Update Product
const handleProductUpdate = async (e) => {
    e.preventDefault();
    const product = {
        id: document.getElementById('productId').value,
        name: document.getElementById('productName').value,
        price: document.getElementById('productPrice').value,
        quantity: document.getElementById('productQuantity').value
    };
    await updateProduct(product);
    loadProducts();
};

if (document.getElementById("productUpdateForm")) {
    document.getElementById("productUpdateForm").addEventListener("submit", handleProductUpdate);
}