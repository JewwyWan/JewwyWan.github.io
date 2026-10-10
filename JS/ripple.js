/* ============================================================
   ripple.js — 背景涟漪动效（鼠标移动跟随荡开）
   - 监听 document mousemove，鼠标位置产生扩散涟漪
   - 多层同心圆，透明度渐变，半径增大消失
   - 性能控制：仅有活跃涟漪时 requestAnimationFrame + 最多 20 个同时 + 60ms 节流
   - 页面隐藏或 prefers-reduced-motion 时停止
   依赖：index.html 中的 <canvas id="ripple-canvas">
   ============================================================ */

(function () {
  'use strict';

  var canvas = document.getElementById('ripple-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var motionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var DPR = 1;
  var width = 0;
  var height = 0;
  var ripples = [];          // 当前活跃涟漪
  var rafId = null;
  var MAX_RIPPLES = 20;      // 最多同时 20 个
  var lastSpawn = 0;         // 上次产生涟漪时间（节流）
  var SPAWN_INTERVAL = 60;   // 60ms 节流，鼠标移动再快也不超频

  // 涟漪配色：取 paddi 主色蓝紫 + 青绿，与 welcome 主题呼应
  var COLORS = [
    [89, 120, 253],    // #5978fd 蓝紫
    [92, 140, 255],    // #5c8cff
    [0, 187, 127]      // #00bb7f 青绿
  ];

  function motionReduced() {
    return motionQuery && motionQuery.matches;
  }

  // ---------- 尺寸适配 ----------
  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);  // 限制 DPR 防止高分屏过载
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * DPR;
    canvas.height = height * DPR;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  function clear() {
    ctx.clearRect(0, 0, width, height);
  }

  function stop() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  // ---------- 产生涟漪 ----------
  function spawnRipple(x, y) {
    if (document.hidden || motionReduced()) return;

    if (ripples.length >= MAX_RIPPLES) {
      ripples.shift();  // 满了移除最老的
    }
    ripples.push({
      x: x,
      y: y,
      r: 0,                          // 当前半径
      maxR: 80 + Math.random() * 60, // 最大半径 80~140
      alpha: 0.5,                    // 起始透明度
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    });

    if (rafId === null) rafId = requestAnimationFrame(render);
  }

  // ---------- 鼠标移动监听（节流）----------
  document.addEventListener('mousemove', function (e) {
    var now = performance.now();
    if (now - lastSpawn >= SPAWN_INTERVAL) {
      lastSpawn = now;
      spawnRipple(e.clientX, e.clientY);
    }
  }, { passive: true });

  // 触屏支持（移动端触摸也产生涟漪）
  document.addEventListener('touchmove', function (e) {
    if (!e.touches.length) return;
    var t = e.touches[0];
    var now = performance.now();
    if (now - lastSpawn >= SPAWN_INTERVAL) {
      lastSpawn = now;
      spawnRipple(t.clientX, t.clientY);
    }
  }, { passive: true });

  // ---------- 渲染循环 ----------
  function render() {
    rafId = null;
    if (document.hidden || motionReduced()) return;

    clear();

    for (var i = ripples.length - 1; i >= 0; i--) {
      var rp = ripples[i];
      // 半径增长（线性，2.2px/帧）
      rp.r += 2.2;
      // 透明度随半径增大而衰减
      var progress = rp.r / rp.maxR;           // 0 → 1
      rp.alpha = 0.5 * (1 - progress);         // 0.5 → 0

      // 绘制多层同心圆（3 层，半径递减，营造水波层次）
      var c = rp.color;
      for (var layer = 0; layer < 3; layer++) {
        var layerR = rp.r - layer * 10;
        if (layerR <= 0) continue;
        var layerAlpha = rp.alpha * (1 - layer * 0.25);
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, layerR, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + layerAlpha + ')';
        ctx.lineWidth = 1.5 - layer * 0.3;
        ctx.stroke();
      }

      // 半径达到上限或透明度归零，移除
      if (rp.r >= rp.maxR || rp.alpha <= 0.01) {
        ripples.splice(i, 1);
      }
    }

    if (ripples.length) rafId = requestAnimationFrame(render);
  }

  // 页面隐藏或减动效时停止并清空，回来后等待下一次交互
  function suspend() {
    stop();
    ripples = [];
    clear();
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) suspend();
  });

  if (motionQuery) {
    if (motionQuery.addEventListener) motionQuery.addEventListener('change', suspend);
    else if (motionQuery.addListener) motionQuery.addListener(suspend);
  }
})();
