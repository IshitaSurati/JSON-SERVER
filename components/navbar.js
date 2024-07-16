const loadNavbar = async () => {
    const navbar = document.createElement('nav');
    navbar.classList.add('navbar', 'navbar-expand-lg', 'navbar-light', 'bg-light');
    navbar.innerHTML = `
        <a class="navbar-brand" href="/index.html">Home</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="/pages/signup.html">Signup</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/pages/login.html">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/pages/addProduct.html">Add Product</a>
                </li>
            </ul>
        </div>
    `;
    document.getElementById('navbar').appendChild(navbar);
};

document.addEventListener('DOMContentLoaded', loadNavbar);