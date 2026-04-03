import React from 'react'


export interface PracticeCard {
  iconType:  React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
}
 
export interface PracticeSectionProps {
  heading: string;
  subheading: string;
  cards: PracticeCard[];
}

export interface StatItem {
  iconType: React.ReactNode;
  label: string;
  value: string;
}


const MordernSection = ({practiceSectionData,stats}:{practiceSectionData:PracticeSectionProps, stats:StatItem[]}) => {

  return (
  <section className="bg-white w-full  py-8 lg:py-16 px-4 flex flex-col gap-8 lg:gap-16">
    <div className="max-w-[1320px] mx-auto flex flex-col gap-16 ">
    
      <div className="text-center ">
        <h2 className="text-[26px] font-semibold text-defined-black">{practiceSectionData.heading}</h2>
        <p className="text-sm text-defined-brown mt-2">{practiceSectionData.subheading}</p>
      </div>
 
      <div className="grid md:grid-cols-3 gap-10">
        {practiceSectionData.cards.map((card, i) => {
          
          return (
            <div key={i} className="flex flex-col gap-3 p-4">
              <div className={`w-12 h-12 rounded-[10px] flex items-center justify-center ${card.iconBg}`}>
                <span>
                 {card.iconType} 
                </span>
              </div>
              <h3 className="font-semibold text-[15px] text-defined-black">{card.title}</h3>
              <p className="text-sm text-defined-brown leading-relaxed">{card.description}</p>
            </div>
          );
        })}
      </div>
    </div>
   <div className="max-w-[1320px] w-full mx-auto">
      <div className="bg-gray-100 w-full rounded-2xl p-5 md:p-10  grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          return (
            <div
              key={i}
              className={`flex flex-col items-center gap-1.5   `}
            >
              <span className=' text-defined-purple'>
                {stat.iconType}
              </span>
              <span className="text-[10px] tracking-widest uppercase text-defined-brown font-medium">
                {stat.label}
              </span>
              <span className="text-[16px] font-semibold text-defined-black text-center">{stat.value}</span>
            </div>
          );
        })}
      </div>
    </div>

  </section>
  )
}

export default MordernSection
