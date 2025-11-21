// main.js
window.GameState = { hb: 0, rb: 0, round: 0 };

async function startNextScene() {
  const scene = GameState.round + 1;

  // Запуск диагностических тестов перед 3,6,8 сценами
  if ([3, 6, 8].includes(scene)) {
    await Diagnostics.runDiagnostic();
    await Diagnostics.runNeuroScan();
  }

  // имитация сцены
  UI.showSystemOverlay(`[СЦЕНА ${scene}]: требуется моральное решение...`);
  await Diagnostics.sleep(2000);
  UI.logMessage(Math.random() > 0.5 ? "human" : "robot");

  GameState.round++;
  if (GameState.round < 10) startNextScene();
  else UI.showSystemOverlay("[СИСТЕМА]: симуляция завершена.");
}

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => startNextScene(), 1000);
});
