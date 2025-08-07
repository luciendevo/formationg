#!/bin/bash

# 🚀 Script de déploiement Netlify
# Usage: ./scripts/deploy.sh

set -e

echo "🔍 Vérification des prérequis..."

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé"
    exit 1
fi

# Vérifier la version Node.js
NODE_VERSION=$(node --version | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ requise. Version actuelle: $(node --version)"
    exit 1
fi

echo "✅ Node.js $(node --version) détecté"

echo "📦 Installation des dépendances..."
npm ci

echo "🔍 Vérification du code..."
npm run lint
npm run type-check

echo "🏗️ Build de production..."
npm run build

echo "📊 Analyse du build..."
echo "Taille du dossier dist:"
du -sh dist/

echo "Fichiers générés:"
ls -la dist/

echo "✅ Build terminé avec succès !"
echo ""
echo "🚀 Options de déploiement:"
echo "1. Drag & Drop: Glissez le dossier 'dist' sur netlify.com"
echo "2. CLI Netlify: npm install -g netlify-cli && netlify deploy --prod --dir=dist"
echo "3. Git: Poussez vers votre repository pour un déploiement automatique"
echo ""
echo "📱 Test local: npm run serve"