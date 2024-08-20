import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["**/*"],
      manifest: {
        name: "DK-Redux",
        short_name: "DK-Redux",
        start_url: "/dk-redux/",
        background_color: "black",
        theme_color: "black",
        orientation: "portrait",
        display: "standalone",
        lang: "en",
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
      },
    }),
  ],
  base: "/dk-redux/",
  build: {
    outDir: "build",
  },
});
