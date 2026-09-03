(() => {
  const root = document.querySelector('[data-context-tax]');
  if (!root) return;
  const lang = document.body.dataset.lang || 'en';
  const q = (name) => root.querySelector(`[name="${name}"]`);
  const out = (name) => root.querySelector(`[data-cs-${name}]`);
  const n = (name) => Math.max(0, Number(q(name)?.value || 0));
  const money = (value, currency) => new Intl.NumberFormat(lang === 'ru' ? 'ru-RU' : 'en-US', {style:'currency',currency,maximumFractionDigits:0}).format(value || 0);
  const num = (value, digits=1) => new Intl.NumberFormat(lang === 'ru' ? 'ru-RU' : 'en-US', {maximumFractionDigits:digits}).format(value || 0);

  const bands = lang === 'ru' ? [
    [20,'Deep Work Exists','У вас всё ещё есть длинные куски дня, в которые можно сделать что-то сложнее ответа в чате. Берегите их.'],
    [35,'Notification Economy','Работать ещё можно, но внимание уже стало общим корпоративным ресурсом. Небольшое сокращение реактивной нагрузки вернёт заметный кусок дня.'],
    [50,'Fragmented but Functional','Примерно половина рабочего времени уходит не на основную работу, а на встречи, реакцию и возвращение в контекст. Это уже системная стоимость.'],
    [65,'Context Switching Is the Job','Основная работа начинает выглядеть как короткие паузы между переключениями. Добавлять задачи сюда обычно бесполезно — сначала нужен воздух.'],
    [100,'Theoretical Employee','В календаре вы работаете полный день. В модели непрерывного внимания — заметно меньше. Возможно, продуктивность не надо ускорять; её надо перестать дробить.']
  ] : [
    [20,'Deep Work Exists','You still have long stretches of the day where something harder than replying to chat can happen. Protect them.'],
    [35,'Notification Economy','Work is still possible, but attention has become a shared corporate resource. Reducing reactive load can return a meaningful part of the day.'],
    [50,'Fragmented but Functional','About half the workday is going to meetings, reacting and rebuilding context rather than the core work itself. That is already a system cost.'],
    [65,'Context Switching Is the Job','The actual job is becoming the short gap between switches. Adding more tasks rarely fixes this; creating space might.'],
    [100,'Theoretical Employee','On the calendar you work a full day. In continuous-attention terms, considerably less. Maybe productivity does not need acceleration; maybe it needs fewer cuts.']
  ];

  function calculate() {
    const workday = Math.max(.5, n('workday'));
    const meetingHours = Math.min(workday, n('meetings'));
    const reactiveMinutes = n('reactive');
    const switches = n('switches');
    const recoveryMinutes = n('recovery');
    const days = Math.max(1, n('days'));
    const weeks = Math.max(1, n('weeks'));
    const annualCost = n('annualCost');
    const currency = q('currency')?.value || 'USD';

    const recoveryHours = (switches * recoveryMinutes) / 60;
    const reactiveHours = reactiveMinutes / 60;
    const lostRaw = meetingHours + reactiveHours + recoveryHours;
    const lost = Math.min(workday, lostRaw);
    const focus = Math.max(0, workday - lost);
    const tax = Math.min(100, Math.round((lost / workday) * 100));
    const weeklyFocus = focus * days;
    const annualLostHours = lost * days * weeks;
    const annualAvailableHours = workday * days * weeks;
    const hourlyCost = annualAvailableHours > 0 ? annualCost / annualAvailableHours : 0;
    const annualCostLost = annualLostHours * hourlyCost;
    const daysLost = annualLostHours / workday;
    const band = bands.find(([max]) => tax <= max) || bands[bands.length-1];

    out('focus').textContent = num(focus,1);
    out('title').textContent = band[1];
    out('verdict').textContent = band[2];
    out('tax').textContent = `${tax}%`;
    out('weekly').textContent = `${num(weeklyFocus,1)} h`;
    out('recovery').textContent = `${num(recoveryHours,1)} h`;
    out('days-lost').textContent = num(daysLost,0);
    out('cost').textContent = money(annualCostLost,currency);
    out('meter').style.width = `${tax}%`;
    out('meter-label').textContent = lang === 'ru' ? `${tax}% рабочего дня съедает фрагментация` : `${tax}% of the workday is consumed by fragmentation`;

    const share = lang === 'ru'
      ? `Мой Context Switching Tax — ${tax}%. Из ${num(workday,1)} часов рабочего дня на сфокусированную работу теоретически остаётся ${num(focus,1)} ч. В год фрагментация съедает около ${num(daysLost,0)} рабочих дней${annualCost ? ` — примерно ${money(annualCostLost,currency)}` : ''}.\n\n${band[1]}.\n\nПосчитать свой: https://kurakin.pro/projects/context-switching-tax.html`
      : `My Context Switching Tax is ${tax}%. Out of a ${num(workday,1)}-hour workday, I theoretically have ${num(focus,1)} hours left for focused work. Fragmentation consumes about ${num(daysLost,0)} workdays a year${annualCost ? ` — roughly ${money(annualCostLost,currency)}` : ''}.\n\n${band[1]}.\n\nCalculate yours: https://kurakin.pro/en/projects/context-switching-tax.html`;
    out('share').textContent = share;
  }

  root.addEventListener('input', calculate);
  root.addEventListener('change', calculate);
  root.querySelector('[data-cs-copy]')?.addEventListener('click', async () => {
    const status = out('status');
    try { await navigator.clipboard.writeText(out('share').textContent); status.textContent = lang === 'ru' ? 'Скопировано' : 'Copied'; }
    catch (_) { status.textContent = lang === 'ru' ? 'Не удалось скопировать' : 'Could not copy'; }
    setTimeout(() => status.textContent = '', 2000);
  });
  root.querySelector('[data-cs-native-share]')?.addEventListener('click', async () => {
    if (!navigator.share) return;
    try { await navigator.share({title:'Context Switching Tax',text:out('share').textContent}); } catch (_) {}
  });
  if (!navigator.share) root.querySelector('[data-cs-native-share]')?.setAttribute('hidden','');
  calculate();
})();
