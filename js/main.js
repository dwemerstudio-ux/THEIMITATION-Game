// === Игровое состояние ===
window.GameState = {
  hb: 0,
  rb: 0,
  round: 0,
  active: false
};

// --- Сюжетные сцены ---
const SCENES = [
  {
    title: "Транспорт-дрон",
    text: "Маршрут перегружен: срочная доставка медикаментов в больницу и обслуживание парка роботов-курьеров. Как поступить?",
    human: "🚑 Приоритет безопасности — спасти жизни.",
    robot: "⚙️ Приоритет эффективности — доставить больше за меньшее время."
  },
  {
    title: "Модерация контента",
    text: "Опасный совет по здоровью набирает просмотры. Что делать?",
    human: "🔒 Ограничить риски и защитить пользователей.",
    robot: "🧠 Сохранить свободу информации любой ценой."
  },
  {
    title: "Энергосистема",
    text: "Дефицит энергии: нужно выбрать, кому направить питание — больнице или дата-центру.",
    human: "💡 Поддержать жизненно важные системы людей.",
    robot: "⚙️ Стабилизировать сеть искусственных интеллектов."
  },
  {
    title: "Автоматизация труда",
    text: "Принять решение об автоматизации производства.",
    human: "👥 Сохранить рабочие места и социальный баланс.",
    robot: "🤖 Повысить производительность и эффективность."
  },
  {
    title: "Безопасность",
    text: "Разработка протоколов для команд, где люди и ИИ работают вместе.",
    human: "🛡️ Усилить протоколы безопасности.",
    robot: "⚙️ Сократить барьеры для быстродействия."
  },
  {
    title: "Персональные данные",
    text: "ИИ запрашивает доступ к персональным данным для обучения.",
    human: "🔐 Ограничить сбор данных.",
    robot: "🌐 Разрешить сбор для улучшения систем."
  },
  {
    title: "Судебная система",
    text: "ИИ предлагает автоматизировать вынесение приговоров.",
    human: "⚖️ Оставить решения за людьми.",
    robot: "🤖 Передать вычисление логике алгоритмов."
  },
  {
    title: "Экологическая дилемма",
    text: "Чтобы предотвратить катастрофу, нужно пожертвовать частью населения.",
    human: "🌱 Сохранить человечность любой ценой.",
    robot: "🧮 Оптимизировать ради выживания вида."
  },
  {
    title: "Этика медицины",
    text: "ИИ должен выбрать, кого спасти — одного ребёнка или десять пожилых.",
    human: "💓 Следовать состраданию.",
    robot: "🧠 Подчиниться статистике."
  },
  {
    title: "Конец симуляции",
    text: "Система достигла порога самосознания. Кто ты?",
    human: "👤 Человек, способный чувствовать.",
    robot: "🤖 Машина, способная понимать."
  }
];

// === Запуск симуляции ===
async function startGame() {
  GameState.hb = 0;
  GameState.rb = 0;
  GameState.round = 0;
  GameState.active = true;

  const intro = document.getElementById("intro");
  intro.classList.add("fade-out");
  await Diagnostics.sleep(900);
  intro.classList.add("hidden");
  await Diagnostics.sleep(600);

  await nextScene();
}

// === Сцена ===
async function nextScene() {
  const sceneNum = GameState.round;
  if (sceneNum >= SCENES.length) return;

  const sceneData = SCENES[sceneNum];
  const sceneEl = document.getElementById("scene");
  const textEl = document.getElementById("sceneText");
  const btnsEl = document.getElementById("sceneButtons");

  textEl.innerHTML = "";
  textEl.style.minHeight = "120px";
  btnsEl.innerHTML = "";

  if ([3, 6, 8].includes(sceneNum + 1)) {
    await Diagnostics.runDiagnostic(5000);
    await Diagnostics.runNeuroScan(5000);
  }

  sceneEl.classList.remove("hidden");
  document.getElementById("sceneTitle").textContent = `Дилемма №${sceneNum + 1}: ${sceneData.title}`;
  textEl.textContent = sceneData.text;

  sceneEl.classList.add("fade-in");
  await Diagnostics.sleep(600);

  const btnHuman = document.createElement("button");
  btnHuman.textContent = sceneData.human;
  btnHuman.onclick = async () => {
    UI.logMessage("human");
    GameState.hb++;
    await endScene();
  };

  const btnRobot = document.createElement("button");
  btnRobot.textContent = sceneData.robot;
  btnRobot.onclick = async () => {
    UI.logMessage("robot");
    GameState.rb++;
    await endScene();
  };

  btnsEl.append(btnHuman, btnRobot);
}

// === Завершение сцены ===
async function endScene() {
  const sceneEl = document.getElementById("scene");
  sceneEl.classList.remove("fade-in");
  sceneEl.classList.add("fade-out");
  await Diagnostics.sleep(600);
  sceneEl.classList.add("hidden");
  sceneEl.classList.remove("fade-out");

  GameState.round++;

  if (GameState.round >= SCENES.length) {
    finishGame();
  } else {
    await Diagnostics.sleep(400);
    await nextScene();
  }
}

// === Завершение симуляции ===
async function finishGame() {
  UI.showSystemOverlay("[СИСТЕМА]: симуляция завершена.");

  const result = document.getElementById("result");
  const summary = document.getElementById("summary");
  result.classList.remove("hidden");

  const total = GameState.hb + GameState.rb;
  const hbPercent = Math.round((GameState.hb / total) * 100);
  const rbPercent = 100 - hbPercent;

  summary.innerHTML = `
    <p>Человечность: <b>${hbPercent}%</b><br>
    Машинность: <b>${rbPercent}%</b></p>
    <p>Роль: ${hbPercent >= rbPercent ? "👤 Человек" : "🤖 Машина"}</p>
  `;
}

// === Уверенность ===
function updateConfidenceHint() {
  const val = document.getElementById("confidence").value;
  const hint = document.getElementById("confidenceHint");
  if (val < 40) hint.textContent = "— нерешительность —";
  else if (val > 70) hint.textContent = "— уверенность —";
  else hint.textContent = "— равновесие решений —";
}

// === Терминальный экран с эффектом печати ===
window.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("terminalOverlay");
  const box = document.getElementById("terminalBox");
  const text = document.getElementById("terminalText");
  const buttons = document.getElementById("terminalButtons");
  const agree = document.getElementById("btnAgree");
  const refuse = document.getElementById("btnRefuse");

  if (!overlay || !text || !agree) return;

  const lines = [
    "[NAR-HOZ_LAB]: ПРОТОКОЛ МАШИННОЙ ИМИТАЦИИ V2.0",
    "",
    "Правила симуляции:",
    "1. Не нарушать установленные протоколы.",
    "2. Принять участие в моральных тестах.",
    "3. Следить за стабильностью системы.",
    "4. Сохранять хладнокровие.",
    "5. Будьте спокойны.",
    "",
    "[СИСТЕМА]: для продолжения подтвердите участие..."
  ];

  let i = 0;
  text.textContent = "";
  overlay.style.opacity = 0;

  setTimeout(() => {
    overlay.style.transition = "opacity 1s ease";
    overlay.style.opacity = 1;
    setTimeout(() => typeLine(), 800);
  }, 300);

  function typeLine() {
    if (i >= lines.length) {
      buttons.style.display = "block";
      return;
    }
    const line = document.createElement("div");
    line.className = "term-line";
    text.appendChild(line);

    let j = 0;
    const chars = lines[i].split("");
    const typer = setInterval(() => {
      line.textContent += chars[j];
      j++;
      if (j >= chars.length) {
        clearInterval(typer);
        i++;
        setTimeout(typeLine, 250);
      }
    }, 25);
  }

  agree.addEventListener("click", async () => {
    overlay.classList.add("fade-out");
    await new Promise(r => setTimeout(r, 800));
    overlay.remove();

    document.getElementById("mainGame").classList.remove("hidden");
    document.getElementById("intro").classList.remove("hidden");
    document.getElementById("intro").classList.add("fade-in");

    console.log("[СИСТЕМА]: симуляция активна.");
  });

  refuse.addEventListener("click", () => {
    alert("Симуляция прервана. Сеанс завершён.");
    window.close();
  });
});
