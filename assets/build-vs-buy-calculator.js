(() => {
  const form = document.querySelector('[data-build-buy-calculator]');
  if (!form) return;

  const isRu = document.documentElement.lang === 'ru';
  const locale = isRu ? 'ru-RU' : 'en-US';
  const currencyInput = form.querySelector('#currency');

  const fields = {
    horizonYears: form.querySelector('#horizon-years'),
    buildEngineers: form.querySelector('#build-engineers'),
    monthlyCost: form.querySelector('#monthly-cost'),
    buildMonths: form.querySelector('#build-months'),
    maintenanceFte: form.querySelector('#maintenance-fte'),
    buildInfraMonthly: form.querySelector('#build-infra-monthly'),
    opportunityMonthly: form.querySelector('#opportunity-monthly'),
    buySubscriptionMonthly: form.querySelector('#buy-subscription-monthly'),
    buyImplementation: form.querySelector('#buy-implementation'),
    buyIntegration: form.querySelector('#buy-integration'),
    buySupportHoursMonthly: form.querySelector('#buy-support-hours-monthly')
  };

  const output = {
    buildTco: document.querySelector('[data-build-tco]'),
    buyTco: document.querySelector('[data-buy-tco]'),
    winner: document.querySelector('[data-winner]'),
    difference: document.querySelector('[data-difference]'),
    buildRun: document.querySelector('[data-build-run]'),
    buyRun: document.querySelector('[data-buy-run]'),
    breakEven: document.querySelector('[data-break-even]'),
    opportunity: document.querySelector('[data-opportunity]'),
    summary: document.querySelector('[data-build-buy-summary]')
  };

  const copyButton = document.querySelector('[data-build-buy-copy]');
  const copyStatus = document.querySelector('[data-build-buy-copy-status]');

  const readNumber = (element) => Math.max(0, Number.parseFloat(element.value) || 0);

  const formatMoney = (value) => {
    const currency = currencyInput.value || 'USD';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value, maximumFractionDigits = 1) => new Intl.NumberFormat(locale, {
    maximumFractionDigits
  }).format(value);

  const calculate = () => {
    const horizonYears = Math.max(1, readNumber(fields.horizonYears));
    const buildEngineers = readNumber(fields.buildEngineers);
    const monthlyCost = readNumber(fields.monthlyCost);
    const buildMonths = readNumber(fields.buildMonths);
    const maintenanceFte = readNumber(fields.maintenanceFte);
    const buildInfraMonthly = readNumber(fields.buildInfraMonthly);
    const opportunityMonthly = readNumber(fields.opportunityMonthly);
    const buySubscriptionMonthly = readNumber(fields.buySubscriptionMonthly);
    const buyImplementation = readNumber(fields.buyImplementation);
    const buyIntegration = readNumber(fields.buyIntegration);
    const buySupportHoursMonthly = readNumber(fields.buySupportHoursMonthly);

    const hourlyLoadedCost = (monthlyCost * 12) / 2080;
    const buildEngineeringCost = buildEngineers * monthlyCost * buildMonths;
    const opportunityCost = opportunityMonthly * buildMonths;
    const buildInitialCost = buildEngineeringCost + opportunityCost;
    const buildAnnualRunCost = (maintenanceFte * monthlyCost * 12) + (buildInfraMonthly * 12);
    const buildYearsInOperation = Math.max(0, horizonYears - (buildMonths / 12));
    const buildTco = buildInitialCost + (buildAnnualRunCost * buildYearsInOperation);

    const buyInitialCost = buyImplementation + buyIntegration;
    const buyAnnualRunCost = (buySubscriptionMonthly * 12) + (buySupportHoursMonthly * hourlyLoadedCost * 12);
    const buyTco = buyInitialCost + (buyAnnualRunCost * horizonYears);

    const difference = Math.abs(buildTco - buyTco);
    const closeThreshold = Math.max(buildTco, buyTco) * 0.05;
    let winnerKey = 'close';
    if (difference > closeThreshold) winnerKey = buildTco < buyTco ? 'build' : 'buy';

    let breakEvenText;
    if (buyAnnualRunCost > buildAnnualRunCost) {
      const initialGap = buildInitialCost - buyInitialCost;
      if (initialGap <= 0) {
        breakEvenText = isRu ? 'Build дешевле с начала' : 'Build is cheaper from the start';
      } else {
        const years = initialGap / (buyAnnualRunCost - buildAnnualRunCost);
        breakEvenText = isRu
          ? `≈ ${formatNumber(years)} года`
          : `≈ ${formatNumber(years)} years`;
      }
    } else {
      breakEvenText = isRu ? 'В модели не достигается' : 'Not reached in this model';
    }

    const winnerText = winnerKey === 'build'
      ? 'Build'
      : winnerKey === 'buy'
        ? 'Buy'
        : (isRu ? 'Почти одинаково' : 'Very close');

    output.buildTco.textContent = formatMoney(buildTco);
    output.buyTco.textContent = formatMoney(buyTco);
    output.winner.textContent = winnerText;
    output.difference.textContent = formatMoney(difference);
    output.buildRun.textContent = formatMoney(buildAnnualRunCost);
    output.buyRun.textContent = formatMoney(buyAnnualRunCost);
    output.breakEven.textContent = breakEvenText;
    output.opportunity.textContent = formatMoney(opportunityCost);

    const buildAssumption = isRu
      ? `${formatNumber(buildEngineers)} инженеров на ${formatNumber(buildMonths)} мес. при полной стоимости ${formatMoney(monthlyCost)} на инженера в месяц, затем ${formatNumber(maintenanceFte)} FTE поддержки и ${formatMoney(buildInfraMonthly)}/мес. инфраструктуры`
      : `${formatNumber(buildEngineers)} engineers for ${formatNumber(buildMonths)} months at ${formatMoney(monthlyCost)} loaded cost per engineer per month, followed by ${formatNumber(maintenanceFte)} maintenance FTE and ${formatMoney(buildInfraMonthly)}/month of infrastructure`;

    const buyOneTime = buyImplementation + buyIntegration;
    const buyAssumption = isRu
      ? `${formatMoney(buySubscriptionMonthly)}/мес. подписки и ${formatMoney(buyOneTime)} разовых затрат на внедрение и интеграцию`
      : `${formatMoney(buySubscriptionMonthly)}/month subscription and ${formatMoney(buyOneTime)} one-time implementation and integration costs`;

    if (isRu) {
      const resultSentence = winnerKey === 'close'
        ? `Разница составляет ${formatMoney(difference)}, поэтому по стоимости варианты находятся достаточно близко.`
        : `По этой модели ${winnerText} дешевле на ${formatMoney(difference)}.`;
      output.summary.textContent = `На горизонте ${formatNumber(horizonYears)} года TCO варианта Build оценивается в ${formatMoney(buildTco)}, а Buy — в ${formatMoney(buyTco)}. ${resultSentence} Расчёт Build предполагает ${buildAssumption}. Для Buy заложено ${buyAssumption}. Это сравнение полной стоимости и оно не учитывает стратегические факторы: скорость выхода, контроль над продуктом, vendor lock-in, безопасность и ценность собственной технологии.`;
    } else {
      const resultSentence = winnerKey === 'close'
        ? `The difference is ${formatMoney(difference)}, so the two options are relatively close on cost.`
        : `In this model, ${winnerText} is cheaper by ${formatMoney(difference)}.`;
      output.summary.textContent = `Over a ${formatNumber(horizonYears)}-year horizon, Build TCO is estimated at ${formatMoney(buildTco)} versus ${formatMoney(buyTco)} for Buy. ${resultSentence} The Build estimate assumes ${buildAssumption}. The Buy estimate assumes ${buyAssumption}. This is a total-cost comparison and does not model strategic factors such as time to market, product control, vendor lock-in, security, or the value of proprietary technology.`;
    }

    if (copyStatus) copyStatus.textContent = '';
  };

  const copySummary = async () => {
    if (!output.summary || !output.summary.textContent) return;
    try {
      await navigator.clipboard.writeText(output.summary.textContent);
      if (copyStatus) copyStatus.textContent = isRu ? 'Скопировано' : 'Copied';
    } catch (error) {
      const range = document.createRange();
      range.selectNodeContents(output.summary);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      if (copyStatus) copyStatus.textContent = isRu ? 'Текст выделен — скопируйте вручную' : 'Text selected — copy it manually';
    }
  };

  form.addEventListener('input', calculate);
  form.addEventListener('change', calculate);
  if (copyButton) copyButton.addEventListener('click', copySummary);
  calculate();
})();
