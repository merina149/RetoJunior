/* =========================================================
   EJERCICIOS DE GIT Y GOOD FIRST ISSUES
   runner 'comandos': te describe una situación y escribes el comando.
     Cada pregunta: q = situación, ok = formas válidas (expresiones regulares),
     sol = comando recomendado, por = por qué.
   runner 'manual': tarea fuera de la app con una lista de criterios.
   ========================================================= */
window.EJERCICIOS = window.EJERCICIOS || [];

window.EJERCICIOS.push(

/* ---------- GIT 1 ---------- */
{
  id: 'git-1', ruta: 'git', nivel: 1, tipo: 'teoria', minutos: 10,
  titulo: 'El flujo básico: add, commit, status',
  contexto: 'Te pedirán entregar la prueba en un repositorio. Un historial de commits limpio dice mucho de ti.',
  enunciado: 'Escribe el comando de Git para cada situación.',
  evalua: ['Conocer el ciclo básico', 'Mensajes de commit claros'],
  runner: 'comandos',
  preguntas: [
    { q: 'Empiezas un proyecto nuevo en una carpeta y quieres que Git lo controle.', ok: ['^git init$'], sol: 'git init', por: 'Crea un repositorio vacío (la carpeta oculta .git) donde se guardará el historial.' },
    { q: 'Quieres ver qué archivos has cambiado.', ok: ['^git status$'], sol: 'git status', por: 'Tu comando más usado. Te dice qué está modificado, qué está preparado y en qué rama estás.' },
    { q: 'Quieres preparar TODOS los cambios para el próximo commit.', ok: ['^git add \\.$', '^git add -a$', '^git add --all$'], sol: 'git add .', por: 'add mete los cambios en el "área de preparación" (staging). El punto significa "todo lo de esta carpeta".' },
    { q: 'Guarda los cambios preparados con el mensaje "Añade formulario de registro".', ok: ['^git commit -m ["\'].+["\']$'], sol: 'git commit -m "Añade formulario de registro"', por: 'Un commit es una "foto" del proyecto. El mensaje explica QUÉ cambia, en presente e imperativo: "Añade", "Corrige"…' },
    { q: 'Quieres ver el historial de commits, resumido en una línea cada uno.', ok: ['^git log --oneline$'], sol: 'git log --oneline', por: 'Muestra cada commit con su código corto y su mensaje.' }
  ],
  pasos: [
    { t: 'Recuerda el ciclo.', pista: 'Modificas archivos → git add (preparas) → git commit (guardas la foto). git status te dice en qué punto estás.' }
  ],
  explicacion: [
    { c: 'Las 3 zonas', p: 'Carpeta de trabajo (lo que editas) → staging (lo que has preparado con add) → repositorio (lo guardado con commit).' },
    { c: 'Mensajes de commit', p: 'Pequeños y frecuentes, cada uno con un propósito. En una prueba para casa, un único commit "todo" da mala impresión.' }
  ],
  faq: [
    { q: '¿Por qué existe el paso de add? ¿No es más fácil hacer commit directamente?', a: 'add te deja elegir qué entra en cada commit. Si cambiaste dos cosas distintas, puedes hacer dos commits separados y ordenados.' },
    { q: '¿Qué es un buen mensaje de commit?', a: 'Corto (menos de 50 caracteres), en imperativo y que diga qué hace: "Corrige el cálculo de la duración". Mal ejemplo: "cambios" o "asdf".' }
  ]
},

/* ---------- GIT 2 ---------- */
{
  id: 'git-2', ruta: 'git', nivel: 2, tipo: 'teoria', minutos: 10,
  titulo: 'Ramas: trabajar sin romper main',
  contexto: 'En cualquier empresa trabajarás en ramas y harás Pull Requests.',
  enunciado: 'Escribe el comando de Git para cada situación.',
  evalua: ['Crear y cambiar de rama', 'Fusionar ramas'],
  runner: 'comandos',
  preguntas: [
    { q: 'Crea una rama llamada "modo-oscuro" y cámbiate a ella en un solo comando.', ok: ['^git switch -c modo-oscuro$', '^git checkout -b modo-oscuro$'], sol: 'git switch -c modo-oscuro', por: 'switch -c crea (create) y cambia. checkout -b es la forma antigua y también vale.' },
    { q: 'Vuelve a la rama main.', ok: ['^git switch main$', '^git checkout main$'], sol: 'git switch main', por: 'switch cambia de rama. Tus cambios guardados en la otra rama siguen allí.' },
    { q: 'Estando en main, trae los cambios de la rama "modo-oscuro".', ok: ['^git merge modo-oscuro$'], sol: 'git merge modo-oscuro', por: 'merge fusiona la rama indicada dentro de la rama en la que estás.' },
    { q: 'Quieres ver todas las ramas que tienes.', ok: ['^git branch$', '^git branch -a$'], sol: 'git branch', por: 'Lista las ramas y marca con * la actual.' }
  ],
  pasos: [
    { t: 'Piensa en las ramas como copias paralelas.', pista: 'Una rama es una línea de trabajo separada. main es la versión "buena"; las nuevas funciones se hacen en otra rama y luego se fusionan.' }
  ],
  explicacion: [
    { c: 'Por qué ramas', p: 'Así puedes probar cosas sin romper la versión que funciona. Si sale mal, borras la rama y listo.' },
    { c: 'Conflictos', p: 'Si dos ramas cambian la misma línea, Git no sabe cuál elegir y te pide decidir (conflicto). Se resuelve editando el archivo, add y commit.' }
  ],
  faq: [
    { q: '¿Qué es un conflicto y cómo lo resuelvo?', a: 'Git marca el archivo con <<<<<<< y >>>>>>> mostrando las dos versiones. Eliges qué queda, borras las marcas, y haces git add + git commit.' },
    { q: '¿merge o rebase?', a: 'merge conserva el historial tal cual (con un commit de fusión). rebase lo reescribe para que quede lineal. Como junior, basta con saber que existen y que rebase no se hace en ramas compartidas.' }
  ]
},

/* ---------- GIT 3 ---------- */
{
  id: 'git-3', ruta: 'git', nivel: 2, tipo: 'teoria', minutos: 10,
  titulo: 'GitHub: clonar, subir y Pull Requests',
  contexto: 'Entregar la prueba técnica = subirla a GitHub. Y contribuir a open source = Pull Request.',
  enunciado: 'Escribe el comando de Git para cada situación.',
  evalua: ['Trabajar con repositorios remotos', 'Entender el flujo de un Pull Request'],
  runner: 'comandos',
  preguntas: [
    { q: 'Descarga a tu ordenador el repositorio https://github.com/ana/app.git', ok: ['^git clone https://github\\.com/ana/app\\.git$'], sol: 'git clone https://github.com/ana/app.git', por: 'clone descarga el repositorio completo con todo su historial.' },
    { q: 'Sube por primera vez tu rama "modo-oscuro" a GitHub (origin) y déjala conectada.', ok: ['^git push -u origin modo-oscuro$', '^git push --set-upstream origin modo-oscuro$'], sol: 'git push -u origin modo-oscuro', por: '-u conecta tu rama local con la remota. Las siguientes veces basta con git push.' },
    { q: 'Trae los cambios que otras personas han subido a la rama en la que estás.', ok: ['^git pull$', '^git pull origin \\S+$'], sol: 'git pull', por: 'pull = descargar (fetch) + fusionar (merge) los cambios remotos.' },
    { q: 'Mira a qué repositorios remotos está conectado tu proyecto.', ok: ['^git remote -v$'], sol: 'git remote -v', por: 'Muestra las URLs de origin (tu repo) y, si contribuyes a open source, upstream (el original).' }
  ],
  pasos: [
    { t: 'Local vs remoto.', pista: 'Tu ordenador es "local". GitHub es el "remoto", y por convención se llama origin.' }
  ],
  explicacion: [
    { c: 'Pull Request (PR)', p: 'No es un comando de Git: es una función de GitHub. Subes tu rama y pides que la revisen antes de fusionarla en main.' },
    { c: 'Fork', p: 'Para contribuir a un proyecto ajeno, primero haces un fork (tu copia en GitHub), clonas tu fork, creas rama, subes y abres el PR hacia el original.' }
  ],
  faq: [
    { q: '¿Qué diferencia hay entre fetch y pull?', a: 'fetch solo descarga la información de los cambios, sin tocar tus archivos. pull descarga y además fusiona.' }
  ]
},

/* ---------- GIT 4 ---------- */
{
  id: 'git-4', ruta: 'git', nivel: 3, tipo: 'teoria', minutos: 10,
  titulo: 'Deshacer cosas sin pánico',
  contexto: '"¿Qué harías si subes algo mal?" Saber deshacer con calma es muy valorado.',
  enunciado: 'Escribe el comando de Git para cada situación.',
  evalua: ['Deshacer de forma segura', 'Saber qué es peligroso'],
  runner: 'comandos',
  preguntas: [
    { q: 'Has estropeado el archivo index.html y quieres volver a como estaba en el último commit.', ok: ['^git restore index\\.html$', '^git checkout -- index\\.html$'], sol: 'git restore index.html', por: 'Descarta los cambios no guardados de ese archivo. Cuidado: esos cambios se pierden.' },
    { q: 'Hiciste add de estilos.css por error. Quítalo del staging sin perder los cambios.', ok: ['^git restore --staged estilos\\.css$', '^git reset estilos\\.css$', '^git reset head estilos\\.css$'], sol: 'git restore --staged estilos.css', por: 'Lo saca de "preparado" pero tus cambios siguen en el archivo.' },
    { q: 'Tu último commit aún no lo has subido y quieres deshacerlo, pero conservando los cambios.', ok: ['^git reset --soft head~1?$', '^git reset --soft head\\^$'], sol: 'git reset --soft HEAD~1', por: 'Mueve la rama un commit atrás y deja los cambios preparados. Solo para commits que NO has subido.' },
    { q: 'Un commit que YA está subido (código a1b2c3) rompió algo. Deshazlo de forma segura.', ok: ['^git revert a1b2c3$'], sol: 'git revert a1b2c3', por: 'revert crea un commit nuevo que hace lo contrario. No reescribe el historial, así que no molesta a tu equipo.' }
  ],
  pasos: [
    { t: 'La regla de oro.', pista: '¿Ya lo subiste (push)? Entonces revert. ¿Aún no? Entonces puedes usar reset.' }
  ],
  explicacion: [
    { c: 'restore', p: 'Para archivos: descartar cambios o sacarlos del staging.' },
    { c: 'reset --soft vs --hard', p: '--soft deshace el commit y guarda los cambios. --hard lo borra todo: úsalo solo si estás segura.' },
    { c: 'revert', p: 'La forma segura en equipo: no borra historia, añade un "antídoto".' }
  ],
  faq: [
    { q: 'Subí una contraseña a GitHub por error, ¿basta con borrarla en otro commit?', a: 'No: sigue en el historial. Lo primero es CAMBIAR la contraseña o clave (darla por perdida). Luego se limpia el historial con herramientas específicas.' }
  ]
},

/* ---------- GIT 5: Good First Issue real ---------- */
{
  id: 'git-5', ruta: 'git', nivel: 3, tipo: 'casa', minutos: 120,
  titulo: 'Tu primera Good First Issue de verdad',
  contexto: 'Contribuir a un proyecto open source real es lo que más destaca en un CV junior. Y te prepara para trabajar en equipo.',
  enunciado: `Esta tarea se hace fuera de la app:
<ol>
<li>Practica el flujo completo en <a href="https://github.com/firstcontributions/first-contributions" target="_blank" rel="noopener">first-contributions</a> (repositorio hecho para aprender a hacer tu primer PR).</li>
<li>Busca una issue con la etiqueta <b>good first issue</b> en
<a href="https://goodfirstissue.dev" target="_blank" rel="noopener">goodfirstissue.dev</a>,
<a href="https://github.com/topics/good-first-issue" target="_blank" rel="noopener">GitHub Topics</a> o
<a href="https://up-for-grabs.net" target="_blank" rel="noopener">up-for-grabs.net</a>.
Filtra por JavaScript, HTML o CSS.</li>
<li>Lee el archivo CONTRIBUTING.md del proyecto y comenta en la issue que te gustaría trabajar en ella.</li>
<li>Haz fork, rama, cambios y abre tu Pull Request.</li>
</ol>
Guarda el enlace a tu PR en "Mi solución" (abajo) para tenerlo a mano en entrevistas.`,
  evalua: ['Leer código y normas de otras personas', 'Comunicarte por escrito en inglés', 'Flujo real de trabajo: fork, rama, PR, revisión'],
  runner: 'manual',
  criterios: [
    'He hecho un PR en first-contributions',
    'He encontrado una good first issue que entiendo',
    'He leído el CONTRIBUTING.md del proyecto',
    'He pedido la issue con un comentario educado',
    'He abierto mi Pull Request explicando qué cambié y por qué',
    'He respondido a los comentarios de la revisión'
  ],
  pasos: [
    { t: 'Elige bien.', pista: 'Busca issues de documentación, textos, accesibilidad o CSS: son ideales para empezar. Evita las que llevan meses abiertas con mucha discusión.' },
    { t: 'Comenta antes de ponerte.', pista: 'Ejemplo: "Hi! I\'d like to work on this issue. Could you assign it to me?" Tu inglés C1 te viene genial aquí.' },
    { t: 'PR pequeño y claro.', pista: 'En la descripción del PR: qué cambiaste, por qué, cómo lo probaste y "Closes #número" para enlazar la issue.' }
  ],
  explicacion: [
    { c: 'Por qué esto te hace destacar', p: 'Demuestra que sabes leer código ajeno, seguir normas, comunicarte y aceptar revisiones. Es justo lo que la IA no hace por ti en un equipo.' },
    { c: 'Ejemplo de descripción de PR', p: '"This PR fixes the missing alt text on the homepage images (#123). I added descriptive alt attributes and checked with Lighthouse. Closes #123."' }
  ],
  faq: [
    { q: '¿Y si me revisan y piden cambios?', a: 'Es lo normal y es buena señal: significa que les interesa. Haz los cambios en la misma rama, haz push, y el PR se actualiza solo.' },
    { q: '¿Y si nadie me responde?', a: 'Espera una semana y comenta con educación. Si sigue sin respuesta, busca otro proyecto más activo (mira la fecha de los últimos commits).' }
  ]
}

);
