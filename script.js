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
});

// ===================================
// LOADING SCREEN
// ===================================

function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingLogo = document.getElementById('loadingLogo');
    const logoPlaceholder = document.getElementById('logoPlaceholder');
    const body = document.body;

    // Add loading class to body
    body.classList.add('loading');

    // Logo is already set in HTML, just handle loading states
    if (loadingLogo) {
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

    // Simulate loading progress
    let progress = 0;
    const progressBar = document.querySelector('.loading-progress');
    
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Hide loading screen after a short delay
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                body.classList.remove('loading');
                
                // Trigger hero animations after loading
                setTimeout(() => {
                    triggerHeroAnimations();
                }, 100);
            }, 500);
        }
        
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    }, 100);

    // Minimum loading time
    setTimeout(() => {
        if (progress < 100) {
            clearInterval(loadingInterval);
            if (progressBar) {
                progressBar.style.width = '100%';
            }
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                body.classList.remove('loading');
                setTimeout(() => {
                    triggerHeroAnimations();
                }, 100);
            }, 500);
        }
    }, 2000);
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
        span.textContent = word + ' ';
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        span.style.animation = `fadeInUp 0.3s ease-out ${index * 0.05}s forwards`;
        element.appendChild(span);
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
// CONSOLE MESSAGE
// ===================================

console.log('%c🦌 Welcome to Omer Ranch! 🦌', 
    'font-size: 20px; font-weight: bold; color: #2d5016; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c🌲 Exceptional Hunting & Wildlife in the Heart of Texas 🌲', 
    'font-size: 14px; color: #3d6b1f; font-style: italic;');
console.log('%c100+ Acres • 200+ Deer • 50+ Wildlife Species', 
    'font-size: 12px; color: #6b9d4e;');
