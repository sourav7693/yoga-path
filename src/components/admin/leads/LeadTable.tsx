"use client";

import { LeadDocument } from "@/models/Lead";

export default function LeadTable({ leads }: { leads: LeadDocument[] }) {
  return (
    <div className="bg-[#F8FAFC] rounded-xl shadow h-[calc(100vh-400px)] overflow-y-scroll no-scrollbar">
      <table className="w-full">
        <thead className="h-16 bg-gray-200">
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Courses</th>
            <th>Enrollment Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.leadId}
              className="border-b border-gray-200 text-center last:border-none bg-gray-100"
            >
              <td className="p-3 font-semibold">{lead.leadId}</td>

              <td>{lead.name}</td>

              <td>{lead.mobile}</td>

              <td className="py-2">
                {lead.enrollments?.length > 0 ? (
                  lead.enrollments.map((enroll: any, index) => (
                    <div key={enroll.course?.courseId}>
                     {index +1}. {enroll.course?.courseName}
                    </div>
                  ))
                ) : (
                  <span className="text-gray-400 text-center">No course</span>
                )}
              </td>

              <td>
                {lead.enrollments?.length > 0
                  ? new Date(
                      lead.enrollments[0].enrolledAt,
                    ).toLocaleDateString()
                  : "-"}
              </td>

              <td>
                <span
                  className={`px-2 py-1 rounded-full text-sm font-semibold ${
                    lead.status === "Enrolled"
                      ? "bg-green-100 text-green-700"
                      : lead.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {lead.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
