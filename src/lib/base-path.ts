/**
 * Sub-folder the site is served from; next.config.ts reads it too.
 * The site is now served from the domain root — the Azores homepage is at `/`
 * and the Lisbon retreat keeps its own `/aerial-retreat-lisbon` route (see
 * lib/routes.ts). Set this again if the whole site ever moves into a folder.
 */
export const BASE_PATH = "";

/**
 * A URL of the site under BASE_PATH, for what Next.js doesn't prefix itself:
 * files of public/ (next/image, <video>, posters) and plain <a> links.
 * <Link> and router paths get the prefix automatically.
 */
export function withBasePath(path: string) {
  return `${BASE_PATH}${path}`;
}
