// ===================================
// OMER RANCH - NATURE RESERVE
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initWildlifeAnimations();
    initCounterAnimations();
    initFormHandling();
    initSmoothScroll();
    initParallaxEffects();
});

// ===================================
// NAVIGATION
// ===================================

function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const nav = document.querySelector('.nav-container');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (navToggle) {
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('.section, .hero');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Nav background on scroll
        if (window.scrollY > 50) {
            nav.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
        } else {
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
}

// ===================================
// SMOOTH SCROLLING
// ===================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ===================================
// SCROLL ANIMATIONS
// ===================================

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with data-scroll attribute
    const animatedElements = document.querySelectorAll('[data-scroll]');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Observe section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        observer.observe(header);
    });

    // Observe cards with staggered animation
    const wildlifeCards = document.querySelectorAll('.wildlife-card');
    wildlifeCards.forEach((card, index) => {
        observer.observe(card);
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    const featureBoxes = document.querySelectorAll('.feature-box');
    featureBoxes.forEach((box, index) => {
        observer.observe(box);
        box.style.transitionDelay = `${index * 0.1}s`;
    });
}

// ===================================
// WILDLIFE ANIMATIONS
// ===================================

function initWildlifeAnimations() {
    const wildlifeContainer = document.getElementById('wildlifeContainer');
    if (!wildlifeContainer) return;

    const wildlifeEmojis = ['🦌', '🦅', '🦃', '🦊', '🐦'];
    
    // Create wildlife elements periodically
    setInterval(() => {
        if (Math.random() > 0.6) {
            createWildlifeElement();
        }
    }, 5000);

    // Create initial wildlife
    setTimeout(() => createWildlifeElement(), 2000);
    setTimeout(() => createWildlifeElement(), 4000);

    function createWildlifeElement() {
        const element = document.createElement('div');
        element.className = 'wildlife-element';
        element.textContent = wildlifeEmojis[Math.floor(Math.random() * wildlifeEmojis.length)];
        
        // Random starting position
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${20 + Math.random() * 60}%`;
        
        // Random size
        const size = 20 + Math.random() * 15;
        element.style.fontSize = `${size}px`;
        
        // Random animation duration
        const duration = 15 + Math.random() * 10;
        element.style.animation = `wildlifeFloat ${duration}s ease-in-out infinite`;
        element.style.opacity = '0.4';
        
        wildlifeContainer.appendChild(element);
        
        // Remove after animation
        setTimeout(() => {
            element.remove();
        }, duration * 1000);
    }

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes wildlifeFloat {
            0%, 100% {
                transform: translateY(0) translateX(0) rotate(0deg);
                opacity: 0.4;
            }
            25% {
                transform: translateY(-30px) translateX(20px) rotate(5deg);
                opacity: 0.6;
            }
            50% {
                transform: translateY(-50px) translateX(-20px) rotate(-5deg);
                opacity: 0.5;
            }
            75% {
                transform: translateY(-30px) translateX(10px) rotate(3deg);
                opacity: 0.6;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===================================
// COUNTER ANIMATIONS
// ===================================

function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
            }
        }, 16);
    }
}

// ===================================
// FORM HANDLING
// ===================================

function initFormHandling() {
    const form = document.getElementById('visitForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            dates: document.getElementById('dates')?.value,
            interest: document.getElementById('interest').value,
            message: document.getElementById('message').value
        };

        // Show success message
        showMessage('✓ Thank you! We\'ll contact you soon about your visit to Omer Ranch.', 'success');
        
        // Reset form
        form.reset();
        
        // Log form data (in production, send to server)
        console.log('Form submitted:', formData);
    });
}

function showMessage(text, type) {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.textContent = text;
    
    if (type === 'error') {
        message.style.background = 'var(--earth-brown)';
    }
    
    document.body.appendChild(message);
    
    // Remove after 4 seconds
    setTimeout(() => {
        message.style.animation = 'slideOutRight 0.5s ease-out forwards';
        setTimeout(() => {
            message.remove();
        }, 500);
    }, 4000);
}

// Add slide out animation
const style = document.createElement('style');
style.textContent += `
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// PARALLAX EFFECTS
// ===================================

function initParallaxEffects() {
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    function updateParallax() {
        const scrolled = window.pageYOffset;

        // Parallax background layers
        const skyLayer = document.querySelector('.sky-layer');
        const mountainLayer = document.querySelector('.mountain-layer');
        const forestLayer = document.querySelector('.forest-layer');

        if (skyLayer) {
            skyLayer.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        if (mountainLayer) {
            mountainLayer.style.transform = `translateY(${scrolled * 0.15}px)`;
        }
        if (forestLayer) {
            forestLayer.style.transform = `translateY(${scrolled * 0.2}px)`;
        }

        // Parallax hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / 800);
        }
    }
}

// ===================================
// LOADING EFFECTS
// ===================================

window.addEventListener('load', () => {
    // Fade in body
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
    
    // Animate hero on load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// ===================================
// ACCESSIBILITY
// ===================================

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';
    
    const style = document.createElement('style');
    style.textContent = `
        .wildlife-element { animation: none !important; }
        * { transition: none !important; }
    `;
    document.head.appendChild(style);
}

// ===================================
// TOUCH DEVICE ENHANCEMENTS
// ===================================

if ('ontouchstart' in window) {
    const interactiveElements = document.querySelectorAll('.cta-button, .submit-button, .nav-link');
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', () => {
            element.style.transform = 'scale(0.95)';
        });
        element.addEventListener('touchend', () => {
            element.style.transform = '';
        });
    });
}

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c🦌 Welcome to Omer Ranch Nature Reserve! 🦌', 
    'font-size: 20px; font-weight: bold; color: #2d5016; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c🌲 Experience pristine wilderness, abundant wildlife, and world-class hunting 🌲', 
    'font-size: 14px; color: #3d6b1f; font-style: italic;');
console.log('%c100+ Acres • 200+ Deer • 50+ Wildlife Species', 
    'font-size: 12px; color: #6b9d4e;');
