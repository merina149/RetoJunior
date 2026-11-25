# 🎧 Reto Junior

App para preparar entrevistas de **desarrollo web junior**, con ejercicios reales y un tutor que te guía paso a paso. Funciona en el móvil, se puede instalar como app y guarda tu progreso.

## Qué tiene

- **62 retos** en 11 rutas: HTML, CSS, JavaScript, Git (incluye una Good First Issue de verdad), Criterio (depurar, revisar código de IA, seguridad), SQL, TypeScript, React, Node.js/APIs, Java + Spring Boot y Python.
- **3 tipos de reto**, como en las entrevistas: ⏱️ en directo (live coding), 🏠 para casa (take-home) y 💬 preguntas.
- **Comprobación automática** de HTML, CSS, JavaScript y SQL (el SQL se ejecuta de verdad en el navegador con SQLite).
- **Tutor**: pasos, pistas, explicación de la solución trozo a trozo, preguntas frecuentes y chat.
  - Sin configurar nada: responde con sus apuntes y te deja copiar la pregunta (con tu código) para Claude.
  - Con una clave de API de Claude (en Ajustes): responde a cualquier pregunta dentro de la app.
- **Reto rápido**: 52 tarjetas de preguntas de entrevista con repetición espaciada.
- **Modo entrevista**: reto al azar con cronómetro y sin tutor.
- **Progreso guardado**: estado de cada reto, tu código, notas, enlace a tu solución y racha de días. Puedes exportarlo e importarlo entre dispositivos.




Instalada funciona sin conexión. En iPhone es importante instalarla: Safari puede borrar los datos de las webs que no visitas durante varios días.

## Estructura del proyecto

```
index.html          Página principal (cabecera, contenido y barra inferior)
css/app.css         Estilos (variables, modo oscuro, componentes)
js/storage.js       Guarda el progreso en localStorage
js/runner.js        Ejecuta y comprueba el código (Worker, iframe, SQLite)
js/tutor.js         El chat del tutor
js/app.js           Pantallas y navegación
data/*.js           Rutas, ejercicios y tarjetas de repaso
vendor/             sql.js (SQLite para el navegador)
sw.js               Modo sin conexión
manifest.json       Datos para instalarla como app
```

## Añadir tus propios ejercicios

Copia un ejercicio de `data/ej-*.js` y cambia los campos. El campo `runner` decide cómo se comprueba:

| runner     | Para qué                          | Campos clave                |
|------------|-----------------------------------|-----------------------------|
| `js`       | Funciones de JavaScript           | `tests: [{ e, r }]`         |
| `web`      | Documento HTML (con o sin script) | `checks: [{ t, f }]`        |
| `css`      | CSS sobre un HTML fijo            | `html`, `checks`            |
| `sql`      | Consultas SQL                     | `setup`, `solucion`         |
| `quiz`     | Preguntas con opciones            | `preguntas: [{ q, o, ok, por }]` |
| `comandos` | Comandos de terminal (Git)        | `preguntas: [{ q, ok, sol, por }]` |
| `manual`   | Lenguajes que no se ejecutan aquí | `criterios`, `solucion`     |

⚠️ Si cambias archivos después de publicarla, sube el número de `VERSION` en `sw.js` para que los móviles descarguen la versión nueva.

## Privacidad

Tu progreso y tu clave de API se quedan en tu dispositivo. La clave nunca se escribe en el código ni se incluye al exportar el progreso.
