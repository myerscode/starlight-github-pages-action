# Starlight GitHub Pages Action

A GitHub Action that automatically builds and deploys [Starlight](https://starlight.astro.build/) documentation sites to GitHub Pages. Simply provide your Markdown content, and this action handles the entire Starlight setup, build, and deployment process.

## ✨ Features

- **Zero Configuration**: No need to set up a Starlight project - just provide your content
- **Automatic Navigation**: Generates navigation structure from your content directory
- **Asset Processing**: Handles images, PDFs, and other static assets automatically
- **Frontmatter Validation**: Validates and processes Markdown frontmatter for Starlight compatibility
- **Custom Branding**: Support for custom logos, favicons, and site configuration
- **Error Handling**: Comprehensive error reporting and troubleshooting guidance

## 🚀 Quick Start

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
      - name: Checkout
        uses: actions/checkout@v4

      - name: Deploy to GitHub Pages
        id: deployment
        uses: myerscode/starlight-github-pages-action@v1
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

## 📖 Usage

### Basic Example

```yaml
- uses: myerscode/starlight-github-pages-action@v1
  with:
    site-title: "My Project Docs"
    content-dir: "docs"
```

### Advanced Example

```yaml
- uses: myerscode/starlight-github-pages-action@v1
  with:
    site-title: "My Project Documentation"
    site-description: "Comprehensive guide for My Project"
    content-dir: "documentation"
    base-path: "/my-project"
    logo: "assets/logo.png"
    favicon: "assets/favicon.ico"
```

## ⚙️ Configuration

### Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `site-title` | Title for the documentation site | ✅ | - |
| `content-dir` | Directory containing documentation content | ❌ | `docs` |
| `site-description` | Description for SEO and metadata | ❌ | `Documentation site built with Starlight` |
| `base-path` | Base path for GitHub Pages deployment | ❌ | `` |
| `logo` | Path to custom logo file | ❌ | `` |
| `favicon` | Path to custom favicon file | ❌ | `` |

### Outputs

| Output | Description |
|--------|-------------|
| `site-url` | The deployed GitHub Pages URL |
| `build-status` | Success/failure status of the build process |

## 📁 Content Structure

### Directory Layout

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
description: "Learn how to get started with our project"
sidebar:
  order: 1
  label: "Quick Start"
---

# Getting Started

Your content here...
```

#### Supported Frontmatter Fields

- `title`: Page title (auto-generated from filename if not provided)
- `description`: Page description for SEO
- `sidebar.order`: Order in navigation (lower numbers appear first)
- `sidebar.label`: Custom label in navigation
- `draft`: Set to `true` to exclude from navigation

### Asset Handling

Place images and other assets in your content directory. They'll be automatically processed and made available in your site:

```markdown
![My Image](./assets/screenshot.png)
[Download PDF](./assets/guide.pdf)
```

## 🔧 Troubleshooting

### Common Issues

#### Build Fails with "Site title is required"
Ensure you've provided the `site-title` input:
```yaml
with:
  site-title: "Your Site Title"
```

#### Content Directory Not Found
Verify your `content-dir` path is correct relative to your repository root:
```yaml
with:
  content-dir: "docs"  # Should contain your .md files
```

#### Permission Denied Errors
Ensure your workflow has the required permissions:
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

#### Logo/Favicon Not Found
Check that the file paths are correct relative to your repository root:
```yaml
with:
  logo: "assets/logo.png"      # File should exist at ./assets/logo.png
  favicon: "assets/favicon.ico" # File should exist at ./assets/favicon.ico
```

### Debug Mode

Add this step before the action to enable debug logging:
```yaml
- name: Enable Debug
  run: echo "ACTIONS_STEP_DEBUG=true" >> $GITHUB_ENV
```

### Getting Help

1. Check the [GitHub Actions logs](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/using-workflow-run-logs) for detailed error messages
2. Verify your content directory structure matches the expected format
3. Ensure all Markdown files have valid frontmatter (if used)
4. Check that GitHub Pages is enabled in your repository settings

## 🎨 Customization

### Custom Styling

While this action provides a complete Starlight setup, you can customize the appearance by:

1. Adding custom CSS through frontmatter
2. Using Starlight's built-in theming options
3. Providing custom logo and favicon files

### Navigation Structure

Navigation is automatically generated from your directory structure, but you can control it using frontmatter:

```markdown
---
title: "Advanced Guide"
sidebar:
  order: 10
  label: "Advanced"
---
```

## 📋 Requirements

- Repository with GitHub Pages enabled
- Content directory with Markdown files
- Workflow with appropriate permissions

### Supported File Types

**Content:**
- `.md` - Markdown files
- `.mdx` - MDX files (Markdown with JSX)

**Assets:**
- Images: `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.webp`
- Documents: `.pdf`
- Other static files

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Starlight](https://starlight.astro.build/) by the Astro team
- Powered by [Astro](https://astro.build/)
- Deployed via [GitHub Pages](https://pages.github.com/)