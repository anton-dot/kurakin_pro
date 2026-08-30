(() => {
  const images = [...document.querySelectorAll('.bmaker-shot-image')];
  if (!images.length || !('HTMLDialogElement' in window)) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'bmaker-lightbox';
  dialog.setAttribute('aria-label', document.documentElement.lang === 'ru' ? 'Увеличенный скриншот B-Maker' : 'Enlarged B-Maker screenshot');
  const shell = document.createElement('div');
  shell.className = 'bmaker-lightbox-shell';
  const close = document.createElement('button');
  close.className = 'bmaker-lightbox-close';
  close.type = 'button';
  close.setAttribute('aria-label', document.documentElement.lang === 'ru' ? 'Закрыть' : 'Close');
  close.textContent = '×';
  const full = document.createElement('img');
  full.className = 'bmaker-lightbox-image';
  full.alt = '';
  const caption = document.createElement('p');
  caption.className = 'bmaker-lightbox-caption';
  shell.append(close, full, caption);
  dialog.append(shell);
  document.body.append(dialog);

  let lastFocused = null;
  const closeDialog = () => dialog.open && dialog.close();
  const openImage = (img) => {
    lastFocused = img;
    full.src = img.currentSrc || img.src;
    full.alt = img.alt || '';
    caption.textContent = img.alt || 'B-Maker';
    document.body.classList.add('bmaker-lightbox-open');
    dialog.showModal();
    close.focus();
  };

  images.forEach((img) => {
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', `${img.alt || 'B-Maker'} — ${document.documentElement.lang === 'ru' ? 'увеличить' : 'enlarge'}`);
    img.addEventListener('click', () => openImage(img));
    img.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openImage(img);
      }
    });
  });
  close.addEventListener('click', closeDialog);
  shell.addEventListener('click', (event) => event.target === shell && closeDialog());
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeDialog();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('bmaker-lightbox-open');
    full.removeAttribute('src');
    if (lastFocused) lastFocused.focus();
  });
})();

(() => {
  const body = document.body;
  if (!body || body.dataset.page !== 'project-detail' || !/(^|\/)projects\/b-maker\.html$/.test(window.location.pathname)) return;

  const isRu = body.dataset.lang === 'ru' || document.documentElement.lang === 'ru';
  const storiesRoot = 'b-maker/stories/';
  const linkLabel = isRu ? 'Посмотреть сценарий →' : 'See how it works →';

  function storyLink(slug, light = false) {
    const p = document.createElement('p');
    p.className = 'bmaker-story-link';
    p.style.marginTop = '18px';
    const a = document.createElement('a');
    a.href = `${storiesRoot}${slug}.html`;
    a.className = 'text-link';
    a.textContent = linkLabel;
    a.style.fontWeight = '800';
    if (light) a.style.color = 'var(--bm-mint)';
    p.append(a);
    return p;
  }

  function connectShot(fileName, slug) {
    const image = document.querySelector(`img[src*="${fileName}"]`);
    const copy = image?.closest('.bmaker-section')?.querySelector('.bmaker-section-copy');
    if (!copy || copy.querySelector('.bmaker-story-link')) return;
    copy.append(storyLink(slug));
  }

  [
    ['bmaker-articles.webp', 'from-articles-to-book'],
    ['bmaker-manuscript.webp', 'write-in-sections-read-as-one-manuscript'],
    ['bmaker-collections.webp', 'one-manuscript-several-views'],
    ['bmaker-idea-map.webp', 'from-idea-to-chapter'],
    ['bmaker-story.webp', 'characters-and-plot-without-spreadsheet'],
    ['bmaker-versions.webp', 'no-more-final-final-docx'],
    ['bmaker-analytics.webp', 'editorial-checks-before-publishing'],
    ['bmaker-publishing.webp', 'from-manuscript-to-publishing-package']
  ].forEach(([fileName, slug]) => connectShot(fileName, slug));

  const featureStories = isRu
    ? new Map([['Цели и сессии', 'writing-goals-and-sessions'], ['Импорт', 'import-existing-manuscript']])
    : new Map([['Goals and sessions', 'writing-goals-and-sessions'], ['Import', 'import-existing-manuscript']]);

  document.querySelectorAll('.bmaker-feature').forEach((feature) => {
    const slug = featureStories.get(feature.querySelector('strong')?.textContent?.trim());
    if (!slug || feature.querySelector('.bmaker-story-link')) return;
    const link = storyLink(slug);
    link.style.marginBottom = '0';
    feature.append(link);
  });

  const localCopy = document.querySelector('.bmaker-local-grid > div:first-child');
  if (localCopy && !localCopy.querySelector('.bmaker-story-link')) localCopy.append(storyLink('local-first-writing-workflow', true));

  if (!document.querySelector('.bmaker-stories-block')) {
    const strings = isRu
      ? {
          eyebrow: 'B-Maker Stories',
          title: 'Посмотрите, как это работает в реальном проекте.',
          lead: 'Не ещё один список функций. Короткие сценарии показывают путь от конкретной авторской проблемы до рабочего процесса в B-Maker.',
          all: 'Все 12 сценариев →',
          cards: [
            ['Быстрый старт', 'Сначала пишите', 'Почему первая задача программы для письма — дать вам начать текст, а структуру добавить позже.', 'start-writing-first'],
            ['Idea Map', 'От идеи до главы', 'Как сырая заметка постепенно становится частью настоящей рукописи без копирования между приложениями.', 'from-idea-to-chapter'],
            ['Версии', 'Больше никаких final-final.docx', 'Как именованные версии, сравнение и блокировка меняют процесс переписывания текста.', 'no-more-final-final-docx']
          ]
        }
      : {
          eyebrow: 'B-Maker Stories',
          title: 'See how it works in a real project.',
          lead: 'Not another feature list. Short workflows start with a concrete writing problem and follow it through B-Maker.',
          all: 'See all 12 stories →',
          cards: [
            ['Fast start', 'Start writing first', 'Why the first job of writing software is to let you write — and let structure arrive later.', 'start-writing-first'],
            ['Idea Map', 'From idea to chapter', 'How a loose note gradually becomes part of the real manuscript without copying between tools.', 'from-idea-to-chapter'],
            ['Versions', 'No more final-final.docx', 'How named versions, comparison and locking change the way revision works.', 'no-more-final-final.docx']
          ]
        };

    const section = document.createElement('section');
    section.className = 'bmaker-section alt bmaker-stories-block';
    const inner = document.createElement('div');
    inner.className = 'bmaker-section-inner';
    inner.innerHTML = `<p class="bmaker-eyebrow">${strings.eyebrow}</p><h2>${strings.title}</h2><p style="color:var(--ink-soft);max-width:720px">${strings.lead}</p>`;
    const grid = document.createElement('div');
    grid.className = 'bmaker-guide-grid';
    strings.cards.forEach(([kicker, title, description, slug]) => {
      const card = document.createElement('a');
      card.className = 'bmaker-guide-card';
      card.href = `${storiesRoot}${slug}.html`;
      card.innerHTML = `<small>${kicker}</small><h2>${title}</h2><p>${description}</p><span>${isRu ? 'Читать историю →' : 'Read the story →'}</span>`;
      grid.append(card);
    });
    const all = document.createElement('p');
    all.style.marginTop = '26px';
    all.innerHTML = `<a class="text-link" href="${storiesRoot}">${strings.all}</a>`;
    inner.append(grid, all);
    section.append(inner);
    document.querySelector('.bmaker-compare-block')?.before(section);
  }

  const macUrl = 'https://kurakin.pro/downloads/bmaker/B-Maker-Setup-macos.zip';
  const winUrl = 'https://kurakin.pro/downloads/bmaker/B-Maker-Setup-win.zip';
  const webUrl = 'https://b-maker.kurakin.pro/';
  const ua = navigator.userAgent || '';
  const isMac = /Macintosh|Mac OS X/.test(ua) && !/iPhone|iPad|iPod/.test(ua);
  const isWindows = /Windows/.test(ua);

  const labels = isRu
    ? {
        mac: 'Скачать для macOS',
        win: 'Скачать для Windows',
        web: 'Открыть в браузере',
        intro: 'Используйте нативное приложение на macOS или Windows. На других устройствах B-Maker доступен в современном браузере.',
        macDesc: 'Нативное desktop-приложение для Mac с локальными файлами проектов.',
        winDesc: 'Нативное desktop-приложение для Windows с локальными файлами проектов.',
        webDesc: 'Работайте в браузере на Linux, Chromebook, планшете или другом устройстве.'
      }
    : {
        mac: 'Download for macOS',
        win: 'Download for Windows',
        web: 'Open in browser',
        intro: 'Use the native app on macOS or Windows. On other devices, B-Maker runs in a modern browser.',
        macDesc: 'Native desktop app for Mac with local project files.',
        winDesc: 'Native desktop app for Windows with local project files.',
        webDesc: 'Use B-Maker in a browser on Linux, Chromebook, tablets, and other devices.'
      };

  function action(kind, primary = false) {
    const a = document.createElement('a');
    const data = kind === 'mac' ? [macUrl, labels.mac] : kind === 'win' ? [winUrl, labels.win] : [webUrl, labels.web];
    a.className = `button ${primary ? 'primary' : 'secondary'}`;
    a.href = data[0];
    a.textContent = data[1];
    if (kind === 'web') {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    } else {
      a.setAttribute('download', '');
    }
    return a;
  }

  const preferred = isMac ? 'mac' : isWindows ? 'win' : 'web';
  const order = preferred === 'mac' ? ['mac', 'win', 'web'] : preferred === 'win' ? ['win', 'mac', 'web'] : ['web', 'mac', 'win'];
  document.querySelectorAll('.bmaker-hero .bmaker-actions, .bmaker-cta .bmaker-actions').forEach((wrap) => {
    wrap.replaceChildren(...order.map((kind, index) => action(kind, index === 0)));
  });

  const kicker = document.querySelector('.bmaker-kicker span:last-child');
  if (kicker) kicker.textContent = 'macOS + Windows + Web';

  const platforms = document.querySelector('.bmaker-platforms');
  if (platforms) {
    const intro = platforms.querySelector('.bmaker-section-inner > p:not(.bmaker-eyebrow)');
    if (intro) intro.textContent = labels.intro;
    const grid = platforms.querySelector('.bmaker-platform-grid');
    if (grid) {
      grid.replaceChildren();
      const cards = [
        ['macOS', labels.macDesc, 'mac'],
        ['Windows', labels.winDesc, 'win'],
        ['Web', labels.webDesc, 'web']
      ];
      cards.forEach(([title, description, kind]) => {
        const card = document.createElement('article');
        card.className = 'bmaker-platform-card';
        const h = document.createElement('h3');
        h.textContent = title;
        const p = document.createElement('p');
        p.textContent = description;
        card.append(h, p, action(kind, kind === preferred));
        grid.append(card);
      });
    }
  }

  const style = document.createElement('style');
  style.textContent = '.bmaker-platform-grid{grid-template-columns:repeat(3,minmax(0,1fr))}@media(max-width:980px){.bmaker-platform-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:680px){.bmaker-platform-grid{grid-template-columns:1fr}}';
  document.head.append(style);

  document.title = isRu
    ? 'B-Maker — приложение для книг и статей на macOS, Windows и Web'
    : 'B-Maker — Book and Article Writing Software for macOS, Windows and Web';
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = isRu
    ? 'B-Maker — local-first приложение для книг и коллекций статей на macOS, Windows и Web: пишите, организуйте, связывайте идеи, редактируйте, анализируйте и готовьте тексты к публикации в одном переносимом проекте.'
    : 'B-Maker is local-first writing software for macOS, Windows and Web: write, organize, map ideas, revise, analyze, and publish books and article collections in one portable project.';

  const ld = document.querySelector('script[type="application/ld+json"]');
  if (ld) {
    try {
      const schema = JSON.parse(ld.textContent);
      schema.operatingSystem = 'macOS, Windows, Web';
      schema.downloadUrl = [macUrl, winUrl];
      ld.textContent = JSON.stringify(schema);
    } catch (_) {}
  }
})();

(() => {
  const measurementId = 'G-8F31VPYZVV';

  function analytics() {
    if (typeof window.gtag === 'function') return window.gtag;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', measurementId);

    if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`)) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.append(script);
    }

    return window.gtag;
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('a[href]');
    if (!link) return;
    const href = link.href || '';
    let eventName = null;
    if (href.includes('/downloads/bmaker/B-Maker-Setup-macos.zip')) eventName = 'bmaker_download_macos';
    else if (href.includes('/downloads/bmaker/B-Maker-Setup-win.zip')) eventName = 'bmaker_download_windows';
    else if (/^https:\/\/b-maker\.kurakin\.pro\/?(?:[?#].*)?$/.test(href)) eventName = 'bmaker_open_web';
    if (!eventName) return;

    analytics()('event', eventName, {
      link_url: href,
      link_text: (link.textContent || '').trim(),
      page_path: window.location.pathname,
      page_language: document.documentElement.lang || document.body?.dataset?.lang || ''
    });
  });
})();
