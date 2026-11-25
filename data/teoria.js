/* =========================================================
   TARJETAS DE REPASO (preguntas de entrevista)
   Se usan en "Reto rápido" y también como diccionario del tutor.
   q = pregunta, a = respuesta corta, kw = palabras clave para buscar
   ========================================================= */
window.TARJETAS = [
  /* ----- HTML ----- */
  { id: 't-html-1', ruta: 'html', q: '¿Qué es el HTML semántico?', a: 'Usar cada etiqueta según su significado (header, nav, main, article, button…) y no solo divs. Ayuda a la accesibilidad, al SEO y a que el código se entienda.', kw: ['semantico', 'semántico', 'div', 'etiquetas'] },
  { id: 't-html-2', ruta: 'html', q: '¿Para qué sirve el atributo alt?', a: 'Es el texto alternativo de una imagen: lo leen los lectores de pantalla y se muestra si no carga. Vacío (alt="") si la imagen es decorativa.', kw: ['alt', 'imagen', 'img'] },
  { id: 't-html-3', ruta: 'html', q: '¿Qué es la accesibilidad web (a11y)?', a: 'Que cualquier persona pueda usar la web, incluidas personas con discapacidad visual, motora o cognitiva: teclado, lectores de pantalla, contraste…', kw: ['accesibilidad', 'a11y', 'lector', 'pantalla'] },
  { id: 't-html-4', ruta: 'html', q: '¿Diferencia entre <section> y <article>?', a: 'article: contenido independiente (un post, una tarjeta). section: una parte temática de algo mayor, normalmente con su título.', kw: ['section', 'article'] },
  { id: 't-html-5', ruta: 'html', q: '¿Qué hace la meta viewport?', a: 'Le dice al móvil que use el ancho real de la pantalla. Sin ella, la web se ve "en miniatura" y el responsive no funciona bien.', kw: ['viewport', 'meta', 'movil', 'móvil'] },
  { id: 't-html-6', ruta: 'html', q: '¿Qué es ARIA y cuándo se usa?', a: 'Atributos que añaden información para tecnologías de apoyo (aria-label, aria-current…). Solo cuando no existe una etiqueta HTML que ya lo haga.', kw: ['aria', 'role'] },

  /* ----- CSS ----- */
  { id: 't-css-1', ruta: 'css', q: '¿Qué es el modelo de caja (box model)?', a: 'Cada elemento es una caja con contenido, padding (relleno), border (borde) y margin (margen exterior). box-sizing: border-box hace que el ancho incluya padding y borde.', kw: ['box', 'caja', 'padding', 'margin', 'border'] },
  { id: 't-css-2', ruta: 'css', q: '¿Flexbox o Grid?', a: 'Flexbox para una dimensión (una fila o columna). Grid para dos dimensiones (filas y columnas a la vez).', kw: ['flex', 'flexbox', 'grid'] },
  { id: 't-css-3', ruta: 'css', q: '¿Qué es la especificidad?', a: 'El "peso" de un selector para decidir qué regla gana: ids > clases > etiquetas. Si empatan, gana la que va después.', kw: ['especificidad', 'selector', 'important'] },
  { id: 't-css-4', ruta: 'css', q: '¿Qué significa "mobile first"?', a: 'Escribir primero los estilos para móvil y añadir cambios para pantallas grandes con @media (min-width: …).', kw: ['mobile', 'responsive', 'media', 'query'] },
  { id: 't-css-5', ruta: 'css', q: '¿Diferencia entre rem, em y px?', a: 'px es fijo. rem es relativo al tamaño de letra de la raíz (html). em es relativo al tamaño de letra del elemento padre. rem respeta el tamaño de letra que elige el usuario.', kw: ['rem', 'em', 'px', 'unidades'] },
  { id: 't-css-6', ruta: 'css', q: '¿Qué valores de position conoces?', a: 'static (normal), relative (se mueve respecto a sí mismo), absolute (respecto al ancestro posicionado), fixed (respecto a la pantalla) y sticky (se pega al hacer scroll).', kw: ['position', 'absolute', 'relative', 'fixed', 'sticky'] },

  /* ----- JS ----- */
  { id: 't-js-1', ruta: 'js', q: '¿Diferencia entre var, let y const?', a: 'const: no se reasigna. let: se puede reasignar. Ambas viven solo dentro de su bloque { }. var es la forma antigua, con reglas raras: no la uses.', kw: ['var', 'let', 'const', 'variable'] },
  { id: 't-js-2', ruta: 'js', q: '¿Diferencia entre == y ===?', a: '=== compara valor y tipo. == convierte tipos antes ("0" == 0 es true). Usa siempre ===.', kw: ['==', '===', 'igual', 'comparar'] },
  { id: 't-js-3', ruta: 'js', q: '¿Qué es un closure?', a: 'Una función que recuerda las variables del sitio donde se creó, aunque ese sitio ya haya terminado. Ejemplo: debounce.', kw: ['closure', 'clausura'] },
  { id: 't-js-4', ruta: 'js', q: '¿Qué es una promesa?', a: 'Un objeto que representa un valor que llegará en el futuro (o un error). Con async/await se espera de forma legible.', kw: ['promesa', 'promise', 'async', 'await'] },
  { id: 't-js-5', ruta: 'js', q: '¿Qué es el DOM?', a: 'La representación de la página como un árbol de objetos que JavaScript puede leer y modificar (document.querySelector, createElement…).', kw: ['dom', 'document', 'queryselector'] },
  { id: 't-js-6', ruta: 'js', q: '¿Qué diferencia hay entre null y undefined?', a: 'undefined: no tiene valor porque no se ha asignado. null: "vacío" a propósito, lo pones tú.', kw: ['null', 'undefined'] },
  { id: 't-js-7', ruta: 'js', q: '¿map, filter y reduce?', a: 'map transforma cada elemento (mismo tamaño). filter se queda con los que cumplen algo. reduce acumula todo en un único valor. Ninguno modifica el original.', kw: ['map', 'filter', 'reduce', 'array'] },
  { id: 't-js-8', ruta: 'js', q: '¿Qué es el event loop?', a: 'El mecanismo que permite a JavaScript (que hace una cosa a la vez) gestionar tareas lentas: las deja esperando y ejecuta su callback cuando están listas, sin congelar la página.', kw: ['event', 'loop', 'asincrono', 'asíncrono'] },
  { id: 't-js-9', ruta: 'js', q: '¿Qué es la delegación de eventos?', a: 'Poner un solo listener en el padre en vez de uno en cada hijo, y mirar event.target para saber quién fue. Útil en listas que cambian.', kw: ['delegacion', 'delegación', 'evento', 'listener', 'target'] },
  { id: 't-js-10', ruta: 'js', q: '¿Qué guarda localStorage?', a: 'Textos (clave → valor) en el navegador, que sobreviven al recargar. Para objetos: JSON.stringify al guardar y JSON.parse al leer. No guardes datos sensibles.', kw: ['localstorage', 'guardar', 'json'] },

  /* ----- Git ----- */
  { id: 't-git-1', ruta: 'git', q: '¿Diferencia entre Git y GitHub?', a: 'Git es el programa que guarda el historial en tu ordenador. GitHub es una web que aloja repositorios Git y añade colaboración (PRs, issues…).', kw: ['git', 'github'] },
  { id: 't-git-2', ruta: 'git', q: '¿Qué es un Pull Request?', a: 'Una petición para fusionar tu rama en otra (normalmente main), donde el equipo revisa el código y comenta antes de aceptarlo.', kw: ['pull', 'request', 'pr', 'revision', 'revisión'] },
  { id: 't-git-3', ruta: 'git', q: '¿Qué es una Good First Issue?', a: 'Una tarea marcada en un proyecto open source como adecuada para quien contribuye por primera vez: acotada y con contexto.', kw: ['good', 'first', 'issue', 'open', 'source'] },
  { id: 't-git-4', ruta: 'git', q: '¿Qué es un conflicto de merge?', a: 'Cuando dos ramas cambian las mismas líneas y Git no sabe cuál elegir. Lo resuelves editando el archivo, y luego add y commit.', kw: ['conflicto', 'merge'] },

  /* ----- Criterio ----- */
  { id: 't-crit-1', ruta: 'criterio', q: '¿Qué es XSS?', a: 'Cross-Site Scripting: lograr que una web ejecute código de un atacante metido como texto. Se evita con textContent, escapando datos y con cabeceras de seguridad.', kw: ['xss', 'innerhtml', 'seguridad', 'textcontent'] },
  { id: 't-crit-2', ruta: 'criterio', q: '¿Qué es la inyección SQL?', a: 'Meter código SQL en un dato que la app pega en su consulta. Se evita con consultas parametrizadas.', kw: ['inyeccion', 'inyección', 'sql', 'injection'] },
  { id: 't-crit-3', ruta: 'criterio', q: '¿Cómo depuras un error?', a: 'Leo el mensaje completo, voy a la línea, formulo una hipótesis, la compruebo (console.log o depurador), arreglo y vuelvo a probar.', kw: ['depurar', 'debug', 'error', 'bug'] },
  { id: 't-crit-4', ruta: 'criterio', q: '¿Cómo usas la IA programando?', a: 'Para avanzar más rápido (ideas, código repetitivo, entender errores), pero reviso y entiendo todo lo que genera antes de usarlo, y lo pruebo.', kw: ['ia', 'inteligencia', 'artificial', 'copilot', 'claude', 'chatgpt'] },
  { id: 't-crit-5', ruta: 'criterio', q: '¿Qué es un test unitario?', a: 'Un pequeño programa que comprueba automáticamente que una función devuelve lo esperado. Como los tests de esta app.', kw: ['test', 'unitario', 'pruebas', 'jest', 'vitest'] },
  { id: 't-crit-6', ruta: 'criterio', q: '¿Qué es "off by one"?', a: 'Error de pasarse o quedarse corto por uno en un bucle o índice (< en vez de <=). El más típico de la programación.', kw: ['off', 'bucle', 'indice', 'índice'] },

  /* ----- SQL ----- */
  { id: 't-sql-1', ruta: 'sql', q: '¿Qué es una clave primaria y una foránea?', a: 'Primaria: identifica cada fila de forma única (id). Foránea: columna que apunta a la primaria de otra tabla (artista_id).', kw: ['clave', 'primaria', 'foranea', 'foránea', 'id'] },
  { id: 't-sql-2', ruta: 'sql', q: '¿INNER JOIN vs LEFT JOIN?', a: 'INNER: solo filas con pareja en ambas tablas. LEFT: todas las de la izquierda; si no hay pareja, NULL.', kw: ['join', 'inner', 'left'] },
  { id: 't-sql-3', ruta: 'sql', q: '¿WHERE vs HAVING?', a: 'WHERE filtra filas antes de agrupar. HAVING filtra grupos después de agrupar (con COUNT, AVG…).', kw: ['where', 'having', 'group'] },
  { id: 't-sql-4', ruta: 'sql', q: '¿Qué es normalizar una base de datos?', a: 'Organizar las tablas para no repetir datos (por ejemplo, el artista en su propia tabla). Evita incoherencias.', kw: ['normalizar', 'normalizacion', 'normalización'] },
  { id: 't-sql-5', ruta: 'sql', q: '¿Qué es un índice?', a: 'Una estructura que acelera las búsquedas por una columna, como el índice de un libro. A cambio, las escrituras son algo más lentas.', kw: ['indice', 'índice', 'index', 'rendimiento'] },
  { id: 't-sql-6', ruta: 'sql', q: '¿SQL vs NoSQL?', a: 'SQL: tablas con estructura fija y relaciones (PostgreSQL, MySQL). NoSQL: estructuras más flexibles como documentos JSON (MongoDB).', kw: ['nosql', 'mongodb', 'postgresql', 'mysql'] },

  /* ----- TS / React ----- */
  { id: 't-ts-1', ruta: 'ts', q: '¿Qué aporta TypeScript?', a: 'Tipos que detectan errores antes de ejecutar, mejor autocompletado y código más fácil de entender en equipo.', kw: ['typescript', 'tipos', 'ts'] },
  { id: 't-ts-2', ruta: 'ts', q: '¿any vs unknown?', a: 'any desactiva las comprobaciones. unknown obliga a comprobar el tipo antes de usarlo. Mejor unknown.', kw: ['any', 'unknown'] },
  { id: 't-react-1', ruta: 'react', q: '¿Props vs estado?', a: 'Props: datos que llegan del padre y no se modifican. Estado: memoria interna del componente que cambia con su función set.', kw: ['props', 'estado', 'state', 'usestate'] },
  { id: 't-react-2', ruta: 'react', q: '¿Para qué sirve key en una lista?', a: 'Para que React identifique cada elemento al actualizar la lista. Debe ser única y estable (un id, no el índice).', kw: ['key', 'lista', 'map'] },
  { id: 't-react-3', ruta: 'react', q: '¿Qué hace useEffect?', a: 'Ejecuta código después de pintar (cargar datos, suscripciones). El array de dependencias dice cuándo repetirlo.', kw: ['useeffect', 'efecto', 'dependencias'] },
  { id: 't-react-4', ruta: 'react', q: '¿Qué es levantar el estado (lifting state up)?', a: 'Mover el estado al padre común cuando dos componentes hermanos necesitan compartirlo, y pasarlo por props.', kw: ['levantar', 'lifting', 'compartir'] },

  /* ----- Backend ----- */
  { id: 't-node-1', ruta: 'node', q: '¿Qué es una API REST?', a: 'Una forma de diseñar APIs: URLs que nombran recursos (/albumes), métodos HTTP para las acciones y códigos de estado para el resultado.', kw: ['api', 'rest', 'endpoint'] },
  { id: 't-node-2', ruta: 'node', q: '¿401 vs 403?', a: '401: no estás autenticado (no sé quién eres). 403: sé quién eres, pero no tienes permiso.', kw: ['401', '403', 'permiso', 'autenticacion', 'autenticación'] },
  { id: 't-node-3', ruta: 'node', q: '¿Qué es un JWT?', a: 'Un token firmado que el servidor da al iniciar sesión. El cliente lo envía en cada petición para demostrar quién es.', kw: ['jwt', 'token', 'login', 'sesion', 'sesión'] },
  { id: 't-java-1', ruta: 'java', q: '¿Los 4 pilares de la POO?', a: 'Encapsulación, herencia, polimorfismo y abstracción.', kw: ['poo', 'objetos', 'herencia', 'polimorfismo', 'encapsulacion', 'encapsulación'] },
  { id: 't-java-2', ruta: 'java', q: '¿Interfaz vs clase abstracta en Java?', a: 'Interfaz: un contrato de métodos que una clase promete cumplir (puede implementar varias). Clase abstracta: base con código común; solo se hereda de una.', kw: ['interfaz', 'abstracta', 'interface'] },
  { id: 't-py-1', ruta: 'python', q: '¿Lista vs tupla en Python?', a: 'La lista se puede modificar []. La tupla no ( ). Las tuplas sirven para datos fijos.', kw: ['lista', 'tupla', 'python'] },

  /* ----- Entrevista (soft skills) ----- */
  { id: 't-soft-1', ruta: 'criterio', q: '"Háblame de un proyecto del que estés orgullosa"', a: 'Estructura STAR: Situación, Tarea, Acción (lo que hiciste TÚ y por qué) y Resultado. Menciona un problema que resolviste.', kw: ['proyecto', 'star', 'entrevista'] },
  { id: 't-soft-2', ruta: 'criterio', q: '¿Qué haces si no sabes la respuesta en una entrevista?', a: 'Decirlo con honestidad y explicar cómo lo averiguarías o razonarlo en voz alta. Inventarse algo es peor que decir "no lo sé, pero…".', kw: ['no', 'se', 'sé', 'respuesta', 'nervios'] }
];
