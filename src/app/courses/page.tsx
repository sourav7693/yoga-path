import Subbanner from "@/components/global/Subbanner";
import MainTemplates from "@/templates/MainTemplates";
import { getAllCourses } from "@/actions/course";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import FormModal from "@/components/global/FormModal";
import CoursesClient from "@/components/course/CoursesClient";

interface PageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export const metadata: Metadata = {
  title:
    "",
    description:
    "",
};

const Page = async ({ searchParams }: PageProps) => {


  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams?.page || 1);

  const res = await getAllCourses(currentPage, 20);
  const courses = res.data;
  const pagination = res.pagination;

  return (
    <MainTemplates>
      <Subbanner heading="Courses" />

      <div className="max-w-[1320px] mx-auto px-4 py-10">

    <CoursesClient courses={courses} />
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