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
import { linkableGroups } from './theme/sidebar.ts';

export default defineConfig({
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
      customCss: ['./theme/styles/global.css', './theme/styles/theme.css'],
      components: {
        // Reference bundled theme components
        Header: './theme/components/Header.astro',
        Sidebar: './theme/components/Sidebar.astro',
        SidebarSublist: './theme/components/SidebarSublist.astro',
        // ... all other components
      },
    }),
  ],
});
```

The bundled theme is always available at `./theme/` in the build. The `linkableGroups` helper makes group headings clickable (linking to an index page). The `[icon-set:name]` syntax adds icons.

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
