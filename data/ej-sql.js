/* =========================================================
   EJERCICIOS DE SQL
   runner 'sql': se ejecuta de verdad en tu móvil (SQLite en el navegador).
   - setup:     crea las tablas y datos de ejemplo
   - solucion:  la consulta correcta; tu resultado se compara con el suyo
   - verificar: (opcional) consulta que se lanza DESPUÉS, para ejercicios
                que modifican datos (UPDATE, INSERT…)
   - orden:     true si el orden de las filas importa
   ========================================================= */
window.EJERCICIOS = window.EJERCICIOS || [];

/* Base de datos de música que usan todos los ejercicios */
window.SQL_MUSICA = `
CREATE TABLE artistas (
  id INTEGER PRIMARY KEY,
  nombre TEXT NOT NULL,
  pais TEXT
);
CREATE TABLE albumes (
  id INTEGER PRIMARY KEY,
  titulo TEXT NOT NULL,
  anio INTEGER,
  valoracion REAL,
  artista_id INTEGER REFERENCES artistas(id)
);
INSERT INTO artistas VALUES
  (1, 'Rosalía', 'España'),
  (2, 'Bad Bunny', 'Puerto Rico'),
  (3, 'Taylor Swift', 'EE. UU.'),
  (4, 'Vetusta Morla', 'España'),
  (5, 'Arca', 'Venezuela');
INSERT INTO albumes VALUES
  (1, 'Los Ángeles', 2017, 4.0, 1),
  (2, 'El mal querer', 2018, 4.6, 1),
  (3, 'Motomami', 2022, 4.4, 1),
  (4, 'YHLQMDLG', 2020, 4.1, 2),
  (5, 'Un verano sin ti', 2022, 4.5, 2),
  (6, '1989', 2014, 4.3, 3),
  (7, 'Folklore', 2020, 4.7, 3),
  (8, 'Midnights', 2022, 3.9, 3),
  (9, 'Mapas', 2011, 4.2, 4);
`;

window.EJERCICIOS.push(

/* ---------- SQL 1 ---------- */
{
  id: 'sql-1', ruta: 'sql', nivel: 1, tipo: 'live', minutos: 10,
  titulo: 'Filtrar y ordenar (WHERE y ORDER BY)',
  contexto: 'La primera pregunta de SQL de casi cualquier entrevista.',
  enunciado: `Tablas: <code>artistas(id, nombre, pais)</code> y <code>albumes(id, titulo, anio, valoracion, artista_id)</code>.<br><br>
Muestra el <b>título</b> y el <b>año</b> de los álbumes publicados <b>desde 2020</b> (incluido), del más nuevo al más antiguo. Si empatan en año, por título A→Z.`,
  evalua: ['SELECT de columnas concretas (no *)', 'WHERE con comparaciones', 'ORDER BY con varios criterios'],
  runner: 'sql', setup: 'SQL_MUSICA', orden: true,
  inicial: `SELECT
FROM albumes
`,
  solucion: `SELECT titulo, anio
FROM albumes
WHERE anio >= 2020           -- desde 2020, incluido
ORDER BY anio DESC,          -- más nuevo primero
         titulo ASC;         -- si empatan, A → Z`,
  pasos: [
    { t: 'Elige las columnas.', pista: 'SELECT titulo, anio' },
    { t: 'Filtra los años.', pista: 'WHERE anio >= 2020 — el = hace que 2020 entre.' },
    { t: 'Ordena.', pista: 'ORDER BY anio DESC, titulo ASC — DESC = de mayor a menor.' }
  ],
  explicacion: [
    { c: 'SELECT titulo, anio', p: 'Pide solo lo que necesitas. SELECT * trae todo y en tablas grandes es más lento. En entrevistas se valora.' },
    { c: 'WHERE anio >= 2020', p: 'Filtra filas. >= incluye el 2020; con > lo dejarías fuera.' },
    { c: 'ORDER BY anio DESC, titulo ASC', p: 'Ordena por año (descendente). Si dos tienen el mismo año, desempata por título.' }
  ],
  faq: [
    { q: '¿Importa el orden de las cláusulas?', a: 'Sí: SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY. Una frase para recordarlo: "Solo Frikis Wapos Gestionan Hasta Ordenadores".' },
    { q: '¿Las mayúsculas en SELECT son obligatorias?', a: 'No, pero escribir las palabras clave en mayúsculas es una convención que hace el SQL más legible.' }
  ]
},

/* ---------- SQL 2 ---------- */
{
  id: 'sql-2', ruta: 'sql', nivel: 2, tipo: 'live', minutos: 15,
  titulo: 'Unir tablas (INNER JOIN)',
  contexto: 'Si no sabes hacer un JOIN, no pasas la entrevista de SQL. Así de importante es.',
  enunciado: `Muestra el <b>título</b> de cada álbum junto al <b>nombre</b> de su artista. Ordena por nombre del artista y luego por año.`,
  evalua: ['JOIN con ON', 'Alias de tablas', 'Entender claves foráneas'],
  runner: 'sql', setup: 'SQL_MUSICA', orden: true,
  inicial: `SELECT
FROM albumes
`,
  solucion: `SELECT al.titulo, ar.nombre
FROM albumes AS al
JOIN artistas AS ar ON ar.id = al.artista_id   -- cómo se relacionan
ORDER BY ar.nombre, al.anio;`,
  pasos: [
    { t: '¿Cómo se relacionan las tablas?', pista: 'albumes.artista_id guarda el id del artista. Esa es la "conexión".' },
    { t: 'Une las tablas.', pista: 'FROM albumes JOIN artistas ON artistas.id = albumes.artista_id' },
    { t: 'Usa alias para escribir menos.', pista: 'FROM albumes AS al JOIN artistas AS ar … y luego al.titulo, ar.nombre.' }
  ],
  explicacion: [
    { c: 'JOIN … ON ar.id = al.artista_id', p: 'Por cada álbum, busca el artista cuyo id coincide con su artista_id y "pega" las dos filas.' },
    { c: 'AS al / AS ar', p: 'Alias: apodos cortos para las tablas. Evitan confusiones cuando dos tablas tienen columnas con el mismo nombre (las dos tienen "id").' },
    { c: 'artista_id', p: 'Es una clave foránea: una columna que apunta al id de otra tabla. Así no repetimos el nombre del artista en cada álbum.' }
  ],
  faq: [
    { q: '¿JOIN e INNER JOIN son lo mismo?', a: 'Sí. JOIN a secas es un INNER JOIN: solo salen las filas que tienen pareja en las dos tablas.' },
    { q: '¿Por qué no guardar el nombre del artista en la tabla albumes?', a: 'Porque si el artista cambia de nombre tendrías que cambiarlo en todos sus álbumes. Separar tablas evita datos duplicados (eso se llama normalizar).' }
  ]
},

/* ---------- SQL 3 ---------- */
{
  id: 'sql-3', ruta: 'sql', nivel: 2, tipo: 'live', minutos: 15,
  titulo: 'Contar por grupos (GROUP BY)',
  contexto: 'Informes y estadísticas: "¿cuántos pedidos tiene cada cliente?" es la versión de empresa.',
  enunciado: `Muestra el <b>nombre</b> de cada artista y cuántos álbumes tiene (columna <code>total</code>). Solo artistas con al menos un álbum. Ordena de más a menos álbumes, y si empatan por nombre.`,
  evalua: ['COUNT y GROUP BY', 'Combinar JOIN con agrupación', 'Nombrar columnas con AS'],
  runner: 'sql', setup: 'SQL_MUSICA', orden: true,
  inicial: `SELECT
FROM artistas
`,
  solucion: `SELECT ar.nombre, COUNT(al.id) AS total
FROM artistas AS ar
JOIN albumes AS al ON al.artista_id = ar.id
GROUP BY ar.id, ar.nombre        -- un grupo por artista
ORDER BY total DESC, ar.nombre;`,
  pasos: [
    { t: 'Une artistas con sus álbumes.', pista: 'JOIN albumes AS al ON al.artista_id = ar.id' },
    { t: 'Agrupa por artista.', pista: 'GROUP BY ar.id, ar.nombre — todas las filas de un mismo artista se juntan en una.' },
    { t: 'Cuenta.', pista: 'COUNT(al.id) AS total cuenta cuántos álbumes hay en cada grupo.' }
  ],
  explicacion: [
    { c: 'GROUP BY ar.id, ar.nombre', p: 'Junta en un solo "montón" todas las filas que tienen el mismo artista. Agrupo también por id por si hay dos artistas con el mismo nombre.' },
    { c: 'COUNT(al.id)', p: 'Cuenta las filas de cada montón. Es una "función de agregación", como SUM, AVG, MIN o MAX.' },
    { c: 'AS total', p: 'Le da nombre a la columna calculada. Luego puedes usar ese nombre en ORDER BY.' }
  ],
  faq: [
    { q: 'Me sale error de que "nombre" debe estar en GROUP BY', a: 'Regla: todo lo que pongas en el SELECT debe estar en el GROUP BY o dentro de una función como COUNT. SQLite es permisivo, pero PostgreSQL te dará error.' }
  ]
},

/* ---------- SQL 4 ---------- */
{
  id: 'sql-4', ruta: 'sql', nivel: 2, tipo: 'teoria', minutos: 15,
  titulo: 'Los que faltan (LEFT JOIN)',
  contexto: 'La diferencia entre INNER y LEFT JOIN es una de las preguntas teóricas más repetidas.',
  enunciado: `Muestra el <b>nombre</b> de los artistas que <b>no tienen ningún álbum</b> registrado.`,
  evalua: ['LEFT JOIN', 'Comprobar con IS NULL', 'Entender qué filas devuelve cada JOIN'],
  runner: 'sql', setup: 'SQL_MUSICA', orden: false,
  inicial: `SELECT
FROM artistas
`,
  solucion: `SELECT ar.nombre
FROM artistas AS ar
LEFT JOIN albumes AS al ON al.artista_id = ar.id
WHERE al.id IS NULL;     -- no encontró ningún álbum`,
  pasos: [
    { t: '¿Por qué un JOIN normal no sirve?', pista: 'Un JOIN normal solo devuelve artistas QUE TIENEN álbumes. Los que no, desaparecen.' },
    { t: 'Usa LEFT JOIN.', pista: 'LEFT JOIN mantiene TODOS los artistas. Si no tienen álbum, las columnas del álbum salen vacías (NULL).' },
    { t: 'Quédate con los vacíos.', pista: 'WHERE al.id IS NULL — ojo: no se puede escribir = NULL.' }
  ],
  explicacion: [
    { c: 'LEFT JOIN', p: 'Guarda todas las filas de la tabla de la izquierda (artistas), tengan pareja o no. Si no tienen, rellena con NULL.' },
    { c: 'WHERE al.id IS NULL', p: 'Solo los artistas que no encontraron álbum. Aquí: Arca.' },
    { c: 'IS NULL (y no = NULL)', p: 'NULL significa "desconocido". Nada es igual a algo desconocido, ni siquiera otro NULL. Por eso existe IS NULL.' }
  ],
  faq: [
    { q: 'Explícame INNER vs LEFT JOIN como en una entrevista', a: 'INNER: solo filas con pareja en las dos tablas. LEFT: todas las de la izquierda, con o sin pareja; donde no hay pareja, NULL. Ejemplo: alumnos y matrículas. INNER = alumnos matriculados. LEFT = todos los alumnos, matriculados o no.' },
    { q: '¿Se podría hacer con NOT IN?', a: 'Sí: SELECT nombre FROM artistas WHERE id NOT IN (SELECT artista_id FROM albumes). Funciona, pero cuidado si la subconsulta puede devolver NULL.' }
  ]
},

/* ---------- SQL 5 ---------- */
{
  id: 'sql-5', ruta: 'sql', nivel: 3, tipo: 'casa', minutos: 15,
  titulo: 'Filtrar grupos (HAVING)',
  contexto: 'WHERE vs HAVING: otra pregunta teórica clásica.',
  enunciado: `Muestra el <b>nombre</b> de los artistas cuya valoración <b>media</b> sea mayor que 4.3, junto a esa media redondeada a 2 decimales (columna <code>media</code>). Ordena de mayor a menor media.`,
  evalua: ['AVG y ROUND', 'Diferencia entre WHERE y HAVING'],
  runner: 'sql', setup: 'SQL_MUSICA', orden: true,
  inicial: `SELECT
FROM artistas
`,
  solucion: `SELECT ar.nombre, ROUND(AVG(al.valoracion), 2) AS media
FROM artistas AS ar
JOIN albumes AS al ON al.artista_id = ar.id
GROUP BY ar.id, ar.nombre
HAVING AVG(al.valoracion) > 4.3   -- filtra GRUPOS, no filas
ORDER BY media DESC;`,
  pasos: [
    { t: 'Calcula la media por artista.', pista: 'JOIN + GROUP BY como en el ejercicio anterior, pero con AVG(al.valoracion).' },
    { t: 'Filtra por la media.', pista: 'WHERE no puede usar AVG (se aplica antes de agrupar). Usa HAVING AVG(al.valoracion) > 4.3.' },
    { t: 'Redondea y ordena.', pista: 'ROUND(AVG(...), 2) AS media y ORDER BY media DESC.' }
  ],
  explicacion: [
    { c: 'AVG(al.valoracion)', p: 'La media: suma de valoraciones dividida entre cuántas hay. SQL la calcula por ti.' },
    { c: 'HAVING', p: 'WHERE filtra filas ANTES de agrupar. HAVING filtra grupos DESPUÉS de agrupar. Como la media solo existe tras agrupar, hay que usar HAVING.' },
    { c: 'ROUND(…, 2)', p: 'Redondea a 2 decimales para mostrarlo bonito.' }
  ],
  faq: [
    { q: '¿Puedo usar WHERE y HAVING en la misma consulta?', a: 'Sí. Por ejemplo, WHERE anio >= 2015 (solo álbumes recientes) y luego HAVING sobre la media de esos.' }
  ]
},

/* ---------- SQL 6 ---------- */
{
  id: 'sql-6', ruta: 'sql', nivel: 3, tipo: 'casa', minutos: 15,
  titulo: 'Subconsulta: mejor que la media',
  contexto: 'Las subconsultas aparecen en pruebas de nivel medio.',
  enunciado: `Muestra <b>título</b> y <b>valoración</b> de los álbumes con valoración <b>mayor que la media de todos los álbumes</b>, de mayor a menor valoración.`,
  evalua: ['Subconsultas', 'Pensar el problema en dos pasos'],
  runner: 'sql', setup: 'SQL_MUSICA', orden: true,
  inicial: `SELECT
FROM albumes
`,
  solucion: `SELECT titulo, valoracion
FROM albumes
WHERE valoracion > (
  SELECT AVG(valoracion) FROM albumes   -- 1º se calcula la media
)
ORDER BY valoracion DESC;`,
  pasos: [
    { t: 'Primero, calcula la media tú sola.', pista: 'SELECT AVG(valoracion) FROM albumes; — ejecútalo para ver el número.' },
    { t: 'Úsala dentro de otra consulta.', pista: 'WHERE valoracion > (SELECT AVG(valoracion) FROM albumes)' }
  ],
  explicacion: [
    { c: '( SELECT AVG(valoracion) FROM albumes )', p: 'Una consulta dentro de otra. Se ejecuta primero y su resultado (un número) se usa en el WHERE.' },
    { c: 'Pensar en dos pasos', p: 'Truco para entrevistas: resuelve primero la parte pequeña (la media) y luego encájala. Dilo en voz alta.' }
  ],
  faq: [
    { q: '¿No podría escribir el número a mano?', a: 'Funcionaría hoy, pero mañana se añaden álbumes y la media cambia. La subconsulta siempre calcula el valor actual.' }
  ]
},

/* ---------- SQL 7 ---------- */
{
  id: 'sql-7', ruta: 'sql', nivel: 2, tipo: 'teoria', minutos: 10,
  titulo: 'Modificar datos con cuidado (UPDATE)',
  contexto: 'Historia real de muchas empresas: alguien hizo un UPDATE sin WHERE en producción…',
  enunciado: `La valoración de <b>"Midnights"</b> estaba mal. Cámbiala a <b>4.2</b> sin tocar ningún otro álbum.`,
  evalua: ['UPDATE … SET … WHERE', 'Ser consciente del peligro de olvidar el WHERE'],
  runner: 'sql', setup: 'SQL_MUSICA', orden: true,
  verificar: 'SELECT titulo, valoracion FROM albumes ORDER BY id;',
  inicial: `UPDATE albumes
`,
  solucion: `UPDATE albumes
SET valoracion = 4.2
WHERE id = 8;   -- mejor por id que por título: el id es único`,
  pasos: [
    { t: 'Qué columna cambias.', pista: 'SET valoracion = 4.2' },
    { t: 'A qué fila. ¡No lo olvides!', pista: 'WHERE titulo = \'Midnights\' funciona, pero WHERE id = 8 es más seguro: el id nunca se repite.' }
  ],
  explicacion: [
    { c: 'SET valoracion = 4.2', p: 'Indica qué columna cambia y su nuevo valor.' },
    { c: 'WHERE id = 8', p: 'Sin WHERE, el UPDATE cambia TODAS las filas. Es uno de los errores más temidos en el trabajo real.' },
    { c: 'Por id y no por título', p: 'Podría haber dos álbumes llamados igual. El id (clave primaria) es único.' },
    { c: 'Buena práctica', p: 'Antes de un UPDATE o DELETE, ejecuta un SELECT con el mismo WHERE para ver qué filas vas a tocar.' }
  ],
  faq: [
    { q: '¿Qué es una transacción?', a: 'Un grupo de cambios que se aplican todos o ninguno (BEGIN … COMMIT, o ROLLBACK para deshacer). Ejemplo clásico: una transferencia bancaria (quitar de una cuenta y sumar a otra).' }
  ]
}

);
