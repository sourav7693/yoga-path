import { CourseDoc } from "@/models/Course";
import Image from "next/image";

const YogaCourses = ({ courses }: { courses: CourseDoc[] }) => {
  return (
    <section className="py-4 flex flex-col gap-6 max-w-300 mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Our Course Module
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.courseId}
            className="relative h-80 w-full rounded-2xl overflow-hidden group"
          >
            <Image
              src={course.thumbnail?.secure_url || ""}
              alt={course.courseName}
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            
            <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
              {course.courseName}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default YogaCourses;
