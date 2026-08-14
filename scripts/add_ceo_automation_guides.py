from pathlib import Path
import json

DATE = '2026-08-14'
ARTICLES = {
    'ceo-automation-adoption': {
        'read': 7,
        'ru': {
            'title': 'Я CEO. Как мне внедрять автоматизацию в компании?',
            'desc': 'Практический подход для CEO: как выбирать процессы для автоматизации, начинать с бизнес-проблемы, ограничивать риск пилота и масштабировать только доказавшие ценность решения.',
            'summary': 'Автоматизация начинается не с AI, RPA или новой платформы. Она начинается с процесса, где ручная работа, ожидание, ошибки или зависимость от конкретных людей уже стоят бизнесу дороже, чем изменение этого процесса.',
            'body': '''
<h2>Автоматизация — это не ИТ-проект</h2>
<p>Если смотреть на автоматизацию как на внедрение технологии, компания очень быстро начинает обсуждать инструменты раньше проблемы. Какой AI выбрать? Нужна ли RPA-платформа? Стоит ли покупать новую BPM-систему? Нужна ли микросервисная архитектура?</p>
<p>Для CEO правильный первый вопрос другой: <strong>какой бизнес-процесс мы хотим изменить и что именно в нём сегодня слишком дорого?</strong></p>
<p>Это может быть время ожидания клиента, ручной перенос данных, количество ошибок, медленное согласование, зависимость от нескольких сотрудников или невозможность масштабировать процесс вместе с ростом бизнеса.</p>
<p>Технология появляется позже — как способ убрать конкретное ограничение.</p>

<h2>Не автоматизируйте плохой процесс</h2>
<p>Одна из самых дорогих ошибок — взять существующий процесс и просто заставить компьютер выполнять его быстрее.</p>
<p>Если в процессе семь согласований, три ручные сверки и два действия, которые существуют только потому, что системы не умеют разговаривать друг с другом, автоматизация может законсервировать все эти проблемы.</p>
<p>Перед автоматизацией стоит спросить: какие шаги действительно создают ценность, какие управляют реальным риском, а какие появились исторически и больше никому не нужны?</p>
<p>Иногда лучший результат автоматизации — сначала удалить половину процесса.</p>

<h2>Начните с одного измеримого ограничения</h2>
<p>Формулировка «нам нужно больше автоматизации» почти бесполезна. Намного лучше звучит: «мы хотим сократить время от заявки до решения», «убрать повторный ввод одних и тех же данных» или «не заставлять клиента ждать, пока две команды вручную синхронизируют системы».</p>
<p>Хорошая первая автоматизация имеет понятную точку старта, владельца процесса и критерий результата.</p>
<p>И главное — её можно остановить, если гипотеза не подтверждается.</p>

<h2>Выберите правильный тип автоматизации</h2>
<p>Разные проблемы требуют разных механизмов. Не каждую задачу нужно решать AI.</p>
<ul>
<li><strong>Если две системы постоянно обмениваются данными</strong> — сначала стоит посмотреть на API, <a href="webhooks-business.html">Webhooks</a>, <a href="api-composition-business.html">API Composition</a> и события.</li>
<li><strong>Если один бизнес-процесс проходит через несколько систем</strong> — полезно понимать <a href="event-driven-business.html">Event-Driven Architecture</a> и <a href="saga-pattern-business.html">Saga</a>.</li>
<li><strong>Если операция может повториться после сбоя</strong> — нужны <a href="idempotency-business.html">Idempotency</a>, <a href="outbox-pattern-business.html">Outbox</a> и <a href="transactional-inbox-business.html">Transactional Inbox</a>.</li>
<li><strong>Если автоматизация должна работать с внутренними знаниями</strong> — стоит начать с <a href="rag-business.html">RAG</a>, а не с идеи «обучить свою модель».</li>
<li><strong>Если AI должен не только отвечать, но и выполнять действия</strong> — это уже территория <a href="ai-agents-business.html">AI Agents</a>, <a href="human-in-loop-ai.html">Human-in-the-Loop</a> и <a href="ai-tool-permissions-business.html">AI Tool Permissions</a>.</li>
</ul>
<p>Архитектурное решение здесь следует за бизнес-задачей, а не наоборот.</p>

<h2>Не начинайте сразу с масштаба компании</h2>
<p>Фраза «автоматизируем всю компанию» звучит амбициозно, но почти не помогает управлять риском.</p>
<p>Намного полезнее последовательность: <strong>один процесс → одна проблема → ограниченный запуск → измеримый эффект → масштабирование.</strong></p>
<p>Для постепенного запуска особенно полезны <a href="feature-flags-business.html">Feature Flags</a> и <a href="canary-deployment-business.html">Canary Deployment</a>: новое поведение можно включать ограниченно, наблюдать за результатом и расширять только после подтверждения.</p>
<p>В автоматизации это важно не меньше, чем в обычном software-релизе. Ошибка автоматизации может быть технически незаметной, но создавать неправильные бизнес-действия.</p>

<h2>У каждой автоматизации должен быть бизнес-владелец</h2>
<p>Если после запуска процесс «принадлежит ИТ», это тревожный сигнал.</p>
<p>ИТ может владеть платформой, интеграцией и эксплуатацией. Но кто-то со стороны бизнеса должен отвечать за смысл процесса: что считается правильным результатом, где допустима автоматическая обработка, где нужен человек и что делать при исключении.</p>
<p>Это продолжает принцип <a href="service-ownership-business.html">Service Ownership</a>: технологическая граница должна иметь понятную ответственность. Для автоматизации к техническому владельцу добавляется владелец бизнес-результата.</p>

<h2>Сразу проектируйте путь назад</h2>
<p>До запуска нужно решить, что произойдёт, если автоматизация окажется недоступной или начнёт ошибаться.</p>
<p>Можно ли временно вернуться к ручной обработке? Можно ли отключить только новую часть процесса? Какие операции нельзя выполнять повторно? Где нужен человек?</p>
<p>В архитектуре эти вопросы раскрывают <a href="graceful-degradation-business.html">Graceful Degradation</a>, <a href="circuit-breaker-business.html">Circuit Breaker</a> и для AI — <a href="ai-fallback-business.html">AI Fallback Strategy</a>.</p>
<p>Хорошая автоматизация не только умеет работать. Она заранее определяет, что произойдёт, когда работать перестанет.</p>

<h2>Если используется AI — разделяйте совет и действие</h2>
<p>AI, который предлагает вариант ответа сотруднику, и AI, который самостоятельно меняет цену, переводит деньги, отправляет юридически значимое сообщение или блокирует клиента, — это совершенно разные уровни риска.</p>
<p>Полномочия нужно выдавать постепенно. Низкорисковые действия можно автоматизировать раньше. Там, где цена ошибки высока, нужен <a href="human-in-loop-ai.html">Human-in-the-Loop</a>, ограничения из <a href="ai-guardrails-business.html">AI Guardrails</a> и явные права на инструменты.</p>
<p>Сам факт, что модель технически умеет вызвать функцию, ещё не означает, что бизнес должен разрешить ей это делать.</p>

<h2>Что CEO должен увидеть до запуска</h2>
<ul>
<li>Какую конкретную бизнес-проблему мы решаем?</li>
<li>Кто владелец процесса после автоматизации?</li>
<li>Как изменится клиентский или операционный результат?</li>
<li>Что произойдёт при ошибке или недоступности?</li>
<li>Можно ли ограничить запуск небольшой частью процесса?</li>
<li>Какие действия остаются за человеком?</li>
<li>Как мы поймём через несколько месяцев, что автоматизация действительно окупается?</li>
</ul>

<h2>В итоге</h2>
<p>CEO не обязан выбирать архитектурный паттерн или платформу автоматизации. Но именно CEO задаёт рамку, в которой технология либо создаёт бизнес-эффект, либо становится ещё одним дорогостоящим проектом.</p>
<p><strong>Автоматизация — это не внедрение технологии. Это изменение способа работы компании. Начинать стоит с процесса и его экономики, а масштабировать — только после доказанного результата.</strong></p>
'''
        },
        'en': {
            'title': "I'm a CEO. How Should I Introduce Automation Across the Company?",
            'desc': 'A practical CEO guide to choosing processes for automation, starting from a business constraint, limiting pilot risk, and scaling only after value is proven.',
            'summary': 'Automation does not start with AI, RPA, or a new platform. It starts with a process where manual work, waiting, errors, or dependence on specific people already costs the business more than changing that process.',
            'body': '''
<h2>Automation Is Not an IT Project</h2>
<p>When automation is framed as technology implementation, the company starts discussing tools before the problem. Which AI model should we use? Do we need RPA? Should we buy a workflow platform? Do we need microservices?</p>
<p>For a CEO, the first question is different: <strong>which business process are we trying to change, and what is already too expensive about the way it works today?</strong></p>
<p>The constraint may be customer waiting time, repeated data entry, avoidable errors, slow approval, dependence on a few people, or the inability to scale a process as the business grows.</p>
<p>Technology comes later, as a way to remove a specific constraint.</p>

<h2>Do Not Automate a Bad Process</h2>
<p>One of the most expensive mistakes is taking the current process and simply making a computer execute it faster.</p>
<p>If the process contains seven approvals, three manual checks, and two steps that exist only because systems cannot talk to each other, automation can preserve all of that waste.</p>
<p>Before automating, ask which steps create value, which manage a real risk, and which survive only because “this is how we have always done it.” Sometimes the best automation project starts by deleting half the process.</p>

<h2>Start With One Measurable Constraint</h2>
<p>“We need more automation” is almost useless as a management goal. “We need to reduce the time from request to decision” or “we need to eliminate repeated entry of the same data” is much better.</p>
<p>A good first automation has a clear starting point, an owner, and a measurable outcome. Most importantly, it can be stopped if the hypothesis does not work.</p>

<h2>Choose the Right Type of Automation</h2>
<p>Different problems need different mechanisms. Not every task needs AI.</p>
<ul>
<li><strong>If two systems repeatedly exchange data</strong>, start with APIs, <a href="webhooks-business.html">Webhooks</a>, <a href="api-composition-business.html">API Composition</a>, and events.</li>
<li><strong>If one business process crosses several systems</strong>, understand <a href="event-driven-business.html">Event-Driven Architecture</a> and <a href="saga-pattern-business.html">Saga</a>.</li>
<li><strong>If an operation may be retried after failure</strong>, look at <a href="idempotency-business.html">Idempotency</a>, <a href="outbox-pattern-business.html">Outbox</a>, and <a href="transactional-inbox-business.html">Transactional Inbox</a>.</li>
<li><strong>If automation needs internal knowledge</strong>, start with <a href="rag-business.html">RAG</a> before assuming you need to train a model.</li>
<li><strong>If AI must act rather than only answer</strong>, you are in the territory of <a href="ai-agents-business.html">AI Agents</a>, <a href="human-in-loop-ai.html">Human-in-the-Loop</a>, and <a href="ai-tool-permissions-business.html">AI Tool Permissions</a>.</li>
</ul>
<p>The architecture decision follows the business problem, not the other way around.</p>

<h2>Do Not Start With Company-Wide Scale</h2>
<p>“Automate the whole company” sounds ambitious but does not help much with risk.</p>
<p>A more useful sequence is: <strong>one process → one problem → limited rollout → measurable effect → scale.</strong></p>
<p><a href="feature-flags-business.html">Feature Flags</a> and <a href="canary-deployment-business.html">Canary Deployment</a> express the same idea technically: expose new behavior gradually, observe what happens, and expand only after evidence.</p>
<p>Automation needs this discipline too. A failure may be technically invisible while still producing the wrong business action.</p>

<h2>Every Automation Needs a Business Owner</h2>
<p>If a process “belongs to IT” after launch, that is a warning sign.</p>
<p>Technology teams can own the platform, integration, and operations. But someone in the business must own the meaning of the process: what counts as a correct outcome, where automation is allowed, where a person is required, and what happens on exceptions.</p>
<p>This extends the principle behind <a href="service-ownership-business.html">Service Ownership</a>: technical boundaries need clear accountability, and automation also needs ownership of the business result.</p>

<h2>Design the Way Back Before You Launch</h2>
<p>Before rollout, decide what happens if automation becomes unavailable or starts making mistakes.</p>
<p>Can the process temporarily return to manual handling? Can only the new part be disabled? Which operations must never be repeated? Where must a human intervene?</p>
<p><a href="graceful-degradation-business.html">Graceful Degradation</a>, <a href="circuit-breaker-business.html">Circuit Breaker</a>, and for AI <a href="ai-fallback-business.html">AI Fallback Strategy</a> are technical expressions of the same management question.</p>
<p>Good automation is not only able to work. It defines in advance what happens when it does not.</p>

<h2>With AI, Separate Advice From Authority</h2>
<p>An AI assistant suggesting an answer to an employee and an AI agent changing a price, moving money, sending a legally significant message, or blocking a customer are very different risk levels.</p>
<p>Authority should increase gradually. Low-risk actions can be automated earlier. Where the cost of error is high, use <a href="human-in-loop-ai.html">Human-in-the-Loop</a>, <a href="ai-guardrails-business.html">AI Guardrails</a>, and explicit tool permissions.</p>
<p>The fact that a model can call a function does not mean the business should allow it to do so.</p>

<h2>What the CEO Should See Before Launch</h2>
<ul>
<li>Which specific business problem are we solving?</li>
<li>Who owns the process after automation?</li>
<li>How should the customer or operational outcome change?</li>
<li>What happens when automation fails or becomes unavailable?</li>
<li>Can rollout be limited to a small part of the process?</li>
<li>Which decisions remain with people?</li>
<li>How will we know in a few months that the automation is actually paying off?</li>
</ul>

<h2>In the End</h2>
<p>A CEO does not need to choose an architecture pattern or automation platform. But the CEO sets the frame in which technology either creates a business outcome or becomes another expensive project.</p>
<p><strong>Automation is not technology implementation. It is a change in how the company works. Start with the process and its economics, and scale only after the result is proven.</strong></p>
'''
        }
    },
    'ceo-automation-governance': {
        'read': 7,
        'ru': {
            'title': 'Я CEO. Как мне управлять автоматизацией в компании?',
            'desc': 'Как CEO управлять растущей автоматизацией через ответственность, устойчивость, стоимость, полномочия AI и измеримый бизнес-результат, не управляя технологиями вручную.',
            'summary': 'Когда автоматизаций становится много, проблема меняется. Уже недостаточно уметь запускать новые решения — нужно понимать, кто за них отвечает, сколько они стоят, что от них зависит и что произойдёт, если они перестанут работать.',
            'body': '''
<h2>После первых успехов начинается более сложная задача</h2>
<p>В начале автоматизация обычно выглядит просто: есть процесс, есть понятная проблема, команда делает решение, бизнес получает эффект.</p>
<p>Через несколько лет картина меняется. Появляются десятки интеграций, автоматических правил, фоновых процессов, AI-сценариев и решений разных поставщиков. Один процесс зависит от другого, старые ручные обходы забыты, а часть критичных действий происходит без участия человека.</p>
<p>И в этот момент задача CEO уже не «как автоматизировать больше». Задача — <strong>как не потерять управляемость компании после того, как всё больше решений принимает и исполняет software.</strong></p>

<h2>CEO должен управлять не технологиями, а четырьмя вещами</h2>
<p>Не нужно управлять API, очередями, моделями или Kubernetes. Но на уровне компании должны быть видны четыре параметра автоматизации:</p>
<ul>
<li><strong>ответственность</strong> — кто владеет результатом;</li>
<li><strong>зависимость и риск</strong> — что остановится при сбое;</li>
<li><strong>экономика</strong> — сколько стоит автоматизация и какую ценность создаёт;</li>
<li><strong>полномочия</strong> — какие решения система может принимать без человека.</li>
</ul>
<p>Если эти четыре вещи прозрачны, технологические детали можно делегировать. Если нет — рост автоматизации постепенно превращается в рост скрытого операционного риска.</p>

<h2>У каждой автоматизации должен быть владелец</h2>
<p>Автоматизация без владельца со временем превращается в инфраструктурный артефакт, который все боятся менять.</p>
<p>Нужен не только технический owner. Должен быть человек или функция, отвечающая за бизнес-смысл процесса: правильность результата, исключения, правила и критерии качества.</p>
<p><a href="service-ownership-business.html">Service Ownership</a>, <a href="bounded-context-business.html">Bounded Context</a> и <a href="team-topologies-business.html">Team Topologies</a> помогают провести границы ответственности так, чтобы компания понимала не только «где код», но и «кто отвечает за результат».</p>

<h2>Знайте, что произойдёт при остановке</h2>
<p>Управлять автоматизацией невозможно, если компания не знает последствия её отказа.</p>
<p>Для каждого критичного процесса полезно иметь простой ответ: что перестанет работать, как быстро это станет проблемой для клиента или денег и какой временный режим существует.</p>
<p>Отсюда появляются <a href="graceful-degradation-business.html">Graceful Degradation</a>, <a href="bulkhead-business.html">Bulkhead</a>, <a href="circuit-breaker-business.html">Circuit Breaker</a> и <a href="disaster-recovery-business.html">Disaster Recovery</a>.</p>
<p>Для AI тот же вопрос раскрывается через <a href="ai-fallback-business.html">AI Fallback Strategy</a>: продукт не должен исчезать только потому, что одна модель или один провайдер сегодня недоступны.</p>

<h2>Не превращайте центральный контроль в новую ручную очередь</h2>
<p>По мере роста автоматизации возникает естественное желание создать одну команду, которая будет согласовывать все интеграции, все AI-сценарии, все инфраструктурные изменения и все доступы.</p>
<p>Это может снизить риск на старте и одновременно уничтожить скорость в масштабе.</p>
<p>Лучший путь — часть правил сделать платформой и автоматической проверкой. <a href="platform-engineering-business.html">Platform Engineering</a> создаёт стандартный безопасный путь для команд. <a href="policy-as-code-business.html">Policy as Code</a> переводит часть требований из документов и ручных согласований в проверяемые правила. <a href="infrastructure-as-code-business.html">Infrastructure as Code</a> делает изменения воспроизводимыми и проверяемыми.</p>
<p>Цель governance — не добавить согласование. Цель — сделать правильный способ работы самым простым.</p>

<h2>Стоимость автоматизации должна быть видна там, где принимается решение</h2>
<p>Автоматизация редко остаётся бесплатной после запуска. Появляются инфраструктура, лицензии, поддержка, внешние API, модели, хранение данных и люди, которые всё это эксплуатируют.</p>
<p>Если стоимость видят только финансы постфактум, архитектурные решения принимаются без обратной связи.</p>
<p><a href="finops-business.html">FinOps</a> делает стоимость частью инженерного решения. Для AI к этому добавляются <a href="model-routing-business.html">Model Routing</a>, <a href="semantic-cache-business.html">Semantic Cache</a> и <a href="context-window-business.html">Context Window</a>: далеко не каждый запрос должен идти в самую дорогую модель с максимальным объёмом контекста.</p>
<p>CEO здесь нужен не для выбора модели. Нужна управленческая установка: стоимость единицы автоматизированной работы должна быть понятна и сравнима с создаваемой ценностью.</p>

<h2>Отдельно управляйте полномочиями AI</h2>
<p>Обычная автоматизация выполняет правила, написанные заранее. AI способен интерпретировать контекст и выбирать действие. Поэтому управление полномочиями становится отдельной задачей.</p>
<p>Нужно явно разделить: где AI предлагает, где готовит действие, где выполняет его после подтверждения и где имеет право действовать полностью автономно.</p>
<p><a href="human-in-loop-ai.html">Human-in-the-Loop</a>, <a href="ai-guardrails-business.html">AI Guardrails</a>, <a href="ai-tool-permissions-business.html">AI Tool Permissions</a> и <a href="prompt-injection-defense.html">Prompt Injection Defense</a> описывают разные части этой границы.</p>
<p>Полномочия AI должны зависеть от цены ошибки, а не от впечатляющих возможностей модели.</p>

<h2>Данные тоже становятся частью управления автоматизацией</h2>
<p>Чем больше решений принимается автоматически, тем опаснее ситуация, когда разные системы по-разному понимают один и тот же показатель или работают на данных неизвестного качества.</p>
<p><a href="data-contracts-business.html">Data Contracts</a> делают ожидания от данных явными. <a href="data-lineage-business.html">Data Lineage</a> показывает происхождение цифры. <a href="data-quality-business.html">Data Quality</a> помогает ловить проблемы до того, как они превратятся в автоматическое неправильное действие.</p>
<p>Для AI добавляется <a href="ai-data-privacy-business.html">AI Data Privacy и Data Residency</a>: автоматизация не отменяет правил доступа к данным и не даёт модели право видеть всё, что технически можно передать в prompt.</p>

<h2>Измеряйте не количество автоматизаций, а результат</h2>
<p>Количество ботов, AI-сценариев, интеграций или автоматизированных процессов — слабая управленческая метрика. Она показывает активность, но не ценность.</p>
<p>Полезнее смотреть на бизнес-результат: время процесса, стоимость операции, количество ошибок, доступность критичного сценария, клиентский эффект и стоимость поддержки.</p>
<p><a href="slo-error-budget-business.html">SLO и Error Budget</a> помогают сделать надёжность предметом осознанного выбора. <a href="observability-business.html">Observability</a> показывает реальное поведение системы. Для AI нужны ещё <a href="ai-evaluation-business.html">AI Evaluation</a> и <a href="ai-observability-business.html">AI Observability</a>, потому что технический HTTP 200 ещё не означает хороший бизнес-результат.</p>

<h2>Автоматизацию нужно уметь удалять</h2>
<p>Процесс меняется, продукт меняется, экономика меняется. Автоматизация, которая была полезна три года назад, может сегодня только поддерживать старое устройство компании.</p>
<p>Поэтому зрелое управление автоматизацией включает не только запуск, но и регулярный вопрос: нужна ли эта автоматизация всё ещё?</p>
<p>Если ответ неизвестен, скорее всего у компании нет владельца или метрики результата.</p>

<h2>Что CEO стоит спрашивать регулярно</h2>
<ul>
<li>Какие автоматизации сегодня критичны для выручки, клиента или операции?</li>
<li>У каждой из них есть бизнес-владелец?</li>
<li>Что произойдёт при остановке ключевой зависимости?</li>
<li>Где растёт стоимость быстрее создаваемой ценности?</li>
<li>Какие решения AI принимает полностью самостоятельно?</li>
<li>Какие данные используются для автоматических решений и кто отвечает за их качество?</li>
<li>Какие старые автоматизации можно выключить?</li>
</ul>

<h2>В итоге</h2>
<p>Первая стадия автоматизации — убрать лишнюю ручную работу. Вторая — не потерять управление компанией после того, как ручная работа исчезла.</p>
<p><strong>CEO не должен управлять технологиями автоматизации. Он должен сделать прозрачными ответственность, риск, стоимость и полномочия — и требовать, чтобы каждая автоматизация продолжала создавать измеримый бизнес-результат.</strong></p>
'''
        },
        'en': {
            'title': "I'm a CEO. How Should I Govern Automation Across the Company?",
            'desc': 'How CEOs can govern growing automation through accountability, resilience, cost, AI authority, and measurable business outcomes without micromanaging technology.',
            'summary': 'Once automation scales, the problem changes. Launching new solutions is no longer enough: the company needs to know who owns them, what they cost, what depends on them, and what happens when they stop working.',
            'body': '''
<h2>After the First Wins, a Harder Problem Begins</h2>
<p>Early automation is usually simple: there is a process, a visible problem, a team builds a solution, and the business gets an effect.</p>
<p>A few years later the picture changes. There are dozens of integrations, automated rules, background processes, AI scenarios, and vendor products. One process depends on another, manual workarounds are forgotten, and some critical actions happen without a person involved.</p>
<p>At that point the CEO's question is no longer “how do we automate more?” It becomes <strong>how do we keep the company governable as more decisions and actions are executed by software?</strong></p>

<h2>The CEO Should Govern Four Things, Not the Technology</h2>
<p>You do not need to manage APIs, queues, models, or Kubernetes. But four properties of automation should be visible at company level:</p>
<ul>
<li><strong>accountability</strong> — who owns the result;</li>
<li><strong>dependency and risk</strong> — what stops when it fails;</li>
<li><strong>economics</strong> — what it costs and what value it creates;</li>
<li><strong>authority</strong> — which decisions the system may make without a person.</li>
</ul>
<p>If these four are visible, technical details can be delegated. If they are not, more automation gradually becomes more hidden operational risk.</p>

<h2>Every Automation Needs an Owner</h2>
<p>Automation without an owner eventually becomes an infrastructure artifact that everybody is afraid to change.</p>
<p>You need more than a technical owner. Someone must own the business meaning of the process: correctness, exceptions, rules, and quality criteria.</p>
<p><a href="service-ownership-business.html">Service Ownership</a>, <a href="bounded-context-business.html">Bounded Context</a>, and <a href="team-topologies-business.html">Team Topologies</a> help create responsibility boundaries so the company understands not only where the code lives, but who owns the result.</p>

<h2>Know What Happens When It Stops</h2>
<p>You cannot govern automation if the company does not know the consequence of failure.</p>
<p>For every critical process, there should be a simple answer: what stops, how quickly that becomes a customer or financial problem, and what temporary mode exists.</p>
<p>This leads to <a href="graceful-degradation-business.html">Graceful Degradation</a>, <a href="bulkhead-business.html">Bulkhead</a>, <a href="circuit-breaker-business.html">Circuit Breaker</a>, and <a href="disaster-recovery-business.html">Disaster Recovery</a>.</p>
<p>For AI, the same question appears as <a href="ai-fallback-business.html">AI Fallback Strategy</a>: the product should not disappear just because one model or provider is unavailable.</p>

<h2>Do Not Turn Central Control Into a New Manual Queue</h2>
<p>As automation grows, it is tempting to create one central team that approves every integration, AI scenario, infrastructure change, and permission.</p>
<p>That can reduce risk at first and destroy speed at scale.</p>
<p>A better model turns part of governance into platforms and automated checks. <a href="platform-engineering-business.html">Platform Engineering</a> creates a standard safe path. <a href="policy-as-code-business.html">Policy as Code</a> moves part of governance from documents into executable rules. <a href="infrastructure-as-code-business.html">Infrastructure as Code</a> makes changes reproducible and reviewable.</p>
<p>The goal of governance is not to add approval. It is to make the correct way of working the easiest way.</p>

<h2>Automation Cost Must Be Visible Where Decisions Are Made</h2>
<p>Automation rarely stays free after launch. Infrastructure, licenses, support, external APIs, models, storage, and operations all accumulate.</p>
<p>If only finance sees the bill after the fact, architecture decisions are made without cost feedback.</p>
<p><a href="finops-business.html">FinOps</a> makes cost part of engineering feedback. For AI, <a href="model-routing-business.html">Model Routing</a>, <a href="semantic-cache-business.html">Semantic Cache</a>, and <a href="context-window-business.html">Context Window</a> matter because not every request should use the most expensive model with the largest possible context.</p>
<p>The CEO does not need to pick the model. The management principle is simpler: the cost of a unit of automated work should be visible and comparable with the value it creates.</p>

<h2>Govern AI Authority Separately</h2>
<p>Traditional automation executes rules defined in advance. AI can interpret context and choose an action. That makes authority a separate governance problem.</p>
<p>Explicitly distinguish where AI advises, where it prepares an action, where it acts after approval, and where it may act autonomously.</p>
<p><a href="human-in-loop-ai.html">Human-in-the-Loop</a>, <a href="ai-guardrails-business.html">AI Guardrails</a>, <a href="ai-tool-permissions-business.html">AI Tool Permissions</a>, and <a href="prompt-injection-defense.html">Prompt Injection Defense</a> cover different parts of that boundary.</p>
<p>AI authority should depend on the cost of error, not on how impressive the model looks.</p>

<h2>Data Becomes Part of Automation Governance Too</h2>
<p>The more decisions are automated, the more dangerous it becomes when systems disagree about the meaning of a metric or rely on data of unknown quality.</p>
<p><a href="data-contracts-business.html">Data Contracts</a> make expectations explicit. <a href="data-lineage-business.html">Data Lineage</a> shows where a number came from. <a href="data-quality-business.html">Data Quality</a> helps catch problems before they become automated wrong actions.</p>
<p>For AI there is also <a href="ai-data-privacy-business.html">AI Data Privacy and Data Residency</a>: automation does not remove data-access rules or give a model permission to see everything that can technically fit into a prompt.</p>

<h2>Measure Outcomes, Not the Number of Automations</h2>
<p>The number of bots, AI scenarios, integrations, or automated processes is a weak management metric. It measures activity, not value.</p>
<p>Better measures are process time, unit cost, error rate, availability of the critical journey, customer impact, and support cost.</p>
<p><a href="slo-error-budget-business.html">SLO and Error Budgets</a> make reliability an explicit choice. <a href="observability-business.html">Observability</a> shows real system behavior. AI also needs <a href="ai-evaluation-business.html">AI Evaluation</a> and <a href="ai-observability-business.html">AI Observability</a>, because HTTP 200 does not guarantee a useful business result.</p>

<h2>Be Able to Remove Automation</h2>
<p>Processes change, products change, economics change. Automation that was useful three years ago may now only preserve an outdated way of working.</p>
<p>Mature automation governance therefore includes not only launching new solutions but regularly asking whether old ones are still needed.</p>
<p>If nobody knows the answer, the company probably lacks ownership or outcome metrics.</p>

<h2>Questions the CEO Should Ask Regularly</h2>
<ul>
<li>Which automations are critical to revenue, customers, or operations today?</li>
<li>Does each of them have a business owner?</li>
<li>What happens when a key dependency stops?</li>
<li>Where is cost growing faster than the value created?</li>
<li>Which decisions can AI make fully autonomously?</li>
<li>Which data drives automated decisions and who owns its quality?</li>
<li>Which old automations can be retired?</li>
</ul>

<h2>In the End</h2>
<p>The first stage of automation removes unnecessary manual work. The second stage prevents the company from losing control after that manual work disappears.</p>
<p><strong>The CEO should not manage automation technology. The CEO should make accountability, risk, cost, and authority visible—and require every automation to keep producing a measurable business outcome.</strong></p>
'''
        }
    }
}

def page(slug, item, lang):
    d = item[lang]
    ru = lang == 'ru'
    other = 'en' if ru else 'ru'
    name = 'Антон Куракин' if ru else 'Anton Kurakin'
    root = '../../index.html' if ru else '../../en/index.html'
    projects = '../../projects.html' if ru else '../projects.html'
    experience = '../../experience.html' if ru else '../experience.html'
    contact = '../../index.html#contact' if ru else '../../en/index.html#contact'
    labels = {
        'skip': 'Перейти к содержанию' if ru else 'Skip to content',
        'home': 'Главная' if ru else 'Home',
        'projects': 'Проекты' if ru else 'Projects',
        'about': 'О себе' if ru else 'About',
        'writing': 'Статьи' if ru else 'Writing',
        'arch': 'Архитектура' if ru else 'Architecture',
        'contact': 'Контакты' if ru else 'Contact',
        'back': 'Для CEO' if ru else 'For CEOs',
        'read': f"{item['read']} мин чтения" if ru else f"{item['read']} min read",
        'footer': 'ИТ-архитектура для всех' if ru else 'IT Architecture for Everyone'
    }
    canonical = f'https://kurakin-anton.ru/{lang}/articles/{slug}.html'
    other_url = f'https://kurakin-anton.ru/{other}/articles/{slug}.html'
    other_href = f'../../{other}/articles/{slug}.html'
    ld = json.dumps({
        '@context':'https://schema.org','@type':'Article','headline':d['title'],'description':d['desc'],
        'inLanguage':lang,'datePublished':DATE,'dateModified':DATE,
        'mainEntityOfPage':{'@type':'WebPage','@id':canonical},
        'author':{'@type':'Person','name':name,'url':'https://kurakin-anton.ru/'},
        'image':'https://kurakin-anton.ru/assets/img/article-notes.png'
    }, ensure_ascii=False, separators=(',',':'))
    return f'''<!doctype html>
<html lang="{lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="{d['desc']}">
  <meta name="author" content="{name}">
  <meta name="color-scheme" content="light">
  <meta property="og:type" content="article">
  <meta property="og:title" content="{d['title']}">
  <meta property="og:description" content="{d['summary']}">
  <meta property="og:url" content="{canonical}">
  <meta property="og:image" content="https://kurakin-anton.ru/assets/img/article-notes.png">
  <meta property="article:published_time" content="{DATE}">
  <meta property="article:modified_time" content="{DATE}">
  <title>{d['title']} - {name}</title>
  <link rel="canonical" href="{canonical}">
  <link rel="alternate" hreflang="{lang}" href="{canonical}">
  <link rel="alternate" hreflang="{other}" href="{other_url}">
  <script type="application/ld+json">{ld}</script>
  <link rel="icon" href="../../assets/img/logo-icon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="../../assets/styles.css">
</head>
<body data-page="article" data-lang="{lang}">
<a class="skip-link" href="#main">{labels['skip']}</a>
<header class="site-header"><a class="brand" href="{root}" aria-label="{name}"><img class="brand-logo" src="../../assets/img/logo-icon.svg" alt="" width="42" height="42"><span class="brand-text">{name}</span></a><nav class="site-nav" aria-label="{'Основная навигация' if ru else 'Main navigation'}"><a href="{root}">{labels['home']}</a><a href="{projects}">{labels['projects']}</a><a href="{experience}">{labels['about']}</a><a href="index.html">{labels['writing']}</a><a href="../architecture/index.html">{labels['arch']}</a><a href="{contact}">{labels['contact']}</a></nav><div class="lang-switcher" aria-label="{'Выбор языка' if ru else 'Language selection'}"><a href="{'../../ru/articles/'+slug+'.html' if not ru else slug+'.html'}"{' aria-current="page"' if ru else ''}>RU</a><a href="{'../../en/articles/'+slug+'.html' if ru else slug+'.html'}"{' aria-current="page"' if not ru else ''}>EN</a></div></header>
<main class="article-page" id="main"><header class="article-hero"><div class="article-hero-copy"><a class="article-back-link" href="../architecture/index.html">{labels['back']}</a><p class="article-kicker"><span>{labels['read']}</span></p><h1>{d['title']}</h1><p class="article-summary">{d['summary']}</p></div></header><article class="article-content">{d['body']}</article></main>
<footer class="site-footer"><p>© 2026 {name}.</p><a href="../architecture/index.html">{labels['footer']}</a></footer>
</body></html>'''

for slug, item in ARTICLES.items():
    for lang in ('ru','en'):
        p = Path(lang)/'articles'/(slug+'.html')
        if p.exists():
            raise SystemExit(f'already exists: {p}')
        p.write_text(page(slug,item,lang), encoding='utf-8')

cards = {
    'ru': [
        ('ceo-automation-adoption','Для CEO','7 мин чтения','Я CEO. Как мне внедрять автоматизацию в компании?','Как начинать автоматизацию с бизнес-процесса, ограничивать риск первого запуска и масштабировать только то, что доказало ценность.','Читать →'),
        ('ceo-automation-governance','Для CEO','7 мин чтения','Я CEO. Как мне управлять автоматизацией в компании?','Как управлять ответственностью, риском, стоимостью и полномочиями автоматизации, не превращаясь в технического руководителя.','Читать →')
    ],
    'en': [
        ('ceo-automation-adoption','For CEOs','7 min read',"I'm a CEO. How Should I Introduce Automation Across the Company?",'How to start automation from a business process, limit rollout risk, and scale only what proves its value.','Read →'),
        ('ceo-automation-governance','For CEOs','7 min read',"I'm a CEO. How Should I Govern Automation Across the Company?",'How to govern accountability, risk, cost, and automation authority without becoming the technical manager.','Read →')
    ]
}

for lang in ('ru','en'):
    p = Path(lang)/'architecture'/'index.html'
    text = p.read_text(encoding='utf-8')
    start = text.index("<section aria-labelledby='start-title' class='architecture-start'>")
    end = text.index('</section>', start)
    section = text[start:end]
    inserts = []
    for slug,label,read,title,desc,action in cards[lang]:
        if slug+'.html' in section:
            continue
        inserts.append(f'''<article class="architecture-feature"><div class="architecture-feature-meta"><span class="architecture-feature-label">{label}</span><span>{read}</span></div><div class="architecture-feature-copy"><h2><a href="../articles/{slug}.html">{title}</a></h2><p>{desc}</p></div><a class="architecture-feature-action" href="../articles/{slug}.html">{action}</a></article>''')
    if inserts:
        text = text[:end] + ''.join(inserts) + text[end:]
        p.write_text(text, encoding='utf-8')

css = Path('assets/architecture.css')
css_text = css.read_text(encoding='utf-8')
rule = '.architecture-feature + .architecture-feature {\n  margin-top: 16px;\n}\n\n'
if '.architecture-feature + .architecture-feature' not in css_text:
    anchor = '.architecture-feature-meta {'
    pos = css_text.index(anchor)
    css_text = css_text[:pos] + rule + css_text[pos:]
    css.write_text(css_text, encoding='utf-8')

sm = Path('sitemap-architecture.xml')
sm_text = sm.read_text(encoding='utf-8')
for slug in ARTICLES:
    for lang in ('ru','en'):
        url = f'https://kurakin.pro/{lang}/articles/{slug}.html'
        if url not in sm_text:
            sm_text = sm_text.replace('</urlset>', f'<url><loc>{url}</loc></url></urlset>')
sm.write_text(sm_text, encoding='utf-8')
print('CEO automation guides generated')
