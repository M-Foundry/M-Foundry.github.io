const translations = {
  zh: {
    skipLink: '跳转到正文',
    brandAria: 'M-Foundry，返回顶部',
    navAria: '主导航',
    themeSwitchToDark: '切换到暗黑模式',
    themeSwitchToLight: '切换到浅色模式',
    heroFirst: 'Make',
    heroSecond: 'Something',
    heroIntroBefore: 'M-Foundry 是独立开发者 ',
    heroIntroAfter: ' 的产品集，以 MChat 为起点，逐步拓展至更多软件与工具，系列产品将会在持续开发与迭代中不断生长',
    exploreProjects: '探索项目',
    workTitle: '项目',
    chatLogoAlt: 'MChat 标识',
    chatTitleFirst: 'Android AI',
    chatTitleSecond: '聊天客户端',
    chatDescription: '一款为 MiMo 大模型优化，专注于原生 Android 体验的 AI 聊天客户端',
    chatFeaturesAria: 'MChat 功能',
    chatTagMaterialYou: 'Material You 设计',
    chatTagMultimodal: '多模态输入',
    chatTagLatex: 'LaTeX 渲染',
    chatTagCode: '代码高亮',
    getChat: '获取发行版',
    viewSource: '查看源码',
    chatVisualAria: 'MChat 应用截图',
    m3lLogoAlt: 'M3L 标识',
    m3lTitleFirst: 'Compose',
    m3lTitleSecond: '内容渲染库',
    m3lDescription: '一个面向 Android Jetpack Compose 的 Markdown、LaTeX 与代码高亮渲染器，它从 MChat 抽离而来，专注于内容渲染',
    m3lFeaturesAria: 'M3L 功能',
    m3lTagHighlight: '代码高亮',
    m3lTagStreaming: '流式渲染',
    m3lTagTheme: '主题色注入',
    exploreM3l: '开始使用',
    quickStart: '查看源码',
    m3lVisualAria: 'Markdown、公式与代码渲染插画',
    m3lScreenshotAlt: 'M3L 渲染效果截图',
    description: 'M-Foundry 是独立开发者 MRoldL001 的产品集。从原生 Android AI 聊天客户端 MChat，到 Markdown、LaTeX 与代码渲染库 M3L。',
    ogDescription: '从 MChat 到 M3L，探索 M-Foundry 的开源产品与工具。'
  },
  en: {
    skipLink: 'Skip to content',
    brandAria: 'M-Foundry, back to top',
    navAria: 'Main navigation',
    themeSwitchToDark: 'Switch to dark mode',
    themeSwitchToLight: 'Switch to light mode',
    heroFirst: 'Make',
    heroSecond: 'Something',
    heroIntroBefore: 'M-Foundry is a collection of products by independent developer ',
    heroIntroAfter: '. Starting with MChat, it continues to grow through new software and tools as each product is developed and refined.',
    exploreProjects: 'Explore Projects',
    workTitle: 'Projects',
    chatLogoAlt: 'MChat logo',
    chatTitleFirst: 'Android AI',
    chatTitleSecond: 'Chat Client',
    chatDescription: 'An AI chat client optimized for the MiMo large model, built for a native Android experience',
    chatFeaturesAria: 'MChat features',
    chatTagMaterialYou: 'Material You design',
    chatTagMultimodal: 'Multimodal input',
    chatTagLatex: 'LaTeX rendering',
    chatTagCode: 'Syntax highlighting',
    getChat: 'Get Release',
    viewSource: 'view source',
    chatVisualAria: 'Screenshot of the MChat app',
    m3lLogoAlt: 'M3L logo',
    m3lTitleFirst: 'Compose',
    m3lTitleSecond: 'Rendering Library',
    m3lDescription: 'An Android Jetpack Compose renderer for Markdown, LaTeX, and syntax-highlighted code, Extracted from MChat, M3L focuses on rendering only',
    m3lFeaturesAria: 'M3L features',
    m3lTagHighlight: 'Syntax highlighting',
    m3lTagStreaming: 'Streaming',
    m3lTagTheme: 'Theme color injection',
    exploreM3l: 'Get Started',
    quickStart: 'view source',
    m3lVisualAria: 'Illustration of Markdown, math, and code rendering',
    m3lScreenshotAlt: 'Screenshot of M3L rendering output',
    description: 'M-Foundry is a collection of products by independent developer MRoldL001, including the MChat Android AI client and the M3L Markdown and LaTeX rendering library.',
    ogDescription: 'Explore M-Foundry’s open-source products, from MChat to M3L.'
  }
};

const languageToggle = document.getElementById('language-toggle');
const themeToggle = document.getElementById('theme-toggle');
let currentLanguage = 'zh';
let currentTheme = 'light';
let heroTypingTimer;
const heroCursor = document.querySelector('.hero-cursor');

try {
  currentLanguage = localStorage.getItem('m-foundry-language') === 'en' ? 'en' : 'zh';
  currentTheme = localStorage.getItem('m-foundry-theme') === 'dark' ? 'dark' : 'light';
} catch {}

function setTheme(theme) {
  currentTheme = theme;
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  themeToggle.textContent = theme === 'dark' ? '☀' : '☾';
  themeToggle.setAttribute('aria-label', translations[currentLanguage][theme === 'dark' ? 'themeSwitchToLight' : 'themeSwitchToDark']);
}

function setLanguage(language) {
  const copy = translations[language];
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  heroCursor?.remove();

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = copy[element.dataset.i18n];
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
    element.setAttribute('aria-label', copy[element.dataset.i18nAria]);
  });
  document.querySelectorAll('[data-i18n-alt]').forEach((element) => {
    element.setAttribute('alt', copy[element.dataset.i18nAlt]);
  });

  document.querySelector('meta[name="description"]').content = copy.description;
  document.querySelector('meta[property="og:description"]').content = copy.ogDescription;
  document.querySelector('.phone-screenshot').src = language === 'zh' ? 'assets/mchat.jpg' : 'assets/mchat-en.jpg';
  document.querySelector('.m3l-screenshot').src = language === 'zh' ? 'assets/m3l.jpg' : 'assets/m3l-en.jpg';
  languageToggle.textContent = language === 'zh' ? 'EN' : '中文';
  languageToggle.lang = language === 'zh' ? 'en' : 'zh-CN';
  languageToggle.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换为中文');
  themeToggle.setAttribute('aria-label', translations[language][currentTheme === 'dark' ? 'themeSwitchToLight' : 'themeSwitchToDark']);
}

function typeHeroTitle() {
  const first = document.querySelector('[data-i18n="heroFirst"]');
  const second = document.querySelector('[data-i18n="heroSecond"]');
  const cursor = heroCursor;
  if (!first || !second || !cursor) return;

  clearTimeout(heroTypingTimer);
  const firstText = first.textContent;
  const secondText = second.textContent;
  first.textContent = '';
  second.textContent = '';
  cursor.textContent = '_';
  cursor.classList.remove('is-ending');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    first.textContent = firstText;
    second.textContent = secondText;
    cursor.classList.add('is-ending');
    second.append(cursor);
    return;
  }

  const type = (element, text, index, next) => {
    element.textContent = text.slice(0, index);
    element.append(cursor);
    cursor.classList.remove('is-ending');
    if (index < text.length) {
      heroTypingTimer = setTimeout(() => type(element, text, index + 1, next), 85);
    } else if (next) {
      heroTypingTimer = setTimeout(next, 180);
    } else {
      cursor.classList.add('is-ending');
    }
  };

  type(first, firstText, 0, () => type(second, secondText, 0));
}

setTheme(currentTheme);
requestAnimationFrame(() => document.documentElement.classList.add('theme-ready'));
setLanguage(currentLanguage);
typeHeroTitle();

const projectCards = [...document.querySelectorAll('.project-card')];
if (projectCards.length) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  projectCards.forEach((card, index) => {
    card.classList.add('reveal-ready', index % 2 === 0 ? 'reveal-left' : 'reveal-right');
  });

  if (reducedMotion || !('IntersectionObserver' in window)) {
    projectCards.forEach((card) => card.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {threshold: 0.16, rootMargin: '0px 0px -8%'});
    projectCards.forEach((card) => revealObserver.observe(card));
  }
}

const heroArt = document.querySelector('.hero-art');
if (heroArt) {
  let activePointer = null;
  let bounds;

  const renderPose = (x, y) => {
    const shadowX = 17 - x * 24;
    const shadowY = 18 - y * 24;
    heroArt.style.setProperty('--tilt-x', `${-y * 10}deg`);
    heroArt.style.setProperty('--tilt-y', `${x * 10}deg`);
    heroArt.style.setProperty('--parallax-x', `${x * 10}px`);
    heroArt.style.setProperty('--parallax-y', `${y * 10}px`);
    heroArt.style.setProperty('--shadow-x', `${shadowX}px`);
    heroArt.style.setProperty('--shadow-y', `${shadowY}px`);
    heroArt.style.setProperty('--shadow-soft-x', `${shadowX + 4}px`);
    heroArt.style.setProperty('--shadow-soft-y', `${shadowY + 6}px`);
    heroArt.style.setProperty('--shadow-blur', `${10 + Math.hypot(x, y) * 6}px`);
  };

  const updatePointer = (event) => {
    const x = Math.max(-0.5, Math.min(0.5, (event.clientX - bounds.left) / bounds.width - 0.5));
    const y = Math.max(-0.5, Math.min(0.5, (event.clientY - bounds.top) / bounds.height - 0.5));
    renderPose(x, y);
  };

  heroArt.addEventListener('pointerdown', (event) => {
    if (activePointer !== null || event.button !== 0) return;
    activePointer = event.pointerId;
    bounds = heroArt.getBoundingClientRect();
    heroArt.setPointerCapture(event.pointerId);
    heroArt.classList.add('is-pressing');
    updatePointer(event);
  });
  heroArt.addEventListener('pointermove', (event) => {
    if (event.pointerId === activePointer) updatePointer(event);
  });
  const releasePointer = (event) => {
    if (event.pointerId !== activePointer) return;
    activePointer = null;
    heroArt.classList.remove('is-pressing');
    renderPose(0, 0);
  };
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((type) => {
    heroArt.addEventListener(type, releasePointer);
  });
}

requestAnimationFrame(() => {
  if (location.hash) {
    document.querySelector(location.hash)?.scrollIntoView({block: 'start'});
  } else {
    window.scrollTo(0, 0);
  }
});

languageToggle.addEventListener('click', () => {
  currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
  setLanguage(currentLanguage);
  typeHeroTitle();
  try {
    localStorage.setItem('m-foundry-language', currentLanguage);
  } catch {}
});

themeToggle.addEventListener('click', () => {
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  try {
    localStorage.setItem('m-foundry-theme', currentTheme);
  } catch {}
});
