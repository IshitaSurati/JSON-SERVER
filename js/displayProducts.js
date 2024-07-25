import { displaySidebar } from "../components/sidebar.js";
import { getProducts } from "../api/product.api.js";
import { addToCart } from "../api/cart.api.js";
document.addEventListener('DOMContentLoaded', () => {
    displaySidebar();
});

const init = async () => {
    // Display products
    const displayProducts = async () => {
        let products = await getProducts();
        let productList = document.getElementById("productList");

        products.map(product => {
            let productDiv = document.createElement("div");
            productDiv.classList.add("product");

            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}" style="max-width: 200px;">
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <p>Category: ${product.category}</p>
                <button class="buy-btn">Buy</button>
                <button class="cart-btn">Add to Cart</button>
            `;

            productDiv.querySelector(".buy-btn").addEventListener("click", () => {
                alert(`You have bought ${product.name}`);
            });

            productDiv.querySelector(".cart-btn").addEventListener("click", () => {
                addToCart(product);
            });

            productList.appendChild(productDiv);
        });
    };

    displayProducts();
};

init();
