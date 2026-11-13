document.addEventListener('DOMContentLoaded', () => {
    const data = window.VOLUNTEE_DATA || { initiatives: [], campaigns: [] };
    const normalize = (value) => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
    const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);

    const campaignGrid = document.getElementById('campaignGrid');
    if (campaignGrid) {
        const emptyState = document.getElementById('campaignEmpty');
        const filters = document.getElementById('campaignFilters');
        const emptyTitle = emptyState.querySelector('h3');
        const emptyMessage = emptyState.querySelector(':scope > p:not(.campaign-empty-eyebrow)');
        const filterButtons = document.querySelectorAll('.campaign-filter');

        const renderCampaigns = (filter) => {
            const filtered = filter === 'all'
                ? data.campaigns
                : data.campaigns.filter((campaign) => normalize(campaign.type) === normalize(filter));

            campaignGrid.innerHTML = filtered.map((campaign) => `
                <a class="campaign-card${campaign.example ? ' campaign-card-example' : ''}" href="${escapeHtml(campaign.link)}">
                    ${campaign.example ? '<span class="campaign-example-label">Exemplo · não confirmado</span>' : ''}
                    <span class="campaign-type">${escapeHtml(campaign.type)}</span>
                    <h2>${escapeHtml(campaign.title)}</h2>
                    <p class="campaign-detail"><strong>Descrição</strong>${escapeHtml(campaign.description)}</p>
                    <p class="campaign-detail"><strong>Prazo</strong>${escapeHtml(campaign.deadline)}</p>
                    <p class="campaign-detail"><strong>Iniciativa responsável</strong>${escapeHtml(campaign.initiative)}</p>
                    <span class="campaign-cta">Ver iniciativa e como ajudar</span>
                </a>
            `).join('');

            const hasResults = filtered.length > 0;
            campaignGrid.hidden = !hasResults;
            emptyState.hidden = hasResults;
            if (!hasResults) {
                emptyTitle.textContent = filter === 'all' ? 'Nenhuma campanha confirmada no momento' : `Nenhum exemplo para “${filter}”`;
                emptyMessage.textContent = filter === 'all'
                    ? 'Os exemplos ainda aguardam informações das iniciativas e não representam campanhas ativas.'
                    : 'O tipo das campanhas ainda precisa ser confirmado. Quando houver dados para esta categoria, eles aparecerão aqui.';
            }
        };

        filterButtons.forEach((button) => {
            button.addEventListener('click', () => {
                filterButtons.forEach((item) => {
                    const active = item === button;
                    item.classList.toggle('is-active', active);
                    item.setAttribute('aria-pressed', String(active));
                });
                renderCampaigns(button.dataset.filter);
            });
        });
        filters.hidden = false;
        renderCampaigns('all');
    }

    const results = document.getElementById('searchResults');
    if (!results) return;

    const params = new URLSearchParams(window.location.search);
    const query = (params.get('q') || '').trim();
    const term = normalize(query);
    const summary = document.getElementById('search-summary');
    const noResults = document.getElementById('searchNoResults');
    const searchPrompt = document.getElementById('searchPrompt');
    const searchInput = document.getElementById('searchInput');
    if (searchInput && query) searchInput.value = query;
    if (summary) summary.textContent = query ? `Resultados para “${query}”` : 'Iniciativas e campanhas de São Mateus';
    if (searchPrompt) searchPrompt.hidden = Boolean(query);

    const fieldsText = (values) => values.flat(Infinity).map((value) => String(value ?? '')).join(' ');
    const initiativeResults = data.initiatives
        .filter((item) => normalize(fieldsText([item.name, item.type, item.causes || [], item.summary])).includes(term))
        .map((item) => ({
            title: item.name || '[PREENCHER]',
            type: `Iniciativa · ${item.type || '[PREENCHER]'}`,
            causes: (item.causes || []).join(', ') || '[PREENCHER]',
            description: item.summary || '[PREENCHER]',
            link: item.link,
            example: false
        }));
    const campaignResults = data.campaigns
        .filter((item) => normalize(fieldsText([item.title, item.type, item.causes || [], item.initiative, item.description])).includes(term))
        .map((item) => ({
            title: item.title || '[PREENCHER]',
            type: `Campanha · ${item.type || '[PREENCHER]'}`,
            causes: (item.causes || []).join(', ') || '[PREENCHER]',
            description: item.description || '[PREENCHER]',
            initiative: item.initiative,
            link: item.link,
            example: item.example === true
        }));
    const matches = query ? [...initiativeResults, ...campaignResults] : [];

    results.classList.toggle('is-single', matches.length === 1);
    results.innerHTML = matches.map((result) => `
        <a class="search-result-card${result.example ? ' search-result-example' : ''}" href="${escapeHtml(result.link)}">
            ${result.example ? '<span class="campaign-example-label">Exemplo · não confirmado</span>' : ''}
            <span class="search-result-type">${escapeHtml(result.type)}</span>
            <h2>${escapeHtml(result.title)}</h2>
            <p class="search-result-description">${escapeHtml(result.description)}</p>
            <p class="search-result-causes"><strong>Causas:</strong> ${escapeHtml(result.causes)}</p>
            ${result.initiative ? `<p class="search-result-initiative"><strong>Iniciativa:</strong> ${escapeHtml(result.initiative)}</p>` : ''}
        </a>
    `).join('');
    noResults.hidden = !query || matches.length > 0;
    if (noResults) noResults.setAttribute('aria-live', 'polite');
});
