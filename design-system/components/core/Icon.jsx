import React from 'react';

/* Icons are Lucide SVGs shipped in /assets/icons. They are painted with a CSS mask so
   they inherit currentColor — never hard-code an icon colour.
   This app serves them from public/assets/icons, i.e. the absolute path /assets/icons — that's
   the default below. Astro prerenders pages in Node, where `window` doesn't exist, so unlike the
   prototype this can't rely on a runtime global to be set "before first render"; the default has
   to be correct on its own. window.AMPLIO_ICON_BASE is still honoured for a page that wants to
   override it client-side. */
export function iconBase() {
  if (typeof window !== 'undefined' && window.AMPLIO_ICON_BASE) return window.AMPLIO_ICON_BASE;
  return '/assets/icons';
}

export function Icon({ name, size = 24, color, strokeAlign = false, style, ...rest }) {
  const url = `url("${iconBase()}/${name}.svg")`;
  return (
    <span
      aria-hidden="true"
      data-icon={name}
      style={{
        display: 'inline-block', flex: 'none', width: size, height: size,
        backgroundColor: color || 'currentColor',
        WebkitMaskImage: url, maskImage: url,
        WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center', maskPosition: 'center',
        WebkitMaskSize: 'contain', maskSize: 'contain',
        verticalAlign: strokeAlign ? 'baseline' : 'middle',
        ...style,
      }}
      {...rest}
    />
  );
}
