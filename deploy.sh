#!/bin/bash

# Ultra-Simple Single Command Deployment
# Just run: ./deploy.sh

echo "🚀 DEPLOYING TO AWS..."
npm run build
scp -r build/ ubuntu@65.0.95.121:/home/ubuntu/techacademy/
ssh -i ~/.ssh/your-key.pem ubuntu@65.0.95.121 'cd /home/ubuntu/techacademy && sudo pkill -f serve && nohup serve -s build -l 3000 > app.log 2>&1 &'
echo "✅ DEPLOYED! App available at: http://65.0.95.121:3000"