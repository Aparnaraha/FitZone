// Shopping cart system for the fitness platform

class ShoppingCart {
    constructor() {
        this.items = [];
        this.isOpen = false;
        this.init();
    }
    
    init() {
        // Load cart from localStorage
        const savedCart = utils.storage.get('cart');
        if (savedCart) {
            this.items = savedCart;
        }
        
        this.bindEvents();
        this.updateCartUI();
    }
    
    bindEvents() {
        // Cart toggle
        const cartBtn = document.getElementById('cart-btn');
        const closeCartBtn = document.getElementById('close-cart');
        const cartSidebar = document.getElementById('cart-sidebar');
        
        if (cartBtn) {
            cartBtn.addEventListener('click', () => this.toggleCart());
        }
        
        if (closeCartBtn) {
            closeCartBtn.addEventListener('click', () => this.closeCart());
        }
        
        // Close cart when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && cartSidebar && !cartSidebar.contains(e.target) && !e.target.closest('#cart-btn')) {
                this.closeCart();
            }
        });
        
        // Add to cart buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
                const btn = e.target.classList.contains('add-to-cart') ? e.target : e.target.closest('.add-to-cart');
                const productId = parseInt(btn.dataset.productId);
                this.addItem(productId);
            }
        });
        
        // Cart item controls
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item')) {
                const itemId = parseInt(e.target.dataset.itemId);
                this.removeItem(itemId);
            }
            
            if (e.target.classList.contains('quantity-increase')) {
                const itemId = parseInt(e.target.dataset.itemId);
                this.updateQuantity(itemId, 1);
            }
            
            if (e.target.classList.contains('quantity-decrease')) {
                const itemId = parseInt(e.target.dataset.itemId);
                this.updateQuantity(itemId, -1);
            }
        });
        
        // Checkout button
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('checkout-btn')) {
                this.checkout();
            }
        });
    }
    
    addItem(productId) {
        const product = mockData.products.find(p => p.id === productId);
        if (!product) return;
        
        const existingItem = this.items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartUI();
        utils.showNotification(`${product.name} added to cart!`, 'success');
        
        // Animate cart button
        this.animateCartButton();
    }
    
    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateCartUI();
        utils.showNotification('Item removed from cart', 'info');
    }
    
    updateQuantity(itemId, change) {
        const item = this.items.find(item => item.id === itemId);
        if (!item) return;
        
        item.quantity += change;
        
        if (item.quantity <= 0) {
            this.removeItem(itemId);
            return;
        }
        
        this.saveCart();
        this.updateCartUI();
    }
    
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartUI();
        utils.showNotification('Cart cleared', 'info');
    }
    
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }
    
    saveCart() {
        utils.storage.set('cart', this.items);
    }
    
    toggleCart() {
        if (this.isOpen) {
            this.closeCart();
        } else {
            this.openCart();
        }
    }
    
    openCart() {
        const cartSidebar = document.getElementById('cart-sidebar');
        if (cartSidebar) {
            cartSidebar.classList.add('active');
            this.isOpen = true;
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeCart() {
        const cartSidebar = document.getElementById('cart-sidebar');
        if (cartSidebar) {
            cartSidebar.classList.remove('active');
            this.isOpen = false;
            document.body.style.overflow = '';
        }
    }
    
    updateCartUI() {
        this.updateCartBadge();
        this.updateCartContent();
        this.updateCartTotal();
    }
    
    updateCartBadge() {
        let cartBadge = document.querySelector('.cart-badge');
        const cartBtn = document.getElementById('cart-btn');
        
        if (!cartBtn) return;
        
        const itemCount = this.getItemCount();
        
        if (itemCount > 0) {
            if (!cartBadge) {
                cartBadge = document.createElement('span');
                cartBadge.className = 'cart-badge';
                cartBadge.style.cssText = `
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    background: var(--error);
                    color: var(--white);
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: var(--font-size-xs);
                    font-weight: 700;
                `;
                cartBtn.appendChild(cartBadge);
            }
            cartBadge.textContent = itemCount;
        } else if (cartBadge) {
            cartBadge.remove();
        }
    }
    
    updateCartContent() {
        const cartContent = document.getElementById('cart-content');
        if (!cartContent) return;
        
        if (this.items.length === 0) {
            cartContent.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <button class="btn-primary" onclick="showPage('shop')">Start Shopping</button>
                </div>
            `;
            
            const emptyCart = cartContent.querySelector('.empty-cart');
            emptyCart.style.cssText = `
                text-align: center;
                padding: var(--spacing-2xl);
                color: var(--gray-600);
            `;
            
            const icon = emptyCart.querySelector('i');
            icon.style.cssText = `
                font-size: var(--font-size-4xl);
                color: var(--gray-400);
                margin-bottom: var(--spacing-md);
                display: block;
            `;
            
            return;
        }
        
        cartContent.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-price">${utils.formatCurrency(item.price)}</p>
                    <div class="cart-item-controls">
                        <button class="quantity-btn quantity-decrease" data-item-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn quantity-increase" data-item-id="${item.id}">+</button>
                        <button class="remove-item" data-item-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add styles to cart items
        const cartItems = cartContent.querySelectorAll('.cart-item');
        cartItems.forEach(item => {
            item.style.cssText = `
                display: flex;
                gap: var(--spacing-md);
                padding: var(--spacing-md);
                border-bottom: 1px solid var(--gray-200);
            `;
            
            const image = item.querySelector('.cart-item-image');
            image.style.cssText = `
                width: 60px;
                height: 60px;
                object-fit: cover;
                border-radius: var(--radius-md);
            `;
            
            const details = item.querySelector('.cart-item-details');
            details.style.cssText = `
                flex: 1;
            `;
            
            const name = item.querySelector('.cart-item-name');
            name.style.cssText = `
                font-size: var(--font-size-sm);
                font-weight: 600;
                color: var(--gray-900);
                margin-bottom: var(--spacing-xs);
            `;
            
            const price = item.querySelector('.cart-item-price');
            price.style.cssText = `
                color: var(--primary);
                font-weight: 600;
                margin-bottom: var(--spacing-sm);
            `;
            
            const controls = item.querySelector('.cart-item-controls');
            controls.style.cssText = `
                display: flex;
                align-items: center;
                gap: var(--spacing-sm);
            `;
            
            const quantityBtns = controls.querySelectorAll('.quantity-btn');
            quantityBtns.forEach(btn => {
                btn.style.cssText = `
                    width: 30px;
                    height: 30px;
                    border: 1px solid var(--gray-300);
                    background: var(--white);
                    color: var(--gray-600);
                    border-radius: var(--radius-sm);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                `;
            });
            
            const removeBtn = controls.querySelector('.remove-item');
            removeBtn.style.cssText = `
                background: none;
                border: none;
                color: var(--error);
                cursor: pointer;
                padding: var(--spacing-xs);
                margin-left: auto;
            `;
        });
    }
    
    updateCartTotal() {
        const cartTotal = document.getElementById('cart-total');
        if (cartTotal) {
            cartTotal.textContent = utils.formatCurrency(this.getTotal());
        }
    }
    
    animateCartButton() {
        const cartBtn = document.getElementById('cart-btn');
        if (cartBtn) {
            cartBtn.style.animation = 'bounce 0.5s ease-in-out';
            setTimeout(() => {
                cartBtn.style.animation = '';
            }, 500);
        }
    }
    
    async checkout() {
        if (this.items.length === 0) {
            utils.showNotification('Your cart is empty', 'error');
            return;
        }
        
        if (!auth.isUserLoggedIn()) {
            utils.showNotification('Please log in to checkout', 'warning');
            showPage('login');
            return;
        }
        
        const checkoutBtn = document.querySelector('.checkout-btn');
        utils.showLoading(checkoutBtn, 'Processing...');
        
        try {
            // Simulate checkout process
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Clear cart and show success
            const orderTotal = this.getTotal();
            this.clearCart();
            this.closeCart();
            
            utils.showNotification(`Order placed successfully! Total: ${utils.formatCurrency(orderTotal)}`, 'success');
            
        } catch (error) {
            utils.showNotification('Checkout failed. Please try again.', 'error');
        } finally {
            utils.hideLoading(checkoutBtn);
        }
    }
}

// Initialize shopping cart
const cart = new ShoppingCart();

// Export cart instance
window.cart = cart;