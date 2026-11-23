// Coloca um ícone em cada etiqueta, de acordo com o que ela descreve
(() => {
  const s = 'fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"';
  const icons = {
    calendar: `<svg viewBox="0 0 24 24" ${s}><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>`,
    recycle: `<svg viewBox="0 0 24 24" ${s}><path d="M20 12a8 8 0 0 1-14 5.3M4 12a8 8 0 0 1 14-5.3"/><path d="M18 3v4h-4M6 21v-4h4"/></svg>`,
    gift: `<svg viewBox="0 0 24 24" ${s}><rect x="3.5" y="9" width="17" height="11" rx="1.5"/><path d="M3.5 13h17M12 9v11M12 9S10.5 4 8 5s0 4 4 4c4 0 6.5-3 4-4s-4 4-4 4"/></svg>`,
    home: `<svg viewBox="0 0 24 24" ${s}><path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M12 17.5s-3-1.8-3-3.6a1.6 1.6 0 0 1 3-.8 1.6 1.6 0 0 1 3 .8c0 1.8-3 3.6-3 3.6Z"/></svg>`,
    book: `<svg viewBox="0 0 24 24" ${s}><path d="M12 6.5C10 5 6.5 4.6 3.5 5.5V19c3-.9 6.5-.5 8.5 1 2-1.5 5.5-1.9 8.5-1V5.5C17.5 4.6 14 5 12 6.5Zm0 0V20"/></svg>`,
    church: `<svg viewBox="0 0 24 24" ${s}><path d="M12 2v5M10 4h4M5 21V12l7-5 7 5v9"/><path d="M10 21v-4a2 2 0 0 1 4 0v4"/></svg>`,
    people: `<svg viewBox="0 0 24 24" ${s}><circle cx="9" cy="8" r="3"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 14.2A4.5 4.5 0 0 1 21 18.5"/></svg>`,
    basket: `<svg viewBox="0 0 24 24" ${s}><path d="M3 10h18l-2 10H5L3 10Z"/><path d="m8 10 3-6M16 10l-3-6M9 14v3M15 14v3"/></svg>`,
    box: `<svg viewBox="0 0 24 24" ${s}><path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Z"/><path d="M3.5 7.5 12 12l8.5-4.5M12 12v9"/></svg>`,
    star: `<svg viewBox="0 0 24 24" ${s}><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/></svg>`,
    cap: `<svg viewBox="0 0 24 24" ${s}><path d="M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9Z"/><path d="M6.5 11v4.5c3 2.5 8 2.5 11 0V11M21.5 9v5"/></svg>`
  };
  const rules = [
    [/igreja|religios/i, 'church'], [/associa|fam[ií]lias|iniciativa$/i, 'people'],
    [/^materiais$/i, 'box'], [/permanente|campanha$/i, 'recycle'], [/gratuito$/i, 'gift'],
    [/assist[eê]ncia/i, 'home'], [/alimentos/i, 'basket'],
    [/desigualdades|atividade/i, 'book'], [/vestibular/i, 'cap'],
    [/desde|domingo|^\d{4}$|todo /i, 'calendar']
  ];
  function decorate(root) {
    root.querySelectorAll('.tag:not([data-icon])').forEach(tag => {
      const text = tag.textContent.trim();
      const found = rules.find(([re]) => re.test(text));
      const key = found ? found[1] : 'star';
      tag.dataset.icon = key;
      tag.insertAdjacentHTML('afterbegin', `<span class="tag-icon" aria-hidden="true">${icons[key]}</span>`);
    });
  }
  decorate(document);
  new MutationObserver(() => decorate(document)).observe(document.body, { childList: true, subtree: true });
})();
