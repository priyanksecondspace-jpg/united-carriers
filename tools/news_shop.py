"""Second pass: placeholder article bodies, shop pages redirected, legal pages marked as placeholders."""
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from rebrand_content import NEWS_BODY, NEWS_INTRO, BRAND  # noqa: E402

REDIRECT = """<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><title>{brand}</title>
<meta http-equiv="refresh" content="0; url=/"/><link rel="canonical" href="/"/></head>
<body><p>This page is not part of the {brand} website. <a href="/">Go to the homepage</a>.</p></body></html>
"""
SHOP = ["cart", "checkout", "order-confirmation", "paypal-checkout", "merchandises", "payment-policy",
        "delivery-shipping-policy", "refund-returns-policy", "linkedin"]
LEGAL = {"privacy-policy": "Privacy Policy", "terms-conditions": "Terms & Conditions", "qhse": "RERA Disclosures"}


def main(root):
    root = Path(root)
    for p in sorted(root.glob("insights/*/index.html")):
        d = p.read_text(encoding="utf-8")
        d2 = re.sub(r'(<div class="tp-insight-hero-content w-richtext">).*?(</div>)(?=</div>)', lambda m: m.group(1) + NEWS_BODY + m.group(2), d, count=1, flags=re.S)
        d2 = re.sub(r'(<div class="tp-insight-hero-intro"><div[^>]*>).*?(</div>)', lambda m: m.group(1) + NEWS_INTRO + m.group(2), d2, count=1, flags=re.S)
        if d2 != d:
            p.write_text(d2, encoding="utf-8")
    for name in SHOP + [str(x.parent.relative_to(root)) for x in root.glob("product/*/index.html")]:
        f = root / name / "index.html"
        if f.exists():
            f.write_text(REDIRECT.format(brand=BRAND), encoding="utf-8")
    for name, title in LEGAL.items():
        f = root / name / "index.html"
        d = f.read_text(encoding="utf-8")
        body = (f"<h2>{title}</h2><p>Placeholder. Add {BRAND}'s {title.lower()} here before publishing. "
                "This page previously contained another company's policy and has been cleared.</p>")
        d2, n = re.subn(r'(<div class="[^"]*w-richtext[^"]*">)(?:(?!<div class="footer).)*?(</div>)', lambda m: m.group(1) + body + m.group(2), d, count=1, flags=re.S)
        if n:
            f.write_text(d2, encoding="utf-8")
        print(name, "legal body replaced" if n else "NO richtext found")


if __name__ == "__main__":
    main(sys.argv[1])
