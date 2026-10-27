/* Cabinet Avocat Andreea-Lavinia Mesaroș-Tomoiagă – interacțiuni pagină */
(function () {
  'use strict';

  // Configurare: completați adresa de e-mail a cabinetului pentru a o afișa pe site
  // și pentru ca formularul de contact să trimită mesajele pe e-mail.
  var CONFIG = {
    email: '',
    phone: '+40744771787',
    careerStart: new Date(2000, 0, 28), // 28 ianuarie 2000 – intrarea în profesie
    mapQuery: 'Strada Corneliu Coposu 2, Sighetu Marmației, Romania'
  };

  var header = document.querySelector('.site-header');
  var nav = document.getElementById('main-nav');
  var toggle = document.querySelector('.nav-toggle');

  /* ---------- Ani de experiență & an curent ---------- */
  var now = new Date();
  var years = now.getFullYear() - CONFIG.careerStart.getFullYear();
  if (now < new Date(now.getFullYear(), CONFIG.careerStart.getMonth(), CONFIG.careerStart.getDate())) years--;
  document.querySelectorAll('[data-years]').forEach(function (el) { el.textContent = years; });
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = now.getFullYear(); });

  /* ---------- E-mail ---------- */
  if (CONFIG.email) {
    document.querySelectorAll('[data-email]').forEach(function (a) {
      a.href = 'mailto:' + CONFIG.email;
      a.textContent = CONFIG.email;
    });
    document.querySelectorAll('[data-email-wrap]').forEach(function (el) { el.hidden = false; });
  }

  /* ---------- Header sticky: umbră la derulare ---------- */
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Meniu mobil ---------- */
  function closeNav() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Deschide meniul');
  }
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Închide meniul' : 'Deschide meniul');
  });
  nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });

  /* ---------- Link activ în meniu ---------- */
  var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (a) {
      var section = document.querySelector(a.getAttribute('href'));
      if (section) observer.observe(section);
    });
  }

  /* ---------- FAQ: un singur răspuns deschis ---------- */
  var faqItems = document.querySelectorAll('.accordion details');
  faqItems.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      faqItems.forEach(function (other) { if (other !== d) other.open = false; });
    });
  });

  /* ---------- Hartă (încărcată doar la cerere – GDPR) ---------- */
  var loadMap = document.getElementById('load-map');
  if (loadMap) {
    loadMap.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.src = 'https://maps.google.com/maps?q=' + encodeURIComponent(CONFIG.mapQuery) + '&z=16&output=embed';
      iframe.title = 'Harta sediului cabinetului de avocat';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      var map = document.getElementById('map');
      map.innerHTML = '';
      map.appendChild(iframe);
    });
  }

  /* ---------- Formular de contact ---------- */
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  function setError(input, message) {
    var field = input.closest('.field');
    field.classList.toggle('has-error', !!message);
    field.querySelector('.field-error').textContent = message || '';
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  function validate() {
    var ok = true;
    var name = form.elements.name;
    var phone = form.elements.phone;
    var email = form.elements.email;
    var message = form.elements.message;
    var gdpr = form.elements.gdpr;

    setError(name, name.value.trim().length < 3 ? 'Vă rugăm să introduceți numele complet.' : '');
    setError(phone, /^[+\d][\d\s().-]{8,}$/.test(phone.value.trim()) ? '' : 'Introduceți un număr de telefon valid.');
    setError(email, email.value.trim() && !email.checkValidity() ? 'Adresa de e-mail nu este validă.' : '');
    setError(message, message.value.trim().length < 10 ? 'Mesajul trebuie să aibă cel puțin 10 caractere.' : '');
    setError(gdpr, gdpr.checked ? '' : 'Este necesar acordul pentru a putea răspunde mesajului.');

    [name, phone, email, message, gdpr].some(function (input) {
      if (input.getAttribute('aria-invalid') === 'true') { input.focus(); ok = false; return true; }
      return false;
    });
    return ok;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.className = 'form-status';
    status.textContent = '';
    if (!validate()) return;

    var d = form.elements;
    var body = 'Nume: ' + d.name.value.trim() +
      '\nTelefon: ' + d.phone.value.trim() +
      (d.email.value.trim() ? '\nE-mail: ' + d.email.value.trim() : '') +
      '\n\n' + d.message.value.trim();

    var isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (CONFIG.email) {
      window.location.href = 'mailto:' + CONFIG.email +
        '?subject=' + encodeURIComponent('Solicitare consultație – ' + d.name.value.trim()) +
        '&body=' + encodeURIComponent(body);
      status.classList.add('is-success');
      status.textContent = 'Se deschide aplicația de e-mail cu mesajul dumneavoastră. Apăsați „Trimite” pentru a-l expedia.';
    } else if (isTouch) {
      window.location.href = 'sms:' + CONFIG.phone + '?body=' + encodeURIComponent(body);
      status.classList.add('is-success');
      status.textContent = 'Se deschide aplicația de mesaje cu textul dumneavoastră. Apăsați „Trimite” pentru a-l expedia.';
    } else {
      status.classList.add('is-error');
      status.textContent = 'Momentan mesajele se pot transmite doar telefonic. Vă rugăm să sunați la 0744 771 787.';
    }
  });

  form.querySelectorAll('input, textarea').forEach(function (input) {
    input.addEventListener('input', function () {
      if (input.getAttribute('aria-invalid') === 'true') setError(input, '');
    });
  });
})();
