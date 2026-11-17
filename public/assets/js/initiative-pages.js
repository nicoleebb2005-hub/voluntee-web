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
