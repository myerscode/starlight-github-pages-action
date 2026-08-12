/**
 * Default Astro config template used by the action.
 * User inputs are injected at build time via environment variables.
 */
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

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
      customCss: [
        './theme/styles/global.css',
        './theme/styles/theme.css',
      ],
      components: {
        SkipLink: './theme/components/SkipLink.astro',
        PageFrame: './theme/components/PageFrame.astro',
        TwoColumnContent: './theme/components/TwoColumnContent.astro',
        Header: './theme/components/Header.astro',
        Sidebar: './theme/components/Sidebar.astro',
        SidebarSublist: './theme/components/SidebarSublist.astro',
        PageSidebar: './theme/components/PageSidebar.astro',
        Banner: './theme/components/Banner.astro',
        ContentPanel: './theme/components/ContentPanel.astro',
        PageTitle: './theme/components/PageTitle.astro',
        Hero: './theme/components/Hero.astro',
        MarkdownContent: './theme/components/MarkdownContent.astro',
        Footer: './theme/components/Footer.astro',
        LastUpdated: './theme/components/LastUpdated.astro',
        EditLink: './theme/components/EditLink.astro',
        Pagination: './theme/components/Pagination.astro',
        ThemeSelect: './theme/components/ThemeSelect.astro',
      },
    }),
  ],
});
