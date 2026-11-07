/** Tailwind utiliza classes utilitárias; as interações são implementadas sem Bootstrap. */
document.addEventListener('DOMContentLoaded', () => {
  // Menu de navegação mobile
  const menuButton = document.getElementById('menuButton');
  const menu = document.getElementById('menuMobile');
  const closeMenu = () => { menu.classList.add('hidden'); menuButton.setAttribute('aria-expanded', 'false'); };
  menuButton.addEventListener('click', () => {
    const opening = menu.classList.contains('hidden');
    menu.classList.toggle('hidden', !opening);
    menuButton.setAttribute('aria-expanded', String(opening));
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  // Carrossel: indicador, controles, movimento suave, autoplay e acessibilidade.
  const carousel = document.getElementById('tailwindCarousel');
  const track = document.getElementById('carouselTrack');
  const slides = Array.from(track.children);
  const dots = Array.from(document.querySelectorAll('.tw-dot'));
  let current = 0;
  let autoplay;
  function goToSlide(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.setAttribute('aria-hidden', String(!active));
      slide.inert = !active;
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
      dot.setAttribute('aria-current', String(i === current));
    });
  }
  document.getElementById('slidePrevious').addEventListener('click', () => goToSlide(current - 1));
  document.getElementById('slideNext').addEventListener('click', () => goToSlide(current + 1));
  dots.forEach(dot => dot.addEventListener('click', () => goToSlide(Number(dot.dataset.slide))));
  const startAutoplay = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    clearInterval(autoplay);
    autoplay = setInterval(() => { if (!document.hidden && !modalIsOpen()) goToSlide(current + 1); }, 7000);
  };
  carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
  carousel.addEventListener('mouseleave', startAutoplay);
  carousel.addEventListener('focusin', () => clearInterval(autoplay));
  carousel.addEventListener('focusout', event => { if (!carousel.contains(event.relatedTarget)) startAutoplay(); });
  goToSlide(0);
  startAutoplay();

  // Tabela filtrável com as seis linhas exigidas.
  const areaFilter = document.getElementById('filtroArea');
  const rows = Array.from(document.querySelectorAll('#agendaBody tr'));
  const counter = document.getElementById('agendaCount');
  areaFilter.addEventListener('change', () => {
    let visible = 0;
    rows.forEach(row => {
      const show = areaFilter.value === 'todos' || areaFilter.value === row.dataset.area;
      row.hidden = !show;
      row.style.display = show ? '' : 'none';
      visible += Number(show);
    });
    counter.textContent = `Exibindo ${visible} encontro${visible === 1 ? '' : 's'}`;
  });

  // Formulário: checkValidity/reportValidity são APIs nativas do HTML5.
  const form = document.getElementById('formContato');
  const feedback = document.getElementById('formFeedback');
  form.addEventListener('submit', event => {
    event.preventDefault();
    feedback.classList.add('hidden');
    if (!form.reportValidity()) return;
    const name = document.getElementById('nome').value.trim();
    feedback.textContent = `Obrigado, ${name}! Mensagem validada com sucesso. Nenhum dado foi enviado: esta é uma demonstração.`;
    feedback.classList.remove('hidden');
    form.reset();
  });

  // Diálogo acessível: foco, botão de fechar, Escape e clique no overlay.
  const modal = document.getElementById('detalhesModal');
  const dialog = modal.querySelector('[role="dialog"]');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const contactAction = document.getElementById('modalContactAction');
  const interestSelect = document.getElementById('interesse');
  const knownCourses = ['Front-end moderno', 'Backend & APIs', 'UX/UI Design'];
  let lastTrigger = null;
  let selectedCourse = '';
  function modalIsOpen() { return !modal.classList.contains('hidden'); }
  function openModal(trigger) {
    lastTrigger = trigger;
    modalTitle.textContent = trigger.dataset.title || 'OrbitLab';
    modalDescription.textContent = trigger.dataset.description || '';
    selectedCourse = knownCourses.includes(trigger.dataset.title) ? trigger.dataset.title : '';
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overflow-hidden');
    clearInterval(autoplay);
    dialog.focus();
  }
  function closeModal({ restoreFocus = true } = {}) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overflow-hidden');
    if (restoreFocus) lastTrigger?.focus();
    startAutoplay();
  }
  document.querySelectorAll('[data-modal-open]').forEach(button => button.addEventListener('click', () => openModal(button)));
  modal.querySelectorAll('[data-modal-close]').forEach(button => button.addEventListener('click', () => closeModal()));
  document.addEventListener('keydown', event => {
    if (!modalIsOpen()) return;
    if (event.key === 'Escape') {event.preventDefault(); closeModal(); return;}
    if (event.key !== 'Tab') return;
    const focusables = [...dialog.querySelectorAll('button:not([disabled]),a[href],input:not([disabled])')];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {event.preventDefault();last.focus();}
    else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog)) {event.preventDefault();first.focus();}
  });
  contactAction.addEventListener('click', () => {
    if (selectedCourse) interestSelect.value = selectedCourse;
    closeModal({restoreFocus:false});
    document.getElementById('contato').scrollIntoView({behavior:'smooth'});
    document.getElementById('nome').focus({preventScroll:true});
  });
});
