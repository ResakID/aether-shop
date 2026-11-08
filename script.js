/* =========================================
   1. ЛОГИКА КОРЗИНЫ
   ========================================= */
let cart = []; // Массив для хранения товаров

const cartBtn = document.querySelector('.cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalPrice = document.getElementById('cart-total-price');
const addButtons = document.querySelectorAll('.add-to-cart');

// Открытие/закрытие корзины
function toggleCart() {
    cartModal.classList.toggle('active');
}

// Функция добавления товара
addButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Берем данные из карточки (название и цену)
        const card = button.closest('.bento-card');
        const title = card.querySelector('h3').textContent;
        const priceText = card.querySelector('.price').textContent;
        const price = parseInt(priceText.replace(/[^0-9]/g, '')); // Оставляем только цифры
        const img = card.querySelector('img').getAttribute('src');

        // Проверяем, есть ли уже такой товар в корзине
        const existingItem = cart.find(item => item.title === title);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ title, price, img, quantity: 1 });
        }

        updateCartUI();

        // Анимация кнопки
        button.textContent = 'Добавлено!';
        button.style.background = '#00f0ff';
        button.style.color = '#000';
        setTimeout(() => {
            button.textContent = 'В корзину';
            button.style.background = '';
            button.style.color = '';
        }, 1500);
    });
});

// Функция обновления интерфейса корзины
function updateCartUI() {
    // Считаем общее количество для шапки
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBtn.textContent = `Корзина (${totalCount})`;

    // Очищаем контейнер
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Корзина пока пуста...</p>';
        cartTotalPrice.textContent = '0';
        return;
    }

    // Отрисовываем товары
    let totalPrice = 0;
    cart.forEach((item, index) => {
        totalPrice += item.price * item.quantity;

        const itemHTML = `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title} <span style="color:#888; font-size:12px;">(x${item.quantity})</span></div>
                    <div class="cart-item-price">${item.price * item.quantity} ₽</div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">&times;</button>
            </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
    });

    cartTotalPrice.textContent = totalPrice;
}

// Удаление товара
function removeFromCart(index) {
    cart.splice(index, 1); // Удаляем 1 элемент по индексу
    updateCartUI();
}

// Оформление заказа
function checkout() {
    if (cart.length === 0) {
        alert("Ваша корзина пуста! Добавьте товары перед оформлением.");
        return;
    }
    
    // Имитация оформления заказа
    alert(`Спасибо за заказ! Сумма к оплате: ${cartTotalPrice.textContent} ₽.\n(Это демо-версия магазина, реальная оплата не подключена)`);
    
    // Очищаем корзину
    cart = [];
    updateCartUI();
    toggleCart();
}

/* =========================================
   2. КАСКАДНАЯ АНИМАЦИЯ ВЫЛЕТА
   ========================================= */
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const sectionsToAnimate = document.querySelectorAll('.bestsellers, .features, .reviews, .site-footer');

sectionsToAnimate.forEach(section => {
    section.classList.add('anim-section');
    observer.observe(section); 
});