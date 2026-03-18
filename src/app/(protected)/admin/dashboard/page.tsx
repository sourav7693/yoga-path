import CourseTable from "@/components/admin/courses/CourseTable";
import LeadTable from "@/components/admin/leads/LeadTable";
import { connectDb } from "@/lib/connection";
import { Course } from "@/models/Course";
import Lead from "@/models/Lead";
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
  return (
    <section className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 flex flex-col gap-6"
          >
            <div className="flex justify-between">
              <span className="bg-defined-red/10 rounded-xl p-2">
                {card.icon}
              </span>{" "}
              <span className="text-green-500 bg-green-500/10 p-2 rounded-xl flex gap-2 justify-center items-center">
                <FaChartLine className="inline text-sm" />
                {card.increase}
              </span>
            </div>
            <div className="flex flex-col justify-between">
              <p className="text-lg text-defined-brown font-semibold">
                {card.label}
              </p>
              <p className="text-2xl text-defined-black font-extrabold">
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-between gap-4 text-defined-black font-bold">
        <div className="bg-gray-200 gap-2 flex flex-col flex-1 rounded-xl p-4 w-full">
          <div className="flex justify-between">
            <p>Recent Courses</p>
            <Link
              href="/admin/manage-course"
              className="underline text-defined-red"
            >
              View All
            </Link>
          </div>
          <CourseTable courses={JSON.parse(JSON.stringify(recentCourses))} />
        </div>
        <div className="bg-gray-200 gap-2 flex flex-col flex-1 rounded-xl p-4 w-full">
          <div className="flex justify-between">
            <p>Recent Leads</p>
            <Link
              href="/admin/manage-leads"
              className="underline text-defined-red"
            >
              View All
            </Link>
          </div>
          <LeadTable leads = {JSON.parse(JSON.stringify(recentLeads))} />
        </div>
      </div>
    </section>
  );
}

export default page