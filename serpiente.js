
// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 25;



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
  pintarParte(5, 5);
  pintarParte(10, 2);
  pintarParte(10, 23);
  pintarParte(23, 10);
  pintarParte(0, 10);
  pintarParte(23, 23);
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

function pintarParte(lineaX, lineaY) {
  let horizontal = lineaX * TAMANIO_CELDA
  let vertical = lineaY * TAMANIO_CELDA
  ctx.fillStyle = "#27F531";
  ctx.fillRect(horizontal, vertical, TAMANIO_CELDA, TAMANIO_CELDA)
  ctx.strokeStyle="#4FFF3D"
ctx.strokeRect(horizontal, vertical, TAMANIO_CELDA, TAMANIO_CELDA)
}