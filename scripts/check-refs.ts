/**
 * check-refs.ts — Validación de integridad referencial del catálogo.
 * Falla si hay lineIds, manufacturerIds, platformIds o relatedIds rotos,
 * o slugs duplicados en la misma colección.
 * Ejecutar: npx tsx scripts/check-refs.ts
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const root = fileURLToPath(new URL('..', import.meta.url));

function load<T>(path: string): T {
  const full = resolve(root, path);
  return JSON.parse(readFileSync(full, 'utf-8')) as T;
}

interface Line { id: string; slug: string }
interface Manufacturer { id: string; slug: string }
interface Product {
  id: string;
  slug: string;
  lineId: string;
  manufacturerId: string;
  platformIds: string[];
  relatedIds: string[];
}

const lines = load<Line[]>('src/data/lines.json');
const manufacturers = load<Manufacturer[]>('src/data/manufacturers.json');
const products = load<Product[]>('src/data/products.json');

const errors: string[] = [];

const lineIds = new Set(lines.map((l) => l.id));
const manufacturerIds = new Set(manufacturers.map((m) => m.id));
const productIds = new Set(products.map((p) => p.id));
const productSlugs = new Set<string>();

// Duplicate slug check
for (const p of products) {
  if (productSlugs.has(p.slug)) {
    errors.push(`Duplicate product slug: "${p.slug}"`);
  }
  productSlugs.add(p.slug);
}

// Referential integrity
for (const p of products) {
  if (!lineIds.has(p.lineId)) {
    errors.push(`Product "${p.id}" has unknown lineId: "${p.lineId}"`);
  }
  if (!manufacturerIds.has(p.manufacturerId)) {
    errors.push(`Product "${p.id}" has unknown manufacturerId: "${p.manufacturerId}"`);
  }
  for (const pid of p.platformIds) {
    if (!productIds.has(pid)) {
      errors.push(`Product "${p.id}" has unknown platformId: "${pid}"`);
    }
    const target = products.find((x) => x.id === pid);
    if (target && target.id !== 'instrument' && !['instrument'].includes(target.id)) {
      // OK — just checking existence
    }
  }
  for (const rid of p.relatedIds) {
    if (!productIds.has(rid)) {
      errors.push(`Product "${p.id}" has unknown relatedId: "${rid}"`);
    }
  }
}

if (errors.length > 0) {
  console.error('\n❌ Referential integrity errors:\n');
  errors.forEach((e) => console.error('  •', e));
  console.error(`\n${errors.length} error(s) found. Fix before building.\n`);
  process.exit(1);
} else {
  console.log(`✅ check-refs: ${products.length} products, ${lines.length} lines, ${manufacturers.length} manufacturers — all references valid.`);
}
