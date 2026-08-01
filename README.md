# kurakin_pro

Personal static website for GitHub Pages with Russian and English content. No site generator or build step is required.

## Structure

- `index.html` - homepage with profile, competencies, working principles, and contacts.
- `projects.html` - projects and work directions.
- `experience.html` - about/profile page based on the previous About section, with experience, domains, education, and credentials.
- `blog.html` - compatibility redirect to the selected language article list.
- `ru/articles/index.html` and `en/articles/index.html` - explicit article lists for each language.
- `ru/articles/<slug>.html` and `en/articles/<slug>.html` - internal article pages.
- `.nojekyll` - disables Jekyll processing on GitHub Pages.
- `assets/styles.css` - responsive visual design.
- `assets/script.js` - language data and rendering.
- `assets/img/` - local images and placeholders. `source-home-hero.png` is migrated from the previous site homepage.
- `assets/img/experience-portrait.jpg` - migrated from the previous About page.
- `assets/img/logo-icon.svg` - current header, favicon, and social icon.
- `assets/img/logo-symbol.svg` - standalone symbol variant.
- `assets/img/logo-mark-mono.svg` and `assets/img/logo-mark.svg` - earlier logo alternatives.

## Editing Content

Most editable text lives in `assets/script.js` inside the `languages` object.
To add another language, copy the `ru` or `en` object, change the key, and add translated content.

Article content is stored in:

- `ru/articles/index.html` - Russian cards and their destinations.
- `en/articles/index.html` - English cards and their destinations.
- `ru/articles/<slug>.html` and `en/articles/<slug>.html` - article body and page metadata.

Article cards are edited directly in the two index pages. External publications use ordinary external links; no shared article registry is required.

Published contact links:

- `https://t.me/antonkurakin`
- `https://www.linkedin.com/in/antonkurakin/`

## GitHub Pages

In the repository settings, enable GitHub Pages and choose:

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/root`

GitHub Pages publishes the files directly from the branch. No local server or build command is required; open `index.html` directly in a browser.
