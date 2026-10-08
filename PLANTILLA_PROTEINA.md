# Incorporar la cuarta proteína

Parte del contrato ProteinConfig en src/types.ts y de src/data/elastin.ts. Cada sala debe definir identidad, especie, secuencia con numeración explícita, modelos locales y procedencia, colores, niveles aplicables, regiones con evidencia, química, interacciones, aplicación concreta, fuentes, preguntas, guiones, recorrido y ficha.

El catálogo tiene cuatro espacios; el cuarto está deshabilitado. Las salas previas son proyectos independientes. Habilitar una sala requiere cargar su configuración y adaptar los componentes científicos de main.ts y molecule.ts. No es correcto reutilizar mecánicas de desmosina para otra proteína ni afirmar que basta sustituir el nombre.

Mantén controles, navegación, profundidad, fuentes, retos con retroalimentación, modo expositor, PWA y pruebas. Oculta niveles no aplicables. Conserva separación entre datos, modelos predichos y esquemas. Si se exige estructura experimental, verifica la entidad y ensamblaje antes de usar un identificador PDB.

evaluationCriteria permite incorporar después criterios oficiales; collectionSettings mantiene espacio para rúbrica y duración total. No hay porcentajes inventados.
