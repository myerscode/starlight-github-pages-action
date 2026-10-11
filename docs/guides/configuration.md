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
| [`custom-domain`](#custom-domain) | Custom domain the site is served from | No | — |
| [`logo`](#logos) | Path to a custom logo file | No | auto-detected |
| [`favicon`](#favicon) | Path to a custom favicon file | No | auto-detected |
| [`changelog`](#changelog) | Render a styled changelog page from a Markdown file | No | `auto` |
| [`palette`](#palette) | Theme colour palette | No | `yeti` |
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

Auto-detected from your GitHub Pages settings — project pages get the repository subpath (e.g. `/my-repo`), and [custom domains](../setup/#custom-domains) are served from the root automatically. Leave this unset unless you're serving the site under a subpath outside GitHub Pages (e.g. behind a reverse proxy).

```yaml
with:
  base-path: "/custom-subpath"
```

## Custom Domain

Declares the custom domain the site is served from. The build targets the domain root (no repository subpath) and uses the domain for canonical URLs, sitemaps, and social metadata.

```yaml
with:
  custom-domain: "docs.example.com"
```

Without this input the domain is auto-detected from your Pages settings, so it's optional — setting it makes the build independent of detection timing. The domain must still be configured in **Settings** > **Pages** (and DNS) for GitHub to serve it; see [Custom Domains](../setup/#custom-domains) for the full setup.

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
    - label: API
      items:
        - autogenerate:
            directory: api
```

Entries are passed straight through to Starlight, so every option in the [sidebar reference](https://starlight.astro.build/guides/sidebar/) works — `slug`, `link`, `items`, `badge`, `collapsed`, and `autogenerate` (which must be nested inside `items`).

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

## Palette

Picks the theme's colour palette, applied to both light and dark mode. Defaults to `yeti` (monochrome silver).

```yaml
with:
  palette: "blue"
```

Available palettes: `yeti`, `black`, `blue`, `green`, `orange`, `purple`, `red`, `yellow`. Values are case-sensitive; an unknown palette fails the build before anything is installed.

## Changelog

Renders a changelog as a styled release-history page at `/changelog/` — each release shows its version, date, and colour-coded sections (Added, Changed, Fixed, Removed, Security, …) — and adds a link to the end of the sidebar. Files in the [Keep a Changelog](https://keepachangelog.com/) format render best; any Markdown with `## [version] - date` headings works.

[See changelog examples →](../examples/#changelog)

| Value | Behaviour |
|-------|-----------|
| `auto` (default) | Looks for `CHANGELOG.md` (or `changelog.md`, `CHANGELOG`, `CHANGELOG.txt`) in the repo root; silently skips if none exists |
| `false` | No changelog page |
| `path/to/file.md` | Uses a specific file; warns and builds without a changelog if it doesn't exist |

A changelog is never required — if no file is found, the site simply builds without the page. Two things to know:

- A `changelog.md` (or `.mdx`) inside your content directory always takes precedence — it's published as a regular page instead, and the rendered version is skipped
- The link is added to the end of the sidebar automatically. If your custom [sidebar](#sidebar) includes its own entry for it (`slug: changelog` or `link: /changelog/`), that entry's label is used for the link instead

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

For full control, place an `astro.config.mjs` at your repository root. The action uses it instead of generating one. Read `process.env.STARLIGHT_SITE` and `process.env.STARLIGHT_BASE` for the `site` and `base` values so links resolve correctly on GitHub Pages:

```javascript
export default defineConfig({
  site: process.env.STARLIGHT_SITE,
  base: process.env.STARLIGHT_BASE,
  // ...
});
```

When using a custom config, the theme package [`@myerscode/starlight-theme-yeti`](https://github.com/myerscode/starlight-theme-yeti) is installed and available to import.

[See a full custom config example →](../examples/#with-custom-astro-config)

## Theme Options

In a custom config, the theme plugin accepts an options object:

```javascript
starlightThemeYeti({
  // Colour palette: 'yeti' (default) | 'black' | 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'yellow'
  palette: 'blue',

  // Render a Keep a Changelog file at /changelog/ with per-release badges,
  // linked from the end of the sidebar (a string is shorthand for `{ file }`)
  changelog: { file: './CHANGELOG.md', showInFooter: true },

  // Image for the built-in 404 page, or `false` to disable the artwork
  notFoundImage: './src/assets/not-found.svg',

  // Replace or disable individual theme components
  overrides: {
    Footer: './src/components/MyFooter.astro',
    Hero: false,
  },
})
```

Code blocks use [Expressive Code](https://expressive-code.com/) with GitHub light/dark themes. Override via Starlight's `expressiveCode` option (e.g. `expressiveCode: { themes: ['vitesse-dark', 'vitesse-light'] }`), or set `expressiveCode: false` to disable it.

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
