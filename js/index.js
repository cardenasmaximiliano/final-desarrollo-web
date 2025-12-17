
const CLAVE_STORAGE = "sscrew_lead";


const formulario = document.querySelector("#leadForm");
const alerta = document.querySelector("#formAlert");
const botonCargar = document.querySelector("#btnLoad");
const botonBorrar = document.querySelector("#btnClear");
const vistaGuardado = document.querySelector("#savedPreview");
const anio = document.querySelector("#year");

anio.textContent = new Date().getFullYear();


function mostrarAlerta(tipo, mensaje) {
  alerta.className = `alert ${tipo === "ok" ? "alert--ok" : "alert--warn"}`;
  alerta.textContent = mensaje;
  alerta.hidden = false;
}

function ocultarAlerta() {
  alerta.hidden = true;
  alerta.textContent = "";
  alerta.className = "alert";
}

function mostrarError(campo, mensaje) {
  const el = document.querySelector(`[data-error-for="${campo}"]`);
  if (el) el.textContent = mensaje || "";
}

function limpiarErrores() {
  mostrarError("nombre", "");
  mostrarError("email", "");
  mostrarError("objetivo", "");
  mostrarError("mensaje", "");
}


function guardarEnLocalStorage(datos) {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(datos));
}

function leerDeLocalStorage() {
  const raw = localStorage.getItem(CLAVE_STORAGE);
  return raw ? JSON.parse(raw) : null;
}

function borrarLocalStorage() {
  localStorage.removeItem(CLAVE_STORAGE);
}


function obtenerDatosDelFormulario() {
  const fd = new FormData(formulario);

  return {
    nombre: String(fd.get("nombre") || "").trim(),
    email: String(fd.get("email") || "").trim(),
    whats: String(fd.get("whats") || "").trim(),
    objetivo: String(fd.get("objetivo") || "").trim(),
    mensaje: String(fd.get("mensaje") || "").trim(),
    guardadoEn: new Date().toISOString(),
  };
}

function cargarDatosEnFormulario(datos) {
  if (!datos) return;

  formulario.nombre.value = datos.nombre || "";
  formulario.email.value = datos.email || "";
  formulario.whats.value = datos.whats || "";
  formulario.objetivo.value = datos.objetivo || "";
  formulario.mensaje.value = datos.mensaje || "";
}

function validar(datos) {
  let esValido = true;
  limpiarErrores();

  if (datos.nombre.length < 3) {
    mostrarError("nombre", "Ingresá un nombre válido (mínimo 3 caracteres).");
    esValido = false;
  }

  if (!datos.email.includes("@") || !datos.email.includes(".")) {
    mostrarError("email", "Ingresá un email válido.");
    esValido = false;
  }

  if (!datos.objetivo) {
    mostrarError("objetivo", "Seleccioná un objetivo.");
    esValido = false;
  }

  if (datos.mensaje.length < 10) {
    mostrarError("mensaje", "Escribí un mensaje (mínimo 10 caracteres).");
    esValido = false;
  }

  return esValido;
}


function actualizarVista(datos) {
  if (!vistaGuardado) return;

  if (!datos) {
    vistaGuardado.innerHTML = `<p class="savedBox__empty">Todavía no hay datos guardados.</p>`;
    return;
  }

  vistaGuardado.innerHTML = `
    <p class="savedRow"><strong>Nombre:</strong> ${datos.nombre}</p>
    <p class="savedRow"><strong>Email:</strong> ${datos.email}</p>
    <p class="savedRow"><strong>Whats:</strong> ${datos.whats || "—"}</p>
    <p class="savedRow"><strong>Objetivo:</strong> ${datos.objetivo}</p>
    <p class="savedRow"><strong>Mensaje:</strong> ${datos.mensaje}</p>
    <p class="savedRow"><strong>Guardado:</strong> ${new Date(datos.guardadoEn).toLocaleString()}</p>
  `;
}


actualizarVista(leerDeLocalStorage());


formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  ocultarAlerta();

  const datos = obtenerDatosDelFormulario();

  if (!validar(datos)) {
    mostrarAlerta("warn", "Revisá los campos marcados.");
    return;
  }

  guardarEnLocalStorage(datos);
  actualizarVista(datos);
  mostrarAlerta("ok", "Guardado en el local.");
});

botonCargar.addEventListener("click", () => {
  ocultarAlerta();

  const datos = leerDeLocalStorage();
  if (!datos) {
    mostrarAlerta("warn", "No hay datos guardados para cargar.");
    return;
  }

  cargarDatosEnFormulario(datos);
  actualizarVista(datos);
  mostrarAlerta("ok", "Datos cargados desde localStorage.");
});

botonBorrar.addEventListener("click", () => {
  ocultarAlerta();

  borrarLocalStorage();
  formulario.reset();
  actualizarVista(null);
  mostrarAlerta("ok", "Datos borrados del localStorage.");
});