import { getUsers, deleteUser, updateUser, getUser } from '../api/user.api.js';
import { getProducts, deleteProduct, updateProduct, getProduct } from '../api/product.api.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await fetchAndDisplayUsers();
        await fetchAndDisplayProducts();
        setupEventListeners();
    } catch (error) {
        console.error('Initial data fetch error:', error);
    }
});

const fetchAndDisplayUsers = async () => {
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Clear the list

    try {
        const users = await getUsers(); // Assuming getUsers fetches from '/users' on backend
        users.forEach(user => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            li.innerHTML = `
                ${user.name}
                <div>
                    <button class="btn btn-warning btn-sm mr-2" data-toggle="modal" data-target="#updateUserModal" data-user-id="${user.id}">Update</button>
                    <button class="btn btn-danger btn-sm" data-user-id="${user.id}">Delete</button>
                </div>
            `;
            userList.appendChild(li);

            // Add event listeners for update and delete buttons
            li.querySelector('.btn-danger').addEventListener('click', () => handleDeleteUser(user.id));
            li.querySelector('.btn-warning').addEventListener('click', () => handleUpdateUserModal(user.id));
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

const handleDeleteUser = async (userId) => {
    try {
        await deleteUser(userId);
        await fetchAndDisplayUsers();
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};

const handleUpdateUserModal = async (userId) => {
    try {
        const user = await getUser(userId);
        document.getElementById('userId').value = user.id;
        document.getElementById('userName').value = user.name;
        document.getElementById('userEmail').value = user.email;
    } catch (error) {
        console.error('Error fetching user for update:', error);
    }
};

const setupEventListeners = () => {
    // Search button click event
    document.getElementById('searchBtn').addEventListener('click', async (event) => {
        event.preventDefault();
        const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
        if (searchTerm !== '') {
            try {
                const products = await getProducts(); // Assuming getProducts fetches from '/products' on backend
                const filteredProducts = products.filter(product =>
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.category.toLowerCase().includes(searchTerm)
                );
                displayProducts(filteredProducts);
            } catch (error) {
                console.error('Error searching products:', error);
            }
        } else {
            await fetchAndDisplayProducts();
        }
    });

    // Event listener for product deletion
    document.getElementById('productList').addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-product')) {
            const productId = event.target.dataset.productId;
            try {
                await deleteProduct(productId);
                await fetchAndDisplayProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    });

    // Event listener for product update
    document.getElementById('productList').addEventListener('click', async (event) => {
        if (event.target.classList.contains('update-product')) {
            const productId = event.target.dataset.productId;
            try {
                const product = await getProduct(productId);
                document.getElementById('productId').value = product.id;
                document.getElementById('productName').value = product.name;
                document.getElementById('productDescription').value = product.description;
                document.getElementById('productPrice').value = product.price;
                document.getElementById('img').value = product.img; // Assuming img field is available in product data
            } catch (error) {
                console.error('Error fetching product for update:', error);
            }
        }
    });

    // Form submit event listener for updating user
    document.getElementById('updateUserForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const userId = document.getElementById('userId').value;
        const userName = document.getElementById('userName').value;
        const userEmail = document.getElementById('userEmail').value;

        try {
            await updateUser(userId, { name: userName, email: userEmail });
            $('#updateUserModal').modal('hide');
            await fetchAndDisplayUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    });

    // Form submit event listener for updating product
    document.getElementById('updateProductForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const productId = document.getElementById('productId').value;
        const productName = document.getElementById('productName').value;
        const productDescription = document.getElementById('productDescription').value;
        const productPrice = document.getElementById('productPrice').value;
        const img = document.getElementById('img').value;

        try {
            await updateProduct(productId, {
                name: productName,
                description: productDescription,
                img: img,
                price: parseFloat(productPrice)
            });
            $('#updateProductModal').modal('hide');
            await fetchAndDisplayProducts();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    });
};

const fetchAndDisplayProducts = async () => {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Clear the list

    try {
        const products = await getProducts(); // Assuming getProducts fetches from '/products' on backend
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

const displayProducts = (products) => {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Clear the list

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4');
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <img src="${product.img}" class="card-img-top" alt="Product Image">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">Price: ${product.price}</p>
                    <button class="btn btn-danger delete-product" data-product-id="${product.id}">Delete</button>
                    <button class="btn btn-warning update-product" data-toggle="modal" data-target="#updateProductModal" data-product-id="${product.id}">Update</button>
                </div>
            </div>
        `;
        productList.appendChild(card);
    });
};
