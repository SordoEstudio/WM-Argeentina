# Soluciones (líneas) y contenido

## 1. Listado (documento del cliente, "tentativo")

| # | Línea | Slug propuesto |
|---|---|---|
| 1 | Anatomía Patológica | `anatomia-patologica` |
| 2 | Hemostasia | `hemostasia` |
| 3 | Química Seca | `quimica-seca` |
| 4 | Hematología | `hematologia` |
| 5 | Inmunología | `inmunologia` |
| 6 | Biología Molecular | `biologia-molecular` |
| 7 | Banco de Sangre | `banco-de-sangre` |
| 8 | Diagnóstico Veterinario | `diagnostico-veterinario` |
| 9 | Cadena de Frío | `cadena-de-frio` |
| 10 | Sistemas Informáticos | `sistemas-informaticos` |

El listado figura como "tentativo": se pide confirmarlo (P-10).

## 2. Contenido disponible

- Solo **Hemostasia** tiene estructura ejemplificada (plataformas → instrumento → aplicaciones → reactivos → controles → consumibles → software → documentación). No hay instrumentos, productos ni textos reales de ninguna línea.
- **No hay contenido real de las 10 líneas ni catálogo semilla (T-15).** Se pide en `11-pedidos-al-cliente.md` (P-10 a P-16). Mientras tanto, el desarrollo usa datos ficticios marcados (`TODO-CLIENTE`), nunca datos que parezcan reales.

## 3. Correspondencia con las categorías del sitio actual (para redirects y migración)

El sitio actual organiza el catálogo distinto. Esta tabla es una **hipótesis a validar con el cliente (D-18, P-16)**:

| Categoría en el sitio actual | Línea nueva (hipótesis) |
|---|---|
| Hematología | Hematología |
| Coagulación, Agregación plaquetaria, Turbidimetría (?) | Hemostasia |
| Inmunoensayos Heterogéneos, Inmunología | Inmunología |
| Biología Molecular | Biología Molecular |
| Química clínica | ¿Química Seca? — no equivalente directo |
| Test Rápidos, Cuidados críticos / Gases en sangre, Uroanálisis, Bacteriología | **sin línea equivalente claramente definida** |
| Banco de sangre (ETI MAX 3000) | Banco de Sangre |
| — | Anatomía Patológica, Diagnóstico Veterinario, Cadena de Frío, Sistemas Informáticos: **líneas nuevas** |

Marcas del sitio actual: Alifax, Horiba, Instrumentation Laboratory, Liaison, Biokit, Medical System, Ortho. El documento nuevo menciona **12** empresas representadas y es la referencia (T-14; nombres y logos en P-07).

## 4. Estructura de cada página de solución

1. Hero: nombre de la línea + una frase de valor (sin promesas absolutas).
2. Sistemas / plataformas (tarjetas de instrumentos).
3. Productos que no requieren instrumento (grilla filtrable, con foto de caja).
4. Empresas representadas en esta línea.
5. Servicios asociados (link a `/servicios`).
6. CTA doble: "Contactar un especialista" (con `?solucion=`) y "Ver brochure" (PDF, si existe).

## 5. Criterio editorial (del documento del cliente)

- Evitar afirmar "el diagnóstico más exacto": es una afirmación absoluta difícil de sostener en comunicación sanitaria. Propuesta del documento: "contribuir a diagnósticos confiables y decisiones clínicas más seguras".
- Respetar el trato de cada texto del cliente: "Trabajá con Nosotros" usa "vos" ("Enviános un mail"), mientras que "Su Socio en Argentina" usa trato formal ("Desarrolle su mercado"). No unificar sin preguntar (T-12).
- Tono general: cercano, claro y profesional; sin jerga innecesaria.
