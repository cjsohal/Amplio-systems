export const BOOKING_URL = 'https://bookme.name/cjsohal/';

// Tracking and advertising tags. Leave an ID empty and that tool is never loaded; with all three
// empty the cookie banner doesn't appear at all (there is nothing to ask consent for). Each tool
// loads only after the visitor accepts its category in the cookie banner — see
// src/components/CookieConsent.astro, and update public/_headers + the privacy notice when you
// switch one on.
export const TRACKING = {
  ga4: '',        // Google Analytics 4 measurement ID, e.g. 'G-XXXXXXXXXX'        (analytics)
  googleAds: '',  // Google Ads conversion tag ID, e.g. 'AW-XXXXXXXXX'              (advertising)
  metaPixel: '370121844180913',  // Meta Pixel ID — use a Pixel just for Amplio, not Delite Salon's  (advertising)
};
