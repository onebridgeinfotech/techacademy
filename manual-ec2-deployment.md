# TechAcademy Manual EC2 Deployment Guide

## 🚀 Manual Step-by-Step EC2 Deployment

### Prerequisites
- AWS Account
- EC2 instance running Ubuntu 22.04 LTS
- SSH access to EC2 instance
- Your application files ready

---

## Step 1: Create EC2 Instance

### 1.1 Launch EC2 Instance
1. Go to [AWS EC2 Console](https://console.aws.amazon.com/ec2/)
2. Click "Launch Instance"
3. Configure instance:
   - **Name**: `techacademy-web`
   - **AMI**: Ubuntu Server 22.04 LTS (Free tier eligible)
   - **Instance Type**: t2.micro (Free tier) or t3.small
   - **Key Pair**: Create new or select existing
   - **Security Group**: Create new with rules:
     - SSH (22) - Your IP
     - HTTP (80) - Anywhere (0.0.0.0/0)
     - HTTPS (443) - Anywhere (0.0.0.0/0)
   - **Storage**: 8 GB (Free tier) or 20 GB
4. Launch instance

### 1.2 Get Connection Details
- **Public IP**: `your-ec2-public-ip`
- **Key File**: `your-key-pair.pem`

---

## Step 2: Connect to EC2 Instance

### 2.1 Using Git Bash (Windows)
```bash
# Navigate to your key file location
cd /c/Users/UdayaCharagundla/Downloads/

# Set proper permissions
chmod 400 your-key-pair.pem

# Connect to instance
ssh -i your-key-pair.pem ubuntu@your-ec2-public-ip
```

### 2.2 Using PuTTY (Windows)
1. Convert .pem to .ppk using PuTTYgen
2. Use PuTTY with the .ppk file
3. Host: `ubuntu@your-ec2-public-ip`

### 2.3 Using WSL
```bash
# Copy key to WSL
cp /mnt/c/Users/UdayaCharagundla/Downloads/your-key-pair.pem ~/

# Set permissions
chmod 400 ~/your-key-pair.pem

# Connect
ssh -i ~/your-key-pair.pem ubuntu@your-ec2-public-ip
```

---

## Step 3: Update System Packages

### 3.1 Update Package List
```bash
sudo apt update
```

### 3.2 Upgrade System
```bash
sudo apt upgrade -y
```

### 3.3 Install Essential Packages
```bash
sudo apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release
```

---

## Step 4: Install Docker

### 4.1 Download Docker Installation Script
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
```

### 4.2 Run Docker Installation
```bash
sudo sh get-docker.sh
```

### 4.3 Add User to Docker Group
```bash
sudo usermod -aG docker ubuntu
```

### 4.4 Verify Docker Installation
```bash
docker --version
```

### 4.5 Test Docker (after logout/login)
```bash
docker run hello-world
```

---

## Step 5: Install Docker Compose

### 5.1 Download Docker Compose
```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

### 5.2 Make Docker Compose Executable
```bash
sudo chmod +x /usr/local/bin/docker-compose
```

### 5.3 Verify Docker Compose Installation
```bash
docker-compose --version
```

---

## Step 6: Install Nginx

### 6.1 Install Nginx
```bash
sudo apt install -y nginx
```

### 6.2 Start Nginx Service
```bash
sudo systemctl start nginx
```

### 6.3 Enable Nginx to Start on Boot
```bash
sudo systemctl enable nginx
```

### 6.4 Check Nginx Status
```bash
sudo systemctl status nginx
```

### 6.5 Test Nginx
```bash
curl http://localhost
```

---

## Step 7: Install Certbot (for SSL)

### 7.1 Install Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 7.2 Verify Certbot Installation
```bash
certbot --version
```

---

## Step 8: Configure Firewall

### 8.1 Install UFW
```bash
sudo apt install -y ufw
```

### 8.2 Configure Firewall Rules
```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
```

### 8.3 Enable Firewall
```bash
sudo ufw enable
```

### 8.4 Check Firewall Status
```bash
sudo ufw status
```

---

## Step 9: Create Application Directory

### 9.1 Create Directory
```bash
mkdir -p /home/ubuntu/techacademy
cd /home/ubuntu/techacademy
```

### 9.2 Set Permissions
```bash
chmod 755 /home/ubuntu/techacademy
```

---

## Step 10: Upload Application Files

### 10.1 Using SCP (from your local machine)
```bash
# From your local machine (Git Bash or WSL)
scp -i your-key-pair.pem -r . ubuntu@your-ec2-public-ip:/home/ubuntu/techacademy/
```

### 10.2 Using Git Clone (if repository is public)
```bash
# On EC2 instance
cd /home/ubuntu/techacademy
git clone https://github.com/your-username/techacademy.git .
```

### 10.3 Using File Transfer (alternative)
1. Zip your application files locally
2. Upload to EC2 using SCP
3. Extract on EC2

---

## Step 11: Configure Nginx Reverse Proxy

### 11.1 Create Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/techacademy
```

### 11.2 Add Configuration Content
```nginx
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /health {
        proxy_pass http://localhost:3000/health;
    }
}
```

### 11.3 Save and Exit
- Press `Ctrl + X`
- Press `Y` to confirm
- Press `Enter` to save

### 11.4 Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/techacademy /etc/nginx/sites-enabled/
```

### 11.5 Remove Default Site
```bash
sudo rm /etc/nginx/sites-enabled/default
```

### 11.6 Test Nginx Configuration
```bash
sudo nginx -t
```

### 11.7 Restart Nginx
```bash
sudo systemctl restart nginx
```

---

## Step 12: Build and Run Application

### 12.1 Navigate to Application Directory
```bash
cd /home/ubuntu/techacademy
```

### 12.2 Build Docker Image
```bash
docker build -t techacademy-web .
```

### 12.3 Run Docker Container
```bash
docker run -d -p 3000:80 --name techacademy-app techacademy-web
```

### 12.4 Check Container Status
```bash
docker ps
```

### 12.5 Check Container Logs
```bash
docker logs techacademy-app
```

---

## Step 13: Test Application

### 13.1 Test Local Access
```bash
curl http://localhost:3000/health
```

### 13.2 Test Nginx Proxy
```bash
curl http://localhost/health
```

### 13.3 Test External Access
```bash
curl http://your-ec2-public-ip/health
```

### 13.4 Test in Browser
- Open browser to `http://your-ec2-public-ip/`
- Test all features (Apply Now, Mentor Application, etc.)

---

## Step 14: Create Systemd Service

### 14.1 Create Service File
```bash
sudo nano /etc/systemd/system/techacademy.service
```

### 14.2 Add Service Configuration
```ini
[Unit]
Description=TechAcademy Web Application
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/ubuntu/techacademy
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0
User=ubuntu
Group=ubuntu

[Install]
WantedBy=multi-user.target
```

### 14.3 Save and Exit
- Press `Ctrl + X`
- Press `Y` to confirm
- Press `Enter` to save

### 14.4 Reload Systemd
```bash
sudo systemctl daemon-reload
```

### 14.5 Enable Service
```bash
sudo systemctl enable techacademy.service
```

### 14.6 Start Service
```bash
sudo systemctl start techacademy.service
```

### 14.7 Check Service Status
```bash
sudo systemctl status techacademy.service
```

---

## Step 15: Set Up SSL Certificate (Optional)

### 15.1 Get SSL Certificate
```bash
sudo certbot --nginx -d your-domain.com
```

### 15.2 Test SSL
```bash
curl https://your-domain.com/health
```

### 15.3 Set Up Auto-renewal
```bash
sudo crontab -e
```

### 15.4 Add Renewal Cron Job
```bash
0 12 * * * /usr/bin/certbot renew --quiet
```

---

## Step 16: Create Monitoring Scripts

### 16.1 Create Monitor Script
```bash
nano /home/ubuntu/monitor.sh
```

### 16.2 Add Monitor Script Content
```bash
#!/bin/bash
echo "=== TechAcademy System Status ==="
echo "Date: $(date)"
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
```

### 16.3 Make Script Executable
```bash
chmod +x /home/ubuntu/monitor.sh
```

### 16.4 Test Monitor Script
```bash
./monitor.sh
```

---

## Step 17: Create Backup Script

### 17.1 Create Backup Script
```bash
nano /home/ubuntu/backup.sh
```

### 17.2 Add Backup Script Content
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/ubuntu/backups"
APP_DIR="/home/ubuntu/techacademy"

mkdir -p $BACKUP_DIR
tar -czf $BACKUP_DIR/techacademy_$DATE.tar.gz -C $APP_DIR .
find $BACKUP_DIR -name "techacademy_*.tar.gz" -mtime +7 -delete
echo "Backup completed: techacademy_$DATE.tar.gz"
```

### 17.3 Make Script Executable
```bash
chmod +x /home/ubuntu/backup.sh
```

### 17.4 Test Backup Script
```bash
./backup.sh
```

---

## Step 18: Set Up Automated Tasks

### 18.1 Edit Crontab
```bash
crontab -e
```

### 18.2 Add Cron Jobs
```bash
# Daily backup at 2 AM
0 2 * * * /home/ubuntu/backup.sh

# Weekly system update at 3 AM on Sunday
0 3 * * 0 /home/ubuntu/update.sh
```

### 18.3 Create Update Script
```bash
nano /home/ubuntu/update.sh
```

### 18.4 Add Update Script Content
```bash
#!/bin/bash
sudo apt update && sudo apt upgrade -y
sudo apt autoremove -y
sudo apt autoclean
echo "System updated successfully"
```

### 18.5 Make Update Script Executable
```bash
chmod +x /home/ubuntu/update.sh
```

---

## Step 19: Final Testing and Verification

### 19.1 Test All Application Features
1. **Homepage**: `http://your-ec2-public-ip/`
2. **Apply Now**: `http://your-ec2-public-ip/apply`
3. **Mentor Application**: `http://your-ec2-public-ip/mentor-application`
4. **All Navigation**: Test all menu items
5. **Forms**: Test form submissions
6. **Responsive Design**: Test on mobile/tablet

### 19.2 Performance Testing
```bash
# Install Apache Bench
sudo apt install apache2-utils -y

# Test performance
ab -n 100 -c 10 http://your-ec2-public-ip/
```

### 19.3 Security Testing
```bash
# Check open ports
sudo netstat -tlnp

# Check firewall status
sudo ufw status

# Check SSL (if configured)
openssl s_client -connect your-domain.com:443
```

---

## Step 20: Maintenance and Monitoring

### 20.1 Daily Checks
```bash
# Check application status
sudo systemctl status techacademy.service

# Check application health
curl http://localhost:3000/health

# Check system resources
./monitor.sh
```

### 20.2 Weekly Maintenance
```bash
# Run system updates
./update.sh

# Check backup status
ls -la /home/ubuntu/backups/

# Review logs
docker logs techacademy-app
```

### 20.3 Monthly Tasks
```bash
# Check SSL certificate expiry
sudo certbot certificates

# Review system logs
sudo journalctl -u techacademy.service --since "1 month ago"

# Check disk usage
df -h
```

---

## Troubleshooting Common Issues

### Issue 1: Cannot Connect via SSH
**Solution:**
```bash
# Check security group allows SSH (port 22)
# Check key file permissions
chmod 400 your-key-pair.pem
# Check if instance is running
```

### Issue 2: Application Not Starting
**Solution:**
```bash
# Check Docker status
docker ps
# Check container logs
docker logs techacademy-app
# Check service status
sudo systemctl status techacademy.service
```

### Issue 3: 502 Bad Gateway
**Solution:**
```bash
# Check if application is running
curl http://localhost:3000/health
# Check Nginx configuration
sudo nginx -t
# Restart services
sudo systemctl restart nginx
sudo systemctl restart techacademy.service
```

### Issue 4: Permission Denied
**Solution:**
```bash
# Fix Docker permissions
sudo usermod -aG docker ubuntu
# Log out and back in
# Fix file permissions
chmod +x *.sh
chmod 644 package*.json
```

---

## Quick Reference Commands

### Connection
```bash
ssh -i your-key-pair.pem ubuntu@your-ec2-public-ip
```

### Service Management
```bash
sudo systemctl start techacademy.service
sudo systemctl stop techacademy.service
sudo systemctl restart techacademy.service
sudo systemctl status techacademy.service
```

### Docker Commands
```bash
docker ps
docker logs techacademy-app
docker restart techacademy-app
```

### Monitoring
```bash
./monitor.sh
curl http://localhost:3000/health
sudo systemctl status nginx
```

### Backup
```bash
./backup.sh
ls -la /home/ubuntu/backups/
```

---

This manual guide provides step-by-step instructions for deploying your TechAcademy application on EC2. Each step is explained in detail so you can understand what's happening before automating it later!
