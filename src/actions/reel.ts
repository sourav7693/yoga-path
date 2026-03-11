"use server";

import { connectDb } from "@/lib/connection";
import Reel from "@/models/Reel";
import { uploadFile, deleteFile } from "@/lib/cloudinaryService";
import { writeFile } from "fs/promises";
import path from "path";
import { generateCustomId } from "@/helper/generateCustomId";
import { revalidatePath } from "next/cache";

export async function createReel(prev: unknown, formData: FormData) {
  try {
    await connectDb();

    const reelName = formData.get("reelName") as string;
    const video = formData.get("video") as File;

     if (!video || video.size === 0) {
       return { success: false, message: "Video required" };
     }

    const bytes = await video.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const tempPath = path.join(process.cwd(), "public/temp", video.name);

    await writeFile(tempPath, buffer);

    const uploadResult = await uploadFile(tempPath);

    if (uploadResult instanceof Error) {
      return { success: false, message: "Upload failed" };
    }

    await Reel.create({
        reelId : await generateCustomId(Reel, "reelId", "RL-"),
      reelName,
      videoUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });
    revalidatePath("/admin/reel");
    revalidatePath("/");
    return { success: true, message: "Reel uploaded successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Server error" };
  }
}

export async function getReels(
  page: number | string = 1,
  limit: number | string = 10,
  sort: string = "createdAt",
  order: "asc" | "desc" = "desc",
  searchQuery?: string,
) {
  try {
    await connectDb();

    const filter: Record<string, any> = {};

    if (searchQuery && searchQuery.trim() !== "") {
      const searchRegex = { $regex: searchQuery.trim(), $options: "i" };

      filter.$or = [{ reelName: searchRegex }, { reelId: searchRegex }];
    }

    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);

    const skip = (pageNumber - 1) * pageSize;

    const sortOrder = order === "asc" ? 1 : -1;

    const sortQuery: Record<string, 1 | -1> = {
      [sort]: sortOrder,
    };

    let query = Reel.find(filter).sort(sortQuery);

    if (pageSize > 0) {
      query = query.skip(skip).limit(pageSize);
    }

    const [reels, totalCount] = await Promise.all([
      query.lean(),
      Reel.countDocuments(filter),
    ]);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(reels)),
      pagination: {
        totalCount,
        currentPage: pageNumber,
        limit: pageSize,
        totalPages: pageSize > 0 ? Math.ceil(totalCount / pageSize) : 1,
      },
    };
  } catch (error) {
    console.error("getReels error:", error);

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

export async function deleteReel(prev: unknown, formData: FormData) {
  try {
    await connectDb();

    const reelId = formData.get("reelId") as string;

    const reel = await Reel.findOne({ reelId });

    if (!reel) {
      return { success: false };
    }

    await deleteFile(reel.publicId);

    await Reel.findOneAndDelete({ reelId });
    revalidatePath("/admin/reel");
    revalidatePath("/");
    return { success: true, message: "Reel deleted successfully" };
  } catch (error) {
    return { success: false, message: "Server error" };
  }
}