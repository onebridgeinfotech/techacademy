#!/bin/bash

# Setup Git on EC2 for TechAcademy
# This script sets up Git repository on EC2

echo "🔧 Setting up Git on EC2 for TechAcademy"
echo "========================================="
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

# Setup Git on EC2
echo "🔧 Setting up Git on EC2..."
ssh -i $KEY_PATH $EC2_USER@$EC2_IP << 'EOF'
echo "=== INSTALLING GIT ==="
sudo apt update
sudo apt install -y git

echo "=== INSTALLING NODE.JS ==="
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "=== INSTALLING SERVE ==="
sudo npm install -g serve

echo "=== CLONING REPOSITORY ==="
cd /home/ubuntu
git clone https://github.com/YOUR_USERNAME/techacademy.git
cd techacademy

echo "=== INSTALLING DEPENDENCIES ==="
npm install

echo "=== BUILDING APPLICATION ==="
npm run build

echo "=== STARTING APPLICATION ==="
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
echo "✅ EC2 SETUP COMPLETE!"
echo "======================"
echo ""
echo "🌐 Your app is available at: http://$EC2_IP:3000"
echo ""
echo "📋 Next steps:"
echo "1. Update the Git repository URL in the scripts"
echo "2. Push your changes using: ./git-deploy.sh"
echo "3. Access your app at: http://$EC2_IP:3000"
echo ""
echo "🔍 To check status:"
echo "ssh -i $EC2_USER@$EC2_IP 'ps aux | grep serve'"
