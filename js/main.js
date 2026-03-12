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
