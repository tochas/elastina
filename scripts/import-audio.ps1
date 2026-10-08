param([string]$Source,[switch]$NoPause)
$ErrorActionPreference='Stop'
$museumRoot=Split-Path -Parent $PSScriptRoot
if(-not $Source){$Source=Read-Host 'Ruta de la carpeta con los MP3 de ElevenLabs'}
try {
 $audioScripts=Get-Content -LiteralPath (Join-Path $museumRoot 'public/audio/scripts.json') -Raw -Encoding UTF8 | ConvertFrom-Json
 $availability=@{}; $copied=0
 foreach($key in $audioScripts.PSObject.Properties.Name){
  $candidate=Join-Path $Source ($key+'.mp3')
  if(-not(Test-Path -LiteralPath $candidate)){$candidate=Join-Path $Source ($key+'.mp3.mp3')}
  if(Test-Path -LiteralPath $candidate){Copy-Item -LiteralPath $candidate -Destination (Join-Path $museumRoot ('public/audio/'+$key+'.mp3')) -Force; $copied++}
  $availability[$key]=Test-Path -LiteralPath (Join-Path $museumRoot ('public/audio/'+$key+'.mp3'))
 }
 $availability | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $museumRoot 'public/audio/availability.json') -Encoding UTF8
 if(Test-Path -LiteralPath (Join-Path $museumRoot 'dist')){
  Copy-Item -LiteralPath (Join-Path $museumRoot 'public/audio') -Destination (Join-Path $museumRoot 'dist') -Recurse -Force
  Push-Location $museumRoot
  & (Join-Path $museumRoot 'runtime/node.exe') scripts/build-sw.mjs
  Pop-Location
 }
 Write-Host "$copied narraciones importadas. Cierra y abre la app y recarga una vez conectado al servidor local." -ForegroundColor Green
}catch{Write-Host $_.Exception.Message -ForegroundColor Red}
if(-not $NoPause){Read-Host 'Pulsa Enter para cerrar'}
