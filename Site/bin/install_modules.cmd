cd /d "%~dp0"

if "%EMULATED%"=="true" exit /b 0

echo npm LOG > npmlog.txt

powershell -c "set-executionpolicy unrestricted"
powershell .\download.ps1 "http://npmjs.org/dist/npm-1.1.0-beta-7.zip"

7za x npm-1.1.0-beta-7.zip -y 1>> npmlog.txt 2>> npmlog_error.txt
cd ..
bin\npm install 1>> npmlog.txt 2>> npmlog_error.txt

echo SUCCESS
exit /b 0

:error

echo FAILED
exit /b -1