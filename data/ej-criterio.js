/* =========================================================
   CRITERIO: DEPURAR, REVISAR Y TRABAJAR CON IA
   La ruta más "a prueba de IA".
   runner 'quiz': preguntas con opciones.
     q = pregunta, o = opciones, ok = índice de la correcta, por = explicación
   ========================================================= */
window.EJERCICIOS = window.EJERCICIOS || [];

window.EJERCICIOS.push(

/* ---------- CRITERIO 1: bug de tipos ---------- */
{
  id: 'crit-1', ruta: 'criterio', nivel: 1, tipo: 'live', minutos: 10,
  titulo: 'Encuentra el bug: el carrito suma mal',
  contexto: '"Aquí tienes código que falla, encuéntralo" es cada vez más común que "escríbelo desde cero".',
  enunciado: `La función <code>totalCarrito</code> devuelve <code>"01015"</code> en vez de <code>25</code>. Los precios llegan de un formulario (como texto). Encuentra el fallo y arréglalo.`,
  evalua: ['Leer código ajeno', 'Entender tipos (texto vs número)', 'Arreglar la causa'],
  runner: 'js',
  inicial: `function totalCarrito(precios) {
  let total = 0;
  for (const precio of precios) {
    total = total + precio;
  }
  return total;
}`,
  tests: [
    { e: 'totalCarrito(["10", "15"])', r: 25 },
    { e: 'totalCarrito([])', r: 0 },
    { e: 'totalCarrito(["9.99", "0.01"])', r: 10 },
    { e: 'totalCarrito([5, "5"])', r: 10 }
  ],
  pasos: [
    { t: 'Fíjate en qué tipo de dato llega.', pista: 'Los precios son textos: "10", no 10. ¿Qué hace + con un texto?' },
    { t: '¿Qué hace 0 + "10"?', pista: 'Si uno de los dos es texto, + los PEGA en vez de sumarlos: 0 + "10" = "010".' },
    { t: 'Convierte antes de sumar.', pista: 'Number(precio) convierte el texto en número.' }
  ],
  solucion: `function totalCarrito(precios) {
  let total = 0;
  for (const precio of precios) {
    // Los precios llegan como texto: hay que convertirlos
    total = total + Number(precio);
  }
  return total;
}`,
  explicacion: [
    { c: 'El bug', p: 'En JavaScript, + con un texto concatena (pega). 0 + "10" = "010", y luego "010" + "15" = "01015".' },
    { c: 'Number(precio)', p: 'Convierte "10" en 10. Si el texto no es un número ("hola"), da NaN, que podrías comprobar.' },
    { c: 'Cómo lo explicarías', p: '"Leo el mensaje de error o el resultado raro, formulo una hipótesis (está pegando textos), la compruebo con console.log(typeof precio) y la arreglo." Ese proceso es lo que evalúan.' }
  ],
  faq: [
    { q: '¿Por qué JavaScript no da error?', a: 'Porque intenta "ayudar" convirtiendo tipos automáticamente (coerción). Por eso existe TypeScript: te avisaría de que estás sumando textos.' },
    { q: '¿Y el 9.99 + 0.01?', a: 'Con decimales a veces salen cosas como 10.000000001 por cómo guardan los números los ordenadores. Para dinero real se trabaja en céntimos (enteros).' }
  ]
},

/* ---------- CRITERIO 2: off by one ---------- */
{
  id: 'crit-2', ruta: 'criterio', nivel: 2, tipo: 'live', minutos: 10,
  titulo: 'Encuentra el bug: falta la última canción',
  contexto: 'El error "off by one" (pasarse o quedarse corto por uno) es el más típico de la programación.',
  enunciado: `<code>ultimasEscuchadas(historial, n)</code> debería devolver las últimas <code>n</code> canciones del historial, la más reciente primero. Pero algo falla.`,
  evalua: ['Leer bucles con atención', 'Probar casos límite'],
  runner: 'js',
  inicial: `function ultimasEscuchadas(historial, n) {
  const resultado = [];
  for (let i = historial.length - 1; i > historial.length - n; i--) {
    resultado.push(historial[i]);
  }
  return resultado;
}`,
  tests: [
    { e: 'ultimasEscuchadas(["a", "b", "c", "d"], 2)', r: ['d', 'c'] },
    { e: 'ultimasEscuchadas(["a", "b", "c"], 3)', r: ['c', 'b', 'a'] },
    { e: 'ultimasEscuchadas(["a", "b"], 5)', r: ['b', 'a'], t: 'Si pides más de las que hay, devuelve todas' },
    { e: 'ultimasEscuchadas([], 2)', r: [] }
  ],
  pasos: [
    { t: 'Haz la prueba a mano con 4 canciones y n = 2.', pista: 'i empieza en 3. La condición es i > 4 - 2, es decir, i > 2. ¿Cuántas vueltas da?' },
    { t: 'Ajusta la condición.', pista: 'Debería ser i >= historial.length - n.' },
    { t: 'Caso límite: n mayor que la lista.', pista: 'Si n = 5 con 2 canciones, i llegaría a negativos. Añade también i >= 0.' }
  ],
  solucion: `function ultimasEscuchadas(historial, n) {
  const resultado = [];
  // >= en vez de > (faltaba una) y nunca por debajo de 0
  for (let i = historial.length - 1; i >= historial.length - n && i >= 0; i--) {
    resultado.push(historial[i]);
  }
  return resultado;
}

/* Versión más corta y difícil de equivocarse:
const ultimasEscuchadas = (historial, n) => historial.slice(-n).reverse();
(ojo: con n = 0, slice(-0) devuelve todo; habría que controlarlo) */`,
  explicacion: [
    { c: 'i > … → i >= …', p: 'Con > se salta la última vuelta. Hacer la "prueba de escritorio" (seguir el bucle a mano con un ejemplo pequeño) es la mejor forma de encontrarlo.' },
    { c: 'i >= 0', p: 'Si pides más canciones de las que hay, i bajaría a -1 y historial[-1] es undefined. Mejor no pasar de 0.' },
    { c: 'slice(-n)', p: 'Usar métodos que ya existen reduce bugs. Pero conoce sus trampas (el caso n = 0).' }
  ],
  faq: [
    { q: '¿Qué es una prueba de escritorio?', a: 'Seguir el código línea a línea con papel (o en tu cabeza) apuntando el valor de cada variable. Hacerlo en voz alta en una entrevista es una gran señal.' }
  ]
},

/* ---------- CRITERIO 3: mutación ---------- */
{
  id: 'crit-3', ruta: 'criterio', nivel: 3, tipo: 'live', minutos: 15,
  titulo: 'Encuentra el bug: la lista original cambia sola',
  contexto: 'Bug muy real en React: modificar los datos originales sin querer hace que la pantalla no se actualice bien.',
  enunciado: `<code>top3(canciones)</code> devuelve las 3 canciones con más reproducciones. Funciona… pero después de llamarla, <b>la lista original aparece desordenada</b>. Arréglalo para que no modifique el array que recibe.`,
  evalua: ['Saber qué métodos modifican el original', 'Inmutabilidad'],
  runner: 'js',
  inicial: `function top3(canciones) {
  return canciones
    .sort((a, b) => b.reproducciones - a.reproducciones)
    .slice(0, 3);
}`,
  fixture: `// Datos de prueba que usan los tests
const datos = [
  { titulo: "A", reproducciones: 10 },
  { titulo: "B", reproducciones: 50 },
  { titulo: "C", reproducciones: 30 },
  { titulo: "D", reproducciones: 40 }
];`,
  tests: [
    { e: 'top3(datos).map(c => c.titulo)', r: ['B', 'D', 'C'] },
    { e: '(top3(datos), datos.map(c => c.titulo))', r: ['A', 'B', 'C', 'D'], t: 'La lista original NO cambia de orden' }
  ],
  pasos: [
    { t: '¿Qué método modifica el array original?', pista: 'sort ordena "en el sitio": cambia el array sobre el que lo llamas.' },
    { t: 'Ordena una copia.', pista: '[...canciones].sort(...) o canciones.toSorted(...)' }
  ],
  solucion: `function top3(canciones) {
  // Copiamos el array antes de ordenar: el original queda intacto
  return [...canciones]
    .sort((a, b) => b.reproducciones - a.reproducciones)
    .slice(0, 3);
}`,
  explicacion: [
    { c: 'sort modifica el original', p: 'Igual que reverse, splice o push. En cambio map, filter, slice o toSorted devuelven uno nuevo.' },
    { c: '[...canciones]', p: 'Crea una copia del array. Ordenamos la copia y el original no se entera.' },
    { c: 'b.reproducciones - a.reproducciones', p: 'Así sort ordena de mayor a menor. Si el resultado es positivo, b va antes que a.' },
    { c: 'Por qué importa en React', p: 'React detecta cambios comparando "¿es el mismo array?". Si modificas el original, React cree que no ha cambiado nada y no repinta.' }
  ],
  faq: [
    { q: '¿Qué significa inmutabilidad?', a: 'No modificar los datos: crear copias nuevas con los cambios. Hace el código más predecible y es la base de cómo funciona React.' }
  ]
},

/* ---------- CRITERIO 4: revisar código de IA ---------- */
{
  id: 'crit-4', ruta: 'criterio', nivel: 2, tipo: 'teoria', minutos: 10,
  titulo: 'Revisa este código generado por IA',
  contexto: 'Hoy las empresas buscan juniors que usen IA… y que sepan detectar cuándo se equivoca.',
  enunciado: `Una IA ha generado este código para mostrar el comentario de un usuario y guardar su valoración:
<pre><code>const API_KEY = "sk-live-123456";

async function mostrarComentario(texto) {
  document.querySelector("#caja").innerHTML = texto;
  const res = await fetch("https://api.ejemplo.com/votar?key=" + API_KEY);
  const datos = await res.json();
  console.log(datos);
}</code></pre>
Responde a las preguntas de revisión.`,
  evalua: ['Revisar código con ojo crítico', 'Seguridad básica', 'Manejo de errores'],
  runner: 'quiz',
  preguntas: [
    { q: '¿Cuál es el problema de seguridad MÁS grave?', o: ['Usa const en vez de let', 'La clave secreta (API_KEY) está en el código del navegador', 'Usa async/await', 'El nombre de la función está en español'], ok: 1, por: 'Todo lo que hay en el frontend lo puede ver cualquiera (Ver código fuente). Las claves secretas van en el servidor, nunca en el navegador ni en GitHub.' },
    { q: '¿Qué riesgo tiene innerHTML = texto?', o: ['Ninguno, es lo normal', 'Es más lento que textContent, nada más', 'Si el texto lleva HTML o scripts, se ejecutan (XSS)', 'No funciona en móviles'], ok: 2, por: 'Si un usuario escribe <img src=x onerror="robarDatos()">, se ejecutaría. Con textContent se muestra como texto.' },
    { q: '¿Qué pasa si el servidor responde con error 500?', o: ['fetch lanza un error automáticamente', 'Nada controla ese caso: puede intentar leer un JSON que no existe y romperse', 'Se reintenta solo', 'El navegador muestra un aviso al usuario'], ok: 1, por: 'fetch NO falla con 404 o 500. Hay que comprobar res.ok y envolver en try/catch.' },
    { q: '¿Qué le pedirías a la IA (o harías tú) para mejorarlo?', o: ['Que añada más comentarios', 'Mover la clave al servidor, usar textContent y controlar errores con res.ok y try/catch', 'Cambiar fetch por XMLHttpRequest', 'Que use var en vez de const'], ok: 1, por: 'Revisar código es saber priorizar: primero seguridad, luego errores, luego estilo.' }
  ],
  pasos: [
    { t: 'Revisa en este orden.', pista: '1) ¿Es seguro? 2) ¿Qué pasa si algo falla? 3) ¿Se entiende? Ese orden es el que usan los equipos en las revisiones de código.' }
  ],
  explicacion: [
    { c: 'Secretos en el frontend', p: 'Error número uno en código generado rápido. Las claves van en variables de entorno del servidor.' },
    { c: 'innerHTML con datos de usuario', p: 'Abre la puerta a XSS. Regla: datos del usuario → textContent.' },
    { c: 'Sin control de errores', p: 'El código "feliz" funciona en la demo y falla en producción. Pensar en los fallos es criterio.' }
  ],
  faq: [
    { q: '¿Debo decir en la entrevista que uso IA?', a: 'Sí, con naturalidad, y explica cómo la usas: para avanzar más rápido, pero revisando siempre lo que genera. Lo que preocupa a las empresas es quien copia sin entender.' }
  ]
},

/* ---------- CRITERIO 5: leer errores ---------- */
{
  id: 'crit-5', ruta: 'criterio', nivel: 1, tipo: 'teoria', minutos: 10,
  titulo: 'Leer mensajes de error',
  contexto: 'Saber leer un error y no entrar en pánico es de lo primero que se nota trabajando contigo.',
  enunciado: 'Elige qué significa cada error de la consola.',
  evalua: ['Leer errores con calma', 'Saber por dónde empezar a buscar'],
  runner: 'quiz',
  preguntas: [
    { q: 'TypeError: Cannot read properties of undefined (reading \'map\')', o: ['La función map no existe en JavaScript', 'Estás usando .map sobre algo que vale undefined (por ejemplo, datos que aún no han llegado)', 'Hay un error de sintaxis', 'Falta un punto y coma'], ok: 1, por: 'Muy típico en React: intentas hacer datos.map(...) antes de que la API responda. Solución: valor inicial [] o comprobar antes.' },
    { q: 'ReferenceError: usuario is not defined', o: ['La variable usuario vale null', 'Estás usando una variable que no existe en ese sitio (mal escrita o fuera de su alcance)', 'El usuario no ha iniciado sesión', 'Error del servidor'], ok: 1, por: 'Revisa cómo la escribiste (mayúsculas incluidas) y si está declarada dentro del bloque donde la usas.' },
    { q: 'Access to fetch has been blocked by CORS policy', o: ['Tu código JavaScript está mal escrito', 'El servidor no permite que tu web (otro dominio) le haga peticiones', 'No tienes internet', 'La URL tiene una errata'], ok: 1, por: 'CORS lo controla el SERVIDOR. Desde el frontend no se "arregla"; hay que configurar el servidor o usar un proxy propio.' },
    { q: 'Uncaught SyntaxError: Unexpected token \'}\'', o: ['Falta o sobra una llave o paréntesis', 'Una variable no existe', 'El servidor ha fallado', 'El navegador es antiguo'], ok: 0, por: 'Error al escribir el código. Mira la línea que indica (y la anterior): suele faltar un paréntesis o sobrar una llave.' },
    { q: 'GET https://api.com/albumes 404 (Not Found)', o: ['Tu JavaScript tiene un error', 'La ruta pedida no existe en el servidor', 'El servidor está caído', 'No tienes permiso'], ok: 1, por: '404 = no encontrado: revisa la URL. 401/403 serían permisos y 500 un fallo del servidor.' }
  ],
  pasos: [
    { t: 'Lee el error entero.', pista: 'El tipo (TypeError, ReferenceError…) te da la pista principal, y la línea indicada te dice dónde mirar.' }
  ],
  explicacion: [
    { c: 'Método para depurar', p: '1) Leer el error completo. 2) Ir a la línea. 3) Formular una hipótesis. 4) Comprobarla con console.log o el depurador. 5) Arreglar y volver a probar.' }
  ],
  faq: [
    { q: '¿Está bien buscar el error en Google o preguntar a la IA?', a: 'Claro, todo el mundo lo hace. La diferencia está en entender la respuesta antes de pegarla.' }
  ]
},

/* ---------- CRITERIO 6: seguridad ---------- */
{
  id: 'crit-6', ruta: 'criterio', nivel: 2, tipo: 'teoria', minutos: 10,
  titulo: 'Seguridad web básica',
  contexto: 'La ciberseguridad es de lo más demandado. Un junior que piensa en seguridad destaca.',
  enunciado: 'Responde a estas preguntas típicas de seguridad.',
  evalua: ['Conocer los ataques más comunes', 'Saber cómo se previenen'],
  runner: 'quiz',
  preguntas: [
    { q: '¿Cómo deben guardarse las contraseñas en la base de datos?', o: ['Tal cual, en texto', 'Cifradas con una clave que se puede descifrar', 'Con un hash lento y con sal (bcrypt, argon2)', 'En el localStorage del navegador'], ok: 2, por: 'Un hash es de un solo sentido: no se puede "deshacer". Al iniciar sesión se calcula el hash de lo que escribe el usuario y se compara.' },
    { q: 'Este código: "SELECT * FROM usuarios WHERE email = \'" + email + "\'" es peligroso por…', o: ['Usa SELECT *', 'Permite inyección SQL: el usuario puede meter código SQL en el email', 'Es lento', 'No tiene ORDER BY'], ok: 1, por: 'Se previene con consultas parametrizadas: el dato va aparte y nunca se mezcla con el SQL.' },
    { q: '¿Para qué sirve HTTPS?', o: ['Para que la web cargue más rápido', 'Cifra la comunicación entre navegador y servidor', 'Para el SEO solamente', 'Para evitar errores 404'], ok: 1, por: 'Sin HTTPS, cualquiera en la misma red (un wifi público) podría leer contraseñas y datos.' },
    { q: 'Validas el formulario en el frontend con JavaScript. ¿Hace falta validar en el servidor?', o: ['No, ya está validado', 'Sí, porque la validación del navegador se puede saltar fácilmente', 'Solo si el formulario es de pago', 'Solo en móviles'], ok: 1, por: 'Frontend = comodidad para el usuario. Backend = seguridad. Siempre las dos.' }
  ],
  pasos: [
    { t: 'Regla general.', pista: 'Nunca confíes en nada que venga del usuario: valida, escapa y limita.' }
  ],
  explicacion: [
    { c: 'OWASP Top 10', p: 'Es la lista de referencia de los riesgos web más comunes. Nombrarla en una entrevista demuestra que te interesa la seguridad.' }
  ],
  faq: [
    { q: '¿Qué es una consulta parametrizada?', a: 'En lugar de pegar el texto del usuario en el SQL, pones un hueco (?) y el dato se envía aparte: db.query("SELECT * FROM usuarios WHERE email = ?", [email]).' }
  ]
},

/* ---------- CRITERIO 7: explicar decisiones ---------- */
{
  id: 'crit-7', ruta: 'criterio', nivel: 2, tipo: 'casa', minutos: 30,
  titulo: 'Escribe el README de tu prueba técnica',
  contexto: 'Muchos revisores leen el README antes que el código. Explicar tus decisiones es lo que más separa a los juniors.',
  enunciado: `Elige cualquier ejercicio "Para casa" que hayas terminado (por ejemplo, la lista de tareas) y escríbele un README en el editor. Debe tener:
<ul>
<li>Qué hace y cómo se ejecuta.</li>
<li>Decisiones que tomaste y por qué.</li>
<li>Qué mejorarías con más tiempo.</li>
<li>Si usaste IA, para qué y cómo lo revisaste.</li>
</ul>`,
  evalua: ['Comunicación escrita', 'Saber justificar decisiones', 'Honestidad sobre límites'],
  runner: 'manual',
  lenguaje: 'markdown',
  inicial: `# Nombre del proyecto

## Qué hace

## Cómo ejecutarlo

## Decisiones

## Qué mejoraría con más tiempo

## Uso de IA
`,
  criterios: [
    'Explico qué hace en 2-3 frases',
    'Las instrucciones para ejecutarlo son claras',
    'Justifico al menos 2 decisiones (por qué X y no Y)',
    'Reconozco al menos 2 cosas que mejoraría',
    'Soy honesta sobre el uso de IA'
  ],
  pasos: [
    { t: 'Decisiones.', pista: 'Ejemplo: "Usé textContent en vez de innerHTML para evitar XSS." "No usé frameworks porque el enunciado era pequeño."' },
    { t: 'Mejoras.', pista: 'Ejemplo: "Añadiría tests, guardado en localStorage y la opción de borrar tareas." Muestra que sabes que no está perfecto.' }
  ],
  solucion: `# Por escuchar 🎧

Lista de álbumes pendientes de escuchar. Permite añadir álbumes y valida que no estén vacíos.

## Cómo ejecutarlo
Abre \`index.html\` en el navegador. No necesita instalar nada.

## Decisiones
- **JavaScript sin frameworks**: el enunciado era pequeño y así se ve que domino el DOM.
- **Evento submit en el formulario** (y no click en el botón): funciona también con Enter.
- **textContent en vez de innerHTML**: evita inyección de código (XSS).

## Qué mejoraría con más tiempo
- Guardar la lista en localStorage.
- Poder marcar como escuchado y borrar.
- Tests automáticos.

## Uso de IA
Usé IA para repasar la API de \`requestSubmit\`. Revisé y probé todo el código yo misma.`,
  explicacion: [
    { c: 'Por qué importa', p: 'El README es tu voz cuando no estás. Un revisor con 50 pruebas que mirar agradece entender rápido qué hiciste.' },
    { c: 'Mejoras = madurez', p: 'Decir qué falta no resta: demuestra que sabes ver tu trabajo con criterio.' }
  ],
  faq: [
    { q: '¿En inglés o en español?', a: 'Si la oferta está en inglés o la empresa es internacional (Spotify, Apple…), en inglés. Con tu nivel C1 es una ventaja que se nota.' }
  ]
}

);
