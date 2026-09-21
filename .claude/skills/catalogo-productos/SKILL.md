---
name: catalogo-productos
description: Usar al trabajar con soluciones (líneas), instrumentos, productos, fichas, filtros o buscador del catálogo de WM Argentina. Garantiza el doble recorrido sin duplicar fichas y el modelo de datos escalable a 500–1.000 referencias.
---

# Catálogo de productos — WM Argentina

Antes de empezar leer: `docs/02-modelo-datos-catalogo.md`, `docs/01-sitemap-arquitectura.md` §3–4 y `SPEC.md` §4 y §7.

## Reglas

1. **Una ficha por producto** (`/productos/[slug]`). Nunca copiar contenido de un producto a otra página.
2. **Dos recorridos, una sola fuente de datos:**
   - Solución completa: Línea → Instrumento → Reactivos compatibles → Consumibles/Controles → Software → Documentación.
   - Producto puntual: Reactivos/Controles/Consumibles filtrados por aplicación y compatibilidad.
3. **No separar los reactivos del instrumento que los usa** en la vista de sistema.
4. La compatibilidad se guarda **de un solo lado** (`platformIds` en el producto compatible). El lado inverso se **deriva** en `src/lib/catalog.ts`.
5. Un producto sin `platformIds` es "producto sin instrumento" y aparece en la sección B de su línea.
6. Los listados no cargan fichas completas: usan campos livianos o el índice de búsqueda.
7. Agregar un producto = agregar datos, **no código**. Si hace falta tocar código para un producto, el modelo está mal.
8. Cualquier campo nuevo se agrega al schema y a `docs/02`, y se avisa (D-21, D-23).

## Preguntar antes de suponer
- Contenido real de líneas, instrumentos y productos: **no inventar**. Usar datos ficticios evidentes (`prd-ejemplo-…`) marcados `TODO-CLIENTE`.
- Si hay duda sobre cómo se clasifica un producto (línea, categoría, compatibilidad): preguntar.

## Checklist al implementar
- [ ] Integridad referencial verificada (`scripts/check-refs.ts`).
- [ ] Breadcrumb coherente según el camino de llegada; canonical apunta a la ficha única.
- [ ] Estados `active`/`discontinued` tratados según regla acordada.
- [ ] Probado con catálogo sintético de 1.000 productos (build y navegación).
- [ ] Filtros accesibles por teclado y usables en móvil (panel/cajón).
- [ ] Cada listado y ficha tiene CTA a Contacto con `?solucion=` o `?empresa=` cuando corresponde.
