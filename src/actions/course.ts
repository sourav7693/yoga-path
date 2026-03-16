"use server";

import { generateCustomId } from "@/helper/generateCustomId";
import { parseImage } from "@/helper/parseImage";
import { deleteFile, uploadFile } from "@/lib/cloudinaryService";
import { connectDb } from "@/lib/connection";
import { Course } from "@/models/Course";
import { generateSlug } from "@/helper/generateSlug";
import { revalidatePath } from "next/cache";
import calendar, { TOKEN_PATH, getAuthClient } from "@/lib/googleCalendar";
import fsSync from "fs";

export async function createCourse(prevState: unknown, formData: FormData) {
  await connectDb();

  const courseName = formData.get("courseName") as string;
  const description = formData.get("description") as string;

  const category = formData.get("category") as string;
  const days = formData.get("days") as string;

  const startDate = formData.get("startDate") as string;
  const startTime = formData.get("startTime") as string;
  const endDate = formData.get("endDate") as string;

  const combinedStartDate = new Date(`${startDate}T${startTime}:00`);

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
    !startTime ||
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

  if (startDate > endDate) {
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

  if (!fsSync.existsSync(TOKEN_PATH)) {
    return {
      success: false,
      message: "Please connect your Google Calendar account first",
      authRequired: true,
    };
  }

  const auth = getAuthClient();
  if (!auth) {
    return { success: false, message: "Google Calendar not configured" };
  }

  const event = await calendar.events.insert({
    calendarId: "primary",
    conferenceDataVersion: 1,
    auth: auth,
    requestBody: {
      summary: courseName,
      description,
      start: {
        dateTime: combinedStartDate.toISOString(),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: new Date(endDate).toISOString(),
        timeZone: "Asia/Kolkata",
      },
      conferenceData: {
        createRequest: {
          requestId: `${Date.now()}-${Math.random()}`,
          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
        },
      },
      guestsCanModify: false,
      guestsCanInviteOthers: false,
      guestsCanSeeOtherGuests: true,
    },
  });

  const meetLink = event.data.hangoutLink;
  const googleEventId = event.data.id;

  await Course.create({
    courseId,
    courseName,
    courseSlug: slug,
    description,
    category,
    days,
    startDate: combinedStartDate,
    endDate,
    meetingDuration,
    courseMRP,
    discount,
    offerPrice,
    meetLink,
    googleEventId,
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

    const course = await Course.findOne({ courseId });

    if (!course) {
      return { success: false, message: "Course not found" };
    }

    const updatedData: Record<string, unknown> = {
      courseName: (formData.get("courseName") as string)?.trim(),
      description: (formData.get("description") as string)?.trim(),
      category: (formData.get("category") as string)?.trim(),
      days: (formData.get("days") as string)?.trim(),
      startDate: new Date(`${formData.get("startDate")}T${formData.get("startTime")}:00`),
      endDate: formData.get("endDate"),
      meetingDuration: formData.get("meetingDuration"),
      courseMRP: Number(formData.get("courseMRP")),
      discount: Number(formData.get("discount")),
      offerPrice: Number(formData.get("offerPrice")),
    };

    if (updatedData.courseName) {
      updatedData.courseSlug = generateSlug(updatedData.courseName as string);
    }

    const newStartDate = formData.get("startDate") as string | null;
    const newStartTime = formData.get("startTime") as string | null;
    const newEndDate = formData.get("endDate") as string | null;
    const newMeetingDuration = formData.get("meetingDuration") as string | null;

    const combinedNewStartDate = newStartDate && newStartTime ? new Date(`${newStartDate}T${newStartTime}:00`) : null;

    const startDateChanged =
      combinedNewStartDate && course.startDate
        ? combinedNewStartDate.getTime() !==
          new Date(course.startDate).getTime()
        : Boolean(combinedNewStartDate) !== Boolean(course.startDate);
    const endDateChanged =
      newEndDate && course.endDate
        ? new Date(newEndDate).getTime() !== new Date(course.endDate).getTime()
        : Boolean(newEndDate) !== Boolean(course.endDate);
    const meetingDurationChanged =
      newMeetingDuration !== course.meetingDuration;

    if (!fsSync.existsSync(TOKEN_PATH)) {
      return {
        success: false,
        message: "Please connect your Google Calendar account first",
        authRequired: true,
      };
    }

    const auth = getAuthClient();
    if (!auth) {
      return { success: false, message: "Google Calendar not configured" };
    }

    if (!course.googleEventId || !course.meetLink) {
      const event = await calendar.events.insert({
        calendarId: "primary",
        conferenceDataVersion: 1,
        auth: auth,
        requestBody: {
          summary: (updatedData.courseName as string) || course.courseName,
          description:
            (updatedData.description as string) || course.description,
          start: {
            dateTime: (combinedNewStartDate || new Date(course.startDate)).toISOString(),
            timeZone: "Asia/Kolkata",
          },
          end: {
            dateTime: new Date(
              newEndDate || course.endDate || new Date(),
            ).toISOString(),
            timeZone: "Asia/Kolkata",
          },
          conferenceData: {
            createRequest: {
              requestId: `${Date.now()}-${Math.random()}`,
              conferenceSolutionKey: {
                type: "hangoutsMeet",
              },
            },
          },
          guestsCanModify: false,
          guestsCanInviteOthers: false,
          guestsCanSeeOtherGuests: true,
        },
      });

      if (event.data.hangoutLink) {
        updatedData.meetLink = event.data.hangoutLink;
      }
      if (event.data.id) {
        updatedData.googleEventId = event.data.id;
      }
    } else if (startDateChanged || endDateChanged || meetingDurationChanged) {
      await calendar.events.patch({
        calendarId: "primary",
        eventId: course.googleEventId,
        auth: auth,
        requestBody: {
          summary: (updatedData.courseName as string) || course.courseName,
          description:
            (updatedData.description as string) || course.description,
          start: {
            dateTime: (combinedNewStartDate || new Date(course.startDate)).toISOString(),
            timeZone: "Asia/Kolkata",
          },
          end: {
            dateTime: new Date(
              newEndDate || course.endDate || new Date(),
            ).toISOString(),
            timeZone: "Asia/Kolkata",
          },
        },
      });
    }

    const newThumbnail = formData.get("thumbnail") as File | null;

    if (newThumbnail && newThumbnail.size > 0) {
      if (course.thumbnail?.public_id) {
        await deleteFile(course.thumbnail.public_id);
      }

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
