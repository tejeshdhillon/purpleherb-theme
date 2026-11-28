# purpleherb Shopify theme

Theme files sit at the top level (assets, config, layout, locales, sections, snippets, templates), as Shopify's GitHub connection expects.

Checkout and login are handled by a third-party service: see `snippets/ph-integrations.liquid`.
Adding a product to the full design: see `assets/catalog.js`, `snippets/ph-live-data.liquid`, `sections/ph-product.liquid`.

## Branches
- `main` — the theme with no checkout app code.
- `razorpay-magic-checkout` — `main` plus Razorpay Magic Checkout (`snippets/razorpay-magic-checkout.liquid` and one `render` line before `</body>` in `layout/theme.liquid`).
Make design changes on `main`, then merge `main` into `razorpay-magic-checkout` (`git checkout razorpay-magic-checkout && git merge main`).
