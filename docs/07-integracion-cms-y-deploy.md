# Integración con el CMS de Harvi y deploy webhook (Fase 2)

> **Estado:** diseño de alto nivel. No hay documentación de la API del CMS en este paquete (D-09). Nada de esto se implementa hasta tenerla. **No inventar endpoints.**

## 1. Estrategia en dos pasos

1. **Fase 1:** sitio completo con JSON local. El sitio se puede desarrollar, revisar y aprobar sin depender del CMS.
2. **Fase 2:** conectar el CMS reemplazando el origen de datos. Si el modelo de datos de Fase 1 está bien pensado (`02-modelo-datos-catalogo.md`), el cambio queda aislado en `src/content.config.ts` (loaders) y en un módulo `src/lib/cms/` para formularios.

## 2. Qué necesitamos saber del CMS (checklist para la persona que lo mantiene)

- [ ] URL base y entornos (staging / producción).
- [ ] Autenticación para lectura (token, API key) y escritura (formularios).
- [ ] Colecciones que puede modelar: relaciones N:N (`platformIds`, `relatedIds`), campos enum, arrays de objetos, rich text (formato y sanitización).
- [ ] Manejo de archivos: PDF (brochures, fichas) e imágenes; URLs finales, tamaños máximos, CDN.
- [ ] Soporte de multi-sitio/multi-tenant.
- [ ] Contenido multi-idioma (necesario para `pages` ES/EN).
- [ ] Paginación, filtros y límites de la API (para 500–1.000 productos).
- [ ] Guardado de envíos de formularios: colección, campos, retención, quién los ve, notificaciones.
- [ ] Posibilidad de disparar un webhook al publicar (o dónde se configura).
- [ ] Rate limits.

## 3. Lectura de contenido

- Loader propio (o `fetch` en build) con el token en variables de entorno **del servidor** (nunca `PUBLIC_`).
- Validación con los mismos schemas: si el CMS devuelve algo inesperado, **el build falla** con mensaje claro (mejor eso que publicar datos rotos).
- Astro 6 introdujo colecciones "live" para contenido externo; **no se usan** porque la decisión es sitio estático reconstruido por webhook. Reevaluar solo si el cliente pide contenido inmediato sin rebuild.

## 4. Deploy webhook

```
Editor publica en el CMS → CMS llama al Vercel Deploy Hook → Vercel reconstruye el sitio → sitio actualizado
```

- Se crea un **Deploy Hook** en el proyecto de Vercel para la rama de producción. La URL del hook es un **secreto**: vive en variables de entorno del CMS, nunca en el repo.
- Criterios a definir con Harvi: qué acciones del CMS disparan el hook (publicar, despublicar, editar), si se agrupan cambios (varios guardados seguidos = un solo build), y qué ve el editor mientras dura el build.
- Tiempo de build: con 1.000 productos debe medirse (RNF de escalabilidad). Si crece demasiado, evaluar caché de imágenes y builds incrementales.
- Preview: un segundo hook o rama para *staging* con contenido no publicado (D-20).
- El disparo de un hook de **producción** desde el CMS es una acción de publicación: no se configura sin orden explícita (AGENTS.md §1.2).

## 5. Formularios → CMS

- Los endpoints `/api/*` (serverless en Vercel) reciben, validan y guardan en el CMS con un token **de escritura restringido** (solo crear envíos, no leer ni borrar contenido).
- Si el CMS está caído: responder error controlado al usuario; evaluar reintento. **No perder consultas silenciosamente** (D-11).
- Interfaz del "sink" definida desde Fase 1 (`FormSink`) para que el cambio sea solo de implementación.

## 6. Migración de datos JSON → CMS

- Los `src/data/*.json` de Fase 1 sirven como semilla de carga inicial (script de importación, a escribir cuando se conozca la API).
- Verificar que IDs y slugs se conservan (las URLs y las relaciones dependen de ellos).

## 7. Seguridad de la integración
Ver `09-checklist-prepublicacion.md` (bloque Seguridad): tokens solo servidor, secretos rotables, sanitización de HTML del CMS, validación de esquema, permisos mínimos.
