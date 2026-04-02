import Subbanner from "@/components/global/Subbanner";
import MainTemplates from "@/templates/MainTemplates";
import { getAllCourses } from "@/actions/course";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

interface PageProps {
  searchParams: {
    page?: string;
  };
}

export const metadata: Metadata = {
  title:
    "",
    description:
    "",
};

const Page = async ({ searchParams }: PageProps) => {
  const currentPage = Number(searchParams?.page || 1);

  const res = await getAllCourses(currentPage, 20);
  const courses = res.data;
  const pagination = res.pagination;

  return (
    <MainTemplates>
      <Subbanner heading="Courses" />

      <div className="max-w-[1320px] mx-auto px-4 py-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course: any) => (
            <Link
              href={`/courses/${course.courseSlug}`}
              key={course.courseId}
              className="group relative h-80 w-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              
              <Image
                src={course.thumbnail?.secure_url || "/fallback.jpg"}
                alt={course.courseName}
                fill
                className="object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white text-lg font-semibold leading-snug">
                  {course.courseName}
                </h3>

                <p className="text-white/80 text-sm mt-1 line-clamp-2">
                  {course.category}
                </p>
              </div>

              <div className="absolute top-4 right-4 bg-white/90 text-black text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition">
                View Details →
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
          {Array.from({ length: pagination.totalPages }).map((_, i) => {
            const page = i + 1;

            return (
              <Link
                key={page}
                href={`?page=${page}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition
                  ${
                    page === pagination.currentPage
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }
                `}
              >
                {page}
              </Link>
            );
          })}
        </div>

      </div>
    </MainTemplates>
  );
};

export default Page;