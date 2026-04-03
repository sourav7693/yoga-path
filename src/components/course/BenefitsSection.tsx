import React from "react";

export interface BenefitItem {
  icon: React.ReactNode;
  title: string;
  description: string;

}

export interface BenefitsSectionProps {
  items: BenefitItem[];
}

const BenefitsSection = ({ benefitsData }: { benefitsData: BenefitsSectionProps }) => {
  return (
    <section className="w-full py-8 lg:py-16 px-4 ">
      <div className="max-w-[1320px] mx-auto grid grid-cols-2 md:grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 lg:gap-6">

        {benefitsData.items.map((item, i) => (
          <div
            key={i}
            className={`rounded-2xl p-3 md:p-6 flex flex-col bg-linear-to-br gap-3 ${i % 2 === 0 ? "from-[#ECFDF5] to-[#D1FAE580]":"from-[#FAF5FF] to-[#F3E8FF80]"}`}
          >
            <div className="">
              {item.icon}
            </div>

            <h3 className="font-semibold text-[15px] text-defined-black">
              {item.title}
            </h3>

            <p className="text-sm text-defined-brown leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default BenefitsSection;