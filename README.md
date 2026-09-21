# WM Argentina Web

Sitio institucional + catálogo de productos para **WM Argentina**. Astro + TypeScript + Vercel, conectado (en Fase 2) al CMS propio de Harvi con Deploy Hook. Fase 1: datos en JSON.

Documentación bajo metodología SDD. **Leer en este orden:**

1. `AGENTS.md` — reglas (preguntar antes de suponer · cero push sin pedido · skills)
2. `docs/00-brief.md` — contexto, objetivos y fases
3. `REQUIREMENTS.md` — qué debe cumplir
4. `SPEC.md` — cómo se construye
5. `docs/08-decisiones-pendientes.md` — **lo que falta definir** · `docs/11-pedidos-al-cliente.md` — **lo que falta recibir**

## Índice de `docs/`

| Archivo | Contenido |
|---|---|
| `00-brief.md` | Brief, públicos, alcance, fases |
| `01-sitemap-arquitectura.md` | Rutas, navegación, doble recorrido, redirects (borrador) |
| `02-modelo-datos-catalogo.md` | Colecciones y modelo de producto |
| `03-formularios.md` | Los 3 formularios |
| `04-contenido-soluciones.md` | Las 10 soluciones y criterio editorial |
| `05-referencias-cliente.md` | Texto fuente íntegro y datos del sitio actual |
| `06-marca-y-ui.md` | Manual de marca aplicado a web, tokens y contraste |
| `07-integracion-cms-y-deploy.md` | CMS Harvi y Deploy Hook (Fase 2) |
| `08-decisiones-pendientes.md` | Decisiones tomadas y abiertas |
| `09-checklist-prepublicacion.md` | Seguridad, rendimiento y responsive antes de salir |
| `10-skills-externas.md` | Cómo buscar/instalar skills con `find-skills` |
| `12-claude-code.md` | Cómo abrir y trabajar el proyecto en la pestaña Code de Claude |
| `11-pedidos-al-cliente.md` | **Todo lo que hay que pedir o validar con el cliente** (y pendientes internos de Harvi) |

## Skills propias (`.claude/skills/`)
`catalogo-productos` · `formularios` · `contenido-seo` · `marca-ui`

## Arranque (lo ejecuta una persona)

```bash
./setup.sh          # scaffold local de Astro (sin git, sin push)
./setup-skills.sh   # instala find-skills
./setup-github.sh   # repo vacío + labels + milestones + epics (pide confirmación; DRY_RUN=1 para simular)
```

Nada de esto hace `git push` ni publica el sitio.

## Usar con Claude Code

`CLAUDE.md` importa `AGENTS.md`; `.claude/settings.json` pide confirmación antes de commit, push, `gh`, `vercel` e instalación de skills, y bloquea leer `.env`. Abrir esta carpeta en la pestaña Code y arrancar con el prompt sugerido en `docs/12-claude-code.md`.
