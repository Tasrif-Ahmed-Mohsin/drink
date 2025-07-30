// 2Go Juice Website - Modern JavaScript 2025

// Product Data - Updated for 2Go
const products = {
    1: { 
        name: 'Pineapple Juice', 
        price: 60, 
        description: 'Fresh pineapple juice with tropical sweetness',
        size: '250ml',
        category: 'citrus'
    },
    2: { 
        name: 'Gold Coffee', 
        price: 90, 
        description: 'Premium coffee blend with rich golden flavor',
        size: '250ml',
        category: 'coffee'
    },
    3: { 
        name: 'Watermelon Juice', 
        price: 60, 
        description: 'Refreshing watermelon juice, perfect for summer',
        size: '250ml',
        category: 'fruit'
    },
    4: { 
        name: 'Lemon + Guava Mix', 
        price: 50, 
        description: 'Zesty lemon mixed with tropical guava',
        size: '250ml',
        category: 'mixed'
    },
    5: { 
        name: 'Mango + Milk Mix', 
        price: 70, 
        description: 'Creamy mango milkshake with natural sweetness',
        size: '250ml',
        category: 'mixed'
    },
    6: { 
        name: 'Berry Mix', 
        price: 65, 
        description: 'Antioxidant-rich blend of mixed berries',
        size: '250ml',
        category: 'berry'
    }
};

// Application State
class TwoGoApp {
    constructor() {
        this.cart = [];
        this.searchResults = [];
        this.isLoading = false;
        this.searchTimeout = null;
        
        // DOM Elements
        this.elements = {
            // Navigation
            navToggle: document.getElementById('nav-toggle'),
            navMenu: document.getElementById('nav-menu'),
            navLinks: document.querySelectorAll('.nav__link'),
            header: document.querySelector('.header'),
            
            // Search
            searchInput: document.getElementById('search-input'),
            searchBtn: document.getElementById('search-btn'),
            searchResults: document.getElementById('search-results'),
            
            // Cart
            cartIcon: document.getElementById('nav-cart'),
            cartCount: document.getElementById('cart-count'),
            cartDropdown: document.getElementById('cart-dropdown'),
            cartClose: document.getElementById('cart-close'),
            cartContent: document.getElementById('cart-content'),
            cartEmpty: document.getElementById('cart-empty'),
            cartFooter: document.getElementById('cart-footer'),
            cartTotal: document.getElementById('cart-total'),
            
            // Products
            productCards: document.querySelectorAll('.product-card'),
            addToCartButtons: document.querySelectorAll('.add-to-cart-btn'),
            quantitySelectors: document.querySelectorAll('.quantity-selector'),
            
            // Newsletter
            newsletterForm: document.getElementById('newsletter-form'),
            newsletterEmail: document.getElementById('newsletter-email'),
            
            // Other
            heroCta: document.getElementById('hero-cta')
        };
        
        this.init();
    }
    
    init() {
        console.log('🥤 2Go - Fresh juice experience loading...');
        
        this.setupEventListeners();
        this.initializeAnimations();
        this.initializeIntersectionObserver();
        this.updateCartDisplay();
        
        // Welcome message
        setTimeout(() => {
            document.body.classList.add('loaded');
            this.showNotification('Welcome to 2Go! 🌱 Fresh juices made daily', 'success');
        }, 500);
    }
    
    setupEventListeners() {
        // Navigation
        this.elements.navToggle?.addEventListener('click', () => this.toggleMobileMenu());
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
        
        // Search
        this.elements.searchInput?.addEventListener('input', (e) => this.handleSearchInput(e));
        this.elements.searchInput?.addEventListener('focus', () => this.handleSearchFocus());
        this.elements.searchBtn?.addEventListener('click', () => this.performSearch());
        
        // Cart
        this.elements.cartIcon?.addEventListener('click', () => this.toggleCartDropdown());
        this.elements.cartClose?.addEventListener('click', () => this.closeCartDropdown());
        
        // Hero Actions
        this.elements.heroCta?.addEventListener('click', (e) => this.scrollToSection(e, '#products'));
        
        // Product Actions
        this.elements.addToCartButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleAddToCart(e));
        });
        
        // Quantity Selectors
        this.initializeQuantitySelectors();
        
        // Newsletter
        this.elements.newsletterForm?.addEventListener('submit', (e) => this.handleNewsletterSubmit(e));
        
        // Scroll Events
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Click outside to close dropdowns
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }
    
    // Navigation Methods
    toggleMobileMenu() {
        const isActive = this.elements.navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = this.elements.navToggle.querySelectorAll('span');
        if (isActive) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? 'hidden' : '';
    }
    
    handleNavClick(e) {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        
        if (href?.startsWith('#')) {
            this.scrollToSection(e, href);
            this.updateActiveNavLink(e.currentTarget);
            
            // Close mobile menu
            this.elements.navMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset hamburger
            const spans = this.elements.navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    }
    
    scrollToSection(e, targetId) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = this.elements.header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            this.showNotification(`Navigating to ${targetSection.querySelector('h1, h2')?.textContent || 'section'} 🧭`, 'info');
        }
    }
    
    updateActiveNavLink(activeLink) {
        this.elements.navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
    
    handleScroll() {
        // Header scroll effect
        const scrollY = window.scrollY;
        if (scrollY > 100) {
            this.elements.header.classList.add('scrolled');
        } else {
            this.elements.header.classList.remove('scrolled');
        }
        
        // Update active nav based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.elements.navLinks.forEach(link => link.classList.remove('active'));
                correspondingLink?.classList.add('active');
            }
        });
    }
    
    // Search Methods
    handleSearchInput(e) {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length === 0) {
            this.hideSearchResults();
            return;
        }
        
        if (query.length < 2) return;
        
        // Debounce search
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.performSearchQuery(query);
        }, 300);
    }
    
    handleSearchFocus() {
        const query = this.elements.searchInput.value.toLowerCase().trim();
        if (query.length >= 2) {
            this.performSearchQuery(query);
        }
    }
    
    performSearchQuery(query) {
        this.searchResults = Object.values(products).filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
        
        this.displaySearchResults(query);
    }
    
    displaySearchResults(query = '') {
        if (this.searchResults.length === 0) {
            this.elements.searchResults.innerHTML = `
                <div style="padding: 1rem; text-align: center; color: var(--color-text-secondary);">
                    <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 0.5rem; opacity: 0.5;"></i>
                    <p>No juices found for "${query}"</p>
                    <p style="font-size: 0.9rem; margin-top: 0.5rem;">Try searching for "pineapple", "coffee", or "berry"</p>
                </div>
            `;
        } else {
            this.elements.searchResults.innerHTML = this.searchResults.map(product => {
                const productId = Object.keys(products).find(key => products[key] === product);
                return `
                    <div class="search-result-item" data-product-id="${productId}">
                        <h4 style="margin: 0 0 0.5rem 0; color: var(--color-text);">${product.name}</h4>
                        <p style="margin: 0; font-size: 0.9rem; color: var(--color-text-secondary);">${product.description}</p>
                        <div style="margin-top: 0.5rem; display: flex; align-items: center; justify-content: space-between;">
                            <span style="font-weight: 600; color: var(--color-primary);">${product.price} BDT</span>
                            <span style="font-size: 0.8rem; background: var(--color-accent); padding: 0.2rem 0.5rem; border-radius: var(--radius-full); color: var(--color-secondary);">${product.size}</span>
                        </div>
                    </div>
                `;
            }).join('');
            
            // Add click events to search results
            this.elements.searchResults.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    const productId = item.getAttribute('data-product-id');
                    const productCard = document.querySelector(`[data-product="${productId}"]`);
                    if (productCard) {
                        this.hideSearchResults();
                        this.elements.searchInput.value = '';
                        productCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        this.showNotification(`Found ${products[productId].name}! 🎯`, 'success');
                        
                        // Highlight the product card
                        productCard.style.borderColor = 'var(--color-primary)';
                        productCard.style.boxShadow = '0 0 0 4px rgba(231, 76, 60, 0.2)';
                        setTimeout(() => {
                            productCard.style.borderColor = '';
                            productCard.style.boxShadow = '';
                        }, 2000);
                    }
                });
            });
        }
        
        this.elements.searchResults.classList.add('active');
    }
    
    hideSearchResults() {
        this.elements.searchResults.classList.remove('active');
    }
    
    performSearch() {
        const query = this.elements.searchInput.value.toLowerCase().trim();
        if (query) {
            this.performSearchQuery(query);
            this.showNotification(`Searching for "${query}"... 🔍`, 'info');
        } else {
            this.showNotification('Please enter a search term 🔍', 'warning');
            this.elements.searchInput.focus();
        }
    }
    
    // Cart Methods
    toggleCartDropdown() {
        const isActive = this.elements.cartDropdown.classList.toggle('active');
        
        if (isActive) {
            this.updateCartDropdownContent();
            this.showNotification('Cart opened 🛒', 'info');
        }
    }
    
    closeCartDropdown() {
        this.elements.cartDropdown.classList.remove('active');
    }
    
    updateCartDropdownContent() {
        if (this.cart.length === 0) {
            this.elements.cartEmpty.style.display = 'block';
            this.elements.cartFooter.style.display = 'none';
            this.elements.cartContent.innerHTML = this.elements.cartEmpty.outerHTML;
        } else {
            this.elements.cartEmpty.style.display = 'none';
            this.elements.cartFooter.style.display = 'block';
            
            const cartItemsHTML = this.cart.map(item => `
                <div class="cart-item" data-item-id="${item.id}">
                    <div class="cart-item__image">
                        <i class="fas fa-glass-whiskey"></i>
                    </div>
                    <div class="cart-item__details">
                        <div class="cart-item__name">${item.name}</div>
                        <div class="cart-item__price">${item.price} BDT each</div>
                        <div class="cart-item__quantity">
                            <span>Qty: ${item.quantity}</span>
                            <span style="margin-left: 1rem; font-weight: 600;">${item.price * item.quantity} BDT</span>
                        </div>
                    </div>
                    <button class="cart-item__remove" onclick="window.twoGoApp.removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
            
            this.elements.cartContent.innerHTML = cartItemsHTML;
            
            const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            this.elements.cartTotal.textContent = `${total} BDT`;
        }
    }
    
    removeFromCart(productId) {
        const itemIndex = this.cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            const removedItem = this.cart[itemIndex];
            this.cart.splice(itemIndex, 1);
            this.updateCartDisplay();
            this.updateCartDropdownContent();
            this.showNotification(`${removedItem.name} removed from cart 🗑️`, 'info');
        }
    }
    
    // Product Methods
    handleAddToCart(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const button = e.currentTarget;
        const productId = parseInt(button.getAttribute('data-product-id'));
        const productData = products[productId];
        const quantityInput = button.closest('.product-card').querySelector('.qty-input');
        const quantity = parseInt(quantityInput?.value || 1);
        
        if (!productData) {
            this.showNotification('Product not found! 😕', 'error');
            return;
        }
        
        // Add loading state
        this.setButtonLoading(button, true);
        
        // Simulate processing delay
        setTimeout(() => {
            this.addProductToCart({
                id: productId,
                name: productData.name,
                price: productData.price,
                description: productData.description,
                quantity: quantity
            });
            
            this.setButtonLoading(button, false);
            this.animateCartIcon();
            
            // Show success state
            this.setButtonSuccess(button);
            
        }, 800);
    }
    
    addProductToCart(product) {
        const existingProduct = this.cart.find(item => item.id === product.id);
        
        if (existingProduct) {
            existingProduct.quantity += product.quantity;
            this.showNotification(`${product.name} quantity updated! Now ${existingProduct.quantity} in cart 🛒`, 'success');
        } else {
            this.cart.push(product);
            this.showNotification(`${product.name} added to cart! 🥤`, 'success');
        }
        
        this.updateCartDisplay();
        this.saveCartToStorage();
    }
    
    updateCartDisplay() {
        const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
        
        if (this.elements.cartCount) {
            this.elements.cartCount.textContent = totalItems;
            
            if (totalItems > 0) {
                this.elements.cartCount.classList.add('active');
            } else {
                this.elements.cartCount.classList.remove('active');
            }
        }
    }
    
    animateCartIcon() {
        this.elements.cartIcon?.classList.add('bounce');
        setTimeout(() => {
            this.elements.cartIcon?.classList.remove('bounce');
        }, 600);
    }
    
    setButtonLoading(button, isLoading) {
        if (isLoading) {
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Adding...</span>';
            button.style.background = 'var(--color-accent)';
        } else {
            button.disabled = false;
        }
    }
    
    setButtonSuccess(button) {
        const originalContent = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> <span>Added!</span>';
        button.style.background = 'var(--color-secondary)';
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-cart-plus"></i> <span>Add to Cart</span>';
            button.style.background = '';
        }, 2000);
    }
    
    // Quantity Selector Methods
    initializeQuantitySelectors() {
        this.elements.quantitySelectors.forEach(selector => {
            const minusBtn = selector.querySelector('.qty-minus');
            const plusBtn = selector.querySelector('.qty-plus');
            const input = selector.querySelector('.qty-input');
            
            minusBtn?.addEventListener('click', () => {
                const currentValue = parseInt(input.value);
                if (currentValue > 1) {
                    input.value = currentValue - 1;
                    this.animateQuantityChange(input);
                }
            });
            
            plusBtn?.addEventListener('click', () => {
                const currentValue = parseInt(input.value);
                if (currentValue < 10) {
                    input.value = currentValue + 1;
                    this.animateQuantityChange(input);
                }
            });
            
            input?.addEventListener('change', (e) => {
                let value = parseInt(e.target.value);
                if (isNaN(value) || value < 1) value = 1;
                if (value > 10) value = 10;
                e.target.value = value;
            });
        });
    }
    
    animateQuantityChange(input) {
        input.style.transform = 'scale(1.1)';
        input.style.background = 'var(--color-accent)';
        setTimeout(() => {
            input.style.transform = '';
            input.style.background = '';
        }, 150);
    }
    
    // Newsletter Methods
    handleNewsletterSubmit(e) {
        e.preventDefault();
        
        const email = this.elements.newsletterEmail?.value.trim();
        const submitButton = this.elements.newsletterForm?.querySelector('button[type="submit"]');
        
        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address 📧', 'error');
            this.elements.newsletterEmail?.focus();
            return;
        }
        
        // Add loading state
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Subscribing...</span>';
        }
        
        // Simulate API call
        setTimeout(() => {
            this.elements.newsletterEmail.value = '';
            
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = '<span>Subscribe</span> <i class="fas fa-paper-plane"></i>';
            }
            
            this.showNotification('Welcome to the 2Go family! 🥤 Check your email for exclusive offers.', 'success');
            this.createConfetti();
        }, 1500);
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Animation Methods
    initializeAnimations() {
        // Add entrance animations to elements
        const animatedElements = document.querySelectorAll('.product-card, .feature-card, .feature-highlight');
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.transitionDelay = `${index * 0.1}s`;
        });
    }
    
    initializeIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add special effects for product cards
                    if (entry.target.classList.contains('product-card')) {
                        entry.target.style.borderColor = 'var(--color-primary)';
                        setTimeout(() => {
                            entry.target.style.borderColor = '';
                        }, 1000);
                    }
                }
            });
        }, options);
        
        // Observe all animated elements
        const elementsToObserve = document.querySelectorAll('.product-card, .feature-card, .feature-highlight');
        elementsToObserve.forEach(el => observer.observe(el));
    }
    
    // Utility Methods
    handleOutsideClick(e) {
        // Close search results when clicking outside
        if (!e.target.closest('.nav__search')) {
            this.hideSearchResults();
        }
        
        // Close cart dropdown when clicking outside
        if (!e.target.closest('.nav__cart') && !e.target.closest('.cart-dropdown')) {
            this.closeCartDropdown();
        }
        
        // Close mobile menu when clicking outside
        if (!e.target.closest('.nav__menu') && !e.target.closest('.nav__toggle')) {
            this.elements.navMenu?.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset hamburger
            const spans = this.elements.navToggle?.querySelectorAll('span');
            spans?.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    }
    
    handleKeyboard(e) {
        // ESC key closes search, cart, and mobile menu
        if (e.key === 'Escape') {
            this.hideSearchResults();
            this.closeCartDropdown();
            this.elements.navMenu?.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Enter key in search
        if (e.key === 'Enter' && e.target === this.elements.searchInput) {
            this.performSearch();
        }
    }
    
    saveCartToStorage() {
        try {
            console.log('Cart saved:', this.cart);
        } catch (e) {
            console.log('Storage not available, cart state maintained in memory');
        }
    }
    
    // Notification System
    showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'leaf'
        };
        
        const colors = {
            success: 'var(--color-secondary)',
            error: 'var(--color-primary)',
            warning: '#E6C47C',
            info: 'var(--color-secondary)'
        };
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <i class="fas fa-${icons[type]}" style="font-size: 1.2rem;"></i>
                <span style="flex: 1;">${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: inherit; cursor: pointer; padding: 0.25rem; border-radius: var(--radius-sm); opacity: 0.7;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Enhanced styling
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: colors[type],
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: '10000',
            maxWidth: '400px',
            minWidth: '300px',
            transform: 'translateX(100%)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            backdropFilter: 'blur(10px)',
            fontSize: '0.95rem',
            fontWeight: '500',
            border: `1px solid ${colors[type]}`
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 400);
        }, duration);
    }
    
    createConfetti() {
        const colors = ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-accent)', '#E6C47C', '#7DBDBA'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            
            Object.assign(confetti.style, {
                position: 'fixed',
                top: '20%',
                left: '50%',
                width: '8px',
                height: '8px',
                background: colors[Math.floor(Math.random() * colors.length)],
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: '10001',
                transform: `translateX(${(Math.random() - 0.5) * 300}px)`,
                animation: 'confetti-fall 3s ease-out forwards'
            });
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }
}

// CSS Animations (injected via JavaScript)
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes confetti-fall {
        0% {
            transform: translateY(0) rotateZ(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(500px) rotateZ(720deg);
            opacity: 0;
        }
    }
    
    .loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease-out;
    }
    
    /* Enhanced hover states */
    .product-card:hover .pineapple-bg {
        background: linear-gradient(135deg, #FFE135, #FFF2CC) !important;
    }
    
    .product-card:hover .coffee-bg {
        background: linear-gradient(135deg, #8B4513, #D2691E) !important;
    }
    
    .product-card:hover .watermelon-bg {
        background: linear-gradient(135deg, #FF69B4, #FFB6C1) !important;
    }
    
    .product-card:hover .lemon-guava-bg {
        background: linear-gradient(135deg, #32CD32, #98FB98) !important;
    }
    
    .product-card:hover .mango-milk-bg {
        background: linear-gradient(135deg, #FFB347, #FFDAB9) !important;
    }
    
    .product-card:hover .berry-bg {
        background: linear-gradient(135deg, #9370DB, #DDA0DD) !important;
    }
    
    .nav__link:hover span {
        transform: scale(1.05);
        transition: transform var(--transition-fast);
    }
    
    .btn:hover {
        transform: translateY(-2px);
    }
    
    /* Loading states */
    .loading {
        opacity: 0.7;
        pointer-events: none;
    }
    
    /* Cart item styles */
    .cart-item {
        display: flex;
        align-items: center;
        gap: var(--space-md);
        padding: var(--space-md) var(--space-lg);
        border-bottom: 1px solid var(--color-border);
    }

    .cart-item__image {
        width: 50px;
        height: 50px;
        background: var(--color-accent);
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-primary);
        font-size: 1.2rem;
    }

    .cart-item__details {
        flex: 1;
    }

    .cart-item__name {
        font-weight: var(--font-weight-medium);
        margin-bottom: var(--space-xs);
    }

    .cart-item__price {
        color: var(--color-text-secondary);
        font-size: 0.9rem;
    }

    .cart-item__quantity {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        margin-top: var(--space-xs);
    }

    .cart-item__remove {
        background: none;
        border: none;
        color: var(--color-primary);
        cursor: pointer;
        padding: var(--space-xs);
        border-radius: var(--radius-sm);
        transition: all var(--transition-fast);
    }

    .cart-item__remove:hover {
        background: rgba(231, 76, 60, 0.2);
    }
`;

document.head.appendChild(styleSheet);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.twoGoApp = new TwoGoApp();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('🥤 2Go page hidden');
    } else {
        console.log('🥤 Welcome back to 2Go!');
        if (window.twoGoApp) {
            window.twoGoApp.showNotification('Welcome back! Your fresh juice adventure continues 🥤', 'info');
        }
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('🚨 2Go error:', e.error);
    if (window.twoGoApp) {
        window.twoGoApp.showNotification('Oops! Something went wrong. Please refresh and try again. 🔄', 'error');
    }
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('🚨 Unhandled promise rejection:', e.reason);
    if (window.twoGoApp) {
        window.twoGoApp.showNotification('Something unexpected happened. Please try again. 🥤', 'error');
    }
    e.preventDefault();
});

// Easter egg - double click on logo
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.nav__brand');
    if (logo) {
        let clickCount = 0;
        logo.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 2) {
                if (window.twoGoApp) {
                    window.twoGoApp.showNotification('🥤✨ You found the 2Go secret! Enjoy 15% off your next order with code 2GO15', 'success');
                    window.twoGoApp.createConfetti();
                }
                clickCount = 0;
            }
            setTimeout(() => clickCount = 0, 500);
        });
    }
});

console.log('🥤 2Go Juice 2025 - Fresh, Natural, and ready to Go! ✨');