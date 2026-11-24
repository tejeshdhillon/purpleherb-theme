/* purpleherb — the scroll story of Sea Buckthorn Pure Pulp.
   Riverbeds of Ladakh → ripe on the thorn → hand harvest → sealed in glass → pure pulp → GMP packing → your home.

   Two moments play as short films: the drone flight and the spin from berries to pulp.
   When you reach one, the page holds still while it plays, so it is never left half-way;
   scroll back past it and it plays in reverse. Everything else follows your scroll, both ways.

   Everything is drawn live on one canvas (no video files): the landscape is generated in the browser,
   and the bottle, its print and the box are cut from purpleherb's own product photographs
   (sb-bottle.webp, sb-print.webp, sb-box.webp, sb-box-side.webp). */
(function () {
  'use strict';
  var PH = window.PH, root = document.getElementById('ph-story');
  if (!PH || !root) return;
  var product = PH.bySlug(document.body.getAttribute('data-product'));
  if (!product) return;

  var REDUCED = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------ words */
  var CAPS = [
    { a: -9, b: .42, label: 'Ladakh · 3,500 m', h: ['Where the cold desert', 'keeps its berry.'], p: '' },
    { a: .58, b: 1.44, label: 'Wild riverbeds', h: ['Untouched.', 'Unfarmed.'], p: 'Remote valleys fed by glacier melt. The harsher the winter, the richer the berry.' },
    { a: 1.5, b: 2.12, label: 'Ripe on the thorn', h: ['Amber means', 'ready.'], p: 'Deep orange, thin-skinned, heavy with oil. Picked only at its peak.' },
    { a: 2.22, b: 2.92, label: 'Hand harvest', h: ['Only the berry', 'travels on.'], p: 'Picked by Ladakhi families. Leaves, thorns and twigs stay in the valley.' },
    { a: 2.96, b: 3.42, label: 'Sealed in glass', h: ['Whole berries.', 'One bottle.'], p: '' },
    { a: 3.78, b: 4.4, label: 'Pure pulp', h: ['Just the berry.', 'No fillers.'], p: 'No water. No added sugar. No fillers. Those tiny seeds? Proof it’s real.' },
    { a: 4.48, b: 4.86, label: 'GMP-certified facility', h: ['Potency,', 'locked in.'], p: 'Pulped, bottled and boxed under GMP standards — sealed away from light and air.' },
    { a: 4.92, b: 99, label: 'Ladakh → your home', h: ['Thorn to', 'doorstep.'], p: 'Shipped straight to you, as potent as it left the valley.' }
  ];
  var DARK_UNTIL = 2.34;           /* captions sit on the landscape until the harvest clears to white */

  /* ------------------------------------------------------------------ scroll plan
     u = scroll inside the story, in screen-heights. tau = where the story is.
     tau 0–1 drone film · 1–2 closer · 2–3 harvest · 3–3.2 bottle · 3.2–4.2 spin film · 4.2–5.2 packing and shipping */
  var GATES = [
    { u: .12, dur: 5.6, p: 0, name: 'The valley' },
    { u: 3.5, dur: 4.6, p: 0, name: 'Berry to pulp' }
  ];
  var LEN = 6.0;                    /* story length after the stage pins, in screen-heights */
  function tauAt(u) {
    if (u < .5) return GATES[0].p;
    if (u < 1.65) return 1 + (u - .5) / 1.15;
    if (u < 3.25) return 2 + (u - 1.65) / 1.6;
    if (u < 3.5) return 3 + .2 * (u - 3.25) / .25;
    if (u < 3.9) return 3.2 + GATES[1].p;
    if (u < 5.7) return 4.2 + (u - 3.9) / 1.8;
    return 5.2;
  }

  /* ------------------------------------------------------------------ helpers */
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function ss(a, b, v) { var t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
  function eio(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function eo(t) { return 1 - Math.pow(1 - t, 3); }
  function mk(w, h) { var c = document.createElement('canvas'); c.width = Math.max(1, Math.round(w)); c.height = Math.max(1, Math.round(h)); return c; }
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function noise(seed) {
    var r = rng(seed), P = new Uint8Array(512), G = new Float32Array(256), i;
    for (i = 0; i < 256; i++) { P[i] = i; G[i] = r(); }
    for (i = 255; i > 0; i--) { var j = (r() * (i + 1)) | 0, t = P[i]; P[i] = P[j]; P[j] = t; }
    for (i = 0; i < 256; i++) P[i + 256] = P[i];
    function n2(x, y) {
      var xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi; xi &= 255; yi &= 255;
      var u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
      var a = G[P[P[xi] + yi]], b = G[P[P[xi + 1] + yi]], c = G[P[P[xi] + yi + 1]], d = G[P[P[xi + 1] + yi + 1]];
      return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
    }
    function fbm(x, y, o) { var s = 0, a = .5, t = 0; for (var k = 0; k < o; k++) { s += a * n2(x, y); t += a; a *= .5; x *= 2.03; y *= 2.03; } return s / t; }
    return { n2: n2, fbm: fbm };
  }
  var N = noise(20261124);
  function loadImg(file) { var im = new Image(); im.decoding = 'async'; im.src = PH.asset(file); return im; }
  function ok(im) { return im && im.complete && im.naturalWidth > 0; }

  /* ------------------------------------------------------------------ the real packaging */
  var IMG = { bottle: null, print: null, box: null, side: null };
  /* the bottle in sb-bottle.webp: 156 × 517 px. Half-width of the glass, as a share of its height, top to bottom */
  var BOT = { w: 156, h: 517, cap: .078,
    prof: [.0309, .0536, .052, .0536, .0567, .0464, .0499, .0532, .0576, .0621, .0663, .0698, .0737, .0772, .0809, .0845, .0876, .0913, .0944, .0973, .1008, .1033, .106, .1091, .1118, .1143, .1168, .1191, .1211, .1232, .1257, .1275, .1294, .1309, .1327, .1338, .1354, .1364, .1373, .1383, .1383, .1383, .1383, .1383, .1383, .1383, .1383, .1391, .1393, .1393, .1393, .1391, .1393, .1393, .1391, .1383, .1383, .1364, .1306, .1083, .029] };
  function hw(t) { t = clamp(t, 0, 1) * 60; var i = Math.min(59, t | 0), f = t - i; return lerp(BOT.prof[i], BOT.prof[i + 1], f); }

  /* ------------------------------------------------------------------ DOM */
  root.classList.add('sb');
  root.setAttribute('aria-label', 'The journey of ' + product.name + ', from Ladakh to your home');
  root.innerHTML =
    '<div class="sb__stage">' +
      '<canvas class="sb__canvas" aria-hidden="true"></canvas>' +
      '<div class="sb__scrim" aria-hidden="true"></div>' +
      '<div class="sb__copy wrap">' + CAPS.map(function (c, i) {
        return '<div class="sb__cap" data-i="' + i + '">' +
          '<p class="label">' + c.label + '</p>' +
          '<h2 class="hd sb__h">' + c.h[0] + '<br><span class="it">' + c.h[1] + '</span></h2>' +
          (c.p ? '<p class="sb__p">' + c.p + '</p>' : '') + '</div>';
      }).join('') + '</div>' +
      '<div class="sb__gmp" aria-hidden="true"><svg viewBox="0 0 200 200"><defs><path id="sbGmpPath" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0"/></defs>' +
        '<text><textPath href="#sbGmpPath" textLength="480">GMP certified · Lab-tested · Sealed in glass ·</textPath></text></svg>' +
        '<span>GMP</span></div>' +
      '<div class="sb__hint" aria-hidden="true"><i></i>Scroll to follow the berry</div>' +
      '<div class="sb__film" hidden><span class="sb__film-name"></span><i class="sb__film-bar"><b></b></i><button type="button" class="sb__skip">Skip</button></div>' +
    '</div>';

  var stage = root.querySelector('.sb__stage'), cv = root.querySelector('.sb__canvas'), ctx = cv.getContext('2d');
  var capEls = [].slice.call(root.querySelectorAll('.sb__cap'));
  var film = root.querySelector('.sb__film'), filmBar = film.querySelector('b'), filmName = film.querySelector('.sb__film-name');
  var hint = root.querySelector('.sb__hint'), gmp = root.querySelector('.sb__gmp'), scrim = root.querySelector('.sb__scrim');

  /* closing banner — the brand's promise, with the way to buy right under it */
  var v0 = product.variants[0] || {};
  var banner = document.createElement('section');
  banner.className = 'section sb-vision';
  banner.setAttribute('aria-labelledby', 'sb-vision-title');
  banner.innerHTML =
    '<div class="wrap"><div class="stone-card on-dark settle" style="--r:-1deg">' +
      '<img class="ghost" src="' + PH.asset('flower.png') + '" alt="" style="--gw:720px;--gx:86%;--gy:-120px;--gr:18deg">' +
      '<div class="sb-vision__grid">' +
        '<div><p class="label">Our promise</p>' +
          '<h2 id="sb-vision-title" class="hd hd-xl">Purity, preserved.<br><span class="chip chip--light">Valley to home.</span></h2>' +
          '<p class="lede" style="margin-top:26px">What leaves the riverbeds of Ladakh is what you pour at home — the whole berry, nothing lost along the way.</p>' +
          '<div class="p-buy" style="margin-top:30px">' +
            '<a class="pebble pebble--light" href="' + PH.addUrl(v0.id, 1) + '" data-add="' + v0.id + '" data-qty="1">Add to basket · ' + PH.inr(v0.price) + '</a>' +
            '<a class="twig sb-vision__buy" href="#buy" data-ph-buy="' + v0.id + '" data-qty="1">Buy it now</a>' +
          '</div></div>' +
        '<img class="sb-vision__bottle" src="' + PH.asset('sb-bottle.webp') + '" alt="' + product.name + ' bottle" loading="lazy" width="156" height="517">' +
      '</div>' +
    '</div></div>';
  root.parentNode.insertBefore(banner, root.nextSibling);

  /* ------------------------------------------------------------------ size */
  var W = 0, H = 0, DPR = 1, M = { sh: 0 }, L = {};
  function measure() {
    var r = stage.getBoundingClientRect();
    W = r.width; H = r.height;
    DPR = Math.min(window.devicePixelRatio || 1, W < 760 ? 2 : 1.6);
    var cw = Math.round(W * DPR), ch = Math.round(H * DPR);
    if (cv.width === cw && cv.height === ch && M.sh === H) return;
    cv.width = cw; cv.height = ch;
    M.sh = H;
    root.style.height = Math.round(H * (LEN + 1)) + 'px';
    var mob = W < 760;
    L.mob = mob;
    L.U = mob ? Math.max(W, H * .6) : Math.min(W, H * 1.05);
    L.fx = mob ? W * .5 : W * .62;                       /* where the eye rests: right of the words on desktop */
    L.fy = mob ? H * .38 : H * .5;
    L.bh = Math.min(mob ? H * .5 : H * .66, 640);        /* bottle height on screen */
    L.bx = mob ? W * .5 : W * .64;
    L.by = mob ? H * .1 : (H - L.bh) / 2 + H * .01;      /* bottle top */
    L.F = Math.max(W, H) * .75;                          /* drone lens */
    ROUTE = null; endFrame = null;
    dirty = true;
  }

  /* ------------------------------------------------------------------ assets made in the browser, a little each frame */
  var A = { ready: false }, jobs = [], started = false;
  function startJobs() {
    if (started) return; started = true;
    IMG.bottle = loadImg('sb-bottle.webp'); IMG.print = loadImg('sb-print.webp');
    IMG.box = loadImg('sb-box.webp'); IMG.side = loadImg('sb-box-side.webp');
    [IMG.bottle, IMG.print, IMG.box, IMG.side].forEach(function (im) { im.onload = function () { dirty = true; kick(); }; });
    jobs.push(spritesJob, heightJob(), colourJob(), function () { buildWorld(); buildBranch(); A.ready = true; dirty = true; return true; });
    kick();
  }
  function pump(budget) { var t0 = performance.now(); while (jobs.length && performance.now() - t0 < budget) { if (jobs[0]()) jobs.shift(); } }

  /* ---------- berries, shrubs, poplars, pulp: small painted sprites */
  function paintBerry(dark, hueShift) {
    var c = mk(96, 96), g = c.getContext('2d'), rx = 34, ry = 41;
    g.translate(48, 48);
    g.save(); g.scale(1, ry / rx);
    var gr = g.createRadialGradient(-rx * .34, -rx * .4, rx * .06, 0, 0, rx);
    var cols = dark ? ['#e7883a', '#cf5f12', '#a9420a', '#6e2604'] : ['#ffc46b', '#ff9128', '#f06c0e', '#b9430a'];
    if (hueShift) cols = hueShift > 0 ? ['#ffd27a', '#ffa02e', '#f57d12', '#c2520b'] : ['#ffb45c', '#fa8020', '#e35f0b', '#a83a08'];
    gr.addColorStop(0, cols[0]); gr.addColorStop(.36, cols[1]); gr.addColorStop(.78, cols[2]); gr.addColorStop(1, cols[3]);
    g.fillStyle = gr; g.beginPath(); g.arc(0, 0, rx, 0, 7); g.fill();
    var sg = g.createRadialGradient(rx * .18, rx * .5, 0, rx * .18, rx * .5, rx * .7);   /* light passing through the skin */
    sg.addColorStop(0, dark ? 'rgba(255,150,60,.25)' : 'rgba(255,186,90,.6)'); sg.addColorStop(1, 'rgba(255,170,70,0)');
    g.fillStyle = sg; g.fill();
    g.restore();
    g.fillStyle = 'rgba(255,255,255,' + (dark ? .35 : .85) + ')';                        /* the wet shine */
    g.beginPath(); g.ellipse(-rx * .36, -ry * .42, rx * .2, rx * .12, -.6, 0, 7); g.fill();
    g.fillStyle = 'rgba(255,255,255,' + (dark ? .12 : .3) + ')';
    g.beginPath(); g.ellipse(-rx * .28, -ry * .3, rx * .4, rx * .26, -.6, 0, 7); g.fill();
    g.fillStyle = 'rgba(255,230,190,.35)';
    g.beginPath(); g.ellipse(rx * .5, ry * .3, rx * .08, rx * .2, .3, 0, 7); g.fill();
    g.fillStyle = '#5b3a1e'; g.beginPath(); g.arc(0, -ry + 3.5, 3.2, 0, 7); g.fill();          /* the tiny calyx dot */
    return c;
  }
  function paintShrub(seed) {
    var r = rng(seed), c = mk(320, 220), g = c.getContext('2d'), i;
    for (i = 0; i < 16; i++) {                                                         /* twigs */
      g.strokeStyle = 'rgba(80,66,52,.7)'; g.lineWidth = 1.5 + r() * 2;
      var x0 = 160 + (r() - .5) * 60; g.beginPath(); g.moveTo(x0, 220); g.quadraticCurveTo(x0 + (r() - .5) * 80, 150, x0 + (r() - .5) * 260, 40 + r() * 80); g.stroke();
    }
    for (i = 0; i < 900; i++) {                                                        /* silver-green leaves */
      var a = r() * Math.PI, rad = Math.sqrt(r());
      var x = 160 + Math.cos(a) * rad * 150 * (r() > .5 ? 1 : -1) * .98, y = 214 - Math.sin(a) * rad * 190;
      var shade = (y / 220) * .55 + r() * .35;
      var cr = lerp(178, 82, shade), cg = lerp(192, 98, shade), cb = lerp(170, 76, shade);
      g.fillStyle = 'rgb(' + (cr | 0) + ',' + (cg | 0) + ',' + (cb | 0) + ')';
      g.beginPath(); g.ellipse(x, y, 2 + r() * 2.2, 7 + r() * 6, r() * 3, 0, 7); g.fill();
    }
    for (i = 0; i < 240; i++) {                                                        /* berries */
      var a2 = r() * Math.PI, rad2 = Math.sqrt(r()) * .92;
      var bx = 160 + Math.cos(a2) * rad2 * 140 * (r() > .5 ? 1 : -1), by = 214 - Math.sin(a2) * rad2 * 175;
      var cl = r();
      g.fillStyle = cl > .5 ? '#f28a24' : cl > .2 ? '#e46c12' : '#ffad48';
      g.beginPath(); g.arc(bx, by, 2.4 + r() * 2, 0, 7); g.fill();
      g.fillStyle = 'rgba(255,240,210,.7)'; g.beginPath(); g.arc(bx - .8, by - .8, .9, 0, 7); g.fill();
    }
    var sh = g.createLinearGradient(0, 60, 0, 220); sh.addColorStop(0, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(30,26,20,.35)');
    g.globalCompositeOperation = 'source-atop'; g.fillStyle = sh; g.fillRect(0, 0, 320, 220);
    return c;
  }
  function paintPoplar(seed) {
    var r = rng(seed), c = mk(90, 300), g = c.getContext('2d'), i;
    g.strokeStyle = '#6d5a45'; g.lineWidth = 4; g.beginPath(); g.moveTo(45, 300); g.lineTo(45, 60); g.stroke();
    for (i = 0; i < 900; i++) {
      var y = 20 + r() * 250, t = (y - 20) / 250, wdt = Math.sin(Math.min(1, t * 1.25) * Math.PI * .5) * 36 * (1 - t * .25);
      var x = 45 + (r() * 2 - 1) * wdt;
      var lit = (x < 45 ? .25 : .65) + r() * .3;
      g.fillStyle = lit < .45 ? '#f2cf5c' : lit < .7 ? '#dcae3a' : '#a9792a';
      g.beginPath(); g.ellipse(x, y, 2 + r() * 1.6, 3 + r() * 2, r() * 3, 0, 7); g.fill();
    }
    return c;
  }
  function paintPulp() {
    var s = 320, c = mk(s, s), g = c.getContext('2d'), r = rng(5), d = g.createImageData(s, s), px = d.data;
    for (var y = 0; y < s; y++) for (var x = 0; x < s; x++) {
      var n = N.fbm(x / 26, y / 26, 4), f = N.fbm(x / 6 + 40, y / 40, 2);         /* mottled pulp with fine fibres */
      var k = .82 + .32 * n + .1 * (f - .5), o = (y * s + x) * 4;
      px[o] = clamp(246 * k, 0, 255); px[o + 1] = clamp(128 * k * (.9 + .2 * n), 0, 255); px[o + 2] = clamp(28 * k, 0, 255); px[o + 3] = 255;
    }
    g.putImageData(d, 0, 0);
    for (var i = 0; i < 26; i++) {                                                      /* oil sheen */
      g.fillStyle = 'rgba(255,214,140,' + (.12 + r() * .2) + ')'; g.beginPath(); g.ellipse(r() * s, r() * s, 4 + r() * 14, 2 + r() * 5, r() * 3, 0, 7); g.fill();
    }
    for (i = 0; i < 9; i++) {                                                           /* the seeds */
      var sx = 40 + r() * (s - 80), sy = 40 + r() * (s - 80), a = r() * 3;
      g.save(); g.translate(sx, sy); g.rotate(a);
      var sg = g.createLinearGradient(-12, -7, 12, 7); sg.addColorStop(0, '#7a4a22'); sg.addColorStop(1, '#2e1a0c');
      g.fillStyle = sg; g.beginPath(); g.ellipse(0, 0, 13 + r() * 4, 6.5 + r() * 2, 0, 0, 7); g.fill();
      g.fillStyle = 'rgba(255,230,190,.55)'; g.beginPath(); g.ellipse(-4, -2.4, 4.5, 1.5, 0, 0, 7); g.fill();
      g.restore();
    }
    return c;
  }
  function spritesJob() {
    A.berry = [paintBerry(false, 0), paintBerry(false, 1), paintBerry(false, -1)];
    A.berryDark = [paintBerry(true, 0)];
    A.shrubs = [1, 2, 3, 4, 5, 6].map(paintShrub);
    A.poplars = [11, 12, 13].map(paintPoplar);
    A.pulp = paintPulp();
    return true;
  }

  /* ---------- the valley, in 3D: a heightmap of a Ladakhi river valley, shaded by the sun, flown through by the drone.
     One cell is 16 m. The valley runs along z; the river braids down its floor between thickets of sea buckthorn. */
  var TM = { mx: 512, mz: 1024, cell: 16 }, HM = null, CM = null;
  var SKY_H = [214, 228, 240];
  function rxc(z) { return 256 + 22 * Math.sin(z / 55) + 30 * Math.sin(z / 140 + 1) + 6 * Math.sin(z / 23 + 2); }
  function vhalf(z) { return 34 + 16 * N.fbm(z / 80, 7.7, 2); }
  function ridged(x, z, o) {
    var s = 0, a = .5, t = 0, prev = 1;
    for (var k = 0; k < o; k++) { var n = 1 - Math.abs(2 * N.n2(x, z) - 1); n *= n; s += a * n * (.5 + .5 * prev); prev = n; t += a; a *= .5; x *= 2.07; z *= 2.07; }
    return s / t;
  }
  function heightJob() {
    HM = new Float32Array(TM.mx * TM.mz); var z = 0;
    return function () {
      var end = Math.min(TM.mz, z + 24);
      for (; z < end; z++) {
        var rc = rxc(z), vh = vhalf(z);
        for (var x = 0; x < TM.mx; x++) {
          var d = Math.abs(x - rc), rise = ss(vh, vh + 120, d);
          var h = 0;
          if (rise > 0 || z > 700) {
            var m = ridged(x / 80, z / 80, 5);
            h = rise * (260 + 1500 * m * m * 1.25) + rise * rise * 380 + ss(160, 256, d) * 900 * (.55 + .45 * m);
            var endW = ss(760, 990, z); if (endW > 0) h = Math.max(h, endW * (1300 + 2300 * ridged(x / 95 + 9, z / 95, 4)));
          }
          h += (1 - rise) * 5 * N.n2(x / 5, z / 5);
          HM[z * TM.mx + x] = h;
        }
      }
      if (z < TM.mz) return false;
      /* soften the rock a touch so far ridges don't turn to needles */
      var src = HM.slice(), mxx = TM.mx;
      for (var zz = 1; zz < TM.mz - 1; zz++) for (var xx = 1; xx < mxx - 1; xx++) {
        var i = zz * mxx + xx; if (src[i] < 30) continue;
        HM[i] = (src[i] * 4 + src[i - 1] + src[i + 1] + src[i - mxx] + src[i + mxx] + (src[i - mxx - 1] + src[i - mxx + 1] + src[i + mxx - 1] + src[i + mxx + 1]) * .5) / 10;
      }
      return true;
    };
  }
  function colourJob() {
    CM = new Uint32Array(TM.mx * TM.mz); var z = 0, cell = TM.cell;
    var sun = [-.62, .6, -.5], sl = Math.hypot(sun[0], sun[1], sun[2]); sun = sun.map(function (v) { return v / sl; });
    var tanAlt = .62;
    return function () {
      var end = Math.min(TM.mz, z + 20);
      for (; z < end; z++) {
        var rc = rxc(z), vh = vhalf(z), shadowH = -1e9;
        for (var x = 0; x < TM.mx; x++) {
          var i = z * TM.mx + x, h = HM[i];
          var hl = HM[i - (x > 0 ? 1 : 0)], hr = HM[i + (x < TM.mx - 1 ? 1 : 0)], hd = HM[i - (z > 0 ? TM.mx : 0)], hu = HM[i + (z < TM.mz - 1 ? TM.mx : 0)];
          var nx = -(hr - hl) / (2 * cell), nz = -(hu - hd) / (2 * cell), nl = Math.hypot(nx, 1, nz);
          nx /= nl; var ny = 1 / nl; nz /= nl;
          var lam = Math.max(0, nx * sun[0] + ny * sun[1] + nz * sun[2]);
          shadowH = Math.max(shadowH - tanAlt * cell, h);
          var shade = h < shadowH - 2 ? .28 : 1;
          var dd = x - rc, ad = Math.abs(dd), r, g, b, floor = h < 40;
          var n1 = N.fbm(x / 40 + 3, z / 40, 3), n2 = N.fbm(x / 9, z / 9, 2), n3 = N.n2(x * .9, z * .9);
          if (floor) {
            var bed = 16 + 7 * n1;
            if (ad < bed) {                                                       /* pale gravel, braided water */
              var k = .8 + .3 * n2 + .1 * (n3 - .5); r = 214 * k; g = 205 * k; b = 190 * k;
              var w = Math.min(Math.abs(dd - 2.6 * Math.sin(z / 15)) - (1.5 + .9 * n2),
                ad < bed - 3 ? Math.abs(dd + 9 * Math.sin(z / 33 + 1)) - (.55 + .5 * n2) : 99,
                ad < bed - 3 ? Math.abs(dd - 11 * Math.sin(z / 24 + 2.3)) - (.45 + .4 * n2) : 99);
              if (w < 0) { var dp = clamp(-w / 1.2, 0, 1); r = lerp(150, 78, dp); g = lerp(190, 146, dp); b = lerp(190, 160, dp); if (n3 > .78) { r += 40; g += 40; b += 36; } }
              else if (w < .6) { r -= 40; g -= 36; b -= 28; }
            } else {                                                              /* thickets, poplars, a few fields */
              var tk = .66 + .5 * n3 * (.6 + .6 * n2);
              r = 132 * tk; g = 142 * tk; b = 108 * tk;
              if (n3 > .58 && n2 > .42) { r = lerp(r, 218, .4); g = lerp(g, 112, .4); b = lerp(b, 34, .4); }
              if (n1 > .6 && n2 > .45) { r = 222 * tk; g = 176 * tk; b = 64 * tk; }
              if (n1 < .3 && ad > vh - 16) { var st = (Math.sin(x * 1.3 + z * .4) > 0) ? 1 : .9; r = 214 * st; g = 186 * st; b = 112 * st; }
              if (ad > vh - 4) { r = lerp(r, 196, .5); g = lerp(g, 178, .5); b = lerp(b, 150, .5); }
            }
            var lf = .78 + .3 * lam; r *= lf * (shade < 1 ? .75 : 1); g *= lf * (shade < 1 ? .75 : 1); b *= lf * (shade < 1 ? .8 : 1);
          } else {                                                                /* bare slopes: ochre, rust and violet bands, snow up high */
            var band = N.n2(x / 60, h / 140 + n1 * 1.5), scree = 1 - ss(40, 260, h);
            r = lerp(210, 150, band); g = lerp(174, 116, band); b = lerp(128, 86, band);
            if (band > .66) { r = lerp(r, 172, .45); g = lerp(g, 104, .45); b = lerp(b, 72, .45); }       /* rust */
            else if (band < .26) { r = lerp(r, 146, .35); g = lerp(g, 128, .35); b = lerp(b, 132, .35); }  /* violet-grey */
            r = lerp(r, 205, scree * .6); g = lerp(g, 190, scree * .6); b = lerp(b, 168, scree * .6);
            var gul = .86 + .28 * n2;
            var light = (.34 + .9 * lam * shade) * gul;
            r *= light; g *= light; b *= light;
            if (h > 1850 + 500 * n1 && ny > .48) { var sn2 = .55 + .55 * lam * shade; r = 236 * sn2 + 10; g = 240 * sn2 + 10; b = 250 * sn2 + 14; }
            else if (shade < 1) { b *= 1.12; }
          }
          CM[i] = (255 << 24) | (clamp(b, 0, 255) << 16) | (clamp(g, 0, 255) << 8) | clamp(r, 0, 255);
        }
      }
      return z >= TM.mz;
    };
  }

  /* ---------- the drone's path, and the thickets standing on the valley floor */
  var Z0 = 10 * 16, Z1 = 400 * 16, world = [];
  function camRaw(t) {
    var e = eio(t), lo = ss(0, 1, t);
    var z = lerp(Z0, Z1, t * .3 + e * .7);
    var h = 6 + 1250 * Math.pow(1 - lo, 1.7);
    var rc = rxc((z + 500) / 16) * 16;
    var x = lerp(rc, rxc(Z1 / 16) * 16 + 330, ss(.4, 1, t));
    return { x: x, z: z, h: h };
  }
  function cam(t) {
    var c = camRaw(t), n = camRaw(Math.min(1, t + .02)), p = camRaw(Math.max(0, t - .02));
    c.yaw = Math.atan2(n.x - p.x, Math.max(1, n.z - p.z)) * .8;
    c.low = 1 - Math.sqrt((c.h - 6) / 1250);
    c.roll = .03 * Math.sin(t * 5.2) * (1 - t * .7) - (n.x - p.x) * .00004;
    return c;
  }
  function buildWorld() {
    var r = rng(42), i, c1 = cam(1);
    for (i = 0; i < 6500; i++) {
      var zc = i < 2400 ? 30 + r() * 440 : 250 + r() * 230, rc = rxc(zc), vh = vhalf(zc), side = r() > .5 ? 1 : -1;
      var off = 15 + r() * (vh - 17);
      if (N.n2((rc + side * off) * .9, zc * .9) < .3) continue;
      var pop = r() < .08;
      world.push({ x: (rc + side * off) * 16, z: zc * 16, s: pop ? 15 + r() * 7 : 2.6 + r() * 2.6, k: (r() * (pop ? 3 : 6)) | 0, pop: pop, a: .6 + r() * .4 });
    }
    for (i = 0; i < 34; i++) world.push({ x: c1.x + (r() - .5) * 110, z: c1.z + 10 + r() * 110, s: 3 + r() * 3, k: (r() * 6) | 0, pop: false, a: 1 });
    for (i = 0; i < 260; i++) { var zz = c1.z - 300 + r() * 900, xx = c1.x + (r() - .5) * (60 + Math.abs(zz - c1.z) * .9); if (Math.abs(xx - rxc(zz / 16) * 16) > 200) world.push({ x: xx, z: zz, s: 2.6 + r() * 3, k: (r() * 6) | 0, pop: false, a: 1 }); }
    for (i = 0; i < 9; i++) world.push({ x: c1.x + (r() - .5) * 320, z: c1.z + 70 + r() * 260, s: 16 + r() * 6, k: (r() * 3) | 0, pop: true, a: 1 });
    world.sort(function (a, b) { return a.z - b.z; });
  }

  /* the drone frame: sky, then the terrain column by column (front to back), then shrubs and poplars */
  var TV = null, SPRITE_CAP = 420;
  function terrainView() {
    var iw = L.mob ? 360 : 640, ih = Math.round(iw * H / W);
    if (!TV || TV.w !== iw || TV.h !== ih) {
      var c = mk(iw, ih), g = c.getContext('2d'), img = g.createImageData(iw, ih);
      TV = { w: iw, h: ih, c: c, g: g, img: img, u32: new Uint32Array(img.data.buffer), yb: new Int32Array(iw) };
    }
    return TV;
  }
  function drawDrone(g, t) {
    var c = cam(t), V = terrainView(), iw = V.w, ih = V.h, buf = V.u32, yb = V.yb;
    var F = .86 * Math.max(iw, ih * .72), hor = ih * lerp(.2, .44, c.low), sn = Math.sin(c.yaw), cs = Math.cos(c.yaw);
    buf.fill(0); yb.fill(ih);
    var cell = TM.cell, mx = TM.mx, mz = TM.mz, z = 2, zfar = 15500, camH = c.h;
    while (z < zfar) {
      var half = z * (iw / 2) / F, lx = c.x + sn * z - cs * half, lz = c.z + cs * z + sn * half;
      var dx = 2 * cs * half / iw, dz = -2 * sn * half / iw, inv = F / z;
      var fog = Math.pow(clamp((z - 500) / 15000, 0, 1), .85) * .62, fi = 1 - fog;
      var fr = SKY_H[0] * fog, fg = SKY_H[1] * fog, fb = SKY_H[2] * fog, near = z < 320, mid = z < 3000;
      for (var i = 0; i < iw; i++, lx += dx, lz += dz) {
        var top = yb[i]; if (top <= 0) continue;
        var cx = clamp(lx / cell, 0, mx - 1.001), cz = clamp(lz / cell, 0, mz - 1.001);
        var xi = cx | 0, zi = cz | 0, id = zi * mx + xi, h, col;
        if (near) {
          var fx = cx - xi, fz = cz - zi, a = HM[id], b = HM[id + 1], cc = HM[id + mx], d = HM[id + mx + 1];
          h = a + (b - a) * fx + (cc - a) * fz + (a - b - cc + d) * fx * fz;
          var c0 = CM[id], c1 = CM[id + 1], c2 = CM[id + mx], c3 = CM[id + mx + 1];
          var w0 = (1 - fx) * (1 - fz), w1 = fx * (1 - fz), w2 = (1 - fx) * fz, w3 = fx * fz;
          var rr = (c0 & 255) * w0 + (c1 & 255) * w1 + (c2 & 255) * w2 + (c3 & 255) * w3;
          var gg = (c0 >> 8 & 255) * w0 + (c1 >> 8 & 255) * w1 + (c2 >> 8 & 255) * w2 + (c3 >> 8 & 255) * w3;
          var bb = (c0 >> 16 & 255) * w0 + (c1 >> 16 & 255) * w1 + (c2 >> 16 & 255) * w2 + (c3 >> 16 & 255) * w3;
          col = (255 << 24) | ((bb * fi + fb) << 16) | ((gg * fi + fg) << 8) | (rr * fi + fr);
        } else {
          if (mid) { var gx = cx - xi, gz = cz - zi, a2 = HM[id], b2 = HM[id + 1], c4 = HM[id + mx], d2 = HM[id + mx + 1]; h = a2 + (b2 - a2) * gx + (c4 - a2) * gz + (a2 - b2 - c4 + d2) * gx * gz; }
          else h = HM[id];
          var k0 = CM[id];
          col = (255 << 24) | (((k0 >> 16 & 255) * fi + fb) << 16) | (((k0 >> 8 & 255) * fi + fg) << 8) | ((k0 & 255) * fi + fr);
        }
        var sy = ((camH - h) * inv + hor) | 0;
        if (sy < top) {
          for (var y = sy < 0 ? 0 : sy; y < top; y++) buf[y * iw + i] = col;
          yb[i] = sy < 0 ? 0 : sy;
        }
      }
      z += z < 220 ? 1.2 : z * .011;
    }
    V.g.putImageData(V.img, 0, 0);

    var k = W / iw, Fc = F * k, horc = hor * k;
    g.save();
    g.translate(W / 2, H / 2); g.rotate(c.roll); g.scale(1.07, 1.07); g.translate(-W / 2, -H / 2);
    var sky = g.createLinearGradient(0, horc - H * .9, 0, horc + H * .05);
    sky.addColorStop(0, '#2a5fb2'); sky.addColorStop(.6, '#7ea7d8'); sky.addColorStop(1, 'rgb(' + SKY_H.join(',') + ')');
    g.fillStyle = sky; g.fillRect(-W * .1, -H * .1, W * 1.2, H * 1.2);
    var sun = g.createRadialGradient(W * .08, horc - H * .45, 0, W * .08, horc - H * .45, W * .6);
    sun.addColorStop(0, 'rgba(255,247,228,.6)'); sun.addColorStop(1, 'rgba(255,247,228,0)');
    g.fillStyle = sun; g.fillRect(-W * .1, -H * .1, W * 1.2, H * 1.2);
    g.imageSmoothingQuality = 'high';
    g.drawImage(V.c, 0, 0, W, H);
    /* shrubs and poplars, far to near */
    var vis = [], i2;
    var lo2 = 0, hi2 = world.length;
    while (lo2 < hi2) { var md = (lo2 + hi2) >> 1; if (world[md].z < c.z - 400) lo2 = md + 1; else hi2 = md; }
    for (i2 = lo2; i2 < world.length && world[i2].z < c.z + 1800; i2++) {
      var o = world[i2], ddx = o.x - c.x, ddz = o.z - c.z;
      var zp = ddx * sn + ddz * cs; if (zp < 3 || zp > 1800) continue;
      var xp = ddx * cs - ddz * sn, sxp = W / 2 + xp * Fc / zp, hpx = o.s * Fc / zp;
      if (hpx < 2.2) continue;
      var wpx = hpx * (o.pop ? .3 : 1.45);
      if (sxp + wpx < -W * .1 || sxp - wpx > W * 1.1) continue;
      vis.push([zp, sxp, horc + camH * Fc / zp, wpx, hpx, o]);
    }
    /* nearest first, keep the closest few hundred (beyond that the ground already shows the thickets), then paint far to near */
    vis.sort(function (a, b) { return a[0] - b[0]; });
    if (vis.length > SPRITE_CAP) vis.length = SPRITE_CAP;
    PH.story && (PH.story.sprites = vis.length);
    for (i2 = vis.length - 1; i2 >= 0; i2--) {
      var q = vis[i2], ob = q[5];
      g.globalAlpha = ob.a * ss(1800, 1200, q[0]);
      g.fillStyle = 'rgba(40,32,24,.25)';
      g.beginPath(); g.ellipse(q[1] + q[3] * .14, q[2], q[3] * .52, q[3] * .07, 0, 0, 7); g.fill();
      g.drawImage(ob.pop ? A.poplars[ob.k] : A.shrubs[ob.k], q[1] - q[3] / 2, q[2] - q[4] * .97, q[3], q[4]);
    }
    g.globalAlpha = 1;
    g.restore();
    var vg = g.createRadialGradient(W / 2, H * .45, Math.min(W, H) * .3, W / 2, H * .5, Math.max(W, H) * .8);
    vg.addColorStop(0, 'rgba(20,14,40,0)'); vg.addColorStop(1, 'rgba(20,14,40,.36)');
    g.fillStyle = vg; g.fillRect(0, 0, W, H);
  }

  /* ---------- the branch, up close: stem, thorns, silver leaves and the berries packed along it */
  var BR = null, SLOTS = [];
  function bez(p, t) { var u = 1 - t; return [u * u * u * p[0][0] + 3 * u * u * t * p[1][0] + 3 * u * t * t * p[2][0] + t * t * t * p[3][0], u * u * u * p[0][1] + 3 * u * u * t * p[1][1] + 3 * u * t * t * p[2][1] + t * t * t * p[3][1]]; }
  function stemFrom(par, t, ang, len, bend, w0, w1) {
    var s = bez(par.p, t), e = [s[0] + Math.cos(ang) * len, s[1] + Math.sin(ang) * len];
    var nx = -Math.sin(ang) * bend, ny = Math.cos(ang) * bend;
    return { p: [s, [s[0] + Math.cos(ang) * len * .33 + nx, s[1] + Math.sin(ang) * len * .33 + ny], [s[0] + Math.cos(ang) * len * .66 + nx, s[1] + Math.sin(ang) * len * .66 + ny], e], w0: w0, w1: w1 };
  }
  function buildSlots() {
    SLOTS = [];
    var r = .0165, y = .972 - r, row = 0;
    while (y > .25) {
      var half = hw(y) - .011 - r, n = Math.max(1, Math.floor(half * 2 / (r * 1.96)) + 1), off = (row % 2) * r * .9;
      for (var i = 0; i < n; i++) {
        var x = -half + (n > 1 ? i * (half * 2) / (n - 1) : half) + (i < n - 1 ? off * .5 : -off * .5);
        SLOTS.push({ x: x, y: y + (Math.sin(i * 7.1 + row) * .25) * r, r: r * (.92 + ((i * 13 + row * 7) % 5) * .03) });
      }
      y -= r * 1.72; row++;
    }
  }
  function buildBranch() {
    buildSlots();
    var r = rng(77), main = { p: [[-760, 600], [-280, 260], [140, -40], [760, -470]], w0: 24, w1: 9 };
    var stems = [main,
      stemFrom(main, .22, -2.1, 420, 60, 13, 5), stemFrom(main, .48, .55, 380, -50, 12, 4.5),
      stemFrom(main, .66, -1.75, 360, 40, 11, 4), stemFrom(main, .84, .25, 300, 30, 9, 3.5)];
    var berries = [], leaves = [], thorns = [], want = Math.min(SLOTS.length, 230), step = 54;
    for (var tries = 0; tries < 6 && berries.length < want; tries++) {
      berries = [];
      stems.forEach(function (s, si) {
        var len = 0, prev = bez(s.p, 0);
        for (var t = .01; t <= 1; t += .01) { var q = bez(s.p, t); len += Math.hypot(q[0] - prev[0], q[1] - prev[1]); prev = q; }
        var n = Math.floor(len * (si ? .78 : .86) / step);
        for (var k = 0; k < n; k++) {
          var tt = (si ? .06 : .1) + k / n * (si ? .72 : .78), a = bez(s.p, tt), b2 = bez(s.p, tt + .01);
          var ang = Math.atan2(b2[1] - a[1], b2[0] - a[0]), nx = -Math.sin(ang), ny = Math.cos(ang);
          var sw = lerp(s.w0, s.w1, tt), br = (27 + r() * 8) * (si ? .9 : 1);
          [-1, 1, 0].forEach(function (side) {
            if (side === 0 && r() < .45) return;
            var off = side ? side * (sw * .5 + br * .7 + r() * 6) : (r() - .5) * br * .6;
            berries.push({ x: a[0] + nx * off + Math.cos(ang) * (r() - .5) * 14, y: a[1] + ny * off + Math.sin(ang) * (r() - .5) * 14,
              r: br, ang: ang + Math.PI / 2 + (r() - .5) * .7, z: side === 0 ? 1 : (r() < .4 ? -1 : .5), v: (r() * 3) | 0, d: r(), seed: r() });
          });
        }
        /* thorns along the bare wood, leaves at the tips */
        for (var j = 0; j < 9; j++) {
          var t2 = .05 + r() * .9, p0 = bez(s.p, t2), p1 = bez(s.p, t2 + .01), an = Math.atan2(p1[1] - p0[1], p1[0] - p0[0]);
          var sd = r() > .5 ? 1 : -1, ta = an + sd * (.85 + r() * .5);
          thorns.push({ x: p0[0], y: p0[1], a: ta, l: 26 + r() * 30, w: 5 + r() * 3 });
        }
        var tipN = si ? 6 : 4;
        for (j = 0; j < tipN + 4; j++) {
          var t3 = j < tipN ? .82 + r() * .18 : .25 + r() * .5, lp = bez(s.p, t3), lq = bez(s.p, Math.min(1, t3 + .01));
          var la = Math.atan2(lq[1] - lp[1], lq[0] - lp[0]) + (r() > .5 ? 1 : -1) * (.35 + r() * .8);
          leaves.push({ x: lp[0], y: lp[1], a: la, l: 150 + r() * 90, w: 17 + r() * 9, under: r() < .3, front: r() < .5, d: r() });
        }
      });
      step *= .86;
    }
    for (var i = berries.length - 1; i > 0; i--) { var j2 = (r() * (i + 1)) | 0, tmp = berries[i]; berries[i] = berries[j2]; berries[j2] = tmp; }
    berries.length = Math.min(berries.length, want);
    berries.sort(function (a, b) { return a.z - b.z; });
    /* which berry lands in which place in the bottle: the ones nearest the bottom of the screen go first */
    var order = berries.slice().sort(function (a, b) { return b.y - a.y; });
    order.forEach(function (b, k) { b.slot = k; });
    BR = { stems: stems, berries: berries, leaves: leaves, thorns: thorns, bySlot: order };
  }
  function drawLeaf(g, lf, k) {
    g.save(); g.translate(lf.x, lf.y); g.rotate(lf.a);
    var gr = g.createLinearGradient(0, -lf.w, 0, lf.w);
    if (lf.under) { gr.addColorStop(0, '#d9dfd2'); gr.addColorStop(1, '#aab4a2'); } else { gr.addColorStop(0, '#9aab8a'); gr.addColorStop(.5, '#7a8c69'); gr.addColorStop(1, '#5c6c4e'); }
    g.fillStyle = gr;
    g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(lf.l * .45, -lf.w, lf.l, 0); g.quadraticCurveTo(lf.l * .45, lf.w * .9, 0, 0); g.fill();
    g.strokeStyle = 'rgba(235,240,228,' + (.55 * k) + ')'; g.lineWidth = 1.4;
    g.beginPath(); g.moveTo(2, 0); g.quadraticCurveTo(lf.l * .5, -lf.w * .08, lf.l * .96, 0); g.stroke();
    g.restore();
  }
  function drawStems(g) {
    BR.stems.forEach(function (s) {
      var segs = 24;
      for (var i = 0; i < segs; i++) {
        var a = bez(s.p, i / segs), b = bez(s.p, (i + 1) / segs), w = lerp(s.w0, s.w1, i / segs);
        g.lineCap = 'round';
        g.strokeStyle = '#4e3f33'; g.lineWidth = w; g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(b[0], b[1]); g.stroke();
        g.strokeStyle = 'rgba(176,160,140,.55)'; g.lineWidth = w * .28;
        g.beginPath(); g.moveTo(a[0] - w * .18, a[1] - w * .22); g.lineTo(b[0] - w * .18, b[1] - w * .22); g.stroke();
      }
    });
    BR.thorns.forEach(function (t) {
      g.save(); g.translate(t.x, t.y); g.rotate(t.a);
      var gr = g.createLinearGradient(0, 0, t.l, 0); gr.addColorStop(0, '#4b3a2d'); gr.addColorStop(1, '#a8957e');
      g.fillStyle = gr; g.beginPath(); g.moveTo(0, -t.w / 2); g.lineTo(t.l, 0); g.lineTo(0, t.w / 2); g.fill(); g.restore();
    });
  }
  function drawBerry(g, x, y, r, ang, v, alpha, dark, stretch) {
    var spr = dark ? A.berryDark[0] : A.berry[v % 3];
    g.globalAlpha = alpha;
    g.save(); g.translate(x, y); g.rotate(ang);
    var s = r / 36;
    g.drawImage(spr, -48 * s * (stretch || 1), -48 * s, 96 * s * (stretch || 1), 96 * s);
    g.restore();
  }

  /* ---------- the bottle: real cap and print from the photograph, glass drawn around whatever is inside */
  function bottleRect(sc) { var h = L.bh * (sc || 1); return { x: L.bx, y: L.by + (L.bh - h), h: h, w: h * BOT.w / BOT.h }; }
  function glassPath(g, R, inset) {
    var n = 60, i, t, x;
    g.beginPath();
    for (i = 0; i <= n; i++) { t = lerp(inset ? BOT.cap + .01 : BOT.cap * .5, inset ? .985 : 1, i / n); x = R.x - (hw(t) - (inset ? .009 : 0)) * R.h; i ? g.lineTo(x, R.y + t * R.h) : g.moveTo(x, R.y + t * R.h); }
    for (i = n; i >= 0; i--) { t = lerp(inset ? BOT.cap + .01 : BOT.cap * .5, inset ? .985 : 1, i / n); x = R.x + (hw(t) - (inset ? .009 : 0)) * R.h; g.lineTo(x, R.y + t * R.h); }
    g.closePath();
  }
  function drawGlass(g, R, alpha) {
    g.save(); g.globalAlpha = alpha;
    glassPath(g, R, false);
    var bw = hw(.8) * R.h, gr = g.createLinearGradient(R.x - bw, 0, R.x + bw, 0);
    gr.addColorStop(0, 'rgba(52,70,60,.66)'); gr.addColorStop(.045, 'rgba(110,132,118,.24)'); gr.addColorStop(.2, 'rgba(170,196,184,.07)'); gr.addColorStop(.5, 'rgba(200,222,212,.03)');
    gr.addColorStop(.9, 'rgba(130,150,138,.12)'); gr.addColorStop(.96, 'rgba(100,122,110,.3)'); gr.addColorStop(1, 'rgba(44,60,52,.7)');
    g.fillStyle = gr; g.fill();
    g.lineWidth = Math.max(1, R.h * .004); g.strokeStyle = 'rgba(70,84,74,.5)'; g.stroke();
    var base = g.createLinearGradient(0, R.y + R.h * .955, 0, R.y + R.h);
    base.addColorStop(0, 'rgba(90,108,96,0)'); base.addColorStop(1, 'rgba(70,88,76,.4)');
    g.fillStyle = base; g.fill();
    g.restore();
  }
  function drawHighlights(g, R, alpha) {
    g.save(); g.globalAlpha = alpha; glassPath(g, R, false); g.clip();
    var bw = hw(.8) * R.h;
    var hl = g.createLinearGradient(R.x - bw * .78, 0, R.x - bw * .5, 0);
    hl.addColorStop(0, 'rgba(255,255,255,0)'); hl.addColorStop(.45, 'rgba(255,255,255,.62)'); hl.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = hl; g.fillRect(R.x - bw, R.y + R.h * .2, bw, R.h * .72);
    var hr = g.createLinearGradient(R.x + bw * .62, 0, R.x + bw * .86, 0);
    hr.addColorStop(0, 'rgba(255,255,255,0)'); hr.addColorStop(.5, 'rgba(255,255,255,.28)'); hr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = hr; g.fillRect(R.x, R.y + R.h * .22, bw, R.h * .7);
    g.restore();
  }
  function drawCap(g, R, lift, alpha) {
    if (!ok(IMG.bottle)) return;
    g.globalAlpha = alpha;
    var ch = BOT.cap * BOT.h, scale = R.h / BOT.h;
    g.drawImage(IMG.bottle, 0, 0, BOT.w, ch + 1, R.x - R.w / 2, R.y - lift, R.w, (ch + 1) * scale);
    g.globalAlpha = 1;
  }
  /* the print wraps around the glass: as the bottle turns, it slides across and away */
  function drawPrint(g, R, rot, alpha) {
    if (!ok(IMG.print) || alpha <= 0) return;
    var sc = R.h / BOT.h, Rr = hw(.8) * BOT.h, cols = 44, y0 = .52 * BOT.h, hh = BOT.h * .46;
    g.globalAlpha = alpha;
    if (Math.abs(rot % (Math.PI * 2)) < .001) { g.drawImage(IMG.print, 0, y0, BOT.w, hh, R.x - R.w / 2, R.y + y0 * sc, R.w, hh * sc); g.globalAlpha = 1; return; }
    for (var i = 0; i < cols; i++) {
      var th0 = Math.asin(-1 + 2 * i / cols * .999), th1 = Math.asin(-1 + 2 * (i + 1) / cols * .999);
      var p0 = th0 - rot, p1 = th1 - rot;
      p0 = Math.atan2(Math.sin(p0), Math.cos(p0)); p1 = p0 + (th1 - th0);
      if (Math.cos((p0 + p1) / 2) < .05) continue;
      var s0 = BOT.w / 2 + Rr * Math.sin(p0), s1 = BOT.w / 2 + Rr * Math.sin(p1), sw = s1 - s0;
      if (sw < .15) continue;
      var d0 = R.x + Rr * sc * Math.sin(th0), d1 = R.x + Rr * sc * Math.sin(th1);
      g.globalAlpha = alpha * clamp(Math.cos((p0 + p1) / 2) * 1.6, 0, 1);
      g.drawImage(IMG.print, s0, y0, sw, hh, d0, R.y + y0 * sc, d1 - d0 + .6, hh * sc);
    }
    g.globalAlpha = 1;
  }
  function shadow(g, x, y, w, a) {
    var gr = g.createRadialGradient(x, y, 0, x, y, w);
    gr.addColorStop(0, 'rgba(35,26,74,' + .28 * a + ')'); gr.addColorStop(1, 'rgba(35,26,74,0)');
    g.save(); g.translate(x, y); g.scale(1, .14); g.translate(-x, -y); g.fillStyle = gr; g.beginPath(); g.arc(x, y, w, 0, 7); g.fill(); g.restore();
  }

  /* ---------- the box, from the photographs, folded in 3D */
  var BOX = { W: .347, D: .347 }, BETA = .3;
  function boxPoints(o) {
    var cp = Math.cos(o.phi), sp = Math.sin(o.phi), cb = Math.cos(o.beta), sb = Math.sin(o.beta);
    return function (X, Y, Z) {
      var x = X * cp + Z * sp, z = -X * sp + Z * cp;
      return [o.x + x * o.s, o.y - (Y * cb + z * sb) * o.s];
    };
  }
  function face(g, img, P0, P1, P2, iw, ih, shade) {
    g.save();
    g.setTransform(DPR * (P1[0] - P0[0]) / iw, DPR * (P1[1] - P0[1]) / iw, DPR * (P2[0] - P0[0]) / ih, DPR * (P2[1] - P0[1]) / ih, DPR * P0[0], DPR * P0[1]);
    if (ok(img)) g.drawImage(img, 0, 0, iw, ih); else { g.fillStyle = '#4b3a86'; g.fillRect(0, 0, iw, ih); }
    if (shade) { g.fillStyle = shade; g.fillRect(0, 0, iw, ih); }
    g.restore();
  }
  function quad(g, a, b, c, d, fill) { g.fillStyle = fill; g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(b[0], b[1]); g.lineTo(c[0], c[1]); g.lineTo(d[0], d[1]); g.closePath(); g.fill(); }
  /* o: {x, y (screen point of the box's base centre), s (px per box height), phi (turn), beta (camera height), lid (0 shut … 1.95 open), inside(g, P)} */
  function drawBox(g, o) {
    var P = boxPoints(o), w = BOX.W / 2, d = BOX.D / 2;
    var lidA = o.lid, hinge = [[-w, 1, d], [w, 1, d]];
    var fy = Math.sin(lidA), fz = -Math.cos(lidA);
    var free = [[-w, 1 + BOX.D * fy, d + BOX.D * fz], [w, 1 + BOX.D * fy, d + BOX.D * fz]];
    var lidQ = [P.apply(null, hinge[0]), P.apply(null, hinge[1]), P.apply(null, free[1]), P.apply(null, free[0])];
    var lg = g.createLinearGradient(lidQ[0][0], lidQ[0][1], lidQ[3][0], lidQ[3][1]);
    lg.addColorStop(0, lidA > Math.PI / 2 ? '#2a1f52' : '#3d2c6b'); lg.addColorStop(1, lidA > Math.PI / 2 ? '#4a3880' : '#5a46a0');
    var lidFill = lg;
    /* shadow on the floor */
    shadow(g, o.x + o.s * .04, o.y + o.s * .01, o.s * .42, o.alpha == null ? 1 : o.alpha);
    /* top: open mouth or closed lid */
    var t0 = P(-w, 1, -d), t1 = P(w, 1, -d), t2 = P(w, 1, d), t3 = P(-w, 1, d);
    var ig = g.createLinearGradient(0, t2[1], 0, t0[1]); ig.addColorStop(0, '#120c26'); ig.addColorStop(1, '#2c2152');
    quad(g, t0, t1, t2, t3, o.lid > .02 ? ig : '#433275');
    if (lidA > Math.PI / 2) quad(g, lidQ[0], lidQ[1], lidQ[2], lidQ[3], lidFill);
    if (o.inside) o.inside(g, P);
    /* the side panel (white, purpleherb) and the front (the photographed box) */
    if (o.phi > .01) face(g, IMG.side, P(w, 1, -d), P(w, 1, d), P(w, 0, -d), 207, 568, 'rgba(35,26,74,' + (.08 + .1 * (1 - Math.sin(o.phi))) + ')');
    face(g, IMG.box, P(-w, 1, -d), P(w, 1, -d), P(-w, 0, -d), 395, 1134, null);
    if (lidA <= Math.PI / 2) quad(g, lidQ[0], lidQ[1], lidQ[2], lidQ[3], lidFill);
  }

  /* ---------- line drawings for the road home */
  function drawMountainGlyph(g, x, y, s, a) {
    g.save(); g.globalAlpha = a; g.translate(x, y); g.scale(s, s);
    g.fillStyle = '#E9E3F7'; g.beginPath(); g.moveTo(-70, 0); g.lineTo(-30, -52); g.lineTo(-12, -30); g.lineTo(14, -66); g.lineTo(70, 0); g.closePath(); g.fill();
    g.fillStyle = '#fff'; g.beginPath(); g.moveTo(14, -66); g.lineTo(1, -48); g.lineTo(9, -50); g.lineTo(15, -44); g.lineTo(26, -50); g.closePath(); g.fill();
    g.strokeStyle = '#6A55C2'; g.lineWidth = 1.6 / s; g.lineJoin = 'round';
    g.beginPath(); g.moveTo(-70, 0); g.lineTo(-30, -52); g.lineTo(-12, -30); g.lineTo(14, -66); g.lineTo(70, 0); g.stroke();
    g.fillStyle = '#F07C1E'; [[-38, -6], [-32, -10], [-27, -5], [40, -6], [46, -9], [50, -4]].forEach(function (b) { g.beginPath(); g.arc(b[0], b[1], 3, 0, 7); g.fill(); });
    g.restore();
  }
  function drawHouse(g, x, y, s, a, glow) {
    g.save(); g.globalAlpha = a; g.translate(x, y); g.scale(s, s);
    if (glow > 0) { var gr = g.createRadialGradient(0, -24, 0, 0, -24, 90); gr.addColorStop(0, 'rgba(255,190,90,' + .45 * glow + ')'); gr.addColorStop(1, 'rgba(255,190,90,0)'); g.fillStyle = gr; g.beginPath(); g.arc(0, -24, 90, 0, 7); g.fill(); }
    g.fillStyle = '#fff'; g.fillRect(-40, -46, 80, 46);
    g.strokeStyle = '#362A5C'; g.lineWidth = 2 / s; g.lineJoin = 'round';
    g.beginPath(); g.moveTo(-50, -40); g.lineTo(0, -82); g.lineTo(50, -40); g.stroke();
    g.strokeRect(-40, -46, 80, 46);
    g.fillStyle = 'rgba(246,178,78,' + (.35 + .65 * glow) + ')'; g.fillRect(-28, -34, 20, 16); g.strokeRect(-28, -34, 20, 16);
    g.fillStyle = '#E9E3F7'; g.fillRect(8, -30, 20, 30); g.strokeRect(8, -30, 20, 30);
    g.restore();
  }
  function label(g, txt, x, y, a, col) {
    g.globalAlpha = a; g.fillStyle = col || '#6A55C2'; g.font = '500 11px Inter, system-ui, sans-serif'; g.textAlign = 'center';
    if ('letterSpacing' in g) g.letterSpacing = '3px';
    g.fillText(txt.toUpperCase(), x, y);
    if ('letterSpacing' in g) g.letterSpacing = '0px';
    g.globalAlpha = 1;
  }

  /* ------------------------------------------------------------------ the story, frame by frame */
  var endFrame = null, endBlur = null;
  function ensureEndFrames() {
    if (endFrame || !A.ready) return;
    endFrame = mk(W * DPR, H * DPR);
    var g = endFrame.getContext('2d'); g.scale(DPR, DPR); drawDrone(g, 1);
    var small = mk(W / 18, H / 18); small.getContext('2d').drawImage(endFrame, 0, 0, small.width, small.height);
    var mid = mk(W / 6, H / 6); mid.getContext('2d').drawImage(small, 0, 0, mid.width, mid.height);
    endBlur = mid;
  }

  function branchToScreen(sc) { return { s: sc * L.U / 1000, x: L.fx, y: L.fy }; }

  function render(tau) {
    var g = ctx;
    if (tau < 4.2) gmp.style.opacity = 0;
    g.setTransform(DPR, 0, 0, DPR, 0, 0);
    g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
    g.fillStyle = '#fff'; g.fillRect(0, 0, W, H);
    if (!A.ready) {
      var sk = g.createLinearGradient(0, 0, 0, H); sk.addColorStop(0, '#5f8fcf'); sk.addColorStop(1, '#e9e1d2'); g.fillStyle = sk; g.fillRect(0, 0, W, H);
      return;
    }
    if (tau < 1) { drawDrone(g, tau); return; }
    ensureEndFrames();
    if (tau < 3) drawBranchStory(g, tau); else drawBottleStory(g, tau);
  }

  /* tau 1–3: closer to the thorn, then the harvest */
  function drawBranchStory(g, tau) {
    var a = clamp(tau - 1, 0, 1), q = clamp(tau - 2, 0, 1);
    var bgFade = 1 - ss(.04, .34, q);                       /* the valley fades to the white page */
    if (bgFade > 0) {
      g.globalAlpha = bgFade;
      var bs = 1.15 + .25 * a;
      g.drawImage(endBlur, W / 2 - W * bs / 2, H / 2 - H * bs / 2, W * bs, H * bs);
      var wash = g.createLinearGradient(0, 0, 0, H); wash.addColorStop(0, 'rgba(255,244,226,.18)'); wash.addColorStop(1, 'rgba(30,20,50,.18)');
      g.fillStyle = wash; g.fillRect(0, 0, W, H);
      /* the drone's last frame pushes in and dissolves as the branch comes into focus */
      var fa = 1 - ss(.06, .5, a);
      if (fa > 0) {
        var zs = 1 + 1.6 * eo(a);
        g.globalAlpha = fa * bgFade;
        g.drawImage(endFrame, 0, 0, endFrame.width, endFrame.height, L.fx - L.fx * zs, L.fy - L.fy * zs, W * zs, H * zs);
      }
      g.globalAlpha = 1;
    }
    var appear = ss(.12, .55, a);
    if (appear <= 0) return;
    var sc = lerp(.42, 1, eo(clamp(a / .85, 0, 1))) * (1 + .06 * q), T = branchToScreen(sc);
    var sway = Math.sin(tau * 2.6) * .015 * (1 - q);
    var woodA = appear * (1 - ss(.08, .34, q));
    g.save();
    T.y += q * 40 * (1 - ss(.3, .6, q));
    g.translate(T.x, T.y); g.rotate(sway - .05 * q); g.scale(T.s, T.s);
    /* far berries, wood and leaves fade away; only the berries leave */
    var b = BR.berries, i, bi;
    for (i = 0; i < b.length; i++) { bi = b[i]; if (bi.z < 0 && !lifted(bi, q)) drawBerry(g, bi.x, bi.y, bi.r, bi.ang, bi.v, appear * .95, true); }
    if (woodA > 0) {
      g.globalAlpha = woodA;
      g.save(); g.translate(0, q * 120); drawStems(g);
      BR.leaves.forEach(function (lf) { if (!lf.front) drawLeaf(g, lf, 1); });
      g.restore();
    }
    for (i = 0; i < b.length; i++) { bi = b[i]; if (bi.z >= 0 && !lifted(bi, q)) drawBerry(g, bi.x, bi.y, bi.r, bi.ang, bi.v, appear, false); }
    if (woodA > 0) {
      g.globalAlpha = woodA;
      g.save(); g.translate(0, q * 160);
      BR.leaves.forEach(function (lf) { if (lf.front) { g.save(); g.translate(lf.x, lf.y); g.rotate(q * (lf.d - .5) * 2); g.translate(-lf.x, -lf.y); drawLeaf(g, lf, 1); g.restore(); } });
      g.restore();
    }
    g.globalAlpha = 1;
    g.restore();
    if (q > 0) drawFlight(g, q, T, sway);
  }

  function lifted(b, q) { return q > .01 + .14 * b.d; }
  /* the berries lift off, gather in a slow swirl, and pour into the bottle */
  function slotScreen(R, k) { var s = SLOTS[k]; return { x: R.x + s.x * R.h, y: R.y + s.y * R.h, r: s.r * R.h }; }
  function drawFlight(g, q, T, sway) {
    var R = bottleRect(1), mouth = { x: R.x, y: R.y + BOT.cap * R.h * .7 }, b = BR.berries, N2 = b.length;
    var cs = Math.cos(sway - .05 * q), sn = Math.sin(sway - .05 * q), inside = [], outside = [];
    for (var i = 0; i < N2; i++) {
      var bi = b[i];
      if (!lifted(bi, q)) continue;
      var lx = bi.x * T.s, ly = bi.y * T.s;
      var x0 = T.x + lx * cs - ly * sn, y0 = T.y + lx * sn + ly * cs;
      var lift = eo(ss(.01 + .14 * bi.d, .12 + .16 * bi.d, q));
      var fl = Math.sin(q * 18 + bi.seed * 9) * 6 * lift;
      var px = x0 + (bi.seed - .5) * 40 * lift + fl, py = y0 - (40 + 50 * bi.seed) * lift * L.U / 1000;
      var rr = bi.r * T.s;
      /* gather into the swirl over the bottle */
      var gq = eio(ss(.24 + .06 * bi.d, .5 + .06 * bi.d, q));
      var arr = .56 + .36 * (bi.slot / N2), fq = ss(arr - .12, arr, q);
      var ang = bi.seed * 6.283 + q * 7 + bi.slot * .02, rad = (.25 + .75 * ((bi.slot * 37 % N2) / N2)) * Math.min(W, H) * .2;
      rad *= 1 - fq * .9;
      var cx = mouth.x + Math.cos(ang) * rad, cy = mouth.y - H * .1 - Math.sin(ang) * rad * .35 - (1 - (bi.slot / N2)) * H * .08;
      var S = slotScreen(R, bi.slot);
      var sx = lerp(px, cx, gq), sy = lerp(py, cy, gq), sr = lerp(rr, S.r * 1.25, gq);
      var isIn = false;
      if (fq > 0) {
        /* down through the neck to its place */
        var u = eio(fq), m1x = lerp(cx, mouth.x, .9), m1y = mouth.y - S.r * 2;
        var ax = (1 - u) * (1 - u) * cx + 2 * (1 - u) * u * m1x + u * u * S.x, ay = (1 - u) * (1 - u) * cy + 2 * (1 - u) * u * m1y + u * u * S.y;
        sx = ax; sy = ay; sr = lerp(sr, S.r, u);
        isIn = sy > mouth.y + S.r;
      }
      (isIn ? inside : outside).push([sx, sy, sr, bi.ang + q * 6 * (1 - fq) + fq * bi.seed, bi.v, fq]);
    }
    /* bottle and its contents */
    var ba = ss(.26, .46, q);
    if (ba > 0) {
      var landed = 0; inside.forEach(function (o) { if (o[5] >= 1) landed++; });
      drawBottleWithBerries(g, R, ba, inside, landed / N2, 1 - ss(.94, 1, q));
    }
    for (i = 0; i < outside.length; i++) { var o = outside[i]; drawBerry(g, o[0], o[1], o[2], o[3], o[4], 1, false); }
    g.globalAlpha = 1;
  }
  /* more berries behind the front row */
  function drawMass(g, R, fill, alpha) {
    var top = R.y + lerp(.97, SLOTS[BR.bySlot.length - 1].y - .02, fill) * R.h;
    var mass = g.createLinearGradient(0, top, 0, R.y + R.h);
    mass.addColorStop(0, 'rgba(196,82,14,.85)'); mass.addColorStop(1, 'rgba(126,44,6,.95)');
    g.globalAlpha = alpha; g.fillStyle = mass; g.fillRect(R.x - R.w, top, R.w * 2, R.y + R.h - top); g.globalAlpha = 1;
  }
  function drawBottleWithBerries(g, R, alpha, inside, fill, capOpen) {
    shadow(g, R.x, R.y + R.h, R.w * .9, alpha);
    drawGlass(g, R, alpha);
    g.save(); glassPath(g, R, true); g.clip();
    if (fill > 0) drawMass(g, R, fill, alpha);
    for (var i = 0; i < inside.length; i++) { var o = inside[i]; drawBerry(g, o[0], o[1], o[2], o[3], o[4], alpha, false); }
    g.restore();
    drawHighlights(g, R, alpha * .9);
    drawPrint(g, R, 0, alpha * .9);
    drawCap(g, R, capOpen * R.h * .12, alpha);
    g.globalAlpha = 1;
  }

  /* tau 2.3–5.2: the bottle on white — filled, spun to pulp, packed, sent home */
  var SPIN_SEEDS = (function () { var r = rng(99), a = []; for (var i = 0; i < 46; i++) a.push({ y: .3 + r() * .66, p: r() * 6.283, s: .6 + r() * .6 }); return a; })();
  function drawBottleStory(g, tau) {
    if (tau < 3) return;                          /* during the harvest the flight draws the bottle */
    var R = bottleRect(1);
    if (tau < 3.2) { drawStill(g, R, tau); return; }
    if (tau < 4.2) { drawSpin(g, R, tau - 3.2); return; }
    drawPack(g, tau - 4.2);
  }
  function restingBerries(R, k) {
    var out = [];
    for (var i = 0; i < BR.bySlot.length; i++) { var S = slotScreen(R, i), b = BR.bySlot[i]; out.push([S.x, S.y, S.r, b.ang + b.seed, b.v, 1]); }
    return out;
  }
  function drawStill(g, R) { drawBottleWithBerries(g, R, 1, restingBerries(R), 1, 0); }

  function drawSpin(g, R, s) {
    var rot = Math.PI * 2 * 3 * eio(s), speed = s > 0 && s < 1 ? Math.abs(eio(s + .01) - eio(s)) * 100 : 0;
    var bob = Math.sin(Math.PI * s) * R.h * .025;
    R = { x: R.x, y: R.y - bob, h: R.h, w: R.w };
    var melt = ss(.22, .68, s), pulpA = ss(.1, .5, s), photoA = ss(.84, .98, s);
    shadow(g, R.x, R.y + R.h + bob, R.w * (.9 - bob / R.h * 2), 1);
    drawGlass(g, R, 1);
    g.save(); glassPath(g, R, true); g.clip();
    /* the berries circle the bottle's axis, faster and faster, and give way to pulp */
    var level = lerp(SLOTS[BR.bySlot.length - 1].y - .02, .105, ss(.3, .8, s));
    if (pulpA < 1) drawMass(g, R, 1, 1 - pulpA);
    if (pulpA > 0) {
      var top = R.y + level * R.h, pg = g.createLinearGradient(R.x - R.w / 2, 0, R.x + R.w / 2, 0);
      pg.addColorStop(0, '#c9560b'); pg.addColorStop(.3, '#f58a22'); pg.addColorStop(.55, '#f7962c'); pg.addColorStop(1, '#c4520a');
      g.globalAlpha = pulpA; g.fillStyle = pg; g.fillRect(R.x - R.w, top, R.w * 2, R.y + R.h - top);
      /* swirl in the pulp */
      g.globalAlpha = pulpA * .13 * (1 - ss(.75, 1, s));
      g.strokeStyle = '#ffd08a'; g.lineWidth = R.h * .006;
      for (var k = 0; k < 9; k++) {
        var yy = R.y + lerp(level + .05, .95, k / 8) * R.h, hwk = hw(lerp(level + .05, .95, k / 8)) * R.h;
        g.beginPath();
        for (var j = 0; j <= 16; j++) { var th = -Math.PI / 2 + j / 16 * Math.PI, wob = Math.sin(th * 3 + rot * 1.4 + k) * R.h * .008; j ? g.lineTo(R.x + Math.sin(th) * hwk, yy + wob + Math.cos(th) * R.h * .006) : g.moveTo(R.x + Math.sin(th) * hwk, yy + wob); }
        g.stroke();
      }
      g.globalAlpha = 1;
    }
    if (melt < 1) {
      var list = [];
      for (var i = 0; i < BR.bySlot.length; i++) {
        var S = SLOTS[i], b = BR.bySlot[i], rad = hw(S.y) - .011;
        var phi0 = Math.asin(clamp(S.x / rad, -1, 1)), phi = phi0 + rot * (.82 + .1 * b.seed) + Math.sin(s * 9 + b.seed * 6) * .3 * melt;
        var depth = Math.cos(phi), churn = Math.sin(phi * 2 + b.seed * 6) * ss(.1, .4, s) * .03;
        list.push([depth, R.x + Math.sin(phi) * rad * R.h, R.y + (S.y + churn) * R.h, S.r * R.h * (1 + .16 * (depth - Math.cos(phi0))) * (1 + .5 * melt), b.ang + b.seed + rot, b.v, (1 - melt) * (depth < 0 ? .7 : 1), depth < 0]);
      }
      list.sort(function (a, c) { return a[0] - c[0]; });
      list.forEach(function (o) { drawBerry(g, o[1], o[2], o[3], o[4], o[5], o[6], o[7], 1 + Math.min(1.2, speed * .35) * Math.max(0, o[0])); });
    }
    /* the seeds that stay: dark flecks turning with the pulp */
    var sa = ss(.45, .7, s);
    if (sa > 0) {
      g.globalAlpha = 1;
      SPIN_SEEDS.forEach(function (sd) {
        if (sd.y < level + .03) return;
        var phi = sd.p + rot * .9, dep = Math.cos(phi); if (dep < .15) return;
        var rad = (hw(sd.y) - .02) * R.h, x = R.x + Math.sin(phi) * rad, y = R.y + sd.y * R.h;
        g.globalAlpha = sa * dep * .85 * (1 - photoA * .35);
        g.fillStyle = '#4a2a14'; g.beginPath(); g.ellipse(x, y, R.h * .0055 * sd.s * (1 + speed * .2), R.h * .0032 * sd.s, .3, 0, 7); g.fill();
      });
      g.globalAlpha = 1;
    }
    g.restore();
    drawHighlights(g, R, .9 * (1 - photoA));
    drawPrint(g, R, rot, .9 * (1 - photoA));
    drawCap(g, R, 0, 1);
    /* settle on the real bottle */
    if (photoA > 0 && ok(IMG.bottle)) {
      g.globalAlpha = photoA; g.drawImage(IMG.bottle, R.x - R.w / 2, R.y, R.w, R.h);
      g.globalAlpha = 1;
      seedsOnPhoto(g, R, rot, photoA * sa);
    }
    drawLoupe(g, R, ss(.88, 1, s));
  }
  function seedsOnPhoto(g, R, rot, a) {
    if (a <= 0) return;
    SPIN_SEEDS.forEach(function (sd) {
      var phi = sd.p + rot * .9, dep = Math.cos(phi); if (dep < .3 || sd.y < .14) return;
      var x = R.x + Math.sin(phi) * (hw(sd.y) - .02) * R.h, y = R.y + sd.y * R.h;
      g.fillStyle = 'rgba(74,42,20,' + (dep * .8 * a).toFixed(3) + ')'; g.beginPath(); g.ellipse(x, y, R.h * .005 * sd.s, R.h * .003 * sd.s, .3, 0, 7); g.fill();
    });
  }
  function drawLoupe(g, R, a) {
    if (a <= 0 || !A.pulp) return;
    var rad = Math.min(R.h * .17, W * .2), lx = L.mob ? R.x + R.w * .5 + rad * .9 : R.x + R.w * .5 + rad * 1.5, ly = R.y + R.h * (L.mob ? .58 : .62);
    var px = R.x + R.w * .18, py = R.y + R.h * .72;
    g.save(); g.globalAlpha = a;
    g.strokeStyle = 'rgba(54,42,92,.55)'; g.lineWidth = 1.2; g.setLineDash([3, 4]);
    g.beginPath(); g.moveTo(px, py); g.lineTo(lx - rad * .92, ly + rad * .25); g.stroke(); g.setLineDash([]);
    g.fillStyle = '#362A5C'; g.beginPath(); g.arc(px, py, 3, 0, 7); g.fill();
    g.shadowColor = 'rgba(35,26,74,.35)'; g.shadowBlur = 28; g.shadowOffsetY = 12;
    g.fillStyle = '#fff'; g.beginPath(); g.arc(lx, ly, rad + 5, 0, 7); g.fill();
    g.shadowColor = 'transparent';
    g.beginPath(); g.arc(lx, ly, rad, 0, 7); g.clip();
    var z = 1 + .15 * (1 - a);
    g.drawImage(A.pulp, lx - rad * z, ly - rad * z, rad * 2 * z, rad * 2 * z);
    var gl = g.createRadialGradient(lx - rad * .4, ly - rad * .5, 0, lx, ly, rad);
    gl.addColorStop(0, 'rgba(255,255,255,.35)'); gl.addColorStop(.5, 'rgba(255,255,255,0)'); gl.addColorStop(1, 'rgba(35,26,74,.25)');
    g.fillStyle = gl; g.fillRect(lx - rad, ly - rad, rad * 2, rad * 2);
    g.restore();
    g.save(); g.globalAlpha = a; g.fillStyle = '#C9560B'; g.font = Math.round(Math.max(20, rad * .3)) + 'px Leulasy, "Inter Tight", serif'; g.textAlign = 'center';
    g.fillText('real seeds, left in', lx, ly + rad + Math.max(28, rad * .36)); g.restore();
  }

  /* packing in the GMP facility, then the road home */
  var ROUTE = null;
  function routePts() {
    var mob = L.mob;
    var A0 = mob ? [W * .22, H * .5] : [W * .5, H * .7], B0 = mob ? [W * .52, H * .28] : [W * .76, H * .62];
    var c1 = mob ? [W * .1, H * .22] : [W * .58, H * .28], c2 = mob ? [W * .6, H * .06] : [W * .8, H * .26];
    var pts = [], len = [0];
    for (var i = 0; i <= 80; i++) { var p = bez([A0, c1, c2, B0], i / 80); pts.push(p); if (i) len.push(len[i - 1] + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1])); }
    return { pts: pts, len: len, A: A0, B: B0 };
  }
  function along(Rt, f) {
    var total = Rt.len[Rt.len.length - 1], d = f * total, i = 1;
    while (i < Rt.len.length - 1 && Rt.len[i] < d) i++;
    var t = (d - Rt.len[i - 1]) / Math.max(1e-6, Rt.len[i] - Rt.len[i - 1]), a = Rt.pts[i - 1], b = Rt.pts[i];
    return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), Math.atan2(b[1] - a[1], b[0] - a[0]), i];
  }
  function drawPack(g, r) {
    var R0 = bottleRect(1);
    var zoom = lerp(1, .6, eio(ss(.0, .16, r)));
    var boxH = R0.h * 1.04 * zoom, lift = (1.06 * Math.cos(BETA) + BOX.D / 2 * Math.sin(BETA)) * boxH, stack = lift + R0.h * zoom;
    var floor = L.mob ? H * .05 + stack : (H + stack) / 2;
    var bx = L.bx;
    var Rt = ROUTE || (ROUTE = routePts());
    /* conveyor — the clean line of the packing room */
    var beltA = ss(.1, .2, r) * (1 - ss(.64, .72, r));
    if (beltA > 0) {
      g.save(); g.globalAlpha = beltA;
      var bw = Math.min(W * (L.mob ? .9 : .5), boxH * 2.4), by = floor + boxH * .035;
      var mg = g.createLinearGradient(0, by, 0, by + boxH * .06); mg.addColorStop(0, '#eef0f4'); mg.addColorStop(.5, '#c8ccd6'); mg.addColorStop(1, '#9aa0ae');
      g.fillStyle = mg; g.beginPath(); g.roundRect ? g.roundRect(bx - bw / 2, by, bw, boxH * .06, boxH * .03) : g.rect(bx - bw / 2, by, bw, boxH * .06); g.fill();
      g.fillStyle = 'rgba(54,42,92,.18)';
      var off = (r * 900) % 24;
      for (var x = bx - bw / 2 + off; x < bx + bw / 2 - 4; x += 24) g.fillRect(x, by + boxH * .012, 2, boxH * .036);
      g.restore();
    }
    /* box: slides in open, bottle goes down inside, lid folds shut, box turns to show its side */
    var inA = eio(ss(.16, .32, r));
    var drop = eio(ss(.33, .47, r));
    var lid = lerp(2.55, 0, eio(ss(.47, .57, r)));
    if (r > .57 && r < .6) lid = -Math.sin((r - .57) / .03 * Math.PI) * .05;
    var phi = lerp(0, .62, eio(ss(.57, .67, r)));
    var ship = eio(ss(.67, .97, r));
    var boxX = lerp(bx + W * .7, bx, inA), boxY = floor, s = boxH;
    /* the bottle before the box arrives */
    var bottleH = R0.h * zoom, bottleTopFree = floor - lift - bottleH;
    if (inA <= 0) {
      var y0 = lerp(R0.y, bottleTopFree, ss(0, .16, r));
      var Rb = { x: bx, y: y0, h: bottleH, w: bottleH * BOT.w / BOT.h };
      shadow(g, Rb.x, Rb.y + Rb.h, Rb.w * .9, 1);
      if (ok(IMG.bottle)) g.drawImage(IMG.bottle, Rb.x - Rb.w / 2, Rb.y, Rb.w, Rb.h);
      seedsOnPhoto(g, Rb, Math.PI * 6, 1 - ss(0, .1, r));
      drawLoupe(g, { x: R0.x, y: R0.y, h: R0.h, w: R0.w }, 1 - ss(0, .06, r));
      return;
    }
    if (ship > 0) {
      /* the road from the mountains to a front door */
      var ga = ss(.62, .72, r);
      var gs = L.mob ? .9 : 1.5;
      drawMountainGlyph(g, Rt.A[0] - 30 * gs, Rt.A[1] + 4, gs, ga);
      label(g, 'Ladakh', Rt.A[0] - 30 * gs, Rt.A[1] + 30, ga);
      var arrive = ss(.9, .99, r);
      drawHouse(g, Rt.B[0] + 78 * gs, Rt.B[1], gs, ga, arrive);
      label(g, 'Your home', Rt.B[0] + 78 * gs, Rt.B[1] + 28, ga);
      var at = along(Rt, clamp((ship - .16) / .84, 0, 1));
      g.save(); g.globalAlpha = ga; g.fillStyle = '#9B7EC4';
      for (var k = 0; k <= at[3]; k += 2) { var pp = Rt.pts[k]; g.beginPath(); g.arc(pp[0], pp[1], 2, 0, 7); g.fill(); }
      g.restore();
      var toS = Math.min(H * (L.mob ? .12 : .17), 160), sp = eio(ss(0, .16, ship));
      var st0 = along(Rt, 0);
      s = lerp(boxH, toS, sp);
      boxX = lerp(boxX, st0[0], sp); boxY = lerp(boxY, st0[1] + toS * .2, sp);
      if (ship > .16) { var at2 = along(Rt, (ship - .16) / .84); boxX = at2[0]; boxY = at2[1] + toS * .2 - Math.abs(Math.sin(ship * 30)) * 3; }
    }
    drawBox(g, { x: boxX, y: boxY, s: s, phi: phi, beta: BETA, lid: lid,
      inside: function (g2, P) {
        if (drop >= 1 && lid < 1) return;
        var Rb2 = { h: bottleH * s / boxH, w: 0, x: 0, y: 0 };
        Rb2.w = Rb2.h * BOT.w / BOT.h;
        var base = P(0, lerp(1.06, .03, drop), 0);
        Rb2.x = ship > 0 ? base[0] : bx; Rb2.y = base[1] - Rb2.h;
        if (ok(IMG.bottle)) {
          g2.save();
          /* only what is above the box's mouth shows behind the front panel */
          g2.drawImage(IMG.bottle, Rb2.x - Rb2.w / 2, Rb2.y, Rb2.w, Rb2.h);
          g2.restore();
        }
      } });
    /* the GMP seal sits beside the box while it is packed */
    var ga2 = ss(.18, .26, r) * (1 - ss(.6, .68, r));
    gmp.style.opacity = ga2.toFixed(3);
    if (ga2 > 0) {
      var gx = L.mob ? bx + boxH * .38 : bx + boxH * .48, gy = floor - boxH * (L.mob ? 1.02 : .92);
      gmp.style.transform = 'translate(' + gx.toFixed(1) + 'px,' + gy.toFixed(1) + 'px) rotate(' + (-8 + r * 40).toFixed(2) + 'deg) scale(' + (.85 + .15 * ss(.18, .3, r)).toFixed(3) + ')';
    }
  }

  /* ------------------------------------------------------------------ words on top */
  var lastCap = '';
  function syncCopy(tau) {
    var key = tau.toFixed(3); if (key === lastCap) return; lastCap = key;
    for (var i = 0; i < CAPS.length; i++) {
      var c = CAPS[i], f = .07, a = ss(c.a - f, c.a, tau) * (1 - ss(c.b, c.b + f, tau));
      var el = capEls[i];
      el.style.opacity = a.toFixed(3);
      el.style.transform = 'translateY(' + ((1 - a) * (tau < c.a ? 18 : -18)).toFixed(1) + 'px)';
      el.style.visibility = a > .01 ? 'visible' : 'hidden';
    }
    stage.classList.toggle('is-dark', tau < DARK_UNTIL);
    scrim.style.opacity = (1 - ss(2.04, 2.3, tau)).toFixed(3);
    hint.style.opacity = tau < .02 && !lock ? 1 : 0;
  }

  /* ------------------------------------------------------------------ scroll, films and the frame loop */
  var lock = null, raf = 0, dirty = true, visible = false, lastT = 0, tauNow = 0;
  function u() { return -root.getBoundingClientRect().top / M.sh; }
  function scrollToY(y) { try { window.scrollTo({ top: y, behavior: 'instant' }); } catch (e) { window.scrollTo(0, y); } }
  function startFilm(g, dir) {
    if (jobs.length) pump(1e9);
    var y = window.scrollY + root.getBoundingClientRect().top + g.u * M.sh;
    lock = { g: g, dir: dir, y: y };
    scrollToY(y);
    filmName.textContent = g.name;
    film.hidden = false;
    lastT = performance.now();
    kick();
  }
  function endFilm() {
    if (!lock) return;
    var l = lock; lock = null;
    l.g.p = l.dir > 0 ? 1 : 0;
    film.hidden = true;
    scrollToY(l.y + (l.dir > 0 ? 2 : -2));
    dirty = true; kick();
  }
  function onScroll() {
    if (lock) { if (Math.abs(window.scrollY - lock.y) > 1) scrollToY(lock.y); return; }
    var uu = u();
    for (var i = 0; i < GATES.length; i++) {
      var g = GATES[i];
      if (g.p === 0 && uu >= g.u) { if (REDUCED || uu - g.u > .6) g.p = 1; else { startFilm(g, 1); break; } }
      else if (g.p === 1 && uu < g.u) { if (REDUCED || g.u - uu > .6) g.p = 0; else { startFilm(g, -1); break; } }
    }
    dirty = true; kick();
  }
  function block(e) { if (lock) { e.preventDefault(); } }
  window.addEventListener('wheel', block, { passive: false });
  window.addEventListener('touchmove', block, { passive: false });
  window.addEventListener('keydown', function (e) {
    if (!lock) return;
    if (e.key === 'Escape') { endFilm(); return; }
    if ([' ', 'PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'Home', 'End'].indexOf(e.key) > -1 && !/input|textarea|select/i.test(e.target.tagName)) e.preventDefault();
  });
  film.querySelector('.sb__skip').addEventListener('click', endFilm);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { measure(); ROUTE = null; endFrame = null; onScroll(); });

  function frame(now) {
    raf = 0;
    var dt = Math.min(.05, (now - lastT) / 1000); lastT = now;
    if (jobs.length) pump(visible ? 10 : 6);
    if (lock) {
      var g = lock.g;
      g.p = clamp(g.p + lock.dir * dt / (g.dur * (lock.dir < 0 ? .6 : 1)), 0, 1);
      filmBar.style.transform = 'scaleX(' + (lock.dir > 0 ? g.p : 1 - g.p).toFixed(3) + ')';
      dirty = true;
      if ((lock.dir > 0 && g.p >= 1) || (lock.dir < 0 && g.p <= 0)) endFilm();
    }
    if (dirty && visible) {
      tauNow = tauAt(u());
      render(tauNow); syncCopy(tauNow);
      dirty = false;
    }
    if (lock || jobs.length || (dirty && visible)) raf = requestAnimationFrame(frame);
  }
  function kick() { if (!raf) { lastT = performance.now(); raf = requestAnimationFrame(frame); } }

  /* ------------------------------------------------------------------ start */
  measure();
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { if (es[0].isIntersecting) startJobs(); }, { rootMargin: '150% 0px' }).observe(root);
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) { dirty = true; kick(); } }).observe(stage);
  } else { visible = true; startJobs(); }
  /* arriving part-way down (a reload, a link): set the films to where the reader already is */
  var u0 = u(); GATES.forEach(function (g) { g.p = u0 >= g.u ? 1 : 0; });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { dirty = true; kick(); });

  /* for previews and tests: PH.story.at(tau) draws any moment */
  PH.story = { at: function (t) { if (jobs.length) pump(1e9); visible = true; render(t); syncCopy(t); }, gates: GATES, tau: function () { return tauNow; } };
})();
