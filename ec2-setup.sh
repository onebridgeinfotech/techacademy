#!/bin/bash

# TechAcademy EC2 Setup Script
# This script automates the setup of TechAcademy on a fresh EC2 instance

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting TechAcademy EC2 Setup${NC}"

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
sudo apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release
print_status "Essential packages installed"

# Install Docker
print_info "Installing Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
print_status "Docker installed"

# Install Docker Compose
print_info "Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
print_status "Docker Compose installed"

# Install Nginx
print_info "Installing Nginx..."
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
print_status "Nginx installed and started"

# Install Certbot for SSL
print_info "Installing Certbot..."
sudo apt install -y certbot python3-certbot-nginx
print_status "Certbot installed"

# Install UFW firewall
print_info "Configuring firewall..."
sudo apt install -y ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
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
}
EOF

# Enable Nginx site
sudo ln -sf /etc/nginx/sites-available/techacademy /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
print_status "Nginx configuration created and enabled"

# Create systemd service
print_info "Creating systemd service..."
sudo tee /etc/systemd/system/techacademy.service > /dev/null <<EOF
[Unit]
Description=TechAcademy Web Application
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/$USER/techacademy
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0
User=$USER
Group=$USER

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable techacademy.service
print_status "Systemd service created and enabled"

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
sudo apt update && sudo apt upgrade -y
sudo apt autoremove -y
sudo apt autoclean
echo "System updated successfully"
EOF

chmod +x /home/$USER/update.sh
print_status "Update script created"

# Create monitoring script
print_info "Creating monitoring script..."
tee /home/$USER/monitor.sh > /dev/null <<EOF
#!/bin/bash
echo "=== TechAcademy System Status ==="
echo "Date: \$(date)"
echo ""

echo "=== Docker Status ==="
docker ps
echo ""

echo "=== Nginx Status ==="
sudo systemctl status nginx --no-pager -l
echo ""

echo "=== Application Service Status ==="
sudo systemctl status techacademy.service --no-pager -l
echo ""

echo "=== Disk Usage ==="
df -h
echo ""

echo "=== Memory Usage ==="
free -h
echo ""

echo "=== Application Health ==="
curl -s http://localhost:3000/health || echo "Application not responding"
echo ""
EOF

chmod +x /home/$USER/monitor.sh
print_status "Monitoring script created"

# Create deployment script
print_info "Creating deployment script..."
tee /home/$USER/deploy.sh > /dev/null <<EOF
#!/bin/bash
cd /home/$USER/techacademy

echo "Stopping current application..."
sudo systemctl stop techacademy.service

echo "Building new Docker image..."
docker build -t techacademy-web .

echo "Starting application..."
sudo systemctl start techacademy.service

echo "Checking status..."
sleep 10
sudo systemctl status techacademy.service --no-pager -l

echo "Testing application..."
curl -s http://localhost:3000/health && echo "Application is healthy!" || echo "Application health check failed"
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
print_status "Cron jobs configured"

# Create environment file
print_info "Creating environment configuration..."
tee /home/$USER/techacademy/.env > /dev/null <<EOF
NODE_ENV=production
REACT_APP_API_URL=https://api.techacademy.com
REACT_APP_ENVIRONMENT=production
EOF
print_status "Environment file created"

# Create logs directory
mkdir -p /home/$USER/techacademy/logs
print_status "Logs directory created"

# Display completion message
echo -e "\n${GREEN}🎉 TechAcademy EC2 Setup Completed Successfully!${NC}"
echo -e "\n${YELLOW}📋 Next Steps:${NC}"
echo "1. Upload your application files to /home/$USER/techacademy/"
echo "2. Run: cd /home/$USER/techacademy && docker build -t techacademy-web ."
echo "3. Run: sudo systemctl start techacademy.service"
echo "4. Test: curl http://localhost:3000/health"
echo "5. Access: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)/"

echo -e "\n${YELLOW}🔧 Useful Commands:${NC}"
echo "- Check status: sudo systemctl status techacademy.service"
echo "- View logs: docker logs \$(docker ps -q --filter ancestor=techacademy-web)"
echo "- Monitor system: ./monitor.sh"
echo "- Deploy updates: ./deploy.sh"
echo "- Backup: ./backup.sh"

echo -e "\n${YELLOW}🔒 Security Notes:${NC}"
echo "- Firewall is configured (SSH, HTTP, HTTPS only)"
echo "- SSL certificate can be obtained with: sudo certbot --nginx -d your-domain.com"
echo "- Regular updates are scheduled via cron"

echo -e "\n${YELLOW}📊 Monitoring:${NC}"
echo "- Health check: http://your-ec2-ip/health"
echo "- System monitoring: ./monitor.sh"
echo "- Logs: /home/$USER/techacademy/logs/"

print_status "Setup completed! Please reboot the system to ensure all changes take effect."
print_warning "After reboot, you'll need to upload your application files and start the service."

# Ask for reboot
read -p "Do you want to reboot now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_info "Rebooting system..."
    sudo reboot
else
    print_warning "Please reboot manually when convenient: sudo reboot"
fi
