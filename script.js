(() => {

  // ── Populate DOM from SITE config (defined in config.js) ─────────────
  function cap(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

  function populateSite() {
    const S = SITE;

    // Page title & nav logo
    document.title = `${S.name} | ${S.fullName}`;

    // Hero
    document.getElementById('hero-title').innerHTML =
      `Welcome to the ${S.name}<span class="hero-subtitle">The ${S.fullName}</span>`;
    document.getElementById('hero-sub').innerHTML =
      `${S.tagline}<br>at <strong>${S.university}</strong>.`;

    // Research
    document.getElementById('research-lead').textContent = S.researchLead;
    document.getElementById('research-grid').innerHTML = S.research.map(r => `
      <div class="r-card${r.image ? ' has-bg' : ''}"${r.image ? ` style="--r-img:url('${r.image}')"` : ''}>
        <div class="r-icon">${r.icon}</div>
        <h3>${r.title}</h3>
        <p>${r.desc}</p>
      </div>`).join('');

    // Funding logos
    const fundingEl = document.getElementById('funding-strip');
    if (S.funding && S.funding.length) {
      fundingEl.innerHTML = `
        <p class="funding-label">Supported by</p>
        <div class="funding-logos">
          ${S.funding.map(f => `
            <a href="${f.url}" target="_blank" rel="noopener" class="funding-logo" title="${f.name}">
              <img src="${f.logo}" alt="${f.name}" loading="lazy">
            </a>`).join('')}
        </div>`;
    } else {
      fundingEl.style.display = 'none';
    }

    // News (rendered by renderNews; auto-updated from news.json)
    renderNews(S.news || []);

    // Publications (rendered by renderPublications; auto-updated from ORCID if configured)
    const pubListLink = document.getElementById('pub-list-link');
    const pubAllLink  = document.getElementById('pub-all-link');
    if (S.publicationsListUrl) {
      pubListLink.href = S.publicationsListUrl;
      pubAllLink.href  = S.publicationsListUrl;
    } else {
      pubListLink.style.display = 'none';
      pubAllLink.closest('.pub-cta').style.display = 'none';
    }
    renderPublications(S.publications || []);

    // One card per person — everyone gets the same card; an `id` makes it a link
    const personCard = m => `
              <${m.id ? `a href="person.html?id=${encodeURIComponent(m.id)}"` : 'div'} class="team-card">
                ${m.photo
                  ? `<img class="team-avatar avatar-photo" src="${m.photo}" alt="${m.name}" loading="lazy">`
                  : `<div class="team-avatar">${m.initials || ''}</div>`}
                <h4>${m.name}</h4>
                <p class="team-role">${m.role || ''}</p>
                ${m.topic ? `<p class="team-topic">${m.topic}</p>` : ''}
              </${m.id ? 'a' : 'div'}>`;

    // PI (bio and links live on their profile page)
    const pi = S.pi;
    document.getElementById('pi-card').innerHTML =
      personCard({ ...pi, role: pi.title, topic: pi.topic || S.department, initials: pi.initials || 'PI' });

    // Team — grouped by role
    const grpOrder = [
      { key: 'postdoc',  label: 'Postdoctoral Researchers' },
      { key: 'phd',      label: 'PhD Students' },
      { key: 'masters',  label: "Master's Students" },
      { key: 'undergrad', label: 'Undergraduate Researchers' },
      { key: 'alumni',   label: 'Alumni' },
    ];
    document.getElementById('people-groups').innerHTML = grpOrder
      .map(g => {
        const members = S.team.filter(m => (m.group || 'phd') === g.key);
        if (!members.length) return '';
        const isAlumni = g.key === 'alumni';
        if (isAlumni) {
          return `
        <div class="people-group">
          <h3 class="group-label">${g.label}</h3>
          <ul class="alumni-list">
            ${members.map(m => `
              <li class="alumni-item">
                <span class="alumni-name">${m.name}</span>
                <span class="alumni-role">${m.role}</span>
                ${m.now ? `<span class="alumni-now">▸ ${m.now}</span>` : ''}
              </li>`).join('')}
          </ul>
        </div>`;
        }
        return `
        <div class="people-group">
          <h3 class="group-label">${g.label}</h3>
          <div class="team-grid">
            ${members.map(personCard).join('')}
          </div>
        </div>`;
      }).join('');

    // Join Us
    const positions = [
      { key: 'phd',      icon: '🎓', title: 'PhD Students',            btn: 'Apply Now',    cls: 'btn-accent' },
      { key: 'postdoc',  icon: '🔬', title: 'Postdoctoral Researchers', btn: 'Apply Now',    cls: 'btn-accent' },
      { key: 'masters',  icon: '📘', title: "Master's Students",        btn: 'Get in Touch', cls: 'btn-outline-dark' },
      { key: 'undergrad',icon: '💻', title: 'Undergraduates',           btn: 'Get in Touch', cls: 'btn-outline-dark' },
    ];
    document.getElementById('join-grid').innerHTML = positions
      .filter(pos => S.join[pos.key]?.open)
      .map(pos => `
        <li class="join-item">
          <span class="join-icon">${pos.icon}</span>
          <div class="join-body">
            <h3>${pos.title}</h3>
            <p>${S.join[pos.key].desc}</p>
          </div>
        </li>`).join('');
    document.getElementById('join-note').innerHTML =
      `Send your CV and a brief statement of research interests to <a href="mailto:${S.email}" class="inline-link">${S.email}</a>.`;

    // Contact
    const loc = S.location.replace(/\n/g, '<br>');
    document.getElementById('contact-info').innerHTML = `
      <div class="contact-block">
        <h3>Location</h3>
        <p>${loc}<br>${S.department}<br>${S.university}</p>
      </div>
      <div class="contact-block">
        <h3>Contact</h3>
        <p><a href="mailto:${S.email}" class="contact-link">${S.email}</a>${S.phone ? `<br>${S.phone}` : ''}${S.office ? `<br>Office: ${S.office}` : ''}</p>
      </div>
      <div class="contact-block">
        <h3>Follow</h3>
        <div class="social-links">
          ${S.social.twitter ? `<a href="${S.social.twitter}" class="social-pill">Twitter / X</a>` : ''}
          ${S.social.github  ? `<a href="${S.social.github}"  class="social-pill">GitHub</a>` : ''}
          ${S.social.scholar ? `<a href="${S.social.scholar}" class="social-pill">Google Scholar</a>` : ''}
        </div>
      </div>`;

    document.getElementById('site-footer').innerHTML =
      `<p>© ${new Date().getFullYear()} ${S.smallName} &nbsp;·&nbsp; ${S.university}</p>`;
  }

  // ── News: sort by date, show most recent N ─────────────────────────
  function renderNews(items) {
    const limit = SITE.newsLimit || items.length;
    const M = {Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,Jul:7,Aug:8,Sep:9,Oct:10,Nov:11,Dec:12};
    const sorted = [...items]
      .sort((a,b) => b.year !== a.year ? b.year - a.year : (M[b.month]||0)-(M[a.month]||0))
      .slice(0, limit);
    document.getElementById('news-list').innerHTML = sorted.map(n => `
      <article class="news-item">
        <div class="news-date">
          <span class="nm">${n.month}</span>
          <span class="ny">${n.year}</span>
        </div>
        ${n.image ? `<img class="news-thumb" src="${n.image}" alt="" loading="lazy">` : ''}
        <div class="news-body">
          <span class="badge badge-${n.type}">${cap(n.type)}</span>
          <h3>${n.title}</h3>
          <p>${n.desc}</p>
          ${n.link ? `<a href="${n.link}" class="read-more">Read more →</a>` : ''}
        </div>
      </article>`).join('');
  }

  async function loadNews() {
    try {
      const res = await fetch('news.json');
      if (!res.ok) throw new Error();
      renderNews(await res.json());
    } catch { renderNews(SITE.news || []); }
  }

  // ── Publications: render items (from config or ORCID) ────────────────
  function renderPublications(items) {
    document.getElementById('pub-list').innerHTML = items.map(p => {
      const linkHtml = (p.links||[]).filter(l => l.url)
        .map(l => `<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`).join('');
      return `
      <div class="pub-item">
        <div class="pub-year">${p.year}</div>
        <div class="pub-content">
          <h4>${p.title}</h4>
          <p class="authors">${p.authors}</p>
          <p class="venue">${p.venue}</p>
          <div class="pub-links">${linkHtml}</div>
        </div>
      </div>`;
    }).join('');
  }

  // Everyone in config.js with an `author` entry — their names are shown in bold
  const labAuthors = () => [SITE.pi, ...(SITE.team || [])].map(x => x && x.author).filter(Boolean);

  async function loadPublications() {
    const o = SITE.orcid;
    if (o && o.id) {
      try {
        const works = await LabPubs.load(o.id, o.exclude);
        if (!works.length) throw new Error();
        renderPublications(works.slice(0, o.limit || 10).map(w => LabPubs.format(w, labAuthors())));
      } catch { renderPublications(SITE.publications||[]); }
    } else {
      renderPublications(SITE.publications||[]);
    }
  }

  // News and publications arrive after the page has opened and push the
  // sections below them down. If the page was opened at a section link
  // (e.g. index.html#people) and the visitor hasn't scrolled yet, go back to it.
  let userMoved = false;
  ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach(ev =>
    window.addEventListener(ev, () => { userMoved = true; }, { once: true, passive: true }));
  function keepAnchor() {
    const target = location.hash.length > 1 && document.getElementById(location.hash.slice(1));
    if (target && !userMoved) target.scrollIntoView({ behavior: 'instant' });
  }

  populateSite();
  loadNews().finally(keepAnchor);
  loadPublications().finally(keepAnchor);

  // ── Scroll & nav ─────────────────────────────────────────────────────
  const container = document.getElementById('scroll-container');
  const navbar    = document.getElementById('navbar');
  const navLinks  = document.querySelectorAll('.nav-links a');
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-links');
  const sections  = document.querySelectorAll('.section');

  // ── Navbar background on scroll ──────────────────────────────
  function updateNav() {
    if (container.scrollTop > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // ── Hero video: fade in once loaded ──────────────────────────
  const heroVideo = document.getElementById('hero-video');
  if (heroVideo && heroVideo.querySelector('source')?.src) {
    heroVideo.playbackRate = 0.75;
    heroVideo.addEventListener('canplaythrough', () => {
      heroVideo.classList.add('loaded');
    });
    // If already ready (cached)
    if (heroVideo.readyState >= 4) heroVideo.classList.add('loaded');
  }

  // ── Highlight active nav link by current section ─────────────
  function updateActiveLink() {
    let currentId = '';
    sections.forEach(section => {
      // Section is "current" when its top edge is within the upper half of the viewport
      const offsetTop = section.offsetTop;
      if (container.scrollTop >= offsetTop - container.clientHeight / 2) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  }

  container.addEventListener('scroll', () => {
    updateNav();
    updateActiveLink();
  }, { passive: true });

  // Run once on load
  updateNav();
  updateActiveLink();

  // ── Nav link clicks → smooth scroll inside container ─────────
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target   = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      // Close mobile menu
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  // ── Hero CTA buttons also scroll within container ─────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Already handled for nav links above; skip those
    if (anchor.closest('.nav-links')) return;
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── Mobile hamburger toggle ───────────────────────────────────
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
  });

  // ── Close mobile menu when clicking outside ───────────────────
  document.addEventListener('click', e => {
    if (
      navMenu.classList.contains('open') &&
      !navMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });

  // ── Keyboard navigation: arrow keys scroll between sections ──
  document.addEventListener('keydown', e => {
    // Only when no input is focused
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      scrollToNextSection(1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      scrollToNextSection(-1);
    }
  });

  function scrollToNextSection(direction) {
    const sectionArr = Array.from(sections);
    const viewMid = container.scrollTop + container.clientHeight / 2;
    let currentIndex = 0;

    sectionArr.forEach((s, i) => {
      if (s.offsetTop <= viewMid) currentIndex = i;
    });

    const nextIndex = Math.max(0, Math.min(sectionArr.length - 1, currentIndex + direction));
    sectionArr[nextIndex].scrollIntoView({ behavior: 'smooth' });
  }

  // ── Intersection Observer: fade-in cards on scroll ───────────
  const fadeTargets = document.querySelectorAll(
    '.r-card, .news-item, .pub-item, .team-card, .join-card, .contact-block'
  );

  fadeTargets.forEach(el => {
    el.style.opacity  = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings slightly
          const siblings = Array.from(entry.target.parentElement.children);
          const idx = siblings.indexOf(entry.target);
          setTimeout(() => {
            entry.target.style.opacity  = '1';
            entry.target.style.transform = 'translateY(0)';
          }, idx * 60);
          observer.unobserve(entry.target);
        }
      });
    },
    { root: container, threshold: 0.1 }
  );

  fadeTargets.forEach(el => observer.observe(el));

  // ── Lazy-load map iframe when Contact section enters view ────
  const mapIframe = document.querySelector('.map-box iframe[data-src]');
  if (mapIframe) {
    const mapObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        mapIframe.src = mapIframe.dataset.src;
        mapObserver.disconnect();
      }
    }, { root: container, threshold: 0.1 });
    mapObserver.observe(mapIframe.closest('section'));
  }
})();
