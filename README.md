# Starlight GitHub Pages Action

A GitHub Action that automatically builds and deploys [Starlight](https://starlight.astro.build/) documentation sites to GitHub Pages. Simply provide your Markdown content, and this action handles the entire Starlight setup, build, and deployment process.

## Features

- **Zero Configuration** — no need to set up a Starlight project, just provide your content
- **Automatic Navigation** — generates navigation structure from your content directory
- **Asset Processing** — handles images, PDFs, and other static assets automatically
- **Custom Branding** — support for custom logos, favicons, and site configuration

## Quick Start

### 1. Enable GitHub Pages

In your repository settings:
1. Go to **Settings** → **Pages**
2. Set **Source** to "GitHub Actions"

### 2. Create Workflow

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

### 3. Add Your Content

Create a `docs/` directory with your Markdown files:

```
docs/
├── index.md
├── getting-started.md
└── guides/
    ├── installation.md
    └── configuration.md
```

That's it! Your documentation will be automatically built and deployed to GitHub Pages.

## Configuration

### Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `site-title` | Title for the documentation site | Yes | — |
| `content-dir` | Directory containing documentation content | No | `docs` |
| `site-description` | Description for SEO and metadata | No | `Documentation site built with Starlight` |
| `base-path` | Base path for GitHub Pages deployment | No | — |
| `logo` | Path to custom logo file | No | — |
| `favicon` | Path to custom favicon file | No | — |

### Outputs

| Output | Description |
|--------|-------------|
| `site-url` | The deployed GitHub Pages URL |
| `build-status` | Success/failure status of the build process |

## Content Structure

```
docs/
├── index.md              # Homepage (required)
├── getting-started.md    # Top-level page
├── guides/               # Section
│   ├── installation.md
│   └── configuration.md
└── assets/               # Static assets
    ├── image.png
    └── diagram.pdf
```

### Frontmatter

Add frontmatter to your Markdown files to control navigation and metadata:

```markdown
---
title: "Getting Started"
description: "Learn how to get started"
sidebar:
  order: 1
  label: "Quick Start"
---

Your content here...
```

Supported fields:
- `title` — page title (auto-generated from filename if not provided)
- `description` — page description for SEO
- `sidebar.order` — order in navigation (lower numbers first)
- `sidebar.label` — custom label in navigation

### Assets

Place images and other assets in your content directory. They'll be copied to `public/assets/` and available in your site:

```markdown
![Screenshot](./assets/screenshot.png)
```

## Advanced Example

```yaml
- uses: myerscode/starlight-github-pages-action@main
  with:
    site-title: "My Project Documentation"
    site-description: "Comprehensive guide for My Project"
    content-dir: "documentation"
    base-path: "/my-project"
    logo: "assets/logo.png"
    favicon: "assets/favicon.ico"
```

## Requirements

- Repository with GitHub Pages enabled (source set to "GitHub Actions")
- Content directory with at least one Markdown file
- Workflow with `contents: read`, `pages: write`, and `id-token: write` permissions

## Troubleshooting

**Build fails with "Content directory not found"**
Verify your `content-dir` path is correct relative to your repository root.

**Permission denied / Pages not enabled**
Ensure GitHub Pages is enabled in repo settings with source set to "GitHub Actions", and that your workflow has the required permissions block.

**No pages generated**
Make sure you have at least one `.md` or `.mdx` file in your content directory. An `index.md` is recommended for the homepage.

## License

MIT
