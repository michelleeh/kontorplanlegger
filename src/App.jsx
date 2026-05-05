import { useState, useEffect } from 'react';
import ModeToggle from './components/ModeToggle.jsx';
import LocationSelector from './components/LocationSelector.jsx';
import FloorPlanEditor from './components/FloorPlanEditor.jsx';
import FloorPlanViewer from './components/FloorPlanViewer.jsx';

export default function App() {
  const [mode, setMode] = useState('admin');
  const [config, setConfig] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedZone, setSelectedZone] = useState('');

  useEffect(() => {
    fetch('/api/config')
      .then(r => r.json())
      .then(setConfig)
      .catch(err => console.error('Failed to load config:', err));
  }, []);

  function handleBuildingChange(val) {
    setSelectedBuilding(val);
    setSelectedFloor('');
    setSelectedZone('');
  }

  function handleFloorChange(val) {
    setSelectedFloor(val);
    setSelectedZone('');
  }

  function handleZoneChange(val) {
    setSelectedZone(val);
  }

  function handleModeChange(newMode) {
    setMode(newMode);
  }

  return (
    <div className={`app-root mode-${mode}`}>
      <header className="app-header">
        <div className="app-header-title">
          <span className="app-logo">🏢</span>
          <h1>Kontorlandskapplanlegger</h1>
        </div>
        <ModeToggle mode={mode} onModeChange={handleModeChange} />
      </header>

      <main className="app-main">
        {config ? (
          <>
            <LocationSelector
              config={config}
              selectedBuilding={selectedBuilding}
              selectedFloor={selectedFloor}
              selectedZone={selectedZone}
              onBuildingChange={handleBuildingChange}
              onFloorChange={handleFloorChange}
              onZoneChange={handleZoneChange}
            />

            {selectedZone && mode === 'admin' && (
              <FloorPlanEditor
                zoneId={selectedZone}
                zone={config.zones.find(z => z.id === selectedZone)}
              />
            )}

            {selectedZone && mode === 'booking' && (
              <FloorPlanViewer
                zoneId={selectedZone}
                zone={config.zones.find(z => z.id === selectedZone)}
              />
            )}
          </>
        ) : (
          <div className="loading">Laster konfigurasjon{"\u2026"}</div>
        )}
      </main>
    </div>
  );
}
