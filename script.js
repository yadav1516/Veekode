// --- Navbar scroll ---
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// --- Testimonial slider ---
const testimonialSlider = document.getElementById('testimonialsSlider');
const testimonialCards = testimonialSlider.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function showSlide(index) {
  testimonialCards.forEach(card => card.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  testimonialCards[index].classList.add('active');
  dots[index].classList.add('active');
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});

setInterval(() => {
  currentSlide = (currentSlide + 1) % testimonialCards.length;
  showSlide(currentSlide);
}, 5000);

// --- Smooth scroll for anchors ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 70;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});

// --- Intersection observer animations ---
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.service-card, .portfolio-item, .process-step, .team-member-float-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// --- Sidebar active links ---
document.querySelectorAll('.sidebar-link').forEach(link => {
  link.addEventListener('click', function (e) {
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

// --- Contact Modal + Form (iframe method) ---
const contactModalOverlay = document.getElementById('contactModalOverlay');
const openContactModalBtns = document.querySelectorAll('.open-contact-modal');
const closeModalBtn = document.getElementById('closeModalBtn');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const iframe = document.getElementById('hidden_iframe');
const submitBtn = contactForm.querySelector('button[type="submit"]');

function openModal() {
  contactModalOverlay.style.display = 'flex'; // Use flex instead of 'active' class
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  contactModalOverlay.style.display = 'none'; // Use none instead of 'active' class
  document.body.style.overflow = '';
  formMessage.textContent = '';
  contactForm.reset();
  if (submitBtn) {
    submitBtn.disabled = false;
  }
}

openContactModalBtns.forEach(btn => {
  btn.addEventListener('click', e => { e.preventDefault(); openModal(); });
});

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal);
}

if (contactModalOverlay) {
  contactModalOverlay.addEventListener('click', e => { if (e.target === contactModalOverlay) closeModal(); });
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// --- Form submission via hidden iframe ---
if (contactForm) {
  contactForm.addEventListener('submit', () => {
    formMessage.textContent = 'Sending...';
    if (submitBtn) {
      submitBtn.disabled = true;
    }
  });
}

if (iframe) {
  iframe.addEventListener('load', () => {
    setTimeout(() => {
      formMessage.textContent = 'Thanks! We got your message ✅';
      contactForm.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
      }
      setTimeout(() => contactModalOverlay.style.display = 'none', 700);
    }, 300);
  });
}

// --- Mobile navigation menu ---
// document.addEventListener('DOMContentLoaded', () => {
//   const hamburgerBtn = document.querySelector('.hamburger-btn');
//   const mobileNavLinks = document.querySelector('.mobile-nav-links');

//   if (hamburgerBtn && mobileNavLinks) {
//     hamburgerBtn.addEventListener('click', () => {
//       mobileNavLinks.classList.toggle('active');
//     });
//   }
// --- Mobile navigation menu ---
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileNavLinks = document.querySelector('.mobile-nav-links');
  const linksInMenu = document.querySelectorAll('.mobile-nav-links a');

  if (hamburgerBtn && mobileNavLinks) {
    
    hamburgerBtn.addEventListener('click', () => {
      // बटन पर 'active' क्लास टॉगल करें
      hamburgerBtn.classList.toggle('active');
      
      // मेनू पर 'active' क्लास टॉगल करें
      mobileNavLinks.classList.toggle('active');

      // एक्सेसिबिलिटी एट्रीब्यूट को अपडेट करें
      const isExpanded = hamburgerBtn.classList.contains('active');
      hamburgerBtn.setAttribute('aria-expanded', isExpanded);
    });

    linksInMenu.forEach(link => {
      link.addEventListener('click', () => {
        // लिंक पर क्लिक करने पर, दोनों को बंद करें
        mobileNavLinks.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
});