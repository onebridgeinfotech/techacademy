# TechAcademy EC2 Node.js Deployment Guide (Without Docker)

## 🚀 Manual Step-by-Step EC2 Deployment Using Node.js

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
     - Custom TCP (3000) - Anywhere (0.0.0.0/0)
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
sudo apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release build-essential
```

---

## Step 4: Install Node.js

### 4.1 Install Node.js 18.x
```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Install Node.js
sudo apt install -y nodejs
```

### 4.2 Verify Node.js Installation
```bash
node --version
npm --version
```

### 4.3 Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

### 4.4 Verify PM2 Installation
```bash
pm2 --version
```

---

## Step 5: Install Nginx

### 5.1 Install Nginx
```bash
sudo apt install -y nginx
```

### 5.2 Start Nginx Service
```bash
sudo systemctl start nginx
```

### 5.3 Enable Nginx to Start on Boot
```bash
sudo systemctl enable nginx
```

### 5.4 Check Nginx Status
```bash
sudo systemctl status nginx
```

### 5.5 Test Nginx
```bash
curl http://localhost
```

---

## Step 6: Install Certbot (for SSL)

### 6.1 Install Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 6.2 Verify Certbot Installation
```bash
certbot --version
```

---

## Step 7: Configure Firewall

### 7.1 Install UFW
```bash
sudo apt install -y ufw
```

### 7.2 Configure Firewall Rules
```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 3000
```

### 7.3 Enable Firewall
```bash
sudo ufw enable
```

### 7.4 Check Firewall Status
```bash
sudo ufw status
```

---

## Step 8: Create Application Directory

### 8.1 Create Directory
```bash
mkdir -p /home/ubuntu/techacademy
cd /home/ubuntu/techacademy
```

### 8.2 Set Permissions
```bash
chmod 755 /home/ubuntu/techacademy
```

---

## Step 9: Upload Application Files

### 9.1 Using SCP (from your local machine)
```bash
# From your local machine (Git Bash or WSL)
scp -i your-key-pair.pem -r . ubuntu@your-ec2-public-ip:/home/ubuntu/techacademy/
```

### 9.2 Using Git Clone (if repository is public)
```bash
# On EC2 instance
cd /home/ubuntu/techacademy
git clone https://github.com/your-username/techacademy.git .
```

### 9.3 Alternative: Using File Transfer
1. Zip your application files locally
2. Upload to EC2 using SCP
3. Extract on EC2

---

## Step 10: Install Application Dependencies

### 10.1 Navigate to Application Directory
```bash
cd /home/ubuntu/techacademy
```

### 10.2 Install Dependencies
```bash
npm install
```

### 10.3 Build the Application
```bash
npm run build
```

### 10.4 Install Serve (for serving static files)
```bash
sudo npm install -g serve
```

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

    # Serve static files directly
    location /static/ {
        alias /home/ubuntu/techacademy/build/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Serve other static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        root /home/ubuntu/techacademy/build;
        expires 1y;
        add_header Cache-Control "public, immutable";
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

## Step 12: Create PM2 Configuration

### 12.1 Create PM2 Ecosystem File
```bash
nano /home/ubuntu/techacademy/ecosystem.config.js
```

### 12.2 Add PM2 Configuration
```javascript
module.exports = {
  apps: [{
    name: 'techacademy-web',
    script: 'serve',
    args: '-s build -l 3000',
    cwd: '/home/ubuntu/techacademy',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/home/ubuntu/techacademy/logs/err.log',
    out_file: '/home/ubuntu/techacademy/logs/out.log',
    log_file: '/home/ubuntu/techacademy/logs/combined.log',
    time: true
  }]
};
```

### 12.3 Save and Exit
- Press `Ctrl + X`
- Press `Y` to confirm
- Press `Enter` to save

---

## Step 13: Create Logs Directory

### 13.1 Create Logs Directory
```bash
mkdir -p /home/ubuntu/techacademy/logs
```

### 13.2 Set Permissions
```bash
chmod 755 /home/ubuntu/techacademy/logs
```

---

## Step 14: Start Application with PM2

### 14.1 Start Application
```bash
cd /home/ubuntu/techacademy
pm2 start ecosystem.config.js
```

### 14.2 Check PM2 Status
```bash
pm2 status
```

### 14.3 Check Application Logs
```bash
pm2 logs techacademy-web
```

### 14.4 Save PM2 Configuration
```bash
pm2 save
```

### 14.5 Setup PM2 to Start on Boot
```bash
pm2 startup
```

### 14.6 Follow the instructions provided by PM2 startup command
```bash
# Usually something like:
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
```

---

## Step 15: Test Application

### 15.1 Test Local Access
```bash
curl http://localhost:3000
```

### 15.2 Test Nginx Proxy
```bash
curl http://localhost
```

### 15.3 Test External Access
```bash
curl http://your-ec2-public-ip
```

### 15.4 Test in Browser
- Open browser to `http://your-ec2-public-ip/`
- Test all features (Apply Now, Mentor Application, etc.)

---

## Step 16: Set Up SSL Certificate (Optional)

### 16.1 Get SSL Certificate
```bash
sudo certbot --nginx -d your-domain.com
```

### 16.2 Test SSL
```bash
curl https://your-domain.com
```

### 16.3 Set Up Auto-renewal
```bash
sudo crontab -e
```

### 16.4 Add Renewal Cron Job
```bash
0 12 * * * /usr/bin/certbot renew --quiet
```

---

## Step 17: Create Monitoring Scripts

### 17.1 Create Monitor Script
```bash
nano /home/ubuntu/monitor.sh
```

### 17.2 Add Monitor Script Content
```bash
#!/bin/bash
echo "=== TechAcademy System Status ==="
echo "Date: $(date)"
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
```

### 17.3 Make Script Executable
```bash
chmod +x /home/ubuntu/monitor.sh
```

### 17.4 Test Monitor Script
```bash
./monitor.sh
```

---

## Step 18: Create Backup Script

### 18.1 Create Backup Script
```bash
nano /home/ubuntu/backup.sh
```

### 18.2 Add Backup Script Content
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

### 18.3 Make Script Executable
```bash
chmod +x /home/ubuntu/backup.sh
```

### 18.4 Test Backup Script
```bash
./backup.sh
```

---

## Step 19: Create Update Script

### 19.1 Create Update Script
```bash
nano /home/ubuntu/update.sh
```

### 19.2 Add Update Script Content
```bash
#!/bin/bash
echo "Starting system update..."

# Update system packages
sudo apt update && sudo apt upgrade -y
sudo apt autoremove -y
sudo apt autoclean

# Update Node.js packages
cd /home/ubuntu/techacademy
npm update

# Rebuild application
npm run build

# Restart application
pm2 restart techacademy-web

echo "System update completed successfully"
```

### 19.3 Make Script Executable
```bash
chmod +x /home/ubuntu/update.sh
```

### 19.4 Test Update Script
```bash
./update.sh
```

---

## Step 20: Set Up Automated Tasks

### 20.1 Edit Crontab
```bash
crontab -e
```

### 20.2 Add Cron Jobs
```bash
# Daily backup at 2 AM
0 2 * * * /home/ubuntu/backup.sh

# Weekly system update at 3 AM on Sunday
0 3 * * 0 /home/ubuntu/update.sh

# PM2 log rotation (daily at 1 AM)
0 1 * * * pm2 flush
```

---

## Step 21: Create Deployment Script

### 21.1 Create Deployment Script
```bash
nano /home/ubuntu/deploy.sh
```

### 21.2 Add Deployment Script Content
```bash
#!/bin/bash
echo "Starting deployment..."

# Navigate to application directory
cd /home/ubuntu/techacademy

# Pull latest changes (if using git)
# git pull origin main

# Install dependencies
npm install

# Build application
npm run build

# Restart PM2 process
pm2 restart techacademy-web

# Check status
pm2 status

echo "Deployment completed successfully"
```

### 21.3 Make Script Executable
```bash
chmod +x /home/ubuntu/deploy.sh
```

### 21.4 Test Deployment Script
```bash
./deploy.sh
```

---

## Step 22: Final Testing and Verification

### 22.1 Test All Application Features
1. **Homepage**: `http://your-ec2-public-ip/`
2. **Apply Now**: `http://your-ec2-public-ip/apply`
3. **Mentor Application**: `http://your-ec2-public-ip/mentor-application`
4. **All Navigation**: Test all menu items
5. **Forms**: Test form submissions
6. **Responsive Design**: Test on mobile/tablet

### 22.2 Performance Testing
```bash
# Install Apache Bench
sudo apt install apache2-utils -y

# Test performance
ab -n 100 -c 10 http://your-ec2-public-ip/
```

### 22.3 Security Testing
```bash
# Check open ports
sudo netstat -tlnp

# Check firewall status
sudo ufw status

# Check SSL (if configured)
openssl s_client -connect your-domain.com:443
```

---

## Step 23: Maintenance and Monitoring

### 23.1 Daily Checks
```bash
# Check PM2 status
pm2 status

# Check application health
curl http://localhost:3000

# Check system resources
./monitor.sh
```

### 23.2 Weekly Maintenance
```bash
# Run system updates
./update.sh

# Check backup status
ls -la /home/ubuntu/backups/

# Review PM2 logs
pm2 logs techacademy-web --lines 50
```

### 23.3 Monthly Tasks
```bash
# Check SSL certificate expiry
sudo certbot certificates

# Review system logs
sudo journalctl -u nginx --since "1 month ago"

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
# Check PM2 status
pm2 status
# Check PM2 logs
pm2 logs techacademy-web
# Check if build directory exists
ls -la /home/ubuntu/techacademy/build
```

### Issue 3: 502 Bad Gateway
**Solution:**
```bash
# Check if application is running
curl http://localhost:3000
# Check PM2 status
pm2 status
# Check Nginx configuration
sudo nginx -t
# Restart services
sudo systemctl restart nginx
pm2 restart techacademy-web
```

### Issue 4: Permission Denied
**Solution:**
```bash
# Fix file permissions
chmod +x *.sh
chmod 644 package*.json
# Check directory permissions
ls -la /home/ubuntu/techacademy
```

### Issue 5: Build Failures
**Solution:**
```bash
# Check Node.js version
node --version
# Clear npm cache
npm cache clean --force
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## Quick Reference Commands

### Connection
```bash
ssh -i your-key-pair.pem ubuntu@your-ec2-public-ip
```

### PM2 Commands
```bash
pm2 status
pm2 logs techacademy-web
pm2 restart techacademy-web
pm2 stop techacademy-web
pm2 start techacademy-web
pm2 delete techacademy-web
```

### Nginx Commands
```bash
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl restart nginx
sudo systemctl status nginx
sudo nginx -t
```

### Application Commands
```bash
# Build application
npm run build

# Start with PM2
pm2 start ecosystem.config.js

# Check logs
pm2 logs techacademy-web

# Restart application
pm2 restart techacademy-web
```

### Monitoring
```bash
./monitor.sh
curl http://localhost:3000
pm2 status
```

### Backup
```bash
./backup.sh
ls -la /home/ubuntu/backups/
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

This guide provides a complete Node.js deployment without Docker, giving you direct control over the Node.js environment and easier debugging capabilities!
