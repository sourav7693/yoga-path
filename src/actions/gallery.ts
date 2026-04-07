"use server";

import { connectDb } from "@/lib/connection";
import Gallery from "@/models/Gallery";
import cloudinary, {
  deleteFile,
  UploadFileResult,
} from "@/lib/cloudinaryService";
import { generateCustomId } from "@/helper/generateCustomId";
import { revalidatePath } from "next/cache";

export async function createGallery(prev: unknown, formData: FormData) {
  try {
    await connectDb();

    const title = formData.get("title") as string;
    const image = formData.get("image") as File;

    if (!title) {
      return { success: false, message: "Title required" };
    }

    if (!image || image.size === 0) {
      return { success: false, message: "Image required" };
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult: UploadFileResult = await new Promise(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
            folder: "yogapath/gallery",
          },
          (error, result) => {
            if (error) reject(error);
            else if (result) resolve(result);
            else reject(new Error("Upload failed"));
          },
        );

        stream.end(buffer);
      },
    );

    await Gallery.create({
      galleryId: await generateCustomId(Gallery, "galleryId", "GL-"),
      title,
      imageUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });

    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");

    return { success: true, message: "Image uploaded successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Server error" };
  }
}

export async function getGallery(
  page: number | string = 1,
  limit: number | string = 12,
  sort: string = "createdAt",
  order: "asc" | "desc" = "desc",
  searchQuery?: string,
) {
  try {
    await connectDb();

    const filter: Record<string, any> = {};

    if (searchQuery && searchQuery.trim() !== "") {
      const searchRegex = { $regex: searchQuery.trim(), $options: "i" };

      filter.$or = [{ title: searchRegex }, { galleryId: searchRegex }];
    }

    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);

    const skip = (pageNumber - 1) * pageSize;

    const sortOrder = order === "asc" ? 1 : -1;

    const sortQuery: Record<string, 1 | -1> = {
      [sort]: sortOrder,
    };

    let query = Gallery.find(filter).sort(sortQuery);

    if (pageSize > 0) {
      query = query.skip(skip).limit(pageSize);
    }

    const [gallery, totalCount] = await Promise.all([
      query.lean(),
      Gallery.countDocuments(filter),
    ]);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(gallery)),
      pagination: {
        totalCount,
        currentPage: pageNumber,
        limit: pageSize,
        totalPages: pageSize > 0 ? Math.ceil(totalCount / pageSize) : 1,
      },
    };
  } catch (error) {
    console.error("getGallery error:", error);

    return {
      success: false,
      data: [],
      pagination: {
        totalCount: 0,
        currentPage: 1,
        limit: 10,
        totalPages: 0,
      },
    };
  }
}

export async function deleteGallery(prev: unknown, formData: FormData) {
  try {
    await connectDb();

    const galleryId = formData.get("galleryId") as string;

    const item = await Gallery.findOne({ galleryId });

    if (!item) {
      return { success: false };
    }

    await deleteFile(item.publicId);

    await Gallery.findOneAndDelete({ galleryId });

    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");

    return { success: true, message: "Image deleted successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Server error" };
  }
}