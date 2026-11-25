// Mostra, em três etapas, como o mapa de São Mateus virou o logo do Voluntee
(() => {
  const story = document.querySelector('.map-story');
  if (!story) return;
  const buttons = story.querySelectorAll('.map-steps button');
  const caption = story.querySelector('.map-story__caption');
  const texts = {
    1: 'Os três distritos da região: São Mateus, São Rafael e Iguatemi.',
    2: 'O limite da região vira uma linha laranja.',
    3: 'Na parte de baixo, a linha se abre e forma o V do Voluntee.'
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
    timers = [setTimeout(() => setStep(2), 1800), setTimeout(() => setStep(3), 3800)];
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
