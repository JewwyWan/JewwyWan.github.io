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
      'hero.tagline':'专注网站、移动端 App 的前后端开发与产品架构，并用 Agent 编程快速拆解 ERP / BOM 业务。','hero.focus':'ERP / BOM 方向 · Agent 辅助业务建模','hero.scroll':'向下探索',
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
      'hero.tagline':'Building web and mobile products across the stack, with product architecture from the first idea to delivery, and using Agent programming to break down ERP / BOM workflows.','hero.focus':'ERP / BOM direction · Agent-assisted business modeling','hero.scroll':'Scroll to explore',
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
      'hero.tagline':'Web とモバイルのフロントエンド・バックエンド、プロダクト全体の設計に取り組み、Agent で ERP / BOM 業務を分解します。','hero.focus':'ERP / BOM 分野 · Agent による業務モデリング','hero.scroll':'下へ探索',
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
      'hero.tagline':'웹과 모바일의 프런트엔드·백엔드 및 제품 구조를 설계하고, Agent 프로그래밍으로 ERP / BOM 업무를 빠르게 분해합니다.','hero.focus':'ERP / BOM 방향 · Agent 기반 업무 모델링','hero.scroll':'아래로 탐색',
      'screen2.title':'탐색','screen2.sub':'작품과 만들어 가는 생태계를 확인하세요',
      'card.about.label':'소개','card.about.desc':'ABOUT','card.contact.label':'연락처','card.contact.desc':'CONTACT',
      'card.portfolio.label':'포트폴리오','card.portfolio.desc':'PORTFOLIO','card.ecosystem.label':'Paddi Ecosystem','card.ecosystem.desc':'ECOSYSTEM',
      'card.sites.label':'개발 사이트','card.sites.desc':'SITE DIRECTORY','foot.copy':'Paddi Studio · JewwyWan · Copyright','foot.ecosystem':'paddi 생태계',
      'welcome.eyebrow':'Paddi Studio · 개인 사이트','welcome.title':'이 천재 아키텍트를 만나 보세요~','welcome.subtitle':'웹·모바일 앱·제품 아키텍처','welcome.start':'개인 사이트로 이동','welcome.foot':'Paddi Studio · JewwyWan · Copyright'
    }
  };
  const PAGE_COPY = {
    en: {
      about: { '.titlebar-path':'Paddi · <b>About</b>', '.titlebar-center':'JewwyWan · Website / App / Product', '.tab.active':'About me', '.status-pill':'<span class="dot" style="background:var(--green)"></span>Back home', '.rail-header span:first-child':'Explorer', '.hero-left .eyebrow':'Paddi Studio · About me', '.hero-left h1':'Wan<span class="grad">Jianwei</span>', '.role':'Web & mobile developer · Product architect', '.lede':'Hi, I\'m Paddi / JewwyWan. I take products from requirements through interaction, full stack, mobile, deployment and iteration.', '#about-bg h2':'What I do', '#about-edu h2':'Education', '#about-exp h2':'Experience', '#about-skills h2':'Capabilities', '#about-certs h2':'Credentials & awards', '#about-contact h2':'Contact me', '#about-skills .skill-block:nth-child(1) h4':'Web & backend', '#about-skills .skill-block:nth-child(2) h4':'Mobile & product', '#about-skills .skill-block:nth-child(3) h4':'AI & data', '#about-skills .skill-block:nth-child(4) h4':'Collaboration & delivery', '#about-skills .skill-block:nth-child(5) h4':'ERP / BOM transferable skills', '#about-skills .skill-block:nth-child(5) .cert:nth-child(1) .t':'Agent-assisted business modeling', '#about-skills .skill-block:nth-child(5) .cert:nth-child(1) .d':'I use Codex and other Agents to break business goals into pages, components, APIs, validation and acceptance tasks, creating a requirements-to-verification loop.', '#about-skills .skill-block:nth-child(5) .cert:nth-child(2) .t':'Master data & hierarchies', '#about-skills .skill-block:nth-child(5) .cert:nth-child(2) .d':'I have mapped roles, products, quotes, orders, accounts and state flows to pages, APIs and databases; this transfers to material codes, parent-child structures, versions, effective dates, units and substitutes in BOM work.', '#about-skills .skill-block:nth-child(5) .cert:nth-child(3) .t':'Modular delivery', '#about-skills .skill-block:nth-child(5) .cert:nth-child(3) .d':'I split complex work into modules, interface boundaries, permissions and acceptance checklists; ERP / BOM domain knowledge is the next area I am building.', '#about-contact .btn':'View QR codes & full contact →', '#back .btn':'← Back home' },
      contact: { '.titlebar-path':'Paddi · <b>Contact</b>', '.titlebar-center':'JewwyWan · Website / App / Product', '.tab.active':'Contact me', '.status-pill':'<span class="dot" style="background:var(--green)"></span>Back home', '.hero-left .eyebrow':'Paddi Studio · Contact', '.hero-left h1':'Contact <span class="grad">me</span>', '.role':'Web development · App development · Product architecture', '.lede':'For conversations about websites, mobile apps, product architecture or collaboration, send an email or scan to add WeChat, Work WeChat or WhatsApp.', '.hero-cta .pri':'Send email', '.hero-cta .ghost':'View portfolio', '#contact-cards h2':'Contact channels', '#contact-qr h2':'Scan to connect', '.cc-label:nth-child(1)':'Primary email', '.contact-note-footer':'Open to conversations about websites, mobile apps and product architecture.', '.qr-card:nth-child(1) .qr-name':'Scan to add Work WeChat', '.qr-card:nth-child(2) .qr-name':'Scan to add WeChat', '.qr-card:nth-child(3) .qr-name':'LoLo · WhatsApp' },
      portfolio: { '.titlebar-path':'Paddi · <b>Portfolio</b>', '.titlebar-center':'JewwyWan · Website / App / Product', '.status-pill':'<span class="dot" style="background:var(--green)"></span>Back home', '.hero-left .eyebrow':'Paddi Studio · Portfolio', '.hero-left h1':'Port<span class="grad">folio</span>', '.role':'Websites · Apps · Product architecture · AI engineering', '.lede':'Selected projects that show how I work: product goals, interface and system design, code, deployment, testing and long-term maintenance. Online links only point to addresses that currently respond.', '.hero-cta .pri':'GitHub profile', '.hero-cta .ghost':'Contact me', '#proj-list h2':'Project details', '#back .btn':'← Back home' },
      sites: { '.sites-kicker':'Paddi / Public Sites', '#page-title':'Public sites', '.sites-intro':'Only personal pages, product pages and service entrances that currently open are listed here. Old or local-only projects are not presented as live sites.', '.sites-count':'<span>06</span> entries', '.site-card:nth-child(1) h2':'Paddi Studio', '.site-card:nth-child(1) p':'My personal site with experience, capabilities, work and contact details.', '.site-card:nth-child(2) h2':'Paddi products', '.site-card:nth-child(2) p':'Public introductions, version information and installers for four Paddi products.', '.site-card:nth-child(3) h2':'Paddi ecosystem site', '.site-card:nth-child(3) p':'Product hub and official downloads showing current public test builds.', '.site-card:nth-child(4) p':'Official site and download entrance for chat and real-time interaction.', '.site-card:nth-child(5) p':'Account and authorization product for the Paddi ecosystem; it is an independent product entrance.', '.site-card:nth-child(6) p':'A two-player Chinese chess site running on the server with real-time games.', '.sites-note':'These entries were checked against the personal site, GitHub Pages and existing public server services. Projects without a stable public demo remain in the portfolio with their status stated.', '.sites-footer a':'Open Paddi ecosystem site' },
      ecosystem: { '.sites-kicker':'Paddi / Ecosystem', '.eco-intro':'A single map for mobile products, websites, services and public delivery entrances. Each line starts from a real need and moves through architecture, development, deployment and iteration.', '.eco-actions .primary':'Open Paddi ecosystem site <span>↗</span>', '.eco-actions .secondary':'View portfolio <span>→</span>', '#products-title':'Product lines in progress', '.eco-section-head:nth-of-type(1) .eco-section-note':'4 directions · one design and delivery language', '#architecture-title':'From idea to usable product', '.eco-section-head:nth-of-type(2) .eco-section-note':'Product architecture from a product manager perspective', '.eco-product-card:nth-child(1) p':'Android study tool for organizing wrong answers, from photo capture and scanning to preview and export.', '.eco-product-card:nth-child(2) p':'Android product and service for friends, media and real-time interaction, with clear relationship and privacy boundaries.', '.eco-product-card:nth-child(3) p':'Independent account and authorization entrance providing identity and access boundaries for ecosystem products.', '.eco-product-card:nth-child(4) p':'A product direction for AI conversations, document search and compact-window interaction.', '.eco-flow article:nth-child(1) strong':'Experience layer', '.eco-flow article:nth-child(1) p':'Websites, Android clients and clear user flows make products understandable and usable.', '.eco-flow article:nth-child(2) strong':'Service layer', '.eco-flow article:nth-child(2) p':'Accounts, APIs, data and permission boundaries connect products into a maintainable system.', '.eco-flow article:nth-child(3) strong':'Delivery layer', '.eco-flow article:nth-child(3) p':'Deployment, domains, versions, acceptance and rollback make each release verifiable.', '.eco-bottom-card:nth-child(1) h3':'Public sites', '.eco-bottom-card:nth-child(1) p':'Browse personal, product and service entrances that currently open.', '.eco-bottom-card:nth-child(1) b':'Browse sites →', '.eco-bottom-card:nth-child(2) h3':'Open source & experiments', '.eco-bottom-card:nth-child(2) p':'Chess, Android apps, AI platforms and machine-learning experiments.', '.eco-bottom-card:nth-child(2) b':'View portfolio →', '.eco-footer a':'Open Paddi ecosystem site' }
    },
    ja: {
      about: { '.titlebar-path':'Paddi · <b>私について</b>', '.titlebar-center':'JewwyWan · Website / App / Product', '.tab.active':'私について', '.status-pill':'<span class="dot" style="background:var(--green)"></span>ホームへ戻る', '.hero-left .eyebrow':'Paddi Studio · 私について', '.hero-left h1':'万<span class="grad">建偉</span>', '.role':'Web・モバイル開発者 · プロダクトアーキテクト', '.lede':'Paddi / JewwyWan です。要件定義からインタラクション、フルスタック、モバイル、デプロイ、継続改善まで担当します。', '#about-bg h2':'取り組んでいること', '#about-edu h2':'学歴', '#about-exp h2':'経験', '#about-skills h2':'スキル', '#about-certs h2':'資格・受賞', '#about-contact h2':'連絡先', '#about-skills .skill-block:nth-child(5) h4':'ERP / BOM に応用できる力', '#about-contact .btn':'QR と連絡先を見る →', '#back .btn':'← ホームへ戻る' },
      contact: { '.titlebar-path':'Paddi · <b>連絡先</b>', '.titlebar-center':'JewwyWan · Website / App / Product', '.tab.active':'連絡先', '.status-pill':'<span class="dot" style="background:var(--green)"></span>ホームへ戻る', '.hero-left .eyebrow':'Paddi Studio · 連絡先', '.hero-left h1':'連絡<span class="grad">先</span>', '.role':'Web開発 · アプリ開発 · プロダクト設計', '.hero-cta .pri':'メールを送る', '.hero-cta .ghost':'作品集を見る', '#contact-cards h2':'連絡方法', '#contact-qr h2':'QRで追加', '.contact-note-footer':'Web、モバイルアプリ、プロダクト設計についてお気軽にご連絡ください。', '.qr-card:nth-child(3) .qr-name':'LoLo · WhatsApp' },
      portfolio: { '.titlebar-path':'Paddi · <b>作品集</b>', '.titlebar-center':'JewwyWan · Website / App / Product', '.status-pill':'<span class="dot" style="background:var(--green)"></span>ホームへ戻る', '.hero-left .eyebrow':'Paddi Studio · 作品集', '.hero-left h1':'作品<span class="grad">集</span>', '.role':'Web · アプリ · プロダクト設計 · AI開発', '.hero-cta .pri':'GitHubを見る', '.hero-cta .ghost':'連絡する', '#proj-list h2':'プロジェクト詳細', '#back .btn':'← ホームへ戻る' },
      sites: { '.sites-kicker':'Paddi / Public Sites', '#page-title':'公開サイト', '.sites-intro':'現在開ける個人ページ、製品ページ、サービス入口だけを掲載しています。古いURLやローカル限定のプロジェクトは公開サイトとして表示しません。', '.sites-count':'<span>06</span> 入口', '.sites-note':'個人サイト、GitHub Pages、サーバー上の公開サービスを実測して確認しています。', '.sites-footer a':'Paddi エコシステムへ' },
      ecosystem: { '.sites-kicker':'Paddi / Ecosystem', '.eco-intro':'モバイル製品、Webサイト、サービス、公開入口を一つの地図にまとめています。各製品は実際の課題から始まり、設計、開発、デプロイ、改善へ進みます。', '.eco-actions .primary':'Paddi エコシステムへ <span>↗</span>', '.eco-actions .secondary':'作品集を見る <span>→</span>', '#products-title':'構築中の製品ライン', '#architecture-title':'アイデアから使える製品へ', '.eco-bottom-card:nth-child(1) h3':'公開サイト', '.eco-bottom-card:nth-child(1) b':'サイトを見る →', '.eco-bottom-card:nth-child(2) h3':'公開ソースと実験', '.eco-bottom-card:nth-child(2) b':'作品集を見る →', '.eco-footer a':'Paddi エコシステムへ' }
    },
    ko: {
      about: { '.titlebar-path':'Paddi · <b>소개</b>', '.titlebar-center':'JewwyWan · Website / App / Product', '.tab.active':'소개', '.status-pill':'<span class="dot" style="background:var(--green)"></span>홈으로', '.hero-left .eyebrow':'Paddi Studio · 소개', '.hero-left h1':'완<span class="grad">젠웨이</span>', '.role':'웹·모바일 개발자 · 제품 아키텍트', '.lede':'Paddi / JewwyWan입니다. 요구사항 정의부터 인터랙션, 풀스택, 모바일, 배포와 지속적인 개선까지 담당합니다.', '#about-bg h2':'하는 일', '#about-edu h2':'학력', '#about-exp h2':'경험', '#about-skills h2':'역량', '#about-certs h2':'자격 및 수상', '#about-contact h2':'연락처', '#about-skills .skill-block:nth-child(5) h4':'ERP / BOM 전환 역량', '#about-contact .btn':'QR 및 연락처 보기 →', '#back .btn':'← 홈으로' },
      contact: { '.titlebar-path':'Paddi · <b>연락처</b>', '.titlebar-center':'JewwyWan · Website / App / Product', '.tab.active':'연락처', '.status-pill':'<span class="dot" style="background:var(--green)"></span>홈으로', '.hero-left .eyebrow':'Paddi Studio · 연락처', '.hero-left h1':'연락<span class="grad">처</span>', '.role':'웹 개발 · 앱 개발 · 제품 아키텍처', '.hero-cta .pri':'이메일 보내기', '.hero-cta .ghost':'포트폴리오 보기', '#contact-cards h2':'연락 채널', '#contact-qr h2':'QR로 추가', '.contact-note-footer':'웹, 모바일 앱과 제품 아키텍처에 관한 연락을 기다립니다.', '.qr-card:nth-child(3) .qr-name':'LoLo · WhatsApp' },
      portfolio: { '.titlebar-path':'Paddi · <b>포트폴리오</b>', '.titlebar-center':'JewwyWan · Website / App / Product', '.status-pill':'<span class="dot" style="background:var(--green)"></span>홈으로', '.hero-left .eyebrow':'Paddi Studio · 포트폴리오', '.hero-left h1':'포트<span class="grad">폴리오</span>', '.role':'웹사이트 · 앱 · 제품 아키텍처 · AI 엔지니어링', '.hero-cta .pri':'GitHub 프로필', '.hero-cta .ghost':'연락하기', '#proj-list h2':'프로젝트 상세', '#back .btn':'← 홈으로' },
      sites: { '.sites-kicker':'Paddi / Public Sites', '#page-title':'공개 사이트', '.sites-intro':'현재 열리는 개인 페이지, 제품 페이지와 서비스 입구만 소개합니다. 오래된 주소나 로컬 전용 프로젝트는 온라인 사이트처럼 표시하지 않습니다.', '.sites-count':'<span>06</span>개 입구', '.sites-note':'개인 사이트, GitHub Pages와 서버 공개 서비스를 실제로 확인한 목록입니다.', '.sites-footer a':'Paddi 생태계 열기' },
      ecosystem: { '.sites-kicker':'Paddi / Ecosystem', '.eco-intro':'모바일 제품, 웹사이트, 서비스와 공개 배포 입구를 하나의 지도에 담았습니다. 각 제품은 실제 요구에서 시작해 설계, 개발, 배포와 반복 개선으로 이어집니다.', '.eco-actions .primary':'Paddi 생태계 열기 <span>↗</span>', '.eco-actions .secondary':'포트폴리오 보기 <span>→</span>', '#products-title':'구축 중인 제품 라인', '#architecture-title':'아이디어에서 사용 가능한 제품까지', '.eco-bottom-card:nth-child(1) h3':'공개 사이트', '.eco-bottom-card:nth-child(1) b':'사이트 보기 →', '.eco-bottom-card:nth-child(2) h3':'오픈소스와 실험', '.eco-bottom-card:nth-child(2) b':'포트폴리오 보기 →', '.eco-footer a':'Paddi 생태계 열기' }
    }
  };
  function getLang() { const value = localStorage.getItem(STORAGE_KEY); return SUPPORTED.includes(value) ? value : 'zh'; }
  function applyPageCopy(lang) {
    const page = document.documentElement.dataset.page;
    const dict = PAGE_COPY[lang]?.[page];
    if (!dict) return;
    Object.entries(dict).forEach(([selector, value]) => document.querySelectorAll(selector).forEach((el) => { el.innerHTML = value; }));
  }
  function applyLang(lang) {
    const currentLang = SUPPORTED.includes(lang) ? lang : 'zh';
    const dict = I18N[currentLang];
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : currentLang;
    document.querySelectorAll('[data-i18n]').forEach((el) => { const value = dict[el.getAttribute('data-i18n')]; if (value !== undefined) el.textContent = value; });
    applyPageCopy(currentLang);
    const current = document.getElementById('langCurrent'); if (current) current.textContent = LANG_LABELS[currentLang];
    document.querySelectorAll('.lang-option').forEach((option) => { const active = option.dataset.lang === currentLang; option.classList.toggle('active', active); option.setAttribute('aria-checked', String(active)); });
    document.querySelectorAll('[data-lang-current]').forEach((el) => { el.textContent = LANG_LABELS[currentLang]; });
    document.querySelectorAll('[data-lang-option]').forEach((option) => { const active = option.dataset.langOption === currentLang; option.classList.toggle('active', active); option.setAttribute('aria-checked', String(active)); });
    localStorage.setItem(STORAGE_KEY, currentLang);
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: currentLang } }));
  }
  window.I18N = { applyLang, getLang, SUPPORTED, LANG_LABELS, DICT: I18N };
  function installPageLanguageControl() {
    if (document.getElementById('langToggle')) return;
    const host = document.querySelector('.titlebar-right') || document.querySelector('.eco-header-actions') || document.querySelector('.sites-header');
    if (!host) return;
    const wrap = document.createElement('div'); wrap.className = 'page-lang';
    wrap.innerHTML = '<button class="page-lang-btn" id="langToggle" type="button" aria-label="切换语言" aria-haspopup="menu" aria-expanded="false"><span aria-hidden="true">◎</span><span data-lang-current>中文</span><span aria-hidden="true">⌄</span></button><div class="page-lang-dropdown" id="langDropdown" role="menu" aria-label="语言选项"><button type="button" data-lang-option="zh" role="menuitemradio" aria-checked="false">中文</button><button type="button" data-lang-option="en" role="menuitemradio" aria-checked="false">English</button><button type="button" data-lang-option="ja" role="menuitemradio" aria-checked="false">日本語</button><button type="button" data-lang-option="ko" role="menuitemradio" aria-checked="false">한국어</button></div>';
    host.appendChild(wrap);
  }
  function init() {
    installPageLanguageControl();
    const toggle = document.getElementById('langToggle'), dropdown = document.getElementById('langDropdown');
    const setOpen = (open) => { if (!dropdown || !toggle) return; dropdown.classList.toggle('open', open); toggle.setAttribute('aria-expanded', String(open)); };
    if (toggle && dropdown) { toggle.addEventListener('click', (event) => { event.stopPropagation(); setOpen(!dropdown.classList.contains('open')); }); document.addEventListener('click', (event) => { if (!dropdown.contains(event.target) && !toggle.contains(event.target)) setOpen(false); }); document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setOpen(false); }); }
    document.querySelectorAll('.lang-option, [data-lang-option]').forEach((option) => option.addEventListener('click', () => { applyLang(option.dataset.lang || option.dataset.langOption); setOpen(false); }));
    applyLang(getLang());
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
