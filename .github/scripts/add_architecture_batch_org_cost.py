from pathlib import Path

DATE = "2026-08-12"
ROOT = Path('.')


def article_html(lang, slug, title, description, og_description, summary, category, anchor, paragraphs, questions, conclusion):
    is_ru = lang == 'ru'
    author = 'Антон Куракин' if is_ru else 'Anton Kurakin'
    home = '../../index.html' if is_ru else '../../en/index.html'
    projects = '../../projects.html' if is_ru else '../projects.html'
    experience = '../../experience.html' if is_ru else '../experience.html'
    contact = '../../index.html#contact' if is_ru else '../../en/index.html#contact'
    articles_label = 'Статьи' if is_ru else 'Writing'
    architecture_label = 'Архитектура' if is_ru else 'Architecture'
    nav_home = 'Главная' if is_ru else 'Home'
    nav_projects = 'Проекты' if is_ru else 'Projects'
    nav_about = 'О себе' if is_ru else 'About'
    nav_contact = 'Контакты' if is_ru else 'Contact'
    skip = 'Перейти к содержанию' if is_ru else 'Skip to content'
    read = '5 мин чтения' if is_ru else '5 min read'
    lang_label = 'Выбор языка' if is_ru else 'Language selection'
    main_nav = 'Основная навигация' if is_ru else 'Main navigation'
    available_footer = 'ИТ-архитектура для всех' if is_ru else 'IT Architecture for Everyone'
    canonical = f'https://kurakin-anton.ru/{lang}/articles/{slug}.html'
    ru_url = f'https://kurakin-anton.ru/ru/articles/{slug}.html'
    en_url = f'https://kurakin-anton.ru/en/articles/{slug}.html'
    if is_ru:
        switch = f'<a href="{slug}.html" aria-current="page">RU</a><a href="../../en/articles/{slug}.html">EN</a>'
        title_tag = f'{title} - Антон Куракин'
    else:
        switch = f'<a href="../../ru/articles/{slug}.html">RU</a><a href="{slug}.html" aria-current="page">EN</a>'
        title_tag = f'{title} - Anton Kurakin'
    body = []
    for heading, ps in paragraphs:
        body.append(f'<h2>{heading}</h2>')
        for p in ps:
            body.append(f'<p>{p}</p>')
    q_items = ''.join(f'<li>{q}</li>' for q in questions)
    body.append(f'<h2>{"Что стоит спросить перед решением" if is_ru else "What to ask before deciding"}</h2><ul>{q_items}</ul>')
    body.append(f'<h2>{"В итоге" if is_ru else "In the end"}</h2><p>{conclusion[0]}</p><p><strong>{conclusion[1]}</strong></p>')
    return f'''<!doctype html>
<html lang="{lang}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="{description}">
    <meta name="author" content="{author}">
    <meta name="color-scheme" content="light">
    <meta property="og:type" content="article">
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{og_description}">
    <meta property="og:url" content="{canonical}">
    <meta property="og:image" content="https://kurakin-anton.ru/assets/img/article-notes.png">
    <meta property="article:published_time" content="{DATE}">
    <meta property="article:modified_time" content="{DATE}">
    <title>{title_tag}</title>
    <link rel="canonical" href="{canonical}">
    <link rel="alternate" hreflang="ru" href="{ru_url}">
    <link rel="alternate" hreflang="en" href="{en_url}">
    <script type="application/ld+json">{{"@context":"https://schema.org","@type":"Article","headline":"{title}","description":"{description}","inLanguage":"{lang}","datePublished":"{DATE}","dateModified":"{DATE}","mainEntityOfPage":{{"@type":"WebPage","@id":"{canonical}"}},"author":{{"@type":"Person","name":"{author}","url":"https://kurakin-anton.ru/"}},"image":"https://kurakin-anton.ru/assets/img/article-notes.png"}}</script>
    <link rel="icon" href="../../assets/img/logo-icon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="../../assets/styles.css">
  </head>
  <body data-page="article" data-lang="{lang}">
    <a class="skip-link" href="#main">{skip}</a>
    <header class="site-header">
      <a class="brand" href="{home}" aria-label="{author}"><img class="brand-logo" src="../../assets/img/logo-icon.svg" alt="" width="42" height="42"><span class="brand-text">{author}</span></a>
      <nav class="site-nav" aria-label="{main_nav}"><a href="{home}">{nav_home}</a><a href="{projects}">{nav_projects}</a><a href="{experience}">{nav_about}</a><a href="index.html">{articles_label}</a><a href="../architecture/index.html">{architecture_label}</a><a href="{contact}">{nav_contact}</a></nav>
      <div class="lang-switcher" aria-label="{lang_label}">{switch}</div>
    </header>
    <main class="article-page" id="main">
      <header class="article-hero"><div class="article-hero-copy"><a class="article-back-link" href="../architecture/index.html#{anchor}">{category}</a><p class="article-kicker"><span>{read}</span></p><h1>{title}</h1><p class="article-summary">{summary}</p></div></header>
      <article class="article-content">
        {''.join(body)}
      </article>
    </main>
    <footer class="site-footer"><p>© 2026 {author}.</p><a href="../architecture/index.html">{available_footer}</a></footer>
  </body>
</html>'''


ARTICLES = [
    {
        'slug': 'team-topologies-business', 'anchor': 'domain',
        'ru': {
            'title': 'Team Topologies: почему структура взаимодействия команд становится частью архитектуры',
            'description': 'Как способы взаимодействия между командами влияют на архитектуру, скорость изменений и стоимость координации — и почему организационную модель нельзя отделить от технических границ.',
            'og': 'Архитектура наследует способы взаимодействия команд. Team Topologies помогает сделать эти взаимодействия явными и уменьшить постоянную координацию.',
            'summary': 'Можно нарисовать идеальные границы сервисов, но если для каждого изменения нужны пять команд и три согласования, архитектура всё равно останется связанной. Team Topologies предлагает смотреть на устройство систем вместе с устройством взаимодействия людей.',
            'category': 'Домены и команды',
            'sections': [
                ('Какую проблему мы решаем', ['Рост компании часто увеличивает не только количество людей, но и количество зависимостей. Команда может формально владеть сервисом, но фактически ждать платформу, data-команду, безопасность и соседний домен для каждого релиза.', 'В такой ситуации локальная оптимизация кода мало помогает. Узким местом становится поток взаимодействий между командами.']),
                ('Как работает подход', ['Team Topologies предлагает не считать любую команду одинаковой единицей. Есть команды, ориентированные на поток ценности, платформенные команды, специалисты сложных подсистем и команды, которые временно помогают другим освоить новую область.', 'Не менее важны режимы взаимодействия: где нужен долгий совместный труд, где достаточно сервиса с ясным контрактом, а где сотрудничество должно быть временным и закончиться передачей знаний.']),
                ('Что получает бизнес', ['Главный эффект — снижение стоимости координации. Если продуктовая команда может провести изменение от идеи до продакшена без постоянной очереди к другим подразделениям, time-to-market становится предсказуемее.', 'Организация также получает более понятные точки масштабирования: вместо бесконечного расширения центральных функций можно инвестировать в платформы и границы ответственности там, где зависимость повторяется у многих команд.']),
                ('Что получает команда', ['Команда лучше понимает, за какой поток ценности отвечает и какие зависимости являются нормальными, а какие — организационным долгом. Появляется возможность проектировать API, платформенные возможности и ownership вокруг реальных взаимодействий.', 'Это не отменяет сотрудничество. Цель — убрать постоянную обязательную координацию там, где она не создаёт ценности.']),
                ('Что получает клиент', ['Клиент редко видит организационную структуру напрямую, но чувствует её последствия. Чем меньше ненужных зависимостей между командами, тем быстрее исправляются проблемы и появляются изменения, затрагивающие конкретный продукт.']),
                ('Чем мы за это платим', ['Нужно менять не только схему сервисов, но иногда и зоны ответственности людей. Это политически и организационно сложнее, чем нарисовать новую архитектурную диаграмму.', 'Есть риск превратить модель в новую догму: переименовать команды, не изменив их полномочия, зависимости и реальные способы работы.']),
                ('Когда не нужно', ['Маленькой компании с несколькими командами не требуется сложная типология. Если люди и так быстро договариваются, формализация может стоить дороже проблемы.', 'Подход становится полезен, когда координация заметно замедляет продукт, ownership размыт, а центральные команды превращаются в постоянные очереди.'])],
            'questions': ['Какие зависимости между командами повторяются при каждом изменении?', 'Где продуктовая команда не может завершить работу самостоятельно?', 'Какие общие возможности стоит превратить в платформенный сервис?', 'Какие взаимодействия должны быть постоянными, а какие — временными?', 'Совпадают ли границы ответственности команд с границами систем?'],
            'conclusion': ('Архитектура компании складывается не только из сервисов и баз данных. Она складывается ещё и из того, кому для изменения приходится с кем договариваться.', 'Для бизнеса Team Topologies полезен тогда, когда помогает уменьшить постоянную стоимость координации и сделать скорость изменений свойством организации, а не героизмом отдельных людей.')
        },
        'en': {
            'title': 'Team Topologies: Why Team Interaction Structure Becomes Part of the Architecture',
            'description': 'How team interaction patterns shape architecture, delivery speed, and coordination cost — and why organization design cannot be separated from technical boundaries.',
            'og': 'Architecture inherits the way teams interact. Team Topologies makes those interactions explicit and helps reduce permanent coordination overhead.',
            'summary': 'You can draw perfect service boundaries, but if every change still needs five teams and three approvals, the architecture remains coupled. Team Topologies looks at system design together with the way people interact.',
            'category': 'Domains and teams',
            'sections': [
                ('What problem are we solving?', ['Company growth often increases not only headcount but dependencies. A team may formally own a service while still waiting on platform, data, security, and neighboring domain teams for every release.', 'At that point, local code improvements do little. The bottleneck is the flow of interactions between teams.']),
                ('How the approach works', ['Team Topologies does not treat every team as the same unit. It distinguishes stream-aligned teams, platform teams, complicated-subsystem teams, and enabling teams that temporarily help others build capability.', 'Interaction modes matter just as much: some work needs close collaboration, some should be delivered as a service with a clear contract, and some collaboration should end once knowledge has transferred.']),
                ('What the business gets', ['The main benefit is lower coordination cost. When a product team can move a change from idea to production without joining a permanent queue across several departments, time-to-market becomes more predictable.', 'The organization also gains clearer scaling options. Instead of endlessly growing central functions, it can invest in platforms and ownership boundaries where the same dependency affects many teams.']),
                ('What the team gets', ['Teams get a clearer view of the value stream they own and which dependencies are necessary versus organizational debt. APIs, platform capabilities, and ownership can be designed around real interaction patterns.', 'This does not remove collaboration. The goal is to remove mandatory coordination where it does not create value.']),
                ('What the customer gets', ['Customers rarely see the organization chart, but they feel its consequences. Fewer unnecessary team dependencies usually mean faster fixes and more predictable product changes.']),
                ('What we pay for', ['This may require changing responsibilities, not just service diagrams. Organizational boundaries are politically and operationally harder to move than boxes on an architecture chart.', 'There is also a risk of turning the model into a new ritual: renaming teams without changing authority, dependencies, or the actual way work flows.']),
                ('When it is not needed', ['A small company with a few teams may not need a formal topology. If people already coordinate quickly, the model can cost more than the problem.', 'It becomes useful when coordination visibly slows delivery, ownership is unclear, and central teams have become permanent queues.'])],
            'questions': ['Which team dependencies repeat for almost every change?', 'Where can a product team not finish work independently?', 'Which shared capabilities should become platform services?', 'Which interactions should be permanent and which temporary?', 'Do team ownership boundaries match system boundaries?'],
            'conclusion': ('Company architecture is made not only of services and databases. It is also made of who must coordinate with whom to change them.', 'For the business, Team Topologies is valuable when it reduces permanent coordination cost and makes delivery speed a property of the organization rather than individual heroics.')
        }
    },
    {
        'slug': 'expand-contract-migration', 'anchor': 'legacy',
        'ru': {
            'title': 'Expand–Contract: как менять схему данных без общего дня переключения',
            'description': 'Как Expand–Contract помогает безопасно менять схемы данных и контракты: сначала добавить новое, затем перевести потребителей и только потом удалить старое.',
            'og': 'Expand–Contract заменяет большой день миграции последовательностью совместимых шагов и снижает риск синхронного переключения множества систем.',
            'summary': 'Опасные миграции часто требуют, чтобы база, сервисы и клиенты обновились одновременно. Expand–Contract разбивает такое изменение на совместимые этапы: сначала расширить систему, потом перевести потребителей и только после этого удалить старое.',
            'category': 'Legacy и миграции',
            'sections': [
                ('Какую проблему мы решаем', ['Чем больше потребителей у таблицы, события или API, тем опаснее изменение, которое ломает старый формат. Если новая колонка, новое имя поля или новая структура требуют общего переключения, релиз превращается в организационную операцию.', 'Проблема не в самой миграции, а в необходимости синхронизировать слишком много независимых частей в один момент.']),
                ('Как работает Expand–Contract', ['На этапе expand система становится совместимой и со старым, и с новым способом работы. Добавляется новое поле, новый контракт или новая структура, но старое ещё остаётся доступным.', 'Затем потребители постепенно переходят на новый вариант. Только когда старый путь действительно больше не используется, начинается contract: старую структуру удаляют.', 'Вместо одного большого риска появляется несколько меньших шагов, каждый из которых можно наблюдать и при необходимости остановить.']),
                ('Что получает бизнес', ['Главная выгода — меньше релизов, требующих общей даты и большого количества координации. Команды могут мигрировать в своём темпе, а критическое изменение не обязано становиться событием для всей компании.', 'Снижается риск простоя из-за несовместимости и легче откатывать отдельные шаги. Это особенно ценно в системах, где вынужденный synchronized cutover влияет на продажи или операции.']),
                ('Что получает команда', ['Команды получают временное окно совместимости. Можно сначала подготовить инфраструктуру, затем обновить код чтения и записи, после чего безопасно убрать старый путь.', 'Но появляется дисциплина: нужно отслеживать использование старого контракта, не забывать завершать миграцию и явно управлять переходным состоянием.']),
                ('Что получает клиент', ['Клиент получает меньше технических окон и меньше ситуаций, когда все должны обновиться одновременно. Для внешних интеграций это означает возможность мигрировать по согласованному периоду, а не в одну ночь.']),
                ('Чем мы за это платим', ['Во время перехода система сложнее: некоторое время существуют два поля, два формата или два пути обработки. Нужно поддерживать совместимость, тестировать оба варианта и следить, чтобы данные не расходились.', 'Если contract постоянно откладывать, временная совместимость превращается в постоянный legacy.']),
                ('Когда не нужно', ['Если изменение полностью локально и имеет одного контролируемого потребителя, многоэтапная миграция может быть избыточной. Иногда простой атомарный change действительно дешевле.', 'Подход нужен там, где невозможно или слишком рискованно обновить всех потребителей одновременно.'])],
            'questions': ['Сколько независимых потребителей затрагивает изменение?', 'Можно ли некоторое время поддерживать старый и новый формат одновременно?', 'Как поймём, что старый путь больше никто не использует?', 'Что будет источником истины во время переходного периода?', 'Кто отвечает за завершение contract-этапа?'],
            'conclusion': ('Expand–Contract не делает миграцию бесплатной. Он меняет форму риска: вместо одного большого переключения компания оплачивает временную совместимость.', 'Для бизнеса это часто выгодный обмен — немного больше технической работы сегодня ради отсутствия общего дня, когда ошибка может остановить сразу всех.')
        },
        'en': {
            'title': 'Expand–Contract: How to Change a Data Schema Without One Shared Cutover Day',
            'description': 'How Expand–Contract makes schema and contract changes safer: add the new form first, migrate consumers gradually, and remove the old form only when it is unused.',
            'og': 'Expand–Contract replaces a big-bang migration with compatible steps and reduces the risk of synchronizing many systems in one cutover.',
            'summary': 'Dangerous migrations often require databases, services, and clients to switch at the same time. Expand–Contract turns that into compatible stages: expand first, migrate consumers, then remove the old path.',
            'category': 'Legacy and migration',
            'sections': [
                ('What problem are we solving?', ['The more consumers a table, event, or API has, the more dangerous a breaking change becomes. If a renamed field or new structure requires one coordinated switch, the release becomes an organizational operation.', 'The core problem is not the migration itself. It is the need to synchronize too many independent parts at one moment.']),
                ('How Expand–Contract works', ['During expand, the system supports both the old and new ways of working. A new field, contract, or structure is introduced while the old one remains available.', 'Consumers then move gradually. Only after the old path is truly unused does contract begin and the obsolete structure is removed.', 'One large risk becomes several smaller observable steps that can be paused independently.']),
                ('What the business gets', ['The main benefit is fewer releases that require one shared date and heavy coordination. Teams can migrate on their own cadence, and a critical change does not have to become a company-wide event.', 'Downtime risk from incompatibility falls and individual steps are easier to reverse. That matters when a synchronized cutover can interrupt revenue or operations.']),
                ('What the team gets', ['Teams gain a temporary compatibility window. They can prepare infrastructure, move reads and writes, observe behavior, and remove the old path only after confidence is high.', 'The trade-off is discipline: old-contract usage must be measured, transition states must be tested, and someone must finish the cleanup.']),
                ('What the customer gets', ['Customers see fewer technical windows and fewer forced simultaneous upgrades. External partners can move within an agreed migration period instead of one overnight deadline.']),
                ('What we pay for', ['The system is temporarily more complex. Two fields, formats, or processing paths may exist at once, and both need testing and consistency controls.', 'If the contract phase is repeatedly postponed, temporary compatibility becomes permanent legacy.']),
                ('When it is not needed', ['If the change is local and has one controlled consumer, a staged migration may be unnecessary. Sometimes one atomic change really is cheaper.', 'The pattern becomes valuable when updating every consumer at once is impossible or too risky.'])],
            'questions': ['How many independent consumers does the change affect?', 'Can old and new formats coexist for a period?', 'How will we know the old path is no longer used?', 'What is the source of truth during transition?', 'Who owns completion of the contract phase?'],
            'conclusion': ('Expand–Contract does not make migration free. It changes the shape of the risk: the company pays for temporary compatibility instead of one large cutover.', 'For the business, that is often a good trade — some extra engineering work now in exchange for avoiding a single day when one mistake can break everyone.')
        }
    },
    {
        'slug': 'finops-business', 'anchor': 'cloud',
        'ru': {
            'title': 'FinOps: почему стоимость cloud должна быть видна архитектуре, а не только финансам',
            'description': 'Как FinOps связывает облачные расходы с архитектурными решениями, ownership и ценностью продукта — без превращения оптимизации в механическое сокращение инфраструктуры.',
            'og': 'Cloud-счёт — это след архитектурных решений. FinOps делает стоимость видимой командам и помогает обсуждать цену надёжности, масштаба и скорости.',
            'summary': 'В cloud легко масштабировать ресурсы за минуты — и так же легко превратить архитектурное решение в постоянный расход. FinOps делает стоимость частью инженерной обратной связи, а не неожиданностью в финансовом отчёте в конце месяца.',
            'category': 'Cloud и инфраструктура',
            'sections': [
                ('Какую проблему мы решаем', ['В традиционной инфраструктуре крупные затраты часто согласуются заранее. В cloud команда может увеличить мощности, хранение или трафик без отдельного инвестиционного проекта. Это даёт скорость, но размывает связь между техническим решением и его стоимостью.', 'Когда расходы видит только финансовая функция, инженерная команда получает обратную связь слишком поздно и без контекста.']),
                ('Как работает FinOps', ['FinOps делает стоимость измеряемой на уровне продуктов, команд и технических решений. Речь не только о тегах и дашбордах, а о понятном ownership: кто создаёт расход, какую бизнес-возможность он поддерживает и какие альтернативы существуют.', 'Важна не минимальная стоимость сама по себе. Цель — понимать экономику компромиссов: сколько стоит дополнительная надёжность, запас мощности, быстрый запуск или удобство managed-сервиса.']),
                ('Что получает бизнес', ['Бизнес получает более предсказуемую unit economics цифровых продуктов и меньше сюрпризов при росте нагрузки. Можно видеть, растёт ли инфраструктурная стоимость вместе с выручкой и использованием или быстрее них.', 'Появляется возможность обсуждать архитектурные решения в деньгах: где дорогая избыточность оправдана риском простоя, а где система платит за ресурсы, которые почти не создают ценности.']),
                ('Что получает команда', ['Команда видит стоимость как ещё один эксплуатационный сигнал рядом с latency, error rate и capacity. Это позволяет замечать дорогие паттерны до того, как они закрепились.', 'Но команде нужен контекст. Простое требование «снизить cloud bill на 20%» может подтолкнуть к экономии на надёжности или к ручным ограничениям, которые замедлят продукт.']),
                ('Что получает клиент', ['Клиент редко видит FinOps напрямую. Косвенная выгода — устойчивее экономика продукта: компания меньше вынуждена реагировать на неожиданные расходы резкими ограничениями, деградацией сервиса или заморозкой развития.']),
                ('Чем мы за это платим', ['Нужны качественные данные о расходах, тегирование, распределение общих затрат и договорённости об ownership. В большой платформе часть стоимости неизбежно общая, и распределить её идеально невозможно.', 'Есть и культурный риск: если стоимость превращается в KPI наказания, команды начинают оптимизировать счёт вместо общей ценности продукта.']),
                ('Когда не нужно', ['На ранней стадии небольшого продукта сложная FinOps-практика может быть дороже возможной экономии. Достаточно видеть основные статьи расходов и несколько крупных драйверов.', 'Формализация становится полезной, когда cloud-расходы существенны, распределены между многими командами или растут быстрее бизнеса.'])],
            'questions': ['Какие продукты и команды создают основные cloud-расходы?', 'Какая часть стоимости связана с ростом бизнеса, а какая — с неэффективностью?', 'Сколько мы платим за надёжность и запас мощности?', 'Есть ли у команды обратная связь по стоимости до конца месяца?', 'Какие расходы общие и как их справедливо распределять?'],
            'conclusion': ('FinOps не означает сделать cloud максимально дешёвым. Он означает перестать считать стоимость внешним ограничением, которое существует отдельно от архитектуры.', 'Бизнес выигрывает, когда команда видит цену своих технических решений и может сознательно покупать скорость, надёжность и масштаб — вместо того чтобы обнаруживать их стоимость постфактум.')
        },
        'en': {
            'title': 'FinOps: Why Cloud Cost Should Be Visible to Architecture, Not Only Finance',
            'description': 'How FinOps connects cloud spend with architecture decisions, ownership, and product value without turning optimization into mechanical infrastructure cuts.',
            'og': 'A cloud bill is a trace of architecture decisions. FinOps makes cost visible to teams and turns reliability, scale, and speed into explicit economic trade-offs.',
            'summary': 'Cloud makes it easy to scale resources in minutes — and just as easy to turn an architecture decision into permanent spend. FinOps makes cost part of engineering feedback instead of a surprise at month end.',
            'category': 'Cloud and infrastructure',
            'sections': [
                ('What problem are we solving?', ['In traditional infrastructure, large expenses are often approved in advance. In cloud, a team can increase compute, storage, or traffic without a separate capital project. That creates speed but weakens the link between technical decisions and cost.', 'When only finance sees the spend, engineering receives feedback too late and without enough operational context.']),
                ('How FinOps works', ['FinOps makes cost measurable at the level of products, teams, and technical decisions. It is not only tagging and dashboards; it is ownership: who creates the spend, which business capability it supports, and what alternatives exist.', 'The objective is not minimum cost by itself. The objective is to understand economic trade-offs: what extra reliability, headroom, faster delivery, or a managed service is actually costing.']),
                ('What the business gets', ['The business gets more predictable digital-product economics and fewer surprises as usage grows. It becomes possible to see whether infrastructure cost grows with revenue and adoption or faster than both.', 'Architecture decisions can be discussed in money: where expensive redundancy is justified by outage risk and where the system is paying for resources that create little value.']),
                ('What the team gets', ['Teams see cost as another operational signal alongside latency, errors, and capacity. Expensive patterns can be noticed before they become permanent.', 'But context matters. A blunt target such as “cut the cloud bill by 20%” can push teams to remove useful resilience or introduce manual constraints that slow the product.']),
                ('What the customer gets', ['Customers rarely see FinOps directly. The indirect benefit is a healthier product economy: the company is less likely to respond to surprise costs with sudden limits, degraded service, or frozen development.']),
                ('What we pay for', ['Good cost data, tagging, shared-cost allocation, and clear ownership take work. On a large platform, some cost is inherently shared and cannot be allocated perfectly.', 'There is also a cultural risk: if cost becomes a punishment metric, teams optimize the bill instead of overall product value.']),
                ('When it is not needed', ['For an early small product, a complex FinOps practice can cost more than the savings. Visibility into the main spending categories and a few large drivers may be enough.', 'Formalization becomes valuable when cloud spend is material, distributed across many teams, or growing faster than the business.'])],
            'questions': ['Which products and teams create most cloud spend?', 'Which cost growth comes from business growth and which from inefficiency?', 'How much are we paying for reliability and spare capacity?', 'Do teams see cost feedback before month end?', 'Which costs are shared and how should they be allocated?'],
            'conclusion': ('FinOps does not mean making cloud as cheap as possible. It means stopping the treatment of cost as an external constraint separate from architecture.', 'The business wins when teams can see the price of technical choices and deliberately buy speed, reliability, and scale instead of discovering their cost afterward.')
        }
    },
    {
        'slug': 'model-routing-business', 'anchor': 'ai',
        'ru': {
            'title': 'Model Routing: почему каждый AI-запрос не должен идти в самую дорогую модель',
            'description': 'Как Model Routing помогает выбирать AI-модель по задаче, качеству, стоимости и задержке — и почему маршрутизация требует измеримых правил и fallback-сценариев.',
            'og': 'Разные AI-запросы требуют разного качества. Model Routing позволяет не платить максимальную цену за каждый запрос и сохранять дорогие модели для сложных задач.',
            'summary': 'Если все AI-запросы отправлять в одну самую мощную модель, архитектура проста — а счёт и задержка растут вместе с использованием. Model Routing позволяет выбирать модель по реальной сложности и цене ошибки.',
            'category': 'AI-архитектура',
            'sections': [
                ('Какую проблему мы решаем', ['В одном AI-продукте могут соседствовать простая классификация, извлечение полей, поиск ответа по документам и сложное рассуждение. Требовать для всех этих задач одну и ту же модель — значит платить одинаковую цену за очень разную ценность.', 'Проблема усиливается при росте: небольшая разница в стоимости одного запроса превращается в заметный постоянный расход.']),
                ('Как работает Model Routing', ['Перед вызовом модели система определяет тип задачи и выбирает подходящий маршрут. Простые запросы могут идти в более дешёвую и быструю модель, сложные — в более сильную. При низкой уверенности возможна эскалация или fallback.', 'Маршрутизация может учитывать не только тип запроса, но и язык, размер контекста, требования к latency, чувствительность данных, доступность провайдера и допустимую цену ошибки.']),
                ('Что получает бизнес', ['Главная выгода — возможность масштабировать AI-использование без линейного роста стоимости по максимальному тарифу. Бизнес покупает дорогую модель только там, где её дополнительное качество действительно влияет на результат.', 'Появляется и устойчивость к одному поставщику: если архитектура уже умеет выбирать маршрут, смена модели или fallback при проблемах становится проще.']),
                ('Что получает команда', ['Команда получает отдельный слой принятия решения вместо жёсткой привязки каждого продукта к одной модели. Можно тестировать новые модели, менять правила по результатам evals и постепенно перераспределять трафик.', 'Но routing должен быть наблюдаемым: важно понимать, какой запрос куда ушёл, сколько это стоило и как повлияло на качество.']),
                ('Что получает клиент', ['Клиент может получать более быстрые ответы для простых задач и более качественную обработку там, где она нужна. При правильной архитектуре внутренний выбор модели не должен становиться частью пользовательского контракта.']),
                ('Чем мы за это платим', ['Появляется новый слой логики, который тоже может ошибаться. Неверная маршрутизация отправит сложный запрос в слабую модель или простой запрос — в дорогую.', 'Нужны evals по классам задач, метрики стоимости и качества, fallback-правила и контроль версий моделей. Чем больше маршрутов, тем сложнее объяснять результат конкретного запроса.']),
                ('Когда не нужно', ['Если объём небольшой, используется одна стабильная задача и стоимость модели несущественна, отдельный routing-layer может быть преждевременным.', 'Он начинает окупаться, когда запросы заметно различаются по сложности, трафик растёт или стоимость и latency становятся продуктовым ограничением.'])],
            'questions': ['Какие классы AI-задач есть в продукте?', 'Где дополнительное качество дорогой модели действительно меняет бизнес-результат?', 'Как измеряем качество каждого маршрута?', 'Что происходит при недоступности выбранной модели?', 'Может ли маршрутизация нарушить требования к данным или регионам?'],
            'conclusion': ('Model Routing — это не способ всегда выбирать самую дешёвую модель. Это способ перестать считать все AI-запросы одинаковыми.', 'Для бизнеса ценность появляется тогда, когда качество, задержка и стоимость становятся управляемым портфелем компромиссов, а не свойствами одного выбранного провайдера.')
        },
        'en': {
            'title': 'Model Routing: Why Every AI Request Should Not Go to the Most Expensive Model',
            'description': 'How Model Routing chooses AI models by task, quality, cost, and latency — and why routing needs measurable rules, evaluation, and fallback paths.',
            'og': 'Different AI requests need different levels of capability. Model Routing avoids paying the maximum price for every request and reserves expensive models for harder work.',
            'summary': 'Sending every AI request to one strongest model keeps architecture simple, but cost and latency rise with usage. Model Routing chooses a model based on actual task difficulty and the cost of being wrong.',
            'category': 'AI architecture',
            'sections': [
                ('What problem are we solving?', ['One AI product may contain simple classification, field extraction, document Q&A, and complex reasoning. Using the same model for all of them means paying the same price for very different levels of business value.', 'As usage grows, a small per-request cost difference becomes a meaningful permanent expense.']),
                ('How Model Routing works', ['Before calling a model, the system identifies the task and selects an appropriate route. Simple work can go to a faster, cheaper model, while complex work goes to a stronger one. Low-confidence results can escalate or fall back.', 'Routing can also consider language, context size, latency requirements, data sensitivity, provider availability, and the acceptable cost of error.']),
                ('What the business gets', ['The main benefit is scaling AI usage without paying the highest price linearly for every request. Expensive capability is purchased only where its incremental quality changes the outcome.', 'Routing can also reduce dependence on one provider. If model choice is already abstracted, switching or falling back during provider issues becomes easier.']),
                ('What the team gets', ['Teams get a decision layer instead of hard-coding every product to one model. New models can be tested, routing rules can change based on evals, and traffic can shift gradually.', 'The routing layer must be observable: teams need to know which request went where, what it cost, and how quality changed.']),
                ('What the customer gets', ['Customers can get faster answers for simple tasks and stronger processing where it matters. With a good abstraction, the internal model choice does not become part of the customer contract.']),
                ('What we pay for', ['There is now another decision system that can be wrong. Bad routing can send a hard request to a weak model or waste money by sending simple work to an expensive one.', 'The company needs task-specific evals, cost and quality metrics, fallback rules, and model-version control. More routes also make individual outcomes harder to explain.']),
                ('When it is not needed', ['If usage is small, the task is stable, and model cost is not material, a dedicated routing layer may be premature.', 'It becomes valuable when requests differ significantly in complexity, traffic grows, or cost and latency become product constraints.'])],
            'questions': ['Which classes of AI tasks exist in the product?', 'Where does extra model quality actually change the business result?', 'How do we measure quality for each route?', 'What happens when the selected model is unavailable?', 'Can routing violate data-location or sensitivity requirements?'],
            'conclusion': ('Model Routing is not about always choosing the cheapest model. It is about stopping the assumption that every AI request is the same.', 'For the business, value appears when quality, latency, and cost become a managed portfolio of trade-offs rather than fixed properties of one chosen provider.')
        }
    }
]

for item in ARTICLES:
    for lang in ('ru', 'en'):
        x = item[lang]
        html = article_html(lang, item['slug'], x['title'], x['description'], x['og'], x['summary'], x['category'], item['anchor'], x['sections'], x['questions'], x['conclusion'])
        path = ROOT / lang / 'articles' / f"{item['slug']}.html"
        path.write_text(html, encoding='utf-8')

cards = {
    'ru': {
        'security': '<article class="publication-item"><div class="publication-meta"><span>5 мин</span></div><div class="publication-copy"><p class="publication-source">Архитектура · статья</p><h3><a href="../articles/single-sign-on-business.html">Single Sign-On: почему один вход лучше десятка независимых паролей</a></h3><p>Как централизовать идентификацию между продуктами и не забыть, что общая identity-платформа становится критической зависимостью.</p></div><nav class="publication-versions" aria-label="Доступные языковые версии"><a href="../articles/single-sign-on-business.html" aria-current="true">RU</a><a href="../../en/articles/single-sign-on-business.html">EN</a></nav></article>',
        'domain': '<article class="publication-item"><div class="publication-meta"><span>5 мин</span></div><div class="publication-copy"><p class="publication-source">Архитектура · статья</p><h3><a href="../articles/team-topologies-business.html">Team Topologies: почему структура взаимодействия команд становится частью архитектуры</a></h3><p>Как уменьшить постоянную стоимость координации и связать границы систем с реальными зонами ответственности команд.</p></div><nav class="publication-versions" aria-label="Доступные языковые версии"><a href="../articles/team-topologies-business.html" aria-current="true">RU</a><a href="../../en/articles/team-topologies-business.html">EN</a></nav></article>',
        'legacy': '<article class="publication-item"><div class="publication-meta"><span>5 мин</span></div><div class="publication-copy"><p class="publication-source">Архитектура · статья</p><h3><a href="../articles/expand-contract-migration.html">Expand–Contract: как менять схему данных без общего дня переключения</a></h3><p>Как заменить big bang миграцию последовательностью совместимых шагов и дать потребителям перейти на новый контракт в своём темпе.</p></div><nav class="publication-versions" aria-label="Доступные языковые версии"><a href="../articles/expand-contract-migration.html" aria-current="true">RU</a><a href="../../en/articles/expand-contract-migration.html">EN</a></nav></article>',
        'cloud': '<article class="publication-item"><div class="publication-meta"><span>5 мин</span></div><div class="publication-copy"><p class="publication-source">Архитектура · статья</p><h3><a href="../articles/finops-business.html">FinOps: почему стоимость cloud должна быть видна архитектуре, а не только финансам</a></h3><p>Как сделать стоимость инженерной обратной связью и сознательно покупать надёжность, масштаб и скорость вместо сюрпризов в конце месяца.</p></div><nav class="publication-versions" aria-label="Доступные языковые версии"><a href="../articles/finops-business.html" aria-current="true">RU</a><a href="../../en/articles/finops-business.html">EN</a></nav></article>',
        'ai': '<article class="publication-item"><div class="publication-meta"><span>5 мин</span></div><div class="publication-copy"><p class="publication-source">Архитектура · статья</p><h3><a href="../articles/model-routing-business.html">Model Routing: почему каждый AI-запрос не должен идти в самую дорогую модель</a></h3><p>Как выбирать модель по сложности задачи, качеству, latency и цене ошибки, не привязывая весь продукт к одному маршруту.</p></div><nav class="publication-versions" aria-label="Доступные языковые версии"><a href="../articles/model-routing-business.html" aria-current="true">RU</a><a href="../../en/articles/model-routing-business.html">EN</a></nav></article>'
    },
    'en': {
        'security': '<article class="publication-item"><div class="publication-meta"><span>5 min</span></div><div class="publication-copy"><p class="publication-source">Architecture · article</p><h3><a href="../articles/single-sign-on-business.html">Single Sign-On: Why One Login Is Better Than Ten Independent Passwords</a></h3><p>How to centralize identity across products without forgetting that the shared identity platform becomes a critical dependency.</p></div><nav class="publication-versions" aria-label="Available language versions"><a href="../../ru/articles/single-sign-on-business.html">RU</a><a href="../articles/single-sign-on-business.html" aria-current="true">EN</a></nav></article>',
        'domain': '<article class="publication-item"><div class="publication-meta"><span>5 min</span></div><div class="publication-copy"><p class="publication-source">Architecture · article</p><h3><a href="../articles/team-topologies-business.html">Team Topologies: Why Team Interaction Structure Becomes Part of the Architecture</a></h3><p>How to reduce permanent coordination cost and align system boundaries with real team responsibility.</p></div><nav class="publication-versions" aria-label="Available language versions"><a href="../../ru/articles/team-topologies-business.html">RU</a><a href="../articles/team-topologies-business.html" aria-current="true">EN</a></nav></article>',
        'legacy': '<article class="publication-item"><div class="publication-meta"><span>5 min</span></div><div class="publication-copy"><p class="publication-source">Architecture · article</p><h3><a href="../articles/expand-contract-migration.html">Expand–Contract: How to Change a Data Schema Without One Shared Cutover Day</a></h3><p>How to replace a big-bang migration with compatible steps and let consumers move to the new contract on their own cadence.</p></div><nav class="publication-versions" aria-label="Available language versions"><a href="../../ru/articles/expand-contract-migration.html">RU</a><a href="../articles/expand-contract-migration.html" aria-current="true">EN</a></nav></article>',
        'cloud': '<article class="publication-item"><div class="publication-meta"><span>5 min</span></div><div class="publication-copy"><p class="publication-source">Architecture · article</p><h3><a href="../articles/finops-business.html">FinOps: Why Cloud Cost Should Be Visible to Architecture, Not Only Finance</a></h3><p>How to make cost part of engineering feedback and deliberately buy reliability, scale, and speed instead of discovering their price at month end.</p></div><nav class="publication-versions" aria-label="Available language versions"><a href="../../ru/articles/finops-business.html">RU</a><a href="../articles/finops-business.html" aria-current="true">EN</a></nav></article>',
        'ai': '<article class="publication-item"><div class="publication-meta"><span>5 min</span></div><div class="publication-copy"><p class="publication-source">Architecture · article</p><h3><a href="../articles/model-routing-business.html">Model Routing: Why Every AI Request Should Not Go to the Most Expensive Model</a></h3><p>How to choose models by task difficulty, quality, latency, and cost of error without coupling the whole product to one route.</p></div><nav class="publication-versions" aria-label="Available language versions"><a href="../../ru/articles/model-routing-business.html">RU</a><a href="../articles/model-routing-business.html" aria-current="true">EN</a></nav></article>'
    }
}

category_order = ['foundations','api','events','data','scale','cloud','security','domain','legacy','analytics','ai']

def insert_card(html, category, card, slug):
    if f'../articles/{slug}.html' in html:
        return html
    start_token = f"<section class='architecture-category' id='{category}'>"
    start = html.index(start_token)
    following = [html.find(f"<section class='architecture-category' id='{c}'>", start + 1) for c in category_order]
    following = [x for x in following if x > start]
    end_bound = min(following) if following else html.index('</main>', start)
    close = html.rfind('</div></section>', start, end_bound)
    if close < 0:
        raise RuntimeError(f'Cannot find close for {category}')
    return html[:close] + card + html[close:]

for lang in ('ru','en'):
    idx = ROOT / lang / 'architecture' / 'index.html'
    html = idx.read_text(encoding='utf-8')
    for category, slug in [('security','single-sign-on-business'),('domain','team-topologies-business'),('legacy','expand-contract-migration'),('cloud','finops-business'),('ai','model-routing-business')]:
        html = insert_card(html, category, cards[lang][category], slug)
    idx.write_text(html, encoding='utf-8')

sitemap = ROOT / 'sitemap-architecture.xml'
xml = sitemap.read_text(encoding='utf-8')
for slug in ['single-sign-on-business','team-topologies-business','expand-contract-migration','finops-business','model-routing-business']:
    for lang in ('ru','en'):
        url = f'https://kurakin.pro/{lang}/articles/{slug}.html'
        if url not in xml:
            xml = xml.replace('</urlset>', f'<url><loc>{url}</loc></url></urlset>')
sitemap.write_text(xml, encoding='utf-8')

# Sanity checks
for slug in ['single-sign-on-business','team-topologies-business','expand-contract-migration','finops-business','model-routing-business']:
    for lang in ('ru','en'):
        assert (ROOT / lang / 'articles' / f'{slug}.html').exists()
        assert f'https://kurakin.pro/{lang}/articles/{slug}.html' in xml
print('Architecture batch generated and integrated successfully')
