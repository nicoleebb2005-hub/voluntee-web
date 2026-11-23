(() => {
  const bar = document.querySelector('.sticky-contact');
  const contact = document.getElementById('contato');
  if (!bar || !contact) return;
  function update() {
    const box = contact.getBoundingClientRect();
    const focused = bar.contains(document.activeElement);
    bar.classList.toggle('visible', (scrollY > 250 && box.top > innerHeight * .7 && !focused) || focused);
  }
  addEventListener('scroll',update,{passive:true});
  addEventListener('resize',update);
  bar.addEventListener('focusin',update);
  bar.addEventListener('focusout',()=>requestAnimationFrame(update));
  update();
})();

// Ampliar fotos em um modal acessível
(() => {
  const triggers = document.querySelectorAll('.photo-open');
  if (!triggers.length) return;
  const modal = document.createElement('div');
  modal.className = 'photo-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Foto ampliada');
  modal.innerHTML = '<button type="button" class="photo-modal-close" aria-label="Fechar imagem">×</button><figure><img alt=""><figcaption></figcaption></figure>';
  document.body.appendChild(modal);
  const img = modal.querySelector('img');
  const caption = modal.querySelector('figcaption');
  const close = modal.querySelector('.photo-modal-close');
  let opener = null;
  function open(button) {
    opener = button;
    img.src = button.dataset.full;
    img.alt = button.dataset.alt || '';
    caption.textContent = button.dataset.caption || '';
    modal.classList.add('open');
    document.body.classList.add('modal-is-open');
    close.focus();
  }
  function hide() {
    modal.classList.remove('open');
    document.body.classList.remove('modal-is-open');
    img.removeAttribute('src');
    if (opener) opener.focus();
  }
  triggers.forEach(button => button.addEventListener('click', () => open(button)));
  close.addEventListener('click', hide);
  modal.addEventListener('click', event => { if (event.target === modal) hide(); });
  document.addEventListener('keydown', event => {
    if (!modal.classList.contains('open')) return;
    if (event.key === 'Escape') hide();
    if (event.key === 'Tab') { event.preventDefault(); close.focus(); }
  });
})();
