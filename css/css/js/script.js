// Variáveis globais
let cart = [];
let cartTotal = 0;

// Seletores do DOM
const cartLink = document.getElementById('cart-link');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartSection = document.getElementById('carrinho');
const checkoutBtn = document.getElementById('checkout-btn');

// Adiciona produto ao carrinho
function addToCart(productId, productName, productPrice, size, color) {
    // Verifica se o produto já existe no carrinho
    const existingProduct = cart.find(item => item.id === productId && item.size === size && item.color === color);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1, size, color });
    }
    
    // Atualiza o carrinho
    updateCart();
}

// Atualiza a exibição do carrinho
function updateCart() {
    // Atualiza o número de itens no carrinho
    cartLink.textContent = `Carrinho (${cart.reduce((total, item) => total + item.quantity, 0)})`;
    
    // Atualiza os itens no carrinho
    cartItemsContainer.innerHTML = '';
    cartTotal = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <p>${item.name} - R$${item.price.toFixed(2)} x ${item.quantity} (Tamanho: ${item.size}, Cor: ${item.color})</p>
        `;
        cartItemsContainer.appendChild(itemElement);

        cartTotal += item.price * item.quantity;
    });

    // Atualiza o total do carrinho
    cartTotalElement.textContent = cartTotal.toFixed(2);

    // Exibe ou esconde a seção do carrinho
    cartSection.style.display = cart.length > 0 ? 'block' : 'none';

    // Salva o carrinho no LocalStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Função para finalizar a compra (apenas para demonstrar)
function checkout() {
    alert(`Total da compra: R$${cartTotal.toFixed(2)}`);
    cart = [];  // Limpa o carrinho após a compra
    updateCart();
    
}

// Adiciona eventos aos botões de "Adicionar ao Carrinho"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const product = this.closest('.produto');
        const productId = product.getAttribute('data-id');
        const productName = product.querySelector('h3').textContent;
        const productPrice = parseFloat(product.querySelector('p').textContent.replace('Preço: R$', '').replace(',', '.'));
        const size = product.querySelector('#size') ? product.querySelector('#size').value : 'M'; // Default size
        const color = product.querySelector('#color') ? product.querySelector('#color').value : 'blue'; // Default color

        addToCart(productId, productName, productPrice, size, color);
    });
});

// Evento de clique para finalizar a compra
checkoutBtn.addEventListener('click', checkout);

// Recuperar o carrinho do LocalStorage, caso exista
cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCart(); // Atualiza o carrinho ao carregar a página

// Adicionar produto ao carrinho com variações de tamanho e cor
document.querySelector(".btn").addEventListener("click", function() {
    const size = document.getElementById("size").value;
    const color = document.getElementById("color").value;
    
    // Aqui você pode adicionar a lógica para adicionar o produto com a variação ao carrinho
    alert("Produto Adicionado: " + size + " - " + color);
});

// Adiciona a funcionalidade de remover produtos do carrinho
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Atualiza a exibição do carrinho
function updateCart() {
    cartLink.textContent = `Carrinho (${cart.length})`;
    cartItemsContainer.innerHTML = '';
    cartTotal = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>R$${item.price.toFixed(2)} x ${item.quantity}</p>
                <p>Tamanho: ${item.size} | Cor: ${item.color}</p>
            </div>
            <button onclick="removeFromCart(${item.id})">Remover</button>
        `;
        cartItemsContainer.appendChild(itemElement);

        cartTotal += item.price * item.quantity;
    });

    cartTotalElement.textContent = cartTotal.toFixed(2);
    cartSection.style.display = cart.length > 0 ? 'block' : 'none';
}

const searchBtn = document.getElementById('search-btn');
const searchBar = document.getElementById('search-bar');

searchBtn.addEventListener('click', function () {
    const query = searchBar.value;
    if (query) {
        alert(`Buscando por: ${query}`);
        // Aqui você pode implementar uma lógica para buscar produtos no seu banco de dados
    }
});