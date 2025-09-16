#!/bin/bash

# TechAcademy EC2 Node.js Upload Script (Without Docker)
# This script uploads your application files to EC2 and deploys them using Node.js

set -e

# Configuration - UPDATE THESE VALUES
EC2_HOST="your-ec2-public-ip"
EC2_USER="ubuntu"
KEY_PATH="path/to/your-key-pair.pem"
APP_DIR="/home/ubuntu/techacademy"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 TechAcademy EC2 Node.js Upload & Deploy${NC}"

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if required parameters are set
if [ "$EC2_HOST" = "your-ec2-public-ip" ] || [ "$KEY_PATH" = "path/to/your-key-pair.pem" ]; then
    print_error "Please update the configuration variables at the top of this script:"
    echo "  - EC2_HOST: Your EC2 public IP"
    echo "  - KEY_PATH: Path to your .pem key file"
    exit 1
fi

# Check if key file exists
if [ ! -f "$KEY_PATH" ]; then
    print_error "Key file not found: $KEY_PATH"
    exit 1
fi

# Check if SSH is available
if ! command -v ssh &> /dev/null; then
    print_error "SSH client not found. Please install OpenSSH or use Git Bash."
    exit 1
fi

# Check if SCP is available
if ! command -v scp &> /dev/null; then
    print_error "SCP client not found. Please install OpenSSH or use Git Bash."
    exit 1
fi

print_info "Configuration:"
echo "  EC2 Host: $EC2_HOST"
echo "  EC2 User: $EC2_USER"
echo "  Key Path: $KEY_PATH"
echo "  App Directory: $APP_DIR"
echo ""

# Test SSH connection
print_info "Testing SSH connection..."
if ssh -i "$KEY_PATH" -o ConnectTimeout=10 -o BatchMode=yes "$EC2_USER@$EC2_HOST" exit 2>/dev/null; then
    print_status "SSH connection successful"
else
    print_error "SSH connection failed. Please check:"
    echo "  - EC2 instance is running"
    echo "  - Security group allows SSH (port 22)"
    echo "  - Key file path is correct"
    echo "  - Key file permissions are correct (chmod 400)"
    exit 1
fi

# Create backup on EC2
print_info "Creating backup on EC2..."
ssh -i "$KEY_PATH" "$EC2_USER@$EC2_HOST" "
    if [ -d '$APP_DIR' ]; then
        pm2 stop techacademy-web || true
        mkdir -p /home/$EC2_USER/backups
        tar -czf /home/$EC2_USER/backups/techacademy_backup_\$(date +%Y%m%d_%H%M%S).tar.gz -C $APP_DIR . 2>/dev/null || true
        echo 'Backup created'
    else
        echo 'No existing application found'
    fi
"

# Upload application files
print_info "Uploading application files..."
scp -i "$KEY_PATH" -r . "$EC2_USER@$EC2_HOST:$APP_DIR/"
print_status "Files uploaded successfully"

# Set proper permissions
print_info "Setting file permissions..."
ssh -i "$KEY_PATH" "$EC2_USER@$EC2_HOST" "
    cd $APP_DIR
    chmod +x *.sh 2>/dev/null || true
    chmod 644 package*.json 2>/dev/null || true
    chmod 644 ecosystem.config.js 2>/dev/null || true
    chmod 644 .env 2>/dev/null || true
    echo 'Permissions set'
"

# Install dependencies and build application
print_info "Installing dependencies and building application..."
ssh -i "$KEY_PATH" "$EC2_USER@$EC2_HOST" "
    cd $APP_DIR
    
    echo 'Installing dependencies...'
    npm install
    
    echo 'Building application...'
    npm run build
    
    echo 'Starting application with PM2...'
    pm2 start ecosystem.config.js
    
    echo 'Saving PM2 configuration...'
    pm2 save
    
    echo 'Waiting for application to start...'
    sleep 10
    
    echo 'Checking PM2 status...'
    pm2 status
    
    echo 'Testing application health...'
    curl -s http://localhost:3000 && echo 'Application is healthy!' || echo 'Application health check failed'
"

# Test external access
print_info "Testing external access..."
if curl -s --connect-timeout 10 "http://$EC2_HOST" > /dev/null; then
    print_status "External access successful"
    echo "Your application is accessible at: http://$EC2_HOST/"
else
    print_warning "External access test failed. Please check:"
    echo "  - Security group allows HTTP (port 80)"
    echo "  - Application is running on EC2"
    echo "  - Nginx is properly configured"
fi

# Display final information
echo -e "\n${GREEN}🎉 Deployment Completed!${NC}"
echo -e "\n${YELLOW}📋 Application Information:${NC}"
echo "  URL: http://$EC2_HOST/"
echo "  Health Check: http://$EC2_HOST/"
echo "  SSH Access: ssh -i $KEY_PATH $EC2_USER@$EC2_HOST"

echo -e "\n${YELLOW}🔧 Management Commands:${NC}"
echo "  Check PM2 status: ssh -i $KEY_PATH $EC2_USER@$EC2_HOST 'pm2 status'"
echo "  View logs: ssh -i $KEY_PATH $EC2_USER@$EC2_HOST 'pm2 logs techacademy-web'"
echo "  Restart app: ssh -i $KEY_PATH $EC2_USER@$EC2_HOST 'pm2 restart techacademy-web'"
echo "  Monitor: ssh -i $KEY_PATH $EC2_USER@$EC2_HOST './monitor.sh'"

echo -e "\n${YELLOW}🔒 Security Recommendations:${NC}"
echo "  1. Set up SSL certificate: sudo certbot --nginx -d your-domain.com"
echo "  2. Configure custom domain in Route 53"
echo "  3. Set up CloudWatch monitoring"
echo "  4. Enable AWS WAF for additional security"

echo -e "\n${YELLOW}📊 Next Steps:${NC}"
echo "  1. Test all application features"
echo "  2. Set up monitoring and alerts"
echo "  3. Configure backup strategy"
echo "  4. Set up CI/CD pipeline"

print_status "Deployment completed successfully!"
