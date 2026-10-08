$museumRoot=Split-Path -Parent $PSScriptRoot
$state=Join-Path $museumRoot '.server.pid'
if(Test-Path -LiteralPath $state){
 try{$data=Get-Content -Raw -LiteralPath $state | ConvertFrom-Json;Invoke-RestMethod -Uri "http://127.0.0.1:$($data.port)/__stop" -Method Post -Headers @{'x-museum-token'=$data.token} -TimeoutSec 3 | Out-Null;Write-Host 'Servidor del museo cerrado. Cierra la ventana con Alt+F4.'}catch{Write-Host 'El servidor ya esta cerrado o no responde. No se detuvieron otros programas.'}
}else{Write-Host 'El museo no tiene un servidor iniciado desde esta carpeta.'}
