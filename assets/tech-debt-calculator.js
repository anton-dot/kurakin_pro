(() => {
  const form = document.querySelector('[data-debt-calculator]');
  if (!form) return;

  const locale = document.documentElement.lang === 'ru' ? 'ru-RU' : 'en-US';
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
    monthly: document.querySelector('[data-debt-monthly]')
  };

  const readNumber = (element) => Math.max(0, Number.parseFloat(element.value) || 0);

  const formatMoney = (value) => {
    const currency = currencyInput.value || 'USD';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0
    }).format(value);
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
  };

  form.addEventListener('input', calculate);
  form.addEventListener('change', calculate);
  calculate();
})();
