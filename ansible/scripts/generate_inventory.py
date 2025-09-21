#!/usr/bin/env python3

"""
Generate Ansible inventory from Terraform output
"""

import json
import os
import sys
from pathlib import Path

def generate_inventory():
    """Generate Ansible inventory from Terraform JSON output"""
    
    # Read Terraform output
    inventory_file = Path(__file__).parent.parent / "inventory.json"
    
    if not inventory_file.exists():
        print("Error: inventory.json not found. Run 'terraform output -json > ansible/inventory.json' first.")
        sys.exit(1)
    
    with open(inventory_file, 'r') as f:
        terraform_output = json.load(f)
    
    # Extract server information
    web_servers = terraform_output.get('web_server_ips', {}).get('value', [])
    web_server_ids = terraform_output.get('web_server_ids', {}).get('value', [])
    load_balancer_dns = terraform_output.get('load_balancer_dns', {}).get('value', '')
    
    # Create inventory directory
    inventory_dir = Path(__file__).parent.parent / "inventory"
    inventory_dir.mkdir(exist_ok=True)
    
    # Generate hosts file
    hosts_file = inventory_dir / "hosts"
    
    with open(hosts_file, 'w') as f:
        f.write("# TechAcademy Ansible Inventory\n")
        f.write("# Generated from Terraform output\n\n")
        
        # Web servers group
        f.write("[web_servers]\n")
        for i, (ip, server_id) in enumerate(zip(web_servers, web_server_ids)):
            f.write(f"web-server-{i+1} ansible_host={ip} ansible_user=ubuntu server_id={server_id}\n")
        
        f.write("\n")
        
        # All servers group
        f.write("[all:children]\n")
        f.write("web_servers\n\n")
        
        # Group variables
        f.write("[web_servers:vars]\n")
        f.write("ansible_ssh_private_key_file=~/.ssh/id_rsa\n")
        f.write("ansible_ssh_common_args='-o StrictHostKeyChecking=no'\n")
        f.write("ansible_python_interpreter=/usr/bin/python3\n")
        f.write(f"load_balancer_dns={load_balancer_dns}\n")
    
    print(f"Inventory generated: {hosts_file}")
    
    # Generate group_vars
    group_vars_dir = inventory_dir / "group_vars"
    group_vars_dir.mkdir(exist_ok=True)
    
    # Web servers group vars
    web_vars_file = group_vars_dir / "web_servers.yml"
    with open(web_vars_file, 'w') as f:
        f.write("# Web servers group variables\n")
        f.write("app_name: techacademy\n")
        f.write("app_user: ubuntu\n")
        f.write("app_dir: /opt/techacademy\n")
        f.write("git_repository: https://github.com/your-org/techacademy.git\n")
        f.write("git_branch: main\n")
        f.write("environment: production\n")
        f.write("node_version: '18'\n")
        f.write("pm2_instances: max\n")
    
    print(f"Group variables generated: {web_vars_file}")
    
    # Generate host_vars for each server
    host_vars_dir = inventory_dir / "host_vars"
    host_vars_dir.mkdir(exist_ok=True)
    
    for i, (ip, server_id) in enumerate(zip(web_servers, web_server_ids)):
        host_vars_file = host_vars_dir / f"web-server-{i+1}.yml"
        with open(host_vars_file, 'w') as f:
            f.write(f"# Host variables for web-server-{i+1}\n")
            f.write(f"ansible_host: {ip}\n")
            f.write(f"server_id: {server_id}\n")
            f.write(f"server_role: web\n")
            f.write(f"server_index: {i+1}\n")
    
    print(f"Host variables generated in: {host_vars_dir}")
    
    # Clean up
    inventory_file.unlink()
    print("Cleaned up temporary inventory.json file")

if __name__ == "__main__":
    generate_inventory()



