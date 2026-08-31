import React from 'react';

/* SVG is the master format for every Amplio mark — scales to any size and recolours cleanly.
   The .png equivalents are kept alongside for HTML email, which cannot rely on SVG.
   The Atlas sub-brand is raster only; no vector was supplied. */
const LOGO_FILES = {
  'lockup-colour': 'logo-lockup.svg',
  'lockup-light': 'logo-lockup-light.svg',
  'lockup-ink': 'logo-lockup-ink.svg',
  'mark-colour': 'mark.svg',
  'mark-light': 'mark-light.svg',
  'mark-ink': 'mark-ink.svg',
  'mark-cream': 'mark-cream.svg',
  wordmark: 'wordmark.svg',
  'atlas-colour': 'atlas-logo.png',
  'atlas-light': 'atlas-logo-light.png',
  'atlas-ink': 'atlas-logo-ink.png',
};

/* See the note in Icon.jsx — served from public/assets, so the default is the absolute path. */
export function assetBase() {
  if (typeof window !== 'undefined' && window.AMPLIO_ASSET_BASE) return window.AMPLIO_ASSET_BASE;
  return '/assets';
}

/* Never recolour, stretch or shadow the logo — only these approved files. */
export function Logo({ variant = 'lockup-colour', height = 36, href, style, ...rest }) {
  const img = (
    <img
      src={`${assetBase()}/${LOGO_FILES[variant] || LOGO_FILES['lockup-colour']}`}
      alt={variant.startsWith('atlas') ? 'Atlas' : 'Amplio Systems'}
      style={{ height, width: 'auto', display: 'block', ...style }}
      {...rest}
    />
  );
  if (!href) return img;
  return (
    <a href={href} style={{ display: 'inline-block', textDecoration: 'none', lineHeight: 0 }}>
      {img}
    </a>
  );
}
