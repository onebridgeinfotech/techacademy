#!/bin/bash

# TechAcademy One-Click Deployment Script
# This script provides a complete automated deployment solution

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
ENVIRONMENT="dev"
AWS_REGION="us-west-2"
PROJECT_NAME="techacademy"
TERRAFORM_DIR="terraform"
ANSIBLE_DIR="ansible"
SKIP_INFRA=false
SKIP_APP=false
VERBOSE=false

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to show usage
show_usage() {
    echo "TechAcademy One-Click Deployment Script"
    echo "======================================"
    echo ""
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -e, --environment ENV    Environment to deploy (dev, staging, prod) [default: dev]"
    echo "  -r, --region REGION      AWS region [default: us-west-2]"
    echo "  -s, --skip-infra         Skip infrastructure deployment"
    echo "  -a, --skip-app           Skip application deployment"
    echo "  -v, --verbose            Enable verbose output"
    echo "  -h, --help               Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 -e dev                Deploy to development"
    echo "  $0 -e prod -v            Deploy to production with verbose output"
    echo "  $0 -e staging -s         Deploy only application to staging"
    echo ""
}

# Function to check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    local missing_tools=()
    
    # Check for required tools
    command -v terraform >/dev/null 2>&1 || missing_tools+=("terraform")
    command -v ansible >/dev/null 2>&1 || missing_tools+=("ansible")
    command -v aws >/dev/null 2>&1 || missing_tools+=("aws")
    command -v git >/dev/null 2>&1 || missing_tools+=("git")
    command -v make >/dev/null 2>&1 || missing_tools+=("make")
    
    if [ ${#missing_tools[@]} -ne 0 ]; then
        print_error "Missing required tools: ${missing_tools[*]}"
        print_status "Installing missing tools..."
        
        # Install missing tools based on OS
        if command -v brew >/dev/null 2>&1; then
            # macOS
            for tool in "${missing_tools[@]}"; do
                case $tool in
                    terraform) brew install terraform ;;
                    ansible) brew install ansible ;;
                    aws) brew install awscli ;;
                    git) brew install git ;;
                    make) brew install make ;;
                esac
            done
        elif command -v apt-get >/dev/null 2>&1; then
            # Ubuntu/Debian
            sudo apt-get update
            for tool in "${missing_tools[@]}"; do
                case $tool in
                    terraform) sudo apt-get install -y terraform ;;
                    ansible) sudo apt-get install -y ansible ;;
                    aws) sudo apt-get install -y awscli ;;
                    git) sudo apt-get install -y git ;;
                    make) sudo apt-get install -y make ;;
                esac
            done
        elif command -v yum >/dev/null 2>&1; then
            # CentOS/RHEL
            for tool in "${missing_tools[@]}"; do
                case $tool in
                    terraform) sudo yum install -y terraform ;;
                    ansible) sudo yum install -y ansible ;;
                    aws) sudo yum install -y awscli ;;
                    git) sudo yum install -y git ;;
                    make) sudo yum install -y make ;;
                esac
            done
        else
            print_error "Unsupported operating system. Please install the missing tools manually."
            exit 1
        fi
    fi
    
    print_success "All prerequisites are installed"
}

# Function to setup environment
setup_environment() {
    print_status "Setting up environment: $ENVIRONMENT"
    
    # Create terraform.tfvars if it doesn't exist
    if [ ! -f "$TERRAFORM_DIR/terraform.tfvars.$ENVIRONMENT" ]; then
        print_status "Creating terraform.tfvars.$ENVIRONMENT"
        cp "$TERRAFORM_DIR/terraform.tfvars.example" "$TERRAFORM_DIR/terraform.tfvars.$ENVIRONMENT"
        print_warning "Please edit $TERRAFORM_DIR/terraform.tfvars.$ENVIRONMENT with your configuration"
        read -p "Press Enter to continue after editing the file..."
    fi
    
    # Create .env file if it doesn't exist
    if [ ! -f ".env.$ENVIRONMENT" ]; then
        print_status "Creating .env.$ENVIRONMENT"
        cp ".env.example" ".env.$ENVIRONMENT"
        print_warning "Please edit .env.$ENVIRONMENT with your configuration"
        read -p "Press Enter to continue after editing the file..."
    fi
    
    print_success "Environment setup complete"
}

# Function to deploy infrastructure
deploy_infrastructure() {
    if [ "$SKIP_INFRA" = true ]; then
        print_warning "Skipping infrastructure deployment"
        return 0
    fi
    
    print_status "Deploying infrastructure for $ENVIRONMENT environment..."
    
    cd "$TERRAFORM_DIR"
    
    # Initialize Terraform
    print_status "Initializing Terraform..."
    terraform init
    
    # Plan Terraform changes
    print_status "Planning Terraform changes..."
    terraform plan -var-file="terraform.tfvars.$ENVIRONMENT" -out=tfplan
    
    # Apply Terraform changes
    print_status "Applying Terraform changes..."
    terraform apply tfplan
    
    # Output important values
    print_status "Infrastructure deployment complete. Key outputs:"
    terraform output
    
    cd ..
    print_success "Infrastructure deployment complete"
}

# Function to deploy application
deploy_application() {
    if [ "$SKIP_APP" = true ]; then
        print_warning "Skipping application deployment"
        return 0
    fi
    
    print_status "Deploying application for $ENVIRONMENT environment..."
    
    # Generate Ansible inventory
    print_status "Generating Ansible inventory..."
    cd "$TERRAFORM_DIR"
    terraform output -json > ../ansible/inventory.json
    cd ../ansible
    python3 scripts/generate_inventory.py
    
    # Deploy with Ansible
    print_status "Deploying application with Ansible..."
    ansible-playbook -i inventory/hosts playbooks/site.yml \
        --extra-vars "environment=$ENVIRONMENT" \
        $([ "$VERBOSE" = true ] && echo "-v" || echo "")
    
    cd ..
    print_success "Application deployment complete"
}

# Function to run health checks
run_health_checks() {
    print_status "Running health checks..."
    
    cd "$ANSIBLE_DIR"
    
    # Check application health
    ansible all -i inventory/hosts -m uri -a "url=http://localhost:3000/health method=GET"
    
    # Check service status
    ansible all -i inventory/hosts -m systemd -a "name=$PROJECT_NAME state=started"
    
    cd ..
    print_success "Health checks completed"
}

# Function to show deployment info
show_deployment_info() {
    print_status "Deployment Information"
    echo "========================"
    echo "Environment: $ENVIRONMENT"
    echo "AWS Region: $AWS_REGION"
    echo "Project: $PROJECT_NAME"
    echo ""
    
    cd "$TERRAFORM_DIR"
    echo "Application URLs:"
    terraform output load_balancer_dns
    echo ""
    echo "Database Endpoint:"
    terraform output database_endpoint
    cd ..
}

# Function to cleanup
cleanup() {
    print_status "Cleaning up temporary files..."
    rm -f "$TERRAFORM_DIR/tfplan"
    rm -f "$ANSIBLE_DIR/inventory.json"
    rm -f "$ANSIBLE_DIR/inventory/hosts"
    print_success "Cleanup complete"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -e|--environment)
            ENVIRONMENT="$2"
            shift 2
            ;;
        -r|--region)
            AWS_REGION="$2"
            shift 2
            ;;
        -s|--skip-infra)
            SKIP_INFRA=true
            shift
            ;;
        -a|--skip-app)
            SKIP_APP=true
            shift
            ;;
        -v|--verbose)
            VERBOSE=true
            shift
            ;;
        -h|--help)
            show_usage
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            show_usage
            exit 1
            ;;
    esac
done

# Validate environment
if [[ ! "$ENVIRONMENT" =~ ^(dev|staging|prod)$ ]]; then
    print_error "Invalid environment: $ENVIRONMENT. Must be dev, staging, or prod."
    exit 1
fi

# Main deployment flow
main() {
    print_status "Starting TechAcademy deployment..."
    print_status "Environment: $ENVIRONMENT"
    print_status "AWS Region: $AWS_REGION"
    echo ""
    
    # Check prerequisites
    check_prerequisites
    
    # Setup environment
    setup_environment
    
    # Deploy infrastructure
    deploy_infrastructure
    
    # Deploy application
    deploy_application
    
    # Run health checks
    run_health_checks
    
    # Show deployment info
    show_deployment_info
    
    # Cleanup
    cleanup
    
    print_success "🎉 TechAcademy deployment completed successfully!"
    print_status "Your application is now running and accessible."
}

# Trap to cleanup on exit
trap cleanup EXIT

# Run main function
main "$@"




