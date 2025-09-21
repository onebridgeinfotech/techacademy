#!/bin/bash

# TechAcademy Quick Deploy Script
# One-command deployment for different environments

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[QUICK-DEPLOY]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Function to show usage
show_usage() {
    echo "TechAcademy Quick Deploy"
    echo "======================="
    echo ""
    echo "Usage: $0 [ENVIRONMENT]"
    echo ""
    echo "Environments:"
    echo "  dev       Deploy to development (default)"
    echo "  staging   Deploy to staging"
    echo "  prod      Deploy to production"
    echo ""
    echo "Examples:"
    echo "  $0 dev     Deploy to development"
    echo "  $0 prod    Deploy to production"
    echo ""
}

# Default environment
ENVIRONMENT=${1:-dev}

# Validate environment
if [[ ! "$ENVIRONMENT" =~ ^(dev|staging|prod)$ ]]; then
    echo "Invalid environment: $ENVIRONMENT"
    show_usage
    exit 1
fi

print_status "Starting quick deployment to $ENVIRONMENT..."

# Run the main deployment script
./scripts/deploy.sh -e "$ENVIRONMENT" -v

print_success "Quick deployment to $ENVIRONMENT completed!"




