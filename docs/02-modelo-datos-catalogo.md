# Modelo de datos

Es la pieza más crítica del proyecto. Objetivo: 500–1.000 referencias sin rediseñar la web, y dos recorridos sin duplicar fichas.

> **Estado:** propuesta técnica (D-23). Todos los ejemplos son **FICTICIOS**; no usar como contenido real.

## 1. Principio: mismos schemas hoy (JSON) y mañana (CMS)

- Fase 1: archivos en `src/data/*.json`, cargados con el Content Layer de Astro (loader `file()`) y validados con schemas (`src/content.config.ts`).
- Fase 2: se reemplaza **solo el loader** (de `file()` a un loader que consulta el CMS de Harvi en build). Los schemas, las páginas y los componentes no cambian.
- Consecuencia: el formato JSON debe imitar cómo el CMS va a entregar los datos. Cuando estén los docs del CMS (D-09) se ajusta el schema, no la UI.

## 2. Colecciones

| Colección | Archivo (fase 1) | Descripción |
|---|---|---|
| `lines` | `lines.json` | Las 10 soluciones/líneas |
| `manufacturers` | `manufacturers.json` | Empresas representadas (doc: 12, que es la referencia; sitio actual: 7. T-14, P-07) |
| `products` | `products.json` | **Todo** lo comercializable: instrumentos, reactivos, controles, calibradores, consumibles, software, accesorios |
| `services` | `services.json` | 6 servicios |
| `posts` | `posts.json` | Novedades, eventos, contenido científico, empresas representadas |
| `jobs` | `jobs.json` | Búsquedas abiertas |
| `pages` | `pages.json` | Contenido editable de páginas (banners de Home, Nosotros, Su Socio ES/EN, Trabajá con Nosotros) |
| `site` | `site.json` | Datos globales: contacto, sedes, redes (D-06) |

## 3. `products` — atributos estructurados

Según el documento del cliente:

| Campo | Tipo | Ejemplo (ficticio) | Notas |
|---|---|---|---|
| `id` | string | `prd-0001` | estable, no cambia |
| `slug` | string | `reactivo-ejemplo-a` | único, URL de la ficha |
| `name` | string | "Reactivo Ejemplo A" | |
| `lineId` | ref → `lines` | `inmunologia` | Línea |
| `kind` | enum | `instrument` \| `reagent` \| `control` \| `calibrator` \| `consumable` \| `software` \| `accessory` | Categoría |
| `subcategory` | string? | "Autoinmunidad" | |
| `manufacturerId` | ref → `manufacturers` | `fabricante-x` | Empresa |
| `platformIds` | ref[] → `products` (kind=instrument) | `["prd-0100"]` | **Plataforma**. Vacío = no requiere instrumento |
| `compatibility` | enum | `specific` \| `open` | Específica / Sistema abierto |
| `application` | string | "Diagnóstico de…" | Aplicación |
| `presentation` | string? | "XXX determinaciones" | Presentación |
| `relatedIds` | ref[] → `products` | control / calibrador | Productos relacionados |
| `documents` | `{type,title,url}[]` | ficha, brochure | Documentación (PDF) |
| `status` | enum | `active` \| `discontinued` | Estado |
| `image` | ruta | foto de caja | |
| `summary` / `description` | string | | Copy ES |
| `seo` | `{title?,description?}` | | opcional |

### 3.1 Relación producto ↔ instrumento (sin duplicar)

- Se **guarda un solo lado**: el reactivo/control/consumible declara `platformIds` (a qué instrumentos sirve).
- El lado inverso ("reactivos compatibles" del instrumento) se **deriva en build** con un índice invertido (`src/lib/catalog.ts`). Así no hay dos fuentes de verdad que se desincronicen.
- Los "controles y calibradores" de un instrumento se derivan del mismo índice filtrando por `kind`.
- Software/conectividad y documentación del instrumento son `products` de `kind=software` con `platformIds` y `documents` propios.

### 3.2 Los dos recorridos son vistas, no copias

| Vista | Consulta |
|---|---|
| Solución → Sistemas | `products` con `kind=instrument` y `lineId=X` |
| Instrumento → compatibles | índice invertido por `platformIds` |
| Solución → Productos sin instrumento | `lineId=X` y `platformIds` vacío |
| Productos → filtros | por línea, `kind`, `manufacturerId`, `application`, `compatibility`, plataforma |
| Ficha | `/productos/[slug]` única, con breadcrumb según el camino de llegada |

Los instrumentos también tienen ficha en `/productos/[slug]`; la página de instrumento dentro de la solución (`/soluciones/[linea]/[instrumento]`) es la vista de "sistema completo" y su canonical apunta a la ficha única **o** viceversa (**decidir en D-23 para evitar contenido duplicado en SEO**).

## 4. Otras colecciones (campos mínimos)

```ts
lines:         { id, slug, name, summary, order, image?, seo? }
manufacturers: { id, slug, name, logo, country?, website?, order }   // logos en blanco/negro/color según fondo
services:      { id, slug, name, summary, body, order }               // 6, expandibles
posts:         { id, slug, section: 'novedades'|'eventos'|'cientifico'|'empresas',
                 category, image, date, title, excerpt, body, tags[], manufacturerId?, seo? }
jobs:          { id, area, title, description, location, status: 'open'|'closed' }
pages:         { id, locale: 'es'|'en', blocks[] }   // banners home (2–3), hero, etc.
site:          { contact, offices[], hours, social[] }
```

`posts` deben soportar filtro por palabra clave (`tags` + texto).

## 5. Índices derivados en build

- `reverseCompat`: instrumento → productos compatibles.
- `productsByLine`, `productsByManufacturer`.
- `searchIndex.json`: producto, ensayo/analito, instrumento, marca (para el buscador; ver SPEC §7). El campo "ensayo/analito" **no está en el modelo del cliente** y hay que definir si se agrega (D-21).

## 6. Escalabilidad (RNF)

- Build con 1.000 productos sin degradación notable: medir con datos semilla sintéticos (issue de la Epic 3).
- Índices calculados una vez por build, no por página.
- Listados paginados o filtrables en cliente sobre un JSON liviano; no cargar fichas completas en listados.

## 7. Mapeo al CMS de Harvi (fase 2)

| Colección | Colección CMS | Pendiente |
|---|---|---|
| todas | a definir | Doc/API del CMS (D-09): endpoints, auth, uploads (PDF/imágenes), relaciones |
| `formSubmissions` (nueva) | a definir | Guardado de las 3 consultas (ver `03-formularios.md`) |

## 8. Ejemplo ficticio

```json
{ "id": "prd-0100", "slug": "instrumento-ejemplo", "name": "Instrumento Ejemplo",
  "lineId": "hemostasia", "kind": "instrument", "manufacturerId": "fabricante-x",
  "platformIds": [], "compatibility": "specific", "status": "active" }

{ "id": "prd-0001", "slug": "reactivo-ejemplo-a", "name": "Reactivo Ejemplo A",
  "lineId": "hemostasia", "kind": "reagent", "manufacturerId": "fabricante-x",
  "platformIds": ["prd-0100"], "compatibility": "specific",
  "relatedIds": ["prd-0002"], "status": "active" }
```
