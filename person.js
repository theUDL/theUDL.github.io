// Individual profile page: person.html?id=<id>
// All content comes from config.js (the `pi` entry and the `team` list).
(() => {
  const S = SITE;
  const id = new URLSearchParams(location.search).get('id');

  // The PI and team members share one shape here
  const people = [
    { ...S.pi, role: `${S.pi.title}, ${S.department}`, initials: 'PI' },
    ...S.team,
  ];
  const p = people.find(x => x.id && x.id === id);

  const head = document.getElementById('person-head');
  const body = document.getElementById('person-body');

  document.getElementById('person-footer').innerHTML =
    `© ${new Date().getFullYear()} ${S.smallName} &nbsp;·&nbsp; ${S.university}`;

  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-links');
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
  });

  if (!p) {
    head.innerHTML = `<div><h1>Person not found</h1>
      <p class="person-topic">This profile doesn't exist. Head back to the People section to see the team.</p></div>`;
    return;
  }

  document.title = `${p.name} | ${S.fullName}`;

  // ── Header ───────────────────────────────────────────────────────────
  const L = p.links || {};
  const links = [
    L.email   ? `<a href="${L.email}">Email</a>` : '',
    L.cv      ? `<a href="${L.cv}">CV</a>` : '',
    L.scholar ? `<a href="${L.scholar}">Google Scholar</a>` : '',
    L.github  ? `<a href="${L.github}">GitHub</a>` : '',
    L.website ? `<a href="${L.website}">Website</a>` : '',
  ].filter(Boolean).join('');

  head.innerHTML = `
    ${p.photo
      ? `<img class="person-photo avatar-photo" src="${p.photo}" alt="${p.name}">`
      : `<div class="person-photo">${p.initials || ''}</div>`}
    <div>
      <h1>${p.name}</h1>
      <p class="person-role">${p.role || ''}</p>
      ${p.topic ? `<p class="person-topic">${p.topic}</p>` : ''}
      ${p.now   ? `<p class="person-topic">Now: ${p.now}</p>` : ''}
      ${links ? `<div class="pi-links">${links}</div>` : ''}
    </div>`;

  // ── Bio & awards ─────────────────────────────────────────────────────
  const bioHtml = p.bio
    ? `<section class="person-section">
         <h2>About</h2>
         ${p.bio.split(/\n\s*\n/).map(par => `<p class="person-bio">${par}</p>`).join('')}
       </section>`
    : '';

  const awards = [...(p.awards || [])].sort((a, b) => (b.year || 0) - (a.year || 0));
  const awardsHtml = awards.length
    ? `<section class="person-section">
         <h2>Awards &amp; Honors</h2>
         <ul class="award-list">
           ${awards.map(a => `
             <li class="award-item">
               <div class="pub-year">${a.year || ''}</div>
               <div>
                 <div class="award-title">${a.title}</div>
                 ${a.org ? `<div class="award-org">${a.org}</div>` : ''}
               </div>
             </li>`).join('')}
         </ul>
       </section>`
    : '';

  body.innerHTML = `${bioHtml}${awardsHtml}
    <section class="person-section" id="person-pubs">
      <h2>Publications</h2>
      <div class="pub-list" id="pub-list"><p class="person-empty">Loading…</p></div>
    </section>`;

  // ── Publications: this person's papers, from ORCID (see pubs.js) ─────
  function renderPubs(items) {
    const el = document.getElementById('pub-list');
    if (!items.length) {
      el.innerHTML = `<p class="person-empty">No publications with the lab yet —
        see the <a class="inline-link" href="index.html#publications">lab's publications</a>.</p>`;
      return;
    }
    el.innerHTML = [...items].sort((a, b) => b.year - a.year).map(pub => `
      <div class="pub-item">
        <div class="pub-year">${pub.year}</div>
        <div class="pub-content">
          <h4>${pub.title}</h4>
          <p class="authors">${pub.authors}</p>
          <p class="venue">${pub.venue}</p>
          <div class="pub-links">${(pub.links || []).filter(l => l.url)
            .map(l => `<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`).join('')}</div>
        </div>
      </div>`).join('');
  }

  // With their own ORCID iD a person's page lists everything on that record.
  // Without one, it lists the papers on the lab's record that they authored.
  async function loadPubs() {
    const manual = p.papers || [];
    const lab    = S.orcid || {};
    const source = p.orcid || lab.id;
    if (!source || (!p.orcid && !p.author)) return renderPubs(manual);
    try {
      let works = await LabPubs.load(source, lab.exclude);
      if (!p.orcid) works = works.filter(w => w.authors.some(n => LabPubs.isAuthor(n, p.author)));
      renderPubs([...works.map(w => LabPubs.format(w, p.author ? [p.author] : [])), ...manual]);
    } catch { renderPubs(manual); }
  }

  loadPubs();
})();
