const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'C:/Users/vicga/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs'),assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true}),context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true}),page=await context.newPage(),checks=[];
try{
 const check=(name,ok)=>{assert(ok,name);checks.push(name);console.log('PASS',name)};
 await page.goto('http://localhost:4176/');await page.waitForFunction(()=>window.__museum?.molecule.model&&document.querySelector('#loading').hidden);
 await page.locator('.large[data-action="start"]').tap();await page.locator('[data-residue="A3"]').tap();check('Pulsación táctil selecciona residuo',await page.evaluate(()=>window.__museum.getState().selected==='A3'));
 check('Texto de aminoácido seleccionado',(await page.locator('#residue-card').innerText()).includes('Glicina'));
 await page.locator('[data-station="7"]').tap();await page.locator('[data-condition="conformational"]').tap();check('Cambio conformacional conserva continuidad',await page.evaluate(()=>window.__museum.getState().network.condition==='conformational'));
 await page.screenshot({path:'evidence/08-tactil-integridad.png',fullPage:true});
 await page.evaluate(()=>navigator.serviceWorker.ready);await page.reload();await page.waitForFunction(()=>document.querySelector('#loading')?.hidden);await context.setOffline(true);
 check('PDF impreso disponible offline',await page.evaluate(async()=>{const r=await fetch('/docs/Ficha_Elastina.pdf');return r.ok&&r.headers.get('content-type').includes('pdf')}));
 check('Metadatos originales disponibles offline',await page.evaluate(async()=>{const r=await fetch('/models/provenance.json');const d=await r.json();return d.entry==='AF-P15502-F1'}));
 fs.writeFileSync('evidence/final-results.json',JSON.stringify({checks,touch:'emulado',offline:'red del navegador desactivada'},null,2));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
