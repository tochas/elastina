const {chromium}=require('C:/Users/vicga/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs'),assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true,args:['--autoplay-policy=no-user-gesture-required']});
 const context=await browser.newContext(),page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 try{
 await page.goto('http://localhost:4176/');
 await page.waitForFunction(()=>window.__museum?.molecule.model&&document.querySelector('#loading').hidden);
 await page.evaluate(()=>navigator.serviceWorker.ready);await page.reload();
 await page.waitForFunction(()=>window.__museum?.molecule.model&&document.querySelector('#loading').hidden);
 await context.setOffline(true);
 const results=await page.evaluate(async()=>{
  const available=await (await fetch('/audio/availability.json')).json(),out=[];
  for(const id of Object.keys(available)){
   const a=new Audio('/audio/'+id+'.mp3');
   await new Promise((resolve,reject)=>{a.onloadedmetadata=resolve;a.onerror=()=>reject(Error(id));});
   await a.play();await new Promise(resolve=>setTimeout(resolve,150));
   out.push({id,duration:a.duration,playing:!a.paused&&a.currentTime>0,available:available[id]});a.pause();
  }return out;
 });
 assert.equal(results.length,21);assert(results.every(r=>r.playing&&r.duration>0&&r.available));
 await page.locator('.large[data-action="start"]').click();await page.locator('[data-action="sound"]').click();
 const stations=['intro','sequence','structure','bridges','organization','chemistry','interaction','damage','application'];
 for(let i=0;i<stations.length;i++){
  await page.locator(`[data-station="${i}"]`).click();
  await page.waitForFunction(id=>{const a=window.__museum.getAudioState();return a.id===id&&!a.paused&&a.time>0},stations[i]);
 }
 await page.evaluate(()=>window.__museum.performAction('tour'));
 for(let i=0;i<11;i++){
  await page.evaluate(i=>{const c=window.__museum.clock;const sum=c.weights.reduce((a,b)=>a+b,0),before=c.weights.slice(0,i).reduce((a,b)=>a+b,0);c.start=performance.now()-(before/sum*c.duration*1000+100)},i);
  await page.waitForFunction(id=>window.__museum.getAudioState().id===id&&!window.__museum.getAudioState().paused,'tour-'+i);
 }
 assert.deepEqual(errors,[]);
 const duration=await page.evaluate(()=>window.__museum.clock.duration);
 fs.writeFileSync('evidence/audio-results.json',JSON.stringify({results,stations,tourSteps:11,tourDuration:duration,offline:true,errors,scope:'Reproducción y mapeo comprobados en navegador; no transcripción ni evaluación auditiva de la voz.'},null,2));
 console.log('PASS: 21 MP3 reproducibles offline, 9 estaciones, 11 pasos del recorrido. Duración:',duration);
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
