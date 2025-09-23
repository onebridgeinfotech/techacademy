# Alternative Solutions for Permission Denied Issues

## 🚨 If Permission Fix Scripts Don't Work

### **Solution 1: Use Git Deployment (Recommended)**

**This avoids all permission issues by building locally:**

```bash
# 1. Build locally (no permission issues)
npm run build

# 2. Push to GitHub
git add .
git commit -m "Deploy with all features"
git push origin main

# 3. On EC2, just serve the built files
ssh -i ~/.ssh/your-key.pem ubuntu@65.0.95.121
cd /home/ubuntu/techacademy
git pull origin main
sudo pkill -f serve
nohup serve -s build -l 3000 > app.log 2>&1 &
```

### **Solution 2: Manual Permission Fix**

**Connect to EC2 and run these commands one by one:**

```bash
ssh -i ~/.ssh/your-key.pem ubuntu@65.0.95.121

# Fix ownership
sudo chown -R ubuntu:ubuntu /home/ubuntu/techacademy/

# Fix permissions
sudo chmod -R 755 /home/ubuntu/techacademy/

# Fix node_modules specifically
chmod +x node_modules/.bin/*

# Clean and reinstall
rm -rf node_modules package-lock.json
npm install

# Try building
npm run build
```

### **Solution 3: Use npx Instead of npm**

**Sometimes npx works when npm doesn't:**

```bash
# On EC2
cd /home/ubuntu/techacademy
npx react-scripts build
```

### **Solution 4: Use Docker (Advanced)**

**Create a Dockerfile to avoid permission issues:**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
```

### **Solution 5: Use PM2 Process Manager**

**Install PM2 and use it instead of serve:**

```bash
# On EC2
sudo npm install -g pm2
cd /home/ubuntu/techacademy
npm run build
pm2 start "serve -s build -l 3000" --name techacademy
pm2 save
pm2 startup
```

### **Solution 6: Use Nginx (Production)**

**Set up Nginx to serve the static files:**

```bash
# On EC2
sudo apt install nginx
sudo cp -r /home/ubuntu/techacademy/build/* /var/www/html/
sudo systemctl start nginx
sudo systemctl enable nginx
```

## 🎯 Recommended Approach

**For immediate fix:**
1. Try the permission fix script
2. If that fails, use Git deployment
3. For production, use Nginx

**Git deployment is the best long-term solution because:**
- ✅ No permission issues
- ✅ Version control
- ✅ Easy rollback
- ✅ Multiple developers can work
- ✅ Automated deployment

## 🔧 Quick Commands

**Check what's wrong:**
```bash
ssh -i ~/.ssh/your-key.pem ubuntu@65.0.95.121
ls -la /home/ubuntu/techacademy/
ls -la node_modules/.bin/
```

**Fix permissions manually:**
```bash
sudo chown -R ubuntu:ubuntu /home/ubuntu/techacademy/
chmod +x node_modules/.bin/*
```

**Start fresh:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```
