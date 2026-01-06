// ============================================
// ENHANCED BIRTHDAY CARD ANIMATIONS
// ============================================

// Envelope Opening Logic
const envelopeWrapper = document.getElementById('envelopeWrapper');
const envelopeContainer = document.querySelector('.envelope-container');
const birthdayContent = document.getElementById('birthdayContent');
const birthdayMusic = document.getElementById('birthdayMusic');

// Set volume
birthdayMusic.volume = 0.6;

// Envelope click handler
if (envelopeContainer) {
    envelopeContainer.addEventListener('click', function() {
        // Add opening animation
        this.classList.add('opening');
        
        // Start music immediately when envelope opens
        setTimeout(() => {
            birthdayMusic.play()
                .then(() => {
                    console.log('🎵 Music started playing!');
                })
                .catch(error => {
                    console.log('Music playback error:', error);
                    // Retry on next interaction if blocked
                    document.addEventListener('click', () => {
                        birthdayMusic.play();
                    }, { once: true });
                });
        }, 500);
        
        // Fade out envelope and reveal birthday content
        setTimeout(() => {
            envelopeWrapper.classList.add('opened');
            birthdayContent.classList.add('revealed');
            
            // Scroll to top smoothly
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Initialize birthday animations
            initializeBirthdayAnimations();
        }, 1500);
    });
}

// Function to initialize all birthday animations
function initializeBirthdayAnimations() {
    createConfetti();
    createStars();
    setupCardAnimations();
}

// Confetti Animation
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const confettiColors = ['#ff6b9d', '#c471ed', '#12c2e9', '#f093fb', '#feca57', '#ff9ff3'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background-color: ${confettiColors[Math.floor(Math.random() * confettiColors.length)]};
            left: ${Math.random() * 100}%;
            top: -10%;
            opacity: ${Math.random() * 0.7 + 0.3};
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            animation: confettiFall ${Math.random() * 3 + 4}s linear infinite;
            animation-delay: ${Math.random() * 3}s;
            transform: rotate(${Math.random() * 360}deg);
        `;
        confettiContainer.appendChild(confetti);
    }
}

// Add confetti fall animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create animated stars
function createStars() {
    const starsContainer = document.querySelector('.stars');
    const starCount = 20;
    const starEmojis = ['✨', '⭐', '🌟', '💫'];

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.textContent = starEmojis[Math.floor(Math.random() * starEmojis.length)];
        star.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            font-size: ${Math.random() * 15 + 15}px;
            animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        starsContainer.appendChild(star);
    }
}

// Add hover effect to card
function setupCardAnimations() {
    const card = document.querySelector('.card');
    if (card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.01)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }

    // Add click effect to button
    const button = document.querySelector('.button2');
    if (button) {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                left: ${e.offsetX}px;
                top: ${e.offsetY}px;
            `;
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    }

    // Smooth scroll animations for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animation
    document.querySelectorAll('.Small-message, .Appreciation-card, .signature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Add hover effect to card (backup for non-envelope mode)
const card = document.querySelector('.card');
if (card) {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.01)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}

// Initialize on page load (only if envelope is not present)
window.addEventListener('load', () => {
    if (!envelopeWrapper) {
        initializeBirthdayAnimations();
    }
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(20);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Add sparkle effect on mouse move (only after envelope opens)
function enableMouseSparkles() {
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.95 && birthdayContent.classList.contains('revealed')) {
            const sparkle = document.createElement('div');
            sparkle.textContent = '✨';
            sparkle.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                font-size: 20px;
                pointer-events: none;
                z-index: 9999;
                animation: sparkleDisappear 1s ease-out forwards;
            `;
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1000);
        }
    });
}

const sparkleDisappearStyle = document.createElement('style');
sparkleDisappearStyle.textContent = `
    @keyframes sparkleDisappear {
        0% {
            opacity: 1;
            transform: translateY(0) scale(0);
        }
        50% {
            opacity: 1;
            transform: translateY(-20px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-40px) scale(0);
        }
    }
`;
document.head.appendChild(sparkleDisappearStyle);

// Enable sparkles after page load
window.addEventListener('load', enableMouseSparkles);

console.log('🎉 Birthday Card Ready! Click the envelope to open! 🎂');