/* Homepage: products set down on the canvas, origins pins, harvest rituals */
(function () {
  var PH = window.PH;

  // natural companions that lie beside each product
  var companions = {
    'kashmiri-saffron': [['crocus', '78%', '8%', '18deg', 1.2], ['thread', '-8%', '30%', '-30deg', .7], ['petal', '84%', '58%', '60deg', .6]],
    'kashmiri-acacia-honey': [['blossom', '76%', '6%', '24deg', 1.3], ['drop', '4%', '46%', '0deg', .55], ['comb', '80%', '66%', '-10deg', .8]],
    'sea-buckthorn-pure-pulp': [['berrysprig', '-4%', '4%', '-20deg', 1.5], ['berry', '86%', '70%', '0deg', .35], ['berry', '90%', '75%', '0deg', .28]],
    'sea-buckthorn-quad-omega-powder': [['leafsilver', '84%', '10%', '30deg', 1.1], ['berry', '4%', '74%', '0deg', .4], ['seed', '12%', '80%', '40deg', .35]],
    'himalayan-shilajit': [['shard', '80%', '62%', '14deg', .9], ['stone', '4%', '68%', '-8deg', .8], ['stone2', '10%', '76%', '6deg', .5]]
  };

  /* ---- collection field ---- */
  var field = document.getElementById('field');
  PH.products.forEach(function (p, i) {
    var v = p.variants[0];
    var a = document.createElement('div');
    a.className = 'find settle';
    a.style.setProperty('--x', p.homeSpot.x);
    a.style.setProperty('--y', p.homeSpot.y);
    a.style.setProperty('--w', p.homeSpot.w);
    a.style.setProperty('--r', p.homeSpot.r);
    a.style.setProperty('--d', (i * 0.12) + 's');
    a.style.setProperty('--settle-r', (i % 2 ? 2 : -2) + 'deg');
    a.innerHTML =
      '<a href="' + PH.purl(p) + '" aria-label="' + p.name + '">' +
        '<div class="find__img"><img src="' + PH.img(p.images[0], 700) + '" alt="' + p.name + ' by PurpleHerb" loading="lazy"></div>' +
      '</a>' +
      '<div class="find__meta">' +
        '<p class="find__origin">' + p.origin.short + '</p>' +
        '<h3 class="find__name"><a href="' + PH.purl(p) + '">' + p.name + '</a></h3>' +
        '<p class="find__line">' + p.short + '</p>' +
        '<span class="find__price">' + PH.inr(v.price) + (v.compare ? '<s>' + PH.inr(v.compare) + '</s>' : '') + '</span><br>' +
        '<a class="pebble" href="' + PH.addUrl(v.id, 1) + '" data-add="' + v.id + '">Add to basket</a>' +
      '</div>';
    (companions[p.slug] || []).forEach(function (c) {
      a.appendChild(PH.el(c[0], { x: c[1], y: c[2], r: c[3], s: c[4], depth: .5 + Math.random() * .6 }));
    });
    field.appendChild(a);
  });

  /* ---- origins pins ---- */
  var pins = [
    { slug: 'kashmiri-saffron', name: 'Pampore', x: '13%', y: '63%', text: 'Saffron crocus blooms for a few weeks each autumn on the karewa plateaus. Families pick at dawn and separate every thread by hand.' },
    { slug: 'kashmiri-acacia-honey', name: 'Kashmir Valley', x: '33%', y: '66%', text: 'In late spring, acacia groves across the valley flower white, and beekeepers bring their wooden hives to the bloom.' },
    { slug: 'sea-buckthorn-pure-pulp', name: 'Ladakh', x: '60%', y: '55%', text: 'Wild sea buckthorn lines the rivers of the cold desert. Village women pick the orange berries as the poplars turn gold.' },
    { slug: 'himalayan-shilajit', name: 'High Himalaya', x: '84%', y: '49%', text: 'In peak summer, resin seeps from sun-warmed rock faces. It is gathered by hand and purified slowly under the sun.' }
  ];
  var pano = document.getElementById('panorama');
  var note = document.createElement('div');
  note.className = 'pin-note';
  note.setAttribute('role', 'status');
  pano.appendChild(note);
  var active = null;
  pins.forEach(function (pin) {
    var p = PH.bySlug(pin.slug);
    var b = document.createElement('button');
    b.className = 'pin';
    b.style.setProperty('--x', pin.x);
    b.style.setProperty('--y', pin.y);
    b.setAttribute('aria-label', pin.name + ' — ' + p.name);
    b.innerHTML = '<span class="pin__mark"><img src="' + PH.asset('flower.png') + '" alt=""></span><span class="pin__name">' + pin.name + '</span>';
    function show() {
      if (active) active.classList.remove('active');
      active = b; b.classList.add('active');
      note.innerHTML = '<p class="label" style="color:' + p.tones.deep + '">' + p.origin.season + ' · ' + p.origin.altitude + '</p><h4>' + p.name + '</h4><p>' + pin.text + '</p><a class="twig" href="' + PH.purl(p) + '">Meet the harvest</a>';
      PH.decorate(note);
      var pr = pano.getBoundingClientRect(), br = b.getBoundingClientRect();
      var left = br.left - pr.left + br.width / 2 - 150;
      left = Math.max(10, Math.min(pr.width - Math.min(300, pr.width * .8) - 10, left));
      note.style.left = left + 'px';
      note.style.top = Math.max(0, br.top - pr.top - note.offsetHeight - 16) + 'px';
      note.classList.add('show');
    }
    b.addEventListener('mouseenter', show);
    b.addEventListener('focus', show);
    b.addEventListener('click', show);
    pano.appendChild(b);
  });
  pano.addEventListener('mouseleave', function () { note.classList.remove('show'); if (active) active.classList.remove('active'); });

  /* ---- harvest rituals ---- */
  var rituals = [
    ['kashmiri-saffron', 'Pampore · Kashmir', 'Saffron at first light', 'Before the sun opens the flowers, families walk the karewa with willow baskets — then sit together for hours, freeing three crimson threads from every bloom.', '58% 42% 46% 54% / 46% 52% 48% 54%', '-1.5deg'],
    ['kashmiri-acacia-honey', 'Kashmir Valley', 'When the acacia flowers', 'Painted wooden hives are set beneath trees heavy with white racemes. The keeper lifts each golden frame by hand, leaving the colony enough to thrive.', '44% 56% 58% 42% / 52% 44% 56% 48%', '1.5deg'],
    ['sea-buckthorn-pure-pulp', 'Ladakh', 'Berries of the cold desert', 'As poplars turn gold along the river, women pick orange clusters from between the thorns and carry them home in baskets on their backs, under prayer flags.', '52% 48% 40% 60% / 60% 46% 54% 40%', '1deg'],
    ['himalayan-shilajit', 'High Himalaya', 'Resin from the rock', 'In the warmest weeks, collectors climb to the cliffs where resin seeps from stone — then leave it in brass vessels under the sun to purify slowly.', '62% 38% 54% 46% / 50% 56% 44% 50%', '-1deg']
  ];
  var grid = document.getElementById('rituals-grid');
  rituals.forEach(function (r, i) {
    var p = PH.bySlug(r[0]);
    var a = document.createElement('a');
    a.className = 'ritual settle';
    a.href = '' + PH.purl(p) + '';
    a.style.setProperty('--d', (i % 2) * .15 + 's');
    a.innerHTML =
      '<div class="ritual__img" style="--blob:' + r[4] + ';--r:' + r[5] + '"><img src="' + PH.asset('') + p.scene + '" alt="' + p.sceneAlt + '" loading="lazy"></div>' +
      '<div class="ritual__cap"><p class="label" style="color:' + p.tones.deep + '">' + r[1] + '</p><h3>' + r[2] + '</h3><p>' + r[3] + '</p></div>';
    grid.appendChild(a);
  });

  document.querySelectorAll('[data-report]').forEach(function (a) { a.href = PH.reportUrl; a.target = '_blank'; a.rel = 'noopener'; });
})();
