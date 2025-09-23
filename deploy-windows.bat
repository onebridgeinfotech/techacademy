@echo off
echo 🚀 DEPLOYING TECHACADEMY TO EC2
echo ================================
echo.

REM Configuration
set EC2_IP=13.235.246.199
set EC2_USER=ubuntu
set KEY_PATH=~/.ssh/your-key.pem
set GIT_REPO=https://github.com/onebridgeinfotech/techacademy

echo 📋 Configuration:
echo    EC2 IP: %EC2_IP%
echo    User: %EC2_USER%
echo    Git Repo: %GIT_REPO%
echo.

echo 🔧 STEP 1: PREPARING LOCAL REPOSITORY
echo =====================================

echo 📝 Adding all changes to Git...
git add .

echo 💾 Committing changes...
git commit -m "Deploy: Updated header, mentors section, and navigation - %date% %time%"

echo 📤 Pushing to remote repository...
git push origin main

echo ✅ Local Git operations completed!
echo.

echo 🧹 STEP 2: CLEANING EC2 AND DEPLOYING
echo =====================================

echo Connecting to EC2 and deploying...
ssh -i %KEY_PATH% %EC2_USER%@%EC2_IP% "sudo pkill -f serve; sudo rm -rf /home/ubuntu/techacademy; git clone %GIT_REPO%; cd techacademy; npm install; npm run build; sudo chown -R ubuntu:ubuntu .; chmod +x node_modules/.bin/*; sudo npm install -g serve; nohup serve -s build -l 3000 > app.log 2>&1 &; sleep 3; ps aux | grep serve"

echo.
echo ✅ DEPLOYMENT COMPLETE!
echo ======================
echo.
echo 🌐 Your updated app is now available at: http://%EC2_IP%:3000
echo.
echo 🎨 New Features Deployed:
echo    ✅ Updated header navigation
echo    ✅ Expert mentors section with auto-scroll
echo    ✅ Modern EdTech design
echo    ✅ Apply Now redirects to signup
echo    ✅ Become Mentor section in home page
echo.
echo 🎉 Deployment completed successfully!
pause
