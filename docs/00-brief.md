# Brief — Sitio web WM Argentina (2026)

## 1. Cliente

WM Argentina representa y distribuye tecnología para diagnóstico (laboratorios de análisis clínicos, bancos de sangre, hospitales, veterinaria) y trabaja con compañías internacionales. El documento de estructura aprobado habla de "más de 30 años de trayectoria"; el sitio actual dice "21 años" (se toma el documento nuevo, T-13).

- Sitio actual: https://www.wmargentina.com.ar/ (WordPress, tema propio, con `noindex, nofollow` y metadatos que apuntan a un dominio anterior). Este proyecto lo **reemplaza por completo**.
- Casa Central (según sitio actual): Angel Peluffo 3944, CABA. Sedes: Mendoza y Tandil. Teléfonos y horarios en `05-referencias-cliente.md`. **Datos oficiales pendientes (D-06, P-06).**
- Manual de marca: noviembre 2021 (ver `06-marca-y-ui.md`).

## 2. Objetivo

Construir un sitio institucional + catálogo de productos que:

1. Explique el modelo de WM Argentina y transmita confianza técnica.
2. Permita **dos formas de recorrer el catálogo** sin duplicar fichas:
   - "Necesito una solución completa": Línea → Instrumento → Reactivos → Consumibles → Software → Documentación.
   - "Ya tengo equipamiento y necesito un producto": Reactivos / Controles / Consumibles filtrados por aplicación y compatibilidad.
3. Escale a 500–1.000 referencias sin rediseño.
4. Capte tres tipos de consulta **sin mezclarlas**: clientes (Contacto), fabricantes internacionales (Su Socio en Argentina) y candidatos (Trabajá con Nosotros).
5. Posicione a la empresa en buscadores con contenido científico y novedades.

## 3. Públicos

| Público | Qué busca | Entrada principal |
|---|---|---|
| Laboratorios, bioquímicos, hospitales, bancos de sangre, sector público, veterinaria | Soluciones, productos, servicio técnico, contacto comercial | Home / Soluciones / Productos / Contacto |
| Fabricantes internacionales | Un socio local para ingresar y desarrollar el mercado argentino | Su Socio en Argentina (ES/EN) |
| Candidatos | Trabajar en WM | Trabajá con Nosotros |

## 4. Alcance v1

Secciones (detalle en `01-sitemap-arquitectura.md`): Home, Nosotros, Soluciones (10 líneas), Productos, Servicios, Novedades y Conocimiento, Contacto, Su Socio en Argentina (ES/EN), Trabajá con Nosotros.

Transversales: buscador general, CTA en cada sección, sistema de marca según manual, SEO técnico, checklist pre-publicación.

## 5. Fuera de alcance v1 (salvo confirmación)

- Carrito, pagos o e-commerce (es un catálogo, no una tienda). **Confirmar (D-15).**
- Área de clientes con login.
- Traducción al inglés de secciones que no sean "Su Socio en Argentina".
- Migración del blog de Hemostasia del dominio anterior (D-25, P-23).

## 6. Fases

| Fase | Contenido | Resultado |
|---|---|---|
| **1 — Sitio con datos JSON** | Marca, UI, catálogo, buscador, páginas, formularios con validación (sin persistencia real) | Sitio navegable completo alimentado por JSON |
| **2 — Integración con CMS Harvi** | Reemplazo de JSON por el CMS, formularios que guardan en el CMS, Deploy Hook | Contenido editable por el cliente |
| **3 — Pre-publicación y salida** | Checklist de seguridad, rendimiento y responsive; redirects; salida a producción | Sitio en producción (solo con orden explícita) |

## 7. Restricciones

- Stack: Astro + TypeScript + Vercel + CMS propio de Harvi.
- Reglas de trabajo: ver `AGENTS.md` (preguntar antes de suponer; sin push sin pedido).
- Comunicación de salud: evitar promesas absolutas (p. ej. "el diagnóstico más exacto"), criterio ya indicado en el documento del cliente.
