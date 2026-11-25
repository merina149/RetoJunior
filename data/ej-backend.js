/* =========================================================
   BACKEND: NODE.JS / APIs, JAVA Y PYTHON
   ========================================================= */
window.EJERCICIOS = window.EJERCICIOS || [];

window.EJERCICIOS.push(

/* ---------- NODE 1 (quiz HTTP) ---------- */
{
  id: 'node-1', ruta: 'node', nivel: 1, tipo: 'teoria', minutos: 8,
  titulo: 'HTTP: métodos y códigos de estado',
  contexto: 'Base de cualquier entrevista de backend o full stack.',
  enunciado: 'Elige la respuesta correcta.',
  evalua: ['Métodos HTTP', 'Códigos de estado más comunes', 'Qué es REST'],
  runner: 'quiz',
  preguntas: [
    { q: 'Quieres CREAR un álbum nuevo en la API. ¿Qué método usas?', o: ['GET', 'POST', 'DELETE', 'HEAD'], ok: 1, por: 'GET lee, POST crea, PUT/PATCH actualizan, DELETE borra.' },
    { q: '¿Qué código devuelves cuando se ha creado algo correctamente?', o: ['200 OK', '201 Created', '204 No Content', '301 Moved'], ok: 1, por: '201 dice "creado". 200 es "todo bien" en general. 204 es "bien, pero no te devuelvo nada" (típico al borrar).' },
    { q: 'El cliente envía un email con formato incorrecto. ¿Qué código?', o: ['400 Bad Request', '404 Not Found', '500 Internal Server Error', '200 OK'], ok: 0, por: '4xx = el error es del cliente. 400 = la petición está mal. 5xx = el error es del servidor.' },
    { q: 'Alguien sin iniciar sesión intenta ver su perfil. ¿Qué código?', o: ['403 Forbidden', '401 Unauthorized', '404', '418'], ok: 1, por: '401 = no sé quién eres (falta autenticarse). 403 = sé quién eres pero no tienes permiso.' },
    { q: '¿Cuál es una URL REST bien diseñada para el álbum 7?', o: ['/getAlbum?id=7', '/albumes/7', '/api/album_get/7', '/albumes/obtener/7'], ok: 1, por: 'En REST la URL nombra el RECURSO (sustantivo, en plural) y el método dice la acción. GET /albumes/7.' }
  ],
  pasos: [{ t: 'Truco para los códigos.', pista: '2xx bien, 3xx redirección, 4xx culpa del cliente, 5xx culpa del servidor.' }],
  explicacion: [{ c: 'REST en una frase', p: 'URLs que nombran cosas (/albumes) + métodos HTTP que dicen qué hacer con ellas (GET, POST…) + códigos que dicen cómo fue.' }],
  faq: [{ q: '¿Qué diferencia hay entre PUT y PATCH?', a: 'PUT reemplaza el recurso entero. PATCH modifica solo los campos que envías.' }]
},

/* ---------- NODE 2 ---------- */
{
  id: 'node-2', ruta: 'node', nivel: 2, tipo: 'casa', minutos: 30,
  titulo: 'Tu primera API con Express',
  contexto: 'Prueba típica full stack: "crea una API sencilla con dos endpoints".',
  enunciado: `Con Express, crea:
<ul>
<li><code>GET /albumes</code> → devuelve todos los álbumes.</li>
<li><code>GET /albumes/:id</code> → devuelve uno, o <b>404</b> con un mensaje si no existe.</li>
</ul>
Puedes probarlo online en <a href="https://stackblitz.com/fork/node" target="_blank" rel="noopener">StackBlitz</a> (instalando express).`,
  evalua: ['Rutas con parámetros', 'Códigos de estado correctos', 'Respuestas en JSON'],
  runner: 'manual', lenguaje: 'javascript',
  inicial: `const express = require("express");
const app = express();

const albumes = [
  { id: 1, titulo: "Motomami" },
  { id: 2, titulo: "Folklore" }
];

// Tus rutas aquí


app.listen(3000, () => console.log("API en http://localhost:3000"));`,
  criterios: ['GET /albumes devuelve la lista en JSON', 'GET /albumes/:id lee el parámetro', 'Convierte el id a número antes de comparar', 'Devuelve 404 con un mensaje si no existe'],
  pasos: [
    { t: 'La lista.', pista: 'app.get("/albumes", (req, res) => res.json(albumes));' },
    { t: 'Lee el parámetro.', pista: 'req.params.id — ¡llega como TEXTO! Conviértelo con Number().' },
    { t: 'Busca y responde.', pista: 'const album = albumes.find(a => a.id === id); if (!album) return res.status(404).json({ error: "…" });' }
  ],
  solucion: `const express = require("express");
const app = express();

const albumes = [
  { id: 1, titulo: "Motomami" },
  { id: 2, titulo: "Folklore" }
];

// GET /albumes → todos
app.get("/albumes", (req, res) => {
  res.json(albumes);
});

// GET /albumes/2 → uno concreto
app.get("/albumes/:id", (req, res) => {
  const id = Number(req.params.id); // los parámetros llegan como texto
  const album = albumes.find(a => a.id === id);

  if (!album) {
    return res.status(404).json({ error: "Álbum no encontrado" });
  }
  res.json(album);
});

app.listen(3000, () => console.log("API en http://localhost:3000"));`,
  explicacion: [
    { c: 'app.get(ruta, (req, res) => …)', p: 'Cuando llegue un GET a esa ruta, ejecuta la función. req = la petición; res = la respuesta que construyes.' },
    { c: '/albumes/:id', p: 'Los dos puntos marcan un parámetro. /albumes/2 → req.params.id vale "2".' },
    { c: 'Number(req.params.id)', p: 'Llega como texto. "2" === 2 es false: sin convertir, nunca lo encontraría.' },
    { c: 'return res.status(404)…', p: 'El return evita seguir ejecutando y enviar dos respuestas (eso da error).' }
  ],
  faq: [
    { q: '¿Qué es Express?', a: 'Una librería para Node.js que facilita crear servidores web: rutas, respuestas JSON, middlewares…' },
    { q: '¿Y si el id no es un número (/albumes/hola)?', a: 'Number("hola") da NaN y no encontrará nada → 404. Más fino sería responder 400 ("id inválido"). Mencionarlo suma puntos.' }
  ]
},

/* ---------- NODE 3 ---------- */
{
  id: 'node-3', ruta: 'node', nivel: 3, tipo: 'casa', minutos: 30,
  titulo: 'Crear con POST y validar',
  contexto: 'Nunca confíes en lo que te envían: validar en el servidor es obligatorio.',
  enunciado: `Añade <code>POST /albumes</code> que:
<ul>
<li>Lea <code>titulo</code> del cuerpo (JSON).</li>
<li>Si falta o está vacío → <b>400</b> con un mensaje.</li>
<li>Si va bien, lo añada con un id nuevo y responda <b>201</b> con el álbum creado.</li>
</ul>`,
  evalua: ['Leer el body (express.json)', 'Validación en servidor', '201 vs 400'],
  runner: 'manual', lenguaje: 'javascript',
  inicial: `const express = require("express");
const app = express();

const albumes = [{ id: 1, titulo: "Motomami" }];

// Tu código aquí
`,
  criterios: ['Activa express.json()', 'Valida que titulo sea texto y no esté vacío', 'Responde 400 si no es válido', 'Genera un id nuevo', 'Responde 201 con el álbum creado'],
  pasos: [
    { t: 'Permite leer JSON.', pista: 'app.use(express.json()); — sin esto, req.body es undefined.' },
    { t: 'Valida.', pista: 'const titulo = req.body?.titulo; if (typeof titulo !== "string" || titulo.trim() === "") → 400.' },
    { t: 'Crea y responde.', pista: 'const nuevo = { id: albumes.length + 1, titulo: titulo.trim() }; albumes.push(nuevo); res.status(201).json(nuevo);' }
  ],
  solucion: `const express = require("express");
const app = express();
app.use(express.json()); // permite leer el body en JSON

const albumes = [{ id: 1, titulo: "Motomami" }];

app.post("/albumes", (req, res) => {
  const titulo = req.body?.titulo;

  // 1. Validar: nunca confiar en lo que llega
  if (typeof titulo !== "string" || titulo.trim() === "") {
    return res.status(400).json({ error: "El título es obligatorio" });
  }

  // 2. Crear (en una app real, lo haría la base de datos)
  const nuevo = {
    id: Math.max(0, ...albumes.map(a => a.id)) + 1,
    titulo: titulo.trim()
  };
  albumes.push(nuevo);

  // 3. 201 = creado, y devolvemos lo creado
  res.status(201).json(nuevo);
});

app.listen(3000);`,
  explicacion: [
    { c: 'app.use(express.json())', p: 'Un middleware: se ejecuta antes de tus rutas y convierte el texto JSON del body en un objeto.' },
    { c: 'typeof titulo !== "string"', p: 'Comprueba el tipo además de que exista: alguien podría enviar un número o un objeto.' },
    { c: 'Math.max(...ids) + 1', p: 'Usar length + 1 falla si antes se borró algún álbum (podrías repetir ids). En la realidad, la base de datos genera el id.' },
    { c: '201 + el objeto creado', p: 'Así el frontend recibe el id nuevo sin tener que pedirlo otra vez.' }
  ],
  faq: [
    { q: '¿Hay librerías para validar?', a: 'Sí: Zod o Joi son muy usadas. Definen un "esquema" y validan todo de una vez. Mencionar Zod queda muy bien.' }
  ]
},

/* ---------- NODE 4 (quiz) ---------- */
{
  id: 'node-4', ruta: 'node', nivel: 2, tipo: 'teoria', minutos: 8,
  titulo: 'Preguntas de backend y Node.js',
  contexto: 'Preguntas habituales en puestos full stack junior.',
  enunciado: 'Elige la respuesta correcta.',
  evalua: ['Conceptos de servidor', 'Variables de entorno', 'Middleware'],
  runner: 'quiz',
  preguntas: [
    { q: '¿Qué es Node.js?', o: ['Un framework de frontend', 'Un entorno para ejecutar JavaScript fuera del navegador (por ejemplo, en un servidor)', 'Una base de datos', 'Un lenguaje distinto de JavaScript'], ok: 1, por: 'Gracias a Node puedes usar el mismo lenguaje en frontend y backend.' },
    { q: '¿Dónde guardas la contraseña de la base de datos?', o: ['En el código, para tenerla a mano', 'En una variable de entorno (archivo .env que NO se sube a GitHub)', 'En el README', 'En el frontend'], ok: 1, por: 'process.env.DB_PASSWORD lee la variable. El .env va en el .gitignore.' },
    { q: '¿Qué es un middleware en Express?', o: ['Una base de datos intermedia', 'Una función que se ejecuta entre la petición y la respuesta (para logs, autenticación, leer JSON…)', 'Un tipo de ruta', 'Un servidor aparte'], ok: 1, por: 'Recibe (req, res, next) y llama a next() para pasar al siguiente. express.json() es un middleware.' },
    { q: '¿Qué es CORS?', o: ['Un error de JavaScript', 'Una protección del navegador: el servidor decide qué otras webs pueden pedirle datos', 'Un tipo de base de datos', 'Un formato de imagen'], ok: 1, por: 'Se configura en el servidor (en Express, con el paquete cors).' }
  ],
  pasos: [{ t: 'Piensa en quién hace qué.', pista: 'Navegador (frontend) pide → servidor (backend) decide, valida y responde.' }],
  explicacion: [{ c: 'Resumen', p: 'Backend = validar, guardar datos de forma segura y responder con códigos claros.' }],
  faq: []
},

/* ---------- JAVA 1 ---------- */
{
  id: 'java-1', ruta: 'java', nivel: 1, tipo: 'casa', minutos: 15,
  titulo: 'Clase Cancion con encapsulación',
  contexto: 'Programación orientada a objetos: base de Java y de las entrevistas de consultoras.',
  enunciado: `Crea una clase <code>Cancion</code> con atributos privados <code>titulo</code> y <code>duracion</code> (segundos), un constructor, getters y un método <code>esLarga()</code> que devuelva <code>true</code> si dura más de 300 segundos.<br>
El constructor no debe aceptar duraciones negativas.<br><br>
Pruébalo en <a href="https://www.jdoodle.com/online-java-compiler" target="_blank" rel="noopener">JDoodle</a>.`,
  evalua: ['Encapsulación (private + getters)', 'Constructores', 'Validar en el constructor'],
  runner: 'manual', lenguaje: 'java',
  inicial: `public class Cancion {

}`,
  criterios: ['Atributos private', 'Constructor que recibe los dos datos', 'Lanza excepción si la duración es negativa', 'Getters (sin setters innecesarios)', 'Método esLarga()'],
  pasos: [
    { t: 'Atributos privados.', pista: 'private String titulo; private int duracion;' },
    { t: 'Constructor con validación.', pista: 'if (duracion < 0) throw new IllegalArgumentException("…");' },
    { t: 'Getters y método.', pista: 'public boolean esLarga() { return duracion > 300; }' }
  ],
  solucion: `public class Cancion {
    // Privados: nadie de fuera puede cambiarlos directamente
    private final String titulo;
    private final int duracion; // en segundos

    public Cancion(String titulo, int duracion) {
        // Validamos al crear: nunca existirá una canción inválida
        if (duracion < 0) {
            throw new IllegalArgumentException("La duración no puede ser negativa");
        }
        this.titulo = titulo;
        this.duracion = duracion;
    }

    public String getTitulo() { return titulo; }
    public int getDuracion() { return duracion; }

    public boolean esLarga() {
        return duracion > 300;
    }

    @Override
    public String toString() {
        return titulo + " (" + duracion + "s)";
    }
}`,
  explicacion: [
    { c: 'private', p: 'Encapsulación: los datos se protegen y solo se accede a ellos a través de métodos. Así controlas que siempre sean válidos.' },
    { c: 'final', p: 'Una vez asignados en el constructor no cambian. Objetos inmutables = menos errores.' },
    { c: 'throw new IllegalArgumentException', p: 'Si alguien intenta crear una canción imposible, se para en seco con un mensaje claro.' },
    { c: 'this.titulo = titulo', p: 'this distingue el atributo del objeto del parámetro que se llama igual.' },
    { c: '@Override toString', p: 'Define cómo se muestra el objeto al imprimirlo. Muy útil para depurar.' }
  ],
  faq: [
    { q: 'Los 4 pilares de la POO, ¿cuáles son?', a: 'Encapsulación (proteger datos), herencia (una clase hereda de otra), polimorfismo (mismo método, comportamiento distinto) y abstracción (mostrar solo lo esencial). Pregunta fija en entrevistas de Java.' }
  ]
},

/* ---------- JAVA 2 ---------- */
{
  id: 'java-2', ruta: 'java', nivel: 2, tipo: 'live', minutos: 15,
  titulo: 'Filtrar una lista con Streams',
  contexto: 'Los Streams de Java son muy preguntados; equivalen a filter/map de JavaScript.',
  enunciado: `Dada una <code>List&lt;Cancion&gt;</code>, devuelve una <code>List&lt;String&gt;</code> con los títulos de las canciones largas, ordenados alfabéticamente. Usa Streams.`,
  evalua: ['Streams: filter, map, sorted', 'Referencias a métodos (Cancion::getTitulo)'],
  runner: 'manual', lenguaje: 'java',
  inicial: `public static List<String> titulosLargos(List<Cancion> canciones) {

}`,
  criterios: ['Usa canciones.stream()', 'filter con esLarga', 'map al título', 'sorted', 'Termina con toList() o collect'],
  pasos: [
    { t: 'Es como en JavaScript.', pista: 'canciones.stream().filter(...).map(...).sorted().toList()' },
    { t: 'Referencias a métodos.', pista: 'Cancion::esLarga es lo mismo que c -> c.esLarga().' }
  ],
  solucion: `public static List<String> titulosLargos(List<Cancion> canciones) {
    return canciones.stream()
            .filter(Cancion::esLarga)     // solo las largas
            .map(Cancion::getTitulo)      // solo el título
            .sorted()                     // orden alfabético
            .toList();                    // de vuelta a lista (Java 16+)
}`,
  explicacion: [
    { c: '.stream()', p: 'Convierte la lista en un "flujo" sobre el que encadenar operaciones, sin modificar la lista original.' },
    { c: 'Cancion::esLarga', p: 'Referencia a método: forma corta de c -> c.esLarga().' },
    { c: '.toList()', p: 'Recoge el resultado en una lista. En versiones antiguas: .collect(Collectors.toList()).' }
  ],
  faq: [
    { q: '¿Stream o bucle for?', a: 'Ambos valen. Streams suelen leerse mejor para filtrar y transformar. Saber pasar de uno a otro demuestra soltura.' }
  ]
},

/* ---------- JAVA 3 ---------- */
{
  id: 'java-3', ruta: 'java', nivel: 3, tipo: 'casa', minutos: 30,
  titulo: 'Un endpoint con Spring Boot',
  contexto: 'Muchas ofertas junior en España piden "Java + Spring Boot". Este es el ejercicio de entrada.',
  enunciado: `Crea un <code>@RestController</code> con:
<ul>
<li><code>GET /albumes</code> → lista de álbumes.</li>
<li><code>GET /albumes/{id}</code> → un álbum o <b>404</b>.</li>
</ul>
Crea el proyecto en <a href="https://start.spring.io" target="_blank" rel="noopener">start.spring.io</a> con la dependencia "Spring Web".`,
  evalua: ['Anotaciones de Spring', 'ResponseEntity y códigos HTTP', 'Records de Java'],
  runner: 'manual', lenguaje: 'java',
  inicial: `// record Album(...)

// @RestController ...
`,
  criterios: ['Usa @RestController y @GetMapping', 'Lee el id con @PathVariable', 'Devuelve 404 con ResponseEntity.notFound()', 'Usa un record para Album'],
  pasos: [
    { t: 'El modelo.', pista: 'record Album(int id, String titulo) {} — un record es una clase de datos inmutable en una línea.' },
    { t: 'El controlador.', pista: '@RestController @RequestMapping("/albumes") public class AlbumController { … }' },
    { t: 'El 404.', pista: 'return albumes.stream().filter(a -> a.id() == id).findFirst().map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());' }
  ],
  solucion: `import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

// Clase de datos inmutable en una línea
record Album(int id, String titulo) {}

@RestController                 // responde con JSON
@RequestMapping("/albumes")     // prefijo de todas las rutas
public class AlbumController {

    private final List<Album> albumes = List.of(
        new Album(1, "Motomami"),
        new Album(2, "Folklore")
    );

    @GetMapping                 // GET /albumes
    public List<Album> todos() {
        return albumes;
    }

    @GetMapping("/{id}")        // GET /albumes/2
    public ResponseEntity<Album> uno(@PathVariable int id) {
        return albumes.stream()
                .filter(a -> a.id() == id)
                .findFirst()
                .map(ResponseEntity::ok)                      // 200 + álbum
                .orElse(ResponseEntity.notFound().build());   // 404
    }
}`,
  explicacion: [
    { c: '@RestController', p: 'Le dice a Spring que esta clase responde peticiones y devuelve JSON automáticamente.' },
    { c: '@GetMapping("/{id}") + @PathVariable', p: 'Equivale a /albumes/:id en Express. Spring convierte el id a int por ti.' },
    { c: 'ResponseEntity', p: 'Te deja controlar el código HTTP. ok = 200, notFound = 404.' },
    { c: 'findFirst() + Optional', p: 'findFirst devuelve un Optional: "puede que haya, puede que no". Evita los NullPointerException.' }
  ],
  faq: [
    { q: '¿Qué es la inyección de dependencias?', a: 'Spring crea los objetos que necesitas (servicios, repositorios) y te los pasa en el constructor, en vez de que tú hagas new. Pregunta casi segura en entrevistas de Spring.' }
  ]
},

/* ---------- PYTHON 1 ---------- */
{
  id: 'py-1', ruta: 'python', nivel: 1, tipo: 'live', minutos: 10,
  titulo: 'Contar palabras con un diccionario',
  contexto: 'El mismo ejercicio que en JS, para ver lo parecidos que son los lenguajes.',
  enunciado: `Escribe <code>contar_palabras(texto)</code> que devuelva un diccionario con cuántas veces aparece cada palabra (en minúsculas).<br><br>
Pruébalo en <a href="https://www.online-python.com" target="_blank" rel="noopener">online-python.com</a>.`,
  evalua: ['Diccionarios', 'split y lower', 'Conocer Counter'],
  runner: 'manual', lenguaje: 'python',
  inicial: `def contar_palabras(texto):
    pass`,
  criterios: ['Pasa el texto a minúsculas', 'split() sin argumentos (ignora espacios dobles)', 'Usa un diccionario', 'Conoces la alternativa con Counter'],
  pasos: [
    { t: 'Palabras.', pista: 'texto.lower().split() — sin argumentos, split ya ignora espacios repetidos.' },
    { t: 'Cuenta.', pista: 'contador[p] = contador.get(p, 0) + 1' }
  ],
  solucion: `def contar_palabras(texto):
    contador = {}
    for palabra in texto.lower().split():
        # get(p, 0): si no existe, empieza en 0
        contador[palabra] = contador.get(palabra, 0) + 1
    return contador


# La forma "pythónica":
from collections import Counter

def contar_palabras_v2(texto):
    return dict(Counter(texto.lower().split()))`,
  explicacion: [
    { c: 'split() sin argumentos', p: 'Parte por cualquier espacio y descarta los vacíos. En JS tuvimos que filtrar a mano.' },
    { c: 'dict.get(palabra, 0)', p: 'Devuelve el valor o 0 si no existe. Equivale al || 0 de JavaScript.' },
    { c: 'Counter', p: 'Python trae herramientas hechas. Conocer la librería estándar es muy valorado.' }
  ],
  faq: [{ q: '¿Python usa llaves para los bloques?', a: 'No: usa la indentación (4 espacios). Si la indentación está mal, el programa falla.' }]
},

/* ---------- PYTHON 2 ---------- */
{
  id: 'py-2', ruta: 'python', nivel: 2, tipo: 'live', minutos: 10,
  titulo: 'List comprehensions',
  contexto: 'Muy preguntado: es la forma típica de filtrar y transformar en Python.',
  enunciado: `Dada una lista de diccionarios <code>{"titulo": ..., "anio": ...}</code>, devuelve en una sola línea los títulos de los álbumes de 2020 en adelante.`,
  evalua: ['List comprehensions', 'Acceso a diccionarios'],
  runner: 'manual', lenguaje: 'python',
  inicial: `albumes = [
    {"titulo": "Motomami", "anio": 2022},
    {"titulo": "El mal querer", "anio": 2018},
]

recientes = `,
  criterios: ['Usa [ … for … in … if … ]', 'Devuelve solo los títulos', 'Accede con a["anio"]'],
  pasos: [{ t: 'La estructura.', pista: '[QUÉ_GUARDO for ELEMENTO in LISTA if CONDICIÓN]' }],
  solucion: `albumes = [
    {"titulo": "Motomami", "anio": 2022},
    {"titulo": "El mal querer", "anio": 2018},
]

# [qué guardo  for cada elemento  in lista  if condición]
recientes = [a["titulo"] for a in albumes if a["anio"] >= 2020]
# ['Motomami']`,
  explicacion: [
    { c: '[a["titulo"] for a in albumes if …]', p: 'Hace filter y map a la vez. Se lee casi como una frase: "el título de cada álbum de la lista si es reciente".' }
  ],
  faq: [{ q: '¿Equivale a algo de JavaScript?', a: 'A albumes.filter(a => a.anio >= 2020).map(a => a.titulo).' }]
},

/* ---------- PYTHON 3 ---------- */
{
  id: 'py-3', ruta: 'python', nivel: 3, tipo: 'casa', minutos: 25,
  titulo: 'Una API con FastAPI',
  contexto: 'FastAPI es de los frameworks web que más crece. Muy usado en empresas de datos e IA.',
  enunciado: `Crea con FastAPI <code>GET /albumes/{id}</code> que devuelva el álbum o un 404.<br>
Instalación: <code>pip install fastapi uvicorn</code> y ejecútalo con <code>uvicorn main:app --reload</code>. FastAPI crea documentación automática en <code>/docs</code>.`,
  evalua: ['Decoradores de ruta', 'Tipos en Python', 'HTTPException'],
  runner: 'manual', lenguaje: 'python',
  inicial: `from fastapi import FastAPI, HTTPException

app = FastAPI()

albumes = {1: "Motomami", 2: "Folklore"}

`,
  criterios: ['Usa @app.get("/albumes/{id}")', 'Tipa el parámetro (id: int)', 'Lanza HTTPException 404 si no existe'],
  pasos: [{ t: 'La ruta.', pista: '@app.get("/albumes/{id}") def obtener(id: int): …' }, { t: 'El 404.', pista: 'if id not in albumes: raise HTTPException(status_code=404, detail="No encontrado")' }],
  solucion: `from fastapi import FastAPI, HTTPException

app = FastAPI()

albumes = {1: "Motomami", 2: "Folklore"}

@app.get("/albumes/{id}")
def obtener(id: int):  # FastAPI convierte y valida el tipo solo
    if id not in albumes:
        raise HTTPException(status_code=404, detail="Álbum no encontrado")
    return {"id": id, "titulo": albumes[id]}`,
  explicacion: [
    { c: 'id: int', p: 'Con el tipo, FastAPI convierte el texto de la URL a número y, si no puede, responde 422 automáticamente.' },
    { c: 'raise HTTPException', p: 'Corta la ejecución y responde con ese código y mensaje.' },
    { c: 'return {…}', p: 'Lo que devuelves se convierte en JSON solo.' }
  ],
  faq: [{ q: '¿Qué es un decorador (@)?', a: 'Una forma de "envolver" una función para añadirle comportamiento. Aquí, @app.get registra la función como ruta.' }]
}

);
