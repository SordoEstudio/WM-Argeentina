---
name: contenido-seo
description: Usar al escribir, cargar o revisar contenido y SEO de WM Argentina (Nosotros, soluciones, novedades, contenido científico, metadatos, datos estructurados, redirects, versión en inglés de Su Socio). Cuida la precisión sanitaria y el posicionamiento científico.
---

# Contenido y SEO — WM Argentina

Leer antes: `docs/04-contenido-soluciones.md`, `docs/05-referencias-cliente.md`, `docs/01-sitemap-arquitectura.md` §5, `SPEC.md` §10.

## Contenido
1. **No inventar** datos de producto, cifras, certificaciones, casos de éxito ni empresas. Sin dato real: `TODO-CLIENTE`.
2. **Comunicación sanitaria prudente:** evitar afirmaciones absolutas ("el diagnóstico más exacto"). Preferir "contribuir a diagnósticos confiables y decisiones clínicas más seguras".
3. Marca siempre **WM Argentina**. Pie de marca: "Mejorando la Vida a cada instante".
4. Respetar el trato de cada texto del cliente ("vos" en Trabajá con Nosotros; formal en Su Socio). No unificar sin preguntar.
5. Los comentarios del redactor en el documento fuente son criterio, no texto publicable (T-12).
6. Cada sección cierra con 1–2 CTA claros.
7. Inglés de Su Socio: traducción a confirmar por el cliente (D-12); no publicar traducción automática sin revisión.

## SEO
- Un solo `<h1>` por página; jerarquía de encabezados correcta.
- `title` y `description` únicos por página; canonical; Open Graph.
- Ficha única de producto = URL canónica; el resto de los recorridos enlaza a ella.
- Datos estructurados: `Organization`, `BreadcrumbList`, `Product`, `Article`.
- `hreflang` recíproco ES ↔ EN (Su Socio). `lang` correcto.
- Novedades y contenido científico: categoría + imagen + fecha + título + resumen + "Leer más", con URL estable.
- `noindex` en previews y staging; **sin** `noindex` en producción (el sitio actual lo tiene).
- Redirects 301 según `docs/01` §5 (D-18), sin cadenas.

## Preguntar antes de suponer
Contenido de las 10 líneas (P-10), datos de contacto (P-06), empresas representadas (P-07), lista de tipos de novedades (P-21). Todo pedido va a `docs/11-pedidos-al-cliente.md`.
