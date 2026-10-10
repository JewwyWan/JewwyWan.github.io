/* ============================================================
   terminal.js — 终端逐行打字 + 语法高亮 + 光标
   依赖 CSS: .term / .line / .line.in / .k .f .s .n .c .ok .prompt .cmd .cursor
   ============================================================ */

const term = document.getElementById('terminal-output');
if (term) {
  // 每行：[类名数组, 文本] —— 类名对应 CSS 语法高亮色板
  const lines = [
    [['prompt', '$ '], ['cmd', 'python -c "']],
    [['k', 'import '], ['f', 'torch']],
    [['k', 'import '], ['f', 'sklearn']],
    [['k', 'import '], ['f', 'numpy'], ['cmd', ', '], ['f', 'pandas']],
    [['k', 'import '], ['f', 'gradio']],
    [['f', 'print'], ['cmd', '('], ['s', "'AI ML Stack Loaded'"], ['cmd', ')']],
    [['cmd', '"']],
    [['c', '# ========== 面向对象：数据预处理流水线 ==========']],
    [['k', 'class '], ['f', 'DataPipeline'], ['cmd', ':']],
    [['cmd', '    '], ['k', 'def '], ['fn', '__init__'], ['cmd', '(self, config: '], ['f', 'dict'], ['cmd', '):']],
    [['cmd', '        '], ['k', 'self'], ['dot', '.'], ['f', 'config'], ['op', '='], ['f', 'config'], ['cmd', '']],
    [['cmd', '        '], ['k', 'self'], ['dot', '.'], ['f', 'scaler'], ['op', '='], ['f', 'sklearn'], ['dot', '.'], ['fn', 'preprocessing'], ['dot', '.'], ['cl', 'StandardScaler'], ['cmd', '()']],
    [['cmd', '    '], ['k', 'def '], ['fn', 'fit'], ['cmd', '(self, X: '], ['f', 'np'], ['dot', '.'], ['cl', 'ndarray'], ['cmd', '):']],
    [['cmd', '        '], ['k', 'return '], ['k', 'self'], ['dot', '.'], ['f', 'scaler'], ['dot', '.'], ['fn', 'fit'], ['cmd', '(X)']],
    [['cmd', '    '], ['k', 'def '], ['fn', 'transform'], ['cmd', '(self, X):']],
    [['cmd', '        '], ['k', 'return '], ['k', 'self'], ['dot', '.'], ['f', 'scaler'], ['dot', '.'], ['fn', 'transform'], ['cmd', '(X)']],
    [['cmd', '    '], ['k', 'def '], ['fn', 'load_data'], ['cmd', '(cls, path: '], ['f', 'str'], ['cmd', '):']],
    [['cmd', '        '], ['k', 'return '], ['f', 'pd'], ['dot', '.'], ['fn', 'read_csv'], ['cmd', '(path)']],
    [['c', '# ========== 运行环境自检 ==========']],
    [['ok', '[INFO] '], ['n', 'CUDA available: '], ['s', 'True']],
    [['ok', '[INFO] '], ['n', 'Device: '], ['s', 'RTX Compute']],
    [['ok', '[INFO] '], ['n', 'Model Ready for '], ['s', 'Train / Inference']],
    [['ok', '[SUCCESS] '], ['n', 'Backend service startup completed']],
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
