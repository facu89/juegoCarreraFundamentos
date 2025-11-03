const tramo1 = new Tramo([""], ["CARRIL1", "CARRIL3"], [""]);
const tramo2 = new Tramo([""], ["CARRIL2"], [""]);
const tramo3 = new Tramo(["CARRIL1", "CARRIL2"], [""], ["CARRIL1"]);

const tramos = [tramo1, tramo2, tramo3];
const car = document.getElementById("car");
const obstacles = [
  document.getElementById("ob1"),
  document.getElementById("ob2"),
  document.getElementById("ob3"),
];

let currentLane = "CARRIL2";
let tramo = 0;
let gameOver = false;

function moveCar(lane) {
  if (gameOver) return;
  currentLane = lane;
  const x = { CARRIL1: 10, CARRIL2: 110, CARRIL3: 210 }[lane];
  car.style.left = x + "px";
}
//aca seteo los obstaculos de forma dinamica. Ahora esta medio hardcodeado
//habria que definir arreglos, con diferentes tramos dependiendo de los osbtaculos que eligamos
function nextTramo() {
  if (tramo < tramos.length) {
    setObstacles(tramos[tramo].getTramo(currentLane));
    animateObstacles();
  } else {
    win();
    return;
  }
}

function setObstacles(blockedLanes) {
  const positions = { CARRIL1: 10, CARRIL2: 110, CARRIL3: 210 };

  ["CARRIL1", "CARRIL2", "CARRIL3"].forEach((lane, i) => {
    const ob = obstacles[i];
    ob.style.left = positions[lane] + "px";
    if (blockedLanes.includes(lane)) {
      ob.style.top = "-50px";
      ob.dataset.active = "true"; // Marca el obstáculo como activo
    } else {
      ob.style.top = "-500px";
      ob.dataset.active = "false"; // Marca el obstáculo como inactivo
    }
  });
}

function animateObstacles() {
  let y = -50;
  const interval = setInterval(() => {
    if (gameOver) {
      clearInterval(interval);
      return;
    }

    y += 5;
    obstacles.forEach((o) => {
      // Solo mueve los obstáculos que están activos (no en posición -500px)
      const currentTop = parseInt(o.style.top);
      if (currentTop > -500) {
        o.style.top = y + "px";
      }
    });

    // Colisión si obstáculo y auto en mismo carril y mismo nivel
    obstacles.forEach((o, index) => {
      const obTop = parseInt(o.style.top);
      const obLeft = parseInt(o.style.left);
      const carLeft = parseInt(car.style.left);
      const isActive = o.dataset.active === "true";

      if (y % 50 === 0) {
      }

      if (isActive && obTop > 280 && obTop < 380 && obLeft === carLeft) {
        lose();
        clearInterval(interval);
      }
    });

    if (y > 400) {
      clearInterval(interval);
      tramo++;
      nextTramo();
    }
  }, 50);
}

function lose() {
  gameOver = true;
  alert("Chocaste! Fin del juego");
}

function win() {
  gameOver = true;
  alert("Ganaste la carrera!");
}

// Inicializar el juego
function initGame() {
  moveCar("CARRIL2");
  nextTramo();
}

initGame();
