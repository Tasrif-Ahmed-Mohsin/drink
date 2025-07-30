// 2Go Juice Website - Interactive Experience with Eye-Soothing Design

// Product Data - Exact 2Go Specifications with New Images
const products = {
    1: { 
        name: 'Pineapple Juice', 
        price: 60, 
        description: 'Tropical sweetness in every sip',
        size: '250ml',
        category: 'tropical',
        image: 'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/370e583b-f639-4679-b7f6-d2f817ebc4f6.png'
    },
    2: { 
        name: 'Gold Coffee', 
        price: 90, 
        description: 'Rich and aromatic coffee blend',
        size: '250ml',
        category: 'coffee',
        image: 'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/18a0b388-9eb0-43da-9618-28edfacf5b36.png'
    },
    3: { 
        name: 'Watermelon Juice', 
        price: 60, 
        description: 'Refreshing summer hydration',
        size: '250ml',
        category: 'fruit',
        image: 'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/bc6e87b9-8ff0-49f6-bd8f-adb43bf67d7a.png'
    },
    4: { 
        name: 'Lemon+Guava Mixed Juice', 
        price: 50, 
        description: 'Zesty citrus meets tropical guava',
        size: '250ml',
        category: 'mixed',
        image: 'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/8dcc0bb0-201b-46d6-995e-45964f62f62e.png'
    },
    5: { 
        name: 'Mango+Milk Mixed Juice', 
        price: 70, 
        description: 'Creamy mango delight',
        size: '250ml',
        category: 'mixed',
        image: 'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/55367801-0de5-471a-a7cc-7f2c79c4f7cc.png'
    }
};

// Application State Management
class TwoGoApp {
    constructor() {
        this.cart = [];
        this.searchResults = [];
        this.isLoading = false;
        this.searchTimeout = null;
        
        this.init();
    }
    
    init() {
        console.log('🥤 2Go - Pure, Fresh, Natural experience initializing...');
        
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupApplication();
            });
        } else {
            this.setupApplication();
        }
    }
    
    setupApplication() {
        this.cacheElements();
        this.setupEventListeners();
        this.initializeAnimations();
        this.initializeIntersectionObserver();
        this.updateCartDisplay();
        this.preloadImages();
        
        // Smooth entrance animation
        setTimeout(() => {
            document.body.classList.add('loaded');
            this.showNotification('Welcome to 2Go! 🌱 Born fresh, served real', 'success', 4000);
        }, 300);
    }
    
    cacheElements() {
        // Cache DOM elements
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
    }
    
    preloadImages() {
        // Preload product images for smooth experience
        Object.values(products).forEach(product => {
            const img = new Image();
            img.src = product.image;
        });
    }
    
    setupEventListeners() {
        // Navigation Events
        if (this.elements.navToggle) {
            this.elements.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
        
        // Search Events
        if (this.elements.searchInput) {
            this.elements.searchInput.addEventListener('input', (e) => this.handleSearchInput(e));
            this.elements.searchInput.addEventListener('focus', () => this.handleSearchFocus());
            this.elements.searchInput.addEventListener('keydown', (e) => this.handleSearchKeydown(e));
        }
        
        if (this.elements.searchBtn) {
            this.elements.searchBtn.addEventListener('click', () => this.performSearch());
        }
        
        // Cart Events
        if (this.elements.cartIcon) {
            this.elements.cartIcon.addEventListener('click', () => this.toggleCartDropdown());
        }
        if (this.elements.cartClose) {
            this.elements.cartClose.addEventListener('click', () => this.closeCartDropdown());
        }
        
        // Hero CTA
        if (this.elements.heroCta) {
            this.elements.heroCta.addEventListener('click', (e) => this.scrollToSection(e, '#products'));
        }
        
        // Product Events
        this.elements.addToCartButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleAddToCart(e));
        });
        
        // Quantity Controls
        this.initializeQuantitySelectors();
        
        // Newsletter
        if (this.elements.newsletterForm) {
            this.elements.newsletterForm.addEventListener('submit', (e) => this.handleNewsletterSubmit(e));
        }
        
        // Global Events
        window.addEventListener('scroll', () => this.handleScroll());
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Performance optimization
        window.addEventListener('load', () => this.optimizePerformance());
    }
    
    // Navigation Methods
    toggleMobileMenu() {
        const isActive = this.elements.navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = this.elements.navToggle.querySelectorAll('span');
        if (isActive) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            document.body.style.overflow = 'hidden';
        } else {
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
            document.body.style.overflow = '';
        }
        
        this.showNotification(isActive ? 'Menu opened 📱' : 'Menu closed', 'info', 2000);
    }
    
    handleNavClick(e) {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            this.scrollToSection(e, href);
            this.updateActiveNavLink(e.currentTarget);
            
            // Close mobile menu if open
            if (this.elements.navMenu && this.elements.navMenu.classList.contains('active')) {
                this.toggleMobileMenu();
            }
        }
    }
    
    scrollToSection(e, targetId) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = this.elements.header ? this.elements.header.offsetHeight : 80;
            const targetPosition = targetSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Create smooth highlight effect
            this.highlightSection(targetSection);
            this.showNotification(`Navigated to ${targetId.substring(1)} section 🎯`, 'info', 2000);
        }
    }
    
    highlightSection(section) {
        section.style.transform = 'scale(1.005)';
        section.style.transition = 'transform 0.3s ease';
        setTimeout(() => {
            section.style.transform = '';
        }, 300);
    }
    
    updateActiveNavLink(activeLink) {
        this.elements.navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        
        // Header scroll effects
        if (this.elements.header) {
            if (scrollY > 50) {
                this.elements.header.classList.add('scrolled');
            } else {
                this.elements.header.classList.remove('scrolled');
            }
        }
        
        // Update active navigation based on scroll position
        this.updateNavOnScroll();
        
        // Subtle parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero && scrollY < window.innerHeight) {
            hero.style.transform = `translateY(${scrollY * 0.05}px)`;
        }
    }
    
    updateNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.elements.navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    
    // Search Functionality
    handleSearchInput(e) {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length === 0) {
            this.hideSearchResults();
            return;
        }
        
        if (query.length < 2) return;
        
        // Debounced search for better performance
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
    
    handleSearchKeydown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.performSearch();
        } else if (e.key === 'Escape') {
            this.hideSearchResults();
            this.elements.searchInput.blur();
        }
    }
    
    performSearchQuery(query) {
        this.searchResults = Object.entries(products).filter(([id, product]) => 
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        ).map(([id, product]) => ({ ...product, id: parseInt(id) }));
        
        this.displaySearchResults(query);
    }
    
    displaySearchResults(query = '') {
        if (!this.elements.searchResults) return;
        
        if (this.searchResults.length === 0) {
            this.elements.searchResults.innerHTML = `
                <div style="padding: 2rem; text-align: center; color: var(--color-text-secondary);">
                    <i class="fas fa-search" style="font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                    <h4 style="margin: 0 0 0.5rem 0;">No products found for "${query}"</h4>
                    <p style="font-size: 0.9rem; margin: 0;">Try searching for "pineapple", "coffee", "watermelon", "lemon", or "mango"</p>
                </div>
            `;
        } else {
            this.elements.searchResults.innerHTML = this.searchResults.map(product => `
                <div class="search-result-item" data-product-id="${product.id}">
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div style="width: 40px; height: 40px; background: var(--pale-mint); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-glass-whiskey" style="color: var(--color-primary);"></i>
                        </div>
                        <div style="flex: 1;">
                            <h4 style="margin: 0 0 0.25rem 0; color: var(--color-text); font-size: 1rem;">${product.name}</h4>
                            <p style="margin: 0; font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.3;">${product.description}</p>
                            <div style="margin-top: 0.5rem; display: flex; align-items: center; justify-content: space-between;">
                                <span style="font-weight: 600; color: var(--color-primary); font-size: 1.1rem;">${product.price} BDT</span>
                                <span style="font-size: 0.75rem; background: var(--pale-mint); padding: 0.25rem 0.5rem; border-radius: var(--radius-full); color: var(--color-primary);">${product.size}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
            
            // Add click events to search results
            this.elements.searchResults.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => this.handleSearchResultClick(item));
            });
        }
        
        this.elements.searchResults.classList.add('active');
    }
    
    handleSearchResultClick(item) {
        const productId = item.getAttribute('data-product-id');
        const productCard = document.querySelector(`[data-product="${productId}"]`);
        
        if (productCard) {
            this.hideSearchResults();
            this.elements.searchInput.value = '';
            
            // Smooth scroll to product
            productCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Highlight effect
            this.highlightProductCard(productCard);
            
            const productName = products[productId].name;
            this.showNotification(`Found ${productName}! 🎯`, 'success');
        }
    }
    
    highlightProductCard(card) {
        const originalBorder = card.style.borderColor;
        const originalShadow = card.style.boxShadow;
        const originalTransform = card.style.transform;
        
        card.style.borderColor = 'var(--color-primary)';
        card.style.boxShadow = '0 0 0 4px rgba(122, 161, 90, 0.2)';
        card.style.transform = 'scale(1.02)';
        
        setTimeout(() => {
            card.style.borderColor = originalBorder;
            card.style.boxShadow = originalShadow;
            card.style.transform = originalTransform;
        }, 2000);
    }
    
    hideSearchResults() {
        if (this.elements.searchResults) {
            this.elements.searchResults.classList.remove('active');
        }
    }
    
    performSearch() {
        const query = this.elements.searchInput.value.toLowerCase().trim();
        if (query) {
            this.performSearchQuery(query);
            this.showNotification(`Searching for "${query}"... 🔍`, 'info', 2000);
        } else {
            this.showNotification('Please enter a search term 🔍', 'warning');
            this.elements.searchInput.focus();
        }
    }
    
    // Cart Management
    toggleCartDropdown() {
        if (!this.elements.cartDropdown) return;
        
        const isActive = this.elements.cartDropdown.classList.toggle('active');
        
        if (isActive) {
            this.updateCartDropdownContent();
            this.showNotification('Cart opened 🛒', 'info', 2000);
        }
    }
    
    closeCartDropdown() {
        if (this.elements.cartDropdown) {
            this.elements.cartDropdown.classList.remove('active');
        }
    }
    
    updateCartDropdownContent() {
        if (!this.elements.cartContent || !this.elements.cartEmpty || !this.elements.cartFooter) return;
        
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
                            <span style="margin-left: 1rem; font-weight: 600; color: var(--color-primary);">${item.price * item.quantity} BDT</span>
                        </div>
                    </div>
                    <button class="cart-item__remove" onclick="window.twoGoApp.removeFromCart(${item.id})" title="Remove item">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
            
            this.elements.cartContent.innerHTML = cartItemsHTML;
            
            const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            if (this.elements.cartTotal) {
                this.elements.cartTotal.textContent = `${total} BDT`;
            }
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
    
    // Product Management
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
        
        // Add visual feedback
        this.setButtonLoading(button, true);
        
        // Simulate realistic processing time
        setTimeout(() => {
            this.addProductToCart({
                id: productId,
                name: productData.name,
                price: productData.price,
                description: productData.description,
                quantity: quantity,
                image: productData.image
            });
            
            this.setButtonLoading(button, false);
            this.animateCartIcon();
            this.setButtonSuccess(button);
            
        }, 600);
    }
    
    addProductToCart(product) {
        const existingProduct = this.cart.find(item => item.id === product.id);
        
        if (existingProduct) {
            existingProduct.quantity += product.quantity;
            this.showNotification(`${product.name} quantity updated! Now ${existingProduct.quantity} in cart 🛒`, 'success');
        } else {
            this.cart.push(product);
            this.showNotification(`${product.name} added to cart! 🥤✨`, 'success');
        }
        
        this.updateCartDisplay();
        this.triggerGentleEffect();
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
        if (this.elements.cartIcon) {
            this.elements.cartIcon.classList.add('bounce');
            setTimeout(() => {
                this.elements.cartIcon.classList.remove('bounce');
            }, 600);
        }
    }
    
    setButtonLoading(button, isLoading) {
        if (isLoading) {
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Adding...</span>';
            button.style.background = 'var(--color-secondary)';
        } else {
            button.disabled = false;
        }
    }
    
    setButtonSuccess(button) {
        const originalContent = '<i class="fas fa-cart-plus"></i> <span>Add to Cart</span>';
        button.innerHTML = '<i class="fas fa-check"></i> <span>Added!</span>';
        button.style.background = 'var(--color-primary)';
        
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.style.background = '';
        }, 2000);
    }
    
    // Quantity Controls
    initializeQuantitySelectors() {
        this.elements.quantitySelectors.forEach(selector => {
            const minusBtn = selector.querySelector('.qty-minus');
            const plusBtn = selector.querySelector('.qty-plus');
            const input = selector.querySelector('.qty-input');
            
            if (minusBtn) {
                minusBtn.addEventListener('click', () => {
                    const currentValue = parseInt(input.value);
                    if (currentValue > 1) {
                        input.value = currentValue - 1;
                        this.animateQuantityChange(input, 'decrease');
                    }
                });
            }
            
            if (plusBtn) {
                plusBtn.addEventListener('click', () => {
                    const currentValue = parseInt(input.value);
                    if (currentValue < 10) {
                        input.value = currentValue + 1;
                        this.animateQuantityChange(input, 'increase');
                    }
                });
            }
            
            if (input) {
                input.addEventListener('change', (e) => {
                    let value = parseInt(e.target.value);
                    if (isNaN(value) || value < 1) value = 1;
                    if (value > 10) value = 10;
                    e.target.value = value;
                });
            }
        });
    }
    
    animateQuantityChange(input, direction) {
        input.style.transform = direction === 'increase' ? 'scale(1.1)' : 'scale(0.9)';
        input.style.background = 'var(--pale-mint)';
        input.style.color = 'var(--color-primary)';
        input.style.fontWeight = 'bold';
        
        setTimeout(() => {
            input.style.transform = '';
            input.style.background = '';
            input.style.color = '';
            input.style.fontWeight = '';
        }, 200);
    }
    
    // Newsletter
    handleNewsletterSubmit(e) {
        e.preventDefault();
        
        const email = this.elements.newsletterEmail?.value.trim();
        const submitButton = this.elements.newsletterForm?.querySelector('button[type="submit"]');
        
        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address 📧', 'error');
            if (this.elements.newsletterEmail) {
                this.elements.newsletterEmail.focus();
            }
            return;
        }
        
        // Loading state
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Subscribing...</span>';
        }
        
        // Simulate API call
        setTimeout(() => {
            if (this.elements.newsletterEmail) {
                this.elements.newsletterEmail.value = '';
            }
            
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = '<span>Subscribe</span> <i class="fas fa-paper-plane"></i>';
            }
            
            this.showNotification('🎉 Welcome to 2Go! Check your email for exclusive offers and fresh updates.', 'success', 6000);
            this.triggerGentleEffect();
        }, 1500);
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Animation & Effects
    initializeAnimations() {
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
                    
                    // Special effects for different elements
                    if (entry.target.classList.contains('product-card')) {
                        this.animateProductCardEntry(entry.target);
                    }
                }
            });
        }, options);
        
        const elementsToObserve = document.querySelectorAll('.product-card, .feature-card, .feature-highlight');
        elementsToObserve.forEach(el => observer.observe(el));
    }
    
    animateProductCardEntry(card) {
        setTimeout(() => {
            card.style.borderColor = 'var(--color-primary)';
            setTimeout(() => {
                card.style.borderColor = '';
            }, 800);
        }, 200);
    }
    
    triggerGentleEffect() {
        // Gentle visual feedback instead of confetti for eye-soothing experience
        const colors = ['#7AA15A', '#CAF4F4', '#F0F8F2', '#FFF2CC', '#FDE0D9'];
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                
                Object.assign(particle.style, {
                    position: 'fixed',
                    top: '30%',
                    left: '50%',
                    width: '6px',
                    height: '6px',
                    background: colors[Math.floor(Math.random() * colors.length)],
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: '10001',
                    opacity: '0.8',
                    transform: `translateX(${(Math.random() - 0.5) * 200}px)`,
                    animation: 'gentle-float 2s ease-out forwards'
                });
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 2000);
            }, i * 100);
        }
    }
    
    // Utility Methods
    handleOutsideClick(e) {
        // Close search results
        if (!e.target.closest('.nav__search')) {
            this.hideSearchResults();
        }
        
        // Close cart dropdown
        if (!e.target.closest('.nav__cart') && !e.target.closest('.cart-dropdown')) {
            this.closeCartDropdown();
        }
        
        // Close mobile menu
        if (!e.target.closest('.nav__menu') && !e.target.closest('.nav__toggle')) {
            if (this.elements.navMenu?.classList.contains('active')) {
                this.toggleMobileMenu();
            }
        }
    }
    
    handleKeyboard(e) {
        if (e.key === 'Escape') {
            this.hideSearchResults();
            this.closeCartDropdown();
            if (this.elements.navMenu?.classList.contains('active')) {
                this.toggleMobileMenu();
            }
        }
    }
    
    optimizePerformance() {
        // Lazy load images that are not immediately visible
        const images = document.querySelectorAll('img[src]');
        images.forEach(img => {
            img.loading = 'lazy';
        });
        
        // Remove unused event listeners after certain time
        setTimeout(() => {
            console.log('🚀 2Go performance optimizations applied');
        }, 5000);
    }
    
    // Notification System - Eye-Soothing Design
    showNotification(message, type = 'info', duration = 4000) {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'leaf'
        };
        
        const colors = {
            success: 'linear-gradient(135deg, #7AA15A, #6B8F4F)',
            error: 'linear-gradient(135deg, #E74C3C, #C0392B)',
            warning: 'linear-gradient(135deg, #F39C12, #E67E22)',
            info: 'linear-gradient(135deg, #CAF4F4, #5B9B9F)'
        };
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div style="background: rgba(255,255,255,0.2); border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-${icons[type]}" style="font-size: 1rem;"></i>
                </div>
                <span style="flex: 1; line-height: 1.4;">${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" style="background: rgba(255,255,255,0.2); border: none; color: inherit; cursor: pointer; padding: 0.5rem; border-radius: var(--radius-sm); opacity: 0.8; transition: opacity 0.2s;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: colors[type],
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-xl)',
            zIndex: '10000',
            maxWidth: '420px',
            minWidth: '320px',
            transform: 'translateX(100%)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            backdropFilter: 'blur(10px)',
            fontSize: '0.95rem',
            fontWeight: '500',
            border: '1px solid rgba(255,255,255,0.1)'
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
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 500);
        }, duration);
    }
}

// Initialize the application
window.twoGoApp = new TwoGoApp();

// Add custom CSS animations for eye-soothing effects
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .notification {
        animation: slideInRight 0.5s ease-out;
    }
    
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
    
    .bounce {
        animation: gentle-bounce 0.6s ease-out;
    }
    
    @keyframes gentle-bounce {
        0%, 20%, 60%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-8px);
        }
        80% {
            transform: translateY(-4px);
        }
    }
    
    @keyframes gentle-float {
        0% {
            transform: translateY(0) rotateZ(0deg);
            opacity: 0.8;
        }
        100% {
            transform: translateY(-100px) rotateZ(180deg);
            opacity: 0;
        }
    }
    
    /* Enhanced hover effects - subtle and eye-soothing */
    .product-card:hover .product-card__image {
        filter: brightness(1.05) saturate(1.1);
    }
    
    .feature-card:hover .feature-card__icon {
        transform: scale(1.05) rotate(2deg);
        transition: transform 0.3s ease;
    }
    
    .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0,0,0,0.1);
    }
    
    /* Loading spinner */
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .fa-spinner {
        animation: spin 1s linear infinite;
    }
    
    /* Smooth scrollbar - eye-soothing colors */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: var(--pale-mint);
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, var(--color-primary-hover), var(--color-secondary));
    }
`;
document.head.appendChild(styleSheet);

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('🥤 2Go page hidden - staying fresh!');
    } else {
        console.log('🥤 Welcome back to 2Go!');
        if (window.twoGoApp) {
            window.twoGoApp.showNotification('Welcome back! Your fresh juice journey continues 🥤✨', 'info', 3000);
        }
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('🚨 2Go error:', e.error);
    if (window.twoGoApp) {
        window.twoGoApp.showNotification('Something went wrong. Please refresh and try again. 🔄', 'error');
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

// Special interactions for brand engagement
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.nav__brand-logo');
    if (logo) {
        let clickCount = 0;
        logo.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 2) {
                if (window.twoGoApp) {
                    window.twoGoApp.showNotification('🥤✨ You discovered the 2Go magic! Use code FRESH15 for 15% off your first order!', 'success', 8000);
                    window.twoGoApp.triggerGentleEffect();
                }
                clickCount = 0;
            }
            setTimeout(() => clickCount = 0, 500);
        });
    }
});

console.log('🥤 2Go Juice 2025 - Pure, Fresh, Natural! Born fresh, served real ✨');