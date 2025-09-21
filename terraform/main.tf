# TechAcademy Infrastructure - Main Configuration
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  
  backend "s3" {
    bucket = "techacademy-terraform-state"
    key    = "infrastructure/terraform.tfstate"
    region = "us-west-2"
  }
}

provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Project     = "TechAcademy"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

# Data sources
data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical
  
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-22.04-lts-amd64-server-*"]
  }
  
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# VPC Configuration
resource "aws_vpc" "techacademy_vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true
  
  tags = {
    Name = "${var.project_name}-vpc-${var.environment}"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "techacademy_igw" {
  vpc_id = aws_vpc.techacademy_vpc.id
  
  tags = {
    Name = "${var.project_name}-igw-${var.environment}"
  }
}

# Public Subnets
resource "aws_subnet" "public_subnets" {
  count = length(var.public_subnet_cidrs)
  
  vpc_id                  = aws_vpc.techacademy_vpc.id
  cidr_block              = var.public_subnet_cidrs[count.index]
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true
  
  tags = {
    Name = "${var.project_name}-public-subnet-${count.index + 1}-${var.environment}"
    Type = "Public"
  }
}

# Private Subnets
resource "aws_subnet" "private_subnets" {
  count = length(var.private_subnet_cidrs)
  
  vpc_id            = aws_vpc.techacademy_vpc.id
  cidr_block        = var.private_subnet_cidrs[count.index]
  availability_zone = data.aws_availability_zones.available.names[count.index]
  
  tags = {
    Name = "${var.project_name}-private-subnet-${count.index + 1}-${var.environment}"
    Type = "Private"
  }
}

# Route Table for Public Subnets
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.techacademy_vpc.id
  
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.techacademy_igw.id
  }
  
  tags = {
    Name = "${var.project_name}-public-rt-${var.environment}"
  }
}

# Route Table Association for Public Subnets
resource "aws_route_table_association" "public_rta" {
  count = length(aws_subnet.public_subnets)
  
  subnet_id      = aws_subnet.public_subnets[count.index].id
  route_table_id = aws_route_table.public_rt.id
}

# Security Groups
resource "aws_security_group" "web_sg" {
  name_prefix = "${var.project_name}-web-sg-${var.environment}"
  vpc_id      = aws_vpc.techacademy_vpc.id
  
  # HTTP
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  # HTTPS
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  # SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.ssh_cidr]
  }
  
  # Application Port
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  # All outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  tags = {
    Name = "${var.project_name}-web-sg-${var.environment}"
  }
}

resource "aws_security_group" "db_sg" {
  name_prefix = "${var.project_name}-db-sg-${var.environment}"
  vpc_id      = aws_vpc.techacademy_vpc.id
  
  # PostgreSQL
  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.web_sg.id]
  }
  
  tags = {
    Name = "${var.project_name}-db-sg-${var.environment}"
  }
}

# Key Pair
resource "aws_key_pair" "techacademy_key" {
  key_name   = "${var.project_name}-key-${var.environment}"
  public_key = file(var.public_key_path)
  
  tags = {
    Name = "${var.project_name}-key-${var.environment}"
  }
}

# EC2 Instances
resource "aws_instance" "web_servers" {
  count = var.environment == "prod" ? 2 : 1
  
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type
  key_name              = aws_key_pair.techacademy_key.key_name
  vpc_security_group_ids = [aws_security_group.web_sg.id]
  subnet_id             = aws_subnet.public_subnets[count.index % length(aws_subnet.public_subnets)].id
  
  root_block_device {
    volume_type = "gp3"
    volume_size = var.volume_size
    encrypted   = true
  }
  
  user_data = base64encode(templatefile("${path.module}/user_data.sh", {
    environment = var.environment
    project_name = var.project_name
  }))
  
  tags = {
    Name = "${var.project_name}-web-${count.index + 1}-${var.environment}"
    Type = "WebServer"
  }
}

# RDS Database
resource "aws_db_subnet_group" "techacademy_db_subnet_group" {
  name       = "${var.project_name}-db-subnet-group-${var.environment}"
  subnet_ids = aws_subnet.private_subnets[*].id
  
  tags = {
    Name = "${var.project_name}-db-subnet-group-${var.environment}"
  }
}

resource "aws_db_instance" "techacademy_db" {
  identifier = "${var.project_name}-db-${var.environment}"
  
  engine         = "postgres"
  engine_version = "15.4"
  instance_class = var.db_instance_class
  
  allocated_storage     = var.db_allocated_storage
  max_allocated_storage = var.db_max_allocated_storage
  storage_type          = "gp3"
  storage_encrypted     = true
  
  db_name  = var.db_name
  username = var.db_username
  password = var.db_password
  
  vpc_security_group_ids = [aws_security_group.db_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.techacademy_db_subnet_group.name
  
  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"
  
  skip_final_snapshot = var.environment != "prod"
  deletion_protection = var.environment == "prod"
  
  tags = {
    Name = "${var.project_name}-db-${var.environment}"
  }
}

# Application Load Balancer
resource "aws_lb" "techacademy_alb" {
  name               = "${var.project_name}-alb-${var.environment}"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.web_sg.id]
  subnets            = aws_subnet.public_subnets[*].id
  
  enable_deletion_protection = var.environment == "prod"
  
  tags = {
    Name = "${var.project_name}-alb-${var.environment}"
  }
}

resource "aws_lb_target_group" "techacademy_tg" {
  name     = "${var.project_name}-tg-${var.environment}"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = aws_vpc.techacademy_vpc.id
  
  health_check {
    enabled             = true
    healthy_threshold   = 2
    interval            = 30
    matcher             = "200"
    path                = "/"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 2
  }
  
  tags = {
    Name = "${var.project_name}-tg-${var.environment}"
  }
}

resource "aws_lb_target_group_attachment" "techacademy_tg_attachment" {
  count = length(aws_instance.web_servers)
  
  target_group_arn = aws_lb_target_group.techacademy_tg.arn
  target_id        = aws_instance.web_servers[count.index].id
  port             = 3000
}

resource "aws_lb_listener" "techacademy_listener" {
  load_balancer_arn = aws_lb.techacademy_alb.arn
  port              = "80"
  protocol          = "HTTP"
  
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.techacademy_tg.arn
  }
}

# S3 Bucket for file storage
resource "aws_s3_bucket" "techacademy_files" {
  bucket = "${var.project_name}-files-${var.environment}-${random_string.bucket_suffix.result}"
  
  tags = {
    Name = "${var.project_name}-files-${var.environment}"
  }
}

resource "random_string" "bucket_suffix" {
  length  = 8
  special = false
  upper   = false
}

resource "aws_s3_bucket_versioning" "techacademy_files_versioning" {
  bucket = aws_s3_bucket.techacademy_files.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_encryption" "techacademy_files_encryption" {
  bucket = aws_s3_bucket.techacademy_files.id
  
  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
}

# Outputs
output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.techacademy_vpc.id
}

output "public_subnet_ids" {
  description = "IDs of the public subnets"
  value       = aws_subnet.public_subnets[*].id
}

output "private_subnet_ids" {
  description = "IDs of the private subnets"
  value       = aws_subnet.private_subnets[*].id
}

output "web_server_ips" {
  description = "Public IP addresses of the web servers"
  value       = aws_instance.web_servers[*].public_ip
}

output "web_server_ids" {
  description = "IDs of the web servers"
  value       = aws_instance.web_servers[*].id
}

output "load_balancer_dns" {
  description = "DNS name of the load balancer"
  value       = aws_lb.techacademy_alb.dns_name
}

output "database_endpoint" {
  description = "RDS instance endpoint"
  value       = aws_db_instance.techacademy_db.endpoint
  sensitive   = true
}

output "s3_bucket_name" {
  description = "Name of the S3 bucket for file storage"
  value       = aws_s3_bucket.techacademy_files.bucket
}

