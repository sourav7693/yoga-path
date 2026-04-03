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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 flex flex-col gap-6 rounded-2xl shadow-xl"
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

      <div className="flex items-center justify-between gap-4 text-defined-black">
        <div className="bg-white gap-2 flex flex-col flex-1 rounded-xl p-4 w-full shadow-2xl">
          <div className="flex justify-between">
            <p>Recent Courses</p>
            <Link
              href="/admin/manage-course"
              className="underline text-defined-red"
            >
              View All
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow h-[calc(100vh-400px)] overflow-y-scroll no-scrollbar">
            <table className="w-full">
              <thead className="h-16 bg-gray-200">
                <tr>
                  <th className="text-left pl-4">Course</th>
                  <th>Category</th>
                  <th>Standard Price</th>
                  <th>Offer Price</th>
                  <th>Students Enrolled</th>
                  {/* <th>Status</th>
                        <th>Duration</th>
                        <th>Actions</th> */}
                </tr>
              </thead>

              <tbody>
                {recentCourses.map((course) => (
                  <tr
                    key={course.courseId}
                    className=" border-b border-gray-200 text-center last:border-none bg-gray-100"
                  >
                    <td className="text-left line-clamp-1 py-1">
                      {course.courseName}
                    </td>

                    <td>{course.category}</td>

                    <td className="line-through text-defined-brown">
                      ₹{course.courseMRP}
                    </td>

                    <td className="text-defined-red">
                      ₹{course.offerPrice}
                    </td>

                    <td>{course.students?.length || 0}</td>
                    {/* <td>{course.status}</td>
          
                          <td>{course.days}</td> */}

                    {/* <td>
                            <span className="flex items-center justify-center gap-4">
                              <FaEye
                                onClick={() => openView(course)}
                                className="cursor-pointer text-defined-blue"
                              />
          
                              <FiEdit3
                                onClick={() => openEdit(course)}
                                className="cursor-pointer text-defined-blue"
                              />
          
                              <MdDelete
                                onClick={() => openDelete(course)}
                                className="cursor-pointer text-defined-red"
                              />
                            </span>
                          </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white gap-2 flex flex-col flex-1 rounded-xl p-4 w-full">
          <div className="flex justify-between">
            <p>Recent Leads</p>
            <Link
              href="/admin/manage-leads"
              className="underline text-defined-red"
            >
              View All
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow h-[calc(100vh-400px)] overflow-y-scroll no-scrollbar">
            <table className="w-full">
              <thead className="h-16 bg-gray-200">
                <tr>
                  {/* <th>Lead ID</th> */}
                  <th>Name</th>
                  <th>Mobile</th>
                  {/* <th>Email</th> */}
                  <th>Courses</th>
                  <th>Enrollment Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {rows.map(({ lead, enroll }, index) => (
                  <tr
                    key={enroll?._id || `${lead.leadId}-${index}`}
                    className="border-b border-gray-200 text-center bg-gray-100 text-sm"
                  >
                    {/* <td className="p-3 font-semibold">{lead.leadId}</td> */}
                    <td className="text-left py-2">{lead.name}</td>
                    <td>{lead.mobile.split("91")[1]}</td>
                    {/* <td>{lead.email || "-"}</td> */}

                    <td>{enroll?.course?.courseName || "No course"}</td>

                    <td>
                      {enroll?.enrolledAt
                        ? new Date(enroll.enrolledAt).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          enroll?.status === "Enrolled"
                            ? "bg-green-100 text-green-700"
                            : enroll?.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {enroll?.status || "Lost"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
