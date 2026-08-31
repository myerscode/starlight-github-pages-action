---
title: "Configuration"
description: "All configuration options for the action"
---

## Action Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| [`site-title`](#site-title) | Title for the documentation site | Yes | — |
| [`content-dir`](#content-directory) | Directory containing your Markdown files | No | `docs` |
| [`site-description`](#site-description) | Description for SEO and metadata | No | `Documentation site built with Starlight` |
| [`base-path`](#base-path) | Base path for deployment (auto-detected) | No | auto |
| [`logo`](#logos) | Path to a custom logo file | No | auto-detected |
| [`favicon`](#favicon) | Path to a custom favicon file | No | auto-detected |
| [`changelog`](#changelog) | Include changelog in docs | No | `auto` |
| [`sidebar`](#sidebar) | Sidebar navigation structure (YAML or JSON) | No | auto-generated |
| [`social`](#social-links) | Social links in header (YAML or JSON) | No | GitHub link |

## Action Outputs

| Output | Description |
|--------|-------------|
| `site-url` | The deployed GitHub Pages URL |
| `build-status` | `success` or `failure` |

---

## Site Title

Required. Shown in the header and browser tab.

```yaml
with:
  site-title: "My Project Documentation"
```

## Site Description

Used for SEO meta tags.

```yaml
with:
  site-description: "API reference and guides for My Project"
```

## Content Directory

Where your Markdown files live. Defaults to `docs`.

```yaml
with:
  content-dir: "documentation"
```

## Base Path

Auto-detected from GitHub Pages. Only override for custom domains with a subpath.

```yaml
with:
  base-path: "/custom-subpath"
```

## Sidebar

Accepts YAML or JSON. Defines the navigation structure. If not set, the sidebar is auto-generated from your content directory.

[See sidebar examples →](../examples/#with-custom-sidebar)

```yaml
with:
  sidebar: |
    - label: Home
      slug: ""
    - label: Guides
      items:
        - label: Setup
          slug: guides/setup
        - label: Configuration
          slug: guides/configuration
```

## Social Links

Accepts YAML or JSON. Shown as icons in the header. Defaults to a GitHub link to your repository.

[See social examples →](../examples/#with-social-links)

```yaml
with:
  social: |
    - label: GitHub
      icon: github
      href: https://github.com/myorg/myrepo
    - label: Discord
      icon: discord
      href: https://discord.gg/invite
```

Available icons: `github`, `discord`, `x.com`, `mastodon`, `youtube`, `twitch`, `linkedin`, `threads`, and others from [Starlight's social icons](https://starlight.astro.build/reference/configuration/#social).

## Changelog

Auto-detects `CHANGELOG.md` from your repo root and includes it in the docs.

[See changelog examples →](../examples/#changelog)

| Value | Behaviour |
|-------|-----------|
| `auto` (default) | Looks for `CHANGELOG.md` in repo root |
| `false` | Disables changelog inclusion |
| `path/to/file.md` | Uses a specific file |

Priority: a `changelog.md` inside your content directory always takes precedence over auto-detection.

## Logos

Auto-detected from your content directory. Place files with these names and they're picked up automatically:

| File | Purpose |
|------|---------|
| `logo-dark.svg` | Shown in light mode (dark-coloured logo) |
| `logo-light.svg` | Shown in dark mode (light-coloured logo) |
| `logo.svg` | Single logo for both modes |

If you prefer to specify explicitly:

```yaml
with:
  logo: "assets/my-logo.png"
```

[See logo examples →](../examples/#with-custom-branding)

## Favicon

Auto-detected from your content directory. Looks for `favicon.svg`, `favicon.ico`, or `favicon.png`.

To specify explicitly:

```yaml
with:
  favicon: "assets/my-favicon.ico"
```

## Custom Astro Configuration

For full control, place an `astro.config.mjs` at your repository root. The action uses it instead of generating one — `site` and `base` are injected automatically.

When using a custom config, the theme package [`@myerscode/starlight-theme-yeti`](https://github.com/myerscode/starlight-theme-yeti) is installed and available to import.

## 404 Page

The theme ships a branded 404 page — every site gets one with no setup. To customise it, add a `404.md` or `404.mdx` to your content directory; a `hero.image` in its frontmatter replaces the theme's artwork. If you use a [custom Astro config](#custom-astro-configuration), the theme plugin also accepts `notFoundImage: './path/to/image.svg'` (or `false` to disable the artwork).

[See custom config examples →](../examples/#with-custom-astro-config)

## Supported Content

| Type | Extensions |
|------|-----------|
| Markdown | `.md`, `.mdx` |
| Assets | images, PDFs, SVGs — any non-markdown file in your content dir |

Assets are copied to `public/assets/` and can be referenced in markdown:

```markdown
![Diagram](./assets/diagram.png)
```
