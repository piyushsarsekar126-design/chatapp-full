import React from 'react';

// Deterministic color per name, so the same person always gets the same avatar color
const COLORS = ['#F58529', '#DD2A7B', '#8134AF', '#515BD4', '#00A99D', '#E1306C'];

function colorForName(name) {
  const index = name.charCodeAt(0) % COLORS.length;
  return COLORS[index];
}

export default function Avatar({ name, size = 'md', showOnline, isOnline }) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-11 h-11 text-sm',
    lg: 'w-20 h-20 text-2xl',
  };

  const initial = name ? name.charAt(0).toUpperCase() : '?';

  return (
    <div className="relative shrink-0">
      <div
        className={`${sizes[size]} rounded-full flex items-center justify-center text-white font-semibold`}
        style={{ backgroundColor: colorForName(name || '?') }}
      >
        {initial}
      </div>
      {showOnline && isOnline && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-online rounded-full border-2 border-white" />
      )}
    </div>
  );
}
