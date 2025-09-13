import React from 'react';

interface HeaderProps {
  onChangeKey: () => void;
}

const Header: React.FC<HeaderProps> = ({ onChangeKey }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-3xl">📸</div>
          <div>
            <h1 className="text-2xl font-bold text-white">AI Product Ad Generator</h1>
            <p className="text-sm text-cyan-400">Powered by Gemini Nano Banana</p>
          </div>
        </div>
        <button
          onClick={onChangeKey}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 text-sm"
        >
          Ganti API Key
        </button>
      </div>
    </header>
  );
};

export default Header;