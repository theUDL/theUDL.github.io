// Publications from ORCID — shared by the homepage (script.js) and the
// profile pages (person.js). Nothing to edit here: set the ORCID iD in config.js.
//
//   LabPubs.load(orcidId, exclude)  → Promise of papers, newest first
//   LabPubs.format(paper, authors)  → { year, title, authors, venue, links }
//                                     (same shape as the manual list in config.js)
//   LabPubs.isAuthor(name, author)  → does "First Last" match { last, initial }?
const LabPubs = (() => {
  const API = 'https://pub.orcid.org/v3.0/';
  const MAX_AUTHORS = 10;   // longer author lists are shortened with "et al."

  const esc = s => String(s == null ? '' : s)
    .replace(/&(?!(?:[a-z]+|#\d+);)/gi, '&amp;')
    .replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  // Titles may carry simple formatting such as <i>in vivo</i> — keep only that
  const escTitle = s => esc(s).replace(/&lt;(\/?)(i|em|b|strong|sub|sup)&gt;/gi, '<$1$2>');
  const key = s => String(s || '').toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]/g, '');

  // "Lee, Stephen A." → "Stephen A. Lee"
  function tidyName(n) {
    n = String(n || '').trim();
    const i = n.indexOf(',');
    return i > 0 ? `${n.slice(i + 1).trim()} ${n.slice(0, i).trim()}` : n;
  }

  function isAuthor(name, a) {
    if (!a || !a.last) return false;
    const parts = String(name).trim().toLowerCase().split(/\s+/);
    if (parts[parts.length - 1] !== a.last.toLowerCase()) return false;
    return !a.initial || parts.length < 2 || parts[0].startsWith(a.initial.toLowerCase());
  }

  async function getJson(path) {
    const res = await fetch(API + path, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`ORCID ${res.status}`);
    return res.json();
  }

  function tidyVenue(w) {
    const doi = w.doi || '';
    let v = w.venue || '';
    if (/^arxiv$/i.test(v) || doi.startsWith('10.48550/'))   v = 'arXiv';
    else if (/^biorxiv$/i.test(v))                           v = 'bioRxiv';
    else if (/^medrxiv$/i.test(v))                           v = 'medRxiv';
    else if (!v && w.type === 'preprint')                    v = 'Preprint';
    return v;
  }

  async function fetchWorks(orcidId) {
    const id = encodeURIComponent(orcidId);
    const summary = await getJson(`${id}/works`);
    // ORCID groups duplicate records of one paper; the first is the preferred one
    const codes = (summary.group || [])
      .map(g => g['work-summary'] && g['work-summary'][0] && g['work-summary'][0]['put-code'])
      .filter(Boolean);

    const works = [];
    for (let i = 0; i < codes.length; i += 100) {   // full records, 100 per request
      const bulk = await getJson(`${id}/works/${codes.slice(i, i + 100).join(',')}`);
      (bulk.bulk || []).forEach(b => b.work && works.push(b.work));
    }

    const seen = new Set();
    return works.map(w => {
      const ids  = ((w['external-ids'] || {})['external-id'] || []);
      const doi  = (ids.find(e => e['external-id-type'] === 'doi') || {})['external-id-value'] || '';
      const d    = w['publication-date'] || {};
      const num  = part => parseInt((d[part] || {}).value) || 0;
      const url  = (w.url || {}).value || '';
      const item = {
        title:   ((w.title || {}).title || {}).value || '',
        year:    num('year'), month: num('month'), day: num('day'),
        type:    w.type || '',
        doi:     doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, ''),
        url:     /publons\.com/i.test(url) ? '' : url,   // those links need a login
        venue:   (w['journal-title'] || {}).value || '',
        authors: ((w.contributors || {}).contributor || [])
          .map(c => tidyName((c['credit-name'] || {}).value)).filter(Boolean),
      };
      item.venue = tidyVenue(item);
      return item;
    })
    .filter(w => {                                   // drop exact repeats of a title
      const k = key(w.title);
      if (!k || seen.has(k)) return false;
      seen.add(k);
      return true;
    })
    .sort((a, b) => (b.year - a.year) || (b.month - a.month) || (b.day - a.day));
  }

  // One request per ORCID iD per visit, shared between pages via sessionStorage
  const pending = {};
  function load(orcidId, exclude) {
    const cacheKey = `labpubs:${orcidId}`;
    if (!pending[orcidId]) {
      let cached = null;
      try { cached = JSON.parse(sessionStorage.getItem(cacheKey)); } catch {}
      pending[orcidId] = cached
        ? Promise.resolve(cached)
        : fetchWorks(orcidId).then(items => {
            try { sessionStorage.setItem(cacheKey, JSON.stringify(items)); } catch {}
            return items;
          });
      pending[orcidId].catch(() => { delete pending[orcidId]; });
    }
    const skip = (exclude || []).map(x => String(x).toLowerCase()).filter(Boolean);
    return pending[orcidId].then(items => items.filter(w =>
      !skip.some(x => w.doi.toLowerCase() === x || w.title.toLowerCase().includes(x))));
  }

  // `people` is a list of { last, initial } — their names are shown in bold
  function format(w, people) {
    const mine  = n => (people || []).some(a => isAuthor(n, a));
    const show  = n => mine(n) ? `<strong>${esc(n)}</strong>` : esc(n);
    let authors = w.authors.map(show).join(', ');
    if (w.authors.length > MAX_AUTHORS + 2) {
      const later = w.authors.slice(MAX_AUTHORS).filter(mine).map(show);
      authors = w.authors.slice(0, MAX_AUTHORS).map(show).join(', ')
        + (later.length ? `, …, ${later.join(', ')}` : '') + ', et al.';
    }
    const links = [];
    if (w.doi) {
      links.push({
        label: w.doi.startsWith('10.48550/') ? 'arXiv' : 'DOI',
        url:   `https://doi.org/${encodeURI(w.doi)}`,
      });
    } else if (/^https?:\/\//i.test(w.url)) {
      links.push({ label: 'Link', url: esc(w.url) });
    }
    return {
      year:  w.year || '',
      title: escTitle(w.title),
      authors,
      venue: w.venue ? `<em>${esc(w.venue)}</em>` : '',
      links,
    };
  }

  return { load, format, isAuthor };
})();
