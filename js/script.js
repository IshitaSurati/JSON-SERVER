import { getProducts } from "/js/products.js";
import { createUser, getUser } from "/js/user.api.js";



// Handle user form submission
const handleUserForm = (e) => {
    e.preventDefault();

    let user = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

   createUser(user)
};

getUser()
document.getElementById("userData").addEventListener("submit", handleUserForm);

// Display products
const displayProducts = () => {
    getProducts().then((products) => {
        const productList = document.getElementById('productList');
        productList.innerHTML = '';

        products.forEach((product) => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
            `;
            productList.appendChild(productItem);
        });
    }).catch((err) => {
        console.log(err);
        alert("Error fetching products!");
    });
};

// Initial display of products
if (document.getElementById('productList')) {
    displayProducts();
}
