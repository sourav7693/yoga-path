import { getAllLeads } from "@/actions/leads";
import LeadTable from "@/components/admin/leads/LeadTable";
import Pagination from "@/components/ui/Pagination";
import { Enrollment, LeadDocument } from "@/models/Lead";
import Link from "next/link";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdNotificationsActive, MdOutlineAccessTime } from "react-icons/md";

const page = async ({
  searchParams,
}: {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
    category?: string;
    search?: string;
    status?: string;
  }>;
}) => {
  const params = (await searchParams) ?? {};
  const pageNumber = Number(params?.page) || 1;
  const searchQuery = params?.search || "";
  const limit = Number(params?.limit) || 10;
  const statusFilter = params?.status || "";

  const leadsResult = await getAllLeads(
    pageNumber,
    limit,
    "createdAt",
    "desc",
    searchQuery,
    statusFilter,
  );

  const leads = leadsResult.data;
  const pagination = leadsResult.pagination;
  const now = new Date();
  const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  // Total Leads
  const totalLeads = pagination.totalCount;

  // New Leads (last 24h)
  const newLeads = leads.filter((lead: LeadDocument) =>
    lead.enrollments.some(
      (e: Enrollment) => e.enrolledAt && new Date(e.enrolledAt) >= last24h,
    ),
  ).length;

  // Enrolled Leads
  const enrolledLeads = leads.filter((lead: LeadDocument) =>
    lead.enrollments.some((e: Enrollment) => e.status === "Enrolled"),
  ).length;

  // Pending Leads
  const pendingLeads = leads.filter((lead: LeadDocument) =>
    lead.enrollments.some((e: Enrollment) => e.status === "Pending"),
  ).length;

  const createQuery = (newStatus: string) => {
    const query = new URLSearchParams({
      page: String(pageNumber),
      limit: String(limit),
      search: searchQuery,
      status: newStatus,
    });

    return `?${query.toString()}`;
  };

  const cards = [
    {
      icon: <BsGraphUpArrow size={20} className="text-defined-red" />,
      label: "Total Leads",
      value: totalLeads.toString(),
      value2: "All Time",
    },
    {
      icon: <MdNotificationsActive size={20} className="text-defined-red" />,
      label: "New Leads",
      value: newLeads.toString(),
      value2: "Recently Added",
    },
    {
      icon: <IoCheckmarkDoneCircle size={20} className="text-defined-red" />,
      label: "Total Enrolled",
      value: enrolledLeads.toString(),
      value2: "Converted",
    },
    {
      icon: <MdOutlineAccessTime size={20} className="text-defined-red" />,
      label: "Pending Leads",
      value: pendingLeads.toString(),
      value2: "Need Action",
    },
  ];
  return (
    <section className="flex flex-col gap-6">
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-defined-black">
            Lead Management
          </h1>

          {/* <div className="flex gap-2 bg-white p-1 rounded-full shadow-md">
            {["", "Pending", "Enrolled", "Lost"].map((status) => {
              const isActive = statusFilter === status;

              return (
                <Link
                  key={status}
                  href={createQuery(status)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition
            ${
              isActive
                ? "bg-defined-red text-white"
                : "text-defined-black hover:bg-gray-100"
            }`}
                >
                  {status || "All"}
                </Link>
              );
            })}
          </div> */}
        </div>
        <p className="text-defined-brown">
          Manage and track potential leads for your yoga leads.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-2xl shadow-xl flex flex-col  gap-2"
          >
            <h2 className="text-defined-brown text-xl">{card.label}</h2>
            <p className="text-defined-black font-extrabold text-2xl">
              {card.value}
            </p>
            <div className="text-defined-red flex gap-2 text-sm">
              {card.icon} {card.value2}
            </div>
            <div></div>
          </div>
        ))}
      </div>

      <LeadTable leads={leads} />
      <Pagination pagination={pagination} />
    </section>
  );
};

export default page