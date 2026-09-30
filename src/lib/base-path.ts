/** Sub-folder the site is served from on OVH; next.config.ts reads it too. */
export const BASE_PATH = "/aerial-retreat-lisbon";

/**
 * A URL of the site under BASE_PATH, for what Next.js doesn't prefix itself:
 * files of public/ (next/image, <video>, posters) and plain <a> links.
 * <Link> and router paths get the prefix automatically.
 */
export function withBasePath(path: string) {
  return `${BASE_PATH}${path}`;
}
