# TechAcademy Infrastructure - Variables

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "dev"
  
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be one of: dev, staging, prod."
  }
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "techacademy"
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets"
  type        = list(string)
  default     = ["10.0.10.0/24", "10.0.20.0/24"]
}

variable "ssh_cidr" {
  description = "CIDR block for SSH access"
  type        = string
  default     = "0.0.0.0/0"
}

variable "public_key_path" {
  description = "Path to the public key file"
  type        = string
  default     = "~/.ssh/id_rsa.pub"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "volume_size" {
  description = "Size of the root volume in GB"
  type        = number
  default     = 20
}

variable "db_instance_class" {
  description = "RDS instance class"
  type        = string
  default     = "db.t3.micro"
}

variable "db_allocated_storage" {
  description = "Initial allocated storage for RDS in GB"
  type        = number
  default     = 20
}

variable "db_max_allocated_storage" {
  description = "Maximum allocated storage for RDS in GB"
  type        = number
  default     = 100
}

variable "db_name" {
  description = "Name of the database"
  type        = string
  default     = "techacademy"
}

variable "db_username" {
  description = "Database username"
  type        = string
  default     = "techacademy"
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

# Environment-specific variables
variable "dev_instance_type" {
  description = "EC2 instance type for dev environment"
  type        = string
  default     = "t3.micro"
}

variable "prod_instance_type" {
  description = "EC2 instance type for prod environment"
  type        = string
  default     = "t3.small"
}

variable "dev_db_instance_class" {
  description = "RDS instance class for dev environment"
  type        = string
  default     = "db.t3.micro"
}

variable "prod_db_instance_class" {
  description = "RDS instance class for prod environment"
  type        = string
  default     = "db.t3.small"
}

# Tags
variable "common_tags" {
  description = "Common tags for all resources"
  type        = map(string)
  default = {
    Project     = "TechAcademy"
    ManagedBy   = "Terraform"
    Environment = "dev"
  }
}

