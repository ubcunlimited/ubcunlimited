import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // Target modern browsers to reduce legacy polyfills (saves ~20 KiB)
    // es2022 eliminates Object.assign polyfills, async iterator helpers, etc.
    target: "es2022",
    // Minification
    minify: "esbuild",
    cssMinify: true,
    // Split CSS per chunk so lazy-loaded routes only load their own CSS
    cssCodeSplit: true,
    // Generate manifest.json so the server can always inject the correct hashed entry script
    manifest: true,
    // Content-hash filenames for immutable caching
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const ext = (assetInfo.name ?? "").split(".").pop() ?? "";
          if (ext === "css") return "assets/css/[name]-[hash][extname]";
          if (["woff", "woff2", "ttf", "otf", "eot"].includes(ext))
            return "assets/fonts/[name]-[hash][extname]";
          return "assets/[name]-[hash][extname]";
        },
        // Safe manualChunks: only split well-known non-circular packages.
        // The vendor-misc catch-all was removed because it caused TDZ
        // (temporal dead zone) circular-dependency errors at runtime.
        // Vite/Rollup handles remaining packages automatically.
        manualChunks(id) {
          // React core — always needed, cache separately
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) {
            return "vendor-react";
          }
          // framer-motion is large (~80 KB gzip) and used on many pages
          if (id.includes("node_modules/framer-motion")) {
            return "vendor-motion";
          }
          // tRPC + react-query — API layer, needed on all pages
          if (id.includes("node_modules/@trpc/") || id.includes("node_modules/@tanstack/")) {
            return "vendor-trpc";
          }
          // lucide-react icons — large tree-shakeable icon library
          if (id.includes("node_modules/lucide-react")) {
            return "vendor-icons";
          }
          // NOTE: No vendor-misc catch-all — that caused TDZ circular-dep errors.
          // Let Vite/Rollup handle remaining node_modules automatically.
        },
      },
    },
  },
  server: {
    host: true,
    allowedHosts: ["localhost", "127.0.0.1"],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
