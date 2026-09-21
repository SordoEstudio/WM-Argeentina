# Trabajar este proyecto en Claude Code (pestaña Code)

## 1. Preparar la carpeta (una sola vez)

1. Descomprimí `wm-argentina-web-SDD.zip` en tu compu, en la carpeta donde guardás tus proyectos.
2. En una **terminal**, dentro de esa carpeta, corré `./setup.sh` (crea el proyecto Astro; pide confirmación, por eso conviene que lo ejecutes vos y no el agente). Requiere Node.js y conexión a internet.
3. Todavía sin git: cuando quieras versionarlo, `git init` lo decidís vos (el paquete no hace push nunca).

## 2. Abrir en Claude Code

1. En la app de escritorio, abrí la pestaña **Code** y elegí la carpeta `wm-argentina-web`.
2. Claude Code va a leer `CLAUDE.md`, que importa `AGENTS.md` con las reglas del proyecto, y detectar las 4 skills de `.claude/skills/`.
3. Permisos (`.claude/settings.json`): lectura y edición libres; **pide confirmación** antes de commit, push, `gh`, `vercel`, instalar dependencias o instalar skills; bloquea leer `.env`. Si querés aún más estricto (bloqueo total de push), mové `Bash(git push*)` de `ask` a `deny`.

## 3. Primer prompt sugerido

```
Leé CLAUDE.md, AGENTS.md, docs/00-brief.md, REQUIREMENTS.md y SPEC.md.
Después leé docs/08-decisiones-pendientes.md y docs/11-pedidos-al-cliente.md.
Empezá por la Epic 1 (Fundaciones y tooling) y los spikes S-1 a S-4 de SPEC.md §12:
- verificá la versión de Astro instalada y su documentación vigente
- no supongas nada: si algo no está definido, preguntame
- no hagas push ni commits sin que te lo pida
Antes de escribir código, decime el plan en pasos cortos.
```

## 4. Orden de trabajo recomendado

1. Epic 1: verificar el scaffold (`npm run dev`, `astro check`).
2. Epic 2: tokens, `Logo` (con placeholder hasta recibir P-01), layout base, header y footer.
3. Epic 3: schemas + JSON ficticios + verificación de referencias.
4. Epic 4: catálogo (línea → instrumento → ficha única).
5. Epics 5–9 y luego 10 (CMS) cuando estén los docs del CMS (H-01).
6. Epics 11 y 12 antes de cualquier salida.

Cada epic se trabaja en su propia sesión o rama, con sus issues, y se cierra con la definición de "terminado" de `AGENTS.md` §5.

## 5. Skills externas
Cuando quieras sumar skills: `./setup-skills.sh` (instala `find-skills`) y después pedirle al agente que busque y **te proponga** candidatas (`docs/10`). Instalar solo las que apruebes.

## 6. Cosas a tener en cuenta
- Los scripts `setup*.sh` piden confirmación interactiva: ejecutalos vos en una terminal.
- Si el agente propone algo que contradice `AGENTS.md`, gana `AGENTS.md`.
- Cada decisión nueva se registra en `docs/08`; cada dato que falta del cliente, en `docs/11`.
