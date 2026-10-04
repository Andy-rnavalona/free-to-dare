import type { NextConfig } from "next";

// Export statique (dossier out/) pour l'hébergement mutualisé OVH : Apache sans
// Node.js. Le cache et la compression des assets sont gérés par public/.htaccess.
// Le site est servi depuis la racine du domaine : la page principale (Açores)
// est à /, et la retraite de Lisbonne garde son chemin /aerial-retreat-lisbon
// (voir src/lib/routes.ts).
const nextConfig: NextConfig = {
  output: "export",
  devIndicators: false,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
