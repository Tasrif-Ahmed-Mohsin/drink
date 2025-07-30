// FreshVita Juice Website JavaScript - Fresh Theme Edition

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');
const cartCount = document.getElementById('cart-count');
const cartIcon = document.querySelector('.nav__cart');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const newsletterForm = document.getElementById('newsletter-form');

// Product data with fresh juice theme pricing
const products = {
    1: { name: 'Orange Burst', price: 4.99, description: 'Fresh orange juice' },
    2: { name: 'Green Apple Fresh', price: 5.49, description: 'Crisp apple juice' },
    3: { name: 'Carrot Power', price: 5.99, description: 'Vitamin-rich carrot juice' },
    4: { name: 'Tropical Pineapple', price: 5.79, description: 'Sweet pineapple juice' },
    5: { name: 'Beetroot Boost', price: 6.49, description: 'Energizing beetroot juice' },
    6: { name: 'Berry Medley', price: 6.99, description: 'Mixed berry juice' },
    7: { name: 'Pomegranate Pure', price: 7.49, description: 'Antioxidant-rich pomegranate' }
};

// Cart state
let cart = [];
let cartTotal = 0;

// Fresh juice theme colors for notifications
const freshColors = {
    primary: '#7aa15a',
    accent: '#ff8f4a',
    success: '#a8c09a',
    mint: '#dafff2',
    yellow: '#ffd85a',
    blue: '#87ceeb'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🥤 FreshVita Juice website loaded with fresh theme!');
    initializeNavigation();
    initializeCart();
    initializeNewsletterForm();
    initializeScrollEffects();
    initializeProductCards();
    initializeFreshAnimations();
});

// Navigation Functions
function initializeNavigation() {
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                closeMobileMenu();
                
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active navigation link
                updateActiveNavLink(this);
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav__menu') && !e.target.closest('.nav__toggle')) {
            closeMobileMenu();
        }
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', throttle(updateNavOnScroll, 100));
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    
    // Update toggle icon with fresh animation
    const icon = navToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        icon.style.color = freshColors.accent;
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        icon.style.color = '';
    }
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    const icon = navToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
    icon.style.color = '';
}

function updateActiveNavLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function updateNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

// Cart Functions
function initializeCart() {
    addToCartButtons.forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });
}

function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const button = e.currentTarget;
    const productId = parseInt(button.getAttribute('data-product-id'));
    const productData = products[productId];
    
    if (!productData) {
        showNotification('Product not found!', 'error');
        return;
    }
    
    // Add loading state with fresh theme
    button.classList.add('loading');
    button.disabled = true;
    button.style.background = freshColors.mint;
    
    // Simulate API call delay
    setTimeout(() => {
        // Add product to cart
        addProductToCart({
            id: productId,
            name: productData.name,
            price: productData.price,
            description: productData.description
        });
        
        // Update button state with fresh theme
        button.classList.remove('loading');
        button.classList.add('added');
        button.innerHTML = '<i class="fas fa-check"></i> Added';
        button.style.background = freshColors.success;
        button.disabled = false;
        
        // Animate cart icon with fresh bounce
        cartIcon.classList.add('bounce');
        cartIcon.style.color = freshColors.accent;
        
        setTimeout(() => {
            cartIcon.classList.remove('bounce');
            cartIcon.style.color = '';
        }, 600);
        
        // Reset button after 3 seconds
        setTimeout(() => {
            button.classList.remove('added');
            button.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
            button.style.background = '';
        }, 3000);
        
    }, 800);
}

function addProductToCart(product) {
    // Check if product already exists in cart
    const existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
        showNotification(`${product.name} quantity updated in cart! 🥤`, 'success');
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
        showNotification(`${product.name} added to cart! 🌿`, 'success');
    }
    
    updateCartCount();
    updateCartTotal();
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (totalItems > 0) {
        cartCount.classList.add('active');
        cartCount.style.background = freshColors.accent;
    } else {
        cartCount.classList.remove('active');
    }
}

function updateCartTotal() {
    cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    console.log(`Cart total: $${cartTotal.toFixed(2)}`);
}

// Newsletter Form with Fresh Theme
function initializeNewsletterForm() {
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmission);
        
        // Add fresh theme styling to form
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitButton = newsletterForm.querySelector('button[type="submit"]');
        
        if (emailInput) {
            emailInput.addEventListener('focus', function() {
                this.style.borderColor = freshColors.primary;
                this.style.boxShadow = `0 0 0 3px rgba(122, 161, 90, 0.1)`;
            });
            
            emailInput.addEventListener('blur', function() {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            });
        }
    }
}

function handleNewsletterSubmission(e) {
    e.preventDefault();
    
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const submitButton = newsletterForm.querySelector('button[type="submit"]');
    const email = emailInput.value.trim();
    
    // Validate email
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address 📧', 'error');
        emailInput.style.borderColor = '#ff6b6b';
        return;
    }
    
    // Add loading state with fresh theme
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    submitButton.style.background = freshColors.mint;
    
    // Simulate API call
    setTimeout(() => {
        // Reset form
        emailInput.value = '';
        emailInput.style.borderColor = '';
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        submitButton.style.background = '';
        
        // Show success message with fresh theme
        showNotification('Welcome to the FreshVita family! 🌱 Check your email for a special welcome offer.', 'success');
        
        // Add confetti effect
        createFreshConfetti();
    }, 1500);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Scroll Effects with Fresh Theme
function initializeScrollEffects() {
    // Header scroll effect
    window.addEventListener('scroll', throttle(handleHeaderScroll, 16));
    
    // Intersection Observer for fresh animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe elements for animations
    const animatedElements = document.querySelectorAll('.product-card, .feature, .stat');
    animatedElements.forEach(el => observer.observe(el));
}

function handleHeaderScroll() {
    const header = document.querySelector('.header');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        header.style.background = 'rgba(254, 254, 254, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(122, 161, 90, 0.1)';
        header.style.borderBottom = `1px solid rgba(122, 161, 90, 0.2)`;
    } else {
        header.style.background = 'rgba(254, 254, 254, 0.95)';
        header.style.boxShadow = 'none';
        header.style.borderBottom = `1px solid rgba(122, 161, 90, 0.2)`;
    }
}

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add fresh theme color accent on scroll
            if (entry.target.classList.contains('product-card')) {
                entry.target.style.borderColor = 'rgba(122, 161, 90, 0.3)';
            }
        }
    });
}

// Product Cards with Fresh Interactions
function initializeProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', handleProductCardHover);
        card.addEventListener('mouseleave', handleProductCardLeave);
        
        // Add fresh theme color to badges
        const badge = card.querySelector('.product-card__badge');
        if (badge) {
            const colors = [freshColors.accent, freshColors.primary, freshColors.yellow, freshColors.blue];
            badge.style.background = colors[index % colors.length];
        }
    });
}

function handleProductCardHover(e) {
    const card = e.currentTarget;
    const image = card.querySelector('.product-card__fallback');
    
    // Add fresh hover effects
    card.style.borderColor = freshColors.primary;
    card.style.transform = 'translateY(-8px) scale(1.02)';
    card.style.boxShadow = `0 20px 40px rgba(122, 161, 90, 0.15)`;
    
    if (image) {
        image.style.background = `linear-gradient(135deg, ${freshColors.blue}, ${freshColors.mint})`;
    }
}

function handleProductCardLeave(e) {
    const card = e.currentTarget;
    const image = card.querySelector('.product-card__fallback');
    
    // Reset hover effects
    card.style.borderColor = '';
    card.style.transform = '';
    card.style.boxShadow = '';
    
    if (image) {
        image.style.background = '';
    }
}

// Fresh Theme Animations
function initializeFreshAnimations() {
    // Add floating animation to hero stats
    const stats = document.querySelectorAll('.stat');
    stats.forEach((stat, index) => {
        stat.style.animationDelay = `${index * 0.2}s`;
        stat.classList.add('float-animation');
    });
    
    // Add pulse animation to CTA button
    const ctaButton = document.querySelector('.hero__cta');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.background = `linear-gradient(135deg, ${freshColors.primary}, ${freshColors.accent})`;
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.transform = '';
        });
    }
}

// Fresh Theme Notification System
function showNotification(message, type = 'info') {
    // Create notification element with fresh theme
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification__close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Fresh theme colors for notifications
    const notificationColors = {
        success: freshColors.success,
        error: '#ff6b6b',
        warning: freshColors.yellow,
        info: freshColors.blue
    };
    
    // Add fresh theme styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: notificationColors[type] || freshColors.primary,
        color: type === 'warning' ? '#2d4a2d' : 'white',
        padding: '16px 20px',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(122, 161, 90, 0.2)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        maxWidth: '350px',
        transform: 'translateX(100%)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        border: `2px solid rgba(122, 161, 90, 0.3)`,
        backdropFilter: 'blur(10px)'
    });
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in with fresh bounce
    setTimeout(() => {
        notification.style.transform = 'translateX(0) scale(1.02)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0) scale(1)';
    }, 200);
    
    // Handle close button
    const closeButton = notification.querySelector('.notification__close');
    closeButton.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%) scale(0.8)';
    notification.style.opacity = '0';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 400);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'leaf';
    }
}

// Fresh Theme Confetti Effect
function createFreshConfetti() {
    const colors = [freshColors.primary, freshColors.accent, freshColors.yellow, freshColors.mint, freshColors.blue];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            top: 20%;
            left: 50%;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 10001;
            animation: confetti-fall 3s ease-out forwards;
        `;
        
        confetti.style.transform = `
            translateX(${(Math.random() - 0.5) * 300}px) 
            rotateZ(${Math.random() * 360}deg)
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 3000);
    }
}

// Add confetti animation keyframes
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
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
    
    @keyframes float-animation {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
    
    .float-animation {
        animation: float-animation 3s ease-in-out infinite;
    }
`;
document.head.appendChild(confettiStyle);

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('🥤 FreshVita page is hidden');
    } else {
        console.log('🌿 Welcome back to FreshVita!');
        showNotification('Welcome back! 🌿', 'info');
    }
});

// Error handling with fresh theme
window.addEventListener('error', function(e) {
    console.error('🚨 FreshVita error:', e.error);
    showNotification('Oops! Something went wrong. Please refresh and try again. 🔄', 'error');
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('🚨 Unhandled promise rejection:', e.reason);
    showNotification('Something unexpected happened. Please try again. 🌿', 'error');
    e.preventDefault();
});

// Fresh theme Easter egg - double click on logo
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.nav__brand');
    if (logo) {
        let clickCount = 0;
        logo.addEventListener('click', function() {
            clickCount++;
            if (clickCount === 2) {
                showNotification('🥤✨ You found the fresh secret! Enjoy 10% off your next order with code FRESH10', 'success');
                createFreshConfetti();
                clickCount = 0;
            }
            setTimeout(() => clickCount = 0, 500);
        });
    }
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addProductToCart,
        updateCartCount,
        isValidEmail,
        showNotification,
        products,
        freshColors
    };
}

console.log('🌿 FreshVita Juice app initialized with fresh theme!');