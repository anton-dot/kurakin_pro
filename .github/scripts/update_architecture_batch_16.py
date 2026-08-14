from pathlib import Path
import json

DATE = "2026-08-12"
IMAGE = "https://kurakin-anton.ru/assets/img/article-notes.png"
AUTHOR_URL = "https://kurakin-anton.ru/"

articles = [
    {
        "slug": "context-mapping-business",
        "section": "domain",
        "ru_title": "Context Mapping: почему границы доменов недостаточно просто нарисовать",
        "en_title": "Context Mapping: Why Drawing Domain Boundaries Is Not Enough",
        "ru_desc": "Как Context Mapping делает зависимости между бизнес-доменами и командами явными, помогает выбирать способ интеграции и снижает цену скрытой связанности.",
        "en_desc": "How Context Mapping makes dependencies between business domains and teams explicit, helps choose integration boundaries, and reduces the cost of hidden coupling.",
        "ru_summary": "Разделить систему на bounded contexts — только половина работы. Домены всё равно обмениваются данными и зависят друг от друга. Context Mapping нужен, чтобы эти отношения были осознанными, а не случайными.",
        "en_summary": "Splitting a system into bounded contexts is only half the job. Domains still exchange data and depend on one another. Context Mapping makes those relationships deliberate instead of accidental.",
        "ru_card": "Как сделать зависимости между доменами и командами явными и выбирать интеграции по цене связанности, а не по удобству первого релиза.",
        "en_card": "How to make dependencies between domains and teams explicit and choose integrations by coupling cost, not first-release convenience.",
        "ru_body": [
            ("Какую проблему мы решаем", ["Bounded Context помогает определить, где заканчивается одна модель бизнеса и начинается другая. Но после этого возникает следующий вопрос: как эти контексты взаимодействуют между собой?", "Без явной карты отношений одна команда может зависеть от терминов, данных и темпа изменений другой сильнее, чем кажется. Формально системы разделены, а фактически любое изменение требует длинной цепочки согласований."]),
            ("Как работает Context Mapping", ["Context Mapping описывает не только границы доменов, но и характер отношений между ними: кто владеет моделью, кто зависит от контракта, где нужна трансляция понятий и где команды сознательно делят часть модели.", "Смысл не в красивой диаграмме. Карта должна отвечать на практические вопросы: кто может менять контракт, кто обязан адаптироваться, где нужен Anti-Corruption Layer и где совместная модель действительно дешевле независимых копий."]),
            ("Что получает бизнес", ["Бизнес получает более предсказуемую цену изменений. Если зависимости между доменами видны, проще понять, почему небольшой продуктовый запрос затрагивает несколько команд и где архитектура создаёт постоянную координационную стоимость.", "Context Mapping помогает находить места, где организация теряет скорость не из-за недостатка разработчиков, а из-за неудачной формы зависимости между продуктами и командами.", "Ещё один эффект — меньше риска при реорганизации. Менять ownership проще, когда понятно, какие контракты и процессы реально связывают части компании."]),
            ("Что получает команда", ["Команды получают явные ожидания друг от друга: кто владеет контрактом, кто является upstream, кто адаптируется и где изменения требуют совместного решения.", "Это уменьшает количество скрытых интеграций и помогает не смешивать внутреннюю модель одного домена с моделью другого только потому, что так быстрее сегодня."]),
            ("Что получает клиент", ["Клиент редко видит Context Map напрямую. Но он ощущает последствия: изменения проходят предсказуемее, интеграционные ошибки реже попадают в production, а разные части продукта меньше противоречат друг другу."]),
            ("Чем мы за это платим", ["Карту нужно обсуждать и поддерживать. Если она отстаёт от реальности, документ быстро превращается в архитектурный декор.", "Есть и организационная цена: явные зависимости иногда показывают неудобную правду — например, что автономной команда только называется, а важные изменения всё равно контролируются другим доменом."]),
            ("Когда не нужно усложнять", ["Для небольшой системы с одной командой и простой предметной областью отдельный Context Map может ничего не добавить. Достаточно понятных границ модулей и владельцев.", "Ценность появляется, когда доменов и команд становится несколько, а стоимость согласований начинает влиять на скорость бизнеса."]),
            ("Что стоит спросить перед решением", ["Какие домены реально зависят друг от друга?", "Кто владеет каждым важным контрактом?", "Где одна команда вынуждена постоянно адаптироваться к другой?", "Какие понятия нельзя безопасно переносить между доменами без перевода?", "Какая зависимость сегодня сильнее всего замедляет изменения?"]),
            ("В итоге", ["Границы сами по себе не делают архитектуру независимой. Важно ещё понимать отношения между границами.", "<strong>Для бизнеса Context Mapping — это способ увидеть не только устройство системы, но и реальную цену координации между частями компании.</strong>"])
        ],
        "en_body": [
            ("What problem are we solving?", ["A Bounded Context helps define where one business model ends and another begins. The next question is how those contexts interact.", "Without an explicit map, one team can depend on another team's language, data, and delivery cadence more than anyone realizes. The systems look separated, yet a small change still requires a long chain of coordination."]),
            ("How Context Mapping works", ["Context Mapping describes not only domain boundaries but the nature of the relationship: who owns the model, who depends on the contract, where translation is needed, and where teams deliberately share part of a model.", "The point is not a pretty diagram. The map should answer practical questions: who can change a contract, who must adapt, where an Anti-Corruption Layer is justified, and where a shared model is cheaper than independent copies."]),
            ("What the business gets", ["The business gets a more predictable cost of change. When domain dependencies are visible, it becomes easier to understand why a small product request touches several teams and where architecture creates permanent coordination cost.", "Context Mapping can reveal places where the company loses speed not because it lacks engineers, but because the dependency shape between products and teams is poor.", "It also reduces reorganization risk. Ownership is easier to change when the contracts and processes connecting parts of the company are explicit."]),
            ("What the team gets", ["Teams get explicit expectations: who owns a contract, who is upstream, who adapts, and which changes require a joint decision.", "That reduces hidden integrations and discourages one domain from leaking its internal model into another simply because it is convenient today."]),
            ("What the customer gets", ["Customers rarely see a Context Map directly. They feel the result: changes become more predictable, integration regressions reach production less often, and different parts of the product stay more coherent."]),
            ("What do we pay for it?", ["The map needs discussion and maintenance. If it drifts away from reality, it quickly becomes architecture decoration.", "There is an organizational cost too: explicit dependencies can expose uncomfortable facts, such as a team that is called autonomous while another domain still controls its important changes."]),
            ("When not to add the complexity", ["For a small system with one team and a simple domain, a dedicated Context Map may add little. Clear module boundaries and ownership can be enough.", "The value appears when multiple domains and teams exist and coordination cost starts affecting business speed."]),
            ("What should we ask before deciding?", ["Which domains truly depend on one another?", "Who owns each important contract?", "Where does one team constantly have to adapt to another?", "Which concepts cannot safely cross domain boundaries without translation?", "Which dependency slows change the most today?"]),
            ("In the end", ["Boundaries alone do not make architecture independent. We also need to understand the relationships between those boundaries.", "<strong>For the business, Context Mapping is a way to see not only system structure, but the real coordination cost between parts of the company.</strong>"])
        ]
    },
    {
        "slug": "shared-kernel-business",
        "section": "domain",
        "ru_title": "Shared Kernel: когда двум командам выгоднее разделить часть модели, чем дублировать её",
        "en_title": "Shared Kernel: When Two Teams Are Better Off Sharing Part of the Model Than Duplicating It",
        "ru_desc": "Когда Shared Kernel помогает двум доменам сохранить общую модель согласованной, а когда совместное владение превращается в постоянную зависимость между командами.",
        "en_desc": "When a Shared Kernel helps two domains keep a common model consistent and when joint ownership becomes a permanent dependency between teams.",
        "ru_summary": "Полная независимость доменов звучит красиво, но иногда две команды действительно должны одинаково понимать небольшой кусок модели. Shared Kernel позволяет разделить его сознательно — вместе с ценой совместного владения.",
        "en_summary": "Complete domain independence sounds attractive, but sometimes two teams genuinely need the same understanding of a small part of the model. A Shared Kernel makes that sharing deliberate — including the cost of joint ownership.",
        "ru_card": "Когда совместная часть модели дешевле дублирования и почему Shared Kernel должен оставаться маленьким, осознанным и совместно управляемым.",
        "en_card": "When a shared part of the model is cheaper than duplication and why a Shared Kernel must stay small, deliberate, and jointly governed.",
        "ru_body": [
            ("Какую проблему мы решаем", ["Иногда два bounded context должны использовать одинаковые определения или правила. Если каждый создаёт собственную копию, со временем они расходятся и бизнес получает две версии одной и той же истины.", "Обратная крайность — вынести всё общее в гигантскую библиотеку и заставить команды менять её совместно. Тогда независимость исчезает."]),
            ("Как работает Shared Kernel", ["Shared Kernel — это небольшой, осознанно общий фрагмент модели или кода, которым несколько контекстов владеют совместно. Изменения в нём требуют договорённости, потому что затрагивают всех участников.", "Ключевое слово здесь — небольшой. Shared Kernel не должен становиться контейнером для всего, что когда-то показалось похожим."]),
            ("Что получает бизнес", ["Бизнес получает единообразие там, где расхождение понятий действительно дорого: меньше противоречий между продуктами, меньше ручных сверок и ниже риск того, что одинаковое правило реализовано по-разному.", "При этом компании не нужно строить отдельный сервис или сложную интеграцию только ради небольшой действительно общей части модели."]),
            ("Что получает команда", ["Команды получают готовую согласованную основу и меньше дублируют работу. Общие изменения становятся видимыми и обсуждаются до того, как одна реализация тихо разойдётся с другой.", "Но команда теряет часть автономии: Shared Kernel нельзя менять так же свободно, как внутренний код собственного контекста."]),
            ("Что получает клиент", ["Клиент получает более согласованное поведение разных частей продукта там, где бизнес ожидает одинаковых правил и терминов."]),
            ("Чем мы за это платим", ["Главная цена — координация. Совместное владение означает совместные релизы, обсуждения совместимости и ответственность нескольких команд.", "Если Shared Kernel растёт, он постепенно превращается в скрытый монолит внутри распределённой архитектуры. Тогда любое изменение снова начинает требовать участия всех."]),
            ("Когда не нужно усложнять", ["Если две модели лишь похожи, но имеют разный бизнес-смысл, лучше не объединять их. Дублирование иногда дешевле постоянной связанности.", "Shared Kernel оправдан, когда общий смысл действительно один, а цена расхождения выше цены координации."]),
            ("Что стоит спросить перед решением", ["Что именно должно оставаться одинаковым в обоих контекстах?", "Насколько дорого будет расхождение моделей?", "Кто имеет право менять Shared Kernel?", "Можно ли сохранить его действительно маленьким?", "Не дешевле ли позволить моделям развиваться независимо?"]),
            ("В итоге", ["Shared Kernel — не способ убрать дублирование любой ценой. Это сознательная покупка согласованности ценой части автономии.", "<strong>Для бизнеса Shared Kernel полезен только там, где совместная модель стоит дешевле, чем две независимые версии одной важной истины.</strong>"])
        ],
        "en_body": [
            ("What problem are we solving?", ["Sometimes two bounded contexts need exactly the same definition or rule. If each creates its own copy, they can drift until the business has two versions of the same truth.", "The opposite extreme is a giant shared library that every team must change together. At that point independence disappears."]),
            ("How a Shared Kernel works", ["A Shared Kernel is a small, deliberately shared part of a model or codebase owned jointly by several contexts. Changes require agreement because every participant is affected.", "The key word is small. A Shared Kernel should not become a container for everything that once looked similar."]),
            ("What the business gets", ["The business gets consistency where divergence is genuinely expensive: fewer contradictions between products, fewer manual reconciliations, and less risk that the same rule behaves differently in different places.", "The company also avoids building a separate service or complex integration only to share a small piece of truly common logic."]),
            ("What the team gets", ["Teams get a consistent foundation and duplicate less work. Shared changes become visible before one implementation quietly diverges from another.", "But teams give up some autonomy: the Shared Kernel cannot be changed as freely as code owned entirely inside one context."]),
            ("What the customer gets", ["Customers get more consistent behavior across parts of the product where the business expects the same rules and terminology."]),
            ("What do we pay for it?", ["The main price is coordination. Joint ownership means joint compatibility decisions, release discipline, and responsibility across teams.", "If the Shared Kernel grows, it can become a hidden monolith inside a distributed architecture. Then every change starts requiring everyone again."]),
            ("When not to add the complexity", ["If two models only look similar but have different business meaning, do not merge them. Duplication can be cheaper than permanent coupling.", "A Shared Kernel is justified when the meaning is truly shared and the cost of divergence is higher than the cost of coordination."]),
            ("What should we ask before deciding?", ["What exactly must remain identical across the contexts?", "How expensive would model divergence be?", "Who is allowed to change the Shared Kernel?", "Can we keep it genuinely small?", "Would independent models actually be cheaper?"]),
            ("In the end", ["A Shared Kernel is not a way to eliminate duplication at any cost. It deliberately buys consistency by giving up part of team autonomy.", "<strong>For the business, a Shared Kernel is useful only where a jointly owned model costs less than two independent versions of the same important truth.</strong>"])
        ]
    },
    {
        "slug": "parallel-run-migration",
        "section": "legacy",
        "ru_title": "Parallel Run: зачем некоторое время запускать старую и новую систему одновременно",
        "en_title": "Parallel Run: Why Run the Old and New Systems at the Same Time for a While",
        "ru_desc": "Как Parallel Run снижает риск миграции legacy через сравнение старой и новой системы на реальных сценариях и чем приходится платить за период двойной эксплуатации.",
        "en_desc": "How Parallel Run reduces legacy migration risk by comparing old and new systems on real scenarios and what the period of double operation costs.",
        "ru_summary": "Самый опасный момент большой миграции — когда новую систему считают готовой только потому, что тесты прошли. Parallel Run позволяет некоторое время сравнивать её с реальной старой системой до окончательного переключения.",
        "en_summary": "The riskiest moment in a large migration is when the new system is considered ready because tests passed. Parallel Run keeps old and new running together long enough to compare them before final cutover.",
        "ru_card": "Как сравнивать старую и новую систему на реальных сценариях до окончательного cutover и снизить цену ошибки большой миграции.",
        "en_card": "How to compare old and new systems on real scenarios before final cutover and reduce the cost of a migration mistake.",
        "ru_body": [
            ("Какую проблему мы решаем", ["Legacy-система часто содержит годы накопленных правил, исключений и поведения, которое нигде полностью не описано. Новая реализация может пройти тесты и всё равно отличаться на редких реальных сценариях.", "Если заметить это только после полного переключения, ошибка уже становится бизнес-инцидентом."]),
            ("Как работает Parallel Run", ["Старая и новая система некоторое время получают одинаковые или сопоставимые входные данные. Результаты новой реализации сравниваются с текущей системой, но не обязательно сразу влияют на клиента.", "Расхождения фиксируются, классифицируются и разбираются. Команда постепенно понимает, где новая система ошибается, а где старая сама содержит историческое поведение, которое больше не нужно переносить.", "Это отличается от Blue-Green Deployment: blue-green помогает переключать версии приложения, а Parallel Run прежде всего проверяет эквивалентность поведения во время миграции."]),
            ("Что получает бизнес", ["Бизнес снижает риск большого cutover. Решение о переключении принимается не только по тестовой среде, а по данным о том, как новая система ведёт себя на реальных сценариях.", "Это особенно важно там, где ошибка миграции может искажать деньги, статусы, отчётность или ключевые операции.", "Компания также получает возможность увидеть скрытые legacy-правила до того, как старую систему выключат окончательно."]),
            ("Что получает команда", ["Команда получает реальную обратную связь о совместимости: какие сценарии совпадают, где есть расхождения и насколько они критичны.", "Можно постепенно улучшать новую систему без постоянного страха, что единственный момент проверки наступит в день переключения."]),
            ("Что получает клиент", ["Клиент получает меньше риска внезапной деградации после миграции. Большая часть ошибок обнаруживается до того, как новая система становится единственным источником результата."]),
            ("Чем мы за это платим", ["Некоторое время компания оплачивает две системы одновременно. Нужно дублировать обработку, сравнивать результаты, хранить диагностику и следить, чтобы параллельный путь не создавал побочных эффектов.", "Особенно сложно с операциями, которые изменяют внешний мир. Нельзя просто дважды отправить платёж, письмо или команду партнёру ради сравнения."]),
            ("Когда не нужно усложнять", ["Для маленькой низкорисковой замены Parallel Run может быть избыточным. Иногда достаточны тесты, canary или постепенное включение функции.", "Он полезнее всего там, где legacy сложен, правила плохо документированы, а цена неправильного cutover высока."]),
            ("Что стоит спросить перед решением", ["Какие результаты старой и новой системы можно сравнивать автоматически?", "Как долго нужно наблюдать редкие сценарии?", "Какие операции нельзя безопасно выполнять дважды?", "Как отличить ошибку новой системы от исторической ошибки legacy?", "По каким критериям мы разрешим окончательное переключение?"]),
            ("В итоге", ["Parallel Run покупает уверенность не обещаниями новой системы, а сравнением её поведения с реальностью.", "<strong>Для бизнеса это способ заплатить за короткий период двойной эксплуатации, чтобы не платить намного больше за ошибочный день окончательного переключения.</strong>"])
        ],
        "en_body": [
            ("What problem are we solving?", ["Legacy systems often contain years of accumulated rules, exceptions, and behavior that is not fully documented anywhere. A new implementation can pass tests and still differ on rare real-world scenarios.", "If those differences appear only after full cutover, the migration defect has already become a business incident."]),
            ("How Parallel Run works", ["The old and new systems receive the same or comparable inputs for a period of time. The new implementation's outputs are compared with the current system, without necessarily affecting the customer yet.", "Differences are recorded, classified, and investigated. The team learns where the new system is wrong and where the old system contains historical behavior that should not be copied forward.", "This is different from Blue-Green Deployment: blue-green helps switch application versions, while Parallel Run primarily validates behavioral equivalence during migration."]),
            ("What the business gets", ["The business reduces big-cutover risk. The decision to switch is based not only on a test environment but on evidence from real scenarios.", "That matters especially where migration errors can affect money, status, reporting, or critical operations.", "The company also discovers hidden legacy rules before the old system is permanently removed."]),
            ("What the team gets", ["The team gets real compatibility feedback: which scenarios match, where results differ, and how serious those differences are.", "The new system can improve gradually instead of putting all confidence into one cutover day."]),
            ("What the customer gets", ["Customers face less risk of sudden degradation after migration because many discrepancies are found before the new system becomes the only source of truth."]),
            ("What do we pay for it?", ["For a while, the company pays for two systems. Processing is duplicated, results must be compared, diagnostics stored, and the parallel path must not create side effects.", "Operations that change the outside world are especially difficult. You cannot send a payment, email, or partner command twice just for comparison."]),
            ("When not to add the complexity", ["For a small low-risk replacement, Parallel Run can be excessive. Tests, canary release, or gradual feature enablement may be enough.", "It is most useful when legacy is complex, rules are poorly documented, and a bad cutover is expensive."]),
            ("What should we ask before deciding?", ["Which outputs can be compared automatically?", "How long do we need to observe rare scenarios?", "Which operations cannot safely run twice?", "How will we distinguish a defect in the new system from a historical defect in legacy?", "What evidence will allow final cutover?"]),
            ("In the end", ["Parallel Run buys confidence by comparing new-system behavior with reality rather than trusting readiness claims.", "<strong>For the business, it is a way to pay for a short period of double operation instead of paying much more for a failed final cutover.</strong>"])
        ]
    },
    {
        "slug": "containers-business",
        "section": "cloud",
        "ru_title": "Containers: почему одинаковая упаковка приложения снижает цену изменений",
        "en_title": "Containers: Why Packaging Applications Consistently Lowers the Cost of Change",
        "ru_desc": "Что контейнеры дают бизнесу и командам: воспроизводимые среды, более предсказуемые релизы и переносимость — и почему за это приходится платить новым инфраструктурным слоем.",
        "en_desc": "What containers give business and teams: reproducible environments, more predictable releases, and portability — and why that introduces another infrastructure layer.",
        "ru_summary": "Контейнеры не делают систему масштабируемой или надёжной автоматически. Их базовая ценность проще: приложение и его зависимости приезжают в окружение в одной воспроизводимой упаковке.",
        "en_summary": "Containers do not make a system scalable or reliable automatically. Their core value is simpler: the application and its dependencies arrive in a reproducible package.",
        "ru_card": "Как одинаковая упаковка приложения уменьшает различия между средами, делает релизы предсказуемее и создаёт новый инфраструктурный слой.",
        "en_card": "How consistent application packaging reduces environment differences, makes releases more predictable, and adds a new infrastructure layer.",
        "ru_body": [
            ("Какую проблему мы решаем", ["Приложение редко состоит только из собственного кода. Ему нужны библиотеки, runtime, системные зависимости и конкретные настройки. Если каждая среда собирается отдельно, появляются знакомые проблемы: на ноутбуке работает, на тесте иначе, в production третья версия зависимости.", "Чем больше команд и сред, тем дороже становится эта непредсказуемость."]),
            ("Как работают контейнеры", ["Контейнер упаковывает приложение вместе с большей частью его runtime-зависимостей в образ. Один и тот же образ можно продвигать через тестовые и production-среды, меняя конфигурацию снаружи.", "Контейнеры не равны Kubernetes. Контейнер — способ упаковки и запуска. Kubernetes и другие оркестраторы решают уже следующую задачу: как управлять большим количеством контейнеров."]),
            ("Что получает бизнес", ["Бизнес получает более предсказуемый путь от изменения к production. Меньше времени уходит на разницу между окружениями и ручную подготовку серверов.", "Новые среды и сервисы проще воспроизводить, поэтому запуск продукта, региона или временного стенда меньше зависит от уникальной ручной настройки.", "Контейнеры также уменьшают часть инфраструктурной привязки, но не дают автоматической независимости от cloud-провайдера: базы, сети и управляемые сервисы всё равно могут оставаться специфичными."]),
            ("Что получает команда", ["Команда получает единый артефакт релиза, локально воспроизводимую среду и более понятную границу между приложением и инфраструктурой.", "Зависимости описываются явнее, а обновление runtime можно тестировать как изменение образа, а не как ручную операцию на серверах."]),
            ("Что получает клиент", ["Клиент получает косвенный эффект: меньше ошибок из-за различий окружений и более стабильные релизы. Исправления проще доставлять одинаковым способом во все экземпляры приложения."]),
            ("Чем мы за это платим", ["Появляется новый слой: сборка образов, registry, сканирование уязвимостей, управление версиями и runtime контейнеров.", "Плохой Dockerfile или небезопасный базовый образ просто стандартизирует проблему. А если поверх контейнеров слишком рано добавить сложную оркестрацию, инфраструктурная цена может превысить пользу."]),
            ("Когда не нужно усложнять", ["Для одного простого приложения на стабильной платформе контейнеризация может не окупить переход. Особенно если существующий deployment уже воспроизводим и редко меняется.", "Ценность растёт вместе с количеством сервисов, сред, команд и частотой релизов."]),
            ("Что стоит спросить перед решением", ["Какие проблемы окружений мы реально пытаемся убрать?", "Нужен ли нам только контейнерный формат или уже оркестратор?", "Кто отвечает за базовые образы и их обновление?", "Как будем сканировать и подписывать образы?", "Какая часть portability действительно важна бизнесу?"]),
            ("В итоге", ["Контейнеры полезны не потому, что они современнее виртуальных машин. Они уменьшают число уникальных способов собрать и запустить одно и то же приложение.", "<strong>Для бизнеса контейнер — это прежде всего более дешёвая воспроизводимость изменений, а уже потом основа для масштабной cloud-платформы.</strong>"])
        ],
        "en_body": [
            ("What problem are we solving?", ["An application is rarely just its own code. It depends on libraries, a runtime, system packages, and configuration. If every environment is assembled independently, familiar failures appear: it works on a laptop, differently in test, and production has another dependency version.", "The more teams and environments exist, the more expensive that unpredictability becomes."]),
            ("How containers work", ["A container packages the application with most of its runtime dependencies into an image. The same image can move through test and production environments while configuration is supplied externally.", "Containers are not the same thing as Kubernetes. A container is a packaging and runtime boundary. Kubernetes and other orchestrators solve the next problem: managing many containers."]),
            ("What the business gets", ["The business gets a more predictable path from change to production. Less time is lost to environment differences and manual server preparation.", "New environments and services become easier to reproduce, so launching a product, region, or temporary environment depends less on unique manual setup.", "Containers can reduce some infrastructure coupling, but they do not automatically create cloud independence: databases, networking, and managed services may still be provider-specific."]),
            ("What the team gets", ["The team gets one release artifact, a more reproducible local environment, and a clearer boundary between application and infrastructure.", "Dependencies become more explicit, and runtime upgrades can be tested as image changes rather than manual server operations."]),
            ("What the customer gets", ["Customers get an indirect benefit: fewer environment-specific failures and more consistent releases. Fixes can be delivered through the same mechanism to every application instance."]),
            ("What do we pay for it?", ["A new layer appears: image builds, registries, vulnerability scanning, version management, and container runtime operations.", "A poor Dockerfile or insecure base image simply standardizes the problem. And adding complex orchestration too early can cost more than containers save."]),
            ("When not to add the complexity", ["For one simple application on a stable platform, containerization may not repay the transition cost, especially when deployment is already reproducible and changes rarely.", "The value grows with the number of services, environments, teams, and releases."]),
            ("What should we ask before deciding?", ["Which environment problems are we actually trying to remove?", "Do we need only container packaging or an orchestrator too?", "Who owns base images and updates?", "How will images be scanned and signed?", "How much portability does the business really need?"]),
            ("In the end", ["Containers are useful not because they are more modern than virtual machines, but because they reduce the number of unique ways to build and run the same application.", "<strong>For the business, a container is first a cheaper way to reproduce change — and only then a foundation for a large cloud platform.</strong>"])
        ]
    },
    {
        "slug": "ai-observability-business",
        "section": "ai",
        "ru_title": "AI Observability: почему для AI недостаточно знать, что запрос завершился успешно",
        "en_title": "AI Observability: Why a Successful Request Is Not Enough for AI",
        "ru_desc": "Как наблюдать AI-продукт в production через качество, стоимость, latency, retrieval, tool calls и guardrails, а не только через HTTP-ошибки и uptime.",
        "en_desc": "How to observe an AI product in production through quality, cost, latency, retrieval, tool calls, and guardrails instead of only HTTP errors and uptime.",
        "ru_summary": "Обычный сервис может вернуть 200 OK и действительно выполнить задачу. AI тоже может вернуть 200 OK — и при этом дать бесполезный, дорогой или рискованный ответ. Поэтому production-наблюдаемость для AI должна видеть больше, чем технический успех запроса.",
        "en_summary": "A conventional service can return 200 OK and genuinely complete the task. AI can return 200 OK and still produce a useless, expensive, or risky answer. Production observability for AI must see more than technical request success.",
        "ru_card": "Как видеть качество, стоимость и причины деградации AI в production, когда HTTP 200 ещё не означает успешный результат для клиента.",
        "en_card": "How to see AI quality, cost, and degradation causes in production when HTTP 200 still does not mean customer success.",
        "ru_body": [
            ("Какую проблему мы решаем", ["В обычной системе технические метрики часто хорошо показывают проблему: ошибки выросли, latency ухудшилась, база недоступна. В AI-продукте запрос может технически завершиться успешно, но ответ стать хуже после смены модели, prompt, retrieval или данных.", "Если измерять только uptime, такая деградация останется невидимой до жалоб клиентов."]),
            ("Как работает AI Observability", ["AI Observability связывает технический запрос с контекстом его выполнения: какая модель и версия использовались, какой prompt был собран, какие документы вернул retrieval, какие инструменты вызвал агент, сколько токенов и времени потрачено, сработали ли guardrails и какой feedback пришёл после ответа.", "Важно не превращать telemetry в утечку данных. Чувствительные prompts, документы и персональные данные требуют фильтрации, маскирования и ограниченного доступа.", "AI Observability отличается от AI Evaluation: evals проверяют качество на подготовленных наборах и экспериментах, observability показывает, что реально происходит с production-трафиком."]),
            ("Что получает бизнес", ["Бизнес получает видимость качества вместе со стоимостью. Можно увидеть, что новая модель стала немного лучше, но вдвое дороже для конкретного сценария — или что расходы выросли из-за неожиданно длинного контекста.", "Быстрее обнаруживаются продуктовые регрессии, которые не выглядят как инфраструктурная авария: рост отказов guardrail, ухудшение retrieval, увеличение fallback или падение пользовательской оценки.", "Это позволяет управлять AI как операционным продуктом, а не как чёрным ящиком поставщика."]),
            ("Что получает команда", ["Команда получает возможность разбирать конкретный путь ответа: prompt, retrieval, model routing, tool calls, retries и итоговый результат.", "Это уменьшает количество споров в стиле «модель иногда странно отвечает» и превращает проблему в набор наблюдаемых сигналов, которые можно сравнивать между версиями."]),
            ("Что получает клиент", ["Клиент получает более стабильное качество. Команда быстрее замечает тихие регрессии и может откатить prompt, модель или retrieval-настройку до того, как проблема станет массовой."]),
            ("Чем мы за это платим", ["Telemetry для AI быстро становится объёмной и дорогой. Трейсы могут содержать prompts, документы, tool calls и ответы моделей, поэтому хранение и доступ требуют отдельной политики безопасности.", "Есть риск собирать всё подряд и утонуть в данных. Наблюдаемость полезна только когда сигналы связаны с конкретными решениями и бизнес-метриками."]),
            ("Когда не нужно усложнять", ["Для небольшого внутреннего эксперимента достаточно базовых логов, стоимости и ручного feedback. Полноценная AI-observability платформа может быть преждевременной.", "Она становится важной, когда AI участвует в клиентском процессе, использует несколько моделей или инструментов и его качество влияет на деньги, риск или доверие."]),
            ("Что стоит спросить перед решением", ["Какие признаки означают, что AI-сценарий реально стал хуже?", "Нужно ли хранить полный prompt или достаточно безопасных атрибутов?", "Как связать стоимость запроса с бизнес-результатом?", "Какие изменения модели, prompt и retrieval нужно уметь сравнивать?", "Как быстро мы заметим рост fallback, guardrail или плохого feedback?"]),
            ("В итоге", ["Для AI технически успешный запрос — только начало ответа на вопрос о качестве системы.", "<strong>Для бизнеса AI Observability означает видеть не только доступность модели, но и то, какую ценность, стоимость и риск она реально создаёт в production.</strong>"])
        ],
        "en_body": [
            ("What problem are we solving?", ["In conventional systems, technical metrics often reveal the problem clearly: errors rise, latency worsens, or a database is unavailable. In an AI product, a request can complete successfully while answer quality degrades after a model, prompt, retrieval, or data change.", "If we observe only uptime, that degradation stays invisible until customers complain."]),
            ("How AI Observability works", ["AI Observability connects a technical request with execution context: which model and version ran, which prompt was assembled, what retrieval returned, which tools an agent called, how many tokens and how much time were spent, whether guardrails triggered, and what feedback arrived after the answer.", "Telemetry must not become a data leak. Sensitive prompts, documents, and personal data need filtering, masking, retention rules, and restricted access.", "AI Observability is different from AI Evaluation: evals test quality on prepared datasets and experiments, while observability shows what is happening on real production traffic."]),
            ("What the business gets", ["The business sees quality together with cost. It becomes possible to notice that a new model is slightly better but far more expensive for a specific scenario, or that spend increased because context became unexpectedly long.", "Product regressions that do not look like infrastructure outages become visible sooner: more guardrail blocks, worse retrieval, rising fallback, or falling user feedback.", "That makes AI an operational product that can be managed rather than a black box provided by a vendor."]),
            ("What the team gets", ["The team can inspect the actual path of an answer: prompt, retrieval, model routing, tool calls, retries, and final result.", "That replaces vague debates like 'the model sometimes answers strangely' with observable signals that can be compared across versions."]),
            ("What the customer gets", ["Customers get more stable quality. The team can detect quiet regressions and roll back a prompt, model, or retrieval change before the problem becomes widespread."]),
            ("What do we pay for it?", ["AI telemetry can become large and expensive quickly. Traces may contain prompts, documents, tool calls, and model outputs, so storage and access need dedicated security policies.", "There is also a risk of collecting everything and learning nothing. Observability is useful only when signals connect to concrete decisions and business outcomes."]),
            ("When not to add the complexity", ["For a small internal experiment, basic logs, cost tracking, and manual feedback may be enough. A full AI observability platform can be premature.", "It becomes important when AI participates in a customer process, uses multiple models or tools, and its quality affects money, risk, or trust."]),
            ("What should we ask before deciding?", ["Which signals mean the AI scenario actually became worse?", "Do we need full prompts or only safe attributes?", "How will we connect request cost with business outcome?", "Which model, prompt, and retrieval changes must be comparable?", "How quickly will we notice rising fallback, guardrail blocks, or poor feedback?"]),
            ("In the end", ["For AI, a technically successful request is only the beginning of understanding system quality.", "<strong>For the business, AI Observability means seeing not only model availability, but the value, cost, and risk it actually creates in production.</strong>"])
        ]
    },
]


def body_html(sections):
    out = []
    for heading, parts in sections:
        out.append(f"<h2>{heading}</h2>")
        if heading in ("Что стоит спросить перед решением", "What should we ask before deciding?"):
            out.append("<ul>" + "".join(f"<li>{x}</li>" for x in parts) + "</ul>")
        else:
            out.extend(f"<p>{x}</p>" for x in parts)
    return "\n".join(out)


def article_html(a, lang):
    ru = lang == "ru"
    title = a["ru_title" if ru else "en_title"]
    desc = a["ru_desc" if ru else "en_desc"]
    summary = a["ru_summary" if ru else "en_summary"]
    body = body_html(a["ru_body" if ru else "en_body"])
    canonical = f"https://kurakin-anton.ru/{lang}/articles/{a['slug']}.html"
    other_lang = "en" if ru else "ru"
    other = f"https://kurakin-anton.ru/{other_lang}/articles/{a['slug']}.html"
    author = "Антон Куракин" if ru else "Anton Kurakin"
    title_tag = f"{title} - {author}"
    section_labels = {"domain": ("Домены и команды", "Domains & teams"), "legacy": ("Legacy и миграции", "Legacy & migration"), "cloud": ("Cloud и инфраструктура", "Cloud & infrastructure"), "ai": ("AI-архитектура", "AI architecture")}
    label = section_labels[a["section"]][0 if ru else 1]
    home = "../../index.html" if ru else "../../en/index.html"
    projects = "../../projects.html" if ru else "../projects.html"
    experience = "../../experience.html" if ru else "../experience.html"
    contact = home + "#contact"
    other_rel = f"../../{other_lang}/articles/{a['slug']}.html"
    jsonld = json.dumps({"@context":"https://schema.org","@type":"Article","headline":title,"description":desc,"inLanguage":lang,"datePublished":DATE,"dateModified":DATE,"mainEntityOfPage":{"@type":"WebPage","@id":canonical},"author":{"@type":"Person","name":author,"url":AUTHOR_URL},"image":IMAGE}, ensure_ascii=False, separators=(",", ":"))
    if ru:
        nav = f'<a href="{home}">Главная</a><a href="{projects}">Проекты</a><a href="{experience}">О себе</a><a href="index.html">Статьи</a><a href="../architecture/index.html">Архитектура</a><a href="{contact}">Контакты</a>'
        switch = f'<a href="{a["slug"]}.html" aria-current="page">RU</a><a href="{other_rel}">EN</a>'
        skip = "Перейти к содержанию"; read = "5 мин чтения"; footer = "ИТ-архитектура для всех"; brand = "Антон Куракин"
    else:
        nav = f'<a href="{home}">Home</a><a href="{projects}">Projects</a><a href="{experience}">About</a><a href="index.html">Writing</a><a href="../architecture/index.html">Architecture</a><a href="{contact}">Contact</a>'
        switch = f'<a href="{other_rel}">RU</a><a href="{a["slug"]}.html" aria-current="page">EN</a>'
        skip = "Skip to content"; read = "5 min read"; footer = "IT Architecture for Everyone"; brand = "Anton Kurakin"
    return f'''<!doctype html>
<html lang="{lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="{desc}">
  <meta name="author" content="{author}">
  <meta name="color-scheme" content="light">
  <meta property="og:type" content="article">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{summary}">
  <meta property="og:url" content="{canonical}">
  <meta property="og:image" content="{IMAGE}">
  <meta property="article:published_time" content="{DATE}">
  <meta property="article:modified_time" content="{DATE}">
  <title>{title_tag}</title>
  <link rel="canonical" href="{canonical}">
  <link rel="alternate" hreflang="ru" href="https://kurakin-anton.ru/ru/articles/{a['slug']}.html">
  <link rel="alternate" hreflang="en" href="https://kurakin-anton.ru/en/articles/{a['slug']}.html">
  <script type="application/ld+json">{jsonld}</script>
  <link rel="icon" href="../../assets/img/logo-icon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="../../assets/styles.css">
</head>
<body data-page="article" data-lang="{lang}">
<a class="skip-link" href="#main">{skip}</a>
<header class="site-header"><a class="brand" href="{home}" aria-label="{brand}"><img class="brand-logo" src="../../assets/img/logo-icon.svg" alt="" width="42" height="42"><span class="brand-text">{brand}</span></a><nav class="site-nav" aria-label="{'Основная навигация' if ru else 'Main navigation'}">{nav}</nav><div class="lang-switcher" aria-label="{'Выбор языка' if ru else 'Language selection'}">{switch}</div></header>
<main class="article-page" id="main"><header class="article-hero"><div class="article-hero-copy"><a class="article-back-link" href="../architecture/index.html#{a['section']}">{label}</a><p class="article-kicker"><span>{read}</span></p><h1>{title}</h1><p class="article-summary">{summary}</p></div></header>
<article class="article-content">
{body}
</article></main>
<footer class="site-footer"><p>© 2026 {author}.</p><a href="../architecture/index.html">{footer}</a></footer>
</body></html>'''

for a in articles:
    for lang in ("ru", "en"):
        p = Path(lang) / "articles" / f"{a['slug']}.html"
        if p.exists():
            raise SystemExit(f"Refusing to overwrite existing {p}")
        p.write_text(article_html(a, lang), encoding="utf-8")


def card(a, lang):
    ru = lang == "ru"
    title = a["ru_title" if ru else "en_title"]
    desc = a["ru_card" if ru else "en_card"]
    source = "Архитектура · статья" if ru else "Architecture · article"
    time = "5 мин" if ru else "5 min"
    versions_label = "Доступные языковые версии" if ru else "Available language versions"
    if ru:
        versions = f'<a href="../articles/{a["slug"]}.html" aria-current="true">RU</a><a href="../../en/articles/{a["slug"]}.html">EN</a>'
    else:
        versions = f'<a href="../../ru/articles/{a["slug"]}.html">RU</a><a href="../articles/{a["slug"]}.html" aria-current="true">EN</a>'
    return f'<article class="publication-item"><div class="publication-meta"><span>{time}</span></div><div class="publication-copy"><p class="publication-source">{source}</p><h3><a href="../articles/{a["slug"]}.html">{title}</a></h3><p>{desc}</p></div><nav class="publication-versions" aria-label="{versions_label}">{versions}</nav></article>'


def insert_card(text, section_id, card_html):
    if card_html in text:
        return text
    slug_marker = card_html.split('href="../articles/',1)[1].split('.html',1)[0]
    if slug_marker + ".html" in text:
        return text
    start_marker = f"<section class='architecture-category' id='{section_id}'>"
    start = text.find(start_marker)
    if start < 0:
        start_marker = f'<section class="architecture-category" id="{section_id}">'
        start = text.find(start_marker)
    if start < 0:
        raise SystemExit(f"section {section_id} not found")
    next_single = text.find("<section class='architecture-category' id='", start + len(start_marker))
    next_double = text.find('<section class="architecture-category" id="', start + len(start_marker))
    candidates = [x for x in (next_single, next_double) if x >= 0]
    end = min(candidates) if candidates else text.find("</main>", start)
    segment = text[start:end]
    close = segment.rfind("</div></section>")
    if close < 0:
        raise SystemExit(f"publication close for {section_id} not found")
    pos = start + close
    return text[:pos] + card_html + text[pos:]

for lang in ("ru", "en"):
    index_path = Path(lang) / "architecture" / "index.html"
    text = index_path.read_text(encoding="utf-8")
    for a in articles:
        text = insert_card(text, a["section"], card(a, lang))
    index_path.write_text(text, encoding="utf-8")

sitemap_path = Path("sitemap-architecture.xml")
sitemap = sitemap_path.read_text(encoding="utf-8")
for a in articles:
    for lang in ("ru", "en"):
        url = f"https://kurakin.pro/{lang}/articles/{a['slug']}.html"
        if url not in sitemap:
            sitemap = sitemap.replace("</urlset>", f"<url><loc>{url}</loc></url></urlset>")
sitemap_path.write_text(sitemap, encoding="utf-8")

# Sanity checks
for a in articles:
    for lang in ("ru", "en"):
        p = Path(lang) / "articles" / f"{a['slug']}.html"
        text = p.read_text(encoding="utf-8")
        assert text.count("<h1>") == 1
        assert '<img class="brand-logo"' in text
        assert '<article class="article-content">' in text
        assert "<time" not in text
        assert f"https://kurakin-anton.ru/{lang}/articles/{a['slug']}.html" in text
        assert f"https://kurakin-anton.ru/{'en' if lang == 'ru' else 'ru'}/articles/{a['slug']}.html" in text
    assert f"https://kurakin.pro/ru/articles/{a['slug']}.html" in sitemap
    assert f"https://kurakin.pro/en/articles/{a['slug']}.html" in sitemap

print("Architecture batch 16 generated and validated")
