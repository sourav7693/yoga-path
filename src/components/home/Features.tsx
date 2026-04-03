"use client";

import Image from "next/image";

type Card = {
  id: number;
  title: string;
  desc: string;
  img: string;
};

const data: Card[] = [
  {
    id: 1,
    title: "Expert Certified Yoga Trainers",
    desc: "Learn from experienced mentors ensuring safe, effective, and result-oriented yoga practice for all levels.",
    img: "/assets/new-img/Flexible Timings.jpg",
  },
  {
    id: 2,
    title: " Fully Online Global Access",
    desc: "Join from anywhere with flexible access, making it easy to stay consistent in your wellness journey.",
    img: "/assets/new-img/Mindful Practices.jpg",
  },
  {
    id: 3,
    title: "Fully Online Global Access",
    desc: "Join from anywhere with flexible access, making it easy to stay consistent in your wellness journey.",
    img: "/assets/new-img/Personal Growth.jpg",
  },
  {
    id: 4,
    title: "Flexible Timings for Everyone",
    desc: "Choose schedules that fit your routine, balancing yoga with work, studies, and daily commitments.",
    img: "/assets/new-img/Supportive Community.jpg",
  },
];

export default function Features() {
  return (
    <section className="w-full py-16 px-4 bg-white">
      <div className="max-w-[1320px] mx-auto">
        
        {/* GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 md:gap-6 gap-2">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl md:p-6 p-3 text-center 
              shadow transition-all duration-300 border border-gray-100"
            >
              
              {/* ICON */}
              <div className="flex justify-center">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>

              {/* TITLE */}
              <h3 className="mt-4 text-lg font-semibold">
                {item.title}
              </h3>

              {/* DESC */}
              <p className="mt-2 text-gray-600 text-sm">
                {item.desc}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}