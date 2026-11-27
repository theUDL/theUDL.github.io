// Animated nav logo: the "D" fires a focused beam at the "o", the focus
// flashes, and ripples spread outward. Plays once when the page opens and
// again whenever the pointer moves over the logo.
//
// The artwork itself is still media/icons/300ppi/Logo.png — this only draws the
// moving parts on top of it. Positions below are in the picture's own pixels.
(() => {
  const img = document.querySelector('.nav-logo img');
  if (!img || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const W = 10248, H = 3207;            // size of Logo.png
  const FOCUS = { x: 4080, y: 1332 };   // where the beam comes to a point, inside the "o"
  const RINGS = { x: 4076, y: 1352 };   // centre of the logo's two rings
  // The beam: wide at the "D", narrow at the focus
  const BEAM  = '6030,1108 6030,1548 4260,1388 4260,1280';

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('class', 'logo-anim');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', img.alt || 'Lab logo');
  svg.innerHTML = `
    <defs>
      <clipPath id="logo-beam"><polygon points="${BEAM}"/></clipPath>
      <radialGradient id="logo-flash">
        <stop offset="0" stop-color="#fff"/>
        <stop offset=".45" stop-color="#f3e7a8" stop-opacity=".85"/>
        <stop offset="1" stop-color="#CFC493" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <image href="${img.getAttribute('src')}" width="${W}" height="${H}"/>
    <g clip-path="url(#logo-beam)">
      ${[0, 1, 2, 3].map(i => `<rect class="logo-wave" style="--i:${i}" x="6030" y="1000" width="190" height="660" rx="95"/>`).join('')}
    </g>
    <circle class="logo-flash" cx="${FOCUS.x}" cy="${FOCUS.y}" r="520" fill="url(#logo-flash)"/>
    ${[0, 1, 2].map(i => `<circle class="logo-ripple" style="--i:${i}" cx="${RINGS.x}" cy="${RINGS.y}" r="1400"/>`).join('')}`;
  img.replaceWith(svg);

  const CYCLE = 3400;   // ms — keep in step with the animation lengths in style.css
  let busy = false;
  function play() {
    if (busy) return;
    busy = true;
    svg.classList.add('play');
    setTimeout(() => { svg.classList.remove('play'); busy = false; }, CYCLE);
  }
  setTimeout(play, 700);
  svg.parentElement.addEventListener('mouseenter', play);
})();
