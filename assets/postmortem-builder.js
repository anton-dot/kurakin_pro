(() => {
  const root = document.querySelector('[data-pm-tool]');
  if (!root) return;

  const isRu = document.documentElement.lang === 'ru';
  const t = (ru, en) => isRu ? ru : en;
  const timelineList = root.querySelector('[data-pm-timeline]');
  const actionList = root.querySelector('[data-pm-actions]');
  const preview = document.querySelector('[data-pm-preview]');
  const completeness = document.querySelector('[data-pm-completeness]');
  const copyButton = document.querySelector('[data-pm-copy]');
  const copyStatus = document.querySelector('[data-pm-copy-status]');

  const field = (name) => root.querySelector(`[data-pm-field="${name}"]`);
  const value = (name) => (field(name)?.value || '').trim();
  const missing = t('Не указано', 'Not provided');

  const textBlock = (text) => text || missing;
  const bullets = (text) => {
    const items = text.split(/\n+/).map((item) => item.trim()).filter(Boolean);
    return items.length ? items.map((item) => `- ${item}`).join('\n') : `- ${missing}`;
  };

  const addTimelineRow = (time = '', eventText = '') => {
    const row = document.createElement('div');
    row.className = 'pm-repeat-row pm-timeline-row';
    row.innerHTML = `
      <input type="text" data-pm-timeline-time aria-label="${t('Время события', 'Event time')}" placeholder="${t('Например: 09:15', 'For example: 09:15')}">
      <input type="text" data-pm-timeline-event aria-label="${t('Событие', 'Event')}" placeholder="${t('Что произошло или что сделала команда', 'What happened or what the team did')}">
      <button class="pm-remove" type="button" data-pm-remove aria-label="${t('Удалить строку', 'Remove row')}">×</button>
    `;
    row.querySelector('[data-pm-timeline-time]').value = time;
    row.querySelector('[data-pm-timeline-event]').value = eventText;
    timelineList.appendChild(row);
  };

  const addActionRow = (action = '', owner = '', due = '', priority = 'medium') => {
    const row = document.createElement('div');
    row.className = 'pm-repeat-row pm-action-row';
    row.innerHTML = `
      <input type="text" data-pm-action-text aria-label="${t('Действие', 'Action')}" placeholder="${t('Что нужно изменить', 'What should change')}">
      <input type="text" data-pm-action-owner aria-label="${t('Владелец', 'Owner')}" placeholder="${t('Owner', 'Owner')}">
      <input type="date" data-pm-action-due aria-label="${t('Срок', 'Due date')}">
      <select data-pm-action-priority aria-label="${t('Приоритет', 'Priority')}">
        <option value="high">${t('Высокий', 'High')}</option>
        <option value="medium">${t('Средний', 'Medium')}</option>
        <option value="low">${t('Низкий', 'Low')}</option>
      </select>
      <button class="pm-remove" type="button" data-pm-remove aria-label="${t('Удалить действие', 'Remove action')}">×</button>
    `;
    row.querySelector('[data-pm-action-text]').value = action;
    row.querySelector('[data-pm-action-owner]').value = owner;
    row.querySelector('[data-pm-action-due]').value = due;
    row.querySelector('[data-pm-action-priority]').value = priority;
    actionList.appendChild(row);
  };

  const timelineText = () => {
    const rows = [...timelineList.querySelectorAll('.pm-timeline-row')]
      .map((row) => ({
        time: row.querySelector('[data-pm-timeline-time]').value.trim(),
        event: row.querySelector('[data-pm-timeline-event]').value.trim()
      }))
      .filter((row) => row.time || row.event);
    return rows.length
      ? rows.map((row) => `- ${row.time || '—'} — ${row.event || missing}`).join('\n')
      : `- ${missing}`;
  };

  const actionRows = () => [...actionList.querySelectorAll('.pm-action-row')]
    .map((row) => ({
      action: row.querySelector('[data-pm-action-text]').value.trim(),
      owner: row.querySelector('[data-pm-action-owner]').value.trim(),
      due: row.querySelector('[data-pm-action-due]').value,
      priority: row.querySelector('[data-pm-action-priority]').value
    }))
    .filter((row) => row.action || row.owner || row.due);

  const priorityLabel = (priority) => ({
    high: t('высокий', 'high'),
    medium: t('средний', 'medium'),
    low: t('низкий', 'low')
  }[priority] || priority);

  const actionsText = () => {
    const rows = actionRows();
    return rows.length
      ? rows.map((row, index) => `${index + 1}. ${row.action || missing} — ${t('владелец', 'owner')}: ${row.owner || missing}; ${t('срок', 'due')}: ${row.due || missing}; ${t('приоритет', 'priority')}: ${priorityLabel(row.priority)}`).join('\n')
      : `1. ${missing}`;
  };

  const render = () => {
    const title = value('title') || t('Инцидент', 'Incident');
    const severity = value('severity') || missing;
    const date = value('date') || missing;
    const duration = value('duration') || missing;

    const output = isRu
      ? `# Postmortem: ${title}\n\nДата: ${date}\nSeverity: ${severity}\nПродолжительность: ${duration}\n\n## Краткое резюме\n${textBlock(value('summary'))}\n\n## Влияние на клиентов и бизнес\n${textBlock(value('impact'))}\n\n## Как обнаружили\n${textBlock(value('detection'))}\n\n## Timeline\n${timelineText()}\n\n## Root cause\n${textBlock(value('rootCause'))}\n\n## Сопутствующие факторы\n${bullets(value('contributing'))}\n\n## Восстановление\n${textBlock(value('resolution'))}\n\n## Что сработало хорошо\n${bullets(value('wentWell'))}\n\n## Что сработало плохо\n${bullets(value('wentPoorly'))}\n\n## Выводы\n${bullets(value('lessons'))}\n\n## Action items\n${actionsText()}\n\nПринцип: postmortem описывает условия системы и процесса, а не ищет виноватого.`
      : `# Postmortem: ${title}\n\nDate: ${date}\nSeverity: ${severity}\nDuration: ${duration}\n\n## Executive summary\n${textBlock(value('summary'))}\n\n## Customer and business impact\n${textBlock(value('impact'))}\n\n## Detection\n${textBlock(value('detection'))}\n\n## Timeline\n${timelineText()}\n\n## Root cause\n${textBlock(value('rootCause'))}\n\n## Contributing factors\n${bullets(value('contributing'))}\n\n## Resolution and recovery\n${textBlock(value('resolution'))}\n\n## What went well\n${bullets(value('wentWell'))}\n\n## What went poorly\n${bullets(value('wentPoorly'))}\n\n## Lessons learned\n${bullets(value('lessons'))}\n\n## Action items\n${actionsText()}\n\nPrinciple: this postmortem focuses on system and process conditions rather than individual blame.`;

    preview.textContent = output;

    const required = ['title', 'date', 'severity', 'summary', 'impact', 'rootCause', 'resolution'];
    const completedFields = required.filter((name) => value(name)).length;
    const hasTimeline = [...timelineList.querySelectorAll('[data-pm-timeline-event]')].some((input) => input.value.trim());
    const hasAction = actionRows().some((row) => row.action && row.owner && row.due);
    const score = Math.round(((completedFields + Number(hasTimeline) + Number(hasAction)) / (required.length + 2)) * 100);
    completeness.textContent = `${score}%`;
  };

  const dateField = field('date');
  if (dateField && !dateField.value) dateField.value = new Date().toISOString().slice(0, 10);

  addTimelineRow();
  addTimelineRow();
  addActionRow();
  addActionRow();

  root.addEventListener('input', render);
  root.addEventListener('change', render);
  root.addEventListener('click', (event) => {
    const addTimeline = event.target.closest('[data-pm-add-timeline]');
    if (addTimeline) {
      addTimelineRow();
      render();
      timelineList.lastElementChild.querySelector('[data-pm-timeline-time]').focus();
      return;
    }
    const addAction = event.target.closest('[data-pm-add-action]');
    if (addAction) {
      addActionRow();
      render();
      actionList.lastElementChild.querySelector('[data-pm-action-text]').focus();
      return;
    }
    const remove = event.target.closest('[data-pm-remove]');
    if (remove) {
      remove.closest('.pm-repeat-row').remove();
      render();
    }
  });

  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(preview.textContent);
      copyStatus.textContent = t('Скопировано', 'Copied');
    } catch (error) {
      const textarea = document.createElement('textarea');
      textarea.value = preview.textContent;
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand('copy');
      textarea.remove();
      copyStatus.textContent = ok ? t('Скопировано', 'Copied') : t('Не удалось скопировать', 'Could not copy');
    }
    window.setTimeout(() => { copyStatus.textContent = ''; }, 1800);
  });

  render();
})();