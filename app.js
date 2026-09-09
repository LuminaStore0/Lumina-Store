const PHONE_NUMBER = "258840000000";
const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/SEU_LINK_DO_GRUPO";

let cart = [];

const productGrid = document.getElementById('product-grid');
const cartBtn = document.getElementById('cart-btn');
const closeCart = document.getElementById('close-cart');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderProducts(category = 'todos') {
    productGrid.innerHTML = '';
    const filtered = category === 'todos' ? products : products.filter(p => p.category === category);

    filtered.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${product.price.toFixed(2)} MT</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) { existing.quantity += 1; } else { cart.push({ ...product, quantity: 1 }); }
    updateCart();
}

function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <small>${item.quantity}x - ${item.price.toFixed(2)} MT</small>
            </div>
            <strong>${(item.price * item.quantity).toFixed(2)} MT</strong>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartCount.innerText = count;
    cartTotal.innerText = `${total.toFixed(2)} MT`;
}

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) { alert("Seu carrinho está vazio!"); return; }
    let message = "Olá! Gostaria de fazer o seguinte pedido:\n\n";
    let total = 0;
    cart.forEach(item => {
        message += `• ${item.name} (x${item.quantity}) - ${(item.price * item.quantity).toFixed(2)} MT\n`;
        total += item.price * item.quantity;
    });
    message += `\n*Total:* ${total.toFixed(2)} MT\n\n`;
    message += `Link do Grupo: ${WHATSAPP_GROUP_LINK}`;
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderProducts(e.target.dataset.category);
    });
});

cartBtn.addEventListener('click', () => cartModal.classList.add('active'));
closeCart.addEventListener('click', () => cartModal.classList.remove('active'));
renderProducts();