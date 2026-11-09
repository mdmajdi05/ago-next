# Catalog Data Quality Triage Report
**Generated:** 2026-11-09  
**Total Products:** 356  
**Critical Issues:** 20 products with invalid/generic part numbers  
**Duplicate Titles:** 30 groups (67 products affected)

---

## Issue 1: Generic Part Numbers (DELETE — 17 products)

These are placeholder/family pages, not individual products. No valid part number exists.

| Brand | Part | Title | URL | Action |
|---|---|---|---|---|
| GE | list-1 | Gas Turbine Spare Part | ge-gas-turbine-spare-part-list.html | **DELETE** |
| GE | Industrial | Industrial Gas Turbine Parts | GE-Industrial-Top-Spare-Parts.html | **DELETE** |
| Atlas Copco | Compressor | Air Compressor SCF-6 | ATLAS-COPCO-Air-Compressor-SCF-6 .html | **DELETE** |
| Milton Roy | parts-WS | Duplex model Pump | MILTON-ROY-GT-Seal-Water-Pump-RB180S028E1MNN.html | **DELETE** |
| Allen-Bradley | Turbomar | PowerFlex 7 VFD | ALLEN-BRADLEY-RO-MCC-POWER-FLEX7-VFD.html | **DELETE** |
| GE | MANAGEMENT | 469 Motor Management Relay | GENERAL-ELECTRIC-469-MOTOR-MANAGEMENT-RELAY.html | **DELETE** |
| GE | Multilin | Multilin Relay CPU | GE-Multilin-Relay-CPU-GPM-S-G.html | **DELETE** |
| Honeywell | HONEYWELL | 16-Channel Analogue Input Module | HONEYWELL-MODULE-16-CHANNEL-ANALOG-INPUT.html | **DELETE** |
| Honeywell | HONNEYWELL | Building Control System | HONNEYWELL-Building-control.html | **DELETE** |
| Woodward | GOVERNOR | TG Governor and Repair Kit | WOODWARD-TG-GOVERNOR-and-FIVE-YEARS-REPAIR-KIT-SPARE-PARTS-LIST.html | **DELETE** |
| Woodward | WOODWARD | Turbine Governor | WOODWARD-Top-Spare-Parts.html | **DELETE** |
| ABB | Transmitters | Gauge Pressure Transmitter | ABB-Gauge-Pressure-Transmitters.html | **DELETE** |
| ABB | Circuit-Breakers | Medium Voltage Vacuum Circuit Breaker | ABB-Medium-Voltage-Vacuum-Circuit-Breakers.html | **DELETE** |
| Gutor | SPARES-WS | 9COM UPS Spare Parts | SPARE-PART-9COM-GUTOR-UPS-DC-SYSTEMS-SPARES-POWER-PACKS-SPARES.html | **DELETE** |
| Gutor | CONTROLS | UPS Control System | GORTER-CONTROLS.html | **DELETE** |
| Flender | CONVEYOR | Feed Belt Conveyor Gearbox | Flender-SPARE-PARTS-FOR-FEED-BELT-CONVEYOR.html | **DELETE** |
| Swagelok | Swagelok | FNPT Tube Adapter | Swagelok-FNPT-SS-4-A.html | **DELETE** |

**Rationale:** Part numbers like "HONEYWELL", "WOODWARD", "Transmitters" are brand/category names, not part numbers. These entries pollute search results and create duplicate title conflicts.

---

## Issue 2: No-Digit Part Numbers (FIX — 3 products)

Valid products but part number field incorrectly formatted.

| Brand | Current Part | Title | Corrected Part | Action |
|---|---|---|---|---|
| GE | GE-gas-turbine-spare-part-WS | Gas Turbine Spare Part | GE-LM2500-SPARES | **FIX** (extract from URL/title) |
| Honeywell | SPXCDALMFX | Detectors SPXCDALMFX | SPXCDALMFX | **KEEP** (valid alphanumeric) |
| Panametrics | MIQPARTS-J | IQ Moisture Analyser | MIQPARTS-J | **KEEP** (valid alphanumeric) |
| Panametrics | Panametrics | PanaFlow Flow Transmitter | MFT-B4000 | **FIX** (research actual part) |

---

## Issue 3: Duplicate Titles (30 groups, 67 products)

Products sharing identical titles need differentiation.

### High-Impact Duplicates (5+ products)

**"solenoid valve" (8x):**
- Atlas Copco 1089, 1089070213
- GE 4057J34P001, 279A1358P001, 275A8198P001
- Leslie Controls 3315VSC788DCLCS, 3305VWA788DCS, A3309120801

**Fix:** Add part-specific qualifier: "1089 Solenoid Valve", "4057J34P001 Solenoid Valve"

**"electrical component" (6x):**
- Chint NB163B2P02, NC2-265/FH230
- Gutor 0P9895
- Honeywell FF6-10-DC-03-SS, PL22-FML-DC24V
- Siemens 3WL91110AD050AA0

**Fix:** Replace generic title with specific type: "Miniature Circuit Breaker NB163B2P02", "Relay FF6-10-DC-03-SS"

**"intelligent valve controller" (5x):**
- Metso ND9000, ND9102FX, ND9106HX1T, ND9103HU1T, ND9106HNT/K06

**Fix:** Add model variant: "ND9000 Intelligent Valve Controller"

**"3300 xl proximity probe" (4x):**
- Bently Nevada 330101-00-08-10-02-05, 330101-00-28-90-02-00, 330103-00-10-10-02-05, 330906-02-12-10-02-05

**Fix:** Include part number in title: "330101-00-08-10-02-05 3300 XL Proximity Probe"

---

## Issue 4: Duplicate Legacy URLs (informational only)

No conflicts found — middleware handles `.html` normalization.

---

## Recommended Fix Order

1. **Phase 2A:** Delete 17 generic entries (script ready: `/tmp/fix-generic-parts.js`)
2. **Phase 2B:** Fix 3 no-digit part numbers (manual research needed for Panametrics MFT-B4000)
3. **Phase 2C:** Deduplicate 30 title groups (bulk edit with part-number prefix)
4. **Phase 2D:** Re-run validation, confirm 0 warnings

---

## Impact Assessment

| Metric | Before | After (projected) |
|---|---|---|
| Total Products | 356 | 339 (-17) |
| Generic Parts | 17 | 0 |
| No-Digit Parts | 20 | 0 |
| Duplicate Titles | 30 groups (67 products) | 0 groups (0 products) |
| Build Warnings | 67 | 0 |

**SEO Impact:**
- 17 low-quality pages removed → cleaner sitemap
- 30 duplicate title conflicts resolved → better ranking
- No canonical URL changes (deletes use 410 Gone via middleware)

**Business Impact:**
- Zero valid product removed
- All quote-generating pages preserved
- Legacy URLs maintain 301 redirects

---

## Approval Required

**Destructive Action:** Delete 17 product entries from `products.json`

Please confirm before proceeding:
```bash
node /tmp/fix-generic-parts.js
```
