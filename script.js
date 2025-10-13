// ===================================
// Smooth Scroll Navigation
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===================================
// Active Navigation Link on Scroll
// ===================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.style.opacity = '';
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.opacity = '1';
                } else {
                    link.style.opacity = '0.7';
                }
            });
        }
    });

    // Handle hero section specially (when at top)
    if (window.scrollY < sections[1].offsetTop - 150) {
        navLinks.forEach(link => {
            link.style.opacity = '1';
        });
    }
}

window.addEventListener('scroll', updateActiveLink);

// ===================================
// Fade-in Animation on Scroll
// ===================================

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe the about grid for fade-in animation
const aboutGrid = document.querySelector('.about-grid');
if (aboutGrid) {
    fadeInObserver.observe(aboutGrid);
}

// Observe skill cards for staggered fade-in animation
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
    // Add staggered delay for each card
    card.style.transitionDelay = `${index * 0.1}s`;
    fadeInObserver.observe(card);
});

// Observe research interests cards for fade-in animation
const interestsCards = document.querySelectorAll('.interests-card');
interestsCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
    fadeInObserver.observe(card);
});

// Observe research blocks for fade-in animation
const researchBlocks = document.querySelectorAll('.research-block');
researchBlocks.forEach((block, index) => {
    block.style.transitionDelay = `${index * 0.15}s`;
    fadeInObserver.observe(block);
});

// Observe research project cards for staggered fade-in animation
const researchProjectCards = document.querySelectorAll('.research-project-card');
researchProjectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    fadeInObserver.observe(card);
});

// Observe socials section elements for fade-in animation
const socialsIcons = document.querySelector('.socials-icons');
const blogAnnouncement = document.querySelector('.blog-announcement');
const contactSection = document.querySelector('.contact-section');

if (socialsIcons) {
    fadeInObserver.observe(socialsIcons);
}

if (blogAnnouncement) {
    fadeInObserver.observe(blogAnnouncement);
}

if (contactSection) {
    fadeInObserver.observe(contactSection);
}

// ===================================
// Accordion Functionality for Research Projects
// ===================================

const accordionCards = document.querySelectorAll('.accordion-card');

accordionCards.forEach(card => {
    const header = card.querySelector('.accordion-header');

    // Add keyboard accessibility
    header.setAttribute('role', 'button');
    header.setAttribute('tabindex', '0');
    header.setAttribute('aria-expanded', 'false');

    const toggleAccordion = () => {
        const isActive = card.classList.contains('active');

        // Optional: Close all other accordions (only one open at a time)
        // Comment out these lines if you want multiple accordions open at once
        accordionCards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.remove('active');
                otherCard.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            }
        });

        // Toggle the clicked accordion
        card.classList.toggle('active');
        header.setAttribute('aria-expanded', !isActive);
    };

    // Click event
    header.addEventListener('click', toggleAccordion);

    // Keyboard event (Enter or Space)
    header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleAccordion();
        }
    });
});

// ===================================
// Initialize on Load
// ===================================

window.addEventListener('load', () => {
    updateActiveLink();
});

// ===================================
// Keyboard Accessibility
// ===================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});
