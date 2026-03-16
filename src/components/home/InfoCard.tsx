"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

interface InfoItem {
  id: number;
  title: string;
  subtitle: string;
}

const infoData: InfoItem[] = [
  { id: 1, title: "500+", subtitle: "Classes Completed" },
  { id: 2, title: "20+", subtitle: "Individuals Batch" },
  { id: 3, title: "10+", subtitle: "Expert Member" },
  { id: 4, title: "30+", subtitle: "Professional Course" },
  { id: 5, title: "98%", subtitle: "Satisfiction" },
];

interface CardContentProps {
  item: InfoItem;
}

const CardContent: React.FC<CardContentProps> = ({ item }) => (
  <div
    className="border border-gray-100 
    rounded-xl py-8 
    flex flex-col items-center justify-center text-center 
    backdrop-blur-lg"
  >
    <h3 className="text-3xl md:text-4xl font-bold text-defined-red mb-2">
      {item.title}
    </h3>

    <p className="text-sm md:text-base text-defined-blue">
      {item.subtitle}
    </p>
  </div>
);

const InfoCard: React.FC = () => {
  return (
    <section className="px-4 pt-4 pb-4 md:py-20">
      <div className="max-w-[1300px] mx-auto">

        {/* 🔹 Desktop Grid (UNCHANGED) */}
        <div className="hidden md:grid grid-cols-2 md:grid-cols-5 gap-6">
          {infoData.map((item) => (
            <CardContent key={item.id} item={item} />
          ))}
        </div>

        {/* 🔹 Mobile Swiper */}
        <div className="md:hidden">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={15}
            slidesPerView={2}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
          >
            {infoData.map((item) => (
              <SwiperSlide key={item.id}>
                <CardContent item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
};

export default InfoCard;