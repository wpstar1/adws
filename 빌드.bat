@echo off
chcp 65001 >nul
cls

echo ========================================
echo    Production Build
echo ========================================
echo.

cd /d "%~dp0"

echo [1/5] Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js not found!
    echo Please download from https://nodejs.org
    timeout /t 10
    exit /b 1
)
echo Node.js OK

echo.
echo [2/5] Checking dependencies...
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo Dependency installation failed!
        timeout /t 10
        exit /b 1
    )
)
echo Dependencies OK

echo.
echo [3/5] Cleaning previous build...
if exist "dist" (
    rmdir /s /q "dist"
    echo Previous build cleaned
)

echo.
echo [4/5] TypeScript type checking...
npx tsc --noEmit
if %errorlevel% neq 0 (
    echo TypeScript errors found!
    echo Please fix errors and try again.
    timeout /t 10
    exit /b 1
)
echo Type check passed

echo.
echo [5/5] Building for production...
echo This may take a few minutes...
echo.
npm run build

if %errorlevel% neq 0 (
    echo.
    echo Build failed!
    echo Please check errors above.
    timeout /t 10
    exit /b 1
)

echo.
echo ========================================
echo Build Complete!
echo ========================================
echo.
echo Build output: dist/ folder
echo Ready for deployment: Upload dist folder contents to web server
echo.

echo Deploy options:
echo   1. Vercel: vercel --prod
echo   2. Netlify: netlify deploy --prod --dir=dist
echo   3. Manual: Upload dist folder contents to web server
echo.

echo Want to preview the build locally? ^(y/N^)
choice /c YN /n /t 10 /d N >nul
if errorlevel 2 goto :end
if errorlevel 1 (
    echo.
    echo Starting preview server...
    echo Access at: http://localhost:4173
    echo.
    npm run preview
)

:end
timeout /t 5