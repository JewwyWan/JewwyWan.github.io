/* ============================================================
   nav.js — Tab 切换 / 文件树导航 / 滚动点高亮 / 主题切换
   依赖 CSS: .tab / .tree-file / .scrollnav a / .tree-folder
   ============================================================ */

// ---------- Tab 点击平滑滚动到对应 section ----------
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // 带 data-href 的 Tab 跳转到外部或子路径
    if (tab.dataset.href) {
      window.open(tab.dataset.href, tab.getAttribute('target') || '_self');
      return;
    }
    const target = document.getElementById(tab.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ---------- 文件树：点击条目滚动 + 高亮 ----------
const treeFiles = document.querySelectorAll('.tree-file');
treeFiles.forEach(item => {
  item.addEventListener('click', () => {
    const target = document.getElementById(item.dataset.scroll);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ---------- 文件树文件夹折叠 ----------
document.querySelectorAll('.tree-folder[data-folder]').forEach(folder => {
  folder.addEventListener('click', () => {
    folder.classList.toggle('open');
  });
});

// ---------- 滚动联动：高亮 Tab / 文件树 / 右侧导航点 ----------
const sections = document.querySelectorAll('main section[id]');
const navDots = document.querySelectorAll('.scrollnav a');

function syncActive() {
  let current = sections[0]?.id || '';
  const trigger = window.scrollY + window.innerHeight * 0.3;
  sections.forEach(sec => {
    if (sec.offsetTop <= trigger) current = sec.id;
  });
  // tab
  tabs.forEach(t => t.classList.toggle('active', t.dataset.target === current));
  // 文件树
  treeFiles.forEach(f => f.classList.toggle('active', f.dataset.scroll === current));
  // 右侧点
  navDots.forEach(d => d.classList.toggle('active', d.dataset.id === current));
}
window.addEventListener('scroll', syncActive, { passive: true });
window.addEventListener('load', syncActive);

// ---------- 主题切换（深 / 浅）----------
// 默认晨间模式（light）；若用户手动切换过，则用其保存的偏好
const themeBtn = document.getElementById('themeBtn');
const STORAGE_KEY = 'resume-theme';
const DEFAULT_THEME = 'light';
const saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
applyTheme(saved);

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
}

themeBtn?.addEventListener('click', () => {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const next = isLight ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem(STORAGE_KEY, next);
});
