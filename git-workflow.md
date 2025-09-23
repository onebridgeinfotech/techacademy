# Git-based Deployment Workflow for TechAcademy

## 🚀 Complete Git Deployment Solution

### **Step 1: Setup Git Repository**

**1.1 Create GitHub Repository:**
```bash
# Go to GitHub and create a new repository called "techacademy"
# Copy the repository URL (e.g., https://github.com/yourusername/techacademy.git)
```

**1.2 Initialize Local Git Repository:**
```bash
# In your local techacademy directory
git init
git remote add origin https://github.com/yourusername/techacademy.git
git add .
git commit -m "Initial commit: TechAcademy with Google design, chatbot, and assessment features"
git push -u origin main
```

### **Step 2: Setup EC2 for Git Deployment**

**2.1 Run EC2 Setup Script:**
```bash
# Update the repository URL in setup-ec2-git.sh
# Then run:
chmod +x setup-ec2-git.sh
./setup-ec2-git.sh
```

**2.2 Manual EC2 Setup (Alternative):**
```bash
# Connect to EC2
ssh -i ~/.ssh/your-key.pem ubuntu@65.0.95.121

# Install Git and Node.js
sudo apt update
sudo apt install -y git
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install serve
sudo npm install -g serve

# Clone repository
cd /home/ubuntu
git clone https://github.com/yourusername/techacademy.git
cd techacademy

# Install dependencies and build
npm install
npm run build

# Start application
nohup serve -s build -l 3000 > app.log 2>&1 &
```

### **Step 3: Deploy Changes (Git Workflow)**

**3.1 Local Development:**
```bash
# Make your changes locally
# Test with: npm start

# When ready to deploy:
git add .
git commit -m "Your commit message"
git push origin main
```

**3.2 Deploy to EC2:**
```bash
# Connect to EC2
ssh -i ~/.ssh/your-key.pem ubuntu@65.0.95.121

# Pull latest changes
cd /home/ubuntu/techacademy
git pull origin main

# Install dependencies (if package.json changed)
npm install

# Build application
npm run build

# Restart application
sudo pkill -f serve
nohup serve -s build -l 3000 > app.log 2>&1 &

# Check status
ps aux | grep serve
```

### **Step 4: Automated Deployment Script**

**4.1 Update Configuration:**
```bash
# Edit git-deploy.sh
# Replace YOUR_USERNAME with your GitHub username
# Replace your-key.pem with your actual key path
```

**4.2 Run Automated Deployment:**
```bash
chmod +x git-deploy.sh
./git-deploy.sh
```

### **Step 5: Daily Workflow**

**5.1 Make Changes Locally:**
```bash
# Edit your code
# Test with: npm start
```

**5.2 Deploy Changes:**
```bash
# Option 1: Automated
./git-deploy.sh

# Option 2: Manual
git add .
git commit -m "Your changes"
git push origin main

# Then on EC2:
ssh -i ~/.ssh/your-key.pem ubuntu@65.0.95.121
cd /home/ubuntu/techacademy
git pull origin main
npm run build
sudo pkill -f serve
nohup serve -s build -l 3000 > app.log 2>&1 &
```

## 🔧 Troubleshooting

### **Check Git Status:**
```bash
# On EC2
cd /home/ubuntu/techacademy
git status
git log --oneline -5
```

### **Check Application Status:**
```bash
# On EC2
ps aux | grep serve
sudo netstat -tlnp | grep :3000
tail -f app.log
```

### **Restart Application:**
```bash
# On EC2
sudo pkill -f serve
cd /home/ubuntu/techacademy
nohup serve -s build -l 3000 > app.log 2>&1 &
```

## 📋 Benefits of Git Deployment

✅ **Version Control** - Track all changes
✅ **Easy Rollback** - Revert to previous versions
✅ **Collaboration** - Multiple developers can work
✅ **Automated** - One command deployment
✅ **Backup** - Code is safely stored in GitHub
✅ **History** - See what changed and when

## 🌐 Access Your App

Your app will be available at: **http://65.0.95.121:3000**

## 📁 Files Created

- `git-deploy.sh` - Automated deployment script
- `setup-ec2-git.sh` - EC2 setup script
- `git-workflow.md` - This documentation
