/* Raja Roadlines — main.js */

// ── Mobile nav ───────────────────────────────────────────────
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const [s1, , s3] = hamburger.querySelectorAll('span');
    const open = mobileMenu.classList.contains('open');
    s1.style.transform = open ? 'rotate(45deg) translate(4.5px,4.5px)' : '';
    hamburger.querySelectorAll('span')[1].style.opacity = open ? '0' : '';
    s3.style.transform = open ? 'rotate(-45deg) translate(4.5px,-4.5px)' : '';
  });
}

// ── Active nav link ──────────────────────────────────────────
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

// ── Mouse-tracking spotlight on cards ───────────────────────
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mx', x + 'px');
    card.style.setProperty('--my', y + 'px');
    card.style.backgroundImage = `
      radial-gradient(300px circle at var(--mx) var(--my), rgba(204,34,34,0.06), transparent 70%),
      linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.backgroundImage = '';
  });
});

// ── Scroll-triggered fade-up ─────────────────────────────────
const fadeEls = document.querySelectorAll('.fade-up');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      fadeObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
fadeEls.forEach((el, i) => {
  el.style.transitionDelay = (i % 6) * 80 + 'ms';
  fadeObserver.observe(el);
});

// ── Hero parallax on scroll ──────────────────────────────────
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const opacity = Math.max(0, 1 - y / 500);
    const scale = Math.max(0.95, 1 - y / 8000);
    heroContent.style.opacity = opacity;
    heroContent.style.transform = `translateY(${y * 0.15}px) scale(${scale})`;
  }, { passive: true });
}

// ── Stats count-up on scroll ─────────────────────────────────
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-count]').forEach(el => {
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        let count = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          count = Math.min(count + step, target);
          el.textContent = count + suffix;
          if (count >= target) clearInterval(timer);
        }, 28);
      });
      statsObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
const statsEl = document.querySelector('.stats-strip');
if (statsEl) statsObserver.observe(statsEl);

// ── Contact form AJAX ────────────────────────────────────────
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    const orig = btn.textContent;
    btn.textContent = 'Sending…'; btn.disabled = true;
    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const res = await fetch(form.action, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
      });
      if (res.ok) {
        form.innerHTML = `
          <div style="text-align:center;padding:48px 0;">
            <div style="font-size:44px;margin-bottom:16px;">✅</div>
            <h3 style="color:var(--fg);margin-bottom:8px;">Enquiry Sent!</h3>
            <p>We'll get back to you within 24 hours. For urgent bookings, call directly on 9326055414.</p>
          </div>`;
      } else { throw new Error(); }
    } catch {
      btn.textContent = orig; btn.disabled = false;
      alert('Something went wrong. Please call us directly on 9326055414.');
    }
  });
}
