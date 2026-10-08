# Resultados de pruebas — Elastina

Revisión final: 8 de octubre de 2026.

## Pruebas ejecutadas

- TypeScript y compilación de producción: correctos.
- 13 pruebas unitarias aprobadas (controles, zona muerta, secuencia, configuración, tiempo, recursos y daño).
- 27 comprobaciones principales de navegador aprobadas.
- 17 comprobaciones ampliadas aprobadas.
- 5 comprobaciones táctiles/offline adicionales aprobadas.
- Inicio, cierre, reapertura y reutilización del servidor comprobados mediante los BAT reales.
- Auditoría del PDB: 786 Cα, cadena A, numeración consecutiva y secuencia idéntica a UniProt; archivo original conservado.
- Sin errores de consola en la prueba principal; sin solicitudes externas obligatorias.
- Recarga offline simulada desactivando la red del navegador; modelo, ficha y estaciones disponibles.
- Manifest y service worker verificados. No se realizó instalación interactiva de PWA en el perfil personal.
- Capturas revisadas a 1366×768 y 1920×1080; comprobado ancho móvil de 390 px.

## Limitaciones comprobables

- No se dispuso de mando Xbox físico. Se probó el simulador y el mapeo por software; conectividad y vibración requieren ensayo físico.
- Táctil emulado por navegador; no es una certificación en una pantalla táctil física.
- No se activó el modo avión del sistema operativo; el aislamiento de red se simuló en el navegador.
- Los 21 MP3 entregados por el usuario se reprodujeron offline en navegador. Se verificaron los 9 destinos de estaciones y los 11 pasos automáticos; recorrido de 95 segundos. Evidencia: evidence/audio-results.json. No se realizó transcripción ni evaluación auditiva de la voz.
- El modelo AlphaFold tiene confianza muy baja; las interacciones y red no representan contactos atómicos experimentales.
- El contador registra frecuencia del bucle en este equipo; no certifica 30/60 FPS en otra laptop ni rendimiento bajo todas las representaciones.

## Comprobaciones detalladas

### Principal

- 786 residuos locales
- Selección de última posición
- Numeración procesada
- Vista sin señal
- Rechaza hexámero
- Reto de red completado
- Evita duplicados
- Estiramiento aplicado
- Recuperación íntegra
- Reto elasticidad
- Comparación visible
- Soltar no repara proteólisis
- Diferencia desnaturalización y degradación
- Rechaza paso prematuro
- Reto MeTro completo
- Expositor con cinco preguntas
- Teclado rota
- Diagnóstico simulador
- Reinicio 1
- Reinicio 2
- Reinicio 3
- Sin desbordamiento a 1920
- Sin desbordamiento a 1366
- PWA recarga sin red
- Integridad disponible sin red
- Sin solicitudes externas obligatorias
- Sin errores de consola

### Ampliadas

- Picking 3D sincroniza secuencia
- Picking mediante mouse real probado
- Representaciones sin errores
- Rueda acerca
- Texto grande y movimiento reducido
- Calibración simulada
- Auditoría de recursos
- Secuencia tiene audio propio
- Estructura tiene audio propio
- Inactividad real de 20 s
- Interacción detiene recorrido
- Recorrido avanza por estaciones
- Llega a toma el control
- Modo permanente inicia presentación
- Manifest instalable local
- Móvil sin desbordamiento horizontal
- Sin errores de página

### Táctil y archivos

- Pulsación táctil selecciona residuo
- Texto de aminoácido seleccionado
- Cambio conformacional conserva continuidad
- PDF impreso disponible offline
- Metadatos originales disponibles offline
