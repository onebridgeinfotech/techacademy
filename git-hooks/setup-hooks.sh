#!/bin/bash

# Git Hooks Setup for Auto-Deployment
# This script sets up Git hooks for automatic deployment

echo "🔧 Setting up Git Hooks for Auto-Deployment"
echo "==========================================="
echo ""

# Configuration
EC2_IP="65.0.95.121"
EC2_USER="ubuntu"
KEY_PATH="~/.ssh/your-key.pem"

echo "📋 Configuration:"
echo "   EC2 IP: $EC2_IP"
echo "   User: $EC2_USER"
echo ""

# Create hooks directory
mkdir -p .git/hooks

# Create post-commit hook
echo "📝 Creating post-commit hook..."
cat > .git/hooks/post-commit << 'EOF'
#!/bin/bash

# Post-commit hook for auto-deployment
echo "🚀 Auto-deploying to AWS EC2..."

# Configuration
EC2_IP="65.0.95.121"
EC2_USER="ubuntu"
KEY_PATH="~/.ssh/your-key.pem"

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

echo "✅ Auto-deployment complete!"
echo "🌐 App available at: http://$EC2_IP:3000"
EOF

# Make hook executable
chmod +x .git/hooks/post-commit

# Create pre-push hook
echo "📝 Creating pre-push hook..."
cat > .git/hooks/pre-push << 'EOF'
#!/bin/bash

# Pre-push hook for auto-deployment
echo "🚀 Pre-push: Auto-deploying to AWS EC2..."

# Configuration
EC2_IP="65.0.95.121"
EC2_USER="ubuntu"
KEY_PATH="~/.ssh/your-key.pem"

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

echo "✅ Pre-push deployment complete!"
echo "🌐 App available at: http://$EC2_IP:3000"
EOF

# Make hook executable
chmod +x .git/hooks/pre-push

echo ""
echo "✅ GIT HOOKS SETUP COMPLETE!"
echo "============================"
echo ""
echo "🎯 Now every time you commit or push, your app will automatically deploy!"
echo ""
echo "📋 Available hooks:"
echo "   ✅ post-commit - Deploys after every commit"
echo "   ✅ pre-push - Deploys before every push"
echo ""
echo "🔧 To test:"
echo "   git add ."
echo "   git commit -m 'Test auto-deployment'"
echo "   # App will automatically deploy!"
echo ""
echo "🌐 Your app will be available at: http://$EC2_IP:3000"
