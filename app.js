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

const line = document.querySelector('.scroll-line');
const updateScroll = () => {
  if (!line) return;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const current = total > 0 ? (window.scrollY / total) * 100 : 0;
  line.style.width = `${Math.min(100, Math.max(0, current))}%`;
};
window.addEventListener('scroll', updateScroll, { passive: true });
updateScroll();

const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && items.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add('in-view'));
}
