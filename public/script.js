/* script.js
   Handles: preloader, nav toggle, smooth scroll, scroll reveal animations,
   testimonial slider, counters, gallery lightbox, and form submissions.
*/

// Utility: select helper
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// Wait for full load (images etc.) to hide preloader
window.addEventListener('load', () => {
  const pre = $('#preloader');
  if (pre) {
    pre.style.transition = 'opacity .45s ease';
    pre.style.opacity = '0';
    setTimeout(() => pre.remove(), 550);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Set copyright year
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = y;

  // Nav toggle for mobile (robust version)
  const navWrap = document.querySelector('.nav-wrap');
  const toggles = document.querySelectorAll('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  toggles.forEach(btn => 
    btn.addEventListener('click', () => {
      if (!navWrap) return;
      navWrap.classList.toggle('nav-open');
      if (navLinks) navLinks.classList.toggle('open');
      btn.classList.toggle('active');
    })
  );

  // Scroll effect for navbar background
  window.addEventListener('scroll', () => {
    if (!navWrap) return;
    if (window.scrollY > 60) {
      navWrap.classList.add('scrolled');
    } else {
      navWrap.classList.remove('scrolled');
    }
  });

  // Close nav on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navWrap?.classList.contains('nav-open')){
      navWrap.classList.remove('nav-open');
      const nav = document.querySelector('.nav-links'); if (nav) nav.classList.remove('open');
    }
  });

  // Close nav when clicking outside (mobile)
  document.addEventListener('click', (e) => {
    if (!navWrap?.classList.contains('nav-open')) return;
    const inside = e.target.closest('.nav-wrap');
    const toggleEl = e.target.closest('.nav-toggle');
    if (!inside && !toggleEl){
      navWrap.classList.remove('nav-open');
      const nav = document.querySelector('.nav-links'); if (nav) nav.classList.remove('open');
    }
  });

  // Smooth scroll for internal anchors
  document.body.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (href === '#' || href.startsWith('#') ){
      const target = document.querySelector(href);
      if (target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    }
  });

  // Scroll reveal using IntersectionObserver
  const reveals = $$('.reveal');
  const rObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        rObserver.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  reveals.forEach(el => rObserver.observe(el));

  // Testimonial slider (simple)
  const slides = $$('#test-slider .slide');
  if (slides.length > 0){
    let sIndex = 0;
    setInterval(() => {
      slides[sIndex].classList.remove('active');
      sIndex = (sIndex + 1) % slides.length;
      slides[sIndex].classList.add('active');
    }, 4000);
  }

  // Counters (animate when visible)
  const counters = $$('.counter strong');
  if (counters.length){
    const cObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          const el = entry.target;
          const target = +el.dataset.target || 0;
          const dur = 1600; // ms
          let start = null;
          const step = (ts) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / dur, 1);
            el.textContent = Math.floor(progress * target).toLocaleString();
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          cObserver.unobserve(el);
        }
      });
    }, {threshold:0.3});
    counters.forEach(c => cObserver.observe(c));
  }

  // Lightbox for gallery
  const gallery = $('#gallery');
  const lb = $('#lightbox');
  const lbImg = $('#lightbox-img');
  if (gallery && lb && lbImg){
    gallery.addEventListener('click', (e) => {
      const img = e.target.closest('img');
      if (!img) return;
      lbImg.src = img.dataset.large || img.src;
      lbImg.alt = img.alt || 'Gallery image';
      lb.classList.add('active');
    });
    $('.lb-close', lb).addEventListener('click', () => lb.classList.remove('active'));
    lb.addEventListener('click', (e) => { if (e.target === lb) lb.classList.remove('active'); });
  }

  // ✅ Contact form (Formspree) with proper error handling
  const contactForm = $('#contactForm');
  if (contactForm){
    const formMsg = $('#formMsg');
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = $('#name', contactForm)?.value.trim() || '';
      const email = $('#email', contactForm)?.value.trim() || '';
      const message = $('#message', contactForm)?.value.trim() || '';
      formMsg.textContent = '';

      if (!name || !email || !message){
        formMsg.textContent = 'Please fill in name, email, and message.';
        return;
      }

      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email)){
        formMsg.textContent = 'Please provide a valid email.';
        return;
      }

      formMsg.textContent = 'Sending...';

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) throw new Error(`Network response not OK (${response.status})`);

        contactForm.reset();
        formMsg.textContent = '✅ Thank you! Your message has been sent.';
      } catch (error) {
        console.error('Form submission error:', error);
        formMsg.textContent = '⚠️ Oops! Something went wrong. Please try again.';
      }
    });
  }

  // WhatsApp floating button
  const wa = document.getElementById('whatsapp');
  if (wa){
    wa.setAttribute('href', 'https://wa.me/919442846115');
    wa.setAttribute('target', '_blank');
  }

});

// ✅ Newsletter form (footer) handling - SonarQube-compliant
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm){
  newsletterForm.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const emailInput = document.getElementById('newsletterEmail');
    const msgEl = document.getElementById('newsletterMsg');
    if (!emailInput || !msgEl) return;
    const emailVal = emailInput.value.trim();
    msgEl.textContent = '';

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(emailVal)){
      msgEl.textContent = 'Please enter a valid email.';
      return;
    }

    msgEl.textContent = 'Subscribing...';

    const endpoint = newsletterForm.dataset.endpoint || '';
    if (endpoint){
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({email: emailVal})
        });
        if (!res.ok) throw new Error(`Network response not OK (${res.status})`);
        await res.json().catch(() => ({}));
        newsletterForm.reset();
        msgEl.textContent = '✅ Thanks — you are subscribed!';
      } catch (error) {
        console.error('Newsletter subscription error:', error);
        msgEl.textContent = '⚠️ Subscription failed. Please try again.';
      }
    } else {
      // Simulate async subscribe
      setTimeout(() => {
        newsletterForm.reset();
        msgEl.textContent = '✅ Thanks — you are subscribed!';
      }, 900);
    }
  });
}
// 🔹 Service Cards Scroll Reveal Animation
const serviceCards = document.querySelectorAll(".service-card");

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;

  serviceCards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < triggerBottom) {
      card.classList.add("show");
    } else {
      card.classList.remove("show");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
// 🔹 Testimonial Slider with Prev/Next Buttons
const testSlider = document.getElementById('test-slider');
if (testSlider){
  const slides = $$('#test-slider .slide');
  let sIndex = 0;

  // Create navigation buttons
  const prevBtn = document.createElement('button');
  prevBtn.textContent = '‹';
  prevBtn.className = 'slider-prev';
  const nextBtn = document.createElement('button');
  nextBtn.textContent = '›';
  nextBtn.className = 'slider-next';
  testSlider.appendChild(prevBtn);
  testSlider.appendChild(nextBtn);

  const showSlide = (idx) => {
    slides.forEach((slide, i) => slide.classList.toggle('active', i === idx));
  };

  prevBtn.addEventListener('click', () => {
    sIndex = (sIndex - 1 + slides.length) % slides.length;
    showSlide(sIndex);
  });
  nextBtn.addEventListener('click', () => {
    sIndex = (sIndex + 1) % slides.length;
    showSlide(sIndex);
  });

  // Auto-slide
  setInterval(() => {
    sIndex = (sIndex + 1) % slides.length;
    showSlide(sIndex);
  }, 4000);
}

// 🔹 Lightbox Navigation for Gallery
if (gallery && lb && lbImg){
  let galleryImages = Array.from(gallery.querySelectorAll('img'));
  let currentIndex = 0;

  const updateLightbox = (index) => {
    currentIndex = index;
    const img = galleryImages[currentIndex];
    lbImg.src = img.dataset.large || img.src;
    lbImg.alt = img.alt || 'Gallery image';
  };

  gallery.addEventListener('click', (e) => {
    const img = e.target.closest('img');
    if (!img) return;
    const index = galleryImages.indexOf(img);
    if (index === -1) return;
    updateLightbox(index);
    lb.classList.add('active');
  });

  // Add Prev/Next buttons
  const lbPrev = document.createElement('button');
  lbPrev.textContent = '‹';
  lbPrev.className = 'lb-prev';
  const lbNext = document.createElement('button');
  lbNext.textContent = '›';
  lbNext.className = 'lb-next';
  lb.appendChild(lbPrev);
  lb.appendChild(lbNext);

  lbPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightbox(currentIndex);
  });

  lbNext.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateLightbox(currentIndex);
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lb.classList.contains('active')) {
      lb.classList.remove('active');
    }
  });
}

