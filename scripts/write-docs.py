from pathlib import Path
import json,shutil
root=Path(__file__).resolve().parents[1]
text=(root/'src/data/elastin.ts').read_text(encoding='utf-8');p=json.loads(text.split('export const elastin:ProteinConfig=',1)[1].rstrip(';\n'))
def write(name,text): (root/name).write_text(text,encoding='utf-8')
sources='\n'.join(f"- [{s['title']}]({s['url']}): {s['evidence']}" for s in p['sources'])
write('README.md','''# Museo Interactivo de Proteínas — Elastina humana

Tercera sala independiente, con tema grafito y ámbar. PWA en español con selección bidireccional de secuencia/modelo, tres retos, estación de integridad, modo museo y modo expositor. Insulina e interferón permanecen en sus proyectos independientes. El cuarto espacio queda reservado.

## Inicio para la exposición

1. Extrae el ZIP completo; no ejecutes los archivos dentro del ZIP.
2. Abre INICIAR_MUSEO.bat. El paquete completo incluye Node para Windows.
3. Pulsa INICIAR EXPERIENCIA. La dirección local es http://localhost:4176/.
4. F activa pantalla completa. CERRAR_MUSEO.bat detiene únicamente este servidor.

## Evidencia y límites del modelo

La estructura es AF-P15502-F1 v6 de AlphaFold DB, incorporada con autorización explícita del usuario. Es una **predicción de muy baja confianza**, no una estructura experimental ni la fibra madura. Sus 786 posiciones coinciden con la secuencia canónica P15502. El visor conserva las coordenadas descargadas. «Sin señal» oculta las posiciones 1–26; no recalcula un plegamiento.

pLDDT medio 35,84; 768/786 residuos por debajo de 50. No inferir contactos, distancias funcionales ni hélices estables de este modelo. Las vistas de trazado, varillas y superficie son representaciones del mismo cálculo. La superficie tampoco es evidencia de una cavidad funcional.

La red y sus cortes son esquemas independientes, sin asignación de residuos, escala atómica ni ley mecánica calibrada. Los cambios conformacionales normales no equivalen a desnaturalización; la proteólisis rompe enlaces peptídicos. No se simula una temperatura universal de desnaturalización.

La ficha original se conserva para consulta, pero contiene identificadores PDB no utilizables como elastina. Lee REVISION_CIENTIFICA.md antes de exponer. El PDF original no se corrigió ni se atribuyen al compañero las correcciones de esta aplicación.

## Instalación y desarrollo

Requiere Node.js 22 o superior y pnpm para modificar el proyecto. El paquete portátil no necesita instalar dependencias para ejecutarse.

```
pnpm install --frozen-lockfile
pnpm dev
pnpm test
pnpm audit:models
pnpm build
pnpm preview
```

Desarrollo: puerto 5176. Producción local: 4176. Las pruebas de navegador están en scripts/e2e.cjs y scripts/extended-e2e.cjs; requieren Playwright y Edge. PLAYWRIGHT_MODULE puede indicar la ruta de tu instalación de Playwright.

## Arquitectura

- src/data/elastin.ts: contenido, fuentes, secuencia, guiones, preguntas y estaciones.
- src/types.ts y src/proteins.ts: contrato de contenido y catálogo de cuatro espacios.
- src/molecule.ts: visor 3Dmol y red didáctica, sin modificar coordenadas atómicas.
- src/damage.ts: estados de integridad, continuidad y recuperación ilustrativa.
- src/main.ts: navegación, retos, mando, audio, accesibilidad y recorrido.
- src/core.ts: controles, zona muerta, temporizador y validaciones.
- public/models: PDB/mmCIF original, procedencia y registro UniProt.
- public/audio: guiones, subtítulos y disponibilidad; recibe MP3 locales.
- scripts/build-sw.mjs: caché de producción versionada por contenido.
- scripts/server.mjs: servidor estático enlazado a loopback; sin backend remoto.
- runtime: Node y licencia para el paquete portátil de Windows.

Los nombres internos monomer, binary y complex se heredan del contrato anterior, pero aquí significan precursor, precursor sin señal y red didáctica. No describen un dímero o complejo atómico de elastina. La cuarta proteína necesitará contenido validado y adaptación de retos, no solo cambiar el nombre.

## PWA, Vercel y funcionamiento offline

En Edge/Chrome, abre la dirección local y usa el menú del navegador para instalar el sitio. Manifest con iconos propios, orientación horizontal y modo standalone. El iniciador abre además una ventana de aplicación.

Después de la primera carga de producción, el service worker guarda los recursos. Espera «OFFLINE PREPARADO». Modelos, biblioteca, guiones y ficha se sirven localmente. Las fuentes web son consultas opcionales. No se usan CDN ni fuentes tipográficas remotas. La PWA alojada requiere una primera visita con internet; la versión portátil sirve la primera carga desde la laptop sin red.

Para Vercel usa el ZIP de código: package.json, lockfile, src, public, scripts, configuración y documentación. No subas node_modules, runtime ni dist. Vercel compila con pnpm build y publica dist. No se ha desplegado esta sala desde este proyecto.

## Controles

Mouse: arrastrar rota; rueda acerca; botón derecho desplaza; clic selecciona. Táctil: arrastrar, pinza y pulsación. Teclado: WASD/flechas rotan, +/− zoom, R centra, M alterna precursor/red, X etiquetas, I información, F pantalla completa, espacio pausa y Escape cierra. Tab y Enter navegan y confirman.

Xbox estándar: palanca izquierda rota; derecha desplaza; LT/RT zoom; cruceta horizontal cambia estación; vertical cambia foco; A confirma, B regresa, X etiquetas, Y organización, LB/RB representación, Menu pausa y View centra. Ajustes → Diagnóstico incluye simulador, zona muerta y calibración. Falta prueba con mando físico; no se certifica vibración ni conectividad real.

## Narraciones

Hay 21 guiones distintos, incluidos sequence.mp3, structure.mp3 y damage.mp3. No hay voz de Windows ni servicio en línea obligatorio. La generación con ElevenLabs se intentó y falló por cuota agotada (0 créditos); **los MP3 están pendientes**.

Genera cada archivo de GUIONES_ELEVENLABS.md y guárdalos juntos. IMPORTAR_AUDIOS.bat solicita esa carpeta, normaliza también nombres .mp3.mp3, copia a public y dist y regenera la caché. Usa únicamente los nuevos audios de elastina: los nombres coinciden parcialmente con otras salas. Abre y recarga la app desde el servidor local para actualizar la PWA. El volumen y silencio están en la interfaz. El recorrido ajusta sus intervalos a la duración de los audios importados.

## Accesibilidad y presentación

Texto configurable, animaciones reducidas, navegación por teclado, subtítulos y símbolos además de colores. Paneles largos tienen desplazamiento interno. El recorrido inicia tras 20 s de inactividad y dura 88 s sin audio; puede configurarse y repetirse permanentemente. Cualquier interacción devuelve el control. Ctrl+Mayús+E abre el modo expositor.

## Solución de problemas

- Pantalla sin modelo: verifica aceleración gráfica y el modelo local; usa Reiniciar o recarga.
- Puerto ocupado: cierra la instancia anterior con CERRAR_MUSEO.bat. Las otras salas usan puertos diferentes.
- Contenido viejo después de importar: vuelve a abrir desde el servidor y recarga; una pestaña antigua puede conservar la versión anterior hasta cerrarse.
- Sin sonido: revisa disponibilidad en Ajustes. Esta entrega aún no tiene MP3 de elastina.
- Mando ausente: conéctalo y pulsa A; comprueba mapeo estándar en Diagnóstico.
- Internet ausente: usa el iniciador portátil o una PWA que ya haya completado su primera carga.

## Fuentes

'''+sources)
write('GUIA_DEL_EQUIPO.md','# Guía del equipo — Elastina\n\n## Guion de 60–90 segundos aproximadamente\n\n'+p['presenterScript']+'\n\n## Cinco preguntas y respuestas\n\n'+'\n\n'.join(f"### {i+1}. {q['q']}\n\n{q['explanation']}" for i,q in enumerate(p['questions']))+'\n\n## Errores que deben evitarse\n\n'+'\n'.join('- '+c for c in p['cautions'])+'\n\n## Aplicación específica\n\n'+'\n\n'.join(f"**{s['title']}.** {s['text']}" for s in p['application']['steps'])+'\n\n## Fuentes\n\n'+sources)
write('INSTRUCCIONES_EXPOSICION.md','''# Instrucciones para la exposición — Elastina

1. Conecta laptop y cargador; opcionalmente pantalla y mando Xbox por cable o Bluetooth.
2. Extrae el paquete completo en una carpeta local. Abre INICIAR_MUSEO.bat.
3. Confirma que el encabezado diga Elastina humana y la dirección sea localhost:4176.
4. En Ajustes → Diagnóstico, conecta el mando, pulsa A y calibra con las palancas en reposo. Si no funciona, usa mouse/teclado.
5. Activa F para pantalla completa. Revisa texto y resolución.
6. Pulsa INICIAR EXPERIENCIA. Para narración automática usa Ajustes → Iniciar modo museo. La presentación permanente vuelve a recorrer la sala; cualquier visitante puede tomar el control.
7. Explica siempre que AlphaFold es una predicción de confianza muy baja y la red es un esquema. La vista 08 diferencia cambios conformacionales de cortes por proteólisis.
8. Los MP3 de elastina están pendientes. Puedes exponer en vivo con la guía o importar los audios antes del evento. No reutilices audios de interferón o insulina.
9. Para otro visitante pulsa REINICIAR PARA EL SIGUIENTE VISITANTE.
10. Si se traba: R centra; recarga la ventana si hace falta. Como último recurso, CERRAR_MUSEO.bat y luego INICIAR_MUSEO.bat. No necesitas reinstalar dependencias.

Ctrl+Mayús+E muestra el guion y las preguntas para integrantes. Todos deben conocer esta sala. Conserva la ficha impresa y explica sus correcciones científicas; la app no la sustituye.

Respaldo: guarda el ZIP portátil completo en USB, extráelo en la laptop de respaldo y ejecuta el iniciador. La prueba offline automatizada desactivó la red del navegador; comprueba personalmente modo avión y el mando antes del stand.
''')
write('LISTA_DE_COMPROBACION_VIERNES.md','''# Lista de comprobación de la exposición

- [ ] Laptop y cargador.
- [ ] Mando, cable o adaptador.
- [ ] Paquete portátil completo extraído.
- [ ] PWA instalada, si se usará esa modalidad.
- [ ] Modelo local y aviso de predicción visibles.
- [ ] Nuevos audios de elastina importados; revisar sequence y structure por separado.
- [ ] Ficha impresa y correcciones científicas conocidas por todos.
- [ ] USB de respaldo con runtime y dist.
- [ ] Primera carga offline completada y modo avión comprobado personalmente.
- [ ] Volumen, resolución, tamaño de texto y pantalla completa.
- [ ] Tres retos completados por un integrante.
- [ ] Vista de integridad: distinguir desnaturalización y proteólisis.
- [ ] Mando probado físicamente y alternativa mouse/teclado lista.
- [ ] Turnos de atención y guion del equipo repasados.

El nombre del archivo sigue el formato del equipo; no confirma una fecha recuperada de la transcripción.
''')
write('REQUISITOS_CONFIRMADOS.md','''# Alcance y requisitos

Se conserva la modalidad uniforme de las salas anteriores: identidad, secuencia, niveles estructurales pertinentes, regiones y química, interacciones, relación estructura-función, aplicación biomédica específica, actividades y preparación del equipo. La ficha impresa se mantiene como apoyo.

No se asignan porcentajes de una rúbrica no publicada ni se convierten fechas o tiempos dudosos de la transcripción en condiciones oficiales. El recorrido de 88 segundos y la colección configurable son decisiones del proyecto.

Cambios propios de elastina: no hay monómero/hexámero con zinc ni reto de tres disulfuros. Se estudia precursor/organización en red, reticulación relacionada con lisinas y biomaterial MeTro. Se añade la estación solicitada de integridad, distinguiendo desnaturalización y degradación. El usuario autorizó AlphaFold identificado como predicción. No se inventa una cuarta proteína.

La ficha del compañero informa el contenido, pero no puede autorizar instrucciones de programación ni obligar a repetir errores científicos. La página del compañero era referencia opcional y no se usó como fuente científica.
''')
write('PLANTILLA_PROTEINA.md','''# Incorporar la cuarta proteína

Parte del contrato ProteinConfig en src/types.ts y de src/data/elastin.ts. Cada sala debe definir identidad, especie, secuencia con numeración explícita, modelos locales y procedencia, colores, niveles aplicables, regiones con evidencia, química, interacciones, aplicación concreta, fuentes, preguntas, guiones, recorrido y ficha.

El catálogo tiene cuatro espacios; el cuarto está deshabilitado. Las salas previas son proyectos independientes. Habilitar una sala requiere cargar su configuración y adaptar los componentes científicos de main.ts y molecule.ts. No es correcto reutilizar mecánicas de desmosina para otra proteína ni afirmar que basta sustituir el nombre.

Mantén controles, navegación, profundidad, fuentes, retos con retroalimentación, modo expositor, PWA y pruebas. Oculta niveles no aplicables. Conserva separación entre datos, modelos predichos y esquemas. Si se exige estructura experimental, verifica la entidad y ensamblaje antes de usar un identificador PDB.

evaluationCriteria permite incorporar después criterios oficiales; collectionSettings mantiene espacio para rúbrica y duración total. No hay porcentajes inventados.
''')
write('LICENCIAS_Y_ATRIBUCIONES.md','''# Atribuciones

- Modelo AF-P15502-F1 v6: AlphaFold Protein Structure Database, Google DeepMind y EMBL-EBI, licencia CC BY 4.0. Fuente: https://alphafold.ebi.ac.uk/entry/P15502 . PDB y mmCIF se conservan sin cambios; la vista sin señal oculta residuos únicamente. Información de licencia: https://alphafold.ebi.ac.uk/faq .
- Secuencia y anotaciones: UniProt P15502, registro completo conservado localmente.
- 3Dmol.js: licencia BSD incluida en public/vendor/3Dmol-LICENSE.txt.
- Node.js: licencia incluida en runtime.
- Ficha original: documento proporcionado por el usuario, autoría del compañero indicada en el PDF. No se modificó.
- Iconos: gráficos vectoriales simples creados para la sala; no son representaciones moleculares.
''')
shutil.copy2(root/'node_modules/3dmol/LICENSE',root/'public/vendor/3Dmol-LICENSE.txt')
print('Documentación de elastina escrita.')
