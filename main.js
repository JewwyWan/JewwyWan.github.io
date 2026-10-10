/* ============================================================
   main.js — 滚动入场动画 + 顶部阅读进度条
   依赖 CSS: .rv / .rv-stagger / .progress / .term .line
   ============================================================ */

// ---------- 滚动入场：.rv 单块淡入、.rv-stagger 子项错峰 ----------
const reveal = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      reveal.unobserve(entry.target); // 一次性，避免反复触发
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.rv, .rv-stagger').forEach(el => reveal.observe(el));

// ---------- 顶部阅读进度条 ----------
const progress = document.getElementById('progress');
function updateProgress() {
  const doc = document.documentElement;
  const scrolled = doc.scrollTop;
  const height = doc.scrollHeight - doc.clientHeight;
  const pct = height > 0 ? (scrolled / height) * 100 : 0;
  progress.style.width = pct + '%';
}
updateProgress();
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
