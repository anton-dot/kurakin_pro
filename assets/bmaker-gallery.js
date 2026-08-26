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

  function openImage(img) {
    lastFocused = img;
    full.src = img.currentSrc || img.src;
    full.alt = img.alt || '';
    caption.textContent = img.alt || 'B-Maker';
    document.body.classList.add('bmaker-lightbox-open');
    dialog.showModal();
    close.focus();
  }

  function closeDialog() {
    if (dialog.open) dialog.close();
  }

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
  shell.addEventListener('click', (event) => {
    if (event.target === shell) closeDialog();
  });
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
  if (document.querySelector('.bmaker-stories-block')) return;

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

  const shotStories = [
    ['bmaker-articles.webp', 'from-articles-to-book'],
    ['bmaker-manuscript.webp', 'write-in-sections-read-as-one-manuscript'],
    ['bmaker-collections.webp', 'one-manuscript-several-views'],
    ['bmaker-idea-map.webp', 'from-idea-to-chapter'],
    ['bmaker-story.webp', 'characters-and-plot-without-spreadsheet'],
    ['bmaker-versions.webp', 'no-more-final-final-docx'],
    ['bmaker-analytics.webp', 'editorial-checks-before-publishing'],
    ['bmaker-publishing.webp', 'from-manuscript-to-publishing-package']
  ];
  shotStories.forEach(([fileName, slug]) => connectShot(fileName, slug));

  const featureStories = isRu
    ? new Map([
        ['Цели и сессии', 'writing-goals-and-sessions'],
        ['Импорт', 'import-existing-manuscript']
      ])
    : new Map([
        ['Goals and sessions', 'writing-goals-and-sessions'],
        ['Import', 'import-existing-manuscript']
      ]);

  document.querySelectorAll('.bmaker-feature').forEach((feature) => {
    const title = feature.querySelector('strong')?.textContent?.trim();
    const slug = featureStories.get(title);
    if (!slug || feature.querySelector('.bmaker-story-link')) return;
    const link = storyLink(slug);
    link.style.marginBottom = '0';
    feature.append(link);
  });

  const localCopy = document.querySelector('.bmaker-local-grid > div:first-child');
  if (localCopy && !localCopy.querySelector('.bmaker-story-link')) {
    localCopy.append(storyLink('local-first-writing-workflow', true));
  }

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
          ['Versions', 'No more final-final.docx', 'How named versions, comparison and locking change the way revision works.', 'no-more-final-final-docx']
        ]
      };

  const section = document.createElement('section');
  section.className = 'bmaker-section alt bmaker-stories-block';

  const inner = document.createElement('div');
  inner.className = 'bmaker-section-inner';

  const eyebrow = document.createElement('p');
  eyebrow.className = 'bmaker-eyebrow';
  eyebrow.textContent = strings.eyebrow;

  const heading = document.createElement('h2');
  heading.textContent = strings.title;

  const lead = document.createElement('p');
  lead.style.color = 'var(--ink-soft)';
  lead.style.maxWidth = '720px';
  lead.textContent = strings.lead;

  const grid = document.createElement('div');
  grid.className = 'bmaker-guide-grid';

  strings.cards.forEach(([kicker, title, description, slug]) => {
    const card = document.createElement('a');
    card.className = 'bmaker-guide-card';
    card.href = `${storiesRoot}${slug}.html`;

    const small = document.createElement('small');
    small.textContent = kicker;
    const h = document.createElement('h2');
    h.textContent = title;
    const p = document.createElement('p');
    p.textContent = description;
    const span = document.createElement('span');
    span.textContent = isRu ? 'Читать историю →' : 'Read the story →';

    card.append(small, h, p, span);
    grid.append(card);
  });

  const all = document.createElement('p');
  all.style.marginTop = '26px';
  const allLink = document.createElement('a');
  allLink.className = 'text-link';
  allLink.href = storiesRoot;
  allLink.textContent = strings.all;
  all.append(allLink);

  inner.append(eyebrow, heading, lead, grid, all);
  section.append(inner);

  const compare = document.querySelector('.bmaker-compare-block');
  if (compare) compare.before(section);
})();
