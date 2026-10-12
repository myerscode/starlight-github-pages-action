# Starlight GitHub Pages Action

A GitHub Action that automatically builds and deploys [Starlight](https://starlight.astro.build/) documentation sites to GitHub Pages. Simply provide your Markdown content, and this action handles the entire Starlight setup, build, and deployment process.

## Features

- **Zero Configuration** — no need to set up a Starlight project, just provide your content
- **Automatic Navigation** — generates navigation structure from your content directory
- **Asset Processing** — handles images, PDFs, and other static assets automatically
- **Custom Branding** — custom logos, favicons, sidebar, social links, header navigation, and eight colour palettes
- **Changelog Page** — renders your `CHANGELOG.md` as a styled release history, linked from the sidebar
- **Page Actions** — optional "copy as Markdown" and "open in ChatGPT/Claude" footer links
- **GitHub Pages Aware** — base path and custom domains are detected automatically

## Quick Start

### 1. Enable GitHub Pages

In your repository settings:
1. Go to **Settings** → **Pages**
2. Set **Source** to "GitHub Actions"

> **Note:** This manual step is optional. As long as your workflow has the
> permissions shown in [step 2](#2-create-workflow), the action enables Pages
> for you on the first run. Enabling it here manually is only needed if your
> org blocks workflows from turning Pages on. If Pages can't be enabled either
> way, the action stops early with a message explaining exactly what to fix.

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
| `base-path` | Base path for GitHub Pages deployment (auto-detected if not set, including custom domains) | No | auto |
| `custom-domain` | Custom domain the site is served from (must also be set in Settings > Pages) | No | — |
| `logo` | Path to custom logo file (auto-detects `logo.svg`, `logo-light.svg`, `logo-dark.svg` in the content dir) | No | auto |
| `favicon` | Path to custom favicon file (auto-detects `favicon.svg`/`.ico`/`.png` in the content dir) | No | auto |
| `changelog` | Render a styled changelog page at `/changelog/`: `auto` picks up `CHANGELOG.md` from the repo root, `false` disables, or a path to a file | No | `auto` |
| `palette` | Theme colour palette: `yeti`, `black`, `blue`, `green`, `orange`, `purple`, `red`, `yellow` | No | `yeti` |
| `sidebar` | Sidebar navigation structure in YAML or JSON (passed through to Starlight) | No | auto-generated |
| `social` | Social links for the header in YAML or JSON | No | GitHub link |
| `header-links` | Navigation links in the header, in YAML or JSON | No | — |
| `page-actions` | Footer actions: `copy-markdown`, `open-in-chatgpt`, `open-in-claude` (YAML or JSON) | No | all off |

See the [configuration guide](https://myerscode.github.io/starlight-github-pages-action/guides/configuration/) for details and the [examples](https://myerscode.github.io/starlight-github-pages-action/guides/examples/) for sidebar, social, branding, and custom domain recipes.

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
    logo: "assets/logo.png"
    favicon: "assets/favicon.ico"
    palette: "blue"
    sidebar: |
      - label: Home
        slug: ""
      - label: Guides
        items:
          - autogenerate:
              directory: guides
    social: |
      - label: GitHub
        icon: github
        href: https://github.com/myorg/myrepo
    header-links: |
      - label: "[lucide:book-open] Guides"
        href: /guides/
    page-actions: |
      copy-markdown: true
      open-in-chatgpt: true
```

For a custom domain, configure it in **Settings → Pages** and (optionally) pin it with `custom-domain: "docs.example.com"` — the base path is auto-detected either way. For full control over Starlight, add an `astro.config.mjs` to your repo root; see the [examples](https://myerscode.github.io/starlight-github-pages-action/guides/examples/#with-custom-astro-config).

## Requirements

- Content directory with at least one Markdown file
- Workflow with all three of these permissions — they're always required:
  ```yaml
  permissions:
    contents: read
    pages: write
    id-token: write
  ```

With those permissions the action enables GitHub Pages for you on the first run
and deploys the site. Enabling Pages manually in repo settings (Settings → Pages
→ Source: "GitHub Actions") is optional — it does not remove the need for any of
the permissions above, and is only useful if your org blocks workflows from
enabling Pages.

## Troubleshooting

**Build fails with "Content directory not found"**
Verify your `content-dir` path is correct relative to your repository root.

**"Could not configure GitHub Pages for this repository"**
Pages isn't enabled and the action couldn't enable it. Make sure your workflow
has all three required permissions:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

If your org restricts enabling Pages from a workflow, enable it manually as well (Settings → Pages → Source: "GitHub Actions"), then re-run.

**No pages generated**
Make sure you have at least one `.md` or `.mdx` file in your content directory. An `index.md` is recommended for the homepage.

## License

MIT
