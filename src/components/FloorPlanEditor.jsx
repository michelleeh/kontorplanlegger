import { useState, useEffect } from 'react';
import ItemPalette, { ELEMENT_TYPER } from './ItemPalette.jsx';
import ElementIcon from './ElementIcon.jsx';

const CELL = 60;

const SONE_BADGE = {
  stille: { label: 'Stille',  emoji: '\uD83D\uDD07', cls: 'zone-badge-stille' },
  fokus:  { label: 'Fokus',   emoji: '\uD83C\uDFA7', cls: 'zone-badge-fokus'  },
  aktiv:  { label: 'Aktiv',   emoji: '\uD83D\uDCAC', cls: 'zone-badge-aktiv'  },
  sosial: { label: 'Sosial',  emoji: '\uD83E\uDD1D', cls: 'zone-badge-sosial' },
};

let idCounter = Date.now();
function newId() { return `el-${++idCounter}`; }

function buildOccupied(elements) {
  const occ = new Map();
  for (const el of elements.values()) {
    for (let dy = 0; dy < el.h; dy++) {
      for (let dx = 0; dx < el.w; dx++) {
        occ.set(`${el.x + dx},${el.y + dy}`, el.id);
      }
    }
  }
  return occ;
}

export default function FloorPlanEditor({ zoneId, zone }) {
  const [elements, setElements]         = useState(new Map());
  const [gridW, setGridW]               = useState(20);
  const [gridH, setGridH]               = useState(15);
  const [selectedTool, setSelectedTool] = useState('pult-skjerm');
  const [selectedId, setSelectedId]     = useState(null);
  const [toast, setToast]               = useState('');

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

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') setSelectedId(null); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function deleteEl(id) {
    setElements(prev => { const n = new Map(prev); n.delete(id); return n; });
    setSelectedId(null);
  }

  function resizeEl(id, dw, dh) {
    setElements(prev => {
      const el = prev.get(id);
      if (!el) return prev;
      const newW = Math.max(1, el.w + dw);
      const newH = Math.max(1, el.h + dh);
      if (el.x + newW > gridW || el.y + newH > gridH) return prev;
      const occ = buildOccupied(prev);
      if (dw > 0) {
        for (let dy = 0; dy < el.h; dy++) {
          const existing = occ.get(`${el.x + newW - 1},${el.y + dy}`);
          if (existing && existing !== id) return prev;
        }
      }
      if (dh > 0) {
        for (let dx = 0; dx < el.w; dx++) {
          const existing = occ.get(`${el.x + dx},${el.y + newH - 1}`);
          if (existing && existing !== id) return prev;
        }
      }
      const next = new Map(prev);
      next.set(id, { ...el, w: newW, h: newH });
      return next;
    });
  }

  function handleCanvasMouseDown(e) {
    const cx = Math.floor(e.nativeEvent.offsetX / CELL);
    const cy = Math.floor(e.nativeEvent.offsetY / CELL);
    const occ = buildOccupied(elements);
    const eid = occ.get(`${cx},${cy}`);

    if (e.button === 2) {
      if (eid) deleteEl(eid);
      return;
    }

    if (eid) {
      if (selectedTool === '__erase__') {
        deleteEl(eid);
      } else {
        setSelectedId(eid === selectedId ? null : eid);
      }
      return;
    }

    setSelectedId(null);
    if (selectedTool === '__erase__') return;

    const typeDef = ELEMENT_TYPER.find(e => e.id === selectedTool);
    if (!typeDef) return;

    const w = typeDef.w ?? 1;
    const h = typeDef.h ?? 1;

    if (cx + w > gridW || cy + h > gridH) return;

    for (let dy = 0; dy < h; dy++) {
      for (let dx = 0; dx < w; dx++) {
        if (occ.has(`${cx + dx},${cy + dy}`)) return;
      }
    }

    const id = newId();
    setElements(prev => new Map(prev).set(id, { id, type: selectedTool, x: cx, y: cy, w, h }));
  }

  function handleSave() {
    const cellsArr = Array.from(elements.values());
    fetch(`/api/floorplans/${zoneId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cells: cellsArr, gridW, gridH }),
    })
      .then(() => {
        setToast('Planl\u00f8sning lagret! \u2713');
        setTimeout(() => setToast(''), 2500);
      })
      .catch(() => setToast('Feil ved lagring'));
  }

  function handleClear() {
    if (window.confirm('T\u00f8m hele gulvplanen?')) {
      setElements(new Map());
      setSelectedId(null);
    }
  }

  const badge = zone ? SONE_BADGE[zone.soneType] : null;
  const selectedEl = selectedId ? elements.get(selectedId) : null;

  return (
    <div className="floorplan-editor">
      <div className="floorplan-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <h2>{zone?.name ?? 'Gulvplan'}</h2>
          {badge && (
            <span className={`zone-badge ${badge.cls}`}>
              {badge.emoji} {badge.label}
            </span>
          )}
        </div>
        <div className="floorplan-header-controls">
          <div className="grid-control">
            <span style={{ fontSize: '0.82rem', color: '#6B7280' }}>B:</span>
            <button className="btn btn-ghost btn-sm" onClick={() => setGridW(w => Math.max(5, w - 1))}>-</button>
            <span>{gridW}</span>
            <button className="btn btn-ghost btn-sm" onClick={() => setGridW(w => Math.min(40, w + 1))}>+</button>
          </div>
          <div className="grid-control">
            <span style={{ fontSize: '0.82rem', color: '#6B7280' }}>H:</span>
            <button className="btn btn-ghost btn-sm" onClick={() => setGridH(h => Math.max(5, h - 1))}>-</button>
            <span>{gridH}</span>
            <button className="btn btn-ghost btn-sm" onClick={() => setGridH(h => Math.min(30, h + 1))}>+</button>
          </div>
          <button className="btn btn-danger" onClick={handleClear}>T\u00f8m</button>
          <button className="btn btn-primary" onClick={handleSave}>Lagre</button>
        </div>
      </div>

      <div className="floorplan-body">
        <ItemPalette selectedTool={selectedTool} onSelect={setSelectedTool} />

        <div className="grid-canvas-wrap">
          <div
            className="grid-canvas-abs"
            style={{
              position: 'relative',
              width: gridW * CELL,
              height: gridH * CELL,
              backgroundImage: `linear-gradient(#E5E7EB 1px, transparent 1px), linear-gradient(90deg, #E5E7EB 1px, transparent 1px)`,
              backgroundSize: `${CELL}px ${CELL}px`,
              border: '1px solid #D1D5DB',
              borderRadius: 4,
              cursor: selectedTool === '__erase__' ? 'crosshair' : 'copy',
              userSelect: 'none',
              flexShrink: 0,
            }}
            onMouseDown={handleCanvasMouseDown}
            onContextMenu={e => e.preventDefault()}
          >
            {Array.from(elements.values()).map(el => {
              const isSelected = el.id === selectedId;
              const typeDef = ELEMENT_TYPER.find(e => e.id === el.type);
              return (
                <div
                  key={el.id}
                  className={`floor-element${isSelected ? ' selected' : ''}`}
                  style={{
                    position: 'absolute',
                    left: el.x * CELL,
                    top: el.y * CELL,
                    width: el.w * CELL,
                    height: el.h * CELL,
                    border: isSelected ? '2px solid #2563EB' : '1px solid rgba(0,0,0,0.15)',
                    borderRadius: 3,
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    zIndex: isSelected ? 2 : 1,
                    boxShadow: isSelected ? '0 0 0 3px rgba(37,99,235,0.3)' : 'none',
                  }}
                  title={typeDef?.label ?? el.type}
                >
                  <ElementIcon type={el.type} />
                </div>
              );
            })}

            {selectedEl && (
              <div
                className="element-toolbar"
                style={{
                  position: 'absolute',
                  left: selectedEl.x * CELL,
                  top: Math.max(0, selectedEl.y * CELL - 44),
                  zIndex: 10,
                }}
                onMouseDown={e => e.stopPropagation()}
              >
                <span className="toolbar-label">{ELEMENT_TYPER.find(e => e.id === selectedEl.type)?.label}</span>
                <div className="toolbar-controls">
                  <span className="toolbar-dim-label">B:</span>
                  <button className="btn btn-ghost btn-sm" onClick={() => resizeEl(selectedEl.id, -1, 0)}>\u2212</button>
                  <span>{selectedEl.w}</span>
                  <button className="btn btn-ghost btn-sm" onClick={() => resizeEl(selectedEl.id, 1, 0)}>+</button>
                  <span className="toolbar-dim-label" style={{ marginLeft: 6 }}>H:</span>
                  <button className="btn btn-ghost btn-sm" onClick={() => resizeEl(selectedEl.id, 0, -1)}>\u2212</button>
                  <span>{selectedEl.h}</span>
                  <button className="btn btn-ghost btn-sm" onClick={() => resizeEl(selectedEl.id, 0, 1)}>+</button>
                  <button className="btn btn-danger btn-sm" style={{ marginLeft: 8 }} onClick={() => deleteEl(selectedEl.id)}>Slett</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
