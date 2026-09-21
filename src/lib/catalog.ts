import { getCollection } from 'astro:content';

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
