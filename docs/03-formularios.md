# Formularios

Son **tres formularios estrictamente separados**, con endpoint, validación, destino y journey propios. No se cruzan.

| Formulario | Ruta | Público | Endpoint | Idiomas |
|---|---|---|---|---|
| Contacto | `/contacto` | Clientes | `POST /api/contact` | ES |
| Su Socio en Argentina | `/su-socio-en-argentina`, `/en/...` | Fabricantes internacionales | `POST /api/partner` | ES + EN |
| Trabajá con Nosotros | `/trabaja-con-nosotros` | Candidatos | `POST /api/careers` | ES |

## Reglas transversales

1. **Persistencia:** las consultas se guardan en el CMS de Harvi (decidido). En **fase 1** el CMS todavía no está conectado: los endpoints validan y responden, pero la persistencia usa un *sink* de desarrollo que **no guarda** (registra en consola). Debe ser imposible salir a producción con ese sink (ver checklist, bloque Seguridad). Fase 2: el sink pasa a ser el CMS.
2. **Validación en servidor** siempre (los mismos schemas que en cliente). Nunca confiar en el navegador.
3. **Anti-spam:** honeypot como mínimo. Captcha/Turnstile y rate limiting **pendientes (D-11)**.
4. **Notificación por mail** al equipo de WM y confirmación al usuario: **pendiente (D-11)**. No asumir.
5. **Privacidad:** aviso de tratamiento de datos personales y checkbox de aceptación donde corresponda (texto legal pendiente, D-19).
6. **Accesibilidad:** `label` visible, `autocomplete` correcto, mensajes de error asociados al campo, foco al primer error, estados de envío/éxito/error anunciados.
7. **Mensajes de éxito/error** con la voz de marca (cercano, claro, sin jerga).
8. Cada registro guardado incluye: tipo de formulario, fecha, idioma, página de origen. Sin IP ni datos innecesarios salvo decisión explícita.

## 1. Contacto — "formulario comercial inteligente"

Campos (del documento del cliente):

| Campo | Tipo | Obligatorio | Notas |
|---|---|---|---|
| Nombre | texto | sí | |
| Institución / empresa | texto | sí | |
| Cargo | texto | — | |
| Provincia | select | — | 24 jurisdicciones argentinas |
| Email | email | sí | |
| Teléfono | tel | — | |
| Solución de interés | select | — | Se alimenta de `lines` |
| Empresa representada | select | — | Se alimenta de `manufacturers` |
| Tipo de consulta | select | — | **Opciones pendientes (D-17)** |
| Mensaje | textarea | sí | |

CTA: **Enviar consulta**. *La obligatoriedad de cada campo es propuesta: confirmar (D-17).*

**Inteligencia:** si llega con `?solucion=` o `?empresa=` (desde una ficha o solución), preselecciona esos campos.

**Regla dura:** las consultas de fabricantes internacionales **no entran por este formulario**. Debe haber un aviso visible con link a "Su Socio en Argentina" (y la opción "Tipo de consulta" no puede ofrecer una vía para eso).

## 2. Su Socio en Argentina — formulario exclusivo (ES/EN)

Público: fabricantes que aún no están en Argentina o buscan un socio local.

**Empresa**

| Campo | Notas |
|---|---|
| Nombre | |
| País | lista de países |
| Website | url |
| Mercados actuales | |

**Contacto**

| Campo | Notas |
|---|---|
| Nombre | |
| Cargo | |
| Email | |
| Teléfono | |

**Tecnología**

| Campo | Notas |
|---|---|
| Área | |
| Descripción | |
| Presencia actual en Argentina | |
| Certificaciones o aprobaciones | |
| Mercados donde se comercializa | |

CTA: **Evaluar una alianza con WM Argentina** (EN: texto **pendiente D-12**).

- El formulario, sus errores y confirmaciones existen en ES y EN. El endpoint recibe `locale`.
- Tipos y obligatoriedad de cada campo: **pendientes (D-11)**. Propuesta inicial: obligatorios empresa, país, nombre, email y descripción.

## 3. Trabajá con Nosotros

El documento del cliente define bloques (cultura, áreas profesionales, búsquedas abiertas, desarrollo), un "Formulario Trabajá con nosotros" y una "Base de Talentos", y en el texto de apertura dice "Enviános un mail y adjuntanos tu CV". **No define campos ni si el CV se sube al sitio o llega por mail.** → **D-16**, preguntar antes de implementar.

CTA: **Quiero ser parte de WM**.

Consideraciones si se sube CV (a confirmar): tipos y tamaño máximo de archivo, almacenamiento en el CMS, retención y borrado, y aviso de privacidad reforzado.

## 4. Estados y contrato de la API (propuesta)

```
POST /api/<form>  →  200 { ok: true }
                     400 { ok: false, errors: { campo: "mensaje" } }
                     429 { ok: false, error: "rate_limited" }
                     500 { ok: false, error: "server_error" }
```

Las respuestas 4xx/5xx no exponen detalles internos ni trazas.
