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
      plugins: [starlightThemeYeti()],
    }),
  ],
});
