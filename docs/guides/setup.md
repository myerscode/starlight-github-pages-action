---
title: "Setup"
description: "How to set up the Starlight GitHub Pages Action in your repository"
---

## Prerequisites

- A GitHub repository (public, or private on a plan that supports Pages)
- Markdown content in a directory (default: `docs/`)

## Enable GitHub Pages

1. Go to your repository **Settings** > **Pages**
2. Set **Source** to "GitHub Actions"

This tells GitHub to deploy from workflow artifacts rather than a branch.

## Create the Workflow

Create `.github/workflows/deploy-docs.yml`:

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
          site-title: "My Documentation"
          content-dir: "docs"
```

## Add Content

Create a `docs/` directory with your Markdown files:

```
docs/
├── index.md          # Homepage
├── getting-started.md
└── guides/
    ├── installation.md
    └── configuration.md
```

An `index.md` at the root of your content directory becomes the homepage.

## Content Frontmatter

Control page titles, descriptions, and sidebar ordering with frontmatter:

```markdown
---
title: "Installation Guide"
description: "How to install the project"
sidebar:
  order: 1
  label: "Install"
---

Your content here...
```

Supported fields:

- `title` — page title (auto-generated from filename if omitted)
- `description` — page description for SEO
- `sidebar.order` — position in navigation (lower numbers first)
- `sidebar.label` — custom label shown in the sidebar

## Custom Astro Config

For advanced control, place an `astro.config.mjs` in your repository root. If detected, the action uses it instead of generating one. This gives you full access to Starlight's configuration options — custom sidebars, plugins, themes, and more.
