#!/bin/bash

# Quick Restart for TechAcademy
# Simple script to restart the app

echo "🔄 Quick Restart for TechAcademy"
echo "================================"
echo ""

# Configuration
EC2_IP="65.0.95.121"
EC2_USER="ubuntu"
KEY_PATH="~/.ssh/your-key.pem"

echo "📋 Configuration:"
echo "   EC2 IP: $EC2_IP"
echo "   User: $EC2_USER"
echo ""

# Quick restart on EC2
echo "🔧 Quick restart on EC2..."
ssh -i $KEY_PATH $EC2_USER@$EC2_IP << 'EOF'
echo "=== STOPPING OLD APP ==="
sudo pkill -f serve || echo "No serve processes to stop"

echo "=== STARTING APP ==="
cd /home/ubuntu/techacademy
nohup serve -s build -l 3000 > app.log 2>&1 &

echo "=== WAITING FOR APP TO START ==="
sleep 3

echo "=== CHECKING STATUS ==="
ps aux | grep serve | grep -v grep
sudo netstat -tlnp | grep :3000

echo "=== TESTING LOCAL CONNECTION ==="
curl -I http://localhost:3000 2>/dev/null || echo "Local connection failed"

echo "=== APP LOGS ==="
tail -5 app.log 2>/dev/null || echo "No logs found"
EOF

echo ""
echo "✅ QUICK RESTART COMPLETE!"
echo "=========================="
echo ""
echo "🌐 Your app should now be available at: http://$EC2_IP:3000"
echo ""
echo "🔍 If still getting 404, try:"
echo "ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'ps aux | grep serve'"
