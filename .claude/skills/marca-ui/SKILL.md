---
name: marca-ui
description: Usar al construir o modificar cualquier interfaz, componente, estilo, logo o pieza visual de WM Argentina. Aplica el manual de marca (nov. 2021): colores, logo, tipografía, elementos secundarios y reglas de contraste.
---

# Marca y UI — WM Argentina

Leer antes: `docs/06-marca-y-ui.md`. Tokens en `src/styles/tokens.css`. Los colores son los reales del vector del manual; los declarados no se usan.

## Reglas
1. Colores y fuentes **solo** desde tokens (`var(--wm-…)`). Prohibido HEX sueltos.
2. El **azul predomina**; el **teal** acompaña en fondos y elementos secundarios.
3. **Contraste:** el teal con blanco da 3,8:1. No usarlo para texto chico. Texto de cuerpo y botones primarios en azul (o blanco sobre azul: 8,3:1). Nunca azul sobre teal.
4. Logo:
   - Versión principal cuando se pueda; blanco o negro sobre fotos y fondos no corporativos, según luminosidad.
   - Área de seguridad equivalente al isotipo; sin pie de marca en tamaños chicos.
   - **Nunca** deformar, recolorear, usar tintas, recortar, reespaciar ni cambiar la tipografía.
   - Isotipo solo para favicon, avatares y espacios cuadrados.
5. Nombre en texto: **WM Argentina**.
6. Elementos decorativos (formas en subtonos): detrás del contenido, baja opacidad, `aria-hidden`, sin información.
7. Diseño mobile-first, objetivos táctiles ≥ 44 px, foco visible.

## Preguntar antes de suponer
Neutros (P-03), mínimo del logo en pantalla (P-04), estilos (Tailwind vs CSS, D-13). Colores (T-09) y tipografía (T-10) ya están decididos, pendientes de confirmación informativa del cliente (P-02, P-03). Assets vectoriales originales: pedirlos (P-01), no redibujar el logo.

## Checklist al implementar
- [ ] Sin colores/fuentes fuera de tokens.
- [ ] Contraste verificado en cada combinación nueva.
- [ ] Logo con la versión correcta sobre cada fondo.
- [ ] Probado a 360 px y a 200 % de zoom.
