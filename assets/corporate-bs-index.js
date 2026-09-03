(() => {
  const quiz = document.querySelector('[data-bs-quiz]');
  const result = document.querySelector('[data-bs-result]');
  if (!quiz || !result) return;

  const lang = document.body.dataset.lang || 'en';
  const progress = quiz.querySelector('[data-bs-progress]');
  const questions = [...quiz.querySelectorAll('.bs-question')];
  const totalQuestions = questions.length;
  const maxPoints = totalQuestions * 4;

  const categoryLabels = lang === 'ru'
    ? { decisions: 'Решения', meetings: 'Встречи', ownership: 'Ownership', reporting: 'Отчётность', priorities: 'Приоритеты' }
    : { decisions: 'Decisions', meetings: 'Meetings', ownership: 'Ownership', reporting: 'Reporting', priorities: 'Priorities' };

  const categoryAdvice = lang === 'ru'
    ? {
        decisions: 'Решения слишком часто требуют широкого согласования. Попробуйте явно определить, кто решает, кого консультируют и кого просто информируют.',
        meetings: 'Календарь стал частью системы управления. Проверьте регулярные встречи: у каждой должны быть цель, владелец и причина существовать именно синхронно.',
        ownership: 'Проблемы теряются между командами. Явный владелец на межфункциональных задачах часто полезнее ещё одного координационного слоя.',
        reporting: 'Слишком много энергии уходит на доказательство прогресса. Один понятный источник статуса обычно дешевле нескольких параллельных форматов.',
        priorities: 'Срочность вытесняет договорённости. Ограничьте количество настоящих приоритетов и договоритесь, что должно произойти, чтобы их изменить.'
      }
    : {
        decisions: 'Too many decisions require broad alignment. Make it explicit who decides, who is consulted and who only needs to be informed.',
        meetings: 'The calendar has become part of the management system. Review recurring meetings: each should have a purpose, an owner and a reason to be synchronous.',
        ownership: 'Problems are getting lost between teams. A clear owner for cross-functional work is often more useful than another coordination layer.',
        reporting: 'Too much energy goes into proving progress. One trusted status source is usually cheaper than several parallel reporting formats.',
        priorities: 'Urgency keeps replacing agreements. Limit the number of real priorities and define what is important enough to change them.'
      };

  const bands = lang === 'ru'
    ? [
        { max: 20, title: 'Подозрительно эффективно', copy: 'Либо у вас действительно здоровая рабочая среда, либо тест проходил CEO. Решения принимаются близко к работе, встречи в основном имеют смысл, а слово «alignment» ещё не стало единицей времени.' },
        { max: 40, title: 'Нормальная корпоративная среда', copy: 'Трение есть, но пока не управляет компанией. Несколько ритуалов можно убрать без революции — и люди, скорее всего, даже не заметят их исчезновения.' },
        { max: 60, title: 'Alignment intensive', copy: 'Компания всё ещё работает, но заметная часть энергии уходит на координацию самой координации. Решения начинают стоить дороже, чем должны.' },
        { max: 80, title: 'Enterprise Grade Bureaucracy', copy: 'Процесс уже конкурирует с результатом. Люди могут быть сильными, но система заставляет их тратить слишком много времени на согласования, статусы и поиск владельцев.' },
        { max: 100, title: 'Please schedule a steering committee', copy: 'Организация достигла уровня, где для снижения бюрократии, вероятно, сначала понадобится комитет по снижению бюрократии. Хорошая новость: проблемы здесь обычно системные, а значит их можно разбирать по одной.' }
      ]
    : [
        { max: 20, title: 'Suspiciously efficient', copy: 'Either you have a genuinely healthy operating environment, or the CEO took the test. Decisions happen close to the work, meetings mostly have a reason to exist, and “alignment” is not yet a unit of time.' },
        { max: 40, title: 'Normal corporate habitat', copy: 'There is friction, but it does not run the company yet. A few rituals can probably disappear without a transformation program — and people may not even notice.' },
        { max: 60, title: 'Alignment intensive', copy: 'The company still works, but a visible share of energy goes into coordinating the coordination. Decisions are starting to cost more than they should.' },
        { max: 80, title: 'Enterprise Grade Bureaucracy', copy: 'Process is competing with output. Smart people are spending too much time on approvals, status production and finding someone who is allowed to decide.' },
        { max: 100, title: 'Please schedule a steering committee', copy: 'The organization has reached the point where reducing bureaucracy may first require a bureaucracy-reduction committee. The good news: these are usually system problems, which means they can be dismantled one by one.' }
      ];

  function updateProgress() {
    const answered = questions.filter(q => q.querySelector('input:checked')).length;
    if (lang === 'ru') progress.textContent = answered === totalQuestions ? 'Готово — можно считать' : `Ответов: ${answered} из ${totalQuestions}`;
    else progress.textContent = answered === totalQuestions ? 'Ready to calculate' : `Answered: ${answered} of ${totalQuestions}`;
  }

  quiz.addEventListener('change', updateProgress);

  quiz.addEventListener('submit', (event) => {
    event.preventDefault();
    const unanswered = questions.find(q => !q.querySelector('input:checked'));
    if (unanswered) {
      unanswered.scrollIntoView({ behavior: 'smooth', block: 'center' });
      unanswered.classList.add('bs-question--missing');
      setTimeout(() => unanswered.classList.remove('bs-question--missing'), 1200);
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

    result.querySelector('[data-bs-score]').textContent = score;
    result.querySelector('[data-bs-title]').textContent = band.title;
    result.querySelector('[data-bs-copy]').textContent = band.copy;
    result.querySelector('[data-bs-meter]').style.width = `${score}%`;
    result.querySelector('[data-bs-worst]').textContent = `${categoryLabels[worst.key]} · ${worst.score}/100`;
    result.querySelector('[data-bs-worst-copy]').textContent = categoryAdvice[worst.key];

    const breakdown = result.querySelector('[data-bs-breakdown]');
    breakdown.innerHTML = ranked.map(item => `<div class="bs-breakdown-row"><span>${categoryLabels[item.key]}</span><strong>${item.score}</strong><div><i style="width:${item.score}%"></i></div></div>`).join('');

    const shareText = lang === 'ru'
      ? `Мой Corporate Bullshit Index — ${score}/100: ${band.title}. Главный источник трения: ${categoryLabels[worst.key].toLowerCase()} (${worst.score}/100).\n\nПохоже, проблема не всегда в продуктивности людей. Иногда это стоимость самой организации.\n\nПроверьте свою компанию: https://kurakin.pro/projects/corporate-bs-index.html`
      : `My Corporate Bullshit Index is ${score}/100: ${band.title}. Biggest source of friction: ${categoryLabels[worst.key].toLowerCase()} (${worst.score}/100).\n\nMaybe the problem is not always individual productivity. Sometimes it is the cost of the organization itself.\n\nCheck yours: https://kurakin.pro/en/projects/corporate-bs-index.html`;
    result.querySelector('[data-bs-share]').textContent = shareText;

    quiz.hidden = true;
    result.hidden = false;
    result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  result.querySelector('[data-bs-copy-button]').addEventListener('click', async () => {
    const status = result.querySelector('[data-bs-copy-status]');
    try {
      await navigator.clipboard.writeText(result.querySelector('[data-bs-share]').textContent);
      status.textContent = lang === 'ru' ? 'Скопировано' : 'Copied';
    } catch (_) {
      status.textContent = lang === 'ru' ? 'Не удалось скопировать' : 'Could not copy';
    }
    setTimeout(() => { status.textContent = ''; }, 2200);
  });

  result.querySelector('[data-bs-restart]').addEventListener('click', () => {
    quiz.reset();
    quiz.hidden = false;
    result.hidden = true;
    updateProgress();
    quiz.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  updateProgress();
})();
