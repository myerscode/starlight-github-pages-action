/**
 * Default Astro config template used by the action.
 * User inputs are injected at build time via environment variables.
 */
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import starlightThemeYeti from '@myerscode/starlight-theme-yeti';

let sidebar = process.env.STARLIGHT_SIDEBAR
  ? JSON.parse(process.env.STARLIGHT_SIDEBAR)
  : undefined;

const social = process.env.STARLIGHT_SOCIAL
  ? JSON.parse(process.env.STARLIGHT_SOCIAL)
  : undefined;

// The theme renders the changelog as a route (not a content entry) and appends
// its own sidebar link. A user sidebar entry pointing at it would either fail
// validation (`slug`) or duplicate the link (`link`), so lift it out and keep
// the user's label for the theme-managed link instead.
const changelogFile = process.env.STARLIGHT_CHANGELOG;
let changelogLabel;

const isChangelogEntry = (item) =>
  item.slug === 'changelog' || /^\/?changelog\/?$/.test(item.link ?? '');

const withoutChangelog = (items) =>
  items.flatMap((item) => {
    if (isChangelogEntry(item)) {
      changelogLabel ??= item.label;
      return [];
    }
    if (Array.isArray(item.items)) {
      const items = withoutChangelog(item.items);
      return items.length ? [{ ...item, items }] : [];
    }
    return [item];
  });

if (changelogFile && sidebar) {
  sidebar = withoutChangelog(sidebar);
}

// Theme options (see https://github.com/myerscode/starlight-theme-yeti)
// The theme can only append its changelog link to an explicit sidebar array; with
// Starlight's auto-generated navigation (no sidebar input) it has nowhere to put
// it, so link from the footer instead to keep the page reachable.
const theme = {
  ...(process.env.STARLIGHT_PALETTE && { palette: process.env.STARLIGHT_PALETTE }),
  ...(changelogFile && {
    changelog: {
      file: changelogFile,
      showInFooter: !sidebar,
      ...(changelogLabel && { label: changelogLabel }),
    },
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
