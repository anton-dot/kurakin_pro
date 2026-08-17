(() => {
  const form = document.querySelector('[data-ai-roi-calculator]');
  if (!form) return;

  const isRu = document.documentElement.lang === 'ru';
  const locale = isRu ? 'ru-RU' : 'en-US';
  const currencyInput = form.querySelector('#currency');

  const fields = {
    users: form.querySelector('#ai-users'),
    monthlyCost: form.querySelector('#monthly-employee-cost'),
    adoption: form.querySelector('#adoption-rate'),
    hoursSaved: form.querySelector('#hours-saved-week'),
    realization: form.querySelector('#realization-rate'),
    rework: form.querySelector('#rework-rate'),
    licenseCost: form.querySelector('#license-cost'),
    implementationCost: form.querySelector('#implementation-cost'),
    ongoingCost: form.querySelector('#ongoing-cost')
  };

  const output = {
    roi: document.querySelector('[data-ai-roi]'),
    netBenefit: document.querySelector('[data-ai-net-benefit]'),
    realizedValue: document.querySelector('[data-ai-realized-value]'),
    firstYearCost: document.querySelector('[data-ai-first-year-cost]'),
    recurringCost: document.querySelector('[data-ai-recurring-cost]'),
    payback: document.querySelector('[data-ai-payback]'),
    breakEven: document.querySelector('[data-ai-break-even]'),
    activeUsers: document.querySelector('[data-ai-active-users]'),
    summary: document.querySelector('[data-ai-roi-summary]'),
    copyButton: document.querySelector('[data-ai-roi-copy]'),
    copyStatus: document.querySelector('[data-ai-roi-copy-status]')
  };

  const readNumber = (element) => Math.max(0, Number.parseFloat(element.value) || 0);
  const clampPercent = (element) => Math.min(100, readNumber(element)) / 100;

  const formatMoney = (value) => new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyInput.value || 'USD',
    maximumFractionDigits: 0
  }).format(value);

  const formatNumber = (value, digits = 0) => new Intl.NumberFormat(locale, {
    maximumFractionDigits: digits
  }).format(value);

  const formatPercent = (value) => {
    if (!Number.isFinite(value)) return '—';
    return `${formatNumber(value * 100, 0)}%`;
  };

  const formatPayback = (months) => {
    if (months === null) return isRu ? 'Не окупается' : 'No payback';
    if (months === 0) return isRu ? 'Сразу' : 'Immediate';
    if (months < 1) return isRu ? '< 1 месяца' : '< 1 month';
    return isRu ? `${formatNumber(months, 1)} мес.` : `${formatNumber(months, 1)} mo.`;
  };

  const formatMinutes = (minutes) => {
    if (!Number.isFinite(minutes)) return '—';
    return isRu ? `${formatNumber(minutes, 0)} мин/нед.` : `${formatNumber(minutes, 0)} min/week`;
  };

  const calculate = () => {
    const users = readNumber(fields.users);
    const monthlyEmployeeCost = readNumber(fields.monthlyCost);
    const adoption = clampPercent(fields.adoption);
    const hoursSavedWeek = readNumber(fields.hoursSaved);
    const realization = clampPercent(fields.realization);
    const rework = clampPercent(fields.rework);
    const licenseCost = readNumber(fields.licenseCost);
    const implementationCost = readNumber(fields.implementationCost);
    const ongoingCost = readNumber(fields.ongoingCost);

    const activeUsers = users * adoption;
    const hourlyLoadedCost = monthlyEmployeeCost * 12 / 2080;
    const grossAnnualValue = activeUsers * hoursSavedWeek * 52 * hourlyLoadedCost;
    const realizedAnnualValue = grossAnnualValue * realization * (1 - rework);
    const annualRecurringCost = users * licenseCost * 12 + ongoingCost * 12;
    const firstYearCost = annualRecurringCost + implementationCost;
    const netBenefit = realizedAnnualValue - firstYearCost;
    const roi = firstYearCost > 0 ? netBenefit / firstYearCost : null;
    const monthlyNetAfterRecurring = realizedAnnualValue / 12 - annualRecurringCost / 12;
    const paybackMonths = implementationCost === 0
      ? (monthlyNetAfterRecurring >= 0 ? 0 : null)
      : (monthlyNetAfterRecurring > 0 ? implementationCost / monthlyNetAfterRecurring : null);

    const valuePerActiveUserHour = hourlyLoadedCost * realization * (1 - rework);
    const breakEvenHoursWeek = activeUsers > 0 && valuePerActiveUserHour > 0
      ? firstYearCost / (activeUsers * 52 * valuePerActiveUserHour)
      : NaN;
    const breakEvenMinutesWeek = breakEvenHoursWeek * 60;

    output.roi.textContent = roi === null ? '—' : formatPercent(roi);
    output.netBenefit.textContent = formatMoney(netBenefit);
    output.realizedValue.textContent = formatMoney(realizedAnnualValue);
    output.firstYearCost.textContent = formatMoney(firstYearCost);
    output.recurringCost.textContent = formatMoney(annualRecurringCost);
    output.payback.textContent = formatPayback(paybackMonths);
    output.breakEven.textContent = formatMinutes(breakEvenMinutesWeek);
    output.activeUsers.textContent = formatNumber(activeUsers, 0);

    const adoptionPercent = adoption * 100;
    const realizationPercent = realization * 100;
    const reworkPercent = rework * 100;

    if (isRu) {
      const result = netBenefit >= 0 ? 'положительный' : 'отрицательный';
      output.summary.textContent = `По текущей модели AI доступен ${formatNumber(users, 0)} сотрудникам, ожидаемое реальное использование — ${formatNumber(adoptionPercent, 0)}% (${formatNumber(activeUsers, 0)} активных пользователей). При экономии ${formatNumber(hoursSavedWeek, 1)} ч. на активного пользователя в неделю, коэффициенте реализации пользы ${formatNumber(realizationPercent, 0)}% и потерях на проверку/переделку ${formatNumber(reworkPercent, 0)}% реализованная ценность оценивается в ${formatMoney(realizedAnnualValue)} в год. Стоимость первого года — ${formatMoney(firstYearCost)}, чистый эффект — ${formatMoney(netBenefit)}, ROI — ${roi === null ? 'не рассчитывается' : formatPercent(roi)}. Результат ${result}; точка безубыточности требует около ${formatMinutes(breakEvenMinutesWeek)} экономии на одного активного пользователя.`;
    } else {
      const result = netBenefit >= 0 ? 'positive' : 'negative';
      output.summary.textContent = `In this model, AI access is provided to ${formatNumber(users, 0)} employees with expected real adoption of ${formatNumber(adoptionPercent, 0)}% (${formatNumber(activeUsers, 0)} active users). At ${formatNumber(hoursSavedWeek, 1)} hours saved per active user per week, a ${formatNumber(realizationPercent, 0)}% value-realization rate, and ${formatNumber(reworkPercent, 0)}% lost to review/rework, the realized annual value is estimated at ${formatMoney(realizedAnnualValue)}. First-year cost is ${formatMoney(firstYearCost)}, net benefit is ${formatMoney(netBenefit)}, and ROI is ${roi === null ? 'not available' : formatPercent(roi)}. The result is ${result}; break-even requires about ${formatMinutes(breakEvenMinutesWeek)} saved per active user.`;
    }
  };

  const copySummary = async () => {
    const text = output.summary.textContent.trim();
    if (!text) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }
      output.copyStatus.textContent = isRu ? 'Скопировано' : 'Copied';
      window.setTimeout(() => { output.copyStatus.textContent = ''; }, 1800);
    } catch (error) {
      output.copyStatus.textContent = isRu ? 'Не удалось скопировать' : 'Could not copy';
    }
  };

  form.addEventListener('input', calculate);
  form.addEventListener('change', calculate);
  output.copyButton.addEventListener('click', copySummary);
  calculate();
})();
