import React from 'react';
import { Icon } from '@ds/components/core/Icon.jsx';

export default function Stars({ rating = 5, size = 14 }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2, color: 'var(--amplio-green)' }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Icon key={i} name="star" size={size} style={{ opacity: i < Math.round(rating) ? 1 : 0.25 }} />
      ))}
    </span>
  );
}
