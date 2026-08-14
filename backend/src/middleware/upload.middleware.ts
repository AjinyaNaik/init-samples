import multer from "multer";

const storage = multer.memoryStorage();

export const uploadAudioMiddleware = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
}).single("audio_file"); 

export const uploadImageMiddleware = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
}).single("cover_image"); 