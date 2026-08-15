import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import os from "os";
import crypto from "crypto";

const IS_DEV = process.env.NODE_ENV === "development";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || "";
const bucketName = process.env.SUPABASE_BUCKET_NAME || "";

const UPLOAD_DIR = path.join(__dirname, "../../uploads");

let supabase: ReturnType<typeof createClient> | null = null;

if (!IS_DEV) {
  if (!supabaseUrl || !supabaseKey) {
    console.warn("WARNING: Supabase URL or Key is missing from environment variables.");
  } 
  else {
    supabase = createClient(supabaseUrl, supabaseKey);
  }
}

const ensureDirectoriesExist = () => {
  if (!IS_DEV) return;

  const audioDir = path.join(UPLOAD_DIR, "audio");
  const previewsDir = path.join(UPLOAD_DIR, "previews");
  const coversDir = path.join(UPLOAD_DIR, "covers");

  if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);
  if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir);
  if (!fs.existsSync(previewsDir)) {
    fs.mkdirSync(previewsDir);
  }
  if (!fs.existsSync(coversDir)) fs.mkdirSync(coversDir);
};

ensureDirectoriesExist();

export const uploadFileToBucket = async (
  fileBuffer: Buffer,
  originalName: string,
  mimeType: string,
  folder: "covers" | "audio"  | "previews"
): Promise<string> => {
  try {
    const extension = path.extname(originalName);
    const uniqueFilename = `${uuidv4()}${extension}`;

    if (IS_DEV) {
      const filePath = path.join(UPLOAD_DIR, folder, uniqueFilename);
      fs.writeFileSync(filePath, fileBuffer);
      const baseUrl = process.env.BASE_URL || "http://localhost:3000";
      return `${baseUrl}/uploads/${folder}/${uniqueFilename}`;
    } 
    else {
      if (!supabase) {
        throw new Error("Supabase client is not initialized. Check your environment variables.");
      }

      const uploadPath = `${folder}/${uniqueFilename}`;
      
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(uploadPath, fileBuffer, {
          contentType: mimeType,
          upsert: false,
        });

      if (uploadError) {
        throw new Error(`Supabase upload failed: ${uploadError.message}`);
      }

      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(uploadPath);

      return publicUrlData.publicUrl;
    }
  } 
  catch (error) {
    console.error("Storage Upload Error:", error);
    throw error;
  }
};

export const uploadAudio = async (
  fileBuffer: Buffer,
  originalName: string,
  mimeType: string
): Promise<string> => {
  if (!mimeType.startsWith("audio/")) {
    throw new Error("File must be an audio format");
  }

  return await uploadFileToBucket(fileBuffer, originalName, mimeType, "audio");
};

export const uploadImage = async (
  fileBuffer: Buffer,
  originalName: string,
  mimeType: string
): Promise<string> => {
  if (!mimeType.startsWith("image/")) {
    throw new Error("File must be an image format");
  }

  return await uploadFileToBucket(fileBuffer, originalName, mimeType, "covers");
};



export const createAudioPreview = async (
  buffer: Buffer,
  originalName: string
): Promise<{
  buffer: Buffer;
  filename: string;
  mimetype: string;
}> => {
  const tempId = crypto.randomUUID();

  const extension = path.extname(originalName) || ".mp3";

  const inputPath = path.join(
    os.tmpdir(),
    `${tempId}${extension}`
  );

  const outputPath = path.join(
    os.tmpdir(),
    `${tempId}-preview.mp3`
  );

  try {
    // Write original audio temporarily
    await fs.promises.writeFile(inputPath, buffer);

    // Extract first 8 seconds
    await new Promise<void>((resolve, reject) => {
      ffmpeg(inputPath)
        .setStartTime(0)
        .setDuration(8)
        .audioCodec("libmp3lame")
        .audioBitrate("128k")
        .output(outputPath)
        .on("end", () => resolve())
        .on("error", reject)
        .run();
    });

    const previewBuffer = await fs.promises.readFile(outputPath);

    return {
      buffer: previewBuffer,
      filename: `${path.basename(
        originalName,
        extension
      )}-preview.mp3`,
      mimetype: "audio/mpeg",
    };
  } finally {
    // Clean up temporary files
    await Promise.allSettled([
      fs.promises.unlink(inputPath),
      fs.promises.unlink(outputPath),
    ]);
  }
};

export const uploadAudioPreview = async (
  fileBuffer: Buffer,
  originalName: string,
  mimeType: string
): Promise<string> => {
  if (mimeType !== "audio/mpeg") {
    throw new Error("Preview must be an MP3 audio file");
  }

  return await uploadFileToBucket(
    fileBuffer,
    originalName,
    mimeType,
    "previews"
  );
};