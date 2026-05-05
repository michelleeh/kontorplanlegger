export const ELEMENT_TYPER = [
  { id: 'pult-skjerm',   label: 'Pult m/ skjerm',      w: 2, h: 1, bookbar: true,  kategori: 'arbeid' },
  { id: 'pult-laptop',   label: 'Pult u/ skjerm',       w: 2, h: 1, bookbar: true,  kategori: 'arbeid' },
  { id: 'pult-staaende', label: 'St\u00e5ende pult',    w: 2, h: 1, bookbar: true,  kategori: 'arbeid' },
  { id: 'lounge',        label: 'Lounge-plass',          w: 2, h: 1, bookbar: true,  kategori: 'arbeid' },
  { id: 'mote-lite',     label: 'M\u00f8terom (2\u20134)',   w: 3, h: 2, bookbar: true,  kategori: 'mote' },
  { id: 'mote-medium',   label: 'M\u00f8terom (4\u20138)',   w: 4, h: 3, bookbar: true,  kategori: 'mote' },
  { id: 'mote-stort',    label: 'M\u00f8terom (8\u201316)', w: 6, h: 4, bookbar: true,  kategori: 'mote' },
  { id: 'telefonkiosk',  label: 'Telefonkiosk',          w: 1, h: 2, bookbar: true,  kategori: 'mote' },
  { id: 'vegg',          label: 'Vegg/skillevegg',       w: 1, h: 1, bookbar: false, kategori: 'dekor' },
  { id: 'plante',        label: 'Plante',                w: 1, h: 1, bookbar: false, kategori: 'dekor' },
  { id: 'kjoekken',      label: 'Kj\u00f8kken/kaffebar', w: 4, h: 2, bookbar: false, kategori: 'dekor' },
  { id: 'printer',       label: 'Printer/kopimaskin',    w: 1, h: 1, bookbar: false, kategori: 'dekor' },
  { id: 'toalett',       label: 'Toalett/garderobe',     w: 2, h: 3, bookbar: false, kategori: 'dekor' },
];

import ElementIcon from './ElementIcon.jsx';

const KATEGORIER = [
  { id: 'arbeid', label: 'Arbeidsplasser' },
  { id: 'mote',   label: 'M\u00f8terom' },
  { id: 'dekor',  label: 'Dekor/infrastruktur' },
];

export default function ItemPalette({ selectedTool, onSelect }) {
  return (
    <div className="item-palette">
      <h3>Elementer</h3>

      <button
        className={`palette-eraser${selectedTool === '__erase__' ? ' selected' : ''}`}
        onClick={() => onSelect('__erase__')}
      >
        <span>&#x1F5D1;</span>
        <span>Slett</span>
      </button>

      {KATEGORIER.map(kat => {
        const items = ELEMENT_TYPER.filter(e => e.kategori === kat.id);
        return (
          <div className="palette-category" key={kat.id}>
            <div className="palette-category-label">{kat.label}</div>
            {items.map(el => (
              <button
                key={el.id}
                className={`palette-item${selectedTool === el.id ? ' selected' : ''}`}
                onClick={() => onSelect(el.id)}
                title={el.label}
              >
                <div className="palette-item-icon">
                  <ElementIcon type={el.id} />
                </div>
                <span>{el.label}</span>
              </button>
            ))}
          </div>
        );
      })}
    </div>
  );
}
