import type { NextConfig } from "next";
import { BASE_PATH } from "./src/lib/base-path";

// Export statique (dossier out/) pour l'hébergement mutualisé OVH : Apache sans
// Node.js. Le cache et la compression des assets sont gérés par public/.htaccess.
// Le site est servi depuis le sous-dossier BASE_PATH.
const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE_PATH,
  devIndicators: false,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
