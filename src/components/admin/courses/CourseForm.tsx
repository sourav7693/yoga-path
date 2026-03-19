"use client";

import { createCourse, updateCourse } from "@/actions/course";
import { allowOnlyNumbers } from "@/helper/inputHandlers";
import { CourseDoc } from "@/models/Course";
import { useActionState, useEffect, useRef, useState } from "react";
import { BiCloudUpload } from "react-icons/bi";
import { toast } from "react-toastify";

export default function CourseForm({
  mode,
  course,
  closeModal,
}: {
  mode: "edit" | "view" | null;
  course?: CourseDoc | null;
  closeModal: () => void;
}) {
  const action = mode === "edit" ? updateCourse : createCourse;
  const [mrp, setMrp] = useState<number>(0);
  const [duration, setDuration] = useState<string>("1month");
  const [startDate, setStartDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endDate, setEndDate] = useState<string>("");
  const durationMap: Record<string, number> = {
    "1month": 1,
    "3months": 3,
    "6months": 6,
  };
  const [discount, setDiscount] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const calculateEndDate = (start: string, durationValue: string) => {
    if (!start) return;

    const startObj = new Date(start);
    const monthsToAdd = durationMap[durationValue];

    const end = new Date(startObj);
    end.setMonth(end.getMonth() + monthsToAdd);

    const formatted = end.toISOString().split("T")[0];
    setEndDate(formatted);
  };

  const handleFileChange = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const offerPrice = mrp - (mrp * discount) / 100;

  const [state, formAction, isPending] = useActionState(action, {
    success: false,
    message: "",
    authRequired: false,
  });

  useEffect(() => {
    if (state.success) {
      closeModal();
      toast.success(state.message);
    } else if (state.authRequired) {
      toast.info("Redirecting to Google to connect Calendar...");
      window.location.href = "/api/auth/google";
    }
  }, [state.success, state.message, state.authRequired, closeModal]);

  useEffect(() => {
    if (!course) return;

    setMrp(course.courseMRP || 0);
    setDiscount(course.discount || 0);
    setDuration(course.days || "1month");
    setStartDate(
      course.startDate
        ? new Date(course.startDate).toISOString().split("T")[0]
        : "",
    );
    setStartTime(
      course.startDate
        ? new Date(course.startDate).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "09:00",
    );
    setEndDate(
      course.endDate
        ? new Date(course.endDate).toISOString().split("T")[0]
        : "",
    );
    setPreview(course.thumbnail?.secure_url || null);
  }, [course]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-175 max-h-[90vh] overflow-y-auto p-6 no-scrollbar ">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {mode === "edit"
              ? "Edit Course"
              : mode === "view"
                ? "View Course"
                : "Add Course"}
          </h2>

          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form action={formAction} encType="multipart/form-data">
          <fieldset disabled={mode === "view"} className="flex flex-col gap-4">
            <input type="hidden" name="courseId" value={course?.courseId} />
            <div className="flex flex-col gap-2">
              <label
                htmlFor="courseName"
                className="text-defined-black font-bold"
              >
                Course Title
              </label>
              <input
                name="courseName"
                defaultValue={course?.courseName}
                placeholder="e.g. Hatha Yoga for Beginners"
                className="border p-2 rounded-2xl border-[#E2E8F0] bg-[#F8FAFC] outline-none focus:ring ring-defined-red"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="courseName"
                className="text-defined-black font-bold"
              >
                Description
              </label>
              <textarea
                name="description"
                defaultValue={course?.description}
                placeholder="Brief overview of the course curriculum..."
                className="border p-2 rounded-2xl border-[#E2E8F0] bg-[#F8FAFC] outline-none focus:ring ring-defined-red min-h-26 max-h-28"
              />
            </div>

            <div className="w-full flex justify-between items-center gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <label
                  htmlFor="courseName"
                  className="text-defined-black font-bold"
                >
                  Category
                </label>
                <select
                  name="category"
                  defaultValue={course?.category}
                  className="border p-2 rounded-2xl border-[#E2E8F0] bg-[#F8FAFC] outline-none focus:ring ring-defined-red"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="days" className="text-defined-black font-bold">
                  Days
                </label>
                <select
                  name="days"
                  value={duration}
                  onChange={(e) => {
                    const value = e.target.value;
                    setDuration(value);
                    calculateEndDate(startDate, value);
                  }}
                  className="border p-2 rounded-2xl border-[#E2E8F0] bg-[#F8FAFC] outline-none focus:ring ring-defined-red"
                >
                  <option value="1month">1 Month</option>
                  <option value="3months">3 Months</option>
                  <option value="6months">6 Months</option>
                </select>
              </div>
            </div>

            <div className="w-full flex justify-between items-center gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <label
                  htmlFor="startDate"
                  className="text-defined-black font-bold"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={startDate}
                  onChange={(e) => {
                    const value = e.target.value;
                    setStartDate(value);
                    calculateEndDate(value, duration);
                  }}
                  className="border p-2 rounded-2xl border-[#E2E8F0] bg-[#F8FAFC] outline-none focus:ring ring-defined-red"
                />
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label
                  htmlFor="startTime"
                  className="text-defined-black font-bold"
                >
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="border p-2 rounded-2xl border-[#E2E8F0] bg-[#F8FAFC] outline-none focus:ring ring-defined-red"
                />
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label
                  htmlFor="endDate"
                  className="text-defined-black font-bold"
                >
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={endDate}
                  readOnly
                  className="border p-2 rounded-2xl border-[#E2E8F0] bg-gray-100 outline-none"
                />
              </div>
            </div>

            <div className="w-full flex justify-between items-center gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-defined-black font-bold">
                  Meeting Duration
                </label>

                <select
                  name="meetingDuration"
                  className="border p-2 rounded-2xl border-[#E2E8F0] bg-[#F8FAFC] outline-none focus:ring ring-defined-red"
                >
                  <option value="30min">30 Minutes</option>
                  <option value="45min">45 Minutes</option>
                  <option value="1hour">1 Hour</option>
                  <option value="1.5hour">1.5 Hours</option>
                  <option value="2hour">2 Hours</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label className="text-defined-black font-bold">
                  Course Price (₹)
                </label>
                <input
                  type="text"
                  onKeyDown={allowOnlyNumbers}
                  name="courseMRP"
                  placeholder="Course MRP"
                  value={mrp}
                  min={0}
                  onChange={(e) => setMrp(Number(e.target.value))}
                  className="border p-2 rounded-2xl border-[#E2E8F0] bg-[#F8FAFC] outline-none focus:ring ring-defined-red"
                />
              </div>
            </div>

            <div className="w-full flex justify-between items-center gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-defined-black font-bold">
                  Discount Price (%)
                </label>
                <input
                  type="text"
                  onKeyDown={allowOnlyNumbers}
                  name="discount"
                  placeholder="Discount %"
                  value={discount}
                  min={0}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="border p-2 rounded-2xl border-[#E2E8F0] bg-[#F8FAFC] outline-none focus:ring ring-defined-red"
                />
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label className="text-defined-black font-bold">
                  Offer Price (₹)
                </label>
                <input
                  type="number"
                  name="offerPrice"
                  value={(offerPrice < 0 ? "0" : offerPrice.toFixed(0)) || ""}
                  readOnly
                  className="border p-2 rounded-2xl bg-green-50 border-green-200 outline-none"
                />
              </div>
            </div>
            {mode === "view" && (
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-defined-black font-bold">
                  Meet Link
                </label>
                <input
                  type="text"
                  name="meetLink"
                  value={course?.meetLink || ""}
                  readOnly
                  className="border p-2 rounded-2xl bg-green-50 border-green-200 outline-none"
                />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-defined-black font-bold">
                Course Thumbnail
              </label>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 h-80 cursor-pointer hover:border-defined-red transition"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <>
                    <BiCloudUpload className="text-gray-400 mb-2" size={50} />
                    <p className="text-gray-500 text-sm">
                      Click or drag and drop image
                    </p>
                    <p className="text-gray-400 text-xs">
                      RECOMMENDED: 1200 × 800 px
                    </p>
                  </>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files && handleFileChange(e.target.files[0])
                  }
                  className="hidden"
                />
              </div>
            </div>
          </fieldset>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border border-[#E2E8F0] bg-[#F8FAFC] rounded-2xl"
            >
              {mode === "view" ? "Close" : "Cancel"}
            </button>

            {mode !== "view" && (
              <button
                type="submit"
                disabled={isPending}
                className="px-4 py-2 bg-defined-red text-white rounded-2xl"
              >
                {mode === "edit"
                  ? isPending
                    ? "Updating..."
                    : "Update Course"
                  : isPending
                    ? "Saving..."
                    : "Save Course"}
              </button>
            )}
          </div>
        </form>
        {state?.message && (
          <p className="text-sm mt-3 text-red-500">{state.message}</p>
        )}
      </div>
    </div>
  );
}
