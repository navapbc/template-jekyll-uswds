# Jekyll + USWDS starter template

This Ruby program builds a static website via [Jekyll](https://jekyllrb.com/) that contains precompiled [U.S. Web Design System (USWDS)](https://designsystem.digital.gov/) assets. It's a starting point for creating new Jekyll sites, with customizable USWDS settings configured to fit each project’s needs.

## Requirements

- [Ruby](https://www.ruby-lang.org/en/)
- [Node.js (v20 or higher)](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)

> [!NOTE]
> Since there isn't a robust way to manange USWDS as a Ruby dependency, this repository uses two package dependency management tools: `npm` for JavaScript, and `gem` for Ruby.

## Architecture

This Jekyll site doesn't use a gem-based theme. All assets, layouts, includes, and stylesheets are contained within the repo.

It also doesn't use the [bundled Sass converter](https://jekyllrb.com/docs/configuration/sass/). Any unintentional Sass munging is avoided since all styles are precompiled via [`uswds-compile`](https://github.com/uswds/uswds-compile), USWDS's recommended set of [Gulp](https://gulpjs.com/) functions for copying the static assets and transforming Sass into CSS.

USWDS assets are compiled during local development, isolating the Node.js environment so that it's not part of any build or deploy process. This keeps hosting options very flexible (e.g. GitHub Pages, within a larger Ruby app, etc.) as the only requirement is Jekyll.

This architecture gives us the simplicity of Jekyll's plain-text content management (Markdown), flexible hosting options, and the ability to build our own customized design system using [USWDS `$theme-` settings](https://designsystem.digital.gov/documentation/settings/).

## Local development

### Running the Jekyll server

To run the Jekyll server and watch for changes:

```sh
bundle exec jekyll serve --livereload
```

You can view the site at `http://localhost:4000/template-jekyll-uswds/` (or whatever you configure as the `baseurl`) and LiveReload will automatically reload your browser when files are modified.

### Compiling USWDS styles and scripts

> [!NOTE]
> You only need to run the Gulp tasks when making changes to the design system. You can just run the Jekyll server when editing pages, components, or content.

Install the `uswds-compile` and `uswds` dependencies:

```sh
npm install
```

Compile USWDS files to the `./assets/uswds` directory:

```sh
npx gulp compile
```

Or you can run the following command (in parallel with the Jekyll server) and Gulp will watch for changes to files in the `./_uswds_sass` directory and recompile the USWDS assets:

```sh
npx gulp watch
```

#### USWDS Icons

Over 2K icons get compiled when you run the Gulp tasks. Woah! But every individual icon file is not tracked and committed.

All of the `usa-icons` are packaged into a sprite, which should be preferred when possible:

```
<svg class="usa-icon" role="img">
  <use xlink:href="{{ '/assets/img/sprite.svg#arrow_forward' | relative_url }}"></use>
</svg>
```

However, `img` tags need to point to individual icon files. These must be explicitly be tracked and checked in. Add required icons to the list of files to track (not be ignored) in `.gitignore`:

```sh
!assets/uswds/img/usa-icons/close.svg
```

> [!TIP]
> Although most aren't tracked, 2K+ compiled icons can slow down `jekyll build`, as it copies all assets to `_site`. To speed up local development, you can temporarily uncomment the `exclude` and `include` icons listed in `_congif.yml`, matching what's in `.gitignore`. But you don't need to commit this config (it breaks Jekyll v3 / GitHub Pages), as deploys will only build from committed icons.

## Theming USWDS

See USWDS [settings documentation](https://designsystem.digital.gov/documentation/settings/)

There are three key files in the `./_uswds_sass` dierctory:

- `_uswds-theme-custom-styles.scss`
- `_uswds-theme.scss`
- `styles.scss`

`styles.scss` is the Sass entry point that pulls everything together. Leave it be.

Per [USWDS guidance](https://designsystem.digital.gov/documentation/settings/), Sass `$theme-` variables can be defined in `_uswds-theme.scss` to create a custom configuration of USWDS.

For specific customizations that cannot be achieved at the theme level, USWDS includes a versatile set of [utility classes](https://designsystem.digital.gov/utilities/) that can be used to style elements (e.g. `border-style`, `background-color`, etc). Most designs are achievable with utility classes, and they are preferred over custom CSS rules whenever possible.

If custom styles must be written, they should added to `_uswds-theme-custom-styles.scss`, where you can leverage [USWDS design tokens](https://designsystem.digital.gov/design-tokens/), variables, mixins, and functions.

<!--
## SEO

[TODO: write summary guidance for https://github.com/jekyll/jekyll-seo-tag/blob/master/docs/usage.md]

-->
