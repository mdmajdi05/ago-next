#!/usr/bin/env node
/**
 * Removes the boilerplate sentence that an earlier enrichment pass appended to
 * legacy catalogue descriptions.
 *
 * The original record text (component label, OEM one-liner or technical string)
 * is preserved. Rows whose description was only "Genuine BRAND PART" become
 * empty, and the content engine then writes an honest record note instead.
 *
 * Usage: node scripts/clean-legacy-descriptions.mjs [--write]
 */
import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve('src/data/static/products/legacy-catalog.json');
const rows = JSON.parse(fs.readFileSync(file, 'utf8'));

const escape = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

let changed = 0;
let emptied = 0;

const cleaned = rows.map((row) => {
  const original = typeof row.description === 'string' ? row.description : '';
  let text = original.replace(/\s+/g, ' ').trim();

  text = text
    .replace(
      /\s+spare part for [^.]{1,140}\.\s*Request a quote for availability, condition and lead time(?: from AGO Aviation)?\.?\s*$/i,
      ''
    )
    .trim();

  if (row.brand && row.part) {
    const stub = new RegExp(
      `^Genuine\\s+${escape(row.brand)}\\s+${escape(row.part)}\\s*$`,
      'i'
    );
    text = text.replace(stub, '').trim();
  }

  if (text !== original) changed += 1;
  if (!text) emptied += 1;

  return { ...row, description: text };
});

console.log(`rows: ${rows.length}`);
console.log(`descriptions changed: ${changed}`);
console.log(`descriptions emptied (stub only): ${emptied}`);

if (process.argv.includes('--write')) {
  fs.writeFileSync(file, JSON.stringify(cleaned));
  console.log(`written: ${file}`);
} else {
  console.log('dry run — pass --write to apply');
}
