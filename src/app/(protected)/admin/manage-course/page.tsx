import { getAllCourses } from "@/actions/course";
import CourseHeader from "@/components/admin/courses/CourseHeader";
import CourseTable from "@/components/admin/courses/CourseTable";
import Pagination from "@/components/ui/Pagination";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdOutlineGroups } from "react-icons/md";

const page = async ({
  searchParams,
}: {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
    category?: string;
    search?: string;
  }>;
}) => {
  const params = (await searchParams) ?? {};
  const pageNumber = Number(params?.page) || 1;
   const category = params?.category || "";
   const searchQuery = params?.search || "";
  const limit = Number(params?.limit) || 10;
  const coursesResult = await getAllCourses(
    pageNumber,
    limit,
    "createdAt",
    "desc",
    category,
    searchQuery,
  );
  const courses = coursesResult.data;
  const pagination = coursesResult.pagination;

  const cards = [
    {
      icon: <MdOutlineGroups size={25} className="text-defined-red" />,
      label: "Total Students",
      value: "1000",
    },
    {
      icon: <FaIndianRupeeSign size={25} className="text-defined-red" />,
      label: "Expected Revenue",
      value: "7.2L",
    },
    {
      icon: <BsGraphUpArrow size={25} className="text-defined-red" />,
      label: "Avg. Enrollment",
      value: "84%",
    },
  ];

  return (
    <section className="flex flex-col gap-6">
      <CourseHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-2xl shadow-xl flex  gap-2"
          >
            <div className="flex items-center gap-2 size-15 bg-defined-red/10 rounded-full p-1 justify-center">
              {card.icon}
            </div>
            <div className="flex flex-col items-start justify-center">
              <p className="text-defined-brown text-sm font-semibold">
                {card.label}
              </p>
              <p className="text-defined-black text-2xl font-extrabold">
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <CourseTable courses={courses} />
      <Pagination pagination={pagination} mode={true} />
    </section>
  );
};

export default page;
