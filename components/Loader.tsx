
import React from 'react';

const Loader: React.FC = () => {
  const messages = [
    "Menganalisis produk Anda...",
    "Memilih model terbaik...",
    "Menyesuaikan pencahayaan...",
    "Menemukan sudut kamera yang sempurna...",
    "Menambahkan sentuhan akhir...",
    "Hampir selesai..."
  ];
  
  const [message, setMessage] = React.useState(messages[0]);

  React.useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setMessage(messages[index]);
    }, 2500);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-cyan-500 rounded-full animate-ping opacity-75"></div>
        <div className="absolute inset-0 border-4 border-gray-600 rounded-full"></div>
        <div className="absolute inset-0 flex items-center justify-center text-3xl">✨</div>
      </div>
      <h3 className="text-xl font-bold mt-6 text-white">Memproses...</h3>
      <p className="mt-2 text-cyan-400 transition-opacity duration-500">{message}</p>
    </div>
  );
};

export default Loader;
