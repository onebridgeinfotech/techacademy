# TechAcademy Automation Makefile
# One-click deployment and management commands

.PHONY: help install setup deploy dev prod clean destroy status logs

# Default target
help: ## Show this help message
	@echo "TechAcademy Automation Commands"
	@echo "=============================="
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "Quick Start:"
	@echo "  make setup-dev    - Set up development environment"
	@echo "  make deploy-dev   - Deploy to development"
	@echo "  make deploy-prod  - Deploy to production"
	@echo ""

# Variables
TERRAFORM_DIR := terraform
ANSIBLE_DIR := ansible
ENVIRONMENT ?= dev
AWS_REGION ?= us-west-2
PROJECT_NAME := techacademy

# Colors for output
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[0;33m
BLUE := \033[0;34m
NC := \033[0m # No Color

# Prerequisites check
check-prereqs: ## Check if required tools are installed
	@echo "$(BLUE)Checking prerequisites...$(NC)"
	@command -v terraform >/dev/null 2>&1 || { echo "$(RED)Error: terraform is not installed$(NC)"; exit 1; }
	@command -v ansible >/dev/null 2>&1 || { echo "$(RED)Error: ansible is not installed$(NC)"; exit 1; }
	@command -v aws >/dev/null 2>&1 || { echo "$(RED)Error: aws cli is not installed$(NC)"; exit 1; }
	@command -v make >/dev/null 2>&1 || { echo "$(RED)Error: make is not installed$(NC)"; exit 1; }
	@echo "$(GREEN)✅ All prerequisites are installed$(NC)"

# Install required tools
install: ## Install required tools (macOS/Linux)
	@echo "$(BLUE)Installing required tools...$(NC)"
	@if command -v brew >/dev/null 2>&1; then \
		echo "Installing with Homebrew..."; \
		brew install terraform ansible awscli; \
	elif command -v apt-get >/dev/null 2>&1; then \
		echo "Installing with apt-get..."; \
		sudo apt-get update && sudo apt-get install -y terraform ansible awscli; \
	elif command -v yum >/dev/null 2>&1; then \
		echo "Installing with yum..."; \
		sudo yum install -y terraform ansible awscli; \
	else \
		echo "$(RED)Error: No package manager found. Please install manually.$(NC)"; \
		exit 1; \
	fi
	@echo "$(GREEN)✅ Tools installed successfully$(NC)"

# Setup development environment
setup-dev: check-prereqs ## Set up development environment
	@echo "$(BLUE)Setting up development environment...$(NC)"
	@cp $(TERRAFORM_DIR)/terraform.tfvars.example $(TERRAFORM_DIR)/terraform.tfvars
	@echo "$(YELLOW)⚠️  Please edit $(TERRAFORM_DIR)/terraform.tfvars with your configuration$(NC)"
	@echo "$(GREEN)✅ Development environment setup complete$(NC)"

# Setup production environment
setup-prod: check-prereqs ## Set up production environment
	@echo "$(BLUE)Setting up production environment...$(NC)"
	@cp $(TERRAFORM_DIR)/terraform.tfvars.example $(TERRAFORM_DIR)/terraform.tfvars.prod
	@echo "$(YELLOW)⚠️  Please edit $(TERRAFORM_DIR)/terraform.tfvars.prod with your production configuration$(NC)"
	@echo "$(GREEN)✅ Production environment setup complete$(NC)"

# Terraform commands
terraform-init: ## Initialize Terraform
	@echo "$(BLUE)Initializing Terraform...$(NC)"
	@cd $(TERRAFORM_DIR) && terraform init
	@echo "$(GREEN)✅ Terraform initialized$(NC)"

terraform-plan: ## Plan Terraform changes
	@echo "$(BLUE)Planning Terraform changes...$(NC)"
	@cd $(TERRAFORM_DIR) && terraform plan -var-file="terraform.tfvars.$(ENVIRONMENT)" -out=tfplan
	@echo "$(GREEN)✅ Terraform plan created$(NC)"

terraform-apply: ## Apply Terraform changes
	@echo "$(BLUE)Applying Terraform changes...$(NC)"
	@cd $(TERRAFORM_DIR) && terraform apply -var-file="terraform.tfvars.$(ENVIRONMENT)" -auto-approve
	@echo "$(GREEN)✅ Terraform changes applied$(NC)"

terraform-destroy: ## Destroy Terraform infrastructure
	@echo "$(RED)⚠️  This will destroy all infrastructure!$(NC)"
	@read -p "Are you sure? (yes/no): " confirm && [ "$$confirm" = "yes" ]
	@cd $(TERRAFORM_DIR) && terraform destroy -var-file="terraform.tfvars.$(ENVIRONMENT)" -auto-approve
	@echo "$(GREEN)✅ Infrastructure destroyed$(NC)"

# Infrastructure deployment
deploy-infra: terraform-init terraform-plan terraform-apply ## Deploy infrastructure with Terraform
	@echo "$(GREEN)✅ Infrastructure deployment complete$(NC)"

# Ansible commands
ansible-setup: ## Setup Ansible inventory
	@echo "$(BLUE)Setting up Ansible inventory...$(NC)"
	@cd $(TERRAFORM_DIR) && terraform output -json > ../ansible/inventory.json
	@cd $(ANSIBLE_DIR) && python3 scripts/generate_inventory.py
	@echo "$(GREEN)✅ Ansible inventory created$(NC)"

ansible-deploy: ## Deploy application with Ansible
	@echo "$(BLUE)Deploying application with Ansible...$(NC)"
	@cd $(ANSIBLE_DIR) && ansible-playbook -i inventory/hosts playbooks/site.yml --extra-vars "environment=$(ENVIRONMENT)"
	@echo "$(GREEN)✅ Application deployment complete$(NC)"

# Complete deployment
deploy-dev: ENVIRONMENT=dev ## Deploy to development environment
deploy-dev: deploy-infra ansible-setup ansible-deploy
	@echo "$(GREEN)🎉 Development deployment complete!$(NC)"
	@echo "$(BLUE)Access your application at:$(NC)"
	@cd $(TERRAFORM_DIR) && terraform output load_balancer_dns

deploy-prod: ENVIRONMENT=prod ## Deploy to production environment
deploy-prod: deploy-infra ansible-setup ansible-deploy
	@echo "$(GREEN)🎉 Production deployment complete!$(NC)"
	@echo "$(BLUE)Access your application at:$(NC)"
	@cd $(TERRAFORM_DIR) && terraform output load_balancer_dns

# Application management
status: ## Check application status
	@echo "$(BLUE)Checking application status...$(NC)"
	@cd $(ANSIBLE_DIR) && ansible all -i inventory/hosts -m shell -a "systemctl status $(PROJECT_NAME) --no-pager"
	@echo "$(GREEN)✅ Status check complete$(NC)"

logs: ## View application logs
	@echo "$(BLUE)Viewing application logs...$(NC)"
	@cd $(ANSIBLE_DIR) && ansible all -i inventory/hosts -m shell -a "journalctl -u $(PROJECT_NAME) -f --no-pager"

restart: ## Restart application
	@echo "$(BLUE)Restarting application...$(NC)"
	@cd $(ANSIBLE_DIR) && ansible all -i inventory/hosts -m systemd -a "name=$(PROJECT_NAME) state=restarted"
	@echo "$(GREEN)✅ Application restarted$(NC)"

update: ## Update application code
	@echo "$(BLUE)Updating application...$(NC)"
	@cd $(ANSIBLE_DIR) && ansible all -i inventory/hosts -m shell -a "cd /opt/$(PROJECT_NAME) && ./deploy.sh"
	@echo "$(GREEN)✅ Application updated$(NC)"

# Database management
db-backup: ## Backup database
	@echo "$(BLUE)Backing up database...$(NC)"
	@cd $(ANSIBLE_DIR) && ansible all -i inventory/hosts -m shell -a "cd /opt/$(PROJECT_NAME) && ./backup.sh"
	@echo "$(GREEN)✅ Database backup complete$(NC)"

db-restore: ## Restore database (requires BACKUP_FILE variable)
	@echo "$(BLUE)Restoring database...$(NC)"
	@if [ -z "$(BACKUP_FILE)" ]; then echo "$(RED)Error: BACKUP_FILE variable is required$(NC)"; exit 1; fi
	@cd $(ANSIBLE_DIR) && ansible all -i inventory/hosts -m shell -a "cd /opt/$(PROJECT_NAME) && ./restore.sh $(BACKUP_FILE)"
	@echo "$(GREEN)✅ Database restore complete$(NC)"

# Monitoring and health checks
health: ## Check application health
	@echo "$(BLUE)Checking application health...$(NC)"
	@cd $(ANSIBLE_DIR) && ansible all -i inventory/hosts -m uri -a "url=http://localhost:3000/health method=GET"
	@echo "$(GREEN)✅ Health check complete$(NC)"

monitor: ## Start monitoring dashboard
	@echo "$(BLUE)Starting monitoring dashboard...$(NC)"
	@cd $(ANSIBLE_DIR) && ansible all -i inventory/hosts -m shell -a "cd /opt/$(PROJECT_NAME) && ./monitor.sh"

# Security
security-scan: ## Run security scan
	@echo "$(BLUE)Running security scan...$(NC)"
	@cd $(ANSIBLE_DIR) && ansible-playbook -i inventory/hosts playbooks/security.yml
	@echo "$(GREEN)✅ Security scan complete$(NC)"

ssl-setup: ## Setup SSL certificates
	@echo "$(BLUE)Setting up SSL certificates...$(NC)"
	@cd $(ANSIBLE_DIR) && ansible-playbook -i inventory/hosts playbooks/ssl.yml
	@echo "$(GREEN)✅ SSL setup complete$(NC)"

# Cleanup
clean: ## Clean up temporary files
	@echo "$(BLUE)Cleaning up temporary files...$(NC)"
	@rm -f $(TERRAFORM_DIR)/tfplan
	@rm -f $(ANSIBLE_DIR)/inventory.json
	@rm -f $(ANSIBLE_DIR)/inventory/hosts
	@echo "$(GREEN)✅ Cleanup complete$(NC)"

destroy: ## Destroy all infrastructure
	@echo "$(RED)⚠️  This will destroy ALL infrastructure!$(NC)"
	@read -p "Are you sure? Type 'destroy' to confirm: " confirm && [ "$$confirm" = "destroy" ]
	@$(MAKE) terraform-destroy ENVIRONMENT=$(ENVIRONMENT)
	@$(MAKE) clean
	@echo "$(GREEN)✅ Infrastructure destroyed$(NC)"

# Development helpers
dev-setup: ## Set up local development environment
	@echo "$(BLUE)Setting up local development environment...$(NC)"
	@npm install
	@npm run build
	@echo "$(GREEN)✅ Local development setup complete$(NC)"

dev-start: ## Start local development server
	@echo "$(BLUE)Starting local development server...$(NC)"
	@npm start

dev-test: ## Run tests
	@echo "$(BLUE)Running tests...$(NC)"
	@npm test

# CI/CD helpers
ci-test: ## Run CI tests
	@echo "$(BLUE)Running CI tests...$(NC)"
	@npm ci
	@npm run test:ci
	@npm run build
	@echo "$(GREEN)✅ CI tests passed$(NC)"

ci-deploy: ## Deploy from CI/CD
	@echo "$(BLUE)Deploying from CI/CD...$(NC)"
	@$(MAKE) deploy-$(ENVIRONMENT)
	@echo "$(GREEN)✅ CI/CD deployment complete$(NC)"

# Utility commands
ssh: ## SSH into the server
	@echo "$(BLUE)Connecting to server...$(NC)"
	@cd $(TERRAFORM_DIR) && terraform output -raw web_server_ips | head -1 | xargs -I {} ssh -i ~/.ssh/id_rsa ubuntu@{}

info: ## Show deployment information
	@echo "$(BLUE)Deployment Information$(NC)"
	@echo "========================"
	@cd $(TERRAFORM_DIR) && terraform output
	@echo ""
	@echo "$(BLUE)Application URLs:$(NC)"
	@cd $(TERRAFORM_DIR) && terraform output load_balancer_dns

# Quick commands
quick-dev: setup-dev deploy-dev ## Quick development deployment
quick-prod: setup-prod deploy-prod ## Quick production deployment
quick-destroy: destroy ## Quick destroy (use with caution!)

# Default target
.DEFAULT_GOAL := help




