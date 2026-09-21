# Pedidos al cliente y datos a validar

Lista única de **todo lo que el cliente (WM Argentina) tiene que entregar o confirmar**, y de lo que Harvi tiene que resolver internamente. Es el documento para compartir con el cliente y para hacer seguimiento.

**Estado actual:** el cliente todavía no entregó contenido real de catálogo (líneas, instrumentos, productos, fotos, brochures). El desarrollo avanza con **datos ficticios claramente marcados** (`TODO-CLIENTE`), que deben reemplazarse antes de publicar (checklist pre-publicación, `09`).

Estados: ⬜ pedido · 🟨 recibido, falta validar · ✅ validado. "Mientras tanto" = dato provisorio que usa el desarrollo hasta recibir el real. "Bloquea" = qué no se puede cerrar sin este dato (todos bloquean la **salida a producción** si el dato es visible en el sitio).

---

## A. Marca

| ID | Pedido | Para qué | Mientras tanto | Bloquea | Estado |
|---|---|---|---|---|---|
| P-01 | **Archivos vectoriales originales** (SVG/AI/EPS): isologotipo horizontal y vertical, con y sin pie, en las 4 versiones (color, negativo, B/N, B/N negativo); isotipo solo (color/blanco/negro); ícono/favicon; formas decorativas A.09 | Usar el logo real sin redibujarlo (B.03) | Componente `Logo` con placeholder rotulado | Salida a producción | ⬜ |
| P-02 | **Confirmar colores institucionales.** El manual declara `#2a4f8e` y `#4d8f95` (CMYK C95 M78 Y19 K0 / C86 M28 Y45 K0), pero los archivos del propio manual usan `#004f92` y `#009298`. Se usan estos últimos (ver `06` §4); confirmar que es lo correcto | Coherencia entre logo y sitio | `#004f92` / `#009298` | Nada (informativo); cambiar 2 líneas si el cliente prefiere los declarados | ⬜ |
| P-03 | **Tipografía web y neutros.** Confirmar Ubuntu como fuente de texto (el manual no define una) y definir grises/color de texto | Consistencia visual | Ubuntu + neutros provisorios en `tokens.css` | Cierre de diseño | ⬜ |
| P-04 | **Tamaño mínimo del logo en pantalla** (px) y cuándo usar versión con/sin pie de marca (el manual solo da 40 mm para impresión) | Header, footer, mobile | Sin pie en tamaños chicos | Cierre de diseño | ⬜ |
| P-05 | Avisar errores del manual: textos "Palo Alto" en A.03/A.04 y muestra vacía de "Tipografía incorrecta" en B.03 | Corrección del manual | — | Nada | ⬜ |

## B. Datos de la empresa

| ID | Pedido | Para qué | Mientras tanto | Bloquea | Estado |
|---|---|---|---|---|---|
| P-06 | **Datos de contacto oficiales:** dirección de Casa Central, direcciones y teléfonos de las sedes (Mendoza, Tandil), mail comercial, horarios, redes sociales. El manual muestra otra dirección (Serrano 1769, Tandil) en su ejemplo de papelería | Footer, Contacto, datos estructurados | Los publicados en el sitio actual: Angel Peluffo 3944 (CABA), sedes Mendoza y Tandil, tel. (54 11) 4982.8500 / 4982.1455, lun–vie 8 a 17 hs. Mails de área del sitio actual (provisorios): `atencionalcliente@`, `stecnico@`, `pedidos@wmargentina.com.ar`. Falta: dirección completa sedes Mendoza/Tandil, redes sociales. Ver `13-validacion-cliente.md` §0 | Footer/Contacto | ⬜ |
| P-07 | **Empresas representadas: las 12** que menciona el documento. Por cada una: nombre, logo (color y versión blanca/negra), país, sitio web, línea(s) en que participa, orden de aparición y **autorización para usar el logo** | Su Socio en Argentina ("Empresas que confían en WM"), filtros, novedades | 7 tarjetas **PROVISORIAS** del sitio anterior: Alifax, Horiba, Instrumentation Laboratory, Liaison, Biokit, Medical System, Ortho — marcadas `TODO-CLIENTE`, requieren confirmación. Faltan 5 empresas más para completar las 12. Ver `13-validacion-cliente.md` §8.3 | Su Socio, catálogo | ⬜ |
| P-08 | **Certificaciones y habilitaciones vigentes** que se pueden mencionar (el texto de Nosotros las nombra sin detallar), y datos verificables de "presencia en todo el país" | Nosotros, Su Socio | Texto tal cual el documento, sin detalle | Nosotros | ⬜ |
| P-09 | Fotos institucionales: sedes, equipo, instalaciones, servicio técnico | Nosotros, Trabajá con Nosotros, Home | Imágenes placeholder | Salida | ⬜ |

## C. Catálogo (nada real entregado hasta ahora)

| ID | Pedido | Para qué | Mientras tanto | Bloquea | Estado |
|---|---|---|---|---|---|
| P-10 | **Confirmar el listado de las 10 soluciones** (el documento lo llama "tentativo") y entregar por cada una: nombre definitivo, descripción, imagen de portada | Soluciones | Las 10 del documento con datos ficticios | Soluciones | ⬜ |
| P-11 | **Instrumentos/plataformas por línea:** nombre, fabricante, descripción, aplicaciones, imágenes, software/conectividad, documentación técnica | Página de instrumento (sistema completo) | Instrumentos ficticios | Catálogo | ⬜ |
| P-12 | **Productos** (reactivos, controles/calibradores, consumibles, software, accesorios) con todos los atributos: línea, categoría, subcategoría, empresa, plataforma, compatibilidad (específica/abierta), aplicación, presentación, productos relacionados, documentación, estado, **foto de caja** y descripción. Formato sugerido: planilla (Excel/CSV); se puede preparar una plantilla | Fichas, filtros, buscador | Catálogo semilla ficticio | Catálogo | ⬜ |
| P-13 | **Ensayos/analitos** por producto (si el buscador debe encontrar por analito) | Buscador | Campo vacío | Buscador (parte) | ⬜ |
| P-14 | **Brochure comercial en PDF por línea** | Productos | Enlaces deshabilitados | Productos | ⬜ |
| P-15 | Regla para productos **discontinuados**: ¿se muestran con su estado o se ocultan? | Catálogo | Se muestran con etiqueta | Catálogo | ⬜ |
| P-16 | **Equivalencia** entre las categorías del sitio actual (Hematología, Coagulación, Inmunoensayos Heterogéneos, Test Rápidos, Gases en sangre, Química clínica, Agregación plaquetaria, Uroanálisis, Turbidimetría, Bacteriología, Biología Molecular, Banco de sangre) y las 10 soluciones nuevas; y qué URLs viejas conviene conservar | Redirects 301 | Hipótesis de `04` §3 | Redirects | ⬜ |

## D. Contenido de páginas

| ID | Pedido | Para qué | Mientras tanto | Bloquea | Estado |
|---|---|---|---|---|---|
| P-17 | **Banners de Home** (2 o 3): imagen, título, texto, 1–2 CTA, vigencia | Home | Banners de ejemplo | Home | ⬜ |
| P-18 | **Servicios:** texto de cada uno de los 6 (Asesoramiento, Aplicaciones, Instalación y puesta en marcha, Capacitación, Servicio Técnico, Integración y conectividad) | Servicios | Solo títulos | Servicios | ⬜ |
| P-19 | **Su Socio en Argentina:** texto de "Cómo acompañamos el desarrollo", descripción de cada etapa (Ingreso al mercado → Desarrollo comercial → Lanzamiento → Implementación → Soporte → Crecimiento) incluyendo **servicios regulatorios**, cuáles son "otros mercados relacionados con nuestras nuevas áreas", y confirmación de las 6 tarjetas "¿Por qué WM Argentina?" | Su Socio | Textos del documento; etapas sin descripción | Su Socio | ⬜ |
| P-20 | **Inglés de Su Socio:** quién traduce/valida, texto del CTA en inglés y slug de la URL en inglés | Su Socio EN | Traducción borrador marcada "sin revisar" | Su Socio EN | ⬜ |
| P-21 | **Novedades y conocimiento:** lista completa de tipos (el documento quedó truncado en "casos de éxito, eventos,…"), contenido inicial (casos de éxito, eventos, contenido científico) con imagen, fecha y resumen | Novedades | Publicaciones ficticias | Novedades | ⬜ |
| P-22 | **Trabajá con Nosotros:** texto de cultura, áreas profesionales, búsquedas abiertas vigentes, sección "Desarrollo"; y **cómo llegan las postulaciones** (formulario, mail con CV adjunto o ambos), campos del formulario, qué es la "Base de Talentos" y por cuánto tiempo se guardan los datos | Trabajá con Nosotros | Bloques con texto del documento | Esa página y su formulario | ⬜ |
| P-23 | **Blog de Hemostasia** (dominio anterior wmargentina.com): ¿se migra algo? ¿Qué contenido conservar? | Migración / redirects | No se migra | Nada (decisión) | ⬜ |

## E. Formularios y comunicaciones

| ID | Pedido | Para qué | Mientras tanto | Bloquea | Estado |
|---|---|---|---|---|---|
| P-24 | **Contacto:** opciones de "Tipo de consulta", qué campos son obligatorios y a qué mail(s) llega cada consulta (comercial, por línea, por sede) | Formulario | Sin opciones definidas | Contacto | ⬜ |
| P-25 | **Su Socio:** campos obligatorios, destinatario(s), idioma de respuesta | Formulario | Obligatorios: empresa, país, nombre, email, descripción | Su Socio | ⬜ |
| P-26 | ¿Se envía **confirmación por mail** a quien consulta? Texto de esa confirmación | Los 3 formularios | No se envía | Fase 2 | ⬜ |

## F. Legales y técnicos

| ID | Pedido | Para qué | Mientras tanto | Bloquea | Estado |
|---|---|---|---|---|---|
| P-27 | **Política de privacidad, términos y cookies** (texto legal) y responsable del tratamiento de datos personales | Formularios, legales | Página vacía marcada | Salida | ⬜ |
| P-28 | **Analítica:** herramienta (si se usa) y política de consentimiento | Medición | Sin analítica | Salida | ⬜ |
| P-29 | **Dominio y DNS:** quién administra `wmargentina.com.ar` y `wmargentina.com`, acceso al registrador, **mails asociados al dominio** (para no cortarlos al cambiar el DNS), hosting actual y fecha de baja del sitio WordPress | Salida | — | Salida | ⬜ |
| P-30 | **Personas responsables del cliente:** quién aprueba diseño, quién valida contenido técnico/sanitario (claims), quién recibe las consultas | Aprobaciones | — | Todo | ⬜ |

---

## G. Pendientes internos de Harvi (no son del cliente)

| ID | Pendiente | Ref. |
|---|---|---|
| H-01 | Documentación/API del CMS de Harvi (auth, colecciones, relaciones, uploads, webhooks, guardado de formularios) | D-09 |
| H-02 | Cuenta/equipo de Vercel, entornos (preview/staging/prod) y dominio de preview | D-20 |
| H-03 | Enfoque de estilos: Tailwind vs CSS con tokens | D-13 |
| H-04 | Anti-spam de formularios (honeypot, rate limiting, captcha) | D-11 |
| H-05 | Convenciones de código, commits y ramas | D-14 |
| H-06 | Modelo de datos: compatibilidad de un solo lado, campo de analitos, canonical entre ficha e instrumento | D-21, D-23 |

## H. Cómo se usa este documento
1. Se comparte la parte A–F con el cliente (sin la G).
2. Cada vez que llega un dato: pasar el estado a 🟨, validarlo y pasarlo a ✅; reemplazar el dato provisorio y borrar el `TODO-CLIENTE` correspondiente.
3. Si aparece un pedido nuevo: agregar fila con ID correlativo.
4. Antes de publicar, todas las filas que aparecen visibles en el sitio deben estar en ✅ (o justificadas).
