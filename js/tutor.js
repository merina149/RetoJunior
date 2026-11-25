/* =========================================================
   TUTOR: el chat que te guía paso a paso
   - Pasos y pistas progresivas
   - Explicación de la solución trozo a trozo ("esto es por…")
   - Preguntas frecuentes del ejercicio
   - Preguntas libres:
       · con tu clave de Claude (Ajustes) → responde una IA de verdad
       · sin clave → busca en las preguntas frecuentes y el diccionario
                     y te ofrece copiar la pregunta para Claude
   ========================================================= */
window.Tutor = (function () {

  // Conversaciones abiertas en esta sesión (una por ejercicio)
  const conversaciones = new Map();

  /* ---------- Utilidades de texto ---------- */
  const escapar = (t) => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // Markdown mínimo: bloques ```, `código`, **negrita** y párrafos
  function markdown(texto) {
    const bloques = [];
    let t = escapar(texto).replace(/```[a-z]*\n?([\s\S]*?)```/g, (m, codigo) => {
      bloques.push('<pre class="bloque-codigo"><code>' + codigo.replace(/\n$/, '') + '</code></pre>');
      return '\u0000' + (bloques.length - 1) + '\u0000';
    });
    t = t.replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    t = t.split(/\n{2,}/).map(p => '<p>' + p.replace(/\n/g, '<br>') + '</p>').join('');
    return t.replace(/<p>\u0000(\d+)\u0000<\/p>|\u0000(\d+)\u0000/g, (m, a, b) => bloques[a ?? b]);
  }

  // Quita etiquetas HTML (para mandar el enunciado como texto)
  const sinHTML = (h) => { const d = document.createElement('div'); d.innerHTML = h; return d.textContent.replace(/\n{3,}/g, '\n\n').trim(); };

  // Normaliza para buscar: minúsculas, sin tildes ni signos
  const normalizar = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9=<>\s]/g, ' ');
  const VACIAS = new Set('que por para como con una uno los las del este esta esto eso hay mas pero sin sus son ser cual cuando donde porque the and you what why how hace hacer tengo mi me no si es lo la el de en y a o un al se le'.split(' '));
  const palabras = (t) => normalizar(t).split(/\s+/).filter(p => p.length > 1 && !VACIAS.has(p));

  /* ---------- Estado de la conversación de un ejercicio ---------- */
  function conv(ex) {
    if (!conversaciones.has(ex.id)) {
      conversaciones.set(ex.id, { mensajes: [], paso: -1, pistaDada: false, explicacion: -1, historialIA: [] });
    }
    return conversaciones.get(ex.id);
  }

  /* =========================================================
     MONTAR el tutor en la pestaña
     opciones: { codigo(), ultimoResultado(), irACodigo(), alVerSolucion() }
     ========================================================= */
  function montar(contenedor, ex, opciones) {
    const c = conv(ex);
    const prog = Store.ej(ex.id);
    const nombre = Store.estado.nombre ? ' ' + Store.estado.nombre : '';
    const hayIA = !!Store.estado.ajustes.apiKey;

    contenedor.innerHTML = `
      <div class="chat" aria-live="polite"></div>
      <div class="acciones-tutor"></div>
      <form class="caja-pregunta">
        <label class="oculto-visual" for="pregunta-tutor">Pregunta al tutor</label>
        <input id="pregunta-tutor" type="text" autocomplete="off" placeholder="${hayIA ? 'Pregúntame lo que quieras…' : 'Pregunta: ¿por qué…?'}">
        <button class="btn" type="submit" aria-label="Enviar">➤</button>
      </form>`;

    const chat = contenedor.querySelector('.chat');
    const acciones = contenedor.querySelector('.acciones-tutor');
    const form = contenedor.querySelector('.caja-pregunta');
    const input = form.querySelector('input');

    /* --- Pintar un mensaje --- */
    function pintar(m) {
      const div = document.createElement('div');
      div.className = 'burbuja ' + m.rol;
      div.innerHTML = m.html;
      chat.appendChild(div);
      return div;
    }
    function decir(rol, html) {
      const m = { rol, html };
      c.mensajes.push(m);
      const div = pintar(m);
      div.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return div;
    }
    const tutorDice = (html) => decir('tutor', html);
    const yoDigo = (texto) => decir('yo', escapar(texto));

    /* --- Botones de acción según el momento --- */
    function botones() {
      const lista = [];
      const quedanPasos = c.paso < ex.pasos.length - 1;
      if (c.paso >= 0 && !c.pistaDada && ex.pasos[c.paso]) lista.push(['💡 Dame una pista', darPista]);
      if (quedanPasos) lista.push([c.paso < 0 ? '🚀 Empezar' : '➡️ Siguiente paso', siguientePaso]);
      if (c.explicacion >= 0 && c.explicacion < ex.explicacion.length - 1) lista.push(['▶️ Sigue explicando', siguienteExplicacion]);
      if (c.explicacion < 0 && ex.solucion) lista.push(['📖 Explícame la solución', pedirSolucion]);
      const r = opciones.ultimoResultado();
      if (r && !r.ok) lista.push(['🤔 ¿Por qué falla mi código?', porQueFalla]);
      lista.push(['❓ Preguntas frecuentes', mostrarFAQ]);

      acciones.innerHTML = '';
      lista.forEach(([texto, fn]) => {
        const b = document.createElement('button');
        b.type = 'button'; b.textContent = texto;
        b.addEventListener('click', () => { fn(); botones(); });
        acciones.appendChild(b);
      });
    }

    /* --- Pasos y pistas --- */
    function siguientePaso() {
      c.paso++;
      c.pistaDada = false;
      const p = ex.pasos[c.paso];
      yoDigo(c.paso === 0 ? 'Empezar' : 'Siguiente paso');
      tutorDice(`<p><strong>Paso ${c.paso + 1} de ${ex.pasos.length}:</strong> ${escapar(p.t)}</p>
        <p class="suave pequeno">Inténtalo en la pestaña Código. Si te atascas, pide una pista.</p>`);
      if (c.paso === ex.pasos.length - 1) {
        setTimeout(() => { tutorDice('<p>Este es el último paso. Cuando lo tengas, pulsa <strong>Comprobar</strong> 💪</p>'); }, 300);
      }
    }

    function darPista() {
      const p = ex.pasos[c.paso];
      c.pistaDada = true;
      Store.actualizarEj(ex.id, { pistas: (prog.pistas || 0) + 1 });
      yoDigo('Dame una pista');
      tutorDice('<p>💡 ' + escapar(p.pista) + '</p>');
    }

    /* --- Solución explicada trozo a trozo --- */
    function pedirSolucion() {
      const intentado = (prog.intentos || 0) > 0 || (prog.pistas || 0) >= ex.pasos.length;
      yoDigo('Explícame la solución');
      if (!intentado && !c.avisado) {
        c.avisado = true;
        tutorDice(`<p>Te la explico, pero un consejo: se aprende muchísimo más si lo intentas antes, aunque te salga mal. ¿Pruebas primero con una pista o pulsando <strong>Comprobar</strong>?</p>
          <p class="suave pequeno">Si aun así quieres verla, vuelve a pulsar el botón. Aquí no se juzga a nadie 😊</p>`);
        return;
      }
      verSolucion();
    }

    function verSolucion() {
      Store.actualizarEj(ex.id, { solucionVista: true });
      if (opciones.alVerSolucion) opciones.alVerSolucion();
      tutorDice(`<p>Aquí tienes una solución. Después te explico cada parte, una a una:</p>
        <pre class="bloque-codigo"><code>${escapar(ex.solucion)}</code></pre>`);
      c.explicacion = -1;
      siguienteExplicacion(true);
    }

    function siguienteExplicacion(primera) {
      c.explicacion++;
      const e = ex.explicacion[c.explicacion];
      if (!e) return;
      if (!primera) yoDigo('Sigue');
      tutorDice(`<span class="fragmento">${escapar(e.c)}</span><p>${escapar(e.p)}</p>
        <p class="suave pequeno">${c.explicacion + 1} de ${ex.explicacion.length}</p>`);
      if (c.explicacion === ex.explicacion.length - 1) {
        setTimeout(() => tutorDice('<p>¡Eso es todo! 🎉 Ahora intenta escribirla tú sin mirar: es la mejor forma de que se quede. ¿Alguna duda? Pregúntame abajo.</p>'), 300);
      }
    }

    /* --- ¿Por qué falla? --- */
    function porQueFalla() {
      const r = opciones.ultimoResultado();
      yoDigo('¿Por qué falla mi código?');
      const fallos = (r.resultados || []).filter(x => !x.ok);
      const resumen = r.error ? r.error : fallos.map(f => '• ' + f.t + (f.detalle ? ' — ' + f.detalle : '')).join('\n');
      if (hayIA) {
        preguntarIA('Mi código no pasa las comprobaciones. Esto es lo que falla:\n' + resumen + '\n\n¿Me ayudas a entender por qué, sin darme la solución completa?');
        return;
      }
      let html = '<p>Vamos a verlo con calma. Esto es lo que no cuadra:</p><pre class="bloque-codigo"><code>' + escapar(resumen) + '</code></pre>';
      html += '<p>Cómo depurarlo:</p><ol><li>Lee el mensaje: ¿qué esperaba y qué dio?</li><li>Busca en tu código la parte que produce ese valor.</li><li>Prueba con <code>console.log()</code> para ver los valores intermedios.</li></ol>';
      const p = ex.pasos[Math.max(0, c.paso)];
      if (p) html += '<p>💡 Pista relacionada: ' + escapar(p.pista) + '</p>';
      tutorDice(html);
    }

    /* --- Preguntas frecuentes --- */
    function mostrarFAQ() {
      yoDigo('Preguntas frecuentes');
      if (!ex.faq || !ex.faq.length) { tutorDice('<p>Este ejercicio no tiene preguntas frecuentes, pero puedes escribirme tu duda abajo.</p>'); return; }
      const div = tutorDice('<p>Toca una pregunta:</p><div class="acciones-tutor"></div>');
      const caja = div.querySelector('.acciones-tutor');
      ex.faq.forEach(f => {
        const b = document.createElement('button');
        b.type = 'button'; b.textContent = f.q;
        b.addEventListener('click', () => { yoDigo(f.q); tutorDice('<p>' + escapar(f.a) + '</p>'); botones(); });
        caja.appendChild(b);
      });
    }

    /* --- Pregunta libre --- */
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const texto = input.value.trim();
      if (!texto) return;
      input.value = '';
      yoDigo(texto);
      if (hayIA) preguntarIA(texto);
      else responderLocal(texto);
      botones();
    });

    // Sin IA: busca la respuesta más parecida
    function responderLocal(texto) {
      const q = palabras(texto);
      const candidatos = [];
      (ex.faq || []).forEach(f => candidatos.push({ q: f.q, a: f.a, txt: palabras(f.q + ' ' + f.q + ' ' + f.a), extra: 1 }));
      window.TARJETAS.forEach(t => candidatos.push({ q: t.q, a: t.a, txt: palabras(t.q + ' ' + t.kw.join(' ') + ' ' + t.kw.join(' ')), extra: 0 }));
      ex.explicacion.forEach(e => candidatos.push({ q: e.c, a: e.p, txt: palabras(e.c + ' ' + e.p), extra: .5, codigo: true }));

      let mejor = null, max = 0;
      candidatos.forEach(cand => {
        const set = new Set(cand.txt);
        let s = q.filter(p => set.has(p)).length;
        if (s > 0) s += cand.extra;
        if (s > max) { max = s; mejor = cand; }
      });

      let html = '';
      if (mejor && max >= 1.5) {
        html += mejor.codigo ? '<span class="fragmento">' + escapar(mejor.q) + '</span>' : '<p><strong>' + escapar(mejor.q) + '</strong></p>';
        html += '<p>' + escapar(mejor.a) + '</p>';
        html += '<p class="suave pequeno">¿No era esto? Puedes preguntárselo a Claude con todo el contexto del ejercicio:</p>';
      } else {
        html += '<p>Esa pregunta no la tengo en mis apuntes 📝. Puedes preguntársela a Claude con todo el contexto del ejercicio (tu código incluido):</p>';
      }
      html += '<div class="acciones-tutor"><button type="button" class="copiar-claude">📋 Copiar pregunta y abrir Claude</button></div>';
      html += '<p class="suave pequeno">Truco: en Ajustes puedes poner tu clave de Claude y te responderé aquí mismo.</p>';
      const div = tutorDice(html);
      div.querySelector('.copiar-claude').addEventListener('click', () => copiarParaClaude(texto));
    }

    // Prepara un mensaje con el contexto y abre Claude
    function copiarParaClaude(pregunta) {
      const texto = contexto() + '\n\nMi duda: ' + pregunta + '\n\nExplícamelo de forma sencilla, sin matemáticas, con un ejemplo. No me des la solución completa salvo que te la pida.';
      if (navigator.clipboard) navigator.clipboard.writeText(texto).catch(() => {});
      window.open('https://claude.ai/new?q=' + encodeURIComponent(texto), '_blank', 'noopener');
      tutorDice('<p>✅ Copiado. Si no aparece ya escrito en Claude, pégalo (mantén pulsado → Pegar).</p>');
    }

    function contexto() {
      const r = opciones.ultimoResultado();
      let t = 'Estoy practicando para entrevistas de desarrollo web junior.\n\nEjercicio: ' + ex.titulo + '\n' + sinHTML(ex.enunciado);
      const codigo = opciones.codigo();
      if (codigo) t += '\n\nMi código actual:\n```\n' + codigo + '\n```';
      if (r) t += '\n\nResultado de las comprobaciones:\n' + (r.error || (r.resultados || []).map(x => (x.ok ? '✓ ' : '✗ ') + x.t + (x.ok ? '' : ' (' + x.detalle + ')')).join('\n'));
      return t;
    }

    /* --- Con IA (clave de Claude en Ajustes) --- */
    async function preguntarIA(texto) {
      const pensando = tutorDice('<span class="escribiendo" aria-label="Escribiendo"><span></span><span></span><span></span></span>');
      const sistema = `Eres un tutor de programación web paciente y cercano. Hablas en español de España, con frases cortas y claras.
La alumna estudia DAW (Desarrollo de Aplicaciones Web) y prepara entrevistas de trabajo junior.
Reglas:
- Explica el PORQUÉ de las cosas con ejemplos cotidianos. Evita explicaciones matemáticas.
- No des la solución completa salvo que te la pida explícitamente. Guía con preguntas y pistas.
- Si su código tiene un error, señala dónde mirar y por qué falla.
- Respuestas breves (máximo unas 150 palabras) salvo que pida más detalle. Usa bloques de código cortos si ayudan.
- Si viene al caso, dile cómo lo explicaría en voz alta en una entrevista.

Contexto actual:
${contexto()}`;

      c.historialIA.push({ role: 'user', content: texto });
      try {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-api-key': Store.estado.ajustes.apiKey,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true'
          },
          body: JSON.stringify({
            model: Store.estado.ajustes.modelo || 'claude-haiku-5-5',
            max_tokens: 900,
            system: sistema,
            messages: c.historialIA.slice(-12)  // últimos mensajes, para no gastar de más
          })
        });
        const datos = await res.json();
        if (!res.ok) throw new Error(res.status === 401 ? 'La clave de API no es válida. Revísala en Ajustes.' : (datos.error && datos.error.message) || 'Error ' + res.status);
        const respuesta = datos.content.filter(b => b.type === 'text').map(b => b.text).join('\n');
        c.historialIA.push({ role: 'assistant', content: respuesta });
        pensando.innerHTML = markdown(respuesta);
        c.mensajes[c.mensajes.length - 1].html = pensando.innerHTML;
      } catch (err) {
        c.historialIA.pop();
        pensando.innerHTML = '<p>No he podido conectar con Claude: ' + escapar(err.message) + '</p>';
        c.mensajes[c.mensajes.length - 1].html = pensando.innerHTML;
      }
      pensando.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /* --- Arranque: repinta la conversación o saluda --- */
    if (c.mensajes.length) {
      c.mensajes.forEach(pintar);
      // Los botones dentro de mensajes antiguos no conservan su función: los quitamos
      chat.querySelectorAll('.burbuja .acciones-tutor').forEach(b => b.remove());
    } else {
      tutorDice(`<p>¡Hola${escapar(nombre)}! 👋 Soy tu tutor para <strong>${escapar(ex.titulo)}</strong>.</p>
        <p>Te guío paso a paso: tú escribes el código y yo te doy pistas cuando las necesites. Pulsa <strong>Empezar</strong> cuando quieras.</p>`);
    }
    botones();

    return { pedirExplicacionFallo: () => { porQueFalla(); botones(); }, refrescar: botones };
  }

  return { montar };
})();
