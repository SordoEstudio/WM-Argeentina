# Checklist pre-publicación

Se completa **antes** de cualquier salida a producción (Fase 3). Cada ítem se marca con fecha y quién lo verificó. Un ítem que no aplica se justifica por escrito.

> Este checklist no autoriza la publicación. Push, deploy a producción y cambios de DNS requieren **orden explícita de la persona** (AGENTS.md §1.2).

Los umbrales son propuestas de trabajo y se pueden ajustar. Si falta un dato, se pregunta (D-xx).

---

## 1. Seguridad

### Secretos y configuración
- [ ] Ningún secreto en el repo ni en su historial (tokens del CMS, URL del Deploy Hook, claves). Búsqueda con herramienta de escaneo de secretos.
- [ ] Variables de entorno cargadas en Vercel por entorno (preview / producción); el token del CMS **no** tiene prefijo `PUBLIC_` ni llega al bundle del cliente (verificar buscando el valor en `dist`).
- [ ] Tokens con **mínimo privilegio**: lectura de contenido y escritura de envíos son credenciales separadas; rotación documentada.
- [ ] URL del Deploy Hook tratada como secreto y limitada a la rama de producción.

### Formularios y endpoints
- [ ] **El sink de desarrollo está desactivado**: los tres formularios persisten en el CMS (si no, no se publica).
- [ ] Validación en servidor con schema, límites de longitud, tipos y lista blanca de valores (provincias, líneas, empresas).
- [ ] Anti-spam activo: honeypot + rate limiting (y captcha si se decidió, D-11).
- [ ] Respuestas de error sin detalles internos; logs sin datos personales innecesarios.
- [ ] Los endpoints aceptan solo `POST`, `Content-Type` esperado y origen propio (CORS/`Origin`).
- [ ] Prueba con entradas maliciosas (HTML/JS, campos enormes, unicode raro, cuerpo vacío).
- [ ] Si hay subida de CV (D-16): tipo y tamaño validados, almacenamiento no público, antivirus/escaneo si aplica.

### Cabeceras y navegador
- [ ] `Content-Security-Policy` (Astro ofrece una API de CSP) sin `unsafe-inline` salvo justificación; se prueba que no rompa fuentes, imágenes ni scripts propios.
- [ ] `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, y protección contra iframes (`frame-ancestors` / `X-Frame-Options`).
- [ ] HTTPS forzado; sin contenido mixto.
- [ ] Enlaces externos con `rel="noopener noreferrer"`.
- [ ] Verificación en un analizador de cabeceras (p. ej. securityheaders.com) y captura guardada.

### Contenido del CMS
- [ ] HTML/rich text del CMS sanitizado o renderizado desde un formato seguro (sin inyección de scripts).
- [ ] Los datos que llegan del CMS pasan por schema: si no validan, el build falla.

### Dependencias y entorno
- [ ] `npm audit` sin vulnerabilidades altas/críticas sin resolver o justificadas; lockfile versionado.
- [ ] Dependencias sin uso eliminadas; versiones fijadas.
- [ ] Vercel: *Deployment Protection* en previews y `noindex` en todo lo que no sea producción.
- [ ] Accesos: quién puede desplegar, quién ve variables de entorno, 2FA en GitHub y Vercel.

### Privacidad
- [ ] Política de privacidad y aviso de tratamiento de datos personales publicados y enlazados desde los formularios (contenido legal a validar, D-19).
- [ ] Analítica y cookies con consentimiento si corresponde (D-19).
- [ ] Definido cuánto tiempo se guardan las consultas y quién puede verlas.

---

## 2. Rendimiento

### Objetivos (propuesta)
| Métrica | Objetivo |
|---|---|
| LCP | ≤ 2,5 s (p75, móvil) |
| INP | ≤ 200 ms |
| CLS | ≤ 0,1 |
| Lighthouse (móvil): Rendimiento / Accesibilidad / Buenas prácticas / SEO | ≥ 90 en las cuatro, en las plantillas clave |

Plantillas clave a medir: Home, Solución, Instrumento, Ficha de producto, Listado de productos, Novedades, Contacto, Su Socio (ES y EN). Se mide en **build de producción**, no en dev.

### Checklist
- [ ] Medición con red y CPU limitadas (móvil de gama media), no solo en la máquina de desarrollo.
- [ ] Imágenes: pipeline de Astro (`<Image>`/`<Picture>`), AVIF/WebP, `width`/`height` definidos, `sizes` correcto, `loading="lazy"` salvo la imagen LCP (que lleva `fetchpriority="high"`).
- [ ] Fuentes: autoalojadas, subset latino, `font-display: swap`, precarga solo de las críticas; sin saltos de layout.
- [ ] JavaScript de cliente mínimo: presupuesto propuesto ≤ 100 KB gzip en páginas de contenido; solo islas necesarias (buscador, filtros, mega-menú).
- [ ] Buscador: índice cargado **bajo demanda** (al enfocar/abrir), no en la carga inicial; índice de catálogo liviano (sin descripciones largas).
- [ ] Listados grandes paginados o filtrados en cliente sobre JSON liviano.
- [ ] PDFs (brochures) no se precargan; peso indicado en el enlace; tamaño razonable.
- [ ] Caché: assets con hash y `immutable`; páginas con estrategia de revalidación acorde al Deploy Hook.
- [ ] Sin scripts de terceros bloqueantes; los que existan, diferidos.
- [ ] **Tiempo de build** medido con catálogo sintético de 1.000 productos y dentro de un límite acordado.
- [ ] Análisis del bundle revisado (nada inesperado pesando).
- [ ] CSS sin código muerto evidente.

---

## 3. Responsive

### Matriz de prueba
| Ancho | Representa |
|---|---|
| 320–360 px | móvil chico (mínimo soportado) |
| 390–430 px | móvil actual |
| 768 px | tablet vertical |
| 1024 px | tablet horizontal / notebook chica |
| 1280–1440 px | desktop |
| ≥ 1920 px | monitor grande (el contenido no se estira sin límite) |

Probar en **navegadores reales**: Chrome, Safari (iOS) y Firefox como mínimo; al menos un Android y un iPhone físicos. Ambas orientaciones.

### Checklist
- [ ] Diseño mobile-first; sin scroll horizontal en ningún ancho (`overflow-x` no es un parche).
- [ ] Menú móvil usable con teclado y lector de pantalla; mega-menú de Soluciones adaptado a móvil.
- [ ] Objetivos táctiles ≥ 44 × 44 px con separación suficiente.
- [ ] Tablas y fichas técnicas: scroll interno o tarjetas apiladas, sin romper la página.
- [ ] Filtros del catálogo: panel/cajón en móvil; estado de filtros visible y reiniciable.
- [ ] "Recorrido visual" de Su Socio (6 etapas) y tarjetas "¿Por qué WM?" se reordenan bien en vertical.
- [ ] Formularios: `type`, `inputmode` y `autocomplete` correctos; teclado adecuado; el teclado virtual no tapa el campo activo ni el botón de envío.
- [ ] Logo y sistema de marca: tamaño mínimo respetado, versión correcta (con/sin pie) según ancho, contraste sobre fondos e imágenes.
- [ ] Imágenes y videos responsivos; recortes de fotos sin cortar información clave.
- [ ] Texto legible al 200% de zoom y con tamaño de fuente ampliado por el usuario; sin pérdida de contenido.
- [ ] Zonas seguras (notch) y modo oscuro del sistema: verificar que no rompen el diseño (definir si hay tema oscuro).
- [ ] Impresión de fichas/brochures (si aplica) razonable.

---

## 4. Otros controles finales

### Accesibilidad
- [ ] Objetivo WCAG 2.2 nivel AA en plantillas clave: contraste (ver `06-marca-y-ui.md` §4), foco visible, navegación por teclado, `alt` en imágenes, encabezados jerárquicos, `lang` correcto (y `lang="en"` en la versión inglesa), formularios accesibles.
- [ ] Prueba con lector de pantalla en flujos clave (buscar producto, enviar consulta).

### SEO técnico y contenido
- [ ] `robots.txt` y `sitemap.xml` correctos; **sin `noindex` en producción** (el sitio actual lo tiene) y **con `noindex` en previews**.
- [ ] `title`, `description`, Open Graph y `canonical` por página; `hreflang` entre ES y EN de Su Socio.
- [ ] Datos estructurados donde aplique (Organization, Product, Article, BreadcrumbList).
- [ ] Redirects 301 desde el sitio actual probados uno por uno (D-18); sin cadenas ni bucles.
- [ ] Páginas 404 y errores con la voz de marca.
- [ ] Sin contenido `TODO-CLIENTE`, datos ficticios ni placeholders de logo en producción (buscar por texto).
- [ ] Marca escrita **WM Argentina** en todo el texto; sin `WMArgentina` ni mayúsculas (B.04).
- [ ] Sin afirmaciones absolutas de salud no validadas (criterio del documento del cliente).

### Salida (solo con orden explícita)
- [ ] Dominio, DNS y certificado listos; plan de vuelta atrás (rollback) documentado.
- [ ] Deploy Hook de producción configurado en el CMS y probado con un cambio real.
- [ ] Monitoreo básico (disponibilidad, errores de formularios).
- [ ] Copia de seguridad del contenido y del repo.
- [ ] Revisión final con el cliente y aprobación registrada.
