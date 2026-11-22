/* purpleherb — shared layout, menu, search, cart, natural elements, logo motion.
   No dependencies; works from file:// too. */
(function () {
  var PH = window.PH = window.PH || {};
  var root = document.body.getAttribute('data-root') || '';
  PH.root = root;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var LOGO = '#362A5C';

  /* ------------------------------------------------------------------ *
   * 1. Sprite: natural elements + tint filters
   * ------------------------------------------------------------------ */
  function flood(id, c) { return '<filter id="' + id + '" color-interpolation-filters="sRGB"><feFlood flood-color="' + c + '"/><feComposite in2="SourceAlpha" operator="in"/></filter>'; }
  var sprite = '' +
  '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>' +
  flood('ph-tint-logo', LOGO) + flood('ph-tint-white', '#ffffff') + flood('ph-tint-ghost', '#F5F2FC') + flood('ph-tint-plum', '#4A3B84') +
  '<linearGradient id="gPetal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B49AE0"/><stop offset="1" stop-color="#6A4AA6"/></linearGradient>' +
  '<linearGradient id="gHoney" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6C25A"/><stop offset="1" stop-color="#C9780F"/></linearGradient>' +
  '<radialGradient id="gBerry" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#FFB25E"/><stop offset=".55" stop-color="#F07C1E"/><stop offset="1" stop-color="#C9560B"/></radialGradient>' +
  '<linearGradient id="gResin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a2a22"/><stop offset=".5" stop-color="#140c08"/><stop offset="1" stop-color="#2a1c16"/></linearGradient>' +
  '<radialGradient id="gStone" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#F6F2FB"/><stop offset="1" stop-color="#D9D1E6"/></radialGradient>' +
  '<radialGradient id="gSlate" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#B7B2AD"/><stop offset="1" stop-color="#7F7A76"/></radialGradient>' +
  '</defs>' +
  '<symbol id="e-leaf" viewBox="0 0 100 100"><path d="M50 97C20 72 16 32 50 3c34 29 30 69 0 94z" fill="#86A465"/><path d="M50 92V12M50 70 36 58M50 52 34 40M50 36 38 26M50 70l14-12M50 52l16-12M50 36l12-10" stroke="#5F7E45" stroke-width="1.6" fill="none" stroke-linecap="round"/></symbol>' +
  '<symbol id="e-leafsilver" viewBox="0 0 100 100"><path d="M50 98C41 66 41 30 50 2c9 28 9 64 0 96z" fill="#A3B091"/><path d="M50 94V8" stroke="#E7ECDF" stroke-width="1.2"/></symbol>' +
  '<symbol id="e-petal" viewBox="0 0 100 100"><path d="M50 98C22 72 24 24 50 4c26 20 28 68 0 94z" fill="url(#gPetal)"/><path d="M50 90C46 64 46 36 50 14M50 80c-6-14-8-30-6-46M50 80c6-14 8-30 6-46" stroke="#5B3E96" stroke-opacity=".45" stroke-width="1.2" fill="none"/></symbol>' +
  '<symbol id="e-crocus" viewBox="0 0 100 100"><path d="M50 99V58M47 99C40 80 32 70 22 62M53 99c6-18 14-28 24-36" stroke="#6F8F4E" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M50 60C30 52 26 24 40 8c8 14 12 32 10 52z" fill="#8D6CC4"/><path d="M50 60c20-8 24-36 10-52-8 14-12 32-10 52z" fill="#6A4AA6"/><path d="M50 60C42 44 42 18 50 2c8 16 8 42 0 58z" fill="url(#gPetal)"/><path d="M50 58 42 30M50 58V26M50 58l8-28" stroke="#C21E2B" stroke-width="2.2" stroke-linecap="round"/><circle cx="42" cy="29" r="2.2" fill="#C21E2B"/><circle cx="50" cy="25" r="2.2" fill="#C21E2B"/><circle cx="58" cy="29" r="2.2" fill="#C21E2B"/></symbol>' +
  '<symbol id="e-thread" viewBox="0 0 100 100"><path d="M48 96C46 70 40 46 26 14M50 96c0-26 0-52 4-84M52 96c4-24 12-48 28-76" stroke="#C21E2B" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M22 10l10 2-4 8zM50 8l8 4-7 6zM78 16l6 6-9 3z" fill="#B0141F"/><path d="M48 96h6" stroke="#E8C58A" stroke-width="4" stroke-linecap="round"/></symbol>' +
  '<symbol id="e-berry" viewBox="0 0 100 100"><circle cx="50" cy="52" r="34" fill="url(#gBerry)"/><ellipse cx="38" cy="38" rx="9" ry="6" fill="#fff" opacity=".55" transform="rotate(-30 38 38)"/><circle cx="50" cy="86" r="2.6" fill="#7a3d0b"/></symbol>' +
  '<symbol id="e-berrysprig" viewBox="0 0 100 100"><path d="M8 92C30 72 52 50 92 10" stroke="#6A5440" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M30 72l-6-16M52 50l-4-18M70 32l10-8" stroke="#6A5440" stroke-width="1.6" stroke-linecap="round"/>' +
    '<g fill="url(#gBerry)"><circle cx="22" cy="78" r="6"/><circle cx="31" cy="66" r="6"/><circle cx="40" cy="62" r="5.5"/><circle cx="44" cy="52" r="6"/><circle cx="54" cy="44" r="5.5"/><circle cx="60" cy="36" r="6"/><circle cx="70" cy="28" r="5"/><circle cx="36" cy="74" r="5"/><circle cx="50" cy="58" r="5"/><circle cx="64" cy="44" r="5"/></g>' +
    '<g fill="#A3B091"><path d="M80 20c4-12 10-16 16-16-2 8-8 14-16 16z"/><path d="M84 16C76 8 72 2 70 0c8 2 14 8 14 16z"/><path d="M24 56c-8-4-12-10-12-16 8 2 12 8 12 16z"/></g></symbol>' +
  '<symbol id="e-drop" viewBox="0 0 100 100"><path d="M50 4s30 42 30 60a30 30 0 0 1-60 0C20 46 50 4 50 4z" fill="url(#gHoney)"/><path d="M36 58c0-10 6-20 10-26" stroke="#fff" stroke-opacity=".6" stroke-width="5" stroke-linecap="round" fill="none"/></symbol>' +
  '<symbol id="e-blossom" viewBox="0 0 100 100"><path d="M50 2C56 30 52 60 40 96" stroke="#6F8F4E" stroke-width="2" fill="none"/><g fill="#FBF8EF" stroke="#E3DCC7" stroke-width="1"><ellipse cx="54" cy="16" rx="9" ry="6"/><ellipse cx="44" cy="26" rx="9" ry="6"/><ellipse cx="57" cy="34" rx="8.5" ry="6"/><ellipse cx="45" cy="46" rx="8" ry="5.6"/><ellipse cx="55" cy="56" rx="7.5" ry="5.4"/><ellipse cx="44" cy="66" rx="6.5" ry="5"/><ellipse cx="51" cy="76" rx="5.5" ry="4.4"/><ellipse cx="43" cy="85" rx="4.5" ry="3.6"/></g><g fill="#E9DFA8"><circle cx="54" cy="16" r="1.8"/><circle cx="44" cy="26" r="1.8"/><circle cx="57" cy="34" r="1.6"/><circle cx="45" cy="46" r="1.6"/></g></symbol>' +
  '<symbol id="e-comb" viewBox="0 0 100 100"><g stroke="#D69B2E" stroke-width="2.4" fill="#fff"><path d="M30 20l14 8v16l-14 8-14-8V28z"/><path d="M58 20l14 8v16l-14 8-14-8V28z" fill="#F6DFAA"/><path d="M44 44l14 8v16l-14 8-14-8V52z"/><path d="M72 44l14 8v16l-14 8-14-8V52z"/><path d="M58 68l14 8v16l-14 8-14-8V76z" fill="#FAEBCB"/></g></symbol>' +
  '<symbol id="e-stone" viewBox="0 0 100 100"><path d="M14 62C8 42 26 24 50 22c26-2 40 14 38 34-2 22-22 30-42 30C30 86 18 78 14 62z" fill="url(#gSlate)"/><path d="M30 40c8-8 20-10 30-8" stroke="#fff" stroke-opacity=".35" stroke-width="3" stroke-linecap="round" fill="none"/></symbol>' +
  '<symbol id="e-stone2" viewBox="0 0 100 100"><path d="M10 58C10 40 30 30 54 32c22 2 36 10 36 26S70 80 48 80 10 76 10 58z" fill="url(#gStone)"/></symbol>' +
  '<symbol id="e-shard" viewBox="0 0 100 100"><path d="M14 60 26 30l20-10 18 6 20-4 6 26-10 22-24 10-26-6z" fill="url(#gResin)"/><path d="M28 34l16-8 10 10-12 12zM62 30l16-2 4 16-14 4z" fill="#6B5A8F" opacity=".45"/><path d="M30 64l14-6 10 12" stroke="#9C8BC4" stroke-opacity=".5" stroke-width="2" fill="none"/></symbol>' +
  '<symbol id="e-twig" viewBox="0 0 100 100"><path d="M6 80C30 66 58 50 96 20M40 60 30 40M62 44l10-20M74 36l18 0" stroke="#7A6450" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M30 40c-6-8-6-16-2-22 6 6 6 14 2 22zM72 24c2-10 8-14 14-16 0 8-6 14-14 16z" fill="#A3B091"/></symbol>' +
  '<symbol id="e-seed" viewBox="0 0 100 100"><path d="M50 10c18 14 24 40 10 64-6 10-14 10-20 0C26 50 32 24 50 10z" fill="#C9A26B"/><path d="M50 18c4 20 4 38 0 58" stroke="#9C7A48" stroke-width="2" fill="none"/></symbol>' +
  '<symbol id="e-sprout" viewBox="0 0 20 24"><path d="M9 24V12" stroke="#8FB36A" stroke-width="1.6" stroke-linecap="round"/><path d="M9 13C3 13 0 8 1 3c6 0 9 4 8 10z" fill="#8FB36A"/><path d="M10 11c1-6 5-9 9-8 0 5-4 8-9 8z" fill="#A9C988"/></symbol>' +
  '</svg>';
  var holder = document.createElement('div');
  holder.innerHTML = sprite;
  document.body.insertBefore(holder.firstChild, document.body.firstChild);

  PH.el = function (name, opts) {
    opts = opts || {};
    var i = document.createElement('i');
    i.className = 'el' + (opts.still ? ' still' : '') + (opts.drift ? ' drift' : '');
    i.setAttribute('aria-hidden', 'true');
    i.dataset.el = name;
    ['x', 'y', 'r', 's'].forEach(function (k) { if (opts[k] != null) i.style.setProperty('--' + k, opts[k]); });
    if (opts.depth) i.dataset.depth = opts.depth;
    i.style.setProperty('--sway', (5 + Math.random() * 5).toFixed(1) + 's');
    i.innerHTML = '<svg><use href="#e-' + name + '"/></svg>';
    return i;
  };
  function hydrate(scope) {
    (scope || document).querySelectorAll('i.el[data-el]:not([data-done])').forEach(function (i) {
      i.dataset.done = '1';
      i.setAttribute('aria-hidden', 'true');
      if (!i.style.getPropertyValue('--sway')) i.style.setProperty('--sway', (5 + Math.random() * 5).toFixed(1) + 's');
      i.innerHTML = '<svg><use href="#e-' + i.dataset.el + '"/></svg>';
    });
  }
  PH.hydrate = hydrate;

  /* ------------------------------------------------------------------ *
   * 2. Icons
   * ------------------------------------------------------------------ */
  var I = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="3.8"/><path d="M4.5 20.5c1.4-3.8 4.2-5.6 7.5-5.6s6.1 1.8 7.5 5.6" stroke-linecap="round"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M5 8h14l-1.2 12.5H6.2z"/><path d="M9 10V6.5a3 3 0 0 1 6 0V10" stroke-linecap="round"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3.5 7.5c5.5-1.4 11-1.4 17 0"/><path d="M3.5 12c4-.8 9-.6 12 0"/><path d="M3.5 16.5c5.5 1.4 11 1.4 17 0"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M6 6c4 3.5 8 8 12 12M18 6C14 9.5 10 14 6 18"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.3 21.8l5.1-1.3A9.7 9.7 0 1 0 12 2.2zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.7-1.7c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.2-.2-.5-.3z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.4 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H7.7v3h2.6V21z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="3" y="5.5" width="18" height="13" rx="3"/><path d="m4 7.5 8 5.5 8-5.5" stroke-linecap="round"/></svg>'
  };
  PH.icons = I;
  function socialHtml() {
    var s = PH.social || {};
    return '<div class="ph-social">' +
      '<a href="' + s.instagram + '" target="_blank" rel="noopener" aria-label="purpleherb on Instagram">' + I.ig + '</a>' +
      '<a href="' + s.facebook + '" target="_blank" rel="noopener" aria-label="purpleherb on Facebook">' + I.fb + '</a>' +
      '<a href="' + s.whatsapp + '" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">' + I.wa + '</a>' +
      '<a href="' + s.email + '" aria-label="Email support@purpleherb.in">' + I.mail + '</a>' +
    '</div>';
  }

  /* ------------------------------------------------------------------ *
   * 3. Header, menu, search, footer
   * ------------------------------------------------------------------ */
  var page = document.body.getAttribute('data-page') || '';
  var navItems = [
    ['Home', '/', 'home'],
    ['Shop', '/#collection', 'shop'],
    ['Story', '/#story', 'story'],
    ['Contact', '#contact', 'contact']
  ];
  var header = document.querySelector('[data-ph-header]');
  var scrim = document.createElement('div');
  scrim.className = 'ph-scrim';
  document.body.appendChild(scrim);
  var lastFocus = null;

  function closeAll() {
    document.body.classList.remove('menu-open', 'search-open', 'locked');
    if (lastFocus) { lastFocus.focus({ preventScroll: true }); lastFocus = null; }
  }
  function openLayer(cls, focusEl) {
    lastFocus = document.activeElement;
    document.body.classList.remove('menu-open', 'search-open');
    document.body.classList.add(cls, 'locked');
    if (focusEl) setTimeout(function () { focusEl.focus({ preventScroll: true }); }, 380);
  }
  scrim.addEventListener('click', closeAll);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });

  if (header) {
    header.className = 'ph-header';
    header.innerHTML =
      '<div class="ph-header__inner">' +
        '<a class="ph-wordmark" href="/" aria-label="purpleherb home">' + PH.wordmark + '</a>' +
        '<nav aria-label="Main"><ul class="ph-nav">' + navItems.map(function (n) {
          return '<li><a href="' + n[1] + '"' + (page === n[2] ? ' aria-current="page"' : '') + '>' + n[0] + '</a></li>';
        }).join('') + '</ul></nav>' +
        '<div class="ph-icons">' +
          '<button class="ph-ico" data-open-search aria-label="Search">' + I.search + '</button>' +
          '<a class="ph-ico" href="' + (PH.integrations.accountUrl || '#account') + '" data-ph-account aria-label="Account">' + I.user + '</a>' +
          '<a class="ph-ico" href="/cart" aria-label="Basket">' + I.bag + '<span class="ph-count" data-count-badge>0</span></a>' +
          '<button class="ph-ico ph-burger" aria-label="Open menu" aria-expanded="false" aria-controls="ph-menu">' + I.menu + '</button>' +
        '</div>' +
      '</div>';

    /* ---- menu ---- */
    var menu = document.createElement('aside');
    menu.className = 'ph-menu';
    menu.id = 'ph-menu';
    menu.setAttribute('aria-label', 'Menu');
    menu.tabIndex = -1;
    var links = [
      ['Home', '/', 'home', '0px', '-1deg'],
      ['The collection', '/#collection', 'shop', '34px', '1.5deg'],
      ['Our belief', '/#story', 'story', '10px', '-2deg'],
      ['The proof', '/#proof', 'proof', '52px', '1deg'],
      ['Your basket', '/cart', 'cart', '18px', '-1.5deg']
    ];
    menu.innerHTML =
      '<div class="ph-menu__scroll">' +
        '<i class="el drift" data-el="petal" style="--x:78%;--y:16%;--r:30deg;--s:.8"></i>' +
        '<i class="el drift" data-el="leaf" style="--x:84%;--y:46%;--r:-20deg;--s:1.1"></i>' +
        '<i class="el drift" data-el="berry" style="--x:70%;--y:58%;--s:.35"></i>' +
        '<i class="el drift" data-el="thread" style="--x:88%;--y:70%;--r:16deg;--s:.7"></i>' +
        '<i class="el drift" data-el="blossom" style="--x:4%;--y:82%;--r:-28deg;--s:.9"></i>' +
        '<div class="ph-menu__top"><a class="ph-wordmark" href="/" aria-label="purpleherb home">' + PH.wordmark + '</a>' +
          '<button class="ph-ico" data-close aria-label="Close menu">' + I.close + '</button></div>' +
        '<ul class="ph-menu__links">' + links.map(function (l, i) {
          return '<li style="--mx:' + l[3] + ';--mr:' + l[4] + ';--md:' + (0.18 + i * 0.07).toFixed(2) + 's"><a href="' + l[1] + '"' + (page === l[2] ? ' aria-current="page"' : '') + '><small>0' + (i + 1) + '</small>' + l[0] + '</a></li>';
        }).join('') + '</ul>' +
        '<div class="ph-menu__harvest"><p class="label">From the mountains</p><ul>' + (PH.products || []).map(function (p) {
          return '<li><a href="' + PH.purl(p) + '" style="--c:' + p.tones.tone + '"><i></i>' + p.name + '</a></li>';
        }).join('') + '</ul></div>' +
        '<div class="ph-menu__foot"><p class="label">Stay close</p>' + socialHtml() +
          '<p class="ph-menu__note">support@purpleherb.in · Mon – Fri, 9 AM – 6 PM IST</p></div>' +
      '</div>';
    document.body.appendChild(menu);
    var burger = header.querySelector('.ph-burger');
    burger.addEventListener('click', function () {
      openLayer('menu-open', menu);
      burger.setAttribute('aria-expanded', 'true');
    });
    menu.querySelector('[data-close]').addEventListener('click', function () { burger.setAttribute('aria-expanded', 'false'); closeAll(); });
    menu.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (a && a.getAttribute('href').indexOf('#') !== -1) { burger.setAttribute('aria-expanded', 'false'); closeAll(); }
    });

    /* ---- floating search ---- */
    var search = document.createElement('div');
    search.className = 'ph-search';
    search.setAttribute('role', 'search');
    search.innerHTML =
      '<label class="ph-search__bar">' + I.search +
        '<span class="sr-only">Search the harvest</span><input type="search" placeholder="Search saffron, honey, shilajit…" autocomplete="off">' +
        '<button class="ph-ico" data-close aria-label="Close search">' + I.close + '</button></label>' +
      '<div class="ph-search__chips">' + ['Saffron', 'Honey', 'Shilajit', 'Sea buckthorn', 'Ladakh', 'Kashmir'].map(function (c) { return '<button type="button">' + c + '</button>'; }).join('') + '</div>' +
      '<div class="ph-search__results" aria-live="polite"></div>';
    document.body.appendChild(search);
    var input = search.querySelector('input');
    var results = search.querySelector('.ph-search__results');
    function runSearch() {
      var q = input.value.trim().toLowerCase();
      var words = q.split(/\s+/).filter(Boolean);
      var hits = PH.products.filter(function (p) {
        var hay = (p.name + ' ' + p.keywords + ' ' + p.short + ' ' + p.origin.region + ' ' + p.tagline).toLowerCase();
        return words.every(function (w) { return hay.indexOf(w) !== -1; });
      });
      if (!hits.length) { results.innerHTML = '<p class="ph-search__empty">Nothing from the mountains matches “' + input.value.replace(/[<>&"]/g, '') + '” yet.</p>'; return; }
      results.innerHTML = hits.map(function (p, i) {
        var r = [-3, 2, -1.5, 3, -2][i % 5], ty = [0, 14, -6, 10, 4][i % 5];
        return '<a class="ph-hit" href="' + PH.purl(p) + '" style="--r:' + r + 'deg;--ty:' + ty + 'px;--d:' + (i * 0.06) + 's">' +
          '<img src="' + PH.img(p.images[0], 400) + '" alt="" loading="lazy"><strong>' + p.name + '</strong><span>' + p.origin.short + ' · ' + PH.inr(p.variants[0].price) + '</span></a>';
      }).join('');
    }
    input.addEventListener('input', runSearch);
    search.querySelectorAll('.ph-search__chips button').forEach(function (b) { b.addEventListener('click', function () { input.value = b.textContent; runSearch(); input.focus(); }); });
    search.querySelector('[data-close]').addEventListener('click', function (e) { e.preventDefault(); closeAll(); });
    header.querySelector('[data-open-search]').addEventListener('click', function () { runSearch(); openLayer('search-open', input); });
  }

  var footer = document.querySelector('[data-ph-footer]');
  if (footer) {
    footer.className = 'ph-footer';
    footer.id = 'contact';
    var prods = (PH.products || []).map(function (p) { return '<li><a href="' + PH.purl(p) + '">' + p.name + '</a></li>'; }).join('');
    footer.innerHTML =
      '<i class="el" data-el="leaf" style="--x:92%;--y:30px;--r:30deg;--s:1.1"></i>' +
      '<i class="el" data-el="stone2" style="--x:4%;--y:-10px;--r:-8deg;--s:1.3"></i>' +
      '<div class="wrap">' +
        '<div class="ph-footer__grid">' +
          '<div class="ph-footer__about">' +
            '<a class="ph-wordmark" href="/" aria-label="purpleherb home">' + PH.wordmark + '</a>' +
            '<p>Single origin. Barely handled. Honestly labelled. PurpleHerb brings the most potent superfoods down from the mountains, exactly as nature made them.</p>' +
            socialHtml() +
            '<p class="gst no-brand">Purple Herb Superfoods Private Limited · GSTIN 06AAQCP1685H1Z0</p>' +
          '</div>' +
          '<div><h4 class="label">Explore</h4><ul><li><a href="/">Home</a></li><li><a href="/#collection">The collection</a></li><li><a href="/#story">Our belief</a></li><li><a href="/#proof">The proof</a></li><li><a href="/cart">Your basket</a></li></ul></div>' +
          '<div><h4 class="label">The harvest</h4><ul>' + prods + '</ul></div>' +
          '<div><h4 class="label">Policies</h4><ul>' +
            '<li><a href="/pages/privacy-policy">Privacy Policy</a></li>' +
            '<li><a href="/pages/shipping-policy">Shipping Policy</a></li>' +
            '<li><a href="/pages/return-policy">Return &amp; Refund Policy</a></li>' +
            '<li><a href="/pages/terms-of-service">Terms of Service</a></li>' +
          '</ul>' +
          '<h4 class="label" style="margin-top:28px">Reach us</h4><ul><li><a href="mailto:support@purpleherb.in">support@purpleherb.in</a></li><li><a href="https://wa.me/919000016479">WhatsApp +91 90000 16479</a></li><li>Mon – Fri, 9:00 AM – 6:00 PM IST</li></ul></div>' +
        '</div>' +
        '<div class="ph-footer__base no-brand"><span>© ' + new Date().getFullYear() + ' Purple Herb Superfoods Pvt. Ltd. · rare by nature</span><span>Lab-tested · Traceable · Zero additives</span></div>' +
      '</div>';
    var wa = document.createElement('a');
    wa.className = 'wa';
    wa.href = 'https://wa.me/919000016479';
    wa.target = '_blank'; wa.rel = 'noopener';
    wa.innerHTML = I.wa + '<span>Chat with us</span>';
    wa.setAttribute('aria-label', 'Chat with us on WhatsApp');
    document.body.appendChild(wa);
  }

  /* ------------------------------------------------------------------ *
   * 4. Basket — kept in this browser, checkout on Shopify
   * ------------------------------------------------------------------ */
  /* Basket = the store's own Shopify cart, so checkout apps (Razorpay Magic Checkout)
     see the same items. The page starts from the cart Shopify printed (PH.initialCart),
     updates instantly, then syncs each change in the background. */
  var cart = {
    items: [],
    pending: 0,
    _queue: Promise.resolve(),
    load: function () {
      this.items = (PH.initialCart || []).map(function (i) { return { id: Number(i.id), qty: Number(i.qty) }; })
        .filter(function (i) { return PH.byVariant(i.id); });
    },
    save: function () { document.dispatchEvent(new CustomEvent('ph:cart')); },
    _push: function (id) {
      var self = this, it = this.items.find(function (i) { return i.id === id; });
      var updates = {}; updates[id] = it ? it.qty : 0;
      self.pending++;
      this._queue = this._queue.then(function () {
        return fetch('/cart/update.js', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ updates: updates }) })
          .then(function (r) { if (!r.ok) throw r; return r.json(); })
          .catch(function () { return fetch('/cart.js', { headers: { 'Accept': 'application/json' } }).then(function (r) { return r.json(); }); })
          .then(function (c) { self._from(c); })
          .catch(function () {})
          .then(function () { self.pending--; });
      });
      return this._queue;
    },
    _from: function (c) {
      var next = (c.items || []).map(function (i) { return { id: i.variant_id, qty: i.quantity }; }).filter(function (i) { return PH.byVariant(i.id); });
      var same = JSON.stringify(next) === JSON.stringify(this.items);
      this.items = next;
      if (!same) this.save();
    },
    refresh: function () { var self = this; return fetch('/cart.js', { headers: { 'Accept': 'application/json' } }).then(function (r) { return r.json(); }).then(function (c) { self._from(c); }).catch(function () {}); },
    synced: function () { return this._queue; },
    add: function (id, qty) { id = Number(id); qty = Math.max(1, Number(qty) || 1); var it = this.items.find(function (i) { return i.id === id; }); if (it) it.qty = Math.min(20, it.qty + qty); else this.items.push({ id: id, qty: qty }); this.save(); return this._push(id); },
    set: function (id, qty) { id = Number(id); var it = this.items.find(function (i) { return i.id === id; }); if (!it) return; if (qty < 1) return this.remove(id); it.qty = Math.min(20, qty); this.save(); return this._push(id); },
    remove: function (id) { id = Number(id); this.items = this.items.filter(function (i) { return i.id !== id; }); this.save(); return this._push(id); },
    count: function () { return this.items.reduce(function (s, i) { return s + i.qty; }, 0); },
    totals: function () { return this.items.reduce(function (t, i) { var m = PH.byVariant(i.id); t.sub += m.v.price * i.qty; t.compare += (m.v.compare || m.v.price) * i.qty; return t; }, { sub: 0, compare: 0 }); },
    checkoutUrl: function () { return '/checkout'; }
  };
  // the back button can show a cached page: refresh from the store when that happens
  window.addEventListener('pageshow', function (e) { if (e.persisted) cart.refresh(); });
  cart.load();
  PH.cart = cart;
  function paintBadge(bump) {
    document.querySelectorAll('[data-count-badge]').forEach(function (b) {
      var n = cart.count();
      b.textContent = n;
      b.classList.toggle('has', n > 0);
      if (bump) { b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); }
    });
  }
  document.addEventListener('ph:cart', function () { paintBadge(true); });
  paintBadge(false);

  var toast = document.createElement('div');
  toast.className = 'ph-toast';
  toast.setAttribute('role', 'status');
  document.body.appendChild(toast);
  var toastTimer;
  function showToast(m, qty) {
    toast.innerHTML = '<img src="' + PH.img(m.p.images[0], 200) + '" alt=""><p><strong>Added to your basket</strong>' + qty + ' × ' + m.p.name + ' · ' + m.v.title + '<br><a class="twig" href="/cart">View basket</a></p>';
    decorate(toast);
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 4200);
  }
  /* Checkout and Buy now.
     With a checkout server set in Theme settings, they open Razorpay Magic Checkout (login, saved
     addresses, UPI/cards/COD). Without one they fall back to Shopify's standard checkout button. */
  function goCheckout() {
    var btn = document.getElementById('ph-checkout-btn');
    if (btn) btn.click(); else window.location.href = '/checkout';
  }
  PH.goCheckout = goCheckout;
  function notice(title, msg) {
    toast.innerHTML = '<p><strong>' + title + '</strong>' + msg + '</p>';
    toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 6000);
  }
  var rzpBusy = false, rzpScript = null;
  function loadRzp() {
    if (window.Razorpay) return Promise.resolve();
    if (!rzpScript) rzpScript = new Promise(function (ok, no) {
      var s = document.createElement('script'); s.src = 'https://checkout.razorpay.com/v1/magic-checkout.js';
      s.onload = ok; s.onerror = function () { rzpScript = null; no(new Error('script')); };
      document.head.appendChild(s);
    });
    return rzpScript;
  }
  function api(path, payload) {
    return fetch(PH.integrations.checkoutApi.replace(/\/+$/, '') + '/api/' + path, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { j._status = r.status; return j; }); });
  }
  function thanks(info) {
    var o = document.createElement('div'); o.className = 'ph-thanks'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-modal', 'true');
    var line = info.unknown
      ? 'Your payment went through, but we could not confirm it on this screen. You do not need to pay again. We will email and message you shortly, and you can always write to us on WhatsApp.'
      : info.cod
        ? 'Your Cash on Delivery order is placed. We will message you with delivery updates.'
        : 'Your payment is received. A receipt is on its way to your phone and email, and we will message you when it ships.';
    o.innerHTML = '<div class="ph-thanks__card"><p class="label">Thank you</p><h2>Your order is with us.</h2><p>' + line + '</p>' +
      (info.receipt ? '<p class="ph-thanks__ref">Order reference · ' + info.receipt + '</p>' : '') +
      '<a class="pebble pebble--wide" href="/">Back to purpleherb</a></div>';
    document.body.appendChild(o);
    document.documentElement.style.overflow = 'hidden';
  }
  function checkout(items, clearBasket) {
    if (!PH.integrations.checkoutApi) { goCheckout(); return; }
    if (rzpBusy) return;
    if (!items.length) { notice('Your basket is empty', 'Add something first.'); return; }
    rzpBusy = true;
    document.body.classList.add('ph-paying');
    var done = function () { rzpBusy = false; document.body.classList.remove('ph-paying'); };
    Promise.all([api('create-order', { items: items }), loadRzp()]).then(function (r) {
      var o = r[0];
      if (!o.order_id) { done(); notice('Could not start checkout', o.error || 'Please try again in a moment.'); return; }
      var rz = new window.Razorpay({
        key: o.key_id, one_click_checkout: true, order_id: o.order_id,
        name: 'purpleherb', show_coupons: true,
        theme: { color: '#45346B' },
        handler: function (resp) {
          api('verify', resp).then(function (v) {
            done();
            if (clearBasket) fetch('/cart/clear.js', { method: 'POST', headers: { 'Accept': 'application/json' } }).then(function () { cart.refresh(); }).catch(function () {});
            thanks({ cod: v.cod, receipt: v.receipt || o.receipt, unknown: !v.ok });
          });
        },
        modal: { ondismiss: done }
      });
      rz.on('payment.failed', function (f) {
        notice('Payment did not go through', ((f && f.error && f.error.description) || 'Nothing was charged.') + ' You can try again.');
      });
      rz.open();
    }).catch(function () { done(); notice('Could not start checkout', 'Please check your connection and try again.'); });
  }
  PH.checkout = checkout;
  document.addEventListener('click', function (e) {
    var buy = e.target.closest('[data-ph-buy]'), co = e.target.closest('[name="checkout"]'), ac = e.target.closest('[data-ph-account]');
    if (buy) {
      e.preventDefault();
      var bm = PH.byVariant(buy.getAttribute('data-ph-buy'));
      if (!bm) return;
      if (bm.v.available === false) { soldOut(bm); return; }
      var qty = Number(buy.getAttribute('data-qty') || 1);
      if (PH.integrations.checkoutApi) { checkout([{ id: bm.v.id, qty: qty }], false); return; }  // this item only; basket untouched
      buy.classList.add('added');
      var others = cart.items.filter(function (i) { return i.id !== bm.v.id; }).map(function (i) { return i.id; });
      others.forEach(function (id) { cart.remove(id); });
      var it = cart.items.find(function (i) { return i.id === bm.v.id; });
      (it ? cart.set(bm.v.id, qty) : cart.add(bm.v.id, qty)).then(function () { buy.classList.remove('added'); goCheckout(); });
    } else if (co && PH.integrations.checkoutApi) {
      e.preventDefault(); e.stopImmediatePropagation();
      checkout(cart.items.map(function (i) { return { id: i.id, qty: i.qty }; }), true);
    } else if (co && cart.pending > 0) {
      e.preventDefault(); e.stopImmediatePropagation();
      cart.synced().then(function () { co.click(); });
    } else if (ac && !PH.integrations.accountUrl) { e.preventDefault(); PH.integrations.account(ac); }
  }, true);
  function soldOut(m) {
    toast.innerHTML = '<p><strong>Sold out for now</strong>' + m.p.name + ' · ' + m.v.title + ' is out of stock. Ask us on <a class="twig" href="' + PH.social.whatsapp + '">WhatsApp</a> when it is back.</p>';
    toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 4200);
  }
  PH.soldOut = soldOut;
  // any element with data-add="variantId" (and optional data-qty) adds to the basket
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-add]');
    if (!b) return;
    e.preventDefault();
    var id = b.getAttribute('data-add'), qty = Number(b.getAttribute('data-qty') || 1);
    var m = PH.byVariant(id);
    if (!m) return;
    if (m.v.available === false) { soldOut(m); return; }
    cart.add(id, qty);
    showToast(m, qty);
    var label = b.firstChild && b.firstChild.nodeType === 3 ? b.firstChild : null;
    if (label) {
      var was = label.nodeValue;
      b.classList.add('added'); label.nodeValue = 'Added';
      setTimeout(function () { b.classList.remove('added'); label.nodeValue = was; }, 1600);
    }
  });

  // pebble buttons get a sprout, twig links get their twig
  PH.sprout = '<svg class="sprout" aria-hidden="true"><use href="#e-sprout"/></svg>';
  PH.twigSvg = '<svg viewBox="0 0 120 12" preserveAspectRatio="none" aria-hidden="true"><path d="M2 7C30 3 58 10 88 6s26-2 30 0M84 6l7-5"/><circle class="bud" cx="92" cy="1.5" r="2.2"/></svg>';
  function decorate(scope) {
    (scope || document).querySelectorAll('.pebble:not([data-sprout])').forEach(function (b) { b.dataset.sprout = '1'; b.insertAdjacentHTML('beforeend', PH.sprout); });
    (scope || document).querySelectorAll('.twig:not([data-twig])').forEach(function (b) { b.dataset.twig = '1'; b.insertAdjacentHTML('beforeend', PH.twigSvg); });
  }
  PH.decorate = decorate;

  /* ------------------------------------------------------------------ *
   * 5. The brand is always written as its wordmark
   * ------------------------------------------------------------------ */
  var brandSvg = (PH.wordmark || '').replace(/role="img"\s*aria-label="[^"]*"/, 'aria-hidden="true" focusable="false"');
  var BRAND_RE = /(?<![@\w.\/])purple\s?herb(?![\w@]|\.\w)/i;
  var SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, INPUT: 1, TITLE: 1, OPTION: 1, NOSCRIPT: 1 };
  function brandify(scope) {
    var walker = document.createTreeWalker(scope || document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!BRAND_RE.test(n.nodeValue)) return NodeFilter.FILTER_REJECT;
        for (var p = n.parentNode; p && p !== document.body; p = p.parentNode) {
          if (SKIP[p.nodeName] || p.namespaceURI === 'http://www.w3.org/2000/svg' || (p.classList && (p.classList.contains('no-brand') || p.classList.contains('ph-brand')))) return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (n) {
      var frag = document.createDocumentFragment();
      // brand names inside emails or domains (support@purpleherb.in) stay as text
      n.nodeValue.split(/((?<![@\w.\/])purple\s?herb(?![\w@]|\.\w))/i).forEach(function (part) {
        if (/^purple\s?herb$/i.test(part)) {
          var s = document.createElement('span');
          s.className = 'ph-brand'; s.setAttribute('role', 'img'); s.setAttribute('aria-label', 'purpleherb');
          s.innerHTML = brandSvg;
          frag.appendChild(s);
        } else if (part) frag.appendChild(document.createTextNode(part));
      });
      n.parentNode.replaceChild(frag, n);
    });
  }
  PH.brandify = brandify;

  /* ------------------------------------------------------------------ *
   * 6. Logo motion — ported from the live theme's <dual-logo-animation>
   *    Load: drop + 360° spin.  Scroll: shrinks to a pinned corner mark that
   *    turns with the scroll (down = clockwise, up = anticlockwise).
   * ------------------------------------------------------------------ */
  function makeFloating(src) {
    var f = document.createElement('img');
    f.src = src; f.alt = ''; f.setAttribute('aria-hidden', 'true'); f.loading = 'eager';
    Object.assign(f.style, { position: 'fixed', display: 'none', height: 'auto', maxWidth: 'none', margin: '0', padding: '0', pointerEvents: 'none', transformOrigin: '50% 36%', zIndex: '30', filter: 'url(#ph-tint-logo)' });
    document.body.appendChild(f);
    return f;
  }
  function pinned() {
    var mobile = window.innerWidth < 750;
    return { size: mobile ? 44 : 60, left: mobile ? 12 : 20, top: mobile ? 100 : 120 };
  }
  var hero = document.querySelector('.dual-logo');
  if (hero) {
    var upper = hero.querySelector('.dual-logo-upper');
    var wrapper = hero.querySelector('.dual-logo-wrapper');
    var floating = makeFloating(upper.querySelector('img').src);
    var floatingW = makeFloating(upper.querySelector('img').src); floatingW.style.filter = 'url(#ph-tint-white)';
    var ready = false, frame = null;
    var schedule = function () { if (frame !== null) return; frame = requestAnimationFrame(function () { frame = null; update(); }); };
    var update = function () {
      if (!ready) return;
      var p = pinned(), travelDistance = 140;
      var wrapperRect = wrapper.getBoundingClientRect();
      var logoRect = upper.getBoundingClientRect();
      var stopPoint = parseFloat(getComputedStyle(upper).getPropertyValue('--stop-point')) || 0;
      var naturalTop = wrapperRect.top + stopPoint;
      var startTop = p.top + travelDistance;
      var progress = Math.max(0, Math.min(1, (startTop - naturalTop) / travelDistance));
      if (progress === 0) { upper.style.visibility = ''; floating.style.display = 'none'; floatingW.style.display = 'none'; return; }
      var eased = reduce.matches ? 1 : progress * progress * (3 - 2 * progress);
      var mix = function (a, b) { return a + (b - a) * eased; };
      var travelled = Math.max(0, startTop - naturalTop);
      var angle = reduce.matches ? 0 : travelled * 0.4;
      upper.style.visibility = 'hidden';
      Object.assign(floating.style, { display: 'block', width: mix(logoRect.width, p.size) + 'px', left: mix(logoRect.left, p.left) + 'px', top: mix(naturalTop, p.top) + 'px', transform: 'rotate(' + angle + 'deg)' });
      Object.assign(floatingW.style, { display: 'block', width: mix(logoRect.width, p.size) + 'px', left: mix(logoRect.left, p.left) + 'px', top: mix(naturalTop, p.top) + 'px', transform: 'rotate(' + angle + 'deg)' });
      floating.style.opacity = eased; floatingW.style.opacity = 1 - eased;
    };
    upper.addEventListener('animationend', function (e) { if (e.target !== upper) return; ready = true; schedule(); });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    setTimeout(function () { ready = true; schedule(); }, 2650);
  } else if (document.body.hasAttribute('data-pinned-logo')) {
    var fl = makeFloating(PH.asset('flower.png'));
    var place = function () {
      var p = pinned(), y = window.scrollY;
      var show = Math.max(0, Math.min(1, (y - 40) / 120));
      Object.assign(fl.style, { display: 'block', width: p.size + 'px', left: p.left + 'px', top: p.top + 'px', opacity: show, transform: 'rotate(' + (reduce.matches ? 0 : y * 0.4) + 'deg) scale(' + (0.7 + show * 0.3) + ')' });
    };
    var fr = null;
    window.addEventListener('scroll', function () { if (fr) return; fr = requestAnimationFrame(function () { fr = null; place(); }); }, { passive: true });
    window.addEventListener('resize', place);
    place();
  }

  /* ------------------------------------------------------------------ *
   * 7. Settling reveals, gentle parallax, count-ups
   * ------------------------------------------------------------------ */
  function observe() {
    var els = document.querySelectorAll('.settle:not(.in)');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (e) { io.observe(e); });
  }
  PH.observe = observe;
  var pf = null;
  function parallax() {
    pf = null;
    if (reduce.matches) return;
    var vh = window.innerHeight;
    document.querySelectorAll('.el[data-depth]').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var d = parseFloat(el.dataset.depth) || 0;
      el.style.setProperty('--py', ((r.top + r.height / 2 - vh / 2) * -d * 0.12).toFixed(1) + 'px');
    });
  }
  window.addEventListener('scroll', function () { if (!pf) pf = requestAnimationFrame(parallax); }, { passive: true });
  function countUps() {
    var nums = document.querySelectorAll('[data-count]');
    if (!nums.length || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var el = en.target, end = parseFloat(el.dataset.count), suffix = el.dataset.suffix || '';
        if (reduce.matches || end === 0) { el.innerHTML = end + (suffix ? '<small>' + suffix + '</small>' : ''); return; }
        var t0 = performance.now();
        (function tick(t) {
          var k = Math.min(1, (t - t0) / 1600), e = 1 - Math.pow(1 - k, 3);
          el.innerHTML = Math.round(end * e) + (suffix ? '<small>' + suffix + '</small>' : '');
          if (k < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: .4 });
    nums.forEach(function (n) { io.observe(n); });
  }

  /* ------------------------------------------------------------------ *
   * 8. Shared preview (anywhere but localhost / a local file):
   *    a small "Design preview" note, and the newsletter form explains
   *    instead of posting to another site.
   * ------------------------------------------------------------------ */
  PH.ready = function () { hydrate(); decorate(); brandify(); observe(); parallax(); countUps(); };
  if (document.readyState !== 'loading') setTimeout(PH.ready); else document.addEventListener('DOMContentLoaded', PH.ready);
})();
