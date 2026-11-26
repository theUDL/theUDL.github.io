// Research article page: research.html?id=<id>
//   • title, summary and paper list: the matching `research` entry in config.js
//   • article text: research/<id>.md, written in plain Markdown
(() => {
  const S  = SITE;
  const id = new URLSearchParams(location.search).get('id');
  const areas = (S.research || []).filter(r => r.id);
  const area  = areas.find(r => r.id === id);

  const head = document.getElementById('article-head');
  const body = document.getElementById('article-body');
  const end  = document.getElementById('article-end');

  document.getElementById('person-footer').innerHTML =
    `© ${new Date().getFullYear()} ${S.smallName} &nbsp;·&nbsp; ${S.university}`;

  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-links');
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
  });

  const back = `<a class="article-back" href="index.html#research">← All research</a>`;

  if (!area) {
    head.innerHTML = `${back}<h1>Research area not found</h1>
      <p class="article-deck">This page doesn't exist. Head back to the Research section to see what we work on.</p>`;
    return;
  }

  // A `background` image stays fixed behind the page while the text scrolls over it
  if (area.background) {
    const bg = document.createElement('div');
    bg.className = 'article-bg';
    bg.style.backgroundImage = `url('${area.background}')`;
    if (area.backgroundPosition) bg.style.backgroundPosition = area.backgroundPosition;
    document.body.prepend(bg);
    document.body.classList.add('has-bg');
  }

  document.title = `${area.title} | ${S.fullName}`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && area.desc) metaDesc.setAttribute('content', area.desc);

  head.innerHTML = `
    ${back}
    <span class="tag">Research</span>
    <h1>${area.title}</h1>
    ${area.desc ? `<p class="article-deck">${area.desc}</p>` : ''}
    <p class="article-meta" id="article-meta">${S.fullName}</p>`;

  // ── Article text ─────────────────────────────────────────────────────
  async function loadArticle() {
    try {
      const res = await fetch(`research/${encodeURIComponent(area.id)}.md`);
      if (!res.ok) throw new Error();
      const md = await res.text();
      body.innerHTML = marked.parse(md);

      // A picture or video on its own line becomes a figure; its [alt text] is the
      // caption. A file ending in .mp4 or .webm plays as a silent, looping video,
      // with the .jpg of the same name (if there is one) shown until it loads.
      const videos = [];
      body.querySelectorAll('p > img:only-child').forEach(img => {
        const p = img.parentElement;
        if (p.textContent.trim()) return;
        const fig = document.createElement('figure');
        const src = img.getAttribute('src') || '';
        if (/\.(mp4|webm)$/i.test(src)) {
          const v = document.createElement('video');
          v.src = src;
          v.poster = src.replace(/\.(mp4|webm)$/i, '.jpg');
          v.muted = true; v.loop = true; v.playsInline = true;
          v.preload = 'metadata';
          v.setAttribute('aria-label', img.alt || 'Video');
          v.controls = matchMedia('(prefers-reduced-motion: reduce)').matches;
          fig.appendChild(v);
          videos.push(v);
        } else {
          img.loading = 'lazy';
          fig.appendChild(img);
        }
        if (img.alt) {
          const cap = document.createElement('figcaption');
          cap.textContent = img.alt;
          fig.appendChild(cap);
        }
        p.replaceWith(fig);
      });
      // Videos play only while they are on screen
      if (videos.length && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const io = new IntersectionObserver(entries => entries.forEach(e => {
          if (e.isIntersecting) e.target.play().catch(() => { e.target.controls = true; });
          else e.target.pause();
        }), { threshold: 0.35 });
        videos.forEach(v => io.observe(v));
      }
      // Links to other sites open in a new tab
      body.querySelectorAll('a[href^="http"]').forEach(a => {
        a.target = '_blank';
        a.rel = 'noopener';
      });

      const minutes = Math.max(1, Math.round(body.textContent.trim().split(/\s+/).length / 220));
      document.getElementById('article-meta').textContent = `${S.fullName} · ${minutes} min read`;
    } catch {
      body.innerHTML = `<p class="person-empty">This write-up is on its way.</p>`;
    }
  }

  // ── Relevant publications, then links to the other areas ─────────────
  const pubHtml = pub => `
      <div class="pub-item">
        <div class="pub-year">${pub.year}</div>
        <div class="pub-content">
          <h4>${pub.title}</h4>
          <p class="authors">${pub.authors}</p>
          <p class="venue">${pub.venue}</p>
          <div class="pub-links">${(pub.links || []).filter(l => l.url)
            .map(l => `<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`).join('')}</div>
        </div>
      </div>`;

  async function loadPapers() {
    // `papers` entries are either a DOI (looked up on the lab's ORCID record)
    // or a full entry written by hand, as in the manual `publications` list.
    const wanted = area.papers || [];
    const dois   = wanted.filter(x => typeof x === 'string').map(d => d.toLowerCase());
    const manual = wanted.filter(x => x && typeof x === 'object');
    const people = [S.pi, ...(S.team || [])].map(x => x && x.author).filter(Boolean);
    let found = [];
    if (dois.length && S.orcid && S.orcid.id) {
      try {
        const works = await LabPubs.load(S.orcid.id);
        found = works.filter(w => dois.includes(w.doi.toLowerCase()))
                     .map(w => LabPubs.format(w, people));
      } catch {}
    }
    const items = [...found, ...manual].sort((a, b) => b.year - a.year);
    const others = areas.filter(r => r.id !== area.id);
    end.innerHTML = `
      ${items.length ? `
      <section class="article-section">
        <h2>Relevant publications</h2>
        <div class="pub-list">${items.map(pubHtml).join('')}</div>
      </section>` : ''}
      ${others.length ? `
      <section class="article-section">
        <h2>More research</h2>
        <div class="article-more">
          ${others.map(r => `
          <a class="article-more-card" href="research.html?id=${encodeURIComponent(r.id)}">
            <h3>${r.title}</h3>
            ${r.desc ? `<p>${r.desc}</p>` : ''}
            <span class="read-more">Read more →</span>
          </a>`).join('')}
        </div>
      </section>` : ''}
      <section class="article-cta">
        <p>Interested in working on this?</p>
        <a class="btn btn-outline-dark" href="index.html#join">Join the lab</a>
      </section>`;
  }

  loadArticle();
  loadPapers();
})();
