#!/bin/bash

# TechAcademy App Fix Script
# This script will fix common app issues

echo "🔧 TechAcademy App Fix Tool"
echo "=========================="
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

# Step 1: Upload build files
echo "📤 Step 1: Uploading build files to EC2..."
if [ -d "build" ]; then
    echo "✅ Build folder found locally"
    scp -r build/ $EC2_USER@$EC2_IP:/home/ubuntu/techacademy/
    echo "✅ Build files uploaded"
else
    echo "❌ Build folder not found. Please run 'npm run build' first."
    exit 1
fi

echo ""

# Step 2: Fix on EC2
echo "🔧 Step 2: Fixing app on EC2..."
ssh -i $KEY_PATH $EC2_USER@$EC2_IP << 'EOF'
echo "=== STOPPING EXISTING PROCESSES ==="
sudo pkill -f serve || echo "No serve processes to stop"
sudo pkill -f nginx || echo "No nginx processes to stop"

echo "=== INSTALLING SERVE ==="
sudo npm install -g serve

echo "=== FIXING PERMISSIONS ==="
sudo chown -R ubuntu:ubuntu /home/ubuntu/techacademy/
chmod +x /home/ubuntu/techacademy/build/static/js/* 2>/dev/null || echo "No JS files to fix"

echo "=== STARTING APPLICATION ==="
cd /home/ubuntu/techacademy
nohup serve -s build -l 80 > app.log 2>&1 &

echo "=== WAITING FOR APP TO START ==="
sleep 5

echo "=== CHECKING STATUS ==="
echo "Process status:"
ps aux | grep serve | grep -v grep

echo "Port status:"
sudo netstat -tlnp | grep :80

echo "Testing local connection:"
curl -I http://localhost 2>/dev/null || echo "Local connection failed"

echo "=== APP LOGS ==="
echo "Last 10 lines of app logs:"
tail -10 app.log 2>/dev/null || echo "No logs found"
EOF

echo ""
echo "✅ FIX COMPLETE!"
echo "================="
echo ""
echo "🌐 Your app should now be available at: http://$EC2_IP"
echo ""
echo "🔍 If still not working, check:"
echo "1. AWS Security Groups - port 80 must be open"
echo "2. EC2 instance is running"
echo "3. Correct IP address"
echo ""
echo "📊 To check app status:"
echo "ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'ps aux | grep serve'"
echo ""
echo "📋 To view logs:"
echo "ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'tail -f /home/ubuntu/techacademy/app.log'"
