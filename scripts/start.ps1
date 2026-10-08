param([switch]$NoBrowser)
$ErrorActionPreference='Stop'
$museumRoot=Split-Path -Parent $PSScriptRoot
try {
 if(-not(Test-Path -LiteralPath (Join-Path $museumRoot 'dist/index.html'))){throw 'Falta la compilacion dist. Copia la carpeta completa del museo desde el respaldo.'}
 $museumNode=Join-Path $museumRoot 'runtime/node.exe'
 if(-not(Test-Path -LiteralPath $museumNode)) { $museumNode=(Get-Command node -ErrorAction SilentlyContinue).Source }
 if(-not $museumNode){throw 'Falta runtime/node.exe. Copia la carpeta runtime del respaldo o instala Node.js 22 o superior.'}
 $running=$false
 try { $health=Invoke-RestMethod 'http://127.0.0.1:4176/__health' -TimeoutSec 2; if($health.app -ne 'museo-elastina'){throw 'Otro programa ocupa el puerto 4176.'};$running=$true } catch {}
 if(-not $running){Start-Process -FilePath $museumNode -ArgumentList @('"'+(Join-Path $museumRoot 'scripts/server.mjs')+'"') -WorkingDirectory $museumRoot -WindowStyle Hidden -RedirectStandardOutput (Join-Path $museumRoot 'server.log') -RedirectStandardError (Join-Path $museumRoot 'server-error.log') | Out-Null}
 $ready=$false
 for($i=0;$i -lt 30;$i++){try{if((Invoke-RestMethod 'http://127.0.0.1:4176/__health' -TimeoutSec 1).app -eq 'museo-elastina'){$ready=$true;break}}catch{};Start-Sleep -Milliseconds 200}
 if(-not $ready){throw 'No se pudo iniciar el servidor. Revisa server-error.log o cierra otro programa que use el puerto 4176.'}
 if(-not $NoBrowser){
  $browsers=@("${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe","$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe","$env:ProgramFiles\Google\Chrome\Application\chrome.exe","$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe")
  $museumBrowser=$browsers | Where-Object {Test-Path -LiteralPath $_} | Select-Object -First 1
  if(-not $museumBrowser){throw 'Instala Microsoft Edge o Google Chrome. El servidor ya esta abierto en http://localhost:4176.'}
  Start-Process -FilePath $museumBrowser -ArgumentList '--app=http://localhost:4176 --start-maximized' -WindowStyle Normal
 }
 Write-Host 'Museo listo. Pulsa INICIAR EXPERIENCIA. F activa pantalla completa.' -ForegroundColor Green
} catch {Write-Host $_.Exception.Message -ForegroundColor Red;Read-Host 'Pulsa Enter para cerrar';exit 1}
