import { getCartItems, addToCart, updateCartItem, removeFromCart } from '../api/cart.api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));

    const updateCartUI = async () => {
        const cartItems = await getCartItems();
        const cartList = document.getElementById('cartList');
        cartList.innerHTML = ''; // Clear previous items

        cartItems.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            cartItem.innerHTML = `
                <div>
                    <span>${item.name}</span>
                    <span class="badge badge-primary badge-pill ml-2">${item.quantity}</span>
                </div>
                <div>
                    <button class="btn btn-sm btn-danger remove-item" data-item-id="${item.id}">Remove</button>
                </div>
            `;
            cartList.appendChild(cartItem);
        });

        const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cartTotalQuantity').textContent = totalQuantity.toString();
    };

    // Add to cart button click event
    document.getElementById('productList').addEventListener('click', async (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = event.target.dataset.productId;
            try {
                await addToCart(productId);
                updateCartUI();
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        }
    });

    // Remove item button click event
    document.getElementById('cartList').addEventListener('click', async (event) => {
        if (event.target.classList.contains('remove-item')) {
            const itemId = event.target.dataset.itemId;
            try {
                await removeFromCart(itemId);
                updateCartUI();
            } catch (error) {
                console.error('Error removing item from cart:', error);
            }
        }
    });

    // Show cart modal button click event
    document.getElementById('cartModalBtn').addEventListener('click', () => {
        updateCartUI();
        cartModal.show();
    });

    // Update cart item quantity button click event
    document.getElementById('cartList').addEventListener('click', async (event) => {
        if (event.target.classList.contains('update-quantity')) {
            const itemId = event.target.dataset.itemId;
            const newQuantity = parseInt(prompt('Enter new quantity:', ''));
            if (!isNaN(newQuantity) && newQuantity > 0) {
                try {
                    await updateCartItem(itemId, newQuantity);
                    updateCartUI();
                } catch (error) {
                    console.error('Error updating cart item:', error);
                }
            } else {
                alert('Please enter a valid quantity.');
            }
        }
    });
});
