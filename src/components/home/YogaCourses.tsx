"use client";
import { useState } from "react";
import { CourseDoc } from "@/models/Course";
import Image from "next/image";
import Link from "next/link";
import FormModal from "../global/FormModal";

const YogaCourses = ({ courses }: { courses: CourseDoc[] }) => {
  const [openForm, setOpenForm] = useState(false);
  return (
    <section className="py-6 flex flex-col gap-6 max-w-[1320px] mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-defined-purole">
        Online <span className="text-defined-green">Yoga Courses</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.courseId}
            className="bg-gray-100 rounded-2xl overflow-hidden  hover:shadow-lg transition-all duration-300"
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

              <p className="text-[#003D5D] text-sm leading-relaxed">
                {course.description && course.description?.length > 120
                  ? course.description.slice(0, 120) + "..."
                  : course.description}
              </p>

              <div className="flex gap-3 mt-3">
                <div className="flex-1 p-[1px] rounded-full bg-gradient-to-r from-white via-transparent to-white">
                  <Link
                    href={`/courses/${course.courseSlug}`}
                    className="block w-full text-center rounded-full py-3 text-sm font-medium
                      text-[#AD46FF] bg-white/10 backdrop-blur-md hover:bg-white/20 transition border border-white/40"
                  >
                    Read More →
                  </Link>
                </div>

                <button
                  onClick={() => setOpenForm(true)}
                  className="flex-1 bg-gradient-to-r from-[#AD46FF] to-purple-600 text-white rounded-full py-3 text-sm font-medium shadow-md hover:opacity-90 transition"
                >
                  Book Classes →
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
    </section>
  );
};

export default YogaCourses;
