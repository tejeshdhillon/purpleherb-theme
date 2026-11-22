# purpleherb Shopify theme

Theme files sit at the top level (assets, config, layout, locales, sections, snippets, templates), as Shopify's GitHub connection expects.

Checkout and login are handled by a third-party service: see `snippets/ph-integrations.liquid`.
Adding a product to the full design: see `assets/catalog.js`, `snippets/ph-live-data.liquid`, `sections/ph-product.liquid`.

## Checkout (Razorpay Magic Checkout)
Checkout runs on Razorpay through the small server in `server/` (setup steps in `server/README.md`).
Until "Checkout server address" is filled in Theme settings, the theme uses Shopify's standard checkout.
