import multer from "multer";

const storage = multer.memoryStorage();

export const uploadAudioMiddleware = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, 
}).single("audio_file"); 

export const uploadImageMiddleware = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
}).single("cover_image"); 