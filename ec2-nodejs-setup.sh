#!/bin/bash

# TechAcademy EC2 Node.js Setup Script (Without Docker)
# This script automates the setup of TechAcademy on a fresh EC2 instance using Node.js

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting TechAcademy EC2 Node.js Setup${NC}"

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

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    print_error "Please don't run this script as root. Use a regular user with sudo privileges."
    exit 1
fi

# Update system
print_info "Updating system packages..."
sudo apt update && sudo apt upgrade -y
print_status "System updated"

# Install essential packages
print_info "Installing essential packages..."
sudo apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release build-essential
print_status "Essential packages installed"

# Install Node.js
print_info "Installing Node.js 18.x..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
print_status "Node.js installed"

# Verify Node.js installation
print_info "Verifying Node.js installation..."
node --version
npm --version

# Install PM2
print_info "Installing PM2..."
sudo npm install -g pm2
print_status "PM2 installed"

# Install serve
print_info "Installing serve..."
sudo npm install -g serve
print_status "Serve installed"

# Install Nginx
print_info "Installing Nginx..."
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
print_status "Nginx installed and started"

# Install Certbot
print_info "Installing Certbot..."
sudo apt install -y certbot python3-certbot-nginx
print_status "Certbot installed"

# Configure firewall
print_info "Configuring firewall..."
sudo apt install -y ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 3000
sudo ufw --force enable
print_status "Firewall configured"

# Create application directory
print_info "Creating application directory..."
mkdir -p /home/$USER/techacademy
cd /home/$USER/techacademy
print_status "Application directory created"

# Create Nginx configuration
print_info "Creating Nginx configuration..."
sudo tee /etc/nginx/sites-available/techacademy > /dev/null <<EOF
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    location /health {
        proxy_pass http://localhost:3000/health;
    }

    # Serve static files directly
    location /static/ {
        alias /home/$USER/techacademy/build/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Serve other static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        root /home/$USER/techacademy/build;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Enable Nginx site
sudo ln -sf /etc/nginx/sites-available/techacademy /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
print_status "Nginx configuration created and enabled"

# Create PM2 ecosystem file
print_info "Creating PM2 ecosystem configuration..."
tee /home/$USER/techacademy/ecosystem.config.js > /dev/null <<EOF
module.exports = {
  apps: [{
    name: 'techacademy-web',
    script: 'serve',
    args: '-s build -l 3000',
    cwd: '/home/$USER/techacademy',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/home/$USER/techacademy/logs/err.log',
    out_file: '/home/$USER/techacademy/logs/out.log',
    log_file: '/home/$USER/techacademy/logs/combined.log',
    time: true
  }]
};
EOF
print_status "PM2 ecosystem configuration created"

# Create logs directory
print_info "Creating logs directory..."
mkdir -p /home/$USER/techacademy/logs
chmod 755 /home/$USER/techacademy/logs
print_status "Logs directory created"

# Create environment file
print_info "Creating environment configuration..."
tee /home/$USER/techacademy/.env > /dev/null <<EOF
NODE_ENV=production
REACT_APP_API_URL=https://api.techacademy.com
REACT_APP_ENVIRONMENT=production
PORT=3000
EOF
print_status "Environment file created"

# Create monitoring script
print_info "Creating monitoring script..."
tee /home/$USER/monitor.sh > /dev/null <<EOF
#!/bin/bash
echo "=== TechAcademy System Status ==="
echo "Date: \$(date)"
echo ""

echo "=== PM2 Status ==="
pm2 status
echo ""

echo "=== Nginx Status ==="
sudo systemctl status nginx --no-pager -l
echo ""

echo "=== Node.js Version ==="
node --version
echo ""

echo "=== Disk Usage ==="
df -h
echo ""

echo "=== Memory Usage ==="
free -h
echo ""

echo "=== Application Health ==="
curl -s http://localhost:3000 || echo "Application not responding"
echo ""

echo "=== PM2 Logs (last 10 lines) ==="
pm2 logs techacademy-web --lines 10
echo ""
EOF

chmod +x /home/$USER/monitor.sh
print_status "Monitoring script created"

# Create backup script
print_info "Creating backup script..."
tee /home/$USER/backup.sh > /dev/null <<EOF
#!/bin/bash
DATE=\$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/$USER/backups"
APP_DIR="/home/$USER/techacademy"

mkdir -p \$BACKUP_DIR
tar -czf \$BACKUP_DIR/techacademy_\$DATE.tar.gz -C \$APP_DIR .
find \$BACKUP_DIR -name "techacademy_*.tar.gz" -mtime +7 -delete
echo "Backup completed: techacademy_\$DATE.tar.gz"
EOF

chmod +x /home/$USER/backup.sh
print_status "Backup script created"

# Create update script
print_info "Creating update script..."
tee /home/$USER/update.sh > /dev/null <<EOF
#!/bin/bash
echo "Starting system update..."

# Update system packages
sudo apt update && sudo apt upgrade -y
sudo apt autoremove -y
sudo apt autoclean

# Update Node.js packages
cd /home/$USER/techacademy
npm update

# Rebuild application
npm run build

# Restart application
pm2 restart techacademy-web

echo "System update completed successfully"
EOF

chmod +x /home/$USER/update.sh
print_status "Update script created"

# Create deployment script
print_info "Creating deployment script..."
tee /home/$USER/deploy.sh > /dev/null <<EOF
#!/bin/bash
echo "Starting deployment..."

# Navigate to application directory
cd /home/$USER/techacademy

# Install dependencies
npm install

# Build application
npm run build

# Restart PM2 process
pm2 restart techacademy-web

# Check status
pm2 status

echo "Deployment completed successfully"
EOF

chmod +x /home/$USER/deploy.sh
print_status "Deployment script created"

# Create log rotation configuration
print_info "Configuring log rotation..."
sudo tee /etc/logrotate.d/techacademy > /dev/null <<EOF
/home/$USER/techacademy/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 $USER $USER
}
EOF
print_status "Log rotation configured"

# Set up cron jobs
print_info "Setting up cron jobs..."
(crontab -l 2>/dev/null; echo "0 2 * * * /home/$USER/backup.sh") | crontab -
(crontab -l 2>/dev/null; echo "0 3 * * 0 /home/$USER/update.sh") | crontab -
(crontab -l 2>/dev/null; echo "0 1 * * * pm2 flush") | crontab -
print_status "Cron jobs configured"

# Display completion message
echo -e "\n${GREEN}🎉 TechAcademy EC2 Node.js Setup Completed Successfully!${NC}"
echo -e "\n${YELLOW}📋 Next Steps:${NC}"
echo "1. Upload your application files to /home/$USER/techacademy/"
echo "2. Run: cd /home/$USER/techacademy && npm install"
echo "3. Run: npm run build"
echo "4. Run: pm2 start ecosystem.config.js"
echo "5. Test: curl http://localhost:3000"
echo "6. Access: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)/"

echo -e "\n${YELLOW}🔧 Useful Commands:${NC}"
echo "- Check PM2 status: pm2 status"
echo "- View logs: pm2 logs techacademy-web"
echo "- Restart app: pm2 restart techacademy-web"
echo "- Monitor system: ./monitor.sh"
echo "- Deploy updates: ./deploy.sh"

echo -e "\n${YELLOW}🔒 Security Notes:${NC}"
echo "- Firewall is configured (SSH, HTTP, HTTPS, Port 3000)"
echo "- SSL certificate can be obtained with: sudo certbot --nginx -d your-domain.com"
echo "- Regular updates are scheduled via cron"

echo -e "\n${YELLOW}📊 Monitoring:${NC}"
echo "- Health check: http://your-ec2-ip/"
echo "- System monitoring: ./monitor.sh"
echo "- PM2 logs: pm2 logs techacademy-web"
echo "- Application logs: /home/$USER/techacademy/logs/"

print_status "Setup completed! Please upload your application files and start the service."

# Ask for reboot
read -p "Do you want to reboot now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_info "Rebooting system..."
    sudo reboot
else
    print_warning "Please reboot manually when convenient: sudo reboot"
fi
