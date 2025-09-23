#!/bin/bash

# Setup Git Repository Script
# This script helps you set up the Git repository for the first time

echo "🔧 SETTING UP GIT REPOSITORY"
echo "============================"
echo ""

# Configuration
GIT_REPO="https://github.com/YOUR_USERNAME/techacademy.git"  # Replace with your actual repo

echo "📋 Configuration:"
echo "   Git Repo: $GIT_REPO"
echo ""

echo "🔧 Setting up Git repository..."

# Initialize Git if not already done
if [ ! -d ".git" ]; then
    echo "📝 Initializing Git repository..."
    git init
    git remote add origin $GIT_REPO
    echo "✅ Git repository initialized"
else
    echo "ℹ️  Git repository already exists"
fi

# Add all files
echo "📝 Adding all files to Git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: TechAcademy with modern EdTech design, chatbot, and assessment features"

# Push to remote repository
echo "📤 Pushing to remote repository..."
git push -u origin main

echo ""
echo "✅ GIT REPOSITORY SETUP COMPLETE!"
echo "================================="
echo ""
echo "📋 Next steps:"
echo "1. Update the repository URL in clean-and-deploy.sh"
echo "2. Run: chmod +x clean-and-deploy.sh"
echo "3. Run: ./clean-and-deploy.sh"
echo ""
echo "🌐 Your repository is now ready at: $GIT_REPO"
