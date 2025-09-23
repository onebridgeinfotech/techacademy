#!/bin/bash

# One-liner Fix for 404 Error
# This is the simplest possible fix

echo "🚨 ONE-LINER FIX FOR 404 ERROR"
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

# One-liner fix
echo "🔧 Running one-liner fix..."
ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'cd /home/ubuntu/techacademy && sudo pkill -f serve && sudo npm install -g serve && sudo chown -R ubuntu:ubuntu . && nohup serve -s build -l 3000 > app.log 2>&1 & && sleep 3 && ps aux | grep serve | grep -v grep'

echo ""
echo "✅ ONE-LINER FIX COMPLETE!"
echo "=========================="
echo ""
echo "🌐 Your app should now be available at: http://$EC2_IP:3000"
echo ""
echo "🔍 If still getting 404, try:"
echo "ssh -i $KEY_PATH $EC2_USER@$EC2_IP 'ps aux | grep serve'"
