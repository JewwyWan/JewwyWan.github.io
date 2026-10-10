/* ============================================================
   terminal.js — 终端逐行打字 + 语法高亮 + 光标
   依赖 CSS: .term / .line / .line.in / .k .f .s .n .c .ok .prompt .cmd .cursor
   ============================================================ */

const term = document.getElementById('terminal-output');
if (term) {
  // 每行：[类名数组, 文本] —— 类名对应 CSS 语法高亮色板
  const lines = [
    [['prompt', '$ '], ['cmd', 'paddi-studio status']],
    [['c', '# ========== Paddi Studio · 个人工作室运行状态 ==========']],
    [['k', 'class '], ['f', 'PaddiStudio'], ['cmd', ':']],
    [['cmd', '    '], ['k', 'def '], ['fn', 'focus'], ['cmd', '(self) -> '], ['f', 'list'], ['cmd', ':']],
    [['cmd', '        '], ['k', 'return '], ['s', "'网站开发'"], ['cmd', ', '], ['s', "'移动端 App'"], ['cmd', ', '], ['s', "'产品架构'"]],
    [['cmd', '    '], ['k', 'def '], ['fn', 'status'], ['cmd', '(self) -> '], ['f', 'str'], ['cmd', ':']],
    [['cmd', '        '], ['k', 'return '], ['s', "'持续构建 · 持续交付'"]],
    [['c', '# ========== 当前方向 ==========']],
    [['ok', '[BUILD] '], ['n', 'Web products   — '], ['s', 'shipping']],
    [['ok', '[BUILD] '], ['n', 'Mobile apps    — '], ['s', 'iterating']],
    [['ok', '[BUILD] '], ['n', 'Product system — '], ['s', 'evolving']],
    [['c', '# ========== 技术栈 ==========']],
    [['ok', '[INFO] '], ['n', 'Frontend: '], ['s', 'HTML + CSS + JS']],
    [['ok', '[INFO] '], ['n', 'Backend: '], ['s', 'APIs + data + deployment']],
    [['ok', '[SUCCESS] '], ['n', 'Paddi Studio is building']],
  ];

  // 预渲染所有行（默认隐藏，靠 .in 逐行显现）
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

  // 末行附加闪烁光标
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  lineEls[lineEls.length - 1].appendChild(cursor);

  // 逐行入场
  let i = 0;
  function typeNext() {
    if (i < lineEls.length) {
      lineEls[i].classList.add('in');
      i++;
      setTimeout(typeNext, 240);
    }
  }
  window.addEventListener('load', () => setTimeout(typeNext, 400));
}
