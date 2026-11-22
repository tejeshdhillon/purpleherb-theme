/* POST /api/create-order   body: { items: [{ id: <variantId>, qty: <n> }] }
   Builds the order from live store prices and creates a Razorpay Magic Checkout order. */
const { cfg, cors, send, body, rzp, catalog } = require('./_lib');

module.exports = async (req, res) => {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return send(res, 405, { error: 'POST only' });
  try {
    const c = cfg();
    const b = await body(req);
    const items = Array.isArray(b.items) ? b.items.slice(0, 20) : [];
    if (!items.length) return send(res, 400, { error: 'Your basket is empty.' });

    const cat = await catalog();
    const lines = [], merged = new Map();
    items.forEach(i => {                       // merge duplicates, clamp quantity
      const id = String(i.id), q = Math.floor(Number(i.qty));
      if (!(q >= 1)) return;
      merged.set(id, Math.min(20, (merged.get(id) || 0) + q));
    });
    for (const [id, qty] of merged) {
      const hit = cat.get(id);
      if (!hit) return send(res, 400, { error: 'An item in your basket is no longer sold. Please refresh the page.' });
      const { p, v } = hit;
      if (v.available === false) return send(res, 409, { error: p.title + ' is out of stock right now.' });
      const price = Math.round(parseFloat(v.price) * 100);
      const title = v.title && v.title !== 'Default Title' ? p.title + ' - ' + v.title : p.title;
      const line = {
        sku: String(v.sku || v.id), variant_id: String(v.id),
        price: price, offer_price: price, quantity: qty,
        name: title.slice(0, 120),
        description: String(p.title).slice(0, 120),
        product_url: c.shop + '/products/' + p.handle
      };
      const img = (v.featured_image && v.featured_image.src) || (p.images && p.images[0] && p.images[0].src);
      if (img) line.image_url = img;
      if (v.grams) line.weight = Number(v.grams);
      lines.push(line);
    }
    if (!lines.length) return send(res, 400, { error: 'Your basket is empty.' });

    const total = lines.reduce((s, l) => s + l.offer_price * l.quantity, 0);
    if (total < 100) return send(res, 400, { error: 'Order total is too low.' });
    const receipt = 'PH-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase();

    const order = await rzp('/orders', {
      method: 'POST',
      body: JSON.stringify({
        amount: total, currency: 'INR', receipt,
        line_items_total: total, line_items: lines,
        notes: {
          source: 'purpleherb.in',
          items: lines.map(l => l.quantity + 'x ' + l.name).join('; ').slice(0, 250)
        }
      })
    });
    return send(res, 200, { order_id: order.id, receipt, amount: total, key_id: c.keyId });
  } catch (e) {
    console.error('create-order', e.message);
    return send(res, 502, { error: 'We could not start checkout just now. Please try again in a moment.' });
  }
};
