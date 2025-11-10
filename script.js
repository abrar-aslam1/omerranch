// ===================================
// OMER RANCH - PROFESSIONAL WEBSITE
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initNavigation();
    initScrollAnimations();
    initCounterAnimations();
    initFormHandling();
    initSmoothScroll();
    initTextAnimations();
    initScrollProgress();
    initBackToTop();
    initParallax();
    initScrollIndicator();
    initCardHoverEffects();
    initStaggeredAnimations();
});

// ===================================
// LOADING SCREEN
// ===================================

function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingLogo = document.getElementById('loadingLogo');
    const logoPlaceholder = document.getElementById('logoPlaceholder');
    const body = document.body;
    const progressBar = document.querySelector('.loading-progress');

    if (!loadingScreen) return;

    // Add loading class to body
    body.classList.add('loading');

    // Logo handling - check if already loaded
    if (loadingLogo) {
        // Check if image is already loaded
        if (loadingLogo.complete && loadingLogo.naturalHeight !== 0) {
            loadingLogo.style.display = 'block';
            if (logoPlaceholder) {
                logoPlaceholder.style.display = 'none';
            }
        } else {
            loadingLogo.onload = () => {
                loadingLogo.style.display = 'block';
                if (logoPlaceholder) {
                    logoPlaceholder.style.display = 'none';
                }
            };
            loadingLogo.onerror = () => {
                // If logo fails to load, show placeholder
                loadingLogo.style.display = 'none';
                if (logoPlaceholder) {
                    logoPlaceholder.style.display = 'flex';
                }
            };
        }
    }

    // Function to hide loading screen - more aggressive
    function hideLoadingScreen() {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            loadingScreen.style.display = 'none';
        }
        body.classList.remove('loading');
        body.style.overflow = '';
        
        // Trigger hero animations after loading
        setTimeout(() => {
            triggerHeroAnimations();
        }, 100);
    }

    // Simulate loading progress - much faster
    let progress = 0;
    let loadingInterval = null;
    let isComplete = false;
    
    // Start progress animation
    if (progressBar) {
        loadingInterval = setInterval(() => {
            if (isComplete) {
                if (loadingInterval) clearInterval(loadingInterval);
                return;
            }
            
            progress += Math.random() * 8 + 4; // Even slower progress increments
            if (progress >= 100) {
                progress = 100;
                isComplete = true;
                if (loadingInterval) clearInterval(loadingInterval);
                
                progressBar.style.width = '100%';
                
                // Hide loading screen immediately
                setTimeout(() => {
                    hideLoadingScreen();
                }, 100);
            } else {
                progressBar.style.width = progress + '%';
            }
        }, 85); // Even slower interval
    } else {
        // If no progress bar, just wait and hide
        setTimeout(() => {
            hideLoadingScreen();
        }, 500);
    }

    // CRITICAL FALLBACK: Always hide after maximum time (4.5 seconds)
    setTimeout(() => {
        if (!isComplete) {
            isComplete = true;
            if (loadingInterval) {
                clearInterval(loadingInterval);
            }
            if (progressBar) {
                progressBar.style.width = '100%';
            }
        }
        
        // Force hide after a brief delay
        setTimeout(() => {
            hideLoadingScreen();
        }, 600);
    }, 4500);
}

function triggerHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title.animate-typewriter');
    if (heroTitle) {
        // Complete typewriter effect
        setTimeout(() => {
            heroTitle.classList.add('complete');
        }, 2500);
    }
}

// ===================================
// TEXT ANIMATIONS
// ===================================

function initTextAnimations() {
    // Add word-by-word animation to paragraphs
    const animatedParagraphs = document.querySelectorAll('.animate-fade-in-up-delay, .animate-fade-in-up-delay-2');
    
    animatedParagraphs.forEach(para => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateWords(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(para);
    });
}

function animateWords(element) {
    const words = element.textContent.split(' ');
    element.textContent = '';
    element.style.opacity = '1';
    
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.opacity = '0';
        span.style.display = 'inline';
        span.style.animation = `fadeInUp 0.3s ease-out ${index * 0.05}s forwards`;
        element.appendChild(span);
        
        // Add space after each word except the last one
        if (index < words.length - 1) {
            element.appendChild(document.createTextNode(' '));
        }
    });
}

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
            nav.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
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
    const scrollElements = document.querySelectorAll('[data-scroll]');
    scrollElements.forEach(element => {
        observer.observe(element);
    });

    // Observe section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        observer.observe(header);
    });

    // Observe cards with staggered animation
    const cards = document.querySelectorAll('.property-card, .activity-card, .feature-item, .feature-box, .info-card');
    cards.forEach((card, index) => {
        observer.observe(card);
        card.style.transitionDelay = `${index * 0.05}s`;
    });

    // Trigger scroll animations for elements with animation classes
    const animatedElements = document.querySelectorAll('[data-scroll] .animate-fade-in-up, [data-scroll] .animate-fade-in-up-delay, [data-scroll] .animate-fade-in-up-delay-2, [data-scroll] .animate-slide-in-left, [data-scroll] .animate-slide-in-right, [data-scroll] .animate-slide-in-up');
    
    animatedElements.forEach(element => {
        observer.observe(element.closest('[data-scroll]'));
    });
}

// ===================================
// COUNTER ANIMATIONS
// ===================================

function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
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
        const steps = 60;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            // Easing function for smooth acceleration
            const progress = step / steps;
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            current = target * easeOutQuart;
            
            if (step >= steps) {
                element.textContent = target + (target === 100 || target === 200 || target === 50 ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (target === 100 || target === 200 || target === 50 ? '+' : '');
            }
        }, duration / steps);
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

// ===================================
// LOADING EFFECTS
// ===================================

window.addEventListener('load', () => {
    // Body is already handled by loading screen
    // Additional fade-in effects can be added here if needed
});

// ===================================
// ACCESSIBILITY
// ===================================

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';
    
    const style = document.createElement('style');
    style.textContent = `
        * { 
            animation: none !important;
            transition: none !important;
        }
    `;
    document.head.appendChild(style);
}

// ===================================
// TOUCH DEVICE ENHANCEMENTS
// ===================================

if ('ontouchstart' in window) {
    const interactiveElements = document.querySelectorAll('.cta-button, .submit-button, .nav-link, .contact-link');
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
// SCROLL PROGRESS BAR
// ===================================

function initScrollProgress() {
    // Create scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        
        progressBar.style.width = progress + '%';
    });
}

// ===================================
// BACK TO TOP BUTTON
// ===================================

function initBackToTop() {
    // Create back to top button
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);

    // Show/hide on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Scroll to top on click
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// PARALLAX EFFECT
// ===================================

function initParallax() {
    const heroImage = document.querySelector('.hero-bg-image');
    const hero = document.querySelector('.hero');
    
    if (!heroImage || !hero) return;

    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                const heroHeight = hero.offsetHeight;
                
                // Only apply parallax while hero is visible
                if (scrolled < heroHeight) {
                    const parallaxSpeed = 0.4;
                    const translateY = scrolled * parallaxSpeed;
                    heroImage.style.transform = `translateY(${translateY}px) scale(1.1)`;
                    
                    // Fade out scroll indicator as user scrolls
                    const scrollIndicator = document.querySelector('.scroll-indicator');
                    if (scrollIndicator) {
                        const opacity = Math.max(0, 1 - (scrolled / 300));
                        scrollIndicator.style.opacity = opacity;
                    }
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// ===================================
// SCROLL INDICATOR
// ===================================

function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (!scrollIndicator) return;
    
    // Smooth scroll to next section on click
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const offsetTop = aboutSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
    
    // Add hover effect
    scrollIndicator.addEventListener('mouseenter', () => {
        scrollIndicator.style.transform = 'translateX(-50%) scale(1.1)';
    });
    
    scrollIndicator.addEventListener('mouseleave', () => {
        scrollIndicator.style.transform = 'translateX(-50%) scale(1)';
    });
}

// ===================================
// CARD HOVER 3D EFFECTS
// ===================================

function initCardHoverEffects() {
    const cards = document.querySelectorAll('.property-card, .activity-card, .feature-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ===================================
// STAGGERED ANIMATIONS
// ===================================

function initStaggeredAnimations() {
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.activity-card, .feature-item, .feature-box, .info-card');
                
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections with multiple cards
    const sections = document.querySelectorAll('.activities-grid, .about-features, .property-features, .contact-info');
    sections.forEach(section => {
        // Set initial state for items
        const items = section.querySelectorAll('.activity-card, .feature-item, .feature-box, .info-card');
        items.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        observer.observe(section);
    });
}

// ===================================
// ENHANCED FORM INTERACTIONS
// ===================================

function enhanceFormFields() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = '';
        });
        
        // Add ripple effect on input
        input.addEventListener('input', () => {
            input.style.borderColor = 'var(--sage-green)';
            setTimeout(() => {
                input.style.borderColor = '';
            }, 300);
        });
    });
}

// Call on page load
window.addEventListener('load', () => {
    enhanceFormFields();
});

// ===================================
// SMOOTH REVEAL ANIMATIONS
// ===================================

function initSmoothReveal() {
    const reveals = document.querySelectorAll('.section-badge, .section-title, .section-subtitle');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    reveals.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        revealObserver.observe(element);
    });
}

// Initialize smooth reveal
window.addEventListener('load', () => {
    initSmoothReveal();
});

// ===================================
// BUTTON RIPPLE EFFECT
// ===================================

function createRipple(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    // Add ripple styles
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to buttons
document.addEventListener('click', (e) => {
    const button = e.target.closest('.cta-button, .submit-button, .contact-link');
    if (button) {
        createRipple(e, button);
    }
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    .cta-button, .submit-button, .contact-link {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// ===================================
// MAGNETIC BUTTON EFFECT
// ===================================

function initMagneticButtons() {
    const buttons = document.querySelectorAll('.cta-button, .submit-button');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
}

// Initialize magnetic buttons
window.addEventListener('load', () => {
    initMagneticButtons();
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for scroll events
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

// Throttle function for frequent events
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

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c🦌 Welcome to Omer Ranch! 🦌', 
    'font-size: 20px; font-weight: bold; color: #2d5016; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c🌲 Exceptional Hunting & Wildlife in the Heart of Texas 🌲', 
    'font-size: 14px; color: #3d6b1f; font-style: italic;');
console.log('%c100+ Acres • 200+ Deer • 50+ Wildlife Species', 
    'font-size: 12px; color: #6b9d4e;');
console.log('%c✨ Enhanced with Advanced Animations & Interactions', 
    'font-size: 11px; color: #6b9d4e; font-style: italic;');
