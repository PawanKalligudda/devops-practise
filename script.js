// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Animate progress bars when they come into view
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                progressBar.style.setProperty('--width', width);
                progressBar.classList.add('animate');
                progressBar.style.width = width;
            }
        });
    }, {
        threshold: 0.5
    });

    progressBars.forEach(bar => observer.observe(bar));
}

// Add scroll effect to navigation
function handleNavbarScroll() {
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(102, 126, 234, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            header.style.backdropFilter = 'none';
        }
    });
}

// Add typing effect to hero text
function addTypingEffect() {
    const heroTitle = document.querySelector('.hero-content h2');
    const text = heroTitle.textContent;
    heroTitle.textContent = '';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };

    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Add fade-in animation for cards when they come into view
function addScrollAnimations() {
    const cards = document.querySelectorAll('.timeline-item, .skill-card, .project-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Add click counter for learning progress
function addInteractiveElements() {
    let clickCount = 0;
    const ctaButton = document.querySelector('.cta-button');

    ctaButton.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 1) {
            ctaButton.textContent = 'Great! Keep Learning 🚀';
        } else if (clickCount === 5) {
            ctaButton.textContent = 'DevOps Master in Progress! 🎉';
            ctaButton.style.background = 'linear-gradient(45deg, #ff6b6b, #feca57)';
        }
    });
}

// Mobile menu toggle (for responsive design)
function addMobileMenuToggle() {
    const navMenu = document.querySelector('.nav-menu');

    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        @media (max-width: 768px) {
            display: block;
        }
    `;

    const navContainer = document.querySelector('.nav-container');
    navContainer.appendChild(mobileMenuBtn);

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-active');
    });
}

// Add dynamic year to footer
function updateFooterYear() {
    const footer = document.querySelector('footer p');
    const currentYear = new Date().getFullYear();
    footer.textContent = footer.textContent.replace('2025', currentYear);
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DevOps Learning Portfolio Loaded!');

    // Initialize all interactive features
    animateProgressBars();
    handleNavbarScroll();
    addTypingEffect();
    addScrollAnimations();
    addInteractiveElements();
    addMobileMenuToggle();
    updateFooterYear();

    // Add some fun console messages for developers who inspect
    console.log('%c🐳 Docker Ready!', 'color: #0db7ed; font-size: 16px; font-weight: bold;');
    console.log('%c☸️ Kubernetes Compatible!', 'color: #326ce5; font-size: 16px; font-weight: bold;');
    console.log('%c⚡ DevOps Pipeline Active!', 'color: #ffd700; font-size: 16px; font-weight: bold;');
});

// Add some Easter eggs for fun
window.addEventListener('keydown', (e) => {
    // Konami code: ↑ ↑ ↓ ↓ ← → ← → B A
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    if (!window.konamiSequence) window.konamiSequence = [];

    window.konamiSequence.push(e.code);

    if (window.konamiSequence.length > konamiCode.length) {
        window.konamiSequence = window.konamiSequence.slice(-konamiCode.length);
    }

    if (window.konamiSequence.join(',') === konamiCode.join(',')) {
        document.body.style.animation = 'rainbow 2s infinite';
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            document.body.style.animation = '';
            style.remove();
        }, 5000);

        console.log('🌈 DevOps Rainbow Mode Activated! 🌈');
    }
});