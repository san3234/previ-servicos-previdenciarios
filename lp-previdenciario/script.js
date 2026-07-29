/**
 * Previ - Servicos Previdenciarios
 */

document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initForms();
  initPhoneInput();
  initYear();
  initCounters();
  initHeader();
  initHeroParallax();
  initProblemaReveal();
  initSolucaoTimeline();
  initServicos();
  initFunciona();
  initDepoimentos();
  initFAQ();
});

/* ==========================================
   AOS
   ========================================== */

function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
      easing: 'ease-out-cubic',
      disableMutationObserver: true
    });
  }
}

/* ==========================================
   FORMULARIOS
   ========================================== */

const tempEmailDomains = [
  'tempmail', 'guerrillamail', '10minutemail', 'mailinator',
  'throwaway', 'fakeinbox', 'yopmail', 'trashmail', 'temp-mail',
  'disposable', 'sharklasers'
];

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return false;
  const domain = email.split('@')[1].toLowerCase();
  return !tempEmailDomains.some(temp => domain.includes(temp));
}

function initForms() {
  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
  });
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const btn = form.querySelector('[type="submit"]');
  const feedback = form.querySelector('.form-feedback');

  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    field.classList.remove('error');

    if (!field.value.trim()) {
      field.classList.add('error');
      valid = false;
    }

    if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
      field.classList.add('error');
      valid = false;
    }

    if (field.type === 'tel') {
      const iti = field._iti;
      if (iti && !iti.isValidNumber()) {
        field.classList.add('error');
        valid = false;
      }
    }
  });

  if (!valid) {
    showFeedback(feedback, 'error', 'Preencha todos os campos corretamente.');
    return;
  }

  const nome = form.querySelector('[name="nome"]')?.value || '';
  const email = form.querySelector('[name="email"]')?.value || '';

  const phone = form.querySelector('input[type="tel"]');
  if (phone && phone._iti) {
    phone.value = phone._iti.getNumber();
  }

  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Enviando...';

  try {
    const res = await fetch(form.getAttribute('action') || window.location.pathname, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    });

    if (res.ok) {
      if (typeof fbq === 'function') {
        fbq('track', 'Lead');
      }

      if (typeof dataLayer !== 'undefined') {
        dataLayer.push({ event: 'generate_lead', form_name: form.getAttribute('name') || 'contato', method: 'netlify_form' });
      }

      const action = form.getAttribute('action');
      if (action) {
        const redirectUrl = new URL(action, window.location.origin);

        new URLSearchParams(window.location.search).forEach((value, key) => {
          redirectUrl.searchParams.set(key, value);
        });

        if (nome) redirectUrl.searchParams.set('nome', nome);
        if (email) redirectUrl.searchParams.set('email', email);

        window.location.href = redirectUrl.toString();
        return;
      }

      showFeedback(feedback, 'success', 'Mensagem enviada com sucesso!');
      form.reset();
      if (phone && phone._iti) phone._iti.setNumber('');
    } else {
      throw new Error('Erro');
    }
  } catch {
    showFeedback(feedback, 'error', 'Erro ao enviar. Tente novamente.');
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
}

function showFeedback(el, type, msg) {
  if (!el) return;
  el.className = 'form-feedback ' + type;
  el.textContent = msg;
  setTimeout(() => {
    el.className = 'form-feedback';
    el.textContent = '';
  }, 5000);
}

/* ==========================================
   TELEFONE INTERNACIONAL
   ========================================== */

function initPhoneInput() {
  if (typeof intlTelInput === 'undefined') return;

  document.querySelectorAll('input[type="tel"]').forEach(input => {
    input._iti = intlTelInput(input, {
      initialCountry: 'br',
      preferredCountries: ['br', 'us', 'pt'],
      separateDialCode: true,
      strictMode: true,
      loadUtilsOnInit: 'https://cdn.jsdelivr.net/npm/intl-tel-input@24.6.0/build/js/utils.js'
    });
  });
}

/* ==========================================
   COUNTER ANIMATION
   Anima numeros de 0 ate data-count-to quando o elemento entra na tela
   ========================================== */

function initCounters() {
  const counters = document.querySelectorAll('[data-count-to]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.countTo, 10);
  const suffix = el.dataset.countSuffix || '';
  const plain = el.dataset.countPlain === 'true';
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    el.textContent = (plain ? String(value) : value.toLocaleString('pt-BR')) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

/* ==========================================
   HEADER (Sticky + menu mobile)
   ========================================== */

function initHeader() {
  const header = document.getElementById('site-header');
  const burger = document.getElementById('burger-btn');
  const panel = document.getElementById('mobile-panel');
  const closeBtn = document.getElementById('mobile-panel-close');
  if (!header) return;

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle('header--scrolled', window.scrollY > 80);
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function openPanel() {
    panel.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closePanel() {
    panel.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  burger?.addEventListener('click', () => {
    panel.classList.contains('is-open') ? closePanel() : openPanel();
  });
  closeBtn?.addEventListener('click', closePanel);
  panel?.querySelectorAll('a').forEach(a => a.addEventListener('click', closePanel));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) closePanel();
  });
}

/* ==========================================
   HERO PARALLAX
   Camadas se movem em velocidades diferentes ao rolar.
   Ativo apenas enquanto o hero esta no viewport.
   ========================================== */

function initHeroParallax() {
  const hero = document.querySelector('.hero');
  const top = document.querySelector('.hero__top');
  const fill = document.querySelector('.hero__band-fill');
  const seam = document.querySelector('.hero__band-seam');
  if (!hero || !top || !fill || !seam) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let heroActive = true;
  let ticking = false;

  const observer = new IntersectionObserver(([entry]) => {
    heroActive = entry.isIntersecting;
  }, { threshold: 0 });
  observer.observe(hero);

  function update() {
    if (heroActive) {
      const scale = matchMedia('(max-width: 640px)').matches ? 0.5 : 1;
      // Limita o deslocamento para o friso nunca abrir um vao grande no topo da faixa
      const y = Math.min(window.scrollY, 320);
      top.style.transform = `translate3d(0, ${-y * 0.08 * scale}px, 0)`;
      fill.style.transform = `translate3d(0, ${y * 0.18 * scale}px, 0)`;
      seam.style.transform = `translate3d(0, ${y * 0.26 * scale}px, 0)`;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}

/* ==========================================
   O PROBLEMA - Text Reveal por linha
   ========================================== */

function initProblemaReveal() {
  const title = document.querySelector('.problema__title');
  if (!title) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        title.classList.add('is-revealed');
        observer.unobserve(title);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(title);
}

/* ==========================================
   SOLUCAO - Timeline com linha desenhada ao scroll
   ========================================== */

function initSolucaoTimeline() {
  const section = document.querySelector('.solucao');
  const progress = document.getElementById('solucao-progress');
  const steps = document.querySelectorAll('.solucao__step');
  const counter = document.getElementById('solucao-current');
  if (!section || !progress) return;

  let ticking = false;

  function update() {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height + vh;
    const scrolled = vh - rect.top;
    const pct = Math.min(Math.max(scrolled / total, 0), 1);
    progress.style.strokeDashoffset = String(100 - pct * 100);
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  update();

  if (steps.length) {
    const stepObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('is-active', entry.isIntersecting);
        if (entry.isIntersecting && counter) {
          const index = Array.from(steps).indexOf(entry.target) + 1;
          counter.textContent = String(index).padStart(2, '0');
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px' });

    steps.forEach(step => stepObserver.observe(step));
  }
}

/* ==========================================
   SERVICOS - Scroll horizontal (setas + drag)
   ========================================== */

function initServicos() {
  const track = document.getElementById('servicos-track');
  const prev = document.querySelector('.servicos__arrow--prev');
  const next = document.querySelector('.servicos__arrow--next');
  const progressFill = document.getElementById('servicos-progress-fill');
  const counter = document.getElementById('servicos-current');
  const cards = document.querySelectorAll('.servicos__card');
  if (!track) return;

  prev?.addEventListener('click', () => track.scrollBy({ left: -320, behavior: 'smooth' }));
  next?.addEventListener('click', () => track.scrollBy({ left: 320, behavior: 'smooth' }));

  let isDown = false;
  let startX = 0;
  let scrollStart = 0;

  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch') return;
    isDown = true;
    startX = e.clientX;
    scrollStart = track.scrollLeft;
    track.setPointerCapture(e.pointerId);
  });

  track.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    track.scrollLeft = scrollStart - (e.clientX - startX);
  });

  track.addEventListener('pointerup', () => { isDown = false; });
  track.addEventListener('pointercancel', () => { isDown = false; });

  /* Barra de progresso + contador do card ativo */
  let ticking = false;

  function update() {
    const maxScroll = track.scrollWidth - track.clientWidth;
    const progress = maxScroll > 0 ? track.scrollLeft / maxScroll : 0;
    if (progressFill) progressFill.style.width = Math.max(6, progress * 100) + '%';
    ticking = false;
  }

  track.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  update();

  if (cards.length && counter) {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('is-active', entry.isIntersecting);
        if (entry.isIntersecting) {
          const index = Array.from(cards).indexOf(entry.target) + 1;
          counter.textContent = String(index).padStart(2, '0');
        }
      });
    }, { root: track, threshold: 0.6 });

    cards.forEach(card => cardObserver.observe(card));
  }
}

/* ==========================================
   COMO FUNCIONA - Reveal on demand
   ========================================== */

function initFunciona() {
  document.querySelectorAll('.funciona__step').forEach(step => {
    step.addEventListener('click', () => {
      const expanded = step.getAttribute('aria-expanded') === 'true';
      step.setAttribute('aria-expanded', String(!expanded));
    });
  });
}

/* ==========================================
   DEPOIMENTOS - Carousel (fade + slide)
   ========================================== */

function initDepoimentos() {
  const slides = document.querySelectorAll('.depoimentos__slide');
  const dots = document.querySelectorAll('.depoimentos__dot');
  const track = document.querySelector('.depoimentos__track');
  if (!slides.length) return;

  let current = 0;
  let autoplayId = null;

  function goTo(index) {
    slides[current]?.classList.remove('is-active');
    dots[current]?.classList.remove('is-active');
    dots[current]?.setAttribute('aria-selected', 'false');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('is-active');
    dots[current]?.classList.add('is-active');
    dots[current]?.setAttribute('aria-selected', 'true');
  }

  function next() {
    goTo(current + 1);
  }

  function startAutoplay() {
    stopAutoplay();
    if (slides.length > 1) autoplayId = setInterval(next, 7000);
  }

  function stopAutoplay() {
    if (autoplayId) clearInterval(autoplayId);
    autoplayId = null;
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goTo(i);
      startAutoplay();
    });
  });

  const prevBtn = document.querySelector('.depoimentos__arrow--prev');
  const nextBtn = document.querySelector('.depoimentos__arrow--next');
  prevBtn?.addEventListener('click', () => { goTo(current - 1); startAutoplay(); });
  nextBtn?.addEventListener('click', () => { goTo(current + 1); startAutoplay(); });

  track?.addEventListener('mouseenter', stopAutoplay);
  track?.addEventListener('mouseleave', startAutoplay);
  track?.addEventListener('focusin', stopAutoplay);
  track?.addEventListener('focusout', startAutoplay);

  let touchStartX = 0;
  track?.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    stopAutoplay();
  }, { passive: true });

  track?.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goTo(current - 1) : goTo(current + 1);
    }
    startAutoplay();
  }, { passive: true });

  startAutoplay();
}

/* ==========================================
   FAQ - Split Vertical (pergunta ativa + painel)
   ========================================== */

function initFAQ() {
  const faq = document.querySelector('.faq');
  const questions = document.querySelectorAll('.faq__question');
  const indicator = document.querySelector('.faq__indicator');
  if (!faq || !questions.length) return;

  function updateIndicator(question) {
    if (!indicator) return;
    indicator.style.top = question.offsetTop + 'px';
    indicator.style.height = question.offsetHeight + 'px';
  }

  function setActive(question) {
    questions.forEach(q => {
      const isActive = q === question;
      q.classList.toggle('is-active', isActive);
      q.setAttribute('aria-expanded', String(isActive));

      const answer = document.getElementById(q.getAttribute('aria-controls'));
      if (answer) answer.classList.toggle('is-active', isActive);
    });
    updateIndicator(question);
  }

  questions.forEach((q, i) => {
    q.addEventListener('click', () => setActive(q));
    q.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        questions[(i + 1) % questions.length].focus();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        questions[(i - 1 + questions.length) % questions.length].focus();
      }
    });
  });

  const initial = document.querySelector('.faq__question.is-active') || questions[0];
  requestAnimationFrame(() => updateIndicator(initial));

  window.addEventListener('resize', () => {
    const active = document.querySelector('.faq__question.is-active');
    if (active) updateIndicator(active);
  });
}

/* ==========================================
   UTILS
   ========================================== */

function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}
