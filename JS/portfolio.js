/* ============================================================
   portfolio.js — 作品集页面终端覆写 + 初始化
   复用 camp.js 的 terminal 覆写模式
   ============================================================ */

/* ---------- 覆写终端内容（portfolio 主题）----------
   terminal.js 已把 Paddi Studio 状态写进 #terminal-output，
   这里在 load 后清空并重渲染为 portfolio 主题的命令行。*/
window.addEventListener('load', () => {
  const term = document.getElementById('terminal-output');
  if (!term) return;
  term.innerHTML = '';
  const lines = [
    [['prompt', '$ '], ['cmd', 'ls portfolio/ --projects']],
    [['c', '# Paddi Studio · 作品集目录']],
    [['k', 'const '], ['f', 'projects'], ['op', ' = '], ['f', 'loadPortfolio'], ['cmd', '()']],
    [['cmd', '  '], ['k', 'return '], ['f', 'fetch'], ['cmd', '('], ['s', "'./portfolio'"], ['cmd', ')']],
    [['ok', '[INFO] '], ['n', 'scanning '], ['s', '9 '], ['n', 'projects...']],
    [['ok', '[INFO] '], ['n', 'categories: '], ['s', 'AI Agent / 全栈 / ML / 游戏']],
    [['ok', '[INFO] '], ['n', 'repos indexed: '], ['s', '9/9']],
    [['ok', '[SUCCESS] '], ['n', 'portfolio ready · '], ['s', 'scroll to explore']],
  ];
  const lineEls = lines.map(parts => {
    const line = document.createElement('div');
    line.className = 'line';
    parts.forEach(([cls, txt]) => {
      const span = document.createElement('span');
      if (cls) span.className = cls;
      span.textContent = txt;
      line.appendChild(span);
    });
    term.appendChild(line);
    return line;
  });
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  lineEls[lineEls.length - 1].appendChild(cursor);
  let i = 0;
  (function typeNext() {
    if (i < lineEls.length) {
      lineEls[i].classList.add('in');
      i++;
      setTimeout(typeNext, 220);
    }
  })();
});
