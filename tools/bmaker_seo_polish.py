from pathlib import Path
import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]

SLUGS = [
    'b-maker-vs-scrivener','b-maker-vs-scapple','b-maker-vs-plottr',
    'scrivener-alternative','writing-software-for-articles-and-books',
    'local-first-writing-software','writing-software-with-idea-map',
    'book-writing-software-for-windows','book-writing-software-for-mac',
    'writing-software-for-linux-chromebook','cross-platform-writing-software',
    'novel-writing-software','nonfiction-writing-software',
    'writing-software-for-ipad-android-tablets',
    'writing-software-for-bloggers-and-technical-writers',
    'how-to-organize-a-novel','manuscript-version-management',
    'turn-articles-into-a-book',
]

IMAGES = {
    'b-maker-vs-scrivener': 'bmaker-manuscript.webp',
    'b-maker-vs-scapple': 'bmaker-idea-map.webp',
    'b-maker-vs-plottr': 'bmaker-story.webp',
    'scrivener-alternative': 'bmaker-main.webp',
    'writing-software-for-articles-and-books': 'bmaker-articles.webp',
    'local-first-writing-software': 'bmaker-main.webp',
    'writing-software-with-idea-map': 'bmaker-idea-map.webp',
    'book-writing-software-for-windows': 'bmaker-main.webp',
    'book-writing-software-for-mac': 'bmaker-manuscript.webp',
    'writing-software-for-linux-chromebook': 'bmaker-main.webp',
    'cross-platform-writing-software': 'bmaker-main.webp',
    'novel-writing-software': 'bmaker-story.webp',
    'nonfiction-writing-software': 'bmaker-collections.webp',
    'writing-software-for-ipad-android-tablets': 'bmaker-manuscript.webp',
    'writing-software-for-bloggers-and-technical-writers': 'bmaker-articles.webp',
    'how-to-organize-a-novel': 'bmaker-board.webp',
    'manuscript-version-management': 'bmaker-versions.webp',
    'turn-articles-into-a-book': 'bmaker-collections.webp',
}

ALT_EN = {
    'b-maker-vs-scrivener': 'B-Maker full manuscript editor for a long-form writing project',
    'b-maker-vs-scapple': 'B-Maker Idea Map with connected notes and manuscript entities',
    'b-maker-vs-plottr': 'B-Maker character and story planning workspace linked to manuscript scenes',
    'scrivener-alternative': 'B-Maker writing workspace with project tree and editor',
    'writing-software-for-articles-and-books': 'B-Maker project tree organizing draft and published articles',
    'local-first-writing-software': 'B-Maker local-first writing project open in the editor',
    'writing-software-with-idea-map': 'B-Maker Idea Map connecting chapters, notes, characters and planning cards',
    'book-writing-software-for-windows': 'B-Maker native Windows writing workspace',
    'book-writing-software-for-mac': 'B-Maker manuscript editor in the browser-based Mac workflow',
    'writing-software-for-linux-chromebook': 'B-Maker web writing workspace for Linux and Chromebook',
    'cross-platform-writing-software': 'B-Maker writing project available across desktop and browser platforms',
    'novel-writing-software': 'B-Maker novel planning with character and manuscript relationships',
    'nonfiction-writing-software': 'B-Maker collections and saved searches organizing nonfiction material',
    'writing-software-for-ipad-android-tablets': 'B-Maker manuscript workspace for browser use on a tablet',
    'writing-software-for-bloggers-and-technical-writers': 'B-Maker organizing article drafts and published writing',
    'how-to-organize-a-novel': 'B-Maker manuscript board organizing novel sections by status',
    'manuscript-version-management': 'B-Maker comparing two named versions of a manuscript section',
    'turn-articles-into-a-book': 'B-Maker collections regrouping article material for a future book',
}

ALT_RU = {
    'b-maker-vs-scrivener': 'Сквозной редактор B-Maker для длинной рукописи',
    'b-maker-vs-scapple': 'Idea Map B-Maker со связанными заметками и сущностями рукописи',
    'b-maker-vs-plottr': 'Персонажи и сюжетное планирование B-Maker, связанное со сценами',
    'scrivener-alternative': 'Рабочее пространство B-Maker с деревом проекта и редактором',
    'writing-software-for-articles-and-books': 'Проект B-Maker с черновиками и архивом опубликованных статей',
    'local-first-writing-software': 'Local-first проект B-Maker, открытый в редакторе',
    'writing-software-with-idea-map': 'Idea Map B-Maker, связывающая главы, заметки, персонажей и карточки',
    'book-writing-software-for-windows': 'Нативное рабочее пространство B-Maker на Windows',
    'book-writing-software-for-mac': 'Сквозной редактор B-Maker в браузерном сценарии на Mac',
    'writing-software-for-linux-chromebook': 'Web App B-Maker для длинных текстов на Linux и Chromebook',
    'cross-platform-writing-software': 'Проект B-Maker, доступный через desktop и браузерные платформы',
    'novel-writing-software': 'Планирование романа в B-Maker с персонажами и связями с рукописью',
    'nonfiction-writing-software': 'Коллекции и сохранённые поиски B-Maker для нон-фикшн материала',
    'writing-software-for-ipad-android-tablets': 'Сквозной редактор B-Maker для браузерного использования на планшете',
    'writing-software-for-bloggers-and-technical-writers': 'B-Maker с черновиками статей и архивом опубликованных материалов',
    'how-to-organize-a-novel': 'Доска рукописи B-Maker с разделами романа по рабочим статусам',
    'manuscript-version-management': 'Сравнение двух именованных версий раздела в B-Maker',
    'turn-articles-into-a-book': 'Коллекции B-Maker, перегруппирующие статьи в материал будущей книги',
}

RELATED = {
    'b-maker-vs-scrivener': ['scrivener-alternative','writing-software-with-idea-map','local-first-writing-software'],
    'b-maker-vs-scapple': ['writing-software-with-idea-map','b-maker-vs-scrivener','how-to-organize-a-novel'],
    'b-maker-vs-plottr': ['novel-writing-software','how-to-organize-a-novel','writing-software-with-idea-map'],
    'scrivener-alternative': ['b-maker-vs-scrivener','local-first-writing-software','cross-platform-writing-software'],
    'writing-software-for-articles-and-books': ['turn-articles-into-a-book','writing-software-for-bloggers-and-technical-writers','nonfiction-writing-software'],
    'local-first-writing-software': ['cross-platform-writing-software','book-writing-software-for-windows','book-writing-software-for-mac'],
    'writing-software-with-idea-map': ['b-maker-vs-scapple','how-to-organize-a-novel','novel-writing-software'],
    'book-writing-software-for-windows': ['local-first-writing-software','cross-platform-writing-software','scrivener-alternative'],
    'book-writing-software-for-mac': ['cross-platform-writing-software','local-first-writing-software','b-maker-vs-scrivener'],
    'writing-software-for-linux-chromebook': ['cross-platform-writing-software','local-first-writing-software','book-writing-software-for-mac'],
    'cross-platform-writing-software': ['book-writing-software-for-windows','book-writing-software-for-mac','writing-software-for-ipad-android-tablets'],
    'novel-writing-software': ['how-to-organize-a-novel','b-maker-vs-plottr','manuscript-version-management'],
    'nonfiction-writing-software': ['writing-software-for-articles-and-books','turn-articles-into-a-book','manuscript-version-management'],
    'writing-software-for-ipad-android-tablets': ['cross-platform-writing-software','book-writing-software-for-mac','local-first-writing-software'],
    'writing-software-for-bloggers-and-technical-writers': ['writing-software-for-articles-and-books','turn-articles-into-a-book','manuscript-version-management'],
    'how-to-organize-a-novel': ['novel-writing-software','writing-software-with-idea-map','manuscript-version-management'],
    'manuscript-version-management': ['novel-writing-software','writing-software-for-bloggers-and-technical-writers','how-to-organize-a-novel'],
    'turn-articles-into-a-book': ['writing-software-for-articles-and-books','nonfiction-writing-software','writing-software-for-bloggers-and-technical-writers'],
}

FAQ_EN = {
    'b-maker-vs-scrivener': [('Is B-Maker a Scrivener clone?','No. The products overlap in long-form writing, but B-Maker is built around progressive complexity, one portable project file, and an integrated Idea Map.'),('Does B-Maker replace every Scrivener feature?','No. Scrivener is older and deeper in several areas, especially Compile and its mature native ecosystem.')],
    'b-maker-vs-scapple': [('Can B-Maker Idea Map work as a freeform board?','Yes. It supports free positioning, connections, groups, images, multiple boards, search, a minimap, and auto-layout.'),('What makes B-Maker Idea Map different from a normal mind map?','Nodes can be actual manuscript and planning entities, and planning notes can become real sections.')],
    'b-maker-vs-plottr': [('Is Plottr better for dedicated plotting?','For writers who want a specialist visual plotting system with many templates, Plottr can be the stronger dedicated planner.'),('Can B-Maker take a project all the way to export?','Yes. The same project continues through writing, revisions, analytics, preview, publishing preparation, and export.')],
    'scrivener-alternative': [('Is B-Maker simpler than Scrivener?','The entry path is intentionally simpler. Deeper tools are present, but B-Maker tries not to require them before you can start writing.'),('Can I move a B-Maker project between computers?','Yes. A project can be downloaded as a portable .bmaker file and moved or backed up using storage you already use.')],
    'writing-software-for-articles-and-books': [('Can published articles stay in the same project?','Yes. Put them in an organizational folder such as Published, collapse it, and keep them searchable without cluttering active work.'),('Will archived articles be exported into my book?','Organizational folders and their subtrees can be excluded from book export.')],
    'local-first-writing-software': [('Does B-Maker require its own cloud storage?','No. The project can remain a portable .bmaker file under your control.'),('Does B-Maker automatically sync the same file between devices?','Not currently. You can move the portable project using the storage system you already use.')],
    'writing-software-with-idea-map': [('Can an idea become a real chapter?','Yes. Planning notes and groups can be converted into manuscript sections with an initial version.'),('Can I have more than one Idea Map board?','Yes. Different parts of a project can use different visual boards.')],
    'book-writing-software-for-windows': [('Is B-Maker a native Windows application?','Yes. Windows has a native desktop build.'),('Where is the project stored?','B-Maker uses portable .bmaker project files that you can keep and back up locally.')],
    'book-writing-software-for-mac': [('Does B-Maker have a native Mac app?','Not currently. On macOS, B-Maker runs in a modern browser.'),('Can I download my B-Maker project on a Mac?','Yes. The browser project can be downloaded as a portable .bmaker file.')],
    'writing-software-for-linux-chromebook': [('Is there a native B-Maker Linux app?','Not currently. Linux uses the B-Maker web app.'),('Does B-Maker work on Chromebook?','Yes through a modern browser, with the same browser-based project workflow.')],
    'cross-platform-writing-software': [('Which platforms can use B-Maker?','Windows has a native desktop app. Mac, Linux, Chromebook, iPad, Android tablets, and other devices can use the web app.'),('Does cross-platform mean automatic sync?','No. Built-in automatic conflict-aware sync is not currently claimed; portability is based on the downloadable project file.')],
    'novel-writing-software': [('Can B-Maker manage scenes as well as chapters?','Yes. The manuscript supports nested structure, and planning views can work with chapters, scenes, characters, and plotlines.'),('Can I compare rewrites of the same chapter?','Yes. Sections can keep named versions that can be compared, locked, and selected as current.')],
    'nonfiction-writing-software': [('Is B-Maker only for fiction?','No. Collections, saved searches, research notes, versions, analytics, and publishing preparation are useful for nonfiction.'),('Can source articles stay in the project without being exported?','Yes. Organizational folders can remain in the project while being excluded from final book export.')],
    'writing-software-for-ipad-android-tablets': [('Is there a native B-Maker app for iPad or Android?','Not currently. Tablets use the B-Maker web app in a modern browser.'),('Can I download the project from a tablet browser?','Yes. The project can be downloaded as a portable .bmaker file.')],
    'writing-software-for-bloggers-and-technical-writers': [('Can B-Maker store many articles in one project?','Yes. Articles can be organized with folders, collections, and saved searches.'),('Does B-Maker support Markdown?','B-Maker keeps portable Markdown inside the project and can export Markdown as well as other book formats.')],
    'how-to-organize-a-novel': [('Should I organize every scene before writing?','No. Start with only the structure you need and add deeper views when they become useful.'),('What is the difference between a collection and the manuscript tree?','The tree is the actual book structure. A collection is a temporary working set that does not move the underlying manuscript.')],
    'manuscript-version-management': [('Does B-Maker version the entire project or individual sections?','Text versions belong to sections such as chapters, scenes, or articles, so you do not need to duplicate the entire project.'),('Can I lock and compare versions?','Yes. Finished versions can be locked read-only, and two versions can be compared before you choose material to restore.')],
    'turn-articles-into-a-book': [('Should I copy every article into the book?','No. Treat articles as source material. A coherent book usually needs a different order, fewer repetitions, and new transitions.'),('Can I keep the original articles while building the book?','Yes. Keep the published archive in an organizational folder and build a separate manuscript structure in the same project.')],
}

FAQ_RU = {
    'b-maker-vs-scrivener': [('B-Maker — это клон Scrivener?','Нет. Продукты пересекаются, но B-Maker строится вокруг постепенного усложнения, одного переносимого проекта и встроенной Idea Map.'),('B-Maker заменяет все функции Scrivener?','Нет. Scrivener старше и глубже в ряде областей, особенно в Compile и нативной экосистеме.')],
    'b-maker-vs-scapple': [('Idea Map может работать как свободная доска?','Да. Есть свободное размещение, связи, группы, изображения, несколько досок, поиск, миникарта и автораскладка.'),('Чем Idea Map отличается от обычной mind map?','Узлами могут быть реальные главы, персонажи и сюжетные линии, а заметки можно превращать в разделы.')],
    'b-maker-vs-plottr': [('Plottr сильнее для специализированного plotting?','Если нужен отдельный визуальный plotting с большим количеством шаблонов, Plottr может быть сильнее.'),('Можно пройти в B-Maker весь путь до экспорта?','Да. Тот же проект используется для письма, версий, аналитики, preview, издательской подготовки и экспорта.')],
    'scrivener-alternative': [('B-Maker проще Scrivener?','Порог входа намеренно проще: глубокие инструменты не обязательны до начала письма.'),('Можно переносить проект между компьютерами?','Да. Проект скачивается как переносимый .bmaker.')],
    'writing-software-for-articles-and-books': [('Можно хранить опубликованные статьи в том же проекте?','Да. Перенесите их в организационную папку «Опубликованные» и сверните её.'),('Попадёт архив статей в экспорт книги?','Организационные папки и их поддеревья можно исключать из книжного экспорта.')],
    'local-first-writing-software': [('B-Maker требует собственное облако?','Нет. Проект может оставаться переносимым .bmaker под вашим контролем.'),('B-Maker автоматически синхронизирует устройства?','Сейчас такой функции не заявляется; файл можно переносить через выбранное вами хранилище.')],
    'writing-software-with-idea-map': [('Можно превратить идею в настоящую главу?','Да. Заметки и группы можно преобразовать в разделы рукописи.'),('Можно создать несколько досок Idea Map?','Да. Для разных частей проекта можно использовать отдельные визуальные доски.')],
    'book-writing-software-for-windows': [('B-Maker — нативное приложение для Windows?','Да. Для Windows есть нативная desktop-версия.'),('Где хранится проект?','B-Maker использует переносимые файлы .bmaker, которые можно хранить и резервировать локально.')],
    'book-writing-software-for-mac': [('Есть нативная версия B-Maker для Mac?','Сейчас нет. На macOS используется Web App.'),('Можно скачать проект на Mac?','Да. Браузерный проект скачивается как переносимый .bmaker.')],
    'writing-software-for-linux-chromebook': [('Есть нативное приложение B-Maker для Linux?','Нет, сейчас Linux использует Web App.'),('Работает B-Maker на Chromebook?','Да, через современный браузер.')],
    'cross-platform-writing-software': [('На каких ОС работает B-Maker?','Windows имеет нативную desktop-версию. Mac, Linux, Chromebook, iPad и Android-планшеты используют Web App.'),('Cross-platform означает automatic sync?','Нет. Встроенный conflict-aware sync сейчас не заявляется; переносимость основана на файле проекта.')],
    'novel-writing-software': [('B-Maker умеет работать со сценами, а не только главами?','Да. Рукопись поддерживает вложенную структуру.'),('Можно сравнить две редакции одной главы?','Да. Разделы могут иметь несколько именованных версий, которые можно сравнивать и блокировать.')],
    'nonfiction-writing-software': [('B-Maker только для художественной прозы?','Нет. Коллекции, поиски, research notes, версии, аналитика и publishing package полезны для нон-фикшн.'),('Можно хранить исходные статьи, но не экспортировать их?','Да. Организационные папки можно исключать из книжного экспорта.')],
    'writing-software-for-ipad-android-tablets': [('Есть нативный B-Maker для iPad или Android?','Сейчас нет. Используется Web App.'),('Можно скачать проект из браузера на планшете?','Да. Проект скачивается как переносимый .bmaker.')],
    'writing-software-for-bloggers-and-technical-writers': [('Можно хранить много статей в одном проекте?','Да. Статьи организуются папками, коллекциями и сохранёнными поисками.'),('B-Maker поддерживает Markdown?','Да. Внутри проекта используется переносимый Markdown, и доступен экспорт Markdown.')],
    'how-to-organize-a-novel': [('Нужно заранее организовать каждую сцену?','Нет. Начните только с необходимой структуры и добавляйте представления позже.'),('Чем коллекция отличается от дерева рукописи?','Дерево — настоящая структура книги. Коллекция — временный рабочий набор, который не перемещает исходные разделы.')],
    'manuscript-version-management': [('Версии относятся ко всему проекту или к разделам?','К главам, сценам и статьям, поэтому не нужно дублировать весь проект.'),('Можно заблокировать и сравнить версии?','Да. Заблокированные версии открываются read-only, а редакции можно сравнивать.')],
    'turn-articles-into-a-book': [('Нужно переносить в книгу каждую статью?','Нет. Статьи лучше считать исходным материалом: книге обычно нужны другой порядок, меньше повторов и новые переходы.'),('Можно сохранить оригинальные статьи и одновременно строить книгу?','Да. Архив остаётся в организационной папке, а новая рукопись строится рядом.')],
}

HEAD_START = '<!-- BM-SEO-HEAD-START -->'
HEAD_END = '<!-- BM-SEO-HEAD-END -->'
TOP_START = '<!-- BM-SEO-TOP-START -->'
TOP_END = '<!-- BM-SEO-TOP-END -->'
END_START = '<!-- BM-SEO-END-START -->'
END_END = '<!-- BM-SEO-END-END -->'


def grab(pattern, text, label):
    m = re.search(pattern, text, re.I | re.S)
    if not m:
        raise RuntimeError(f'Missing {label}')
    return html.unescape(re.sub(r'<[^>]+>', '', m.group(1))).strip()


def strip_marker(text, start, end):
    return re.sub(re.escape(start) + r'.*?' + re.escape(end), '', text, flags=re.S)


def target_meta(path):
    text = path.read_text(encoding='utf-8')
    return grab(r'<h1[^>]*>(.*?)</h1>', text, 'h1'), grab(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', text, 'description')


def polish(path, slug, lang):
    text = path.read_text(encoding='utf-8')
    text = strip_marker(text, HEAD_START, HEAD_END)
    text = strip_marker(text, TOP_START, TOP_END)
    text = strip_marker(text, END_START, END_END)
    text = re.sub(r'<meta\s+name=["\']robots["\'][^>]*>\s*', '', text, flags=re.I)
    text = re.sub(r'<meta\s+property=["\']og:(?:type|url|title|description|image)["\'][^>]*>\s*', '', text, flags=re.I)

    title = grab(r'<title>(.*?)</title>', text, 'title')
    h1 = grab(r'<h1[^>]*>(.*?)</h1>', text, 'h1')
    desc = grab(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', text, 'description')
    canonical_m = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\'](.*?)["\']', text, re.I)
    if not canonical_m:
        raise RuntimeError(f'Missing canonical in {path}')
    canonical = canonical_m.group(1)

    is_en = lang == 'en'
    prefix = '../../../../' if is_en else '../../../'
    image = IMAGES[slug]
    image_abs = f'https://kurakin.pro/assets/img/bmaker/{image}'
    alt = ALT_EN[slug] if is_en else ALT_RU[slug]
    hub_abs = 'https://kurakin.pro/en/projects/b-maker/compare/' if is_en else 'https://kurakin.pro/projects/b-maker/compare/'
    product_abs = 'https://kurakin.pro/en/projects/b-maker.html' if is_en else 'https://kurakin.pro/projects/b-maker.html'
    home_abs = 'https://kurakin.pro/en/' if is_en else 'https://kurakin.pro/'
    crumbs_name = 'Guides & comparisons' if is_en else 'Гайды и сравнения'
    schema = {'@context':'https://schema.org','@graph':[
        {'@type':'WebPage','@id':canonical,'url':canonical,'name':title,'description':desc,'inLanguage':lang,'primaryImageOfPage':image_abs,'isPartOf':{'@id':hub_abs}},
        {'@type':'BreadcrumbList','itemListElement':[
            {'@type':'ListItem','position':1,'name':'Home' if is_en else 'Главная','item':home_abs},
            {'@type':'ListItem','position':2,'name':'B-Maker','item':product_abs},
            {'@type':'ListItem','position':3,'name':crumbs_name,'item':hub_abs},
            {'@type':'ListItem','position':4,'name':h1,'item':canonical},
        ]}
    ]}
    head_block = (f'{HEAD_START}\n'
                  f'  <meta name="robots" content="index,follow,max-image-preview:large">\n'
                  f'  <meta property="og:type" content="website">\n'
                  f'  <meta property="og:url" content="{html.escape(canonical, quote=True)}">\n'
                  f'  <meta property="og:title" content="{html.escape(title, quote=True)}">\n'
                  f'  <meta property="og:description" content="{html.escape(desc, quote=True)}">\n'
                  f'  <meta property="og:image" content="{image_abs}">\n'
                  f'  <script type="application/ld+json">{json.dumps(schema, ensure_ascii=False, separators=(",",":"))}</script>\n'
                  f'{HEAD_END}')
    text = text.replace('</head>', head_block + '\n</head>', 1)

    bread_label = 'Breadcrumb' if is_en else 'Навигационная цепочка'
    top_block = (f'{TOP_START}<nav aria-label="{bread_label}" style="font-size:.88rem;margin-bottom:28px">'
                 f'<a href="../../b-maker.html">B-Maker</a> <span aria-hidden="true">/</span> '
                 f'<a href="./">{crumbs_name}</a> <span aria-hidden="true">/</span> '
                 f'<span>{html.escape(h1)}</span></nav>'
                 f'<div class="bmaker-shot" style="margin:30px 0 42px"><div class="bmaker-shot-bar"><i></i><i></i><i></i></div>'
                 f'<img class="bmaker-shot-image" src="{prefix}assets/img/bmaker/{image}" alt="{html.escape(alt, quote=True)}" width="1600" height="1000" loading="lazy" decoding="async"></div>{TOP_END}')
    body_open = '<section class="bmaker-compare-body">'
    if body_open not in text:
        raise RuntimeError(f'Missing compare body in {path}')
    text = text.replace(body_open, body_open + top_block, 1)

    faq = FAQ_EN[slug] if is_en else FAQ_RU[slug]
    faq_title = 'Frequently asked questions' if is_en else 'Частые вопросы'
    faq_html = ''.join(f'<h3>{html.escape(q)}</h3><p>{html.escape(a)}</p>' for q,a in faq)

    rel_title = 'Related B-Maker guides' if is_en else 'Связанные гайды B-Maker'
    rel_small = 'Related workflow' if is_en else 'Связанный сценарий'
    cards = []
    base_dir = path.parent
    for rel in RELATED[slug]:
        target = base_dir / f'{rel}.html'
        rh1, rdesc = target_meta(target)
        anchor = f'Read: {rh1}' if is_en else f'Читать: {rh1}'
        cards.append(f'<a class="bmaker-guide-card" href="{rel}.html"><small>{rel_small}</small><h2>{html.escape(rh1)}</h2><p>{html.escape(rdesc)}</p><span>{html.escape(anchor)} →</span></a>')
    related_html = f'<h2>{rel_title}</h2><div class="bmaker-guide-grid">{"".join(cards)}</div>'
    end_block = f'{END_START}<h2>{faq_title}</h2><div>{faq_html}</div>{related_html}{END_END}'

    verdict = '<div class="bmaker-compare-verdict">'
    if verdict in text:
        text = text.replace(verdict, end_block + verdict, 1)
    else:
        footer_pos = text.find('</section></main>')
        if footer_pos < 0:
            raise RuntimeError(f'No insertion point in {path}')
        text = text[:footer_pos] + end_block + text[footer_pos:]

    path.write_text(text, encoding='utf-8')


def main():
    for lang, rel_dir in [('ru','projects/b-maker/compare'),('en','en/projects/b-maker/compare')]:
        directory = ROOT / rel_dir
        found = sorted(p.stem for p in directory.glob('*.html') if p.name != 'index.html')
        if found != sorted(SLUGS):
            missing = sorted(set(SLUGS)-set(found))
            extra = sorted(set(found)-set(SLUGS))
            raise RuntimeError(f'{lang}: unexpected SEO page set; missing={missing}, extra={extra}')
        for slug in SLUGS:
            polish(directory / f'{slug}.html', slug, lang)
    print(f'Polished {len(SLUGS) * 2} localized B-Maker SEO pages')

if __name__ == '__main__':
    main()
