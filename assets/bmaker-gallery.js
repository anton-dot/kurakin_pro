(() => {
  const INDEXABLE_COMPARE_PAGES = new Set([
    'b-maker-vs-scrivener.html',
    'b-maker-vs-plottr.html',
    'b-maker-vs-scapple.html',
    'book-writing-software-for-mac.html',
    'book-writing-software-for-windows.html',
    'book-writing-software-with-ai.html',
    'cross-platform-writing-software.html',
    'local-first-writing-software.html',
    'novel-writing-software.html',
    'nonfiction-writing-software.html',
    'writing-software-for-articles-and-books.html'
  ]);

  const path = window.location.pathname.replace(/\/+$/, '');
  const explainedMatch = path.match(/\/projects\/b-maker\/explained\/([^/]+\.html)$/);
  const compareMatch = path.match(/\/projects\/b-maker\/compare\/([^/]+\.html)$/);
  const shouldNoindex =
    (explainedMatch && explainedMatch[1] !== 'index.html') ||
    (compareMatch && compareMatch[1] !== 'index.html' && !INDEXABLE_COMPARE_PAGES.has(compareMatch[1]));

  if (shouldNoindex) {
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = 'noindex,follow,max-image-preview:large';
  }

  const rootPath = (raw) => {
    const value = (raw || '').trim();
    if (!value) return '';
    if (/^https?:\/\//i.test(value) || value.startsWith('/')) return value;
    return `/${value.replace(/^\.\//, '')}`;
  };

  function wireHydratedImage(img) {
    const dialog = document.querySelector('.bmaker-lightbox');
    if (!dialog || img.dataset.bmakerHydratedLightbox === '1') return;
    const full = dialog.querySelector('.bmaker-lightbox-image');
    const caption = dialog.querySelector('.bmaker-lightbox-caption');
    if (!full || !caption) return;
    const ru = document.documentElement.lang === 'ru';
    const open = () => {
      full.src = img.currentSrc || img.src;
      full.alt = img.alt || '';
      caption.textContent = img.alt || 'B-Maker';
      document.body.classList.add('bmaker-lightbox-open');
      if (!dialog.open) dialog.showModal();
    };
    img.dataset.bmakerHydratedLightbox = '1';
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', `${img.alt || 'B-Maker'} — ${ru ? 'увеличить' : 'enlarge'}`);
    img.addEventListener('click', open);
    img.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open();
      }
    });
  }

  function hydratePlaceholder(placeholder) {
    if (!(placeholder instanceof HTMLElement) || placeholder.dataset.bmakerHydrateChecked === '1') return Promise.resolve(false);
    const code = placeholder.querySelector('code');
    const src = rootPath(code?.textContent);
    if (!src) return Promise.resolve(false);
    placeholder.dataset.bmakerHydrateChecked = '1';
    return new Promise((resolve) => {
      const probe = new Image();
      probe.onload = () => {
        const img = document.createElement('img');
        img.className = 'bmaker-shot-image';
        img.src = src;
        img.alt = (placeholder.querySelector('strong')?.textContent || 'B-Maker screenshot').replace(/^Screenshot:\s*/i, '').replace(/^Скриншот:\s*/i, '');
        img.width = 1600;
        img.height = 1000;
        img.loading = 'lazy';
        img.decoding = 'async';
        placeholder.replaceWith(img);
        wireHydratedImage(img);
        resolve(true);
      };
      probe.onerror = () => resolve(false);
      probe.src = src;
    });
  }

  function hydrateAll(scope = document) {
    const placeholders = [];
    if (scope instanceof Element && scope.matches('.bmaker-shot-placeholder')) placeholders.push(scope);
    if (scope.querySelectorAll) placeholders.push(...scope.querySelectorAll('.bmaker-shot-placeholder'));
    return Promise.all(placeholders.map(hydratePlaceholder));
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
      if (node instanceof Element) hydrateAll(node);
    }));
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });

  hydrateAll(document).finally(() => {
    const core = document.createElement('script');
    core.src = '/assets/bmaker-gallery-core.js';
    core.async = false;
    core.onload = () => {
      document.querySelectorAll('.bmaker-shot-image').forEach(wireHydratedImage);
      hydrateAll(document);
    };
    document.head.append(core);
  });
})();
