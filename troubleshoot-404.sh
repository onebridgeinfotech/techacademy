#!/bin/bash

# Complete Troubleshooting for 404 Error
# This script will diagnose and fix the 404 issue

echo "🔍 Complete Troubleshooting for 404 Error"
echo "=========================================="
echo ""

# Configuration
EC2_IP="65.0.95.121"
EC2_USER="ubuntu"
KEY_PATH="~/.ssh/your-key.pem"

echo "📋 Configuration:"
echo "   EC2 IP: $EC2_IP"
echo "   User: $EC2_USER"
echo ""

# Run comprehensive diagnostics
echo "🔍 Running comprehensive diagnostics..."
ssh -i $KEY_PATH $EC2_USER@$EC2_IP << 'EOF'
echo "=== DIAGNOSTIC REPORT ==="
echo "Date: $(date)"
echo ""

echo "=== 1. SYSTEM STATUS ==="
echo "Uptime: $(uptime)"
echo "Disk space:"
df -h
echo ""

echo "=== 2. NETWORK STATUS ==="
echo "Port 3000 status:"
sudo netstat -tlnp | grep :3000 || echo "❌ Port 3000 not listening"
echo ""

echo "=== 3. PROCESS STATUS ==="
echo "Serve processes:"
ps aux | grep serve | grep -v grep || echo "❌ No serve processes running"
echo ""

echo "=== 4. APPLICATION STATUS ==="
echo "App directory:"
ls -la /home/ubuntu/techacademy/ || echo "❌ App directory not found"
echo ""

echo "Build directory:"
ls -la /home/ubuntu/techacademy/build/ || echo "❌ Build directory not found"
echo ""

echo "=== 5. TESTING LOCAL CONNECTION ==="
echo "Testing localhost:3000:"
curl -I http://localhost:3000 2>/dev/null || echo "❌ Local connection failed"
echo ""

echo "=== 6. APP LOGS ==="
echo "Last 20 lines of app logs:"
tail -20 /home/ubuntu/techacademy/app.log 2>/dev/null || echo "❌ No logs found"
echo ""

echo "=== 7. NODE.JS STATUS ==="
echo "Node.js version:"
node --version || echo "❌ Node.js not installed"
echo ""

echo "NPM version:"
npm --version || echo "❌ NPM not installed"
echo ""

echo "=== 8. SERVE STATUS ==="
echo "Serve version:"
serve --version || echo "❌ Serve not installed"
echo ""

echo "=== 9. PERMISSIONS ==="
echo "App directory permissions:"
ls -la /home/ubuntu/techacademy/ | head -5
echo ""

echo "Build directory permissions:"
ls -la /home/ubuntu/techacademy/build/ | head -5
echo ""

echo "=== 10. SECURITY GROUPS CHECK ==="
echo "Please verify in AWS Console that Security Group allows:"
echo "- Port 3000 (HTTP) from 0.0.0.0/0"
echo "- Port 22 (SSH) from your IP"
echo ""

echo "=== DIAGNOSTIC COMPLETE ==="
EOF

echo ""
echo "🔧 FIXING ISSUES..."
echo "==================="

# Fix issues on EC2
ssh -i $KEY_PATH $EC2_USER@$EC2_IP << 'EOF'
echo "=== FIXING ISSUES ==="

echo "1. Stopping all processes..."
sudo pkill -f serve || echo "No serve processes to stop"

echo "2. Installing serve globally..."
sudo npm install -g serve

echo "3. Fixing permissions..."
sudo chown -R ubuntu:ubuntu /home/ubuntu/techacademy/
chmod -R 755 /home/ubuntu/techacademy/

echo "4. Starting application..."
cd /home/ubuntu/techacademy
nohup serve -s build -l 3000 > app.log 2>&1 &

echo "5. Waiting for app to start..."
sleep 5

echo "6. Checking status..."
ps aux | grep serve | grep -v grep
sudo netstat -tlnp | grep :3000

echo "7. Testing local connection..."
curl -I http://localhost:3000 2>/dev/null || echo "Local connection failed"

echo "8. App logs..."
tail -10 app.log 2>/dev/null || echo "No logs found"
EOF

echo ""
echo "✅ TROUBLESHOOTING COMPLETE!"
echo "============================"
echo ""
echo "🌐 Your app should now be available at: http://$EC2_IP:3000"
echo ""
echo "🔍 If still not working, check:"
echo "1. AWS Security Group allows port 3000"
echo "2. EC2 instance is running"
echo "3. App is running: ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'ps aux | grep serve'"
echo "4. Port is listening: ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'sudo netstat -tlnp | grep :3000'"
echo "5. Check logs: ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'tail -f /home/ubuntu/techacademy/app.log'"
echo ""
echo "📊 To check status:"
echo "ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'ps aux | grep serve'"
