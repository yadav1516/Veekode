// script.js — FIXED VERSION
(function () {
  'use strict';

  const qs = (sel, ctx = document) => ctx.querySelector(sel);
  const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const body = document.body;

  // ---------- Navbar scroll ----------
  (function navbarScroll() {
      const navbar = qs('.navbar');
      if (!navbar) return;
      window.addEventListener('scroll', () => {
          if (window.scrollY > 50) navbar.classList.add('scrolled');
          else navbar.classList.remove('scrolled');
      }, { passive: true });
  })();

  // ---------- Testimonial slider ----------
  (function testimonialSlider() {
      const slider = qs('#testimonialsSlider');
      const cards = slider ? qsa('.testimonial-card', slider) : [];
      const dots = qsa('.dot');
      if (!cards.length) return;

      let current = 0;
      let timer = null;

      function show(i) {
          i = ((i % cards.length) + cards.length) % cards.length;
          cards.forEach(c => c.classList.remove('active'));
          dots.forEach(d => d.classList.remove('active'));
          cards[i].classList.add('active');
          if (dots[i]) dots[i].classList.add('active');
          current = i;
      }

      // dot clicks
      if (dots.length) {
          dots.forEach((d, idx) => d.addEventListener('click', () => {
              show(idx);
              // Restart autoplay on click
              if (timer) { clearInterval(timer); timer = setInterval(() => show(current + 1), 5000); }
          }));
      }

      // autoplay
      if (cards.length > 1) {
          timer = setInterval(() => show(current + 1), 5000);
          if (slider) {
              slider.addEventListener('mouseenter', () => { if (timer) clearInterval(timer); });
              slider.addEventListener('mouseleave', () => { timer = setInterval(() => show(current + 1), 5000); });
          }
      }

      show(0);
  })();

  // ---------- Smooth anchor scroll (ignore bare '#') ----------
  (function smoothAnchors() {
      qsa('a[href^="#"]').forEach(a => {
          a.addEventListener('click', function (ev) {
              const href = this.getAttribute('href');
              // Skip if it's just a placeholder link
              if (!href || href === '#') return;
              
              const target = document.querySelector(href);
              if (!target) return;
              
              ev.preventDefault();
              
              // Close mobile menu if open
              const hamburger = qs('.hamburger-btn');
              const mobileLinks = qs('.mobile-nav-links');
              if (hamburger && mobileLinks && hamburger.classList.contains('active')) {
                  mobileLinks.classList.remove('active');
                  hamburger.classList.remove('active');
                  hamburger.setAttribute('aria-expanded', 'false');
              }

              const headerOffset = 70; // adjust if your navbar height differs
              const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
              window.scrollTo({ top, behavior: 'smooth' });
          });
      });
  })();

  // ---------- Reveal on scroll (IntersectionObserver) ----------
  (function revealOnScroll() {
      const els = qsa('.service-card, .portfolio-item, .process-step, .team-member-float-card');
      if (!els.length) return;
      
      // Initial state for animation
      els.forEach(el => {
          el.style.opacity = '0';
          el.style.transform = 'translateY(30px)';
          el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      });

      if ('IntersectionObserver' in window) {
          const obs = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      entry.target.style.opacity = '1';
                      entry.target.style.transform = 'translateY(0)';
                      obs.unobserve(entry.target);
                  }
              });
          }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

          els.forEach(el => obs.observe(el));
      } else {
          // Fallback: reveal all immediately if no IntersectionObserver
          els.forEach(el => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; });
      }
  })();

  // ---------- Sidebar active state (Highlight current section) ----------
  // This is more complex and often done with a second IntersectionObserver to check
  // which section is in view, but for simple click effects, this is fine.
  (function sidebarLinks() {
      const links = qsa('.sidebar-link');
      if (!links.length) return;
      links.forEach(link => link.addEventListener('click', function () {
          links.forEach(l => l.classList.remove('active'));
          this.classList.add('active');
      }));
  })();


  // ---------- Mobile nav (hamburger) ----------
  (function mobileNav() {
      const hamburger = qs('.hamburger-btn');
      const mobileLinks = qs('.mobile-nav-links');
      if (!hamburger || !mobileLinks) return;

      hamburger.addEventListener('click', () => {
          const active = hamburger.classList.toggle('active');
          mobileLinks.classList.toggle('active');
          hamburger.setAttribute('aria-expanded', active ? 'true' : 'false');
      });

      qsa('.mobile-nav-links a').forEach(a => a.addEventListener('click', () => {
          mobileLinks.classList.remove('active');
          hamburger.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
      }));
  })();

  // ---------- Contact modal + form (hidden iframe method) - FIXED ----------
  (function contactModal() {
      const overlay = qs('#contactModalOverlay');
      const openBtns = qsa('.open-contact-modal');
      const closeBtn = qs('#closeModalBtn');
      const form = qs('#contactForm');
      const msg = qs('#formMessage');
      const iframe = qs('#hidden_iframe');

      if (!overlay || !openBtns.length || !form) return;

      function open() {
          // FIX: Use 'active' class for transitions + Body class for scroll lock
          overlay.classList.add('active');
          body.classList.add('modal-open');
          overlay.setAttribute('aria-hidden', 'false');
      }

      function close() {
          // FIX: Remove 'active' class for transitions + Body class for scroll lock
          overlay.classList.remove('active');
          body.classList.remove('modal-open');
          overlay.setAttribute('aria-hidden', 'true');
          
          // Cleanup state
          if (msg) msg.textContent = '';
          try { form.reset(); } catch (e) {}
          const s = form.querySelector('button[type="submit"]');
          if (s) s.disabled = false;
      }

      openBtns.forEach(b => b.addEventListener('click', (e) => { e.preventDefault(); open(); }));

      if (closeBtn) closeBtn.addEventListener('click', close);

      // Close on outside click
      overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
      // Close on Escape key
      document.addEventListener('keydown', (e) => { 
          if (e.key === 'Escape' && overlay.classList.contains('active')) close(); 
      });

      // Submit: don't fetch, post to hidden iframe
      form.addEventListener('submit', () => {
          if (msg) msg.textContent = 'Sending...';
          const s = form.querySelector('button[type="submit"]');
          if (s) s.disabled = true;
      });

      // Handle iframe load for success message
      if (iframe) {
          iframe.addEventListener('load', () => {
              // Delay for a visual success state before closing
              setTimeout(() => {
                  if (msg) { msg.textContent = 'Thanks! We got your message ✅'; msg.style.color = 'green'; }
                  try { form.reset(); } catch (e) {}
                  const s = form.querySelector('button[type="submit"]');
                  if (s) s.disabled = false;
                  setTimeout(close, 1000); // Close after showing success message
              }, 300);
          });
      }
  })();

  // final safety: catch unhandled errors in console (non-fatal)
  window.addEventListener('error', (ev) => {
      // console.warn('Non-fatal JS error:', ev.message);
  });

})();