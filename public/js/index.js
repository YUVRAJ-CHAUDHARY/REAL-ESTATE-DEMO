// Index Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    animateStatistics();
    
    // Add smooth scrolling for anchor links
    addSmoothScrolling();
    
    // Add hover effects for property cards
    addPropertyCardEffects();
    
    // Initialize header scroll behavior
    initHeaderScroll();
    
    // Initialize any other interactive features
    initializeInteractiveFeatures();
});

// Header scroll behavior - hide on scroll down, show on scroll up
function initHeaderScroll() {
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    const scrollThreshold = 1100; // Minimum scroll before hiding header
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Only hide/show header if scrolled more than threshold
        if (Math.abs(scrollTop - lastScrollTop) > scrollThreshold) {
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                // Scrolling down - hide header
                header.classList.add('header-hidden');
            } else {
                // Scrolling up - show header
                header.classList.remove('header-hidden');
            }
            lastScrollTop = scrollTop;
        }
    });
}

// Animate statistics numbers with counting effect
function animateStatistics() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/\D/g, ''));
        const suffix = stat.textContent.replace(/\d/g, '');
        
        let current = 0;
        const increment = target / 50; // Animate over 50 steps
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + suffix;
        }, 30);
    });
}

// Add smooth scrolling for anchor links
function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add enhanced hover effects for property cards
function addPropertyCardEffects() {
    const propertyCards = document.querySelectorAll('.premium-property-card');
    
    propertyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        });
    });
}

// Initialize interactive features
function initializeInteractiveFeatures() {
    // Add click handlers for property buttons
    const propertyButtons = document.querySelectorAll('.property-btn');
    
    propertyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const propertyCard = this.closest('.premium-property-card');
            const propertyTitle = propertyCard.querySelector('h4').textContent;
            
            // You can add navigation logic here
            console.log('Viewing property:', propertyTitle);
            // Example: window.location.href = `/property/${propertyId}`;
        });
    });
    
    // Add testimonial carousel functionality (if needed)
    setupTestimonialCarousel();
}

// Setup testimonial carousel (optional)
function setupTestimonialCarousel() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    let currentIndex = 0;
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(() => {
        testimonials.forEach((testimonial, index) => {
            testimonial.style.opacity = index === currentIndex ? '1' : '0.7';
        });
        
        currentIndex = (currentIndex + 1) % testimonials.length;
    }, 5000);
}

// Add intersection observer for scroll animations
function addScrollAnimations() {
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
    const animateElements = document.querySelectorAll('.stat-item, .award-item, .testimonial-item, .premium-property-card');
    animateElements.forEach(el => observer.observe(el));
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    addScrollAnimations();
}); 