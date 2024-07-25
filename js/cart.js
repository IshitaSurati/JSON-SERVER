// /js/cart.js
import { getCart, updateCart, getTotalPrice } from "../api/cart.api.js";

const displayCart = async () => {
    let cart = await getCart();
    let cartList = document.getElementById("cartList");
    let totalPrice = document.getElementById("totalPrice");

    cart.forEach(item => {
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <button class="remove-btn">Remove</button>
        `;

        cartItem.querySelector(".remove-btn").addEventListener("click", async () => {
            await updateCart(item.id, "remove");
            cartItem.remove();
        });

        cartList.appendChild(cartItem);
    });

    let total = await getTotalPrice();
    totalPrice.innerText = `Total Price: $${total}`;
};

displayCart();
