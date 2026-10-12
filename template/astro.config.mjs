/**
 * Default Astro config template used by the action.
 * User inputs are injected at build time via environment variables.
 */
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import starlightThemeYeti from '@myerscode/starlight-theme-yeti';

const sidebar = process.env.STARLIGHT_SIDEBAR
  ? JSON.parse(process.env.STARLIGHT_SIDEBAR)
  : undefined;

const social = process.env.STARLIGHT_SOCIAL
  ? JSON.parse(process.env.STARLIGHT_SOCIAL)
  : undefined;

const headerLinks = process.env.STARLIGHT_HEADER_LINKS
  ? JSON.parse(process.env.STARLIGHT_HEADER_LINKS)
  : undefined;

// Theme options (see https://github.com/myerscode/starlight-theme-yeti).
// The theme wires the changelog into the sidebar (or footer, if the sidebar is
// auto-generated) and resolves `slug`/`link` entries pointing at it itself, so
// the config here only needs to pass the file through.
const theme = {
  ...(process.env.STARLIGHT_PALETTE && { palette: process.env.STARLIGHT_PALETTE }),
  ...(process.env.STARLIGHT_CHANGELOG && {
    // Only needed as a footer fallback when there's no sidebar array for the
    // theme to wire the link into; with a custom sidebar it's already linked there.
    changelog: { file: process.env.STARLIGHT_CHANGELOG, showInFooter: !sidebar },
  }),
  ...(headerLinks && { headerLinks }),
  ...(process.env.STARLIGHT_PAGE_ACTIONS && {
    pageActions: JSON.parse(process.env.STARLIGHT_PAGE_ACTIONS),
  }),
};

export default defineConfig({
  site: process.env.STARLIGHT_SITE || undefined,
  base: process.env.STARLIGHT_BASE || undefined,
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    icon(),
    starlight({
      title: process.env.STARLIGHT_TITLE || 'Documentation',
      description: process.env.STARLIGHT_DESCRIPTION || 'Documentation site built with Starlight',
      ...(process.env.STARLIGHT_FAVICON && { favicon: process.env.STARLIGHT_FAVICON }),
      ...(process.env.STARLIGHT_LOGO && { logo: JSON.parse(process.env.STARLIGHT_LOGO) }),
      ...(social && { social }),
      ...(sidebar && { sidebar }),
      plugins: [starlightThemeYeti(theme)],
    }),
  ],
});
