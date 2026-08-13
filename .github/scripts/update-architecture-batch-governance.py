from pathlib import Path

RU = Path('ru/architecture/index.html')
EN = Path('en/architecture/index.html')
SITEMAP = Path('sitemap-architecture.xml')

items = [
    {
        'section': 'foundations', 'slug': 'architecture-decision-records.html',
        'ru_title': 'Architecture Decision Records: почему важно помнить не только что решили, но и почему',
        'ru_desc': 'Как сохранять контекст архитектурных решений, не платить второй раз за те же споры и понимать, когда старый компромисс пора пересмотреть.',
        'en_title': 'Architecture Decision Records: Why It Matters to Remember Not Only What Was Decided, but Why',
        'en_desc': 'How to preserve architecture context, avoid paying twice for the same debates, and recognize when an old compromise should be revisited.'
    },
    {
        'section': 'api', 'slug': 'contract-testing-business.html',
        'ru_title': 'Contract Testing: как менять сервис, не ломая тех, кто от него зависит',
        'ru_desc': 'Как проверять ожидания потребителей до релиза и уменьшать стоимость координации между командами при изменении API и интеграций.',
        'en_title': 'Contract Testing: How to Change a Service Without Breaking Its Consumers',
        'en_desc': 'How to validate consumer expectations before release and reduce coordination cost when APIs and integrations evolve.'
    },
    {
        'section': 'legacy', 'slug': 'branch-by-abstraction.html',
        'ru_title': 'Branch by Abstraction: как заменить часть системы без большого переключения',
        'ru_desc': 'Как держать старую и новую реализацию за одной границей, мигрировать постепенно и не превращать переписывание в один рискованный релиз.',
        'en_title': 'Branch by Abstraction: How to Replace Part of a System Without One Big Switch',
        'en_desc': 'How to keep old and new implementations behind one boundary, migrate gradually, and avoid one risky big-bang replacement.'
    },
    {
        'section': 'analytics', 'slug': 'data-lineage-business.html',
        'ru_title': 'Data Lineage: почему важно знать, откуда взялась цифра в отчёте',
        'ru_desc': 'Как видеть происхождение данных, быстрее находить причины ошибок и заранее понимать последствия изменения источников и трансформаций.',
        'en_title': 'Data Lineage: Why It Matters to Know Where a Number Came From',
        'en_desc': 'How to trace data origins, investigate errors faster, and understand the downstream impact of source and transformation changes.'
    },
    {
        'section': 'ai', 'slug': 'human-in-loop-ai.html',
        'ru_title': 'Human-in-the-Loop: где AI должен остановиться и передать решение человеку',
        'ru_desc': 'Как выдавать AI полномочия постепенно: автоматизировать низкий риск и сохранять человека там, где цена ошибки всё ещё слишком высока.',
        'en_title': 'Human-in-the-Loop: Where AI Should Stop and Hand the Decision to a Person',
        'en_desc': 'How to grant AI authority gradually: automate low-risk work while keeping people where the cost of a mistake is still too high.'
    },
]


def card(item, lang):
    slug = item['slug']
    if lang == 'ru':
        return (
            '<article class="publication-item"><div class="publication-meta"><span>5 мин</span></div>'
            '<div class="publication-copy"><p class="publication-source">Архитектура · статья</p>'
            f'<h3><a href="../articles/{slug}">{item["ru_title"]}</a></h3><p>{item["ru_desc"]}</p></div>'
            '<nav class="publication-versions" aria-label="Доступные языковые версии">'
            f'<a href="../articles/{slug}" aria-current="true">RU</a><a href="../../en/articles/{slug}">EN</a></nav></article>'
        )
    return (
        '<article class="publication-item"><div class="publication-meta"><span>5 min</span></div>'
        '<div class="publication-copy"><p class="publication-source">Architecture · article</p>'
        f'<h3><a href="../articles/{slug}">{item["en_title"]}</a></h3><p>{item["en_desc"]}</p></div>'
        '<nav class="publication-versions" aria-label="Available language versions">'
        f'<a href="../../ru/articles/{slug}">RU</a><a href="../articles/{slug}" aria-current="true">EN</a></nav></article>'
    )


def insert_into_section(text, section_id, html):
    if html in text:
        return text
    markers = [f"id='{section_id}'", f'id="{section_id}"']
    starts = [text.find(m) for m in markers if text.find(m) != -1]
    if not starts:
        raise RuntimeError(f'section {section_id} not found')
    marker_pos = min(starts)
    section_start = text.rfind('<section', 0, marker_pos)
    next_single = text.find("<section class='architecture-category'", marker_pos + 1)
    next_double = text.find('<section class="architecture-category"', marker_pos + 1)
    candidates = [x for x in (next_single, next_double) if x != -1]
    section_end = min(candidates) if candidates else text.find('</div></section></main>', marker_pos)
    if section_end == -1:
        section_end = len(text)
    insert_at = text.rfind('</div></section>', section_start, section_end)
    if insert_at == -1:
        raise RuntimeError(f'closing publication list for {section_id} not found')
    return text[:insert_at] + html + text[insert_at:]


ru = RU.read_text(encoding='utf-8')
en = EN.read_text(encoding='utf-8')
for item in items:
    if item['slug'] not in ru:
        ru = insert_into_section(ru, item['section'], card(item, 'ru'))
    if item['slug'] not in en:
        en = insert_into_section(en, item['section'], card(item, 'en'))
RU.write_text(ru, encoding='utf-8')
EN.write_text(en, encoding='utf-8')

sitemap = SITEMAP.read_text(encoding='utf-8')
addition = ''
for item in items:
    slug = item['slug']
    ru_url = f'https://kurakin.pro/ru/articles/{slug}'
    en_url = f'https://kurakin.pro/en/articles/{slug}'
    if ru_url not in sitemap:
        addition += f'<url><loc>{ru_url}</loc></url>'
    if en_url not in sitemap:
        addition += f'<url><loc>{en_url}</loc></url>'
if addition:
    sitemap = sitemap.replace('</urlset>', addition + '</urlset>')
    SITEMAP.write_text(sitemap, encoding='utf-8')

for item in items:
    slug = item['slug']
    assert slug in RU.read_text(encoding='utf-8')
    assert slug in EN.read_text(encoding='utf-8')
    assert f'https://kurakin.pro/ru/articles/{slug}' in SITEMAP.read_text(encoding='utf-8')
    assert f'https://kurakin.pro/en/articles/{slug}' in SITEMAP.read_text(encoding='utf-8')
