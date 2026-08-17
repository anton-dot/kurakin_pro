(() => {
  const root = document.querySelector('[data-saas-waste-calculator]');
  if (!root) return;

  const isRu = document.documentElement.lang === 'ru';
  const byId = (id) => root.querySelector(`#${id}`);
  const number = (id) => Math.max(0, Number(byId(id)?.value) || 0);
  const currency = () => byId('currency')?.value || 'USD';
  const locale = isRu ? 'ru-RU' : 'en-US';
  const money = (value) => new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency(),
    maximumFractionDigits: 0
  }).format(value);
  const percent = (value) => `${Math.round(value)}%`;

  const output = {
    annualSpend: document.querySelector('[data-saas-annual-spend]'),
    unused: document.querySelector('[data-saas-unused]'),
    underused: document.querySelector('[data-saas-underused]'),
    tier: document.querySelector('[data-saas-tier]'),
    overlap: document.querySelector('[data-saas-overlap]'),
    savings: document.querySelector('[data-saas-savings]'),
    monthly: document.querySelector('[data-saas-monthly]'),
    rate: document.querySelector('[data-saas-rate]'),
    summary: document.querySelector('[data-saas-summary]')
  };

  const calculate = () => {
    const seats = number('paid-seats');
    const seatCost = number('seat-cost');
    const unusedSeats = Math.min(number('unused-seats'), seats);
    const remainingAfterUnused = Math.max(0, seats - unusedSeats);
    const underusedSeats = Math.min(number('underused-seats'), remainingAfterUnused);
    const recoverableShare = Math.min(100, number('underused-recoverable')) / 100;
    const remainingAfterUnderused = Math.max(0, remainingAfterUnused - underusedSeats);
    const overTierSeats = Math.min(number('over-tier-seats'), remainingAfterUnderused);
    const downgradeSaving = Math.min(number('downgrade-saving'), seatCost);
    const overlapMonthly = number('overlap-monthly');

    const seatSpendAnnual = seats * seatCost * 12;
    const overlapAnnual = overlapMonthly * 12;
    const annualSpend = seatSpendAnnual + overlapAnnual;

    const unusedWaste = unusedSeats * seatCost * 12;
    const underusedWaste = underusedSeats * recoverableShare * seatCost * 12;
    const tierWaste = overTierSeats * downgradeSaving * 12;
    const totalSavings = Math.min(annualSpend, unusedWaste + underusedWaste + tierWaste + overlapAnnual);
    const monthlySavings = totalSavings / 12;
    const savingsRate = annualSpend > 0 ? (totalSavings / annualSpend) * 100 : 0;

    output.annualSpend.textContent = money(annualSpend);
    output.unused.textContent = money(unusedWaste);
    output.underused.textContent = money(underusedWaste);
    output.tier.textContent = money(tierWaste);
    output.overlap.textContent = money(overlapAnnual);
    output.savings.textContent = money(totalSavings);
    output.monthly.textContent = money(monthlySavings);
    output.rate.textContent = percent(savingsRate);

    output.summary.textContent = isRu
      ? `По текущей оценке SaaS-бюджет составляет около ${money(annualSpend)} в год. Потенциально можно высвободить до ${money(totalSavings)} в год (${money(monthlySavings)} в месяц), или около ${percent(savingsRate)} расходов. Из них ${money(unusedWaste)} приходится на полностью неиспользуемые лицензии, ${money(underusedWaste)} — на снимаемую часть недоиспользуемых лицензий, ${money(tierWaste)} — на избыточные тарифы и ${money(overlapAnnual)} — на пересекающиеся SaaS-инструменты. Перед сокращением лицензий стоит проверить реальные usage-данные, владельцев процессов и контрактные ограничения.`
      : `Based on the current estimate, SaaS spend is about ${money(annualSpend)} per year. Up to ${money(totalSavings)} per year (${money(monthlySavings)} per month), or roughly ${percent(savingsRate)} of spend, may be recoverable. That includes ${money(unusedWaste)} from fully unused licenses, ${money(underusedWaste)} from the removable share of underused licenses, ${money(tierWaste)} from oversized plans, and ${money(overlapAnnual)} from overlapping SaaS tools. Before removing licenses, validate actual usage, process ownership, and contract constraints.`;
  };

  root.addEventListener('input', calculate);
  root.addEventListener('change', calculate);

  const copyButton = document.querySelector('[data-saas-copy]');
  const copyStatus = document.querySelector('[data-saas-copy-status]');
  copyButton?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(output.summary.textContent.trim());
      copyStatus.textContent = isRu ? 'Скопировано' : 'Copied';
    } catch {
      copyStatus.textContent = isRu ? 'Не удалось скопировать' : 'Could not copy';
    }
    window.setTimeout(() => { copyStatus.textContent = ''; }, 1800);
  });

  calculate();
})();
