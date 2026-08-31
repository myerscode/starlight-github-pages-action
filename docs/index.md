---
title: "Getting Started"
description: "Deploy Starlight documentation to GitHub Pages with zero configuration"
---

Deploy beautiful [Starlight](https://starlight.astro.build/) documentation sites to GitHub Pages without setting up a project. Provide your Markdown, and the action handles everything else.

## How it Works

1. You write Markdown files in a `docs/` directory
2. The action scaffolds a Starlight project, copies your content in, and builds it
3. The built site is deployed to GitHub Pages automatically

No `package.json`, no `node_modules`, no Astro project to maintain — just your content.

## Quick Start

Create `.github/workflows/deploy-docs.yml` in your repository:

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

Then add Markdown files to a `docs/` directory and push. Your site will be live at `https://<user>.github.io/<repo>/`.

## What You Get

- Responsive navigation sidebar with collapsible groups
- Full-text search (Pagefind)
- Dark/light mode toggle
- GitHub link in the header
- Prev/next pagination
- Custom theme with icon support
- Branded 404 page out of the box
- Automatic base path detection for GitHub Pages

## Requirements

- GitHub Pages enabled in your repo settings (source: "GitHub Actions")
- At least one `.md` or `.mdx` file in your content directory
- The workflow permissions shown above (`pages: write`, `id-token: write`)
