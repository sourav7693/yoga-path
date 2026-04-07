import { connectDb } from "@/lib/connection";
import { Course } from "@/models/Course";
import Lead, { LeadDocument } from "@/models/Lead";
import Link from "next/link";
import { FaBookOpen, FaChartLine, FaRegMoneyBillAlt } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { MdGroups2 } from "react-icons/md";

const page = async () => {
  await connectDb();

  const [leadsCount, coursesCount, revenueAgg, recentCourses, recentLeads] =
    await Promise.all([
      Lead.countDocuments(),
      Course.countDocuments(),
      Lead.aggregate([
        { $unwind: "$payments" },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$payments.amount" },
          },
        },
      ]),

      Course.find({}).sort({ createdAt: -1 }).limit(10).lean(),

      Lead.find({}).sort({ createdAt: -1 }).limit(10).lean(),
    ]);

  const totalRevenue = revenueAgg[0]?.totalRevenue || 0;

  const cards = [
    {
      icon: <MdGroups2 size={22} className="text-defined-red" />,
      increase: "12",
      label: "Total Leads",
      value: leadsCount.toString(),
    },
    {
      icon: <FaBookOpen size={22} className="text-defined-red" />,
      increase: "0",
      label: "Total Courses",
      value: coursesCount.toString(),
    },
    {
      icon: <FaRegMessage size={22} className="text-defined-red" />,
      increase: "12",
      label: "WhatsApp Messages",
      value: "0",
    },
    {
      icon: <FaRegMoneyBillAlt size={22} className="text-defined-red" />,
      increase: "14",
      label: "Revenue",
      value: `₹ ${totalRevenue.toLocaleString("en-IN")}`,
    },
  ];

  const rows = recentLeads.flatMap((lead) => {
    if (!lead.enrollments?.length) {
      return [
        {
          lead,
          enroll: null,
          date: null,
        },
      ];
    }

    return lead.enrollments.map((enroll: any) => ({
      lead,
      enroll,
      date: enroll.enrolledAt ? new Date(enroll.enrolledAt) : null,
    }));
  });

  rows.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.getTime() - a.date.getTime(); // latest first
  });

  return (
    <section className="flex flex-col gap-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-6 flex flex-col gap-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md"
          >
            <div className="flex justify-between">
              <span className="bg-defined-red/10 rounded-xl p-3 flex items-center justify-center">
                {card.icon}
              </span>
              <span className="text-green-600 bg-green-500/10 px-3 py-1 rounded-xl flex gap-2 justify-center items-center text-sm font-medium">
                <FaChartLine className="inline" />
                {card.increase}%
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-500 font-medium">{card.label}</p>
              <p className="text-2xl text-gray-800 font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tables Section - Uses flex-col on small screens, xl:flex-row for side-by-side on very large screens */}
      <div className="flex flex-col xl:flex-row gap-6 w-full">
        
        {/* Recent Courses Div Table */}
        <div className="bg-white flex flex-col xl:w-[50%] rounded-2xl p-5 w-full shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Recent Courses</h2>
            <Link
              href="/admin/manage-course"
              className="text-sm text-defined-red hover:text-red-700 font-medium"
            >
              View All &rarr;
            </Link>
          </div>
          
          <div className="rounded-xl border border-gray-200 overflow-hidden h-[calc(100vh-400px)] flex flex-col relative">
            <div className="overflow-x-auto overflow-y-auto no-scrollbar h-full">
              <div className="min-w-[600px] flex flex-col w-full">
                {/* Table Header */}
                <div className="flex w-full bg-gray-50 text-gray-500 text-[11px] uppercase font-bold tracking-wider sticky top-0 z-10 border-b border-gray-200">
                  <div className="flex-[3] p-3 pl-4 text-left">Course</div>
                  <div className="flex-1 p-3 text-left">Category</div>
                  <div className="flex-1 p-3 text-right">Standard Price</div>
                  <div className="flex-1 p-3 text-right">Offer Price</div>
                  <div className="flex-1 p-3 text-center">Enrolled</div>
                </div>

                {/* Table Body */}
                <div className="flex flex-col w-full">
                  {recentCourses.map((course) => (
                    <div
                      key={course.courseId}
                      className="flex w-full border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors items-center text-xs"
                    >
                      {/* Flex-[2] gives this column twice the width of flex-1 columns */}
                      <div className="flex-[3] p-3 pl-4 text-left  text-gray-800 pr-4">
                        <span className="line-clamp-2 leading-tight">{course.courseName}</span>
                      </div>
                      <div className="flex-1 p-3 text-left text-gray-600">
                        {course.category}
                      </div>
                      <div className="flex-1 p-3 text-right text-gray-400 line-through">
                        ₹{course.courseMRP}
                      </div>
                      <div className="flex-1 p-3 text-right text-defined-red font-medium">
                        ₹{course.offerPrice}
                      </div>
                      <div className="flex-1 p-3 text-center text-gray-600 font-medium">
                        {course.students?.length || 0}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Leads Div Table */}
        <div className="bg-white flex flex-col xl:w-[50%] rounded-2xl p-5 w-full shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Recent Leads</h2>
            <Link
              href="/admin/manage-leads"
              className="text-sm text-defined-red hover:text-red-700 font-medium"
            >
              View All &rarr;
            </Link>
          </div>
          
          <div className="rounded-xl border border-gray-200 overflow-hidden h-[calc(100vh-400px)] flex flex-col relative">
            <div className="overflow-x-auto overflow-y-auto no-scrollbar h-full">
              <div className="min-w-[700px] flex flex-col w-full">
                {/* Table Header */}
                <div className="flex w-full bg-gray-50 text-gray-500 text-[11px] uppercase font-bold tracking-wider sticky top-0 z-10 border-b border-gray-200">
                  <div className="flex-[1.5] p-3 pl-4 text-left">Name</div>
                  <div className="flex-1 p-3 text-left">Mobile</div>
                  <div className="flex-[2] p-3 text-left">Courses</div>
                  <div className="flex-1 p-3 text-center">Enroll Date</div>
                  <div className="flex-1 p-3 text-center">Status</div>
                </div>

                {/* Table Body */}
                <div className="flex flex-col w-full">
                  {rows.map(({ lead, enroll }, index) => (
                    <div
                      key={enroll?._id || `${lead.leadId}-${index}`}
                      className="flex w-full border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors items-center text-xs"
                    >
                      <div className="flex-[1.5] p-3 pl-4 text-left  text-gray-800 truncate pr-2">
                        {lead.name}
                      </div>
                      <div className="flex-1 p-3 text-left text-gray-600">
                        {lead.mobile.split("91")[1] || lead.mobile}
                      </div>
                      {/* Flex-[2] for courses as names can be long */}
                      <div className="flex-[2] p-3 text-left text-gray-600 pr-4">
                        <span className="line-clamp-2 text-xs leading-tight">
                          {enroll?.course?.courseName || "No course"}
                        </span>
                      </div>
                      <div className="flex-1 p-3 text-center text-gray-500 text-xs">
                        {enroll?.enrolledAt
                          ? new Date(enroll.enrolledAt).toLocaleDateString('en-IN', {
                              day: '2-digit', month: 'short', year: 'numeric'
                            })
                          : "-"}
                      </div>
                      <div className="flex-1 p-3 flex justify-center">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wide ${
                            enroll?.status === "Enrolled"
                              ? "bg-green-100 text-green-700 border border-green-200"
                              : enroll?.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                              : "bg-red-100 text-red-700 border border-red-200"
                          }`}
                        >
                          {enroll?.status || "Lost"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default page;