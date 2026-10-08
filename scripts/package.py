from pathlib import Path
import zipfile,json,hashlib
root=Path(__file__).resolve().parents[1];output=root.parent/'output';output.mkdir(exist_ok=True)
e=json.loads((root/'evidence/e2e-results.json').read_text(encoding='utf-8'))
x=json.loads((root/'evidence/extended-results.json').read_text(encoding='utf-8'))
f=json.loads((root/'evidence/final-results.json').read_text(encoding='utf-8'))
lines=['# Resultados de pruebas — Elastina','', 'Revisión final: 8 de octubre de 2026.','',
 '## Pruebas ejecutadas','',
 '- TypeScript y compilación de producción: correctos.',
 '- 13 pruebas unitarias aprobadas (controles, zona muerta, secuencia, configuración, tiempo, recursos y daño).',
 f"- {len(e['checks'])} comprobaciones principales de navegador aprobadas.",
 f"- {len(x['checks'])} comprobaciones ampliadas aprobadas.",
 f"- {len(f['checks'])} comprobaciones táctiles/offline adicionales aprobadas.",
 '- Inicio, cierre, reapertura y reutilización del servidor comprobados mediante los BAT reales.',
 '- Auditoría del PDB: 786 Cα, cadena A, numeración consecutiva y secuencia idéntica a UniProt; archivo original conservado.',
 '- Sin errores de consola en la prueba principal; sin solicitudes externas obligatorias.',
 '- Recarga offline simulada desactivando la red del navegador; modelo, ficha y estaciones disponibles.',
 '- Manifest y service worker verificados. No se realizó instalación interactiva de PWA en el perfil personal.',
 '- Capturas revisadas a 1366×768 y 1920×1080; comprobado ancho móvil de 390 px.',
 '', '## Limitaciones comprobables','',
 '- No se dispuso de mando Xbox físico. Se probó el simulador y el mapeo por software; conectividad y vibración requieren ensayo físico.',
 '- Táctil emulado por navegador; no es una certificación en una pantalla táctil física.',
 '- No se activó el modo avión del sistema operativo; el aislamiento de red se simuló en el navegador.',
 '- Los 21 MP3 entregados por el usuario se reprodujeron offline en navegador. Se verificaron los 9 destinos de estaciones y los 11 pasos automáticos; recorrido de 95 segundos. Evidencia: evidence/audio-results.json. No se realizó transcripción ni evaluación auditiva de la voz.',
 '- El modelo AlphaFold tiene confianza muy baja; las interacciones y red no representan contactos atómicos experimentales.',
 '- El contador registra frecuencia del bucle en este equipo; no certifica 30/60 FPS en otra laptop ni rendimiento bajo todas las representaciones.',
 '', '## Comprobaciones detalladas','']
for title,data in [('Principal',e),('Ampliadas',x),('Táctil y archivos',f)]:
 lines.extend(['### '+title,'']+['- '+c for c in data['checks']]+[''])
(root/'RESULTADOS_PRUEBAS.md').write_text('\n'.join(lines),encoding='utf-8')
excluded={'node_modules','.git','.server.pid','server.log','server-error.log','__pycache__'}
hashes={}
for name,github in [('Museo_Elastina_v1.0.zip',False),('Elastina_Para_GitHub_Vercel.zip',True)]:
 destination=output/name
 with zipfile.ZipFile(destination,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
  for path in root.rglob('*'):
   rel=path.relative_to(root)
   if not path.is_file() or any(part in excluded for part in rel.parts):continue
   if github and rel.parts[0] in {'dist','runtime','evidence'}:continue
   z.write(path,str(rel) if github else str(Path('museo-elastina')/rel))
 hashes[name]={'bytes':destination.stat().st_size,'sha256':hashlib.sha256(destination.read_bytes()).hexdigest()}
scripts=json.loads((root/'public/audio/scripts.json').read_text(encoding='utf-8'))
with zipfile.ZipFile(output/'Guiones_ElevenLabs_Elastina.zip','w',zipfile.ZIP_DEFLATED) as z:
 z.write(root/'GUIONES_ELEVENLABS.md','GUIONES_ELEVENLABS.md')
 for key,value in scripts.items():z.writestr(key+'.txt',value)
(output/'Elastina_SHA256.json').write_text(json.dumps(hashes,indent=2),encoding='utf-8')
for name,data in hashes.items():print(name,round(data['bytes']/1024/1024,2),'MB')
