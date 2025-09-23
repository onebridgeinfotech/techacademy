#!/bin/bash

# Complete Fix for Permission Denied Issues
# This script fixes all permission problems on EC2

echo "🔧 Complete Fix for Permission Denied Issues"
echo "============================================"
echo ""

# Configuration
EC2_IP="65.0.95.121"
EC2_USER="ubuntu"
KEY_PATH="~/.ssh/your-key.pem"

echo "📋 Configuration:"
echo "   EC2 IP: $EC2_IP"
echo "   User: $EC2_USER"
echo ""

# Complete fix on EC2
echo "🔧 Running complete fix on EC2..."
ssh -i $KEY_PATH $EC2_USER@$EC2_IP << 'EOF'
echo "=== STEP 1: FIXING OWNERSHIP ==="
cd /home/ubuntu/techacademy
sudo chown -R ubuntu:ubuntu /home/ubuntu/techacademy/
echo "✅ Ownership fixed"

echo "=== STEP 2: FIXING NODE_MODULES PERMISSIONS ==="
if [ -d "node_modules" ]; then
    sudo chown -R ubuntu:ubuntu node_modules/
    chmod -R 755 node_modules/
    chmod +x node_modules/.bin/*
    echo "✅ Node modules permissions fixed"
else
    echo "⚠️  Node modules not found"
fi

echo "=== STEP 3: CLEANING AND REINSTALLING ==="
echo "Removing corrupted files..."
rm -rf node_modules package-lock.json
echo "✅ Cleaned corrupted files"

echo "Installing dependencies with proper permissions..."
npm install
echo "✅ Dependencies installed"

echo "=== STEP 4: FIXING REACT-SCRIPTS PERMISSIONS ==="
if [ -f "node_modules/.bin/react-scripts" ]; then
    chmod +x node_modules/.bin/react-scripts
    echo "✅ React-scripts permissions fixed"
else
    echo "⚠️  React-scripts not found"
fi

echo "=== STEP 5: BUILDING APPLICATION ==="
echo "Building with proper permissions..."
npm run build
echo "✅ Build completed"

echo "=== STEP 6: STARTING APPLICATION ==="
echo "Stopping any existing processes..."
sudo pkill -f serve || echo "No serve processes to stop"

echo "Starting application..."
nohup serve -s build -l 3000 > app.log 2>&1 &

echo "=== STEP 7: WAITING FOR APP TO START ==="
sleep 5

echo "=== STEP 8: CHECKING STATUS ==="
echo "Process status:"
ps aux | grep serve | grep -v grep

echo "Port 3000 status:"
sudo netstat -tlnp | grep :3000

echo "Testing local connection:"
curl -I http://localhost:3000 2>/dev/null || echo "Local connection failed"

echo "=== STEP 9: APP LOGS ==="
echo "Last 10 lines of app logs:"
tail -10 app.log 2>/dev/null || echo "No logs found"

echo "=== STEP 10: VERIFICATION ==="
if ps aux | grep serve | grep -v grep > /dev/null; then
    echo "✅ Application is running successfully!"
else
    echo "❌ Application failed to start"
    echo "Check logs: tail -f app.log"
fi
EOF

echo ""
echo "✅ COMPLETE FIX APPLIED!"
echo "========================"
echo ""
echo "🌐 Your app should now be available at: http://$EC2_IP:3000"
echo ""
echo "🔍 If still having issues, check these:"
echo "1. AWS Security Group allows port 3000"
echo "2. EC2 instance is running"
echo "3. Check logs: ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'tail -f /home/ubuntu/techacademy/app.log'"
echo ""
echo "📊 To check status:"
echo "ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'ps aux | grep serve'"
