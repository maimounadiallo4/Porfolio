// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let isValid = true;

        // Simple validation
        if (!name.value.trim()) {
            showError(name, 'Le nom est requis');
            isValid = false;
        } else {
            removeError(name);
        }

        if (!email.value.trim()) {
            showError(email, 'L\'email est requis');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Veuillez entrer un email valide');
            isValid = false;
        } else {
            removeError(email);
        }

        if (!message.value.trim()) {
            showError(message, 'Le message est requis');
            isValid = false;
        } else {
            removeError(message);
        }

        if (isValid) {
            // Here you would typically send the form data to a server
            alert('Message envoyé avec succès!');
            form.reset();
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Show error message
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector('.error-message') || document.createElement('div');
    errorDiv.className = 'error-message text-danger mt-2';
    errorDiv.textContent = message;
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorDiv);
    }
    input.classList.add('is-invalid');
}

// Remove error message
function removeError(input) {
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector('.error-message');
    if (errorDiv) {
        formGroup.removeChild(errorDiv);
    }
    input.classList.remove('is-invalid');
}

// Navbar active state on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add animation on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .timeline-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease-out';
    observer.observe(element);
});

// Animate progress bars when in viewport
const progressBars = document.querySelectorAll('.progress-bar');
const progressObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const targetWidth = progressBar.getAttribute('aria-valuenow') + '%';
            progressBar.style.width = targetWidth;
            observer.unobserve(progressBar);
        }
    });
}, {
    threshold: 0.1
});

progressBars.forEach(bar => {
    bar.style.width = '0%';
    progressObserver.observe(bar);
});

// Timeline animation
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// Animation des barres de progression des compétences
document.addEventListener('DOMContentLoaded', function() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const percentage = skillBar.closest('.skill-item').getAttribute('data-skill');
                skillBar.style.width = percentage;
                skillBar.style.opacity = '1';
            }
        });
    }, {
        threshold: 0.2
    });

    // Initialiser les barres de progression
    skillLevels.forEach(skillBar => {
        skillBar.style.width = '0';
        skillBar.style.opacity = '0';
        skillBar.style.transition = 'width 1s ease-out, opacity 0.5s ease-out';
        skillObserver.observe(skillBar);
    });
});

// Animation des cartes de compétences
document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const skillLevels = card.querySelectorAll('.skill-level');
            skillLevels.forEach(level => {
                level.style.transform = 'scaleX(1.02)';
            });
        });

        card.addEventListener('mouseleave', () => {
            const skillLevels = card.querySelectorAll('.skill-level');
            skillLevels.forEach(level => {
                level.style.transform = 'scaleX(1)';
            });
        });
    });
});

// Animation de la timeline de formation
document.addEventListener('DOMContentLoaded', function() {
    const timelineBlocks = document.querySelectorAll('.timeline-block');
    const timelineOptions = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.15
    };

    const timelineObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animation du point de la timeline
                const dot = entry.target.querySelector('.timeline-dot');
                dot.style.transform = 'translateX(-50%) scale(1)';
                dot.style.opacity = '1';

                // Animation de la carte
                const card = entry.target.querySelector('.timeline-card');
                card.style.transform = 'translateX(0)';
                card.style.opacity = '1';

                // Animation des skill tags avec délai
                const skillTags = entry.target.querySelectorAll('.skill-tag');
                skillTags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.transform = 'translateX(0)';
                        tag.style.opacity = '1';
                    }, 100 * index);
                });

                // Animation des achievement items
                const achievements = entry.target.querySelectorAll('.achievement-item');
                achievements.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.transform = 'translateY(0)';
                        item.style.opacity = '1';
                    }, 200 * index);
                });

                observer.unobserve(entry.target);
            }
        });
    }, timelineOptions);

    // Initialisation des styles pour l'animation
    timelineBlocks.forEach(block => {
        const dot = block.querySelector('.timeline-dot');
        const card = block.querySelector('.timeline-card');
        const skillTags = block.querySelectorAll('.skill-tag');
        const achievements = block.querySelectorAll('.achievement-item');

        // Style initial du point
        dot.style.transform = 'translateX(-50%) scale(0.5)';
        dot.style.opacity = '0';
        dot.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

        // Style initial de la carte
        card.style.transform = block.classList.contains('even') ? 'translateX(-50px)' : 'translateX(50px)';
        card.style.opacity = '0';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

        // Style initial des skill tags
        skillTags.forEach(tag => {
            tag.style.transform = 'translateX(-20px)';
            tag.style.opacity = '0';
            tag.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        // Style initial des achievements
        achievements.forEach(item => {
            item.style.transform = 'translateY(20px)';
            item.style.opacity = '0';
            item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        // Observation du bloc
        timelineObserver.observe(block);
    });

    // Animation au survol des points de la timeline
    document.querySelectorAll('.timeline-dot').forEach(dot => {
        dot.addEventListener('mouseenter', () => {
            dot.style.transform = 'translateX(-50%) scale(1.1)';
            dot.style.boxShadow = 'var(--shadow-lg)';
        });

        dot.addEventListener('mouseleave', () => {
            dot.style.transform = 'translateX(-50%) scale(1)';
            dot.style.boxShadow = 'var(--shadow-md)';
        });
    });
}); 