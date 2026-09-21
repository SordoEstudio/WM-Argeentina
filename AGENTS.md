# AGENTS.md — WM Argentina Web

Instrucciones para cualquier agente de IA (Claude Code, etc.) o persona que trabaje en este repositorio.
Leer completo antes de tocar código.

## 1. Reglas innegociables

### 1.1 Preguntar antes de suponer
- Ante cualquier duda de alcance, contenido, diseño, datos o decisión técnica: **preguntar**. No rellenar huecos con suposiciones.
- Toda decisión abierta se registra en `docs/08-decisiones-pendientes.md` (con ID, pregunta, propuesta y estado). Todo dato que tiene que entregar o validar el cliente se agrega a `docs/11-pedidos-al-cliente.md`.
- Si hace falta avanzar sin respuesta, dejar el punto marcado como `PENDIENTE` (en código: `// TODO-PENDIENTE(D-xx)`; en contenido: `TODO-CLIENTE`) y avisar. Nunca disfrazar una suposición como dato.
- No inventar: contenido de productos, cifras, certificaciones, nombres de empresas representadas, textos legales ni claims sanitarios.
- No inventar la API del CMS de Harvi. Hasta tener su documentación, se trabaja con JSON local (ver `SPEC.md` §4).

### 1.2 Cero push sin pedido previo
- **Prohibido** ejecutar `git push`, `gh pr create`, `gh pr merge`, `vercel --prod`, cambios de DNS o cualquier acción que publique o exponga código o el sitio, **salvo que la persona lo pida de forma explícita en esa conversación**.
- Un pedido anterior no autoriza pedidos futuros. Cada push requiere su propia orden.
- Los commits locales se hacen solo cuando la persona los pide.
- Los scripts `setup-github.sh` y `setup-skills.sh` los ejecuta la persona; el agente no los corre por su cuenta.

### 1.3 Skills: instalar y buscar con `find-skills`
- Las skills se buscan e instalan con el CLI de skills.sh. Ver `docs/10-skills-externas.md` (procedimiento completo).
- Primero se instala `find-skills`:
  ```bash
  npx skills add https://github.com/vercel-labs/skills --skill find-skills
  ```
- Después se busca por dominio (`npx skills find <tema>`), y **solo se proponen** skills oficiales o con respaldo en descargas (criterios en el doc). **No se instala ninguna sin OK de la persona.**
- Las skills propias del proyecto viven en `.claude/skills/` (donde Claude Code las detecta) y se mantienen a mano.

### 1.4 Marca
- La marca se escribe **WM Argentina** (nunca `WM ARGENTINA`, `wm argentina` ni `WMArgentina`), según el manual de marca (B.04).
- El logo no se deforma, recolorea, recorta ni reespacia (B.03). Detalle en `docs/06-marca-y-ui.md`.
- Colores y tipografías salen solo de los tokens definidos en `src/styles/tokens.css`. Sin colores sueltos en componentes. Los colores usados son los reales del vector del manual (`#004f92`, `#009298`); los declarados en el manual solo se conservan como referencia (`docs/06` §4).

## 2. Método de trabajo (SDD)

1. `REQUIREMENTS.md` define **qué** (RF/RNF).
2. `SPEC.md` define **cómo** (arquitectura, rutas, datos, componentes, fases).
3. `docs/` aporta contexto y contenido fuente.
4. Si un cambio altera el alcance: actualizar primero REQUIREMENTS/SPEC, después el código.
5. Cada issue de GitHub referencia sus RF/RNF.

## 3. Stack

| Capa | Decisión |
|---|---|
| Frontend | Astro + TypeScript (estricto), sitio estático (SSG) |
| Hosting | Vercel (`@astrojs/vercel`) |
| Datos, Fase 1 | JSON local validado con schemas (Content Layer de Astro) |
| Datos, Fase 2 | CMS propio de Harvi (`next-vercel-mongo`: Next.js + MongoDB) |
| Deploy | CMS → Vercel Deploy Hook → rebuild del sitio en cada publicación |
| Formularios | Endpoints serverless en Astro → guardan en el CMS |
| Buscador | Client-side (Pagefind + índice JSON de catálogo) |
| Idiomas | Español en todo el sitio; español + inglés solo en "Su Socio en Argentina" |

**No se usa** Payload ni PostgreSQL. Los estilos (Tailwind vs. CSS con tokens) están **PENDIENTES** (D-13): no instalar ninguno hasta que se confirme.

Versión de Astro: usar la última estable al momento del scaffold y **leer la guía de upgrade y la documentación de esa versión**. No asumir APIs de memoria.

## 4. Convenciones (propuestas, confirmar en D-14)

- Documentación y contenido: español rioplatense, "vos", lenguaje simple, sin jerga.
- Código, nombres de variables, commits y ramas: inglés (commits en formato Conventional Commits).
- Ramas: `feat/<epic>-<tema>`, `fix/<tema>`, `docs/<tema>`.
- TypeScript estricto. Sin `any` sin comentario justificado.
- Componentes Astro por defecto; JavaScript de cliente solo donde hay interacción real (islas mínimas).

## 5. Definición de "terminado" (DoD) por issue

- [ ] Cumple los RF/RNF referenciados
- [ ] `astro check` y build sin errores ni warnings nuevos
- [ ] Revisado en mobile (360 px) y desktop
- [ ] Sin colores/fuentes fuera de tokens
- [ ] Sin contenido inventado (o marcado `TODO-CLIENTE`)
- [ ] Docs actualizados si cambió alguna decisión

## 6. Antes de publicar

Ninguna publicación sin completar `docs/09-checklist-prepublicacion.md` (seguridad, rendimiento y responsive) **y** sin orden explícita de la persona.

## 7. Mapa del repo

```
AGENTS.md  REQUIREMENTS.md  SPEC.md  README.md
docs/      contexto, contenido fuente, modelo de datos, marca, checklist, pedidos al cliente
CLAUDE.md  importa AGENTS.md (para que Claude Code lo lea)
.claude/    settings.json (permisos) y skills/ propias (catálogo, formularios, contenido/SEO, marca/UI)
scripts/   utilidades
setup.sh            scaffold local del proyecto Astro
setup-skills.sh     instala find-skills (lo ejecuta la persona)
setup-github.sh     repo, labels, milestones, epics (lo ejecuta la persona)
```
