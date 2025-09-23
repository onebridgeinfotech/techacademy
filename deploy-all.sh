#!/bin/bash

# Single Command Deployment - Does Everything Automatically
# This script builds, uploads, and restarts your app with one command

echo "🚀 SINGLE COMMAND DEPLOYMENT"
echo "============================"
echo ""

# Configuration
EC2_IP="65.0.95.121"
EC2_USER="ubuntu"
KEY_PATH="~/.ssh/your-key.pem"

echo "📋 Configuration:"
echo "   EC2 IP: $EC2_IP"
echo "   User: $EC2_USER"
echo ""

# Step 1: Build locally
echo "📦 Building application locally..."
npm run build

# Step 2: Upload to EC2
echo "📤 Uploading to EC2..."
scp -r build/ $EC2_USER@$EC2_IP:/home/ubuntu/techacademy/

# Step 3: Restart app on EC2
echo "🔧 Restarting app on EC2..."
ssh -i $KEY_PATH $EC2_USER@$EC2_IP << 'EOF'
cd /home/ubuntu/techacademy
sudo pkill -f serve
nohup serve -s build -l 3000 > app.log 2>&1 &
sleep 3
ps aux | grep serve | grep -v grep
EOF

echo ""
echo "✅ DEPLOYMENT COMPLETE!"
echo "======================="
echo ""
echo "🌐 Your app is now available at: http://$EC2_IP:3000"
echo ""
echo "📋 What was deployed:"
echo "   ✅ Latest code changes"
echo "   ✅ Google-inspired design"
echo "   ✅ Chatbot functionality"
echo "   ✅ Assessment system"
echo "   ✅ All features updated"
echo ""
echo "🔍 To check status:"
echo "ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'ps aux | grep serve'"
