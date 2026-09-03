(() => {
  const quiz = document.querySelector('[data-dli-quiz]');
  const result = document.querySelector('[data-dli-result]');
  if (!quiz || !result) return;
  const lang = document.body.dataset.lang || 'en';
  const questions = [...quiz.querySelectorAll('.dli-question')];
  const progress = quiz.querySelector('[data-dli-progress]');
  const totalQuestions = questions.length;
  const maxPoints = totalQuestions * 4;
  const labels = lang === 'ru'
    ? { ownership:'Ownership', approvals:'Согласования', information:'Информация', escalation:'Эскалации', reversibility:'Обратимость' }
    : { ownership:'Ownership', approvals:'Approvals', information:'Information', escalation:'Escalation', reversibility:'Reversibility' };
  const advice = lang === 'ru'
    ? {
      ownership:'Решения долго ищут владельца. Для повторяющихся типов решений полезно заранее определить одного decider — не комитет, не «все заинтересованные», а конкретного человека.',
      approvals:'Слишком много решений путешествуют по цепочке согласований. Разделите решения на те, что требуют approval, consultation и простого информирования.',
      information:'Решение ждёт не анализа, а сборки контекста. Один короткий decision memo с фактами, вариантами и неизвестными часто дешевле серии созвонов.',
      escalation:'Команда умеет обсуждать, но не всегда умеет закрывать спор. Нужны понятные escalation rules: кто решает при несогласии и через какое время.',
      reversibility:'Обратимые решения рассматриваются как необратимые. Если решение можно быстро отменить или откатить, ему нужен более дешёвый процесс принятия.'
    }
    : {
      ownership:'Decisions spend too long looking for an owner. For recurring decision types, define one decider in advance — not a committee and not “all stakeholders”.',
      approvals:'Too many decisions travel through approval chains. Separate decisions that need approval from those that only need consultation or notification.',
      information:'The decision is waiting for context assembly more than analysis. A short decision memo with facts, options and unknowns is often cheaper than another meeting series.',
      escalation:'The team can discuss disagreement but cannot always close it. Define escalation rules: who decides when people disagree and after how long.',
      reversibility:'Reversible decisions are being treated as irreversible. If a decision can be cheaply changed or rolled back, it deserves a cheaper decision process.'
    };
  const bands = lang === 'ru'
    ? [
      {max:20,title:'Decision Velocity',copy:'Большинство решений принимаются рядом с работой и не путешествуют по организации. Это не означает отсутствие контроля — скорее процесс решения соответствует цене ошибки.'},
      {max:40,title:'Reasonably Decisive',copy:'Небольшое трение есть, но оно редко становится отдельным проектом. Несколько типов решений всё ещё можно сделать заметно дешевле.'},
      {max:60,title:'Alignment Before Action',copy:'Решения начинают ждать календарей, контекста и согласований. Компания ещё движется, но стоимость одного “да/нет” уже выше, чем кажется.'},
      {max:80,title:'Decision by Committee',copy:'Время решения стало самостоятельным bottleneck. Проблема уже не только в скорости конкретных людей — процесс распределяет право решения слишком широко.'},
      {max:100,title:'Please Escalate the Escalation',copy:'Даже обратимые решения успевают пройти полноценный жизненный цикл. Здесь ускорение обычно начинается не с “решайте быстрее”, а с явных decision rights.'}
    ]
    : [
      {max:20,title:'Decision Velocity',copy:'Most decisions happen close to the work and do not travel through the organization. This is not lack of control; the decision process is simply proportional to the cost of being wrong.'},
      {max:40,title:'Reasonably Decisive',copy:'Some friction exists, but it rarely becomes a project of its own. A few recurring decision types could still be made much cheaper.'},
      {max:60,title:'Alignment Before Action',copy:'Decisions are starting to wait for calendars, context and approvals. The company still moves, but the cost of a simple yes/no is higher than it looks.'},
      {max:80,title:'Decision by Committee',copy:'Decision time has become a bottleneck of its own. The issue is not merely slow individuals — decision rights are distributed too broadly.'},
      {max:100,title:'Please Escalate the Escalation',copy:'Even reversible decisions complete a full organizational lifecycle. The fix usually starts with explicit decision rights, not another request to “move faster”.'}
    ];
  const latencyLabels = lang === 'ru'
    ? ['В тот же день','1–2 дня','3–5 дней','1–2 недели','2+ недели']
    : ['Same day','1–2 days','3–5 days','1–2 weeks','2+ weeks'];
  function updateProgress(){
    const answered = questions.filter(q => q.querySelector('input:checked')).length;
    progress.textContent = lang === 'ru' ? `Ответов: ${answered} из ${totalQuestions}` : `Answered: ${answered} of ${totalQuestions}`;
  }
  quiz.addEventListener('change', updateProgress);
  quiz.addEventListener('submit', event => {
    event.preventDefault();
    const missing = questions.find(q => !q.querySelector('input:checked'));
    if (missing) {
      missing.scrollIntoView({behavior:'smooth',block:'center'});
      missing.classList.add('dli-question--missing');
      setTimeout(() => missing.classList.remove('dli-question--missing'), 1200);
      return;
    }
    let points = 0;
    const categories = {};
    questions.forEach(q => {
      const value = Number(q.querySelector('input:checked').value);
      const category = q.dataset.category;
      points += value;
      if (!categories[category]) categories[category] = {points:0,max:0};
      categories[category].points += value;
      categories[category].max += 4;
    });
    const score = Math.round(points / maxPoints * 100);
    const band = bands.find(b => score <= b.max) || bands[bands.length - 1];
    const ranked = Object.entries(categories).map(([key,v]) => ({key,score:Math.round(v.points / v.max * 100)})).sort((a,b) => b.score - a.score);
    const worst = ranked[0];
    const latencyValue = Number(quiz.querySelector('input[name="q1"]:checked').value);
    result.querySelector('[data-dli-score]').textContent = score;
    result.querySelector('[data-dli-title]').textContent = band.title;
    result.querySelector('[data-dli-copy]').textContent = band.copy;
    result.querySelector('[data-dli-latency]').textContent = latencyLabels[latencyValue];
    result.querySelector('[data-dli-worst]').textContent = `${labels[worst.key]} · ${worst.score}/100`;
    result.querySelector('[data-dli-worst-copy]').textContent = advice[worst.key];
    const breakdown = result.querySelector('[data-dli-breakdown]');
    breakdown.innerHTML = '';
    ranked.forEach(item => {
      const row = document.createElement('div');
      row.className = 'dli-breakdown-row';
      const name = document.createElement('span'); name.textContent = labels[item.key];
      const value = document.createElement('strong'); value.textContent = item.score;
      const track = document.createElement('div');
      const fill = document.createElement('i'); fill.style.width = `${item.score}%`;
      track.appendChild(fill); row.append(name,value,track); breakdown.appendChild(row);
    });
    const url = lang === 'ru' ? 'https://kurakin.pro/projects/decision-latency-index.html' : 'https://kurakin.pro/en/projects/decision-latency-index.html';
    const share = lang === 'ru'
      ? `Мой Decision Latency Index — ${score}/100: ${band.title}. Типичное решение на 30 минут у нас занимает: ${latencyLabels[latencyValue]}. Главный тормоз: ${labels[worst.key].toLowerCase()} (${worst.score}/100).\n\nЕсли решение обратимо, возможно, ему не нужен процесс уровня M&A.\n\n${url}`
      : `My Decision Latency Index is ${score}/100: ${band.title}. A typical 30-minute decision takes us: ${latencyLabels[latencyValue]}. Biggest drag: ${labels[worst.key].toLowerCase()} (${worst.score}/100).\n\nIf a decision is reversible, it may not need an M&A-grade process.\n\n${url}`;
    result.querySelector('[data-dli-share]').textContent = share;
    quiz.hidden = true; result.hidden = false;
    result.scrollIntoView({behavior:'smooth',block:'start'});
  });
  result.querySelector('[data-dli-copy-button]').addEventListener('click', async () => {
    const status = result.querySelector('[data-dli-copy-status]');
    try { await navigator.clipboard.writeText(result.querySelector('[data-dli-share]').textContent); status.textContent = lang === 'ru' ? 'Скопировано' : 'Copied'; }
    catch (_) { status.textContent = lang === 'ru' ? 'Не удалось скопировать' : 'Could not copy'; }
    setTimeout(() => status.textContent = '', 2000);
  });
  result.querySelector('[data-dli-share-button]').addEventListener('click', async () => {
    if (!navigator.share) return result.querySelector('[data-dli-copy-button]').click();
    try { await navigator.share({title:'Decision Latency Index',text:result.querySelector('[data-dli-share]').textContent}); } catch (_) {}
  });
  result.querySelector('[data-dli-restart]').addEventListener('click', () => {
    quiz.reset(); quiz.hidden = false; result.hidden = true; updateProgress(); quiz.scrollIntoView({behavior:'smooth',block:'start'});
  });
  updateProgress();
})();