# SPEC — WM Argentina Web

Cómo se construye lo definido en `REQUIREMENTS.md`. Todo lo marcado **(propuesta)** o **(spike)** se confirma antes de implementar; nada se da por hecho (ver `AGENTS.md` §1.1).

## 1. Arquitectura

```
┌────────────────────────┐   Fase 1: JSON local (src/data)
│  Astro + TypeScript    │◄──Fase 2: CMS Harvi (build-time, vía loader)
│  sitio estático (SSG)  │
└──────┬─────────────────┘
       │ deploy        ┌────────────────────────────┐
       ▼               │ CMS Harvi (Next.js+MongoDB)│
   Vercel  ◄─ Deploy Hook ── publica contenido      │
       ▲                └───────────▲───────────────┘
       │ /api/* (serverless)        │ guarda consultas
       └────────── formularios ─────┘
```

- **Estático por defecto.** Solo `/api/contact`, `/api/partner` y `/api/careers` corren en servidor (Vercel functions).
- **Un origen de datos intercambiable** (JSON → CMS) sin tocar páginas.
- **Astro:** última versión estable al hacer el scaffold; leer su guía de upgrade y docs (las APIs de `content.config`, `astro:assets`, i18n, CSP y fuentes cambiaron entre mayores). *(spike S-1)*

## 2. Estructura del repo (propuesta)

```
src/
  content.config.ts        schemas + loaders (JSON hoy, CMS mañana)
  data/                    *.json (Fase 1)
  lib/
    catalog.ts             índices derivados (compatibilidad inversa, por línea, etc.)
    search-index.ts        genera searchIndex.json
    i18n.ts                textos ES/EN de Su Socio
    forms/                 schemas de formularios + FormSink (dev | cms)
    cms/                   cliente del CMS (Fase 2)
  components/
    brand/ (Logo, Isotype, Decoration)   ui/ (Button, Card, Accordion, Field…)
    catalog/ (LineCard, InstrumentCard, ProductCard, Filters, CompatList)
    layout/ (Header, MegaMenu, Footer, Cta)
  layouts/                 Base.astro (SEO, tokens, lang)
  pages/
    index.astro  nosotros.astro  servicios.astro  contacto.astro
    soluciones/  productos/  novedades/  trabaja-con-nosotros.astro  buscar.astro
    su-socio-en-argentina.astro   en/your-partner-in-argentina.astro
    api/contact.ts  api/partner.ts  api/careers.ts
  styles/  tokens.css  global.css
public/    robots.txt, favicons, brochures/ (si aplica)
```

## 3. Rutas
Ver `docs/01-sitemap-arquitectura.md` §1. Rutas dinámicas con `getStaticPaths` desde las colecciones. Slugs estables e inmutables (los redirects y los enlaces internos dependen de ellos).

## 4. Datos

Detalle en `docs/02-modelo-datos-catalogo.md`.

**Content Layer (propuesta):** cada colección se define en `src/content.config.ts` con schema y loader. Fase 1 usa el loader de archivo JSON; Fase 2 cambia el loader por uno que consulta el CMS en build. Boceto (verificar contra la versión instalada de Astro):

```ts
// src/content.config.ts — BOCETO, no copiar sin validar contra la API de la versión instalada
import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const products = defineCollection({
  loader: file('src/data/products.json'),          // Fase 2: cmsLoader('products')
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    lineId: z.string(),
    kind: z.enum(['instrument','reagent','control','calibrator','consumable','software','accessory']),
    manufacturerId: z.string(),
    platformIds: z.array(z.string()).default([]),
    compatibility: z.enum(['specific','open']),
    status: z.enum(['active','discontinued']),
    // … ver docs/02
  }),
});
export const collections = { products /* lines, manufacturers, services, posts, jobs, pages, site */ };
```

**Integridad referencial:** un script de build (`scripts/check-refs.ts`) falla si un `lineId`, `manufacturerId`, `platformIds` o `relatedIds` apunta a algo inexistente, o si hay slugs duplicados.

**Índices derivados** (`src/lib/catalog.ts`, funciones puras y testeables): `reverseCompat`, `productsByLine`, `productsWithoutPlatform(line)`, `productsByManufacturer`.

## 5. Contenido editable de Home (D-24)

Colección `pages` con bloque `homeBanners[2..3]`: `{ image, title, text, cta[1..2], order, active, validFrom?, validTo? }`. Validación: mínimo 2, máximo 3 activos. Todos los campos editables desde el CMS en Fase 2.

## 6. i18n

- Idioma por defecto: `es`, sin prefijo. Inglés solo para Su Socio en `/en/...`.
- `<html lang>` correcto por página; `hreflang` recíproco entre las dos versiones; selector de idioma visible solo en esa página.
- Textos de interfaz de esa página (labels, errores, CTA) en `src/lib/i18n.ts`; el copy largo vive en la colección `pages` con `locale`.
- Se usa el routing i18n de Astro **solo si simplifica**; con un único par de páginas puede ser más claro definirlas a mano. *(spike S-2)*

## 7. Buscador

- **Cliente, sin servidor.** Dos piezas (propuesta, aprobada en T-03):
  1. **Pagefind** para texto completo de páginas (novedades, contenido científico, fichas).
  2. **`searchIndex.json` liviano** para el catálogo (producto, ensayo/analito, instrumento, marca) con filtros por línea, tipo, empresa, aplicación y compatibilidad.
- Cargar el índice **bajo demanda** (al abrir el buscador).
- **Spike S-3:** confirmar en qué carpeta genera salida el adaptador de Vercel para correr Pagefind sobre el HTML final, y automatizarlo en el script de build.

## 8. Formularios

Detalle en `docs/03-formularios.md`.

```ts
interface FormSink {
  save(kind: 'contact' | 'partner' | 'careers', payload: unknown, meta: SubmissionMeta): Promise<void>;
}
// devSink: no persiste (solo desarrollo). cmsSink: guarda en el CMS (Fase 2).
```

- Variable `FORM_SINK=dev|cms`. El build/arranque de producción **debe fallar** si `FORM_SINK=dev`.
- Endpoints con `export const prerender = false` (o el equivalente de la versión instalada) para ejecutarse en servidor.
- Schemas compartidos cliente/servidor. Errores por campo, honeypot, rate limiting (D-11).
- Mejora progresiva: el formulario funciona sin JavaScript y se mejora con validación en el cliente.

## 9. Marca y estilos

Detalle en `docs/06-marca-y-ui.md`. `tokens.css` es la única fuente de colores/tipografías. Enfoque de estilos **pendiente (D-13)**; hasta entonces, CSS con variables.
`Logo.astro` elige la versión (color/blanco/negro, horizontal/vertical, con/sin pie) según fondo y ancho.

## 10. SEO técnico

- Componente `Seo.astro`: title, description, canonical, OG/Twitter, `robots` (noindex fuera de producción).
- Datos estructurados: `Organization`, `BreadcrumbList`, `Product`, `Article`.
- `sitemap` y `robots.txt` generados; sitemap con alternates ES/EN para Su Socio.
- Detalle editorial en `.claude/skills/contenido-seo`.

## 11. Variables de entorno (nombres propuestos)

| Variable | Dónde | Notas |
|---|---|---|
| `DATA_SOURCE` | build | `json` (Fase 1) \| `cms` (Fase 2) |
| `CMS_URL`, `CMS_READ_TOKEN` | build (servidor) | Nunca `PUBLIC_` |
| `CMS_WRITE_TOKEN` | funciones | Solo crear envíos |
| `FORM_SINK` | funciones | `dev` \| `cms`; prohibido `dev` en producción |
| `SITE_URL` | build | Para canonical/sitemap |
| `ANTI_SPAM_*` | funciones | Según D-11 |

Se documentan en `.env.example` (sin valores reales).

## 12. Plan por Epics y fases

| Epic | Nombre | Fase | RF/RNF principales |
|---|---|---|---|
| 1 | Fundaciones y tooling (Astro, TS, Vercel, skills, CI local) | 1 | RNF-01, 02, 09 |
| 2 | Marca y sistema de diseño | 1 | RF-60…63 |
| 3 | Capa de datos JSON y contenido inicial | 1 | RF-70, 71, RNF-03 |
| 4 | Catálogo: soluciones, instrumentos, productos, doble recorrido | 1 | RF-10…17 |
| 5 | Buscador | 1 | RF-20, 21 |
| 6 | Páginas institucionales (Home, Nosotros, Servicios, Trabajá con Nosotros) | 1 | RF-01…04, 30, 31, 33 |
| 7 | Novedades y conocimiento | 1 | RF-32, 82 |
| 8 | Formularios (Contacto, Su Socio, Trabajá con Nosotros) | 1→2 | RF-40…46 |
| 9 | Su Socio en Argentina ES/EN | 1 | RF-43, 50, 51 |
| 10 | Integración CMS Harvi y Deploy Hook | 2 | RF-45, 72…74 |
| 11 | SEO técnico y redirects | 1→3 | RF-80…82 |
| 12 | Pre-publicación: seguridad, rendimiento y responsive | 3 | RNF-04…08, 10, 13 |

**Spikes iniciales:** S-1 versión de Astro y APIs vigentes · S-2 estrategia i18n · S-3 Pagefind + adaptador Vercel · S-4 prueba de build con 1.000 productos sintéticos.

## 13. Fuera de este documento
Reglas de trabajo: `AGENTS.md`. Decisiones abiertas: `docs/08-decisiones-pendientes.md`. Checklist de salida: `docs/09-checklist-prepublicacion.md`.
