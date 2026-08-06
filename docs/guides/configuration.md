---
title: "Configuration"
description: "Configuration options for the action"
sidebar:
  order: 2
---

# Configuration

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `site-title` | Title for the documentation site | Yes | - |
| `content-dir` | Directory containing documentation content | No | `docs` |
| `site-description` | Description for SEO and metadata | No | `Documentation site built with Starlight` |
| `base-path` | Base path for GitHub Pages deployment | No | `` |
| `logo` | Path to custom logo file | No | `` |
| `favicon` | Path to custom favicon file | No | `` |

## Outputs

| Output | Description |
|--------|-------------|
| `site-url` | The deployed GitHub Pages URL |
| `build-status` | Success/failure status of the build process |

## Examples

### Basic

```yaml
- uses: myerscode/starlight-github-pages-action@v1
  with:
    site-title: "My Docs"
    content-dir: "docs"
```

### With Custom Branding

```yaml
- uses: myerscode/starlight-github-pages-action@v1
  with:
    site-title: "My Project"
    site-description: "Full project documentation"
    content-dir: "documentation"
    logo: "assets/logo.png"
    favicon: "assets/favicon.ico"
```
