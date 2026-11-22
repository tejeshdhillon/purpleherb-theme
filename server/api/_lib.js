/* Shared helpers for the purpleherb checkout server (Vercel, Node 18+, no dependencies). */
const crypto = require('crypto');

const env = (k, d) => (process.env[k] === undefined || process.env[k] === '' ? d : process.env[k]);
const rupees = (k, d) => Math.round(Number(env(k, d)) * 100) || 0; // env in rupees -> paise

const cfg = () => ({
  keyId: env('RZP_KEY_ID', ''),
  keySecret: env('RZP_KEY_SECRET', ''),
  shop: env('SHOP_ORIGIN', 'https://purpleherb.in').replace(/\/+$/, ''),
  origins: env('ALLOWED_ORIGINS', 'https://purpleherb.in,https://www.purpleherb.in').split(',').map(s => s.trim()).filter(Boolean),
  shipFee: rupees('SHIPPING_FEE', '0'),
  freeAbove: rupees('FREE_SHIPPING_ABOVE', '0'),         // 0 = no free-shipping threshold
  codOn: env('COD_ENABLED', 'true') === 'true',
  codFee: rupees('COD_FEE', '0'),
  codMax: rupees('COD_MAX_ORDER', '0'),                   // 0 = no limit
  blocked: env('BLOCKED_PINCODES', '').split(',').map(s => s.trim()).filter(Boolean),
  coupons: (() => { try { return JSON.parse(env('COUPONS', '[]')); } catch (e) { return []; } })()
});

/* ---------- http helpers ---------- */
function cors(req, res) {
  const c = cfg(), o = req.headers.origin;
  if (o && (c.origins.includes(o) || c.origins.includes('*'))) {
    res.setHeader('Access-Control-Allow-Origin', o);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.statusCode = 204; res.end(); return true; }
  return false;
}
function send(res, code, obj) {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(obj));
}
async function body(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string' && req.body) { try { return JSON.parse(req.body); } catch (e) { return {}; } }
  const chunks = [];
  for await (const ch of req) chunks.push(ch);
  const raw = Buffer.concat(chunks).toString('utf8');
  try { return raw ? JSON.parse(raw) : {}; } catch (e) { return {}; }
}

/* ---------- Razorpay ---------- */
async function rzp(path, opts) {
  const c = cfg();
  if (!c.keyId || !c.keySecret) throw new Error('Razorpay keys are not set on the server');
  const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 10000);
  try {
    const r = await fetch('https://api.razorpay.com/v1' + path, Object.assign({
      headers: {
        'Authorization': 'Basic ' + Buffer.from(c.keyId + ':' + c.keySecret).toString('base64'),
        'Content-Type': 'application/json'
      }, signal: ctl.signal
    }, opts || {}));
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { const e = new Error((j.error && j.error.description) || ('Razorpay ' + r.status)); e.status = r.status; throw e; }
    return j;
  } finally { clearTimeout(t); }
}
const fetchOrder = id => rzp('/orders/' + (String(id).startsWith('order_') ? id : 'order_' + id));

function signatureOk(orderId, paymentId, signature) {
  if (!signature) return false;
  const exp = crypto.createHmac('sha256', cfg().keySecret).update(orderId + '|' + paymentId).digest('hex');
  const a = Buffer.from(exp), b = Buffer.from(String(signature));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/* ---------- prices: always read from the live store, never from the browser ---------- */
let cache = { at: 0, map: null };
async function catalog() {
  if (cache.map && Date.now() - cache.at < 60000) return cache.map;
  const c = cfg();
  const map = new Map();
  for (let page = 1; page <= 4; page++) {
    const r = await fetch(c.shop + '/products.json?limit=250&page=' + page, { headers: { 'Accept': 'application/json' } });
    if (!r.ok) throw new Error('Could not read the product list from ' + c.shop + ' (' + r.status + ')');
    const j = await r.json();
    const list = j.products || [];
    list.forEach(p => (p.variants || []).forEach(v => map.set(String(v.id), { p, v })));
    if (list.length < 250) break;
  }
  if (!map.size) throw new Error('Product list is empty');
  cache = { at: Date.now(), map };
  return map;
}

module.exports = { cfg, cors, send, body, rzp, fetchOrder, signatureOk, catalog };
