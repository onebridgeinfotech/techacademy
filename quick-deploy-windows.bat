@echo off
echo 🚀 QUICK DEPLOY TO EC2
echo ======================

set EC2_IP=13.235.246.199
set EC2_USER=ubuntu
set KEY_PATH=~/.ssh/obta.pem

echo 🔧 Local Git operations...
git add .
git commit -m "Deploy: Latest changes - %date% %time%"
git push origin main

echo 🧹 Cleaning EC2 and deploying...
ssh -i %KEY_PATH% %EC2_USER%@%EC2_IP% "sudo pkill -f serve; sudo rm -rf /home/ubuntu/techacademy; git clone https://github.com/onebridgeinfotech/techacademy; cd techacademy; npm install; npm run build; sudo chown -R ubuntu:ubuntu .; chmod +x node_modules/.bin/*; sudo npm install -g serve; nohup serve -s build -l 3000 > app.log 2>&1 &; sleep 3; ps aux | grep serve"

echo.
echo ✅ DEPLOYED! App available at: http://%EC2_IP%:3000
pause
