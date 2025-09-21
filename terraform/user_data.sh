#!/bin/bash

# TechAcademy EC2 User Data Script
# This script runs when the EC2 instance starts

set -e

# Update system
apt-get update -y
apt-get upgrade -y

# Install basic packages
apt-get install -y \
    curl \
    wget \
    git \
    unzip \
    software-properties-common \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install PM2 globally
npm install -g pm2

# Install Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Start and enable Docker
systemctl start docker
systemctl enable docker

# Add ubuntu user to docker group
usermod -aG docker ubuntu

# Install Nginx
apt-get install -y nginx

# Install PostgreSQL client
apt-get install -y postgresql-client

# Install AWS CLI v2
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
./aws/install
rm -rf aws awscliv2.zip

# Create application directory
mkdir -p /opt/techacademy
chown ubuntu:ubuntu /opt/techacademy

# Create logs directory
mkdir -p /var/log/techacademy
chown ubuntu:ubuntu /var/log/techacademy

# Create systemd service for TechAcademy
cat > /etc/systemd/system/techacademy.service << EOF
[Unit]
Description=TechAcademy Application
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/opt/techacademy
ExecStart=/usr/bin/pm2 start ecosystem.config.js --env ${environment}
Restart=always
RestartSec=10
Environment=NODE_ENV=${environment}
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
EOF

# Enable the service
systemctl enable techacademy.service

# Create PM2 ecosystem config
cat > /opt/techacademy/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'techacademy-api',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/techacademy/err.log',
    out_file: '/var/log/techacademy/out.log',
    log_file: '/var/log/techacademy/combined.log',
    time: true
  }]
};
EOF

chown ubuntu:ubuntu /opt/techacademy/ecosystem.config.js

# Create Nginx configuration
cat > /etc/nginx/sites-available/techacademy << 'EOF'
server {
    listen 80;
    server_name _;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;
    
    # Static files
    location /static/ {
        alias /opt/techacademy/build/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # API routes
    location /api/ {
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
    
    # React app
    location / {
        root /opt/techacademy/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    # Health check
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
EOF

# Enable the site
ln -sf /etc/nginx/sites-available/techacademy /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# Start and enable Nginx
systemctl start nginx
systemctl enable nginx

# Create deployment script
cat > /opt/techacademy/deploy.sh << 'EOF'
#!/bin/bash

set -e

echo "Starting deployment..."

# Pull latest code
cd /opt/techacademy
git pull origin main

# Install dependencies
npm ci --production

# Build the application
npm run build

# Restart the application
pm2 restart techacademy-api

echo "Deployment completed successfully!"
EOF

chmod +x /opt/techacademy/deploy.sh
chown ubuntu:ubuntu /opt/techacademy/deploy.sh

# Create log rotation configuration
cat > /etc/logrotate.d/techacademy << 'EOF'
/var/log/techacademy/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 644 ubuntu ubuntu
    postrotate
        systemctl reload techacademy.service
    endscript
}
EOF

# Set up log rotation
logrotate -f /etc/logrotate.d/techacademy

# Create monitoring script
cat > /opt/techacademy/monitor.sh << 'EOF'
#!/bin/bash

# Simple health check script
HEALTH_URL="http://localhost:3000/health"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $HEALTH_URL)

if [ $RESPONSE -eq 200 ]; then
    echo "Application is healthy"
    exit 0
else
    echo "Application health check failed with status: $RESPONSE"
    exit 1
fi
EOF

chmod +x /opt/techacademy/monitor.sh
chown ubuntu:ubuntu /opt/techacademy/monitor.sh

# Set up cron job for monitoring
echo "*/5 * * * * /opt/techacademy/monitor.sh" | crontab -u ubuntu -

# Create environment file template
cat > /opt/techacademy/.env.example << 'EOF'
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=techacademy
DB_USER=techacademy
DB_PASSWORD=your-password-here

# Application Configuration
NODE_ENV=production
PORT=3000
JWT_SECRET=your-jwt-secret-here

# AWS Configuration
AWS_REGION=us-west-2
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
S3_BUCKET=your-s3-bucket

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Payment Configuration
PAYMENT_GATEWAY_KEY=your-payment-key
PAYMENT_GATEWAY_SECRET=your-payment-secret
EOF

chown ubuntu:ubuntu /opt/techacademy/.env.example

echo "User data script completed successfully!"

