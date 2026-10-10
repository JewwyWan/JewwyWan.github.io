/* ============================================================
   music.js — 背景音乐播放器
   枫 (Maple) 纯音乐 — 用户点击后开启，跨子页面持续播放

   跨页面原理：
   - sessionStorage 记录 {playing, time}
   - 每个页面都有 <audio id="bgm-audio">，加载时恢复播放位置
   - 离开页面前（pagehide / visibilitychange）写入当前时间
   ============================================================ */

(function () {
  'use strict';

  var STORAGE_KEY = 'paddi-music';
  var audio = document.getElementById('bgm-audio');
  var toggle = document.getElementById('musicToggle');
  if (!audio || !toggle) return;

  var label = toggle.querySelector('.music-label');
  var isPlaying = false;
  var restoring = false; // 标记：是否正在恢复跨页面播放（避免重复写存储）

  /* ---------- 读取/写入跨页面状态 ---------- */
  function readState() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) { return null; }
  }
  function writeState(playing, time) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        playing: playing,
        time: time,
        ts: Date.now()
      }));
    } catch (e) {}
  }

  /* ---------- 更新按钮 UI ---------- */
  function updateUI() {
    if (isPlaying) {
      toggle.classList.add('playing');
      if (label) label.textContent = '枫';
      toggle.title = '暂停音乐';
    } else {
      toggle.classList.remove('playing');
      if (label) label.textContent = '音乐';
      toggle.title = '播放音乐';
    }
  }

  /* ---------- 渐入 ---------- */
  function fadeIn(target) {
    audio.volume = 0;
    var v = 0;
    var iv = setInterval(function () {
      v += 0.03;
      if (v >= target) { v = target; clearInterval(iv); }
      audio.volume = v;
    }, 80);
  }

  /* ---------- 播放 ---------- */
  function play() {
    audio.volume = 0;
    var p = audio.play();
    if (p && typeof p.then === 'function') {
      p.then(function () {
        isPlaying = true;
        writeState(true, audio.currentTime);
        fadeIn(0.35);
        updateUI();
      }).catch(function () {
        // 浏览器阻止自动播放，需用户手动点击
        isPlaying = false;
        updateUI();
      });
    } else {
      isPlaying = true;
      writeState(true, audio.currentTime);
      fadeIn(0.35);
      updateUI();
    }
  }

  /* ---------- 暂停（渐出） ---------- */
  function pause() {
    var v = audio.volume;
    var iv = setInterval(function () {
      v -= 0.05;
      if (v <= 0) {
        v = 0; clearInterval(iv);
        audio.pause();
        isPlaying = false;
        writeState(false, audio.currentTime);
        updateUI();
      }
      audio.volume = v;
    }, 50);
  }

  /* ---------- 手动切换 ---------- */
  toggle.addEventListener('click', function () {
    if (isPlaying) { pause(); }
    else { play(); }
  });

  /* ---------- 播放过程中持续记录时间 ---------- */
  audio.addEventListener('timeupdate', function () {
    if (isPlaying && !restoring) {
      // 节流：每秒写一次
      if (Math.floor(audio.currentTime) !== Math.floor(audio._lastSaved || 0)) {
        audio._lastSaved = audio.currentTime;
        writeState(true, audio.currentTime);
      }
    }
  });
  audio.loop = true;

  /* ---------- 离开页面前保存时间 ---------- */
  function saveOnLeave() {
    if (isPlaying) {
      writeState(true, audio.currentTime);
    }
  }
  window.addEventListener('pagehide', saveOnLeave);
  window.addEventListener('beforeunload', saveOnLeave);
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') saveOnLeave();
  });

  /* ---------- 跨页面恢复 ---------- */
  var state = readState();
  if (state && state.playing) {
    restoring = true;
    var resumeTime = state.time || 0;
    // 等 metadata 加载后设置时间再播放
    var startResume = function () {
      try { audio.currentTime = resumeTime; } catch (e) {}
      audio.volume = 0;
      var p = audio.play();
      var doResume = function () {
        isPlaying = true;
        fadeIn(0.35);
        updateUI();
        restoring = false;
        writeState(true, audio.currentTime);
      };
      if (p && typeof p.then === 'function') {
        p.then(doResume).catch(function () {
          // 自动播放被拦截（个别浏览器），静默失败，保持暂停态
          isPlaying = false;
          restoring = false;
          updateUI();
        });
      } else {
        doResume();
      }
    };
    if (audio.readyState >= 1) {
      startResume();
    } else {
      audio.addEventListener('loadedmetadata', startResume, { once: true });
    }
  } else {
    updateUI();
  }
})();
