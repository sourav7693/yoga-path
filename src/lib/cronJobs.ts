import cron from "node-cron";
import { connectDb } from "@/lib/connection";
import { Course } from "@/models/Course";
import Lead from "@/models/Lead";
import axios from "axios";

export function startCronJobs() {
  cron.schedule("30 3 * * *", async () => {
    console.log("Running session reminder cron...");
    try {
      await connectDb();

      const now = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000;
      const todayIST = new Date(now.getTime() + istOffset);

      const startOfDay = new Date(
        Date.UTC(
          todayIST.getUTCFullYear(),
          todayIST.getUTCMonth(),
          todayIST.getUTCDate(),
          0, 0, 0, 0
        ) - istOffset
      );
      const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

      const courses = await Course.find({
        startDate: { $gte: startOfDay, $lt: endOfDay },
      }).populate("students");

      if (!courses.length) {
        console.log("No courses starting today");
        return;
      }

      let sent = 0;

      for (const course of courses) {
        const sessionTime = new Date(course.startDate).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
          timeZone: "Asia/Kolkata",
        });

        const duration = course.meetingDuration?.toString() || "";
        const meetingLink = course.meetLink || "";

        for (const student of course.students as any[]) {
          if (!student.mobile) continue;

          const payload = {
            "auth-key": process.env.WA_AUTH_KEY,
            "app-key": process.env.WA_APP_KEY,
            destination_number: student.mobile,
            template_id: "980393444498927",
            device_id: process.env.WA_DEVICE_ID,
            language: "en",
            variables: [sessionTime, duration, meetingLink],
          };

          try {
            await axios.post("https://web.wabridge.com/api/createmessage", payload);
            sent++;
          } catch (err: any) {
            console.error(`WA failed for ${student.mobile}:`, err?.response?.data || err.message);
          }
        }
      }

      console.log(`Session reminders sent: ${sent}`);
    } catch (err) {
      console.error("Cron job error:", err);
    }
  }, {
    timezone: "Asia/Kolkata" 
  });

  console.log("Cron jobs registered ✅");
}