import { connectDb } from "@/lib/connection";
import { Course } from "@/models/Course";
import Lead from "@/models/Lead";
import { FaBookOpen, FaChartLine, FaRegMoneyBillAlt } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { MdGroups2 } from "react-icons/md";

const page = async () => {   
  await connectDb();

  const [leads, courses] = await Promise.all([Lead.countDocuments(), Course.countDocuments()]);

  const cards = [
    {
      icon: <MdGroups2 size={22} className="text-defined-red"/>,
      increase: "12",
      label: "Total Leads",
      value: leads.toString(),
    },
    {
      icon: <FaBookOpen size={22} className="text-defined-red"/>,
      increase: "0",
      label: "Total Courses",
      value: courses.toString(),
    },
    {
      icon: <FaRegMessage size={22} className="text-defined-red"/>,
      increase: "12",
      label: "WhatsApp Messages",
      value: "0",
    },
    {
      icon: <FaRegMoneyBillAlt size={22} className="text-defined-red"/>,
      increase: "14",
      label: "Revenue",
      value: "0",
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
              <p className="text-lg text-defined-brown font-semibold">{card.label}</p>
              <p className="text-2xl text-defined-black font-extrabold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center text-2xl text-defined-black font-bold">
        This Division in under Development
      </div>
    </section>
  );
}

export default page