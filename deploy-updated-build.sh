#!/bin/bash

# Deploy Updated Build with Google Design Changes
# This script uploads the new build with all the latest changes

echo "🚀 Deploying Updated Build with Google Design Changes"
echo "====================================================="
echo ""

# Configuration - UPDATE THESE VALUES
EC2_IP="65.0.95.121"  # Replace with your actual EC2 public IP
EC2_USER="ubuntu"
KEY_PATH="~/.ssh/your-key.pem"  # Replace with your actual key path

echo "📋 Configuration:"
echo "   EC2 IP: $EC2_IP"
echo "   User: $EC2_USER"
echo "   Key: $KEY_PATH"
echo ""

# Check if build folder exists
if [ ! -d "build" ]; then
    echo "❌ Build folder not found. Please run 'npm run build' first."
    exit 1
fi

echo "✅ Updated build folder found with Google design changes"

# Upload new build to EC2
echo "📤 Uploading updated build to EC2..."
scp -r build/ $EC2_USER@$EC2_IP:/home/ubuntu/techacademy/

# Deploy on EC2
echo "🔧 Deploying updated build on EC2..."
ssh -i $KEY_PATH $EC2_USER@$EC2_IP << 'EOF'
echo "=== STOPPING OLD APP ==="
sudo pkill -f serve || echo "No serve processes to stop"

echo "=== INSTALLING SERVE ==="
sudo npm install -g serve

echo "=== FIXING PERMISSIONS ==="
sudo chown -R ubuntu:ubuntu /home/ubuntu/techacademy/

echo "=== STARTING UPDATED APP ON PORT 3000 ==="
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
echo "✅ UPDATED BUILD DEPLOYED!"
echo "=========================="
echo ""
echo "🌐 Your updated app with Google design is now available at: http://$EC2_IP:3000"
echo ""
echo "🎨 New Features Deployed:"
echo "   ✅ Google-inspired design"
echo "   ✅ Clean white background"
echo "   ✅ Professional typography"
echo "   ✅ Modern card designs"
echo "   ✅ Updated colors and styling"
echo "   ✅ Chatbot functionality"
echo "   ✅ Assessment system (3 rounds)"
echo "   ✅ Resume parsing"
echo "   ✅ Communication tests"
echo "   ✅ Coding challenges"
echo "   ✅ Analytics dashboard"
echo ""
echo "📋 Important:"
echo "1. Make sure AWS Security Group allows port 3000"
echo "2. Clear your browser cache (Ctrl+F5 or Cmd+Shift+R)"
echo "3. Access your app at: http://$EC2_IP:3000"
echo ""
echo "🔍 To check app status:"
echo "ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'ps aux | grep serve'"
echo ""
echo "📊 To view logs:"
echo "ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'tail -f /home/ubuntu/techacademy/app.log'"
