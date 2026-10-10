/* ============================================================
   particles.js — Canvas 粒子网络动态背景
   极简风格：浮游粒子 + 邻近连线 + 鼠标引力
   自动适配深色/浅色主题，并尊重页面可见性与减动效设置
   ============================================================ */

(function () {
  'use strict';

  const canvas = document.getElementById('bg-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let W, H, particles = [], mouse = { x: null, y: null };
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let rafId = null;
  const motionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

  // ---- 主题感知 ----
  function getTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }
  function themeColors() {
    const light = getTheme() === 'light';
    return {
      dot:   light ? 'rgba(61,109,216,' : 'rgba(92,140,255,',
      line:  light ? 'rgba(61,109,216,' : 'rgba(92,140,255,',
      dotOp: light ? 0.35 : 0.55,
      lineOp:light ? 0.10 : 0.14,
    };
  }
  let tc = themeColors();

  function motionReduced() {
    return motionQuery && motionQuery.matches;
  }

  // ---- 粒子类 ----
  function Particle() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.35;
    this.vy = (Math.random() - 0.5) * 0.35;
    this.r = Math.random() * 1.6 + 0.6;
  }
  Particle.prototype.update = function () {
    // 鼠标引力（柔和）
    if (mouse.x !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 160 && dist > 0) {
        const force = (160 - dist) / 160 * 0.018;
        this.vx += (dx / dist) * force;
        this.vy += (dy / dist) * force;
      }
    }
    // 阻尼，防止持续加速
    this.vx *= 0.992;
    this.vy *= 0.992;
    // 最小速度保证始终移动
    const sp = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (sp < 0.12) {
      this.vx += (Math.random() - 0.5) * 0.05;
      this.vy += (Math.random() - 0.5) * 0.05;
    }
    this.x += this.vx;
    this.y += this.vy;
    // 边界环绕
    if (this.x < -10) this.x = W + 10;
    if (this.x > W + 10) this.x = -10;
    if (this.y < -10) this.y = H + 10;
    if (this.y > H + 10) this.y = -10;
  };
  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = tc.dot + tc.dotOp + ')';
    ctx.fill();
  };

  // ---- 连线 ----
  function drawConnections() {
    const maxDist = 130;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const op = tc.lineOp * (1 - dist / maxDist);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = tc.line + op + ')';
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
  }

  // ---- 尺寸 ----
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // 根据面积调整粒子数
    const target = Math.min(90, Math.max(40, Math.floor(W * H / 16000)));
    particles = [];
    for (let i = 0; i < target; i++) particles.push(new Particle());
  }

  function drawFrame(update) {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      if (update) p.update();
      p.draw();
    });
    drawConnections();
  }

  // ---- 动画循环 ----
  function stop() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function animate() {
    rafId = null;
    if (document.hidden || motionReduced()) return;
    drawFrame(true);
    rafId = requestAnimationFrame(animate);
  }

  function syncAnimation() {
    stop();
    if (document.hidden) return;
    if (motionReduced()) drawFrame(false);
    else rafId = requestAnimationFrame(animate);
  }

  // ---- 事件 ----
  window.addEventListener('resize', () => {
    stop();
    resize();
    syncAnimation();
  });
  window.addEventListener('mousemove', e => {
    if (motionReduced()) return;
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }, { passive: true });
  window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

  // 主题切换时更新颜色
  const observer = new MutationObserver(() => {
    tc = themeColors();
    if (motionReduced() && !document.hidden) drawFrame(false);
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // 可见性与减动效优化
  document.addEventListener('visibilitychange', syncAnimation);
  if (motionQuery) {
    if (motionQuery.addEventListener) motionQuery.addEventListener('change', syncAnimation);
    else if (motionQuery.addListener) motionQuery.addListener(syncAnimation);
  }

  // ---- 启动 ----
  resize();
  syncAnimation();
})();
