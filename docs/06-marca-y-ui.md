# Marca y UI — WM Argentina

Fuente: *WM Argentina · Manual de Marca* (noviembre 2021, 21 páginas, InDesign CS5). Lo que el manual no define se registra como pedido (`11-pedidos-al-cliente.md`); no se completa por suposición.

## 1. Escritura de la marca (B.04)

Correcto: **WM Argentina**. Incorrecto: `WM ARGENTINA`, `wm argentina`, `WMArgentina` (así aparece en el sitio actual; no replicar).
Pie de marca: *"Mejorando la Vida a cada instante"* (con esa capitalización, tal como figura en el logo).

## 2. Isologotipo (A.01–A.04)

Composición: **isotipo** (una "W" hecha con tres formas, teal y azul) + **logotipo** ("WM" en Arial Bold + "Argentina" en Arial Regular) + **pie de marca** (Century Gothic, teal).

| Versión | Uso |
|---|---|
| Horizontal completa (con pie) | Versión principal, siempre que sea posible |
| Horizontal sin pie | Tamaños reducidos, headers, footers |
| Vertical (con/sin pie) | Espacios angostos o cuadrados |
| Negativo (blanco) sobre teal o azul | Fondos corporativos |
| Blanco y negro / negativo B/N | Cuando no es posible el color por razones técnicas |
| Isotipo solo | Íconos: favicon, perfiles de redes, espacios cuadrados (A.06). Variantes: isotipo blanco en círculo teal o azul |

## 3. Reglas de uso (B.01–B.03, A.05)

- **Área de seguridad:** distancia mínima a textos y elementos gráficos equivalente al isotipo del propio logotipo.
- **Tamaño mínimo:** 40 mm de ancho (impresión), **usando la versión sin pie de marca**. Para pantallas el manual no da un mínimo en píxeles: se pide en **P-04** (`11-pedidos-al-cliente.md`). Mientras tanto: no mostrar el pie de marca cuando el logo sea chico y definir el mínimo al probar.
- **Sobre fondos no corporativos o fotografías:** solo blanco o negro, según luminosidad del fondo. Máxima visibilidad y contraste.
- **Prohibido:** cambiar colores, ocultar/recortar partes, usar porcentajes (tintas) de color, alterar espaciado, deformar o cambiar la tipografía.
- Si no se puede imprimir en color: cuatricromía o negro.

## 4. Colores

**Decisión (T-09): el sitio usa los colores reales de los archivos del manual; los valores que el manual declara quedan documentados como referencia.**

| Rol | Declarado en el manual (A.07) | Valor real en el vector del manual | Uso en el sitio |
|---|---|---|---|
| Principal (azul) — "debe predominar" | CMYK C95 M78 Y19 K0 · RGB 42, 79, 142 · `#2a4f8e` | RGB 0, 79, 146 · **`#004f92`** | **`#004f92`** |
| Secundario (teal) — fondos y elementos secundarios | CMYK C86 M28 Y45 K0 · RGB 77, 144, 150 · `#4d8f95` | RGB 0, 146, 152 · **`#009298`** | **`#009298`** |

**Por qué los reales son más precisos:** se extrajeron directamente del PDF (relleno vectorial en RGB, con `pdfplumber`, en las páginas A.01 y A.07). Son exactamente los colores con que están dibujados el isotipo (47 y 18 objetos en A.01) y los bloques de color de A.07. Un sitio con los colores declarados no coincidiría con el logo: en especial el teal declarado es visiblemente más apagado.

Otras observaciones sobre lo declarado:
- El RGB y el HEX del secundario difieren entre sí por 1 punto (77,144,150 vs `#4d8f95` = 77,143,149).
- El CMYK declarado es el valor de impresión: no se convierte al sitio.
- El cliente puede confirmar o preferir los declarados (**P-02**); en ese caso se cambian solo dos líneas de `tokens.css`. Los declarados se conservan allí como `--wm-*-declared`, sin uso.

### Contraste (WCAG, calculado)

| Combinación | Ratio | Uso permitido |
|---|---|---|
| Blanco sobre azul `#004f92` | 8.3 : 1 | Todo texto |
| Azul `#004f92` sobre blanco | 8.3 : 1 | Todo texto y links |
| Blanco sobre teal `#009298` | 3.8 : 1 | Solo texto grande (≥ 24 px, o ≥ 19 px en negrita) y elementos gráficos |
| Teal `#009298` sobre blanco | 3.8 : 1 | Solo texto grande, íconos, decoración. **No para texto de cuerpo** |
| Negro sobre teal | 5.6 : 1 | Alternativa para texto chico sobre teal |
| Azul sobre teal | 2.2 : 1 | **No usar** |

Con los HEX del manual los ratios son casi iguales (8.05 y 3.70). Consecuencia de diseño: **el texto chico va en azul o gris oscuro sobre blanco**; el teal se reserva para fondos amplios con texto grande, acentos y decoración. Un botón con fondo teal y texto blanco de tamaño normal **no cumple AA**: usar azul para botones primarios.

### Neutros
El manual no define grises ni color de texto. Se usan valores **provisorios** marcados en `tokens.css` y se piden en **P-03**.

## 5. Tipografía

- **Isologotipo:** Arial Bold / Arial Regular. **Pie de marca:** Century Gothic. Son parte del logo (se entrega como imagen/vector), **no** tipografías para texto web.
- **El manual no define tipografía de texto.** El propio manual está compuesto en Ubuntu (Regular, Medium, Bold, Light), pero no la declara como fuente de marca (verificado en las fuentes incrustadas del PDF).
- **Decisión (T-10): se usa Ubuntu** (Google Fonts, gratuita) como fuente de texto del sitio, autoalojada y con `font-display: swap`. Queda documentado que es una elección de este proyecto y no del manual; se confirma con el cliente en **P-03**.
- Century Gothic no es libre; no usarla en el sitio salvo licencia (no hace falta: el pie de marca va dentro del archivo del logo).

## 6. Elementos secundarios (A.09)

Formas abstractas combinadas, en **subtonos** (tintas suaves) de los colores institucionales, estilo gráfico simple: manchas orgánicas, círculos concéntricos, puntos, ondas. Se pueden mover y editar según necesidad **manteniendo su proporción**. En el manual se usan como fondo decorativo de papelería y membrete digital (C.01, C.02).

Uso web sugerido: fondos de hero y cierres de sección, con baja opacidad, siempre detrás del contenido y sin interferir con el contraste. Son decorativos: `aria-hidden`, y nunca cargan información.

## 7. Aplicaciones de referencia (C.01–C.02)

Papelería y membrete digital muestran el patrón visual a seguir: logo horizontal completo arriba a la izquierda, fondo blanco/gris muy claro, formas decorativas suaves en la esquina inferior o derecha, bloques sólidos azul y teal para tarjetas.

## 8. Assets necesarios (pedidos P-01 y P-07)

El PDF no es una fuente confiable de assets. Pedir **vectores originales** (SVG/AI/EPS):
- Isologotipo horizontal y vertical, con y sin pie, en las 4 versiones de color.
- Isotipo solo (color, blanco, negro) y versión de ícono/favicon.
- Formas decorativas (A.09).
- Logos de las empresas representadas (P-07), idealmente en versión blanca/negra y color.

Hasta recibirlos, los componentes usan un `Logo.astro` con un placeholder claramente rotulado.

## 9. Tokens provisorios (`src/styles/tokens.css`)

```css
/* WM Argentina — tokens de marca. Fuente: Manual de Marca (nov. 2021).
   T-09/T-10: colores reales del vector del manual; fuente Ubuntu. Confirmar con el cliente (P-02, P-03). */
:root {
  /* Marca — valores reales del vector del manual (ver docs/06 §4) */
  --wm-blue: #004f92;          /* principal: debe predominar */
  --wm-teal: #009298;          /* secundario: fondos y elementos secundarios */

  /* Declarados en el manual (A.07). Solo referencia documental: NO se usan en componentes */
  --wm-blue-declared: #2a4f8e;
  --wm-teal-declared: #4d8f95;

  /* Subtonos para elementos decorativos (A.09) — derivados, provisorios */
  --wm-blue-tint: #e6eef5;
  --wm-teal-tint: #e5f3f4;

  /* Neutros — NO definidos en el manual, provisorios (P-03) */
  --wm-text: #1a2733;
  --wm-text-muted: #4a5a68;
  --wm-bg: #ffffff;
  --wm-bg-soft: #f5f8fa;
  --wm-border: #d5dfe6;

  /* Tipografía — decisión T-10 (Ubuntu), a confirmar P-03 */
  --font-sans: "Ubuntu", system-ui, -apple-system, "Segoe UI", Arial, sans-serif;

  /* Breakpoints de referencia (mobile-first) */
  --bp-sm: 640px; --bp-md: 768px; --bp-lg: 1024px; --bp-xl: 1280px;

  /* Forma y espacio */
  --radius: 12px;
  --container: 72rem;
  --tap-min: 44px;
}
```

Regla: los componentes solo usan estas variables. Nada de HEX sueltos.

## 10. Errores detectados en el manual (se avisa al cliente, P-05)

- Las páginas A.03 y A.04 dicen "La marca de **Palo Alto** tiene diferentes versiones…": texto arrastrado de otro manual.
- Colores declarados que no coinciden con los del logo (§4).
- Página B.03: la muestra "Tipografía incorrecta" aparece vacía.
