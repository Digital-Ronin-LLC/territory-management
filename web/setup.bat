@echo off
echo Setting up Territory Management Dashboard...

REM Install dependencies
echo Installing dependencies...
call npm install

REM Start the application
echo Starting the application...
call npm start

echo Setup complete! The application should now be running at http://localhost:3000
