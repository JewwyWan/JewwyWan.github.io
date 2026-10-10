/* ============================================================
   landing.js — 落地页交互逻辑
   1) 主题切换
   2) 滚动时导航栏展开→收缩合并
   3) 移动端菜单
   ============================================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'resume-theme';
  const root = document.documentElement;

  // ---- 主题切换 ----
  function applyTheme(theme) {
    if (theme === 'dark') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', 'light');
    }
  }

  const savedTheme = localStorage.getItem(STORAGE_KEY) || 'light';
  applyTheme(savedTheme);

  const themeBtn = document.getElementById('fnThemeBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }

  // ---- 滚动时导航栏收缩合并 ----
  const floatingNav = document.getElementById('floatingNav');
  if (floatingNav) {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // 滚动超过 60px 时合并为胶囊
          if (window.scrollY > 60) {
            floatingNav.classList.add('scrolled');
          } else {
            floatingNav.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // 初始状态
  }

  // ---- 移动端菜单 ----
  const mobileToggle = document.getElementById('fnMobileToggle');
  if (mobileToggle && floatingNav) {
    const closeMobileMenu = () => {
      floatingNav.classList.remove('menu-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = floatingNav.classList.toggle('menu-open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });

    floatingNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', (e) => {
      if (!floatingNav.contains(e.target)) closeMobileMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && floatingNav.classList.contains('menu-open')) {
        closeMobileMenu();
        mobileToggle.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) closeMobileMenu();
    });
  }
})();
