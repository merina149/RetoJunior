/* =========================================================
   EJERCICIOS DE HTML
   runner 'web': escribes un documento HTML y se comprueba con "checks".
   Cada check recibe (d = documento, w = ventana, ctx = ayudas).
   ========================================================= */
window.EJERCICIOS = window.EJERCICIOS || [];

window.EJERCICIOS.push(

/* ---------- HTML 1: ficha de álbum semántica ---------- */
{
  id: 'html-1', ruta: 'html', nivel: 1, tipo: 'casa', minutos: 20,
  titulo: 'Ficha de un álbum con HTML semántico',
  contexto: 'Clásico de prueba para casa: "maqueta esta pantalla sin usar solo divs".',
  enunciado: `Crea la ficha de un álbum (el que tú quieras) usando etiquetas <b>semánticas</b>:
<ul>
<li>Una cabecera (<code>header</code>) con el nombre de tu app.</li>
<li>El contenido principal (<code>main</code>) con un <code>article</code> para el álbum.</li>
<li>Un único <code>h1</code> con el título del álbum.</li>
<li>La portada como <code>img</code> con un texto alternativo (<code>alt</code>) que la describa.</li>
<li>La lista de canciones en una lista ordenada (<code>ol</code>) con al menos 3 canciones.</li>
<li>Un pie de página (<code>footer</code>).</li>
</ul>`,
  evalua: ['Que sepas elegir la etiqueta correcta para cada cosa', 'Accesibilidad básica (alt, un solo h1)', 'Código limpio y bien indentado'],
  runner: 'web',
  inicial: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Mi álbum</title>
</head>
<body>
  <!-- Escribe aquí tu ficha de álbum -->

</body>
</html>`,
  checks: [
    { t: 'Hay un <header>', f: d => !!d.querySelector('header') },
    { t: 'Hay un <main>', f: d => !!d.querySelector('main') },
    { t: 'Hay un <article> dentro de <main>', f: d => !!d.querySelector('main article') },
    { t: 'Hay exactamente un <h1>', f: d => d.querySelectorAll('h1').length === 1 },
    { t: 'La imagen tiene un alt con texto', f: d => { const i = d.querySelector('img'); return !!i && (i.getAttribute('alt') || '').trim().length > 3; } },
    { t: 'Hay una <ol> con 3 o más canciones', f: d => { const o = d.querySelector('ol'); return !!o && o.querySelectorAll('li').length >= 3; } },
    { t: 'Hay un <footer>', f: d => !!d.querySelector('footer') }
  ],
  pasos: [
    { t: 'Piensa en el esqueleto: arriba, en medio y abajo.', pista: 'Arriba va <header>, en medio <main> y abajo <footer>. Los tres son hijos directos de <body>.' },
    { t: 'Dentro de <main>, crea el bloque del álbum.', pista: 'Un <article> es un contenido que tiene sentido por sí solo (como una ficha). Mete ahí el <h1>, la portada y la lista.' },
    { t: 'Añade la portada.', pista: 'Puedes usar cualquier URL de imagen, por ejemplo https://picsum.photos/300. Lo importante es el alt: describe qué se ve, como "Portada del álbum X de Y".' },
    { t: 'Haz la lista de canciones.', pista: 'Como el orden importa (pista 1, pista 2…), es una lista ordenada: <ol> con varios <li>.' }
  ],
  solucion: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Mi álbum</title>
</head>
<body>
  <header>
    <p>🎵 MiDiscoteca</p>
  </header>

  <main>
    <article>
      <h1>Nombre del álbum</h1>
      <img src="https://picsum.photos/300" alt="Portada del álbum: fondo naranja con el nombre del grupo">
      <p>Artista · 2024</p>

      <h2>Canciones</h2>
      <ol>
        <li>Primera canción</li>
        <li>Segunda canción</li>
        <li>Tercera canción</li>
      </ol>
    </article>
  </main>

  <footer>
    <p>Hecho por Carmen</p>
  </footer>
</body>
</html>`,
  explicacion: [
    { c: '<header> … <main> … <footer>', p: 'Son "zonas" de la página. Los lectores de pantalla (que usan personas ciegas) permiten saltar directamente a <main>. Con divs no podrían.' },
    { c: '<article>', p: 'Se usa para algo que podría publicarse solo: una ficha, un post, una tarjeta de producto. Un <section> sería para agrupar partes de algo mayor.' },
    { c: '<h1> (solo uno)', p: 'El h1 es el título de la página. Tener uno solo ayuda a Google y a la accesibilidad. Los subtítulos son h2, h3…' },
    { c: 'alt="Portada del álbum…"', p: 'Si la imagen no carga o la persona no ve, el alt es lo que se lee. Un alt vacío (alt="") solo se usa en imágenes decorativas.' },
    { c: '<ol>', p: 'Ordenada porque el orden de las canciones importa. Si no importara (por ejemplo, géneros), sería <ul>.' }
  ],
  faq: [
    { q: '¿Por qué no usar solo divs si se ve igual?', a: 'Porque el navegador, Google y los lectores de pantalla no "ven" la página: leen las etiquetas. Un div no dice nada; un <nav> dice "esto es navegación". Además, en una entrevista es lo primero que miran.' },
    { q: '¿Cuándo uso section y cuándo article?', a: 'article: algo independiente (una tarjeta, un post). section: una parte de algo, normalmente con su propio título (por ejemplo, "Canciones" dentro de la ficha).' },
    { q: '¿Qué pasa si pongo dos h1?', a: 'No rompe nada, pero confunde sobre cuál es el título principal. En pruebas técnicas lo marcan como mala práctica.' }
  ]
},

/* ---------- HTML 2: formulario accesible ---------- */
{
  id: 'html-2', ruta: 'html', nivel: 1, tipo: 'casa', minutos: 20,
  titulo: 'Formulario de registro accesible',
  contexto: 'Los formularios salen en casi todas las pruebas: registro, login, contacto…',
  enunciado: `Crea un formulario de registro con:
<ul>
<li>Nombre (obligatorio).</li>
<li>Email (obligatorio y de tipo email).</li>
<li>Contraseña (obligatoria, mínimo 8 caracteres).</li>
<li>Un botón para enviar.</li>
</ul>
Cada campo debe tener su <code>label</code> conectado.`,
  evalua: ['Cada input tiene un label conectado', 'Usar los tipos correctos (email, password)', 'Validación nativa del navegador (required, minlength)'],
  runner: 'web',
  inicial: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Registro</title>
</head>
<body>
  <h1>Crea tu cuenta</h1>
  <!-- Escribe aquí tu formulario -->

</body>
</html>`,
  checks: [
    { t: 'Hay un <form>', f: d => !!d.querySelector('form') },
    { t: 'Todos los campos tienen <label> conectado', f: (d, w, ctx) => { const ins = [...d.querySelectorAll('input:not([type=submit]):not([type=hidden]), textarea, select')]; return ins.length >= 3 && ins.every(ctx.tieneLabel); } },
    { t: 'El email es type="email" y required', f: d => !!d.querySelector('input[type=email][required]') },
    { t: 'La contraseña es type="password", required y minlength="8"', f: d => { const p = d.querySelector('input[type=password]'); return !!p && p.required && Number(p.getAttribute('minlength')) >= 8; } },
    { t: 'El nombre es obligatorio', f: d => [...d.querySelectorAll('input[type=text], input:not([type])')].some(i => i.required) },
    { t: 'Hay un botón de enviar', f: d => !!d.querySelector('button[type=submit], button:not([type]), input[type=submit]') }
  ],
  pasos: [
    { t: 'Crea el <form> y el primer campo con su label.', pista: 'Conecta label e input así: <label for="nombre">Nombre</label> <input id="nombre">. El "for" del label y el "id" del input deben ser iguales.' },
    { t: 'Haz el email.', pista: 'type="email" hace que el móvil muestre el teclado con @ y que el navegador compruebe el formato.' },
    { t: 'Haz la contraseña.', pista: 'type="password" oculta lo que escribes. minlength="8" exige 8 caracteres mínimo. required = obligatorio.' },
    { t: 'Añade el botón.', pista: 'Un <button type="submit">Crear cuenta</button> dentro del form.' }
  ],
  solucion: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Registro</title>
</head>
<body>
  <h1>Crea tu cuenta</h1>

  <form>
    <!-- Nombre -->
    <label for="nombre">Nombre</label>
    <input id="nombre" name="nombre" type="text" required autocomplete="name">

    <!-- Email -->
    <label for="email">Email</label>
    <input id="email" name="email" type="email" required autocomplete="email">

    <!-- Contraseña -->
    <label for="pass">Contraseña</label>
    <input id="pass" name="pass" type="password" required minlength="8" autocomplete="new-password">
    <small>Mínimo 8 caracteres</small>

    <button type="submit">Crear cuenta</button>
  </form>
</body>
</html>`,
  explicacion: [
    { c: '<label for="email"> + <input id="email">', p: 'Conectados, al tocar el texto se activa el campo (más fácil en móvil) y el lector de pantalla dice "Email, campo de texto".' },
    { c: 'type="email"', p: 'Validación gratis: el navegador avisa si falta la @. Y en móvil sale el teclado adecuado.' },
    { c: 'required minlength="8"', p: 'Validación nativa sin JavaScript. Ojo: en el servidor hay que volver a validar, porque esto se puede saltar.' },
    { c: 'autocomplete="new-password"', p: 'Detalle que impresiona: ayuda a los gestores de contraseñas a sugerir una segura.' },
    { c: 'name="…"', p: 'El name es la "clave" con la que se envía el dato al servidor. Sin name, el dato no se envía.' }
  ],
  faq: [
    { q: '¿Por qué no basta con poner un placeholder?', a: 'El placeholder desaparece al escribir y muchos lectores de pantalla no lo leen como nombre del campo. El label siempre está visible y conectado.' },
    { q: '¿Qué diferencia hay entre id y name?', a: 'id identifica el elemento en la página (para el label, CSS o JS). name es el nombre con el que viaja el dato al enviar el formulario.' },
    { q: '¿Si valido en HTML ya no hace falta validar en el servidor?', a: 'Sí hace falta. Cualquiera puede saltarse la validación del navegador. La del HTML es para comodidad del usuario; la del servidor es la seguridad.' }
  ]
},

/* ---------- HTML 3: navegación ---------- */
{
  id: 'html-3', ruta: 'html', nivel: 2, tipo: 'live', minutos: 15,
  titulo: 'Menú de navegación accesible',
  contexto: 'Pregunta típica: "¿cómo harías un menú para que lo use alguien con teclado o lector de pantalla?"',
  enunciado: `Crea una cabecera con:
<ul>
<li>Un enlace "Saltar al contenido" que lleve al <code>main</code> (con <code>id="contenido"</code>).</li>
<li>Un <code>nav</code> con una lista (<code>ul</code>) de 3 enlaces: Inicio, Álbumes, Perfil.</li>
<li>El enlace de la página actual marcado con <code>aria-current="page"</code>.</li>
</ul>`,
  evalua: ['Estructura nav > ul > li > a', 'Saber qué es un skip link', 'Uso correcto de ARIA (poco y bien)'],
  runner: 'web',
  inicial: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Navegación</title>
</head>
<body>
  <header>
    <!-- Enlace para saltar y el menú -->

  </header>

  <main>
    <h1>Inicio</h1>
  </main>
</body>
</html>`,
  checks: [
    { t: 'Hay un enlace que apunta a #contenido', f: d => !!d.querySelector('a[href="#contenido"]') },
    { t: 'El <main> tiene id="contenido"', f: d => !!d.querySelector('main#contenido') },
    { t: 'Hay nav > ul > li > a', f: d => !!d.querySelector('nav ul li a') },
    { t: 'El menú tiene 3 enlaces', f: d => d.querySelectorAll('nav a').length === 3 },
    { t: 'Un enlace tiene aria-current="page"', f: d => d.querySelectorAll('nav a[aria-current="page"]').length === 1 }
  ],
  pasos: [
    { t: 'Primero el enlace de salto, el primer elemento de la página.', pista: '<a href="#contenido">Saltar al contenido</a>. El # hace que vaya al elemento con ese id.' },
    { t: 'Dale el id al main.', pista: '<main id="contenido">' },
    { t: 'Construye el menú.', pista: '<nav><ul><li><a href="/">Inicio</a></li> … </ul></nav>. Es una lista porque son varios enlaces del mismo tipo.' },
    { t: 'Marca la página actual.', pista: 'Añade aria-current="page" al enlace de Inicio. El lector de pantalla dirá "página actual".' }
  ],
  solucion: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Navegación</title>
</head>
<body>
  <header>
    <!-- Primer elemento: permite saltar el menú con el teclado -->
    <a class="saltar" href="#contenido">Saltar al contenido</a>

    <nav aria-label="Principal">
      <ul>
        <li><a href="/" aria-current="page">Inicio</a></li>
        <li><a href="/albumes">Álbumes</a></li>
        <li><a href="/perfil">Perfil</a></li>
      </ul>
    </nav>
  </header>

  <main id="contenido">
    <h1>Inicio</h1>
  </main>
</body>
</html>`,
  explicacion: [
    { c: '<a href="#contenido">Saltar al contenido</a>', p: 'Quien navega con el tabulador tendría que pasar por todo el menú en cada página. Este enlace le deja ir directo al contenido. Suele ocultarse con CSS hasta que recibe el foco.' },
    { c: 'nav > ul > li > a', p: 'Así el lector de pantalla anuncia "navegación, lista de 3 elementos". La persona sabe cuántas opciones hay.' },
    { c: 'aria-label="Principal"', p: 'Si hay varios nav (por ejemplo uno en el footer), el label los distingue.' },
    { c: 'aria-current="page"', p: 'Indica la página actual. Además puedes usarlo en CSS: a[aria-current="page"] { font-weight: bold; }' }
  ],
  faq: [
    { q: '¿Qué es ARIA?', a: 'Son atributos que añaden información para tecnologías de apoyo. Regla de oro: si existe una etiqueta HTML que ya lo hace (button, nav…), úsala en vez de ARIA.' },
    { q: '¿Por qué usar una lista para el menú?', a: 'Porque semánticamente es una lista de enlaces. El lector de pantalla dice cuántos hay, y queda más ordenado.' }
  ]
},

/* ---------- HTML 4: tabla accesible ---------- */
{
  id: 'html-4', ruta: 'html', nivel: 2, tipo: 'casa', minutos: 15,
  titulo: 'Tabla de datos de canciones',
  contexto: 'Paneles de administración y dashboards: las tablas son el pan de cada día.',
  enunciado: `Haz una tabla con 3 canciones y las columnas <b>Título</b>, <b>Artista</b> y <b>Duración</b>.
<ul>
<li>Debe tener un <code>caption</code> (título de la tabla).</li>
<li>La fila de cabecera en <code>thead</code> con celdas <code>th</code> y <code>scope="col"</code>.</li>
<li>Los datos en <code>tbody</code>.</li>
</ul>`,
  evalua: ['Saber cuándo usar una tabla (datos tabulares, no maquetación)', 'Estructura thead/tbody', 'Accesibilidad con caption y scope'],
  runner: 'web',
  inicial: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Canciones</title>
</head>
<body>
  <!-- Tu tabla aquí -->

</body>
</html>`,
  checks: [
    { t: 'Hay una <table> con <caption>', f: d => !!d.querySelector('table caption') },
    { t: 'Hay <thead> con 3 <th scope="col">', f: d => d.querySelectorAll('thead th[scope="col"]').length === 3 },
    { t: 'Hay <tbody> con 3 filas', f: d => d.querySelectorAll('tbody tr').length >= 3 },
    { t: 'Cada fila tiene 3 celdas', f: d => [...d.querySelectorAll('tbody tr')].every(tr => tr.children.length === 3) }
  ],
  pasos: [
    { t: 'Crea la tabla y su título.', pista: '<table><caption>Mis canciones favoritas</caption> … </table>. El caption va justo después de abrir table.' },
    { t: 'Crea la cabecera.', pista: '<thead><tr><th scope="col">Título</th> … </tr></thead>' },
    { t: 'Añade los datos.', pista: '<tbody> con un <tr> por canción y un <td> por dato.' }
  ],
  solucion: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Canciones</title>
</head>
<body>
  <table>
    <caption>Mis canciones favoritas</caption>
    <thead>
      <tr>
        <th scope="col">Título</th>
        <th scope="col">Artista</th>
        <th scope="col">Duración</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Canción A</td><td>Artista 1</td><td>3:20</td></tr>
      <tr><td>Canción B</td><td>Artista 2</td><td>4:05</td></tr>
      <tr><td>Canción C</td><td>Artista 3</td><td>2:58</td></tr>
    </tbody>
  </table>
</body>
</html>`,
  explicacion: [
    { c: '<caption>', p: 'Es el título de la tabla. El lector de pantalla lo anuncia antes de leer los datos, para que se sepa de qué va.' },
    { c: '<th scope="col">', p: 'Dice que esa celda es el encabezado de su columna. Así, al leer "3:20", se anuncia "Duración: 3:20".' },
    { c: '<thead> / <tbody>', p: 'Separan cabecera y datos. Además permiten, por ejemplo, que la cabecera se repita al imprimir varias páginas.' }
  ],
  faq: [
    { q: '¿Puedo usar tablas para maquetar la página?', a: 'No. Eso se hacía hace 20 años. Para colocar cosas se usa CSS (Flexbox o Grid). Las tablas son solo para datos en filas y columnas.' },
    { q: '¿Qué es scope="row"?', a: 'Se usa cuando la primera celda de cada fila es el encabezado de esa fila (por ejemplo, el nombre de la canción en una tabla de estadísticas).' }
  ]
},

/* ---------- HTML 5: arreglar accesibilidad ---------- */
{
  id: 'html-5', ruta: 'html', nivel: 2, tipo: 'live', minutos: 20,
  titulo: 'Arregla esta página inaccesible',
  contexto: 'Cada vez más entrevistas te dan código malo (a veces generado por IA) y te piden mejorarlo.',
  enunciado: `Este código "funciona" pero tiene varios problemas de accesibilidad. Arréglalos:
<ul>
<li>El documento no dice su idioma.</li>
<li>Hay un <code>div</code> que actúa como botón.</li>
<li>Hay imágenes sin <code>alt</code>.</li>
<li>Hay un campo sin <code>label</code>.</li>
</ul>`,
  evalua: ['Detectar problemas en código ajeno', 'Saber que un div no es un botón', 'Conocer lo básico de accesibilidad'],
  runner: 'web',
  inicial: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Buscar música</title>
</head>
<body>
  <img src="https://picsum.photos/80" >
  <h1>Buscar música</h1>

  <input id="buscar" placeholder="Escribe un artista">
  <div class="boton" onclick="alert('Buscando…')">Buscar</div>

  <img src="https://picsum.photos/200">
</body>
</html>`,
  checks: [
    { t: '<html> tiene lang="es"', f: d => (d.documentElement.getAttribute('lang') || '').startsWith('es') },
    { t: 'No queda ningún div con onclick', f: d => !d.querySelector('div[onclick]') },
    { t: 'Hay un <button> de verdad', f: d => !!d.querySelector('button') },
    { t: 'Todas las imágenes tienen alt', f: d => [...d.querySelectorAll('img')].every(i => i.hasAttribute('alt')) },
    { t: 'El campo de búsqueda tiene label', f: (d, w, ctx) => { const i = d.querySelector('input'); return !!i && ctx.tieneLabel(i); } }
  ],
  pasos: [
    { t: 'Empieza por lo fácil: el idioma.', pista: '<html lang="es">. Sin esto, un lector de pantalla podría leer el español con acento inglés.' },
    { t: 'Cambia el div por un botón.', pista: '<button type="button">Buscar</button>. Un div no recibe el foco con el teclado ni se activa con Enter.' },
    { t: 'Revisa las imágenes.', pista: 'Si una imagen es decorativa (un logo repetido, un adorno), alt="" vacío. Si aporta información, descríbela.' },
    { t: 'Etiqueta el campo.', pista: '<label for="buscar">Artista</label> antes del input.' }
  ],
  solucion: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Buscar música</title>
</head>
<body>
  <!-- Logo: aporta información (el nombre de la app) -->
  <img src="https://picsum.photos/80" alt="Logo de MiDiscoteca">
  <h1>Buscar música</h1>

  <label for="buscar">Artista</label>
  <input id="buscar" type="search" placeholder="Ej: Rosalía">
  <!-- Un botón de verdad: funciona con teclado y lector de pantalla -->
  <button type="button" onclick="alert('Buscando…')">Buscar</button>

  <!-- Imagen decorativa: alt vacío para que el lector la ignore -->
  <img src="https://picsum.photos/200" alt="">
</body>
</html>`,
  explicacion: [
    { c: '<html lang="es">', p: 'Indica el idioma. Los lectores de pantalla y los traductores lo usan para pronunciar y traducir bien.' },
    { c: '<button> en vez de <div onclick>', p: 'Un botón real recibe el foco con Tab, se activa con Enter y Espacio, y se anuncia como "botón". Un div no hace nada de eso.' },
    { c: 'alt="" en la imagen decorativa', p: 'alt vacío no es lo mismo que no tener alt: vacío le dice al lector "ignórala". Sin alt, a veces lee el nombre del archivo.' },
    { c: 'type="search"', p: 'Mejora extra: en móvil muestra el teclado con botón de buscar.' }
  ],
  faq: [
    { q: '¿Y si le pongo role="button" al div?', a: 'Se anunciaría como botón, pero seguirías teniendo que programar el foco y las teclas a mano. Es mucho más fácil y seguro usar <button>.' },
    { q: '¿Cómo pruebo la accesibilidad de mi web?', a: 'Navega solo con el teclado (Tab, Enter). Y usa Lighthouse en Chrome (DevTools → Lighthouse) que da una puntuación de accesibilidad.' }
  ]
},

/* ---------- HTML 6: head y responsive ---------- */
{
  id: 'html-6', ruta: 'html', nivel: 3, tipo: 'teoria', minutos: 15,
  titulo: 'Un <head> profesional y una imagen responsive',
  contexto: 'Te preguntan "¿qué pones siempre en el head?" o "¿cómo optimizas imágenes?"',
  enunciado: `Completa el documento para que:
<ul>
<li>Tenga <code>meta charset</code>, <code>meta viewport</code> y <code>title</code>.</li>
<li>Tenga una <code>meta name="description"</code>.</li>
<li>La imagen use <code>srcset</code> (al menos 2 tamaños) y <code>loading="lazy"</code>.</li>
</ul>`,
  evalua: ['Saber qué hace el viewport en móvil', 'SEO básico', 'Rendimiento: imágenes ligeras y carga diferida'],
  runner: 'web',
  inicial: `<!DOCTYPE html>
<html lang="es">
<head>
  <!-- Completa el head -->

</head>
<body>
  <h1>Novedades</h1>
  <img src="https://picsum.photos/400" alt="Portada del disco de la semana">
</body>
</html>`,
  checks: [
    { t: 'Hay meta charset', f: d => !!d.querySelector('meta[charset]') },
    { t: 'Hay meta viewport con width=device-width', f: d => /width=device-width/.test((d.querySelector('meta[name=viewport]') || {}).content || '') },
    { t: 'Hay un <title> con texto', f: d => (d.title || '').trim().length > 0 },
    { t: 'Hay meta description', f: d => ((d.querySelector('meta[name=description]') || {}).content || '').length > 10 },
    { t: 'La imagen tiene srcset con 2 o más tamaños', f: d => { const i = d.querySelector('img'); return !!i && (i.getAttribute('srcset') || '').split(',').length >= 2; } },
    { t: 'La imagen tiene loading="lazy"', f: d => { const i = d.querySelector('img'); return !!i && i.getAttribute('loading') === 'lazy'; } }
  ],
  pasos: [
    { t: 'Lo básico del head.', pista: '<meta charset="UTF-8"> para las tildes y la ñ. <title> para la pestaña.' },
    { t: 'El viewport.', pista: '<meta name="viewport" content="width=device-width, initial-scale=1">. Sin esto el móvil muestra la web "en pequeñito" como si fuera un ordenador.' },
    { t: 'La descripción.', pista: '<meta name="description" content="…">. Es el texto que sale en Google bajo el título.' },
    { t: 'La imagen.', pista: 'srcset="https://picsum.photos/400 400w, https://picsum.photos/800 800w" + sizes="100vw". El navegador elige la que necesita.' }
  ],
  solucion: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Novedades · MiDiscoteca</title>
  <meta name="description" content="Los discos nuevos de la semana, con reseñas cortas y valoraciones.">
</head>
<body>
  <h1>Novedades</h1>
  <img
    src="https://picsum.photos/400"
    srcset="https://picsum.photos/400 400w,
            https://picsum.photos/800 800w"
    sizes="(min-width: 800px) 800px, 100vw"
    loading="lazy"
    alt="Portada del disco de la semana">
</body>
</html>`,
  explicacion: [
    { c: 'meta viewport', p: 'Le dice al móvil: "usa el ancho real de la pantalla". Sin esto, el responsive con media queries no funciona bien.' },
    { c: 'srcset … 400w, 800w', p: 'Le das al navegador varias versiones. Un móvil descarga la pequeña (menos datos, más rápido) y una pantalla grande la grande.' },
    { c: 'sizes', p: 'Le dice qué ancho ocupará la imagen, para que elija bien antes de descargar.' },
    { c: 'loading="lazy"', p: 'La imagen no se descarga hasta que vas a verla al hacer scroll. La página carga antes.' }
  ],
  faq: [
    { q: '¿El meta description sube mi web en Google?', a: 'No directamente, pero mejora el texto que ven al buscar y eso hace que más gente haga clic.' },
    { q: '¿Pongo loading="lazy" en todas las imágenes?', a: 'En todas menos las que se ven nada más abrir (como la imagen principal). Esas conviene que carguen cuanto antes.' }
  ]
}

);
