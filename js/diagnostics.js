// diagnostics.js
window.Diagnostics = {
  async runDiagnostic() {
    UI.showSystemOverlay("[СИСТЕМА]: анализ когнитивных реакций...");
    await this.sleep(2000);
    const stability = Math.floor(70 + Math.random() * 30);
    UI.showSystemOverlay(`[ОТЧЁТ]: стабильность ${stability}%`);
    await this.sleep(2000);
  },

  async runNeuroScan() {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.cssText =
        "position:fixed;top:0;left:0;z-index:9999;background:rgba(0,0,0,0.85)";
      document.body.appendChild(canvas);
      const ctx = canvas.getContext("2d");

      const anomalies = [];
      let hits = 0;

      for (let i = 0; i < 5; i++) {
        anomalies.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: 25
        });
      }

      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(0,255,200,0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        anomalies.forEach((a) => {
          ctx.beginPath();
          ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(255,0,0,0.7)";
          ctx.lineWidth = 2;
          ctx.stroke();
        });
        ctx.fillStyle = "#00ffcc";
        ctx.font = "20px monospace";
        ctx.fillText("СКАНИРОВАНИЕ НЕЙРОСЕТИ...", 40, 40);
        ctx.fillText(`Попадания: ${hits}`, 40, 70);
      }

      function click(e) {
        const x = e.clientX,
          y = e.clientY;
        anomalies.forEach((a) => {
          const dx = x - a.x,
            dy = y - a.y;
          if (Math.sqrt(dx * dx + dy * dy) < a.r) {
            a.x = Math.random() * canvas.width;
            a.y = Math.random() * canvas.height;
            hits++;
          }
        });
      }

      canvas.addEventListener("click", click);

      const interval = setInterval(draw, 60);
      setTimeout(() => {
        clearInterval(interval);
        canvas.removeEventListener("click", click);
        document.body.removeChild(canvas);
        UI.showSystemOverlay(`[РЕЗУЛЬТАТ]: точность ${hits * 20}%`);
        resolve(hits);
      }, 10000);
    });
  },

  sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }
};
