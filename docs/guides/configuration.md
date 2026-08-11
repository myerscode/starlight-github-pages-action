---
title: "Configuration"
description: "All configuration options for the action"
---

## Action Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `site-title` | Title for the documentation site | Yes | — |
| `content-dir` | Directory containing your Markdown files | No | `docs` |
| `site-description` | Description for SEO and metadata | No | `Documentation site built with Starlight` |
| `base-path` | Base path for deployment (auto-detected from GitHub Pages) | No | — |
| `logo` | Path to a custom logo file (relative to repo root) | No | — |
| `favicon` | Path to a custom favicon file (relative to repo root) | No | — |
| `changelog` | Include changelog in docs. `"auto"`, `"false"`, or a file path | No | `auto` |
| `sidebar` | JSON array defining sidebar structure | No | auto-generated |
| `social` | JSON array of social links | No | GitHub link |

## Action Outputs

| Output | Description |
|--------|-------------|
| `site-url` | The deployed GitHub Pages URL |
| `build-status` | `success` or `failure` |

## Base Path

The action automatically detects the correct base path using `actions/configure-pages`. For project sites (`username.github.io/repo-name`), this is `/repo-name/`.

You only need to set `base-path` manually if you're deploying to a custom domain with a subpath.

## Sidebar

By default, the sidebar is auto-generated from your content directory structure. To customise it, pass a JSON array:

```yaml
- uses: myerscode/starlight-github-pages-action@main
  with:
    site-title: "My Docs"
    sidebar: |
      [
        { "label": "Home", "slug": "" },
        { "label": "Guides", "items": [
          { "label": "Setup", "slug": "guides/setup" },
          { "label": "Config", "slug": "guides/config" }
        ]}
      ]
```

For full control (icons, linkable groups, autogenerate), use a custom `astro.config.mjs` instead.

## Social Links

By default, a GitHub link to your repository is shown in the header. To customise:

```yaml
- uses: myerscode/starlight-github-pages-action@main
  with:
    site-title: "My Docs"
    social: |
      [
        { "label": "GitHub", "icon": "github", "href": "https://github.com/myorg/myrepo" },
        { "label": "Discord", "icon": "discord", "href": "https://discord.gg/invite" }
      ]
```

## Changelog

By default, the action auto-detects a `CHANGELOG.md` in your repo root and includes it in the docs as `/changelog/`. The priority order:

1. **A changelog in your content directory** (`docs/changelog.md`) takes precedence — you manage it fully
2. **Auto-detection** — looks for `CHANGELOG.md`, `changelog.md` etc. in the repo root and wraps it with frontmatter
3. **Custom path** — set `changelog: "path/to/my-changelog.md"` to specify a different file
4. **Disabled** — set `changelog: "false"` to skip entirely
5. **Sidebar placement** — if using a custom `astro.config.mjs`, add it to your sidebar wherever you want:

```javascript
sidebar: [
  // ... other items
  { label: 'Changelog', slug: 'changelog' },
]
```

```yaml
# Auto (default) — picks up CHANGELOG.md from repo root
- uses: myerscode/starlight-github-pages-action@main
  with:
    site-title: "My Docs"

# Disabled
- uses: myerscode/starlight-github-pages-action@main
  with:
    site-title: "My Docs"
    changelog: "false"

# Custom path
- uses: myerscode/starlight-github-pages-action@main
  with:
    site-title: "My Docs"
    changelog: "docs/HISTORY.md"
```

## Custom Astro Configuration

For full control over Starlight, place an `astro.config.mjs` at your repository root. When detected, the action uses it instead of generating one — injecting the correct `site` and `base` values automatically.

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

## Custom Theme

If your repo contains a `theme/` directory, the action copies it into the build. This lets you override Starlight components and styles.

The bundled theme in this action provides:
- Custom sidebar with icon support and collapsible linked groups
- Styled pagination cards
- Dark/light mode toggle (system, light, dark)
- Clean header with search, social icons, and branding

## Logos

Place logo files in your content directory for automatic pickup:

- **Single logo:** `docs/logo.svg` — used for both modes
- **Light/dark pair:** `docs/logo-dark.svg` and `docs/logo-light.svg` — swapped based on theme

The favicon is set via the `favicon` action input or the `favicon` option in your Starlight config.

## Sidebar Icons

When using a custom `astro.config.mjs`, you can add icons to sidebar labels using the `[icon-set:icon-name]` syntax:

```javascript
sidebar: [
  { label: '[lucide:rocket] Getting Started', slug: '' },
  {
    label: '[lucide:book-open] Guides',
    items: [
      { label: '[lucide:wrench] Setup', slug: 'guides/setup' },
    ],
  },
]
```

This requires `astro-icon` and an icon set (e.g. `@iconify-json/lucide`) as dependencies.

## Linkable Group Headings

Use the `linkableGroups` helper to make sidebar group headings clickable (linking to an index page) while keeping child items visible:

```javascript
import { linkableGroups } from './theme/sidebar.ts';

starlight({
  sidebar: linkableGroups([
    {
      label: 'Guides',
      slug: 'guides',         // Makes the heading link to /guides/
      items: [
        { label: 'Setup', slug: 'guides/setup' },
        { label: 'Config', slug: 'guides/configuration' },
      ],
    },
  ]),
})
```

The `slug` on a group tells the sidebar component to render the heading as a link. Without a `slug`, the heading is just a collapsible label.

## Supported Content

**Markdown:** `.md`, `.mdx`

**Assets:** images, PDFs, and other non-markdown files in your content directory are copied to `public/assets/` automatically.

Reference them in markdown:

```markdown
![Diagram](./assets/diagram.png)
```
