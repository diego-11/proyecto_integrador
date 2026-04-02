// ===== MAIN.JS — Proyecto Integrador: Diseño e Interacción de Usuario =====

document.addEventListener('DOMContentLoaded', function () {

  // ── 1. Inicializar componentes Materialize ──────────────────────────────
  M.AutoInit();

  // Sidenav
  const sidenavElems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sidenavElems, { edge: 'right' });

  // Collapsibles
  const collapsibleElems = document.querySelectorAll('.collapsible');
  M.Collapsible.init(collapsibleElems);

  // Modals
  const modalElems = document.querySelectorAll('.modal');
  M.Modal.init(modalElems, { opacity: 0.6 });

  // ── 2. Marcar enlace activo en navbar ───────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav ul li a, .sidenav li a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) link.classList.add('active');
  });

  // ── 3. Toast de bienvenida (solo en index) ──────────────────────────────
  if (currentPage === 'index.html' || currentPage === '') {
    setTimeout(() => {
      M.toast({ html: '👋 Bienvenido al sitio del proyecto', classes: 'rounded', displayLength: 3000 });
    }, 1200);
  }

  // ── 4. Fade-in al hacer scroll ──────────────────────────────────────────
  const fadeEls = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => observer.observe(el));

  // ── 5. Validación del formulario de contacto ────────────────────────────
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nombre = document.getElementById('nombre').value.trim();
      const correo = document.getElementById('correo').value.trim();
      const mensaje = document.getElementById('mensaje').value.trim();

      // Validar campos vacíos
      if (!nombre || !correo || !mensaje) {
        M.toast({ html: '⚠️ Por favor completa todos los campos.', displayLength: 3000 });
        return;
      }

      // Validar formato de correo
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(correo)) {
        M.toast({ html: '⚠️ Ingresa un correo electrónico válido.', displayLength: 3000 });
        return;
      }

      // Validar longitud del mensaje
      if (mensaje.length < 10) {
        M.toast({ html: '⚠️ El mensaje debe tener al menos 10 caracteres.', displayLength: 3000 });
        return;
      }

      // Éxito
      form.reset();
      // Re-init labels de Materialize
      M.updateTextFields();
      document.querySelectorAll('.materialize-textarea').forEach(el => {
        M.textareaAutoResize(el);
      });

      M.toast({ html: '✅ ¡Mensaje enviado con éxito! Pronto nos pondremos en contacto.', displayLength: 4000 });
    });
  }

  // ── 6. Cambio de color de fondo en avances ──────────────────────────────
  const colorBtn = document.getElementById('toggle-color-btn');
  const avancesSection = document.getElementById('avances-section');
  const colors = ['#f5f3ef', '#f0faf8', '#fff5f5', '#f5f0ff', '#fffbf0'];
  let colorIdx = 0;

  if (colorBtn && avancesSection) {
    colorBtn.addEventListener('click', function () {
      colorIdx = (colorIdx + 1) % colors.length;
      avancesSection.style.transition = 'background 0.5s ease';
      avancesSection.style.background = colors[colorIdx];
      M.toast({ html: '🎨 Fondo actualizado', displayLength: 1500 });
    });
  }

  // ── 7. Mostrar/ocultar detalle de avance ────────────────────────────────
  document.querySelectorAll('.toggle-detail-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const targetId = this.dataset.target;
      const detail = document.getElementById(targetId);
      if (!detail) return;

      if (detail.style.display === 'none' || detail.style.display === '') {
        detail.style.display = 'block';
        detail.style.opacity = '0';
        detail.style.transform = 'translateY(-8px)';
        requestAnimationFrame(() => {
          detail.style.transition = 'opacity 0.3s, transform 0.3s';
          detail.style.opacity = '1';
          detail.style.transform = 'translateY(0)';
        });
        this.textContent = 'Ocultar detalle';
        this.classList.add('btn-primary-custom');
        this.classList.remove('btn-outline-custom');
      } else {
        detail.style.opacity = '0';
        detail.style.transform = 'translateY(-8px)';
        setTimeout(() => { detail.style.display = 'none'; }, 280);
        this.textContent = 'Ver detalle';
        this.classList.remove('btn-primary-custom');
        this.classList.add('btn-outline-custom');
      }
    });
  });

  // ── 8. Contador animado de estadísticas (index) ─────────────────────────
  function animateCount(el, target, duration = 1200) {
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = start + (el.dataset.suffix || '');
    }, 16);
  }

  const statEls = document.querySelectorAll('.stat-number[data-target]');
  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target, parseInt(entry.target.dataset.target));
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statEls.forEach(el => statObserver.observe(el));

});
