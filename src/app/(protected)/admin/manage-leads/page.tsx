import { getAllLeads } from "@/actions/leads";
import LeadTable from "@/components/admin/leads/LeadTable";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdNotificationsActive, MdOutlineAccessTime } from "react-icons/md";

const page = async () => {
  const leads = (await getAllLeads()).data;
    const cards = [
      {
          icon: <BsGraphUpArrow size={20} className="text-defined-red" />,
          label: "Total Leads",
          value: "1284",
          value2: "12% Increase",
        },
        {
          icon: <MdNotificationsActive size={20} className="text-defined-red" />,
          label: "New Leads",
          value: "45",
          value2: "Last 24h",
        },
        {
            icon: <IoCheckmarkDoneCircle size={20} className="text-defined-red" />,
        label: "Conversion Rate",
        value: "8.4%",
        value2: "Target 20%",
    },
    {
          icon: <MdOutlineAccessTime size={20} className="text-defined-red" />,
        label: "Pending Contact",
        value: "12",
        value2: "Priority Items",
      },
    ];
  return (
    <section className="flex flex-col gap-6">
      <div>
        <div className="flex justify-between">
          <h1 className="text-3xl font-extrabold text-defined-black">
            Student Management
          </h1>
        </div>
        <p className="text-defined-brown">
          Manage and track potential students for your yoga courses.
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
    </section>
  );
}

export default page