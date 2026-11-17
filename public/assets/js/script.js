(() => {
  const data = window.VOLUNTEE_DATA || [];
  const initiatives = data.filter(item => item.tipo === 'Iniciativa');
  const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
  const escapeHtml = value => String(value || '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const matches = (item, query) => normalize(query).split(/\s+/).filter(Boolean).every(word => normalize([item.titulo,item.iniciativa,item.descricao,item.causa,item.bairro,item.palavrasChave].join(' ')).includes(word));
  window.Voluntee = { data, normalize, escapeHtml, matches };

  function initiativeCard(item) {
    const logo = item.logo === 'jr'
      ? '<span class="jr-logo" role="img" aria-label="Paróquia Jesus Ressuscitado"><strong>JR</strong><small>Paróquia Jesus Ressuscitado</small></span>'
      : `<img src="${escapeHtml(item.logo)}" alt="Logotipo da ${escapeHtml(item.titulo)}" width="180" height="180" loading="lazy">`;
    return `<a class="initiative-card clickable-card" href="${escapeHtml(item.link)}"><span class="card-logo">${logo}</span><span class="card-body"><span class="tag">${escapeHtml(item.organizacao)}</span><h3>${escapeHtml(item.titulo)}</h3><p>${escapeHtml(item.descricao)}</p><span class="tag">${escapeHtml(item.causa)}</span><span class="card-action">Conhecer a iniciativa <b aria-hidden="true">→</b></span></span></a>`;
  }
  const filters = document.getElementById('initiativeFilters');
  const grids = document.querySelectorAll('[data-initiatives]');
  const requestedCause = new URLSearchParams(location.search).get('causa');
  function renderInitiatives(cause = '') {
    grids.forEach(grid => {
      const set = initiatives.filter(item => (!cause || normalize(item.causa) === normalize(cause)) && (grid.dataset.initiatives === 'all' || item.titulo === grid.dataset.initiatives));
      grid.innerHTML = set.map(initiativeCard).join('');
      grid.classList.add('is-ready');
      const count = document.getElementById('initiativeCount');
      if (count && grid.dataset.initiatives === 'all') count.textContent = `${set.length} ${set.length === 1 ? 'iniciativa' : 'iniciativas'}`;
    });
    filters?.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.cause === cause)));
  }
  if (filters) {
    const causes = [...new Set(initiatives.map(item => item.causa))];
    filters.innerHTML = ['Todas', ...causes].map((name, index) => `<button type="button" data-cause="${index ? escapeHtml(name) : ''}" aria-pressed="false">${escapeHtml(name)}</button>`).join('');
    filters.addEventListener('click', event => {
      const button = event.target.closest('button[data-cause]');
      if (!button) return;
      const cause = button.dataset.cause;
      history.replaceState(null, '', cause ? `?causa=${encodeURIComponent(cause)}` : location.pathname);
      renderInitiatives(cause);
    });
  }
  renderInitiatives(initiatives.some(item => normalize(item.causa) === normalize(requestedCause)) ? requestedCause : '');

  const menu = document.getElementById('mobile-menu');
  const open = document.querySelector('.menu-open');
  const close = document.querySelector('.menu-close');
  let previousFocus = null;
  function setMenu(isOpen) {
    if (!menu || !open) return;
    menu.hidden = !isOpen;
    open.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-is-open', isOpen);
    if (isOpen) { previousFocus = document.activeElement; menu.querySelector('nav a')?.focus(); }
    else if (previousFocus && menu.contains(document.activeElement)) open.focus();
  }
  open?.addEventListener('click', () => setMenu(true));
  close?.addEventListener('click', () => setMenu(false));
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (menu?.hidden === false) {
      if (event.key === 'Escape') { setMenu(false); return; }
      if (event.key === 'Tab') {
        const focusable = [...menu.querySelectorAll('a,button,input')].filter(el => el.offsetParent !== null);
        const first = focusable[0], last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
  });
  matchMedia('(min-width: 1025px)').addEventListener('change', event => { if (event.matches) setMenu(false); });

  document.querySelectorAll('.search-form').forEach(form => {
    const input = form.querySelector('input[name="q"]');
    const list = form.querySelector('.suggestions');
    let active = -1;
    function hide() { list.hidden = true; list.innerHTML = ''; input.setAttribute('aria-expanded','false'); input.removeAttribute('aria-activedescendant'); active = -1; }
    function show() {
      const query = input.value.trim();
      if (normalize(query).length < 2) { hide(); return; }
      const items = data.filter(item => matches(item,query)).slice(0,5);
      list.innerHTML = items.map((item,index) => `<a role="option" id="${list.id}-option-${index}" aria-selected="false" href="${escapeHtml(item.link)}">${escapeHtml(item.titulo)} <span class="tag">${item.tipo}</span></a>`).join('');
      list.hidden = !items.length;
      input.setAttribute('aria-expanded', String(!!items.length));
      active = -1;
    }
    input.addEventListener('input', show);
    input.addEventListener('keydown', event => {
      const options = [...list.querySelectorAll('[role="option"]')];
      if (event.key === 'Escape') { hide(); return; }
      if (!options.length || !['ArrowDown','ArrowUp','Enter'].includes(event.key)) return;
      if (event.key === 'Enter' && active >= 0) { event.preventDefault(); options[active].click(); return; }
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault(); active = (active + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length;
        options.forEach((option,index) => option.setAttribute('aria-selected', String(index === active)));
        input.setAttribute('aria-activedescendant', options[active].id);
      }
    });
    form.addEventListener('submit', event => {
      event.preventDefault();
      const query = input.value.trim();
      location.href = query ? `busca.html?q=${encodeURIComponent(query)}` : 'busca.html';
    });
    document.addEventListener('pointerdown', event => { if (!form.contains(event.target)) hide(); });
  });
})();
