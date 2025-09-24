@echo off
echo 🌐 TESTING YOUR APP
echo ===================

set EC2_IP=13.235.246.199

echo Testing app at http://%EC2_IP%:3000
echo.

curl -s -o nul -w "HTTP Status: %%{http_code}\nResponse Time: %%{time_total}s\n" http://%EC2_IP%:3000

if %errorlevel% equ 0 (
    echo ✅ App is responding!
    echo.
    echo 🌐 Open your browser and go to: http://%EC2_IP%:3000
) else (
    echo ❌ App is not responding. Try running check-and-restart.bat
)

echo.
pause
