const root = document.body;
const themeKey = 'ananta-theme';
const savedTheme = localStorage.getItem(themeKey);
const systemLight = window.matchMedia?.('(prefers-color-scheme: light)').matches;

if (savedTheme === 'light' || (!savedTheme && systemLight)) {
  root.classList.add('light');
}

const themeToggle = document.getElementById('themeToggle');
const paintTheme = () => {
  if (!themeToggle) return;
  const isLight = root.classList.contains('light');
  themeToggle.textContent = isLight ? '☾' : '☀';
  themeToggle.setAttribute('aria-label', isLight ? 'Aktifkan dark mode' : 'Aktifkan light mode');
  themeToggle.setAttribute('title', isLight ? 'Dark mode' : 'Light mode');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isLight ? '#f3f6f8' : '#07090d');
};
paintTheme();

themeToggle?.addEventListener('click', () => {
  root.classList.toggle('light');
  localStorage.setItem(themeKey, root.classList.contains('light') ? 'light' : 'dark');
  paintTheme();
});

const menuToggle = document.getElementById('menuToggle');
menuToggle?.addEventListener('click', () => {
  const open = root.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '×' : '≡';
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    root.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) menuToggle.textContent = '≡';
  });
});

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const scrollLine = document.querySelector('.scroll-line');
const updateScrollLine = () => {
  if (!scrollLine) return;
  const total = document.documentElement.scrollHeight - innerHeight;
  const progress = total > 0 ? (scrollY / total) * 100 : 0;
  scrollLine.style.width = `${Math.min(100, Math.max(0, progress))}%`;
};
addEventListener('scroll', updateScrollLine, { passive: true });
updateScrollLine();

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -32px' });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('in-view'));
}
