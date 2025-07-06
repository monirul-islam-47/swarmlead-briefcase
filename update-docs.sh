#!/bin/bash

echo "🔄 Updating SwarmLead documents..."

# Convert markdown to HTML
echo "📄 Converting documents..."
node build-professional.js

# Add all changes
echo "📦 Staging changes..."
git add -A

# Commit with timestamp
echo "💾 Committing..."
git commit -m "Update documents - $(date '+%Y-%m-%d %H:%M')"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push

echo "✅ Done! Changes will be live in 1-2 minutes at:"
echo "https://monirul-islam-47.github.io/swarmlead-briefcase/index-professional.html"