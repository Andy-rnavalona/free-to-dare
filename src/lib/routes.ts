/*
 * Routes of the site that more than one file links to.
 *
 * Each retreat is a landing page under its own path; nothing answers at the
 * domain root for now. The Lisbon retreat and its booking flow keep
 * /aerial-retreat-lisbon, the URL they were deployed at when the whole site
 * was served from that sub-folder: those links are public and must not change.
 */

/** Landing page of the Azores Into The Wild pole retreat */
export const AZORES_RETREAT = "/poledance-azores-retreats";

/** Landing page of the Lisbon Aerial Urban Escape */
export const LISBON_RETREAT = "/aerial-retreat-lisbon";

/** Its booking flow, its confirmation page and its legal pages */
export const LISBON_BOOKING = `${LISBON_RETREAT}/booking`;
export const LISBON_CONFIRMATION = `${LISBON_BOOKING}/confirmation`;
export const LISBON_TERMS = `${LISBON_RETREAT}/terms`;
export const LISBON_CANCELLATION = `${LISBON_RETREAT}/cancellation-policy`;
