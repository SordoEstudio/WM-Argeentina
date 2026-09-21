# REQUIREMENTS — WM Argentina Web

Qué debe cumplir el sistema. El cómo está en `SPEC.md`. Prioridad: **M** (debe), **S** (debería), **C** (podría). Fase según `docs/00-brief.md` §6.
Los ítems con **(D-xx)** dependen de una decisión pendiente (`docs/08-decisiones-pendientes.md`).

## 1. Requerimientos funcionales

### Navegación y estructura
| ID | Requerimiento | P | Fase |
|---|---|---|---|
| RF-01 | Sitio con las secciones: Home, Nosotros, Soluciones, Productos, Servicios, Novedades y Conocimiento, Contacto, Su Socio en Argentina, Trabajá con Nosotros | M | 1 |
| RF-02 | Header con mega-menú de las 10 soluciones, buscador y CTA; footer con contacto y accesos a Su Socio y Trabajá con Nosotros (D-06, P-06) | M | 1 |
| RF-03 | Cada sección termina con 1 o 2 CTA que llevan al formulario de contacto o a Soluciones | M | 1 |
| RF-04 | Home con 2 o 3 banners editables (D-24) | M | 1 |

### Catálogo
| ID | Requerimiento | P | Fase |
|---|---|---|---|
| RF-10 | 10 líneas/soluciones con página propia (P-10) | M | 1 |
| RF-11 | Dentro de cada línea: sistemas/plataformas y productos que no requieren instrumento | M | 1 |
| RF-12 | Página de instrumento con: aplicaciones, reactivos compatibles, controles/calibradores, consumibles, software/conectividad y documentación | M | 1 |
| RF-13 | **Doble recorrido**: por solución completa y por producto puntual (filtros por aplicación y compatibilidad) | M | 1 |
| RF-14 | **Ficha única por producto**, accesible desde ambos recorridos, sin duplicar contenido | M | 1 |
| RF-15 | Atributos por producto: línea, categoría, subcategoría, empresa, plataforma, compatibilidad, aplicación, presentación, relacionados, documentación, estado | M | 1 |
| RF-16 | Productos discontinuados visibles con su estado (o excluidos por regla acordada) | S | 1 |
| RF-17 | Productos con foto de caja, descripción y brochure PDF por línea | M | 1 |

### Buscador
| ID | Requerimiento | P | Fase |
|---|---|---|---|
| RF-20 | Buscador general por producto, ensayo, analito, instrumento y marca (D-21) | M | 1 |
| RF-21 | Resultados agrupados por tipo y enlazados a la ficha única | S | 1 |

### Contenido
| ID | Requerimiento | P | Fase |
|---|---|---|---|
| RF-30 | Nosotros con modelo, trayectoria, misión, visión, 6 valores y propósito | M | 1 |
| RF-31 | Servicios (6) expandibles dentro de la misma página | M | 1 |
| RF-32 | Novedades y Conocimiento con 4 secciones, filtro por palabra clave y tarjetas (categoría, imagen, fecha, título, resumen, "Leer más") | M | 1 |
| RF-33 | Trabajá con Nosotros: cultura, áreas, búsquedas abiertas, desarrollo, formulario | M | 1 |

### Formularios
| ID | Requerimiento | P | Fase |
|---|---|---|---|
| RF-40 | Tres formularios separados, cada uno con su endpoint, validación y destino; sin cruzar journeys | M | 1 |
| RF-41 | Contacto con los campos definidos y preselección desde `?solucion=`/`?empresa=` (D-17) | M | 1 |
| RF-42 | Aviso y link en Contacto hacia Su Socio para consultas de fabricantes internacionales | M | 1 |
| RF-43 | Formulario de Su Socio en ES/EN (D-11, D-12) | M | 1 |
| RF-44 | Formulario de Trabajá con Nosotros (D-16) | M | 1 |
| RF-45 | Las consultas se **guardan en el CMS** | M | 2 |
| RF-46 | Notificación por mail al equipo y confirmación al usuario (D-11) | S | 2 |

### Idiomas
| ID | Requerimiento | P | Fase |
|---|---|---|---|
| RF-50 | Su Socio en Argentina disponible en español e inglés, con `hreflang` y selector de idioma | M | 1 |
| RF-51 | El resto del sitio permanece en español, sin selector de idioma | M | 1 |

### Marca
| ID | Requerimiento | P | Fase |
|---|---|---|---|
| RF-60 | Colores, tipografías y logo según el manual de marca (nov. 2021) vía tokens (T-09, T-10) | M | 1 |
| RF-61 | Uso correcto del logo: versiones, área de seguridad, fondos, sin alteraciones (`06-marca-y-ui.md`) | M | 1 |
| RF-62 | Nombre escrito siempre "WM Argentina" | M | 1 |
| RF-63 | Elementos decorativos secundarios (A.09) como fondos, sin cargar información | S | 1 |

### Datos y CMS
| ID | Requerimiento | P | Fase |
|---|---|---|---|
| RF-70 | Todo el contenido dinámico sale de colecciones validadas por schema | M | 1 |
| RF-71 | Fase 1: origen JSON local con el mismo formato que el CMS entregará | M | 1 |
| RF-72 | Fase 2: contenido proveniente del CMS de Harvi sin cambios en páginas/componentes (solo el origen) | M | 2 |
| RF-73 | Deploy Hook: al publicar en el CMS se reconstruye y despliega el sitio | M | 2 |
| RF-74 | Contenido editable por el cliente desde el CMS (incluye banners de Home) | M | 2 |

### SEO
| ID | Requerimiento | P | Fase |
|---|---|---|---|
| RF-80 | Metadatos, canonical, sitemap, robots, Open Graph, datos estructurados por tipo de página | M | 1 |
| RF-81 | Redirects 301 desde las URLs del sitio actual (D-18) | M | 3 |
| RF-82 | Contenido científico y novedades indexables (Article, breadcrumbs) | M | 1 |

## 2. Requerimientos no funcionales

| ID | Requerimiento | Fase |
|---|---|---|
| RNF-01 | Sitio estático (SSG) sobre Vercel; solo los endpoints de formularios son serverless | 1 |
| RNF-02 | TypeScript estricto; `astro check` y build limpios | 1 |
| RNF-03 | **Escalabilidad:** 500–1.000 referencias sin rediseño; build medido con 1.000 productos sintéticos | 1 |
| RNF-04 | **Rendimiento:** LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1; Lighthouse móvil ≥ 90 en plantillas clave | 3 |
| RNF-05 | **Responsive:** funciona de 320 px a pantallas grandes; sin scroll horizontal; objetivos táctiles ≥ 44 px | 3 |
| RNF-06 | **Accesibilidad:** WCAG 2.2 AA en plantillas clave (con la salvedad de contraste de la marca, `06` §4) | 3 |
| RNF-07 | **Seguridad:** cabeceras, validación en servidor, secretos fuera del repo/cliente, mínimo privilegio, dependencias auditadas | 3 |
| RNF-08 | **Privacidad:** aviso de datos personales y política publicados; retención definida (D-19) | 3 |
| RNF-09 | JavaScript de cliente mínimo; islas solo donde hay interacción | 1 |
| RNF-10 | Sin contenido inventado en producción: nada marcado `TODO-CLIENTE` ni datos ficticios | 3 |
| RNF-11 | Documentación viva: cambios de alcance actualizan REQUIREMENTS/SPEC | 1–3 |
| RNF-12 | Ningún push, deploy a producción ni cambio de DNS sin orden explícita | 1–3 |
| RNF-13 | Checklist pre-publicación completo (`docs/09-checklist-prepublicacion.md`) antes de la salida | 3 |

## 3. Criterios de aceptación transversales

1. Desde una línea se llega a un instrumento y a sus reactivos; desde un reactivo, a sus instrumentos; **la ficha es la misma URL**.
2. Un producto nuevo se agrega solo con datos (JSON/CMS): sin tocar código.
3. Una consulta de Su Socio no puede enviarse por el endpoint de Contacto ni al revés.
4. Cambiar los tokens de color/tipografía actualiza todo el sitio sin editar componentes.
5. Todos los ítems de `09-checklist-prepublicacion.md` están marcados o justificados.
