@echo off
chcp 65001 >nul
cls

echo ========================================
echo   Google Ads Agency Service
echo ========================================
echo.

cd /d "%~dp0"

echo [1/4] Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js not found! Please run setup.bat first.
    timeout /t 5
    exit /b 1
)
echo Node.js OK

echo.
echo [2/4] Checking project files...
if not exist "package.json" (
    echo package.json not found! Wrong directory?
    timeout /t 5
    exit /b 1
)

echo.
echo [3/4] Checking dependencies...
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo Installation failed!
        timeout /t 5
        exit /b 1
    )
)
echo Dependencies OK

echo.
echo [4/4] Starting development server...
echo.
echo Server will start at available port (usually 5173-5176)
echo Check the output above for the exact URL
echo Browser will open automatically after server starts  
echo Press Ctrl+C to stop the server
echo.

echo Starting server in 3 seconds...
timeout /t 3 >nul

:: Start browser after delay in background
start /b cmd /c "timeout /t 5 >nul && start http://localhost:5173 || start http://localhost:5174 || start http://localhost:5175 || start http://localhost:5176"

npm run dev