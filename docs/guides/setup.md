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

## Custom Domains

To serve your docs from a custom domain (e.g. `https://docs.example.com` instead of `https://user.github.io/repo`):

1. Add a DNS record with your provider — a `CNAME` record pointing your subdomain at `<user>.github.io`, or `A`/`AAAA` records at GitHub's Pages IPs for apex domains
2. In **Settings** > **Pages**, enter the domain under **Custom domain** and save (enable **Enforce HTTPS** once the certificate is issued)
3. Re-run the deploy workflow

The base path and site URL are read from your Pages settings at build time, so no action configuration is required: with a custom domain the site is built for the domain root, and canonical URLs, sitemaps, and social metadata all use the custom domain.

To pin the domain explicitly instead of relying on detection, pass the [`custom-domain`](../configuration/#custom-domain) input:

```yaml
- uses: myerscode/starlight-github-pages-action@main
  with:
    site-title: "My Documentation"
    custom-domain: "docs.example.com"
```

Things to keep in mind:

- The domain in **Settings** > **Pages** is what makes GitHub route traffic — the `custom-domain` input configures the build, it can't activate the domain by itself
- The base path is baked in at build time, so adding, changing, or removing a custom domain requires a re-deploy — until then internal links point at the old path
- Don't set the `base-path` input alongside a custom domain — GitHub Pages always serves custom domains from the root, so an explicit base path would break links and assets
- A `CNAME` file is not needed: GitHub ignores it for workflow-based deployments (it only applies to branch publishing)

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
├── index.md              # Homepage
├── getting-started.md
├── logo.svg              # Logo (optional)
├── favicon.svg           # Favicon (optional)
└── guides/
    ├── index.md          # Section landing page (optional)
    ├── installation.md
    └── configuration.md
```

An `index.md` at the root of your content directory becomes the homepage. An `index.md` inside a subdirectory becomes that section's landing page.

## Frontmatter

Control page metadata with frontmatter:

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

## Customisation Levels

The action supports three levels of customisation:

### 1. Zero config (just inputs)

Only set `site-title` and `content-dir`. The action generates everything.

### 2. Custom Astro config

Add an `astro.config.mjs` to your repo root for full control over Starlight options — sidebar structure, social links, plugins, etc.

### 3. Custom theme components

In a custom `astro.config.mjs`, the bundled theme package [`@myerscode/starlight-theme-yeti`](https://github.com/myerscode/starlight-theme-yeti) accepts overrides to replace or disable individual components. See the [Configuration](../configuration/) page for details.
