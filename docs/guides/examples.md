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
      - 'theme/**'
      - '.github/workflows/deploy-docs.yml'
  workflow_dispatch:
```

## With Custom Branding

Add a logo and favicon for a branded look.

```yaml
- uses: myerscode/starlight-github-pages-action@main
  with:
    site-title: "My Project"
    site-description: "Official documentation for My Project"
    content-dir: "docs"
    logo: "docs/logo.svg"
    favicon: "docs/favicon.svg"
```

## With Custom Sidebar & Icons

Add an `astro.config.mjs` with icon-enriched sidebar:

```javascript
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import icon from 'astro-icon';
import { linkableGroups } from './theme/sidebar.ts';

export default defineConfig({
  integrations: [
    icon(),
    starlight({
      title: 'My Project',
      sidebar: linkableGroups([
        { label: '[lucide:rocket] Overview', slug: '' },
        {
          label: '[lucide:book-open] Guides',
          slug: 'guides',
          items: [
            { label: '[lucide:play] Quick Start', slug: 'guides/quickstart' },
            { label: '[lucide:settings] Config', slug: 'guides/config' },
          ],
        },
        {
          label: '[lucide:code] API',
          slug: 'api',
          autogenerate: { directory: 'api' },
        },
      ]),
    }),
  ],
});
```

The `slug` on a group makes the heading clickable (links to the section's index page). The `[icon-set:name]` syntax adds icons from any Iconify set.

## With Light/Dark Logos

Place both variants in your docs directory:

```
docs/
├── logo-dark.svg    # Shown in light mode
├── logo-light.svg   # Shown in dark mode
├── favicon.svg
└── index.md
```

The theme automatically picks these up and swaps them based on the active theme.

## Project Structure

A fully customised docs setup:

```
my-repo/
├── .github/workflows/deploy-docs.yml
├── astro.config.mjs          # Custom Starlight config
├── theme/                     # Custom theme (optional)
│   ├── sidebar.ts
│   ├── styles/
│   │   └── theme.css
│   └── components/
│       └── Sidebar.astro
├── docs/
│   ├── index.md
│   ├── favicon.svg
│   ├── logo-dark.svg
│   ├── logo-light.svg
│   ├── guides/
│   │   ├── index.md
│   │   ├── setup.md
│   │   └── config.md
│   └── api/
│       ├── index.md
│       └── endpoints.md
├── src/
│   └── ...
└── README.md
```

The action only uses `docs/`, `astro.config.mjs`, and `theme/` from your repo. Everything else is untouched.
