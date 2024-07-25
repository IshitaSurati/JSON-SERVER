import { displaySidebar } from "../components/sidebar.js";
import { getCart, updateCart, getTotalPrice } from "../api/cart.api.js";

const displayCart = async () => {
    await displaySidebar();
    let cart = await getCart();
    let cartList = document.getElementById("cartList");
    let totalPrice = document.getElementById("totalPrice");

    cartList.innerHTML = ''; // Clear previous items

    cart.forEach(item => {
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <button class="remove-btn">Remove</button>
            </div>
        `;

        cartItem.querySelector(".remove-btn").addEventListener("click", async () => {
            await updateCart(item.id, "remove");
            cartItem.remove();
            await updateTotalPrice();
        });

        cartList.appendChild(cartItem);
    });

    await updateTotalPrice();
};

const updateTotalPrice = async () => {
    let total = await getTotalPrice();
    let totalPrice = document.getElementById("totalPrice");
    totalPrice.innerText = `Total Price: $${total}`;
};

displayCart();
