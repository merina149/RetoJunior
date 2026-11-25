/* =========================================================
   EJERCICIOS DE JAVASCRIPT
   runner 'js': escribes funciones y se prueban con "tests".
   Cada test: e = expresión que se ejecuta, r = resultado esperado.
   (Se puede usar await en la expresión.)
   ========================================================= */
window.EJERCICIOS = window.EJERCICIOS || [];

window.EJERCICIOS.push(

/* ---------- JS 1: invertir texto ---------- */
{
  id: 'js-1', ruta: 'js', nivel: 1, tipo: 'live', minutos: 10,
  titulo: 'Invertir un texto',
  contexto: 'El "hola mundo" de las entrevistas en directo. Lo importante es explicar lo que haces mientras lo haces.',
  enunciado: `Escribe la función <code>invertir(texto)</code> que devuelva el texto al revés.<br><br>
<code>invertir("hola")</code> → <code>"aloh"</code>`,
  evalua: ['Conocer métodos de strings y arrays', 'Pensar en casos límite (texto vacío)', 'Explicar en voz alta'],
  runner: 'js',
  inicial: `function invertir(texto) {
  // Tu código aquí

}`,
  tests: [
    { e: 'invertir("hola")', r: 'aloh' },
    { e: 'invertir("Spotify")', r: 'yfitopS' },
    { e: 'invertir("")', r: '' },
    { e: 'invertir("a")', r: 'a' }
  ],
  pasos: [
    { t: 'Convierte el texto en un array de letras.', pista: 'texto.split("") → "hola" se convierte en ["h","o","l","a"].' },
    { t: 'Da la vuelta al array.', pista: 'Los arrays tienen .reverse().' },
    { t: 'Vuelve a unirlo en un texto.', pista: '.join("") une las letras sin nada en medio. Puedes encadenarlo todo: texto.split("").reverse().join("")' }
  ],
  solucion: `function invertir(texto) {
  // 1. "hola" → ["h","o","l","a"]
  // 2. reverse → ["a","l","o","h"]
  // 3. join → "aloh"
  return texto.split("").reverse().join("");
}

/* Versión con bucle (por si te piden no usar reverse):
function invertir(texto) {
  let resultado = "";
  for (let i = texto.length - 1; i >= 0; i--) {
    resultado += texto[i];
  }
  return resultado;
}
*/`,
  explicacion: [
    { c: 'texto.split("")', p: 'Los strings no tienen reverse, pero los arrays sí. Por eso primero lo partimos en letras.' },
    { c: '.reverse()', p: 'Da la vuelta al array. Ojo: modifica el array original, pero aquí da igual porque es un array nuevo que acabamos de crear.' },
    { c: '.join("")', p: 'Une las piezas del array en un texto. Con "" no pone nada entre ellas.' },
    { c: 'Versión con bucle', p: 'Muchos entrevistadores te piden luego "hazlo sin métodos". Recorres el texto desde la última letra hasta la primera y vas sumando.' }
  ],
  faq: [
    { q: '¿Por qué no existe texto.reverse()?', a: 'Porque los strings en JavaScript son inmutables (no se pueden modificar) y reverse cambia el array original. Por eso hay que pasar por un array.' },
    { q: '¿Qué pasa con los emojis?', a: 'split("") los rompe porque un emoji ocupa 2 "unidades". [...texto].reverse().join("") los respeta. Comentarlo en una entrevista es un punto extra.' }
  ]
},

/* ---------- JS 2: palíndromo ---------- */
{
  id: 'js-2', ruta: 'js', nivel: 1, tipo: 'live', minutos: 15,
  titulo: '¿Es un palíndromo?',
  contexto: 'Muy repetido en live coding. Prueba si piensas en mayúsculas y espacios.',
  enunciado: `Escribe <code>esPalindromo(texto)</code> que devuelva <code>true</code> si el texto se lee igual al derecho y al revés, ignorando mayúsculas y espacios.<br><br>
<code>esPalindromo("Anita lava la tina")</code> → <code>true</code>`,
  evalua: ['Limpiar los datos antes de compararlos', 'Reutilizar lo aprendido (invertir)', 'Casos límite'],
  runner: 'js',
  inicial: `function esPalindromo(texto) {
  // Tu código aquí

}`,
  tests: [
    { e: 'esPalindromo("oso")', r: true },
    { e: 'esPalindromo("Anita lava la tina")', r: true },
    { e: 'esPalindromo("hola")', r: false },
    { e: 'esPalindromo("Ana")', r: true },
    { e: 'esPalindromo("")', r: true }
  ],
  pasos: [
    { t: 'Limpia el texto.', pista: 'Pásalo a minúsculas con .toLowerCase() y quita los espacios con .replaceAll(" ", "").' },
    { t: 'Inviértelo.', pista: 'Lo mismo del ejercicio anterior: split, reverse, join.' },
    { t: 'Compara.', pista: 'return limpio === invertido;' }
  ],
  solucion: `function esPalindromo(texto) {
  // 1. Limpiar: todo en minúsculas y sin espacios
  const limpio = texto.toLowerCase().replaceAll(" ", "");

  // 2. Darle la vuelta
  const alReves = limpio.split("").reverse().join("");

  // 3. Si son iguales, es palíndromo
  return limpio === alReves;
}`,
  explicacion: [
    { c: 'toLowerCase()', p: '"A" y "a" son letras distintas para el ordenador. Al pasarlo todo a minúsculas las tratamos igual.' },
    { c: 'replaceAll(" ", "")', p: 'Quita todos los espacios. Sin esto "anita lava" no coincidiría al darle la vuelta.' },
    { c: 'return limpio === alReves', p: 'La comparación ya devuelve true o false. No hace falta escribir if (…) return true; else return false;' }
  ],
  faq: [
    { q: '¿Y las tildes? ¿"Ánita" funcionaría?', a: 'No, porque "á" ≠ "a". Se pueden quitar con texto.normalize("NFD").replace(/[\\u0300-\\u036f]/g, ""). No hace falta memorizarlo: basta con mencionar que lo tendrías en cuenta.' },
    { q: '¿Por qué uso const y no let?', a: 'const para valores que no vas a reasignar. Así quien lee el código sabe que no cambian. let solo cuando la variable cambia (como un contador).' }
  ]
},

/* ---------- JS 3: FizzBuzz ---------- */
{
  id: 'js-3', ruta: 'js', nivel: 1, tipo: 'live', minutos: 10,
  titulo: 'FizzBuzz',
  contexto: 'El filtro más famoso de las entrevistas. Parece una tontería, pero mucha gente se lía con el orden de los if.',
  enunciado: `Escribe <code>fizzBuzz(n)</code> que devuelva un array del 1 a n donde:
<ul>
<li>Si el número es divisible entre 3 → <code>"Fizz"</code></li>
<li>Si es divisible entre 5 → <code>"Buzz"</code></li>
<li>Si lo es entre 3 y 5 → <code>"FizzBuzz"</code></li>
<li>Si no → el número</li>
</ul>
<code>fizzBuzz(5)</code> → <code>[1, 2, "Fizz", 4, "Buzz"]</code>`,
  evalua: ['Bucles y condiciones', 'El orden de los if importa', 'Código legible'],
  runner: 'js',
  inicial: `function fizzBuzz(n) {
  const resultado = [];
  // Tu código aquí

  return resultado;
}`,
  tests: [
    { e: 'fizzBuzz(5)', r: [1, 2, 'Fizz', 4, 'Buzz'] },
    { e: 'fizzBuzz(15)[14]', r: 'FizzBuzz' },
    { e: 'fizzBuzz(15).length', r: 15 },
    { e: 'fizzBuzz(1)', r: [1] }
  ],
  pasos: [
    { t: 'Haz un bucle del 1 a n (incluido).', pista: 'for (let i = 1; i <= n; i++) { … }' },
    { t: '¿Cómo sé si es divisible?', pista: 'El operador % da el resto de una división. Si i % 3 === 0, no sobra nada: es divisible entre 3. No hace falta más matemáticas.' },
    { t: 'Ojo con el orden.', pista: 'Comprueba PRIMERO el caso de 3 y 5 a la vez. Si compruebas primero el 3, el 15 se quedaría en "Fizz".' }
  ],
  solucion: `function fizzBuzz(n) {
  const resultado = [];

  for (let i = 1; i <= n; i++) {
    // Primero el caso más concreto (3 y 5 a la vez)
    if (i % 3 === 0 && i % 5 === 0) {
      resultado.push("FizzBuzz");
    } else if (i % 3 === 0) {
      resultado.push("Fizz");
    } else if (i % 5 === 0) {
      resultado.push("Buzz");
    } else {
      resultado.push(i);
    }
  }

  return resultado;
}`,
  explicacion: [
    { c: 'i <= n', p: 'Con < n te dejarías el último número. Error muy típico (se llama "off by one").' },
    { c: 'i % 3 === 0', p: '% es "lo que sobra al repartir". 9 entre 3 no sobra nada → 0. 10 entre 3 sobra 1. Si sobra 0, es divisible.' },
    { c: 'El orden de los if', p: 'Los if se miran de arriba abajo y se para en el primero que se cumple. Por eso el caso más concreto va primero.' }
  ],
  faq: [
    { q: '¿Se puede hacer más corto?', a: 'Sí, pero en una entrevista se valora más que se lea bien que el truco más corto. Primero hazlo claro; luego, si te lo piden, optimizas.' },
    { q: '¿Por qué === y no ==?', a: '=== compara valor y tipo. == hace conversiones raras ("0" == 0 es true). Usa siempre ===.' }
  ]
},

/* ---------- JS 4: contar palabras ---------- */
{
  id: 'js-4', ruta: 'js', nivel: 2, tipo: 'live', minutos: 15,
  titulo: 'Contar cuántas veces sale cada palabra',
  contexto: 'Prueba si sabes usar objetos como "contadores". Sale muchísimo.',
  enunciado: `Escribe <code>contarPalabras(texto)</code> que devuelva un objeto con cuántas veces aparece cada palabra (en minúsculas).<br><br>
<code>contarPalabras("la la land")</code> → <code>{ la: 2, land: 1 }</code>`,
  evalua: ['Objetos como diccionarios', 'Recorrer arrays', 'Casos límite'],
  runner: 'js',
  inicial: `function contarPalabras(texto) {
  const contador = {};
  // Tu código aquí

  return contador;
}`,
  tests: [
    { e: 'contarPalabras("la la land")', r: { la: 2, land: 1 } },
    { e: 'contarPalabras("Hola hola HOLA")', r: { hola: 3 } },
    { e: 'contarPalabras("")', r: {} },
    { e: 'contarPalabras("a  b")', r: { a: 1, b: 1 } }
  ],
  pasos: [
    { t: 'Saca las palabras.', pista: 'texto.toLowerCase().split(" ") te da un array de palabras. Ojo: con dos espacios seguidos sale una palabra vacía "".' },
    { t: 'Ignora las vacías.', pista: '.filter(p => p !== "") quita los huecos.' },
    { t: 'Recorre y cuenta.', pista: 'for (const p of palabras) { contador[p] = (contador[p] || 0) + 1; } — si no existía, empieza en 0.' }
  ],
  solucion: `function contarPalabras(texto) {
  const contador = {};

  // 1. Minúsculas, partir por espacios y quitar huecos vacíos
  const palabras = texto.toLowerCase().split(" ").filter(p => p !== "");

  // 2. Por cada palabra, sumar 1 a su contador
  for (const palabra of palabras) {
    contador[palabra] = (contador[palabra] || 0) + 1;
  }

  return contador;
}`,
  explicacion: [
    { c: '.filter(p => p !== "")', p: '"a  b" con dos espacios da ["a", "", "b"]. El filtro quita las palabras vacías.' },
    { c: 'contador[palabra]', p: 'Con corchetes usas una variable como nombre de propiedad. contador.palabra buscaría literalmente la propiedad "palabra".' },
    { c: '(contador[palabra] || 0) + 1', p: 'La primera vez la propiedad no existe (undefined). El || 0 hace que empiece en 0 y le sume 1.' }
  ],
  faq: [
    { q: '¿Qué es "for…of"?', a: 'Recorre los valores de un array uno a uno. Es más legible que el for clásico con índice cuando no necesitas la posición.' },
    { q: '¿Podría usar un Map en vez de un objeto?', a: 'Sí, y es buena idea mencionarlo. Map está pensado justo para esto. Aquí usamos objeto porque el test espera un objeto.' }
  ]
},

/* ---------- JS 5: filtrar y transformar ---------- */
{
  id: 'js-5', ruta: 'js', nivel: 2, tipo: 'live', minutos: 15,
  titulo: 'filter, map y sort con canciones',
  contexto: 'Trabajar con arrays de objetos es el 80% del frontend real: datos que llegan de una API.',
  enunciado: `Escribe <code>cancionesLargas(canciones, segundos)</code>. Debe devolver <b>solo los títulos</b> de las canciones que duren <b>más</b> de esos segundos, ordenados alfabéticamente.<br><br>
Cada canción es así: <code>{ titulo: "Malamente", duracion: 150 }</code>`,
  evalua: ['filter, map y sort', 'Encadenar métodos', 'No modificar los datos originales'],
  runner: 'js',
  inicial: `function cancionesLargas(canciones, segundos) {
  // Tu código aquí

}`,
  fixture: `// Datos de prueba que usan los tests
const lista = [
  { titulo: "Malamente", duracion: 150 },
  { titulo: "Bohemian Rhapsody", duracion: 354 },
  { titulo: "Anti-Hero", duracion: 200 },
  { titulo: "Despechá", duracion: 157 }
];`,
  tests: [
    { e: 'cancionesLargas(lista, 160)', r: ['Anti-Hero', 'Bohemian Rhapsody'] },
    { e: 'cancionesLargas(lista, 1000)', r: [] },
    { e: 'cancionesLargas(lista, 0).length', r: 4 },
    { e: '(cancionesLargas(lista, 0), lista[0].titulo)', r: 'Malamente', t: 'No cambias el orden de la lista original' }
  ],
  pasos: [
    { t: 'Quédate con las largas.', pista: 'canciones.filter(c => c.duracion > segundos)' },
    { t: 'Quédate solo con el título.', pista: '.map(c => c.titulo) transforma cada objeto en su título.' },
    { t: 'Ordena.', pista: '.sort() ordena alfabéticamente. Para que respete tildes: .sort((a, b) => a.localeCompare(b))' }
  ],
  solucion: `function cancionesLargas(canciones, segundos) {
  return canciones
    .filter(c => c.duracion > segundos)   // 1. solo las largas
    .map(c => c.titulo)                   // 2. solo el título
    .sort((a, b) => a.localeCompare(b));  // 3. orden alfabético
}`,
  explicacion: [
    { c: '.filter(c => c.duracion > segundos)', p: 'Devuelve un array NUEVO con los elementos que cumplen la condición. El original no se toca.' },
    { c: '.map(c => c.titulo)', p: 'Devuelve un array nuevo del mismo tamaño, transformando cada elemento. Aquí, de objeto a texto.' },
    { c: '.sort(...) al final', p: 'sort SÍ modifica el array sobre el que se usa. Como lo hacemos sobre el array nuevo que creó map, la lista original queda intacta.' },
    { c: 'localeCompare', p: 'Compara textos según el idioma: así "Á" se ordena junto a "A" y no al final.' }
  ],
  faq: [
    { q: '¿Qué es c => c.titulo?', a: 'Una función flecha. Es lo mismo que function (c) { return c.titulo; } pero más corto. La "c" es cada canción.' },
    { q: '¿Por qué sort modifica el original y map no?', a: 'Es una decisión antigua del lenguaje. Hoy existe toSorted(), que ordena sin modificar. Saber esto demuestra que conoces trampas reales.' }
  ]
},

/* ---------- JS 6: duración total ---------- */
{
  id: 'js-6', ruta: 'js', nivel: 2, tipo: 'casa', minutos: 15,
  titulo: 'Duración total de una playlist',
  contexto: 'Formatear datos para mostrarlos es tarea diaria.',
  enunciado: `Escribe <code>duracionTotal(canciones)</code> que sume la duración (en segundos) y devuelva un texto <code>"mm:ss"</code>.<br><br>
150 + 354 segundos → <code>"8:24"</code><br>
65 segundos → <code>"1:05"</code> (los segundos siempre con 2 cifras)`,
  evalua: ['reduce para sumar', 'Formatear con padStart', 'Pensar en el 0 delante'],
  runner: 'js',
  inicial: `function duracionTotal(canciones) {
  // Tu código aquí

}`,
  tests: [
    { e: 'duracionTotal([{ duracion: 150 }, { duracion: 354 }])', r: '8:24' },
    { e: 'duracionTotal([{ duracion: 65 }])', r: '1:05' },
    { e: 'duracionTotal([])', r: '0:00' },
    { e: 'duracionTotal([{ duracion: 59 }, { duracion: 1 }])', r: '1:00' }
  ],
  pasos: [
    { t: 'Suma todas las duraciones.', pista: 'canciones.reduce((total, c) => total + c.duracion, 0). El 0 es el valor inicial.' },
    { t: 'Saca los minutos.', pista: 'Math.floor(total / 60) → cuántos minutos enteros caben.' },
    { t: 'Saca los segundos que sobran.', pista: 'total % 60 → lo que sobra al quitar los minutos.' },
    { t: 'Formatea con 2 cifras.', pista: 'String(segundos).padStart(2, "0") convierte 5 en "05".' }
  ],
  solucion: `function duracionTotal(canciones) {
  // 1. Sumar todos los segundos (empezando en 0)
  const total = canciones.reduce((suma, c) => suma + c.duracion, 0);

  // 2. Minutos enteros y segundos que sobran
  const minutos = Math.floor(total / 60);
  const segundos = total % 60;

  // 3. Segundos siempre con 2 cifras: 5 → "05"
  return \`\${minutos}:\${String(segundos).padStart(2, "0")}\`;
}`,
  explicacion: [
    { c: 'reduce((suma, c) => suma + c.duracion, 0)', p: 'reduce va "acumulando". Empieza con 0 y en cada canción suma su duración. Con un array vacío devuelve 0, sin errores.' },
    { c: 'Math.floor(total / 60)', p: 'Divide y quita los decimales. 504 / 60 = 8,4 → 8 minutos.' },
    { c: 'total % 60', p: 'Lo que sobra: 504 segundos son 8 minutos y sobran 24.' },
    { c: 'padStart(2, "0")', p: 'Rellena por delante con "0" hasta tener 2 caracteres. Así 1:05 no sale como 1:5.' },
    { c: 'Comillas invertidas `…${}`', p: 'Template literal: permite meter variables dentro del texto con ${}. Más legible que sumar textos con +.' }
  ],
  faq: [
    { q: '¿Por qué reduce lleva ese 0 al final?', a: 'Es el valor con el que empieza la suma. Sin él, con un array vacío daría error.' },
    { q: '¿Y si pasa de una hora?', a: 'Saldría "75:00". Podrías añadir horas con la misma idea (dividir entre 3600). Comentarlo demuestra que piensas en casos reales.' }
  ]
},

/* ---------- JS 7: duplicados ---------- */
{
  id: 'js-7', ruta: 'js', nivel: 1, tipo: 'live', minutos: 10,
  titulo: 'Quitar duplicados',
  contexto: 'Pregunta rápida para ver si conoces Set.',
  enunciado: `Escribe <code>sinDuplicados(lista)</code> que devuelva un array nuevo sin elementos repetidos, manteniendo el orden.<br><br>
<code>sinDuplicados(["pop", "rock", "pop", "jazz"])</code> → <code>["pop", "rock", "jazz"]</code>`,
  evalua: ['Conocer Set', 'Spread operator (...)', 'Saber explicar otra forma de hacerlo'],
  runner: 'js',
  inicial: `function sinDuplicados(lista) {
  // Tu código aquí

}`,
  tests: [
    { e: 'sinDuplicados(["pop", "rock", "pop", "jazz"])', r: ['pop', 'rock', 'jazz'] },
    { e: 'sinDuplicados([1, 1, 1])', r: [1] },
    { e: 'sinDuplicados([])', r: [] }
  ],
  pasos: [
    { t: 'Usa una estructura que no admite repetidos.', pista: 'new Set(lista) crea un "conjunto": los repetidos desaparecen solos.' },
    { t: 'Vuelve a convertirlo en array.', pista: '[...new Set(lista)] — los tres puntos "esparcen" el Set dentro de un array nuevo.' }
  ],
  solucion: `function sinDuplicados(lista) {
  // Un Set no admite repetidos y mantiene el orden de entrada
  return [...new Set(lista)];
}

/* Otra forma (sin Set):
function sinDuplicados(lista) {
  return lista.filter((item, i) => lista.indexOf(item) === i);
}
*/`,
  explicacion: [
    { c: 'new Set(lista)', p: 'Un Set es como una bolsa que no deja meter dos cosas iguales. Además respeta el orden en que entraron.' },
    { c: '[...set]', p: 'El spread (...) saca los elementos del Set y los mete en un array nuevo.' },
    { c: 'Versión con filter', p: 'indexOf devuelve la PRIMERA posición del elemento. Si la posición actual no es la primera, es un repetido y se descarta. Es más lenta con listas grandes.' }
  ],
  faq: [
    { q: '¿Funciona con objetos?', a: 'No como esperarías: dos objetos con el mismo contenido son distintos para Set (son "cajas" diferentes). Para objetos hay que comparar por un campo, por ejemplo el id.' }
  ]
},

/* ---------- JS 8: agrupar ---------- */
{
  id: 'js-8', ruta: 'js', nivel: 3, tipo: 'casa', minutos: 20,
  titulo: 'Agrupar álbumes por género',
  contexto: 'Preparar datos para mostrarlos por secciones (como las estanterías de Spotify).',
  enunciado: `Escribe <code>agruparPorGenero(albumes)</code> que devuelva un objeto donde cada clave es un género y su valor la lista de títulos.<br><br>
<code>[{titulo:"A", genero:"pop"}, {titulo:"B", genero:"rock"}, {titulo:"C", genero:"pop"}]</code><br>
→ <code>{ pop: ["A", "C"], rock: ["B"] }</code>`,
  evalua: ['Transformar estructuras de datos', 'reduce u objetos acumuladores', 'Código claro'],
  runner: 'js',
  inicial: `function agruparPorGenero(albumes) {
  // Tu código aquí

}`,
  tests: [
    { e: 'agruparPorGenero([{titulo:"A", genero:"pop"}, {titulo:"B", genero:"rock"}, {titulo:"C", genero:"pop"}])', r: { pop: ['A', 'C'], rock: ['B'] } },
    { e: 'agruparPorGenero([])', r: {} },
    { e: 'agruparPorGenero([{titulo:"X", genero:"jazz"}])', r: { jazz: ['X'] } }
  ],
  pasos: [
    { t: 'Prepara un objeto vacío y recorre los álbumes.', pista: 'const grupos = {}; for (const a of albumes) { … }' },
    { t: 'Si el género aún no existe, créalo.', pista: 'if (!grupos[a.genero]) grupos[a.genero] = [];' },
    { t: 'Añade el título.', pista: 'grupos[a.genero].push(a.titulo);' }
  ],
  solucion: `function agruparPorGenero(albumes) {
  const grupos = {};

  for (const album of albumes) {
    // Si es la primera vez que vemos este género, creamos su lista
    if (!grupos[album.genero]) {
      grupos[album.genero] = [];
    }
    // Añadimos el título a la lista de su género
    grupos[album.genero].push(album.titulo);
  }

  return grupos;
}`,
  explicacion: [
    { c: 'if (!grupos[album.genero])', p: 'La primera vez que aparece "pop", grupos.pop no existe (undefined). El ! lo convierte en "si no existe". Entonces creamos una lista vacía.' },
    { c: 'grupos[album.genero].push(...)', p: 'Ya sabemos que la lista existe, así que añadimos el título.' },
    { c: 'Alternativa moderna', p: 'Object.groupBy(albumes, a => a.genero) hace algo parecido (pero guarda los objetos enteros). Mencionarlo suma puntos.' }
  ],
  faq: [
    { q: '¿Por qué no lo hago con reduce?', a: 'Puedes, y es muy común en entrevistas. Pero un for…of es igual de válido y a veces más fácil de leer. Lo importante es que lo expliques bien.' }
  ]
},

/* ---------- JS 9: async/await ---------- */
{
  id: 'js-9', ruta: 'js', nivel: 3, tipo: 'casa', minutos: 20,
  titulo: 'Cargar datos de una API (async/await)',
  contexto: 'La prueba para casa más típica: "consume esta API y muestra los datos". Lo que suspende es no controlar errores.',
  enunciado: `Escribe la función asíncrona <code>cargarRecientes(api)</code>:
<ul>
<li>Llama a <code>await api()</code>, que devuelve una lista de álbumes <code>{ titulo, anio }</code>.</li>
<li>Devuelve los títulos de los álbumes de 2020 en adelante.</li>
<li>Si <code>api()</code> falla, devuelve un array vacío <code>[]</code> (sin romper la app).</li>
</ul>`,
  evalua: ['async/await', 'try/catch: controlar errores', 'Que la app no se rompa si la API falla'],
  runner: 'js',
  inicial: `async function cargarRecientes(api) {
  // Tu código aquí

}`,
  fixture: `// APIs falsas que usan los tests
const apiBuena = async () => [
  { titulo: "Motomami", anio: 2022 },
  { titulo: "Lux", anio: 2025 },
  { titulo: "El mal querer", anio: 2018 }
];
const apiRota = async () => { throw new Error("Servidor caído"); };`,
  tests: [
    { e: 'await cargarRecientes(apiBuena)', r: ['Motomami', 'Lux'] },
    { e: 'await cargarRecientes(apiRota)', r: [], t: 'Si la API falla, devuelve []' },
    { e: 'await cargarRecientes(async () => [])', r: [] }
  ],
  pasos: [
    { t: 'Espera a la API.', pista: 'const albumes = await api(); — await "espera" a que lleguen los datos.' },
    { t: 'Filtra y transforma.', pista: 'albumes.filter(a => a.anio >= 2020).map(a => a.titulo)' },
    { t: 'Protégete de errores.', pista: 'Envuelve todo en try { … } catch (error) { return []; }' }
  ],
  solucion: `async function cargarRecientes(api) {
  try {
    // 1. Esperamos a que lleguen los datos
    const albumes = await api();

    // 2. Nos quedamos con los recientes y solo el título
    return albumes
      .filter(a => a.anio >= 2020)
      .map(a => a.titulo);

  } catch (error) {
    // 3. Si algo falla, lo registramos y devolvemos algo seguro
    console.error("No se pudieron cargar los álbumes:", error.message);
    return [];
  }
}`,
  explicacion: [
    { c: 'async function', p: 'Una función async siempre devuelve una promesa y permite usar await dentro.' },
    { c: 'await api()', p: 'Pedir datos tarda. await pausa ESTA función hasta que llegan, sin congelar el resto de la página.' },
    { c: 'try { … } catch (error) { … }', p: 'Si algo dentro del try falla (servidor caído, sin internet), salta al catch en vez de romper la app.' },
    { c: 'return [] en el catch', p: 'Devolvemos un valor "seguro". Así la pantalla puede mostrar "No hay álbumes" en lugar de quedarse en blanco.' },
    { c: 'console.error', p: 'Deja rastro del error para quien depure. En una app real, además, mostrarías un mensaje al usuario.' }
  ],
  faq: [
    { q: '¿Qué es una promesa?', a: 'Un "te lo doy cuando lo tenga". Representa un valor que llegará en el futuro (o un error). await es la forma cómoda de esperarlo.' },
    { q: '¿Y con fetch de verdad?', a: 'Sería: const res = await fetch(url); if (!res.ok) throw new Error(res.status); const datos = await res.json(); — ojo: fetch NO falla con un 404, por eso se comprueba res.ok.' },
    { q: '¿Qué estados debería mostrar la pantalla?', a: 'Tres: cargando, error y datos (y a veces "vacío"). Es justo lo que miran en las pruebas de React.' }
  ]
},

/* ---------- JS 10: debounce ---------- */
{
  id: 'js-10', ruta: 'js', nivel: 3, tipo: 'live', minutos: 25,
  titulo: 'Debounce: no buscar en cada tecla',
  contexto: 'Pregunta favorita en frontend: un buscador no debe llamar a la API en cada letra.',
  enunciado: `Escribe <code>debounce(fn, ms)</code>. Devuelve una función nueva que, al llamarla muchas veces seguidas, solo ejecuta <code>fn</code> <b>una vez</b>: cuando han pasado <code>ms</code> milisegundos sin nuevas llamadas.<br><br>
Ejemplo: el usuario escribe "rosalia" rápido → solo se busca una vez, al terminar.`,
  evalua: ['Closures (funciones que recuerdan variables)', 'setTimeout y clearTimeout', 'Saber para qué sirve en la vida real'],
  runner: 'js',
  inicial: `function debounce(fn, ms) {
  // Tu código aquí

}`,
  tests: [
    { e: 'await (async () => { let n = 0; const f = debounce(() => n++, 50); f(); f(); f(); await new Promise(r => setTimeout(r, 120)); return n; })()', r: 1, t: '3 llamadas seguidas → se ejecuta 1 vez' },
    { e: 'await (async () => { let v; const f = debounce(x => v = x, 30); f("r"); f("ro"); f("rosalia"); await new Promise(r => setTimeout(r, 80)); return v; })()', r: 'rosalia', t: 'Se ejecuta con el ÚLTIMO valor' },
    { e: 'await (async () => { let n = 0; const f = debounce(() => n++, 20); f(); await new Promise(r => setTimeout(r, 60)); f(); await new Promise(r => setTimeout(r, 60)); return n; })()', r: 2, t: 'Llamadas separadas → se ejecuta cada vez' }
  ],
  pasos: [
    { t: 'Necesitas recordar el temporizador entre llamadas.', pista: 'Declara let temporizador; FUERA de la función que devuelves. Esa función lo "recordará" (closure).' },
    { t: 'Devuelve una función que reciba argumentos.', pista: 'return function (...args) { … }' },
    { t: 'Cancela y vuelve a programar.', pista: 'Dentro: clearTimeout(temporizador); temporizador = setTimeout(() => fn(...args), ms);' }
  ],
  solucion: `function debounce(fn, ms) {
  // Esta variable "vive" entre llamadas gracias al closure
  let temporizador;

  return function (...args) {
    // Si había una ejecución pendiente, la cancelamos
    clearTimeout(temporizador);

    // Programamos una nueva: solo se ejecutará si nadie
    // vuelve a llamar en los próximos "ms" milisegundos
    temporizador = setTimeout(() => fn(...args), ms);
  };
}

// Uso real:
// input.addEventListener("input", debounce(e => buscar(e.target.value), 300));`,
  explicacion: [
    { c: 'let temporizador (fuera)', p: 'La función que devolvemos se acuerda de esta variable aunque debounce ya haya terminado. Eso es un closure: una función con "memoria".' },
    { c: 'clearTimeout(temporizador)', p: 'Cada nueva tecla cancela la búsqueda pendiente. Es como un ascensor: cada vez que entra alguien, espera un poco más para cerrar.' },
    { c: 'setTimeout(() => fn(...args), ms)', p: 'Programa la ejecución para dentro de ms milisegundos con los últimos argumentos.' },
    { c: '...args', p: 'Recoge todos los argumentos que lleguen y los pasa a fn tal cual. Así debounce sirve para cualquier función.' }
  ],
  faq: [
    { q: '¿Qué diferencia hay con throttle?', a: 'Debounce espera a que pares. Throttle ejecuta como mucho una vez cada X tiempo aunque sigas (útil para el scroll). Saber la diferencia es muy valorado.' },
    { q: '¿Qué es un closure, en una frase?', a: 'Una función que recuerda las variables del sitio donde se creó, aunque ese sitio ya haya terminado de ejecutarse.' }
  ]
},

/* ---------- JS 11: lista de tareas (DOM) ---------- */
{
  id: 'js-11', ruta: 'js', nivel: 2, tipo: 'casa', minutos: 30,
  titulo: 'Lista de tareas con el DOM',
  contexto: 'La prueba para casa más clásica de la historia: la "to-do list". Ahora, como lista de "álbumes por escuchar".',
  enunciado: `Completa el JavaScript para que:
<ul>
<li>Al enviar el formulario se añada el texto como un <code>li</code> en la lista.</li>
<li>La página <b>no se recargue</b>.</li>
<li>No se añadan textos vacíos.</li>
<li>El campo se vacíe después de añadir.</li>
</ul>`,
  evalua: ['Eventos (submit)', 'preventDefault', 'Crear elementos de forma segura (textContent)', 'Validar la entrada'],
  runner: 'web',
  inicial: `<!DOCTYPE html>
<html lang="es">
<body>
  <h1>Por escuchar</h1>
  <form id="formulario">
    <label for="album">Álbum</label>
    <input id="album">
    <button>Añadir</button>
  </form>
  <ul id="lista"></ul>

  <script>
    const form = document.querySelector("#formulario");
    const input = document.querySelector("#album");
    const lista = document.querySelector("#lista");

    // Escribe aquí tu código

  </script>
</body>
</html>`,
  checks: [
    { t: 'La página no se recarga al enviar (preventDefault)', f: (d, w) => { const ev = new w.Event('submit', { cancelable: true }); d.querySelector('#formulario').dispatchEvent(ev); return ev.defaultPrevented; } },
    { t: 'Al enviar "Motomami" aparece en la lista', f: (d, w) => { d.querySelector('#album').value = 'Motomami'; d.querySelector('#formulario').requestSubmit(); return [...d.querySelectorAll('#lista li')].some(li => li.textContent.includes('Motomami')); } },
    { t: 'El campo se vacía después de añadir', f: d => d.querySelector('#album').value === '' },
    { t: 'No se añaden textos vacíos', f: d => { const antes = d.querySelectorAll('#lista li').length; d.querySelector('#album').value = '   '; d.querySelector('#formulario').requestSubmit(); return d.querySelectorAll('#lista li').length === antes; } },
    { t: 'El HTML que escribe el usuario no se ejecuta (seguro)', f: d => { d.querySelector('#album').value = '<b>hack</b>'; d.querySelector('#formulario').requestSubmit(); return !d.querySelector('#lista b'); } }
  ],
  pasos: [
    { t: 'Escucha el envío del formulario.', pista: 'form.addEventListener("submit", (evento) => { … });' },
    { t: 'Evita que la página se recargue.', pista: 'Lo primero dentro: evento.preventDefault();' },
    { t: 'Lee y valida el texto.', pista: 'const texto = input.value.trim(); if (texto === "") return;' },
    { t: 'Crea el li de forma segura.', pista: 'const li = document.createElement("li"); li.textContent = texto; lista.append(li); input.value = "";' }
  ],
  solucion: `<!DOCTYPE html>
<html lang="es">
<body>
  <h1>Por escuchar</h1>
  <form id="formulario">
    <label for="album">Álbum</label>
    <input id="album">
    <button>Añadir</button>
  </form>
  <ul id="lista"></ul>

  <script>
    const form = document.querySelector("#formulario");
    const input = document.querySelector("#album");
    const lista = document.querySelector("#lista");

    form.addEventListener("submit", (evento) => {
      // 1. Que el navegador no recargue la página
      evento.preventDefault();

      // 2. Leer el texto sin espacios sobrantes y validar
      const texto = input.value.trim();
      if (texto === "") return;

      // 3. Crear el elemento de forma segura
      const li = document.createElement("li");
      li.textContent = texto; // nunca innerHTML con texto del usuario
      lista.append(li);

      // 4. Limpiar y devolver el foco al campo
      input.value = "";
      input.focus();
    });
  </script>
</body>
</html>`,
  explicacion: [
    { c: '"submit" en el form (no "click" en el botón)', p: 'Así también funciona al pulsar Enter en el teclado. Detalle de accesibilidad que los revisores miran.' },
    { c: 'evento.preventDefault()', p: 'Por defecto, enviar un formulario recarga la página. Esto lo impide.' },
    { c: '.trim()', p: 'Quita espacios al principio y al final. Así "   " cuenta como vacío.' },
    { c: 'textContent y no innerHTML', p: 'Si alguien escribe código HTML o un script, textContent lo muestra como texto. innerHTML lo ejecutaría: es un agujero de seguridad (XSS).' },
    { c: 'input.focus()', p: 'Devuelve el cursor al campo para seguir escribiendo. Pequeño detalle de experiencia de usuario.' }
  ],
  faq: [
    { q: '¿Qué es XSS?', a: 'Cross-Site Scripting: cuando un atacante consigue que tu página ejecute su código metiéndolo como si fuera texto. Se evita no usando innerHTML con datos del usuario.' },
    { q: '¿Cómo guardaría las tareas al recargar?', a: 'Con localStorage: localStorage.setItem("tareas", JSON.stringify(array)) y al cargar JSON.parse(localStorage.getItem("tareas")). Esta misma app lo hace así para guardar tu progreso.' }
  ]
},

/* ---------- JS 12: buscador (DOM) ---------- */
{
  id: 'js-12', ruta: 'js', nivel: 2, tipo: 'live', minutos: 20,
  titulo: 'Buscador que filtra mientras escribes',
  contexto: 'Muy pedido en live coding: filtrar una lista en tiempo real.',
  enunciado: `Haz que al escribir en el buscador se <b>oculten</b> los artistas que no contengan el texto (sin distinguir mayúsculas).<br>
Usa el atributo <code>hidden</code> para ocultar.`,
  evalua: ['El evento input', 'Recorrer elementos del DOM', 'Comparar sin mayúsculas'],
  runner: 'web',
  inicial: `<!DOCTYPE html>
<html lang="es">
<body>
  <label for="buscar">Buscar artista</label>
  <input id="buscar" type="search">
  <ul id="artistas">
    <li>Rosalía</li>
    <li>Bad Bunny</li>
    <li>Taylor Swift</li>
    <li>Bizarrap</li>
  </ul>

  <script>
    const buscador = document.querySelector("#buscar");
    const items = document.querySelectorAll("#artistas li");

    // Escribe aquí tu código

  </script>
</body>
</html>`,
  checks: [
    { t: 'Escribir "bad" deja visible solo Bad Bunny', f: (d, w) => { const b = d.querySelector('#buscar'); b.value = 'bad'; b.dispatchEvent(new w.Event('input', { bubbles: true })); const vis = [...d.querySelectorAll('#artistas li')].filter(li => !li.hidden); return vis.length === 1 && vis[0].textContent.includes('Bad'); } },
    { t: 'Funciona con mayúsculas ("B" muestra Bad Bunny y Bizarrap)', f: (d, w) => { const b = d.querySelector('#buscar'); b.value = 'B'; b.dispatchEvent(new w.Event('input', { bubbles: true })); return [...d.querySelectorAll('#artistas li')].filter(li => !li.hidden).length === 2; } },
    { t: 'Al borrar se ven todos', f: (d, w) => { const b = d.querySelector('#buscar'); b.value = ''; b.dispatchEvent(new w.Event('input', { bubbles: true })); return [...d.querySelectorAll('#artistas li')].every(li => !li.hidden); } }
  ],
  pasos: [
    { t: 'Escucha cada cambio del campo.', pista: 'buscador.addEventListener("input", () => { … }); — "input" salta con cada letra.' },
    { t: 'Recorre los artistas.', pista: 'items.forEach(item => { … });' },
    { t: 'Decide si se ve o no.', pista: 'const coincide = item.textContent.toLowerCase().includes(texto); item.hidden = !coincide;' }
  ],
  solucion: `<!DOCTYPE html>
<html lang="es">
<body>
  <label for="buscar">Buscar artista</label>
  <input id="buscar" type="search">
  <ul id="artistas">
    <li>Rosalía</li>
    <li>Bad Bunny</li>
    <li>Taylor Swift</li>
    <li>Bizarrap</li>
  </ul>

  <script>
    const buscador = document.querySelector("#buscar");
    const items = document.querySelectorAll("#artistas li");

    buscador.addEventListener("input", () => {
      // Texto buscado en minúsculas
      const texto = buscador.value.trim().toLowerCase();

      items.forEach(item => {
        // ¿El nombre contiene el texto?
        const coincide = item.textContent.toLowerCase().includes(texto);
        // hidden = true lo oculta
        item.hidden = !coincide;
      });
    });
  </script>
</body>
</html>`,
  explicacion: [
    { c: '"input" y no "keyup"', p: 'input salta con cualquier cambio: teclado, pegar, dictado por voz o la X de borrar. keyup se pierde varios de esos casos.' },
    { c: '.toLowerCase() en los dos lados', p: 'Comparamos todo en minúsculas para que "B" encuentre "bad bunny".' },
    { c: '.includes(texto)', p: 'Devuelve true si el texto aparece en cualquier parte. Un texto vacío "" está incluido siempre, así que al borrar se ve todo.' },
    { c: 'item.hidden', p: 'Atributo HTML nativo para ocultar. Más semántico que cambiar el style a mano.' }
  ],
  faq: [
    { q: '¿Y si la lista viniera de una API con miles de artistas?', a: 'Entonces no filtrarías en el navegador, sino que pedirías a la API con el texto, usando debounce (ejercicio JS 10) para no hacer una petición por letra.' }
  ]
}

);
