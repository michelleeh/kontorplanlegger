export default function ModeToggle({ mode, onModeChange }) {
  return (
    <div className="mode-toggle" role="group" aria-label="Velg modus">
      <button
        className={mode === 'admin' ? 'active-admin' : ''}
        onClick={() => onModeChange('admin')}
        aria-pressed={mode === 'admin'}
      >
        {'\uD83D\uDDFA'} Planlegger
      </button>
      <button
        className={mode === 'booking' ? 'active-booking' : ''}
        onClick={() => onModeChange('booking')}
        aria-pressed={mode === 'booking'}
      >
        {'\uD83D\uDCC5'} Booking
      </button>
    </div>
  );
}
