/* purpleherb catalogue — prices, variant IDs and descriptions from purpleherb.in (Nov 2026).
   Headlines and facts follow the brand's own Instagram posts.
   Cart: items are kept in this browser, checkout goes to Shopify:  /cart/VARIANT:QTY,VARIANT:QTY  */
window.PH = window.PH || {};
PH.STORE = '';  /* same store — links stay on this domain */
PH.CDN = 'https://cdn.shopify.com/s/files/1/0812/4016/2543/files/';

/* Social links — Instagram and Facebook are not linked anywhere on the live store yet.
   Replace these two with the real profile URLs. */
PH.social = {
  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',
  whatsapp: 'https://wa.me/919000016479',
  email: 'mailto:support@purpleherb.in'
};
PH.reportUrl = 'https://wa.me/919000016479?text=' + encodeURIComponent('Hello purpleherb, could you share the lab report for my product?');

PH.products = [
  {
    slug: 'kashmiri-saffron',
    shopHandle: 'kesar',
    name: 'Kashmiri Saffron',
    keywords: 'kesar zafran saffron threads spice kashmir pampore crocus',
    short: 'Premium-grade kesar. Whole threads, nothing else.',
    tagline: 'gathered at first light',
    origin: { region: 'Pampore, Kashmir', place: 'Karewa plateaus of the Jhelum valley', altitude: '≈ 1,600 m', season: 'Late October – November', short: 'Pampore · Kashmir' },
    tones: { tone: '#7B5BB8', deep: '#5E3F9E', soft: '#F1EBFA', accent: '#C21E2B' },
    elements: ['crocus', 'thread', 'petal', 'thread', 'leaf'],
    feature: 'thread',
    scene: 'scene-saffron-pampore.svg',
    sceneAlt: 'Illustration: Kashmiri women in pherans picking violet saffron crocus at dawn on the Pampore karewa, snow-dusted Pir Panjal behind, a chinar tree in autumn colour',
    variants: [
      { id: 48778073211119, title: '2 GM', price: 1199, compare: 1599 },
      { id: 51530169909487, title: '5 GM', price: 2399, compare: 2999 }
    ],
    images: ['56558.jpg', '56559.jpg', '56560.jpg', '56561.jpg', '56562.jpg'],
    headline: ['150 flowers.', 'One gram.'],
    intro: 'Each crocus gives just three threads, picked by hand at dawn. Three compounds make them precious.',
    specs: [
      ['Crocin', 'The deep colour, and a natural antioxidant.'],
      ['Safranal', 'The aroma that calms a room.'],
      ['Picrocrocin', 'The warm, honeyed taste of real kesar.']
    ],
    description: 'PurpleHerb Kashmiri Kesar is premium-grade saffron, handpicked in the valleys of Kashmir. Naturally rich in antioxidants and bioactive compounds, saffron has long been valued in Ayurveda for overall wellness. A few threads bring colour, aroma and depth to milk, kahwa, desserts, biryanis and teas — and it is a quiet favourite in skincare rituals too.',
    story: [
      'For a few short weeks each autumn, the karewas around Pampore — ancient lake-bed plateaus above the Jhelum — turn violet. Saffron here does not hurry. The corms rest in the earth most of the year and bloom only once the nights turn cold.',
      'Families walk out before sunrise, while the flowers are still closed against the frost, and lift each crocus into willow baskets. By afternoon, courtyards fill with people freeing three crimson threads from every bloom — a ritual Kashmiri households have kept for generations.'
    ],
    ritual: [
      { t: 'Picked before sunrise', d: 'Flowers are gathered at dawn, still closed, so the threads never meet the midday sun.' },
      { t: 'Baskets of violet', d: 'Each bloom is lifted by hand into woven willow baskets carried across the karewa.' },
      { t: 'Threads by hand', d: 'At home, families separate the three crimson stigmas from every flower, one by one.' },
      { t: 'Slow, gentle drying', d: 'Threads are dried with patience to hold their deep colour and honeyed aroma.' }
    ],
    uses: [['In warm milk', 'Steep 4–5 threads for ten minutes, then pour.'], ['In the kitchen', 'Kahwa, kheer, phirni or biryani — colour and aroma in one.'], ['Keep it well', 'Airtight, away from light and moisture.']],
    palette: [{ n: 'Crocus violet', c: '#7B5BB8' }, { n: 'Stigma crimson', c: '#C21E2B' }, { n: 'Karewa earth', c: '#A07850' }, { n: 'Chinar ember', c: '#D9772E' }],
    homeSpot: { x: '57%', y: '0px', w: '300px', r: '3deg' }
  },
  {
    slug: 'kashmiri-acacia-honey',
    shopHandle: 'superfood-2',
    name: 'Kashmiri Acacia Honey',
    keywords: 'honey shahad himalayan honey acacia raw unfiltered kashmir bees',
    short: 'From Kashmir’s acacia bloom. Raw and unfiltered.',
    tagline: 'left as the bees made it',
    origin: { region: 'Kashmir Valley', place: 'Acacia groves along the valley floor', altitude: '≈ 1,600 – 1,900 m', season: 'May – June bloom', short: 'Kashmir Valley' },
    tones: { tone: '#E3A13A', deep: '#B9740F', soft: '#FBF2DF', accent: '#F6EFD9' },
    elements: ['drop', 'blossom', 'comb', 'drop', 'leaf'],
    feature: 'comb',
    scene: 'scene-honey-kashmir.svg',
    sceneAlt: 'Illustration: a Kashmiri beekeeper lifting a golden frame beside painted wooden bee boxes, white acacia trees in bloom, poplars and snow peaks of the valley behind',
    variants: [
      { id: 48776020984047, title: '500 GM', price: 699, compare: 999 }
    ],
    images: ['1_fb7a207f-046d-4138-90ba-5c8e15e5d6b1.png'],
    headline: ['Twelve bees.', 'One teaspoon.'],
    intro: 'A lifetime of flights goes into every spoonful, gathered from the acacia bloom of Kashmir.',
    specs: [
      ['Enzymes', 'Still alive, because it is never overheated.'],
      ['Polyphenols', 'The blossom’s own antioxidants and flavonoids.'],
      ['Light and clear', 'Mild on the tongue, slow to crystallise.']
    ],
    promise: ['Left exactly', 'as the bees made it.', 'No heating. No blending. No polishing. What leaves the hive in Kashmir is what you open at home.'],
    description: 'Light, golden and gently floral, this honey comes from the short spring window when the acacia trees of the Kashmir valley hang heavy with white blossom. It is raw and unfiltered — never heated, never blended — so it stays clear, mild and naturally slow to crystallise.',
    story: [
      'When spring reaches the Kashmir valley, the acacia trees along its orchards and riverbanks open into drooping clusters of white flowers. For a few weeks the air hums, and beekeepers set their painted wooden boxes close to the bloom.',
      'Many keepers follow the flowers through the seasons, moving their hives as the valley warms. The honey from this window is pale and clear — one particular spring, from one particular place.'
    ],
    ritual: [
      { t: 'Hives meet the bloom', d: 'Wooden boxes are placed among the acacia groves just as the white blossoms open.' },
      { t: 'The bees do the work', d: 'Through the bloom, colonies gather nectar from the trees around them.' },
      { t: 'Frames lifted by hand', d: 'Capped frames are lifted with care, leaving the colony enough to thrive.' },
      { t: 'Never heated', d: 'Raw and unfiltered — jarred exactly as it leaves the hive.' }
    ],
    uses: [['At sunrise', 'A spoon in warm water with lemon.'], ['In your cup', 'Sweetens tea without taking it over.'], ['On the table', 'Over toast, oats or a bowl of curd.']],
    palette: [{ n: 'Acacia amber', c: '#E3A13A' }, { n: 'Honey gold', c: '#F2B544' }, { n: 'Blossom cream', c: '#F6EFD9' }, { n: 'Valley green', c: '#8FAE7A' }],
    homeSpot: { x: '2%', y: '40px', w: '330px', r: '-4deg' }
  },
  {
    slug: 'sea-buckthorn-pure-pulp',
    shopHandle: 'sea-buckthorn-juice',
    name: 'Sea Buckthorn Pure Pulp',
    keywords: 'sea buckthorn juice pulp leh berry omega 7 vitamin c ladakh',
    short: 'The whole berry, pulped and sealed in glass.',
    tagline: 'sunlight of the cold desert',
    origin: { region: 'Ladakh', place: 'Riverbeds of the high cold desert', altitude: '≈ 3,000 – 3,500 m', season: 'September – October', short: 'Ladakh' },
    tones: { tone: '#F07C1E', deep: '#C9560B', soft: '#FDEEDF', accent: '#9DAA8C' },
    elements: ['berrysprig', 'berry', 'leafsilver', 'berry', 'leafsilver'],
    feature: 'berrysprig',
    scene: 'scene-seabuckthorn-ladakh.svg',
    sceneAlt: 'Illustration: Ladakhi women carrying woven back-baskets of orange sea buckthorn berries along a river, golden poplars, a white chorten with prayer flags and bare mountains',
    variants: [
      { id: 48778249339119, title: '500 ML', price: 1349, compare: 1699 }
    ],
    images: ['56572.jpg', '56571.jpg', '56570.jpg', '56568.jpg', '56569.jpg', '56557.jpg'],
    headline: ['Four omegas.', 'One berry.'],
    intro: 'Omega 3, 6, 7 and 9 in a single fruit, alongside vitamin C, vitamin E and carotenoids.',
    specs: [
      ['Omega 7', 'Rare in the plant world, prized for skin from within.'],
      ['Vitamin C', 'Everyday support for your natural immunity.'],
      ['Antioxidants', 'For digestion, vitality and a steady glow.']
    ],
    journey: ['Thorn to bottle.', 'Nothing lost.'],
    scrollStory: true,  /* the scroll-told journey: assets/product-story.js */
    description: 'PurpleHerb Sea Buckthorn Pure Pulp is the whole berry, pulped and bottled in glass. Sea buckthorn is naturally rich in vitamin C, carotenoids, healthy fatty acids and plant compounds — valued for supporting immunity, skin, digestion and everyday vitality, and for helping the body meet oxidative stress.',
    story: [
      'In Ladakh, sea buckthorn grows wild in thorny silver-green thickets along the rivers of the cold desert — one of the few shrubs that thrives where summers are short and winters fall far below freezing. Locally it is often called the Leh berry.',
      'As autumn turns the poplars gold, village women walk out to the riverbeds and pick the clustered orange berries from between the thorns, carrying them home in woven baskets on their backs, under strings of prayer flags.'
    ],
    ritual: [
      { t: 'Wild valleys', d: 'Grown by the cold and the altitude, not by us.' },
      { t: 'Hand harvest', d: 'Picked off the thorn by local families, the way they always have.' },
      { t: 'Carried home', d: 'Woven back-baskets bring the harvest from the riverbeds to the village.' },
      { t: 'Sealed in glass', d: 'The whole berry, pulped and bottled to reach you as potent as it left.' }
    ],
    uses: [['Shake well', 'Natural oils separate — that is how you know.'], ['Daily glass', '20–30 ml in water or juice.'], ['Once open', 'Keep refrigerated.']],
    palette: [{ n: 'Berry orange', c: '#F07C1E' }, { n: 'Ember', c: '#C9560B' }, { n: 'Silver leaf', c: '#9DAA8C' }, { n: 'Poplar gold', c: '#E2B84A' }],
    homeSpot: { x: '30%', y: '330px', w: '360px', r: '2deg' }
  },
  {
    slug: 'sea-buckthorn-quad-omega-powder',
    shopHandle: 'sea-buckthorn-quad-omega-powder',
    name: 'Sea Buckthorn Quad Omega Powder',
    keywords: 'sea buckthorn powder omega 3 6 7 9 smoothie ladakh leh berry',
    short: 'Ladakh in a spoon. Nothing added.',
    tagline: 'the harvest, made easy',
    origin: { region: 'Ladakh', place: 'Riverbeds of the high cold desert', altitude: '≈ 3,000 – 3,500 m', season: 'September – October', short: 'Ladakh' },
    tones: { tone: '#F28A2C', deep: '#C9560B', soft: '#FDF0E3', accent: '#9DAA8C' },
    elements: ['berry', 'leafsilver', 'berrysprig', 'seed', 'berry'],
    feature: 'berry',
    scene: 'scene-seabuckthorn-ladakh.svg',
    sceneAlt: 'Illustration: Ladakhi women carrying woven back-baskets of orange sea buckthorn berries along a river, golden poplars, a white chorten with prayer flags and bare mountains',
    variants: [
      { id: 50147169566959, title: '250 GM', price: 899, compare: 1199 }
    ],
    images: ['5_a20c5b9c-465f-4b55-bda5-f7f25fb43969.png'],
    headline: ['The whole berry.', 'One spoonful.'],
    intro: 'Ladakh’s sea buckthorn, dried gently and milled fine — so all four omegas travel easily into your everyday.',
    specs: [
      ['Omega 3 · 6 · 7 · 9', 'All four, from a single fruit.'],
      ['Nothing added', 'No colours, no preservatives, no fillers.'],
      ['Easy ritual', 'A spoon into smoothies, juice or curd.']
    ],
    description: 'Our berries are gently processed into a fine powder without artificial colours, preservatives or fillers, helping preserve their natural nutritional profile. Blend it into smoothies, juices, yogurt or warm beverages — a simple way to bring a nutrient-rich ingredient into your everyday diet.',
    story: [
      'The same wild thickets that line Ladakh’s rivers give us this powder. Sea buckthorn is one of the rare plants that carries omega 3, 6, 7 and 9 together — which is where the name Quad Omega comes from.',
      'Picked by hand each autumn by village harvesters, the berries are dried and milled gently, so a spoonful of the cold desert travels easily into your kitchen.'
    ],
    ritual: [
      { t: 'Hand-picked in autumn', d: 'Wild berries are gathered from riverside thickets as they ripen.' },
      { t: 'Cleaned and sorted', d: 'Leaves and twigs are removed so only whole berries remain.' },
      { t: 'Dried gently', d: 'Low, patient drying protects the berry’s natural character.' },
      { t: 'Finely milled', d: 'Nothing added. Not colours, not preservatives, not fillers.' }
    ],
    uses: [['In a smoothie', '1–2 teaspoons, blended in.'], ['Warm, not hot', 'Whisk into warm beverages, never boiling.'], ['Keep it well', 'Sealed, in a cool, dry place.']],
    palette: [{ n: 'Berry orange', c: '#F28A2C' }, { n: 'Dried ember', c: '#C9560B' }, { n: 'Silver leaf', c: '#9DAA8C' }, { n: 'Desert sand', c: '#D8C3A0' }],
    homeSpot: { x: '68%', y: '470px', w: '290px', r: '-3deg' }
  },
  {
    slug: 'himalayan-shilajit',
    shopHandle: 'himalayan-shilajit',
    name: 'Himalayan Shilajit',
    keywords: 'shilajit resin fulvic acid minerals ayurveda rasayana energy stamina',
    short: 'Pure mountain resin. Purified slowly, never rushed.',
    tagline: 'drawn from the mountain',
    origin: { region: 'High Himalaya', place: 'Sun-warmed rock faces above 16,000 feet', altitude: 'Above 16,000 ft', season: 'Peak summer', short: 'High Himalaya' },
    tones: { tone: '#5B4432', deep: '#22170F', soft: '#F1ECE6', accent: '#8A8F96' },
    elements: ['shard', 'stone', 'shard', 'stone2', 'twig'],
    feature: 'shard',
    scene: 'scene-shilajit-himalaya.svg',
    sceneAlt: 'Illustration: dark resin seeping from a high Himalayan cliff where a collector works on a rope, below a snow peak; brass vessels purifying shilajit in the sun beside a stone hut and a grazing yak',
    variants: [
      { id: 48756429947119, title: '20 gm', price: 1199, compare: 1799 },
      { id: 51435365564655, title: '30 gm', price: 1499, compare: 2399 },
      { id: 51435365597423, title: '50 gm', price: 2199, compare: 2999 }
    ],
    images: ['56563.jpg', '56565.jpg', '56564.jpg', '56566.jpg', '56567.jpg'],
    headline: ['Eighty minerals.', 'One resin.'],
    intro: 'Pressed out of Himalayan rock over centuries, above 16,000 feet. The mountain does the work.',
    specs: [
      ['Fulvic acid', 'Nature’s carrier for the minerals your body uses.'],
      ['Energy', 'Ayurveda’s rasayana for stamina and vitality.'],
      ['The ritual', 'A pea-sized portion in warm water or milk.']
    ],
    description: 'Pure Himalayan shilajit, sourced from high mountain rock. This mineral-rich resin is traditionally valued for energy, vitality and overall wellness, and is known for its fulvic acid and trace minerals. Each batch is carefully extracted and purified to keep its natural potency — authentic, potent and sustainably harvested.',
    story: [
      'High in the Himalaya, where plants have pressed into rock for countless years, the summer sun warms the cliffs until a dark, glossy resin seeps from the cracks. Mountain communities have known it for generations as shilajit.',
      'Collectors climb to these faces in the warmest weeks to gather it by hand. It is then dissolved in clean water, filtered, and left in shallow vessels under the sun until it slowly becomes resin again — a patient method known as surya tapi.'
    ],
    ritual: [
      { t: 'Summer on the rock', d: 'Resin is gathered only in the warm months, when it seeps from the cliffs.' },
      { t: 'Collected by hand', d: 'Experienced collectors take it from high crevices, often on rope.' },
      { t: 'Dissolved and filtered', d: 'The raw resin is dissolved in water and cleared of rock and sediment.' },
      { t: 'Sun-thickened', d: 'Shallow vessels rest under the Himalayan sun. Purified slowly, never rushed.' }
    ],
    uses: [['The ritual', 'A pea-sized portion in warm water or milk.'], ['Once a day', 'Or as advised by your practitioner.'], ['Keep it well', 'Lid tight — it softens in warmth and firms in cold.']],
    palette: [{ n: 'Resin black', c: '#22170F' }, { n: 'Mineral brown', c: '#5B4432' }, { n: 'Slate', c: '#8A8F96' }, { n: 'Brass vessel', c: '#C9A04A' }],
    homeSpot: { x: '6%', y: '640px', w: '320px', r: '4deg' }
  }
];

PH.bySlug = function (slug) { return PH.products.find(function (p) { return p.slug === slug; }); };
PH.byVariant = function (id) {
  id = Number(id);
  for (var i = 0; i < PH.products.length; i++) {
    var v = PH.products[i].variants.find(function (x) { return x.id === id; });
    if (v) return { p: PH.products[i], v: v };
  }
  return null;
};
// product photos are bundled with the site (assets/products) so it also works where outside images are blocked
PH.img = function (file) { return PH.asset(file); };
PH.inr = function (n) { return 'Rs. ' + Number(n).toLocaleString('en-IN') + '.00'; };
PH.addUrl = function (variantId, qty) { return PH.STORE + '/cart/add?id=' + variantId + '&quantity=' + (qty || 1); };
PH.buyUrl = function (variantId, qty) { return PH.STORE + '/cart/' + variantId + ':' + (qty || 1); };


/* ---- Shopify theme glue ---- */
PH.purl = function (p) { return '/products/' + p.shopHandle; };
PH.byHandle = function (h) { return PH.products.find(function (p) { return p.shopHandle === h; }) || null; };
