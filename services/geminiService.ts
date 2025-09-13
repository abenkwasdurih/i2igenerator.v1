import { GoogleGenAI, Modality } from "@google/genai";
import type { Vibe, ModelGender } from '../types';

// Variabel privat tingkat modul untuk menyimpan klien yang telah diinisialisasi.
let apiClient: GoogleGenAI | null = null;

// Fungsi untuk menginisialisasi klien. Ini adalah satu-satunya tempat API key ditangani.
export const initializeApiClient = (apiKey: string): void => {
  if (!apiKey) {
    throw new Error("API Key diperlukan untuk menginisialisasi klien.");
  }
  apiClient = new GoogleGenAI({ apiKey });
};

// Fungsi privat untuk mendapatkan klien, memastikan klien tersebut telah diinisialisasi.
const getApiClient = (): GoogleGenAI => {
  if (!apiClient) {
    throw new Error("Klien API belum diinisialisasi. Harap berikan API Key.");
  }
  return apiClient;
};

// Fungsi validasi tetap diekspor untuk digunakan oleh layar input.
export const validateApiKey = async (apiKey: string): Promise<{ isValid: boolean; error?: string }> => {
  if (!apiKey || !apiKey.trim()) {
    return { isValid: false, error: "API Key tidak boleh kosong." };
  }

  try {
    const tempAi = new GoogleGenAI({ apiKey });
    const response = await tempAi.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Test validation',
    });

    const text = response.text;
    
    if (typeof text === 'string' && text.trim().length > 0) {
      return { isValid: true };
    } else {
      const finishReason = response.candidates?.[0]?.finishReason;
      const errorMsg = `Validasi gagal. Kunci API mungkin tidak valid atau tidak memiliki izin. (Alasan: ${finishReason || 'Respons Kosong'})`;
      return { isValid: false, error: errorMsg };
    }
  } catch (error) {
    console.error("Validasi API Key gagal:", error);
    let userMessage = "Terjadi kesalahan saat memvalidasi API Key.";
    const errorMessage = error instanceof Error ? error.message : String(error);

    if (/API key not valid/i.test(errorMessage) || /API_KEY_INVALID/i.test(errorMessage) || errorMessage.includes("400")) {
        userMessage = "API Key yang Anda masukkan tidak valid. Silakan periksa kembali.";
    } else if (/permission denied/i.test(errorMessage) || errorMessage.includes("403")) {
        userMessage = "API Key tidak memiliki izin yang diperlukan. Pastikan Generative Language API diaktifkan.";
    } else if (/quota/i.test(errorMessage) || /RESOURCE_EXHAUSTED/i.test(errorMessage) || errorMessage.includes("429")) {
        userMessage = "API Key ini telah melebihi kuota penggunaan.";
    }
    
    return { isValid: false, error: userMessage };
  }
};


export const CAMERA_ANGLES = [
  'Full body shot, model menggunakan produk dalam konteks gaya hidup yang realistis. Produk menjadi fokus yang jelas.',
  'Close-up dramatis pada produk itu sendiri, menonjolkan tekstur dan detailnya. Tangan model dapat terlihat berinteraksi dengannya.',
  'Over-the-shoulder shot (bidikan dari atas bahu), memberikan nuansa personal dan sudut pandang model saat menggunakan produk.',
  'High-angle shot (bidikan dari atas) melihat ke bawah, dengan model dan produk diatur secara artistik dalam adegan, hampir seperti flat lay.'
];

const generateSingleImage = async (
  base64Image: string,
  mimeType: string,
  productName: string,
  modelGender: ModelGender,
  vibe: Vibe,
  angle: string
): Promise<string> => {
  const ai = getApiClient(); // Menggunakan fungsi internal untuk mendapatkan klien yang telah diinisialisasi.
  const modelPrompt = `a ${modelGender === 'pria' ? 'male' : 'female'} model`;
  
  const prompt = `
    **Task:** Create a photorealistic, 4K resolution product advertisement image.

    **Main Product:** A "${productName}", as shown in the uploaded image. Integrate the product seamlessly into a new scene.

    **Critical Requirement: Model Consistency**
    You will be asked to generate multiple images for this product. It is absolutely essential that you use the **exact same human model** in every single image. This means the model must have the same face, hair style and color, body type, and be wearing the exact same clothing in all generated images for this session. Maintain this consistency across different camera angles and poses.

    **Image Details:**
    - Model: ${modelPrompt}. The model should be interacting with the "${productName}" in a way that is natural and relevant to the product's use.
    - Aspect Ratio: The final image MUST have a vertical 9:16 aspect ratio, suitable for social media stories.
    - Vibe and Setting: ${vibe.prompt}
    - Camera and Pose: ${angle}. The camera must focus on the product.
    
    **Strict Quality Control (Very Important):**
    - **Anatomical Perfection:** Pay extreme attention to the human model's anatomy. Hands, fingers, face, and all body parts must be perfectly and correctly formed. AVOID any anatomical deformities.
    - **No Text or Watermarks:** The image must be completely clean. DO NOT include any text, subtitles, logos, or watermarks of any kind.
    - **Photorealistic Goal:** The final output must look like a high-budget professional photograph, not an AI-generated image. It must be ultra-realistic and highly detailed.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);
    if (imagePart && imagePart.inlineData) {
      return imagePart.inlineData.data;
    } else {
      const textPart = response.candidates?.[0]?.content?.parts?.find(part => part.text);
      const safetyReason = response.candidates?.[0]?.finishReason;
      const safetyRatings = JSON.stringify(response.candidates?.[0]?.safetyRatings);
       if ((response as any).error) {
         throw new Error(`API call failed: ${(response as any).error.message}. Please check if your API key is valid and has permissions.`);
      }
      throw new Error(`Image generation failed. Reason: ${safetyReason}. Text response: ${textPart?.text || 'None'}. Safety Ratings: ${safetyRatings}`);
    }
  } catch (error) {
    console.error("Error generating single image:", error);
    if (error instanceof Error) {
        if (error.message.includes("API key not valid")) {
            throw new Error("API key Anda tidak valid. Silakan periksa kembali dan coba lagi.");
        }
        if (error.message.includes("RESOURCE_EXHAUSTED") || error.message.includes("429")) {
             throw new Error("Batas penggunaan API tercapai (Error 429). Model gratis memiliki batasan permintaan yang sangat ketat, seringkali hanya 1-2 per menit. Proses dihentikan untuk mencegah pemblokiran. Silakan coba lagi setelah beberapa menit.");
        }
        throw new Error(`Gagal membuat gambar. Penyebab: ${error.message}`);
    }
    throw new Error(`Gagal membuat gambar. Terjadi kesalahan yang tidak diketahui.`);
  }
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateAdImages = async (
  base64Image: string,
  mimeType: string,
  productName: string,
  modelGender: ModelGender,
  vibe: Vibe,
  onImageGenerated: (image: string) => void,
  cancellationRef: React.MutableRefObject<boolean>
): Promise<void> => {
  for (let i = 0; i < CAMERA_ANGLES.length; i++) {
    if (cancellationRef.current) {
      console.log("Image generation cancelled by user.");
      break; 
    }

    const angle = CAMERA_ANGLES[i];
    try {
      const image = await generateSingleImage(base64Image, mimeType, productName, modelGender, vibe, angle);
      
      if (cancellationRef.current) break;
      
      onImageGenerated(image);

      if (i < CAMERA_ANGLES.length - 1) {
        const delay = 20000 + Math.random() * 10000;
        await sleep(delay);
      }
    } catch (error) {
      console.error(`Stopping image generation for angle "${angle}":`, error);
       if (error instanceof Error) {
        throw new Error(`Pembuatan gambar dihentikan. ${error.message}`);
      }
      break; 
    }
  }
};

export const regenerateAdImage = async (
  base64Image: string,
  mimeType: string,
  productName: string,
  modelGender: ModelGender,
  vibe: Vibe,
  angle: string
): Promise<string> => {
  return await generateSingleImage(base64Image, mimeType, productName, modelGender, vibe, angle);
};