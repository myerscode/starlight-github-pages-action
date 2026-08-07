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

Only trigger the workflow when files in the docs directory actually change.

```yaml
name: Deploy Documentation

on:
  push:
    branches: [main]
    paths:
      - 'docs/**'
      - '.github/workflows/deploy-docs.yml'
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

## With Custom Branding

Add a logo and favicon to give your docs site a branded look.

```yaml
- uses: myerscode/starlight-github-pages-action@main
  id: deployment
  with:
    site-title: "My Project"
    site-description: "Official documentation for My Project"
    content-dir: "docs"
    logo: "assets/logo.png"
    favicon: "assets/favicon.ico"
```

Your logo and favicon files should be at those paths relative to the repository root.

## With Custom Astro Config

For full control over sidebar structure, theming, or Starlight plugins, add an `astro.config.mjs` to your repo root:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'My Project',
      sidebar: [
        { label: 'Overview', slug: '' },
        {
          label: 'API Reference',
          autogenerate: { directory: 'api' },
        },
        {
          label: 'Guides',
          items: [
            { label: 'Quick Start', slug: 'guides/quickstart' },
            { label: 'Deployment', slug: 'guides/deployment' },
          ],
        },
      ],
    }),
  ],
});
```

The action detects this file and uses it instead of generating a config.

## Content Directory Structure

A typical docs setup might look like:

```
my-repo/
├── .github/workflows/deploy-docs.yml
├── docs/
│   ├── index.md
│   ├── guides/
│   │   ├── quickstart.md
│   │   └── deployment.md
│   ├── api/
│   │   ├── endpoints.md
│   │   └── authentication.md
│   └── assets/
│       └── logo.png
├── src/
│   └── ...
└── README.md
```

The action only touches the `docs/` directory (or whatever you set as `content-dir`). The rest of your repo is untouched.
