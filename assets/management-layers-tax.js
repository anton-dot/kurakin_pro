(() => {
  const quiz = document.querySelector('[data-ml-quiz]');
  const result = document.querySelector('[data-ml-result]');
  if (!quiz || !result) return;
  const lang = document.body.dataset.lang || 'en';
  const questions = [...quiz.querySelectorAll('.ml-question')];
  const progress = quiz.querySelector('[data-ml-progress]');
  const maxPoints = questions.length * 4;
  const labels = lang === 'ru'
    ? { layers:'Уровни', handoffs:'Передачи', rework:'Переупаковка', escalation:'Эскалации', context:'Контекст' }
    : { layers:'Layers', handoffs:'Handoffs', rework:'Repackaging', escalation:'Escalation', context:'Context' };
  const advice = lang === 'ru'
    ? {
      layers:'Проверьте, какие решения действительно обязаны подниматься вверх. Для повторяемых и обратимых решений полезно заранее определить границы полномочий.',
      handoffs:'Сократите число обязательных передач между уровнями. Один явный decider часто дешевле последовательной цепочки согласующих.',
      rework:'Если одно и то же решение приходится переписывать для каждого уровня, попробуйте единый короткий decision memo с одинаковым контекстом для всех.',
      escalation:'Эскалация должна быть исключением, а не маршрутом по умолчанию. Зафиксируйте, какие условия действительно требуют следующего уровня.',
      context:'Контекст теряется при движении вверх и возвращается вниз уже в другой форме. Храните исходные trade-offs и решение рядом, а не только финальную формулировку.'
    }
    : {
      layers:'Check which decisions truly need to move upward. Repeated and reversible decisions benefit from explicit decision boundaries.',
      handoffs:'Reduce mandatory handoffs between levels. One clear decider is often cheaper than a sequential approval chain.',
      rework:'If the same decision is rewritten for every level, use one short decision memo that keeps the same context for everyone.',
      escalation:'Escalation should be an exception, not the default route. Define the conditions that genuinely require the next level.',
      context:'Context gets compressed on the way up and returns transformed. Keep the original trade-offs and decision together, not only the final summary.'
    };
  const bands = lang === 'ru'
    ? [
      {max:20,title:'Flat Enough',copy:'Структура помогает, но не становится маршрутом для каждого решения. Большая часть работы решается близко к контексту.'},
      {max:40,title:'Reasonable Structure',copy:'Уровни управления заметны, но пока в основном полезны. Есть несколько мест, где решение проходит лишний круг.'},
      {max:60,title:'Management Relay',copy:'Решение начинает путешествовать по организации как эстафетная палочка. Каждый уровень добавляет немного ожидания и немного новой упаковки.'},
      {max:80,title:'Executive Ping-Pong',copy:'Решения регулярно прыгают вверх и вниз между уровнями. Контекст сжимается, вопросы возвращаются, а скорость становится побочным эффектом календаря.'},
      {max:100,title:'Org Chart as a Workflow',copy:'Оргструктура фактически стала процессом исполнения. Чтобы решить вопрос, нужно пройти маршрут, который длиннее самого решения.'}
    ]
    : [
      {max:20,title:'Flat Enough',copy:'Structure helps without becoming the route for every decision. Most work gets decided close to the context.'},
      {max:40,title:'Reasonable Structure',copy:'Management layers are visible but mostly useful. A few decisions still take an unnecessary lap.'},
      {max:60,title:'Management Relay',copy:'Decisions are starting to travel through the organization like a baton. Each layer adds waiting and another round of packaging.'},
      {max:80,title:'Executive Ping-Pong',copy:'Decisions regularly bounce up and down the hierarchy. Context gets compressed, questions return, and speed becomes a calendar side effect.'},
      {max:100,title:'Org Chart as a Workflow',copy:'The org chart has effectively become the operating process. The route to a decision is longer than the decision itself.'}
    ];
  function updateProgress(){
    const answered = questions.filter(q => q.querySelector('input:checked')).length;
    progress.textContent = lang === 'ru' ? `Ответов: ${answered} из ${questions.length}` : `Answered: ${answered} of ${questions.length}`;
  }
  quiz.addEventListener('change', updateProgress);
  quiz.addEventListener('submit', e => {
    e.preventDefault();
    const missing = questions.find(q => !q.querySelector('input:checked'));
    if (missing){ missing.scrollIntoView({behavior:'smooth',block:'center'}); missing.classList.add('ml-question--missing'); setTimeout(()=>missing.classList.remove('ml-question--missing'),1200); return; }
    let points = 0;
    const categories = {};
    questions.forEach(q => {
      const value = Number(q.querySelector('input:checked').value);
      const key = q.dataset.category;
      points += value;
      if (!categories[key]) categories[key] = {points:0,max:0};
      categories[key].points += value;
      categories[key].max += 4;
    });
    const score = Math.round(points / maxPoints * 100);
    const band = bands.find(b => score <= b.max) || bands[bands.length - 1];
    const ranked = Object.entries(categories).map(([key,v]) => ({key,score:Math.round(v.points/v.max*100)})).sort((a,b)=>b.score-a.score);
    const worst = ranked[0];
    const layerChoice = quiz.querySelector('input[name="q1"]:checked').dataset.layers;
    const repeats = Number(quiz.querySelector('input[name="q6"]:checked').value);
    const handoffText = repeats <= 1 ? (lang==='ru'?'1–2 передачи':'1–2 handoffs') : repeats === 2 ? (lang==='ru'?'2–3 передачи':'2–3 handoffs') : repeats === 3 ? (lang==='ru'?'3–4 передачи':'3–4 handoffs') : (lang==='ru'?'4+ передач':'4+ handoffs');
    result.querySelector('[data-ml-score]').textContent = score;
    result.querySelector('[data-ml-title]').textContent = band.title;
    result.querySelector('[data-ml-copy]').textContent = band.copy;
    result.querySelector('[data-ml-layers]').textContent = layerChoice;
    result.querySelector('[data-ml-handoffs]').textContent = handoffText;
    result.querySelector('[data-ml-worst]').textContent = `${labels[worst.key]} · ${worst.score}/100`;
    result.querySelector('[data-ml-worst-copy]').textContent = advice[worst.key];
    result.querySelector('[data-ml-breakdown]').innerHTML = ranked.map(i => `<div class="ml-breakdown-row"><span>${labels[i.key]}</span><strong>${i.score}</strong><div><i style="width:${i.score}%"></i></div></div>`).join('');
    const share = lang === 'ru'
      ? `Мой Management Layers Tax — ${score}/100: ${band.title}. Типичный путь решения: ${layerChoice}; главный источник потерь — ${labels[worst.key].toLowerCase()} (${worst.score}/100).\n\nЕсли оргструктура становится workflow, решения начинают платить налог за каждый уровень.\n\nПроверьте свою: https://kurakin.pro/projects/management-layers-tax.html`
      : `My Management Layers Tax is ${score}/100: ${band.title}. Typical decision path: ${layerChoice}; biggest source of layer tax: ${labels[worst.key].toLowerCase()} (${worst.score}/100).\n\nWhen the org chart becomes the workflow, decisions pay tax at every layer.\n\nCheck yours: https://kurakin.pro/en/projects/management-layers-tax.html`;
    result.querySelector('[data-ml-share]').textContent = share;
    quiz.hidden = true; result.hidden = false; result.scrollIntoView({behavior:'smooth',block:'start'});
  });
  result.querySelector('[data-ml-copy-button]').addEventListener('click', async () => {
    const status = result.querySelector('[data-ml-copy-status]');
    try { await navigator.clipboard.writeText(result.querySelector('[data-ml-share]').textContent); status.textContent = lang==='ru'?'Скопировано':'Copied'; }
    catch(_){ status.textContent = lang==='ru'?'Не удалось скопировать':'Could not copy'; }
    setTimeout(()=>status.textContent='',2200);
  });
  const shareButton = result.querySelector('[data-ml-share-button]');
  if (!navigator.share) shareButton.hidden = true;
  else shareButton.addEventListener('click',()=>navigator.share({title:'Management Layers Tax',text:result.querySelector('[data-ml-share]').textContent}));
  result.querySelector('[data-ml-restart]').addEventListener('click',()=>{quiz.reset();quiz.hidden=false;result.hidden=true;updateProgress();quiz.scrollIntoView({behavior:'smooth',block:'start'});});
  updateProgress();
})();