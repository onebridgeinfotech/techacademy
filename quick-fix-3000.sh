#!/bin/bash

# Quick Fix for Port 3000
# Simple script to get your app running on port 3000

echo "🔧 Quick Fix - Port 3000"
echo "========================"
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

# Upload build
echo "📤 Uploading build..."
scp -r build/ $EC2_USER@$EC2_IP:/home/ubuntu/techacademy/

# Quick fix on EC2
echo "🔧 Quick fix on EC2..."
ssh -i $KEY_PATH $EC2_USER@$EC2_IP << 'EOF'
# Stop everything
sudo pkill -f serve

# Install serve
sudo npm install -g serve

# Start on port 3000
cd /home/ubuntu/techacademy
nohup serve -s build -l 3000 > app.log 2>&1 &

# Check status
sleep 2
ps aux | grep serve
echo "App should be running on port 3000"
EOF

echo ""
echo "✅ DONE!"
echo "========"
echo ""
echo "🌐 Your app should now be available at: http://$EC2_IP:3000"
echo ""
echo "📋 Don't forget to:"
echo "1. Update AWS Security Group to allow port 3000"
echo "2. Access your app at: http://$EC2_IP:3000"
echo ""
echo "🔍 If it's still not working, check:"
echo "ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'ps aux | grep serve'"
