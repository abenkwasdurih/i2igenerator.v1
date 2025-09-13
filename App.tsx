import React, { useState, useCallback, useRef } from 'react';
import type { Vibe, ModelGender } from './types';
import { VIBES } from './constants';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ModelSelector from './components/ModelSelector';
import VibeSelector from './components/VibeSelector';
import GeneratedImages from './components/GeneratedImages';
import Loader from './components/Loader';
import { generateAdImages, regenerateAdImage, CAMERA_ANGLES, initializeApiClient } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import ProductInput from './components/ProductInput';
import ApiKeyInput from './components/ApiKeyInput';
import ImagePreview from './components/ImagePreview';

const App: React.FC = () => {
  const [isApiKeySet, setIsApiKeySet] = useState<boolean>(false);
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productImagePreview, setProductImagePreview] = useState<string | null>(null);
  const [productName, setProductName] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<ModelGender | null>(null);
  const [selectedVibe, setSelectedVibe] = useState<Vibe | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [regeneratingIndex, setRegeneratingIndex] = useState<number | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isGenerationComplete, setIsGenerationComplete] = useState<boolean>(false);
  const cancellationRef = useRef<boolean>(false);

  const handleApiKeySave = (key: string) => {
    try {
      initializeApiClient(key);
      setIsApiKeySet(true);
    } catch(err) {
      console.error("Gagal menginisialisasi klien API:", err);
    }
  };

  const handleChangeKey = () => {
    window.location.reload();
  };
  
  const handleImageUpload = (file: File) => {
    setProductImage(file);
    setProductImagePreview(URL.createObjectURL(file));
    setGeneratedImages([]);
    setIsGenerationComplete(false);
  };
  
  const handleImageClick = (base64Image: string) => {
    setPreviewImage(base64Image);
  };

  const handleClosePreview = () => {
    setPreviewImage(null);
  };

  const isFormComplete = !!productImage && !!productName && !!selectedModel && !!selectedVibe;
  const isInputDisabled = isLoading || regeneratingIndex !== null;

  const handleGenerateClick = useCallback(async () => {
    if (!isFormComplete) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);
    setRegeneratingIndex(null);
    setIsGenerationComplete(false);
    cancellationRef.current = false;

    try {
      const base64Image = await fileToBase64(productImage!);
      const mimeType = productImage!.type;
      
      const onImageGenerated = (newImage: string) => {
        setGeneratedImages((prevImages) => [...prevImages, newImage]);
      };

      await generateAdImages(base64Image, mimeType, productName, selectedModel!, selectedVibe!, onImageGenerated, cancellationRef);
      
      if (!cancellationRef.current) {
        setIsGenerationComplete(true);
      } else {
        setError("Proses dibatalkan oleh pengguna.");
      }

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setIsGenerationComplete(false);
    } finally {
      setIsLoading(false);
    }
  }, [productImage, productName, selectedModel, selectedVibe, isFormComplete]);

  const handleCancelClick = () => {
    cancellationRef.current = true;
  };

  const handleRegenerate = useCallback(async (index: number) => {
    if (!productImage || !productName || !selectedModel || !selectedVibe) {
        setError("Harap pastikan semua input terisi sebelum membuat ulang.");
        return;
    }
    
    setRegeneratingIndex(index);
    setError(null);

    try {
        const base64Image = await fileToBase64(productImage!);
        const mimeType = productImage!.type;
        const angle = CAMERA_ANGLES[index];
        
        const newImage = await regenerateAdImage(base64Image, mimeType, productName, selectedModel, selectedVibe, angle);

        setGeneratedImages(currentImages => {
            const updatedImages = [...currentImages];
            updatedImages[index] = newImage;
            return updatedImages;
        });

    } catch (err) {
        console.error(err);
        const errorMessage = err instanceof Error ? err.message : 'Gagal membuat ulang gambar.';
        setError(errorMessage);
    } finally {
        setRegeneratingIndex(null);
    }
  }, [productImage, productName, selectedModel, selectedVibe]);

  if (!isApiKeySet) {
    return <ApiKeyInput onApiKeySave={handleApiKeySave} />;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <Header onChangeKey={handleChangeKey} />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Controls Column */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">1. Unggah Produk</h2>
              <ImageUploader onImageUpload={handleImageUpload} preview={productImagePreview} disabled={isInputDisabled} />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">2. Nama Produk</h2>
              <ProductInput value={productName} onChange={setProductName} disabled={isInputDisabled} />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">3. Pilih Model</h2>
              <ModelSelector selectedModel={selectedModel} onSelectModel={setSelectedModel} disabled={isInputDisabled} />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">4. Pilih Vibe Konten</h2>
              <VibeSelector selectedVibe={selectedVibe} onSelectVibe={setSelectedVibe} disabled={isInputDisabled} />
            </div>

            <button
              onClick={isLoading ? handleCancelClick : handleGenerateClick}
              disabled={(!isFormComplete && !isLoading) || regeneratingIndex !== null}
              className={`w-full py-4 px-6 text-lg font-bold rounded-lg transition-all duration-300 ease-in-out
                ${isLoading
                  ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30'
                  : isFormComplete && regeneratingIndex === null
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-gray-900 shadow-lg shadow-cyan-500/30'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
            >
              {isLoading ? 'Batalkan Proses' : 'Buat Iklan'}
            </button>
          </div>

          {/* Output Column */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-2xl h-full flex items-center justify-center min-h-[500px] lg:min-h-0 relative">
            {isLoading && generatedImages.length === 0 ? (
              <Loader />
            ) : error ? (
              <div className="text-center text-red-400">
                <h3 className="text-xl font-bold mb-2">Oops! Ada yang salah.</h3>
                <p>{error}</p>
              </div>
            ) : (
              <GeneratedImages
                images={generatedImages}
                onRegenerate={handleRegenerate}
                regeneratingIndex={regeneratingIndex}
                onImageClick={handleImageClick}
                isGenerationComplete={isGenerationComplete}
              />
            )}
            {isLoading && generatedImages.length > 0 && (
                 <div className="absolute bottom-4 right-4 bg-gray-900/50 backdrop-blur-sm text-white py-2 px-4 rounded-lg flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-dashed rounded-full animate-spin border-cyan-400"></div>
                    <span>Membuat gambar {generatedImages.length + 1} dari 4...</span>
                 </div>
            )}
          </div>
        </div>
      </main>
      {previewImage && (
        <ImagePreview src={previewImage} onClose={handleClosePreview} />
      )}
    </div>
  );
};

export default App;