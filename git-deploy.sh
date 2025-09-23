#!/bin/bash

# Git-based Deployment Script
# This script pushes changes to Git and deploys on EC2

echo "🚀 Git-based Deployment for TechAcademy"
echo "======================================="
echo ""

# Configuration
GIT_REPO="https://github.com/YOUR_USERNAME/techacademy.git"  # Replace with your actual repo
EC2_IP="65.0.95.121"
EC2_USER="ubuntu"
KEY_PATH="~/.ssh/your-key.pem"

echo "📋 Configuration:"
echo "   Git Repo: $GIT_REPO"
echo "   EC2 IP: $EC2_IP"
echo "   User: $EC2_USER"
echo ""

# Step 1: Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not a Git repository. Initializing..."
    git init
    git remote add origin $GIT_REPO
fi

# Step 2: Add all changes
echo "📝 Adding all changes to Git..."
git add .

# Step 3: Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy: Updated TechAcademy with Google design, chatbot, and assessment features"

# Step 4: Push to remote repository
echo "📤 Pushing to remote repository..."
git push origin main

# Step 5: Deploy on EC2
echo "🔧 Deploying on EC2..."
ssh -i $KEY_PATH $EC2_USER@$EC2_IP << 'EOF'
echo "=== PULLING LATEST CHANGES ==="
cd /home/ubuntu/techacademy
git pull origin main

echo "=== INSTALLING DEPENDENCIES ==="
npm install

echo "=== BUILDING APPLICATION ==="
npm run build

echo "=== STOPPING OLD APP ==="
sudo pkill -f serve || echo "No serve processes to stop"

echo "=== STARTING NEW APP ==="
nohup serve -s build -l 3000 > app.log 2>&1 &

echo "=== WAITING FOR APP TO START ==="
sleep 3

echo "=== CHECKING STATUS ==="
ps aux | grep serve | grep -v grep
sudo netstat -tlnp | grep :3000

echo "=== APP LOGS ==="
tail -5 app.log 2>/dev/null || echo "No logs found"
EOF

echo ""
echo "✅ DEPLOYMENT COMPLETE!"
echo "======================="
echo ""
echo "🌐 Your app is available at: http://$EC2_IP:3000"
echo ""
echo "📋 What was deployed:"
echo "   ✅ Google-inspired design"
echo "   ✅ Chatbot functionality"
echo "   ✅ Assessment system (3 rounds)"
echo "   ✅ Resume parsing"
echo "   ✅ Analytics dashboard"
echo "   ✅ Authentication system"
echo ""
echo "🔍 To check status:"
echo "ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'ps aux | grep serve'"
echo ""
echo "📊 To view logs:"
echo "ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'tail -f /home/ubuntu/techacademy/app.log'"
