(() => {
  const root = document.querySelector('[data-ar-assessment]');
  if (!root) return;

  const isRu = document.documentElement.lang === 'ru';
  const t = (ru, en) => isRu ? ru : en;

  const categories = [
    { id: 'boundaries', ru: 'Границы и ответственность', en: 'Boundaries & ownership' },
    { id: 'reliability', ru: 'Надёжность и масштабирование', en: 'Reliability & scaling' },
    { id: 'data', ru: 'Данные и интеграции', en: 'Data & integrations' },
    { id: 'security', ru: 'Безопасность', en: 'Security' },
    { id: 'operations', ru: 'Эксплуатация и поставка', en: 'Operations & delivery' },
    { id: 'evolution', ru: 'Стоимость изменений', en: 'Cost of change' }
  ];

  const questions = [
    { id: 'b1', category: 'boundaries', critical: false, ru: 'Границы компонентов и систем отражают реальные бизнес-возможности, а не случайную историю разработки?', en: 'Do component and system boundaries reflect real business capabilities rather than development history?' },
    { id: 'b2', category: 'boundaries', critical: false, ru: 'Для каждого ключевого компонента понятны ответственность, владелец и публичные интерфейсы?', en: 'Does every key component have clear responsibility, ownership, and public interfaces?' },
    { id: 'b3', category: 'boundaries', critical: true, ru: 'Изменение одного бизнес-сценария обычно не требует синхронных правок во множестве несвязанных компонентов?', en: 'Can a business flow usually change without synchronized edits across many unrelated components?' },
    { id: 'b4', category: 'boundaries', critical: false, ru: 'Ключевые архитектурные решения и компромиссы зафиксированы и понятны команде?', en: 'Are key architecture decisions and tradeoffs recorded and understood by the team?' },

    { id: 'r1', category: 'reliability', critical: true, ru: 'Для критичных путей нет очевидной единственной точки отказа без понятного fallback?', en: 'Are critical paths free of obvious single points of failure without a clear fallback?' },
    { id: 'r2', category: 'reliability', critical: false, ru: 'Архитектура выдерживает ожидаемый рост нагрузки без полной переработки системы?', en: 'Can the architecture handle expected load growth without a full redesign?' },
    { id: 'r3', category: 'reliability', critical: false, ru: 'Отказы внешних сервисов и зависимостей изолируются через timeouts, retries, limits или degradation?', en: 'Are external dependency failures isolated with timeouts, retries, limits, or graceful degradation?' },
    { id: 'r4', category: 'reliability', critical: false, ru: 'Для критичных компонентов определены измеримые ожидания по latency, availability или capacity?', en: 'Do critical components have measurable expectations for latency, availability, or capacity?' },

    { id: 'd1', category: 'data', critical: true, ru: 'У критичных данных есть один понятный источник истины, а дублирование контролируется?', en: 'Do critical data domains have a clear source of truth with controlled duplication?' },
    { id: 'd2', category: 'data', critical: false, ru: 'Контракты API, событий и интеграций версионируются или изменяются совместимо?', en: 'Are API, event, and integration contracts versioned or evolved compatibly?' },
    { id: 'd3', category: 'data', critical: false, ru: 'Миграции схем и данных можно проводить поэтапно без опасного big-bang релиза?', en: 'Can schema and data migrations be rolled out incrementally without a risky big-bang release?' },
    { id: 'd4', category: 'data', critical: false, ru: 'Критичные интеграции наблюдаемы: можно понять, где потерялся запрос, событие или данные?', en: 'Are critical integrations observable enough to trace lost requests, events, or data?' },

    { id: 's1', category: 'security', critical: true, ru: 'Trust boundaries и зоны чувствительных данных явно определены в архитектуре?', en: 'Are trust boundaries and sensitive-data zones explicit in the architecture?' },
    { id: 's2', category: 'security', critical: false, ru: 'Аутентификация и авторизация централизованы или реализованы последовательно, без множества самодельных вариантов?', en: 'Are authentication and authorization centralized or consistently implemented rather than reinvented per component?' },
    { id: 's3', category: 'security', critical: true, ru: 'Секреты, ключи и privileged credentials не являются частью кода, образов или обычных конфигурационных файлов?', en: 'Are secrets, keys, and privileged credentials kept out of code, images, and ordinary configuration files?' },
    { id: 's4', category: 'security', critical: false, ru: 'Архитектура позволяет ограничивать blast radius при компрометации одного компонента?', en: 'Does the architecture limit blast radius if one component is compromised?' },

    { id: 'o1', category: 'operations', critical: false, ru: 'Ключевые технические и бизнес-потоки можно наблюдать через метрики, логи и трассировку?', en: 'Can key technical and business flows be observed through metrics, logs, and tracing?' },
    { id: 'o2', category: 'operations', critical: true, ru: 'Деплой и rollback критичных компонентов можно выполнять независимо и воспроизводимо?', en: 'Can critical components be deployed and rolled back independently and reproducibly?' },
    { id: 'o3', category: 'operations', critical: false, ru: 'Окружения и инфраструктура воспроизводимы, а production не держится на ручной настройке нескольких людей?', en: 'Are environments and infrastructure reproducible rather than dependent on manual configuration by a few people?' },
    { id: 'o4', category: 'operations', critical: false, ru: 'Архитектура помогает локализовать причину инцидента, а не превращает диагностику в поиск по всей системе?', en: 'Does the architecture help localize incident causes rather than requiring system-wide investigation?' },

    { id: 'e1', category: 'evolution', critical: true, ru: 'Типичное продуктовое изменение можно доставить без непропорционально большого объёма технической работы?', en: 'Can a typical product change be delivered without disproportionate technical effort?' },
    { id: 'e2', category: 'evolution', critical: false, ru: 'Можно заменить ключевую внешнюю зависимость или технологию без переписывания большей части продукта?', en: 'Can a key external dependency or technology be replaced without rewriting most of the product?' },
    { id: 'e3', category: 'evolution', critical: false, ru: 'Архитектура не требует постоянной инфраструктурной сложности, которая заметно превышает масштаб продукта?', en: 'Does the architecture avoid operational complexity that materially exceeds the scale of the product?' },
    { id: 'e4', category: 'evolution', critical: false, ru: 'Есть понятный список архитектурных рисков и решений, которые стоит пересмотреть при следующем этапе роста?', en: 'Is there a clear list of architecture risks and decisions to revisit at the next growth stage?' }
  ];

  const systemInput = root.querySelector('[data-ar-system-name]');
  const questionsRoot = root.querySelector('[data-ar-questions]');
  const scoreEl = document.querySelector('[data-ar-score]');
  const statusEl = document.querySelector('[data-ar-status]');
  const progressEl = document.querySelector('[data-ar-progress]');
  const categoriesEl = document.querySelector('[data-ar-category-scores]');
  const criticalEl = document.querySelector('[data-ar-critical]');
  const summaryEl = document.querySelector('[data-ar-summary]');
  const copyButton = document.querySelector('[data-ar-copy]');
  const copyStatus = document.querySelector('[data-ar-copy-status]');

  const labels = {
    choose: t('Выберите', 'Choose'),
    yes: t('Да', 'Yes'),
    partial: t('Частично', 'Partly'),
    no: t('Нет / неизвестно', 'No / unknown'),
    critical: t('Критично', 'Critical'),
    unanswered: t('Нет ответов', 'No answers'),
    noCritical: t('Явных критических архитектурных провалов пока не отмечено.', 'No explicit critical architecture gaps have been marked yet.'),
    copied: t('Скопировано', 'Copied'),
    copiedStatus: t('Текст скопирован.', 'Summary copied.'),
    copyFailed: t('Не удалось скопировать автоматически. Выделите текст и скопируйте вручную.', 'Could not copy automatically. Select the text and copy it manually.')
  };

  const renderQuestions = () => {
    categories.forEach((category, categoryIndex) => {
      const section = document.createElement('section');
      section.className = 'ar-category';
      section.innerHTML = `
        <div class="ar-category-heading">
          <span class="ar-category-index">${String(categoryIndex + 1).padStart(2, '0')}</span>
          <h3>${isRu ? category.ru : category.en}</h3>
        </div>
        <div class="ar-question-list"></div>
      `;
      const list = section.querySelector('.ar-question-list');
      questions.filter((question) => question.category === category.id).forEach((question) => {
        const row = document.createElement('div');
        row.className = 'ar-question';
        row.innerHTML = `
          <div class="ar-question-copy">
            <label for="ar-${question.id}">${isRu ? question.ru : question.en}</label>
            ${question.critical ? `<span class="ar-critical-badge">${labels.critical}</span>` : ''}
          </div>
          <select id="ar-${question.id}" data-ar-question data-id="${question.id}" data-category="${question.category}" data-critical="${question.critical ? 'true' : 'false'}">
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
    if (score >= 85) return t('Архитектура поддерживает изменения', 'Architecture supports change');
    if (score >= 70) return t('Есть управляемые компромиссы', 'Manageable tradeoffs');
    if (score >= 50) return t('Стоимость изменений уже растёт', 'Cost of change is rising');
    return t('Архитектура ограничивает продукт', 'Architecture constrains the product');
  };

  const calculate = () => {
    const selects = [...root.querySelectorAll('[data-ar-question]')];
    const answered = selects.filter((select) => select.value !== '');
    const earned = answered.reduce((sum, select) => sum + Number(select.value), 0);
    const score = answered.length ? Math.round((earned / (answered.length * 2)) * 100) : 0;
    const systemName = systemInput.value.trim();

    scoreEl.textContent = answered.length ? `${score}/100` : '—';
    statusEl.textContent = answered.length ? statusFor(score) : labels.unanswered;
    progressEl.textContent = t(
      `Отвечено ${answered.length} из ${questions.length}. До завершения оценка предварительная.`,
      `${answered.length} of ${questions.length} answered. The score is preliminary until complete.`
    );

    const categoryResults = categories.map((category) => {
      const categorySelects = answered.filter((select) => select.dataset.category === category.id);
      const categoryEarned = categorySelects.reduce((sum, select) => sum + Number(select.value), 0);
      return {
        ...category,
        score: categorySelects.length ? Math.round((categoryEarned / (categorySelects.length * 2)) * 100) : null
      };
    });

    categoriesEl.innerHTML = categoryResults.map((category) => `
      <div class="ar-category-score">
        <div class="ar-category-score-head"><span>${isRu ? category.ru : category.en}</span><strong>${category.score === null ? '—' : `${category.score}%`}</strong></div>
        <div class="ar-score-track"><span data-ar-bar="${category.score === null ? 0 : category.score}"></span></div>
      </div>
    `).join('');
    categoriesEl.querySelectorAll('[data-ar-bar]').forEach((bar) => {
      bar.style.width = `${bar.dataset.arBar}%`;
    });

    const criticalGaps = answered.filter((select) => select.dataset.critical === 'true' && select.value === '0');
    criticalEl.innerHTML = criticalGaps.length
      ? criticalGaps.map((select) => {
          const question = questions.find((item) => item.id === select.dataset.id);
          return `<li>${isRu ? question.ru : question.en}</li>`;
        }).join('')
      : `<li>${labels.noCritical}</li>`;

    if (!answered.length) {
      summaryEl.textContent = t('Ответьте хотя бы на один вопрос, чтобы получить summary.', 'Answer at least one question to generate a summary.');
      return;
    }

    const scored = categoryResults.filter((category) => category.score !== null).sort((a, b) => a.score - b.score);
    const weakest = scored.slice(0, 2).map((category) => isRu ? category.ru : category.en);
    const weakestText = weakest.join(t(' и ', ' and '));
    const prefix = systemName ? `${systemName}: ` : '';
    const completion = answered.length === questions.length
      ? t('Оценка заполнена полностью.', 'The review is complete.')
      : t(`Пока отвечено ${answered.length} из ${questions.length} вопросов, поэтому результат предварительный.`, `Only ${answered.length} of ${questions.length} questions are answered, so the result is preliminary.`);
    const gaps = criticalGaps.length
      ? t(`Отмечено ${criticalGaps.length} критических архитектурных провалов.`, `${criticalGaps.length} critical architecture gap${criticalGaps.length === 1 ? '' : 's'} marked.`)
      : t('Критических провалов по отмеченным ответам нет.', 'No critical gaps are marked in the current answers.');

    summaryEl.textContent = isRu
      ? `${prefix}architecture score ${score}/100 — ${statusFor(score).toLowerCase()}. Самые слабые зоны: ${weakestText}. ${gaps} ${completion} Следующий шаг — проверить слабые зоны на конкретных сценариях изменений, отказов и роста нагрузки, а не улучшать архитектуру ради самой архитектуры.`
      : `${prefix}architecture score ${score}/100 — ${statusFor(score).toLowerCase()}. Weakest areas: ${weakestText}. ${gaps} ${completion} The next step is to validate the weak areas against concrete change, failure, and growth scenarios rather than improving architecture for its own sake.`;
  };

  const copySummary = async () => {
    const text = summaryEl.textContent.trim();
    if (!text) return;
    const original = copyButton.textContent;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        area.remove();
      }
      copyButton.textContent = labels.copied;
      copyStatus.textContent = labels.copiedStatus;
      window.setTimeout(() => {
        copyButton.textContent = original;
        copyStatus.textContent = '';
      }, 1800);
    } catch (error) {
      copyStatus.textContent = labels.copyFailed;
    }
  };

  renderQuestions();
  root.addEventListener('change', calculate);
  systemInput.addEventListener('input', calculate);
  copyButton.addEventListener('click', copySummary);
  calculate();
})();
