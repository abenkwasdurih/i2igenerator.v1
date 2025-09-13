import React from 'react';
import type { ModelGender } from '../types';

interface ModelSelectorProps {
  selectedModel: ModelGender | null;
  onSelectModel: (model: ModelGender) => void;
  disabled: boolean;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onSelectModel, disabled }) => {
  const options: { id: ModelGender; label: string }[] = [
    { id: 'pria', label: 'Pria' },
    { id: 'wanita', label: 'Wanita' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelectModel(option.id)}
          disabled={disabled}
          className={`
            p-6 text-center rounded-lg border-2 transition-all duration-300
            ${selectedModel === option.id
              ? 'bg-cyan-500 border-cyan-400 text-gray-900 font-bold shadow-lg shadow-cyan-500/20'
              : 'bg-gray-800 border-gray-600'
            }
            ${!disabled && selectedModel !== option.id ? 'hover:border-cyan-500 hover:bg-gray-700' : ''}
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ModelSelector;