/* ============================================================
   main.js — 滚动入场动画 + 顶部阅读进度条
   依赖 CSS: .rv / .rv-stagger / .progress / .term .line
   ============================================================ */

// ---------- 滚动入场：.rv 单块淡入、.rv-stagger 子项错峰 ----------
const revealTargets = document.querySelectorAll('.rv, .rv-stagger');

if ('IntersectionObserver' in window) {
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        reveal.unobserve(entry.target); // 一次性，避免反复触发
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  revealTargets.forEach(el => reveal.observe(el));
} else {
  // 老浏览器无观察器时直接显示内容，避免永久隐藏
  revealTargets.forEach(el => el.classList.add('in'));
}

// ---------- 顶部阅读进度条 ----------
const progress = document.getElementById('progress');
function updateProgress() {
  const doc = document.documentElement;
  const scrolled = doc.scrollTop;
  const height = doc.scrollHeight - doc.clientHeight;
  const pct = height > 0 ? (scrolled / height) * 100 : 0;
  if (progress) progress.style.width = pct + '%';
}
updateProgress();
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
