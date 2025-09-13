import React, { useCallback } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  preview: string | null;
  disabled: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, preview, disabled }) => {
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && !disabled) {
      onImageUpload(file);
    }
  }, [onImageUpload, disabled]);

  return (
    <div className="w-full">
      <label
        htmlFor="image-upload"
        className={`
          relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg
          transition-colors duration-300
          ${disabled 
            ? 'border-gray-700 bg-gray-800 opacity-50 cursor-not-allowed' 
            : preview 
              ? 'border-cyan-500' 
              : 'border-gray-600 bg-gray-800 hover:bg-gray-700 cursor-pointer'
          }
        `}
      >
        {preview ? (
          <img src={preview} alt="Product preview" className="object-contain h-full w-full rounded-lg" />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4V6a4 4 0 014-4h10a4 4 0 014 4v6a4 4 0 01-4 4H7z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m3-3H7"></path></svg>
            <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Klik untuk mengunggah</span> atau seret dan lepas</p>
            <p className="text-xs text-gray-500">PNG, JPG, atau WEBP</p>
          </div>
        )}
        <input id="image-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" disabled={disabled} />
      </label>
    </div>
  );
};

export default ImageUploader;