"use server";

import { generateCustomId } from "@/helper/generateCustomId";
import { parseImage } from "@/helper/parseImage";
import { deleteFile, uploadFile } from "@/lib/cloudinaryService";
import { connectDb } from "@/lib/connection";
import { Course } from "@/models/Course";
import { generateSlug } from "@/helper/generateSlug";
import { revalidatePath } from "next/cache";

export async function createCourse(prevState: unknown, formData: FormData) {
  await connectDb();

  const courseName = formData.get("courseName") as string;
  const description = formData.get("description") as string;

  const category = formData.get("category") as string;
  const days = formData.get("days") as string;

  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;

  const meetingDuration = formData.get("meetingDuration") as string;

  const courseMRP = Number(formData.get("courseMRP"));
  const discount = Number(formData.get("discount"));

  const thumbnail = formData.get("thumbnail") as File;

  const slug = generateSlug(courseName);  
  const offerPrice = Number(formData.get("offerPrice"));

  if (
    !courseName ||
    !description ||
    !category ||
    !days ||
    !startDate ||
    !endDate ||
    !meetingDuration ||
    !courseMRP ||
    !discount ||
    !thumbnail
  ) {
    return { success: false, message: "All fields are required" };
  }

  if (courseMRP === 0) {
    return {
      success: false,
      message: "Course Price must be greater than zero",
    };
  }

  if(startDate > endDate) {
    return {
      success: false,
      message: "Start date must be less than end date",
    };
  }

  const tempFilePath = await parseImage(thumbnail);
  const [fileUploadResult, courseId] = await Promise.all([
    uploadFile(tempFilePath),
    generateCustomId(Course, "courseId", "#CI-"),
  ]);

  if (fileUploadResult instanceof Error) {
    return { success: false, message: "Image upload failed" };
  }

  await Course.create({
    courseId,
    courseName,
    courseSlug: slug,
    description,
    category,
    days,
    startDate,
    endDate,
    meetingDuration,
    courseMRP,
    discount,
    offerPrice,
    thumbnail: {
      secure_url: fileUploadResult.secure_url,
      public_id: fileUploadResult.public_id,
    },
  });

  revalidatePath("/admin/manage-course");
  revalidatePath("/");

  return { success: true, message: "Course created successfully" };
}

export async function getAllCourses(
  page: number | string = 1,
  limit: number | string = 10,
  sort: string = "createdAt",
  order: "asc" | "desc" = "desc",
  category?: string,
  searchQuery?: string,
) {
  try {
    await connectDb();

    const filter: Record<string, unknown> = {};
     filter.$or = [
       { endDate: { $exists: false } },
       { endDate: { $gte: new Date() } },
     ];

    if (category && category.trim() !== "") {
      filter.category = category.trim();
    }

    if (searchQuery && searchQuery.trim() !== "") {
      const searchRegex = { $regex: searchQuery.trim(), $options: "i" };

     filter.$and = [
       {
         $or: [
           { courseName: searchRegex },
           { category: searchRegex },
           { status: searchRegex },
         ],
       },
     ];
    }

    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);

    const skip = (pageNumber - 1) * pageSize;

    const sortOrder = order === "asc" ? 1 : -1;

    const sortQuery: Record<string, 1 | -1> = {
      [sort]: sortOrder,
    };

    let query = Course.find(filter).sort(sortQuery);

    if (pageSize > 0) {
      query = query.skip(skip).limit(pageSize);
    }

    const [courses, totalCount] = await Promise.all([
      query.lean(),
      Course.countDocuments(filter),
    ]);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(courses)),
      pagination: {
        totalCount,
        currentPage: pageNumber,
        limit: pageSize,
        totalPages: pageSize > 0 ? Math.ceil(totalCount / pageSize) : 1,
      },
    };
  } catch (error) {
    console.error("getAllCourses error:", error);

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

export async function updateCourse(prevState: unknown, formData: FormData) {
  try {
    await connectDb();

    const courseId = formData.get("courseId") as string;

    if (!courseId) {
      return { success: false, message: "Course ID required" };
    }

    const updatedData: Record<string, unknown> = {
      courseName: (formData.get("courseName") as string)?.trim(),
      description: (formData.get("description") as string)?.trim(),
      category: (formData.get("category") as string)?.trim(),
      days: (formData.get("days") as string)?.trim(),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      meetingDuration: formData.get("meetingDuration"),
      courseMRP: Number(formData.get("courseMRP")),
      discount: Number(formData.get("discount")),
      offerPrice: Number(formData.get("offerPrice")),
    };

    if (updatedData.courseName) {
      updatedData.courseSlug = generateSlug(updatedData.courseName as string);
    }

    const newThumbnail = formData.get("thumbnail") as File | null;

    if (newThumbnail && newThumbnail.size > 0) {
      const course = await Course.findOne({ courseId });

      if (!course) {
        return {
          success: false,
          message: "Course not found for image update",
        };
      }

      await deleteFile(course.thumbnail.public_id);

      const tempPath = await parseImage(newThumbnail);
      const uploadResult = await uploadFile(tempPath);

      if (!(uploadResult instanceof Error)) {
        updatedData.thumbnail = {
          public_id: uploadResult.public_id,
          secure_url: uploadResult.secure_url,
        };
      }
    }

    const updatedCourse = await Course.findOneAndUpdate(
      { courseId },
      { $set: updatedData },
      { new: true },
    );

    if (!updatedCourse) {
      return { success: false, message: "Course not found" };
    }

    revalidatePath("/admin/manage-course");
    revalidatePath("/");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(updatedCourse)),
      message: "Course updated successfully",
    };
  } catch (err) {
    console.error("updateCourse error:", err);

    return {
      success: false,
      message: "Failed to update course",
    };
  }
}

export async function deleteCourse(courseId: string) {
  try {
    await connectDb();

    const course = await Course.findOne({ courseId });

    if (!course) {
      return { success: false, message: "Course not found" };
    }

    if (course.thumbnail?.public_id) {
      await deleteFile(course.thumbnail.public_id);
    }

    await Course.findOneAndDelete({ courseId });

    revalidatePath("/admin/manage-course");
    revalidatePath("/");

    return {
      success: true,
      message: "Course deleted successfully",
    };
  } catch (err) {
    console.error("deleteCourse error:", err);

    return {
      success: false,
      message: "Failed to delete course",
    };
  }
}