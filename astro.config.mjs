import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Starlight GitHub Pages Action',
      description: 'Zero-config Starlight documentation deployment to GitHub Pages',
      social: [{ label: 'GitHub', icon: 'github', href: 'https://github.com/myerscode/starlight-github-pages-action' }],
      sidebar: [
        { label: 'Getting Started', slug: '' },
        {
          label: 'Usage Guides',
          items: [
            { label: 'Setup', slug: 'guides/setup' },
            { label: 'Configuration', slug: 'guides/configuration' },
            { label: 'Examples', slug: 'guides/examples' },
          ],
        },
      ],
    }),
  ],
});
