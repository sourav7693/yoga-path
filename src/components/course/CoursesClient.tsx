"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FormModal from "@/components/global/FormModal";

export default function CoursesClient({ courses }: { courses: any[] }) {
  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course: any) => (
          <div
            key={course.courseId}
            className="bg-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <Link href={`/courses/${course.courseSlug}`}>
              <div className="relative h-70 w-full overflow-hidden">
                <Image
                  src={course.thumbnail?.secure_url || ""}
                  alt={course.courseName}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>
            </Link>

            <div className="p-5 flex flex-col gap-3">
              <h3 className="text-lg font-bold text-[#003D5D]">
                {course.courseName}
              </h3>

              <p className="text-[#003D5D] text-sm">
                {course.description?.length > 120
                  ? course.description.slice(0, 120) + "..."
                  : course.description}
              </p>

              <div className="flex gap-3 mt-3">
                <Link
                  href={`/courses/${course.courseSlug}`}
                  className="flex-1 text-center rounded-full py-3 text-sm font-medium
                  text-[#AD46FF] bg-white/10 backdrop-blur-md border border-white/40"
                >
                  Read More →
                </Link>

                <button
                  onClick={() => setOpenForm(true)}
                  className="flex-1 bg-gradient-to-r from-[#AD46FF] to-purple-600 text-white rounded-full py-3 text-sm font-medium"
                >
                  Start Journey →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {openForm && (
        <FormModal
          mode="modal"
          onClose={() => setOpenForm(false)}
          courses={courses}
        />
      )}
    </>
  );
}