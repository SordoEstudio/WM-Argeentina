import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildSearchIndex } from '../lib/catalog';

export const GET: APIRoute = async () => {
  const products = await getCollection('products');
  const index = buildSearchIndex(products);
  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};
