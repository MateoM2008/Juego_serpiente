
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


let velocidad = 300;
let gameOver = false;

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

    if (direccion == "arriba" && direccionActual == "abajo") return;
    if (direccion == "abajo" && direccionActual == "arriba") return;
    if (direccion == "izquierda" && direccionActual == "derecha") return;
    if (direccion == "derecha" && direccionActual == "izquierda") return;

    direccionActual = direccion;

}

function moverSerpiente() {

    if (direccionActual == "derecha") {
        moverDerecha();
    } else if (direccionActual == "izquierda") {
        moverIzquierda();
    } else if (direccionActual == "arriba") {
        moverArriba();
    } else if (direccionActual == "abajo") {
        moverAbajo();
    }

    if (verificarGameOver()) {
        return;
    }

    if (atrapaComida()) {

        let cola = serpiente[serpiente.length - 1];

        serpiente.push({
            x: cola.x,
            y: cola.y
        });

        document.getElementById("puntaje").textContent =
            Number(document.getElementById("puntaje").textContent) + 1;

        generarComida();

        // Aumenta velocidad cada 5 puntos
        if (Number(document.getElementById("puntaje").textContent) % 5 == 0 && velocidad > 80) {

            velocidad -= 20;

            clearInterval(intervaloSerpiente);
            intervaloSerpiente = setInterval(moverSerpiente, velocidad);

        }

    }

    dibujarTodo();

}

function iniciarJuego() {

    if (gameOver) return;

    if (intervaloSerpiente != null) return;

    document.getElementById("estado").textContent = "Jugando";
    document.getElementById("mensaje").textContent = "¡Buena suerte!";

    intervaloSerpiente = setInterval(moverSerpiente, velocidad);

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

    let posicionValida = false;

    while (!posicionValida) {

        comida.x = Math.floor(Math.random() * (canvas.width / TAMANIO_CELDA));
        comida.y = Math.floor(Math.random() * (canvas.height / TAMANIO_CELDA));

        posicionValida = true;

        for (let i = 0; i < serpiente.length; i++) {

            if (
                serpiente[i].x == comida.x &&
                serpiente[i].y == comida.y
            ) {
                posicionValida = false;
                break;
            }

        }

    }

}

function reiniciarJuego() {

    pausarJuego();

    gameOver = false;

    velocidad = 300;

    serpiente.length = 0;

    serpiente.push(
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 },
        { x: 2, y: 5 },
        { x: 1, y: 5 }
    );

    direccionActual = "derecha";

    document.getElementById("puntaje").textContent = "0";
    document.getElementById("estado").textContent = "Listo";
    document.getElementById("mensaje").textContent = "Presiona Iniciar para comenzar.";

    generarComida();

    dibujarTodo();

}

function verificarGameOver() {

    let cabeza = serpiente[0];

    let maxX = canvas.width / TAMANIO_CELDA;
    let maxY = canvas.height / TAMANIO_CELDA;

    // Choca con los bordes
    if (
        cabeza.x < 0 ||
        cabeza.y < 0 ||
        cabeza.x >= maxX ||
        cabeza.y >= maxY
    ) {

        gameOver = true;
        pausarJuego();

        document.getElementById("estado").textContent = "GAME OVER";
        document.getElementById("mensaje").textContent = "💀 Has perdido.";

        return true;
    }

    // Choca con su propio cuerpo
    for (let i = 1; i < serpiente.length; i++) {

        if (
            cabeza.x == serpiente[i].x &&
            cabeza.y == serpiente[i].y
        ) {

            gameOver = true;
            pausarJuego();

            document.getElementById("estado").textContent = "GAME OVER";
            document.getElementById("mensaje").textContent = "💀 Has perdido.";

            return true;
        }
    }

    return false;
}