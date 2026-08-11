import type { StarlightPlugin } from "@astrojs/starlight/types";

export function starlightPages(): StarlightPlugin {
  return {
    name: "starlight-pages-theme",
    hooks: {
      setup: ({ config, updateConfig }) => {
        const customCss = [
          ...(config.customCss || []),
          "@/theme/styles/layers.css",
          "@/theme/styles/theme.css",
          "@/theme/styles/code.css",
        ];

        updateConfig({
          customCss,
          components: {
            ...config.components,
            Sidebar: "@/theme/components/Sidebar.astro",
            Pagination: "@/theme/components/Pagination.astro",
            Hero: "@/theme/components/Hero.astro",
            PageTitle: "@/theme/components/PageTitle.astro",
          },
        });
      },
    },
  };
}
