// === Диагностика и мини-игры ===

const Diagnostics = {
  async runDiagnostic(duration = 5000) {
    console.log("[СИСТЕМА]: диагностика активна...");
    UI.showSystemOverlay("[СИСТЕМА]: проводится диагностический тест...");
    await new Promise(r => setTimeout(r, duration));
    UI.hideSystemOverlay();
  },

  async runNeuroScan(duration = 5000) {
    console.log("[СИСТЕМА]: сканирование нейросети...");
    UI.showSystemOverlay("[СИСТЕМА]: выполняется сканирование нейросети...");
    await new Promise(r => setTimeout(r, duration));
    UI.hideSystemOverlay();
  },

  async sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
  }
};
