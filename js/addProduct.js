import { displaySidebar } from "../components/sidebar.js";
import { addProduct } from "../api/product.api.js";
document.addEventListener('DOMContentLoaded', () => {
    displaySidebar();
});
const handleData = async (e) => {
    e.preventDefault();
    let product = {
        name: document.getElementById('productName').value,
        price: document.getElementById('price').value,
        category: document.getElementById('category').value,
        image: document.getElementById('image').value
    };

    await addProduct(product);
}

document.getElementById("productData").addEventListener("submit", handleData);
