#!/bin/bash

# Quick Clean and Deploy Script
# Ultra-simple version for immediate deployment

echo "🚀 QUICK CLEAN AND DEPLOY"
echo "========================"
echo ""

# Configuration
EC2_IP="65.0.95.121"
EC2_USER="ubuntu"
KEY_PATH="~/.ssh/your-key.pem"

echo "📋 Configuration:"
echo "   EC2 IP: $EC2_IP"
echo "   User: $EC2_USER"
echo ""

# Local Git operations
echo "🔧 Local Git operations..."
git add .
git commit -m "Deploy: Modern EdTech design - $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main

# Clean EC2 and deploy
echo "🧹 Cleaning EC2 and deploying..."
ssh -i $KEY_PATH $EC2_USER@$EC2_IP << 'EOF'
sudo pkill -f serve
sudo rm -rf /home/ubuntu/techacademy
git clone https://github.com/YOUR_USERNAME/techacademy.git
cd techacademy
npm install
npm run build
sudo chown -R ubuntu:ubuntu .
chmod +x node_modules/.bin/*
sudo npm install -g serve
nohup serve -s build -l 3000 > app.log 2>&1 &
sleep 3
ps aux | grep serve
EOF

echo ""
echo "✅ DEPLOYED! App available at: http://$EC2_IP:3000"
