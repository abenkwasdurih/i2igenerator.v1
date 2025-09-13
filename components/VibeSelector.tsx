import React from 'react';
import type { Vibe } from '../types';
import { VIBES } from '../constants';

interface VibeSelectorProps {
  selectedVibe: Vibe | null;
  onSelectVibe: (vibe: Vibe) => void;
  disabled: boolean;
}

const VibeSelector: React.FC<VibeSelectorProps> = ({ selectedVibe, onSelectVibe, disabled }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {VIBES.map((vibe) => (
        <button
          key={vibe.id}
          onClick={() => onSelectVibe(vibe)}
          disabled={disabled}
          className={`
            flex flex-col items-center justify-center p-3 aspect-square rounded-lg border-2 text-center transition-all duration-300
            ${selectedVibe?.id === vibe.id
              ? 'bg-cyan-500 border-cyan-400 text-gray-900 font-bold shadow-lg shadow-cyan-500/20 scale-105'
              : 'bg-gray-800 border-gray-600'
            }
            ${!disabled && selectedVibe?.id !== vibe.id ? 'hover:border-cyan-500 hover:bg-gray-700' : ''}
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          `}
          title={vibe.name}
        >
          <div className="mb-2">{vibe.icon}</div>
          <span className="text-xs font-semibold">{vibe.name}</span>
        </button>
      ))}
    </div>
  );
};

export default VibeSelector;