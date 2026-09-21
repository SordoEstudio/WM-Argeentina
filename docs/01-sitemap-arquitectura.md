# Sitemap y arquitectura de información

Fuente: documento de estructura aprobado por el cliente (copia en `05-referencias-cliente.md`).
Las rutas son **propuestas** y se confirman antes de implementar (D-20). Todo el sitio en español; solo Su Socio tiene versión en inglés.

## 1. Mapa de páginas

| # | Sección | Ruta propuesta | Notas |
|---|---|---|---|
| 1 | Home | `/` | 2 o 3 banners con info relevante, **editables**; CTA (1–2 botones) |
| 2 | Nosotros | `/nosotros` | Modelo de WM, trayectoria, misión, visión, valores (6), propósito |
| 3 | Soluciones (índice) | `/soluciones` | 10 líneas |
| 3.1 | Solución (detalle) | `/soluciones/[linea]` | Sistemas/plataformas + productos sin instrumento (ver §3) |
| 3.2 | Instrumento / plataforma | `/soluciones/[linea]/[instrumento]` | Aplicaciones, reactivos compatibles, controles, consumibles, software, documentación |
| 4 | Productos (índice) | `/productos` | Por línea, con brochure comercial en PDF |
| 4.1 | Ficha de producto | `/productos/[slug]` | **Una sola ficha por producto**, enlazada desde ambos recorridos |
| 5 | Servicios | `/servicios` | 6 servicios expandibles dentro de la misma página |
| 6 | Novedades y Conocimiento | `/novedades` | Novedades, Eventos, Contenido Científico, Empresas Representadas; filtro por palabra clave |
| 6.1 | Publicación | `/novedades/[slug]` | Categoría + imagen + fecha + título + resumen + "Leer más" |
| 7 | Contacto | `/contacto` | Formulario comercial "inteligente" |
| 8 | Su Socio en Argentina (ES) | `/su-socio-en-argentina` | Público: fabricantes internacionales |
| 8b | Your Partner in Argentina (EN) | `/en/your-partner-in-argentina` | Slug EN **pendiente (D-12)** |
| 9 | Trabajá con Nosotros | `/trabaja-con-nosotros` | Cultura, áreas, búsquedas abiertas, desarrollo, formulario, base de talentos |
| — | Buscador | `/buscar` | Búsqueda por producto, ensayo, analito, instrumento o marca |
| — | Legales | `/privacidad`, `/terminos` | Contenido **pendiente (D-19)** |
| — | 404 | `/404` | |

## 2. Navegación

- **Header:** logo WM Argentina (isologotipo horizontal, versión principal) · Nosotros · Soluciones (mega-menú con las 10 líneas) · Productos · Servicios · Novedades y Conocimiento · Contacto · buscador · selector ES/EN (solo visible en Su Socio) · CTA destacado "Contactar un especialista".
- **Footer:** datos de contacto (D-06), sedes, links a Su Socio en Argentina y Trabajá con Nosotros, legales.
- **CTA por sección:** cada sección cierra con 1 o 2 botones que indican qué hacer después (ej.: "Conocer nuestras soluciones", "Contactar un especialista"), para llegar rápido al formulario de contacto o a Soluciones.
- Su Socio en Argentina y Trabajá con Nosotros son públicos distintos: enlazados desde el footer y desde lugares contextuales, **no** desde el flujo principal de consulta comercial.

## 3. Estructura de una Solución (línea)

Ejemplo del documento: Hemostasia.

**A. Sistemas / Plataformas.** Por cada instrumento:

```
INSTRUMENTO → Aplicaciones → Reactivos compatibles → Consumibles y controles
            → Software / conectividad → Documentación técnica
```

Los reactivos **no se separan** del instrumento que los usa: quien evalúa una plataforma necesita ver el sistema completo.

**B. Productos que no requieren instrumento.** Reactivos, controles y consumibles de equipamiento universal o abierto, con foto de caja y descripción, ordenados por línea, sin obligar a entrar por un instrumento.

**Regla de oro:** un producto puede aparecer en más de un recorrido; **la ficha no se duplica**. Ambos caminos llevan a la misma URL.

```
Inmunología → Reactivos → Reactivo X ─┐
                                      ├─→ /productos/reactivo-x  (ficha única)
Instrumento Y → Compatibles → Reactivo X ┘
```

## 4. Doble recorrido

| Intención | Recorrido |
|---|---|
| "Necesito una solución completa" | Línea → Instrumento → Reactivos → Consumibles → Software |
| "Ya tengo equipamiento y necesito un producto" | Reactivos / Controles / Consumibles → filtro por aplicación y compatibilidad |

El **buscador general** permite buscar directo por producto, ensayo, analito, instrumento o marca.

## 5. Redirects desde el sitio actual (borrador, **PENDIENTE D-18**)

| Origen (sitio actual) | Destino propuesto |
|---|---|
| `/empresa/` | `/nosotros` |
| `/productos/diagnostico/` | `/soluciones` |
| `/category/diagnostico/<categoria>/` | `/soluciones/<linea>` (requiere mapeo, ver `04-contenido-soluciones.md` §3) |
| `/productos/banco-de-sangre/` | `/soluciones/banco-de-sangre` |
| `/marca/?marca=<marca>` | `/novedades?seccion=empresas-representadas&q=<marca>` |
| `/atencion-al-cliente/` | `/contacto` (y CV → `/trabaja-con-nosotros`) |
| `/contacto/` | `/contacto` |

## 6. Pendientes de esta sección
- Confirmar rutas y slugs (D-20), incluyendo el slug en inglés (D-12).
- Texto truncado en el documento: "NOVEDADES (casos de éxito, eventos," — confirmar la lista completa (D-22).
