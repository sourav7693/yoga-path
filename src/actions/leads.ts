"use server";

import { generateCustomId } from "@/helper/generateCustomId";
import { connectDb } from "@/lib/connection";
import Lead from "@/models/Lead";
import { randomInt } from "crypto";
import axios from "axios";
import { Course } from "@/models/Course";
import Razorpay from "razorpay";
import crypto from "crypto";
import calendar, { TOKEN_PATH, getAuthClient } from "@/lib/googleCalendar";
import fs from "fs";


const leadStore = new Map<
  string,
  { otp: string; name: string; expiresAt: number }
>();

export async function sendLeadOtp(prevData: unknown, formData: FormData) {
  await connectDb();

  const name = (formData.get("name") as string)?.trim();
  let mobile = (formData.get("mobile") as string)?.trim();

  if (!name || !mobile) {
    return { success: false, message: "All fields are required" };
  }

  mobile = mobile.startsWith("91") ? mobile : "91" + mobile;

  const existingMobile = await Lead.findOne({ mobile });

  // ✅ Already registered
  if (existingMobile) {
    return {
      success: true,
      alreadyRegistered: true,
      message: "You are already registered",
    };
  }

  const otp = randomInt(100000, 999999).toString();

  // store name also
  leadStore.set(mobile, {
    otp,
    name,
    expiresAt: Date.now() + 10 * 60 * 1000,
  });

  const payload = {
    "auth-key": process.env.WA_AUTH_KEY,
    "app-key": process.env.WA_APP_KEY,
    destination_number: mobile,
    template_id: process.env.WA_TEMPLATE_ID,
    device_id: process.env.WA_DEVICE_ID,
    language: "en",
    variables: [otp, "7044076603"],
  };

  try {
    await axios.post("https://web.wabridge.com/api/createmessage", payload);

    return {
      success: true,
      otpSent: true,
      message: "OTP sent successfully",
    };
  } catch {
    return { success: false, message: "Failed to send OTP" };
  }
}

export async function verifyLeadOtp(prevData: unknown, formData: FormData) {
  await connectDb();

  let mobile = (formData.get("mobile") as string)?.trim();
  const otp = (formData.get("otp") as string)?.trim();

  if (!mobile || !otp) {
    return { success: false, message: "Mobile & OTP required" };
  }

  mobile = mobile.startsWith("91") ? mobile : "91" + mobile;

  const stored = leadStore.get(mobile);

  if (!stored || stored.otp !== otp || stored.expiresAt < Date.now()) {
    return { success: false, message: "Invalid or expired OTP" };
  }

  leadStore.delete(mobile);

  const newLead = new Lead({
    leadId: await generateCustomId(Lead, "leadId", "LD-"),
    name: stored.name,
    mobile,
  });

  await newLead.save();

  return {
    success: true,
    message: "Registration successful",
  };
}

export async function getLeadEnrollments(mobile: string) {
  await connectDb();

  mobile = mobile.startsWith("91") ? mobile : "91" + mobile;

  const lead = await Lead.findOne({ mobile })
    .populate("enrollments.course")
    .lean();

  if (!lead) {
    return { success: false, enrollments: [] };
  }

  return {
    success: true,
    enrollments: JSON.parse(JSON.stringify(lead.enrollments)) || [],
  };
}

export async function enrollCourse(prev: unknown, formData: FormData) {
  await connectDb();

  let mobile = formData.get("mobile") as string;
  const courseId = formData.get("courseId") as string;
  const location = formData.get("location") as string;
  const remark = formData.get("remark") as string;
  const email = formData.get("email") as string;

  mobile = mobile.startsWith("91") ? mobile : "91" + mobile;

  const lead = await Lead.findOne({ mobile });

  if (!lead) {
    return { success: false, message: "Lead not found" };
  }

  const course = await Course.findOne({ courseId });

  if (!course) {
    return { success: false, message: "Course not found" };
  }

  // check duplicate enrollment
  const already = lead.enrollments.some(
    (e) => e.course?.toString() === course._id.toString(),
  );

  if (already) {
    return { success: false, message: "Already enrolled in this course" };
  }

 lead.enrollments.push({   
   location,
   remark,
   status: "Pending",
 });

  lead.email = email;

  // add to course
  course.students.push(lead._id);

  await lead.save();
  // await course.save();

  return {
    success: true,
    message: "Course selected. Proceed to payment.",
    courseId,
    location,
    remark,
    email,
  };
}

export async function createPaymentOrder(prev: unknown, formData: FormData) {
  try {
    const amount = Number(formData.get("amount"));

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_SECRET_ID!,
      key_secret: process.env.RAZORPAY_SECRET_KEY!,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return {
      success: true,
      order,
      key: process.env.RAZORPAY_SECRET_ID!,
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: "Failed to create payment order",
    };
  }
}

export async function verifyRazorpaySignature(
  prev: unknown,
  formData: FormData,
) {
  try {
    const razorpay_order_id = formData.get("razorpay_order_id") as string;
    const razorpay_payment_id = formData.get("razorpay_payment_id") as string;
    const razorpay_signature = formData.get("razorpay_signature") as string;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return {
        success: false,
        message: "Invalid payment signature",
      };
    }

    return {
      success: true,
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: "Payment verification failed",
    };
  }
}

export async function completeEnrollment(prev: unknown, formData: FormData) {
  try {
    await connectDb();

    let mobile = formData.get("mobile") as string;
    const courseId = formData.get("courseId") as string;
    const location = formData.get("location") as string;
    const remark = formData.get("remark") as string;
    const razorpayOrderId = formData.get("razorpay_order_id") as string;
    const razorpayPaymentId = formData.get("razorpay_payment_id") as string;
    const razorpaySignature = formData.get("razorpay_signature") as string;
    const amount = Number(formData.get("amount"));

    mobile = mobile.startsWith("91") ? mobile : "91" + mobile;

    const lead = await Lead.findOne({ mobile });
    const course = await Course.findOne({ courseId });

    if (!lead || !course) {
      return {
        success: false,
        message: "Lead or Course not found",
      };
    }

  const already = lead.enrollments.some(
    (e) =>
      e.course &&
      e.course.toString() === course._id.toString() &&
      e.status === "Enrolled",
  );

    if (already) {
      return {
        success: false,
        message: "Already enrolled",
      };
    }

    lead.payments.push({
      course: course._id,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      amount,
      currency: "INR",
      paidAt: new Date(),
    });

    // create enrollment
    lead.enrollments.push({
      course: course._id,
      location,
      remark,
      enrolledAt: new Date(),
      status: "Enrolled",
    });    

    course.students.push(lead._id);

    let sessionTime = "";
    let meetingLink = course.meetLink || "";

    if (course.googleEventId) {
      try {
        const auth = getAuthClient();
        const event = await calendar.events.get({
          calendarId: "primary",
          eventId: course.googleEventId,
          auth,
        });

        const currentAttendees = event.data.attendees || [];

        const newAttendee = {
          email: lead.email,
          displayName: lead.name,
          responseStatus: "accepted",
        };

        await calendar.events.patch({
          calendarId: "primary",
          eventId: course.googleEventId,
          requestBody: {
            attendees: [...currentAttendees, newAttendee],
          },
          auth,
          sendUpdates: "all", // Sends email invitations
        });

        const start = event.data.start?.dateTime || event.data.start?.date;
        if (start) {
          sessionTime = new Date(start).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          });
        }
        meetingLink = event.data.hangoutLink || course.meetLink || "";
      } catch (calendarErr: any) {
        console.error("Google Calendar operation failed:", calendarErr.message);
        // Fallback for session time if event is missing
        if (course.startDate) {
          sessionTime = new Date(course.startDate).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          });
        }
      }
    } else if (course.startDate) {
      sessionTime = new Date(course.startDate).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    }

    await lead.save();
    await course.save();

    // console.log("WA variables", [
    //   sessionTime,
    //   course.meetingDuration?.toString() || "",
    //   meetingLink,
    // ]);

    const payload = {
      "auth-key": process.env.WA_AUTH_KEY,
      "app-key": process.env.WA_APP_KEY,
      destination_number: mobile,
      template_id: process.env.WA_ENROLL_TEMPLATE_ID,
      device_id: process.env.WA_DEVICE_ID,
      language: "en",
      variables: [sessionTime,  course.meetingDuration?.toString() || "", meetingLink],
    };

   axios
     .post("https://web.wabridge.com/api/createmessage", payload)
     .catch((err) => console.error("Whatsapp send failed", err));

    return {
      success: true,
      message: "Enrollment successful! Check your Whatsapp for the receipt",
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: "Enrollment failed",
    };
  }
}

export async function getAllLeads(
  page: number | string = 1,
  limit: number | string = 10,
  sort: string = "createdAt",
  order: "asc" | "desc" = "desc",
  searchQuery?: string,  
) {
  try {
    await connectDb();

   const filter =
     searchQuery && searchQuery.trim() !== ""
       ? {
           $or: [
             { name: { $regex: searchQuery, $options: "i" } },
             { mobile: { $regex: searchQuery, $options: "i" } },
             { leadId: { $regex: searchQuery, $options: "i" } },
           ],
         }
       : {};       

    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);

    const skip = (pageNumber - 1) * pageSize;

    const sortOrder = order === "asc" ? 1 : -1;

    const sortQuery: Record<string, 1 | -1> = {
      [sort]: sortOrder,
    };

    let query = Lead.find(filter)
      .populate({
        path: "enrollments.course",
        select: "courseName courseId",
      })
      .sort(sortQuery);

    if (pageSize > 0) {
      query = query.skip(skip).limit(pageSize);
    }

    const [leads, totalCount] = await Promise.all([
      query.lean(),
      Lead.countDocuments(filter),
    ]);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(leads)),
      pagination: {
        totalCount,
        currentPage: pageNumber,
        limit: pageSize,
        totalPages: pageSize > 0 ? Math.ceil(totalCount / pageSize) : 1,
      },
    };
  } catch (error) {
    console.error("getAllLeads error:", error);

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
