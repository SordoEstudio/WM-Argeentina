# Decisiones — tomadas y pendientes

Regla del proyecto: **preguntar antes de suponer**. Todo lo abierto se lista acá; los datos que tiene que entregar el cliente, en `11-pedidos-al-cliente.md`. Al resolver una decisión, actualizar su estado y los documentos afectados.

## A. Decisiones tomadas

| ID | Decisión | Fecha | Fuente |
|---|---|---|---|
| T-01 | Stack: Astro + TypeScript + Vercel + CMS propio de Harvi. **Sin Payload ni PostgreSQL.** Se rehace toda la documentación | 21/09/2026 | Pablo |
| T-02 | Primero se construye el sitio con datos en JSON; después se conecta el CMS real | 21/09/2026 | Pablo (resp. 9) |
| T-03 | Sitio estático (SSG) reconstruido por Deploy Hook de Vercel; formularios por endpoints serverless; buscador client-side | 21/09/2026 | Pablo (resp. 10) |
| T-04 | Las consultas de los formularios se guardan en el CMS | 21/09/2026 | Pablo (resp. 11) |
| T-05 | "Su Socio en Argentina" en español + inglés; el resto del sitio en español | 21/09/2026 | Pablo (resp. 12) |
| T-06 | Regla: no hacer push sin pedido previo; siempre preguntar antes de suponer | 21/09/2026 | Pablo (resp. 13) |
| T-07 | Skills: instalar `find-skills` y buscar skills oficiales o con respaldo en descargas (`docs/10-skills-externas.md`) | 21/09/2026 | Pablo (resp. 13) |
| T-08 | Pasos finales pre-publicación de seguridad, rendimiento y responsive (`docs/09-checklist-prepublicacion.md`) | 21/09/2026 | Pablo (resp. 14) |
| T-09 | **Colores:** se usan los reales del vector del manual (`#004f92`, `#009298`) por ser más precisos; los declarados (`#2a4f8e`, `#4d8f95`) quedan documentados como referencia en `06` §4 y en `tokens.css`. Se pide confirmación informativa (P-02) | 21/09/2026 | Pablo (resp. 1) |
| T-10 | **Tipografía web:** Ubuntu, documentando que el manual no define fuente de texto (P-03) | 21/09/2026 | Pablo (resp. 2) |
| T-11 | Errores del manual (textos "Palo Alto", muestra vacía en B.03): se avisa al cliente (P-05) | 21/09/2026 | Pablo (resp. 3) |
| T-12 | El Google Doc es la versión final; las notas del redactor son criterio editorial, no texto publicable; se respeta el trato de cada sección (vos / usted) | 21/09/2026 | Pablo (resp. 4) |
| T-13 | Trayectoria: se usa "+30 años" (documento nuevo) | 21/09/2026 | Pablo (resp. 5) |
| T-14 | **Empresas representadas:** se toma el documento (12). Nombres y logos se piden (P-07); las 7 marcas del sitio actual se cargan como **PROVISORIAS** (`TODO-CLIENTE`) para validación — no publicar sin confirmación del cliente | 21/09/2026 | Pablo (resp. 7); provisional activado 21/09/2026 |
| T-15 | **No hay contenido real de catálogo:** el desarrollo usa datos ficticios marcados `TODO-CLIENTE` y todo se agrega a los pedidos (`docs/11`) | 21/09/2026 | Pablo (resp. 8) |
| T-16 | **Spike S-3 — Pagefind:** carpeta de salida con `@astrojs/vercel` es `.vercel/output/static`. Pagefind corre post-`astro build` vía `npm run build`. `data-pagefind-body` en `<main>` limita el índice a contenido (sin nav/footer). 33 páginas indexadas, 2 idiomas. Script: `npx pagefind --site .vercel/output/static` | 21/09/2026 | spike verificado |

## B. Pendientes

Estado: 🔴 bloquea desarrollo · 🟡 bloquea una parte · 🟢 puede esperar. "Propuesta" es lo que se usaría **si** se aprueba; hasta entonces es solo una propuesta.

| ID | Pendiente | Prioridad | Propuesta | Afecta |
|---|---|---|---|---|
| D-06 | **Datos de contacto oficiales.** Se pidió usar "lo declarado en el doc", pero el Google Doc no incluye datos de contacto; mientras tanto se usan los publicados en el sitio actual (Peluffo 3944 CABA; Mendoza y Tandil). Fuente a confirmar; se pide en P-06 | 🟡 | Datos del sitio actual, marcados provisorios | footer, contacto |
| D-09 | Documentación/API del CMS de Harvi (auth, colecciones, relaciones, uploads, webhooks) | 🟡 (bloquea Fase 2) | Ver checklist en `07` | 07 |
| D-11 | Formularios: notificación por mail, destinatarios por formulario, anti-spam (honeypot + Turnstile/rate limit), obligatoriedad de campos de Su Socio | 🟡 | Honeypot + rate limit en Vercel; mail a definir | 03 |
| D-12 | Inglés de Su Socio: slug EN, texto del CTA, quién traduce/valida el copy, lista de idiomas confirmada (solo ES/EN) | 🟡 | `/en/your-partner-in-argentina` | 01, 03 |
| D-13 | Estilos: Tailwind vs CSS propio con tokens | 🟡 | CSS con tokens (sin dependencia extra) | SPEC |
| D-14 | Convenciones: idioma de código/commits, ramas, Conventional Commits | 🟢 | Ver AGENTS.md §4 | AGENTS |
| D-15 | Fuera de alcance: e-commerce/carrito/login | 🟢 | Fuera | 00 |
| D-16 | Trabajá con Nosotros: campos del formulario, CV por mail o subida, base de talentos, retención | 🟡 | — | 03 |
| D-17 | Contacto: opciones de "Tipo de consulta", obligatoriedad de campos | 🟡 | — | 03 |
| D-18 | Mapeo de categorías del sitio actual → 10 líneas, y redirects 301 | 🟡 | Ver `04` §3 y `01` §5 | 01, 04 |
| D-19 | Legales (privacidad, términos, cookies), analítica y consentimiento | 🟡 | — | 03, 09 |
| D-20 | Dominio final, cuenta/equipo de Vercel, entornos (preview/staging/prod), rutas y slugs | 🟡 | `wmargentina.com.ar` | 01, 07 |
| D-21 | Buscador: ¿agregar "ensayo/analito" al modelo de producto? Alcance del índice | 🟡 | Agregar campo `analytes[]` | 02, SPEC |
| D-22 | Texto truncado en el doc: "NOVEDADES (casos de éxito, eventos," | 🟢 | — | 01 |
| D-23 | Modelo de datos: compatibilidad guardada de un solo lado + índice invertido; canonical entre ficha y página de instrumento | 🟡 | Ver `02` §3 | 02 |
| D-24 | Home: cantidad de banners (2–3) y campos editables (imagen, título, texto, CTA, orden, vigencia) | 🟡 | Ver SPEC §5 | SPEC |

| D-25 | Migración del blog de Hemostasia (dominio anterior): ¿se migra algo? Se pide en P-23 | 🟢 | No migrar | 01 |

*(D-10 se resolvió como T-03. D-01…D-05, D-07 y D-08 se resolvieron como T-09…T-15. Los datos que faltan del cliente están en `docs/11-pedidos-al-cliente.md`.)*

## C. Cómo se registra una decisión nueva
1. Agregar fila con ID correlativo, pregunta y propuesta.
2. Preguntar a la persona. No avanzar sobre suposiciones.
3. Al resolver: mover a "Tomadas" con fecha y fuente, y actualizar los docs afectados.
