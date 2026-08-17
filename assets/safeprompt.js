(() => {
  const root = document.querySelector('[data-sp-tool]');
  if (!root) return;

  const lang = document.documentElement.lang === 'ru' ? 'ru' : 'en';
  const input = root.querySelector('[data-sp-input]');
  const output = root.querySelector('[data-sp-output]');
  const findingsEl = root.querySelector('[data-sp-findings]');
  const riskEl = root.querySelector('[data-sp-risk]');
  const countEl = root.querySelector('[data-sp-count]');
  const copyBtn = root.querySelector('[data-sp-copy]');
  const clearBtn = root.querySelector('[data-sp-clear]');
  const copyStatus = root.querySelector('[data-sp-copy-status]');

  const t = {
    ru: {
      none: 'Сигналов не найдено', low: 'Низкий риск', medium: 'Средний риск', high: 'Высокий риск',
      count: n => `${n} ${pluralRu(n, 'совпадение', 'совпадения', 'совпадений')}`,
      empty: 'В тексте пока нет распознанных потенциально чувствительных данных.',
      copied: 'Redacted-текст скопирован.', copyFail: 'Не удалось скопировать.',
      labels: { privateKey:'Private key', token:'API key / token', credential:'Credential', dbUrl:'DB URL с паролем', jwt:'JWT / bearer token', email:'Email', phone:'Телефон', card:'Платёжная карта', ipv4:'IP-адрес' }
    },
    en: {
      none: 'No signals found', low: 'Low risk', medium: 'Medium risk', high: 'High risk',
      count: n => `${n} ${n === 1 ? 'match' : 'matches'}`,
      empty: 'No recognized potentially sensitive data in the text yet.',
      copied: 'Redacted text copied.', copyFail: 'Could not copy.',
      labels: { privateKey:'Private key', token:'API key / token', credential:'Credential', dbUrl:'DB URL with password', jwt:'JWT / bearer token', email:'Email', phone:'Phone number', card:'Payment card', ipv4:'IP address' }
    }
  }[lang];

  const rules = [
    { type:'privateKey', severity:4, re:/-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----[\s\S]*?-----END (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/g },
    { type:'dbUrl', severity:4, re:/\b(?:postgres(?:ql)?|mysql|mongodb(?:\+srv)?|redis):\/\/[^@\s:]+:[^@\s]+@[^\s]+/gi },
    { type:'token', severity:4, re:/\b(?:sk-[A-Za-z0-9_-]{20,}|(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}|(?:AKIA|ASIA)[A-Z0-9]{16})\b/g },
    { type:'jwt', severity:4, re:/\b(?:Bearer\s+)?eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\b/gi },
    { type:'credential', severity:4, re:/\b(?:api[_-]?key|secret|token|password|passwd|pwd|client[_-]?secret)\s*[:=]\s*["']?[^\s"',;]{8,}["']?/gi },
    { type:'email', severity:2, re:/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi },
    { type:'ipv4', severity:1, re:/\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/g },
    { type:'phone', severity:2, re:/(?:\+?\d[\d\s().-]{8,}\d)/g, validate:value => { const digits=value.replace(/\D/g,''); return digits.length >= 10 && digits.length <= 15; } },
    { type:'card', severity:3, re:/\b(?:\d[ -]*?){13,19}\b/g, validate:value => luhn(value.replace(/\D/g,'')) }
  ];

  function pluralRu(n, one, few, many) {
    const mod10 = n % 10, mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return one;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return few;
    return many;
  }

  function luhn(digits) {
    if (!/^\d{13,19}$/.test(digits)) return false;
    let sum = 0, alt = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let n = Number(digits[i]);
      if (alt) { n *= 2; if (n > 9) n -= 9; }
      sum += n; alt = !alt;
    }
    return sum % 10 === 0;
  }

  function scan(text) {
    const all = [];
    rules.forEach(rule => {
      const re = new RegExp(rule.re.source, rule.re.flags);
      let match;
      while ((match = re.exec(text))) {
        const value = match[0];
        if (value.includes('[REDACTED:')) continue;
        if (rule.validate && !rule.validate(value)) continue;
        all.push({ start:match.index, end:match.index + value.length, value, type:rule.type, severity:rule.severity });
        if (match.index === re.lastIndex) re.lastIndex++;
      }
    });

    all.sort((a,b) => a.start - b.start || b.severity - a.severity || (b.end-b.start) - (a.end-a.start));
    const selected = [];
    for (const item of all) {
      const overlaps = selected.some(existing => item.start < existing.end && item.end > existing.start);
      if (!overlaps) selected.push(item);
    }
    return selected.sort((a,b) => a.start - b.start);
  }

  function mask(value) {
    const clean = value.replace(/\s+/g, ' ');
    if (clean.length <= 10) return '••••••';
    return `${clean.slice(0,4)}…${clean.slice(-4)}`;
  }

  function redact(text, findings) {
    let cursor = 0, result = '';
    findings.forEach(item => {
      result += text.slice(cursor, item.start);
      result += `[REDACTED:${item.type.toUpperCase()}]`;
      cursor = item.end;
    });
    return result + text.slice(cursor);
  }

  function risk(findings) {
    const score = findings.reduce((sum,item) => sum + item.severity, 0);
    if (!score) return ['none', t.none];
    if (score <= 2) return ['low', t.low];
    if (score <= 6) return ['medium', t.medium];
    return ['high', t.high];
  }

  function render() {
    const text = input.value;
    const findings = scan(text);
    const [riskClass, riskLabel] = risk(findings);
    riskEl.textContent = riskLabel;
    riskEl.dataset.level = riskClass;
    countEl.textContent = t.count(findings.length);
    output.value = redact(text, findings);

    if (!findings.length) {
      findingsEl.innerHTML = `<p class="sp-empty">${t.empty}</p>`;
      return;
    }

    findingsEl.innerHTML = findings.map(item => `<div class="sp-finding"><strong>${escapeHtml(t.labels[item.type])}</strong><small>${escapeHtml(mask(item.value))}</small></div>`).join('');
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  }

  async function copyText() {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(output.value);
      else {
        output.focus(); output.select();
        if (!document.execCommand('copy')) throw new Error('copy failed');
      }
      copyStatus.textContent = t.copied;
    } catch (_) { copyStatus.textContent = t.copyFail; }
    setTimeout(() => { copyStatus.textContent = ''; }, 2200);
  }

  input.addEventListener('input', render);
  copyBtn.addEventListener('click', copyText);
  clearBtn.addEventListener('click', () => { input.value = ''; render(); input.focus(); });
  render();
})();