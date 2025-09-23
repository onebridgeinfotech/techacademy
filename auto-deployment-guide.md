# Automated Deployment Guide for TechAcademy

## 🚀 Complete Auto-Deployment Solution

Now that your application is running, here's how to set up automatic deployment so any changes you make will automatically be pushed to your AWS instance and the app will restart.

### **🎯 Three Deployment Options:**

## **Option 1: Git Hooks (Recommended)**

**Set up automatic deployment on every commit:**

```bash
# Setup Git hooks
npm run setup-hooks

# Now every commit will auto-deploy!
git add .
git commit -m "Your changes"
# App automatically deploys to AWS!
```

## **Option 2: Watch and Deploy**

**Automatically deploy when you save files:**

```bash
# Start watching for changes
npm run watch

# Now any change in src/ will auto-deploy!
# Edit your files and save - deployment happens automatically!
```

## **Option 3: Manual Deploy**

**Deploy when you want:**

```bash
# Deploy manually
npm run deploy

# Or use the script directly
chmod +x auto-deploy.sh
./auto-deploy.sh
```

### **🔧 Setup Instructions:**

**Step 1: Update Configuration**
```bash
# Edit auto-deploy.sh
# Replace YOUR_USERNAME with your GitHub username
# Replace your-key.pem with your actual key path
```

**Step 2: Choose Your Method**

**For Git Hooks (Automatic on commit):**
```bash
npm run setup-hooks
git add .
git commit -m "Test auto-deployment"
# App automatically deploys!
```

**For Watch and Deploy (Automatic on save):**
```bash
npm run watch
# Edit any file in src/ and save
# App automatically deploys!
```

**For Manual Deploy:**
```bash
npm run deploy
# App deploys when you run this command
```

### **📋 What Happens During Auto-Deployment:**

1. ✅ **Builds locally** - Creates optimized production build
2. ✅ **Uploads to EC2** - Copies build files to AWS
3. ✅ **Restarts app** - Stops old app and starts new one
4. ✅ **Verifies status** - Checks if app is running
5. ✅ **Shows logs** - Displays deployment status

### **🌐 Your App Will Be Available At:**
**http://65.0.95.121:3000**

### **🔍 Troubleshooting:**

**Check if app is running:**
```bash
ssh -i ~/.ssh/your-key.pem ubuntu@65.0.95.121 'ps aux | grep serve'
```

**View app logs:**
```bash
ssh -i ~/.ssh/your-key.pem ubuntu@65.0.95.121 'tail -f /home/ubuntu/techacademy/app.log'
```

**Manual restart:**
```bash
ssh -i ~/.ssh/your-key.pem ubuntu@65.0.95.121 'cd /home/ubuntu/techacademy && sudo pkill -f serve && nohup serve -s build -l 3000 > app.log 2>&1 &'
```

### **✅ Benefits of Auto-Deployment:**

- 🚀 **Instant updates** - Changes appear immediately
- 🔄 **No manual steps** - Just edit and save
- 📱 **Always up-to-date** - AWS instance stays current
- 🎯 **Focus on coding** - No deployment worries
- 🔧 **Easy rollback** - Git history for all changes

### **📁 Files Created:**

- `auto-deploy.sh` - Manual deployment script
- `watch-and-deploy.sh` - File watching script
- `git-hooks/setup-hooks.sh` - Git hooks setup
- `package.json` - Updated with deployment scripts

### **🎯 Recommended Workflow:**

1. **Setup Git hooks** - `npm run setup-hooks`
2. **Edit your code** - Make changes in `src/`
3. **Commit changes** - `git add . && git commit -m "Your changes"`
4. **App auto-deploys** - Changes appear on AWS instantly!

**Your development workflow is now fully automated!** 🎉
