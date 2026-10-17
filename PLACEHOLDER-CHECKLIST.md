# Placeholder checklist — Aurum Residences

Everything below is sample data. Replace it before the site goes live.
Most of the copy lives in `tools/rebrand_content.py`. To re-apply it, run these from the project root, in this order:

    python3 -I tools/rebrand.py dist
    python3 -I tools/news_shop.py dist
    python3 -I tools/sanitize.py dist

## Brand
- [ ] Brand name "Aurum Residences" / developer "Aurum Realty" (`BRAND`, `DEVELOPER`)
- [ ] Header logo: text wordmark "AURUM" (`LOGO_HTML`); loader logo (CSS `::after` in `rr-brand-style2`)
- [ ] Footer wordmark images `dist/assets/rr/brand/wordmark-*.png`
- [ ] Favicon and og:image (still the original files)

## Contact
- [ ] Email `sales@aurumresidences.example`
- [ ] Phone `+91 00000 00000`
- [ ] Site address and map

## Project data
- [ ] Residence types, sizes, prices (Residences page `/services`)
- [ ] 12 amenities (`/industries`)
- [ ] Neighbourhood copy (`/community`), with distances to be confirmed
- [ ] RERA registration number (`/qhse` → RERA Disclosures)
- [ ] FAQ answers (homepage)
- [ ] Testimonials: all are marked as placeholders

## Content
- [ ] 28 news articles, all titled "(sample article)", with placeholder bodies
- [ ] Privacy policy and terms (placeholder text, needs legal review)
- [ ] Careers: job listings hidden; the page copy is placeholder
- [ ] Any "Placeholder" or "Placeholder text — replace…" strings, which `sanitize.py` left where freight copy was

## Imagery (still freight: needs real project photos/renders)
- [ ] Page hero photos (e.g. the container port on `/services`)
- [ ] Section and card images on About, Services, Industries, Insights
- [ ] Loader world map

## Known leftovers
- Article URL slugs still contain freight words (e.g. `/insights/china-australia-ocean-freight-…`). They are not visible, but should be renamed once real articles exist.
