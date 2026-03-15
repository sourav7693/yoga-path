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
            <th>Email</th>
            <th>Courses</th>
            <th>Enrollment Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) =>
            lead.enrollments?.length > 0 ? (
              lead.enrollments.map((enroll: any) => (
                <tr
                  key={`${lead.leadId}-${enroll.course?.courseId}`}
                  className="border-b border-gray-200 text-center last:border-none bg-gray-100"
                >
                  <td className="p-3 font-semibold">{lead.leadId}</td>

                  <td>{lead.name}</td>

                  <td>{lead.mobile}</td>
                  <td>{lead.email}</td>

                  <td>{enroll.course?.courseName}</td>

                  <td>{new Date(enroll.enrolledAt).toLocaleDateString()}</td>

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
              ))
            ) : (
              <tr key={lead.leadId}>
                <td>{lead.leadId}</td>
                <td>{lead.name}</td>
                <td>{lead.mobile}</td>
                <td className="text-gray-400">No course</td>
                <td>-</td>
                <td>{lead.status}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}
