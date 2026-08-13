from pathlib import Path

cards = {
    "ru/architecture/index.html": [
        ("foundations", "multi-tenancy-business.html", '<article class="publication-item"><div class="publication-meta"><span>5 мин</span></div><div class="publication-copy"><p class="publication-source">Архитектура · статья</p><h3><a href="../articles/multi-tenancy-business.html">Multi-Tenancy: насколько сильно нужно изолировать клиентов друг от друга</a></h3><p>Как выбрать границу между экономией общей платформы и изоляцией данных, нагрузки, релизов и инцидентов между клиентами.</p></div><nav class="publication-versions" aria-label="Доступные языковые версии"><a href="../articles/multi-tenancy-business.html" aria-current="true">RU</a><a href="../../en/articles/multi-tenancy-business.html">EN</a></nav></article>'),
        ("events", "message-ordering-business.html", '<article class="publication-item"><div class="publication-meta"><span>5 мин</span></div><div class="publication-copy"><p class="publication-source">Архитектура · статья</p><h3><a href="../articles/message-ordering-business.html">Message Ordering: почему события не всегда приходят в том порядке, в котором произошли</a></h3><p>Когда последовательность сообщений действительно влияет на бизнес-результат и почему глобальный порядок слишком дорого ограничивает параллелизм.</p></div><nav class="publication-versions" aria-label="Доступные языковые версии"><a href="../articles/message-ordering-business.html" aria-current="true">RU</a><a href="../../en/articles/message-ordering-business.html">EN</a></nav></article>'),
        ("data", "acid-transactions-business.html", '<article class="publication-item"><div class="publication-meta"><span>5 мин</span></div><div class="publication-copy"><p class="publication-source">Архитектура · статья</p><h3><a href="../articles/acid-transactions-business.html">ACID Transactions: где бизнесу нужна жёсткая целостность данных</a></h3><p>Как удерживать критические инварианты внутри надёжной транзакционной границы и не растягивать одну транзакцию через всю распределённую систему.</p></div><nav class="publication-versions" aria-label="Доступные языковые версии"><a href="../articles/acid-transactions-business.html" aria-current="true">RU</a><a href="../../en/articles/acid-transactions-business.html">EN</a></nav></article>'),
        ("scale", "chaos-engineering-business.html", '<article class="publication-item"><div class="publication-meta"><span>5 мин</span></div><div class="publication-copy"><p class="publication-source">Архитектура · статья</p><h3><a href="../articles/chaos-engineering-business.html">Chaos Engineering: почему отказоустойчивость нужно проверять до настоящей аварии</a></h3><p>Как контролируемые сбои превращают предположения о резервировании и failover в проверяемые гарантии до настоящего инцидента.</p></div><nav class="publication-versions" aria-label="Доступные языковые версии"><a href="../articles/chaos-engineering-business.html" aria-current="true">RU</a><a href="../../en/articles/chaos-engineering-business.html">EN</a></nav></article>'),
        ("ai", "context-window-business.html", '<article class="publication-item"><div class="publication-meta"><span>5 мин</span></div><div class="publication-copy"><p class="publication-source">Архитектура · статья</p><h3><a href="../articles/context-window-business.html">Context Window: почему больше контекста не всегда делает AI лучше</a></h3><p>Как управлять памятью AI через релевантность, стоимость и latency вместо привычки передавать модели всё накопленное содержимое.</p></div><nav class="publication-versions" aria-label="Доступные языковые версии"><a href="../articles/context-window-business.html" aria-current="true">RU</a><a href="../../en/articles/context-window-business.html">EN</a></nav></article>'),
    ],
    "en/architecture/index.html": [
        ("foundations", "multi-tenancy-business.html", '<article class="publication-item"><div class="publication-meta"><span>5 min</span></div><div class="publication-copy"><p class="publication-source">Architecture · article</p><h3><a href="../articles/multi-tenancy-business.html">Multi-Tenancy: How Strongly Should Customers Be Isolated From Each Other?</a></h3><p>How to choose the boundary between shared-platform economics and isolation of customer data, load, releases, and incidents.</p></div><nav class="publication-versions" aria-label="Available language versions"><a href="../../ru/articles/multi-tenancy-business.html">RU</a><a href="../articles/multi-tenancy-business.html" aria-current="true">EN</a></nav></article>'),
        ("events", "message-ordering-business.html", '<article class="publication-item"><div class="publication-meta"><span>5 min</span></div><div class="publication-copy"><p class="publication-source">Architecture · article</p><h3><a href="../articles/message-ordering-business.html">Message Ordering: Why Events Do Not Always Arrive in the Order They Happened</a></h3><p>When sequence really changes the business outcome and why global ordering can cost too much parallelism and throughput.</p></div><nav class="publication-versions" aria-label="Available language versions"><a href="../../ru/articles/message-ordering-business.html">RU</a><a href="../articles/message-ordering-business.html" aria-current="true">EN</a></nav></article>'),
        ("data", "acid-transactions-business.html", '<article class="publication-item"><div class="publication-meta"><span>5 min</span></div><div class="publication-copy"><p class="publication-source">Architecture · article</p><h3><a href="../articles/acid-transactions-business.html">ACID Transactions: Where the Business Needs Strong Data Integrity</a></h3><p>How to protect critical invariants inside a reliable transaction boundary without stretching one transaction across the whole distributed system.</p></div><nav class="publication-versions" aria-label="Available language versions"><a href="../../ru/articles/acid-transactions-business.html">RU</a><a href="../articles/acid-transactions-business.html" aria-current="true">EN</a></nav></article>'),
        ("scale", "chaos-engineering-business.html", '<article class="publication-item"><div class="publication-meta"><span>5 min</span></div><div class="publication-copy"><p class="publication-source">Architecture · article</p><h3><a href="../articles/chaos-engineering-business.html">Chaos Engineering: Why Resilience Should Be Tested Before a Real Incident</a></h3><p>How controlled failures turn assumptions about redundancy and failover into tested behavior before a real outage does it for you.</p></div><nav class="publication-versions" aria-label="Available language versions"><a href="../../ru/articles/chaos-engineering-business.html">RU</a><a href="../articles/chaos-engineering-business.html" aria-current="true">EN</a></nav></article>'),
        ("ai", "context-window-business.html", '<article class="publication-item"><div class="publication-meta"><span>5 min</span></div><div class="publication-copy"><p class="publication-source">Architecture · article</p><h3><a href="../articles/context-window-business.html">Context Window: Why More Context Does Not Always Make AI Better</a></h3><p>How to manage AI memory through relevance, cost, and latency instead of sending every accumulated piece of information to the model.</p></div><nav class="publication-versions" aria-label="Available language versions"><a href="../../ru/articles/context-window-business.html">RU</a><a href="../articles/context-window-business.html" aria-current="true">EN</a></nav></article>'),
    ],
}

for filename, items in cards.items():
    path = Path(filename)
    text = path.read_text()
    for section_id, slug, card in items:
        if f'../articles/{slug}' in text:
            continue
        marker = f"<section class='architecture-category' id='{section_id}'>"
        start = text.index(marker)
        close = text.index("</div></section>", start)
        text = text[:close] + card + text[close:]
    path.write_text(text)
    for section_id, slug, _ in items:
        marker = f"<section class='architecture-category' id='{section_id}'>"
        start = text.index(marker)
        close = text.index("</div></section>", start)
        assert f'../articles/{slug}' in text[start:close]

sitemap = Path("sitemap-architecture.xml")
xml = sitemap.read_text()
slugs = ["multi-tenancy-business", "message-ordering-business", "acid-transactions-business", "chaos-engineering-business", "context-window-business"]
additions = []
for slug in slugs:
    for lang in ("ru", "en"):
        url = f"https://kurakin.pro/{lang}/articles/{slug}.html"
        if url not in xml:
            additions.append(f"<url><loc>{url}</loc></url>")
xml = xml.replace("</urlset>", "".join(additions) + "</urlset>")
sitemap.write_text(xml)
for slug in slugs:
    assert f"https://kurakin.pro/ru/articles/{slug}.html" in xml
    assert f"https://kurakin.pro/en/articles/{slug}.html" in xml
