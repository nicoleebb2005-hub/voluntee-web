document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (!menuToggle || !navMenu) return;

    const closeMenu = () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
    };

    menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.classList.toggle('active', !isOpen);
        navMenu.classList.toggle('active', !isOpen);
        menuToggle.setAttribute('aria-expanded', String(!isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
    });

    navMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });

    document.querySelectorAll('.search-container').forEach((form) => {
        form.addEventListener('submit', (event) => {
            const input = form.querySelector('input[name="q"]');
            const term = input?.value.trim();
            if (!term) {
                event.preventDefault();
                input?.focus();
                return;
            }
            event.preventDefault();
            window.location.href = `busca.html?q=${encodeURIComponent(term)}`;
        });
    });
});
