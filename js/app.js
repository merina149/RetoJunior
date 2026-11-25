/* =========================================================
   APP: pantallas y navegación
   Rutas (la parte de después de # en la URL):
     #/               Inicio
     #/ruta/js        Lista de ejercicios de una ruta
     #/ej/js-1        Un ejercicio (pestañas Reto · Código · Tutor)
     #/repaso         Tarjetas de repaso
     #/entrevista     Modo entrevista
     #/ajustes        Ajustes y copia de seguridad
   ========================================================= */
(function () {
  const app = document.getElementById('app');
  const titulo = document.getElementById('titulo');
  const volver = document.getElementById('volver');
  const racha = document.getElementById('racha');

  const EJ = window.EJERCICIOS;
  const RUTAS = [...window.RUTAS].sort((a, b) => a.orden - b.orden);

  /* ---------- Utilidades ---------- */
  const esc = (t) => String(t ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ruta = (id) => RUTAS.find(r => r.id === id);
  const ejercicio = (id) => EJ.find(e => e.id === id);
  // Ejercicios de una ruta ordenados por nivel (y por orden original si empatan)
  const ejerciciosDe = (idRuta) => EJ.filter(e => e.ruta === idRuta).sort((a, b) => a.nivel - b.nivel || EJ.indexOf(a) - EJ.indexOf(b));
  const estadoDe = (id) => (Store.estado.ej[id] || {}).estado || 'pendiente';
  const hechos = (lista) => lista.filter(e => estadoDe(e.id) === 'hecho').length;

  function chipsEjercicio(e) {
    const tipo = window.TIPOS[e.tipo];
    return `<span class="chip">${tipo.icono} ${tipo.nombre}</span>
            <span class="chip">${'●'.repeat(e.nivel)}${'○'.repeat(3 - e.nivel)} ${window.NIVELES[e.nivel]}</span>
            <span class="chip">~${e.minutos} min</span>`;
  }

  function circuloEstado(id) {
    const est = estadoDe(id);
    return `<span class="estado-ej ${est}" aria-label="${est === 'hecho' ? 'Hecho' : est === 'progreso' ? 'En progreso' : 'Pendiente'}">${est === 'hecho' ? '✓' : est === 'progreso' ? '•' : ''}</span>`;
  }

  // El siguiente ejercicio recomendado: el primero sin hacer siguiendo el orden de las rutas
  function recomendado() {
    for (const r of RUTAS) {
      const e = ejerciciosDe(r.id).find(x => estadoDe(x.id) !== 'hecho');
      if (e) return e;
    }
    return null;
  }

  function cabecera(texto, destinoVolver) {
    titulo.textContent = texto;
    volver.hidden = !destinoVolver;
    volver.onclick = () => { location.hash = destinoVolver; };
    const n = Store.rachaActual();
    racha.textContent = '🔥 ' + n;
    racha.title = n === 1 ? '1 día seguido practicando' : n + ' días seguidos practicando';
  }

  function marcarNav(nombre) {
    document.querySelectorAll('.nav-inferior a').forEach(a => {
      if (a.dataset.nav === nombre) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  function confeti() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const caja = document.createElement('div');
    caja.className = 'confeti';
    const emojis = ['🎉', '✨', '🎵', '💜', '⭐', '🎧'];
    for (let i = 0; i < 24; i++) {
      const s = document.createElement('span');
      s.textContent = emojis[i % emojis.length];
      s.style.left = Math.random() * 100 + 'vw';
      s.style.animationDelay = Math.random() * .5 + 's';
      caja.appendChild(s);
    }
    document.body.appendChild(caja);
    setTimeout(() => caja.remove(), 2500);
  }

  /* =========================================================
     BIENVENIDA (solo la primera vez)
     ========================================================= */
  function verBienvenida() {
    cabecera('Reto Junior', null);
    marcarNav('');
    app.innerHTML = `
      <section class="tarjeta hero">
        <h1>Hola 👋 Bienvenida a Reto Junior</h1>
        <p class="suave">Ejercicios reales de entrevistas para programadores junior, con un tutor que te guía paso a paso.</p>
      </section>
      <section class="tarjeta">
        <h2>Cómo funciona</h2>
        <ol>
          <li><strong>Reto:</strong> lees qué te piden y qué mira el entrevistador.</li>
          <li><strong>Código:</strong> lo escribes y pulsas <em>Comprobar</em>.</li>
          <li><strong>Tutor:</strong> te da pistas, te explica la solución y responde tus dudas.</li>
        </ol>
        <p class="suave">Tu progreso se guarda en este dispositivo. Puedes pasarlo a otro desde Ajustes.</p>
        <label class="campo" for="nombre-inicio">¿Cómo te llamas? (opcional)</label>
        <input id="nombre-inicio" type="text" autocomplete="given-name" placeholder="Tu nombre">
        <div class="botones"><button class="btn btn-bloque" id="empezar">Empezar 🚀</button></div>
      </section>`;
    app.querySelector('#empezar').addEventListener('click', () => {
      Store.estado.nombre = app.querySelector('#nombre-inicio').value.trim();
      Store.estado.bienvenida = true;
      Store.guardar();
      location.hash = '#/';
      render();
    });
  }

  /* =========================================================
     INICIO
     ========================================================= */
  function verInicio() {
    cabecera('Reto Junior', null);
    marcarNav('inicio');
    const total = EJ.length, nHechos = hechos(EJ);
    const ultimo = ejercicio(Store.estado.ultimoEjercicio);
    const seguir = (ultimo && estadoDe(ultimo.id) !== 'hecho') ? ultimo : recomendado();
    const nombre = Store.estado.nombre;

    // Agrupamos las rutas por etapas
    const etapas = [
      { t: 'Base: empieza por aquí', ids: ['html', 'css', 'js', 'git', 'criterio'] },
      { t: 'Siguiente nivel', ids: ['sql', 'ts', 'react', 'node'] },
      { t: 'Extras', ids: ['java', 'python'] }
    ];

    app.innerHTML = `
      <section class="tarjeta hero">
        <h1>${nombre ? 'Hola, ' + esc(nombre) + ' 👋' : 'Hola 👋'}</h1>
        <p class="suave">${nHechos} de ${total} retos superados</p>
        <div class="barra" style="background:rgba(255,255,255,.3)"><div style="width:${(nHechos / total) * 100}%;background:#fff"></div></div>
        ${seguir ? `<div class="botones"><a class="btn" href="#/ej/${seguir.id}">${ultimo && seguir === ultimo ? 'Continuar' : 'Siguiente reto'}: ${esc(seguir.titulo)} →</a></div>` : '<p>🏆 ¡Lo has hecho todo! Repasa con las tarjetas o con el modo entrevista.</p>'}
      </section>

      <div class="grid-2">
        <a class="tarjeta tarjeta-enlace" href="#/repaso">
          <div style="font-size:1.6rem">⚡</div>
          <strong>Reto rápido</strong>
          <p class="suave pequeno">Preguntas de entrevista en tarjetas. 2 minutos.</p>
        </a>
        <a class="tarjeta tarjeta-enlace" href="#/entrevista">
          <div style="font-size:1.6rem">⏱️</div>
          <strong>Modo entrevista</strong>
          <p class="suave pequeno">Un reto al azar con tiempo, sin tutor.</p>
        </a>
      </div>

      ${etapas.map(et => `
        <h2 class="titulo-seccion">${et.t}</h2>
        ${et.ids.map(id => {
          const r = ruta(id), lista = ejerciciosDe(id), h = hechos(lista);
          return `<a class="tarjeta tarjeta-enlace" href="#/ruta/${r.id}">
            <div class="fila">
              <div class="icono-ruta" style="background:${r.color}22">${r.icono}</div>
              <div class="crece">
                <div class="fila-entre"><strong>${esc(r.nombre)}</strong><span class="suave pequeno">${h}/${lista.length}</span></div>
                <div class="barra"><div style="width:${(h / lista.length) * 100}%;background:${r.color}"></div></div>
              </div>
            </div>
          </a>`;
        }).join('')}
      `).join('')}

      <details class="tarjeta">
        <summary><strong>¿Por qué estas rutas y este orden?</strong></summary>
        <p style="margin-top:10px">Están elegidas según lo que más se pide a los perfiles junior de desarrollo web: JavaScript, HTML/CSS y SQL son de lo más usado; Node.js y React encabezan las tecnologías web; TypeScript no para de crecer.</p>
        <p>La ruta <strong>Criterio</strong> es la más importante frente a la IA: las empresas buscan juniors que sepan detectar errores, revisar código (también el generado por IA), pensar en seguridad y explicar sus decisiones.</p>
        <p>Java + Spring Boot está porque muchas empresas en España contratan juniors con ese perfil, y Python porque es lo que más crece.</p>
      </details>`;
  }

  /* =========================================================
     RUTA: lista de ejercicios
     ========================================================= */
  let filtroRuta = 'todos';
  function verRuta(id) {
    const r = ruta(id);
    if (!r) { location.hash = '#/'; return; }
    cabecera(r.icono + ' ' + r.corto, '#/');
    marcarNav('inicio');
    const lista = ejerciciosDe(id);

    const filtros = [
      ['todos', 'Todos'], ['pendiente', 'Sin hacer'], ['hecho', 'Hechos'],
      ['live', '⏱️ En directo'], ['casa', '🏠 Para casa'], ['teoria', '💬 Preguntas']
    ];

    function pintarLista() {
      const visibles = lista.filter(e => {
        if (filtroRuta === 'todos') return true;
        if (filtroRuta === 'pendiente') return estadoDe(e.id) !== 'hecho';
        if (filtroRuta === 'hecho') return estadoDe(e.id) === 'hecho';
        return e.tipo === filtroRuta;
      });
      app.querySelector('#lista-ej').innerHTML = visibles.length ? visibles.map(e => `
        <a class="tarjeta tarjeta-enlace" href="#/ej/${e.id}">
          <div class="fila">
            ${circuloEstado(e.id)}
            <div class="crece">
              <strong>${esc(e.titulo)}</strong>
              <div class="chips">${chipsEjercicio(e)}</div>
            </div>
          </div>
        </a>`).join('') : '<p class="suave">No hay ejercicios con este filtro.</p>';
    }

    app.innerHTML = `
      <section class="tarjeta">
        <h1>${esc(r.nombre)}</h1>
        <p><strong>📈 Por qué lo piden:</strong> ${esc(r.demanda)}</p>
        <p style="margin:0"><strong>🧠 Frente a la IA:</strong> ${esc(r.ia)}</p>
        <div class="barra"><div style="width:${(hechos(lista) / lista.length) * 100}%;background:${r.color}"></div></div>
      </section>
      <div class="filtros" role="group" aria-label="Filtrar ejercicios">
        ${filtros.map(([v, t]) => `<button type="button" data-f="${v}" aria-pressed="${filtroRuta === v}">${t}</button>`).join('')}
      </div>
      <div id="lista-ej"></div>`;

    app.querySelectorAll('.filtros button').forEach(b => b.addEventListener('click', () => {
      filtroRuta = b.dataset.f;
      app.querySelectorAll('.filtros button').forEach(x => x.setAttribute('aria-pressed', x === b));
      pintarLista();
    }));
    pintarLista();
  }

  /* =========================================================
     EJERCICIO
     ========================================================= */
  let entrevista = null; // { id, fin } si estás en modo entrevista

  function verEjercicio(id, pestanaInicial) {
    const ex = ejercicio(id);
    if (!ex) { location.hash = '#/'; return; }
    const r = ruta(ex.ruta);
    const prog = Store.ej(id);
    Store.estado.ultimoEjercicio = id;
    Store.guardar();

    const enEntrevista = entrevista && entrevista.id === id && Date.now() < entrevista.fin;
    cabecera(r.icono + ' ' + ex.titulo, '#/ruta/' + r.id);
    marcarNav('inicio');

    let ultimoResultado = null;
    let tutor = null;

    app.innerHTML = `
      ${enEntrevista ? '<div class="temporizador" id="reloj" role="timer"></div>' : ''}
      <div class="pestanas" role="tablist" aria-label="Partes del ejercicio">
        <button role="tab" id="tab-reto" aria-controls="panel-reto">📋 Reto</button>
        <button role="tab" id="tab-codigo" aria-controls="panel-codigo">💻 Código</button>
        <button role="tab" id="tab-tutor" aria-controls="panel-tutor">🧑‍🏫 Tutor</button>
      </div>
      <section role="tabpanel" id="panel-reto" aria-labelledby="tab-reto"></section>
      <section role="tabpanel" id="panel-codigo" aria-labelledby="tab-codigo" hidden></section>
      <section role="tabpanel" id="panel-tutor" aria-labelledby="tab-tutor" hidden></section>`;

    const paneles = { reto: app.querySelector('#panel-reto'), codigo: app.querySelector('#panel-codigo'), tutor: app.querySelector('#panel-tutor') };

    /* --- Pestañas --- */
    function abrir(nombre) {
      Object.entries(paneles).forEach(([n, p]) => {
        p.hidden = n !== nombre;
        app.querySelector('#tab-' + n).setAttribute('aria-selected', n === nombre);
      });
      if (nombre === 'tutor') montarTutor();
      window.scrollTo({ top: 0 });
    }
    Object.keys(paneles).forEach(n => app.querySelector('#tab-' + n).addEventListener('click', () => abrir(n)));

    /* --- Reloj del modo entrevista --- */
    if (enEntrevista) {
      const reloj = app.querySelector('#reloj');
      const tic = () => {
        const s = Math.max(0, Math.round((entrevista.fin - Date.now()) / 1000));
        reloj.textContent = s > 0 ? `⏱️ ${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')} · piensa en voz alta` : '⏰ ¡Tiempo! Ya puedes usar el tutor';
        if (s <= 0) { clearInterval(intervalo); entrevista = null; }
      };
      const intervalo = setInterval(() => { if (!document.body.contains(reloj)) clearInterval(intervalo); else tic(); }, 1000);
      tic();
    }

    /* ----------------- PANEL RETO ----------------- */
    const tipo = window.TIPOS[ex.tipo];
    paneles.reto.innerHTML = `
      <div class="chips">${chipsEjercicio(ex)}</div>
      <div class="aviso">💼 ${esc(ex.contexto)}</div>
      <article class="tarjeta enunciado">
        <h2>${esc(ex.titulo)}</h2>
        ${ex.enunciado}
      </article>
      <section class="tarjeta">
        <h3>Lo que mira el entrevistador</h3>
        <ul class="lista-evalua">${ex.evalua.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        <p class="suave pequeno" style="margin:8px 0 0">${tipo.icono} ${esc(tipo.desc)}</p>
      </section>
      <div class="botones"><button class="btn btn-bloque" id="ir-codigo">Ir al código →</button></div>

      <section class="tarjeta">
        <h3>Tu progreso</h3>
        <div class="estados" role="group" aria-label="Estado del ejercicio">
          <button type="button" data-e="pendiente">⚪ Pendiente</button>
          <button type="button" data-e="progreso">🟠 En progreso</button>
          <button type="button" data-e="hecho">✅ Hecho</button>
        </div>
        <label class="campo" for="notas">Mis notas</label>
        <textarea id="notas" class="notas" placeholder="Qué he aprendido, qué me costó…">${esc(prog.notas)}</textarea>
        <label class="campo" for="enlace">Mi solución (enlace a GitHub, CodePen…)</label>
        <input id="enlace" type="url" inputmode="url" placeholder="https://github.com/…" value="${esc(prog.enlace)}">
        ${prog.enlace ? `<p class="pequeno" style="margin-top:6px"><a href="${esc(prog.enlace)}" target="_blank" rel="noopener">Abrir mi solución ↗</a></p>` : ''}
      </section>`;

    paneles.reto.querySelector('#ir-codigo').addEventListener('click', () => abrir('codigo'));
    function pintarEstados() {
      paneles.reto.querySelectorAll('.estados button').forEach(b => b.setAttribute('aria-pressed', Store.ej(id).estado === b.dataset.e));
    }
    paneles.reto.querySelectorAll('.estados button').forEach(b => b.addEventListener('click', () => {
      Store.actualizarEj(id, { estado: b.dataset.e });
      if (b.dataset.e === 'hecho') { Store.registrarActividad(); confeti(); cabecera(r.icono + ' ' + ex.titulo, '#/ruta/' + r.id); }
      pintarEstados();
    }));
    pintarEstados();
    paneles.reto.querySelector('#notas').addEventListener('input', e => Store.actualizarEj(id, { notas: e.target.value }));
    paneles.reto.querySelector('#enlace').addEventListener('change', e => Store.actualizarEj(id, { enlace: e.target.value.trim() }));

    // Al escribir por primera vez, pasa a "en progreso"
    function empezado() {
      if (Store.ej(id).estado === 'pendiente') { Store.actualizarEj(id, { estado: 'progreso' }); pintarEstados(); }
    }

    // Cuando se supera el ejercicio
    function superado() {
      const yaEstaba = Store.ej(id).estado === 'hecho';
      Store.actualizarEj(id, { estado: 'hecho' });
      Store.registrarActividad();
      pintarEstados();
      cabecera(r.icono + ' ' + ex.titulo, '#/ruta/' + r.id);
      if (!yaEstaba) confeti();
    }

    // Siguiente ejercicio de la misma ruta
    function siguiente() {
      const lista = ejerciciosDe(ex.ruta);
      return lista[lista.indexOf(ex) + 1] || null;
    }

    function mensajeExito() {
      const sig = siguiente();
      return `<div class="aviso aviso-ok">
        <strong>¡Todo correcto! 🎉</strong>
        <p style="margin:6px 0 0">Ahora el truco de entrevista: explica en voz alta qué hace tu código y por qué. Si dudas en algo, el tutor te lo explica.</p>
        <div class="botones">
          <button type="button" class="btn btn-peq btn-sec" data-accion="explicar">📖 Ver la explicación</button>
          ${sig ? `<a class="btn btn-peq" href="#/ej/${sig.id}">Siguiente: ${esc(sig.titulo)} →</a>` : `<a class="btn btn-peq" href="#/ruta/${ex.ruta}">Volver a la ruta</a>`}
        </div></div>`;
    }

    function conectarExito(caja) {
      const b = caja.querySelector('[data-accion="explicar"]');
      if (b) b.addEventListener('click', () => abrir('tutor'));
    }

    /* ----------------- PANEL CÓDIGO ----------------- */
    const p = paneles.codigo;

    if (ex.runner === 'quiz') montarQuiz();
    else if (ex.runner === 'comandos') montarComandos();
    else montarEditor();

    /* --- Editor de código (js, web, css, sql, manual) --- */
    function montarEditor() {
      const lenguaje = { js: 'JavaScript', web: 'HTML', css: 'CSS', sql: 'SQL' }[ex.runner] || ex.lenguaje || 'código';
      const teclas = ex.runner === 'sql' ? ['⇥', '*', ',', '(', ')', "'", '=', '<', '>', ';', '.', '%']
        : (ex.runner === 'web' || ex.runner === 'css') ? ['⇥', '<', '>', '/', '=', '"', '{', '}', ':', ';', '#', '.', '(', ')', '-', '!']
        : ['⇥', '{', '}', '(', ')', '[', ']', ';', '=', '=>', '"', "'", '`', '.', ',', '<', '>', '!', '&', '|', '+', '$', ':'];

      let extra = '';
      if (ex.fixture) extra = `<details class="datos-prueba"><summary>📦 Datos de prueba (ya existen, no hace falta copiarlos)</summary><pre class="bloque-codigo"><code>${esc(ex.fixture)}</code></pre></details>`;
      if (ex.runner === 'css') extra = `<details class="datos-prueba"><summary>🧱 HTML del ejercicio (no se toca)</summary><pre class="bloque-codigo"><code>${esc(ex.html)}</code></pre></details>`;
      if (ex.runner === 'sql') extra = `<details class="datos-prueba"><summary>🗄️ Tablas y datos disponibles</summary><pre class="bloque-codigo"><code>${esc(window[ex.setup].trim())}</code></pre></details>`;

      const comprobable = ex.runner !== 'manual';

      p.innerHTML = `
        ${extra}
        <div class="editor-caja">
          <div class="editor-cabecera"><span>${esc(lenguaje)}</span><button type="button" class="btn btn-peq btn-sec" id="reiniciar" style="min-height:28px;padding:2px 10px">↺ Reiniciar</button></div>
          <label class="oculto-visual" for="editor">Editor de código</label>
          <textarea id="editor" class="editor" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" wrap="off"></textarea>
          <div class="teclas" aria-label="Símbolos rápidos">${teclas.map(t => `<button type="button" data-t="${esc(t)}" aria-label="Insertar ${esc(t === '⇥' ? 'tabulación' : t)}">${esc(t)}</button>`).join('')}</div>
        </div>
        ${comprobable ? '<div class="botones"><button class="btn btn-bloque" id="comprobar">▶ Comprobar</button></div>' : ''}
        <div id="salida"></div>
        ${ex.runner === 'web' || ex.runner === 'css' ? '<h3 style="margin-top:16px">Vista previa</h3><div class="contenedor-vista" id="vista"></div>' : ''}
        ${ex.runner === 'manual' ? montarManualHTML() : ''}`;

      const editor = p.querySelector('#editor');
      editor.value = prog.codigo ?? ex.inicial;

      // Guardado automático mientras escribes
      let temporizadorGuardar, temporizadorVista;
      editor.addEventListener('input', () => {
        // El iPhone cambia " por “ ” automáticamente: lo deshacemos
        if (/[“”‘’]/.test(editor.value)) {
          const pos = editor.selectionStart;
          editor.value = editor.value.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
          editor.setSelectionRange(pos, pos);
        }
        empezado();
        clearTimeout(temporizadorGuardar);
        temporizadorGuardar = setTimeout(() => Store.actualizarEj(id, { codigo: editor.value }), 400);
        if (vista) { clearTimeout(temporizadorVista); temporizadorVista = setTimeout(() => Runner.vistaPrevia(ex, editor.value, vista), 600); }
      });

      // Tecla Tab = 2 espacios (en vez de saltar al siguiente campo)
      editor.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && !e.shiftKey) { e.preventDefault(); insertar('  '); }
      });

      // Teclas rápidas para el móvil (no quitan el foco del editor)
      p.querySelectorAll('.teclas button').forEach(b => {
        b.addEventListener('pointerdown', e => e.preventDefault());
        b.addEventListener('click', () => insertar(b.dataset.t === '⇥' ? '  ' : b.dataset.t));
      });

      function insertar(texto) {
        editor.focus();
        editor.setRangeText(texto, editor.selectionStart, editor.selectionEnd, 'end');
        editor.dispatchEvent(new Event('input'));
      }

      p.querySelector('#reiniciar').addEventListener('click', () => {
        if (!confirm('¿Volver al código inicial? Perderás lo que has escrito.')) return;
        editor.value = ex.inicial;
        Store.actualizarEj(id, { codigo: null });
        if (vista) Runner.vistaPrevia(ex, editor.value, vista);
      });

      const vista = p.querySelector('#vista');
      if (vista) Runner.vistaPrevia(ex, editor.value, vista);

      const salida = p.querySelector('#salida');
      const boton = p.querySelector('#comprobar');
      if (boton) boton.addEventListener('click', async () => {
        boton.disabled = true; boton.textContent = 'Comprobando…';
        Store.actualizarEj(id, { codigo: editor.value, intentos: (Store.ej(id).intentos || 0) + 1 });
        empezado();
        let res;
        try {
          if (ex.runner === 'js') res = await Runner.ejecutarJS(ex, editor.value);
          else if (ex.runner === 'sql') res = await Runner.ejecutarSQL(ex, editor.value);
          else res = await Runner.ejecutarWeb(ex, editor.value, vista);
        } catch (err) {
          res = { ok: false, resultados: [], logs: [], error: err.message };
        }
        ultimoResultado = res;
        boton.disabled = false; boton.textContent = '▶ Comprobar';
        pintarResultado(res, salida);
        if (res.ok) superado();
        if (tutor) tutor.refrescar();
      });

      if (ex.runner === 'manual') conectarManual(editor);
    }

    function tablaHTML(t) {
      if (!t || !t.columns.length) return '<p class="suave pequeno">(La consulta no devolvió filas)</p>';
      return `<div class="tabla-sql"><table><thead><tr>${t.columns.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead>
        <tbody>${t.values.map(f => `<tr>${f.map(v => `<td>${esc(v === null ? 'NULL' : v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    }

    function pintarResultado(res, salida) {
      let html = '';
      if (res.error) html += `<div class="aviso aviso-mal">❌ ${esc(res.error)}</div>`;
      if (res.resultados.length) {
        const n = res.resultados.filter(x => x.ok).length;
        html += `<p><strong>${n} de ${res.resultados.length}</strong> comprobaciones superadas</p>
          <ul class="resultados">${res.resultados.map(x => `
            <li class="${x.ok ? 'ok' : 'mal'}"><span aria-hidden="true">${x.ok ? '✅' : '❌'}</span>
              <span><code>${esc(x.t)}</code>${x.detalle ? `<span class="detalle">${esc(x.detalle)}</span>` : ''}</span>
              <span class="oculto-visual">${x.ok ? 'superada' : 'no superada'}</span></li>`).join('')}</ul>`;
      }
      if (res.tabla) {
        html += '<h3>Tu resultado</h3>' + tablaHTML(res.tabla);
        if (!res.ok) html += `<details><summary class="pequeno">Ver el resultado esperado</summary>${tablaHTML(res.esperada)}</details>`;
      }
      if (res.logs && res.logs.length) html += `<h3>Consola</h3><div class="consola">${esc(res.logs.join('\n'))}</div>`;
      if (res.ok) html += mensajeExito();
      else html += `<div class="botones"><button type="button" class="btn btn-peq btn-sec" data-accion="falla">🤔 ¿Por qué falla? Pregúntale al tutor</button></div>`;
      salida.innerHTML = html;
      conectarExito(salida);
      const f = salida.querySelector('[data-accion="falla"]');
      if (f) f.addEventListener('click', () => { abrir('tutor'); tutor.pedirExplicacionFallo(); });
      salida.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /* --- Ejercicios "manuales" (TS, React, Java…): criterios + comparar --- */
    function montarManualHTML() {
      return `
        <section class="tarjeta" style="margin-top:14px">
          <h3>Revisa tu solución</h3>
          <p class="suave pequeno">Este lenguaje no se puede ejecutar aquí. Pruébalo en el enlace del enunciado y marca lo que cumples:</p>
          <div class="criterios">${ex.criterios.map((c, i) => `<label><input type="checkbox" data-i="${i}" ${(prog.criterios || [])[i] ? 'checked' : ''}> <span>${esc(c)}</span></label>`).join('')}</div>
          <div class="botones"><button type="button" class="btn btn-sec btn-bloque" id="comparar">👀 Comparar con la solución</button></div>
          <div id="comparacion"></div>
        </section>`;
    }

    function conectarManual() {
      const marcas = [...p.querySelectorAll('.criterios input')];
      marcas.forEach(m => m.addEventListener('change', () => {
        const valores = marcas.map(x => x.checked);
        Store.actualizarEj(id, { criterios: valores });
        empezado();
        if (valores.every(Boolean)) {
          superado();
          const caja = p.querySelector('#salida');
          caja.innerHTML = mensajeExito();
          conectarExito(caja);
        }
      }));
      p.querySelector('#comparar').addEventListener('click', () => {
        Store.actualizarEj(id, { solucionVista: true });
        p.querySelector('#comparacion').innerHTML = `
          <h3 style="margin-top:12px">Una posible solución</h3>
          <pre class="bloque-codigo"><code>${esc(ex.solucion)}</code></pre>
          <p class="suave pequeno">Compárala con la tuya: no tiene que ser igual, pero sí cumplir los criterios. El tutor te explica cada parte.</p>
          <div class="botones"><button type="button" class="btn btn-peq" id="explicar-sol">📖 Explícamela paso a paso</button></div>`;
        p.querySelector('#explicar-sol').addEventListener('click', () => abrir('tutor'));
      });
    }

    /* --- Quiz --- */
    function montarQuiz() {
      const respondidas = new Map();
      p.innerHTML = `${ex.enunciado ? `<p>${ex.enunciado}</p>` : ''}
        ${ex.preguntas.map((q, i) => `
          <section class="tarjeta pregunta" data-q="${i}">
            <p><strong>${i + 1}.</strong> ${esc(q.q)}</p>
            <div class="opciones">${q.o.map((o, j) => `<button type="button" data-j="${j}">${esc(o)}</button>`).join('')}</div>
            <div class="por" aria-live="polite"></div>
          </section>`).join('')}
        <div id="salida"></div>`;

      p.querySelectorAll('.pregunta').forEach(sec => {
        const i = Number(sec.dataset.q), q = ex.preguntas[i];
        sec.querySelectorAll('.opciones button').forEach(b => b.addEventListener('click', () => {
          const j = Number(b.dataset.j);
          empezado();
          respondidas.set(i, j === q.ok);
          sec.querySelectorAll('.opciones button').forEach(x => {
            x.disabled = true;
            if (Number(x.dataset.j) === q.ok) x.classList.add('correcta');
            else if (x === b) x.classList.add('incorrecta');
          });
          sec.querySelector('.por').innerHTML = `<div class="aviso ${j === q.ok ? 'aviso-ok' : ''}">${j === q.ok ? '✅ ¡Bien!' : '💡 Casi.'} ${esc(q.por)}</div>`;

          if (respondidas.size === ex.preguntas.length) {
            const bien = [...respondidas.values()].filter(Boolean).length;
            Store.actualizarEj(id, { intentos: (Store.ej(id).intentos || 0) + 1 });
            const salida = p.querySelector('#salida');
            if (bien === ex.preguntas.length) { superado(); salida.innerHTML = mensajeExito(); conectarExito(salida); }
            else {
              Store.registrarActividad();
              salida.innerHTML = `<div class="aviso">Has acertado <strong>${bien} de ${ex.preguntas.length}</strong>. Lee las explicaciones y vuelve a intentarlo para completarlo.
                <div class="botones"><button type="button" class="btn btn-peq" id="repetir">↺ Repetir</button></div></div>`;
              salida.querySelector('#repetir').addEventListener('click', () => { montarQuiz(); window.scrollTo({ top: 0 }); });
            }
          }
        }));
      });
    }

    /* --- Comandos (Git) --- */
    function montarComandos() {
      p.innerHTML = `<p>${esc(ex.enunciado)}</p>
        ${ex.preguntas.map((q, i) => `
          <section class="tarjeta pregunta" data-q="${i}">
            <p><strong>${i + 1}.</strong> ${esc(q.q)}</p>
            <form class="terminal"><span>$</span>
              <label class="oculto-visual" for="cmd-${i}">Comando</label>
              <input id="cmd-${i}" type="text" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" placeholder="git …">
              <button class="btn btn-peq" type="submit">OK</button>
            </form>
            <div class="por" aria-live="polite"></div>
          </section>`).join('')}
        <div id="salida"></div>`;

      const aciertos = new Set();
      p.querySelectorAll('.pregunta').forEach(sec => {
        const i = Number(sec.dataset.q), q = ex.preguntas[i];
        const form = sec.querySelector('form'), input = sec.querySelector('input'), por = sec.querySelector('.por');
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          empezado();
          // Normalizamos: sin espacios dobles, minúsculas y comillas rectas
          const n = input.value.trim().replace(/\s+/g, ' ').replace(/[“”]/g, '"').replace(/[‘’]/g, "'").toLowerCase();
          const ok = q.ok.some(re => new RegExp(re).test(n));
          if (ok) {
            aciertos.add(i);
            input.disabled = true;
            por.innerHTML = `<div class="aviso aviso-ok">✅ ${esc(q.por)}</div>`;
          } else {
            por.innerHTML = `<div class="aviso aviso-mal">❌ No es exactamente eso. <button type="button" class="btn btn-peq btn-sec ver">Ver respuesta</button></div>`;
            por.querySelector('.ver').addEventListener('click', () => {
              por.innerHTML = `<div class="aviso">Respuesta: <code>${esc(q.sol)}</code><br>${esc(q.por)}<br><span class="pequeno suave">Escríbelo tú para que se te quede.</span></div>`;
            });
          }
          if (aciertos.size === ex.preguntas.length) {
            superado();
            const salida = p.querySelector('#salida');
            salida.innerHTML = mensajeExito();
            conectarExito(salida);
          }
        });
      });
    }

    /* ----------------- PANEL TUTOR ----------------- */
    function montarTutor() {
      if (entrevista && entrevista.id === id && Date.now() < entrevista.fin) {
        paneles.tutor.innerHTML = `<div class="tarjeta"><h2>🤫 Modo entrevista</h2>
          <p>En una entrevista real no hay tutor. Intenta resolverlo y <strong>explicar en voz alta</strong> lo que haces.</p>
          <div class="botones"><button class="btn btn-sec" id="rendirse">🏳️ Me rindo, quiero ayuda</button></div></div>`;
        paneles.tutor.querySelector('#rendirse').addEventListener('click', () => {
          entrevista = null;
          const reloj = app.querySelector('#reloj'); if (reloj) reloj.remove();
          montarTutor();
        });
        return;
      }
      tutor = Tutor.montar(paneles.tutor, ex, {
        codigo: () => { const e = p.querySelector('#editor'); return e ? e.value : ''; },
        ultimoResultado: () => ultimoResultado,
        alVerSolucion: () => {}
      });
    }

    abrir(pestanaInicial || 'reto');
  }

  /* =========================================================
     REPASO (tarjetas tipo flashcard, con repetición espaciada)
     ========================================================= */
  const INTERVALOS = [0, 1, 3, 7, 14, 30]; // días hasta volver a preguntar según la "caja"
  let filtroRepaso = 'todas';

  function pendientesRepaso() {
    const hoy = Store.hoy();
    return window.TARJETAS.filter(t => {
      if (filtroRepaso !== 'todas' && t.ruta !== filtroRepaso) return false;
      const s = Store.estado.tarjetas[t.id];
      return !s || s.proxima <= hoy;
    });
  }

  function verRepaso() {
    cabecera('⚡ Reto rápido', null);
    marcarNav('repaso');
    const rutasConTarjetas = RUTAS.filter(r => window.TARJETAS.some(t => t.ruta === r.id));
    const dominadas = window.TARJETAS.filter(t => (Store.estado.tarjetas[t.id] || {}).caja >= 3).length;

    app.innerHTML = `
      <p class="suave">Preguntas típicas de entrevista. Intenta responder en voz alta antes de girar la tarjeta. Las que sepas volverán más tarde; las que no, enseguida.</p>
      <p class="pequeno"><strong>${dominadas}</strong> de ${window.TARJETAS.length} tarjetas dominadas</p>
      <div class="filtros" role="group" aria-label="Filtrar por tema">
        <button type="button" data-f="todas" aria-pressed="${filtroRepaso === 'todas'}">Todas</button>
        ${rutasConTarjetas.map(r => `<button type="button" data-f="${r.id}" aria-pressed="${filtroRepaso === r.id}">${r.icono} ${r.corto}</button>`).join('')}
      </div>
      <div id="zona-repaso"></div>`;

    app.querySelectorAll('.filtros button').forEach(b => b.addEventListener('click', () => { filtroRepaso = b.dataset.f; verRepaso(); }));

    const zona = app.querySelector('#zona-repaso');
    let cola = pendientesRepaso().sort(() => Math.random() - .5).slice(0, 8);
    let hechasSesion = 0;

    function siguienteTarjeta() {
      if (!cola.length) {
        zona.innerHTML = hechasSesion
          ? `<div class="tarjeta flashcard"><div style="font-size:2.5rem">🎉</div><p class="pregunta-fc">¡Sesión terminada!</p><p class="suave">Has repasado ${hechasSesion} tarjetas.</p><div class="botones" style="justify-content:center"><button class="btn" id="otra">Otra ronda</button></div></div>`
          : `<div class="tarjeta flashcard"><div style="font-size:2.5rem">✅</div><p class="pregunta-fc">Todo al día por hoy</p><p class="suave">Vuelve mañana o practica igualmente.</p><div class="botones" style="justify-content:center"><button class="btn" id="practicar">Practicar igualmente</button></div></div>`;
        const otra = zona.querySelector('#otra'), pr = zona.querySelector('#practicar');
        if (otra) otra.addEventListener('click', verRepaso);
        if (pr) pr.addEventListener('click', () => {
          cola = window.TARJETAS.filter(t => filtroRepaso === 'todas' || t.ruta === filtroRepaso).sort(() => Math.random() - .5).slice(0, 8);
          siguienteTarjeta();
        });
        return;
      }
      const t = cola[0];
      const r = ruta(t.ruta);
      zona.innerHTML = `
        <div class="tarjeta flashcard">
          <span class="chip" style="align-self:center">${r.icono} ${r.corto}</span>
          <p class="pregunta-fc" style="margin-top:12px">${esc(t.q)}</p>
          <div class="respuesta-fc" hidden>${esc(t.a)}</div>
        </div>
        <p class="suave pequeno" style="text-align:center">Quedan ${cola.length}</p>
        <div class="botones" id="acciones-fc"><button class="btn btn-bloque" id="girar">👀 Ver respuesta</button></div>`;
      zona.querySelector('#girar').addEventListener('click', () => {
        zona.querySelector('.respuesta-fc').hidden = false;
        zona.querySelector('#acciones-fc').innerHTML = `
          <button class="btn btn-sec" style="flex:1" id="repasar">😅 Repasar</button>
          <button class="btn btn-ok" style="flex:1" id="sabia">✅ Lo sabía</button>`;
        zona.querySelector('#repasar').addEventListener('click', () => responder(false));
        zona.querySelector('#sabia').addEventListener('click', () => responder(true));
      });

      function responder(sabia) {
        const s = Store.estado.tarjetas[t.id] || { caja: 0 };
        s.caja = sabia ? Math.min(s.caja + 1, INTERVALOS.length - 1) : 0;
        const d = new Date(); d.setDate(d.getDate() + INTERVALOS[s.caja]);
        s.proxima = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
        Store.estado.tarjetas[t.id] = s;
        Store.registrarActividad();
        Store.guardar();
        hechasSesion++;
        cola.shift();
        if (!sabia) cola.push(t); // la que no sabías vuelve al final de la ronda
        cabecera('⚡ Reto rápido', null);
        siguienteTarjeta();
      }
    }
    siguienteTarjeta();
  }

  /* =========================================================
     MODO ENTREVISTA
     ========================================================= */
  function verEntrevista() {
    cabecera('⏱️ Modo entrevista', null);
    marcarNav('entrevista');
    app.innerHTML = `
      <section class="tarjeta">
        <h1>Simula una entrevista</h1>
        <p>Te doy un reto al azar con un tiempo límite y <strong>sin tutor</strong>. Como en un live coding de verdad.</p>
        <ul>
          <li>🗣️ Piensa en voz alta: lo que más valoran es <em>cómo</em> razonas.</li>
          <li>❓ Antes de escribir, repite el problema con tus palabras y pregunta dudas.</li>
          <li>🪜 Primero una solución que funcione; luego la mejoras.</li>
          <li>🧪 Prueba casos raros: vacío, un solo elemento, mayúsculas…</li>
        </ul>
        <label class="campo" for="ruta-ent">Tema</label>
        <select id="ruta-ent">
          <option value="">Cualquiera</option>
          ${RUTAS.map(r => `<option value="${r.id}">${r.icono} ${esc(r.nombre)}</option>`).join('')}
        </select>
        <label style="display:flex;gap:8px;align-items:center;margin-top:12px"><input type="checkbox" id="solo-nuevos" checked style="width:20px;height:20px"> Solo retos que aún no he hecho</label>
        <div class="botones"><button class="btn btn-bloque" id="sortear">🎲 Dame un reto</button></div>
      </section>
      <div id="reto-ent"></div>`;

    app.querySelector('#sortear').addEventListener('click', () => {
      const idRuta = app.querySelector('#ruta-ent').value;
      const nuevos = app.querySelector('#solo-nuevos').checked;
      // Solo ejercicios que se pueden comprobar automáticamente
      let pool = EJ.filter(e => ['js', 'web', 'css', 'sql', 'quiz', 'comandos'].includes(e.runner) && (!idRuta || e.ruta === idRuta));
      if (nuevos) pool = pool.filter(e => estadoDe(e.id) !== 'hecho');
      const caja = app.querySelector('#reto-ent');
      if (!pool.length) { caja.innerHTML = '<p class="aviso">No quedan retos con esos filtros. ¡Desmarca "solo nuevos"!</p>'; return; }
      const e = pool[Math.floor(Math.random() * pool.length)];
      caja.innerHTML = `
        <section class="tarjeta">
          <p class="suave pequeno">${ruta(e.ruta).icono} ${esc(ruta(e.ruta).nombre)}</p>
          <h2>${esc(e.titulo)}</h2>
          <div class="chips">${chipsEjercicio(e)}</div>
          <div class="botones"><button class="btn btn-bloque" id="empezar-ent">Empezar · ${e.minutos} min</button></div>
        </section>`;
      caja.querySelector('#empezar-ent').addEventListener('click', () => {
        entrevista = { id: e.id, fin: Date.now() + e.minutos * 60000 };
        location.hash = '#/ej/' + e.id;
      });
    });
  }

  /* =========================================================
     AJUSTES
     ========================================================= */
  function verAjustes() {
    cabecera('⚙️ Ajustes', null);
    marcarNav('ajustes');
    const a = Store.estado.ajustes;
    app.innerHTML = `
      <section class="tarjeta">
        <h2>Tú</h2>
        <label class="campo" for="aj-nombre">Nombre</label>
        <input id="aj-nombre" type="text" value="${esc(Store.estado.nombre)}" autocomplete="given-name">
        <label class="campo" for="aj-tema">Apariencia</label>
        <select id="aj-tema">
          <option value="auto" ${a.tema === 'auto' ? 'selected' : ''}>Automática (como el móvil)</option>
          <option value="claro" ${a.tema === 'claro' ? 'selected' : ''}>Clara</option>
          <option value="oscuro" ${a.tema === 'oscuro' ? 'selected' : ''}>Oscura</option>
        </select>
      </section>

      <section class="tarjeta">
        <h2>🤖 Tutor con IA (opcional)</h2>
        <p class="suave">Sin esto, el tutor responde con sus apuntes y te deja copiar la pregunta a Claude. Con una clave de API de Claude, responde a cualquier pregunta aquí mismo, viendo tu código.</p>
        <label class="campo" for="aj-key">Clave de API de Claude</label>
        <input id="aj-key" type="password" autocomplete="off" placeholder="sk-ant-…" value="${esc(a.apiKey)}">
        <label class="campo" for="aj-modelo">Modelo</label>
        <input id="aj-modelo" type="text" value="${esc(a.modelo)}" spellcheck="false" autocapitalize="off">
        <div class="aviso pequeno">
          🔐 La clave se guarda <strong>solo en este dispositivo</strong>: no está en el código, no se sube a GitHub y no se incluye al exportar tu progreso.
          Se consigue en <a href="https://console.anthropic.com" target="_blank" rel="noopener">console.anthropic.com</a> y cada pregunta cuesta una pequeña cantidad según su uso. El modelo Haiku es el más barato.
        </div>
        <div class="botones"><button class="btn btn-sec" id="aj-guardar-ia">Guardar</button>${a.apiKey ? '<button class="btn btn-borde" id="aj-borrar-ia">Quitar clave</button>' : ''}</div>
      </section>

      <section class="tarjeta">
        <h2>💾 Tu progreso</h2>
        <p class="suave">Se guarda en este navegador. Para pasarlo a otro dispositivo (por ejemplo, del iPhone a la tablet), exporta aquí e importa allí.</p>
        <div class="botones">
          <button class="btn" id="aj-exportar">⬇️ Exportar</button>
          <label class="btn btn-sec" for="aj-importar" style="cursor:pointer">⬆️ Importar</label>
          <input id="aj-importar" type="file" accept="application/json,.json" class="oculto-visual">
        </div>
        <div class="botones"><button class="btn btn-borde" id="aj-borrar">🗑️ Borrar todo mi progreso</button></div>
      </section>

      <section class="tarjeta">
        <h2>📱 Instalarla en el móvil</h2>
        <p><strong>iPhone (Safari):</strong> botón Compartir → <em>Añadir a pantalla de inicio</em>.</p>
        <p><strong>Android / tablet (Chrome):</strong> menú ⋮ → <em>Instalar aplicación</em>.</p>
        <p class="suave pequeno">Instalada funciona sin conexión y evita que el navegador borre tus datos si pasas unos días sin abrirla.</p>
      </section>
      <p class="suave pequeno" style="text-align:center">Reto Junior · ${EJ.length} retos · ${window.TARJETAS.length} tarjetas</p>`;

    app.querySelector('#aj-nombre').addEventListener('change', e => { Store.estado.nombre = e.target.value.trim(); Store.guardar(); });
    app.querySelector('#aj-tema').addEventListener('change', e => { a.tema = e.target.value; Store.guardar(); aplicarTema(); });
    app.querySelector('#aj-guardar-ia').addEventListener('click', () => {
      a.apiKey = app.querySelector('#aj-key').value.trim();
      a.modelo = app.querySelector('#aj-modelo').value.trim() || 'claude-haiku-5-5';
      Store.guardar();
      alert(a.apiKey ? 'Guardado. El tutor ya puede responder con IA.' : 'Guardado sin clave.');
      verAjustes();
    });
    const borrarIA = app.querySelector('#aj-borrar-ia');
    if (borrarIA) borrarIA.addEventListener('click', () => { a.apiKey = ''; Store.guardar(); verAjustes(); });

    app.querySelector('#aj-exportar').addEventListener('click', () => {
      const blob = new Blob([Store.exportar()], { type: 'application/json' });
      const enlace = document.createElement('a');
      enlace.href = URL.createObjectURL(blob);
      enlace.download = 'reto-junior-progreso-' + Store.hoy() + '.json';
      document.body.appendChild(enlace); enlace.click(); enlace.remove();
      setTimeout(() => URL.revokeObjectURL(enlace.href), 2000);
    });
    app.querySelector('#aj-importar').addEventListener('change', async (e) => {
      const archivo = e.target.files[0];
      if (!archivo) return;
      if (!confirm('Esto sustituirá el progreso de este dispositivo por el del archivo. ¿Seguir?')) return;
      try { Store.importar(await archivo.text()); alert('¡Progreso importado!'); location.hash = '#/'; render(); }
      catch (err) { alert('No se pudo importar: ' + err.message); }
    });
    app.querySelector('#aj-borrar').addEventListener('click', () => {
      if (confirm('¿Seguro? Se borrará todo tu progreso de este dispositivo y no se puede deshacer.')) { Store.borrarTodo(); location.hash = '#/'; render(); }
    });
  }

  /* =========================================================
     TEMA (claro / oscuro)
     ========================================================= */
  function aplicarTema() {
    const t = Store.estado.ajustes.tema;
    document.documentElement.classList.toggle('tema-claro', t === 'claro');
    document.documentElement.classList.toggle('tema-oscuro', t === 'oscuro');
  }

  /* =========================================================
     ENRUTADOR: decide qué pantalla mostrar según la URL
     ========================================================= */
  function render() {
    if (!Store.estado.bienvenida) { verBienvenida(); return; }
    const partes = location.hash.replace(/^#\/?/, '').split('/');
    const [seccion, id, extra] = partes;
    window.scrollTo({ top: 0 });
    if (seccion === 'ruta') verRuta(id);
    else if (seccion === 'ej') verEjercicio(id, extra);
    else if (seccion === 'repaso') verRepaso();
    else if (seccion === 'entrevista') verEntrevista();
    else if (seccion === 'ajustes') verAjustes();
    else verInicio();
  }

  window.addEventListener('hashchange', render);
  aplicarTema();
  render();

  /* Modo sin conexión (solo cuando está publicada en una web, p. ej. GitHub Pages) */
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
})();
