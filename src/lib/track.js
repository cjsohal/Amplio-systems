// Fires a Meta Pixel "Lead" event when a form is successfully submitted. window.fbq only exists
// once the visitor has accepted Advertising cookies (see src/components/CookieConsent.astro), so
// this is a no-op for everyone else. No personal data is sent — just which form it was.
export function trackLead(form) {
  try {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', { content_name: form });
    }
  } catch (e) { /* tracking must never break a form */ }
}
