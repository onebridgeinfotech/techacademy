#!/bin/bash

# TechAcademy Port 3000 Deployment Script
# This script deploys the app on port 3000 (much easier than port 80)

echo "🚀 Deploying TechAcademy on Port 3000..."
echo "======================================="
echo ""

# Configuration - UPDATE THESE VALUES
EC2_IP="YOUR_EC2_PUBLIC_IP"  # Replace with your actual EC2 public IP
EC2_USER="ubuntu"
KEY_PATH="~/.ssh/your-key.pem"  # Replace with your actual key path

echo "📋 Configuration:"
echo "   EC2 IP: $EC2_IP"
echo "   User: $EC2_USER"
echo "   Key: $KEY_PATH"
echo "   Port: 3000"
echo ""

# Check if build folder exists
if [ ! -d "build" ]; then
    echo "❌ Build folder not found. Please run 'npm run build' first."
    exit 1
fi

echo "✅ Build folder found"

# Upload build to EC2
echo "📤 Uploading build to EC2..."
scp -r build/ $EC2_USER@$EC2_IP:/home/ubuntu/techacademy/

# Deploy on EC2
echo "🔧 Deploying on EC2..."
ssh -i $KEY_PATH $EC2_USER@$EC2_IP << 'EOF'
echo "=== STOPPING EXISTING PROCESSES ==="
sudo pkill -f serve || echo "No serve processes to stop"

echo "=== INSTALLING SERVE ==="
sudo npm install -g serve

echo "=== FIXING PERMISSIONS ==="
sudo chown -R ubuntu:ubuntu /home/ubuntu/techacademy/

echo "=== STARTING APP ON PORT 3000 ==="
cd /home/ubuntu/techacademy
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
echo "✅ DEPLOYMENT COMPLETE!"
echo "======================="
echo ""
echo "🌐 Your app is now available at: http://$EC2_IP:3000"
echo ""
echo "📋 Important Notes:"
echo "1. Make sure AWS Security Group allows port 3000"
echo "2. Access your app at: http://$EC2_IP:3000"
echo "3. Port 3000 is much easier than port 80!"
echo ""
echo "🔧 To check app status:"
echo "ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'ps aux | grep serve'"
echo ""
echo "📊 To view logs:"
echo "ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'tail -f /home/ubuntu/techacademy/app.log'"
