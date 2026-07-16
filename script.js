// ===== Navbar: fundo ao rolar + menu mobile =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

hamburger.addEventListener('click', () => {
  navbar.classList.toggle('menu-open');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => navbar.classList.remove('menu-open'));
});

// ===== Acordeão FAQ =====
document.querySelectorAll('.accordion-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.accordion-item');
    const panel = item.querySelector('.accordion-panel');
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.accordion-item.active').forEach(openItem => {
      if (openItem !== item) {
        openItem.classList.remove('active');
        openItem.querySelector('.accordion-panel').style.maxHeight = null;
      }
    });

    if (isActive) {
      item.classList.remove('active');
      panel.style.maxHeight = null;
    } else {
      item.classList.add('active');
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
});

// ===== Slider de depoimentos =====
const track = document.getElementById('testimonialTrack');
const cards = track ? Array.from(track.children) : [];
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');
let currentSlide = 0;

function updateSlider() {
  if (window.innerWidth > 1024) {
    track.style.transform = 'translateX(0)';
    return;
  }
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

if (track) {
  track.style.transition = 'transform 0.4s ease';
  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + cards.length) % cards.length;
    updateSlider();
  });
  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % cards.length;
    updateSlider();
  });
  window.addEventListener('resize', updateSlider, { passive: true });
}

// ===== Contagem animada dos números =====
const statNumbers = document.querySelectorAll('.stat-number');

function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = `${prefix}${value}${suffix}`;
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = `${prefix}${target}${suffix}`;
    }
  }
  requestAnimationFrame(tick);
}

// ===== Intersection Observer: reveal + contagem =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      // will-change só durante a transição (evita ghosting de camada de GPU
      // permanente — nunca deixar will-change fixo em dezenas de elementos).
      el.style.willChange = 'opacity, transform';
      el.classList.add('in-view');
      el.addEventListener('transitionend', () => { el.style.willChange = 'auto'; }, { once: true });
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      statNumbers.forEach(animateCount);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

const statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);

// ===== Botão flutuante do WhatsApp =====
const whatsappFloat = document.getElementById('whatsappFloat');
setTimeout(() => {
  whatsappFloat.classList.add('visible');
}, 3000);

// ===== Ano dinâmico no footer =====
document.getElementById('year').textContent = new Date().getFullYear();
