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
