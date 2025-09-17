#!/bin/bash

# Update EC2 with Admin Dashboard
# This script updates your EC2 instance with the new admin dashboard

set -e

# Configuration
EC2_HOST="13.232.196.147"
EC2_USER="ubuntu"
KEY_PATH="your-key-pair.pem"  # Update this path

echo "🚀 Updating EC2 with Admin Dashboard..."

# Check if key file exists
if [ ! -f "$KEY_PATH" ]; then
    echo "❌ Key file not found: $KEY_PATH"
    echo "Please update the KEY_PATH variable in this script"
    exit 1
fi

# Upload updated build
echo "📤 Uploading updated application..."
scp -i "$KEY_PATH" -r build/ "$EC2_USER@$EC2_HOST:/home/$EC2_USER/techacademy/"

# Restart application
echo "🔄 Restarting application..."
ssh -i "$KEY_PATH" "$EC2_USER@$EC2_HOST" "
    cd /home/$EC2_USER/techacademy
    
    # Stop current application
    pm2 stop techacademy-web
    
    # Start application with new build
    pm2 start ecosystem.config.js
    
    # Save PM2 configuration
    pm2 save
    
    echo '✅ Application updated successfully!'
"

echo "✅ Update completed!"
echo ""
echo "📋 Access URLs:"
echo "  - Main Application: http://13.232.196.147/"
echo "  - Admin Dashboard: http://13.232.196.147/admin"
echo ""
echo "🔧 Admin Dashboard Features:"
echo "  - Real-time system status"
echo "  - Application monitoring"
echo "  - Server resources"
echo "  - Network information"
echo "  - Security status"
echo "  - Recent logs"
echo "  - Quick actions"
