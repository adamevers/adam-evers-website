// Main JavaScript for Adam Evers Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initFormHandling();
    initAnimations();
    initMobileMenu();
});

// Navigation functionality
function initNavigation() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Handle navigation background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// Contact form handling
function initFormHandling() {
    const form = document.querySelector('.form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this);
        });
    }
}

function handleFormSubmit(form) {
    const formData = new FormData(form);
    const submitButton = form.querySelector('.form-submit');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Get form data
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Create mailto link (fallback for static site)
    const subject = encodeURIComponent(`Website Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:adam.evers@gmail.com?subject=${subject}&body=${body}`;
    
    // Simulate sending delay
    setTimeout(() => {
        // Open mail client
        window.location.href = mailtoLink;
        
        // Show success message
        showFormSuccess();
        
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1000);
}

function showFormSuccess() {
    const form = document.querySelector('.form');
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = `
        <div style="
            background-color: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.2);
            color: #10b981;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            text-align: center;
        ">
            ✓ Thank you! Your message will open in your email client.
        </div>
    `;
    
    form.insertBefore(successMessage, form.firstChild);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            const isOpen = navLinks.classList.contains('mobile-open');
            
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-container') && navLinks.classList.contains('mobile-open')) {
                closeMobileMenu();
            }
        });
        
        // Close mobile menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }
}

function openMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    navLinks.classList.add('mobile-open');
    navToggle.classList.add('open');
    document.body.style.overflow = 'hidden';
    
    // Add mobile menu styles dynamically
    if (!document.getElementById('mobile-menu-styles')) {
        const styles = document.createElement('style');
        styles.id = 'mobile-menu-styles';
        styles.textContent = `
            @media (max-width: 768px) {
                .nav-links.mobile-open {
                    display: flex !important;
                    position: fixed;
                    top: 72px;
                    left: 0;
                    right: 0;
                    background-color: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    flex-direction: column;
                    padding: 2rem;
                    gap: 1.5rem;
                    border-bottom: 1px solid var(--color-gray-200);
                    box-shadow: var(--shadow-lg);
                    animation: slideDown 0.3s ease;
                }
                
                .nav-toggle.open .nav-toggle-line:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }
                
                .nav-toggle.open .nav-toggle-line:nth-child(2) {
                    opacity: 0;
                }
                
                .nav-toggle.open .nav-toggle-line:nth-child(3) {
                    transform: rotate(-45deg) translate(7px, -6px);
                }
                
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            }
        `;
        document.head.appendChild(styles);
    }
}

function closeMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    navLinks.classList.remove('mobile-open');
    navToggle.classList.remove('open');
    document.body.style.overflow = '';
}

// Initialize scroll animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.timeline-content, .project-card, .skill-item'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add animation styles
    if (!document.getElementById('animation-styles')) {
        const styles = document.createElement('style');
        styles.id = 'animation-styles';
        styles.textContent = `
            .timeline-content,
            .project-card,
            .skill-item {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .timeline-content.animate-in,
            .project-card.animate-in,
            .skill-item.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .project-card.animate-in {
                transition-delay: 0.1s;
            }
            
            .skill-item.animate-in:nth-child(2) {
                transition-delay: 0.1s;
            }
            
            .skill-item.animate-in:nth-child(3) {
                transition-delay: 0.2s;
            }
            
            .skill-item.animate-in:nth-child(4) {
                transition-delay: 0.3s;
            }
        `;
        document.head.appendChild(styles);
    }
}

// Enhanced navigation scroll effect
function enhanceNavigation() {
    const style = document.createElement('style');
    style.textContent = `
        .nav.scrolled {
            background-color: rgba(255, 255, 255, 0.98);
            box-shadow: var(--shadow-sm);
        }
        
        .nav-link.active {
            color: var(--color-primary);
        }
        
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
}

// Add typing animation to hero text
function addTypingAnimation() {
    const heroRole = document.querySelector('.hero-role');
    if (heroRole) {
        const text = heroRole.textContent;
        heroRole.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroRole.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', function() {
    enhanceNavigation();
    setTimeout(addTypingAnimation, 1000);
});

// Smooth scrolling polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll/dist/smooth-scroll.polyfills.min.js';
    document.head.appendChild(script);
}

// Handle prefers-reduced-motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}