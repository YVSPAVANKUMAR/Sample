// Advanced Animations for React Developer Guide

document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('[class*="animate-"]');
    animatedElements.forEach(el => observer.observe(el));

    // Mouse tracking for interactive background
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            const shapes = document.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.5;
                const x = (mouseX - 0.5) * speed * 100;
                const y = (mouseY - 0.5) * speed * 100;
                shape.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        setTimeout(typeWriter, 1000);
    }

    // Particle effect for hero background
    function createParticles() {
        const heroBg = document.querySelector('.hero-bg');
        if (!heroBg) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: ${Math.random() > 0.5 ? '#61dafb' : '#21d4fd'};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.5 + 0.1};
                animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
            `;
            heroBg.appendChild(particle);
        }
    }

    createParticles();

    // Smooth scrolling for navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Card hover effects with 3D transform
    document.querySelectorAll('.overview-card, .roadmap-step .step-content').forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Progress bar animation
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #61dafb, #21d4fd);
        z-index: 1001;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Dynamic color changes on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${rate * speed}px)`;
        });
    });

    // Click ripple effect
    document.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(97, 218, 251, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1002;
            animation: ripple 0.6s linear;
            left: ${e.clientX - 10}px;
            top: ${e.clientY - 10}px;
        `;
        document.body.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// CSS for additional animations
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
        50% { opacity: 0.5; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }

    @keyframes ripple {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(20); opacity: 0; }
    }

    .particle {
        pointer-events: none;
    }

    .animate {
        animation-play-state: running !important;
    }

    /* Loading animation */
    .loading {
        opacity: 0;
        animation: fadeIn 0.8s ease-out forwards;
    }
`;
document.head.appendChild(style);

// Performance optimization: Debounce scroll events
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

// Apply debounced scroll handler
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations can be added here
}, 16));