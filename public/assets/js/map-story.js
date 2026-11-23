// Anima o mapa de São Mateus quando a seção aparece na tela
(() => {
  const story = document.querySelector('.map-story');
  if (!story) return;
  const steps = story.querySelectorAll('.map-steps li');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const setStep = n => { story.dataset.step = n; steps.forEach((li, i) => li.classList.toggle('active', i < n)); };
  if (reduce || !('IntersectionObserver' in window)) { setStep(3); return; }
  setStep(0);
  const io = new IntersectionObserver(entries => {
    if (!entries.some(e => e.isIntersecting)) return;
    io.disconnect();
    setTimeout(() => setStep(1), 200);
    setTimeout(() => setStep(2), 1400);
    setTimeout(() => setStep(3), 3200);
  }, { threshold: .4 });
  io.observe(story);
  steps.forEach((li, i) => { li.tabIndex = 0; li.setAttribute('role', 'button'); const go = () => setStep(i + 1); li.addEventListener('click', go); li.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } }); });
})();
