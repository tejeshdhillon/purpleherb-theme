/* POST /api/verify  body: Razorpay's handler response.
   Confirms with Razorpay itself (signature + order status), so the thank-you screen is never shown for an unpaid order. */
const { cors, send, body, fetchOrder, signatureOk } = require('./_lib');

module.exports = async (req, res) => {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return send(res, 405, { error: 'POST only' });
  try {
    const b = await body(req);
    const oid = String(b.razorpay_order_id || ''), pid = String(b.razorpay_payment_id || '');
    if (!oid) return send(res, 400, { ok: false });
    const order = await fetchOrder(oid);
    if (!String(order.receipt || '').startsWith('PH-')) return send(res, 400, { ok: false });
    const sig = signatureOk(oid, pid, b.razorpay_signature);
    const paid = order.status === 'paid', placed = order.status === 'placed'; // placed = Cash on Delivery
    const ok = paid || placed || (sig && order.status !== 'created');
    return send(res, ok ? 200 : 402, { ok, status: order.status, cod: placed, receipt: order.receipt });
  } catch (e) {
    console.error('verify', e.message);
    // The payment itself is safe at Razorpay; only our check failed. Tell the page to say so honestly.
    return send(res, 502, { ok: false, unknown: true });
  }
};
