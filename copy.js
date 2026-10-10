/* ============================================================
   copy.js — 点击复制电话 / 邮箱
   依赖 CSS: .copy-btn / .copy-btn.copied / [data-copy]
   ============================================================ */

document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const textEl = btn.parentElement.querySelector('[data-copy]');
    const text = textEl?.dataset.copy;
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // 兜底：execCommand（非 HTTPS / 旧环境）
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch {}
      document.body.removeChild(ta);
    }

    // 切换为“已复制”态，1.2s 后还原图标
    btn.classList.add('copied');
    const original = btn.innerHTML;
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = original;
    }, 1200);
  });
});
