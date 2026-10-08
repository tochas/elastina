import fs from 'node:fs';
const scripts=JSON.parse(fs.readFileSync('public/audio/scripts.json','utf8'));
const availability=Object.fromEntries(Object.keys(scripts).map(id=>[id,fs.existsSync(`public/audio/${id}.mp3`)]));
fs.writeFileSync('public/audio/availability.json',JSON.stringify(availability,null,2));
console.log(`Narraciones locales: ${Object.values(availability).filter(Boolean).length}/${Object.keys(availability).length}. Los textos siempre están disponibles.`);
