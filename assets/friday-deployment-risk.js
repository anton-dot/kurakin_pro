(() => {
  const quiz = document.querySelector('[data-fd-quiz]');
  const result = document.querySelector('[data-fd-result]');
  if (!quiz || !result) return;

  const lang = document.body.dataset.lang || 'en';
  const progress = quiz.querySelector('[data-fd-progress]');
  const questions = [...quiz.querySelectorAll('.fd-question')];
  const totalQuestions = questions.length;
  const maxPoints = totalQuestions * 4;

  const categoryLabels = lang === 'ru'
    ? { rollback: 'Rollback', observability: 'Наблюдаемость', blast: 'Blast radius', process: 'Процесс релиза', people: 'Люди и поддержка' }
    : { rollback: 'Rollback', observability: 'Observability', blast: 'Blast radius', process: 'Release process', people: 'People & support' };

  const categoryAdvice = lang === 'ru'
    ? {
        rollback: 'Главный риск — возможность отката. Хороший пятничный релиз начинается не с уверенности, а с понятного и проверенного пути назад.',
        observability: 'Главный риск — увидеть проблему слишком поздно. До релиза определите сигналы успеха, ошибки и момент, когда нужно остановиться или откатываться.',
        blast: 'Главный риск — слишком большой радиус поражения. Уменьшите размер изменения, используйте gradual rollout, feature flags или ограниченную аудиторию.',
        process: 'Главный риск — сам процесс релиза. Чем больше ручных шагов, миграций и импровизации, тем меньше пятница похожа на обычный рабочий день.',
        people: 'Главный риск — зависимость от конкретных людей. Убедитесь, что после релиза есть кому смотреть, принимать решения и восстанавливать сервис без поиска героя в мессенджере.'
      }
    : {
        rollback: 'Your biggest risk is the way back. A good Friday release starts not with confidence, but with a clear and tested rollback path.',
        observability: 'Your biggest risk is noticing trouble too late. Define success signals, failure signals, and the point at which you stop or roll back before shipping.',
        blast: 'Your biggest risk is blast radius. Reduce the change size, use gradual rollout, feature flags, canaries, or a limited audience.',
        process: 'Your biggest risk is the release process itself. The more manual steps, migrations, and improvisation involved, the less Friday looks like a normal workday.',
        people: 'Your biggest risk is dependence on specific people. Make sure someone can observe, decide, and recover after the release without hunting for a hero in chat.'
      };

  const bands = lang === 'ru'
    ? [
        { max: 20, title: 'Ship it before lunch', copy: 'Пятница здесь почти не при чём. Изменение небольшое, сигналы понятны, rollback существует не только в презентации, а команда не зависит от одного человека.' },
        { max: 40, title: 'Reasonably brave', copy: 'Релиз выглядит контролируемым. Несколько вещей всё ещё требуют внимания, но при нормальной дисциплине это не должно превращаться в субботний постмортем.' },
        { max: 60, title: 'Friday with snacks', copy: 'Уровень смелости уже заметен. Перед кнопкой Deploy стоит убрать хотя бы один крупный источник неопределённости — rollback, наблюдаемость, размер изменения или ручные шаги.' },
        { max: 80, title: 'Weekend plans optional', copy: 'Риск складывается из нескольких факторов одновременно. Проблема не в пятнице — проблема в том, что релиз требует слишком много надежды в местах, где лучше иметь механизмы.' },
        { max: 100, title: 'Please notify your family', copy: 'Это не пятничный релиз, а эксперимент с личными планами команды. Уменьшите blast radius, проверьте откат и убедитесь, что после Deploy остаются люди и сигналы, а не только оптимизм.' }
      ]
    : [
        { max: 20, title: 'Ship it before lunch', copy: 'Friday is barely relevant here. The change is small, signals are clear, rollback exists outside a slide deck, and the team does not depend on one person.' },
        { max: 40, title: 'Reasonably brave', copy: 'This release looks controlled. A few things still deserve attention, but normal release discipline should keep it from becoming a Saturday postmortem.' },
        { max: 60, title: 'Friday with snacks', copy: 'The bravery level is becoming visible. Remove at least one major source of uncertainty before Deploy: rollback, observability, change size, or manual steps.' },
        { max: 80, title: 'Weekend plans optional', copy: 'Several risk factors are stacking up. Friday is not the real problem; the release currently relies on hope in places where mechanisms would be cheaper.' },
        { max: 100, title: 'Please notify your family', copy: 'This is less a Friday release and more an experiment with everyone’s weekend plans. Reduce blast radius, verify rollback, and make sure people and signals still exist after Deploy.' }
      ];

  function updateProgress() {
    const answered = questions.filter(q => q.querySelector('input:checked')).length;
    progress.textContent = lang === 'ru'
      ? (answered === totalQuestions ? 'Готово — можно оценивать смелость' : `Ответов: ${answered} из ${totalQuestions}`)
      : (answered === totalQuestions ? 'Ready to assess bravery' : `Answered: ${answered} of ${totalQuestions}`);
  }

  quiz.addEventListener('change', updateProgress);

  quiz.addEventListener('submit', (event) => {
    event.preventDefault();
    const unanswered = questions.find(q => !q.querySelector('input:checked'));
    if (unanswered) {
      unanswered.scrollIntoView({ behavior: 'smooth', block: 'center' });
      unanswered.classList.add('fd-question--missing');
      setTimeout(() => unanswered.classList.remove('fd-question--missing'), 1200);
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
    const best = [...ranked].sort((a, b) => a.score - b.score)[0];

    result.querySelector('[data-fd-score]').textContent = score;
    result.querySelector('[data-fd-title]').textContent = band.title;
    result.querySelector('[data-fd-copy]').textContent = band.copy;
    result.querySelector('[data-fd-meter]').style.width = `${score}%`;
    result.querySelector('[data-fd-worst]').textContent = `${categoryLabels[worst.key]} · ${worst.score}/100`;
    result.querySelector('[data-fd-worst-copy]').textContent = categoryAdvice[worst.key];
    result.querySelector('[data-fd-best]').textContent = `${categoryLabels[best.key]} · ${best.score}/100`;

    const breakdown = result.querySelector('[data-fd-breakdown]');
    breakdown.innerHTML = ranked.map(item => `<div class="fd-breakdown-row"><span>${categoryLabels[item.key]}</span><strong>${item.score}</strong><div><i style="width:${item.score}%"></i></div></div>`).join('');

    const shareText = lang === 'ru'
      ? `Мой Friday Deployment Risk — ${score}/100: ${band.title}. Самый большой риск: ${categoryLabels[worst.key]} (${worst.score}/100).\n\nПохоже, пятница сама по себе не опасна. Опасно, когда rollback, observability и blast radius существуют в режиме «надеемся».\n\nПроверьте свой релиз: https://kurakin.pro/projects/friday-deployment-risk.html`
      : `My Friday Deployment Risk is ${score}/100: ${band.title}. Biggest risk: ${categoryLabels[worst.key]} (${worst.score}/100).\n\nFriday itself is not dangerous. Hope-based rollback, observability and blast radius are.\n\nCheck your release: https://kurakin.pro/en/projects/friday-deployment-risk.html`;
    result.querySelector('[data-fd-share-text]').textContent = shareText;

    quiz.hidden = true;
    result.hidden = false;
    result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  result.querySelector('[data-fd-copy-button]').addEventListener('click', async () => {
    const status = result.querySelector('[data-fd-copy-status]');
    try {
      await navigator.clipboard.writeText(result.querySelector('[data-fd-share-text]').textContent);
      status.textContent = lang === 'ru' ? 'Скопировано' : 'Copied';
    } catch (_) {
      status.textContent = lang === 'ru' ? 'Не удалось скопировать' : 'Could not copy';
    }
    setTimeout(() => { status.textContent = ''; }, 2200);
  });

  const shareButton = result.querySelector('[data-fd-native-share]');
  if (!navigator.share) shareButton.hidden = true;
  shareButton.addEventListener('click', async () => {
    try {
      await navigator.share({
        title: 'Friday Deployment Risk',
        text: result.querySelector('[data-fd-share-text]').textContent,
        url: lang === 'ru' ? 'https://kurakin.pro/projects/friday-deployment-risk.html' : 'https://kurakin.pro/en/projects/friday-deployment-risk.html'
      });
    } catch (_) {}
  });

  result.querySelector('[data-fd-restart]').addEventListener('click', () => {
    quiz.reset();
    quiz.hidden = false;
    result.hidden = true;
    updateProgress();
    quiz.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  updateProgress();
})();