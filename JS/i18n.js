/* Paddi Studio personal-site translations. */
(function () {
  'use strict';
  const STORAGE_KEY = 'site-lang';
  const SUPPORTED = ['zh', 'en', 'ja', 'ko'];
  const LANG_LABELS = { zh: '中文', en: 'EN', ja: '日本語', ko: '한국어' };
  const I18N = {
    zh: {
      'nav.about':'关于我','nav.contact':'联系我','nav.portfolio':'作品集','nav.sites':'开发站点','nav.ecosystem':'Paddi Ecosystem',
      'hero.eyebrow':'个人工作室 · 独立开发','hero.subtitle':'网站与移动端开发者 · 产品架构师',
      'hero.greetingBefore':"Hi，I'm ",'hero.greetingAfter':'，网站与移动端开发者，产品架构师',
      'hero.tagline':'专注网站、移动端 App 的前后端开发，以及产品经理视角的顶层架构设计。','hero.scroll':'向下探索',
      'screen2.title':'探索','screen2.sub':'选择一个入口，了解我的作品与正在构建的生态',
      'card.about.label':'关于我','card.about.desc':'ABOUT','card.contact.label':'联系我','card.contact.desc':'CONTACT',
      'card.portfolio.label':'作品集','card.portfolio.desc':'PORTFOLIO','card.ecosystem.label':'Paddi Ecosystem','card.ecosystem.desc':'ECOSYSTEM',
      'card.sites.label':'开发站点','card.sites.desc':'SITE DIRECTORY','foot.copy':'Paddi Studio · 万建伟 JewwyWan · Copyright','foot.ecosystem':'paddi生态',
      'welcome.eyebrow':'Paddi Studio · 个人主页','welcome.title':'开始探索这位天才架构师吧~','welcome.subtitle':'网站、移动端 App 与产品架构','welcome.start':'进入个人主页','welcome.foot':'Paddi Studio · 万建伟 JewwyWan · Copyright'
    },
    en: {
      'nav.about':'About','nav.contact':'Contact','nav.portfolio':'Portfolio','nav.sites':'Built sites','nav.ecosystem':'Paddi Ecosystem',
      'hero.eyebrow':'Solo studio · Independent development','hero.subtitle':'Web & mobile developer · Product architect',
      'hero.greetingBefore':"Hi, I'm ",'hero.greetingAfter':', a web and mobile developer and product architect',
      'hero.tagline':'Building web and mobile products across the stack, with product architecture from the first idea to delivery.','hero.scroll':'Scroll to explore',
      'screen2.title':'Explore','screen2.sub':'Choose an entrance to see my work and the ecosystem I am building',
      'card.about.label':'About me','card.about.desc':'ABOUT','card.contact.label':'Contact','card.contact.desc':'CONTACT',
      'card.portfolio.label':'Portfolio','card.portfolio.desc':'PORTFOLIO','card.ecosystem.label':'Paddi Ecosystem','card.ecosystem.desc':'ECOSYSTEM',
      'card.sites.label':'Built sites','card.sites.desc':'SITE DIRECTORY','foot.copy':'Paddi Studio · JewwyWan · Copyright','foot.ecosystem':'Paddi Ecosystem',
      'welcome.eyebrow':'Paddi Studio · Personal site','welcome.title':'Come explore this genius architect~','welcome.subtitle':'Web, mobile apps and product architecture','welcome.start':'Enter personal site','welcome.foot':'Paddi Studio · JewwyWan · Copyright'
    },
    ja: {
      'nav.about':'私について','nav.contact':'連絡先','nav.portfolio':'作品集','nav.sites':'開発サイト','nav.ecosystem':'Paddi Ecosystem',
      'hero.eyebrow':'一人スタジオ · 独立開発','hero.subtitle':'Web・モバイル開発者 · プロダクトアーキテクト',
      'hero.greetingBefore':"Hi、I'm ",'hero.greetingAfter':'、Web・モバイル開発者、プロダクトアーキテクト',
      'hero.tagline':'Web とモバイルのフロントエンド・バックエンド、そしてプロダクト全体の設計に取り組んでいます。','hero.scroll':'下へ探索',
      'screen2.title':'探索','screen2.sub':'作品と構築中のエコシステムを見る',
      'card.about.label':'私について','card.about.desc':'ABOUT','card.contact.label':'連絡先','card.contact.desc':'CONTACT',
      'card.portfolio.label':'作品集','card.portfolio.desc':'PORTFOLIO','card.ecosystem.label':'Paddi Ecosystem','card.ecosystem.desc':'ECOSYSTEM',
      'card.sites.label':'開発サイト','card.sites.desc':'SITE DIRECTORY','foot.copy':'Paddi Studio · JewwyWan · Copyright','foot.ecosystem':'paddiエコシステム',
      'welcome.eyebrow':'Paddi Studio · 個人サイト','welcome.title':'この天才アーキテクトを探索しよう~','welcome.subtitle':'Web・モバイルアプリ・プロダクト設計','welcome.start':'個人サイトへ','welcome.foot':'Paddi Studio · JewwyWan · Copyright'
    },
    ko: {
      'nav.about':'소개','nav.contact':'연락처','nav.portfolio':'포트폴리오','nav.sites':'개발 사이트','nav.ecosystem':'Paddi Ecosystem',
      'hero.eyebrow':'1인 스튜디오 · 독립 개발','hero.subtitle':'웹·모바일 개발자 · 제품 아키텍트',
      'hero.greetingBefore':"Hi, I'm ",'hero.greetingAfter':', 웹·모바일 개발자이자 제품 아키텍트입니다',
      'hero.tagline':'웹과 모바일의 프런트엔드·백엔드 개발, 그리고 제품의 전체 구조 설계를 진행합니다.','hero.scroll':'아래로 탐색',
      'screen2.title':'탐색','screen2.sub':'작품과 만들어 가는 생태계를 확인하세요',
      'card.about.label':'소개','card.about.desc':'ABOUT','card.contact.label':'연락처','card.contact.desc':'CONTACT',
      'card.portfolio.label':'포트폴리오','card.portfolio.desc':'PORTFOLIO','card.ecosystem.label':'Paddi Ecosystem','card.ecosystem.desc':'ECOSYSTEM',
      'card.sites.label':'개발 사이트','card.sites.desc':'SITE DIRECTORY','foot.copy':'Paddi Studio · JewwyWan · Copyright','foot.ecosystem':'paddi 생태계',
      'welcome.eyebrow':'Paddi Studio · 개인 사이트','welcome.title':'이 천재 아키텍트를 만나 보세요~','welcome.subtitle':'웹·모바일 앱·제품 아키텍처','welcome.start':'개인 사이트로 이동','welcome.foot':'Paddi Studio · JewwyWan · Copyright'
    }
  };
  function getLang() {
    const value = localStorage.getItem(STORAGE_KEY);
    return SUPPORTED.includes(value) ? value : 'zh';
  }
  function applyLang(lang) {
    const currentLang = SUPPORTED.includes(lang) ? lang : 'zh';
    const dict = I18N[currentLang];
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : currentLang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = dict[el.getAttribute('data-i18n')];
      if (value !== undefined) el.textContent = value;
    });
    const current = document.getElementById('langCurrent');
    if (current) current.textContent = LANG_LABELS[currentLang];
    document.querySelectorAll('.lang-option').forEach((option) => {
      const active = option.dataset.lang === currentLang;
      option.classList.toggle('active', active);
      option.setAttribute('aria-checked', String(active));
    });
    localStorage.setItem(STORAGE_KEY, currentLang);
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: currentLang } }));
  }
  window.I18N = { applyLang, getLang, SUPPORTED, LANG_LABELS, DICT: I18N };
  function init() {
    const toggle = document.getElementById('langToggle');
    const dropdown = document.getElementById('langDropdown');
    const setOpen = (open) => {
      if (!dropdown || !toggle) return;
      dropdown.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    if (toggle && dropdown) {
      toggle.addEventListener('click', (event) => { event.stopPropagation(); setOpen(!dropdown.classList.contains('open')); });
      document.addEventListener('click', (event) => { if (!dropdown.contains(event.target) && !toggle.contains(event.target)) setOpen(false); });
      document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setOpen(false); });
    }
    document.querySelectorAll('.lang-option').forEach((option) => {
      option.addEventListener('click', () => { applyLang(option.dataset.lang); setOpen(false); });
    });
    applyLang(getLang());
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
