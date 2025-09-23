#!/bin/bash

# Immediate Fix for 404 Error
# This script will fix the 404 error right now

echo "🚨 IMMEDIATE FIX FOR 404 ERROR"
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

# Immediate fix on EC2
echo "🔧 IMMEDIATE FIX ON EC2..."
ssh -i $KEY_PATH $EC2_USER@$EC2_IP << 'EOF'
echo "=== STEP 1: STOP EVERYTHING ==="
sudo pkill -f serve
sudo pkill -f node
sudo pkill -f npm
echo "✅ All processes stopped"

echo "=== STEP 2: CHECK BUILD DIRECTORY ==="
cd /home/ubuntu/techacademy
if [ -d "build" ]; then
    echo "✅ Build directory exists"
    ls -la build/ | head -5
else
    echo "❌ Build directory missing - need to build"
    echo "Building application..."
    npm install
    npm run build
    echo "✅ Build completed"
fi

echo "=== STEP 3: INSTALL SERVE ==="
sudo npm install -g serve
echo "✅ Serve installed"

echo "=== STEP 4: FIX PERMISSIONS ==="
sudo chown -R ubuntu:ubuntu /home/ubuntu/techacademy/
chmod -R 755 /home/ubuntu/techacademy/
echo "✅ Permissions fixed"

echo "=== STEP 5: START APPLICATION ==="
cd /home/ubuntu/techacademy
nohup serve -s build -l 3000 > app.log 2>&1 &
echo "✅ Application started"

echo "=== STEP 6: WAIT FOR STARTUP ==="
sleep 5

echo "=== STEP 7: VERIFY STATUS ==="
echo "Process status:"
ps aux | grep serve | grep -v grep

echo "Port 3000 status:"
sudo netstat -tlnp | grep :3000

echo "Testing local connection:"
curl -I http://localhost:3000 2>/dev/null || echo "❌ Local connection failed"

echo "=== STEP 8: APP LOGS ==="
echo "Last 10 lines of logs:"
tail -10 app.log 2>/dev/null || echo "No logs found"

echo "=== STEP 9: FINAL CHECK ==="
if ps aux | grep serve | grep -v grep > /dev/null; then
    echo "✅ SUCCESS! Application is running"
    echo "🌐 App should be available at: http://$(curl -s ifconfig.me):3000"
else
    echo "❌ FAILED! Application not running"
    echo "Check logs: tail -f app.log"
fi
EOF

echo ""
echo "✅ IMMEDIATE FIX COMPLETE!"
echo "=========================="
echo ""
echo "🌐 Your app should now be available at: http://$EC2_IP:3000"
echo ""
echo "🔍 If still getting 404, check:"
echo "1. AWS Security Group allows port 3000"
echo "2. EC2 instance is running"
echo "3. App is running: ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'ps aux | grep serve'"
echo "4. Port is listening: ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'sudo netstat -tlnp | grep :3000'"
echo ""
echo "📊 To check status:"
echo "ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'ps aux | grep serve'"
