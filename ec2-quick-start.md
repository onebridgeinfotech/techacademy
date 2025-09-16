# TechAcademy EC2 Quick Start Guide

## 🚀 Quick Deployment to EC2 Instance

### Prerequisites
- AWS Account
- EC2 instance running Ubuntu 22.04 LTS
- SSH access to EC2 instance
- Your application files ready

---

## Step 1: Create EC2 Instance

### 1.1 Launch Instance
1. Go to [AWS EC2 Console](https://console.aws.amazon.com/ec2/)
2. Click "Launch Instance"
3. Configure:
   - **Name**: `techacademy-web`
   - **AMI**: Ubuntu Server 22.04 LTS
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

## Step 2: Setup EC2 Instance

### 2.1 Connect to EC2
```bash
# Using Git Bash or WSL
ssh -i your-key-pair.pem ubuntu@your-ec2-public-ip
```

### 2.2 Run Setup Script
```bash
# Download and run setup script
wget https://raw.githubusercontent.com/your-repo/techacademy/main/ec2-setup.sh
chmod +x ec2-setup.sh
./ec2-setup.sh
```

### 2.3 Reboot (if prompted)
```bash
sudo reboot
```

---

## Step 3: Upload and Deploy Application

### 3.1 Update Upload Script
Edit `upload-to-ec2.sh` and update these values:
```bash
EC2_HOST="your-ec2-public-ip"
EC2_USER="ubuntu"
KEY_PATH="path/to/your-key-pair.pem"
```

### 3.2 Run Upload Script
```bash
# Make script executable
chmod +x upload-to-ec2.sh

# Upload and deploy
./upload-to-ec2.sh
```

---

## Step 4: Verify Deployment

### 4.1 Test Application
- **Homepage**: `http://your-ec2-public-ip/`
- **Health Check**: `http://your-ec2-public-ip/health`
- **Apply Now**: `http://your-ec2-public-ip/apply`
- **Mentor Application**: `http://your-ec2-public-ip/mentor-application`

### 4.2 Check Status
```bash
# SSH into EC2
ssh -i your-key-pair.pem ubuntu@your-ec2-public-ip

# Check service status
sudo systemctl status techacademy.service

# Check application logs
docker logs $(docker ps -q --filter ancestor=techacademy-web)

# Monitor system
./monitor.sh
```

---

## Step 5: Configure SSL (Optional)

### 5.1 Get SSL Certificate
```bash
# SSH into EC2
ssh -i your-key-pair.pem ubuntu@your-ec2-public-ip

# Get SSL certificate
sudo certbot --nginx -d your-domain.com
```

### 5.2 Test HTTPS
- **HTTPS URL**: `https://your-domain.com/`

---

## Quick Commands Reference

### Connection
```bash
# Connect to EC2
ssh -i your-key-pair.pem ubuntu@your-ec2-public-ip

# Upload files
scp -i your-key-pair.pem -r . ubuntu@your-ec2-public-ip:/home/ubuntu/techacademy/
```

### Service Management
```bash
# Check status
sudo systemctl status techacademy.service

# Start/stop/restart
sudo systemctl start techacademy.service
sudo systemctl stop techacademy.service
sudo systemctl restart techacademy.service

# View logs
docker logs $(docker ps -q --filter ancestor=techacademy-web)
```

### Monitoring
```bash
# System monitoring
./monitor.sh

# Check health
curl http://localhost:3000/health

# Check external access
curl http://your-ec2-public-ip/health
```

### Backup
```bash
# Manual backup
./backup.sh

# Check backups
ls -la /home/ubuntu/backups/
```

---

## Troubleshooting

### Common Issues

#### 1. Connection Refused
```bash
# Check security groups
# Ensure port 22 (SSH) is open for your IP
# Ensure port 80 (HTTP) is open for 0.0.0.0/0
```

#### 2. Application Not Starting
```bash
# Check service status
sudo systemctl status techacademy.service

# Check Docker logs
docker logs $(docker ps -q --filter ancestor=techacademy-web)

# Check Nginx
sudo systemctl status nginx
```

#### 3. 502 Bad Gateway
```bash
# Check if application is running
curl http://localhost:3000/health

# Check Nginx configuration
sudo nginx -t

# Restart services
sudo systemctl restart nginx
sudo systemctl restart techacademy.service
```

#### 4. Permission Issues
```bash
# Fix Docker permissions
sudo usermod -aG docker ubuntu
# Log out and back in

# Fix file permissions
chmod +x *.sh
chmod 644 package*.json
```

---

## Cost Optimization

### Free Tier Usage
- **t2.micro**: 750 hours/month free
- **EBS Storage**: 30 GB free
- **Data Transfer**: 1 GB free

### Cost Monitoring
```bash
# Check instance usage
aws ec2 describe-instances --instance-ids your-instance-id

# Monitor costs in AWS Billing Dashboard
```

---

## Security Best Practices

### 1. Firewall Configuration
```bash
# Check UFW status
sudo ufw status

# Allow only necessary ports
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
```

### 2. Regular Updates
```bash
# Run update script
./update.sh

# Check for security updates
sudo apt list --upgradable
```

### 3. Backup Strategy
```bash
# Automated daily backups
crontab -l

# Manual backup
./backup.sh
```

---

## Scaling Options

### 1. Vertical Scaling
- Upgrade instance type (t2.micro → t3.small → t3.medium)

### 2. Horizontal Scaling
- Create Auto Scaling Group
- Use Application Load Balancer
- Set up multiple instances

### 3. Database Scaling
- Use RDS for database needs
- Implement caching with ElastiCache

---

## Monitoring and Alerts

### 1. CloudWatch Integration
```bash
# Install CloudWatch agent
wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i amazon-cloudwatch-agent.deb
```

### 2. Custom Monitoring
```bash
# Use monitoring script
./monitor.sh

# Set up alerts
# Configure CloudWatch alarms
```

---

## Support and Maintenance

### Daily Tasks
- Check application health
- Monitor system resources
- Review logs for errors

### Weekly Tasks
- Run system updates
- Check backup status
- Review security logs

### Monthly Tasks
- Review costs and usage
- Update SSL certificates
- Test disaster recovery

---

This quick start guide provides everything you need to deploy your TechAcademy application on EC2 with minimal configuration!
