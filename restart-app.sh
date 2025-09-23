#!/bin/bash

# Restart TechAcademy Application on EC2
# This script restarts the app after EC2 restart

echo "🔄 Restarting TechAcademy Application"
echo "===================================="
echo ""

# Configuration
EC2_IP="65.0.95.121"
EC2_USER="ubuntu"
KEY_PATH="~/.ssh/your-key.pem"

echo "📋 Configuration:"
echo "   EC2 IP: $EC2_IP"
echo "   User: $EC2_USER"
echo ""

# Restart app on EC2
echo "🔧 Restarting app on EC2..."
ssh -i $KEY_PATH $EC2_USER@$EC2_IP << 'EOF'
echo "=== CHECKING CURRENT STATUS ==="
echo "Checking if app is running..."
ps aux | grep serve | grep -v grep || echo "No serve processes running"

echo "Checking port 3000..."
sudo netstat -tlnp | grep :3000 || echo "Port 3000 not listening"

echo "=== STOPPING EXISTING PROCESSES ==="
sudo pkill -f serve || echo "No serve processes to stop"

echo "=== CHECKING APP DIRECTORY ==="
cd /home/ubuntu/techacademy
ls -la

echo "=== CHECKING BUILD DIRECTORY ==="
if [ -d "build" ]; then
    echo "✅ Build directory exists"
    ls -la build/
else
    echo "❌ Build directory not found"
    echo "Need to build the application first"
    exit 1
fi

echo "=== INSTALLING SERVE ==="
sudo npm install -g serve

echo "=== STARTING APPLICATION ==="
echo "Starting app on port 3000..."
nohup serve -s build -l 3000 > app.log 2>&1 &

echo "=== WAITING FOR APP TO START ==="
sleep 5

echo "=== CHECKING STATUS ==="
echo "Process status:"
ps aux | grep serve | grep -v grep

echo "Port 3000 status:"
sudo netstat -tlnp | grep :3000

echo "Testing local connection:"
curl -I http://localhost:3000 2>/dev/null || echo "Local connection failed"

echo "=== APP LOGS ==="
echo "Last 10 lines of app logs:"
tail -10 app.log 2>/dev/null || echo "No logs found"

echo "=== VERIFICATION ==="
if ps aux | grep serve | grep -v grep > /dev/null; then
    echo "✅ Application is running successfully!"
    echo "🌐 App should be available at: http://$(curl -s ifconfig.me):3000"
else
    echo "❌ Application failed to start"
    echo "Check logs: tail -f app.log"
fi
EOF

echo ""
echo "✅ RESTART COMPLETE!"
echo "===================="
echo ""
echo "🌐 Your app should now be available at: http://$EC2_IP:3000"
echo ""
echo "🔍 If still getting 404, check:"
echo "1. AWS Security Group allows port 3000"
echo "2. App is running: ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'ps aux | grep serve'"
echo "3. Port is listening: ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'sudo netstat -tlnp | grep :3000'"
echo "4. Check logs: ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'tail -f /home/ubuntu/techacademy/app.log'"
echo ""
echo "📊 To check status:"
echo "ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'ps aux | grep serve'"
