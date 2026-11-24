# purpleherb Shopify theme

Theme files sit at the top level (assets, config, layout, locales, sections, snippets, templates), as Shopify's GitHub connection expects.

Checkout and login are handled by a third-party service: see `snippets/ph-integrations.liquid`.
Adding a product to the full design: see `assets/catalog.js`, `snippets/ph-live-data.liquid`, `sections/ph-product.liquid`.

## Checkout (Razorpay Magic Checkout)
Checkout runs on Razorpay through the small server in `server/` (setup steps in `server/README.md`).
Until "Checkout server address" is filled in Theme settings, the theme uses Shopify's standard checkout.

## Scroll story (Sea Buckthorn Pure Pulp)
`assets/product-story.js` tells the product's journey as you scroll: the drone flight down a Ladakh valley, the berries on the thorn, the harvest into the bottle, the spin from berries to pulp, GMP packing and the road home, then a closing promise with Add to basket.
- It replaces the "region" and "journey" sections for products with `scrollStory: true` in `assets/catalog.js`; `layout/theme.liquid` loads the script only for the `sea-buckthorn-juice` product.
- The drone flight and the berry-to-pulp spin play as short films: the page holds while they play and replays them in reverse when you scroll back. Skip or Esc ends one early. With reduced motion turned on they don't hold the page.
- The words are in the `CAPS` list at the top of the file. The bottle, its print and the box are cut from the product photos: `sb-bottle.webp`, `sb-print.webp`, `sb-box.webp`, `sb-box-side.webp`.
