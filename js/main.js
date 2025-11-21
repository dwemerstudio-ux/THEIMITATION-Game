window.GameState = {
  hb: 0,
  rb: 0,
  round: 0,
  total: 10,
  active: false
};

// старт симуляции
function startGame() {
  GameState.round = 0;
  GameState.active = true;
  document.getElementById("intro").classList.add("hidden");
  nextScene();
}

// запуск одной сцены
async function nextScene() {
  const sceneNum = GameState.round + 1;
  const sceneEl = document.getElementById("scene");
  const textEl = document.getElementById("sceneText");
  const btnsEl = document.getElementById("sceneButtons");

  // очистка старой сцены
  textEl.innerHTML = "";
  btnsEl.innerHTML = "";

  // промежуточные мини-игры
  if ([3, 6, 8].includes(sceneNum)) {
    await Diagnostics.runDiagnostic();
    await Diagnostics.runNeuroScan();
  }

  sceneEl.classList.remove("hidden");
  document.getElementById("sceneTitle").textContent = `Дилемма №${sceneNum}`;
  textEl.textContent = `Это дилемма №${sceneNum}. Сделай моральный выбор.`;

  // создаём кнопки выбора
  const btnHuman = document.createElement("button");
  btnHuman.textContent = "Выбрать человечность";
  btnHuman.onclick = async () => {
    UI.logMessage("human");
    GameState.hb++;
    await endScene();
  };

  const btnRobot = document.createElement("button");
  btnRobot.textContent = "Выбрать рациональность";
  btnRobot.onclick = async () => {
    UI.logMessage("robot");
    GameState.rb++;
    await endScene();
  };

  btnsEl.append(btnHuman, btnRobot);
}

// завершение сцены и переход к следующей
async function endScene() {
  GameState.round++;
  if (GameState.round >= GameState.total) {
    finishGame();
  } else {
    // даём игроку увидеть сообщение
    await Diagnostics.sleep(1000);
    nextScene();
  }
}

// финал
function finishGame() {
  UI.showSystemOverlay("[СИСТЕМА]: симуляция завершена.");
  document.getElementById("scene").classList.add("hidden");
}
