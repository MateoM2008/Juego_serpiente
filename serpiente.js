
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
      pintarParte(parteSErpiente.x, parteSErpiente.y,"#036E09")
    }else{
      parteSErpiente = serpiente[i];
      pintarParte(parteSErpiente.x, parteSErpiente.y,"#27F531")
    }
  }
}