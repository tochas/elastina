import http from 'node:http';import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');const stateFile=path.resolve(root,'../.server.pid');const port=Number(process.env.MUSEUM_PORT||4176);const token=crypto.randomBytes(24).toString('hex');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json','.png':'image/png','.svg':'image/svg+xml','.wav':'audio/wav','.mp3':'audio/mpeg','.pdf':'application/pdf','.pdb':'chemical/x-pdb','.cif':'text/plain','.woff2':'font/woff2'};
const server=http.createServer((req,res)=>{
 let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400).end();return;}
 if(pathname==='/__health'){res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'}).end(JSON.stringify({app:'museo-elastina',pid:process.pid}));return;}
 if(pathname==='/__stop'){if(req.method!=='POST'||req.headers['x-museum-token']!==token){res.writeHead(403).end();return;}res.end('Museo cerrado');setTimeout(()=>server.close(()=>process.exit(0)),50);return;}
 const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
 let stat;try{stat=fs.statSync(file);if(!stat.isFile())throw Error();}catch{res.writeHead(404,{'Content-Type':'text/plain'}).end('Recurso no encontrado');return;}
 const headers={'Content-Type':mime[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':'no-cache','Accept-Ranges':'bytes','Referrer-Policy':'no-referrer'};
 if(req.method==='HEAD'){res.writeHead(200,{...headers,'Content-Length':stat.size}).end();return;}
 const match=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range||'');if(match){const start=Number(match[1]),end=Math.min(match[2]?Number(match[2]):stat.size-1,stat.size-1);if(start>end||start>=stat.size){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`}).end();return;}res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${stat.size}`,'Content-Length':end-start+1});fs.createReadStream(file,{start,end}).pipe(res);}else{res.writeHead(200,{...headers,'Content-Length':stat.size});fs.createReadStream(file).pipe(res);}
});
server.on('error',e=>{console.error(e.code==='EADDRINUSE'?'El puerto 4176 está ocupado. Cierra la otra copia del museo.':e.message);process.exit(1);});
server.listen(port,'127.0.0.1',()=>{fs.writeFileSync(stateFile,JSON.stringify({pid:process.pid,port,token}));console.log(`Museo disponible en http://localhost:${port}`);});
process.on('exit',()=>{try{if(JSON.parse(fs.readFileSync(stateFile)).pid===process.pid)fs.unlinkSync(stateFile);}catch{}});
