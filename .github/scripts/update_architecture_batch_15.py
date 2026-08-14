from pathlib import Path

ROOT = Path('.')

CARDS = {
    'ru': {
        'cloud': '''<article class="publication-item"><div class="publication-meta"><span>5 мин</span></div><div class="publication-copy"><p class="publication-source">Архитектура · статья</p><h3><a href="../articles/service-discovery-business.html">Service Discovery: почему сервисы не должны знать адреса друг друга заранее</a></h3><p>Как убрать ручное управление адресами сервисов и позволить инфраструктуре масштабироваться и восстанавливаться без цепочки перенастроек.</p></div><nav class="publication-versions" aria-label="Доступные языковые версии"><a href="../articles/service-discovery-business.html" aria-current="true">RU</a><a href="../../en/articles/service-discovery-business.html">EN</a></nav></article>''',
        'events': '''<article class="publication-item"><div class="publication-meta"><span>5 мин</span></div><div class="publication-copy"><p class="publication-source">Архитектура · статья</p><h3><a href="../articles/transactional-inbox-business.html">Transactional Inbox: почему надёжно отправить сообщение недостаточно</a></h3><p>Как переживать повторную доставку сообщений и не превращать технический retry во второй платёж, заказ или бизнес-операцию.</p></div><nav class="publication-versions" aria-label="Доступные языковые версии"><a href="../articles/transactional-inbox-business.html" aria-current="true">RU</a><a href="../../en/articles/transactional-inbox-business.html">EN</a></nav></article>''',
        'data': '''<article class="publication-item"><div class="publication-meta"><span>5 мин</span></div><div class="publication-copy"><p class="publication-source">Архитектура · статья</p><h3><a href="../articles/materialized-views-business.html">Materialized Views: когда выгоднее заранее подготовить ответ, чем каждый раз считать заново</a></h3><p>Как ускорять повторяющиеся тяжёлые чтения за счёт заранее рассчитанных данных и осознанно платить за обновление и возможное отставание.</p></div><nav class="publication-versions" aria-label="Доступные языковые версии"><a href="../articles/materialized-views-business.html" aria-current="true">RU</a><a href="../../en/articles/materialized-views-business.html">EN</a></nav></article>''',
        'security': '''<article class="publication-item"><div class="publication-meta"><span>5 мин</span></div><div class="publication-copy"><p class="publication-source">Архитектура · статья</p><h3><a href="../articles/least-privilege-business.html">Least Privilege: почему системе не нужно давать больше прав, чем ей действительно нужно</a></h3><p>Как минимальные права уменьшают радиус инцидента и почему детализация доступа должна соответствовать реальной цене ошибки.</p></div><nav class="publication-versions" aria-label="Доступные языковые версии"><a href="../articles/least-privilege-business.html" aria-current="true">RU</a><a href="../../en/articles/least-privilege-business.html">EN</a></nav></article>''',
        'ai': '''<article class="publication-item"><div class="publication-meta"><span>5 мин</span></div><div class="publication-copy"><p class="publication-source">Архитектура · статья</p><h3><a href="../articles/ai-fallback-business.html">AI Fallback Strategy: что должен делать продукт, когда модель недоступна или не уверена</a></h3><p>Как сохранить ключевой пользовательский сценарий при сбое AI и не делать одну модель или провайдера единственной точкой отказа продукта.</p></div><nav class="publication-versions" aria-label="Доступные языковые версии"><a href="../articles/ai-fallback-business.html" aria-current="true">RU</a><a href="../../en/articles/ai-fallback-business.html">EN</a></nav></article>''',
    },
    'en': {
        'cloud': '''<article class="publication-item"><div class="publication-meta"><span>5 min</span></div><div class="publication-copy"><p class="publication-source">Architecture · article</p><h3><a href="../articles/service-discovery-business.html">Service Discovery: Why Services Should Not Know Each Other’s Addresses in Advance</a></h3><p>How to remove manual service address management and let infrastructure scale and recover without chains of reconfiguration.</p></div><nav class="publication-versions" aria-label="Available language versions"><a href="../../ru/articles/service-discovery-business.html">RU</a><a href="../articles/service-discovery-business.html" aria-current="true">EN</a></nav></article>''',
        'events': '''<article class="publication-item"><div class="publication-meta"><span>5 min</span></div><div class="publication-copy"><p class="publication-source">Architecture · article</p><h3><a href="../articles/transactional-inbox-business.html">Transactional Inbox: Why Reliable Delivery Is Not Enough</a></h3><p>How to survive message redelivery without turning a technical retry into a second payment, order, or business operation.</p></div><nav class="publication-versions" aria-label="Available language versions"><a href="../../ru/articles/transactional-inbox-business.html">RU</a><a href="../articles/transactional-inbox-business.html" aria-current="true">EN</a></nav></article>''',
        'data': '''<article class="publication-item"><div class="publication-meta"><span>5 min</span></div><div class="publication-copy"><p class="publication-source">Architecture · article</p><h3><a href="../articles/materialized-views-business.html">Materialized Views: When Precomputing the Answer Is Better Than Recalculating It Every Time</a></h3><p>How to speed up repeated expensive reads with precomputed data while deliberately paying for refresh complexity and possible staleness.</p></div><nav class="publication-versions" aria-label="Available language versions"><a href="../../ru/articles/materialized-views-business.html">RU</a><a href="../articles/materialized-views-business.html" aria-current="true">EN</a></nav></article>''',
        'security': '''<article class="publication-item"><div class="publication-meta"><span>5 min</span></div><div class="publication-copy"><p class="publication-source">Architecture · article</p><h3><a href="../articles/least-privilege-business.html">Least Privilege: Why a System Should Not Get More Access Than It Actually Needs</a></h3><p>How minimum permissions reduce incident blast radius and why access granularity should match the real cost of error.</p></div><nav class="publication-versions" aria-label="Available language versions"><a href="../../ru/articles/least-privilege-business.html">RU</a><a href="../articles/least-privilege-business.html" aria-current="true">EN</a></nav></article>''',
        'ai': '''<article class="publication-item"><div class="publication-meta"><span>5 min</span></div><div class="publication-copy"><p class="publication-source">Architecture · article</p><h3><a href="../articles/ai-fallback-business.html">AI Fallback Strategy: What Should the Product Do When the Model Is Unavailable or Uncertain?</a></h3><p>How to preserve a critical customer flow during AI failures instead of making one model or provider a single point of product failure.</p></div><nav class="publication-versions" aria-label="Available language versions"><a href="../../ru/articles/ai-fallback-business.html">RU</a><a href="../articles/ai-fallback-business.html" aria-current="true">EN</a></nav></article>''',
    }
}


def insert_card(html: str, section_id: str, card: str, slug: str) -> str:
    if slug in html:
        return html
    marker1 = f"id='{section_id}'"
    marker2 = f'id="{section_id}"'
    start = html.find(marker1)
    if start < 0:
        start = html.find(marker2)
    if start < 0:
        raise RuntimeError(f'section {section_id} not found')
    next_section = html.find("<section class='architecture-category'", start + 1)
    if next_section < 0:
        next_section = html.find('<section class="architecture-category"', start + 1)
    if next_section < 0:
        tail = html.find('</div></section></div></section></main>', start)
        if tail < 0:
            raise RuntimeError(f'end of final section {section_id} not found')
        end = tail + len('</div></section>')
    else:
        end = next_section
    close = html.rfind('</div></section>', start, end)
    if close < 0:
        raise RuntimeError(f'publication list close for {section_id} not found')
    return html[:close] + card + html[close:]


def update_catalog(lang: str):
    path = ROOT / lang / 'architecture' / 'index.html'
    html = path.read_text(encoding='utf-8')
    specs = [
        ('cloud', 'service-discovery-business.html'),
        ('events', 'transactional-inbox-business.html'),
        ('data', 'materialized-views-business.html'),
        ('security', 'least-privilege-business.html'),
        ('ai', 'ai-fallback-business.html'),
    ]
    for section_id, slug in specs:
        html = insert_card(html, section_id, CARDS[lang][section_id], slug)
    path.write_text(html, encoding='utf-8')


def update_sitemap():
    path = ROOT / 'sitemap-architecture.xml'
    xml = path.read_text(encoding='utf-8')
    slugs = [
        'service-discovery-business',
        'transactional-inbox-business',
        'materialized-views-business',
        'least-privilege-business',
        'ai-fallback-business',
    ]
    additions = []
    for slug in slugs:
        for lang in ('ru', 'en'):
            url = f'https://kurakin.pro/{lang}/articles/{slug}.html'
            if url not in xml:
                additions.append(f'<url><loc>{url}</loc></url>')
    if additions:
        xml = xml.replace('</urlset>', ''.join(additions) + '</urlset>')
        path.write_text(xml, encoding='utf-8')


for lang in ('ru', 'en'):
    update_catalog(lang)
update_sitemap()

# Basic integration checks.
for lang in ('ru', 'en'):
    text = (ROOT / lang / 'architecture' / 'index.html').read_text(encoding='utf-8')
    for slug in ('service-discovery-business.html','transactional-inbox-business.html','materialized-views-business.html','least-privilege-business.html','ai-fallback-business.html'):
        assert slug in text, (lang, slug)
xml = (ROOT / 'sitemap-architecture.xml').read_text(encoding='utf-8')
for slug in ('service-discovery-business','transactional-inbox-business','materialized-views-business','least-privilege-business','ai-fallback-business'):
    assert f'/ru/articles/{slug}.html' in xml
    assert f'/en/articles/{slug}.html' in xml
