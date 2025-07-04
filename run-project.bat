@echo off
echo Starting Pizzaiolo Full-Stack App...

REM Open backend
start cmd /k "cd /d C:\Users\ferna\Desktop\University Project\Full-Stack pizzaria\demo\project pizzaiolo\backend && mvn spring-boot:run"

REM Open frontend
start cmd /k "cd /d C:\Users\ferna\Desktop\University Project\Full-Stack pizzaria\demo\project pizzaiolo\restaurant-frontend && npm start"

echo Servers are launching...
pause
