/* Razorpay calls this to list coupons. Coupons live in the COUPONS setting (see README). */
const { cfg, send } = require('./_lib');

module.exports = async (req, res) => {
  const list = cfg().coupons.filter(x => x && x.code && x.hidden !== true).map(x => ({
    code: String(x.code).toUpperCase(),
    summary: x.summary || (x.type === 'percent' ? x.value + '% off' : 'Rs ' + x.value + ' off'),
    description: x.description || x.summary || ''
  }));
  return send(res, 200, { promotions: list });
};
