(() => {
  const root = document.querySelector('[data-slo-tool]');
  if (!root) return;

  const isRu = document.documentElement.lang === 'ru';
  const t = (ru, en) => isRu ? ru : en;
  const byId = (id) => document.getElementById(id);

  const availability = byId('slo-availability');
  const windowDays = byId('slo-window');
  const requests = byId('slo-requests');
  const badEvents = byId('slo-bad-events');
  const elapsedDays = byId('slo-elapsed');
  const serviceName = byId('slo-service-name');

  const resultAvailability = document.querySelector('[data-slo-availability-result]');
  const budgetTime = document.querySelector('[data-slo-budget-time]');
  const budgetEvents = document.querySelector('[data-slo-budget-events]');
  const consumed = document.querySelector('[data-slo-consumed]');
  const remaining = document.querySelector('[data-slo-remaining]');
  const burnRate = document.querySelector('[data-slo-burn-rate]');
  const status = document.querySelector('[data-slo-status]');
  const summary = document.querySelector('[data-slo-summary]');
  const copy = document.querySelector('[data-slo-copy]');
  const copyStatus = document.querySelector('[data-slo-copy-status]');

  const fmt = (value, digits = 1) => new Intl.NumberFormat(isRu ? 'ru-RU' : 'en-US', {
    maximumFractionDigits: digits
  }).format(value);

  const fmtDuration = (minutes) => {
    if (!Number.isFinite(minutes)) return '—';
    if (minutes < 1) return `${fmt(minutes * 60, 0)} ${t('сек', 'sec')}`;
    if (minutes < 60) return `${fmt(minutes, 1)} ${t('мин', 'min')}`;
    const hours = minutes / 60;
    if (hours < 48) return `${fmt(hours, 1)} ${t('ч', 'h')}`;
    return `${fmt(hours / 24, 2)} ${t('дн', 'd')}`;
  };

  const calculate = () => {
    const slo = Math.min(100, Math.max(0, Number(availability.value) || 0));
    const days = Math.max(1, Number(windowDays.value) || 1);
    const totalRequests = Math.max(0, Number(requests.value) || 0);
    const bad = Math.max(0, Number(badEvents.value) || 0);
    const elapsed = Math.min(days, Math.max(0.01, Number(elapsedDays.value) || 0.01));

    const errorFraction = Math.max(0, 1 - slo / 100);
    const windowMinutes = days * 24 * 60;
    const allowedDowntimeMinutes = windowMinutes * errorFraction;
    const allowedBadEvents = totalRequests * errorFraction;
    const consumedPct = allowedBadEvents > 0 ? (bad / allowedBadEvents) * 100 : (bad > 0 ? Infinity : 0);
    const remainingEvents = Math.max(0, allowedBadEvents - bad);
    const remainingPct = Math.max(0, 100 - (Number.isFinite(consumedPct) ? consumedPct : 100));
    const elapsedFraction = elapsed / days;
    const expectedConsumedPct = elapsedFraction * 100;
    const burn = expectedConsumedPct > 0 ? consumedPct / expectedConsumedPct : 0;

    resultAvailability.textContent = `${fmt(slo, 3)}%`;
    budgetTime.textContent = fmtDuration(allowedDowntimeMinutes);
    budgetEvents.textContent = totalRequests > 0 ? fmt(allowedBadEvents, 0) : '—';
    consumed.textContent = Number.isFinite(consumedPct) ? `${fmt(consumedPct, 1)}%` : '∞';
    remaining.textContent = totalRequests > 0
      ? `${fmt(remainingPct, 1)}% / ${fmt(remainingEvents, 0)} ${t('событий', 'events')}`
      : '—';
    burnRate.textContent = Number.isFinite(burn) ? `${fmt(burn, 2)}×` : '∞';

    if (!totalRequests) {
      status.textContent = t('Добавьте объём запросов для расчёта event budget', 'Add request volume to calculate an event budget');
    } else if (consumedPct >= 100) {
      status.textContent = t('Error budget исчерпан', 'Error budget exhausted');
    } else if (burn > 2) {
      status.textContent = t('Бюджет сгорает слишком быстро', 'Budget is burning too fast');
    } else if (burn > 1) {
      status.textContent = t('Выше планового burn rate', 'Above planned burn rate');
    } else {
      status.textContent = t('В пределах текущего error budget', 'Within the current error budget');
    }

    const name = serviceName.value.trim();
    const prefix = name ? `${name}: ` : '';
    summary.textContent = isRu
      ? `${prefix}SLO ${fmt(slo, 3)}% на окне ${days} дн. допускает примерно ${fmtDuration(allowedDowntimeMinutes)} недоступности. При ${fmt(totalRequests, 0)} запросах error budget составляет около ${fmt(allowedBadEvents, 0)} плохих событий. За ${fmt(elapsed, 1)} дн. зафиксировано ${fmt(bad, 0)} плохих событий: использовано ${Number.isFinite(consumedPct) ? fmt(consumedPct, 1) + '%' : 'более 100%'} бюджета, burn rate ${Number.isFinite(burn) ? fmt(burn, 2) + '×' : '∞'}. Остаток — ${fmt(remainingPct, 1)}% (${fmt(remainingEvents, 0)} событий).`
      : `${prefix}an SLO of ${fmt(slo, 3)}% over ${days} days allows about ${fmtDuration(allowedDowntimeMinutes)} of unavailability. At ${fmt(totalRequests, 0)} requests, the error budget is roughly ${fmt(allowedBadEvents, 0)} bad events. After ${fmt(elapsed, 1)} days, ${fmt(bad, 0)} bad events have been recorded: ${Number.isFinite(consumedPct) ? fmt(consumedPct, 1) + '%' : 'more than 100%'} of the budget is consumed, with a ${Number.isFinite(burn) ? fmt(burn, 2) + '×' : '∞'} burn rate. Remaining budget: ${fmt(remainingPct, 1)}% (${fmt(remainingEvents, 0)} events).`;
  };

  root.addEventListener('input', calculate);
  root.addEventListener('change', calculate);

  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(summary.textContent);
      copyStatus.textContent = t('Скопировано', 'Copied');
    } catch (error) {
      const textarea = document.createElement('textarea');
      textarea.value = summary.textContent;
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand('copy');
      textarea.remove();
      copyStatus.textContent = ok ? t('Скопировано', 'Copied') : t('Не удалось скопировать', 'Could not copy');
    }
    window.setTimeout(() => { copyStatus.textContent = ''; }, 1800);
  });

  calculate();
})();