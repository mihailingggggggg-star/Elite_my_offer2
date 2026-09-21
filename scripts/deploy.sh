#!/usr/bin/env bash
# Publishes ./dist to the gh-pages branch, which GitHub Pages serves.
# Needs a token with `repo` scope: GH_TOKEN=... npm run deploy
set -euo pipefail

REPO="mihailingggggggg-star/Elite_my_offer2"
: "${GH_TOKEN:?set GH_TOKEN first}"

touch dist/.nojekyll
cd dist
rm -rf .git
git init -q
git checkout -qB gh-pages
git add -A
git -c user.email="deploy@elitehouse" -c user.name="deploy" commit -q -m "Deploy $(date -u +%FT%TZ)"
git push -qf "https://x-access-token:${GH_TOKEN}@github.com/${REPO}.git" gh-pages:gh-pages
rm -rf .git
echo "https://mihailingggggggg-star.github.io/Elite_my_offer2/"
