const SONE_BADGE = {
  stille: { label: 'Stille',  emoji: '\uD83D\uDD07', cls: 'zone-badge-stille' },
  fokus:  { label: 'Fokus',   emoji: '\uD83C\uDFA7', cls: 'zone-badge-fokus'  },
  aktiv:  { label: 'Aktiv',   emoji: '\uD83D\uDCAC', cls: 'zone-badge-aktiv'  },
  sosial: { label: 'Sosial',  emoji: '\uD83E\uDD1D', cls: 'zone-badge-sosial' },
};

export default function LocationSelector({
  config,
  selectedBuilding,
  selectedFloor,
  selectedZone,
  onBuildingChange,
  onFloorChange,
  onZoneChange,
}) {
  const floors = selectedBuilding
    ? config.floors.filter(f => f.buildingId === selectedBuilding)
    : [];

  const zones = selectedFloor
    ? config.zones.filter(z => z.floorId === selectedFloor)
    : [];

  const zoneObj = selectedZone ? config.zones.find(z => z.id === selectedZone) : null;
  const badge = zoneObj ? SONE_BADGE[zoneObj.soneType] : null;

  return (
    <div className="location-selector">
      <div className="location-group">
        <label htmlFor="sel-building">Bygg</label>
        <select
          id="sel-building"
          value={selectedBuilding}
          onChange={e => onBuildingChange(e.target.value)}
        >
          <option value="">Velg bygg{'\u2026'}</option>
          {config.buildings.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </div>

      <div className="location-group">
        <label htmlFor="sel-floor">Etasje</label>
        <select
          id="sel-floor"
          value={selectedFloor}
          disabled={!selectedBuilding}
          onChange={e => onFloorChange(e.target.value)}
        >
          <option value="">Velg etasje{'\u2026'}</option>
          {floors.map(f => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>
      </div>

      <div className="location-group">
        <label htmlFor="sel-zone">Sone</label>
        <select
          id="sel-zone"
          value={selectedZone}
          disabled={!selectedFloor}
          onChange={e => onZoneChange(e.target.value)}
        >
          <option value="">Velg sone{'\u2026'}</option>
          {zones.map(z => (
            <option key={z.id} value={z.id}>{z.name}</option>
          ))}
        </select>
      </div>

      {badge && (
        <div className={`zone-badge ${badge.cls}`}>
          <span>{badge.emoji}</span>
          <span>{badge.label}</span>
        </div>
      )}
    </div>
  );
}
