// === Мини-игры и диагностика системы ===

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

// Простая утилита для работы с системными оверлеями
const UI = {
  showSystemOverlay(message) {
    let overlay = document.querySelector(".system-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "system-overlay";
      document.body.appendChild(overlay);
    }
    overlay.textContent = message;
    overlay.classList.add("show");
  },
  hideSystemOverlay() {
    const overlay = document.querySelector(".system-overlay");
    if (overlay) overlay.classList.remove("show");
  },
  logMessage(type) {
    console.log(`[СИСТЕМА]: выбор — ${type}`);
  }
};
