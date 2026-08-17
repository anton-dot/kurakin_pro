(() => {
  const root = document.querySelector('[data-dd-assessment]');
  if (!root) return;

  const isRu = document.documentElement.lang === 'ru';
  const categories = [
    { id: 'architecture', ru: 'Архитектура и продукт', en: 'Architecture & product' },
    { id: 'reliability', ru: 'Надёжность и эксплуатация', en: 'Reliability & operations' },
    { id: 'security', ru: 'Безопасность и доступы', en: 'Security & access' },
    { id: 'delivery', ru: 'Разработка и поставка', en: 'Delivery & quality' },
    { id: 'people', ru: 'Команда и знания', en: 'People & knowledge' },
    { id: 'data', ru: 'Данные и зависимости', en: 'Data & dependencies' }
  ];

  const questions = [
    { id: 'a1', category: 'architecture', critical: false, ru: 'Границы ключевых систем и ответственность за них понятны?', en: 'Are the boundaries and ownership of key systems clear?' },
    { id: 'a2', category: 'architecture', critical: false, ru: 'Основные зависимости и интеграции документированы и актуальны?', en: 'Are major dependencies and integrations documented and current?' },
    { id: 'a3', category: 'architecture', critical: false, ru: 'Ключевые архитектурные решения и причины выбора фиксируются?', en: 'Are key architecture decisions and their rationale recorded?' },
    { id: 'a4', category: 'architecture', critical: false, ru: 'Большинство изменений можно делать без каскадных правок во многих системах?', en: 'Can most changes be delivered without cascading changes across many systems?' },
    { id: 'a5', category: 'architecture', critical: false, ru: 'Текущая архитектура поддерживает продуктовый roadmap на ближайший горизонт?', en: 'Does the current architecture support the near-term product roadmap?' },

    { id: 'r1', category: 'reliability', critical: false, ru: 'Критичные сервисы имеют рабочий мониторинг и понятные алерты?', en: 'Do critical services have effective monitoring and actionable alerts?' },
    { id: 'r2', category: 'reliability', critical: false, ru: 'Для критичных сервисов определены SLO/SLA или другие измеримые ожидания по доступности?', en: 'Do critical services have SLOs, SLAs, or other measurable reliability targets?' },
    { id: 'r3', category: 'reliability', critical: true, ru: 'Резервные копии регулярно проверяются реальным восстановлением?', en: 'Are backups regularly validated through actual restore tests?' },
    { id: 'r4', category: 'reliability', critical: true, ru: 'RTO/RPO определены, а сценарий disaster recovery хотя бы периодически проверяется?', en: 'Are RTO/RPO defined and disaster recovery exercised periodically?' },
    { id: 'r5', category: 'reliability', critical: false, ru: 'После серьёзных инцидентов есть postmortem и контролируемые action items?', en: 'Do major incidents lead to postmortems and tracked action items?' },

    { id: 's1', category: 'security', critical: true, ru: 'Для привилегированных и административных доступов используется MFA?', en: 'Is MFA enforced for privileged and administrative access?' },
    { id: 's2', category: 'security', critical: false, ru: 'Доступы выдаются по принципу least privilege и периодически пересматриваются?', en: 'Are permissions based on least privilege and reviewed periodically?' },
    { id: 's3', category: 'security', critical: true, ru: 'Секреты и ключи хранятся в специализированном хранилище, а не в коде и документах?', en: 'Are secrets and keys stored in a dedicated secrets system rather than code or documents?' },
    { id: 's4', category: 'security', critical: false, ru: 'Есть регулярный процесс обновления зависимостей, устранения уязвимостей и патчей?', en: 'Is there a regular process for dependency updates, vulnerability remediation, and patching?' },
    { id: 's5', category: 'security', critical: true, ru: 'Production-доступ ограничен, журналируется и может быть проверен?', en: 'Is production access restricted, logged, and auditable?' },

    { id: 'd1', category: 'delivery', critical: false, ru: 'Сборка и основные проверки запускаются автоматически через CI?', en: 'Are builds and core checks automated through CI?' },
    { id: 'd2', category: 'delivery', critical: false, ru: 'Деплой повторяемый, а rollback или безопасное восстановление релиза отработаны?', en: 'Are deployments repeatable, with a tested rollback or safe recovery path?' },
    { id: 'd3', category: 'delivery', critical: false, ru: 'Критичные пользовательские и бизнес-сценарии покрыты автоматическими тестами?', en: 'Are critical user and business flows covered by automated tests?' },
    { id: 'd4', category: 'delivery', critical: false, ru: 'Релизы проходят предсказуемо и не зависят от постоянных ручных heroics?', en: 'Are releases predictable rather than dependent on recurring manual heroics?' },
    { id: 'd5', category: 'delivery', critical: false, ru: 'Конфигурация окружений и инфраструктуры управляется воспроизводимым способом?', en: 'Are environments and infrastructure configuration managed reproducibly?' },

    { id: 'p1', category: 'people', critical: true, ru: 'Для каждого критичного компонента есть минимум два человека, способных его поддерживать?', en: 'Does every critical component have at least two people capable of supporting it?' },
    { id: 'p2', category: 'people', critical: false, ru: 'За ключевые системы, сервисы и технические решения явно назначены владельцы?', en: 'Are owners clearly assigned for key systems, services, and technical decisions?' },
    { id: 'p3', category: 'people', critical: false, ru: 'Документации достаточно, чтобы новый инженер мог начать работу без устной передачи всего контекста?', en: 'Is documentation sufficient for a new engineer to start without relying on oral knowledge transfer?' },
    { id: 'p4', category: 'people', critical: false, ru: 'On-call и операционная нагрузка распределены устойчиво, без постоянной зависимости от нескольких людей?', en: 'Is on-call and operational load distributed sustainably rather than concentrated on a few people?' },
    { id: 'p5', category: 'people', critical: false, ru: 'Уход одного ключевого сотрудника не остановит развитие или эксплуатацию продукта?', en: 'Would the departure of one key employee avoid stopping product development or operations?' },

    { id: 'dt1', category: 'data', critical: false, ru: 'Критичные наборы данных имеют понятных владельцев и назначение?', en: 'Do critical datasets have clear owners and defined purpose?' },
    { id: 'dt2', category: 'data', critical: false, ru: 'Правила хранения, удаления и жизненного цикла данных определены и выполняются?', en: 'Are data retention, deletion, and lifecycle rules defined and implemented?' },
    { id: 'dt3', category: 'data', critical: true, ru: 'Доступ к чувствительным или клиентским данным ограничен и может быть проверен по журналам?', en: 'Is access to sensitive or customer data restricted and auditable?' },
    { id: 'dt4', category: 'data', critical: false, ru: 'Изменения схем и миграции данных выполняются контролируемо и с понятным путём восстановления?', en: 'Are schema changes and data migrations controlled with a clear recovery path?' },
    { id: 'dt5', category: 'data', critical: false, ru: 'Критичные внешние сервисы, библиотеки и поставщики учтены, а риск зависимости от них понятен?', en: 'Are critical external services, libraries, and vendors inventoried with dependency risk understood?' }
  ];

  const t = (ru, en) => isRu ? ru : en;
  const questionsRoot = root.querySelector('[data-dd-questions]');
  const scoreEl = document.querySelector('[data-dd-score]');
  const statusEl = document.querySelector('[data-dd-status]');
  const progressEl = document.querySelector('[data-dd-progress]');
  const categoriesEl = document.querySelector('[data-dd-category-scores]');
  const criticalEl = document.querySelector('[data-dd-critical]');
  const summaryEl = document.querySelector('[data-dd-summary]');
  const copyButton = document.querySelector('[data-dd-copy]');
  const copyStatus = document.querySelector('[data-dd-copy-status]');

  const labels = {
    choose: t('Выберите', 'Choose'),
    yes: t('Да', 'Yes'),
    partial: t('Частично', 'Partly'),
    no: t('Нет / неизвестно', 'No / unknown'),
    critical: t('Критично', 'Critical'),
    unanswered: t('Нет ответов', 'No answers'),
    noCritical: t('Явных критических провалов пока не отмечено.', 'No explicit critical gaps have been marked yet.'),
    copied: t('Скопировано', 'Copied'),
    copyFailed: t('Не удалось скопировать', 'Could not copy')
  };

  const renderQuestions = () => {
    categories.forEach((category, categoryIndex) => {
      const section = document.createElement('section');
      section.className = 'dd-category';
      const categoryQuestions = questions.filter((question) => question.category === category.id);
      section.innerHTML = `
        <div class="dd-category-heading">
          <span class="dd-category-index">${String(categoryIndex + 1).padStart(2, '0')}</span>
          <h3>${isRu ? category.ru : category.en}</h3>
        </div>
        <div class="dd-question-list"></div>
      `;
      const list = section.querySelector('.dd-question-list');
      categoryQuestions.forEach((question) => {
        const row = document.createElement('div');
        row.className = 'dd-question';
        row.innerHTML = `
          <div class="dd-question-copy">
            <label for="dd-${question.id}">${isRu ? question.ru : question.en}</label>
            ${question.critical ? `<span class="dd-critical-badge">${labels.critical}</span>` : ''}
          </div>
          <select id="dd-${question.id}" data-dd-question data-id="${question.id}" data-category="${question.category}" data-critical="${question.critical ? 'true' : 'false'}">
            <option value="">${labels.choose}</option>
            <option value="2">${labels.yes}</option>
            <option value="1">${labels.partial}</option>
            <option value="0">${labels.no}</option>
          </select>
        `;
        list.appendChild(row);
      });
      questionsRoot.appendChild(section);
    });
  };

  const statusFor = (score) => {
    if (score >= 85) return t('Сильная техническая база', 'Strong technical foundation');
    if (score >= 70) return t('Управляемые риски', 'Manageable risks');
    if (score >= 50) return t('Существенные пробелы', 'Material gaps');
    return t('Высокий технический риск', 'High technical risk');
  };

  const calculate = () => {
    const selects = [...root.querySelectorAll('[data-dd-question]')];
    const answered = selects.filter((select) => select.value !== '');
    const earned = answered.reduce((sum, select) => sum + Number(select.value), 0);
    const max = answered.length * 2;
    const score = max > 0 ? Math.round((earned / max) * 100) : 0;

    scoreEl.textContent = answered.length ? `${score}/100` : '—';
    statusEl.textContent = answered.length ? statusFor(score) : labels.unanswered;
    progressEl.textContent = t(
      `Отвечено ${answered.length} из ${questions.length}. До завершения оценка предварительная.`,
      `${answered.length} of ${questions.length} answered. The score is preliminary until complete.`
    );

    const categoryResults = categories.map((category) => {
      const categorySelects = answered.filter((select) => select.dataset.category === category.id);
      const categoryEarned = categorySelects.reduce((sum, select) => sum + Number(select.value), 0);
      const categoryMax = categorySelects.length * 2;
      return {
        ...category,
        answered: categorySelects.length,
        score: categoryMax ? Math.round((categoryEarned / categoryMax) * 100) : null
      };
    });

    categoriesEl.innerHTML = categoryResults.map((category) => `
      <div class="dd-category-score">
        <div class="dd-category-score-head"><span>${isRu ? category.ru : category.en}</span><strong>${category.score === null ? '—' : `${category.score}%`}</strong></div>
        <div class="dd-score-track"><span style="width:${category.score === null ? 0 : category.score}%"></span></div>
      </div>
    `).join('');

    const criticalGaps = answered.filter((select) => select.dataset.critical === 'true' && select.value === '0');
    if (criticalGaps.length) {
      criticalEl.innerHTML = criticalGaps.map((select) => {
        const question = questions.find((item) => item.id === select.dataset.id);
        return `<li>${isRu ? question.ru : question.en}</li>`;
      }).join('');
    } else {
      criticalEl.innerHTML = `<li>${labels.noCritical}</li>`;
    }

    const scoredCategories = categoryResults.filter((category) => category.score !== null).sort((a, b) => a.score - b.score);
    const weakest = scoredCategories.slice(0, 2).map((category) => isRu ? category.ru : category.en);
    const weakestText = weakest.length ? weakest.join(t(' и ', ' and ')) : t('пока не определены', 'not identified yet');

    const criticalText = criticalGaps.length
      ? t(`${criticalGaps.length} критических провалов`, `${criticalGaps.length} critical gap${criticalGaps.length === 1 ? '' : 's'}`)
      : t('критических провалов не отмечено', 'no critical gaps marked');

    const summary = answered.length
      ? t(
          `Предварительная техническая оценка: ${score}/100 на основе ${answered.length} из ${questions.length} вопросов. Статус: ${statusFor(score)}. Самые слабые зоны: ${weakestText}. Отдельно: ${criticalText}. Это экспресс-оценка для приоритизации дальнейшего due diligence, а не замена полноценному техническому аудиту.`,
          `Preliminary technical assessment: ${score}/100 based on ${answered.length} of ${questions.length} questions. Status: ${statusFor(score)}. Weakest areas: ${weakestText}. Separately, ${criticalText}. This is a lightweight prioritization tool for further due diligence, not a substitute for a full technical audit.`
        )
      : t('Ответьте хотя бы на несколько вопросов, чтобы получить готовое резюме.', 'Answer a few questions to generate a shareable summary.');

    summaryEl.textContent = summary;
  };

  const copySummary = async () => {
    const text = summaryEl.textContent.trim();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      copyStatus.textContent = labels.copied;
    } catch (error) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
        copyStatus.textContent = labels.copied;
      } catch (fallbackError) {
        copyStatus.textContent = labels.copyFailed;
      }
    }
    window.setTimeout(() => { copyStatus.textContent = ''; }, 2200);
  };

  renderQuestions();
  root.addEventListener('change', calculate);
  copyButton.addEventListener('click', copySummary);
  calculate();
})();
