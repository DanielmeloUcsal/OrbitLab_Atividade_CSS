/** Interações adicionais: Bootstrap controla navbar, carrossel e modal nativamente. */
document.addEventListener('DOMContentLoaded', () => {
  const agendaFilter = document.getElementById('filtroArea');
  const agendaRows = Array.from(document.querySelectorAll('#tabelaAgenda tbody tr'));
  const agendaCount = document.getElementById('agendaCount');

  agendaFilter.addEventListener('change', () => {
    let visible = 0;
    agendaRows.forEach(row => {
      const show = agendaFilter.value === 'todos' || row.dataset.area === agendaFilter.value;
      row.hidden = !show;
      // O atributo hidden é reforçado para sobrepor estilos da tabela Bootstrap.
      row.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    agendaCount.textContent = `Exibindo ${visible} encontro${visible === 1 ? '' : 's'}`;
  });

  const form = document.getElementById('formContato');
  const feedback = document.getElementById('formFeedback');
  form.addEventListener('submit', event => {
    event.preventDefault();
    event.stopPropagation();
    form.classList.add('was-validated');
    feedback.classList.add('d-none');
    if (!form.checkValidity()) {
      form.querySelector(':invalid')?.focus();
      return;
    }
    const nome = document.getElementById('nome').value.trim();
    feedback.textContent = `Obrigado, ${nome}! Mensagem validada com sucesso. Esta é uma demonstração: nenhum dado foi enviado.`;
    feedback.classList.remove('d-none');
    form.reset();
    form.classList.remove('was-validated');
  });

  // Dados declarados em data-*; textContent evita injeção de HTML.
  const modalElement = document.getElementById('detalhesModal');
  const modalTitle = document.getElementById('detalhesModalTitulo');
  const modalDescription = document.getElementById('detalhesModalDescricao');
  const modalContactAction = document.getElementById('modalContactAction');
  let selectedCourse = '';
  modalElement.addEventListener('show.bs.modal', event => {
    const trigger = event.relatedTarget;
    if (!trigger) return;
    modalTitle.textContent = trigger.dataset.modalTitle || 'OrbitLab';
    modalDescription.textContent = trigger.dataset.modalDescription || '';
    selectedCourse = ['Front-end moderno', 'Backend & APIs', 'UX/UI Design'].includes(trigger.dataset.modalTitle)
      ? trigger.dataset.modalTitle : '';
  });
  modalContactAction.addEventListener('click', () => {
    if (selectedCourse) document.getElementById('interesse').value = selectedCourse;
    // Espera o evento oficial de fechamento para não competir com a animação.
    modalElement.addEventListener('hidden.bs.modal', () => {
      document.getElementById('contato').scrollIntoView({behavior:'smooth'});
      document.getElementById('nome').focus({preventScroll:true});
    }, {once:true});
  });

  // Em telas pequenas, recolhe o menu Bootstrap após navegar por um link.
  const menu = document.getElementById('navPrincipal');
  menu.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992 && menu.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
});
