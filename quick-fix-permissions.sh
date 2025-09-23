#!/bin/bash

# Quick Fix for Permission Issues
# Simple commands to fix the permission problem

echo "🔧 Quick Fix for Permission Issues"
echo "=================================="
echo ""

# Configuration
EC2_IP="65.0.95.121"
EC2_USER="ubuntu"
KEY_PATH="~/.ssh/your-key.pem"

echo "📋 Configuration:"
echo "   EC2 IP: $EC2_IP"
echo "   User: $EC2_USER"
echo ""

# Quick fix on EC2
echo "🔧 Quick fix on EC2..."
ssh -i $KEY_PATH $EC2_USER@$EC2_IP << 'EOF'
echo "=== FIXING PERMISSIONS ==="
cd /home/ubuntu/techacademy

# Fix ownership
sudo chown -R ubuntu:ubuntu .

# Fix node_modules permissions
chmod +x node_modules/.bin/*

# Clean and reinstall
rm -rf node_modules package-lock.json
npm install

# Build
npm run build

# Start app
sudo pkill -f serve
nohup serve -s build -l 3000 > app.log 2>&1 &

# Check status
sleep 2
ps aux | grep serve
echo "App should be running on port 3000"
EOF

echo ""
echo "✅ QUICK FIX COMPLETE!"
echo "======================"
echo ""
echo "🌐 Your app should now be available at: http://$EC2_IP:3000"
echo ""
echo "🔍 If it's still not working, try these manual commands on EC2:"
echo "ssh -i $KEY_PATH $EC2_USER@$EC2_IP"
echo "cd /home/ubuntu/techacademy"
echo "sudo chown -R ubuntu:ubuntu ."
echo "chmod +x node_modules/.bin/*"
echo "npm run build"
echo "nohup serve -s build -l 3000 > app.log 2>&1 &"
