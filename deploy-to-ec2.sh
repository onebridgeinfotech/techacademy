#!/bin/bash

# TechAcademy EC2 Deployment Script
# This script will deploy the React app to your EC2 instance

echo "🚀 Starting TechAcademy deployment to EC2..."

# Configuration
EC2_IP="YOUR_EC2_PUBLIC_IP"  # Replace with your actual EC2 public IP
EC2_USER="ubuntu"
APP_DIR="/home/ubuntu/techacademy"

echo "📋 Deployment Configuration:"
echo "   EC2 IP: $EC2_IP"
echo "   User: $EC2_USER"
echo "   App Directory: $APP_DIR"
echo ""

# Check if build folder exists
if [ ! -d "build" ]; then
    echo "❌ Build folder not found. Please run 'npm run build' first."
    exit 1
fi

echo "✅ Build folder found"

# Create deployment package
echo "📦 Creating deployment package..."
tar -czf techacademy-build.tar.gz build/

# Upload to EC2
echo "📤 Uploading to EC2..."
scp -i ~/.ssh/your-key.pem techacademy-build.tar.gz $EC2_USER@$EC2_IP:/home/ubuntu/

# Deploy on EC2
echo "🔧 Deploying on EC2..."
ssh -i ~/.ssh/your-key.pem $EC2_USER@$EC2_IP << 'EOF'
    echo "📥 Extracting build files..."
    cd /home/ubuntu
    tar -xzf techacademy-build.tar.gz
    
    echo "🔧 Installing serve globally..."
    sudo npm install -g serve
    
    echo "🛑 Stopping any existing processes..."
    sudo pkill -f "serve -s build" || true
    
    echo "🚀 Starting the application..."
    cd /home/ubuntu
    nohup serve -s build -l 80 > app.log 2>&1 &
    
    echo "✅ Application started on port 80"
    echo "📊 Checking status..."
    sleep 3
    ps aux | grep serve
    echo ""
    echo "🌐 Your app should be available at: http://$(curl -s ifconfig.me)"
EOF

# Cleanup
echo "🧹 Cleaning up..."
rm techacademy-build.tar.gz

echo "✅ Deployment completed!"
echo "🌐 Your app should be available at: http://$EC2_IP"
echo ""
echo "📋 Troubleshooting commands:"
echo "   Check app status: ssh -i ~/.ssh/your-key.pem ubuntu@$EC2_IP 'ps aux | grep serve'"
echo "   View logs: ssh -i ~/.ssh/your-key.pem ubuntu@$EC2_IP 'tail -f /home/ubuntu/app.log'"
echo "   Restart app: ssh -i ~/.ssh/your-key.pem ubuntu@$EC2_IP 'sudo pkill -f serve && cd /home/ubuntu && nohup serve -s build -l 80 > app.log 2>&1 &'"
