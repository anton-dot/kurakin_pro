(() => {
  const quiz = document.querySelector('[data-micro-quiz]');
  const result = document.querySelector('[data-micro-result]');
  if (!quiz || !result) return;

  const lang = document.body.dataset.lang || 'en';
  const progress = quiz.querySelector('[data-micro-progress]');
  const questions = [...quiz.querySelectorAll('.micro-question')];
  const maxPoints = questions.length * 4;

  const labels = lang === 'ru'
    ? { autonomy: 'Автономность', approvals: 'Согласования', reporting: 'Статусы', monitoring: 'Контроль', trust: 'Доверие' }
    : { autonomy: 'Autonomy', approvals: 'Approvals', reporting: 'Reporting', monitoring: 'Monitoring', trust: 'Trust' };

  const worstAdvice = lang === 'ru'
    ? {
        autonomy: 'Самостоятельность ограничена даже там, где решения обратимы. Полезно разделить: где действительно нужен контроль, а где достаточно определить цель, границы и владельца результата.',
        approvals: 'Слишком много мелких решений поднимаются вверх. Попробуйте заранее определить классы решений, которые команда может принимать без дополнительного разрешения.',
        reporting: 'Система просит слишком много доказательств работы. Один понятный источник статуса часто дешевле нескольких параллельных отчётов и встреч.',
        monitoring: 'Контроль слишком близко подошёл к процессу работы. Лучше договориться о контрольных точках и ожидаемом результате, чем постоянно проверять промежуточные действия.',
        trust: 'Ошибки и недоступность слишком быстро превращаются в повод для дополнительного контроля. Доверие обычно растёт, когда ожидания и границы ответственности ясны заранее.'
      }
    : {
        autonomy: 'Independence is constrained even for reversible decisions. Separate areas that truly need control from areas where a clear goal, boundary and outcome owner are enough.',
        approvals: 'Too many small decisions travel upward. Define classes of decisions that the team can make without additional permission.',
        reporting: 'The system asks for too much proof of work. One trusted status source is usually cheaper than parallel reports and meetings.',
        monitoring: 'Control has moved too close to the work itself. Agree on checkpoints and outcomes instead of continuously inspecting intermediate activity.',
        trust: 'Mistakes and short periods of unavailability turn into additional control too quickly. Trust grows when expectations and accountability boundaries are clear in advance.'
      };

  const bestCopy = lang === 'ru'
    ? {
        autonomy: 'Здесь ещё есть пространство для самостоятельных решений — хороший фундамент, который стоит защищать.',
        approvals: 'Не каждое решение обязано путешествовать вверх по иерархии. Это уже серьёзный плюс.',
        reporting: 'Отчётность пока не съедает саму работу. Постарайтесь не размножать каналы статуса без необходимости.',
        monitoring: 'Людей в основном оценивают по результату, а не по постоянной видимости процесса. Это стоит сохранить.',
        trust: 'Среда допускает нормальную человеческую автономность и ошибки без мгновенного ужесточения контроля.'
      }
    : {
        autonomy: 'There is still room for independent decisions here — a useful foundation worth protecting.',
        approvals: 'Not every decision has to travel up the hierarchy. That is already a meaningful advantage.',
        reporting: 'Reporting has not swallowed the actual work yet. Avoid multiplying status channels without a reason.',
        monitoring: 'People are mostly judged by outcomes rather than constant visibility of activity. Keep it that way.',
        trust: 'The environment still allows normal human autonomy and mistakes without immediately tightening control.'
      };

  const bands = lang === 'ru'
    ? [
        { max: 20, title: 'Trusted Adult Mode', copy: 'Похоже, вас наняли именно работать. Цели и границы важнее постоянного контроля, а руководитель в основном появляется там, где действительно нужен контекст или решение.' },
        { max: 40, title: 'Lightly Supervised', copy: 'Контроль есть, но пока не мешает дышать. Иногда приходится объяснять очевидное или делать лишний статус, однако большая часть работы всё ещё остаётся у того, кто её делает.' },
        { max: 60, title: 'Status Update Economy', copy: 'Заметная часть энергии уходит не на результат, а на поддержание уверенности окружающих, что результат когда-нибудь будет. Это уже организационный налог.' },
        { max: 80, title: 'Approval Tourist', copy: 'Чтобы сделать работу, приходится регулярно путешествовать между согласованиями, статусами и контрольными точками. Автономность существует, но требует отдельного разрешения.' },
        { max: 100, title: 'Human Jira Ticket', copy: 'Система почти умеет управлять человеком как задачей: проверить статус, уточнить ETA, запросить апдейт, назначить checkpoint. Возможно, проблема уже не в дисциплине сотрудников, а в архитектуре доверия.' }
      ]
    : [
        { max: 20, title: 'Trusted Adult Mode', copy: 'It looks like you were hired to do the work. Goals and boundaries matter more than constant supervision, and management mostly appears when context or a decision is actually needed.' },
        { max: 40, title: 'Lightly Supervised', copy: 'There is some control, but it is not suffocating yet. You occasionally explain the obvious or produce an unnecessary update, while most of the work still belongs to the person doing it.' },
        { max: 60, title: 'Status Update Economy', copy: 'A visible share of energy goes into maintaining everyone’s confidence that work is happening rather than producing the outcome itself. That is already an organizational tax.' },
        { max: 80, title: 'Approval Tourist', copy: 'Doing the work requires regular travel through approvals, updates and checkpoints. Autonomy technically exists, but it seems to need permission.' },
        { max: 100, title: 'Human Jira Ticket', copy: 'The system is close to managing a person like a ticket: check status, ask ETA, request update, schedule checkpoint. The problem may no longer be employee discipline but the architecture of trust.' }
      ];

  function updateProgress() {
    const answered = questions.filter(q => q.querySelector('input:checked')).length;
    progress.textContent = lang === 'ru'
      ? (answered === questions.length ? 'Готово — можно считать' : `Ответов: ${answered} из ${questions.length}`)
      : (answered === questions.length ? 'Ready to calculate' : `Answered: ${answered} of ${questions.length}`);
  }

  quiz.addEventListener('change', updateProgress);

  quiz.addEventListener('submit', (event) => {
    event.preventDefault();
    const unanswered = questions.find(q => !q.querySelector('input:checked'));
    if (unanswered) {
      unanswered.scrollIntoView({ behavior: 'smooth', block: 'center' });
      unanswered.classList.add('micro-question--missing');
      setTimeout(() => unanswered.classList.remove('micro-question--missing'), 1200);
      return;
    }

    let points = 0;
    const categories = {};
    questions.forEach(q => {
      const value = Number(q.querySelector('input:checked').value);
      const category = q.dataset.category;
      points += value;
      if (!categories[category]) categories[category] = { points: 0, max: 0 };
      categories[category].points += value;
      categories[category].max += 4;
    });

    const score = Math.round((points / maxPoints) * 100);
    const band = bands.find(item => score <= item.max) || bands[bands.length - 1];
    const ranked = Object.entries(categories)
      .map(([key, value]) => ({ key, score: Math.round((value.points / value.max) * 100) }))
      .sort((a, b) => b.score - a.score);
    const worst = ranked[0];
    const best = ranked[ranked.length - 1];

    result.querySelector('[data-micro-score]').textContent = score;
    result.querySelector('[data-micro-title]').textContent = band.title;
    result.querySelector('[data-micro-copy]').textContent = band.copy;
    result.querySelector('[data-micro-meter]').style.width = `${score}%`;
    result.querySelector('[data-micro-worst]').textContent = `${labels[worst.key]} · ${worst.score}/100`;
    result.querySelector('[data-micro-worst-copy]').textContent = worstAdvice[worst.key];
    result.querySelector('[data-micro-best]').textContent = `${labels[best.key]} · ${best.score}/100`;
    result.querySelector('[data-micro-best-copy]').textContent = bestCopy[best.key];

    const breakdown = result.querySelector('[data-micro-breakdown]');
    breakdown.innerHTML = ranked.map(item => `<div class="micro-breakdown-row"><span>${labels[item.key]}</span><strong>${item.score}</strong><div><i style="width:${item.score}%"></i></div></div>`).join('');

    const url = lang === 'ru'
      ? 'https://kurakin.pro/projects/micromanagement-index.html'
      : 'https://kurakin.pro/en/projects/micromanagement-index.html';
    const shareText = lang === 'ru'
      ? `Мой Micromanagement Index — ${score}/100: ${band.title}. Главный режим контроля: ${labels[worst.key].toLowerCase()} (${worst.score}/100).\n\nИногда проблема не в том, что людям не хватает контроля. Иногда контроля уже больше, чем работе нужно.\n\nПроверьте свой: ${url}`
      : `My Micromanagement Index is ${score}/100: ${band.title}. Main control mode: ${labels[worst.key].toLowerCase()} (${worst.score}/100).\n\nSometimes the problem is not that people need more control. Sometimes there is already more control than the work needs.\n\nCheck yours: ${url}`;
    result.querySelector('[data-micro-share]').textContent = shareText;

    quiz.hidden = true;
    result.hidden = false;
    result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  result.querySelector('[data-micro-copy-button]').addEventListener('click', async () => {
    const status = result.querySelector('[data-micro-copy-status]');
    try {
      await navigator.clipboard.writeText(result.querySelector('[data-micro-share]').textContent);
      status.textContent = lang === 'ru' ? 'Скопировано' : 'Copied';
    } catch (_) {
      status.textContent = lang === 'ru' ? 'Не удалось скопировать' : 'Could not copy';
    }
    setTimeout(() => { status.textContent = ''; }, 2200);
  });

  result.querySelector('[data-micro-native-share]').addEventListener('click', async () => {
    const text = result.querySelector('[data-micro-share]').textContent;
    if (navigator.share) {
      try { await navigator.share({ title: 'Micromanagement Index', text }); } catch (_) {}
    } else {
      try { await navigator.clipboard.writeText(text); } catch (_) {}
      const status = result.querySelector('[data-micro-copy-status]');
      status.textContent = lang === 'ru' ? 'Ссылка скопирована' : 'Copied instead';
      setTimeout(() => { status.textContent = ''; }, 2200);
    }
  });

  result.querySelector('[data-micro-restart]').addEventListener('click', () => {
    quiz.reset();
    quiz.hidden = false;
    result.hidden = true;
    updateProgress();
    quiz.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  updateProgress();
})();
