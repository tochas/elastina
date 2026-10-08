import {readdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
const dir=path.resolve('dist');
async function files(dir,base=''){const out=[];for(const e of await readdir(dir,{withFileTypes:true})){const key=base+'/'+e.name;if(e.isDirectory())out.push(...await files(path.join(dir,e.name),key));else out.push(key);}return out;}
const all=(await files(dir)).filter(x=>x!='/sw.js');
const version=createHash('sha256');for(const f of all)version.update(await readFile(path.join(dir,f)));
const cache='elastin-museum-'+version.digest('hex').slice(0,12);
// The original PDFs and coordinate archives are useful offline but optional for startup.
const optional=all.filter(f=>f.startsWith('/docs/'));
const required=all.filter(f=>!optional.includes(f));
const sw=`const CACHE=${JSON.stringify(cache)};const REQUIRED=${JSON.stringify(required)},OPTIONAL=${JSON.stringify(optional)};
self.addEventListener('install',event=>event.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(REQUIRED);await Promise.allSettled(OPTIONAL.map(p=>c.add(p)));await self.skipWaiting();})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('elastin-museum-')&&k!==CACHE)await caches.delete(k);await self.clients.claim();})()));
self.addEventListener('fetch',event=>{const u=new URL(event.request.url);if(u.origin!==self.location.origin||!['GET','HEAD'].includes(event.request.method)||u.pathname.startsWith('/__'))return;event.respondWith((async()=>{const c=await caches.open(CACHE);const found=await c.match(u.href,{ignoreSearch:true});if(found)return event.request.method==='HEAD'?new Response(null,{status:found.status,headers:found.headers}):found;try{return await fetch(event.request);}catch{if(event.request.mode==='navigate')return await c.match('/index.html')||await c.match('/offline.html');return new Response('Recurso local no disponible',{status:503});}})());});`;
await writeFile(path.join(dir,'sw.js'),sw);console.log(`Offline cache ${cache}: ${required.length} required, ${optional.length} optional files.`);
