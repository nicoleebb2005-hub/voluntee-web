// Mostra, em três etapas, como o mapa de São Mateus virou o logo do Voluntee
(() => {
  const story = document.querySelector('.map-story');
  if (!story) return;
  const buttons = story.querySelectorAll('.map-steps button');
  const caption = story.querySelector('.map-story__caption');
  const texts = {
    1: 'A região de São Mateus tem três distritos: São Mateus, São Rafael e Iguatemi.',
    2: 'O logo usa só o contorno do distrito de São Mateus.',
    3: 'O contorno vira o desenho do logo, e a ponta de baixo forma o V do Voluntee.'
  };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timers = [];
  function setStep(n) {
    story.dataset.step = n;
    buttons.forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.go) === n)));
    caption.textContent = texts[n];
  }
  function play() {
    timers.forEach(clearTimeout);
    setStep(1);
    timers = [setTimeout(() => setStep(2), 4500), setTimeout(() => setStep(3), 9500)];
  }
  buttons.forEach(b => b.addEventListener('click', () => { timers.forEach(clearTimeout); setStep(Number(b.dataset.go)); }));
  story.querySelector('.map-replay').addEventListener('click', play);
  if (reduce || !('IntersectionObserver' in window)) { setStep(3); return; }
  setStep(1);
  const io = new IntersectionObserver(entries => {
    if (entries.some(e => e.isIntersecting)) { io.disconnect(); play(); }
  }, { threshold: .45 });
  io.observe(story.querySelector('.map-story__figure'));
})();
