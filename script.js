/* =========================================================
   DARIYA DIGITAL — script.js
   ========================================================= */

// --- Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// --- Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const isOpen = mobileMenu.classList.contains('open');
  const bars = menuToggle.querySelectorAll('span');
  if (isOpen) {
    bars[0].style.transform = 'translateY(7px) rotate(45deg)';
    bars[1].style.opacity   = '0';
    bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
  }
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuToggle.querySelectorAll('span').forEach(b => {
      b.style.transform = '';
      b.style.opacity   = '';
    });
  });
});

// --- Scroll reveal
const revealEls = document.querySelectorAll(
  '.service-card, .process__step, .testimonial-card, .pricing-card, .stat, .contact__info, .contact__form, .it-service-item, .it-partner-card'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => observer.observe(el));

// --- Contact form
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn      = contactForm.querySelector('.btn');
  const btnText  = btn.querySelector('.btn-text');
  const btnLoad  = btn.querySelector('.btn-loading');

  btn.disabled      = true;
  btnText.style.display = 'none';
  btnLoad.style.display = 'inline';

  // Simulate async submission (wire up to your backend / Formspree / EmailJS)
  setTimeout(() => {
    btn.disabled      = false;
    btnText.style.display = 'inline';
    btnLoad.style.display = 'none';
    contactForm.reset();
    formSuccess.style.display = 'block';
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 1400);
});

// --- Smooth anchor scroll (fallback for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// --- Number count-up animation on hero stats
function countUp(el, target, duration = 1200) {
  const isDecimal = target % 1 !== 0;
  let start   = 0;
  const step  = 16;
  const steps = Math.ceil(duration / step);
  const inc   = target / steps;
  const timer = setInterval(() => {
    start += inc;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = isDecimal ? start.toFixed(1) : Math.floor(start);
  }, step);
}

const statsSection = document.querySelector('.hero__stats');
if (statsSection) {
  const statObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat__num').forEach(el => {
        const raw = el.textContent.replace(/[^0-9.]/g, '');
        if (raw) countUp(el, parseFloat(raw));
      });
      statObserver.unobserve(statsSection);
    }
  }, { threshold: 0.5 });
  statObserver.observe(statsSection);
}
