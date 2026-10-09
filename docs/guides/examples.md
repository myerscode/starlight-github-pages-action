---
title: "Examples"
description: "Example workflows for common deployment scenarios"
---

## Basic Deployment

The simplest setup — deploy docs on every push to main.

```yaml
name: Deploy Documentation

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7

      - uses: myerscode/starlight-github-pages-action@main
        id: deployment
        with:
          site-title: "My Project Documentation"
          content-dir: "docs"
```

## Deploy Only When Docs Change

Only trigger the workflow when files in the docs directory change.

```yaml
on:
  push:
    branches: [main]
    paths:
      - 'docs/**'
      - 'astro.config.mjs'
      - '.github/workflows/deploy-docs.yml'
  workflow_dispatch:
```

## With Custom Sidebar

Define sidebar navigation using YAML:

```yaml
- uses: myerscode/starlight-github-pages-action@main
  with:
    site-title: "My Docs"
    sidebar: |
      - label: Home
        slug: ""
      - label: Guides
        items:
          - label: Getting Started
            slug: guides/getting-started
          - label: Configuration
            slug: guides/configuration
      - label: API Reference
        items:
          - label: Endpoints
            slug: api/endpoints
          - label: Authentication
            slug: api/auth
      - label: Changelog
        slug: changelog
```

Or using JSON if you prefer:

```yaml
- uses: myerscode/starlight-github-pages-action@main
  with:
    site-title: "My Docs"
    sidebar: |
      [
        { "label": "Home", "slug": "" },
        { "label": "Guides", "items": [
          { "label": "Setup", "slug": "guides/setup" }
        ]}
      ]
```

### Generate a group from a directory

Use `autogenerate` to build a group from every page in a directory, ordered by `sidebar.order` frontmatter. Mix it with explicit entries as needed:

```yaml
- uses: myerscode/starlight-github-pages-action@main
  with:
    site-title: "My Docs"
    sidebar: |
      - label: Home
        slug: ""
      - label: Guides
        items:
          - autogenerate:
              directory: guides
      - label: API Reference
        collapsed: true
        items:
          - autogenerate:
              directory: api
```

`autogenerate` must sit inside `items` — the older `label` + `autogenerate` shorthand was removed in Starlight 0.39 and now fails the build with a config error. See [Starlight's sidebar guide](https://starlight.astro.build/guides/sidebar/) for every supported option (`badge`, `collapsed`, `link`, and more).

## With a Custom Domain

Serve the site from your own domain instead of `<user>.github.io/<repo>`. Configure the domain and DNS in **Settings** > **Pages** first (see [Custom Domains](../setup/#custom-domains)), then optionally pin it in the workflow:

```yaml
- uses: myerscode/starlight-github-pages-action@main
  with:
    site-title: "My Docs"
    custom-domain: "docs.example.com"
```

The site is built for the domain root, and canonical URLs and sitemaps use the custom domain. Leave `base-path` unset.

## With Social Links

Add social icons to the header:

```yaml
- uses: myerscode/starlight-github-pages-action@main
  with:
    site-title: "My Docs"
    social: |
      - label: GitHub
        icon: github
        href: https://github.com/myorg/myrepo
      - label: Discord
        icon: discord
        href: https://discord.gg/invite
      - label: X
        icon: x.com
        href: https://x.com/myorg
```

## With Custom Branding

Add logos and a favicon. Place them in your docs directory:

```
docs/
├── favicon.svg
├── logo-dark.svg      # Dark logo for light backgrounds
├── logo-light.svg     # Light logo for dark backgrounds
└── index.md
```

These are auto-detected — no extra configuration needed. Or specify explicitly:

```yaml
- uses: myerscode/starlight-github-pages-action@main
  with:
    site-title: "My Project"
    logo: "assets/logo.png"
    favicon: "assets/favicon.ico"
```

## Changelog

Auto-detected by default from `CHANGELOG.md` in your repo root:

```yaml
# Auto (default) — picks up CHANGELOG.md from repo root
- uses: myerscode/starlight-github-pages-action@main
  with:
    site-title: "My Docs"

# Disabled
- uses: myerscode/starlight-github-pages-action@main
  with:
    site-title: "My Docs"
    changelog: "false"

# Custom path
- uses: myerscode/starlight-github-pages-action@main
  with:
    site-title: "My Docs"
    changelog: "docs/HISTORY.md"
```

## With Custom Astro Config

For full control — custom sidebar with icons, linkable groups, plugins — add an `astro.config.mjs` to your repo root:

```javascript
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import starlightThemeYeti from '@myerscode/starlight-theme-yeti';
import { linkableGroups } from '@myerscode/starlight-theme-yeti/sidebar';

export default defineConfig({
  // Injected by the action so links resolve on GitHub Pages (project path or custom domain)
  site: process.env.STARLIGHT_SITE,
  base: process.env.STARLIGHT_BASE,
  vite: { plugins: [tailwindcss()] },
  integrations: [
    icon(),
    starlight({
      title: 'My Project',
      social: [
        { label: 'GitHub', icon: 'github', href: 'https://github.com/myorg/myrepo' },
      ],
      sidebar: linkableGroups([
        { label: '[lucide:rocket] Overview', slug: '' },
        {
          label: '[lucide:book-open] Guides',
          slug: 'guides',
          items: [
            { label: '[lucide:play] Quick Start', slug: 'guides/quickstart' },
            { label: 'Configuration', slug: 'guides/config' },
          ],
        },
        {
          label: 'Resources',
          items: [
            { label: 'FAQ', slug: 'resources/faq' },
          ],
        },
      ]),
      plugins: [
        starlightThemeYeti({
          // Colour palette: yeti (default) | black | blue | green | orange | purple | red | yellow
          palette: 'blue',
        }),
      ],
    }),
  ],
});
```

The theme package [`@myerscode/starlight-theme-yeti`](https://github.com/myerscode/starlight-theme-yeti) is installed in the build, so custom configs can import it directly. The `linkableGroups` helper makes group headings clickable (linking to an index page), and the `[icon-set:name]` syntax adds icons to labels. See [Theme Options](../configuration/#theme-options) for everything the plugin accepts.

## Project Structure

A fully customised docs setup:

```
my-repo/
├── .github/workflows/deploy-docs.yml
├── astro.config.mjs              # Optional: full control override
├── docs/
│   ├── index.md
│   ├── favicon.svg               # Auto-detected
│   ├── logo-dark.svg             # Auto-detected
│   ├── logo-light.svg            # Auto-detected
│   ├── guides/
│   │   ├── index.md              # Section landing page
│   │   ├── setup.md
│   │   └── config.md
│   └── api/
│       ├── index.md
│       └── endpoints.md
├── CHANGELOG.md                  # Auto-detected
└── README.md
```
