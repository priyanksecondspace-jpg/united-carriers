"""Replace freight copy with real-estate placeholder copy across the static site.

Usage: python3 tools/rebrand.py dist
Text is matched per leaf element (text, <br> and &nbsp; only), after collapsing whitespace.
Mappings live in rebrand_content.py: GLOBAL applies to every page, PAGES[path] to one page.
"""
import html
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from rebrand_content import GLOBAL, PAGES, ATTR, HREF, HEAD_TITLE, HEAD_DESC, LOGO_HTML, EXTRA_CSS, BRAND, PREFIX, RAW  # noqa: E402

LEAF = re.compile(r">((?:[^<>]|<br\s*/?>)+)<")


def norm(s):
    s = re.sub(r"<br\s*/?>", " ", s)
    s = html.unescape(s).replace(" ", " ").replace("‍", "")
    return re.sub(r"\s+", " ", s).strip()


def render(v):
    return "<br/>".join(html.escape(part, quote=False) for part in v.split("\n"))


def apply_text(doc, mapping, stats):
    def sub(m):
        inner = m.group(1)
        key = norm(inner)
        val = mapping.get(key)
        if val is None:
            for p, v in PREFIX.items():
                if key.startswith(p):
                    val = v
                    break
        if val is not None:
            stats[key] = stats.get(key, 0) + 1
            lead = re.match(r"\s*", inner).group(0)
            return ">" + lead + render(val) + "<"
        return m.group(0)

    head_end = doc.find("<body")
    return doc[:head_end] + LEAF.sub(sub, doc[head_end:])


def apply_head(doc, rel):
    title, desc = HEAD_TITLE.get(rel), HEAD_DESC.get(rel)
    if title:
        doc = re.sub(r"<title>.*?</title>", f"<title>{html.escape(title)}</title>", doc, count=1, flags=re.S)
        doc = re.sub(r'(<meta content=")[^"]*(" property="og:title"/>)', lambda m: m.group(1) + html.escape(title) + m.group(2), doc)
        doc = re.sub(r'(<meta content=")[^"]*(" name="twitter:title"/>)', lambda m: m.group(1) + html.escape(title) + m.group(2), doc)
    if desc:
        for attr in ('name="description"', 'property="og:description"', 'name="twitter:description"'):
            doc = re.sub(r'(<meta content=")[^"]*(" ' + attr + r'/>)', lambda m: m.group(1) + html.escape(desc) + m.group(2), doc)
    head_end = doc.find("<body")
    head = doc[:head_end].replace("United Carriers", BRAND)
    doc = head + doc[head_end:]
    # structured data described a real freight company (address, ratings); drop it
    doc = re.sub(r'<script type="application/ld\+json">.*?</script>', "", doc, flags=re.S)
    return doc


def apply_attrs(doc):
    for old, new in RAW.items():
        doc = doc.replace(old, new)
    for old, new in HREF.items():
        doc = doc.replace(f'href="{old}"', f'href="{new}"')
    for old, new in ATTR.items():
        doc = doc.replace(f'alt="{old}"', f'alt="{html.escape(new)}"')
        doc = doc.replace(f'placeholder="{old}"', f'placeholder="{html.escape(new)}"')
        doc = doc.replace(f'aria-label="{old}"', f'aria-label="{html.escape(new)}"')
    return doc


def apply_logo(doc):
    return re.sub(
        r'(<a [^>]*class="header-logo[^"]*"[^>]*>).*?(</a>)',
        lambda m: m.group(1) + LOGO_HTML + m.group(2),
        doc,
        count=1,
        flags=re.S,
    )


def main(root):
    root = Path(root)
    report = {}
    for page in sorted(root.rglob("index.html")):
        rel = str(page.parent.relative_to(root)).replace("\\", "/")
        rel = "" if rel == "." else rel
        doc = page.read_text(encoding="utf-8")
        before = doc
        stats = {}
        mapping = dict(GLOBAL)
        mapping.update(PAGES.get(rel, {}))
        doc = apply_text(doc, mapping, stats)
        doc = apply_head(doc, rel)
        doc = apply_attrs(doc)
        doc = apply_logo(doc)
        if 'id="rr-brand-style"' not in doc:
            k = doc.rfind("</head>", 0, doc.find("<body"))
            doc = doc[:k] + EXTRA_CSS + doc[k:]
        if doc != before:
            page.write_text(doc, encoding="utf-8")
        report[rel or "/"] = sum(stats.values())
    for k, v in report.items():
        print(f"{v:4d}  {k}")


if __name__ == "__main__":
    main(sys.argv[1])
