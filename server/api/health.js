const { cfg, send } = require('./_lib');
module.exports = (req, res) => { const c = cfg(); send(res, 200, { ok: true, keys: !!(c.keyId && c.keySecret), shop: c.shop, cod: c.codOn }); };
