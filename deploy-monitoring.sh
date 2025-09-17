#!/bin/bash

# Deploy Monitoring API to EC2
# This script sets up a simple monitoring API on your EC2 instance

set -e

# Configuration
EC2_HOST="13.232.196.147"
EC2_USER="ubuntu"
KEY_PATH="your-key-pair.pem"  # Update this path

echo "🚀 Deploying Monitoring API to EC2..."

# Check if key file exists
if [ ! -f "$KEY_PATH" ]; then
    echo "❌ Key file not found: $KEY_PATH"
    echo "Please update the KEY_PATH variable in this script"
    exit 1
fi

# Upload monitoring API
echo "📤 Uploading monitoring API..."
scp -i "$KEY_PATH" monitoring-api.js "$EC2_USER@$EC2_HOST:/home/$EC2_USER/"

# Install dependencies and start monitoring API
echo "🔧 Setting up monitoring API on EC2..."
ssh -i "$KEY_PATH" "$EC2_USER@$EC2_HOST" "
    # Install express if not already installed
    npm install express
    
    # Create PM2 ecosystem for monitoring API
    cat > monitoring-ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'monitoring-api',
    script: 'monitoring-api.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: '/home/ubuntu/logs/monitoring-err.log',
    out_file: '/home/ubuntu/logs/monitoring-out.log',
    log_file: '/home/ubuntu/logs/monitoring-combined.log',
    time: true
  }]
};
EOF

    # Start monitoring API
    pm2 start monitoring-ecosystem.config.js
    pm2 save
    
    echo '✅ Monitoring API deployed successfully!'
    echo 'Access at: http://13.232.196.147:3001/api/status'
"

echo "✅ Monitoring API deployment completed!"
echo ""
echo "📋 Access URLs:"
echo "  - Monitoring API: http://13.232.196.147:3001/api/status"
echo "  - Admin Dashboard: http://13.232.196.147/admin"
echo ""
echo "🔧 Management Commands:"
echo "  - Check status: pm2 status"
echo "  - View logs: pm2 logs monitoring-api"
echo "  - Restart: pm2 restart monitoring-api"
