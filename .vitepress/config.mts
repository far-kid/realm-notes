import { defineConfig } from "vitepress";
import { generateSidebar } from "vitepress-sidebar";
import { VitePWA } from "vite-plugin-pwa";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [
      VitePWA({
        registerType: "autoUpdate",
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,jpg,pdf,svg,woff2}"],
          maximumFileSizeToCacheInBytes: 20 * 1024 * 1024, // 10 MB
        },
        manifest: {
          name: "My Docs",
          short_name: "Docs",
          theme_color: "#ffffff",
          icons: [
            { src: "/love.png", sizes: "192x192", type: "image/png" },
            { src: "/love.png", sizes: "512x512", type: "image/png" },
          ],
        },
      }),
    ],
    ssr: {
      noExternal: [
        // "@nolebase/vitepress-plugin-enhanced-readabilities",
        // "@nolebase/ui",
      ],
    },
  },
  title: "Realm Notes",
  description: "A site for me :)",
  head: [["link", { rel: "icon", type: "image/png", href: "/love.png" }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Home", link: "/" }],

    sidebar: generateSidebar({
      documentRootPath: "./",
      useTitleFromFileHeading: true,
      hyphenToSpace: true,
      collapsed: true,
      capitalizeFirst: true,
      sortFolderTo: "top",
      sortMenusByName: true,
    }),

    search : {
      provider : 'local'
    }
  },
});
