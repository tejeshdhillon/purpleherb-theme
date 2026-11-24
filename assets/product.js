/* Product page — renders the product named in <body data-product="slug"> in its own natural colours */
(function () {
  var PH = window.PH;
  var p = PH.bySlug(document.body.getAttribute('data-product'));
  var main = document.getElementById('product');
  if (!p || !main) return;
  var R = PH.root;

  var rs = document.documentElement.style;
  rs.setProperty('--tone', p.tones.tone);
  rs.setProperty('--tone-deep', p.tones.deep);
  rs.setProperty('--tone-soft', p.tones.soft);
  document.title = p.name + ' — purpleherb';

  var state = { v: 0, qty: 1 };
  var spots = [['-2%', '6%', '-24deg', 1.4, .9], ['84%', '2%', '30deg', 1.1, .6], ['90%', '62%', '12deg', .8, 1.1], ['2%', '74%', '-10deg', .9, .7], ['70%', '86%', '40deg', .6, 1.3]];
  var els = p.elements.map(function (e, i) {
    var s = spots[i % spots.length];
    return '<i class="el" data-el="' + e + '" data-depth="' + s[4] + '" style="--x:' + s[0] + ';--y:' + s[1] + ';--r:' + s[2] + ';--s:' + s[3] + '"></i>';
  }).join('');
  function priceHtml() {
    var v = p.variants[state.v];
    var save = v.compare ? Math.round((1 - v.price / v.compare) * 100) : 0;
    return '<strong>' + PH.inr(v.price) + '</strong>' + (v.compare ? '<s>' + PH.inr(v.compare) + '</s><span class="save">save ' + save + '%</span>' : '');
  }
  var thumbs = p.images.length > 1 ? '<div class="p-thumbs">' + p.images.map(function (im, i) {
    return '<button class="p-thumb" style="--r:' + ((i % 2 ? 1 : -1) * (3 + i)) + 'deg" aria-pressed="' + (i === 0) + '" aria-label="View image ' + (i + 1) + '" data-i="' + i + '"><img src="' + PH.img(im, 200) + '" alt="" loading="lazy"></button>';
  }).join('') + '</div>' : '';
  var nameParts = p.name.split(' ');
  var titleHtml = nameParts.slice(0, -1).join(' ') + ' <span class="it">' + nameParts[nameParts.length - 1] + '</span>';
  var others = PH.products.filter(function (o) { return o.slug !== p.slug; });
  var otherSpots = [['0%', '20px', '-3deg'], ['26%', '160px', '2deg'], ['52%', '0px', '-2deg'], ['76%', '130px', '3deg']];
  var journeyHead = p.journey ? p.journey : ['From source', 'to your door.'];

  main.innerHTML =
  // ---------- hero ----------
  '<section class="p-hero">' +
    '<img class="ghost" src="' + PH.asset('flower.png') + '" alt="" style="--gw:900px;--gx:84%;--gy:-200px;--gr:24deg">' +
    '<div class="wrap">' +
      '<div class="settle">' +
        '<div class="p-stage">' + els + '<div class="p-stage__glow"></div>' +
          '<img class="p-stage__img" id="stage-img" src="' + PH.img(p.images[0], 1200) + '" alt="' + p.name + ' by purpleherb">' +
        '</div>' + thumbs +
      '</div>' +
      '<div class="p-info settle" style="--d:.15s">' +
        '<p class="label">' + p.origin.short + ' · ' + p.origin.season + '</p>' +
        '<h1 class="p-title">' + titleHtml + '</h1>' +
        '<p class="script p-tag">' + p.tagline + '</p>' +
        '<p class="lede">' + p.short + '</p>' +
        '<div class="p-price" id="price">' + priceHtml() + '</div>' +
        '<p class="label" style="margin:0 0 6px">' + (p.variants.length > 1 ? 'Choose a size' : 'Size') + '</p>' +
        '<div class="p-opts" role="group" aria-label="Size">' + p.variants.map(function (v, i) {
          return '<button class="stone" aria-pressed="' + (i === 0) + '" data-v="' + i + '">' + v.title + '</button>';
        }).join('') + '</div>' +
        '<div class="p-buy">' +
          '<div class="qty" role="group" aria-label="Quantity"><button data-q="-1" aria-label="Fewer">−</button><output id="qty" aria-live="polite">1</output><button data-q="1" aria-label="More">+</button></div>' +
          '<a class="pebble" id="add" href="#">Add to basket</a>' +
          '<a class="twig" id="buy" href="#">Buy it now</a>' +
        '</div>' +
        '<div class="p-promises"><span><i></i>Single origin</span><span><i></i>Lab-tested</span><span><i></i>Traceable</span><span><i></i>Zero additives</span></div>' +
      '</div>' +
    '</div>' +
  '</section>' +

  // ---------- the scroll story, for products that have one (assets/product-story.js) ----------
  (p.scrollStory ? '<section id="ph-story"></section>' : '') +

  // ---------- the numbers that make it rare (from the brand posts) ----------
  '<section class="section" aria-labelledby="facts-title">' +
    '<div class="wrap facts-wrap">' +
      '<div class="settle">' +
        '<p class="label">' + p.name + '</p>' +
        '<h2 id="facts-title" class="hd hd-l">' + p.headline[0] + '<br><span class="it">' + p.headline[1] + '</span></h2>' +
        '<p class="lede" style="margin-top:24px">' + p.intro + '</p>' +
        '<ul class="facts">' + p.specs.map(function (s) { return '<li><strong>' + s[0] + '</strong><span>' + s[1] + '</span></li>'; }).join('') + '</ul>' +
      '</div>' +
      '<div class="feature-art settle" style="--d:.2s"><i class="el" data-el="' + p.feature + '" data-depth=".4" style="--r:-8deg"></i></div>' +
    '</div>' +
  '</section>' +

  (p.promise ?
  '<section class="section" style="padding-top:0" aria-labelledby="promise-title">' +
    '<div class="wrap"><div class="stone-card on-dark settle" style="--r:-1.2deg;max-width:980px;margin-left:5%">' +
      '<img class="ghost" src="' + PH.asset('flower.png') + '" alt="" style="--gw:640px;--gx:90%;--gy:-100px;--gr:20deg">' +
      '<p class="label">Hive to home</p>' +
      '<h2 id="promise-title" class="hd hd-l">' + p.promise[0] + '<br><span class="chip chip--light">' + p.promise[1] + '</span></h2>' +
      '<p class="lede" style="margin-top:26px">' + p.promise[2] + '</p>' +
    '</div></div>' +
  '</section>' : '') +

  // ---------- region and journey (told by the scroll story instead, when there is one) ----------
  (p.scrollStory ? '' :
  '<section class="p-region" aria-labelledby="region-title">' +
    '<div class="p-region__scene settle"><img src="' + PH.asset('') + p.scene + '" alt="' + p.sceneAlt + '"></div>' +
    '<div class="wrap">' +
      '<div class="p-region__facts settle">' +
        '<div><p class="label">Region</p><strong>' + p.origin.region + '</strong></div>' +
        '<div><p class="label">Altitude</p><strong>' + p.origin.altitude + '</strong></div>' +
        '<div><p class="label">Harvest</p><strong>' + p.origin.season + '</strong></div>' +
      '</div>' +
      '<div class="p-region__story">' +
        '<div class="settle"><p class="label">The land</p><h2 id="region-title" class="hd hd-m">' + p.origin.place.replace(/^(\S+)/, '<span class="it">$1</span>') + '</h2></div>' +
        '<div class="settle" style="--d:.15s">' + p.story.map(function (s) { return '<p class="lede">' + s + '</p>'; }).join('') + '</div>' +
      '</div>' +
    '</div>' +
  '</section>' +

  // ---------- the journey ----------
  '<section class="section" aria-labelledby="ritual-title">' +
    '<i class="el" data-el="' + p.elements[1] + '" data-depth=".6" style="--x:88%;--y:60px;--r:18deg;--s:1.1"></i>' +
    '<div class="wrap">' +
      '<div class="settle"><p class="label">The journey</p><h2 id="ritual-title" class="hd hd-l">' + journeyHead[0] + '<br><span class="it">' + journeyHead[1] + '</span></h2></div>' +
      '<div class="ritual-path"><ol>' + p.ritual.map(function (r, i) {
        return '<li class="settle" style="--d:' + (i * .12) + 's"><span class="mark">0' + (i + 1) + '</span><h3>' + r.t + '</h3><p>' + r.d + '</p></li>';
      }).join('') + '</ol></div>' +
    '</div>' +
  '</section>') +

  // ---------- about + ritual of use ----------
  '<section class="section" style="padding-top:0" aria-labelledby="about-title">' +
    '<i class="el" data-el="' + p.elements[2] + '" data-depth=".5" style="--x:4%;--y:30%;--r:-16deg;--s:.9"></i>' +
    '<div class="wrap p-detail">' +
      '<div class="settle"><p class="label">About</p><h2 id="about-title" class="hd hd-m" style="margin-bottom:22px">Exactly as nature made it.</h2><p class="lede">' + p.description + '</p>' +
        '<p class="label" style="margin-top:34px">The colours of its land</p>' +
        '<div class="palette">' + p.palette.map(function (c, i) { return '<div class="swatch"><i style="--c:' + c.c + ';--r:' + (i % 2 ? 6 : -8) + 'deg"></i>' + c.n + '</div>'; }).join('') + '</div>' +
      '</div>' +
      '<div class="settle" style="--d:.15s"><p class="label">How to enjoy</p>' +
        '<ul class="facts" style="margin-top:6px">' + p.uses.map(function (u) { return '<li><strong>' + u[0] + '</strong><span>' + u[1] + '</span></li>'; }).join('') + '</ul>' +
        '<p style="font-size:13px;color:var(--muted);margin-top:20px">A food, not a medicine. If you are pregnant, nursing or under treatment, please speak with your doctor first.</p>' +
      '</div>' +
    '</div>' +
  '</section>' +

  // ---------- proof ----------
  '<section class="section proof" style="padding-top:0" aria-labelledby="proof-title">' +
    '<div class="wrap">' +
      '<div class="settle"><p class="label">Proven</p><h2 id="proof-title" class="hd hd-l">Tested before it’s<br><span class="chip">trusted.</span></h2>' +
        '<p class="lede" style="margin-top:26px">Every batch is checked by an independent, ISO-certified lab before it ships — and sent to CFRA at NIFTEM, the Government of India’s food laboratory. Ask us for the report before you buy.</p>' +
        '<a class="pebble" target="_blank" rel="noopener" href="' + PH.reportUrl + '">Request this report</a></div>' +
      '<div class="settle" style="--d:.2s"><div class="seal" role="img" aria-label="Third-party tested, every batch, ISO-certified lab">' +
        '<svg class="seal__ring" viewBox="0 0 300 300" aria-hidden="true"><defs><path id="sealPath" d="M150 150 m-122 0 a122 122 0 1 1 244 0 a122 122 0 1 1 -244 0"/></defs><text><textPath href="#sealPath" textLength="750">Third-party tested · Every batch · ISO-certified lab ·</textPath></text></svg>' +
        '<img src="' + PH.asset('flower.png') + '" alt=""></div></div>' +
    '</div>' +
  '</section>' +

  // ---------- more ----------
  '<section class="section more" aria-labelledby="more-title">' +
    '<div class="wrap">' +
      '<div class="settle"><p class="label">The collection</p><h2 id="more-title" class="hd hd-m">More from the mountains.</h2></div>' +
      '<div class="field">' + others.map(function (o, i) {
        var s = otherSpots[i], v = o.variants[0];
        return '<div class="find settle" style="--x:' + s[0] + ';--y:' + s[1] + ';--w:250px;--r:' + s[2] + ';--d:' + (i * .1) + 's">' +
          '<a href="' + PH.purl(o) + '" aria-label="' + o.name + '"><div class="find__img"><img src="' + PH.img(o.images[0], 600) + '" alt="' + o.name + '" loading="lazy"></div></a>' +
          '<div class="find__meta"><p class="find__origin">' + o.origin.short + '</p><h3 class="find__name"><a href="' + PH.purl(o) + '">' + o.name + '</a></h3><span class="find__price">' + PH.inr(v.price) + '</span></div></div>';
      }).join('') + '</div>' +
    '</div>' +
  '</section>';

  // ---------- behaviour ----------
  var add = document.getElementById('add'), buy = document.getElementById('buy');
  function sync() {
    var v = p.variants[state.v];
    add.href = PH.addUrl(v.id, state.qty);
    add.setAttribute('data-add', v.id);
    add.setAttribute('data-qty', state.qty);
    buy.href = '#buy'; buy.setAttribute('data-ph-buy', v.id); buy.setAttribute('data-qty', state.qty);
    document.getElementById('price').innerHTML = priceHtml();
    document.getElementById('qty').textContent = state.qty;
  }
  main.querySelectorAll('[data-v]').forEach(function (b) {
    b.addEventListener('click', function () {
      state.v = +b.dataset.v;
      main.querySelectorAll('[data-v]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      sync();
    });
  });
  main.querySelectorAll('[data-q]').forEach(function (b) {
    b.addEventListener('click', function () { state.qty = Math.max(1, Math.min(10, state.qty + +b.dataset.q)); sync(); });
  });
  var stage = document.getElementById('stage-img');
  main.querySelectorAll('.p-thumb').forEach(function (b) {
    b.addEventListener('click', function () {
      var i = +b.dataset.i;
      main.querySelectorAll('.p-thumb').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      stage.classList.add('swap');
      setTimeout(function () { stage.src = PH.img(p.images[i], 1200); stage.onload = function () { stage.classList.remove('swap'); }; }, 250);
    });
  });
  sync();
})();
