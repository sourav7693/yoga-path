"use client";

import { LeadDocument } from "@/models/Lead";

export default function LeadTable({ leads }: { leads: LeadDocument[] }) {
  const rows = leads.flatMap((lead: LeadDocument) => {
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
    <div className="bg-[#F8FAFC] rounded-xl shadow h-[calc(100vh-400px)] overflow-y-scroll no-scrollbar">
      <table className="w-full">
        <thead className="h-16 bg-gray-200">
          <tr>
            <th>Lead ID</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Courses</th>
            <th>Enrollment Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {rows.map(({ lead, enroll }) => (
            <tr
              key={`${lead.leadId}-${enroll?.course?.courseId || "no-course"}`}
              className="border-b border-gray-200 text-center bg-gray-100"
            >
              <td className="p-3 font-semibold">{lead.leadId}</td>
              <td>{lead.name}</td>
              <td>{lead.mobile}</td>
              <td>{lead.email || "-"}</td>

              <td>{enroll?.course?.courseName || "No course"}</td>

              <td>
                {enroll?.enrolledAt
                  ? new Date(enroll.enrolledAt).toLocaleDateString()
                  : "-"}
              </td>

              <td>
                <span
                  className={`px-2 py-1 rounded-full text-sm font-semibold ${
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
  );
}
