# purpleherb checkout server

A tiny Vercel project that lets the theme open **Razorpay Magic Checkout** without Shopify's checkout.
Razorpay keeps your orders, customers and addresses. Shopify only hosts the site.

## One-time setup

1. **Vercel**: New Project > import this GitHub repo > set **Root Directory** to `server` > Deploy.
2. **Environment variables** (Vercel > Settings > Environment Variables), then redeploy:

| Name | Example | Meaning |
|---|---|---|
| `RZP_KEY_ID` | `rzp_test_...` | Razorpay key id (test first, live at go-live) |
| `RZP_KEY_SECRET` | | Razorpay key secret. Only ever put this in Vercel |
| `SHOP_ORIGIN` | `https://purpleherb.in` | Where prices are read from |
| `ALLOWED_ORIGINS` | `https://purpleherb.in,https://www.purpleherb.in` | Sites allowed to call the server |
| `SHIPPING_FEE` | `80` | Shipping in rupees (0 = free) |
| `FREE_SHIPPING_ABOVE` | `1500` | Free shipping from this basket value (0 = no threshold) |
| `COD_ENABLED` | `true` | Cash on Delivery (Razorpay Support must also enable it) |
| `COD_FEE` | `40` | COD fee in rupees |
| `COD_MAX_ORDER` | `0` | Highest COD order in rupees (0 = no limit) |
| `BLOCKED_PINCODES` | `110001,400001` | Pincodes you do not deliver to |
| `COUPONS` | see below | Coupon codes |

3. **Razorpay dashboard** (Magic Checkout > Platform Setup > Custom E-Commerce Platform). Use your Vercel address, e.g. `https://purpleherb-checkout.vercel.app`:
   - Coupon Settings > URL for get promotions: `.../api/promotions`
   - Coupon Settings > URL for apply promotions: `.../api/apply-promotion`
   - Shipping Setup > Shipping service type **API** > URL for shipping info: `.../api/shipping-info`
   - Do the same in **Live mode** when you go live.
4. **Shopify theme editor** > Theme settings > Checkout & login > **Checkout server address** = your Vercel address (no slash at the end).
5. Open `https://<your-vercel-address>/api/health`. It should show `"keys": true`.

## Coupons

`COUPONS` is a JSON list, amounts in rupees:

```json
[{"code":"WELCOME10","type":"percent","value":10,"minCart":500,"maxDiscount":300,"summary":"10% off your first order"},
 {"code":"FLAT100","type":"fixed","value":100,"minCart":999,"summary":"Rs 100 off"}]
```

## What each file does

- `api/create-order.js` builds the order from live store prices (never from the browser) and creates it at Razorpay.
- `api/shipping-info.js` answers Razorpay's delivery, fee and COD question per address.
- `api/promotions.js`, `api/apply-promotion.js` coupons.
- `api/verify.js` confirms the payment with Razorpay before the thank-you screen shows.
- `api/health.js` quick check.

Prices come from `SHOP_ORIGIN/products.json`, so products must stay published on the Shopify store.
