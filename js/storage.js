/* =========================================================
   STORAGE: guarda tu progreso en el navegador (localStorage)
   Todo vive en un único objeto "estado" que se guarda como JSON.
   ========================================================= */
window.Store = (function () {
  const CLAVE = 'retojunior-v1';

  /* ---------- Estado por defecto ---------- */
  function estadoInicial() {
    return {
      nombre: '',
      bienvenida: false,     // ¿ya vio la pantalla de bienvenida?
      ej: {},                // progreso de cada ejercicio, por id
      tarjetas: {},          // repaso: { id: { caja, proxima } }
      racha: { ultimo: null, dias: 0 },
      ultimoEjercicio: null,
      ajustes: { tema: 'auto', apiKey: '', modelo: 'claude-haiku-5-5' }
    };
  }

  /* ---------- Cargar (con protección por si falla) ---------- */
  let estado;
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE));
    // Mezclamos con el inicial por si añadimos campos nuevos en el futuro
    estado = Object.assign(estadoInicial(), guardado || {});
    estado.ajustes = Object.assign(estadoInicial().ajustes, estado.ajustes || {});
  } catch (e) {
    estado = estadoInicial();
  }

  /* ---------- Guardar ---------- */
  function guardar() {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(estado));
    } catch (e) {
      console.warn('No se pudo guardar el progreso', e);
    }
  }

  /* ---------- Fecha de hoy como "2026-11-25" ---------- */
  function hoy() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  /* ---------- Racha de días seguidos practicando ---------- */
  function registrarActividad() {
    const h = hoy();
    const r = estado.racha;
    if (r.ultimo === h) return;              // ya contó hoy
    const ayer = new Date(); ayer.setDate(ayer.getDate() - 1);
    const ayerTxt = ayer.getFullYear() + '-' + String(ayer.getMonth() + 1).padStart(2, '0') + '-' + String(ayer.getDate()).padStart(2, '0');
    r.dias = (r.ultimo === ayerTxt) ? r.dias + 1 : 1;
    r.ultimo = h;
    guardar();
  }

  function rachaActual() {
    const r = estado.racha;
    if (!r.ultimo) return 0;
    const ayer = new Date(); ayer.setDate(ayer.getDate() - 1);
    const ayerTxt = ayer.getFullYear() + '-' + String(ayer.getMonth() + 1).padStart(2, '0') + '-' + String(ayer.getDate()).padStart(2, '0');
    // Si el último día no fue ni hoy ni ayer, la racha se perdió
    return (r.ultimo === hoy() || r.ultimo === ayerTxt) ? r.dias : 0;
  }

  /* ---------- Progreso de un ejercicio ---------- */
  function ej(id) {
    if (!estado.ej[id]) {
      estado.ej[id] = { estado: 'pendiente', codigo: null, notas: '', enlace: '', pistas: 0, intentos: 0, solucionVista: false, criterios: [] };
    }
    return estado.ej[id];
  }

  function actualizarEj(id, cambios) {
    Object.assign(ej(id), cambios);
    guardar();
  }

  /* ---------- Exportar / importar (para pasar el progreso a otro dispositivo) ---------- */
  function exportar() {
    // Copia sin la clave de API (es privada y no debe viajar en archivos)
    const copia = JSON.parse(JSON.stringify(estado));
    copia.ajustes.apiKey = '';
    return JSON.stringify({ app: 'reto-junior', version: 1, fecha: new Date().toISOString(), datos: copia }, null, 2);
  }

  function importar(texto) {
    const obj = JSON.parse(texto);
    if (!obj || obj.app !== 'reto-junior' || !obj.datos) throw new Error('Este archivo no es una copia de Reto Junior');
    // Nunca importamos la clave de API: se queda en cada dispositivo
    const clave = estado.ajustes.apiKey;
    estado = Object.assign(estadoInicial(), obj.datos);
    estado.ajustes = Object.assign(estadoInicial().ajustes, obj.datos.ajustes || {}, { apiKey: clave });
    guardar();
  }

  function borrarTodo() {
    estado = estadoInicial();
    estado.bienvenida = true;
    guardar();
  }

  return {
    get estado() { return estado; },
    guardar, ej, actualizarEj, registrarActividad, rachaActual,
    exportar, importar, borrarTodo, hoy
  };
})();
