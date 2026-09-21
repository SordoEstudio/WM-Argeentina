#!/usr/bin/env bash
# setup-skills.sh — Instala la skill `find-skills` (skills.sh) en este proyecto.
#
# SOLO instala find-skills. Cualquier otra skill se busca con `npx skills find <tema>`,
# se propone a la persona con fuente e instalaciones, y se instala únicamente con su OK
# (ver docs/10-skills-externas.md).
#
# Uso:  ./setup-skills.sh

set -euo pipefail
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

command -v npx >/dev/null || { echo "ERROR: falta npx (Node.js)"; exit 1; }

echo "==> Se va a ejecutar:"
echo "    npx skills add https://github.com/vercel-labs/skills --skill find-skills"
echo "    (el CLI envía telemetría anónima; para desactivarla: DISABLE_TELEMETRY=1 ./setup-skills.sh)"
read -r -p "¿Continuar? (s/N) " ans
[[ "$ans" =~ ^[sS]$ ]] || { echo "Cancelado."; exit 0; }

npx skills add https://github.com/vercel-labs/skills --skill find-skills

cat <<'MSG'

find-skills instalada. Siguiente paso: pedirle al agente que busque skills para
Astro, TypeScript, Vercel, accesibilidad, SEO, rendimiento y seguridad, priorizando
fuentes oficiales o con muchas instalaciones, y que te las proponga en una tabla.
No se instala nada más sin tu OK. Registrar las aprobadas en docs/10-skills-externas.md §5.
MSG
