/* =========================================================
   RUTAS DE APRENDIZAJE
   Cada ruta agrupa ejercicios de un lenguaje o tema.
   - orden:   orden recomendado para empezar
   - demanda: por qué la piden las empresas (corto)
   - ia:      por qué saberlo te hace difícil de sustituir
   ========================================================= */
window.RUTAS = [
  {
    id: 'html', orden: 1, icono: '🧱', color: '#e8590c',
    nombre: 'HTML semántico y accesible',
    corto: 'HTML',
    demanda: 'Es la base de todo. Casi todas las pruebas de frontend empiezan con "maqueta esta pantalla".',
    ia: 'La IA escribe HTML que "se ve bien" pero suele fallar en accesibilidad y semántica. Saber revisarlo es un plus.'
  },
  {
    id: 'css', orden: 2, icono: '🎨', color: '#1c7ed6',
    nombre: 'CSS y diseño responsive',
    corto: 'CSS',
    demanda: 'Flexbox, Grid y responsive salen en casi todas las pruebas para casa.',
    ia: 'Ajustar un diseño al detalle y depurar por qué algo no se coloca bien sigue necesitando ojo humano.'
  },
  {
    id: 'js', orden: 3, icono: '⚡', color: '#f59f00',
    nombre: 'JavaScript: lógica y DOM',
    corto: 'JavaScript',
    demanda: 'El lenguaje más usado del mundo. Los ejercicios en directo (live coding) son casi siempre en JS.',
    ia: 'Si entiendes la lógica, sabes cuándo el código que te da la IA está mal. Eso es lo que buscan.'
  },
  {
    id: 'git', orden: 4, icono: '🌿', color: '#2f9e44',
    nombre: 'Git, GitHub y Good First Issues',
    corto: 'Git',
    demanda: 'Todas las empresas lo usan. Te pedirán entregar la prueba en un repositorio.',
    ia: 'Trabajar en equipo con ramas, revisiones y PRs es trabajo humano de colaboración.'
  },
  {
    id: 'criterio', orden: 5, icono: '🧠', color: '#7048e8',
    nombre: 'Criterio: depurar, revisar y usar IA',
    corto: 'Criterio',
    demanda: 'Cada vez más entrevistas te dan código con fallos (a veces hecho por IA) y te piden encontrarlos.',
    ia: 'Esta es la ruta más "a prueba de IA": detectar errores, explicar decisiones y pensar en seguridad.'
  },
  {
    id: 'sql', orden: 6, icono: '🗄️', color: '#0c8599',
    nombre: 'SQL y bases de datos',
    corto: 'SQL',
    demanda: 'SQL es de los lenguajes más usados (PostgreSQL y MySQL a la cabeza). Sale en full stack y en datos.',
    ia: 'Diseñar bien los datos y saber si una consulta devuelve lo correcto requiere entender el negocio.'
  },
  {
    id: 'ts', orden: 7, icono: '🔷', color: '#3b5bdb',
    nombre: 'TypeScript',
    corto: 'TypeScript',
    demanda: 'Muchísimas ofertas de frontend lo piden ya junto a React. Es JavaScript con tipos.',
    ia: 'Los tipos te ayudan a detectar errores, también en el código que genera la IA.'
  },
  {
    id: 'react', orden: 8, icono: '⚛️', color: '#1098ad',
    nombre: 'React',
    corto: 'React',
    demanda: 'La librería de frontend más pedida en ofertas junior. Prueba típica: "consume esta API y muéstrala".',
    ia: 'Decidir cómo organizar el estado y los componentes es diseño, no solo escribir código.'
  },
  {
    id: 'node', orden: 9, icono: '🟩', color: '#37b24d',
    nombre: 'Node.js y APIs REST',
    corto: 'Node / APIs',
    demanda: 'Node.js es la tecnología web más usada. Saber crear una API te abre puestos full stack (mejor pagados).',
    ia: 'Diseñar una API clara, segura y con buenos errores exige criterio.'
  },
  {
    id: 'java', orden: 10, icono: '☕', color: '#c92a2a',
    nombre: 'Java y Spring Boot',
    corto: 'Java',
    demanda: 'En España muchas consultoras y bancos contratan juniors en Java + Spring Boot. Está en tu temario de DAW.',
    ia: 'Sistemas grandes de empresa: entender el código existente vale más que escribirlo desde cero.'
  },
  {
    id: 'python', orden: 11, icono: '🐍', color: '#5c7cfa',
    nombre: 'Python (extra)',
    corto: 'Python',
    demanda: 'Es el lenguaje que más crece. Útil para backend (FastAPI), datos e IA.',
    ia: 'Te acerca a los puestos de datos e IA, que son los que más crecen.'
  }
];

/* Tipos de prueba: cómo te lo pedirían en una entrevista */
window.TIPOS = {
  live:   { nombre: 'En directo', icono: '⏱️', desc: 'Live coding: lo resuelves delante del entrevistador, en 15-45 min.' },
  casa:   { nombre: 'Para casa',  icono: '🏠', desc: 'Take-home: te dan unas horas o días para entregarlo en GitHub.' },
  teoria: { nombre: 'Preguntas',  icono: '💬', desc: 'Preguntas que te hacen hablando. Tienes que saber explicarlo.' }
};

/* Niveles de dificultad */
window.NIVELES = { 1: 'Fácil', 2: 'Medio', 3: 'Reto' };
