#!/usr/bin/env python3
"""
Import every real part number from the legacy AGO Aviation HTML site into the
Next.js catalogue.

The legacy site stores parts in three places:

1. Individual product pages with schema.org Product JSON-LD (sku/mpn, brand,
   category, legacy URL). These are authoritative.
2. Large catalogue tables (turbine-Parts.html, ge-turbine.html,
   ge-power-services.html, LM2500/LM6000, PW FT8, ge-modules, stock pages).
3. Brand/stock pages with a Part Number column.

Synthetic pages are deliberately ignored:
  * gt-parts-page-*.html
  * siemens-parts-page-*.html
  * gt13e2-gt8c1-2-parts-catalog.html
  * siemens-sgt-gas-turbine-parts.html
  * siemens-v942-gas-turbine-parts.html

Rows containing "Template row", "Placeholder" or "populate from OEM BOM" are
also skipped even when they live on an otherwise real page.

Usage:
    python3 scripts/import-legacy-catalog.py \
        --source /path/to/agoaviation-html \
        --out src/data/static/products/legacy-catalog.json \
        --brands-out src/data/static/brands/brands.json
"""

from __future__ import annotations

import argparse
import html
import json
import os
import re
import sys
from collections import Counter, defaultdict

# ---------------------------------------------------------------------------
# Source exclusions
# ---------------------------------------------------------------------------

EXCLUDED_FILE_PATTERNS = [
    re.compile(r"^gt-parts-page-.*\.html$", re.I),
    re.compile(r"^siemens-parts-page-.*\.html$", re.I),
    re.compile(r"^gt13e2-gt8c1-2-parts-catalog\.html$", re.I),
    re.compile(r"^siemens-sgt-gas-turbine-parts\.html$", re.I),
    re.compile(r"^siemens-v942-gas-turbine-parts\.html$", re.I),
    re.compile(r"^surplus-power-generation-equipment\.html$", re.I),
]


def is_excluded_file(filename: str) -> bool:
    return any(pattern.search(filename) for pattern in EXCLUDED_FILE_PATTERNS)


# ---------------------------------------------------------------------------
# HTML helpers
# ---------------------------------------------------------------------------

def cell_values(row: str) -> list[str]:
    cells = re.findall(r"<t[dh][^>]*>([\s\S]*?)</t[dh]>", row, re.I)
    return [
        re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", c))).strip()
        for c in cells
    ]


def find_col(headers: list[str], patterns: list[str]) -> int | None:
    for index, header in enumerate(headers):
        value = header.lower().strip()
        for pattern in patterns:
            if re.search(pattern, value):
                return index
    return None


# ---------------------------------------------------------------------------
# Part-number cleaning / validation
# ---------------------------------------------------------------------------

LEADING_BRAND = re.compile(
    r"^(?:"
    r"GE\s*/\s*NUOVO\s+PIGNONE|GENERAL\s+ELECTRIC|GE|"
    r"SIEMENS|ABB|METSO|NELES|WOODWARD|HONEYWELL|"
    r"BENTLY(?:\s+NEVADA)?|PANAMETRICS|FLENDER|ATLAS\s+COPCO|"
    r"ALLEN[\s-]BRADLEY|GUTOR|QUALITROL|SWAGELOK|"
    r"MILTON\s+ROY|ITT(?:\s+GOULDS)?|GOULDS|CHINT|BALDOR|"
    r"JAMESBURY|AAF|ZENITH|LESLIE|LAURENCE|FISHER|FLOWSERVE|"
    r"EMERSON|ASCO|PETER\s+PAUL|SOLAR|ALSTOM|ROLLS[\s-]ROYCE|"
    r"ZORYA|TURBOMECA|PRATT\s*&\s*WHITNEY|PW|FANUC|REXROTH|"
    r"SCHNEIDER"
    r")\s+",
    re.I,
)

SIZE_PREFIX = re.compile(r"^\d+(?:/\d+)?\s*['\"]\s*")

LABEL_PREFIX = re.compile(
    r"^(?:model|part|p/?n|oem|article|code|ref(?:erence)?)"
    r"\s*(?:no\.?|number|num|#)?\s*[:#=]?\s*",
    re.I,
)

DESC_WORDS = re.compile(
    r"\b(?:"
    r"VALVE|SOLENOID|BEARING|GASKET|SEAL|FILTER|PUMP|MOTOR|SWITCH|SENSOR|"
    r"TRANSMITTER|CONTROLLER|MODULE|CARD|ASSEMBLY|PLATE|RING|SHAFT|GEAR|"
    r"NOZZLE|BLADE|VANE|LINER|PIPE|FLANGE|FITTING|ADAPTER|ELBOW|TEE|UNION|"
    r"BOLT|NUT|WASHER|SCREW|SPRING|DIAPHRAGM|PACKING|O-RING|ELEMENT|"
    r"CARTRIDGE|ROTOR|IMPELLER|DIFFUSER|COUPLING|CLUTCH|BRAKE|REDUCER|"
    r"PINION|QUILL|HOUSING|COVER|BRACKET|SUPPORT|HOSE|TUBE|CONNECTOR|"
    r"TERMINAL|RELAY|BREAKER|FUSE|TRANSFORMER|BATTERY|CABLE|WIRE|HARNESS|"
    r"LAMP|LIGHT|HEATER|COOLER|FAN|BLOWER|COMPRESSOR|TURBINE|ENGINE|"
    r"GOVERNOR|ACTUATOR|POSITIONER|REGULATOR|INDICATOR|GAUGE|METER|"
    r"THERMOCOUPLE|RTD|PROBE|ANALYZER|DETECTOR|MONITOR|HALF|BEARING|"
    r"PISTON|CYLINDER|SPINDLE|BUSHING|SLEEVE|COLLAR|KEY|PIN|STUD"
    r")\b",
    re.I,
)

DESC_LIKE = re.compile(
    r"^\d+(?:\.\d+)?\s*"
    r"(?:WAY|VDC|VAC|V|A|HZ|MM|IN|INCH|NPT|CLASS|PSI|BAR|KW|HP|RPM|DEG|"
    r"°C|°F|LB|KG)\b",
    re.I,
)

EMBEDDED_PART = re.compile(
    r"(?:P/?N|PART\s*(?:NO\.?|NUMBER|#)|MODEL\s*(?:NO\.?|NUMBER|#)?|"
    r"OEM\s*(?:NO\.?|P/?N)?|REF(?:ERENCE)?)"
    r"\s*[:#=]?\s*([A-Z0-9][A-Z0-9\-\./]{2,40})",
    re.I,
)


def looks_part(raw: str) -> bool:
    """Heuristic used to find part-number columns in headerless tables."""
    value = (raw or "").strip()
    if not value or len(value) < 3 or len(value) > 60:
        return False
    if not re.search(r"\d", value):
        return False
    if not re.search(r"[A-Za-z]", value) and len(value) < 5:
        return False
    if len(value.split()) > 3 or value.count(" ") > 2:
        return False
    if any(ch in value for ch in ";,:()<>{}"):
        return False
    if " - " in value or ". " in value:
        return False
    if DESC_WORDS.search(value):
        return False
    if DESC_LIKE.search(value):
        return False
    if re.match(r"^(?:PCS|PC|EA|SET|KIT|NEW|USED|NA|N/A)$", value, re.I):
        return False
    if re.match(r"^\d+$", value) and len(value) < 4:
        return False
    if re.search(r"\b(?:PLACEHOLDER|TEMPLATE)\b", value, re.I):
        return False
    return True


def clean_part(raw: str) -> str:
    value = html.unescape(raw or "").strip()
    value = re.sub(r"^[\"'\s]+|[\"'\s]+$", "", value)
    value = re.sub(r"\s+", " ", value)

    # Remove "Model No.:", "P/N:", "OEM:" and similar labels.
    value = LABEL_PREFIX.sub("", value)

    # Supersession notes: keep the replacement as the canonical reference.
    superseded = re.search(r"IS\s+SUPERC?EDED\s+BY\s+(.+)$", value, re.I)
    if superseded:
        value = superseded.group(1).strip()

    # Remove generic list prefixes.
    value = re.sub(
        r"^(?:turbine\s+parts|gas\s+turbine\s+parts)\s+", "", value, flags=re.I
    )
    value = LEADING_BRAND.sub("", value)

    # Remove valve/pipe size prefixes such as 3/4" or 2'.
    value = SIZE_PREFIX.sub("", value)

    # Collapse accidentally duplicated part numbers such as
    # DS200ACNAG1ADS200ACNAG1ADD -> DS200ACNAG1ADD.
    if len(value) >= 8 and len(value) % 2 == 0:
        half = len(value) // 2
        if value[:half] == value[half:]:
            value = value[:half]

    # Remove trailing dates ("20/6 2018", "2018") from legacy titles.
    value = re.sub(r"\s+\d{1,2}/\d{1,2}(?:/\d{2,4})?\s+\d{4}$", "", value)
    value = re.sub(r"\s+\d{4}$", "", value)

    # Remove trailing list artefacts concatenated without a space.
    if len(value) > 8:
        value = re.sub(r"(?:TURBINE|GE)$", "", value, flags=re.I)

    # Remove trailing brand tokens.
    value = re.sub(
        r"\s+(?:GE|GENERAL\s+ELECTRIC|SIEMENS|ABB|METSO|WOODWARD|"
        r"HONEYWELL|FLENDER|TURBOMECA|FANUC)$",
        "",
        value,
        flags=re.I,
    )

    return re.sub(r"\s+", " ", value).strip(" -")


def valid_part(value: str) -> bool:
    if not value or len(value) < 3 or len(value) > 50:
        return False
    if not re.search(r"\d", value):
        return False
    if not re.search(r"[A-Za-z0-9]", value):
        return False
    if len(value.split()) > 4:
        return False
    if re.match(r"^(?:PCS|PC|EA|SET|KIT|NEW|USED|NA|N/A)$", value, re.I):
        return False
    if re.search(r"[<>{}]", value):
        return False
    clean = re.sub(r"\s+", "", value)
    if len(clean) < 4 and not re.search(r"[A-Z]", value, re.I):
        return False
    if re.search(r"\b(?:PLACEHOLDER|TEMPLATE|INVENTORY|STOCK|SERIES|MODEL "
                 r"SET|KIT|LIST|BULK)\b", value, re.I):
        return False
    word_count = len(re.findall(r"[A-Za-z0-9]+", value))
    if word_count > 10:
        parts_like = sum(1 for m in re.finditer(r"[A-Z0-9][A-Z0-9\-\./]{2,40}", value))
        if parts_like < 2:
            return False
    return True


def part_key(value: str) -> str:
    """Normalise for dedupe: case, whitespace and spaces around hyphens."""
    key = re.sub(r"\s*-\s*", "-", (value or "").upper())
    return re.sub(r"\s+", "", key)


# ---------------------------------------------------------------------------
# Canonical brands
# ---------------------------------------------------------------------------

BRAND_ALIASES: dict[str, list[str]] = {
    "GE": [
        "GE", "GENERAL ELECTRIC", "GE INDUSTRIAL", "GE SPEEDTRONICS MK VI",
        "GE SPEEDTRONIC", "SPEEDTRONIC", "SPEEDTRONICS",
        "GE MULTILIN", "MULTILIN", "GE ENERGY", "GENERAL ELECTRIC COMPANY",
    ],
    "Siemens": [
        "SIEMENS", "SIEMENS ENERGY", "SIEMENS S7", "SIEMENS FIRE", "SIEMENS AG",
        "SKF/SIEMENS", "BOSCH/SIEMENS",
    ],
    "Pratt & Whitney": ["PRATT & WHITNEY", "PRATT AND WHITNEY", "PW", "P&W"],
    "Flender": [
        "FLENDER", "FLENDER GRAFFENSTADEN", "FLENDER-GRAFFENSTADEN",
        "GRAFFENSTADEN",
    ],
    "Woodward": ["WOODWARD"],
    "Allen-Bradley": [
        "ALLEN BRADLEY", "ALLEN-BRADLEY", "A, LLEN BRADLEY",
        "ALLE, N BRADLEY", "ALLENBRADLEY",
    ],
    "Atlas Copco": ["ATLAS COPCO", "ATLAS-COPCO"],
    "Milton Roy": ["MILTON ROY", "MILTON-ROY"],
    "Chint": ["CHINT"],
    "Swagelok": [
        "SWAGELOK", "SWAGELOK CO/WHITEY COMPANY",
        "SWAGELOK CO/WHITEY COMPANY:", "SWEGLOK", "WHITEY",
    ],
    "ITT Goulds": ["ITT GOULDS", "ITT GOULDS PUMPS", "ITT", "GOULDS"],
    "Baldor": ["BALDOR"],
    "Bently Nevada": ["BENTLY NEVADA", "BENTLY", "BN"],
    "ABB": ["ABB"],
    "Fanuc": ["FANUC"],
    "GE Fanuc": ["GE FANUC", "GEFANUC"],
    "Honeywell": ["HONEYWELL", "HONNEYWELL"],
    "Alstom": ["ALSTOM"],
    "Qualitrol": ["QUALITROL"],
    "AI-Tek": ["AI-TEK", "AITEK"],
    "Gutor": ["GUTOR"],
    "Metso": ["METSO", "NELES", "METSO AUTOMATION"],
    "Parker": ["PARKER", "PARKER HANNIFIN"],
    "Rexnord": ["REXNORD"],
    "Rosemount": ["ROSEMOUNT"],
    "Rotork": ["ROTORK"],
    "Airpax": ["AIRPAX"],
    "Endress+Hauser": ["ENDRESS+HAUSER", "ENDRESS HAUSER", "E+H", "EH"],
    "Fisher": ["FISHER", "FISHER/EMERSON", "FISHER CONTROLS"],
    "Emerson": ["EMERSON"],
    "Flowserve": ["FLOWSERVE"],
    "Hydac": ["HYDAC"],
    "Pall": ["PALL"],
    "SKF": ["SKF", "SKF CMVA"],
    "Bosch Rexroth": ["BOSCH REXROTH", "REXROTH"],
    "Camfil": ["CAMFIL"],
    "Garlock": ["GARLOCK"],
    "Hochiki": ["HOCHIKI"],
    "Leser": ["LESER"],
    "Moog": ["MOOG"],
    "Samson": ["SAMSON"],
    "Velan": ["VELAN"],
    "AAF": ["AAF"],
    "Air Liquide": ["AIR LIQUIDE"],
    "Alfa Laval": ["ALFA LAVAL"],
    "ASCO": ["ASCO", "ASCO NUMATICS"],
    "Dräger": ["DRAGER", "DRÄGER"],
    "Durag": ["DURAG"],
    "Dynalco": ["DYNALCO"],
    "Eaton": ["EATON"],
    "FLIR": ["FLIR"],
    "Grundfos": ["GRUNDFOS"],
    "Habonim": ["HABONIM"],
    "John Crane": ["JOHN CRANE"],
    "Loctite": ["LOCTITE", "LOCTITE/HENKEL", "HENKEL"],
    "Masoneilan": ["MASONEILAN"],
    "Mersen": ["MERSEN"],
    "Molykote": ["MOLYKOTE"],
    "MSA": ["MSA", "MSA SAFETY"],
    "Olympus": ["OLYMPUS"],
    "Phoenix Contact": ["PHOENIX CONTACT"],
    "Reflex": ["REFLEX"],
    "Spectrex": ["SPECTREX"],
    "Valtek": ["VALTEK"],
    "Vicor": ["VICOR"],
    "Voith": ["VOITH"],
    "WIKA": ["WIKA"],
    "Yuasa": ["YUASA"],
    "Zenith Pumps": ["ZENITH", "ZENITH PUMPS"],
    "Leslie Controls": ["LESLIE", "LESLIE CONTROLS"],
    "Jamesbury": ["JAMESBURY", "JAMESABURY"],
    "Panametrics": ["PANAMETRICS", "GE PANAMETRICS"],
}


def _brand_key(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", (value or "").lower())


BRAND_EXACT: dict[str, str] = {}
BRAND_KEY: dict[str, str] = {}
for canonical, aliases in BRAND_ALIASES.items():
    BRAND_EXACT[_brand_key(canonical)] = canonical
    BRAND_KEY[_brand_key(canonical)] = canonical
    for alias in aliases:
        BRAND_EXACT[_brand_key(alias)] = canonical
        BRAND_KEY[_brand_key(alias)] = canonical

BRAND_PREFIX_RULES: list[tuple[re.Pattern[str], str]] = [
    (re.compile(r"^(?:GE|GENERAL\s+ELECTRIC)\b", re.I), "GE"),
    (re.compile(r"^SIEMENS\b", re.I), "Siemens"),
    (re.compile(r"^FLENDER\b", re.I), "Flender"),
    (re.compile(r"^WOODWARD\b", re.I), "Woodward"),
    (re.compile(r"^ALLEN[\s,-]*BRADLEY\b", re.I), "Allen-Bradley"),
    (re.compile(r"^ATLAS\s*COPCO\b", re.I), "Atlas Copco"),
    (re.compile(r"^MILTON\s*ROY\b", re.I), "Milton Roy"),
    (re.compile(r"^CHINT\b", re.I), "Chint"),
    (re.compile(r"^SWAGELOK\b", re.I), "Swagelok"),
    (re.compile(r"^ITT\b", re.I), "ITT Goulds"),
    (re.compile(r"^GOULDS\b", re.I), "ITT Goulds"),
    (re.compile(r"^BALDOR\b", re.I), "Baldor"),
    (re.compile(r"^BENTLY\b", re.I), "Bently Nevada"),
    (re.compile(r"^ABB\b", re.I), "ABB"),
    (re.compile(r"^FANUC\b", re.I), "Fanuc"),
    (re.compile(r"^GE\s*FANUC\b", re.I), "GE Fanuc"),
    (re.compile(r"^HONEYWELL\b", re.I), "Honeywell"),
    (re.compile(r"^ALSTOM\b", re.I), "Alstom"),
    (re.compile(r"^QUALITROL\b", re.I), "Qualitrol"),
    (re.compile(r"^GUTOR\b", re.I), "Gutor"),
    (re.compile(r"^METSO\b", re.I), "Metso"),
    (re.compile(r"^PARKER\b", re.I), "Parker"),
    (re.compile(r"^REXNORD\b", re.I), "Rexnord"),
    (re.compile(r"^ROSEMOUNT\b", re.I), "Rosemount"),
    (re.compile(r"^ROTORK\b", re.I), "Rotork"),
    (re.compile(r"^AIRPAX\b", re.I), "Airpax"),
    (re.compile(r"^ENDRESS\b", re.I), "Endress+Hauser"),
    (re.compile(r"^FISHER\b", re.I), "Fisher"),
    (re.compile(r"^EMERSON\b", re.I), "Emerson"),
    (re.compile(r"^FLOWSERVE\b", re.I), "Flowserve"),
    (re.compile(r"^HYDAC\b", re.I), "Hydac"),
    (re.compile(r"^PALL\b", re.I), "Pall"),
    (re.compile(r"^SKF\b", re.I), "SKF"),
    (re.compile(r"^BOSCH\b", re.I), "Bosch Rexroth"),
    (re.compile(r"^REXROTH\b", re.I), "Bosch Rexroth"),
    (re.compile(r"^CAMFIL\b", re.I), "Camfil"),
    (re.compile(r"^GARLOCK\b", re.I), "Garlock"),
    (re.compile(r"^HOCHIKI\b", re.I), "Hochiki"),
    (re.compile(r"^LESER\b", re.I), "Leser"),
    (re.compile(r"^MOOG\b", re.I), "Moog"),
    (re.compile(r"^SAMSON\b", re.I), "Samson"),
    (re.compile(r"^VELAN\b", re.I), "Velan"),
    (re.compile(r"^AAF\b", re.I), "AAF"),
    (re.compile(r"^AIR\s+LIQUIDE\b", re.I), "Air Liquide"),
    (re.compile(r"^ALFA\s+LAVAL\b", re.I), "Alfa Laval"),
    (re.compile(r"^ASCO\b", re.I), "ASCO"),
    (re.compile(r"^DR[ÄA]GER\b", re.I), "Dräger"),
    (re.compile(r"^DURAG\b", re.I), "Durag"),
    (re.compile(r"^DYNALCO\b", re.I), "Dynalco"),
    (re.compile(r"^EATON\b", re.I), "Eaton"),
    (re.compile(r"^FLIR\b", re.I), "FLIR"),
    (re.compile(r"^GRUNDFOS\b", re.I), "Grundfos"),
    (re.compile(r"^HABONIM\b", re.I), "Habonim"),
    (re.compile(r"^JOHN\s+CRANE\b", re.I), "John Crane"),
    (re.compile(r"^LOCTITE\b", re.I), "Loctite"),
    (re.compile(r"^MASONEILAN\b", re.I), "Masoneilan"),
    (re.compile(r"^MERSEN\b", re.I), "Mersen"),
    (re.compile(r"^MOLYKOTE\b", re.I), "Molykote"),
    (re.compile(r"^MSA\b", re.I), "MSA"),
    (re.compile(r"^OLYMPUS\b", re.I), "Olympus"),
    (re.compile(r"^PHOENIX\s+CONTACT\b", re.I), "Phoenix Contact"),
    (re.compile(r"^REFLEX\b", re.I), "Reflex"),
    (re.compile(r"^SPECTREX\b", re.I), "Spectrex"),
    (re.compile(r"^VALTEK\b", re.I), "Valtek"),
    (re.compile(r"^VICOR\b", re.I), "Vicor"),
    (re.compile(r"^VOITH\b", re.I), "Voith"),
    (re.compile(r"^WIKA\b", re.I), "WIKA"),
    (re.compile(r"^YUASA\b", re.I), "Yuasa"),
    (re.compile(r"^ZENITH\b", re.I), "Zenith Pumps"),
    (re.compile(r"^LESLIE\b", re.I), "Leslie Controls"),
    (re.compile(r"^JAMESBURY\b", re.I), "Jamesbury"),
    (re.compile(r"^PANAMETRICS\b", re.I), "Panametrics"),
]

PART_BRAND_RULES: list[tuple[re.Pattern[str], str]] = [
    (re.compile(r"^(?:IS200|IS220|DS200|DS3800|IC69|IC66|151X|531X)", re.I), "GE"),
    (re.compile(r"^(?:6ES|6AV|6GK|3RV|3RT|3RH|3RK|1LA|1LE|1LG|1FK|1FT|6SE|6SL|7ML|7MF)", re.I), "Siemens"),
    (re.compile(r"^(?:1746|1747|1756|1769|1771|1783|1794|1734|2711|2094|22A|22B|25A|25B|800F|855T)", re.I), "Allen-Bradley"),
    (re.compile(r"^(?:3300|3301|3305|3500|1900|990)", re.I), "Bently Nevada"),
    (re.compile(r"^(?:3051|3144|644|2088|2051|1199)", re.I), "Rosemount"),
    (re.compile(r"^(?:VMIC)", re.I), "Fanuc"),
]

NOISY_BRAND = re.compile(
    r"^(?:model|part|p/?n|oem|serial|no\.?)\b|"
    r"^(?:-|,)|"
    r"\b(?:company|co\.?)\b|"
    r"^\s*$",
    re.I,
)

NOISY_BRAND_PATTERNS = [
    re.compile(r"\bITEM\s+NAME\b", re.I),
    re.compile(r"\bProcess:", re.I),
    re.compile(r"\bOxygen\s+Content", re.I),
    re.compile(r"\bAdditional\s+Information", re.I),
    re.compile(r"\bFlue\s+Gas", re.I),
    re.compile(r"\bEquipment\s+Model", re.I),
    re.compile(r"\bUSED\s+WITH", re.I),
    re.compile(r"\bType:\s+Analyser", re.I),
]


def clean_brand(raw: str) -> str:
    value = html.unescape(raw or "").strip()
    value = re.sub(r"\s+", " ", value)
    return value.strip(" :;,.-")


def match_brand(cleaned: str) -> str | None:
    if not cleaned:
        return None
    key = _brand_key(cleaned)
    if key in BRAND_EXACT:
        return BRAND_EXACT[key]
    for pattern, canonical in BRAND_PREFIX_RULES:
        if pattern.search(cleaned):
            return canonical
    return None


def infer_brand_from_part(part: str) -> str | None:
    for pattern, brand in PART_BRAND_RULES:
        if pattern.search(part or ""):
            return brand
    return None


def canonicalize_unknown_brand(value: str) -> str:
    value = re.sub(r"\s+", " ", value).strip(" :;,.-")
    small = {"and", "of", "the"}
    words = []
    for word in value.split(" "):
        if word.isupper() and len(word) <= 5:
            words.append(word)
        elif word.lower() in small:
            words.append(word.lower())
        else:
            words.append(word[:1].upper() + word[1:].lower())
    return " ".join(words) or "GE"


def normalize_brand(raw: str, part: str) -> str:
    cleaned = clean_brand(raw)
    canonical = match_brand(cleaned)
    inferred = infer_brand_from_part(part)

    if canonical:
        if canonical == "GE" and inferred and inferred != "GE":
            return inferred
        return canonical

    if inferred and (not cleaned or NOISY_BRAND.search(cleaned)):
        return inferred

    if not cleaned:
        return inferred or "GE"

    if re.match(r"^(?:model|part|p/?n|oem|serial|no\.?)\b", cleaned, re.I):
        return inferred or "GE"

    return canonicalize_unknown_brand(cleaned)


# ---------------------------------------------------------------------------
# Categories
# ---------------------------------------------------------------------------

NAV_CATEGORIES = [
    "Turbine Parts",
    "Compressors & Pumps",
    "Valves & Actuators",
    "Automation & Controls",
    "Instrumentation",
    "Electrical & Motors",
    "Mechanical Power Transmission",
    "Seals, Filters & Consumables",
    "Piping & Fittings",
]

CATEGORY_SLUGS = {
    name: re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    for name in NAV_CATEGORIES
}

CATEGORY_KEYWORDS: list[tuple[re.Pattern[str], str]] = [
    (re.compile(r"\b(?:valve|solenoid|actuator|positioner|butterfly|ball valve|"
                r"relief|regulator|drain|governor)\b", re.I), "Valves & Actuators"),
    (re.compile(r"\b(?:bearing|gear|coupling|shaft|pinion|clutch|reducer|"
                r"transmission|quill|brake)\b", re.I), "Mechanical Power Transmission"),
    (re.compile(r"\b(?:probe|sensor|transmitter|thermocouple|rtd|gauge|switch|"
                r"analyser|analyzer|detector|vibration|monitor|transducer|"
                r"flowmeter|hygrometer)\b", re.I), "Instrumentation"),
    (re.compile(r"\b(?:card|module|plc|controller|relay|power supply|board|"
                r"i/o|io|hmi|terminal|speedtronic|mark|network|drive|vfd|"
                r"cpu|processor|communication)\b", re.I), "Automation & Controls"),
    (re.compile(r"\b(?:motor|generator|breaker|transformer|ups|battery|"
                r"contactor|fuse|capacitor|electrode)\b", re.I), "Electrical & Motors"),
    (re.compile(r"\b(?:filter|seal|gasket|o-ring|o ring|packing|kit|"
                r"strainer|element|lubricant|oil)\b", re.I), "Seals, Filters & Consumables"),
    (re.compile(r"\b(?:pump|compressor|impeller|diffuser)\b", re.I), "Compressors & Pumps"),
    (re.compile(r"\b(?:fitting|flange|tube|pipe|union|connector|bushing|"
                r"adapter|elbow|tee)\b", re.I), "Piping & Fittings"),
    (re.compile(r"\b(?:turbine|blade|vane|nozzle|shroud|combustor|combustion|"
                r"transition piece|liner|bucket|stator|diaphragm|hot gas path|"
                r"exhaust|inlet)\b", re.I), "Turbine Parts"),
]

CATEGORY_GROUP = {
    "Turbine Parts": "Turbines & Power Generation",
    "Compressors & Pumps": "Rotating Equipment",
    "Mechanical Power Transmission": "Rotating Equipment",
    "Seals, Filters & Consumables": "Rotating Equipment",
    "Valves & Actuators": "Valves & Flow Control",
    "Piping & Fittings": "Valves & Flow Control",
    "Automation & Controls": "Automation & Controls",
    "Instrumentation": "Instrumentation & Monitoring",
    "Electrical & Motors": "Electrical & Motors",
}

BRAND_GROUPS: dict[str, str] = {
    "GE": "Turbines & Power Generation",
    "Siemens": "Turbines & Power Generation",
    "Pratt & Whitney": "Turbines & Power Generation",
    "Alstom": "Turbines & Power Generation",
    "Air Liquide": "Turbines & Power Generation",
    "Atlas Copco": "Rotating Equipment",
    "ITT Goulds": "Rotating Equipment",
    "Flender": "Rotating Equipment",
    "Milton Roy": "Rotating Equipment",
    "AAF": "Rotating Equipment",
    "Zenith Pumps": "Rotating Equipment",
    "Grundfos": "Rotating Equipment",
    "Alfa Laval": "Rotating Equipment",
    "Voith": "Rotating Equipment",
    "Rexnord": "Rotating Equipment",
    "SKF": "Rotating Equipment",
    "Flowserve": "Rotating Equipment",
    "John Crane": "Rotating Equipment",
    "Garlock": "Rotating Equipment",
    "Hydac": "Rotating Equipment",
    "Pall": "Rotating Equipment",
    "Camfil": "Rotating Equipment",
    "Loctite": "Rotating Equipment",
    "Molykote": "Rotating Equipment",
    "ABB": "Automation & Controls",
    "Gutor": "Automation & Controls",
    "Allen-Bradley": "Automation & Controls",
    "Woodward": "Automation & Controls",
    "GE Fanuc": "Automation & Controls",
    "Fanuc": "Automation & Controls",
    "Bosch Rexroth": "Automation & Controls",
    "Phoenix Contact": "Automation & Controls",
    "Eaton": "Automation & Controls",
    "Vicor": "Automation & Controls",
    "Moog": "Automation & Controls",
    "Emerson": "Automation & Controls",
    "Qualitrol": "Instrumentation & Monitoring",
    "Bently Nevada": "Instrumentation & Monitoring",
    "Honeywell": "Instrumentation & Monitoring",
    "Panametrics": "Instrumentation & Monitoring",
    "AI-Tek": "Instrumentation & Monitoring",
    "Rosemount": "Instrumentation & Monitoring",
    "Endress+Hauser": "Instrumentation & Monitoring",
    "Airpax": "Instrumentation & Monitoring",
    "Dynalco": "Instrumentation & Monitoring",
    "WIKA": "Instrumentation & Monitoring",
    "Durag": "Instrumentation & Monitoring",
    "FLIR": "Instrumentation & Monitoring",
    "Spectrex": "Instrumentation & Monitoring",
    "Olympus": "Instrumentation & Monitoring",
    "MSA": "Instrumentation & Monitoring",
    "Dräger": "Instrumentation & Monitoring",
    "Reflex": "Instrumentation & Monitoring",
    "Hochiki": "Instrumentation & Monitoring",
    "Chint": "Electrical & Motors",
    "Baldor": "Electrical & Motors",
    "Mersen": "Electrical & Motors",
    "Yuasa": "Electrical & Motors",
    "Metso": "Valves & Flow Control",
    "Swagelok": "Valves & Flow Control",
    "Leslie Controls": "Valves & Flow Control",
    "Jamesbury": "Valves & Flow Control",
    "Fisher": "Valves & Flow Control",
    "Rotork": "Valves & Flow Control",
    "ASCO": "Valves & Flow Control",
    "Samson": "Valves & Flow Control",
    "Masoneilan": "Valves & Flow Control",
    "Valtek": "Valves & Flow Control",
    "Velan": "Valves & Flow Control",
    "Leser": "Valves & Flow Control",
    "Habonim": "Valves & Flow Control",
    "Parker": "Valves & Flow Control",
}


def normalize_category(raw: str, description: str = "", default: str = "Turbine Parts") -> str:
    value = (raw or "").strip()
    if value:
        for name in NAV_CATEGORIES:
            if value.lower() == name.lower():
                return name
            if re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-") == CATEGORY_SLUGS[name]:
                return name
    if description:
        for pattern, category in CATEGORY_KEYWORDS:
            if pattern.search(description):
                return category
    return default


# ---------------------------------------------------------------------------
# Source metadata (brand + category defaults)
# ---------------------------------------------------------------------------

SOURCE_RULES: list[tuple[re.Pattern[str], str, str]] = [
    (re.compile(r"^hot-stock\.html$", re.I), "Flender", "Mechanical Power Transmission"),
    (re.compile(r"^Stock-Woodward", re.I), "Woodward", "Automation & Controls"),
    (re.compile(r"^GE-Fanuc-stock", re.I), "GE Fanuc", "Automation & Controls"),
    (re.compile(r"^GE-Fanuc", re.I), "GE Fanuc", "Automation & Controls"),
    (re.compile(r"^GE-Multilin", re.I), "GE", "Automation & Controls"),
    (re.compile(r"^GE-Panametrics", re.I), "Panametrics", "Instrumentation"),
    (re.compile(r"^GE-Motor", re.I), "GE", "Electrical & Motors"),
    (re.compile(r"^ge-gas-turbine-spare-parts-inventory", re.I), "GE", "Turbine Parts"),
    (re.compile(r"^ge-9ha", re.I), "GE", "Turbine Parts"),
    (re.compile(r"^ge-frame", re.I), "GE", "Turbine Parts"),
    (re.compile(r"^ge-lm", re.I), "GE", "Turbine Parts"),
    (re.compile(r"^ge-modules", re.I), "GE", "Automation & Controls"),
    (re.compile(r"^ge-power-services", re.I), "GE", "Turbine Parts"),
    (re.compile(r"^ge-turbine", re.I), "GE", "Turbine Parts"),
    (re.compile(r"^turbine-Parts", re.I), "GE", "Turbine Parts"),
    (re.compile(r"^gas-turbines-parts", re.I), "GE", "Turbine Parts"),
    (re.compile(r"^General-electric-6FA", re.I), "GE", "Turbine Parts"),
    (re.compile(r"^pw-mpa-ft8", re.I), "Pratt & Whitney", "Turbine Parts"),
    (re.compile(r"^siemens", re.I), "Siemens", "Turbine Parts"),
    (re.compile(r"^ABB", re.I), "ABB", "Automation & Controls"),
    (re.compile(r"^ATLAS-COPCO|^Atlas-Copco", re.I), "Atlas Copco", "Compressors & Pumps"),
    (re.compile(r"^Allen-Bradley|^ALLEN-BRADLEY", re.I), "Allen-Bradley", "Automation & Controls"),
    (re.compile(r"^Bently", re.I), "Bently Nevada", "Instrumentation"),
    (re.compile(r"^Chint", re.I), "Chint", "Electrical & Motors"),
    (re.compile(r"^BALDOR|^Baldor", re.I), "Baldor", "Electrical & Motors"),
    (re.compile(r"^Gutor", re.I), "Gutor", "Electrical & Motors"),
    (re.compile(r"^Honeywell|^HONEYWELL|^HONNEYWELL", re.I), "Honeywell", "Instrumentation"),
    (re.compile(r"^Metso|^METSO|^NELES", re.I), "Metso", "Valves & Actuators"),
    (re.compile(r"^MILTON-ROY|^Milton", re.I), "Milton Roy", "Compressors & Pumps"),
    (re.compile(r"^ITT|^GOULDS", re.I), "ITT Goulds", "Compressors & Pumps"),
    (re.compile(r"^Jamesabury|^JAMESBURY", re.I), "Jamesbury", "Valves & Actuators"),
    (re.compile(r"^QUALITROL|^Qualitrol", re.I), "Qualitrol", "Instrumentation"),
    (re.compile(r"^SWAGELOK|^SWEGLOK|^Swagelok", re.I), "Swagelok", "Piping & Fittings"),
    (re.compile(r"^Woodward|^WOODWARD", re.I), "Woodward", "Automation & Controls"),
    (re.compile(r"^Flender|^FLENDER", re.I), "Flender", "Mechanical Power Transmission"),
    (re.compile(r"^GE-|^GE-GAS|^GE-Industrial|^GE-Motor|^GE-Multilin|^GE-Panametrics", re.I), "GE", "Turbine Parts"),
    (re.compile(r"^AAF", re.I), "AAF", "Seals, Filters & Consumables"),
]

BRAND_FROM_FILENAME = [
    (re.compile(r"^(?:GE|General-electric|ge-)", re.I), "GE"),
    (re.compile(r"^SIEMENS|^Siemens", re.I), "Siemens"),
    (re.compile(r"^ABB", re.I), "ABB"),
    (re.compile(r"^Metso|^METSO|^NELES", re.I), "Metso"),
    (re.compile(r"^Woodward|^WOODWARD", re.I), "Woodward"),
    (re.compile(r"^Honeywell|^HONEYWELL|^HONNEYWELL", re.I), "Honeywell"),
    (re.compile(r"^Bently", re.I), "Bently Nevada"),
    (re.compile(r"^QUALITROL|^Qualitrol", re.I), "Qualitrol"),
    (re.compile(r"^SWAGELOK|^SWEGLOK|^Swagelok", re.I), "Swagelok"),
    (re.compile(r"^ATLAS-COPCO|^Atlas-Copco", re.I), "Atlas Copco"),
    (re.compile(r"^Allen-Bradley|^ALLEN-BRADLEY", re.I), "Allen-Bradley"),
    (re.compile(r"^Gutor", re.I), "Gutor"),
    (re.compile(r"^Chint", re.I), "Chint"),
    (re.compile(r"^BALDOR|^Baldor", re.I), "Baldor"),
    (re.compile(r"^MILTON-ROY|^Milton", re.I), "Milton Roy"),
    (re.compile(r"^ITT|^GOULDS", re.I), "ITT Goulds"),
    (re.compile(r"^Jamesabury|^JAMESBURY", re.I), "Jamesbury"),
    (re.compile(r"^Flender|^FLENDER", re.I), "Flender"),
    (re.compile(r"^AAF", re.I), "AAF"),
    (re.compile(r"^Fanuc|^GE-Fanuc", re.I), "GE Fanuc"),
]


def source_meta(filename: str) -> tuple[str, str]:
    for pattern, brand, category in SOURCE_RULES:
        if pattern.search(filename):
            return brand, category
    for pattern, brand in BRAND_FROM_FILENAME:
        if pattern.search(filename):
            return brand, "Turbine Parts"
    return "GE", "Turbine Parts"


# ---------------------------------------------------------------------------
# Table parsing
# ---------------------------------------------------------------------------

HEADER_PART_STRONG = re.compile(
    r"(?:part|parts)\s*(?:number|no\.?|num|#)|"
    r"\bp/?n\b|^part$|^pn$|"
    r"article\s*(?:number|no\.?|#)|^code$|c[oó]digo|"
    r"^mpn$|^sku$|^part\s*id$",
    re.I,
)
HEADER_PART_WEAK = re.compile(
    r"reference|^ref$|^oem(?:\s*\d+)?$|^model(?:\s*(?:number|no\.?|#))?$",
    re.I,
)
HEADER_EXCLUDE = re.compile(
    r"qty|quantity|price|amount|^no\.?$|^#+$|serial|^sn$|esn|"
    r"location|^cc$|stock|^unit|weight|discount|lead|date|year|"
    r"brand|manufacturer",
    re.I,
)
HEADER_DESCRIPTION = re.compile(
    r"description|desc|title|component|^name$|detail|item", re.I
)
HEADER_BRAND = re.compile(r"brand|manufacturer|^make$|vendor|supplier|^oem$", re.I)
NON_PART_TABLE_HEADER = re.compile(
    r"parameter|specification|^value$|dimension|material|temperature|"
    r"pressure|voltage|current|speed|flow|capacity|rating|^unit$",
    re.I,
)
HEADER_ANY = re.compile(
    r"part|description|desc|qty|quantity|price|amount|brand|manufacturer|"
    r"^no\.?$|^#+$|serial|^sn$|esn|location|stock|unit|weight|"
    r"oem|reference|model|code|article|item|id",
    re.I,
)


def looks_like_header(cells: list[str]) -> bool:
    if not cells:
        return False
    joined = " ".join(cells).strip()
    if not joined:
        return False
    # Header cells should be short labels, not long description text.
    if any(len(c) > 40 for c in cells):
        return False
    hits = sum(1 for c in cells if HEADER_ANY.search(c))
    part_like = sum(1 for c in cells if looks_part(c))
    return hits >= 1 and part_like <= max(1, len(cells) // 2)


def column_stats(values: list[str]) -> tuple[float, float, int]:
    nonempty = [v for v in values if v and v.strip()]
    if not nonempty:
        return 0.0, 0.0, 0
    parts = [v for v in nonempty if looks_part(v)]
    ratio = len(parts) / len(nonempty)
    unique = len({part_key(v) for v in parts}) / max(1, len(parts))
    return ratio, unique, len(nonempty)


def select_part_columns(
    headers: list[str], data_rows: list[list[str]]
) -> tuple[list[int], bool]:
    ncols = max((len(row) for row in data_rows), default=0)
    if ncols == 0:
        return [], bool(headers)

    has_header = bool(headers) and any(h.strip() for h in headers)
    has_strong = any(HEADER_PART_STRONG.search(h or "") for h in headers)
    has_non_part_spec = any(NON_PART_TABLE_HEADER.search(h or "") for h in headers)

    selected: list[int] = []
    for ci in range(ncols):
        header = headers[ci] if ci < len(headers) else ""
        if HEADER_EXCLUDE.search(header):
            continue
        values = [row[ci] for row in data_rows if ci < len(row)]
        ratio, unique, count = column_stats(values)
        if HEADER_PART_STRONG.search(header):
            if ratio >= 0.25 or count < 4:
                selected.append(ci)
        elif HEADER_PART_WEAK.search(header):
            if ratio >= 0.5:
                selected.append(ci)

    if selected:
        return selected, True

    if has_non_part_spec and not has_strong:
        return [], has_header

    candidates: list[tuple[float, int]] = []
    for ci in range(ncols):
        header = headers[ci] if ci < len(headers) else ""
        if HEADER_EXCLUDE.search(header):
            continue
        values = [row[ci] for row in data_rows if ci < len(row)]
        ratio, unique, count = column_stats(values)
        if count >= 8 and ratio >= 0.7 and unique >= 0.5:
            candidates.append((ratio, ci))

    if candidates:
        candidates.sort(reverse=True)
        return [ci for _, ci in candidates], has_header

    return [], has_header


def embedded_parts(cell: str) -> list[str]:
    found: list[str] = []
    for match in EMBEDDED_PART.finditer(cell or ""):
        part = clean_part(match.group(1))
        if valid_part(part):
            found.append(part)
    return found


def filter_noise_records(records: list[dict]) -> list[dict]:
    """Remove records that are clearly not gas turbine / industrial parts."""
    dropped: int = 0
    kept: list[dict] = []
    hvac_noise = [
        "thermostat", "hvac", "building control", "lighting", "panel board",
        "circuit breaker", "fuse", "disconnect", "motor control", "starter",
        "contactor", "vfd", "soft start", "relay logic", "plc input",
        "sensor board", "probe", "indicator", "alarm", "buzzer",
    ]
    for r in records:
        part = r.get("part", "")
        desc = r.get("description", "")
        brand = r.get("brand", "")

        if not valid_part(part):
            dropped += 1
            continue

        desc_low = desc.lower()
        if any(h in desc_low for h in hvac_noise):
            dropped += 1
            continue

        noisy = any(p.search(brand) for p in NOISY_BRAND_PATTERNS)
        if noisy:
            dropped += 1
            continue

        post_desc = re.sub(r"^[A-Z0-9\-\./]+", "", desc).strip()
        if len(post_desc) > 0 and len(post_desc.split()) > 3:
            reps = re.findall(
                r"(TF\d{4}|T63\d{3}|TF2\d{2}|TH\d{4}|V5\d{3}|V404\d)", desc
            )
            if len(reps) > 3 and not re.search(r"GE|Siemens|Flender|ABB", desc, re.I):
                dropped += 1
                continue

        kept.append(r)
    return kept


def table_records(directory: str) -> list[dict]:
    records: list[dict] = []
    for filename in sorted(os.listdir(directory)):
        if not filename.lower().endswith(".html") or is_excluded_file(filename):
            continue
        path = os.path.join(directory, filename)
        source = open(path, encoding="utf-8", errors="ignore").read()
        default_brand, default_category = source_meta(filename)

        for table in re.findall(r"<table[\s\S]*?</table>", source, re.I):
            rows = re.findall(r"<tr[\s\S]*?</tr>", table, re.I)
            if not rows:
                continue

            header: list[str] | None = None
            thead = re.search(r"<thead[\s\S]*?</thead>", table, re.I)
            if thead:
                header_row = re.search(r"<tr[\s\S]*?</tr>", thead.group(0), re.I)
                if header_row:
                    header = cell_values(header_row.group(0))

            data_rows: list[list[str]] = []
            for row in rows:
                values = cell_values(row)
                if not any(values):
                    continue
                if len(values) == 1 and not looks_part(values[0]):
                    continue
                if header is not None:
                    if values == header:
                        continue
                    data_rows.append(values)
                    continue
                if looks_like_header(values):
                    header = values
                    continue
                header = []
                data_rows.append(values)

            if len(data_rows) < 2:
                continue

            part_indexes, _ = select_part_columns(header or [], data_rows)
            if not part_indexes:
                continue

            headers = header or []
            # Pad header at the start so header index i aligns with data column i
            # when the header omits leading columns (e.g. an item-number column).
            ncols = max((len(row) for row in data_rows), default=0)
            if len(headers) < ncols:
                headers = [""] * (ncols - len(headers)) + headers
            if len(headers) > ncols:
                headers = headers[:ncols]
            description_index = find_col(
                headers, [r"description", r"desc", r"title", r"component", r"^name$"]
            )
            brand_index = find_col(
                headers, [r"brand", r"manufacturer", r"^make$", r"vendor", r"supplier"]
            )

            for values in data_rows:
                joined = " ".join(values).lower()
                if (
                    "placeholder" in joined
                    or "template row" in joined
                    or "populate from" in joined
                ):
                    continue

                description = (
                    values[description_index].strip()
                    if description_index is not None
                    and description_index < len(values)
                    else ""
                )
                if not description:
                    description = next(
                        (
                            values[i].strip()
                            for i in range(len(values))
                            if i not in part_indexes and values[i].strip()
                        ),
                        "",
                    )

                brand = (
                    values[brand_index].strip()
                    if brand_index is not None and brand_index < len(values)
                    else ""
                )

                row_parts: list[str] = []
                for ci in part_indexes:
                    if ci >= len(values):
                        continue
                    part = clean_part(values[ci])
                    if valid_part(part):
                        row_parts.append(part)
                    else:
                        row_parts.extend(embedded_parts(values[ci]))

                if description:
                    row_parts.extend(embedded_parts(description))

                seen_row: set[str] = set()
                for part in row_parts:
                    key = part_key(part)
                    if not key or key in seen_row:
                        continue
                    seen_row.add(key)
                    records.append(
                        {
                            "part": part,
                            "brand": brand or default_brand,
                            "category": normalize_category(
                                "", description, default_category
                            ),
                            "description": description,
                            "source": filename,
                        }
                    )
    return records


def product_pages(directory: str) -> dict[str, dict]:
    found: dict[str, dict] = {}
    for filename in sorted(os.listdir(directory)):
        if not filename.lower().endswith(".html") or is_excluded_file(filename):
            continue
        path = os.path.join(directory, filename)
        source = open(path, encoding="utf-8", errors="ignore").read()
        for block in re.findall(
            r'<script type="application/ld\+json">(.*?)</script>', source, re.S
        ):
            try:
                data = json.loads(block)
            except Exception:
                continue
            if not isinstance(data, dict) or data.get("@type") != "Product":
                continue
            part = (data.get("sku") or data.get("mpn") or "").strip()
            if not part:
                continue
            brand = data.get("brand", {})
            brand_name = brand.get("name") if isinstance(brand, dict) else brand
            found[part_key(part)] = {
                "part": part,
                "brand": (brand_name or "").strip(),
                "category": (data.get("category") or "").strip(),
                "url": (data.get("url") or "").strip().split("/")[-1],
                "title": (data.get("name") or "").strip(),
                "description": (data.get("description") or "").strip(),
            }
    return found


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", required=True, help="Legacy HTML directory")
    parser.add_argument("--out", required=True, help="Output JSON path")
    parser.add_argument(
        "--brands-out",
        default="src/data/static/brands/brands.json",
        help="Brand index output path",
    )
    parser.add_argument(
        "--curated",
        default="src/data/static/products/products.json",
        help="Existing curated catalogue to exclude from the import",
    )
    args = parser.parse_args()

    curated = json.load(open(args.curated))
    existing_brands = {}
    if os.path.exists(args.brands_out):
        for brand in json.load(open(args.brands_out)):
            existing_brands[brand.get("name", "")] = brand

    pages = product_pages(args.source)
    records = table_records(args.source)
    records = filter_noise_records(records)

    curated_parts = {
        part_key(item.get("part", "")) for item in curated if item.get("part")
    }

    merged: dict[str, dict] = {}

    def add(record: dict, priority: int) -> None:
        part = clean_part(record.get("part", ""))
        if not valid_part(part):
            return
        key = part_key(part)
        if not key or key in curated_parts:
            return

        brand = normalize_brand(record.get("brand", ""), part)
        description = re.sub(r"\s+", " ", record.get("description", "") or "").strip()
        category = normalize_category(
            record.get("category", ""),
            " ".join(filter(None, [description, record.get("title", "")])),
        )

        existing = merged.get(key)
        if existing is None:
            merged[key] = {
                "part": part,
                "brand": brand,
                "category": category,
                "description": description[:500],
                "url": record.get("url", ""),
                "priority": priority,
                "sources": {record.get("source", "")},
            }
            return

        if priority > existing["priority"]:
            existing.update(
                {
                    "part": part,
                    "brand": brand,
                    "category": category,
                    "description": description[:500],
                    "url": record.get("url", "") or existing["url"],
                    "priority": priority,
                }
            )
        else:
            if len(description) > len(existing["description"]):
                existing["description"] = description[:500]
            if record.get("url") and not existing["url"]:
                existing["url"] = record["url"]
            if not existing["brand"]:
                existing["brand"] = brand
            if not existing["category"]:
                existing["category"] = category
        if record.get("source"):
            existing["sources"].add(record["source"])

    for record in pages.values():
        add(record, priority=2)

    for record in records:
        add(record, priority=1)

    output = []
    for record in merged.values():
        brand = record["brand"].strip()
        part = record["part"].strip()
        description = record["description"].strip()
        category = record["category"].strip()

        base = description[:110].strip()
        if base and part.lower() in base.lower():
            title = base
        elif base:
            title = f"{part} {base}"
        else:
            title = f"{part} Industrial Spare Part"

        output.append(
            {
                "name": f"{brand} {part}".strip(),
                "title": title,
                "part": part,
                "brand": brand,
                "category": category,
                "url": record["url"]
                or f"{re.sub(r'[^A-Za-z0-9]+', '-', brand)}-{re.sub(r'[^A-Za-z0-9]+', '-', part)}.html",
                "keywords": " ".join(
                    filter(
                        None,
                        [
                            part,
                            brand,
                            category,
                            description,
                            "spare parts",
                            "gas turbine",
                        ],
                    )
                ),
                "description": description,
            }
        )

    output.sort(key=lambda item: (item["brand"].lower(), item["part"].lower()))

    os.makedirs(os.path.dirname(args.out), exist_ok=True)
    with open(args.out, "w", encoding="utf-8") as handle:
        json.dump(output, handle, ensure_ascii=False, separators=(",", ":"))

    # ------------------------------------------------------------------
    # Brand index: counts and categories across curated + imported products
    # ------------------------------------------------------------------
    brand_stats: dict[str, dict] = defaultdict(
        lambda: {"count": 0, "categories": Counter()}
    )

    def count_brand(raw_brand: str, part: str, category: str) -> None:
        brand = normalize_brand(raw_brand, part)
        stats = brand_stats[brand]
        stats["count"] += 1
        if category:
            stats["categories"][category] += 1

    for item in curated:
        part = item.get("part", "")
        category = normalize_category(
            item.get("category", ""),
            " ".join(filter(None, [item.get("title", ""), item.get("description", "")])),
        )
        count_brand(item.get("brand", ""), part, category)

    for item in output:
        count_brand(item["brand"], item["part"], item["category"])

    brands_output = []
    for brand, stats in brand_stats.items():
        categories = [
            name for name, _ in stats["categories"].most_common() if name
        ]
        group = BRAND_GROUPS.get(brand)
        if not group:
            top_category = categories[0] if categories else ""
            group = CATEGORY_GROUP.get(top_category, "Turbines & Power Generation")
        existing = existing_brands.get(brand, {})
        brands_output.append(
            {
                "name": brand,
                "count": stats["count"],
                "group": group,
                "categories": categories,
                "description": existing.get("description")
                or (
                    f"Genuine and OEM-equivalent {brand} spare parts for gas "
                    f"turbines, compressors and industrial plant, sourced and "
                    f"verified by AGO Aviation."
                ),
            }
        )

    brands_output.sort(key=lambda item: (-item["count"], item["name"].lower()))

    os.makedirs(os.path.dirname(args.brands_out), exist_ok=True)
    with open(args.brands_out, "w", encoding="utf-8") as handle:
        json.dump(brands_output, handle, ensure_ascii=False, indent=2)
        handle.write("\n")

    brands = Counter(item["brand"] for item in output)
    categories = Counter(item["category"] for item in output)
    print(f"product pages parsed: {len(pages)}")
    print(f"table records: {len(records)}")
    print(f"curated parts excluded: {len(curated_parts)}")
    print(f"imported unique parts: {len(output)}")
    print(f"brands written: {len(brands_output)}")
    print(f"output: {args.out}")
    print(f"brand index: {args.brands_out}")
    print("\nBrands (imported):")
    for name, count in brands.most_common():
        print(f"  {count:6d}  {name}")
    print("\nCategories (imported):")
    for name, count in categories.most_common():
        print(f"  {count:6d}  {name}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
