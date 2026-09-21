#!/usr/bin/env bash
# setup.sh — Scaffold local del proyecto Astro + TypeScript para WM Argentina Web.
#
# Qué hace:  crea el proyecto Astro en esta carpeta, agrega el adaptador de Vercel, sitemap,
#            verificación de tipos y Pagefind, y deja la estructura base + tokens + .env.example.
# Qué NO hace: no inicializa git, no hace commit, no hace push, no despliega, no instala skills.
#
# Requisitos: Node.js (LTS actual) y npm, con acceso a internet.
# Estado: escrito según las CLIs de Astro conocidas; NO fue ejecutado en este entorno (spike S-1).
#         Si una bandera de la CLI cambió en la versión vigente, seguir el asistente interactivo.
#
# Uso:  ./setup.sh

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

echo "==> WM Argentina Web — scaffold local"
echo "    Carpeta: $ROOT"
command -v node >/dev/null || { echo "ERROR: falta Node.js"; exit 1; }
command -v npm  >/dev/null || { echo "ERROR: falta npm"; exit 1; }
echo "    Node $(node -v) / npm $(npm -v)"

if [ -f package.json ]; then
  echo "Ya existe package.json: el proyecto parece scaffoldeado. No se hace nada."
  exit 0
fi

read -r -p "¿Crear el proyecto Astro en esta carpeta? (s/N) " ans
[[ "$ans" =~ ^[sS]$ ]] || { echo "Cancelado."; exit 0; }

TMP="_astro-tmp"
echo "==> 1/6 Creando proyecto Astro (plantilla mínima) en ./$TMP"
npm create astro@latest "$TMP" -- --template minimal --no-git --no-install --yes

echo "==> 2/6 Moviendo archivos a la raíz (sin pisar docs ni README propios)"
shopt -s dotglob
for f in "$TMP"/*; do
  name="$(basename "$f")"
  case "$name" in
    README.md|node_modules) continue ;;
  esac
  cp -rn "$f" "$ROOT/"
done
shopt -u dotglob
rm -rf "$TMP"

echo "==> 3/6 Instalando dependencias"
npm install
npm install -D @astrojs/check typescript pagefind

echo "==> 4/6 Integraciones oficiales (Vercel, sitemap)"
npx astro add vercel --yes
npx astro add sitemap --yes

echo "==> 5/6 Estructura base"
mkdir -p src/{data,lib/forms,lib/cms,components/{brand,ui,catalog,layout},layouts,styles} \
         src/pages/{soluciones,productos,novedades,en,api} scripts public/brochures

# Datos de Fase 1: arrancan vacíos. Contenido real o ficticio marcado (TODO-CLIENTE) se carga después.
for c in lines manufacturers products services posts jobs pages; do
  [ -f "src/data/$c.json" ] || echo "[]" > "src/data/$c.json"
done
[ -f src/data/site.json ] || echo "{}" > src/data/site.json

# Tokens de marca (ver docs/06-marca-y-ui.md; decisiones T-09 y T-10, a confirmar con el cliente)
if [ ! -f src/styles/tokens.css ]; then
cat > src/styles/tokens.css <<'CSS'
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
CSS
fi

if [ ! -f .env.example ]; then
cat > .env.example <<'ENV'
# Copiar a .env (nunca commitear .env). Sin valores reales en este archivo.
DATA_SOURCE=json            # json (Fase 1) | cms (Fase 2)
SITE_URL=http://localhost:4321
FORM_SINK=dev               # dev | cms  — PROHIBIDO dev en producción
# --- Fase 2 (CMS Harvi) — solo servidor, nunca PUBLIC_ ---
CMS_URL=
CMS_READ_TOKEN=
CMS_WRITE_TOKEN=
# --- Anti-spam (D-11) ---
# ANTI_SPAM_*=
ENV
fi

echo "==> 6/6 .gitignore"
touch .gitignore
for line in ".env" ".env.*" "!.env.example" ".vercel" "dist" "node_modules" ".claude/settings.local.json"; do
  grep -qxF "$line" .gitignore || echo "$line" >> .gitignore
done

cat <<'MSG'

Listo. Scaffold local completo. No se hizo git init, commit ni push.

Próximos pasos (los decide la persona):
  1. npm run dev            → verificar que arranca
  2. Revisar la versión de Astro instalada y su guía de upgrade (spike S-1)
  3. Leer docs/08-decisiones-pendientes.md y docs/11-pedidos-al-cliente.md
  4. ./setup-skills.sh      → instalar find-skills
  5. ./setup-github.sh      → crear repo y epics (solo con tu OK)
MSG
