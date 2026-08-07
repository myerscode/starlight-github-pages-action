---
title: "Configuration"
description: "All configuration options for the action"
---

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `site-title` | Title for the documentation site | Yes | — |
| `content-dir` | Directory containing your Markdown files | No | `docs` |
| `site-description` | Description for SEO and metadata | No | `Documentation site built with Starlight` |
| `base-path` | Base path for deployment (auto-detected from GitHub Pages) | No | — |
| `logo` | Path to a custom logo file (relative to repo root) | No | — |
| `favicon` | Path to a custom favicon file (relative to repo root) | No | — |

## Outputs

| Output | Description |
|--------|-------------|
| `site-url` | The deployed GitHub Pages URL |
| `build-status` | `success` or `failure` |

## How Base Path Works

The action automatically detects the correct base path from GitHub Pages configuration using `actions/configure-pages`. For project sites (`username.github.io/repo-name`), this is `/repo-name/`.

You only need to set `base-path` manually if you're deploying to a custom domain with a subpath.

## Custom Astro Configuration

If you need full control over Starlight — custom sidebar, plugins, themes, or other Astro integrations — place an `astro.config.mjs` at your repository root.

When detected, the action copies it directly into the build instead of generating one. Your config must import and configure `@astrojs/starlight` itself. The `site` and `base` values will still need to be correct for your deployment target.

```javascript
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'My Docs',
      sidebar: [
        { label: 'Home', slug: '' },
        {
          label: 'Guides',
          items: [
            { label: 'Getting Started', slug: 'guides/getting-started' },
            { label: 'Advanced', slug: 'guides/advanced' },
          ],
        },
      ],
    }),
  ],
});
```

## Supported Content

**Markdown:** `.md`, `.mdx`

**Assets (copied to `public/assets/`):** images (`.png`, `.jpg`, `.svg`, `.webp`, `.gif`), documents (`.pdf`), and any other non-markdown files in your content directory.

Reference assets from your markdown relative to the content directory:

```markdown
![Diagram](./assets/diagram.png)
```
