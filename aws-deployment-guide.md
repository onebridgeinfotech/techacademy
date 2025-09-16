# TechAcademy AWS Deployment Guide

## 🚀 Complete Procedure to Deploy TechAcademy on AWS

### Prerequisites
- AWS Account
- AWS CLI installed and configured
- Docker installed on your local machine
- Git installed

---

## Step 1: Prepare Your Application

### 1.1 Update package.json for Production
```json
{
  "name": "techacademy",
  "version": "1.0.0",
  "homepage": ".",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

### 1.2 Test Docker Build Locally
```bash
# Build the Docker image
docker build -t techacademy-web .

# Test the container locally
docker run -p 3000:80 techacademy-web

# Test with docker-compose
docker-compose up --build
```

---

## Step 2: AWS Setup Options

### Option A: AWS App Runner (Recommended - Easiest)

#### 2.1 Create ECR Repository
```bash
# Create ECR repository
aws ecr create-repository --repository-name techacademy-web --region us-east-1

# Get login token
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
```

#### 2.2 Build and Push Image
```bash
# Build image
docker build -t techacademy-web .

# Tag image
docker tag techacademy-web:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/techacademy-web:latest

# Push image
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/techacademy-web:latest
```

#### 2.3 Create App Runner Service
1. Go to AWS App Runner console
2. Click "Create service"
3. Choose "Container registry"
4. Select your ECR repository
5. Configure service:
   - Service name: `techacademy-web`
   - Virtual CPU: 0.25 vCPU
   - Virtual memory: 0.5 GB
   - Port: 80
6. Create service

### Option B: AWS Elastic Beanstalk

#### 2.1 Install EB CLI
```bash
pip install awsebcli
```

#### 2.2 Initialize Elastic Beanstalk
```bash
eb init techacademy-web --platform docker --region us-east-1
```

#### 2.3 Create Environment
```bash
eb create techacademy-prod
```

#### 2.4 Deploy
```bash
eb deploy
```

### Option C: AWS ECS with Fargate

#### 2.1 Create ECS Cluster
```bash
aws ecs create-cluster --cluster-name techacademy-cluster
```

#### 2.2 Create Task Definition
```json
{
  "family": "techacademy-task",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::<account-id>:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "techacademy-web",
      "image": "<account-id>.dkr.ecr.us-east-1.amazonaws.com/techacademy-web:latest",
      "portMappings": [
        {
          "containerPort": 80,
          "protocol": "tcp"
        }
      ],
      "essential": true,
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/techacademy",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

---

## Step 3: Domain and SSL Setup

### 3.1 Route 53 (Optional)
1. Register domain in Route 53
2. Create hosted zone
3. Update nameservers

### 3.2 SSL Certificate
1. Request certificate in AWS Certificate Manager
2. Validate domain ownership
3. Attach to load balancer or App Runner

---

## Step 4: Environment Configuration

### 4.1 Create Environment Variables
```bash
# For production
export NODE_ENV=production
export REACT_APP_API_URL=https://api.techacademy.com
export REACT_APP_ENVIRONMENT=production
```

### 4.2 Update Dockerfile for Environment Variables
```dockerfile
# Add to Dockerfile
ENV NODE_ENV=production
ENV REACT_APP_API_URL=https://api.techacademy.com
```

---

## Step 5: Monitoring and Logging

### 5.1 CloudWatch Logs
```bash
# Create log group
aws logs create-log-group --log-group-name /aws/apprunner/techacademy-web
```

### 5.2 CloudWatch Alarms
- Set up CPU and memory monitoring
- Configure alerts for high usage

---

## Step 6: CI/CD Pipeline (Optional)

### 6.1 GitHub Actions
```yaml
name: Deploy to AWS

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v1
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1
    
    - name: Login to Amazon ECR
      id: login-ecr
      uses: aws-actions/amazon-ecr-login@v1
    
    - name: Build, tag, and push image
      env:
        ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
        ECR_REPOSITORY: techacademy-web
        IMAGE_TAG: ${{ github.sha }}
      run: |
        docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
        docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
```

---

## Step 7: Security Best Practices

### 7.1 IAM Roles
- Create specific IAM roles for deployment
- Use least privilege principle
- Enable MFA for production accounts

### 7.2 Security Groups
- Restrict access to necessary ports only
- Use VPC for network isolation

### 7.3 Secrets Management
- Use AWS Secrets Manager for sensitive data
- Never commit secrets to code

---

## Step 8: Cost Optimization

### 8.1 App Runner Pricing
- Pay per use model
- Automatic scaling
- No idle costs

### 8.2 ECS Fargate Pricing
- Pay for vCPU and memory used
- Consider Reserved Instances for predictable workloads

---

## Step 9: Backup and Disaster Recovery

### 9.1 ECR Image Backup
- Images are automatically backed up
- Consider cross-region replication

### 9.2 Application Data
- Use RDS for database needs
- Enable automated backups

---

## Step 10: Testing and Validation

### 10.1 Health Checks
```bash
# Test health endpoint
curl https://your-app-url.com/health
```

### 10.2 Load Testing
- Use AWS Load Testing service
- Test with realistic traffic patterns

---

## Quick Start Commands

### Local Testing
```bash
# Build and test locally
docker build -t techacademy-web .
docker run -p 3000:80 techacademy-web

# Test with docker-compose
docker-compose up --build
```

### AWS Deployment (App Runner)
```bash
# 1. Create ECR repository
aws ecr create-repository --repository-name techacademy-web --region us-east-1

# 2. Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# 3. Build and push
docker build -t techacademy-web .
docker tag techacademy-web:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/techacademy-web:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/techacademy-web:latest

# 4. Create App Runner service (via AWS Console)
```

---

## Estimated Costs (Monthly)

### App Runner
- Small service: ~$25-50/month
- Medium service: ~$50-100/month

### ECS Fargate
- 0.25 vCPU, 0.5GB: ~$15-30/month
- 0.5 vCPU, 1GB: ~$30-60/month

### Additional Services
- Route 53: $0.50/zone + $0.40/million queries
- Certificate Manager: Free
- CloudWatch: $0.50/GB logs

---

## Support and Troubleshooting

### Common Issues
1. **Build failures**: Check Dockerfile syntax
2. **Permission errors**: Verify IAM roles
3. **Network issues**: Check security groups
4. **SSL issues**: Verify certificate configuration

### Useful Commands
```bash
# Check ECS service status
aws ecs describe-services --cluster techacademy-cluster --services techacademy-service

# View App Runner logs
aws apprunner describe-service --service-arn <service-arn>

# Check ECR images
aws ecr list-images --repository-name techacademy-web
```

This guide provides multiple deployment options. Choose the one that best fits your needs and budget!
