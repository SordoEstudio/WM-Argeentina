import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const documentSchema = z.object({
  type: z.string(),
  title: z.string(),
  url: z.string(),
});

const seoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
}).optional();

const lines = defineCollection({
  loader: file('src/data/lines.json'),
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    summary: z.string(),
    order: z.number(),
    image: z.string().optional(),
    seo: seoSchema,
  }),
});

const manufacturers = defineCollection({
  loader: file('src/data/manufacturers.json'),
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    logo: z.string(),
    country: z.string().optional(),
    website: z.string().optional(),
    order: z.number(),
    /** Datos del sitio anterior cargados como provisorios — requieren validación (P-07) */
    provisional: z.boolean().optional(),
    note: z.string().optional(),
  }),
});

const products = defineCollection({
  loader: file('src/data/products.json'),
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    lineId: z.string(),
    kind: z.enum(['instrument', 'reagent', 'control', 'calibrator', 'consumable', 'software', 'accessory']),
    subcategory: z.string().optional(),
    manufacturerId: z.string(),
    platformIds: z.array(z.string()).default([]),
    compatibility: z.enum(['specific', 'open']),
    application: z.string().optional(),
    // D-21: campo analytes pendiente de confirmar. Se incluye para preparar el buscador.
    analytes: z.array(z.string()).default([]),
    presentation: z.string().optional(),
    relatedIds: z.array(z.string()).default([]),
    documents: z.array(documentSchema).default([]),
    status: z.enum(['active', 'discontinued']),
    image: z.string().optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
    seo: seoSchema,
  }),
});

const services = defineCollection({
  loader: file('src/data/services.json'),
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    summary: z.string(),
    body: z.string(),
    order: z.number(),
  }),
});

const posts = defineCollection({
  loader: file('src/data/posts.json'),
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    section: z.enum(['novedades', 'eventos', 'cientifico', 'empresas']),
    category: z.string(),
    image: z.string().optional(),
    date: z.string(),
    title: z.string(),
    excerpt: z.string(),
    body: z.string(),
    tags: z.array(z.string()).default([]),
    manufacturerId: z.string().optional(),
    seo: seoSchema,
  }),
});

const jobs = defineCollection({
  loader: file('src/data/jobs.json'),
  schema: z.object({
    id: z.string(),
    area: z.string(),
    title: z.string(),
    description: z.string(),
    location: z.string(),
    status: z.enum(['open', 'closed']),
  }),
});

// pages: contenido editable de páginas (banners home, Su Socio ES/EN, etc.)
// Fase 2: reemplazar loader por CMS loader sin cambiar schemas ni páginas
const pages = defineCollection({
  loader: file('src/data/pages.json'),
  schema: z.object({
    id: z.string(),
    locale: z.enum(['es', 'en']),
    blocks: z.record(z.string(), z.unknown()),
  }),
});

export const collections = { lines, manufacturers, products, services, posts, jobs, pages };
