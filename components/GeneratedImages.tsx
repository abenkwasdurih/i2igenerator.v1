import React from 'react';

interface GeneratedImagesProps {
  images: string[];
  onRegenerate: (index: number) => void;
  regeneratingIndex: number | null;
  onImageClick: (base64Image: string) => void;
  isGenerationComplete: boolean;
}

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const RegenerateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120.5 10M20 20l-1.5-1.5A9 9 0 003.5 14" />
  </svg>
);

const GeneratedImages: React.FC<GeneratedImagesProps> = ({ images, onRegenerate, regeneratingIndex, onImageClick, isGenerationComplete }) => {
  if (images.length === 0) {
    return (
      <div className="text-center text-gray-400">
        <div className="text-5xl mb-4">🖼️</div>
        <h3 className="text-xl font-bold">Hasil Anda Akan Muncul di Sini</h3>
        <p className="mt-2 text-gray-500">
          Lengkapi semua langkah di sebelah kiri untuk membuat gambar iklan produk Anda.
        </p>
      </div>
    );
  }

  const handleDownload = (e: React.MouseEvent, base64Image: string, index: number) => {
    e.stopPropagation(); // Mencegah klik memicu pratinjau gambar
    const link = document.createElement('a');
    link.href = `data:image/jpeg;base64,${base64Image}`;
    link.download = `iklan-produk-${index + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRegenerateClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation(); // Mencegah klik memicu pratinjau gambar
    onRegenerate(index);
  };


  return (
    <div className="w-full h-full grid grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, index) => {
        const base64Image = images[index];
        const isRegeneratingThis = regeneratingIndex === index;
        const isAnotherRegenerating = regeneratingIndex !== null && !isRegeneratingThis;

        return (
          <div
            key={index}
            className={`relative group bg-gray-700 rounded-lg overflow-hidden shadow-md ${base64Image ? 'cursor-pointer' : ''}`}
            style={{ aspectRatio: '9 / 16' }}
            onClick={() => base64Image && onImageClick(base64Image)}
          >
            {base64Image ? (
              <img
                src={`data:image/jpeg;base64,${base64Image}`}
                alt={`Generated ad image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
                <div className="w-full h-full bg-gray-700"></div>
            )}

            {isGenerationComplete && base64Image && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => handleDownload(e, base64Image, index)}
                  className="p-3 bg-gray-900/70 text-white rounded-full hover:bg-cyan-500 hover:text-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Unduh Gambar"
                  disabled={regeneratingIndex !== null}
                >
                  <DownloadIcon />
                </button>
                <button
                  onClick={(e) => handleRegenerateClick(e, index)}
                  className="p-3 bg-gray-900/70 text-white rounded-full hover:bg-cyan-500 hover:text-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Buat Ulang"
                  disabled={regeneratingIndex !== null}
                >
                  <RegenerateIcon />
                </button>
              </div>
            )}

            {isRegeneratingThis && (
              <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-cyan-400"></div>
                <p className="text-white mt-3 text-sm font-semibold">Membuat ulang...</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GeneratedImages;