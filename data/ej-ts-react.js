/* =========================================================
   TYPESCRIPT Y REACT
   runner 'manual': escribes en el editor, comparas con la solución
   y marcas los criterios. (Para probarlo de verdad, enlaces a
   entornos online en cada ejercicio.)
   ========================================================= */
window.EJERCICIOS = window.EJERCICIOS || [];

window.EJERCICIOS.push(

/* ---------- TS 1 ---------- */
{
  id: 'ts-1', ruta: 'ts', nivel: 1, tipo: 'casa', minutos: 15,
  titulo: 'Tipar los datos de una canción',
  contexto: 'Lo primero que harás en un proyecto con TypeScript: describir la forma de tus datos.',
  enunciado: `Crea una <code>interface Cancion</code> con <code>titulo</code> (texto), <code>duracion</code> (número), <code>explicita</code> (sí/no) y <code>artista</code> (texto, <b>opcional</b>).<br>
Después escribe <code>duracionTotal(canciones: Cancion[]): number</code>.<br><br>
Pruébalo en <a href="https://www.typescriptlang.org/play" target="_blank" rel="noopener">TypeScript Playground</a>.`,
  evalua: ['interface', 'Tipos básicos y propiedades opcionales', 'Tipar parámetros y retorno'],
  runner: 'manual', lenguaje: 'typescript',
  inicial: `// 1. Define la interface

// 2. Escribe la función tipada
`,
  criterios: ['La interface tiene las 4 propiedades con su tipo', 'artista es opcional (?)', 'La función tipa el parámetro y lo que devuelve', 'La función funciona con un array vacío'],
  pasos: [
    { t: 'Define la forma.', pista: 'interface Cancion { titulo: string; duracion: number; explicita: boolean; artista?: string; }' },
    { t: 'Tipa la función.', pista: 'function duracionTotal(canciones: Cancion[]): number { … }' }
  ],
  solucion: `// Describe la "forma" de una canción
interface Cancion {
  titulo: string;
  duracion: number;      // en segundos
  explicita: boolean;
  artista?: string;      // ? = opcional
}

// Recibe una lista de canciones y devuelve un número
function duracionTotal(canciones: Cancion[]): number {
  return canciones.reduce((total, c) => total + c.duracion, 0);
}

// Si te equivocas, TypeScript te avisa ANTES de ejecutar:
// duracionTotal([{ titulo: "A", duracion: "3:20" }]);
//                                 ^^^^^^ Error: string no es number`,
  explicacion: [
    { c: 'interface Cancion', p: 'Es un "molde": describe qué propiedades tiene un objeto y de qué tipo. No existe al ejecutar; solo sirve para detectar errores mientras escribes.' },
    { c: 'artista?: string', p: 'El ? significa que puede no estar. TypeScript te obligará a comprobarlo antes de usarlo.' },
    { c: 'Cancion[]', p: 'Un array de canciones.' },
    { c: '): number', p: 'Lo que devuelve. Si por error devolvieras un texto, te avisaría.' }
  ],
  faq: [
    { q: '¿interface o type?', a: 'Para objetos, las dos sirven. type además permite uniones ("ok" | "error"). Muchos equipos usan interface para objetos y type para lo demás. Lo importante es ser coherente.' },
    { q: '¿Por qué lo piden tanto?', a: 'Porque detecta muchos errores antes de ejecutar y hace el código más fácil de entender en equipo. También ayuda a que la IA genere código más correcto.' }
  ]
},

/* ---------- TS 2 ---------- */
{
  id: 'ts-2', ruta: 'ts', nivel: 2, tipo: 'casa', minutos: 15,
  titulo: 'Estados de una petición (uniones)',
  contexto: 'Patrón muy usado para pantallas que cargan datos: cargando, ok o error.',
  enunciado: `Crea un tipo <code>Estado</code> que pueda ser:
<ul>
<li><code>{ tipo: "cargando" }</code></li>
<li><code>{ tipo: "ok", datos: string[] }</code></li>
<li><code>{ tipo: "error", mensaje: string }</code></li>
</ul>
Y una función <code>mensajePantalla(e: Estado): string</code> que devuelva un texto para cada caso.`,
  evalua: ['Uniones de tipos', 'Narrowing (TypeScript sabe qué caso es)', 'switch'],
  runner: 'manual', lenguaje: 'typescript',
  inicial: `type Estado = // completa

function mensajePantalla(e: Estado): string {

}`,
  criterios: ['Estado es una unión de 3 objetos', 'Cada objeto tiene la propiedad tipo con un texto fijo', 'La función cubre los 3 casos', 'Usa e.datos solo en el caso "ok" y e.mensaje solo en "error"'],
  pasos: [
    { t: 'Une los tres casos con |.', pista: 'type Estado = { tipo: "cargando" } | { tipo: "ok"; datos: string[] } | { tipo: "error"; mensaje: string };' },
    { t: 'Distingue con switch.', pista: 'switch (e.tipo) { case "cargando": … case "ok": … case "error": … }' }
  ],
  solucion: `// Una unión: el estado es UNO de estos tres
type Estado =
  | { tipo: "cargando" }
  | { tipo: "ok"; datos: string[] }
  | { tipo: "error"; mensaje: string };

function mensajePantalla(e: Estado): string {
  switch (e.tipo) {
    case "cargando":
      return "Cargando…";
    case "ok":
      // Aquí TypeScript SABE que existe e.datos
      return \`Hay \${e.datos.length} álbumes\`;
    case "error":
      // Y aquí que existe e.mensaje
      return "Error: " + e.mensaje;
  }
}`,
  explicacion: [
    { c: 'A | B | C', p: 'Unión: el valor es una de esas opciones. Evita estados imposibles, como "cargando y con error a la vez".' },
    { c: 'tipo: "ok"', p: 'Un texto fijo (literal). Sirve de "etiqueta" para saber en qué caso estás.' },
    { c: 'Narrowing', p: 'Dentro de case "ok", TypeScript estrecha el tipo y sabe que hay datos. Si intentas usar e.mensaje ahí, te avisa.' }
  ],
  faq: [
    { q: '¿Qué pasa si añado un cuarto estado y olvido el case?', a: 'Con la configuración estricta, TypeScript avisará de que la función no siempre devuelve un string. Te protege de olvidos.' }
  ]
},

/* ---------- TS 3 ---------- */
{
  id: 'ts-3', ruta: 'ts', nivel: 3, tipo: 'live', minutos: 10,
  titulo: 'Genéricos: una función para cualquier tipo',
  contexto: 'Pregunta típica: "¿qué es un genérico?". Mejor explicarlo con un ejemplo.',
  enunciado: `Escribe <code>primero(lista)</code> que devuelva el primer elemento de cualquier array o <code>undefined</code> si está vacío, <b>sin perder el tipo</b>.<br>
<code>primero([1,2])</code> debe ser <code>number | undefined</code>, y <code>primero(["a"])</code> <code>string | undefined</code>.`,
  evalua: ['Genéricos <T>', 'Tipos que pueden ser undefined'],
  runner: 'manual', lenguaje: 'typescript',
  inicial: `function primero(lista) {

}`,
  criterios: ['Usa un genérico <T>', 'El parámetro es T[]', 'Devuelve T | undefined', 'No usa any'],
  pasos: [
    { t: '¿Por qué no any?', pista: 'any desactiva TypeScript: perderías saber qué devuelve.' },
    { t: 'Usa una "variable de tipo".', pista: 'function primero<T>(lista: T[]): T | undefined { return lista[0]; }' }
  ],
  solucion: `// T es una "variable de tipo": se rellena sola al llamar
function primero<T>(lista: T[]): T | undefined {
  return lista[0];
}

const n = primero([1, 2, 3]);       // n: number | undefined
const s = primero(["pop", "rock"]); // s: string | undefined`,
  explicacion: [
    { c: '<T>', p: 'Como un hueco para un tipo. Al llamar con números, T = number; con textos, T = string. Una función, muchos tipos, sin perder información.' },
    { c: 'T | undefined', p: 'Honesto: si el array está vacío no hay primer elemento. TypeScript te obligará a comprobarlo antes de usarlo.' },
    { c: 'Ejemplos que ya usas', p: 'Array<string>, Promise<Usuario>, useState<number>() son genéricos.' }
  ],
  faq: [
    { q: '¿Qué tiene de malo any?', a: 'Le dices a TypeScript "no compruebes nada". Pierdes justo la ayuda por la que usas TypeScript. Si no sabes el tipo, usa unknown y compruébalo.' }
  ]
},

/* ---------- TS 4 (quiz) ---------- */
{
  id: 'ts-4', ruta: 'ts', nivel: 1, tipo: 'teoria', minutos: 5,
  titulo: 'Preguntas rápidas de TypeScript',
  contexto: 'Preguntas que te pueden hacer en la parte teórica.',
  enunciado: 'Elige la respuesta correcta.',
  evalua: ['Saber explicar qué es TypeScript y para qué sirve'],
  runner: 'quiz',
  preguntas: [
    { q: '¿Qué es TypeScript?', o: ['Un lenguaje totalmente distinto a JavaScript', 'JavaScript con tipos, que se convierte a JavaScript normal', 'Un framework como React', 'Una base de datos'], ok: 1, por: 'Es un "superconjunto": todo JS válido es TS válido. Se compila a JavaScript para que el navegador lo entienda.' },
    { q: '¿Cuándo detecta TypeScript los errores?', o: ['Mientras escribes o compilas, antes de ejecutar', 'Solo cuando el usuario usa la web', 'Nunca, solo da sugerencias', 'En el servidor'], ok: 0, por: 'Esa es su gran ventaja: errores que en JS verías en producción, aquí los ves en el editor.' },
    { q: '¿Qué tipo usarías si no sabes qué llega (por ejemplo, de una API) pero quieres seguir seguro?', o: ['any', 'unknown', 'never', 'void'], ok: 1, por: 'unknown te obliga a comprobar el tipo antes de usarlo. any lo deja pasar todo.' }
  ],
  pasos: [{ t: 'Responde con calma.', pista: 'Piensa siempre en "para qué sirve" más que en definiciones.' }],
  explicacion: [{ c: 'Resumen', p: 'TypeScript = JavaScript + tipos que se comprueban antes de ejecutar. Te ayuda a ti, a tu equipo y al editor.' }],
  faq: []
},

/* ---------- REACT 1 ---------- */
{
  id: 'react-1', ruta: 'react', nivel: 1, tipo: 'live', minutos: 10,
  titulo: 'Contador de "me gusta" con useState',
  contexto: 'El ejercicio de entrada de React en entrevistas.',
  enunciado: `Crea un componente <code>BotonMeGusta</code> que muestre ❤️ y un número. Cada clic suma 1.<br><br>
Pruébalo en <a href="https://react.new" target="_blank" rel="noopener">react.new</a> (abre un proyecto React en el navegador).`,
  evalua: ['useState', 'Eventos en React (onClick)', 'Saber qué provoca que se repinte'],
  runner: 'manual', lenguaje: 'jsx',
  inicial: `import { useState } from "react";

export default function BotonMeGusta() {

}`,
  criterios: ['Usa useState con valor inicial 0', 'El botón tiene onClick', 'Actualiza con la función set (no modifica la variable)', 'Muestra el número dentro del botón'],
  pasos: [
    { t: 'Crea el estado.', pista: 'const [likes, setLikes] = useState(0);' },
    { t: 'Pinta el botón.', pista: 'return <button onClick={…}>❤️ {likes}</button>;' },
    { t: 'Actualiza.', pista: 'onClick={() => setLikes(likes + 1)}' }
  ],
  solucion: `import { useState } from "react";

export default function BotonMeGusta() {
  // likes = valor actual; setLikes = función para cambiarlo
  const [likes, setLikes] = useState(0);

  return (
    <button onClick={() => setLikes(prev => prev + 1)}>
      ❤️ {likes}
    </button>
  );
}`,
  explicacion: [
    { c: 'useState(0)', p: 'Crea una "memoria" del componente que empieza en 0. Devuelve el valor y una función para cambiarlo.' },
    { c: 'setLikes(...)', p: 'Al llamarla, React guarda el nuevo valor y vuelve a pintar el componente. Si hicieras likes = likes + 1, no se repintaría.' },
    { c: 'prev => prev + 1', p: 'Forma recomendada cuando el nuevo valor depende del anterior: siempre usa el valor más reciente, aunque haya varios clics muy seguidos.' },
    { c: '{likes}', p: 'Las llaves en JSX meten JavaScript dentro del HTML.' }
  ],
  faq: [
    { q: '¿Qué es JSX?', a: 'Una forma de escribir HTML dentro de JavaScript. Al compilar se convierte en llamadas a funciones. Diferencias: class → className, onclick → onClick.' },
    { q: '¿Por qué no basta con una variable normal?', a: 'Porque las variables normales se "olvidan" en cada repintado y además React no se entera de que cambian. El estado sobrevive y avisa a React.' }
  ]
},

/* ---------- REACT 2 ---------- */
{
  id: 'react-2', ruta: 'react', nivel: 1, tipo: 'casa', minutos: 15,
  titulo: 'Lista de álbumes con props y key',
  contexto: 'Pintar listas desde un array es lo que más harás en React.',
  enunciado: `Crea un componente <code>TarjetaAlbum</code> que reciba por props <code>titulo</code> y <code>artista</code>, y un componente <code>ListaAlbumes</code> que pinte una tarjeta por cada álbum del array.`,
  evalua: ['Props', 'map en JSX', 'key: qué es y por qué'],
  runner: 'manual', lenguaje: 'jsx',
  inicial: `const albumes = [
  { id: 1, titulo: "Motomami", artista: "Rosalía" },
  { id: 2, titulo: "Folklore", artista: "Taylor Swift" }
];

function TarjetaAlbum() {

}

export default function ListaAlbumes() {

}`,
  criterios: ['TarjetaAlbum recibe props con desestructuración', 'ListaAlbumes usa map', 'Cada elemento tiene key={album.id}', 'Usa una lista semántica (ul/li)'],
  pasos: [
    { t: 'La tarjeta.', pista: 'function TarjetaAlbum({ titulo, artista }) { return <li><h3>{titulo}</h3><p>{artista}</p></li>; }' },
    { t: 'La lista.', pista: '<ul>{albumes.map(a => <TarjetaAlbum key={a.id} titulo={a.titulo} artista={a.artista} />)}</ul>' }
  ],
  solucion: `const albumes = [
  { id: 1, titulo: "Motomami", artista: "Rosalía" },
  { id: 2, titulo: "Folklore", artista: "Taylor Swift" }
];

// Recibe sus datos por props (desestructuradas)
function TarjetaAlbum({ titulo, artista }) {
  return (
    <li className="tarjeta">
      <h3>{titulo}</h3>
      <p>{artista}</p>
    </li>
  );
}

export default function ListaAlbumes() {
  return (
    <ul>
      {albumes.map(album => (
        // key: identifica cada elemento de forma única
        <TarjetaAlbum
          key={album.id}
          titulo={album.titulo}
          artista={album.artista}
        />
      ))}
    </ul>
  );
}`,
  explicacion: [
    { c: 'Props', p: 'Son los "parámetros" de un componente. Van de padre a hijo y el hijo no debe modificarlas.' },
    { c: '{ titulo, artista }', p: 'Desestructuración: sacar propiedades de un objeto directamente. Es lo mismo que props.titulo pero más limpio.' },
    { c: 'key={album.id}', p: 'React la usa para saber qué elemento es cuál cuando la lista cambia. Debe ser única y estable: el id, no la posición.' }
  ],
  faq: [
    { q: '¿Por qué no usar el índice del map como key?', a: 'Si la lista se reordena o se borra un elemento, los índices cambian y React puede mezclar datos entre elementos. Con un id estable eso no pasa.' }
  ]
},

/* ---------- REACT 3 ---------- */
{
  id: 'react-3', ruta: 'react', nivel: 3, tipo: 'casa', minutos: 30,
  titulo: 'Cargar datos de una API (useEffect)',
  contexto: 'LA prueba para casa de React: "consume esta API y muéstralo". Lo que se evalúa son los estados de carga y error.',
  enunciado: `Crea <code>Artistas</code>, que cargue <code>https://api.ejemplo.com/artistas</code> al montarse y muestre:
<ul>
<li>"Cargando…" mientras llega.</li>
<li>Un mensaje de error si falla.</li>
<li>La lista de nombres si va bien.</li>
</ul>`,
  evalua: ['useEffect con array de dependencias', 'Estados de carga, error y datos', 'Comprobar res.ok'],
  runner: 'manual', lenguaje: 'jsx',
  inicial: `import { useState, useEffect } from "react";

export default function Artistas() {

}`,
  criterios: ['Tres estados: cargando, error y datos', 'useEffect con [] para cargar una vez', 'Comprueba res.ok', 'try/catch/finally o equivalente', 'Cada li tiene key'],
  pasos: [
    { t: 'Prepara tres estados.', pista: 'datos (empieza en []), cargando (true) y error (null).' },
    { t: 'Carga al montar.', pista: 'useEffect(() => { … }, []); — el [] vacío = solo una vez al aparecer.' },
    { t: 'Dentro, una función async.', pista: 'useEffect no puede ser async directamente. Crea async function cargar() {…} dentro y llámala.' },
    { t: 'Pinta según el estado.', pista: 'if (cargando) return <p>Cargando…</p>; if (error) return <p role="alert">…</p>;' }
  ],
  solucion: `import { useState, useEffect } from "react";

export default function Artistas() {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargar() {
      try {
        const res = await fetch("https://api.ejemplo.com/artistas");
        // fetch no falla con 404/500: hay que comprobarlo
        if (!res.ok) throw new Error("Error " + res.status);
        setDatos(await res.json());
      } catch (e) {
        setError(e.message);
      } finally {
        setCargando(false); // pase lo que pase, ya no carga
      }
    }
    cargar();
  }, []); // [] = solo al montar el componente

  // Un estado = una pantalla
  if (cargando) return <p>Cargando…</p>;
  if (error) return <p role="alert">No se pudo cargar: {error}</p>;
  if (datos.length === 0) return <p>No hay artistas todavía.</p>;

  return (
    <ul>
      {datos.map(a => <li key={a.id}>{a.nombre}</li>)}
    </ul>
  );
}`,
  explicacion: [
    { c: 'Tres estados', p: 'Cargando, error y datos. Muchos juniors solo pintan los datos: si la API tarda o falla, la pantalla queda en blanco. Esto es lo que más se mira.' },
    { c: 'useEffect(…, [])', p: 'Ejecuta código después de pintar. El array vacío significa "solo una vez". Sin él, se ejecutaría en cada repintado y entrarías en un bucle infinito de peticiones.' },
    { c: 'async dentro', p: 'useEffect espera que devuelvas nada (o una función de limpieza), no una promesa. Por eso la función async va dentro.' },
    { c: 'finally', p: 'Se ejecuta tanto si va bien como si falla. Perfecto para quitar el "cargando".' },
    { c: 'Estado vacío', p: 'Detalle pro: si la lista llega vacía, mostrar un mensaje útil en lugar de nada.' }
  ],
  faq: [
    { q: '¿Qué es el array de dependencias?', a: 'La lista de valores que, si cambian, vuelven a ejecutar el efecto. [] = nunca más. [busqueda] = cada vez que cambie la búsqueda.' },
    { q: '¿Se usa esto en empresas?', a: 'Se entiende igual, pero en proyectos grandes se suelen usar librerías como TanStack Query que gestionan caché y reintentos. Saber hacerlo a mano demuestra que entiendes lo que hacen.' }
  ]
},

/* ---------- REACT 4 ---------- */
{
  id: 'react-4', ruta: 'react', nivel: 2, tipo: 'live', minutos: 20,
  titulo: 'Buscador: estado derivado',
  contexto: 'Muy común. Y la trampa: muchos guardan la lista filtrada en otro estado y se desincroniza.',
  enunciado: `Crea un componente con un campo de búsqueda y una lista de canciones que se filtre mientras escribes. <b>Usa un solo useState</b> (el del texto).`,
  evalua: ['Inputs controlados', 'Estado derivado: calcular en vez de guardar', 'Comparar sin mayúsculas'],
  runner: 'manual', lenguaje: 'jsx',
  inicial: `import { useState } from "react";

const canciones = ["Malamente", "Despechá", "Anti-Hero", "Saoko", "Flowers"];

export default function Buscador() {

}`,
  criterios: ['El input es controlado (value + onChange)', 'Solo hay un estado: el texto', 'La lista filtrada se calcula, no se guarda en estado', 'Tiene label para el input'],
  pasos: [
    { t: 'Estado del texto.', pista: 'const [texto, setTexto] = useState("");' },
    { t: 'Input controlado.', pista: '<input value={texto} onChange={e => setTexto(e.target.value)} />' },
    { t: 'Calcula la lista en cada repintado.', pista: 'const filtradas = canciones.filter(c => c.toLowerCase().includes(texto.toLowerCase()));' }
  ],
  solucion: `import { useState } from "react";

const canciones = ["Malamente", "Despechá", "Anti-Hero", "Saoko", "Flowers"];

export default function Buscador() {
  // Único estado: lo que escribe el usuario
  const [texto, setTexto] = useState("");

  // Estado DERIVADO: se calcula a partir de texto, no se guarda
  const filtradas = canciones.filter(c =>
    c.toLowerCase().includes(texto.toLowerCase())
  );

  return (
    <>
      <label htmlFor="q">Buscar canción</label>
      <input
        id="q"
        type="search"
        value={texto}
        onChange={e => setTexto(e.target.value)}
      />
      <ul>
        {filtradas.map(c => <li key={c}>{c}</li>)}
      </ul>
    </>
  );
}`,
  explicacion: [
    { c: 'Input controlado', p: 'value={texto} + onChange: React es quien manda sobre lo que muestra el campo. Así siempre sabes su valor.' },
    { c: 'Estado derivado', p: 'Si algo se puede calcular a partir de otro estado, no lo guardes aparte. Dos estados que dependen uno del otro acaban desincronizados.' },
    { c: 'htmlFor', p: 'En JSX, el "for" del label se escribe htmlFor (for es palabra reservada de JavaScript).' }
  ],
  faq: [
    { q: '¿No es lento filtrar en cada repintado?', a: 'Con listas normales, no. Si fuera enorme, existe useMemo para recordar el resultado. Pero optimizar antes de tiempo es un error típico.' }
  ]
},

/* ---------- REACT 5 (quiz) ---------- */
{
  id: 'react-5', ruta: 'react', nivel: 2, tipo: 'teoria', minutos: 8,
  titulo: 'Preguntas típicas de React',
  contexto: 'La parte teórica de una entrevista de React.',
  enunciado: 'Elige la respuesta correcta.',
  evalua: ['Conceptos clave de React explicados con tus palabras'],
  runner: 'quiz',
  preguntas: [
    { q: '¿Qué diferencia hay entre props y estado?', o: ['Ninguna', 'Las props vienen del padre y no se modifican; el estado es interno y cambia con su función set', 'El estado viene del padre', 'Las props solo pueden ser textos'], ok: 1, por: 'Props = configuración que recibes. Estado = memoria propia que cambia con el tiempo.' },
    { q: '¿Qué provoca que un componente se vuelva a pintar?', o: ['Cambiar una variable normal', 'Que cambie su estado o sus props (o se repinte su padre)', 'Cada segundo automáticamente', 'Solo recargar la página'], ok: 1, por: 'React repinta cuando hay cambios en estado o props. Por eso hay que usar las funciones set.' },
    { q: '¿Para qué sirve el array de dependencias de useEffect?', o: ['Para declarar variables', 'Indica cuándo debe volver a ejecutarse el efecto', 'Para importar librerías', 'No sirve para nada'], ok: 1, por: '[] = solo al montar. [x] = cuando cambie x. Sin array = en cada repintado.' },
    { q: '¿Qué es el Virtual DOM?', o: ['Un navegador especial', 'Una copia ligera de la interfaz en memoria que React compara para cambiar solo lo necesario', 'Una base de datos', 'Un tipo de CSS'], ok: 1, por: 'React calcula qué ha cambiado y toca solo esas partes del DOM real, que es lo lento.' }
  ],
  pasos: [{ t: 'Explícalo con tus palabras.', pista: 'Después de cada respuesta, intenta decirla en voz alta como si estuvieras en la entrevista.' }],
  explicacion: [{ c: 'Consejo', p: 'En la teoría, un ejemplo concreto vale más que una definición perfecta: "Por ejemplo, en un contador…"' }],
  faq: []
}

);
