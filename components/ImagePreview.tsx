import React, { useEffect } from 'react';

interface ImagePreviewProps {
  src: string;
  onClose: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ src, onClose }) => {
  useEffect(() => {
    // Menangani penekanan tombol Escape
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Mencegah scroll di latar belakang
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup effect
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-4xl hover:text-cyan-400 transition-colors z-50"
        aria-label="Tutup pratinjau"
      >
        &times;
      </button>
      <div
        className="relative max-w-full max-h-full"
        onClick={(e) => e.stopPropagation()} // Mencegah klik pada gambar menutup modal
      >
        <img
          src={`data:image/jpeg;base64,${src}`}
          alt="Pratinjau gambar yang dihasilkan"
          className="object-contain max-w-full max-h-[90vh] rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
};

export default ImagePreview;
