// ui.js
window.UI = {
  messages: {
    human: [
      "[СИСТЕМА]: сигнал принят.",
      "[HB]: уровень эмпатии увеличен.",
      "[ОТЧЁТ]: поведение признано человечным."
    ],
    robot: [
      "[СИСТЕМА]: алгоритм подтверждён.",
      "[RB]: рациональная модель активна.",
      "[ОТЧЁТ]: машинная логика стабилизирована."
    ]
  },

  logMessage(type = "system") {
    const wrap = document.getElementById("sceneText");
    const msgArr = this.messages[type] || [];
    const msg = msgArr[Math.floor(Math.random() * msgArr.length)];
    const p = document.createElement("p");
    p.style.fontFamily = "monospace";
    p.style.color = "#94a3b8";
    p.textContent = msg;
    wrap.appendChild(p);
  },

  showSystemOverlay(text, duration = 2000) {
    const overlay = document.createElement("div");
    overlay.className = "system-overlay";
    overlay.innerText = text;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add("show"), 10);
    setTimeout(() => {
      overlay.classList.remove("show");
      setTimeout(() => overlay.remove(), 600);
    }, duration);
  }
};

// Стили для всплывающих системных сообщений
const style = document.createElement("style");
style.textContent = `
.system-overlay {
 position:fixed;inset:0;display:flex;align-items:center;justify-content:center;
 background:radial-gradient(circle at 50% 50%, #00ffcc11, #000000cc 80%);
 color:#00ffcc;font-family:monospace;font-size:1.2rem;
 opacity:0;transition:opacity .6s ease;z-index:9999;
}
.system-overlay.show { opacity:1; }
`;
document.head.appendChild(style);
