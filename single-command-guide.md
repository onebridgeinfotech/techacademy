# Single Command Deployment Guide

## 🚀 Ultra-Simple Single Command Deployment

Perfect! Now you have the simplest possible deployment solution. Just one command does everything!

### **🎯 Single Command Options:**

## **Option 1: Ultra-Simple (Recommended)**
```bash
npm run deploy
```
**This does everything in one command:**
- ✅ Builds your app
- ✅ Uploads to AWS
- ✅ Restarts the app
- ✅ Shows status

## **Option 2: Direct Script**
```bash
./deploy.sh
```
**Same as above, but direct script execution**

## **Option 3: Detailed Version**
```bash
npm run deploy-all
```
**Same as above, but with more detailed output**

### **🔧 Setup (One Time Only):**

**1. Update the deploy script:**
```bash
# Edit deploy.sh
# Replace your-key.pem with your actual key path
```

**2. Make it executable:**
```bash
chmod +x deploy.sh
```

### **🚀 Usage (After Setup):**

**Every time you make changes:**
```bash
# Make your changes in src/
# Then run:
npm run deploy

# That's it! Your app is updated on AWS!
```

### **📋 What Happens Automatically:**

1. 🏗️ **Builds locally** - Creates optimized production build
2. 📤 **Uploads to EC2** - Copies build files to AWS
3. 🔄 **Restarts app** - Stops old app and starts new one
4. ✅ **Shows status** - Confirms deployment success

### **🌐 Your App Will Be Available At:**
**http://65.0.95.121:3000**

### **✅ Benefits:**

- 🚀 **One command** - Just `npm run deploy`
- ⚡ **Fast deployment** - Takes only 30-60 seconds
- 🔄 **Automatic restart** - App restarts automatically
- 📱 **Always up-to-date** - AWS instance stays current
- 🎯 **No manual steps** - Everything automated

### **🔍 Troubleshooting:**

**If deployment fails:**
```bash
# Check if app is running
ssh -i ~/.ssh/your-key.pem ubuntu@65.0.95.121 'ps aux | grep serve'

# Check app logs
ssh -i ~/.ssh/your-key.pem ubuntu@65.0.95.121 'tail -f /home/ubuntu/techacademy/app.log'
```

**Manual restart:**
```bash
ssh -i ~/.ssh/your-key.pem ubuntu@65.0.95.121 'cd /home/ubuntu/techacademy && sudo pkill -f serve && nohup serve -s build -l 3000 > app.log 2>&1 &'
```

### **🎯 Your Workflow:**

1. **Edit your code** - Make changes in `src/`
2. **Run one command** - `npm run deploy`
3. **App updates** - Changes appear on AWS instantly!

**That's it! Your development workflow is now as simple as possible!** 🎉
