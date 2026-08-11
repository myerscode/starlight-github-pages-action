---
title: "Component Showcase"
description: "Visual overview of all custom theme components"
banner:
  content: "This is a <strong>banner</strong> — used for announcements and important notices."
---

This page demonstrates all the custom theme components.

## Typography

### Third-level heading

#### Fourth-level heading

Regular paragraph text with **bold**, *italic*, `inline code`, and [a link](/guides/setup/).

> Blockquotes look like this. Useful for callouts and important notes.

## Code Blocks

```yaml
name: Deploy Documentation
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: myerscode/starlight-github-pages-action@main
        with:
          site-title: "My Docs"
```

```typescript
interface Config {
  siteTitle: string;
  contentDir?: string;
  changelog?: 'auto' | 'false' | string;
}

function deploy(config: Config): Promise<void> {
  return buildAndDeploy(config);
}
```

## Tables

| Input | Description | Default |
|-------|-------------|---------|
| `site-title` | Documentation site title | — |
| `content-dir` | Content directory | `docs` |
| `changelog` | Changelog handling | `auto` |
| `base-path` | Deployment base path | auto-detected |

## Lists

### Unordered

- Sidebar with icons and collapsible groups
- Light/dark/system theme toggle
- Prev/next pagination cards
  - With directional arrows
  - Styled borders and hover states
- Full-text search via Pagefind

### Ordered

1. Enable GitHub Pages in repo settings
2. Create the workflow file
3. Add markdown content to `docs/`
4. Push to trigger deployment

## Horizontal Rule

---

## Admonitions

:::note
This is a **note** — general information the reader should be aware of.
:::

:::tip
This is a **tip** — a helpful suggestion or best practice.
:::

:::caution
This is a **caution** — something to watch out for.
:::

:::danger
This is a **danger** warning — a critical issue that could cause problems.
:::
