import type {ProteinConfig} from '../types';
export const elastin:ProteinConfig={
  "id": "elastin",
  "name": "Elastina humana",
  "species": "Homo sapiens",
  "type": "Proteína estructural extracelular",
  "enabled": true,
  "pdb": "AF-P15502-F1 · predicción",
  "models": {
    "monomer": "/models/AF-P15502-F1-model_v6.pdb",
    "binary": "/models/AF-P15502-F1-model_v6.pdb",
    "complex": "/models/AF-P15502-F1-model_v6.pdb"
  },
  "assembly": 0,
  "chains": [
    {
      "id": "A",
      "sequence": "MAGLTAAAPRPGVLLLLLSILHPSRPGGVPGAIPGGVPGGVFYPGAGLGALGGGALGPGGKPLKPVPGGLAGAGLGAGLGAFPAVTFPGALVPGGVADAAAAYKAAKAGAGLGGVPGVGGLGVSAGAVVPQPGAGVKPGKVPGVGLPGVYPGGVLPGARFPGVGVLPGVPTGAGVKPKAPGVGGAFAGIPGVGPFGGPQPGVPLGYPIKAPKLPGGYGLPYTTGKLPYGYGPGGVAGAAGKAGYPTGTGVGPQAAAAAAAKAAAKFGAGAAGVLPGVGGAGVPGVPGAIPGIGGIAGVGTPAAAAAAAAAAKAAKYGAAAGLVPGGPGFGPGVVGVPGAGVPGVGVPGAGIPVVPGAGIPGAAVPGVVSPEAAAKAAAKAAKYGARPGVGVGGIPTYGVGAGGFPGFGVGVGGIPGVAGVPGVGGVPGVGGVPGVGISPEAQAAAAAKAAKYGAAGAGVLGGLVPGAPGAVPGVPGTGGVPGVGTPAAAAAKAAAKAAQFGLVPGVGVAPGVGVAPGVGVAPGVGLAPGVGVAPGVGVAPGVGVAPGIGPGGVAAAAKSAAKVAAKAQLRAAAGLGAGIPGLGVGVGVPGLGVGAGVPGLGVGAGVPGFGAGADEGVRRSLSPELREGDPSSSQHLPSTPSSPRVPGALAAAKAAKYGAAVPGVLGGLGALGGVGIPGGVVGAGPAAAAAAAKAAAKAAQFGLVGAAGLGGLGVGGLGVPGVGGLGGIPPAAAAKAAKYGAAGLGGVLGGAGQFPLGGVAARPGFGLSPIFPGGACLGKACGRKRK",
      "color": "#f7bd64"
    }
  ],
  "bridges": [],
  "levels": [
    {
      "id": "primary",
      "title": "Primaria",
      "text": "786 residuos del precursor canónico. Explora letras, posiciones y grupos químicos.",
      "applicable": true,
      "selection": []
    },
    {
      "id": "secondary",
      "title": "Secundaria",
      "text": "Giros y propensiones locales dependen del entorno. No se asignan hélices estables desde una predicción de confianza muy baja.",
      "applicable": true,
      "selection": []
    },
    {
      "id": "tertiary",
      "title": "Terciaria",
      "text": "Conjunto móvil de conformaciones; una instantánea calculada no representa toda la dinámica.",
      "applicable": true,
      "selection": []
    },
    {
      "id": "quaternary",
      "title": "Red madura",
      "text": "Organización supramolecular reticulada, no un oligómero de número fijo. Vista esquemática.",
      "applicable": true,
      "selection": []
    }
  ],
  "regions": [],
  "functionalGroups": [
    {
      "name": "Amina lateral de lisina",
      "residues": [
        "A61",
        "A64",
        "A104",
        "A107",
        "A137",
        "A140",
        "A176",
        "A178",
        "A209",
        "A212",
        "A225",
        "A241",
        "A261",
        "A265",
        "A312",
        "A315",
        "A375",
        "A379",
        "A382",
        "A448",
        "A451",
        "A492",
        "A496",
        "A558",
        "A562",
        "A566",
        "A653",
        "A656",
        "A693",
        "A697",
        "A735",
        "A738",
        "A779",
        "A784",
        "A786"
      ],
      "text": "La amina lateral puede participar en modificaciones y reticulación. No se afirma que esta lisina específica esté enlazada en una fibra real."
    }
  ],
  "function": "Recuperación elástica de tejidos",
  "interactions": [
    "Fibrilina",
    "Proteínas de ensamblaje",
    "LOX"
  ],
  "application": {
    "name": "MeTro · sellador elástico experimental",
    "steps": [
      {
        "title": "Tropoelastina recombinante",
        "text": "Se produce el precursor proteico como materia prima.",
        "icon": "①"
      },
      {
        "title": "Modificar grupos amino",
        "text": "Se introducen grupos metacriloilo: ya es un material modificado, no elastina nativa.",
        "icon": "②"
      },
      {
        "title": "Aplicar el precursor del gel",
        "text": "En el estudio experimental se sitúa el material sobre el tejido que se busca sellar.",
        "icon": "③"
      },
      {
        "title": "Fotoreticular",
        "text": "Con el sistema de iniciación y la luz del protocolo se forma una red de hidrogel. No representa la acción natural de LOX.",
        "icon": "④"
      },
      {
        "title": "Evaluar el sellado",
        "text": "Se comprueba adhesión, resistencia y capacidad de acompañar la deformación del tejido.",
        "icon": "⑤"
      },
      {
        "title": "Evaluar seguridad y degradación",
        "text": "Los resultados preclínicos requieren evaluación adicional antes de inferir eficacia clínica.",
        "icon": "⑥"
      }
    ],
    "sourceIds": [
      "metro"
    ]
  },
  "stations": [
    {
      "id": "identity",
      "title": "La memoria\ndel tejido",
      "kicker": "01 / IDENTIDAD",
      "text": "La elastina permite que tejidos como arterias, pulmones y piel recuperen su forma tras deformarse. Su precursor soluble es la tropoelastina.",
      "detail": "Es una proteína estructural extracelular humana, producto del gen ELN. No es una enzima ni una hormona. La elasticidad requiere una red organizada y el entorno hidratado, no solo una cadena aislada.",
      "sources": [
        "uniprot",
        "shape"
      ],
      "focus": "",
      "organization": "monomer",
      "audio": "intro"
    },
    {
      "id": "sequence",
      "title": "Un alfabeto\nflexible",
      "kicker": "02 / SECUENCIA",
      "text": "Explora la secuencia canónica de 786 residuos. Los primeros 26 forman la señal de secreción; se retiran del precursor.",
      "detail": "La numeración del visor siempre corresponde al precursor canónico P15502. La cadena procesada de esta isoforma contiene 760 residuos. Otros constructos experimentales tienen longitudes distintas, como 698; no son errores ni equivalentes automáticamente. Gly y Pro favorecen movilidad y giros; las lisinas aportan grupos amino para reticulación.",
      "sources": [
        "uniprot"
      ],
      "focus": "",
      "organization": "monomer",
      "audio": "sequence"
    },
    {
      "id": "structure",
      "title": "Flexibilidad\ncon propósito",
      "kicker": "03 / ESTRUCTURA",
      "text": "La elastina no necesita un plegamiento globular único para funcionar. Las conformaciones móviles son parte de su biología.",
      "detail": "Se han estudiado giros y propensiones helicoidales locales. No etiquetamos hélices ni láminas estables usando esta predicción de confianza muy baja. El trazado 3D es una instantánea calculada; las formas y distancias globales no deben interpretarse como evidencia experimental.",
      "sources": [
        "nmr",
        "af",
        "liquid"
      ],
      "focus": "",
      "organization": "monomer",
      "audio": "structure"
    },
    {
      "id": "crosslinks",
      "title": "De cadenas\na una red",
      "kicker": "04 / CONECTA",
      "text": "Las lisinas participan en enlaces que dan continuidad a la red elástica. La lisil oxidasa inicia la química de reticulación.",
      "detail": "LOX transforma ciertas lisinas en alisina mediante desaminación oxidativa. Reacciones posteriores forman diferentes enlaces; desmosina e isodesmosina derivan de cuatro residuos de lisina. No todas las lisinas se enlazan, ni cuatro residuos implican siempre cuatro cadenas. No se inventa un mapa de conexiones atómicas.",
      "sources": [
        "uniprot",
        "assembly"
      ],
      "focus": "",
      "organization": "complex",
      "audio": "bridges"
    },
    {
      "id": "organization",
      "title": "Estira. Suelta.\nObserva.",
      "kicker": "05 / ELASTICIDAD",
      "text": "Aplica una deformación al esquema de red y retira la carga. Relaciona continuidad, movilidad y recuperación.",
      "detail": "Estirar exige trabajo mecánico. La recuperación libera parte de la energía almacenada; no crea energía. El dibujo no es una simulación molecular ni una ley medida de un tejido. La red madura no tiene un número fijo de subunidades como un dímero o un hexámero.",
      "sources": [
        "liquid",
        "shape"
      ],
      "focus": "",
      "organization": "complex",
      "audio": "organization"
    },
    {
      "id": "chemistry",
      "title": "La química\nque conecta",
      "kicker": "06 / QUÍMICA",
      "text": "Selecciona lisina, glicina o prolina en la secuencia. Sus propiedades ayudan a entender reticulación y movilidad.",
      "detail": "La amina lateral de Lys ofrece una vía de modificación química. Gly tiene una cadena lateral mínima; Pro restringe la geometría local. El disulfuro C776–C781 está anotado por similitud en UniProt, pero no es la base de la reticulación de la elastina madura. No dibujamos un enlace experimental que este modelo no demuestra.",
      "sources": [
        "uniprot"
      ],
      "focus": "",
      "organization": "monomer",
      "audio": "chemistry"
    },
    {
      "id": "interaction",
      "title": "Una red\nacompañada",
      "kicker": "07 / INTERACCIONES",
      "text": "La elastina trabaja en la matriz extracelular. Las microfibrillas con fibrilina ayudan a organizar el ensamblaje de fibras elásticas.",
      "detail": "Fibrilina y proteínas auxiliares participan en el ensamblaje. LOX cataliza la oxidación inicial de lisinas; el sitio activo pertenece a la enzima LOX, no a la elastina. Esta sala no inventa una cavidad receptora ni coordenadas de contacto entre proteínas.",
      "sources": [
        "fibrillin",
        "assembly"
      ],
      "focus": "",
      "organization": "complex",
      "audio": "interaction"
    },
    {
      "id": "damage",
      "title": "¿Desnaturalización\no degradación?",
      "kicker": "08 / INTEGRIDAD",
      "text": "Cambiar de conformación no es lo mismo que cortar una proteína. Compara una red íntegra con una red degradada.",
      "detail": "La desnaturalización describe pérdida de organización conformacional sin requerir rotura de enlaces peptídicos. La movilidad normal de la elastina no significa desnaturalización. Una elastasa puede degradarla por proteólisis. Los cortes del esquema son simbólicos: no señalan residuos específicos ni simulan una temperatura o dosis.",
      "sources": [
        "damage",
        "heat",
        "nmr"
      ],
      "focus": "",
      "organization": "complex",
      "audio": "damage"
    },
    {
      "id": "application",
      "title": "De la molécula\nal biomaterial",
      "kicker": "09 / INGENIERÍA BIOMÉDICA",
      "text": "MeTro es un sellador elástico experimental elaborado a partir de tropoelastina recombinante modificada. Descubre cómo se conecta química y mecánica.",
      "detail": "En el estudio de 2017 se añadieron grupos metacriloilo para formar un hidrogel mediante fotoreticulación. Se investigó el sellado de tejidos, incluido pulmón, en animales. Diseñar estos materiales exige equilibrar adhesión, elasticidad, resistencia y degradación. No es la reticulación natural por desmosina ni una recomendación de tratamiento.",
      "sources": [
        "metro"
      ],
      "focus": "",
      "organization": "complex",
      "audio": "application"
    }
  ],
  "questions": [
    {
      "q": "¿Qué secuencia muestra el museo?",
      "answers": [
        "Precursor canónico de 786 aa",
        "Todas las isoformas tienen 786 aa",
        "Solo 51 aa"
      ],
      "correct": 0,
      "explanation": "Se muestra P15502 canónico, 786 residuos; la señal 1–26 se retira. La cadena procesada de esta isoforma tiene 760."
    },
    {
      "q": "¿Qué significa pLDDT bajo?",
      "answers": [
        "Baja confianza en la predicción local",
        "Una medición de elasticidad",
        "Un tejido enfermo"
      ],
      "correct": 0,
      "explanation": "Es una estimación de confianza del modelo. No prueba enfermedad ni cuantifica flexibilidad."
    },
    {
      "q": "¿Qué describe la elastina madura?",
      "answers": [
        "Una red reticulada sin tamaño fijo",
        "Un hexámero con zinc",
        "Una enzima"
      ],
      "correct": 0,
      "explanation": "Muchas cadenas participan en una red insoluble. No es un oligómero de estequiometría fija."
    },
    {
      "q": "¿Cortar enlaces peptídicos es solo desnaturalizar?",
      "answers": [
        "No: es degradación proteolítica",
        "Sí: son sinónimos",
        "Es síntesis"
      ],
      "correct": 0,
      "explanation": "La proteólisis corta la cadena. Un cambio conformacional no requiere esos cortes."
    },
    {
      "q": "¿Qué distingue a MeTro?",
      "answers": [
        "Tropoelastina modificada y fotoreticulada",
        "Una fibra natural sin modificaciones",
        "Un medicamento aprobado por este estudio"
      ],
      "correct": 0,
      "explanation": "Es un biomaterial experimental modificado. El estudio citado aporta evidencia preclínica en animales."
    }
  ],
  "activities": [
    {
      "id": "chemistry",
      "kind": "bridges",
      "title": "Construye la lógica de la red"
    },
    {
      "id": "elasticity",
      "kind": "organization",
      "title": "Estira y compara"
    },
    {
      "id": "metro",
      "kind": "pathway",
      "title": "Del precursor al sellador"
    }
  ],
  "audios": {
    "intro": {
      "text": "La elastina permite que tejidos como arterias, pulmones y piel recuperen su forma tras deformarse. Su precursor soluble es la tropoelastina. ",
      "file": "/audio/intro.mp3"
    },
    "sequence": {
      "text": "Explora la secuencia canónica de 786 residuos. Los primeros 26 forman la señal de secreción; se retiran del precursor. La numeración se conserva para relacionar cada letra con el modelo.",
      "file": "/audio/sequence.mp3"
    },
    "structure": {
      "text": "La elastina no necesita un plegamiento globular único para funcionar. Las conformaciones móviles son parte de su biología. El trazado de AlphaFold es una predicción, no evidencia de un plegamiento fijo.",
      "file": "/audio/structure.mp3"
    },
    "bridges": {
      "text": "Las lisinas participan en enlaces que dan continuidad a la red elástica. La lisil oxidasa inicia la química de reticulación. ",
      "file": "/audio/bridges.mp3"
    },
    "organization": {
      "text": "Aplica una deformación al esquema de red y retira la carga. Relaciona continuidad, movilidad y recuperación. ",
      "file": "/audio/organization.mp3"
    },
    "chemistry": {
      "text": "Selecciona lisina, glicina o prolina en la secuencia. Sus propiedades ayudan a entender reticulación y movilidad. ",
      "file": "/audio/chemistry.mp3"
    },
    "interaction": {
      "text": "La elastina trabaja en la matriz extracelular. Las microfibrillas con fibrilina ayudan a organizar el ensamblaje de fibras elásticas. ",
      "file": "/audio/interaction.mp3"
    },
    "damage": {
      "text": "Cambiar de conformación no es lo mismo que cortar una proteína. Compara una red íntegra con una red degradada. La proteólisis rompe enlaces peptídicos; la desnaturalización no requiere esos cortes.",
      "file": "/audio/damage.mp3"
    },
    "application": {
      "text": "MeTro es un sellador elástico experimental elaborado a partir de tropoelastina recombinante modificada. Descubre cómo se conecta química y mecánica. ",
      "file": "/audio/application.mp3"
    },
    "complete": {
      "text": "¡Reto completado! Reconociste cómo la secuencia, la química y la organización contribuyen a una red elástica.",
      "file": "/audio/complete.mp3"
    },
    "tour-0": {
      "text": "La elastina acompaña cada latido y cada respiración. Descubre cómo una red ayuda a recuperar la forma.",
      "file": "/audio/tour-0.mp3"
    },
    "tour-1": {
      "text": "La secuencia canónica del precursor tiene setecientos ochenta y seis aminoácidos. Hay distintas isoformas.",
      "file": "/audio/tour-1.mp3"
    },
    "tour-2": {
      "text": "Selecciona una letra para localizar ese residuo en el modelo publicado. Conservamos la numeración del precursor.",
      "file": "/audio/tour-2.mp3"
    },
    "tour-3": {
      "text": "Esta imagen es una predicción de AlphaFold con confianza muy baja. No demuestra un plegamiento estable.",
      "file": "/audio/tour-3.mp3"
    },
    "tour-4": {
      "text": "Ciertas lisinas participan en la reticulación. La lisil oxidasa inicia la química que conecta la red.",
      "file": "/audio/tour-4.mp3"
    },
    "tour-5": {
      "text": "Estirar requiere trabajo. Al retirar la carga, una red elástica íntegra puede recuperar su forma.",
      "file": "/audio/tour-5.mp3"
    },
    "tour-6": {
      "text": "Las lisinas aportan grupos amino. Glicina y prolina contribuyen a propiedades distintas de la cadena.",
      "file": "/audio/tour-6.mp3"
    },
    "tour-7": {
      "text": "La fibrilina y otras proteínas ayudan a organizar las fibras en la matriz extracelular.",
      "file": "/audio/tour-7.mp3"
    },
    "tour-8": {
      "text": "Cambiar de conformación no equivale a cortar la cadena. La degradación proteolítica puede dañar la continuidad de la red.",
      "file": "/audio/tour-8.mp3"
    },
    "tour-9": {
      "text": "MeTro utiliza tropoelastina modificada como sellador elástico experimental. El estudio citado se realizó en animales.",
      "file": "/audio/tour-9.mp3"
    },
    "tour-10": {
      "text": "Toma el control y explora. Selecciona, conecta y compara una red íntegra con una dañada.",
      "file": "/audio/tour-10.mp3"
    }
  },
  "tour": {
    "durationSeconds": 88,
    "idleSeconds": 20,
    "steps": [
      {
        "station": 0,
        "label": "La memoria del tejido"
      },
      {
        "station": 1,
        "label": "Precursor y secuencia"
      },
      {
        "station": 1,
        "label": "Selecciona un residuo"
      },
      {
        "station": 2,
        "label": "Una estructura móvil"
      },
      {
        "station": 3,
        "label": "Química de reticulación"
      },
      {
        "station": 4,
        "label": "Estirar y recuperar"
      },
      {
        "station": 5,
        "label": "Grupos funcionales"
      },
      {
        "station": 6,
        "label": "Matriz extracelular"
      },
      {
        "station": 7,
        "label": "Desnaturalizar no es cortar"
      },
      {
        "station": 8,
        "label": "MeTro: aplicación experimental"
      },
      {
        "station": 0,
        "label": "Toma el control y explora"
      }
    ]
  },
  "sources": [
    {
      "id": "uniprot",
      "title": "UniProt · P15502",
      "url": "https://www.uniprot.org/uniprotkb/P15502/entry",
      "evidence": "Secuencia canónica: 786 residuos; señal 1–26 y cadena procesada 27–786. Hay otras isoformas."
    },
    {
      "id": "af",
      "title": "AlphaFold DB · AF-P15502-F1 v6",
      "url": "https://alphafold.ebi.ac.uk/entry/P15502",
      "evidence": "Predicción publicada: pLDDT medio 35,84 y 97,7 % de residuos con confianza muy baja. No demuestra una conformación estable."
    },
    {
      "id": "shape",
      "title": "Baldock et al. · 2011",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3060269/",
      "evidence": "La dispersión de rayos X y neutrones estudia la forma promedio en solución; no resuelve todos los átomos."
    },
    {
      "id": "nmr",
      "title": "NMR de elastina · 2012",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3365696/",
      "evidence": "Evidencia de movilidad y poblaciones conformacionales. No corresponde atribuir una única hélice o lámina a toda la cadena."
    },
    {
      "id": "liquid",
      "title": "Rauscher y Pomès · 2017",
      "url": "https://elifesciences.org/articles/26526",
      "evidence": "Estudio computacional de conjuntos desordenados e hidratados; una instantánea no describe toda la elasticidad."
    },
    {
      "id": "assembly",
      "title": "Ensamblaje de tropoelastina",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7947355/",
      "evidence": "Síntesis de evidencia sobre coacervación, matriz extracelular y reticulación."
    },
    {
      "id": "metro",
      "title": "Annabi et al. · MeTro, 2017",
      "url": "https://pubmed.ncbi.nlm.nih.gov/28978753/",
      "evidence": "Sellador de tropoelastina metacriloilada evaluado en modelos animales. Ejemplo preclínico, no recomendación clínica."
    },
    {
      "id": "damage",
      "title": "Digestión de fibras elásticas · 2011",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3111325/",
      "evidence": "La proteólisis compromete la continuidad de las fibras. El esquema del museo no reproduce tasas de digestión ni lugares de corte medidos."
    },
    {
      "id": "heat",
      "title": "Calentamiento de elastina arterial · 2005",
      "url": "https://pubmed.ncbi.nlm.nih.gov/15609619/",
      "evidence": "El efecto del calentamiento depende de condiciones y duración; no justifica una temperatura universal de desnaturalización."
    },
    {
      "id": "fibrillin",
      "title": "Lockhart-Cairns et al. · 2020",
      "url": "https://www.sasbdb.org/project/1139/",
      "evidence": "Datos experimentales de tropoelastina y asociación con un fragmento de fibrilina."
    }
  ],
  "printedSheet": "/docs/Ficha_Elastina.pdf",
  "presenterScript": "La elastina ayuda a que nuestros tejidos recuperen su forma. Está presente en estructuras que se deforman continuamente, como arterias, pulmones y piel. Su precursor, la tropoelastina, combina regiones ricas en aminoácidos hidrofóbicos con regiones que contienen lisina. Esa secuencia relaciona movilidad y capacidad de reticulación. La lisil oxidasa inicia reacciones que permiten conectar cadenas; la elastina madura es una red, no un hexámero. Aquí puedes seleccionar aminoácidos, reconocer sus funciones y estirar una red didáctica. El modelo atómico procede de AlphaFold: es una predicción de confianza muy baja, no una fotografía de la fibra real. También distinguimos desnaturalización de degradación. Una proteína puede cambiar de conformación sin que se corte su cadena; las proteasas sí pueden romperla y comprometer la red. En ingeniería biomédica, el material experimental MeTro utiliza tropoelastina modificada para formar un sellador elástico mediante luz. Su estudio en animales ilustra cómo conectar estructura, química y función sin confundir investigación preclínica con tratamiento establecido.",
  "cautions": [
    "AlphaFold es una predicción, con confianza muy baja en casi toda esta cadena.",
    "El precursor canónico tiene 786 residuos; la señal tiene 26. No todas las isoformas tienen igual longitud.",
    "La elastina no tiene un sitio activo catalítico. LOX y elastasas son otras proteínas, con actividad enzimática.",
    "La reticulación natural no equivale a fotoreticulación de MeTro.",
    "No confundir desnaturalización, movilidad normal, coacervación y proteólisis.",
    "No atribuir contactos ni distancias experimentales a esta predicción.",
    "La ficha original contiene identificadores PDB que no se usan por no corresponder a elastina verificada."
  ]
};
