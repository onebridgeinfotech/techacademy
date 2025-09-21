# TechAcademy - One-Click Deployment

## 🚀 Quick Start

Deploy TechAcademy to AWS with a single command:

```bash
# Development
./scripts/quick-deploy.sh dev

# Production
./scripts/quick-deploy.sh prod
```

## 📋 Prerequisites

1. **Install Tools:**
   ```bash
   make install
   ```

2. **Configure AWS:**
   ```bash
   aws configure
   ```

3. **Create SSH Key:**
   ```bash
   ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa
   ```

## 🏗️ Architecture

- **Frontend:** React + TypeScript + Tailwind CSS
- **Backend:** Node.js + Express + PostgreSQL
- **Infrastructure:** AWS (EC2, RDS, S3, ALB)
- **Orchestration:** Terraform + Ansible
- **CI/CD:** GitHub Actions

## 🔧 Commands

### Quick Commands
```bash
make quick-dev      # Deploy to development
make quick-prod     # Deploy to production
make status         # Check status
make logs           # View logs
make destroy        # Destroy infrastructure
```

### Detailed Commands
```bash
make deploy-infra ENVIRONMENT=dev    # Deploy infrastructure
make ansible-deploy ENVIRONMENT=dev  # Deploy application
make health ENVIRONMENT=dev          # Health check
make ssh ENVIRONMENT=dev             # SSH to server
```

## 🔄 CI/CD

GitHub Actions automatically:
- ✅ Runs tests and security scans
- ✅ Deploys to development on push to `develop`
- ✅ Deploys to staging on push to `main`
- ✅ Deploys to production on manual trigger

## 📊 Monitoring

- **Health Checks:** Automated monitoring
- **Logs:** Centralized logging
- **Metrics:** Performance monitoring
- **Alerts:** Automated notifications

## 🔒 Security

- **SSL/TLS:** Automatic certificate management
- **Security Groups:** Restrictive firewall rules
- **Encryption:** Data encryption at rest and in transit
- **Access Control:** Role-based access control

## 📞 Support

- **Documentation:** [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- **Issues:** GitHub Issues
- **Email:** dev@techacademy.com

---

**Ready to deploy? Run `./scripts/quick-deploy.sh dev` to get started!**




