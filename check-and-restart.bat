@echo off
echo 🔍 CHECKING EC2 STATUS
echo =====================

set EC2_IP=13.235.246.199
set EC2_USER=ubuntu
set KEY_PATH=~/.ssh/obta.pem

echo Testing SSH connection...
ssh -i %KEY_PATH% -o ConnectTimeout=10 %EC2_USER%@%EC2_IP% "echo 'SSH working'" 2>nul
if %errorlevel% neq 0 (
    echo ❌ SSH connection failed. EC2 might be down or restarting.
    echo Please check your EC2 instance status in AWS Console.
    pause
    exit /b 1
)

echo ✅ SSH connection successful!

echo Checking if app is running...
ssh -i %KEY_PATH% %EC2_USER%@%EC2_IP% "ps aux | grep serve | grep -v grep" 2>nul
if %errorlevel% neq 0 (
    echo ❌ App not running. Starting app...
    ssh -i %KEY_PATH% %EC2_USER%@%EC2_IP% "cd /home/ubuntu/techacademy && nohup serve -s build -l 3000 > app.log 2>&1 &"
    echo ✅ App started!
) else (
    echo ✅ App is already running!
)

echo.
echo 🌐 Your app should be available at: http://%EC2_IP%:3000
echo.
pause
