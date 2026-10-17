"""Last-pass cleanup: any leaf text still mentioning freight terms becomes neutral placeholder copy.

Usage: python3 -I tools/sanitize.py dist   (run after rebrand.py and news_shop.py; idempotent)
"""
import html
import re
import sys
from pathlib import Path

PAT = re.compile(r"freight|cargo|shipment|shipping|carrier|APAC|logistic|customs|importer|supply chain|"
                 r"\bUC\b|UC’s|tariff|container|warehous|CargoWise|Lebon|reefer|trucknews|loadstar", re.I)
LEAF = re.compile(r">((?:[^<>]|<br\s*/?>)+)<")


def fix(m):
    inner = m.group(1)
    t = re.sub(r"\s+", " ", html.unescape(re.sub(r"<br\s*/?>", " ", inner))).strip()
    if not t or not PAT.search(t):
        return m.group(0)
    t2 = re.sub(r"united carriers", "Arrival", t, flags=re.I)
    if not PAT.search(t2):
        out = t2
    elif t.startswith("http") or t.startswith("/"):
        out = "#"
    elif len(t) <= 40:
        out = "Placeholder"
    else:
        out = "Placeholder text — replace with Arrival content."
    return ">" + html.escape(out, quote=False) + "<"


for page in sorted(Path(sys.argv[1]).rglob("index.html")):
    doc = page.read_text(encoding="utf-8")
    k = doc.find("<body")
    if k < 0:
        continue
    body = re.split(r"(<(?:script|style|svg)\b.*?</(?:script|style|svg)>)", doc[k:], flags=re.S)
    body = [p if i % 2 else LEAF.sub(fix, p) for i, p in enumerate(body)]
    new = doc[:k] + "".join(body)
    if new != doc:
        page.write_text(new, encoding="utf-8")
        print("cleaned", page.parent)
