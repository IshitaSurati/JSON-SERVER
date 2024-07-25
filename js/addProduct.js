// /js/addProduct.js
import { addProduct } from "../api/product.api.js";
// import { displaySidebar } from "../components/sidebar.js";

// document.getElementById('sidebar').innerHTML = displaySidebar();
const handleData = async (e) => {
    e.preventDefault();

    let product = {
        name: document.getElementById('productName').value,
        price: document.getElementById('price').value,
        category: document.getElementById('category').value
    }

    const imageInput = document.getElementById('image');
    const imageFile = imageInput.files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = async (event) => {
            product.image = event.target.result;
            await addProduct(product);
        }
        reader.readAsDataURL(imageFile);
    } else {
        await addProduct(product);
    }
}

document.getElementById("productData").addEventListener("submit", handleData);
