#!/usr/bin/env python3
"""
Builds the priority internal-link map from two Google Search Console exports:

  * Coverage Drilldown  -> "Discovered - currently not indexed" URLs
  * Coverage Valid      -> "Valid indexed" URLs

The output (src/data/internal-links/priority-pages.json) assigns every
non-indexed product page to relevant indexed product pages of the same brand
and category, and gives brand/category hubs a curated list of their own
non-indexed part numbers.

Usage:
    python3 scripts/generate-priority-internal-links.py \
        /path/to/Coverage-Drilldown.xlsx \
        /path/to/Coverage-Valid-indexed-page.xlsx

Only the Python standard library is used, so no pip install is required.
"""

import collections
import json
import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "src/data/internal-links/priority-pages.json"

# Maximum number of internal links added to a single product page.
LINKS_PER_PRODUCT = 8
# Maximum number of links shown in a brand/category hub block.
LINKS_PER_HUB = 30

NS = {
    "m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
}


# ---------------------------------------------------------------------------
# Minimal .xlsx reader (shared strings + cells)
# ---------------------------------------------------------------------------


def _col_index(ref: str) -> int:
    match = re.match(r"([A-Z]+)", ref)
    index = 0
    for char in match.group(1):
        index = index * 26 + (ord(char) - 64)
    return index - 1


def read_xlsx(path: Path) -> dict[str, list[list[str]]]:
    workbook = zipfile.ZipFile(path)

    shared: list[str] = []
    if "xl/sharedStrings.xml" in workbook.namelist():
        root = ET.fromstring(workbook.read("xl/sharedStrings.xml"))
        for item in root.findall("m:si", NS):
            shared.append("".join(node.text or "" for node in item.iter("{%s}t" % NS["m"])))

    workbook_xml = ET.fromstring(workbook.read("xl/workbook.xml"))
    rels = ET.fromstring(workbook.read("xl/_rels/workbook.xml.rels"))
    rel_map = {rel.get("Id"): rel.get("Target") for rel in rels}

    sheets: dict[str, list[list[str]]] = {}
    for sheet in workbook_xml.find("m:sheets", NS):
        target = rel_map[sheet.get("{%s}id" % NS["r"])]
        if not target.startswith("xl/"):
            target = "xl/" + target.lstrip("/")

        root = ET.fromstring(workbook.read(target))
        rows: list[list[str]] = []
        for row in root.iter("{%s}row" % NS["m"]):
            cells: dict[int, str] = {}
            for cell in row.findall("m:c", NS):
                cell_index = _col_index(cell.get("r"))
                value = cell.find("m:v", NS)
                inline = cell.find("m:is", NS)
                cell_type = cell.get("t")

                if cell_type == "s" and value is not None:
                    text = shared[int(value.text)]
                elif cell_type == "inlineStr" and inline is not None:
                    text = "".join(node.text or "" for node in inline.iter("{%s}t" % NS["m"]))
                elif value is not None:
                    text = value.text or ""
                else:
                    text = ""
                cells[cell_index] = text

            if cells:
                rows.append([cells.get(i, "") for i in range(max(cells) + 1)])
        sheets[sheet.get("name")] = rows

    return sheets


# ---------------------------------------------------------------------------
# Catalogue normalisation (mirrors src/lib/catalog/normalize.ts)
# ---------------------------------------------------------------------------


def slugify(value: str) -> str:
    value = (value or "").lower().strip()
    return re.sub(r"[^a-z0-9]+", "-", value).strip("-")


def normalize_part(value: str) -> str:
    return re.sub(r"\s+", " ", (value or "").strip()).upper()


def build_product_map() -> dict[str, dict[str, str]]:
    curated = json.loads((ROOT / "src/data/static/products/products.json").read_text())
    legacy = json.loads((ROOT / "src/data/static/products/legacy-catalog.json").read_text())

    products: dict[str, dict[str, str]] = {}
    seen_parts = set()
    seen_slugs = set()
    suffix: collections.Counter[str] = collections.Counter()

    def add(raw: dict, is_legacy: bool) -> None:
        part = normalize_part(raw.get("part", ""))
        if is_legacy and part.lower() in seen_parts:
            return
        seen_parts.add(part.lower())

        slug = slugify(f"{raw.get('brand', '')}-{raw.get('part', '')}")
        if slug in seen_slugs:
            suffix[slug] += 1
            slug = f"{slug}-{suffix[slug]}"
        seen_slugs.add(slug)

        products[slug] = {
            "slug": slug,
            "brand": raw.get("brand", ""),
            "brandSlug": slugify(raw.get("brand", "")),
            "part": part,
            "category": raw.get("category", ""),
            "categorySlug": slugify(raw.get("category", "")),
        }

    for raw in curated:
        add(raw, False)
    for raw in legacy:
        add(raw, True)
    return products


def product_slug(url: str):
    match = re.match(r"https://www\.agoaviation\.com/products/([^/?#]+)", url)
    return match.group(1).lower() if match else None


def read_urls(path: Path) -> list[str]:
    sheet = read_xlsx(path)
    rows = sheet.get("Table") or next(iter(sheet.values()))
    return [row[0].strip() for row in rows[1:] if row and row[0].strip()]


def main() -> None:
    if len(sys.argv) != 3:
        print(__doc__)
        raise SystemExit(1)

    products = build_product_map()

    drilldown = []
    for url in read_urls(Path(sys.argv[1])):
        slug = product_slug(url)
        if slug and slug in products:
            drilldown.append(products[slug])

    indexed = []
    seen_sources = set()
    for url in read_urls(Path(sys.argv[2])):
        slug = product_slug(url)
        if not slug or slug not in products or slug in seen_sources:
            continue
        seen_sources.add(slug)
        indexed.append(products[slug])

    # Never link a page to itself.
    target_slugs = {item["slug"] for item in drilldown}
    sources = [item for item in indexed if item["slug"] not in target_slugs]

    by_brand: dict[str, list[dict]] = collections.defaultdict(list)
    by_pair: dict[tuple[str, str], list[dict]] = collections.defaultdict(list)
    by_category: dict[str, list[dict]] = collections.defaultdict(list)
    for source in sources:
        by_brand[source["brandSlug"]].append(source)
        by_pair[(source["brandSlug"], source["categorySlug"])].append(source)
        by_category[source["categorySlug"]].append(source)

    for bucket in (*by_brand.values(), *by_pair.values(), *by_category.values()):
        bucket.sort(key=lambda item: item["slug"])

    load: collections.Counter[str] = collections.Counter()
    product_links: dict[str, list[str]] = collections.defaultdict(list)
    unassigned: list[str] = []

    for target in sorted(drilldown, key=lambda item: item["slug"]):
        tiers = [
            by_pair.get((target["brandSlug"], target["categorySlug"])) or [],
            by_brand.get(target["brandSlug"]) or [],
            by_category.get(target["categorySlug"]) or [],
        ]
        candidates = next((tier for tier in tiers if tier), [])
        available = next(
            (
                [item for item in tier if load[item["slug"]] < LINKS_PER_PRODUCT]
                for tier in tiers
                if any(load[item["slug"]] < LINKS_PER_PRODUCT for item in tier)
            ),
            [],
        )
        if not available:
            if not candidates:
                unassigned.append(target["slug"])
                continue
            # Capacity is only exceeded if every relevant indexed page is full.
            available = sorted(
                {item["slug"]: item for tier in tiers for item in tier}.values(),
                key=lambda item: item["slug"],
            )

        # Least-loaded source first; slug breaks ties deterministically.
        source = min(available, key=lambda item: (load[item["slug"]], item["slug"]))
        product_links[source["slug"]].append(target["slug"])
        load[source["slug"]] += 1

    brand_links: dict[str, list[str]] = {}
    category_links: dict[str, list[str]] = {}
    for brand_slug in sorted({item["brandSlug"] for item in drilldown}):
        brand_links[brand_slug] = [
            item["slug"]
            for item in sorted(drilldown, key=lambda x: (x["brandSlug"], x["part"]))
            if item["brandSlug"] == brand_slug
        ][:LINKS_PER_HUB]
    for category_slug in sorted({item["categorySlug"] for item in drilldown}):
        category_links[category_slug] = [
            item["slug"]
            for item in sorted(drilldown, key=lambda x: (x["categorySlug"], x["part"]))
            if item["categorySlug"] == category_slug
        ][:LINKS_PER_HUB]

    payload = {
        "generatedAt": "2026-11-19",
        "sources": {
            "drilldown": Path(sys.argv[1]).name,
            "indexed": Path(sys.argv[2]).name,
        },
        "counts": {
            "drilldown": len(drilldown),
            "indexedProductPages": len(sources),
            "assigned": len(drilldown) - len(unassigned),
            "unassigned": len(unassigned),
        },
        "productLinks": {key: value for key, value in sorted(product_links.items())},
        "brandLinks": brand_links,
        "categoryLinks": category_links,
    }

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(payload, indent=2) + "\n")

    print(f"Wrote {OUTPUT.relative_to(ROOT)}")
    print(json.dumps(payload["counts"], indent=2))
    if unassigned:
        print("Unassigned (covered by hub links only):")
        for slug in unassigned:
            print(" -", slug)


if __name__ == "__main__":
    main()
