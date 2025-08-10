@echo off
chcp 65001 >nul
cls

echo ========================================
echo   Google Ads Agency Service Setup
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo Node.js is not installed!
    echo.
    echo Opening Node.js download page...
    start "" https://nodejs.org/
    echo.
    echo Please download and install Node.js LTS version,
    echo then run this script again.
    echo.
    timeout /t 10
    exit /b 1
)
echo Node.js found!
node --version

echo.
echo [2/3] Checking npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo npm not found. Please reinstall Node.js.
    timeout /t 5
    exit /b 1
)
echo npm found!
npm --version

echo.
echo [3/3] Installing project dependencies...
echo This may take a few minutes...
echo.

if exist "node_modules" (
    echo Existing installation found. Cleaning up...
    rmdir /s /q "node_modules" 2>nul
    del "package-lock.json" 2>nul
)

npm install

if %errorlevel% neq 0 (
    echo.
    echo Installation failed!
    echo Please check your internet connection and try again.
    timeout /t 10
    exit /b 1
)

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Next steps:
echo   1. Double-click 'run.bat' to start development server
echo   2. Double-click 'build.bat' to create production build
echo.

echo Starting development server in 3 seconds...
timeout /t 3
call "run.bat"