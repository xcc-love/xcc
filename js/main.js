const themeToggleBtn = document.getElementById("themeToggle");
const toggleLabel = themeToggleBtn?.querySelector(".toggle-label");
const THEME_KEY = "preferred-theme";

function setTheme(isDark) {
  document.body.classList.toggle("dark-theme", isDark);
  themeToggleBtn?.setAttribute("aria-pressed", String(isDark));
  if (toggleLabel) {
    toggleLabel.textContent = isDark ? "深色" : "浅色";
  }
}

function loadThemePreference() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "dark") return true;
  if (savedTheme === "light") return false;
  return false;
}

function handleThemeToggle() {
  const willUseDarkTheme = !document.body.classList.contains("dark-theme");
  setTheme(willUseDarkTheme);
  localStorage.setItem(THEME_KEY, willUseDarkTheme ? "dark" : "light");
}

setTheme(loadThemePreference());
themeToggleBtn?.addEventListener("click", handleThemeToggle);

// --- 触发灵感功能 ---
const quotes = [
  "“代码如诗，简洁至上。”",
  "“每一个伟大的设计，都始于一个简单的想法。”",
  "“技术连接世界，而创意点亮未来。”",
  "“在 0 与 1 之间，存在着无限的可能。”",
];

function changeQuote() {
  const box = document.getElementById("quote-box");
  if (!box) return;

  // 简单的渐隐点位效果
  box.style.opacity = "0";
  box.style.transform = "translateY(5px)";

  setTimeout(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    box.textContent = randomQuote;
    box.style.opacity = "1";
    box.style.transform = "translateY(0)";
  }, 250);
}

// 初始加载
window.addEventListener("DOMContentLoaded", () => {
  changeQuote();
  fetchHitokoto();

  const refreshBtn = document.getElementById("refresh-hitokoto");
  refreshBtn?.addEventListener("click", fetchHitokoto);
});

// --- 每日一言 (Hitokoto API) ---
async function fetchHitokoto() {
  const container = document.getElementById("hitokoto-text");
  const author = document.getElementById("hitokoto-author");
  const refreshBtn = document.getElementById("refresh-hitokoto");

  if (!container) return;

  // 开始加载动画
  refreshBtn?.classList.add("loading");

  try {
    const response = await fetch("https://v1.hitokoto.cn");
    const data = await response.json();
    container.textContent = data.hitokoto;
    if (author) {
      author.textContent = `—— ${data.from_who || data.from}`;
    }
  } catch (error) {
    console.error("Failed to fetch hitokoto:", error);
    container.textContent = "生活原本沉闷，但跑起来就会有风。";
  } finally {
    // 无论成功失败，稍后停止动画以保证至少转动一下
    setTimeout(() => {
      refreshBtn?.classList.remove("loading");
    }, 500);
  }
}
