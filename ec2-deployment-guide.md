# TechAcademy EC2 Deployment Guide

## 🚀 Complete Guide: Deploy TechAcademy on AWS EC2

### Prerequisites
- AWS Account
- AWS CLI configured
- SSH client (PuTTY, Git Bash, or WSL)

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
     - Custom TCP (3000) - Anywhere (0.0.0.0/0)
   - **Storage**: 8 GB (Free tier) or 20 GB
4. Launch instance

### 1.2 Get Instance Details
- Note the **Public IP** and **Public DNS**
- Download the **Key Pair** (.pem file)

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

## Step 3: Install Required Software on EC2

### 3.1 Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### 3.2 Install Docker
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

### 3.3 Install Git
```bash
sudo apt install git -y
```

### 3.4 Install Nginx (for reverse proxy)
```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

## Step 4: Deploy Application

### 4.1 Clone Repository
```bash
# Clone your repository
git clone https://github.com/your-username/techacademy.git
cd techacademy

# Or upload files using SCP
# From your local machine:
# scp -i your-key-pair.pem -r . ubuntu@your-ec2-public-ip:/home/ubuntu/techacademy/
```

### 4.2 Build and Run with Docker
```bash
# Build Docker image
docker build -t techacademy-web .

# Run container
docker run -d -p 3000:80 --name techacademy-app techacademy-web

# Check if container is running
docker ps
```

### 4.3 Alternative: Use Docker Compose
```bash
# Run with docker-compose
docker-compose up -d

# Check status
docker-compose ps
```

---

## Step 5: Configure Nginx Reverse Proxy

### 5.1 Create Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/techacademy
```

### 5.2 Add Configuration
```nginx
server {
    listen 80;
    server_name your-ec2-public-dns;

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

    # Health check endpoint
    location /health {
        proxy_pass http://localhost:3000/health;
    }
}
```

### 5.3 Enable Site
```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/techacademy /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

---

## Step 6: Set Up SSL with Let's Encrypt

### 6.1 Install Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 6.2 Get SSL Certificate
```bash
# Replace with your domain or EC2 public DNS
sudo certbot --nginx -d your-domain.com

# Or for EC2 public DNS
sudo certbot --nginx -d your-ec2-public-dns.region.compute.amazonaws.com
```

### 6.3 Auto-renewal
```bash
# Test renewal
sudo certbot renew --dry-run

# Add to crontab for auto-renewal
sudo crontab -e
# Add this line:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

---

## Step 7: Set Up Auto-Start and Monitoring

### 7.1 Create Systemd Service
```bash
sudo nano /etc/systemd/system/techacademy.service
```

### 7.2 Add Service Configuration
```ini
[Unit]
Description=TechAcademy Web Application
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/ubuntu/techacademy
ExecStart=/usr/bin/docker-compose up -d
ExecStop=/usr/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
```

### 7.3 Enable Service
```bash
# Reload systemd
sudo systemctl daemon-reload

# Enable service
sudo systemctl enable techacademy.service

# Start service
sudo systemctl start techacademy.service

# Check status
sudo systemctl status techacademy.service
```

---

## Step 8: Set Up Logging and Monitoring

### 8.1 Configure Log Rotation
```bash
sudo nano /etc/logrotate.d/techacademy
```

### 8.2 Add Log Rotation Config
```
/home/ubuntu/techacademy/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 ubuntu ubuntu
}
```

### 8.3 Set Up CloudWatch Agent (Optional)
```bash
# Download CloudWatch agent
wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb

# Install
sudo dpkg -i amazon-cloudwatch-agent.deb

# Configure
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard
```

---

## Step 9: Backup and Maintenance

### 9.1 Create Backup Script
```bash
nano /home/ubuntu/backup.sh
```

### 9.2 Add Backup Script
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/ubuntu/backups"
APP_DIR="/home/ubuntu/techacademy"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup application files
tar -czf $BACKUP_DIR/techacademy_$DATE.tar.gz -C $APP_DIR .

# Keep only last 7 days of backups
find $BACKUP_DIR -name "techacademy_*.tar.gz" -mtime +7 -delete

echo "Backup completed: techacademy_$DATE.tar.gz"
```

### 9.3 Make Script Executable
```bash
chmod +x /home/ubuntu/backup.sh
```

### 9.4 Schedule Backup
```bash
# Add to crontab
crontab -e

# Add this line for daily backup at 2 AM
# 0 2 * * * /home/ubuntu/backup.sh
```

---

## Step 10: Testing and Verification

### 10.1 Test Application
```bash
# Check if application is running
curl http://localhost:3000/health

# Check nginx
curl http://localhost/health

# Check from external
curl http://your-ec2-public-ip/health
```

### 10.2 Test All Features
1. **Homepage**: `http://your-ec2-public-ip/`
2. **Apply Now**: `http://your-ec2-public-ip/apply`
3. **Mentor Application**: `http://your-ec2-public-ip/mentor-application`
4. **All Pages**: Test navigation and functionality

### 10.3 Performance Testing
```bash
# Install Apache Bench
sudo apt install apache2-utils -y

# Test performance
ab -n 100 -c 10 http://your-ec2-public-ip/
```

---

## Step 11: Security Hardening

### 11.1 Configure Firewall
```bash
# Install UFW
sudo apt install ufw -y

# Configure firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### 11.2 Update System Regularly
```bash
# Create update script
nano /home/ubuntu/update.sh
```

### 11.3 Add Update Script
```bash
#!/bin/bash
sudo apt update && sudo apt upgrade -y
sudo apt autoremove -y
sudo apt autoclean
```

### 11.4 Schedule Updates
```bash
chmod +x /home/ubuntu/update.sh
crontab -e

# Add for weekly updates
# 0 3 * * 0 /home/ubuntu/update.sh
```

---

## Step 12: Scaling and Load Balancing

### 12.1 Create Application Load Balancer
1. Go to EC2 Console → Load Balancers
2. Create Application Load Balancer
3. Configure:
   - Name: `techacademy-alb`
   - Scheme: Internet-facing
   - VPC: Default
   - Subnets: Select 2+ subnets
   - Security Group: Allow HTTP/HTTPS
   - Target Group: Create new
   - Health Check: `/health`

### 12.2 Auto Scaling Group
1. Go to EC2 Console → Auto Scaling Groups
2. Create Auto Scaling Group
3. Configure:
   - Launch Template: Use your EC2 instance
   - Min: 1, Desired: 2, Max: 5
   - Health Check: ELB
   - Scaling Policies: CPU-based

---

## Quick Commands Reference

### Connection
```bash
# Connect to EC2
ssh -i your-key-pair.pem ubuntu@your-ec2-public-ip

# Upload files
scp -i your-key-pair.pem -r . ubuntu@your-ec2-public-ip:/home/ubuntu/techacademy/
```

### Docker Commands
```bash
# Build and run
docker build -t techacademy-web .
docker run -d -p 3000:80 --name techacademy-app techacademy-web

# With docker-compose
docker-compose up -d

# Check logs
docker logs techacademy-app
docker-compose logs -f
```

### Service Management
```bash
# Start/stop service
sudo systemctl start techacademy.service
sudo systemctl stop techacademy.service
sudo systemctl restart techacademy.service

# Check status
sudo systemctl status techacademy.service
```

### Nginx Commands
```bash
# Test configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx

# Check status
sudo systemctl status nginx
```

---

## Cost Estimation

### EC2 Instance
- **t2.micro**: Free tier (750 hours/month)
- **t3.small**: ~$15-20/month
- **t3.medium**: ~$30-40/month

### Additional Costs
- **EBS Storage**: ~$1-2/month (20GB)
- **Data Transfer**: ~$0.09/GB
- **Load Balancer**: ~$18/month (if used)

---

## Troubleshooting

### Common Issues
1. **Connection refused**: Check security groups
2. **Docker permission denied**: Add user to docker group
3. **Nginx 502 error**: Check if app is running on port 3000
4. **SSL issues**: Check domain configuration

### Useful Commands
```bash
# Check running processes
ps aux | grep docker

# Check port usage
sudo netstat -tlnp | grep :3000

# Check disk space
df -h

# Check memory usage
free -h

# Check logs
sudo journalctl -u techacademy.service -f
```

This guide provides a complete production-ready deployment on EC2 with proper security, monitoring, and scaling capabilities!
