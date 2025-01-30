import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import legacy from "@vitejs/plugin-legacy";
import Inspect from "vite-plugin-inspect";
import postcss from "postcss";
import htmlMinifier from "vite-plugin-html-minifier";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
    open: true,
  },
  plugins: [
    Inspect(),
    ViteImageOptimizer({
      png: {
        quality: 60,
      },
      jpeg: {
        quality: 60,
      },
      jpg: {
        quality: 60,
      },
      webp: {
        quality: 60,
      },
      svgo: {
        plugins: [{ removeViewBox: false }],
      },
    }),
    htmlMinifier({
      minify: true,
    }),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
  css: {
    devSourcemap: true,
    postcss,
    scss: {
      api: "modern-compiler",
    },
  },
  build: {
    sourcemap: true,
    outDir: "dist",
    emptyOutDir: true,
    assetsDir: "",
    manifest: true,
    minify: true,
    cssMinify: true,

    rollupOptions: {
      input: {
        main: "index.html",
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.names)) {
            return "img/[name][extname]";
          }
          if (/\.(css)$/.test(assetInfo.names)) {
            return "css/style[extname]";
          }
          if (/\.(woff|woff2|ttf|otf|eot)$/.test(assetInfo.names)) {
            return "fonts/[name][extname]";
          }
          return "assets/[name][extname]";
        },
        entryFileNames: "js/[name].js",
        chunkFileNames: "js/[name].js",
      },
    },
  },
});
