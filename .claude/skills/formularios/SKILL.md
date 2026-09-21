---
name: formularios
description: Usar al crear o modificar los formularios de WM Argentina (Contacto, Su Socio en Argentina ES/EN, Trabajá con Nosotros), sus endpoints /api/* o el guardado de consultas en el CMS. Mantiene los tres journeys separados y la validación en servidor.
---

# Formularios — WM Argentina

Leer antes: `docs/03-formularios.md`, `docs/07-integracion-cms-y-deploy.md` §5 y `SPEC.md` §8.

## Reglas

1. **Tres formularios, tres endpoints, tres schemas.** Nunca compartir endpoint ni mezclar campos. Una consulta de fabricante **no** entra por Contacto; Contacto muestra aviso y link a Su Socio.
2. **Validar siempre en el servidor** con el mismo schema que el cliente. Lista blanca para selects (provincias, líneas, empresas).
3. **Guardado:** vía `FormSink`. En Fase 1 es `dev` (no persiste); en producción debe ser `cms`. Si `FORM_SINK=dev` en producción, **fallar**.
4. Anti-spam: honeypot + rate limiting como base. Captcha y mail de notificación **dependen de D-11: preguntar, no decidir**.
5. Respuestas de error genéricas al usuario; sin trazas ni datos internos. No registrar datos personales innecesarios.
6. Su Socio funciona en ES y EN: labels, ayudas, errores y confirmación en ambos; el endpoint recibe `locale`.
7. Accesibilidad: `label` visible, `autocomplete`, errores asociados con `aria-describedby`, foco al primer error, estados anunciados, funciona sin JavaScript.
8. Voz de marca en mensajes: cercano, claro, sin jerga.

## Preguntar antes de suponer
- Campos y obligatoriedad de **Trabajá con Nosotros** (D-16), opciones de **Tipo de consulta** (D-17), campos obligatorios de Su Socio y textos en inglés (D-11, D-12), destinatarios de mail (D-11), textos legales (D-19).

## Checklist al implementar
- [ ] Probar cada endpoint con entradas inválidas y maliciosas.
- [ ] Probar que un payload de un formulario es rechazado por los otros dos endpoints.
- [ ] Confirmar que ningún token de escritura llega al cliente.
- [ ] Estados vacío/enviando/éxito/error en móvil y desktop.
- [ ] Revisar el bloque Seguridad de `docs/09-checklist-prepublicacion.md`.
