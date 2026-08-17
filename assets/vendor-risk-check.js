(() => {
  const root = document.querySelector('[data-vendor-risk-assessment]');
  if (!root) return;

  const isRu = document.documentElement.lang === 'ru';
  const t = (ru, en) => isRu ? ru : en;

  const categories = [
    { id: 'security', ru: 'Безопасность и доступы', en: 'Security & access' },
    { id: 'data', ru: 'Данные и приватность', en: 'Data & privacy' },
    { id: 'resilience', ru: 'Надёжность и continuity', en: 'Reliability & continuity' },
    { id: 'lockin', ru: 'Зависимость и lock-in', en: 'Dependency & lock-in' },
    { id: 'operations', ru: 'Поддержка и эксплуатация', en: 'Support & operations' },
    { id: 'commercial', ru: 'Коммерческие и governance-риски', en: 'Commercial & governance' }
  ];

  const questions = [
    { id: 's1', category: 'security', critical: true, ru: 'Для административных и привилегированных доступов поставщик поддерживает MFA/SSO и разграничение ролей?', en: 'Does the vendor support MFA/SSO and role separation for administrative and privileged access?' },
    { id: 's2', category: 'security', critical: false, ru: 'Есть актуальные независимые подтверждения security-практик: аудит, сертификация или сопоставимый отчёт?', en: 'Is there current independent evidence of security practices, such as an audit, certification, or comparable report?' },
    { id: 's3', category: 'security', critical: true, ru: 'Процесс уведомления о security-инцидентах и сроки коммуникации определены заранее?', en: 'Are the security incident notification process and communication timelines defined in advance?' },
    { id: 's4', category: 'security', critical: false, ru: 'Есть понятный процесс управления уязвимостями, обновлениями и исправлениями?', en: 'Is there a clear vulnerability management, patching, and remediation process?' },

    { id: 'd1', category: 'data', critical: true, ru: 'Роли сторон по обработке данных, DPA и ответственность за клиентские данные определены?', en: 'Are data-processing roles, the DPA, and responsibility for customer data clearly defined?' },
    { id: 'd2', category: 'data', critical: false, ru: 'Понятно, где хранятся данные и какие субпроцессоры имеют к ним доступ?', en: 'Is it clear where data is stored and which subprocessors can access it?' },
    { id: 'd3', category: 'data', critical: true, ru: 'После расторжения договора данные можно получить и гарантированно удалить у поставщика?', en: 'Can data be retrieved and reliably deleted by the vendor after contract termination?' },
    { id: 'd4', category: 'data', critical: false, ru: 'Чувствительные данные защищены при передаче и хранении, а доступ к ним контролируется?', en: 'Is sensitive data protected in transit and at rest, with controlled access?' },

    { id: 'r1', category: 'resilience', critical: false, ru: 'SLA, доступность сервиса и порядок эскалации при нарушениях определены и измеримы?', en: 'Are SLA, service availability, and escalation paths defined and measurable?' },
    { id: 'r2', category: 'resilience', critical: true, ru: 'Поставщик может объяснить disaster recovery, RTO/RPO и резервирование критичных компонентов?', en: 'Can the vendor explain disaster recovery, RTO/RPO, and redundancy for critical components?' },
    { id: 'r3', category: 'resilience', critical: true, ru: 'Резервное копирование и continuity-процедуры регулярно тестируются, а не существуют только на бумаге?', en: 'Are backup and continuity procedures regularly tested rather than existing only on paper?' },
    { id: 'r4', category: 'resilience', critical: false, ru: 'Есть публичная или доступная история инцидентов и понятный процесс postmortem?', en: 'Is there an accessible incident history and a clear postmortem process?' },

    { id: 'l1', category: 'lockin', critical: true, ru: 'Ключевой бизнес-процесс сможет работать хотя бы ограниченно, если сервис будет недоступен сутки?', en: 'Can the key business process continue at least in a limited mode if the service is unavailable for a day?' },
    { id: 'l2', category: 'lockin', critical: false, ru: 'Данные и основные артефакты можно экспортировать в пригодном для миграции формате?', en: 'Can data and key artifacts be exported in a format suitable for migration?' },
    { id: 'l3', category: 'lockin', critical: false, ru: 'Путь замены поставщика понятен: сроки, стоимость, зависимости и необходимые изменения оценены?', en: 'Is the replacement path understood, including time, cost, dependencies, and required changes?' },
    { id: 'l4', category: 'lockin', critical: false, ru: 'Критичные интеграции не завязаны на закрытые механизмы, которые невозможно воспроизвести у другого поставщика?', en: 'Do critical integrations avoid proprietary mechanisms that would be impractical to reproduce with another vendor?' },

    { id: 'o1', category: 'operations', critical: false, ru: 'Есть понятный support-процесс, уровни приоритета и рабочий канал срочной эскалации?', en: 'Is there a clear support process, priority model, and working urgent escalation channel?' },
    { id: 'o2', category: 'operations', critical: false, ru: 'Поставщик заранее уведомляет о breaking changes, deprecations и существенных изменениях API?', en: 'Does the vendor give advance notice of breaking changes, deprecations, and material API changes?' },
    { id: 'o3', category: 'operations', critical: false, ru: 'Есть достаточные логи, audit trail, мониторинг или API для контроля использования сервиса?', en: 'Are logs, audit trails, monitoring, or APIs sufficient to oversee use of the service?' },
    { id: 'o4', category: 'operations', critical: false, ru: 'Внутри компании назначен владелец интеграции и понятна операционная нагрузка на команду?', en: 'Is there an internal owner for the integration and a clear view of the operational load on the team?' },

    { id: 'c1', category: 'commercial', critical: false, ru: 'Модель ценообразования понятна, а основные драйверы роста стоимости предсказуемы?', en: 'Is pricing understandable, with the main cost-growth drivers predictable?' },
    { id: 'c2', category: 'commercial', critical: false, ru: 'Условия продления, расторжения, повышения цены и notice periods не создают неожиданной ловушки?', en: 'Do renewal, termination, price increase, and notice-period terms avoid an unexpected trap?' },
    { id: 'c3', category: 'commercial', critical: true, ru: 'В договоре достаточно ясно описаны ответственность, security-обязательства и последствия серьёзного нарушения?', en: 'Does the contract clearly cover liability, security obligations, and consequences of a serious breach?' },
    { id: 'c4', category: 'commercial', critical: false, ru: 'Нет явных признаков, что поставщик финансово или организационно нестабилен для критичного долгосрочного использования?', en: 'Are there no obvious signs that the vendor is financially or organizationally unstable for critical long-term use?' }
  ];

  const labels = {
    choose: t('Выберите', 'Choose'),
    yes: t('Да', 'Yes'),
    partial: t('Частично', 'Partly'),
    no: t('Нет / неизвестно', 'No / unknown'),
    critical: t('Критично', 'Critical'),
    noAnswers: t('Нет ответов', 'No answers'),
    copied: t('Скопировано', 'Copied'),
    copyFailed: t('Не удалось скопировать', 'Could not copy'),
    noFlags: t('Явных критических red flags пока не отмечено.', 'No explicit critical red flags have been marked yet.')
  };

  const questionsRoot = root.querySelector('[data-vendor-risk-questions]');
  const vendorName = root.querySelector('#vendor-name');
  const scoreEl = document.querySelector('[data-vendor-risk-score]');
  const statusEl = document.querySelector('[data-vendor-risk-status]');
  const progressEl = document.querySelector('[data-vendor-risk-progress]');
  const dependencyEl = document.querySelector('[data-vendor-dependency]');
  const redFlagCountEl = document.querySelector('[data-vendor-red-flag-count]');
  const categoryScoresEl = document.querySelector('[data-vendor-risk-categories]');
  const flagsEl = document.querySelector('[data-vendor-risk-flags]');
  const summaryEl = document.querySelector('[data-vendor-risk-summary]');
  const copyButton = document.querySelector('[data-vendor-risk-copy]');
  const copyStatus = document.querySelector('[data-vendor-risk-copy-status]');

  const renderQuestions = () => {
    categories.forEach((category, index) => {
      const section = document.createElement('section');
      section.className = 'vendor-risk-category';
      section.innerHTML = `
        <div class="vendor-risk-category-heading">
          <span class="vendor-risk-category-index">${String(index + 1).padStart(2, '0')}</span>
          <h3>${isRu ? category.ru : category.en}</h3>
        </div>
        <div class="vendor-risk-question-list"></div>`;
      const list = section.querySelector('.vendor-risk-question-list');
      questions.filter((q) => q.category === category.id).forEach((q) => {
        const row = document.createElement('div');
        row.className = 'vendor-risk-question';
        row.innerHTML = `
          <div class="vendor-risk-question-copy">
            <label for="vendor-${q.id}">${isRu ? q.ru : q.en}</label>
            ${q.critical ? `<span class="vendor-risk-critical-badge">${labels.critical}</span>` : ''}
          </div>
          <select id="vendor-${q.id}" data-vendor-risk-question data-id="${q.id}" data-category="${q.category}" data-critical="${q.critical ? 'true' : 'false'}">
            <option value="">${labels.choose}</option>
            <option value="0">${labels.yes}</option>
            <option value="1">${labels.partial}</option>
            <option value="2">${labels.no}</option>
          </select>`;
        list.appendChild(row);
      });
      questionsRoot.appendChild(section);
    });
  };

  const riskStatus = (score) => {
    if (score <= 20) return t('Низкий риск', 'Low risk');
    if (score <= 40) return t('Умеренный риск', 'Moderate risk');
    if (score <= 65) return t('Повышенный риск', 'Elevated risk');
    return t('Высокий риск', 'High risk');
  };

  const dependencyStatus = (score) => {
    if (score === null) return '—';
    if (score <= 25) return t('Низкая', 'Low');
    if (score <= 55) return t('Средняя', 'Medium');
    return t('Высокая', 'High');
  };

  const calculate = () => {
    const selects = [...root.querySelectorAll('[data-vendor-risk-question]')];
    const answered = selects.filter((select) => select.value !== '');
    const earned = answered.reduce((sum, select) => sum + Number(select.value), 0);
    const max = answered.length * 2;
    const score = max ? Math.round((earned / max) * 100) : null;

    scoreEl.textContent = score === null ? '—' : `${score}/100`;
    statusEl.textContent = score === null ? labels.noAnswers : riskStatus(score);
    progressEl.textContent = t(
      `Отвечено ${answered.length} из ${questions.length}. До завершения оценка предварительная.`,
      `${answered.length} of ${questions.length} answered. The assessment is preliminary until complete.`
    );

    const categoryResults = categories.map((category) => {
      const selected = answered.filter((select) => select.dataset.category === category.id);
      const points = selected.reduce((sum, select) => sum + Number(select.value), 0);
      const categoryScore = selected.length ? Math.round((points / (selected.length * 2)) * 100) : null;
      return { ...category, score: categoryScore };
    });

    categoryScoresEl.innerHTML = categoryResults.map((category) => `
      <div class="vendor-risk-category-score">
        <div class="vendor-risk-category-score-head"><span>${isRu ? category.ru : category.en}</span><strong>${category.score === null ? '—' : `${category.score}%`}</strong></div>
        <div class="vendor-risk-track"><span style="width:${category.score === null ? 0 : category.score}%"></span></div>
      </div>`).join('');

    const lockin = categoryResults.find((category) => category.id === 'lockin');
    dependencyEl.textContent = dependencyStatus(lockin.score);

    const criticalFlags = answered.filter((select) => select.dataset.critical === 'true' && select.value === '2');
    redFlagCountEl.textContent = String(criticalFlags.length);
    flagsEl.innerHTML = criticalFlags.length
      ? criticalFlags.map((select) => {
          const q = questions.find((item) => item.id === select.dataset.id);
          return `<li>${isRu ? q.ru : q.en}</li>`;
        }).join('')
      : `<li>${labels.noFlags}</li>`;

    const scoredCategories = categoryResults.filter((category) => category.score !== null).sort((a, b) => b.score - a.score);
    const topRisks = scoredCategories.slice(0, 2).map((category) => isRu ? category.ru : category.en);
    const name = vendorName.value.trim() || t('Поставщик', 'Vendor');

    if (score === null) {
      summaryEl.textContent = t('Заполните хотя бы несколько вопросов — здесь появится готовое резюме риска поставщика.', 'Answer at least a few questions and a ready-to-share vendor risk summary will appear here.');
      return;
    }

    const completion = answered.length === questions.length
      ? t('оценка заполнена полностью', 'the assessment is complete')
      : t(`оценка предварительная: отвечено ${answered.length} из ${questions.length}`, `the assessment is preliminary: ${answered.length} of ${questions.length} answered`);
    const topRiskText = topRisks.length ? topRisks.join(t(' и ', ' and ')) : t('пока не определены', 'not identified yet');
    const flagText = criticalFlags.length
      ? t(`${criticalFlags.length} критических red flags`, `${criticalFlags.length} critical red flag${criticalFlags.length === 1 ? '' : 's'}`)
      : t('критических red flags не отмечено', 'no critical red flags are marked');

    summaryEl.textContent = isRu
      ? `${name}: риск поставщика ${score}/100 — ${riskStatus(score).toLowerCase()}. Зависимость от поставщика: ${dependencyStatus(lockin.score).toLowerCase()}. Наиболее рискованные зоны: ${topRiskText}. Отмечено: ${flagText}. ${completion}. Перед решением стоит отдельно проверить договор, security-доказательства, continuity и реальный план выхода из зависимости.`
      : `${name}: vendor risk is ${score}/100 — ${riskStatus(score).toLowerCase()}. Vendor dependency: ${dependencyStatus(lockin.score).toLowerCase()}. Highest-risk areas: ${topRiskText}. Marked: ${flagText}. ${completion}. Before a decision, validate the contract, security evidence, continuity, and the practical exit path from the dependency.`;
  };

  const copySummary = async () => {
    const text = summaryEl.textContent.trim();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      copyStatus.textContent = labels.copied;
    } catch (error) {
      const area = document.createElement('textarea');
      area.value = text;
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand('copy');
      area.remove();
      copyStatus.textContent = ok ? labels.copied : labels.copyFailed;
    }
    window.setTimeout(() => { copyStatus.textContent = ''; }, 1800);
  };

  renderQuestions();
  root.addEventListener('change', calculate);
  vendorName.addEventListener('input', calculate);
  copyButton.addEventListener('click', copySummary);
  calculate();
})();
