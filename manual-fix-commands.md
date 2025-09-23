# Manual Fix Commands for 404 Error

## 🔧 Step-by-Step Manual Fix

### **Step 1: Connect to EC2**
```bash
ssh -i ~/.ssh/your-key.pem ubuntu@65.0.95.121
```

### **Step 2: Check Current Status**
```bash
# Check if app is running
ps aux | grep serve

# Check if port 3000 is listening
sudo netstat -tlnp | grep :3000

# Check if build directory exists
ls -la /home/ubuntu/techacademy/build/
```

### **Step 3: Stop Everything**
```bash
# Stop all serve processes
sudo pkill -f serve
```

### **Step 4: Install Serve**
```bash
# Install serve globally
sudo npm install -g serve
```

### **Step 5: Fix Permissions**
```bash
# Fix ownership
sudo chown -R ubuntu:ubuntu /home/ubuntu/techacademy/

# Fix permissions
chmod -R 755 /home/ubuntu/techacademy/
```

### **Step 6: Start Application**
```bash
# Go to app directory
cd /home/ubuntu/techacademy

# Start the app
nohup serve -s build -l 3000 > app.log 2>&1 &

# Check if running
ps aux | grep serve
```

### **Step 7: Verify**
```bash
# Check port
sudo netstat -tlnp | grep :3000

# Test local connection
curl -I http://localhost:3000

# Check logs
tail -f app.log
```

## 🚨 If Build Directory is Missing

### **Option 1: Rebuild on EC2**
```bash
cd /home/ubuntu/techacademy
npm install
npm run build
nohup serve -s build -l 3000 > app.log 2>&1 &
```

### **Option 2: Upload Build from Local**
```bash
# On your local machine
scp -r build/ ubuntu@65.0.95.121:/home/ubuntu/techacademy/

# Then on EC2
cd /home/ubuntu/techacademy
nohup serve -s build -l 3000 > app.log 2>&1 &
```

## 🔍 Troubleshooting Commands

### **Check What's Wrong:**
```bash
# Check if app is running
ps aux | grep serve

# Check if port is listening
sudo netstat -tlnp | grep :3000

# Check if build exists
ls -la /home/ubuntu/techacademy/build/

# Check logs
tail -f /home/ubuntu/techacademy/app.log

# Test local connection
curl -I http://localhost:3000
```

### **Common Issues:**
1. **App not running** - Start with `serve`
2. **Port not listening** - Check if app started
3. **Build missing** - Need to build or upload
4. **Permission issues** - Fix ownership
5. **Security groups** - Check AWS Console

## ✅ Quick Fix Commands

### **One-liner to restart everything:**
```bash
ssh -i ~/.ssh/your-key.pem ubuntu@65.0.95.121 'cd /home/ubuntu/techacademy && sudo pkill -f serve && nohup serve -s build -l 3000 > app.log 2>&1 &'
```

### **Check status:**
```bash
ssh -i ~/.ssh/your-key.pem ubuntu@65.0.95.121 'ps aux | grep serve'
```

### **View logs:**
```bash
ssh -i ~/.ssh/your-key.pem ubuntu@65.0.95.121 'tail -f /home/ubuntu/techacademy/app.log'
```

## 🌐 Access Your App

Your app should be available at: **http://65.0.95.121:3000**

## 📋 AWS Security Group Check

Make sure your EC2 Security Group allows:
- **Port 3000** (HTTP) from **0.0.0.0/0**
- **Port 22** (SSH) from your IP
