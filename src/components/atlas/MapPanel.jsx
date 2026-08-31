import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/* Real geography, not a drawing: Leaflet + OpenStreetMap tiles centred on Northampton.
   Interaction is disabled because this sits inside a static product mock.
   Rebuilt against the `leaflet` npm package (bundled by Vite) instead of the prototype's
   CDN <script> + window.L global — see HANDOFF.md's note on replacing that dependency. */
export default function MapPanel({ height = 128 }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current) return;
    const map = L.map(ref.current, {
      center: [52.2405, -0.9027], zoom: 12, zoomControl: false, attributionControl: true,
      dragging: false, scrollWheelZoom: false, doubleClickZoom: false, boxZoom: false,
      keyboard: false, touchZoom: false,
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);
    L.circle([52.2405, -0.9027], {
      radius: 2200, color: '#6FA84A', weight: 2,
      fillColor: '#6FA84A', fillOpacity: 0.18,
    }).addTo(map);
    L.circleMarker([52.2405, -0.9027], {
      radius: 5, color: '#ffffff', weight: 2, fillColor: '#45732C', fillOpacity: 1,
    }).addTo(map);
    return () => map.remove();
  }, []);

  return (
    <div style={{ position: 'relative', height, borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
      <div ref={ref} style={{ position: 'absolute', inset: 0 }} />
      <span style={{ position: 'absolute', top: 8, left: 8, zIndex: 500, background: 'var(--alpha-cream-88)', borderRadius: 'var(--radius-sm)', padding: '3px 8px', fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 'var(--weight-bold)', color: 'var(--text-heading)' }}>
        Northampton
      </span>
    </div>
  );
}
