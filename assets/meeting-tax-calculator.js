(() => {
  const form = document.querySelector('[data-meeting-tax-form]');
  const result = document.querySelector('[data-meeting-tax-result]');
  if (!form || !result) return;

  const lang = document.body.dataset.lang || 'en';
  const currencySymbols = { USD: '$', EUR: '€', GBP: '£' };
  const fields = ['currency','people','annual-cost','duration','prep','meetings-week','weeks-year'];

  function number(id) {
    const el = form.querySelector(`#${id}`);
    return Math.max(0, Number(el?.value || 0));
  }

  function money(value, currency) {
    return new Intl.NumberFormat(lang === 'ru' ? 'ru-RU' : 'en-US', {
      style: 'currency', currency, maximumFractionDigits: value >= 1000 ? 0 : 2
    }).format(value || 0);
  }

  function compact(value) {
    return new Intl.NumberFormat(lang === 'ru' ? 'ru-RU' : 'en-US', { maximumFractionDigits: 1 }).format(value || 0);
  }

  function verdict(annualCost, annualHours, onePersonWeeks) {
    if (annualHours < 40) return lang === 'ru'
      ? ['Пока не страшно', 'Встреча стоит денег, но её годовой след небольшой. Всё равно полезно убедиться, что у неё есть ясная цель.']
      : ['Probably fine', 'The meeting costs money, but its annual footprint is small. It is still worth making sure it has a clear purpose.'];
    if (onePersonWeeks < 4) return lang === 'ru'
      ? ['Уже заметный налог', 'За год встреча съедает несколько недель стоимости одного сотрудника. Хороший момент проверить состав участников и частоту.']
      : ['A visible tax', 'Over a year this meeting consumes several weeks of one person’s cost. Good time to review attendance and frequency.'];
    if (onePersonWeeks < 10) return lang === 'ru'
      ? ['Это уже проект', 'Годовая стоимость встречи сравнима с месяцами работы одного сотрудника. У неё должен быть измеримый результат, а не только привычка в календаре.']
      : ['This is basically a project', 'The annual meeting cost is comparable to months of one employee’s time. It should produce measurable value, not just calendar continuity.'];
    return lang === 'ru'
      ? ['Поздравляем: у вас появился Meeting Department', 'Эта одна регулярная встреча стоит компании как заметная доля годовой занятости сотрудника. Возможно, пора спросить, что именно компания покупает за эти деньги.']
      : ['Congratulations, you have a Meeting Department', 'This single recurring meeting costs a meaningful share of one employee-year. It may be time to ask what the company is actually buying with that spend.'];
  }

  function calculate() {
    const currency = form.querySelector('#currency').value;
    const people = number('people');
    const annualLoadedCost = number('annual-cost');
    const durationMinutes = number('duration');
    const prepMinutes = number('prep');
    const meetingsWeek = number('meetings-week');
    const weeksYear = number('weeks-year');

    const totalMinutesPerPerson = durationMinutes + prepMinutes;
    const hourlyCost = annualLoadedCost / 2080;
    const costPerMeeting = people * hourlyCost * (totalMinutesPerPerson / 60);
    const meetingsYear = meetingsWeek * weeksYear;
    const annualCost = costPerMeeting * meetingsYear;
    const annualPersonHours = people * (totalMinutesPerPerson / 60) * meetingsYear;
    const annualWorkdays = annualPersonHours / 8;
    const onePersonWeeks = annualLoadedCost > 0 ? (annualCost / annualLoadedCost) * 52 : 0;
    const monthlyCost = annualCost / 12;
    const [verdictTitle, verdictCopy] = verdict(annualCost, annualPersonHours, onePersonWeeks);

    result.querySelector('[data-meeting-tax-total]').textContent = money(annualCost, currency);
    result.querySelector('[data-meeting-tax-each]').textContent = money(costPerMeeting, currency);
    result.querySelector('[data-meeting-tax-month]').textContent = money(monthlyCost, currency);
    result.querySelector('[data-meeting-tax-hours]').textContent = `${compact(annualPersonHours)} h`;
    result.querySelector('[data-meeting-tax-days]').textContent = lang === 'ru' ? `${compact(annualWorkdays)} раб. дней` : `${compact(annualWorkdays)} workdays`;
    result.querySelector('[data-meeting-tax-weeks]').textContent = lang === 'ru' ? `${compact(onePersonWeeks)} нед.` : `${compact(onePersonWeeks)} weeks`;
    result.querySelector('[data-meeting-tax-verdict-title]').textContent = verdictTitle;
    result.querySelector('[data-meeting-tax-verdict-copy]').textContent = verdictCopy;

    const share = lang === 'ru'
      ? `Посчитал Meeting Tax.\n\nОдна регулярная встреча: ${money(costPerMeeting, currency)} за раз и примерно ${money(annualCost, currency)} в год. Она забирает около ${compact(annualPersonHours)} человеко-часов — ${compact(annualWorkdays)} рабочих дней.\n\nНе все встречи плохие. Но дорогие встречи должны создавать дорогую ценность.\n\nПосчитать свою: https://kurakin.pro/projects/meeting-tax-calculator.html`
      : `I calculated the Meeting Tax.\n\nOne recurring meeting costs ${money(costPerMeeting, currency)} each time and about ${money(annualCost, currency)} per year. That is roughly ${compact(annualPersonHours)} person-hours — ${compact(annualWorkdays)} workdays.\n\nMeetings are not inherently bad. Expensive meetings should create expensive value.\n\nCalculate yours: https://kurakin.pro/en/projects/meeting-tax-calculator.html`;
    result.querySelector('[data-meeting-tax-share]').textContent = share;
  }

  form.addEventListener('input', calculate);
  form.addEventListener('change', calculate);

  result.querySelector('[data-meeting-tax-copy]').addEventListener('click', async () => {
    const status = result.querySelector('[data-meeting-tax-status]');
    try {
      await navigator.clipboard.writeText(result.querySelector('[data-meeting-tax-share]').textContent);
      status.textContent = lang === 'ru' ? 'Скопировано' : 'Copied';
    } catch (_) {
      status.textContent = lang === 'ru' ? 'Не удалось скопировать' : 'Could not copy';
    }
    setTimeout(() => { status.textContent = ''; }, 2200);
  });

  const shareButton = result.querySelector('[data-meeting-tax-native-share]');
  if (!navigator.share) shareButton.hidden = true;
  shareButton.addEventListener('click', async () => {
    try {
      await navigator.share({
        title: 'Meeting Tax Calculator',
        text: result.querySelector('[data-meeting-tax-share]').textContent,
        url: lang === 'ru' ? 'https://kurakin.pro/projects/meeting-tax-calculator.html' : 'https://kurakin.pro/en/projects/meeting-tax-calculator.html'
      });
    } catch (_) {}
  });

  fields.forEach(id => form.querySelector(`#${id}`)?.addEventListener('blur', calculate));
  calculate();
})();