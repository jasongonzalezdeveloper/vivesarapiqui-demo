import path from "node:path";
import type { NextConfig } from "next";

/**
 * Ruta base del sitio. En GitHub Pages sin dominio propio el sitio vive en
 * /vivesarapiqui-demo; con dominio propio queda vacía. El workflow de deploy
 * la toma de actions/configure-pages.
 */
const basePath = process.env.NEXT_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Exportación estática: el sitio es solo frontend y se publica en GitHub Pages.
  output: "export",
  trailingSlash: true,
  basePath,
  // Cache Components y Partial Prefetching necesitan servidor; no aplican a una exportación estática.
  turbopack: {
    // Hay un package-lock.json en una carpeta superior; fijamos la raíz al proyecto.
    root: path.join(__dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
