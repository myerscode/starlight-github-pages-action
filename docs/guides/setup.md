---
title: "Setup Guide"
description: "How to set up the Starlight GitHub Pages Action"
sidebar:
  order: 1
---

# Setup Guide

## Prerequisites

- A GitHub repository with GitHub Pages enabled
- Markdown content in a directory (default: `docs/`)

## Step 1: Enable GitHub Pages

1. Go to your repository **Settings** > **Pages**
2. Set **Source** to "GitHub Actions"

## Step 2: Create a Workflow

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
      - uses: actions/checkout@v4
      - uses: myerscode/starlight-github-pages-action@v1
        id: deployment
        with:
          site-title: "My Documentation"
          content-dir: "docs"
```

## Step 3: Add Content

Create a `docs/` directory with your Markdown files. That's it!
