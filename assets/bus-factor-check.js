(() => {
  const root = document.querySelector('[data-bf-tool]');
  if (!root) return;

  const isRu = document.documentElement.lang === 'ru';
  const t = (ru, en) => isRu ? ru : en;
  const escapeHtml = (value) => value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
  const list = root.querySelector('[data-bf-areas]');
  const addButton = root.querySelector('[data-bf-add]');
  const teamName = root.querySelector('[data-bf-team-name]');
  const scoreEl = document.querySelector('[data-bf-score]');
  const statusEl = document.querySelector('[data-bf-status]');
  const metricsEl = document.querySelector('[data-bf-metrics]');
  const risksEl = document.querySelector('[data-bf-risks]');
  const summaryEl = document.querySelector('[data-bf-summary]');
  const copyButton = document.querySelector('[data-bf-copy]');
  const copyStatus = document.querySelector('[data-bf-copy-status]');

  const defaults = [
    ['Core application', 2],
    ['Production / on-call', 1],
    ['Database and data', 2],
    ['Cloud / infrastructure', 3],
    ['CI/CD and releases', 2],
    ['Critical integrations', 1]
  ];

  const addRow = (name = '', owners = 2) => {
    const row = document.createElement('div');
    row.className = 'bf-area';
    row.innerHTML = `
      <input type="text" value="${escapeHtml(name)}" aria-label="${t('Критичная область знаний', 'Critical knowledge area')}" data-bf-area-name>
      <input type="number" min="0" max="20" step="1" value="${owners}" aria-label="${t('Людей, способных самостоятельно поддерживать область', 'People able to own this area independently')}" data-bf-owners>
      <button class="bf-remove" type="button" aria-label="${t('Удалить область', 'Remove area')}" data-bf-remove>×</button>
    `;
    list.appendChild(row);
  };

  const statusFor = (busFactor, singleOwner) => {
    if (busFactor === 0) return t('Критический пробел знаний', 'Critical knowledge gap');
    if (busFactor === 1) return t('Высокий риск зависимости от людей', 'High key-person dependency');
    if (busFactor === 2 || singleOwner > 0) return t('Умеренный риск', 'Moderate risk');
    return t('Устойчивая базовая покрываемость', 'Stronger baseline coverage');
  };

  const calculate = () => {
    const rows = [...list.querySelectorAll('.bf-area')]
      .map((row) => ({
        name: row.querySelector('[data-bf-area-name]').value.trim(),
        owners: Math.max(0, Number(row.querySelector('[data-bf-owners]').value) || 0)
      }))
      .filter((row) => row.name);

    if (!rows.length) {
      scoreEl.textContent = '—';
      statusEl.textContent = t('Добавьте хотя бы одну критичную область', 'Add at least one critical area');
      metricsEl.innerHTML = '';
      risksEl.innerHTML = `<li>${t('Нет данных для оценки.', 'No data to assess yet.')}</li>`;
      summaryEl.textContent = t('Добавьте критичные области знаний и количество людей, способных самостоятельно с ними работать.', 'Add critical knowledge areas and the number of people who can handle each independently.');
      return;
    }

    const busFactor = Math.min(...rows.map((row) => row.owners));
    const noOwner = rows.filter((row) => row.owners === 0);
    const singleOwner = rows.filter((row) => row.owners === 1);
    const twoOwners = rows.filter((row) => row.owners === 2);
    const resilient = rows.filter((row) => row.owners >= 3);
    const redundancyScore = Math.round(rows.reduce((sum, row) => sum + Math.min(row.owners, 3) / 3, 0) / rows.length * 100);
    const atRisk = [...noOwner, ...singleOwner];

    scoreEl.textContent = String(busFactor);
    statusEl.textContent = statusFor(busFactor, singleOwner.length);
    metricsEl.innerHTML = `
      <div class="bf-metric"><span>Knowledge redundancy score</span><strong>${redundancyScore}/100</strong></div>
      <div class="bf-metric"><span>${t('Критичных областей', 'Critical areas')}</span><strong>${rows.length}</strong></div>
      <div class="bf-metric"><span>Single-owner / no-owner</span><strong>${atRisk.length}</strong></div>
      <div class="bf-metric"><span>${t('Только два владельца', 'Only two owners')}</span><strong>${twoOwners.length}</strong></div>
      <div class="bf-metric"><span>${t('Три и более владельца', 'Three or more owners')}</span><strong>${resilient.length}</strong></div>
    `;

    if (atRisk.length) {
      risksEl.innerHTML = atRisk.map((row) => `<li>${escapeHtml(row.name)}: ${row.owners === 0 ? t('нет самостоятельного владельца', 'no independent owner') : t('зависит от одного человека', 'depends on one person')}</li>`).join('');
    } else {
      risksEl.innerHTML = `<li>${t('Критичных single-owner областей не отмечено.', 'No critical single-owner areas are currently marked.')}</li>`;
    }

    const label = teamName.value.trim();
    const prefix = label ? t(`Для ${label} `, `For ${label}, `) : '';
    const priority = atRisk.length
      ? atRisk.map((row) => row.name).join(', ')
      : twoOwners.length
        ? twoOwners.map((row) => row.name).join(', ')
        : t('явных приоритетов по резервированию знаний нет', 'there are no obvious knowledge-redundancy priorities');

    summaryEl.textContent = isRu
      ? `${prefix}прокси bus factor составляет ${busFactor} по ${rows.length} критичным областям знаний. ${atRisk.length} областей имеют не более одного самостоятельного владельца, ${twoOwners.length} — только двух, ${resilient.length} — трёх и более. Knowledge redundancy score: ${redundancyScore}/100. Приоритет для снижения key-person risk: ${priority}. Это направленная оценка покрытия знаний, а не точная модель организационного риска.`
      : `${prefix}the bus factor proxy is ${busFactor} across ${rows.length} critical knowledge areas. ${atRisk.length} areas have no more than one independent owner, ${twoOwners.length} have only two, and ${resilient.length} have three or more. Knowledge redundancy score: ${redundancyScore}/100. Priority for reducing key-person risk: ${priority}. This is a directional knowledge-coverage assessment, not a precise organizational risk model.`;
  };

  defaults.forEach(([name, owners]) => addRow(name, owners));

  addButton.addEventListener('click', () => {
    addRow('', 2);
    calculate();
    const inputs = list.querySelectorAll('[data-bf-area-name]');
    inputs[inputs.length - 1].focus();
  });

  root.addEventListener('input', calculate);
  root.addEventListener('click', (event) => {
    const remove = event.target.closest('[data-bf-remove]');
    if (!remove) return;
    remove.closest('.bf-area').remove();
    calculate();
  });

  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(summaryEl.textContent);
      copyStatus.textContent = t('Скопировано', 'Copied');
    } catch (error) {
      const textarea = document.createElement('textarea');
      textarea.value = summaryEl.textContent;
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