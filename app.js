function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    grid.innerHTML = '';
    products.forEach(product => {
        grid.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" class="product-img" alt="${product.name}">
                <div class="product-title">${product.name}</div>
                <div class="product-price">MT ${product.price}</div>
                <button class="btn-buy" onclick="buyProduct('${product.name}', ${product.price})">
                    <i class="fas fa-shopping-cart"></i> Comprar
                </button>
            </div>
        `;
    });
}

function switchTab(tabName, btnElement) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`tab-${tabName}`).classList.add('active');
    btnElement.classList.add('active');
}

function buyProduct(name, price) {
    const phone = "258840000000";
    const message = `Olá! Gostaria de comprar o item na Lumina Store:\n\n*Produto:* ${name}\n*Valor:* MT ${price}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

document.addEventListener('DOMContentLoaded', renderProducts);