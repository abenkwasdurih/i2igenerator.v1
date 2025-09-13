import React, { useState } from 'react';
import { validateApiKey } from '../services/geminiService';

interface ApiKeyInputProps {
  onApiKeySave: (key: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySave }) => {
  const [key, setKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!key.trim()) {
      setError("API Key tidak boleh kosong.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    const result = await validateApiKey(key.trim());
    
    if (result.isValid) {
      onApiKeySave(key.trim());
    } else {
      setError(result.error || "Terjadi kesalahan yang tidak diketahui saat validasi.");
      setIsLoading(false);
    }
    // No need to set isLoading to false on success, as the component will unmount.
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center font-sans p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Masukkan API Key Anda</h1>
        <p className="text-cyan-400 mb-6">Untuk menggunakan AI Product Ad Generator</p>
        
        <p className="text-gray-400 text-sm mb-4 text-left">
          Anda memerlukan Google AI API Key untuk melanjutkan. Dapatkan milik Anda dari{' '}
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-500 hover:underline"
          >
            Google AI Studio
          </a>.
        </p>
        
        <div className="flex flex-col gap-4">
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Masukkan API Key Anda di sini"
            className={`w-full bg-gray-900 border-2 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2  transition-colors duration-300 ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-cyan-500 focus:border-cyan-500'}`}
            aria-label="Google AI API Key"
            disabled={isLoading}
          />

          {error && <p className="text-red-400 text-sm text-left -mt-2">{error}</p>}

          <button
            onClick={handleSave}
            disabled={!key.trim() || isLoading}
            className={`w-full py-3 px-6 text-lg font-bold rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center
              ${(!key.trim() || isLoading)
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-cyan-500 hover:bg-cyan-400 text-gray-900 shadow-lg shadow-cyan-500/30'
              }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-dashed rounded-full animate-spin border-white mr-3"></div>
                Memvalidasi...
              </>
            ) : (
              'Simpan & Mulai Membuat'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyInput;