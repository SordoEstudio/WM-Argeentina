#!/usr/bin/env bash
# setup-github.sh — Crea en GitHub el repo, labels, milestones, epics y board de seguimiento.
#
# IMPORTANTE:
#  - Lo ejecuta la persona. El agente no lo corre por su cuenta (AGENTS.md §1.2).
#  - NO hace `git push`: crea el repo VACÍO. El primer push es una acción aparte, con orden explícita.
#  - Pide confirmación antes de crear nada. `DRY_RUN=1 ./setup-github.sh` solo muestra qué haría.
#
# Requisitos: gh (GitHub CLI) autenticado con permisos sobre la organización.
#             Para el board: `gh auth refresh -s project`.
#
# Uso:  ./setup-github.sh

set -euo pipefail

ORG="${ORG:-Harvestech-dev}"
REPO="${REPO:-wm-argentina-web}"
REPO_FULL="${ORG}/${REPO}"
PROJECT_TITLE="WM Argentina Web"
DRY_RUN="${DRY_RUN:-0}"

command -v gh >/dev/null || { echo "ERROR: falta gh (GitHub CLI)"; exit 1; }

run() {
  if [ "$DRY_RUN" = "1" ]; then echo "[dry-run] $*"; else "$@"; fi
}

echo "==> Se va a crear/configurar en GitHub: ${REPO_FULL} (privado)"
echo "    - repo vacío (sin push), labels, 3 milestones, 12 epics + 3 issues de arranque, board"
[ "$DRY_RUN" = "1" ] && echo "    (DRY_RUN activo: no se crea nada)"
read -r -p "¿Continuar? (s/N) " ans
[[ "$ans" =~ ^[sS]$ ]] || { echo "Cancelado."; exit 0; }

# ---------- Repo (vacío, sin push) ----------
if gh repo view "$REPO_FULL" >/dev/null 2>&1; then
  echo "==> El repo ${REPO_FULL} ya existe; se reutiliza."
else
  echo "==> Creando repo privado ${REPO_FULL}"
  run gh repo create "$REPO_FULL" --private \
    --description "Sitio web WM Argentina — Astro + TypeScript + Vercel + CMS Harvi"
fi

# ---------- Labels ----------
echo "==> Labels"
label() { run gh label create "$1" --repo "$REPO_FULL" --color "$2" --description "$3" --force; }
label "epic"                "3E4B9E" "Epic (agrupa issues)"
label "fase-1"              "0E8A16" "Fase 1 — sitio con datos JSON"
label "fase-2"              "1D76DB" "Fase 2 — integración CMS Harvi"
label "fase-3"              "5319E7" "Fase 3 — pre-publicación y salida"
label "needs-client-input"  "FBCA04" "Falta información del cliente"
label "needs-decision"      "D93F0B" "Hay una decisión pendiente (docs/08)"
label "marca"               "009298" "Marca y sistema de diseño"
label "datos"               "C5DEF5" "Modelo de datos / JSON / CMS"
label "catalogo"            "BFD4F2" "Soluciones, productos, buscador"
label "formularios"         "F9D0C4" "Formularios y endpoints"
label "contenido"           "D4C5F9" "Contenido y páginas"
label "i18n"                "C2E0C6" "Idiomas"
label "seo"                 "FEF2C0" "SEO"
label "seguridad"           "B60205" "Seguridad"
label "rendimiento"         "0052CC" "Rendimiento"
label "responsive"          "006B75" "Responsive"
label "cms"                 "5319E7" "Integración CMS Harvi"
label "tooling"             "EDEDED" "Herramientas y setup"

# ---------- Milestones ----------
echo "==> Milestones"
ms() {
  if [ "$DRY_RUN" = "1" ]; then echo "[dry-run] milestone: $1"; return; fi
  gh api "repos/${REPO_FULL}/milestones" -f title="$1" -f description="$2" >/dev/null 2>&1 \
    || echo "    (milestone '$1' ya existe o no se pudo crear)"
}
M1="Fase 1 — Sitio con datos JSON"
M2="Fase 2 — Integración CMS Harvi"
M3="Fase 3 — Pre-publicación y salida"
ms "$M1" "Sitio completo alimentado por JSON local."
ms "$M2" "Conexión con el CMS de Harvi, formularios persistentes y Deploy Hook."
ms "$M3" "Seguridad, rendimiento, responsive, redirects y salida (solo con orden explícita)."

# ---------- Issues ----------
issue() { # título | labels | milestone | cuerpo
  run gh issue create --repo "$REPO_FULL" --title "$1" --label "$2" --milestone "$3" --body "$4"
}

echo "==> Issues de arranque"
issue "Pedidos al cliente (docs/11)" "needs-client-input" "$M1" \
"Lista viva en \`docs/11-pedidos-al-cliente.md\` (P-01…P-30). Hoy no hay contenido real de catálogo: el desarrollo usa datos ficticios marcados \`TODO-CLIENTE\`.

- [ ] Marca: vectores originales, confirmación de colores y tipografía (P-01…P-05)
- [ ] Datos de la empresa: contacto oficial, 12 empresas representadas con logos, certificaciones (P-06…P-09)
- [ ] Catálogo: 10 líneas, instrumentos, productos, brochures (P-10…P-16)
- [ ] Contenido de páginas y formularios (P-17…P-26)
- [ ] Legales, analítica, dominio/DNS y responsables (P-27…P-30)"

issue "Resolver decisiones pendientes (docs/08)" "needs-decision" "$M1" \
"Lista viva en \`docs/08-decisiones-pendientes.md\`. Regla del proyecto: **preguntar antes de suponer**.

- [ ] D-06 Fuente de los datos de contacto
- [ ] D-09 Documentación/API del CMS de Harvi
- [ ] D-11/12/16/17 Formularios (mail, anti-spam, campos) e inglés de Su Socio
- [ ] D-13 Estilos (Tailwind vs CSS con tokens)
- [ ] D-18/19/20 Redirects, legales/analítica, dominio y entornos
- [ ] D-21/23/24/25 Buscador, modelo de datos, banners de Home, blog de Hemostasia"

issue "Spikes técnicos iniciales" "tooling,fase-1" "$M1" \
"- [ ] S-1 Versión de Astro vigente y APIs (content config, assets, i18n, CSP, fuentes)
- [ ] S-2 Estrategia i18n para Su Socio (ES/EN)
- [ ] S-3 Pagefind + adaptador de Vercel (carpeta de salida)
- [ ] S-4 Build con 1.000 productos sintéticos (medir tiempo)"

echo "==> Epics"
epic() { issue "Epic $1 — $2" "epic,$3" "$4" "$5"; }

epic 1 "Fundaciones y tooling" "tooling,fase-1" "$M1" \
"Ref: RNF-01, RNF-02, RNF-09. Ver \`SPEC.md\` §1–2.
- [ ] Scaffold Astro + TypeScript estricto (\`setup.sh\`)
- [ ] Adaptador de Vercel, sitemap, \`astro check\`
- [ ] Estructura de carpetas y \`.env.example\`
- [ ] \`find-skills\` instalada (\`setup-skills.sh\`) y skills aprobadas registradas en docs/10
- [ ] Scripts de verificación (\`check-refs\`)"

epic 2 "Marca y sistema de diseño" "marca,fase-1" "$M1" \
"Ref: RF-60…63. Ver \`docs/06-marca-y-ui.md\`. Colores y tipografía decididos (T-09, T-10); pendientes de confirmación informativa (P-02, P-03).
- [ ] \`tokens.css\` y estilos globales
- [ ] Componente Logo (versiones, fondos, área de seguridad, sin pie en chico)
- [ ] Isotipo/favicon
- [ ] Elementos decorativos (A.09)
- [ ] Componentes UI base (botones, tarjetas, acordeón, campos) con contraste verificado
- [ ] Layout base, Header con mega-menú, Footer, CTA"

epic 3 "Capa de datos JSON y contenido inicial" "datos,fase-1" "$M1" \
"Ref: RF-70, RF-71, RNF-03. Ver \`docs/02-modelo-datos-catalogo.md\`.
- [ ] Schemas de todas las colecciones
- [ ] Loaders JSON + integridad referencial
- [ ] Índices derivados (compatibilidad inversa)
- [ ] Datos ficticios marcados \`TODO-CLIENTE\` (y datos sintéticos de 1.000 productos para pruebas)
- [ ] Carga de contenido real cuando el cliente lo entregue (P-10…P-16)"

epic 4 "Catálogo: soluciones, instrumentos, productos y doble recorrido" "catalogo,fase-1" "$M1" \
"Ref: RF-10…17. Ver \`.claude/skills/catalogo-productos\`.
- [ ] Índice de soluciones y página de línea (sistemas + productos sin instrumento)
- [ ] Página de instrumento (sistema completo)
- [ ] Ficha única de producto y canonical
- [ ] Listado /productos con filtros (línea, tipo, empresa, aplicación, compatibilidad)
- [ ] Brochure PDF por línea
- [ ] Breadcrumbs según camino de llegada"

epic 5 "Buscador" "catalogo,fase-1" "$M1" \
"Ref: RF-20, RF-21. Ver \`SPEC.md\` §7. Depende de S-3 y D-21.
- [ ] Índice de catálogo liviano
- [ ] Pagefind para contenido
- [ ] UI de búsqueda accesible, carga bajo demanda
- [ ] Página /buscar"

epic 6 "Páginas institucionales" "contenido,fase-1" "$M1" \
"Ref: RF-01…04, 30, 31, 33.
- [ ] Home con 2–3 banners editables (D-24)
- [ ] Nosotros (modelo, misión, visión, valores, propósito)
- [ ] Servicios (6, expandibles)
- [ ] Trabajá con Nosotros (bloques y búsquedas abiertas)
- [ ] CTA por sección"

epic 7 "Novedades y conocimiento" "contenido,seo,fase-1" "$M1" \
"Ref: RF-32, RF-82.
- [ ] Listado con 4 secciones y filtro por palabra clave
- [ ] Tarjeta de publicación y página de detalle
- [ ] Datos estructurados Article"

epic 8 "Formularios" "formularios,fase-1" "$M1" \
"Ref: RF-40…46. Ver \`docs/03-formularios.md\` y \`.claude/skills/formularios\`. Depende de D-11, D-16, D-17.
- [ ] Contacto (con preselección y aviso hacia Su Socio)
- [ ] Trabajá con Nosotros
- [ ] Endpoints /api/* con validación en servidor, honeypot y rate limiting
- [ ] \`FormSink\` dev (Fase 1) y bloqueo en producción
- [ ] Persistencia en el CMS y notificaciones (Fase 2)"

epic 9 "Su Socio en Argentina (ES/EN)" "contenido,i18n,fase-1" "$M1" \
"Ref: RF-43, RF-50, RF-51. Depende de D-12.
- [ ] Página ES y EN con hero, tarjetas, recorrido visual, mercados, empresas
- [ ] hreflang y selector de idioma
- [ ] Formulario bilingüe y endpoint propio
- [ ] Revisión del inglés con el cliente"

epic 10 "Integración CMS Harvi y Deploy Hook" "cms,datos,fase-2" "$M2" \
"Ref: RF-45, RF-72…74. Ver \`docs/07-integracion-cms-y-deploy.md\`. Bloqueado por D-09.
- [ ] Loaders del CMS con validación de schema
- [ ] Importación de la semilla JSON
- [ ] Guardado de consultas (token de escritura mínimo)
- [ ] Deploy Hook de Vercel (con orden explícita) y prueba real
- [ ] Contenido editable por el cliente, incluidos banners"

epic 11 "SEO técnico y redirects" "seo,fase-3" "$M3" \
"Ref: RF-80, RF-81. Ver \`.claude/skills/contenido-seo\`.
- [ ] Componente SEO, canonical, OG, sitemap, robots
- [ ] Datos estructurados
- [ ] Redirects 301 desde el sitio actual (D-18) probados uno a uno
- [ ] noindex en previews, sin noindex en producción"

epic 12 "Pre-publicación: seguridad, rendimiento y responsive" "seguridad,rendimiento,responsive,fase-3" "$M3" \
"Ref: RNF-04…08, 10, 13. Ver \`docs/09-checklist-prepublicacion.md\`.
- [ ] Seguridad: secretos, endpoints, cabeceras/CSP, dependencias, privacidad
- [ ] Rendimiento: Core Web Vitals, imágenes, fuentes, JS, build con 1.000 productos
- [ ] Responsive: matriz de anchos, dispositivos reales, formularios, tablas, menú
- [ ] Accesibilidad WCAG 2.2 AA y SEO final
- [ ] Sin contenido ficticio ni TODO-CLIENTE
- [ ] Aprobación del cliente y orden explícita de salida"

# ---------- Board ----------
echo "==> Project board"
if [ "$DRY_RUN" = "1" ]; then
  echo "[dry-run] gh project create --owner $ORG --title '$PROJECT_TITLE'"
else
  gh project create --owner "$ORG" --title "$PROJECT_TITLE" >/dev/null 2>&1 \
    && echo "    Board creado. Agregá los issues desde la UI o con: gh project item-add <N> --owner $ORG --url <issue-url>" \
    || echo "    No se pudo crear el board (¿falta 'gh auth refresh -s project'?). Crealo a mano."
fi

echo
echo "==> Listo. Repo: https://github.com/${REPO_FULL}"
echo "    El repo está VACÍO: no se hizo push. Cuando lo pidas de forma explícita, se conecta el remoto y se sube."
