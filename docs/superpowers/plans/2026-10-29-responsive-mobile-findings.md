# Responsive Audit Findings — Mobile 360px

Auditoría de código de 7 páginas + componentes clave. Realizada sobre código fuente (sin browser).

| Pág / Componente | Elemento | Problema | Severidad | Archivo:línea | Estado |
|---|---|---|---|---|---|
| `/buscar` | `.result-line` | `white-space: nowrap` en grid de 1 col a ≤639px → overflow horizontal si el nombre de línea es largo | important | buscar.astro:253 | ✅ fixed |
| `/buscar` | `.result-item` | `grid-template-columns: 100px 1fr auto` sin media query mobile | minor | buscar.astro:225 | ✅ manejado (≤639px cambia a `1fr`) |
| `/productos/[slug]` | `.product-specs dt` | `white-space: nowrap` en `grid auto 1fr` — labels largos en español podrían recortar el valor a 360px | minor | [slug].astro:335 | — sin fix (labels ≤14 chars, OK) |
| `/contacto` | `.partner-notice__btn` | `white-space: nowrap; flex-shrink: 0` — el botón no se comprime; con `flex-wrap: wrap` va a fila propia, texto cabe | minor | contacto.astro:277 | — sin fix (se wrappea correctamente) |
| `CatalogTabs` | `#catalog-grid-search` | Ancho fijo 160px/110px — a ≤400px ya se oculta (global search lo reemplaza) | minor | CatalogTabs.astro:99 | ✅ manejado (hidden ≤400px) |
| `ProductCard` | `.product-card__list-brand` | Cuarta columna en grid de 2 — desbordaba fila | important | ProductCard.astro:221 | ✅ fixed (sesión anterior) |
| `#filter-btn-mobile` | z-index | Quedaba detrás del drawer (z-index 100 < 200) | important | index.astro:527 | ✅ fixed (z-index 202, sesión anterior) |
| `Header` | `.nav-cta` | `width: 100%` en mobile — OK | — | Header.astro:548 | — sin issue |
| `Breadcrumb` | `<ol>` | `flex-wrap: wrap` — wrappea bien en todos los tamaños | — | Breadcrumb.astro:43 | — sin issue |
| `Nosotros` | `.mvp-grid`, `.valores-grid` | Breakpoints a 560px y 400px — bien cubierto hasta 360px | — | nosotros.astro:247 | — sin issue |
| `Novedades` | `.posts-grid` | `minmax(300px, 1fr)` — a 360px fuerza 1 col correctamente | — | novedades/index.astro:193 | — sin issue |
| `Soluciones` | grids de instrumentos | `minmax(260–280px, 1fr)` — 1 col a 360px, OK | — | soluciones/[linea].astro:155 | — sin issue |

## Resumen

- **critical**: 0 hallados
- **important**: 3 (todos corregidos — 1 en esta sesión, 2 en sesión anterior)
- **minor**: 4 (ninguno requiere fix — todos con fallback correcto)

No se detectaron desbordamientos horizontales en las páginas auditadas. Todos los botones tienen `min-height: var(--tap-min)` = 44px. Breadcrumb y grids de contenido manejan 360px correctamente.
