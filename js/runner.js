/* =========================================================
   RUNNER: ejecuta tu código y lo comprueba
   - js:   en un Web Worker (si hay un bucle infinito, se corta)
   - web:  en un iframe (vista previa) + checks sobre el documento
   - css:  igual que web, pero con el HTML fijo del ejercicio
   - sql:  SQLite dentro del navegador (sql.js)
   Todas devuelven: { ok, resultados: [{ t, ok, detalle }], logs, error }
   ========================================================= */
window.Runner = (function () {

  /* ---------- Comparar dos valores (sin importar el orden de las claves) ---------- */
  function iguales(a, b) {
    if (a === b) return true;
    if (typeof a === 'number' && typeof b === 'number') return Math.abs(a - b) < 1e-9;
    if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) return false;
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    const ka = Object.keys(a), kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    return ka.every(k => iguales(a[k], b[k]));
  }

  /* ---------- Mostrar un valor de forma legible ---------- */
  function mostrar(v) {
    if (v === undefined) return 'undefined';
    if (typeof v === 'string') return '"' + v + '"';
    try { return JSON.stringify(v); } catch (e) { return String(v); }
  }

  /* =========================================================
     JAVASCRIPT (Web Worker)
     ========================================================= */
  function ejecutarJS(ex, codigo) {
    return new Promise(resolve => {
      // Construimos el programa: datos de prueba + tu código + los tests
      const tests = ex.tests.map((t, i) =>
        `try { __r[${i}] = { v: await (async () => (${t.e}))() }; } catch (e) { __r[${i}] = { err: e.message }; }`
      ).join('\n');

      const fuente = `
        const __logs = [];
        const console = { log: (...a) => __logs.push(a.map(x => typeof x === 'string' ? x : JSON.stringify(x)).join(' ')),
                          error: (...a) => __logs.push('⚠️ ' + a.join(' ')), warn: (...a) => __logs.push('⚠️ ' + a.join(' ')) };
        ${ex.fixture || ''}
        ${codigo}
        ;(async () => {
          const __r = [];
          ${tests}
          postMessage({ r: __r, logs: __logs });
        })();`;

      const blob = new Blob([fuente], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      const worker = new Worker(url);

      // Si tarda más de 3 segundos, seguramente hay un bucle infinito
      const limite = setTimeout(() => {
        worker.terminate();
        resolve({ ok: false, resultados: [], logs: [], error: 'Tu código tardó demasiado. ¿Hay un bucle infinito? (revisa la condición de tus for/while)' });
      }, 3000);

      worker.onmessage = (m) => {
        clearTimeout(limite); worker.terminate(); URL.revokeObjectURL(url);
        const resultados = ex.tests.map((t, i) => {
          const r = m.data.r[i] || {};
          if (r.err) return { t: t.t || t.e, ok: false, detalle: 'Error: ' + r.err };
          const ok = iguales(r.v, t.r);
          return { t: t.t || t.e, ok, detalle: ok ? '→ ' + mostrar(r.v) : 'Esperaba ' + mostrar(t.r) + ', pero dio ' + mostrar(r.v) };
        });
        resolve({ ok: resultados.every(r => r.ok), resultados, logs: m.data.logs });
      };

      // Errores de sintaxis (por ejemplo, una llave de más)
      worker.onerror = (e) => {
        e.preventDefault();
        clearTimeout(limite); worker.terminate(); URL.revokeObjectURL(url);
        resolve({ ok: false, resultados: [], logs: [], error: traducirError(e.message) });
      };
    });
  }

  /* Pequeñas traducciones de errores frecuentes */
  function traducirError(msg) {
    if (!msg) return 'Hay un error en el código.';
    const pistas = [
      [/Unexpected end of input/i, 'Falta cerrar algo: una llave }, un paréntesis ) o unas comillas.'],
      [/Unexpected token/i, 'Hay un símbolo donde no toca: revisa llaves, paréntesis y comas.'],
      [/is not defined/i, 'Usas una variable o función que no existe (¿está bien escrita?).'],
      [/Identifier '(.+)' has already been declared/i, 'Has declarado dos veces la misma variable o función.'],
      [/Missing initializer in const/i, 'Una const necesita un valor al declararla: const x = …'],
      [/Invalid or unexpected token/i, 'Hay un carácter raro. ¿Comillas “curvas” del móvil? Usa comillas rectas " o \'.']
    ];
    const p = pistas.find(([re]) => re.test(msg));
    return msg + (p ? '\n💡 ' + p[1] : '');
  }

  /* =========================================================
     WEB y CSS (iframe con vista previa)
     ========================================================= */
  function documentoCSS(ex, css) {
    return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>${css}</style></head><body>${ex.html}</body></html>`;
  }

  // Script que captura errores del código del usuario dentro del iframe
  const CAPTURA = '<script>window.onerror=function(m){try{parent.__erroresVista&&parent.__erroresVista.push(m)}catch(e){}};<\/script>';

  function inyectarCaptura(html) {
    if (/<head[^>]*>/i.test(html)) return html.replace(/<head[^>]*>/i, m => m + CAPTURA);
    if (/<html[^>]*>/i.test(html)) return html.replace(/<html[^>]*>/i, m => m + CAPTURA);
    if (/<!doctype[^>]*>/i.test(html)) return html.replace(/<!doctype[^>]*>/i, m => m + CAPTURA);
    return CAPTURA + html;
  }

  // Espera a que el navegador repinte (dos fotogramas)
  const esperarPintado = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

  function ejecutarWeb(ex, codigo, contenedor) {
    return new Promise(resolve => {
      const esCSS = ex.runner === 'css';
      const html = esCSS ? documentoCSS(ex, codigo) : codigo;
      window.__erroresVista = [];

      // Creamos un iframe nuevo cada vez (así el código anterior no interfiere)
      contenedor.innerHTML = '';
      const marco = document.createElement('iframe');
      marco.className = 'vista-previa';
      marco.title = 'Vista previa de tu código';
      contenedor.appendChild(marco);

      let terminado = false;
      marco.onload = async () => {
        if (terminado) return;
        terminado = true;
        await esperarPintado();
        await new Promise(r => setTimeout(r, 60)); // deja cargar fuentes/estilos

        const d = marco.contentDocument;
        const w = marco.contentWindow;

        // Ayudas para los checks
        const ctx = {
          cssTexto: esCSS ? codigo : [...d.querySelectorAll('style')].map(s => s.textContent).join('\n'),
          // Cambia el ancho de la vista previa para probar el responsive
          ancho: (px) => { marco.style.width = px ? px + 'px' : ''; void d.body.offsetHeight; void marco.offsetWidth; },
          // ¿Este campo tiene un label conectado?
          tieneLabel: (el) => (el.id && d.querySelector('label[for="' + el.id + '"]')) || el.closest('label') || el.getAttribute('aria-label')
        };

        const resultados = [];
        for (const c of ex.checks) {
          let ok = false, detalle = '';
          try { ok = !!(await c.f(d, w, ctx)); }
          catch (e) { detalle = 'No se pudo comprobar: ' + e.message; }
          resultados.push({ t: c.t, ok, detalle });
        }
        ctx.ancho(null); // vuelve al ancho normal

        const errores = window.__erroresVista || [];
        resolve({
          ok: resultados.every(r => r.ok) && errores.length === 0,
          resultados,
          logs: errores.map(e => '⚠️ ' + e),
          error: errores.length ? 'Tu JavaScript tiene un error: ' + traducirError(errores[0]) : null
        });
      };

      marco.srcdoc = inyectarCaptura(html);
    });
  }

  /* Vista previa sin comprobar (al escribir) */
  function vistaPrevia(ex, codigo, contenedor) {
    const html = ex.runner === 'css' ? documentoCSS(ex, codigo) : codigo;
    let marco = contenedor.querySelector('iframe');
    if (!marco) {
      marco = document.createElement('iframe');
      marco.className = 'vista-previa';
      marco.title = 'Vista previa de tu código';
      contenedor.appendChild(marco);
    }
    marco.srcdoc = inyectarCaptura(html);
  }

  /* =========================================================
     SQL (sql.js: SQLite en el navegador)
     ========================================================= */
  let promesaSQL = null;
  function cargarSQL() {
    if (!promesaSQL) {
      promesaSQL = new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'vendor/sql-wasm.js';
        s.onload = () => window.initSqlJs({ locateFile: f => 'vendor/' + f }).then(resolve, reject);
        s.onerror = () => reject(new Error('No se pudo cargar el motor SQL'));
        document.head.appendChild(s);
      });
      promesaSQL.catch(() => { promesaSQL = null; });
    }
    return promesaSQL;
  }

  // Ejecuta SQL en una base de datos nueva y devuelve la última tabla de resultados
  function consultar(SQL, ex, sql) {
    const db = new SQL.Database();
    try {
      db.exec(window[ex.setup]);
      let res = db.exec(sql);
      if (ex.verificar) res = db.exec(ex.verificar);
      const ultima = res[res.length - 1] || { columns: [], values: [] };
      return ultima;
    } finally {
      db.close();
    }
  }

  // Normaliza una fila para comparar (redondea decimales)
  const fila = f => JSON.stringify(f.map(v => typeof v === 'number' ? Math.round(v * 100) / 100 : v));

  async function ejecutarSQL(ex, codigo) {
    let SQL;
    try { SQL = await cargarSQL(); }
    catch (e) { return { ok: false, resultados: [], logs: [], error: 'No se pudo cargar SQLite. ¿Tienes conexión? Abre la app al menos una vez con internet.' }; }

    let tuya, esperada;
    try { tuya = consultar(SQL, ex, codigo); }
    catch (e) { return { ok: false, resultados: [], logs: [], error: 'Error de SQL: ' + e.message + '\n💡 Revisa comas entre columnas, comillas simples en los textos y el orden SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY.' }; }
    esperada = consultar(SQL, ex, ex.solucion);

    let a = tuya.values.map(fila), b = esperada.values.map(fila);
    if (!ex.orden) { a = [...a].sort(); b = [...b].sort(); }

    const resultados = [
      { t: 'Número de columnas', ok: tuya.columns.length === esperada.columns.length, detalle: 'Tienes ' + tuya.columns.length + ', se esperan ' + esperada.columns.length },
      { t: 'Número de filas', ok: a.length === b.length, detalle: 'Tienes ' + a.length + ', se esperan ' + b.length },
      { t: 'Los datos coinciden' + (ex.orden ? ' (y el orden)' : ''), ok: a.length === b.length && a.every((x, i) => x === b[i]), detalle: '' }
    ];
    return { ok: resultados.every(r => r.ok), resultados, logs: [], tabla: tuya, esperada };
  }

  return { ejecutarJS, ejecutarWeb, ejecutarSQL, vistaPrevia, cargarSQL, traducirError };
})();
