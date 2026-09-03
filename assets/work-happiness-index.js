(() => {
  const quiz = document.querySelector('[data-whi-quiz]');
  const result = document.querySelector('[data-whi-result]');
  if (!quiz || !result) return;

  const lang = document.body.dataset.lang || 'en';
  const questions = [...quiz.querySelectorAll('.whi-question')];
  const progress = quiz.querySelector('[data-whi-progress]');
  const maxPoints = questions.length * 4;

  const labels = lang === 'ru'
    ? { focus: 'Фокус', autonomy: 'Автономность', meaning: 'Смысл', support: 'Поддержка', pace: 'Темп' }
    : { focus: 'Focus', autonomy: 'Autonomy', meaning: 'Meaning', support: 'Support', pace: 'Pace' };

  const advice = lang === 'ru'
    ? {
        focus: 'Самая дорогая проблема — не отсутствие мотивации, а отсутствие времени, в котором можно спокойно сделать работу. Попробуйте защитить длинные блоки без встреч и сократить регулярные синки без решений.',
        autonomy: 'Люди тратят слишком много энергии на разрешение работать. Ясные границы решений и право сказать «нет» обычно дают больше эффекта, чем ещё один процесс согласования.',
        meaning: 'Работа может быть вполне организованной, но плохо связанной с результатом. Чаще показывайте, зачем задача существует, кто получает пользу и что изменится, если её не делать.',
        support: 'Система слишком часто оставляет человека один на один с блокерами. Хорошая поддержка — это не контроль статуса, а помощь в снятии препятствий и безопасный разговор об ошибках.',
        pace: 'Рабочий ритм слишком легко съедает личное время и восстановление. Полезно отдельно договориться, что действительно срочно, когда сообщения могут подождать и как выглядит нормальный отпуск без пожара.'
      }
    : {
        focus: 'The biggest tax is not motivation. It is the lack of uninterrupted time to do the work. Protect longer focus blocks and remove recurring meetings that do not produce decisions.',
        autonomy: 'People are spending too much energy getting permission to work. Clear decision boundaries and the ability to say no usually beat another approval layer.',
        meaning: 'The work may be organized, but poorly connected to outcomes. Make it clearer why the task exists, who benefits and what changes if it is not done.',
        support: 'The system leaves people alone with blockers too often. Good support is not status control; it is obstacle removal and a safe way to discuss mistakes.',
        pace: 'The work rhythm is eating too much personal time and recovery. Define what is truly urgent, when messages can wait and what normal time off looks like without a fire.'
      };

  const bands = lang === 'ru'
    ? [
        { max: 25, title: 'Calendar Hostage', copy: 'Работа, вероятно, происходит где-то между встречами, согласованиями и срочными сообщениями. Это не значит, что людям «не хватает мотивации» — среда просто забирает слишком много энергии до того, как начинается сама работа.' },
        { max: 45, title: 'Professionally Surviving', copy: 'Система функционирует, люди функционируют, кофе тоже выполняет KPI. Есть островки нормальной работы, но слишком многое держится на личной выносливости и умении обходить процесс.' },
        { max: 65, title: 'Happy-ish, Somehow', copy: 'Не рай, но и не корпоративный квест на выживание. Хорошие элементы уже есть; несколько системных раздражителей всё ещё забирают заметную часть фокуса и энергии.' },
        { max: 82, title: 'Actually Pretty Good', copy: 'У вас, похоже, рабочая среда, где людям в основном дают работать. Это звучит как низкая планка, но рынок труда знает, насколько она на самом деле высокая.' },
        { max: 100, title: 'Suspiciously Happy', copy: 'Либо вы нашли редкое место с фокусом, автономностью и нормальным темпом, либо тест проходил человек в первую неделю после отпуска. В любом случае — сохраните настройки.' }
      ]
    : [
        { max: 25, title: 'Calendar Hostage', copy: 'Work probably happens somewhere between meetings, approvals and urgent messages. This does not mean people lack motivation; the environment is consuming too much energy before the actual work begins.' },
        { max: 45, title: 'Professionally Surviving', copy: 'The system functions, people function, and coffee is also hitting its KPIs. There are pockets of good work, but too much depends on personal stamina and knowing how to route around the process.' },
        { max: 65, title: 'Happy-ish, Somehow', copy: 'Not paradise, not a corporate survival game either. The good parts are real; a few systemic annoyances are still taking a visible chunk of focus and energy.' },
        { max: 82, title: 'Actually Pretty Good', copy: 'You seem to work in an environment where people are mostly allowed to work. That sounds like a low bar until you compare notes with the rest of the market.' },
        { max: 100, title: 'Suspiciously Happy', copy: 'Either you found a rare workplace with focus, autonomy and a sane pace, or you took this test during your first week back from vacation. Either way, keep the settings.' }
      ];

  function updateProgress() {
    const answered = questions.filter(q => q.querySelector('input:checked')).length;
    progress.textContent = lang === 'ru'
      ? (answered === questions.length ? 'Готово — покажите результат' : `Ответов: ${answered} из ${questions.length}`)
      : (answered === questions.length ? 'Ready — show my result' : `Answered: ${answered} of ${questions.length}`);
  }

  function archetype(score, ranked) {
    if (score >= 83) return lang === 'ru' ? 'Suspiciously Happy' : 'Suspiciously Happy';
    if (score >= 66) return lang === 'ru' ? 'Actually Pretty Good' : 'Actually Pretty Good';
    const worst = ranked[ranked.length - 1].key;
    const names = lang === 'ru'
      ? { focus: 'Calendar Hostage', autonomy: 'Approval Tourist', meaning: 'Busy, But Why?', support: 'Solo Mode', pace: 'Powered by Urgency' }
      : { focus: 'Calendar Hostage', autonomy: 'Approval Tourist', meaning: 'Busy, But Why?', support: 'Solo Mode', pace: 'Powered by Urgency' };
    return names[worst];
  }

  quiz.addEventListener('change', updateProgress);

  quiz.addEventListener('submit', (event) => {
    event.preventDefault();
    const unanswered = questions.find(q => !q.querySelector('input:checked'));
    if (unanswered) {
      unanswered.scrollIntoView({ behavior: 'smooth', block: 'center' });
      unanswered.classList.add('whi-question--missing');
      setTimeout(() => unanswered.classList.remove('whi-question--missing'), 1200);
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
    const strongest = ranked[0];
    const weakest = ranked[ranked.length - 1];
    const type = archetype(score, ranked);

    result.querySelector('[data-whi-score]').textContent = score;
    result.querySelector('[data-whi-title]').textContent = type;
    result.querySelector('[data-whi-copy]').textContent = band.copy;
    result.querySelector('[data-whi-meter]').style.width = `${score}%`;
    result.querySelector('[data-whi-strength]').textContent = `${labels[strongest.key]} · ${strongest.score}/100`;
    result.querySelector('[data-whi-tax]').textContent = `${labels[weakest.key]} · ${weakest.score}/100`;
    result.querySelector('[data-whi-tax-copy]').textContent = advice[weakest.key];

    const profile = result.querySelector('[data-whi-profile]');
    profile.innerHTML = ranked.map(item => `<div class="whi-profile-row"><span>${labels[item.key]}</span><strong>${item.score}</strong><div><i style="width:${item.score}%"></i></div></div>`).join('');

    const shareText = lang === 'ru'
      ? `Мой Work Happiness Index — ${score}/100. Архетип: ${type}.\n\nСильная сторона: ${labels[strongest.key]} (${strongest.score}/100). Главный рабочий налог: ${labels[weakest.key]} (${weakest.score}/100).\n\n10 вопросов, ноль науки, иногда слишком точно:\nhttps://kurakin.pro/projects/work-happiness-index.html`
      : `My Work Happiness Index is ${score}/100. Archetype: ${type}.\n\nStrongest dimension: ${labels[strongest.key]} (${strongest.score}/100). Biggest work tax: ${labels[weakest.key]} (${weakest.score}/100).\n\n10 questions, zero science, sometimes uncomfortably accurate:\nhttps://kurakin.pro/en/projects/work-happiness-index.html`;
    result.querySelector('[data-whi-share]').textContent = shareText;

    quiz.hidden = true;
    result.hidden = false;
    result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  result.querySelector('[data-whi-copy-button]').addEventListener('click', async () => {
    const status = result.querySelector('[data-whi-copy-status]');
    try {
      await navigator.clipboard.writeText(result.querySelector('[data-whi-share]').textContent);
      status.textContent = lang === 'ru' ? 'Скопировано' : 'Copied';
    } catch (_) {
      status.textContent = lang === 'ru' ? 'Не удалось скопировать' : 'Could not copy';
    }
    setTimeout(() => { status.textContent = ''; }, 2200);
  });

  result.querySelector('[data-whi-share-button]').addEventListener('click', async () => {
    const text = result.querySelector('[data-whi-share]').textContent;
    const url = lang === 'ru' ? 'https://kurakin.pro/projects/work-happiness-index.html' : 'https://kurakin.pro/en/projects/work-happiness-index.html';
    if (navigator.share) {
      try { await navigator.share({ title: 'Work Happiness Index', text, url }); } catch (_) {}
    } else {
      try { await navigator.clipboard.writeText(text); } catch (_) {}
      result.querySelector('[data-whi-copy-status]').textContent = lang === 'ru' ? 'Текст скопирован' : 'Text copied';
    }
  });

  result.querySelector('[data-whi-restart]').addEventListener('click', () => {
    quiz.reset();
    quiz.hidden = false;
    result.hidden = true;
    updateProgress();
    quiz.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  updateProgress();
})();
