

document.addEventListener('DOMContentLoaded', function() {
    
    initializeMenu();
    initializeScrollEffects();
    initializeImageLazyLoading();
    initializeAccessibility();
});


function initializeMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    
    if (menuBtn && navMenu && navOverlay) {
        
        menuBtn.addEventListener('click', function() {
            navMenu.classList.add('active');
            navOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            
            const firstLink = navMenu.querySelector('.nav-menu__link');
            if (firstLink) {
                firstLink.focus();
            }
        });
        
        
        navOverlay.addEventListener('click', closeMenu);
        
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
        
        
        const navLinks = navMenu.querySelectorAll('.nav-menu__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                
                setTimeout(closeMenu, 100);
            });
        });
    }
    
    function closeMenu() {
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        
        if (menuBtn) {
            menuBtn.focus();
        }
    }
}


function initializeScrollEffects() {
    
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
   
    const animatedElements = document.querySelectorAll('.card, .section');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}


function initializeImageLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
    
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}


function initializeAccessibility() {
    
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView();
            }
        });
    }
    
    
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                const link = this.querySelector('a');
                if (link) {
                    e.preventDefault();
                    link.click();
                }
            }
        });
    });
    
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            const text = button.textContent.trim();
            if (text) {
                button.setAttribute('aria-label', text);
            }
        }
    });
}


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


function initializeSearch() {
    const searchInput = document.querySelector('.header__search-input');
    
    if (searchInput) {
        const debouncedSearch = debounce(function(query) {
            if (query.length > 2) {
                performSearch(query);
            }
        }, 300);
        
        searchInput.addEventListener('input', function() {
            debouncedSearch(this.value);
        });
        
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value);
            }
        });
    }
}

function performSearch(query) {
    
    console.log('Searching for:', query);
    

    if (query.trim()) {
        alert(`Buscando por: "${query}"`);
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateRequired(value) {
    return value && value.trim().length > 0;
}

function validateMinLength(value, minLength) {
    return value && value.trim().length >= minLength;
}


window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    
});


if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

window.MareViva = {
    validateEmail,
    validateRequired,
    validateMinLength,
    debounce,
    throttle
};

