(() => {
  const form = document.querySelector('[data-debt-calculator]');
  if (!form) return;

  const isRussian = document.documentElement.lang === 'ru';
  const locale = isRussian ? 'ru-RU' : 'en-US';
  const currencyInput = form.querySelector('#currency');
  const fields = {
    engineers: form.querySelector('#engineers'),
    monthlyCost: form.querySelector('#monthly-cost'),
    debtPercent: form.querySelector('#debt-percent'),
    incidentsPerMonth: form.querySelector('#incidents-per-month'),
    hoursPerIncident: form.querySelector('#hours-per-incident'),
    deliveryHoursPerMonth: form.querySelector('#delivery-hours-per-month')
  };

  const output = {
    total: document.querySelector('[data-debt-total]'),
    productivity: document.querySelector('[data-debt-productivity]'),
    incidents: document.querySelector('[data-debt-incidents]'),
    delivery: document.querySelector('[data-debt-delivery]'),
    monthly: document.querySelector('[data-debt-monthly]'),
    shareSummary: document.querySelector('[data-debt-share-summary]')
  };

  const copyButton = document.querySelector('[data-debt-copy]');
  const copyStatus = document.querySelector('[data-debt-copy-status]');

  const readNumber = (element) => Math.max(0, Number.parseFloat(element.value) || 0);

  const formatMoney = (value) => {
    const currency = currencyInput.value || 'USD';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value) => new Intl.NumberFormat(locale, {
    maximumFractionDigits: 1
  }).format(value);

  const buildShareSummary = ({
    engineers,
    monthlyCost,
    debtPercent,
    total,
    productivityCost,
    incidentCost,
    deliveryCost
  }) => {
    if (isRussian) {
      return `По текущей оценке, технический долг затрагивает ${formatNumber(engineers)} инженеров и обходится примерно в ${formatMoney(total)} в год (${formatMoney(total / 12)} в месяц). Из этой суммы ${formatMoney(productivityCost)} приходится на потерю продуктивности, ${formatMoney(incidentCost)} — на работу с инцидентами и ${formatMoney(deliveryCost)} — на дополнительную инженерную работу из-за задержек. Расчёт основан на средней полной стоимости инженера ${formatMoney(monthlyCost)} в месяц и оценке потери продуктивности ${formatNumber(debtPercent)}%. Это ориентировочная управленческая оценка для обсуждения приоритетов, а не бухгалтерская цифра.`;
    }

    return `Based on the current assumptions, technical debt affects ${formatNumber(engineers)} engineers and costs approximately ${formatMoney(total)} per year (${formatMoney(total / 12)} per month). Of that, ${formatMoney(productivityCost)} comes from lost productivity, ${formatMoney(incidentCost)} from incident response, and ${formatMoney(deliveryCost)} from additional engineering effort caused by delivery friction. The estimate assumes an average loaded engineering cost of ${formatMoney(monthlyCost)} per month and a productivity loss of ${formatNumber(debtPercent)}%. This is a directional management estimate for prioritization, not an accounting figure.`;
  };

  const calculate = () => {
    const engineers = readNumber(fields.engineers);
    const monthlyCost = readNumber(fields.monthlyCost);
    const debtPercent = Math.min(100, readNumber(fields.debtPercent));
    const incidentsPerMonth = readNumber(fields.incidentsPerMonth);
    const hoursPerIncident = readNumber(fields.hoursPerIncident);
    const deliveryHoursPerMonth = readNumber(fields.deliveryHoursPerMonth);

    const annualTeamCost = engineers * monthlyCost * 12;
    const hourlyLoadedCost = (monthlyCost * 12) / 2080;

    const productivityCost = annualTeamCost * (debtPercent / 100);
    const incidentCost = incidentsPerMonth * hoursPerIncident * 12 * hourlyLoadedCost;
    const deliveryCost = deliveryHoursPerMonth * 12 * hourlyLoadedCost;
    const total = productivityCost + incidentCost + deliveryCost;

    output.total.textContent = formatMoney(total);
    output.productivity.textContent = formatMoney(productivityCost);
    output.incidents.textContent = formatMoney(incidentCost);
    output.delivery.textContent = formatMoney(deliveryCost);
    output.monthly.textContent = formatMoney(total / 12);

    if (output.shareSummary) {
      output.shareSummary.textContent = buildShareSummary({
        engineers,
        monthlyCost,
        debtPercent,
        total,
        productivityCost,
        incidentCost,
        deliveryCost
      });
    }

    if (copyStatus) copyStatus.textContent = '';
    if (copyButton) copyButton.textContent = isRussian ? 'Скопировать текст' : 'Copy summary';
  };

  const fallbackCopy = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    textarea.remove();
    return copied;
  };

  const copySummary = async () => {
    if (!output.shareSummary) return;
    const text = output.shareSummary.textContent.trim();
    if (!text) return;

    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        copied = true;
      } else {
        copied = fallbackCopy(text);
      }
    } catch (error) {
      copied = fallbackCopy(text);
    }

    if (copied) {
      copyButton.textContent = isRussian ? 'Скопировано' : 'Copied';
      if (copyStatus) copyStatus.textContent = isRussian ? 'Текст скопирован в буфер обмена.' : 'Summary copied to the clipboard.';
    } else if (copyStatus) {
      copyStatus.textContent = isRussian ? 'Не удалось скопировать автоматически. Выделите текст вручную.' : 'Automatic copy failed. Select the text manually.';
    }
  };

  form.addEventListener('input', calculate);
  form.addEventListener('change', calculate);
  if (copyButton) copyButton.addEventListener('click', copySummary);
  calculate();
})();
