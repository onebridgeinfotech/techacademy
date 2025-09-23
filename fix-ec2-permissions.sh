#!/bin/bash

# Fix EC2 Permission Issues for TechAcademy
# This script fixes permission problems on EC2

echo "🔧 Fixing EC2 Permission Issues"
echo "==============================="
echo ""

# Configuration
EC2_IP="65.0.95.121"
EC2_USER="ubuntu"
KEY_PATH="~/.ssh/your-key.pem"

echo "📋 Configuration:"
echo "   EC2 IP: $EC2_IP"
echo "   User: $EC2_USER"
echo ""

# Fix permissions on EC2
echo "🔧 Fixing permissions on EC2..."
ssh -i $KEY_PATH $EC2_USER@$EC2_IP << 'EOF'
echo "=== FIXING PERMISSIONS ==="
cd /home/ubuntu/techacademy

echo "Fixing ownership..."
sudo chown -R ubuntu:ubuntu /home/ubuntu/techacademy/

echo "Fixing node_modules permissions..."
sudo chown -R ubuntu:ubuntu node_modules/
chmod +x node_modules/.bin/*

echo "Fixing package-lock.json..."
sudo chown ubuntu:ubuntu package-lock.json

echo "=== CLEANING AND REINSTALLING ==="
echo "Removing node_modules and package-lock.json..."
rm -rf node_modules package-lock.json

echo "Installing dependencies..."
npm install

echo "=== BUILDING APPLICATION ==="
echo "Building with proper permissions..."
npm run build

echo "=== STARTING APPLICATION ==="
echo "Stopping any existing serve processes..."
sudo pkill -f serve || echo "No serve processes to stop"

echo "Starting application..."
nohup serve -s build -l 3000 > app.log 2>&1 &

echo "=== WAITING FOR APP TO START ==="
sleep 3

echo "=== CHECKING STATUS ==="
echo "Process status:"
ps aux | grep serve | grep -v grep

echo "Port 3000 status:"
sudo netstat -tlnp | grep :3000

echo "Testing local connection:"
curl -I http://localhost:3000 2>/dev/null || echo "Local connection failed"

echo "=== APP LOGS ==="
echo "Last 5 lines of app logs:"
tail -5 app.log 2>/dev/null || echo "No logs found"
EOF

echo ""
echo "✅ PERMISSION FIX COMPLETE!"
echo "============================"
echo ""
echo "🌐 Your app should now be available at: http://$EC2_IP:3000"
echo ""
echo "🔍 If still having issues, try these commands on EC2:"
echo "ssh -i $KEY_PATH $EC2_USER@$EC2_IP"
echo "cd /home/ubuntu/techacademy"
echo "sudo chown -R ubuntu:ubuntu ."
echo "chmod +x node_modules/.bin/*"
echo "npm run build"
echo ""
echo "📊 To check status:"
echo "ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'ps aux | grep serve'"
