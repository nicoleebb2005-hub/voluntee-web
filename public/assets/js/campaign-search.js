(() => {
  const {data,normalize,escapeHtml,matches} = window.Voluntee;
  const campaigns = data.filter(item => item.tipo === 'Campanha');
  const filters = document.getElementById('campaignFilters');
  const grid = document.getElementById('campaignGrid');
  if (filters && grid) {
    const categories = [...new Set(campaigns.map(item => item.categoria))];
    filters.innerHTML = ['Todas',...categories].map((category,index) => `<button type="button" data-category="${index ? escapeHtml(category) : ''}" aria-pressed="${!index}">${escapeHtml(category)}</button>`).join('');
    function render(category = '') {
      const items = campaigns.filter(item => !category || item.categoria === category);
      grid.innerHTML = items.map(item => `<a class="campaign-card clickable-card" href="${escapeHtml(item.link)}"><span class="card-tags"><span class="tag">${escapeHtml(item.categoria)}</span>${item.permanente ? '<span class="tag">Campanha permanente</span>' : ''}</span><h3>${escapeHtml(item.titulo)}</h3><p>${escapeHtml(item.descricao)}</p><p><strong>Iniciativa:</strong> ${escapeHtml(item.iniciativa)}</p><span class="card-action">Ver iniciativa e como ajudar <b aria-hidden="true">→</b></span></a>`).join('');
      grid.classList.add('is-ready');
      document.getElementById('campaignCount').textContent = `${items.length} ${items.length === 1 ? 'campanha' : 'campanhas'}`;
      filters.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === category)));
    }
    filters.addEventListener('click', event => { const button=event.target.closest('button[data-category]'); if (button) render(button.dataset.category); });
    render();
  }
  const results = document.getElementById('searchResults');
  if (!results) return;
  const query = (new URLSearchParams(location.search).get('q') || '').trim();
  document.querySelectorAll('.search-form input[name="q"]').forEach(input => input.value = query);
  const title = document.querySelector('.page-hero h1');
  title.textContent = query ? `Resultados para “${query}”` : 'Resultados da busca';
  const count = document.getElementById('searchCount');
  const empty = document.getElementById('searchEmpty');
  const emptyText = document.getElementById('searchEmptyText');
  function mark(value) {
    const words = normalize(query).split(/\s+/).filter(Boolean);
    if (!words.length) return escapeHtml(value);
    const text = String(value || '');
    const normalized = normalize(text);
    let spans=[];
    words.forEach(word => { let start=0,index; while ((index=normalized.indexOf(word,start))!==-1) { spans.push([index,index+word.length]); start=index+word.length; } });
    spans.sort((a,b)=>a[0]-b[0]);
    let out='',pos=0;
    spans.forEach(([a,b])=>{ if(a<pos)return; out+=escapeHtml(text.slice(pos,a))+`<strong>${escapeHtml(text.slice(a,b))}</strong>`;pos=b; });
    return out+escapeHtml(text.slice(pos));
  }
  if (!query) { count.textContent=''; return; }
  const found = data.filter(item => matches(item,query));
  count.textContent = `${found.length} ${found.length === 1 ? 'resultado' : 'resultados'}`;
  if (found.length) document.querySelector('.search-fallback').hidden = true;
  for (const type of ['Iniciativa','Campanha']) {
    const items=found.filter(item=>item.tipo===type);
    if(!items.length)continue;
    const section=document.createElement('section');
    section.className='search-group';
    section.innerHTML=`<h3>${type === 'Iniciativa' ? 'Iniciativas' : 'Ações e campanhas'}</h3><div class="result-grid">${items.map(item=>{
      const visible = normalize(item.titulo + ' ' + item.descricao);
      const missing = normalize(query).split(/\s+/).filter(word => word && !visible.includes(word));
      const context = [item.causa,item.bairro,...String(item.palavrasChave || '').split(',')].filter(value => missing.some(word => normalize(value).includes(word))).slice(0,3);
      return `<a class="result-card clickable-card" href="${escapeHtml(item.link)}"><span class="tag">${item.tipo}</span><h4>${mark(item.titulo)}</h4><p>${mark(item.descricao)}</p>${context.length ? `<p>Relacionado a: ${mark(context.join(' · '))}</p>` : ''}<span class="card-action">Ver mais <b aria-hidden="true">→</b></span></a>`;
    }).join('')}</div>`;
    results.append(section);
  }
  if (!found.length) { empty.hidden=false; emptyText.textContent=`Nenhum resultado para '${query}'. Tente outras palavras, como alimentos, roupas, oficinas ou voluntariado.`; }
})();
