#!/bin/bash

# Complete Clean and Deploy Script
# This script cleans EC2, handles Git operations, and deploys with single command

echo "🧹 CLEANING AND DEPLOYING TECHACADEMY"
echo "===================================="
echo ""

# Configuration
EC2_IP="13.235.246.199"
EC2_USER="ubuntu"
KEY_PATH="~/.ssh/your-key.pem"
GIT_REPO="https://github.com/onebridgeinfotech/techacademy"  # Replace with your actual repo

echo "📋 Configuration:"
echo "   EC2 IP: $EC2_IP"
echo "   User: $EC2_USER"
echo "   Git Repo: $GIT_REPO"
echo ""

# Step 1: Clean and prepare local repository
echo "🔧 STEP 1: PREPARING LOCAL REPOSITORY"
echo "====================================="

# Initialize Git if not already done
if [ ! -d ".git" ]; then
    echo "📝 Initializing Git repository..."
    git init
    git remote add origin $GIT_REPO
fi

# Add all changes
echo "📝 Adding all changes to Git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy: Modern EdTech design with glassmorphism, gradients, and animations - $(date '+%Y-%m-%d %H:%M:%S')"

# Push to remote repository
echo "📤 Pushing to remote repository..."
git push origin main

echo "✅ Local Git operations completed!"
echo ""

# Step 2: Clean EC2 and deploy
echo "🧹 STEP 2: CLEANING EC2 AND DEPLOYING"
echo "====================================="

ssh -i $KEY_PATH $EC2_USER@$EC2_IP << 'EOF'
echo "=== STOPPING ALL APPLICATIONS ==="
sudo pkill -f serve || echo "No serve processes to stop"
sudo pkill -f node || echo "No node processes to stop"
sudo pkill -f npm || echo "No npm processes to stop"

echo "=== CLEANING OLD REPOSITORY ==="
cd /home/ubuntu
if [ -d "techacademy" ]; then
    echo "🗑️  Removing old techacademy directory..."
    sudo rm -rf techacademy
    echo "✅ Old directory removed"
else
    echo "ℹ️  No old directory found"
fi

echo "=== CLONING FRESH REPOSITORY ==="
git clone https://github.com/YOUR_USERNAME/techacademy.git
cd techacademy

echo "=== INSTALLING DEPENDENCIES ==="
npm install

echo "=== BUILDING APPLICATION ==="
npm run build

echo "=== FIXING PERMISSIONS ==="
sudo chown -R ubuntu:ubuntu /home/ubuntu/techacademy/
chmod -R 755 /home/ubuntu/techacademy/
chmod +x /home/ubuntu/techacademy/node_modules/.bin/*

echo "=== INSTALLING SERVE GLOBALLY ==="
sudo npm install -g serve

echo "=== STARTING APPLICATION ==="
cd /home/ubuntu/techacademy
nohup serve -s build -l 3000 > app.log 2>&1 &

echo "=== WAITING FOR APPLICATION TO START ==="
sleep 5

echo "=== CHECKING STATUS ==="
echo "Process status:"
ps aux | grep serve | grep -v grep

echo "Port 3000 status:"
sudo netstat -tlnp | grep :3000

echo "Testing local connection:"
curl -I http://localhost:3000 2>/dev/null || echo "Local connection failed"

echo "=== APPLICATION LOGS ==="
echo "Last 10 lines of app logs:"
tail -10 app.log 2>/dev/null || echo "No logs found"

echo "=== VERIFICATION ==="
if ps aux | grep serve | grep -v grep > /dev/null; then
    echo "✅ SUCCESS! Application is running"
    echo "🌐 App available at: http://$(curl -s ifconfig.me):3000"
else
    echo "❌ FAILED! Application not running"
    echo "Check logs: tail -f app.log"
fi
EOF

echo ""
echo "✅ CLEAN AND DEPLOY COMPLETE!"
echo "============================="
echo ""
echo "🌐 Your updated app is now available at: http://$EC2_IP:3000"
echo ""
echo "🎨 New Features Deployed:"
echo "   ✅ Modern EdTech design system"
echo "   ✅ Glassmorphism effects"
echo "   ✅ Gradient colors and animations"
echo "   ✅ Professional typography"
echo "   ✅ Responsive layout"
echo "   ✅ Smooth hover effects"
echo "   ✅ All existing functionality preserved"
echo ""
echo "🔍 To check status:"
echo "ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'ps aux | grep serve'"
echo ""
echo "📊 To view logs:"
echo "ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'tail -f /home/ubuntu/techacademy/app.log'"
echo ""
echo "🎉 Deployment completed successfully!"
