(() => {
  const form = document.querySelector('[data-incident-calculator]');
  if (!form) return;

  const isRu = document.documentElement.lang === 'ru';
  const locale = isRu ? 'ru-RU' : 'en-US';
  const currencyInput = form.querySelector('#currency');
  const fields = {
    incidentName: form.querySelector('#incident-name'),
    incidentsYear: form.querySelector('#incidents-year'),
    duration: form.querySelector('#duration-hours'),
    revenueHour: form.querySelector('#revenue-per-hour'),
    revenueImpact: form.querySelector('#revenue-impact-percent'),
    engineers: form.querySelector('#responding-engineers'),
    responseHours: form.querySelector('#response-hours'),
    engineerMonthlyCost: form.querySelector('#engineer-monthly-cost'),
    followupHours: form.querySelector('#followup-hours'),
    supportHours: form.querySelector('#support-hours'),
    supportMonthlyCost: form.querySelector('#support-monthly-cost'),
    compensation: form.querySelector('#compensation-cost'),
    external: form.querySelector('#external-cost'),
    other: form.querySelector('#other-cost')
  };

  const output = {
    total: document.querySelector('[data-incident-total]'),
    revenue: document.querySelector('[data-incident-revenue]'),
    people: document.querySelector('[data-incident-people]'),
    direct: document.querySelector('[data-incident-direct]'),
    annual: document.querySelector('[data-incident-annual]'),
    perHour: document.querySelector('[data-incident-per-hour]'),
    summary: document.querySelector('[data-incident-summary]'),
    copy: document.querySelector('[data-incident-copy]'),
    copyStatus: document.querySelector('[data-incident-copy-status]')
  };

  const readNumber = (element) => Math.max(0, Number.parseFloat(element.value) || 0);
  const formatMoney = (value) => new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyInput.value || 'USD',
    maximumFractionDigits: 0
  }).format(value);
  const formatNumber = (value, digits = 1) => new Intl.NumberFormat(locale, {
    maximumFractionDigits: digits
  }).format(value);

  const calculate = () => {
    const incidentsYear = readNumber(fields.incidentsYear);
    const duration = readNumber(fields.duration);
    const revenueHour = readNumber(fields.revenueHour);
    const revenueImpact = Math.min(100, readNumber(fields.revenueImpact));
    const engineers = readNumber(fields.engineers);
    const responseHours = readNumber(fields.responseHours);
    const engineerMonthlyCost = readNumber(fields.engineerMonthlyCost);
    const followupHours = readNumber(fields.followupHours);
    const supportHours = readNumber(fields.supportHours);
    const supportMonthlyCost = readNumber(fields.supportMonthlyCost);
    const compensation = readNumber(fields.compensation);
    const external = readNumber(fields.external);
    const other = readNumber(fields.other);

    const engineerHourly = (engineerMonthlyCost * 12) / 2080;
    const supportHourly = (supportMonthlyCost * 12) / 2080;

    const revenueLoss = duration * revenueHour * (revenueImpact / 100);
    const responseCost = engineers * responseHours * engineerHourly;
    const followupCost = followupHours * engineerHourly;
    const supportCost = supportHours * supportHourly;
    const peopleCost = responseCost + followupCost + supportCost;
    const directCost = compensation + external + other;
    const total = revenueLoss + peopleCost + directCost;
    const annual = total * incidentsYear;
    const perHour = duration > 0 ? total / duration : 0;

    output.total.textContent = formatMoney(total);
    output.revenue.textContent = formatMoney(revenueLoss);
    output.people.textContent = formatMoney(peopleCost);
    output.direct.textContent = formatMoney(directCost);
    output.annual.textContent = formatMoney(annual);
    output.perHour.textContent = formatMoney(perHour);

    const name = fields.incidentName.value.trim();
    const incidentLabel = name ? `«${name}»` : (isRu ? 'типичный production-инцидент' : 'a typical production incident');
    output.summary.textContent = isRu
      ? `По этой модели ${incidentLabel} длительностью ${formatNumber(duration)} ч стоит компании примерно ${formatMoney(total)}. Из них ${formatMoney(revenueLoss)} — потерянная выручка, ${formatMoney(peopleCost)} — время инженерной, support и operations-команд, ещё ${formatMoney(directCost)} — компенсации и другие прямые расходы. При ${formatNumber(incidentsYear)} подобных инцидентах в год ожидаемый годовой эффект — около ${formatMoney(annual)}. Средняя стоимость одного часа такого инцидента — ${formatMoney(perHour)}.`
      : `Under this model, ${incidentLabel} lasting ${formatNumber(duration)} hours costs the company about ${formatMoney(total)}. Of that, ${formatMoney(revenueLoss)} is lost revenue, ${formatMoney(peopleCost)} is engineering, support, and operations time, and ${formatMoney(directCost)} is customer compensation and other direct recovery cost. At ${formatNumber(incidentsYear)} similar incidents per year, the expected annual impact is about ${formatMoney(annual)}. The average cost per incident hour is ${formatMoney(perHour)}.`;
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(output.summary.textContent || '');
      output.copyStatus.textContent = isRu ? 'Скопировано' : 'Copied';
    } catch (error) {
      const textarea = document.createElement('textarea');
      textarea.value = output.summary.textContent || '';
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand('copy');
      textarea.remove();
      output.copyStatus.textContent = copied ? (isRu ? 'Скопировано' : 'Copied') : (isRu ? 'Не удалось скопировать' : 'Could not copy');
    }
    window.setTimeout(() => { output.copyStatus.textContent = ''; }, 2200);
  };

  form.addEventListener('input', calculate);
  form.addEventListener('change', calculate);
  output.copy.addEventListener('click', copySummary);
  calculate();
})();
