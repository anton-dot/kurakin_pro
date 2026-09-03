(() => {
  const quiz = document.querySelector('[data-chaos-quiz]');
  const result = document.querySelector('[data-chaos-result]');
  if (!quiz || !result) return;

  const lang = document.body.dataset.lang || 'en';
  const questions = [...quiz.querySelectorAll('.chaos-question')];
  const progress = quiz.querySelector('[data-chaos-progress]');
  const maxPoints = questions.length * 4;

  const labels = lang === 'ru'
    ? { priorities: 'Приоритеты', ownership: 'Ownership', planning: 'Планирование', interruptions: 'Вмешательства', information: 'Информация' }
    : { priorities: 'Priorities', ownership: 'Ownership', planning: 'Planning', interruptions: 'Interruptions', information: 'Information' };

  const advice = lang === 'ru'
    ? {
        priorities: 'Ограничьте число настоящих приоритетов. Если новый приоритет появляется, должно быть явно сказано, что перестаёт быть приоритетом.',
        ownership: 'Зафиксируйте владельцев решений и инициатив. Чем меньше решений живёт в коллективной ответственности, тем меньше очередь на согласование.',
        planning: 'Сделайте горизонт планирования коротким, но реальным. План, который переписывают ежедневно, — не план, а журнал входящих.',
        interruptions: 'Определите, кто и по каким причинам может менять текущую работу команды. Срочность должна иметь цену и понятные правила.',
        information: 'Вынесите ключевые решения, приоритеты и контекст из личных чатов и голов в один доступный источник, который команда реально использует.'
      }
    : {
        priorities: 'Limit the number of real priorities. When a new one enters, make it explicit which old one stops being a priority.',
        ownership: 'Make decision and initiative ownership explicit. Fewer decisions should live in collective responsibility.',
        planning: 'Keep the planning horizon short but real. A plan rewritten every day is not a plan; it is an inbox.',
        interruptions: 'Define who can change active work and for what reasons. Urgency should have a visible cost and clear rules.',
        information: 'Move critical decisions, priorities and context out of private chats and individual memory into one source the team actually uses.'
      };

  const bands = lang === 'ru'
    ? [
        { max: 20, title: 'Focused Startup', copy: 'У вас удивительно мало хаоса для среды, где многое ещё меняется. Скорость есть, но приоритеты и ownership пока не растворились в срочности.' },
        { max: 40, title: 'Productive Chaos', copy: 'Хаос присутствует, но пока в основном помогает двигаться быстро. Главное — не перепутать адаптивность с привычкой постоянно менять направление.' },
        { max: 60, title: 'Roadmap Roulette', copy: 'Команда всё ещё доставляет результат, но вероятность внезапной смены курса уже стала частью operating model. Планирование начинает проигрывать входящим сообщениям.' },
        { max: 80, title: 'Everyone Is CEO', copy: 'Слишком много людей могут создать новый приоритет, слишком мало людей могут закрыть старый. Команда работает быстро — просто не всегда в одном направлении.' },
        { max: 100, title: 'Strategy by Notification', copy: 'Roadmap теперь формируется в реальном времени из чатов, срочных просьб и последних разговоров. Компания движется — вопрос только куда именно сегодня.' }
      ]
    : [
        { max: 20, title: 'Focused Startup', copy: 'You have surprisingly little chaos for an environment where things still change fast. Speed exists without priorities and ownership dissolving into urgency.' },
        { max: 40, title: 'Productive Chaos', copy: 'Chaos is present, but it still mostly helps the company move. The danger is confusing adaptability with a habit of changing direction constantly.' },
        { max: 60, title: 'Roadmap Roulette', copy: 'The team still delivers, but sudden direction changes are now part of the operating model. Planning is starting to lose against incoming messages.' },
        { max: 80, title: 'Everyone Is CEO', copy: 'Too many people can create a new priority and too few can close an old one. The team moves fast — just not always in the same direction.' },
        { max: 100, title: 'Strategy by Notification', copy: 'The roadmap is now assembled in real time from chats, urgent requests and the latest conversation. The company is moving. The question is where today.' }
      ];

  function updateProgress() {
    const answered = questions.filter(q => q.querySelector('input:checked')).length;
    progress.textContent = lang === 'ru' ? `Ответов: ${answered} из ${questions.length}` : `Answered: ${answered} of ${questions.length}`;
  }

  quiz.addEventListener('change', updateProgress);
  quiz.addEventListener('submit', (event) => {
    event.preventDefault();
    const missing = questions.find(q => !q.querySelector('input:checked'));
    if (missing) {
      missing.classList.add('chaos-question--missing');
      missing.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => missing.classList.remove('chaos-question--missing'), 1200);
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

    result.querySelector('[data-chaos-score]').textContent = score;
    result.querySelector('[data-chaos-title]').textContent = band.title;
    result.querySelector('[data-chaos-copy]').textContent = band.copy;
    result.querySelector('[data-chaos-meter]').style.width = `${score}%`;
    result.querySelector('[data-chaos-worst]').textContent = `${labels[worst.key]} · ${worst.score}/100`;
    result.querySelector('[data-chaos-best]').textContent = `${labels[best.key]} · ${best.score}/100`;
    result.querySelector('[data-chaos-advice]').textContent = advice[worst.key];

    result.querySelector('[data-chaos-breakdown]').innerHTML = ranked.map(item =>
      `<div class="chaos-breakdown-row"><span>${labels[item.key]}</span><strong>${item.score}</strong><div><i style="width:${item.score}%"></i></div></div>`
    ).join('');

    const url = lang === 'ru'
      ? 'https://kurakin.pro/projects/startup-chaos-index.html'
      : 'https://kurakin.pro/en/projects/startup-chaos-index.html';
    const shareText = lang === 'ru'
      ? `Мой Startup Chaos Index — ${score}/100: ${band.title}. Главный источник хаоса: ${labels[worst.key].toLowerCase()} (${worst.score}/100).\n\nЕсли новый приоритет появляется быстрее, чем закрывается старый, возможно, это уже не agility.\n\nПроверьте свою компанию: ${url}`
      : `My Startup Chaos Index is ${score}/100: ${band.title}. Biggest source of chaos: ${labels[worst.key].toLowerCase()} (${worst.score}/100).\n\nIf new priorities appear faster than old ones disappear, that may no longer be agility.\n\nCheck yours: ${url}`;
    result.querySelector('[data-chaos-share-text]').textContent = shareText;

    quiz.hidden = true;
    result.hidden = false;
    result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  result.querySelector('[data-chaos-copy-button]').addEventListener('click', async () => {
    const status = result.querySelector('[data-chaos-copy-status]');
    try {
      await navigator.clipboard.writeText(result.querySelector('[data-chaos-share-text]').textContent);
      status.textContent = lang === 'ru' ? 'Скопировано' : 'Copied';
    } catch (_) {
      status.textContent = lang === 'ru' ? 'Не удалось скопировать' : 'Could not copy';
    }
    setTimeout(() => { status.textContent = ''; }, 2200);
  });

  const shareButton = result.querySelector('[data-chaos-share-button]');
  if (!navigator.share) shareButton.hidden = true;
  shareButton.addEventListener('click', async () => {
    try {
      await navigator.share({
        title: 'Startup Chaos Index',
        text: result.querySelector('[data-chaos-share-text]').textContent
      });
    } catch (_) {}
  });

  result.querySelector('[data-chaos-restart]').addEventListener('click', () => {
    quiz.reset();
    result.hidden = true;
    quiz.hidden = false;
    updateProgress();
    quiz.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  updateProgress();
})();