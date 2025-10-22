import './style.css'
import ScrollReveal from 'scrollreveal'

// Initialize ScrollReveal
const sr = ScrollReveal({
    distance: '40px',
    duration: 1000,
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
    reset: false 
});

// --- Hero Section Animations ---
sr.reveal('.hero-title', {
    origin: 'left',
    delay: 200,
    distance: '50px'
});

sr.reveal('.hero-subtitle', {
    origin: 'left',
    delay: 400,
    distance: '30px'
});

sr.reveal('.hero-actions', {
    origin: 'bottom',
    delay: 600,
    distance: '20px'
});

sr.reveal('.reveal-metric', {
    scale: 0.8,
    delay: 800
});

// --- General Section Reveals ---
sr.reveal('.section-title', {
    origin: 'top',
    distance: '20px',
    delay: 100
});

sr.reveal('.section-subtitle', {
    origin: 'top',
    distance: '20px',
    delay: 200
});

// --- Card and Grid Reveals (Staggered) ---
sr.reveal('.reveal-card', {
    interval: 100,
    origin: 'bottom',
    distance: '30px',
    scale: 0.98
});

// --- Metrics and Audience Lists ---
sr.reveal('.metric-item', {
    interval: 150,
    origin: 'bottom',
    distance: '20px'
});

sr.reveal('.audience-list', {
    origin: 'top',
    distance: '20px',
    delay: 300
});

// --- Contact Form Reveal ---
sr.reveal('.contact-form', {
    origin: 'bottom',
    distance: '40px',
    delay: 300
});

sr.reveal('.alternate-contact', {
    origin: 'bottom',
    distance: '20px',
    delay: 500
});
import './style.css'
import ScrollReveal from 'scrollreveal'

// Initialize ScrollRevead

// --- Hero Section Animations ---
sr.reveal('.hero-title', {
    origin: 'left',
    delay: 200,
    distance: '50px'
});

sr.reveal('.hero-subtitle', {
    origin: 'left',
    delay: 400,
    distance: '30px'
});

sr.reveal('.hero-actions', {
    origin: 'bottom',
    delay: 600,
    distance: '20px'
});

sr.reveal('.reveal-metric', {
    scale: 0.8,
    delay: 800
});

// --- General Section Reveals ---
sr.reveal('.section-title', {
    origin: 'top',
    distance: '20px',
    delay: 100
});

sr.reveal('.section-subtitle', {
    origin: 'top',
    distance: '20px',
    delay: 200
});

// --- Card and Grid Reveals (Staggered) ---
sr.reveal('.reveal-card', {
    interval: 100,
    origin: 'bottom',
    distance: '30px',
    scale: 0.98
});

// --- Metrics and Audience Lists ---
sr.reveal('.metric-item', {
    interval: 150,
    origin: 'bottom',
    distance: '20px'
});

sr.reveal('.audience-list', {
    origin: 'top',
    distance: '20px',
    delay: 300
});

// --- Contact Form Reveal ---
sr.reveal('.contact-form', {
    origin: 'bottom',
    distance: '40px',
    delay: 300
});

sr.reveal('.alternate-contact', {
    origin: 'bottom',
    distance: '20px',
    delay: 500
});

// Extra '}' bracket removed from here