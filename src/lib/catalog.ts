import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type ProductEntry = Awaited<ReturnType<typeof getCollection<'products'>>>[number];

/**
 * Builds an inverted index: instrumentId → compatible product IDs.
 * Only products that list an instrument in platformIds appear here.
 */
export function buildReverseCompat(products: ProductEntry[]): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const p of products) {
    for (const platformId of p.data.platformIds) {
      const existing = map.get(platformId) ?? [];
      existing.push(p.data.id);
      map.set(platformId, existing);
    }
  }
  return map;
}

/** All products for a given lineId, sorted by name. */
export function productsByLine(products: ProductEntry[], lineId: string): ProductEntry[] {
  return products
    .filter((p) => p.data.lineId === lineId)
    .sort((a, b) => a.data.name.localeCompare(b.data.name, 'es'));
}

/** Instruments within a line. */
export function instrumentsByLine(products: ProductEntry[], lineId: string): ProductEntry[] {
  return productsByLine(products, lineId).filter((p) => p.data.kind === 'instrument');
}

/** Products in a line that don't require a specific instrument (platformIds empty). */
export function productsWithoutPlatform(products: ProductEntry[], lineId: string): ProductEntry[] {
  return productsByLine(products, lineId).filter(
    (p) => p.data.platformIds.length === 0 && p.data.kind !== 'instrument',
  );
}

/** Products for a given manufacturer. */
export function productsByManufacturer(
  products: ProductEntry[],
  manufacturerId: string,
): ProductEntry[] {
  return products
    .filter((p) => p.data.manufacturerId === manufacturerId)
    .sort((a, b) => a.data.name.localeCompare(b.data.name, 'es'));
}

/**
 * Returns products compatible with an instrument (via reverseCompat index),
 * optionally filtered by kind.
 */
export function compatibleProducts(
  products: ProductEntry[],
  reverseCompat: Map<string, string[]>,
  instrumentId: string,
  kind?: ProductEntry['data']['kind'],
): ProductEntry[] {
  const ids = new Set(reverseCompat.get(instrumentId) ?? []);
  return products.filter(
    (p) => ids.has(p.data.id) && (kind === undefined || p.data.kind === kind),
  );
}

/** Builds the lightweight search index for the catalog buscador. */
export function buildSearchIndex(products: ProductEntry[]): SearchIndexEntry[] {
  return products
    .filter((p) => p.data.status === 'active')
    .map((p) => ({
      id: p.data.id,
      slug: p.data.slug,
      name: p.data.name,
      kind: p.data.kind,
      lineId: p.data.lineId,
      manufacturerId: p.data.manufacturerId,
      application: p.data.application ?? '',
      analytes: p.data.analytes,
    }));
}

export interface SearchIndexEntry {
  id: string;
  slug: string;
  name: string;
  kind: string;
  lineId: string;
  manufacturerId: string;
  application: string;
  analytes: string[];
}

// ── Catalog UI types ────────────────────────────────────────────────────────

export interface CatalogProduct {
  id: string;
  slug: string;
  name: string;
  kind: string;
  lineId: string;
  lineName: string;
  manufacturerId: string;
  manufacturerName: string;
  applications: string[];
  analytes: string[];
  platformIds: string[];
  compatibility: string;
  subcategory: string;
  summary: string;
  image: string;
  status: string;
}

export interface CatalogIndex {
  products: CatalogProduct[];
  instruments: CatalogProduct[];
  analytes: string[];
  analytesByLine: Record<string, string[]>;
  applications: string[];
  manufacturers: Array<{ id: string; name: string }>;
  lines: Array<{ id: string; name: string; order: number }>;
}

export function buildCatalogIndex(
  rawProducts: CollectionEntry<'products'>[],
  rawManufacturers: CollectionEntry<'manufacturers'>[],
  rawLines: CollectionEntry<'lines'>[]
): CatalogIndex {
  const mfgMap = new Map(rawManufacturers.map((m) => [m.data.id, m.data.name]));
  const lineMap = new Map(rawLines.map((l) => [l.data.id, l.data.name]));

  const products: CatalogProduct[] = rawProducts
    .filter((p) => p.data.status === 'active')
    .map((p) => ({
      id: p.data.id,
      slug: p.data.slug,
      name: p.data.name,
      kind: p.data.kind,
      lineId: p.data.lineId,
      lineName: lineMap.get(p.data.lineId) ?? p.data.lineId,
      manufacturerId: p.data.manufacturerId,
      manufacturerName: mfgMap.get(p.data.manufacturerId) ?? p.data.manufacturerId,
      applications: p.data.application
        ? p.data.application.split(', ').filter(Boolean)
        : [],
      analytes: p.data.analytes ?? [],
      platformIds: p.data.platformIds ?? [],
      compatibility: p.data.compatibility ?? '',
      subcategory: p.data.subcategory ?? '',
      summary: p.data.summary ?? '',
      image: p.data.image ?? '',
      status: p.data.status,
    }));

  const analytesByLine: Record<string, string[]> = {};
  for (const p of products) {
    if (p.analytes.length === 0) continue;
    if (!analytesByLine[p.lineId]) analytesByLine[p.lineId] = [];
    for (const a of p.analytes) {
      if (!analytesByLine[p.lineId].includes(a)) analytesByLine[p.lineId].push(a);
    }
  }
  for (const key of Object.keys(analytesByLine)) analytesByLine[key].sort();

  return {
    products,
    instruments: products.filter((p) => p.kind === 'instrument'),
    analytes: [...new Set(products.flatMap((p) => p.analytes))].filter(Boolean).sort(),
    analytesByLine,
    applications: [...new Set(products.flatMap((p) => p.applications))].filter(Boolean).sort(),
    manufacturers: rawManufacturers.map((m) => ({ id: m.data.id, name: m.data.name })),
    lines: rawLines
      .map((l) => ({ id: l.data.id, name: l.data.name, order: l.data.order }))
      .sort((a, b) => a.order - b.order),
  };
}
