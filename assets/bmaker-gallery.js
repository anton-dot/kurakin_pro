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
  const explainedRoot = 'b-maker/explained/';
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
    ['bmaker-manuscript.webp', 'read-whole-manuscript'],
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
          explained: 'А для чего вообще нужна эта функция? B-Maker Explained →',
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
          explained: 'What is this feature actually for? B-Maker Explained →',
          cards: [
            ['Fast start', 'Start writing first', 'Why the first job of writing software is to let you write — and let structure arrive later.', 'start-writing-first'],
            ['Idea Map', 'From idea to chapter', 'How a loose note gradually becomes part of the real manuscript without copying between tools.', 'from-idea-to-chapter'],
            ['Versions', 'No more final-final.docx', 'How named versions, comparison and locking change the way revision works.', 'no-more-final-final-docx']
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
    const explained = document.createElement('p');
    explained.style.marginTop = '10px';
    explained.innerHTML = `<a class="text-link" href="${explainedRoot}">${strings.explained}</a>`;
    inner.append(grid, all, explained);
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
        mac: 'Скачать для macOS', win: 'Скачать для Windows', web: 'Открыть в браузере',
        intro: 'Используйте нативное приложение на macOS или Windows. На других устройствах B-Maker доступен в современном браузере.',
        macDesc: 'Нативное desktop-приложение для Mac с локальными файлами проектов.',
        winDesc: 'Нативное desktop-приложение для Windows с локальными файлами проектов.',
        webDesc: 'Работайте в браузере на Linux, Chromebook, планшете или другом устройстве.'
      }
    : {
        mac: 'Download for macOS', win: 'Download for Windows', web: 'Open in browser',
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
    if (kind === 'web') { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    else a.setAttribute('download', '');
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
      [['macOS', labels.macDesc, 'mac'], ['Windows', labels.winDesc, 'win'], ['Web', labels.webDesc, 'web']].forEach(([title, description, kind]) => {
        const card = document.createElement('article');
        card.className = 'bmaker-platform-card';
        const h = document.createElement('h3'); h.textContent = title;
        const p = document.createElement('p'); p.textContent = description;
        card.append(h, p, action(kind, kind === preferred));
        grid.append(card);
      });
    }
  }

  const style = document.createElement('style');
  style.textContent = '.bmaker-platform-grid{grid-template-columns:repeat(3,minmax(0,1fr))}@media(max-width:980px){.bmaker-platform-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:680px){.bmaker-platform-grid{grid-template-columns:1fr}}';
  document.head.append(style);

  document.title = isRu ? 'B-Maker — приложение для книг и статей на macOS, Windows и Web' : 'B-Maker — Book and Article Writing Software for macOS, Windows and Web';
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
  const path = window.location.pathname;
  if (!/(^|\/)projects\/b-maker\/(stories|compare)\//.test(path)) return;
  if (document.querySelector('.bmaker-explained-related')) return;

  const isRu = document.documentElement.lang === 'ru' || document.body?.dataset?.lang === 'ru';
  const parts = path.split('/').filter(Boolean);
  const sectionIndex = parts.findIndex((part) => part === 'stories' || part === 'compare');
  if (sectionIndex < 0) return;
  const section = parts[sectionIndex];
  const slug = (parts[sectionIndex + 1] || '').replace(/\.html$/, '');
  if (!slug || slug === 'index') return;

  const storyMap = {
    'import-existing-manuscript': ['why-import-docx', 'why-several-safety-layers'],
    'from-idea-to-chapter': ['why-idea-map', 'why-project-aware-idea-map', 'why-convert-idea-to-manuscript'],
    'from-articles-to-book': ['collections-vs-saved-search', 'why-hide-or-exclude-sections', 'why-export-one-section'],
    'read-whole-manuscript': ['why-full-manuscript-view', 'focus-mode-vs-split-view', 'rich-editor-vs-portable-markdown', 'why-current-version'],
    'one-manuscript-several-views': ['manuscript-tree-vs-board', 'collections-vs-saved-search', 'why-project-aware-idea-map'],
    'characters-and-plot-without-spreadsheet': ['why-characters-relationships-arc-points', 'why-plotlines', 'why-locations', 'why-story-grid'],
    'writing-goals-and-sessions': ['why-goals-and-sessions', 'why-writing-metrics'],
    'no-more-final-final-docx': ['why-text-versions', 'why-current-version', 'why-compare-versions', 'why-lock-a-version'],
    'editorial-checks-before-publishing': ['why-editorial-checks', 'why-writing-metrics'],
    'from-manuscript-to-publishing-package': ['preview-vs-export', 'why-publishing-package', 'why-ai-use-declaration', 'why-project-assets'],
    'local-first-writing-workflow': ['why-local-first', 'version-vs-backup', 'why-integrity-check', 'why-several-safety-layers', 'why-project-assets']
  };
  const compareMap = {
    'manuscript-version-management': ['why-text-versions', 'why-current-version', 'why-compare-versions', 'why-lock-a-version'],
    'writing-software-with-idea-map': ['why-idea-map', 'why-project-aware-idea-map', 'why-multiple-idea-maps', 'why-convert-idea-to-manuscript'],
    'local-first-writing-software': ['why-local-first', 'why-several-safety-layers', 'why-project-assets'],
    'how-to-organize-a-novel': ['manuscript-tree-vs-board', 'why-characters-relationships-arc-points', 'why-plotlines', 'why-story-grid'],
    'turn-articles-into-a-book': ['collections-vs-saved-search', 'why-hide-or-exclude-sections', 'why-export-one-section'],
    'novel-writing-software': ['why-characters-relationships-arc-points', 'why-plotlines', 'why-story-grid', 'why-locations'],
    'nonfiction-writing-software': ['collections-vs-saved-search', 'why-idea-map', 'rich-editor-vs-portable-markdown'],
    'writing-software-for-articles-and-books': ['collections-vs-saved-search', 'why-hide-or-exclude-sections', 'why-export-one-section']
  };
  const slugs = (section === 'stories' ? storyMap : compareMap)[slug];
  if (!slugs?.length) return;

  const titleMap = {
    'why-text-versions': ['Зачем версии текста?', 'Why text versions?'],
    'why-current-version': ['Зачем Current Version?', 'Why a current version?'],
    'why-compare-versions': ['Зачем сравнивать версии?', 'Why compare versions?'],
    'why-lock-a-version': ['Зачем блокировать версию?', 'Why lock a version?'],
    'why-import-docx': ['Зачем импортировать DOCX?', 'Why import a DOCX?'],
    'why-several-safety-layers': ['Зачем несколько слоёв безопасности?', 'Why several safety layers?'],
    'why-idea-map': ['Зачем Idea Map?', 'Why an Idea Map?'],
    'why-project-aware-idea-map': ['Зачем project-aware Idea Map?', 'Why a project-aware Idea Map?'],
    'why-convert-idea-to-manuscript': ['Зачем превращать идею в рукопись?', 'Why turn an idea into manuscript?'],
    'why-multiple-idea-maps': ['Зачем несколько Idea Map?', 'Why several Idea Maps?'],
    'collections-vs-saved-search': ['Collection или Saved Search?', 'Collection vs saved search'],
    'why-hide-or-exclude-sections': ['Зачем скрывать или исключать разделы?', 'Why hide or exclude sections?'],
    'why-export-one-section': ['Зачем экспортировать один раздел?', 'Why export one section?'],
    'why-full-manuscript-view': ['Зачем читать всю рукопись?', 'Why read the whole manuscript?'],
    'focus-mode-vs-split-view': ['Focus Mode vs Split View', 'Focus Mode vs Split View'],
    'rich-editor-vs-portable-markdown': ['Rich Editor vs portable Markdown', 'Rich editor vs portable Markdown'],
    'manuscript-tree-vs-board': ['Дерево или Manuscript Board?', 'Tree vs manuscript board'],
    'why-characters-relationships-arc-points': ['Зачем Characters, Relationships и Arc Points?', 'Why characters, relationships and arc points?'],
    'why-plotlines': ['Зачем Plotlines?', 'Why plotlines?'],
    'why-locations': ['Зачем Locations?', 'Why locations?'],
    'why-story-grid': ['Зачем Story Grid?', 'Why Story Grid?'],
    'why-goals-and-sessions': ['Зачем Goals и Sessions?', 'Why goals and sessions?'],
    'why-writing-metrics': ['Зачем метрики текста?', 'Why writing metrics?'],
    'why-editorial-checks': ['Зачем Editorial Checks?', 'Why editorial checks?'],
    'preview-vs-export': ['Preview или Export?', 'Preview vs export'],
    'why-publishing-package': ['Зачем Publishing Package?', 'Why a publishing package?'],
    'why-ai-use-declaration': ['Зачем AI-use declaration?', 'Why an AI-use declaration?'],
    'why-project-assets': ['Зачем assets внутри проекта?', 'Why keep assets with the project?'],
    'why-local-first': ['Зачем local-first?', 'Why local-first?'],
    'version-vs-backup': ['Version или Backup?', 'Version vs backup'],
    'why-integrity-check': ['Зачем Integrity Check?', 'Why an integrity check?']
  };

  const block = document.createElement('section');
  block.className = 'bmaker-explained-related';
  block.style.marginTop = '42px';
  const h = document.createElement('h2');
  h.textContent = isRu ? 'Разобраться, зачем это нужно' : 'Understand why these tools exist';
  const p = document.createElement('p');
  p.style.display = 'flex';
  p.style.flexWrap = 'wrap';
  p.style.gap = '8px 16px';
  slugs.forEach((item) => {
    const a = document.createElement('a');
    a.href = `../explained/${item}.html`;
    a.textContent = titleMap[item]?.[isRu ? 0 : 1] || item;
    p.append(a);
  });
  block.append(h, p);
  const body = document.querySelector('.bmaker-compare-body');
  const verdict = body?.querySelector('.bmaker-compare-verdict');
  if (body) verdict ? verdict.before(block) : body.append(block);
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

  const gtag = analytics();

  function placement(link) {
    if (link.closest('.bmaker-hero')) return 'hero';
    if (link.closest('.bmaker-platforms')) return 'platforms';
    if (link.closest('.bmaker-cta')) return 'bottom_cta';
    if (link.closest('.bmaker-compare-verdict')) return 'comparison_verdict';
    if (link.closest('.project-card')) return 'projects';
    return 'content';
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('a[href]');
    if (!link) return;
    const href = link.href || '';

    let destination = null;
    let ctaAction = null;
    let legacyEvent = null;

    if (href.includes('/downloads/bmaker/B-Maker-Setup-macos.zip')) {
      destination = 'macos';
      ctaAction = 'download';
      legacyEvent = 'bmaker_download_macos';
    } else if (href.includes('/downloads/bmaker/B-Maker-Setup-win.zip')) {
      destination = 'windows';
      ctaAction = 'download';
      legacyEvent = 'bmaker_download_windows';
    } else if (/^https:\/\/b-maker\.kurakin\.pro\/?(?:[?#].*)?$/.test(href)) {
      destination = 'web';
      ctaAction = 'open';
      legacyEvent = 'bmaker_open_web';
    }

    if (!destination) return;

    const params = {
      destination,
      cta_action: ctaAction,
      cta_placement: placement(link),
      link_url: href,
      link_text: (link.textContent || '').trim(),
      page_path: window.location.pathname,
      page_language: document.documentElement.lang || document.body?.dataset?.lang || '',
      send_to: measurementId,
      transport_type: 'beacon'
    };

    gtag('event', 'bmaker_cta_click', params);
    gtag('event', legacyEvent, params);
  }, { capture: true });
})();