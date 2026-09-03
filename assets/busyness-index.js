(() => {
  const quiz = document.querySelector('[data-busy-quiz]');
  const result = document.querySelector('[data-busy-result]');
  if (!quiz || !result) return;

  const lang = document.body.dataset.lang || 'en';
  const questions = [...quiz.querySelectorAll('.busy-question')];
  const progress = quiz.querySelector('[data-busy-progress]');
  const totalQuestions = questions.length;
  const maxPoints = totalQuestions * 4;

  const labels = lang === 'ru'
    ? { meetings: 'Встречи', messaging: 'Сообщения', reporting: 'Отчётность', urgency: 'Срочность', fragmentation: 'Переключения', progress: 'Прогресс' }
    : { meetings: 'Meetings', messaging: 'Messaging', reporting: 'Reporting', urgency: 'Urgency', fragmentation: 'Switching', progress: 'Progress' };

  const advice = lang === 'ru'
    ? {
        meetings: 'Календарь забирает слишком большую долю рабочего дня. Попробуйте убрать хотя бы одну регулярную встречу или заменить её асинхронным обновлением.',
        messaging: 'Работа живёт в режиме постоянной доступности. Полезный эксперимент — договориться о периодах, когда мгновенный ответ не ожидается.',
        reporting: 'Слишком много энергии уходит на демонстрацию работы. Один понятный источник статуса обычно дешевле нескольких параллельных отчётов.',
        urgency: 'Срочность стала способом приоритизации. Ограничьте число задач, которые могут прерывать текущую работу без явного trade-off.',
        fragmentation: 'День распался на слишком короткие куски. Защитите хотя бы один непрерывный блок времени, в который нельзя ставить встречи и несрочные запросы.',
        progress: 'Активности видно больше, чем законченных результатов. Попробуйте формулировать неделю через 1–3 outcomes, которые должны реально измениться к пятнице.'
      }
    : {
        meetings: 'The calendar is consuming too much of the workday. Remove one recurring meeting or replace it with an asynchronous update.',
        messaging: 'Work is running in permanent availability mode. Try explicit periods where an immediate reply is not expected.',
        reporting: 'Too much energy goes into demonstrating work. One trusted status source is usually cheaper than several parallel reporting formats.',
        urgency: 'Urgency has become the prioritization system. Limit what is allowed to interrupt current work without an explicit trade-off.',
        fragmentation: 'The day is split into pieces that are too small. Protect at least one uninterrupted block with no meetings or non-urgent requests.',
        progress: 'Visible activity is outrunning finished outcomes. Define the week around one to three outcomes that should actually be different by Friday.'
      };

  const bands = lang === 'ru'
    ? [
        { max: 20, title: 'Actually Working', copy: 'Подозрительно много времени уходит на работу, а не на её демонстрацию. Встречи, сообщения и срочность пока выглядят как инструменты, а не как основной продукт компании.' },
        { max: 40, title: 'Busy but Useful', copy: 'Занятость заметна, но большая её часть всё ещё помогает двигать работу. Есть что почистить, но календарь пока не победил результат.' },
        { max: 60, title: 'Calendar Athlete', copy: 'День выглядит очень продуктивно в календаре и чуть менее убедительно в итогах. Значимая часть энергии уходит на координацию, статусы и переключения.' },
        { max: 80, title: 'Notification Operator', copy: 'Работа всё чаще означает быстро реагировать на входящее. Люди могут быть заняты весь день и всё равно заканчивать его с ощущением, что главное так и не началось.' },
        { max: 100, title: 'Professional Firefighter', copy: 'Организация достигла режима, где тушение, синхронизация и доказательство занятости сами стали полноценной работой. Проблема уже не в личном тайм-менеджменте.' }
      ]
    : [
        { max: 20, title: 'Actually Working', copy: 'A suspicious amount of time appears to go into work rather than proving that work is happening. Meetings, messages and urgency are still tools, not the product.' },
        { max: 40, title: 'Busy but Useful', copy: 'Busyness is visible, but most of it still helps move work forward. There is some cleanup to do, but the calendar has not beaten outcomes yet.' },
        { max: 60, title: 'Calendar Athlete', copy: 'The day looks extremely productive in the calendar and slightly less convincing in the outcomes. Coordination, status and switching are taking a meaningful share of energy.' },
        { max: 80, title: 'Notification Operator', copy: 'Work increasingly means reacting quickly to incoming requests. People can stay busy all day and still finish feeling that the important work never really started.' },
        { max: 100, title: 'Professional Firefighter', copy: 'Firefighting, synchronization and proving busyness have become full-time work. At this point the problem is not personal time management.' }
      ];

  function updateProgress() {
    const answered = questions.filter(q => q.querySelector('input:checked')).length;
    progress.textContent = lang === 'ru'
      ? (answered === totalQuestions ? 'Готово — можно считать' : `Ответов: ${answered} из ${totalQuestions}`)
      : (answered === totalQuestions ? 'Ready to calculate' : `Answered: ${answered} of ${totalQuestions}`);
  }

  quiz.addEventListener('change', updateProgress);

  quiz.addEventListener('submit', (event) => {
    event.preventDefault();
    const unanswered = questions.find(q => !q.querySelector('input:checked'));
    if (unanswered) {
      unanswered.scrollIntoView({ behavior: 'smooth', block: 'center' });
      unanswered.classList.add('busy-question--missing');
      setTimeout(() => unanswered.classList.remove('busy-question--missing'), 1200);
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
    const categoryScores = Object.entries(categories).map(([key, value]) => ({ key, score: Math.round((value.points / value.max) * 100) }));
    const ranked = [...categoryScores].sort((a, b) => b.score - a.score);
    const worst = ranked[0];
    const best = [...categoryScores].sort((a, b) => a.score - b.score)[0];
    const progressCategory = categoryScores.find(item => item.key === 'progress');
    const progressSignal = Math.max(0, 100 - (progressCategory ? progressCategory.score : score));
    const band = bands.find(item => score <= item.max) || bands[bands.length - 1];

    result.querySelector('[data-busy-score]').textContent = score;
    result.querySelector('[data-busy-progress-signal]').textContent = progressSignal;
    result.querySelector('[data-busy-title]').textContent = band.title;
    result.querySelector('[data-busy-copy]').textContent = band.copy;
    result.querySelector('[data-busy-worst]').textContent = `${labels[worst.key]} · ${worst.score}/100`;
    result.querySelector('[data-busy-best]').textContent = `${labels[best.key]} · ${best.score}/100`;
    result.querySelector('[data-busy-advice]').textContent = advice[worst.key];

    const breakdown = result.querySelector('[data-busy-breakdown]');
    breakdown.innerHTML = ranked.map(item => `<div class="busy-breakdown-row"><span>${labels[item.key]}</span><strong>${item.score}</strong><div><i style="width:${item.score}%"></i></div></div>`).join('');

    const shareText = lang === 'ru'
      ? `Мой Busyness Index — ${score}/100: ${band.title}. Progress Signal — ${progressSignal}/100. Главный источник занятости: ${labels[worst.key].toLowerCase()} (${worst.score}/100).\n\nЕсли весь день занят, это ещё не значит, что работа двигается.\n\nПроверьте свой рабочий режим: https://kurakin.pro/projects/busyness-index.html`
      : `My Busyness Index is ${score}/100: ${band.title}. Progress Signal: ${progressSignal}/100. Biggest source of busyness: ${labels[worst.key].toLowerCase()} (${worst.score}/100).\n\nA full calendar is not the same thing as progress.\n\nCheck yours: https://kurakin.pro/en/projects/busyness-index.html`;
    result.querySelector('[data-busy-share-text]').textContent = shareText;

    quiz.hidden = true;
    result.hidden = false;
    result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  const copyButton = result.querySelector('[data-busy-copy-button]');
  copyButton.addEventListener('click', async () => {
    const status = result.querySelector('[data-busy-copy-status]');
    try {
      await navigator.clipboard.writeText(result.querySelector('[data-busy-share-text]').textContent);
      status.textContent = lang === 'ru' ? 'Скопировано' : 'Copied';
    } catch (_) {
      status.textContent = lang === 'ru' ? 'Не удалось скопировать' : 'Could not copy';
    }
    setTimeout(() => { status.textContent = ''; }, 2200);
  });

  const shareButton = result.querySelector('[data-busy-share-button]');
  if (!navigator.share) shareButton.hidden = true;
  shareButton.addEventListener('click', async () => {
    try { await navigator.share({ title: 'Busyness Index', text: result.querySelector('[data-busy-share-text]').textContent }); } catch (_) {}
  });

  result.querySelector('[data-busy-restart]').addEventListener('click', () => {
    quiz.reset();
    quiz.hidden = false;
    result.hidden = true;
    updateProgress();
    quiz.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  updateProgress();
})();
