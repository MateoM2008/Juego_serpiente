
// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");


const TAMANIO_CELDA = 25;
const serpiente = [
  { x: 7, y: 6 },
  { x: 7, y: 5 },
  { x: 6, y: 5 },
  { x: 5, y: 5 }
];

let direccionActual = "derecha";
let intervaloSerpiente = null;

let comida = {
  x: 10,
  y: 10
};


// Primera pintura del juego al cargar la página
dibujarTodo();

// =========================
// FUNCIONES DE DIBUJO
// =========================

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarComida();
  pintarSerpiente();
}

function dibujarTablero() {
  ctx.strokeStyle = "#005701";
  // Líneas verticales
  for (let x = 0; x <= canvas.width; x += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  // Líneas horizontales
  for (let y = 0; y <= canvas.height; y += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function pintarParte(lineaX, lineaY, color) {
  let horizontal = lineaX * TAMANIO_CELDA
  let vertical = lineaY * TAMANIO_CELDA
  ctx.fillStyle = color;
  ctx.fillRect(horizontal, vertical, TAMANIO_CELDA, TAMANIO_CELDA)
  ctx.strokeStyle = "#fefefe"
  ctx.strokeRect(horizontal, vertical, TAMANIO_CELDA, TAMANIO_CELDA)
}

function pintarSerpiente() {
  let parteSErpiente;
  for (let i = 0; i < serpiente.length; i++) {
    if (i == 0) {
      parteSErpiente = serpiente[i];
      pintarParte(parteSErpiente.x, parteSErpiente.y, "#036E09")
    } else {
      parteSErpiente = serpiente[i];
      pintarParte(parteSErpiente.x, parteSErpiente.y, "#27F531")
    }
  }
}

function moverDerecha() {
  let cabeza = serpiente[0];
  let nuevaCabeza = {
    x: cabeza.x + 1,
    y: cabeza.y
  };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverIzquierda() {
  let cabeza = serpiente[0];
  let nuevaCabeza = {
    x: cabeza.x - 1,
    y: cabeza.y
  };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverArriba() {
  let cabeza = serpiente[0];
  let nuevaCabeza = {
    x: cabeza.x,
    y: cabeza.y - 1
  };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}
function moverAbajo() {
  let cabeza = serpiente[0];
  let nuevaCabeza = {
    x: cabeza.x,
    y: cabeza.y + 1
  };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function cambiarDireccion(direccion) {
  direccionActual = direccion;
}

function moverSerpiente() {
  if (direccionActual == "derecha") {
    moverDerecha();
  }
  if (direccionActual == "izquierda") {
    moverIzquierda();
  }
  if (direccionActual == "arriba") {
    moverArriba();
  }
  if (direccionActual == "abajo") {
    moverAbajo();
  }
  if (atrapaComida()) {
    let cola = serpiente[serpiente.length - 1];
    serpiente.push({
      x: cola.x,
      y: cola.y
    });
    let puntaje = document.getElementById("puntaje");
    puntaje.textContent = parseInt(puntaje.textContent) + 1;
    generarComida();
  }
  dibujarTodo();
}

function iniciarJuego() {
  if (intervaloSerpiente == null) {
    document.getElementById("estado").textContent = "Jugando";
    intervaloSerpiente = setInterval(moverSerpiente, 300);
  }
}

function pausarJuego() {
  clearInterval(intervaloSerpiente);
  intervaloSerpiente = null;
  document.getElementById("estado").textContent = "Pausado";
}

function pintarComida() {
  pintarParte(comida.x, comida.y, "blue");
}

function atrapaComida() {
  let cabeza = serpiente[0];
  if (cabeza.x == comida.x && cabeza.y == comida.y) {
    return true;
  }
  return false;
}

function generarComida() {
  comida.x = Math.floor(Math.random() * (canvas.width / TAMANIO_CELDA));
  comida.y = Math.floor(Math.random() * (canvas.height / TAMANIO_CELDA));
}

function reiniciarJuego() {
  pausarJuego();
  serpiente.length = 0;

  serpiente.push(
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 },
    { x: 2, y: 5 },
    { x: 1, y: 5 }
  );
  direccionActual = "derecha";
  document.getElementById("puntaje").textContent = 0;
  generarComida();
  dibujarTodo();
  document.getElementById("estado").textContent = "Listo";
}