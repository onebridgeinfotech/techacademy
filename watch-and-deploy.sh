#!/bin/bash

# Watch and Deploy Script
# This script watches for file changes and automatically deploys

echo "👀 Watch and Deploy for TechAcademy"
echo "===================================="
echo ""

# Configuration
EC2_IP="65.0.95.121"
EC2_USER="ubuntu"
KEY_PATH="~/.ssh/your-key.pem"

echo "📋 Configuration:"
echo "   EC2 IP: $EC2_IP"
echo "   User: $EC2_USER"
echo "   Watching: src/ directory"
echo ""

# Check if fswatch is installed
if ! command -v fswatch &> /dev/null; then
    echo "❌ fswatch not installed. Installing..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install fswatch
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        sudo apt-get install -y fswatch
    else
        echo "❌ fswatch not available for this OS. Please install manually."
        exit 1
    fi
fi

echo "✅ fswatch is available"
echo ""

# Function to deploy
deploy() {
    echo "🔄 File change detected! Deploying..."
    echo "Time: $(date '+%Y-%m-%d %H:%M:%S')"
    
    # Build locally
    echo "📦 Building locally..."
    npm run build
    
    # Upload to EC2
    echo "📤 Uploading to EC2..."
    scp -r build/ $EC2_USER@$EC2_IP:/home/ubuntu/techacademy/
    
    # Restart app on EC2
    echo "🔧 Restarting app on EC2..."
    ssh -i $KEY_PATH $EC2_USER@$EC2_IP << 'EOF'
cd /home/ubuntu/techacademy
sudo pkill -f serve
nohup serve -s build -l 3000 > app.log 2>&1 &
sleep 2
ps aux | grep serve | grep -v grep
EOF
    
    echo "✅ Deployment complete!"
    echo "🌐 App available at: http://$EC2_IP:3000"
    echo ""
}

# Initial deployment
echo "🚀 Initial deployment..."
deploy

echo "👀 Watching for file changes in src/ directory..."
echo "Press Ctrl+C to stop watching"
echo ""

# Watch for changes
fswatch -o src/ | while read f; do
    deploy
done
