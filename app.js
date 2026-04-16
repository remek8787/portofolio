const root = document.body;
const key = 'ananta-theme';
const saved = localStorage.getItem(key);
if (saved === 'light') root.classList.add('light');

const toggle = document.getElementById('themeToggle');
if (toggle) {
  const paint = () => {
    const isLight = root.classList.contains('light');
    toggle.textContent = isLight ? '🌙' : '☀️';
    toggle.setAttribute('aria-label', isLight ? 'Aktifkan dark mode' : 'Aktifkan light mode');
  };
  paint();
  toggle.addEventListener('click', () => {
    root.classList.toggle('light');
    localStorage.setItem(key, root.classList.contains('light') ? 'light' : 'dark');
    paint();
  });
}

document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});
