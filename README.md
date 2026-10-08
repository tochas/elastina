# Museo Interactivo de Proteínas — Elastina humana

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

Hay 21 guiones distintos, incluidos sequence.mp3, structure.mp3 y damage.mp3. No hay voz de Windows ni servicio en línea obligatorio. Los 21 MP3 proporcionados por el equipo están integrados y comprobados para reproducción local y offline. El recorrido ajustado a estas narraciones dura 95 segundos.

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

- [UniProt · P15502](https://www.uniprot.org/uniprotkb/P15502/entry): Secuencia canónica: 786 residuos; señal 1–26 y cadena procesada 27–786. Hay otras isoformas.
- [AlphaFold DB · AF-P15502-F1 v6](https://alphafold.ebi.ac.uk/entry/P15502): Predicción publicada: pLDDT medio 35,84 y 97,7 % de residuos con confianza muy baja. No demuestra una conformación estable.
- [Baldock et al. · 2011](https://pmc.ncbi.nlm.nih.gov/articles/PMC3060269/): La dispersión de rayos X y neutrones estudia la forma promedio en solución; no resuelve todos los átomos.
- [NMR de elastina · 2012](https://pmc.ncbi.nlm.nih.gov/articles/PMC3365696/): Evidencia de movilidad y poblaciones conformacionales. No corresponde atribuir una única hélice o lámina a toda la cadena.
- [Rauscher y Pomès · 2017](https://elifesciences.org/articles/26526): Estudio computacional de conjuntos desordenados e hidratados; una instantánea no describe toda la elasticidad.
- [Ensamblaje de tropoelastina](https://pmc.ncbi.nlm.nih.gov/articles/PMC7947355/): Síntesis de evidencia sobre coacervación, matriz extracelular y reticulación.
- [Annabi et al. · MeTro, 2017](https://pubmed.ncbi.nlm.nih.gov/28978753/): Sellador de tropoelastina metacriloilada evaluado en modelos animales. Ejemplo preclínico, no recomendación clínica.
- [Digestión de fibras elásticas · 2011](https://pmc.ncbi.nlm.nih.gov/articles/PMC3111325/): La proteólisis compromete la continuidad de las fibras. El esquema del museo no reproduce tasas de digestión ni lugares de corte medidos.
- [Calentamiento de elastina arterial · 2005](https://pubmed.ncbi.nlm.nih.gov/15609619/): El efecto del calentamiento depende de condiciones y duración; no justifica una temperatura universal de desnaturalización.
- [Lockhart-Cairns et al. · 2020](https://www.sasbdb.org/project/1139/): Datos experimentales de tropoelastina y asociación con un fragmento de fibrilina.