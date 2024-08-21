import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/dk-redux/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["**/*"],
      manifest: {
        id: "DK-Redux",
        name: "DK-Redux",
        short_name: "DK-Redux",
        start_url: "/dk-redux/",
        background_color: "#000000",
        theme_color: "#000000",
        orientation: "any",
        display: "fullscreen",
        launch_handler: {
          client_mode: "focus-existing",
        },
        categories: ["games", "education", "entertainment"],
        description:
          "A reduxed-remixed-remake of Donkey Kong, the original arcade game from 1981.",
        icons: [
          {
            src: "/dk-redux/android-chrome-36x36.png",
            sizes: "36x36",
            type: "image/png",
          },
          {
            src: "/dk-redux/android-chrome-48x48.png",
            sizes: "48x48",
            type: "image/png",
          },
          {
            src: "/dk-redux/android-chrome-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "/dk-redux/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/dk-redux/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/dk-redux/screenshot-640x1136.png",
            sizes: "640x1136",
            type: "image/png",
          },
          {
            src: "/dk-redux/screenshot-750x1334.png",
            sizes: "750x1334",
            type: "image/png",
          },
          {
            src: "/dk-redux/screenshot-1242x2208.png",
            sizes: "1242x2208",
            type: "image/png",
          },
        ],
        lang: "en",
        dir: "ltr",
        prefer_related_applications: false,
      },
    }),
  ],
  build: {
    outDir: "build",
  },
});
