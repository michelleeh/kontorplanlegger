const WOOD        = '#A07850';
const WOOD_DARK   = '#7A5C38';
const CHAIR       = '#5B4A3F';
const SCREEN      = '#1a1a2e';
const LOUNGE      = '#64748B';
const WALL        = '#9CA3AF';
const PLANT_GREEN = '#16A34A';
const TEAL        = '#0891B2';
const KITCHEN_AMBER = '#D97706';

function PultSkjerm({ style }) {
  return (
    <svg viewBox="0 0 120 60" style={style} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="112" height="48" rx="3" fill={WOOD}/>
      <rect x="20" y="9" width="80" height="9" rx="2" fill={SCREEN}/>
      <rect x="57" y="17" width="6" height="5" fill="#444"/>
      <rect x="28" y="36" width="64" height="14" rx="2" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="0.5"/>
      <ellipse cx="106" cy="43" rx="6" ry="8" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="0.5"/>
    </svg>
  );
}

function PultLaptop({ style }) {
  return (
    <svg viewBox="0 0 120 60" style={style} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="112" height="48" rx="3" fill={WOOD}/>
      <rect x="30" y="32" width="60" height="18" rx="2" fill="#9CA3AF"/>
      <rect x="32" y="14" width="56" height="19" rx="2" fill="#374151"/>
      <line x1="30" y1="32" x2="90" y2="32" stroke="#6B7280" strokeWidth="1.5"/>
      <rect x="35" y="17" width="50" height="13" rx="1" fill="#1e3a5f"/>
    </svg>
  );
}

function PultStaaende({ style }) {
  return (
    <svg viewBox="0 0 120 60" style={style} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="15" width="112" height="38" rx="3" fill="#B8925A"/>
      <line x1="4" y1="15" x2="4" y2="53" stroke={WOOD_DARK} strokeWidth="3" strokeLinecap="round"/>
      <line x1="116" y1="15" x2="116" y2="53" stroke={WOOD_DARK} strokeWidth="3" strokeLinecap="round"/>
      <rect x="50" y="25" width="20" height="20" rx="2" fill="#D1D5DB" opacity="0.5"/>
    </svg>
  );
}

function Lounge({ style }) {
  return (
    <svg viewBox="0 0 120 60" style={style} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="6" width="112" height="20" rx="6" fill="#475569"/>
      <rect x="4" y="25" width="112" height="30" rx="6" fill={LOUNGE}/>
      <rect x="4" y="14" width="12" height="42" rx="4" fill="#475569"/>
      <rect x="104" y="14" width="12" height="42" rx="4" fill="#475569"/>
      <line x1="60" y1="25" x2="60" y2="55" stroke="#374155" strokeWidth="1" opacity="0.5"/>
    </svg>
  );
}

function MoteLite({ style }) {
  return (
    <svg viewBox="0 0 180 120" style={style} xmlns="http://www.w3.org/2000/svg">
      <circle cx="90" cy="60" r="32" fill={WOOD} stroke={WOOD_DARK} strokeWidth="2"/>
      <rect x="66" y="16" width="48" height="18" rx="4" fill={CHAIR}/>
      <rect x="66" y="86" width="48" height="18" rx="4" fill={CHAIR}/>
      <rect x="16" y="48" width="18" height="24" rx="4" fill={CHAIR}/>
      <rect x="146" y="48" width="18" height="24" rx="4" fill={CHAIR}/>
    </svg>
  );
}

function MoteMedium({ style }) {
  return (
    <svg viewBox="0 0 240 180" style={style} xmlns="http://www.w3.org/2000/svg">
      <rect x="45" y="42" width="150" height="96" rx="6" fill={WOOD} stroke={WOOD_DARK} strokeWidth="2"/>
      <rect x="45" y="38" width="150" height="8" rx="2" fill={SCREEN}/>
      <rect x="60" y="14" width="36" height="20" rx="4" fill={CHAIR}/>
      <rect x="102" y="14" width="36" height="20" rx="4" fill={CHAIR}/>
      <rect x="144" y="14" width="36" height="20" rx="4" fill={CHAIR}/>
      <rect x="60" y="146" width="36" height="20" rx="4" fill={CHAIR}/>
      <rect x="102" y="146" width="36" height="20" rx="4" fill={CHAIR}/>
      <rect x="144" y="146" width="36" height="20" rx="4" fill={CHAIR}/>
      <rect x="16" y="72" width="22" height="36" rx="4" fill={CHAIR}/>
      <rect x="202" y="72" width="22" height="36" rx="4" fill={CHAIR}/>
    </svg>
  );
}

function MoteStor({ style }) {
  return (
    <svg viewBox="0 0 360 240" style={style} xmlns="http://www.w3.org/2000/svg">
      <rect x="55" y="55" width="250" height="130" rx="8" fill={WOOD} stroke={WOOD_DARK} strokeWidth="2"/>
      <rect x="55" y="46" width="250" height="10" rx="3" fill={SCREEN}/>
      <rect x="65" y="20" width="38" height="20" rx="4" fill={CHAIR}/>
      <rect x="112" y="20" width="38" height="20" rx="4" fill={CHAIR}/>
      <rect x="159" y="20" width="38" height="20" rx="4" fill={CHAIR}/>
      <rect x="206" y="20" width="38" height="20" rx="4" fill={CHAIR}/>
      <rect x="253" y="20" width="38" height="20" rx="4" fill={CHAIR}/>
      <rect x="65" y="200" width="38" height="20" rx="4" fill={CHAIR}/>
      <rect x="112" y="200" width="38" height="20" rx="4" fill={CHAIR}/>
      <rect x="159" y="200" width="38" height="20" rx="4" fill={CHAIR}/>
      <rect x="206" y="200" width="38" height="20" rx="4" fill={CHAIR}/>
      <rect x="253" y="200" width="38" height="20" rx="4" fill={CHAIR}/>
      <rect x="20" y="72" width="22" height="44" rx="4" fill={CHAIR}/>
      <rect x="20" y="128" width="22" height="44" rx="4" fill={CHAIR}/>
      <rect x="318" y="72" width="22" height="44" rx="4" fill={CHAIR}/>
      <rect x="318" y="128" width="22" height="44" rx="4" fill={CHAIR}/>
    </svg>
  );
}

function Telefonkiosk({ style }) {
  return (
    <svg viewBox="0 0 60 120" style={style} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="52" height="112" rx="4" fill="#E0F7FA" stroke={TEAL} strokeWidth="3"/>
      <rect x="4" y="90" width="20" height="26" rx="2" fill="#B2EBF2" stroke={TEAL} strokeWidth="1"/>
      <rect x="18" y="18" width="24" height="18" rx="3" fill={TEAL}/>
      <path d="M22 22 Q30 28 38 22" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <rect x="15" y="60" width="30" height="22" rx="3" fill={CHAIR}/>
    </svg>
  );
}

function Vegg({ style }) {
  return (
    <svg viewBox="0 0 60 60" style={style} xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="60" height="60" fill={WALL}/>
      <line x1="0" y1="20" x2="60" y2="20" stroke="#6B7280" strokeWidth="1"/>
      <line x1="0" y1="40" x2="60" y2="40" stroke="#6B7280" strokeWidth="1"/>
      <line x1="30" y1="0" x2="30" y2="20" stroke="#6B7280" strokeWidth="1"/>
      <line x1="15" y1="20" x2="15" y2="40" stroke="#6B7280" strokeWidth="1"/>
      <line x1="45" y1="20" x2="45" y2="40" stroke="#6B7280" strokeWidth="1"/>
      <line x1="30" y1="40" x2="30" y2="60" stroke="#6B7280" strokeWidth="1"/>
    </svg>
  );
}

function Plante({ style }) {
  return (
    <svg viewBox="0 0 60 60" style={style} xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="38" width="20" height="16" rx="3" fill="#92400E"/>
      <circle cx="30" cy="26" r="18" fill={PLANT_GREEN}/>
      <line x1="30" y1="26" x2="30" y2="10" stroke="#15803D" strokeWidth="1.5"/>
      <line x1="30" y1="26" x2="16" y2="16" stroke="#15803D" strokeWidth="1.5"/>
      <line x1="30" y1="26" x2="44" y2="16" stroke="#15803D" strokeWidth="1.5"/>
    </svg>
  );
}

function Kjoekken({ style }) {
  return (
    <svg viewBox="0 0 240 120" style={style} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="232" height="54" rx="4" fill={KITCHEN_AMBER}/>
      <rect x="12" y="12" width="46" height="38" rx="4" fill="#FDE68A"/>
      <ellipse cx="35" cy="31" rx="16" ry="12" fill="#fff" stroke="#9CA3AF" strokeWidth="1.5"/>
      <circle cx="35" cy="31" r="4" fill="#6B7280"/>
      <rect x="80" y="10" width="40" height="42" rx="4" fill="#374151"/>
      <rect x="84" y="16" width="32" height="20" rx="2" fill="#1e3a5f"/>
      <circle cx="100" cy="44" r="5" fill="#EF4444"/>
      <rect x="150" y="6" width="38" height="50" rx="4" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1.5"/>
      <rect x="156" y="16" width="4" height="24" rx="2" fill="#9CA3AF"/>
      <rect x="4" y="66" width="232" height="50" rx="4" fill="#F59E0B"/>
      <rect x="20" y="87" width="22" height="4" rx="2" fill="#D97706"/>
      <rect x="109" y="87" width="22" height="4" rx="2" fill="#D97706"/>
      <rect x="198" y="87" width="22" height="4" rx="2" fill="#D97706"/>
    </svg>
  );
}

function Printer({ style }) {
  return (
    <svg viewBox="0 0 60 60" style={style} xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="18" width="48" height="28" rx="4" fill="#374151"/>
      <rect x="14" y="8" width="32" height="12" rx="2" fill="#F9FAFB" stroke="#D1D5DB" strokeWidth="1"/>
      <rect x="14" y="44" width="32" height="8" rx="2" fill="#9CA3AF"/>
      <circle cx="44" cy="26" r="4" fill="#10B981"/>
      <rect x="36" y="30" width="10" height="6" rx="1" fill="#6B7280"/>
    </svg>
  );
}

function Toalett({ style }) {
  return (
    <svg viewBox="0 0 120 180" style={style} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="116" height="176" rx="4" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2"/>
      <line x1="60" y1="2" x2="60" y2="178" stroke="#CBD5E1" strokeWidth="2"/>
      <rect x="10" y="15" width="36" height="16" rx="3" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5"/>
      <ellipse cx="28" cy="48" rx="18" ry="22" fill="#fff" stroke="#CBD5E1" strokeWidth="1.5"/>
      <ellipse cx="28" cy="48" rx="14" ry="18" fill="none" stroke="#94A3B8" strokeWidth="2"/>
      <rect x="74" y="15" width="36" height="16" rx="3" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5"/>
      <ellipse cx="92" cy="48" rx="18" ry="22" fill="#fff" stroke="#CBD5E1" strokeWidth="1.5"/>
      <ellipse cx="92" cy="48" rx="14" ry="18" fill="none" stroke="#94A3B8" strokeWidth="2"/>
      <rect x="10" y="120" width="36" height="30" rx="4" fill="#BFDBFE"/>
      <ellipse cx="28" cy="135" rx="12" ry="9" fill="#fff" stroke="#93C5FD" strokeWidth="1.5"/>
      <rect x="74" y="120" width="36" height="30" rx="4" fill="#BFDBFE"/>
      <ellipse cx="92" cy="135" rx="12" ry="9" fill="#fff" stroke="#93C5FD" strokeWidth="1.5"/>
    </svg>
  );
}

function DefaultIcon({ style }) {
  return (
    <svg viewBox="0 0 60 60" style={style} xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="26" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1.5"/>
      <text x="30" y="36" textAnchor="middle" fontSize="22" fill="#6B7280" fontWeight="bold">?</text>
    </svg>
  );
}

export default function ElementIcon({ type, width, height }) {
  const style = { width: width ?? '100%', height: height ?? '100%', display: 'block' };
  switch (type) {
    case 'pult-skjerm':   return <PultSkjerm style={style} />;
    case 'pult-laptop':   return <PultLaptop style={style} />;
    case 'pult-staaende': return <PultStaaende style={style} />;
    case 'lounge':        return <Lounge style={style} />;
    case 'mote-lite':     return <MoteLite style={style} />;
    case 'mote-medium':   return <MoteMedium style={style} />;
    case 'mote-stort':    return <MoteStor style={style} />;
    case 'telefonkiosk':  return <Telefonkiosk style={style} />;
    case 'vegg':          return <Vegg style={style} />;
    case 'plante':        return <Plante style={style} />;
    case 'kjoekken':      return <Kjoekken style={style} />;
    case 'printer':       return <Printer style={style} />;
    case 'toalett':       return <Toalett style={style} />;
    default:              return <DefaultIcon style={style} />;
  }
}
