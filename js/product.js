// // product.js
// import { getProducts, deleteProduct } from '../api/product.api.js';

// let cart = [];

// // Function to fetch and display products
// const fetchAndDisplayProducts = async () => {
//     try {
//         const products = await getProducts();
//         const productList = document.getElementById('productList');
//         productList.innerHTML = ''; // Clear previous list

//         products.forEach(product => {
//             const productCard = document.createElement('div');
//             productCard.innerHTML = `
//                 <h3>${product.name}</h3>
//                 <p>Price: $${product.price}</p>
//                 <p>Category: ${product.category}</p>
//                 <p>${product.description}</p>
//                 <button onclick="handleBuyProduct('${product.id}')">Buy</button>
//                 <button onclick="handleAddToCart('${product.id}')">Add to Cart</button>
//                 <button onclick="handleDeleteProduct('${product.id}')">Delete</button>
//             `;
//             productList.appendChild(productCard);
//         });

//         updateCart();
//     } catch (error) {
//         console.error('Error fetching products:', error);
//     }
// };

// // Function to handle adding product to cart
// const handleAddToCart = (productId) => {
//     const product = cart.find(item => item.id === productId);
//     if (product) {
//         product.quantity++;
//     } else {
//         cart.push({ id: productId, quantity: 1 });
//     }
//     updateCart();
// };

// // Function to update cart display
// const updateCart = () => {
//     const cartContents = document.getElementById('cartContents');
//     cartContents.innerHTML = ''; // Clear previous cart items
//     let totalQuantity = 0;

//     cart.forEach(item => {
//         const product = getProductById(item.id); // Function to get product details
//         if (product) {
//             const cartItem = document.createElement('div');
//             cartItem.innerHTML = `
//                 <p>${product.name} - $${product.price} x ${item.quantity} = $${product.price * item.quantity}</p>
//                 <button onclick="handleRemoveFromCart('${product.id}')">Remove</button>
//             `;
//             cartContents.appendChild(cartItem);
//             totalQuantity += item.quantity;
//         }
//     });

//     document.getElementById('totalQuantity').textContent = totalQuantity;
// };

// // Function to handle removing product from cart
// const handleRemoveFromCart = (productId) => {
//     cart = cart.filter(item => item.id !== productId);
//     updateCart();
// };

// // Function to handle buying product
// const handleBuyProduct = (productId) => {
//     alert(`Product ${productId} bought successfully!`);
// };

// // Function to handle deleting product
// const handleDeleteProduct = async (productId) => {
//     if (!confirm('Are you sure you want to delete this product?')) return;

//     try {
//         await deleteProduct(productId);
//         alert('Product deleted successfully!');
//         fetchAndDisplayProducts();
//     } catch (error) {
//         console.error('Error deleting product:', error);
//         alert('Error deleting product. Please try again.');
//     }
// };

// // Export functions for use in index.js
// export { fetchAndDisplayProducts, handleAddToCart, handleBuyProduct, handleDeleteProduct, handleRemoveFromCart };
