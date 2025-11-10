const tramo1 = new Tramo(
  ["CARRIL2", "CARRIL3"],
  ["CARRIL2", "CARRIL3"],
  ["CARRIL2", "CARRIL3"]
);
const tramo2 = new Tramo(["CARRIL1"], ["CARRIL1"], ["CARRIL1"]);
const tramo3 = new Tramo(
  ["CARRIL1", "CARRIL2"],
  ["CARRIL1", "CARRIL2"],
  ["CARRIL1", "CARRIL2"]
);
const tramo4 = new Tramo(["CARRIL2"], ["CARRIL2"], ["CARRIL2"]);
const tramo15 = new Tramo(["CARRIL2"], ["CARRIL2"], ["CARRIL2"]);

const tramo5 = new Tramo(
  ["CARRIL3", "CARRIL1"],
  ["CARRIL3", "CARRIL1"],
  ["CARRIL3", "CARRIL1"]
);
const tramo6 = new Tramo(["CARRIL1"], ["CARRIL1"], ["CARRIL1"]);
const tramo7 = new Tramo(["CARRIL2"], ["CARRIL2"], ["CARRIL2"]);
const tramo8 = new Tramo(
  ["CARRIL3", "CARRIL2"],
  ["CARRIL3", "CARRIL2"],
  ["CARRIL3", "CARRIL2"]
);
const tramo9 = new Tramo(
  ["CARRIL1", "CARRIL2"],
  ["CARRIL1", "CARRIL2"],
  ["CARRIL1", "CARRIL2"]
);
const tramo17 = new Tramo(
  ["CARRIL1", "CARRIL2"],
  ["CARRIL1", "CARRIL2"],
  ["CARRIL1", "CARRIL2"]
);

const tramo10 = new Tramo(["CARRIL3"], ["CARRIL3"], ["CARRIL3"]);
const tramo11 = new Tramo(
  ["CARRIL3", "CARRIL1"],
  ["CARRIL3", "CARRIL1"],
  ["CARRIL3", "CARRIL1"]
);
const tramo12 = new Tramo(["CARRIL2"], ["CARRIL2"], ["CARRIL2"]);
const tramo13 = new Tramo(
  ["CARRIL1", "CARRIL3"],
  ["CARRIL1", "CARRIL3"],
  ["CARRIL1", "CARRIL3"]
);
const tramo14 = new Tramo(
  ["CARRIL3", "CARRIL2"],
  ["CARRIL3", "CARRIL2"],
  ["CARRIL3", "CARRIL2"]
);
//control de tramos (es bien basico pero funciona)
//en cada array del tramo se pone donde estan lso obstaculos
const tramos = [
  tramo1,
  tramo2,
  tramo3,
  tramo4,
  tramo15,
  tramo5,
  tramo6,
  tramo7,
  tramo8,
  tramo9,
  tramo17,
  tramo10,
  tramo11,
  tramo12,
  tramo13,
  tramo14,
];

let currentLevel = 1;
let currentLevelStartTramo = 0;

//estas son las variables que controlan la velocidad a la que se mueven los obstaculos
let obstacleSpeed = 5; // pixeles que se mueven por frame (mas alto = mas rapido)
let animationInterval = 50; // milisegundos entre frames (mas bajo = mas fluido/rapido)

const car = document.getElementById("car");
const obstacles = [
  document.getElementById("ob1"),
  document.getElementById("ob2"),
  document.getElementById("ob3"),
];

let currentLane = "CARRIL2";
let tramo = 0;
let gameOver = false;
let gameWon = false;

function updateLevelDisplay() {
  const levelDisplay = document.getElementById("level-display");
  if (levelDisplay) {
    levelDisplay.textContent = `Nivel: ${currentLevel}`;
  }
}

function moveCar(lane) {
  if (gameOver) return;
  currentLane = lane;
  const x = { CARRIL1: 10, CARRIL2: 110, CARRIL3: 210 }[lane];
  car.style.left = x + "px";
}
function nextTramo() {
  if (
    (currentLevel === 1 && tramo >= 4) ||
    (currentLevel === 2 && tramo >= 9) ||
    (currentLevel === 3 && tramo >= 14)
  ) {
    //para control de niveles (hardcodeado)
    if (currentLevel === 3) {
      gameWin();
      return;
    } else {
      currentLevel++;
      if (currentLevel === 2) {
        tramo = 4;
      } else if (currentLevel === 3) {
        tramo = 9;
      }
      updateLevelDisplay();
      updateGameSpeed(); // actualizar velocidad al cambiar de nivel
    }
  }

  if (tramo < tramos.length) {
    setObstacles(tramos[tramo].getTramo(currentLane));
    animateObstacles();
  } else {
    gameWin();
    return;
  }
}
//en cada paso se cambia la posiciones de los obstaculos
function setObstacles(blockedLanes) {
  const positions = { CARRIL1: 10, CARRIL2: 110, CARRIL3: 210 };

  ["CARRIL1", "CARRIL2", "CARRIL3"].forEach((lane, i) => {
    const ob = obstacles[i];
    ob.style.left = positions[lane] + "px";
    if (blockedLanes.includes(lane)) {
      ob.style.top = "-50px";
      ob.dataset.active = "true";
    } else {
      ob.style.top = "-500px";
      ob.dataset.active = "false";
    }
  });
}
//animacion de como van bajando los obstaculos
function animateObstacles() {
  let y = -50;
  const interval = setInterval(() => {
    if (gameOver) {
      clearInterval(interval);
      return;
    }

    y += obstacleSpeed; // usar la variable configurable
    obstacles.forEach((o) => {
      const currentTop = parseInt(o.style.top);
      if (currentTop > -500) {
        o.style.top = y + "px";
      }
    });

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
  }, animationInterval); // usar la variable configurable
}

function lose() {
  gameOver = true;
  showGameOverScreen();
}

function gameWin() {
  gameWon = true;
  showWinScreen();
}

function showGameOverScreen() {
  const gameOverScreen = document.getElementById("game-over-screen");
  const gameOverLevel = document.getElementById("game-over-level");
  const restartBtn = document.getElementById("restart-btn");
  const quitBtn = document.getElementById("quit-btn");

  gameOverLevel.textContent = `Nivel: ${currentLevel}`;

  gameOverScreen.style.display = "flex";

  restartBtn.onclick = () => {
    gameOverScreen.style.display = "none";
    restartCurrentLevel();
  };

  quitBtn.onclick = () => {
    gameOverScreen.style.display = "none";
    finalizeGame();
  };
}

function showWinScreen() {
  const winScreen = document.getElementById("win-screen");
  const winQuitBtn = document.getElementById("win-quit-btn");

  winScreen.style.display = "flex";

  winQuitBtn.onclick = () => {
    winScreen.style.display = "none";
    finalizeGame();
  };
}

function restartCurrentLevel() {
  gameOver = false;
  gameWon = false;

  if (currentLevel === 1) {
    tramo = 0;
  } else if (currentLevel === 2) {
    tramo = 4;
  } else if (currentLevel === 3) {
    tramo = 9;
  }

  currentLane = "CARRIL2";
  moveCar("CARRIL2");
  nextTramo();
}

function finalizeGame() {
  gameOver = true;
  gameWon = true;
  setTimeout(() => {
    alert("¡Gracias por jugar!");
    location.reload();
  }, 500);
}

function initGame() {
  currentLevel = 1;
  currentLevelStartTramo = 0;
  updateGameSpeed();
  updateLevelDisplay();
  moveCar("CARRIL2");
  nextTramo();
}

// funcion para ajustar la velocidad segun el nivel
function updateGameSpeed() {
  switch (currentLevel) {
    case 1:
      obstacleSpeed = 5; // velocidad normal
      animationInterval = 50; // intervalo normal
      break;
    case 2:
      obstacleSpeed = 7; // un poco más rápido
      animationInterval = 45; // intervalo un poco menor
      break;
    case 3:
      obstacleSpeed = 9; // mas rapido
      animationInterval = 40; // Intervalo menor
      break;
  }
}

function setGameSpeed(speed, interval) {
  obstacleSpeed = speed;
  animationInterval = interval;
  console.log(
    `Velocidad cambiada: ${speed} píxeles, ${interval}ms de intervalo`
  );
}

initGame();
