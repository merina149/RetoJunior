/* =========================================================
   EJERCICIOS DE CSS
   runner 'css': el HTML ya está hecho (campo "html"),
   tú escribes solo el CSS. Los checks miran el resultado real.
   ctx.ancho(px)  -> cambia el ancho de la vista previa (para probar responsive)
   ctx.cssTexto   -> tu CSS como texto
   ========================================================= */
window.EJERCICIOS = window.EJERCICIOS || [];

window.EJERCICIOS.push(

/* ---------- CSS 1: centrar ---------- */
{
  id: 'css-1', ruta: 'css', nivel: 1, tipo: 'live', minutos: 10,
  titulo: 'Centra la tarjeta (el clásico)',
  contexto: '"¿Cómo centrarías un elemento?" es probablemente la pregunta de CSS más repetida en entrevistas.',
  enunciado: `Centra la <code>.tarjeta</code> en horizontal y vertical dentro de <code>.escena</code>, que debe ocupar toda la altura de la pantalla.`,
  evalua: ['Conocer Flexbox o Grid', 'Entender alto de pantalla (vh)', 'Explicar por qué funciona'],
  runner: 'css',
  html: `<div class="escena">
  <div class="tarjeta">🎧 Ahora suena</div>
</div>`,
  inicial: `body { margin: 0; font-family: sans-serif; }

.tarjeta {
  background: #6c4cf1;
  color: white;
  padding: 24px;
  border-radius: 16px;
}

.escena {
  /* Escribe aquí */

}`,
  checks: [
    { t: '.escena ocupa al menos toda la altura de la pantalla', f: (d, w) => d.querySelector('.escena').getBoundingClientRect().height >= w.innerHeight - 1 },
    { t: 'La tarjeta está centrada en horizontal', f: (d, w) => { const r = d.querySelector('.tarjeta').getBoundingClientRect(); return Math.abs((r.left + r.width / 2) - w.innerWidth / 2) < 3; } },
    { t: 'La tarjeta está centrada en vertical', f: (d, w) => { const e = d.querySelector('.escena').getBoundingClientRect(); const r = d.querySelector('.tarjeta').getBoundingClientRect(); return Math.abs((r.top + r.height / 2) - (e.top + e.height / 2)) < 3; } }
  ],
  pasos: [
    { t: 'Haz que la escena mida lo mismo que la pantalla.', pista: 'min-height: 100vh; (vh = "alto de la ventana"; 100vh es el 100%).' },
    { t: 'Convierte la escena en un contenedor flexible.', pista: 'display: flex; hace que sus hijos se puedan colocar fácilmente.' },
    { t: 'Centra en los dos ejes.', pista: 'justify-content: center; (horizontal) y align-items: center; (vertical).' }
  ],
  solucion: `body { margin: 0; font-family: sans-serif; }

.tarjeta {
  background: #6c4cf1;
  color: white;
  padding: 24px;
  border-radius: 16px;
}

.escena {
  min-height: 100vh;        /* ocupa toda la altura */
  display: flex;            /* activa Flexbox */
  justify-content: center;  /* centra en el eje principal (horizontal) */
  align-items: center;      /* centra en el eje cruzado (vertical) */
}

/* Alternativa con Grid (también vale):
.escena { min-height: 100vh; display: grid; place-items: center; } */`,
  explicacion: [
    { c: 'min-height: 100vh', p: 'Sin altura, la escena solo mide lo que mide la tarjeta, y "centrar en vertical" no se nota. Uso min-height (no height) para que pueda crecer si hay más contenido.' },
    { c: 'display: flex', p: 'Convierte la escena en un contenedor flexible: sus hijos se colocan en fila y puedes alinearlos.' },
    { c: 'justify-content: center', p: 'Alinea en el eje principal. En una fila (lo normal) es el horizontal.' },
    { c: 'align-items: center', p: 'Alinea en el eje cruzado, el perpendicular: aquí el vertical.' },
    { c: 'display: grid; place-items: center', p: 'La alternativa más corta. Contarla en la entrevista suma puntos: demuestras que conoces dos formas.' }
  ],
  faq: [
    { q: '¿Por qué justify es horizontal y align vertical?', a: 'Depende de la dirección. Con flex-direction: row (por defecto) el eje principal es horizontal. Si pones column, se intercambian. Por eso se habla de "eje principal" y "eje cruzado".' },
    { q: '¿Y margin: 0 auto?', a: 'Centra solo en horizontal y solo si el elemento tiene un ancho. Es útil, pero no centra en vertical.' }
  ]
},

/* ---------- CSS 2: nav responsive ---------- */
{
  id: 'css-2', ruta: 'css', nivel: 2, tipo: 'casa', minutos: 20,
  titulo: 'Menú que se adapta al móvil',
  contexto: 'Responsive "mobile first" aparece en casi todas las pruebas para casa.',
  enunciado: `Estiliza el menú con enfoque <b>mobile first</b>:
<ul>
<li>En móvil (menos de 600px): los enlaces uno debajo de otro.</li>
<li>Desde 600px: los enlaces en fila.</li>
<li>Quita los puntos de la lista.</li>
</ul>`,
  evalua: ['Mobile first: estilos base para móvil y media query para pantallas grandes', 'Flexbox y flex-direction', 'Resetear estilos de lista'],
  runner: 'css',
  html: `<nav>
  <ul class="menu">
    <li><a href="#">Inicio</a></li>
    <li><a href="#">Álbumes</a></li>
    <li><a href="#">Perfil</a></li>
  </ul>
</nav>`,
  inicial: `body { margin: 0; font-family: sans-serif; }

.menu {
  /* Estilos para móvil */

}

/* Desde 600px */
`,
  checks: [
    { t: 'La lista no tiene puntos', f: (d, w) => w.getComputedStyle(d.querySelector('.menu')).listStyleType === 'none' },
    { t: 'En móvil (400px) los enlaces van en columna', f: (d, w, ctx) => { ctx.ancho(400); const li = d.querySelectorAll('.menu li'); return li[1].getBoundingClientRect().top > li[0].getBoundingClientRect().top + 2; } },
    { t: 'En pantalla grande (800px) van en fila', f: (d, w, ctx) => { ctx.ancho(800); const li = d.querySelectorAll('.menu li'); const ok = Math.abs(li[1].getBoundingClientRect().top - li[0].getBoundingClientRect().top) < 2; ctx.ancho(null); return ok; } },
    { t: 'Usas una media query con min-width', f: (d, w, ctx) => /@media[^{]*min-width/.test(ctx.cssTexto) }
  ],
  pasos: [
    { t: 'Quita los puntos y los márgenes de la lista.', pista: 'list-style: none; padding: 0; margin: 0;' },
    { t: 'Prepara Flexbox en columna para móvil.', pista: 'display: flex; flex-direction: column; gap: 8px;' },
    { t: 'Cambia a fila en pantallas grandes.', pista: '@media (min-width: 600px) { .menu { flex-direction: row; } }' }
  ],
  solucion: `body { margin: 0; font-family: sans-serif; }

/* 1. Móvil primero: estilos base */
.menu {
  list-style: none;       /* sin puntos */
  margin: 0;
  padding: 16px;
  display: flex;
  flex-direction: column; /* uno debajo de otro */
  gap: 8px;               /* espacio entre enlaces */
}

/* 2. Pantallas medianas y grandes */
@media (min-width: 600px) {
  .menu {
    flex-direction: row;  /* en fila */
    gap: 24px;
  }
}`,
  explicacion: [
    { c: 'Estilos base = móvil', p: 'Mobile first significa escribir primero para la pantalla pequeña. La mayoría del tráfico web es móvil y el CSS queda más simple.' },
    { c: '@media (min-width: 600px)', p: '"Si la pantalla mide 600px o más, aplica esto". Con min-width vas añadiendo cosas según crece la pantalla.' },
    { c: 'gap: 8px', p: 'Espacio entre elementos de un flex o grid. Más limpio que poner márgenes a cada uno.' },
    { c: 'list-style: none; padding: 0', p: 'Las listas traen puntos y sangría por defecto. Para un menú los quitamos.' }
  ],
  faq: [
    { q: '¿Por qué min-width y no max-width?', a: 'Con min-width (mobile first) empiezas por lo simple y añades. Con max-width (desktop first) empiezas por lo complejo y quitas. Las dos funcionan, pero hoy se prefiere mobile first.' },
    { q: '¿Qué números uso en las media queries?', a: 'No hay números mágicos. Pon el corte donde tu diseño "se rompe". 600px, 768px y 1024px son habituales.' }
  ]
},

/* ---------- CSS 3: grid de portadas ---------- */
{
  id: 'css-3', ruta: 'css', nivel: 2, tipo: 'casa', minutos: 20,
  titulo: 'Rejilla de portadas con Grid',
  contexto: 'Galerías de productos, de portadas, de fotos… se hacen con CSS Grid.',
  enunciado: `Coloca las portadas en una rejilla:
<ul>
<li>En móvil: <b>2 columnas</b>.</li>
<li>Desde 900px: <b>4 columnas</b>.</li>
<li>Con separación (<code>gap</code>) entre portadas.</li>
<li>Las imágenes no deben salirse de su celda.</li>
</ul>`,
  evalua: ['CSS Grid y grid-template-columns', 'La unidad fr', 'Imágenes fluidas (max-width: 100%)'],
  runner: 'css',
  html: `<section class="portadas">
  <img src="https://picsum.photos/id/10/300" alt="Portada 1">
  <img src="https://picsum.photos/id/20/300" alt="Portada 2">
  <img src="https://picsum.photos/id/30/300" alt="Portada 3">
  <img src="https://picsum.photos/id/40/300" alt="Portada 4">
  <img src="https://picsum.photos/id/50/300" alt="Portada 5">
  <img src="https://picsum.photos/id/60/300" alt="Portada 6">
</section>`,
  inicial: `body { margin: 0; padding: 16px; font-family: sans-serif; }

.portadas {
  /* Escribe aquí */

}

.portadas img {

}`,
  checks: [
    { t: '.portadas usa display: grid', f: (d, w) => w.getComputedStyle(d.querySelector('.portadas')).display === 'grid' },
    { t: 'En móvil (400px) hay 2 columnas', f: (d, w, ctx) => { ctx.ancho(400); return w.getComputedStyle(d.querySelector('.portadas')).gridTemplateColumns.split(' ').length === 2; } },
    { t: 'En 1000px hay 4 columnas', f: (d, w, ctx) => { ctx.ancho(1000); const n = w.getComputedStyle(d.querySelector('.portadas')).gridTemplateColumns.split(' ').length; ctx.ancho(null); return n === 4; } },
    { t: 'Hay separación (gap)', f: (d, w) => parseFloat(w.getComputedStyle(d.querySelector('.portadas')).columnGap) > 0 },
    { t: 'Las imágenes no se salen de su celda', f: (d, w) => { const img = d.querySelector('.portadas img'); const s = w.getComputedStyle(img); return s.maxWidth === '100%' || s.width === '100%' || img.getBoundingClientRect().width < 300; } }
  ],
  pasos: [
    { t: 'Activa Grid.', pista: 'display: grid; en .portadas.' },
    { t: 'Define 2 columnas iguales.', pista: 'grid-template-columns: repeat(2, 1fr); → "2 columnas, cada una 1 parte del espacio".' },
    { t: 'Haz las imágenes fluidas.', pista: 'width: 100%; display: block; en las img. Así se adaptan a su celda.' },
    { t: 'Media query para 4 columnas.', pista: '@media (min-width: 900px) { .portadas { grid-template-columns: repeat(4, 1fr); } }' }
  ],
  solucion: `body { margin: 0; padding: 16px; font-family: sans-serif; }

.portadas {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 columnas iguales */
  gap: 12px;                              /* separación */
}

.portadas img {
  width: 100%;         /* ocupa su celda, nunca más */
  display: block;      /* quita el hueco que dejan las img debajo */
  border-radius: 8px;
  aspect-ratio: 1;     /* siempre cuadradas */
  object-fit: cover;   /* recorta sin deformar */
}

@media (min-width: 900px) {
  .portadas {
    grid-template-columns: repeat(4, 1fr); /* 4 columnas */
  }
}`,
  explicacion: [
    { c: 'repeat(2, 1fr)', p: '"fr" significa "una parte del espacio libre". 2 columnas de 1fr = dos partes iguales. Sin hacer cálculos.' },
    { c: 'width: 100%; display: block', p: 'La imagen se adapta al ancho de su celda. display:block quita un pequeño hueco que las imágenes dejan por defecto debajo.' },
    { c: 'aspect-ratio + object-fit: cover', p: 'Detalle pro: todas las portadas quedan cuadradas aunque las fotos tengan tamaños distintos, y se recortan sin deformarse.' },
    { c: 'Truco extra', p: 'grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)) hace la rejilla responsive SIN media queries. Comentarlo en una entrevista queda muy bien.' }
  ],
  faq: [
    { q: '¿Cuándo uso Grid y cuándo Flexbox?', a: 'Flexbox para una dimensión (una fila o una columna: un menú, una barra). Grid para dos dimensiones (filas y columnas a la vez: una galería, un layout de página).' },
    { q: '¿Qué hace auto-fill con minmax?', a: 'Mete tantas columnas como quepan, cada una de mínimo 150px. Si la pantalla crece, caben más columnas solas.' }
  ]
},

/* ---------- CSS 4: botón con estados ---------- */
{
  id: 'css-4', ruta: 'css', nivel: 2, tipo: 'casa', minutos: 15,
  titulo: 'Botón con todos sus estados',
  contexto: 'Los revisores miran los "estados": hover, foco con teclado y desactivado. Muchos juniors los olvidan.',
  enunciado: `Dale estilo a <code>.boton</code> con estos estados:
<ul>
<li>Normal (fondo de color, sin borde, esquinas redondeadas).</li>
<li><code>:hover</code> (al pasar el ratón).</li>
<li><code>:focus-visible</code> (al llegar con el teclado, un contorno visible).</li>
<li><code>:disabled</code> (apagado y con cursor de prohibido).</li>
</ul>`,
  evalua: ['Pensar en todos los estados de un componente', 'Accesibilidad del foco', 'Atención al detalle'],
  runner: 'css',
  html: `<button class="boton">Reproducir</button>
<button class="boton" disabled>No disponible</button>`,
  inicial: `body { padding: 24px; font-family: sans-serif; display: flex; gap: 12px; }

.boton {

}
`,
  checks: [
    { t: 'El botón tiene esquinas redondeadas', f: (d, w) => parseFloat(w.getComputedStyle(d.querySelector('.boton')).borderTopLeftRadius) > 0 },
    { t: 'Hay estilo para :hover', f: (d, w, ctx) => /\.boton:hover/.test(ctx.cssTexto) },
    { t: 'Hay estilo para :focus-visible', f: (d, w, ctx) => /:focus-visible/.test(ctx.cssTexto) },
    { t: 'Hay estilo para :disabled', f: (d, w, ctx) => /:disabled|\[disabled\]/.test(ctx.cssTexto) },
    { t: 'El desactivado muestra cursor not-allowed', f: (d, w) => w.getComputedStyle(d.querySelectorAll('.boton')[1]).cursor === 'not-allowed' }
  ],
  pasos: [
    { t: 'Estilo base.', pista: 'background, color, border: none, padding: 12px 20px, border-radius: 999px, cursor: pointer.' },
    { t: 'Hover.', pista: '.boton:hover { background: un color un poco más oscuro; }' },
    { t: 'Foco visible.', pista: '.boton:focus-visible { outline: 3px solid …; outline-offset: 2px; } — nunca quites el outline sin poner otro.' },
    { t: 'Desactivado.', pista: '.boton:disabled { opacity: .5; cursor: not-allowed; }' }
  ],
  solucion: `body { padding: 24px; font-family: sans-serif; display: flex; gap: 12px; }

/* Estado normal */
.boton {
  background: #6c4cf1;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 999px;
  font-size: 1rem;
  cursor: pointer;
  transition: background .2s; /* cambio suave */
}

/* Ratón encima (solo si no está desactivado) */
.boton:hover:not(:disabled) {
  background: #5236d9;
}

/* Llegas con el teclado (Tab) */
.boton:focus-visible {
  outline: 3px solid #f59f00;
  outline-offset: 2px;
}

/* Desactivado */
.boton:disabled {
  opacity: .5;
  cursor: not-allowed;
}`,
  explicacion: [
    { c: ':focus-visible', p: 'Solo aparece cuando llegas con teclado, no al hacer clic con el ratón. Así no molesta visualmente y es accesible.' },
    { c: ':hover:not(:disabled)', p: 'Evita que el botón apagado cambie de color al pasar el ratón, lo que daría la sensación de que funciona.' },
    { c: 'transition: background .2s', p: 'El cambio de color es suave. Pequeño detalle que hace que la interfaz se sienta cuidada.' },
    { c: 'border-radius: 999px', p: 'Un número muy grande hace los lados totalmente redondos (forma de píldora), mida lo que mida el botón.' }
  ],
  faq: [
    { q: '¿Puedo poner outline: none para quitar el borde feo?', a: 'Solo si pones otro indicador de foco. Si lo quitas sin más, quien usa teclado no sabe dónde está. Es uno de los fallos de accesibilidad más comunes.' },
    { q: '¿Qué diferencia hay entre :focus y :focus-visible?', a: ':focus se activa siempre (también con clic). :focus-visible solo cuando el navegador cree que hace falta verlo, normalmente con teclado.' }
  ]
},

/* ---------- CSS 5: variables y modo oscuro ---------- */
{
  id: 'css-5', ruta: 'css', nivel: 3, tipo: 'casa', minutos: 20,
  titulo: 'Variables CSS y modo oscuro',
  contexto: 'Los sistemas de diseño (como los de Spotify o Apple) se basan en variables (design tokens).',
  enunciado: `<ul>
<li>Define en <code>:root</code> las variables <code>--color-fondo</code> y <code>--color-texto</code>.</li>
<li>Úsalas con <code>var()</code> en el <code>body</code>.</li>
<li>Con <code>@media (prefers-color-scheme: dark)</code>, cambia el valor de las variables para el modo oscuro.</li>
</ul>`,
  evalua: ['Variables CSS (custom properties)', 'Pensar en temas', 'No repetir colores por todo el CSS'],
  runner: 'css',
  html: `<main>
  <h1>Tu resumen del año</h1>
  <p>Has escuchado 12.345 minutos de música.</p>
</main>`,
  inicial: `:root {
  /* Define aquí tus variables */

}

body {
  font-family: sans-serif;
  padding: 24px;
  /* Usa las variables */

}

/* Modo oscuro */
`,
  checks: [
    { t: 'Existe --color-fondo en :root', f: (d, w) => w.getComputedStyle(d.documentElement).getPropertyValue('--color-fondo').trim() !== '' },
    { t: 'Existe --color-texto en :root', f: (d, w) => w.getComputedStyle(d.documentElement).getPropertyValue('--color-texto').trim() !== '' },
    { t: 'El body usa var(--color-fondo) y var(--color-texto)', f: (d, w, ctx) => /var\(\s*--color-fondo/.test(ctx.cssTexto) && /var\(\s*--color-texto/.test(ctx.cssTexto) },
    { t: 'Hay una media query prefers-color-scheme: dark', f: (d, w, ctx) => /prefers-color-scheme\s*:\s*dark/.test(ctx.cssTexto) }
  ],
  pasos: [
    { t: 'Crea las variables.', pista: ':root { --color-fondo: #ffffff; --color-texto: #1a1a1a; } — las variables empiezan siempre por dos guiones.' },
    { t: 'Úsalas.', pista: 'background: var(--color-fondo); color: var(--color-texto);' },
    { t: 'Modo oscuro.', pista: '@media (prefers-color-scheme: dark) { :root { --color-fondo: #121212; --color-texto: #f1f1f1; } } — solo cambias las variables, no el body.' }
  ],
  solucion: `/* 1. Variables (tokens de diseño) */
:root {
  --color-fondo: #ffffff;
  --color-texto: #1a1a1a;
  --color-acento: #1db954;
}

/* 2. Usamos las variables, nunca colores sueltos */
body {
  font-family: sans-serif;
  padding: 24px;
  background: var(--color-fondo);
  color: var(--color-texto);
}

h1 { color: var(--color-acento); }

/* 3. Modo oscuro: solo cambiamos los valores */
@media (prefers-color-scheme: dark) {
  :root {
    --color-fondo: #121212;
    --color-texto: #f1f1f1;
  }
}`,
  explicacion: [
    { c: ':root { --color-fondo: … }', p: ':root es el elemento raíz (html). Lo que defines ahí está disponible en toda la página.' },
    { c: 'var(--color-fondo)', p: 'Lee el valor de la variable. Si mañana cambias el color de marca, lo cambias en un solo sitio.' },
    { c: 'prefers-color-scheme: dark', p: 'Detecta si el móvil o el ordenador está en modo oscuro. Fíjate en que solo cambiamos las variables: todo lo demás se actualiza solo.' }
  ],
  faq: [
    { q: '¿Qué diferencia hay con las variables de Sass ($color)?', a: 'Las de Sass desaparecen al compilar; son fijas. Las de CSS viven en el navegador y se pueden cambiar en tiempo real (modo oscuro, temas, incluso con JavaScript).' },
    { q: '¿Y si quiero un botón para cambiar de tema?', a: 'Con JavaScript añades una clase al html (por ejemplo .oscuro) y en CSS escribes .oscuro { --color-fondo: … }. Esta misma app lo hace así.' }
  ]
},

/* ---------- CSS 6: especificidad ---------- */
{
  id: 'css-6', ruta: 'css', nivel: 3, tipo: 'live', minutos: 15,
  titulo: '¿Por qué no se pone rojo? (especificidad)',
  contexto: 'Depurar CSS que "no hace caso" es diario en el trabajo. Y la IA suele "arreglarlo" con !important.',
  enunciado: `El aviso debería verse en <b>rojo</b> (<code>#c92a2a</code>) pero sale gris. Arréglalo <b>sin usar !important</b> y sin tocar el HTML.`,
  evalua: ['Entender la especificidad (qué regla gana)', 'Arreglar la causa, no tapar el síntoma', 'Explicar el porqué'],
  runner: 'css',
  html: `<div id="panel">
  <p class="texto aviso">Tu suscripción caduca mañana</p>
</div>`,
  inicial: `body { font-family: sans-serif; padding: 24px; }

#panel p {
  color: gray;
}

.aviso {
  color: #c92a2a;
  font-weight: bold;
}`,
  checks: [
    { t: 'El aviso se ve rojo', f: (d, w) => w.getComputedStyle(d.querySelector('.aviso')).color === 'rgb(201, 42, 42)' },
    { t: 'No usas !important', f: (d, w, ctx) => !/!important/.test(ctx.cssTexto) }
  ],
  pasos: [
    { t: 'Cuenta quién "pesa" más.', pista: 'Un id (#panel) pesa muchísimo más que una clase (.aviso). Por eso #panel p gana aunque .aviso vaya después.' },
    { t: 'Haz que la regla del aviso pese más, o que la otra pese menos.', pista: 'Opción A: #panel .aviso { … }. Opción B (mejor): no usar ids para dar estilo; cambia #panel p por .texto.' }
  ],
  solucion: `body { font-family: sans-serif; padding: 24px; }

/* Antes: #panel p  → id + etiqueta: pesa mucho.
   Ahora usamos una clase, que pesa poco y es fácil de sobrescribir */
.texto {
  color: gray;
}

/* Misma "fuerza" que .texto (una clase) y va después → gana */
.aviso {
  color: #c92a2a;
  font-weight: bold;
}`,
  explicacion: [
    { c: 'Especificidad', p: 'Cuando dos reglas chocan, gana la más "específica". Piensa en un marcador: ids > clases > etiquetas. Solo si empatan, gana la que va después.' },
    { c: '#panel p vs .aviso', p: '#panel p tiene un id: gana a cualquier regla solo con clases, aunque esté antes.' },
    { c: 'Por qué no !important', p: '!important gana a todo y luego, para cambiarlo, necesitas otro !important. El CSS se vuelve una guerra. Arreglar la causa es lo profesional.' },
    { c: 'Buena práctica', p: 'Usa clases para dar estilo y deja los ids para JavaScript o enlaces. Así la especificidad está siempre baja y controlada.' }
  ],
  faq: [
    { q: '¿Cómo veo qué regla está ganando?', a: 'En el navegador: clic derecho → Inspeccionar → pestaña Estilos. Las reglas que pierden salen tachadas.' },
    { q: '¿Siempre gana la regla que va más abajo?', a: 'Solo si tienen la misma especificidad. Si no, gana la más específica esté donde esté.' }
  ]
}

);
