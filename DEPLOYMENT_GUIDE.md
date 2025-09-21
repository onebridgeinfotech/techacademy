# TechAcademy - Complete Deployment Guide

## 🚀 One-Click Automated Deployment

This guide provides a complete automated deployment solution for TechAcademy using Terraform, Ansible, and GitHub Actions.

---

## 📋 Prerequisites

### Required Tools
- **Terraform** (v1.5.0+)
- **Ansible** (v2.12+)
- **AWS CLI** (v2.0+)
- **Git** (v2.30+)
- **Make** (v4.0+)
- **Node.js** (v18+)
- **Python** (v3.8+)

### AWS Requirements
- AWS Account with appropriate permissions
- AWS CLI configured with credentials
- SSH key pair for EC2 access
- S3 bucket for Terraform state (optional but recommended)

---

## 🏗️ Architecture Overview

### Infrastructure Components
```
┌─────────────────────────────────────────────────────────┐
│                    AWS Cloud                            │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐              │
│  │   EC2 Instance  │  │   EC2 Instance  │              │
│  │   (Web Server)  │  │   (Web Server)  │              │
│  └─────────────────┘  └─────────────────┘              │
│           │                     │                       │
│           └─────────┬───────────┘                       │
│                     │                                   │
│  ┌─────────────────┐│┌─────────────────┐               │
│  │ Application     │││ RDS PostgreSQL  │               │
│  │ Load Balancer   │││   Database      │               │
│  └─────────────────┘│└─────────────────┘               │
│                     │                                   │
│  ┌─────────────────┐│┌─────────────────┐               │
│  │   S3 Bucket     │││   VPC &         │               │
│  │  (File Storage) │││ Security Groups │               │
│  └─────────────────┘└─────────────────┘               │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack
- **Frontend:** React 18 + TypeScript + Tailwind CSS
- **Backend:** Node.js + Express + PostgreSQL
- **Infrastructure:** AWS (EC2, RDS, S3, ALB)
- **Orchestration:** Terraform + Ansible
- **CI/CD:** GitHub Actions
- **Monitoring:** PM2 + CloudWatch

---

## 🚀 Quick Start (One-Click Deployment)

### 1. Clone Repository
```bash
git clone https://github.com/your-org/techacademy.git
cd techacademy
```

### 2. Install Prerequisites
```bash
# Install required tools
make install

# Or install manually:
# macOS
brew install terraform ansible awscli

# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y terraform ansible awscli

# CentOS/RHEL
sudo yum install -y terraform ansible awscli
```

### 3. Configure AWS
```bash
# Configure AWS CLI
aws configure

# Create SSH key pair (if not exists)
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa
```

### 4. One-Click Deployment

#### Development Environment
```bash
# Quick deployment to development
./scripts/quick-deploy.sh dev

# Or using Makefile
make quick-dev
```

#### Production Environment
```bash
# Quick deployment to production
./scripts/quick-deploy.sh prod

# Or using Makefile
make quick-prod
```

---

## 🔧 Detailed Setup Instructions

### 1. Environment Configuration

#### Create Terraform Variables
```bash
# Copy example configuration
cp terraform/terraform.tfvars.example terraform/terraform.tfvars.dev
cp terraform/terraform.tfvars.example terraform/terraform.tfvars.prod

# Edit configuration files
vim terraform/terraform.tfvars.dev
vim terraform/terraform.tfvars.prod
```

#### Configure Environment Variables
```bash
# Copy example environment file
cp .env.example .env.dev
cp .env.example .env.prod

# Edit environment files
vim .env.dev
vim .env.prod
```

### 2. Infrastructure Deployment

#### Using Makefile
```bash
# Deploy infrastructure only
make deploy-infra ENVIRONMENT=dev

# Deploy complete stack
make deploy-dev
```

#### Using Scripts
```bash
# Deploy with custom options
./scripts/deploy.sh -e dev -v

# Deploy infrastructure only
./scripts/deploy.sh -e dev -a

# Deploy application only
./scripts/deploy.sh -e dev -s
```

### 3. Manual Deployment Steps

#### Step 1: Deploy Infrastructure
```bash
cd terraform
terraform init
terraform plan -var-file="terraform.tfvars.dev"
terraform apply -var-file="terraform.tfvars.dev"
```

#### Step 2: Generate Ansible Inventory
```bash
cd terraform
terraform output -json > ../ansible/inventory.json
cd ../ansible
python3 scripts/generate_inventory.py
```

#### Step 3: Deploy Application
```bash
cd ansible
ansible-playbook -i inventory/hosts playbooks/site.yml --extra-vars "environment=dev"
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

#### 1. Main CI/CD Pipeline (`.github/workflows/ci-cd.yml`)
- **Triggers:** Push to main/develop, Pull requests, Manual dispatch
- **Jobs:**
  - Test and Build
  - Security Scan
  - Deploy to Development
  - Deploy to Staging
  - Deploy to Production

#### 2. Security Scan (`.github/workflows/security.yml`)
- **Triggers:** Scheduled (weekly), Push, Pull requests
- **Scans:** npm audit, Snyk, CodeQL

#### 3. Terraform (`.github/workflows/terraform.yml`)
- **Triggers:** Changes to terraform/, Manual dispatch
- **Actions:** Plan, Apply, Destroy

### Required GitHub Secrets
```bash
# AWS Credentials
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY

# Security
SNYK_TOKEN

# Notifications
SLACK_WEBHOOK_URL
```

### Manual Deployment via GitHub Actions
1. Go to GitHub Actions tab
2. Select "TechAcademy CI/CD Pipeline"
3. Click "Run workflow"
4. Choose environment (dev/staging/prod)
5. Click "Run workflow"

---

## 🛠️ Management Commands

### Application Management
```bash
# Check application status
make status ENVIRONMENT=dev

# View logs
make logs ENVIRONMENT=dev

# Restart application
make restart ENVIRONMENT=dev

# Update application
make update ENVIRONMENT=dev
```

### Database Management
```bash
# Backup database
make db-backup ENVIRONMENT=dev

# Restore database
make db-restore ENVIRONMENT=dev BACKUP_FILE=backup.sql
```

### Infrastructure Management
```bash
# Show deployment info
make info ENVIRONMENT=dev

# SSH into server
make ssh ENVIRONMENT=dev

# Destroy infrastructure
make destroy ENVIRONMENT=dev
```

### Monitoring
```bash
# Health check
make health ENVIRONMENT=dev

# Start monitoring
make monitor ENVIRONMENT=dev

# Security scan
make security-scan ENVIRONMENT=dev
```

---

## 🔒 Security Configuration

### SSL/TLS Setup
```bash
# Setup SSL certificates
make ssl-setup ENVIRONMENT=prod

# Or manually with Let's Encrypt
sudo certbot --nginx -d yourdomain.com
```

### Security Hardening
```bash
# Run security scan
make security-scan ENVIRONMENT=prod

# Update security groups
# Edit terraform/security_groups.tf
```

### Environment-Specific Security
- **Development:** Relaxed security for testing
- **Staging:** Production-like security
- **Production:** Maximum security with monitoring

---

## 📊 Monitoring and Logging

### Application Monitoring
- **PM2:** Process management and monitoring
- **Health Checks:** Automated health monitoring
- **Log Rotation:** Automated log management
- **Metrics:** Performance and usage metrics

### Infrastructure Monitoring
- **CloudWatch:** AWS resource monitoring
- **Custom Metrics:** Application-specific metrics
- **Alerts:** Automated alerting system

### Log Management
```bash
# View application logs
make logs ENVIRONMENT=dev

# View system logs
ssh ubuntu@server-ip
sudo journalctl -u techacademy -f

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## 🔧 Troubleshooting

### Common Issues

#### 1. Terraform Issues
```bash
# Reinitialize Terraform
cd terraform
rm -rf .terraform
terraform init

# Fix state issues
terraform refresh
terraform plan
```

#### 2. Ansible Issues
```bash
# Test connectivity
ansible all -i inventory/hosts -m ping

# Run with verbose output
ansible-playbook -i inventory/hosts playbooks/site.yml -v

# Check specific task
ansible-playbook -i inventory/hosts playbooks/site.yml --tags=application
```

#### 3. Application Issues
```bash
# Check application status
systemctl status techacademy

# Check PM2 status
pm2 status

# Restart application
pm2 restart techacademy-api

# View logs
pm2 logs techacademy-api
```

#### 4. Database Issues
```bash
# Check database connection
psql -h database-endpoint -U username -d database_name

# Check database status
systemctl status postgresql
```

### Debug Mode
```bash
# Enable debug mode
export DEBUG=true
export VERBOSE=true

# Run deployment with debug
./scripts/deploy.sh -e dev -v
```

---

## 📈 Scaling and Performance

### Horizontal Scaling
```bash
# Scale EC2 instances
# Edit terraform/variables.tf
# Change instance count
terraform apply
```

### Database Scaling
```bash
# Scale RDS instance
# Edit terraform/main.tf
# Change instance class
terraform apply
```

### Load Balancer Configuration
```bash
# Configure auto-scaling
# Edit terraform/autoscaling.tf
terraform apply
```

---

## 🔄 Backup and Recovery

### Automated Backups
- **Database:** Daily automated backups
- **Application:** Code repository backups
- **Configuration:** Infrastructure as Code backups

### Manual Backup
```bash
# Backup database
make db-backup ENVIRONMENT=prod

# Backup application files
tar -czf techacademy-backup-$(date +%Y%m%d).tar.gz /opt/techacademy
```

### Recovery Procedures
```bash
# Restore database
make db-restore ENVIRONMENT=prod BACKUP_FILE=backup.sql

# Restore application
git checkout main
make deploy-prod
```

---

## 🚀 Advanced Features

### Blue-Green Deployment
```bash
# Deploy to blue environment
make deploy-blue ENVIRONMENT=prod

# Switch traffic to blue
make switch-traffic ENVIRONMENT=prod

# Deploy to green environment
make deploy-green ENVIRONMENT=prod
```

### Canary Deployment
```bash
# Deploy canary version
make deploy-canary ENVIRONMENT=prod

# Monitor canary
make monitor-canary ENVIRONMENT=prod

# Promote canary
make promote-canary ENVIRONMENT=prod
```

### Multi-Environment Management
```bash
# Deploy to multiple environments
make deploy-all

# Update all environments
make update-all

# Health check all environments
make health-all
```

---

## 📞 Support and Maintenance

### Regular Maintenance Tasks
- **Weekly:** Security updates, dependency updates
- **Monthly:** Performance review, capacity planning
- **Quarterly:** Architecture review, disaster recovery testing

### Support Contacts
- **Development Team:** dev@techacademy.com
- **DevOps Team:** devops@techacademy.com
- **Emergency:** +1-555-TECH-HELP

### Documentation Updates
- Keep this guide updated with any changes
- Document new features and procedures
- Maintain troubleshooting guides

---

## 🎯 Best Practices

### Development
- Always test in development first
- Use feature branches for new development
- Write comprehensive tests
- Follow security best practices

### Deployment
- Use infrastructure as code
- Implement proper monitoring
- Have rollback procedures ready
- Test disaster recovery procedures

### Security
- Keep dependencies updated
- Use least privilege access
- Implement proper logging
- Regular security audits

---

## 📚 Additional Resources

### Documentation
- [Terraform Documentation](https://www.terraform.io/docs/)
- [Ansible Documentation](https://docs.ansible.com/)
- [AWS Documentation](https://docs.aws.amazon.com/)
- [React Documentation](https://reactjs.org/docs/)

### Tools
- [Terraform Cloud](https://app.terraform.io/)
- [Ansible Tower](https://www.ansible.com/products/tower)
- [AWS Console](https://console.aws.amazon.com/)
- [GitHub Actions](https://github.com/features/actions)

---

*This deployment guide provides a complete solution for automated deployment of TechAcademy. For questions or support, please contact the development team.*




