import { useState, useEffect } from 'react';
import ElementIcon from './ElementIcon.jsx';

const CELL = 60;

const SONE_BADGE = {
  stille: { label: 'Stille',  emoji: '\uD83D\uDD07', cls: 'zone-badge-stille' },
  fokus:  { label: 'Fokus',   emoji: '\uD83C\uDFA7', cls: 'zone-badge-fokus'  },
  aktiv:  { label: 'Aktiv',   emoji: '\uD83D\uDCAC', cls: 'zone-badge-aktiv'  },
  sosial: { label: 'Sosial',  emoji: '\uD83E\uDD1D', cls: 'zone-badge-sosial' },
};

export default function FloorPlanViewer({ zoneId, zone }) {
  const [elements, setElements] = useState(new Map());
  const [gridW, setGridW]       = useState(20);
  const [gridH, setGridH]       = useState(15);

  useEffect(() => {
    if (!zoneId) return;
    fetch(`/api/floorplans/${zoneId}`)
      .then(r => r.json())
      .then(data => {
        setGridW(data.gridW ?? 20);
        setGridH(data.gridH ?? 15);
        const map = new Map();
        (data.cells ?? []).forEach(c => map.set(c.id, c));
        setElements(map);
      })
      .catch(err => console.error('Failed to load floor plan:', err));
  }, [zoneId]);

  const badge = zone ? SONE_BADGE[zone.soneType] : null;

  return (
    <div className="floorplan-viewer">
      <div className="floorplan-viewer-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <h2>{zone?.name ?? 'Gulvplan'}</h2>
          {badge && (
            <span className={`zone-badge ${badge.cls}`}>
              {badge.emoji} {badge.label}
            </span>
          )}
        </div>
        <div className="booking-notice">
          <span>&#x1F4C5;</span>
          <span>Booking-funksjonalitet kommer i neste iterasjon</span>
        </div>
      </div>

      <div className="grid-canvas-wrap">
        <div
          style={{
            position: 'relative',
            width: gridW * CELL,
            height: gridH * CELL,
            backgroundImage: `linear-gradient(#E5E7EB 1px, transparent 1px), linear-gradient(90deg, #E5E7EB 1px, transparent 1px)`,
            backgroundSize: `${CELL}px ${CELL}px`,
            border: '1px solid #D1D5DB',
            borderRadius: 4,
          }}
        >
          {Array.from(elements.values()).map(el => (
            <div
              key={el.id}
              style={{
                position: 'absolute',
                left: el.x * CELL,
                top: el.y * CELL,
                width: el.w * CELL,
                height: el.h * CELL,
                border: '1px solid rgba(0,0,0,0.15)',
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <ElementIcon type={el.type} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
