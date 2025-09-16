#!/bin/bash

# TechAcademy AWS Deployment Script
# This script automates the deployment process to AWS

set -e

# Configuration
AWS_REGION="us-east-1"
ECR_REPOSITORY="techacademy-web"
SERVICE_NAME="techacademy-web"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting TechAcademy AWS Deployment${NC}"

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

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    print_error "AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install it first."
    exit 1
fi

# Check AWS credentials
if ! aws sts get-caller-identity &> /dev/null; then
    print_error "AWS credentials not configured. Please run 'aws configure' first."
    exit 1
fi

print_status "AWS credentials verified"

# Step 1: Create ECR repository if it doesn't exist
echo -e "\n${YELLOW}📦 Creating ECR repository...${NC}"
if aws ecr describe-repositories --repository-names $ECR_REPOSITORY --region $AWS_REGION &> /dev/null; then
    print_status "ECR repository already exists"
else
    aws ecr create-repository --repository-name $ECR_REPOSITORY --region $AWS_REGION
    print_status "ECR repository created"
fi

# Step 2: Login to ECR
echo -e "\n${YELLOW}🔐 Logging in to ECR...${NC}"
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
print_status "Logged in to ECR"

# Step 3: Build Docker image
echo -e "\n${YELLOW}🔨 Building Docker image...${NC}"
docker build -t $ECR_REPOSITORY .
print_status "Docker image built successfully"

# Step 4: Tag image
echo -e "\n${YELLOW}🏷️  Tagging image...${NC}"
docker tag $ECR_REPOSITORY:latest $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:latest
docker tag $ECR_REPOSITORY:latest $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:$(date +%Y%m%d-%H%M%S)
print_status "Image tagged"

# Step 5: Push image to ECR
echo -e "\n${YELLOW}📤 Pushing image to ECR...${NC}"
docker push $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:latest
docker push $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:$(date +%Y%m%d-%H%M%S)
print_status "Image pushed to ECR"

# Step 6: Create or update App Runner service
echo -e "\n${YELLOW}🚀 Setting up App Runner service...${NC}"

# Check if App Runner service exists
if aws apprunner list-services --region $AWS_REGION --query "ServiceSummaryList[?ServiceName=='$SERVICE_NAME']" --output text | grep -q $SERVICE_NAME; then
    print_status "App Runner service already exists"
    print_warning "Please update the service manually in the AWS Console to use the new image"
else
    print_warning "App Runner service does not exist. Please create it manually in the AWS Console:"
    echo -e "\n${YELLOW}📋 Manual Steps Required:${NC}"
    echo "1. Go to AWS App Runner Console"
    echo "2. Click 'Create service'"
    echo "3. Choose 'Container registry'"
    echo "4. Select repository: $ECR_REPOSITORY"
    echo "5. Use image: $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:latest"
    echo "6. Configure service settings:"
    echo "   - Service name: $SERVICE_NAME"
    echo "   - Virtual CPU: 0.25 vCPU"
    echo "   - Virtual memory: 0.5 GB"
    echo "   - Port: 80"
    echo "7. Create service"
fi

# Step 7: Clean up local images (optional)
read -p "Do you want to clean up local Docker images? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker rmi $ECR_REPOSITORY:latest
    docker rmi $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:latest
    print_status "Local images cleaned up"
fi

echo -e "\n${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "\n${YELLOW}📋 Next Steps:${NC}"
echo "1. Create App Runner service in AWS Console (if not exists)"
echo "2. Configure custom domain (optional)"
echo "3. Set up SSL certificate (optional)"
echo "4. Configure monitoring and alerts"
echo "5. Test the deployed application"

echo -e "\n${YELLOW}🔗 Useful Links:${NC}"
echo "- AWS App Runner Console: https://console.aws.amazon.com/apprunner/"
echo "- ECR Repository: https://console.aws.amazon.com/ecr/repositories"
echo "- CloudWatch Logs: https://console.aws.amazon.com/cloudwatch/home?region=$AWS_REGION#logsV2:"

print_status "Deployment script completed"
