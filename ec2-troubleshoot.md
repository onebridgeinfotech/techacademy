# EC2 Frontend Deployment Troubleshooting Guide

## Quick Fix Commands

### 1. Check if your app is running
```bash
ssh -i ~/.ssh/your-key.pem ubuntu@YOUR_EC2_IP
ps aux | grep serve
```

### 2. Check AWS Security Groups
Make sure your EC2 security group allows:
- **HTTP (port 80)** - Inbound from 0.0.0.0/0
- **HTTPS (port 443)** - Inbound from 0.0.0.0/0
- **SSH (port 22)** - Inbound from your IP

### 3. Manual Deployment Steps

#### Step 1: Upload build files to EC2
```bash
# From your local machine
scp -r build/ ubuntu@YOUR_EC2_IP:/home/ubuntu/techacademy/
```

#### Step 2: Connect to EC2 and deploy
```bash
ssh -i ~/.ssh/your-key.pem ubuntu@YOUR_EC2_IP

# Install serve globally
sudo npm install -g serve

# Stop any existing processes
sudo pkill -f "serve -s build" || true

# Start the application
cd /home/ubuntu/techacademy
nohup serve -s build -l 80 > app.log 2>&1 &

# Check if it's running
ps aux | grep serve
```

#### Step 3: Verify deployment
```bash
# Check if port 80 is listening
sudo netstat -tlnp | grep :80

# Check application logs
tail -f app.log

# Test locally on EC2
curl http://localhost
```

## Common Issues & Solutions

### Issue 1: "Connection refused" or "This site can't be reached"
**Solution:**
```bash
# Check security groups in AWS Console
# Ensure port 80 is open for 0.0.0.0/0

# Check if app is running
ps aux | grep serve

# If not running, start it:
cd /home/ubuntu/techacademy
nohup serve -s build -l 80 > app.log 2>&1 &
```

### Issue 2: "Permission denied" errors
**Solution:**
```bash
# Fix permissions
sudo chown -R ubuntu:ubuntu /home/ubuntu/techacademy/
chmod +x /home/ubuntu/techacademy/build/static/js/*
```

### Issue 3: Port 80 already in use
**Solution:**
```bash
# Find what's using port 80
sudo lsof -i :80

# Kill the process
sudo kill -9 <PID>

# Or use a different port
serve -s build -l 3000
```

### Issue 4: Nginx conflicts
**Solution:**
```bash
# Stop Nginx
sudo systemctl stop nginx
sudo systemctl disable nginx

# Or configure Nginx to serve your React app
sudo nano /etc/nginx/sites-available/techacademy
```

## Nginx Configuration (Alternative)

If you prefer using Nginx instead of serve:

```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/techacademy
```

Add this configuration:
```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    
    root /home/ubuntu/techacademy/build;
    index index.html;
    
    server_name _;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/techacademy /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

## Quick Health Check

Run this command to check everything:
```bash
ssh -i ~/.ssh/your-key.pem ubuntu@YOUR_EC2_IP << 'EOF'
echo "=== System Status ==="
echo "Uptime: $(uptime)"
echo ""
echo "=== Port Status ==="
sudo netstat -tlnp | grep :80
echo ""
echo "=== Process Status ==="
ps aux | grep serve
echo ""
echo "=== App Logs (last 10 lines) ==="
tail -10 /home/ubuntu/techacademy/app.log
echo ""
echo "=== Test Local Connection ==="
curl -I http://localhost
EOF
```

## Emergency Reset

If nothing works, reset everything:
```bash
ssh -i ~/.ssh/your-key.pem ubuntu@YOUR_EC2_IP << 'EOF'
# Kill all processes
sudo pkill -f serve
sudo pkill -f nginx

# Remove old files
rm -rf /home/ubuntu/techacademy/build

# Upload new build (run from your local machine)
# scp -r build/ ubuntu@YOUR_EC2_IP:/home/ubuntu/techacademy/

# Start fresh
cd /home/ubuntu/techacademy
nohup serve -s build -l 80 > app.log 2>&1 &

# Check status
sleep 3
ps aux | grep serve
curl http://localhost
EOF
```
