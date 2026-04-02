import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import fs from "fs/promises";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export interface UploadFileResult {
  secure_url: string;
  public_id: string;
  format: string;
  resource_type: string;
  [key: string]: unknown;
}
 
export const uploadFile = async (
  tempFilePath: string,
): Promise<UploadFileResult | Error> => {
  try {
    const result: UploadFileResult = await cloudinary.uploader.upload(
      tempFilePath,
      {
        folder: "yogapath/images",
        resource_type: "auto",
      },
    );

    await fs.unlink(tempFilePath);

    return result;
  } catch (error) {
    console.error("Upload error:", error);
    return new Error("Upload failed");
  }
};


export const deleteFile = async (
  publicId: string
): Promise<UploadApiResponse | Error> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Error deleting file:", error);
    return new Error("File deletion failed");
  }
};

export default cloudinary;