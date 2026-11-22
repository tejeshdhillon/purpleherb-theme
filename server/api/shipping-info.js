/* Razorpay calls this (register it under Magic Checkout > Shipping Setup > API).
   For each saved address it needs: can we deliver, what is the fee, is COD allowed. */
const { cfg, send, body, fetchOrder } = require('./_lib');

module.exports = async (req, res) => {
  try {
    const c = cfg();
    const b = await body(req);
    let subtotal = 0;
    try { if (b.razorpay_order_id) subtotal = Number((await fetchOrder(b.razorpay_order_id)).line_items_total || 0); } catch (e) { console.error('shipping order lookup', e.message); }
    const fee = c.freeAbove > 0 && subtotal >= c.freeAbove ? 0 : c.shipFee;
    const out = (b.addresses || []).map(a => {
      const pin = String(a.zipcode || '');
      const ok = String(a.country || 'IN').toUpperCase() === 'IN' && /^[1-9][0-9]{5}$/.test(pin) && !c.blocked.includes(pin);
      const cod = ok && c.codOn && !(c.codMax > 0 && subtotal > c.codMax);
      return {
        id: String(a.id), zipcode: pin, state_code: a.state_code, country: a.country || 'IN',
        shipping_methods: [{
          id: '1', name: 'Standard delivery',
          description: fee === 0 ? 'Free shipping' : 'Delivered to your door',
          serviceable: ok, shipping_fee: ok ? fee : 0,
          cod: cod, cod_fee: cod ? c.codFee : 0
        }]
      };
    });
    return send(res, 200, { addresses: out });
  } catch (e) {
    console.error('shipping-info', e.message);
    return send(res, 500, { error: 'shipping lookup failed' });
  }
};
