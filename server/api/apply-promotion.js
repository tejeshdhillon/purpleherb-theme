/* Razorpay calls this when a customer enters a coupon. Returns the discount in paise. */
const { cfg, send, body, fetchOrder } = require('./_lib');

module.exports = async (req, res) => {
  try {
    const b = await body(req);
    const code = String(b.code || '').trim().toUpperCase();
    const coupon = cfg().coupons.find(x => x && String(x.code).toUpperCase() === code);
    if (!coupon) return send(res, 400, { failure_code: 'INVALID_PROMOTION', failure_reason: 'This code is not valid.' });

    let subtotal = 0;
    const id = b.razorpay_order_id || b.order_id_rzp;
    if (id) { try { subtotal = Number((await fetchOrder(id)).line_items_total || 0); } catch (e) { console.error('promo order lookup', e.message); } }
    const min = Math.round(Number(coupon.minCart || 0) * 100);
    if (subtotal && subtotal < min) return send(res, 400, { failure_code: 'REQUIREMENT_NOT_MET', failure_reason: 'Add items worth Rs ' + coupon.minCart + ' or more to use this code.' });

    let value = coupon.type === 'percent' ? Math.round(subtotal * Number(coupon.value) / 100) : Math.round(Number(coupon.value) * 100);
    if (coupon.maxDiscount) value = Math.min(value, Math.round(Number(coupon.maxDiscount) * 100));
    if (!(value > 0)) return send(res, 400, { failure_code: 'REQUIREMENT_NOT_MET', failure_reason: 'This code does not apply to your basket.' });
    return send(res, 200, { promotion: { reference_id: code, type: 'coupon', code, value, value_type: 'fixed_amount', description: coupon.summary || code } });
  } catch (e) {
    console.error('apply-promotion', e.message);
    return send(res, 500, { failure_code: 'INVALID_PROMOTION', failure_reason: 'Could not check this code. Please try again.' });
  }
};
