# Verification — 12 October 2026

- Recovered 81 sitemap pages and 1,515 assets (images, videos, fonts, styles, scripts, geographic data and animation frames).
- All HTML local src/href targets resolve to files or page index files.
- Desktop homepage visually inspected: original globe, typography, layout, preloader and scrolling crane sequence render.
- Mobile viewport 390 × 844 inspected: homepage and animated menu render; About navigation transition and background video work.
- FAQ expansion verified after fixing a recovered ScrollTrigger edge case triggered by rapidly jumping across sections. The fix skips already-removed trigger entries during refresh.
- Integrity hashes recalculated for migrated local styles and scripts.
- Form/checkout submissions disabled with an explanatory message until services are reconnected. No live submissions or payments tested.
- One pre-existing generic Webflow placeholder URL returns 403. Real content assets were recovered; the inaccessible placeholder remains an external reference.

## Limits

This is a recovery of the published front end. It is not the original editable Webflow project or unbundled source tree. Visual inspection covered representative desktop/mobile flows, not every page, device, animation frame or browser. A 100% pixel/timing match across all environments is not certified.

Cookie consent, Finsweet attributes, Stripe UI and external service links retain third-party dependencies and may require domain/account configuration. CMS editing, checkout, orders and form delivery are not restored backend services.
