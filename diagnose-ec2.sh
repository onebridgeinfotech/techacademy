#!/bin/bash

# TechAcademy EC2 Diagnostic Script
# This script will help diagnose why your app is not working

echo "🔍 TechAcademy EC2 Diagnostic Tool"
echo "=================================="
echo ""

# Configuration - UPDATE THESE VALUES
EC2_IP="YOUR_EC2_PUBLIC_IP"  # Replace with your actual EC2 public IP
EC2_USER="ubuntu"
KEY_PATH="~/.ssh/your-key.pem"  # Replace with your actual key path

echo "📋 Configuration:"
echo "   EC2 IP: $EC2_IP"
echo "   User: $EC2_USER"
echo "   Key: $KEY_PATH"
echo ""

# Check if we can connect to EC2
echo "🔌 Testing EC2 connection..."
if ssh -i $KEY_PATH -o ConnectTimeout=10 $EC2_USER@$EC2_IP "echo 'Connection successful'" 2>/dev/null; then
    echo "✅ EC2 connection successful"
else
    echo "❌ Cannot connect to EC2"
    echo "   Please check:"
    echo "   - EC2 instance is running"
    echo "   - Security group allows SSH (port 22)"
    echo "   - Correct IP address and key path"
    exit 1
fi

echo ""
echo "🔍 Running comprehensive diagnostics on EC2..."
echo ""

# Run diagnostics on EC2
ssh -i $KEY_PATH $EC2_USER@$EC2_IP << 'EOF'
echo "=== SYSTEM STATUS ==="
echo "Uptime: $(uptime)"
echo "Disk space:"
df -h
echo ""

echo "=== NETWORK STATUS ==="
echo "Port 80 status:"
sudo netstat -tlnp | grep :80 || echo "Port 80 not listening"
echo ""

echo "=== PROCESS STATUS ==="
echo "Serve processes:"
ps aux | grep serve | grep -v grep || echo "No serve processes running"
echo ""

echo "=== APPLICATION STATUS ==="
echo "Checking if app directory exists:"
ls -la /home/ubuntu/techacademy/ 2>/dev/null || echo "App directory not found"
echo ""

echo "Checking if build directory exists:"
ls -la /home/ubuntu/techacademy/build/ 2>/dev/null || echo "Build directory not found"
echo ""

echo "=== LOGS ==="
echo "Application logs (last 20 lines):"
tail -20 /home/ubuntu/techacademy/app.log 2>/dev/null || echo "No app logs found"
echo ""

echo "=== TESTING LOCAL CONNECTION ==="
echo "Testing localhost:80:"
curl -I http://localhost 2>/dev/null || echo "Local connection failed"
echo ""

echo "=== SECURITY GROUPS CHECK ==="
echo "Please verify in AWS Console that Security Group allows:"
echo "- Port 80 (HTTP) from 0.0.0.0/0"
echo "- Port 22 (SSH) from your IP"
echo ""

echo "=== QUICK FIXES ==="
echo "If app is not running, try these commands:"
echo "1. cd /home/ubuntu/techacademy"
echo "2. sudo npm install -g serve"
echo "3. nohup serve -s build -l 80 > app.log 2>&1 &"
echo "4. ps aux | grep serve"
EOF

echo ""
echo "🎯 DIAGNOSTIC COMPLETE"
echo "====================="
echo ""
echo "If the app is still not working, try these solutions:"
echo ""
echo "1. 🔧 QUICK FIX - Restart the app:"
echo "   ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'cd /home/ubuntu/techacademy && sudo pkill -f serve && nohup serve -s build -l 80 > app.log 2>&1 &'"
echo ""
echo "2. 📤 RE-UPLOAD BUILD:"
echo "   scp -r build/ $EC2_USER@$EC2_IP:/home/ubuntu/techacademy/"
echo ""
echo "3. 🌐 CHECK SECURITY GROUPS:"
echo "   - Go to AWS Console → EC2 → Security Groups"
echo "   - Ensure port 80 is open for 0.0.0.0/0"
echo ""
echo "4. 🔍 MANUAL DEPLOYMENT:"
echo "   ssh -i $KEY_PATH $EC2_USER@$EC2_IP"
echo "   cd /home/ubuntu/techacademy"
echo "   sudo npm install -g serve"
echo "   nohup serve -s build -l 80 > app.log 2>&1 &"
echo "   ps aux | grep serve"
echo ""
echo "Your app should be available at: http://$EC2_IP"
