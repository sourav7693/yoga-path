"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

export interface StoryItem {
  name: string;
  role: string;
  message: string;
}

export interface CustomerStoriesProps {
  heading: string;
  stories: StoryItem[];
}

const CustomerStories = ({ data }: { data: CustomerStoriesProps }) => {
  return (
    <section className="w-full py-8 lg:py-16 px-4 bg-white">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-4 lg:gap-10">

        <h2 className="text-center text-2xl md:text-3xl font-semibold text-purple-600">
          {data.heading}
        </h2>

        <div className="w-full">
          <Swiper
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="!h-auto"
          >
            {data.stories.map((item, i) => {
              const initial = item.name?.charAt(0).toUpperCase(); 

              return (
                <SwiperSlide key={i} className="!h-auto">
                  <div className="bg-gray-100 rounded-2xl p-6 h-full flex flex-col gap-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-green-800 text-white flex items-center justify-center font-semibold">
                        {initial}
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm text-defined-black">
                          {item.name}
                        </h4>
                        <p className="text-xs text-defined-brown">
                          {item.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-defined-brown leading-relaxed">
                      “{item.message}”
                    </p>

                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

      </div>
    </section>
  );
};

export default CustomerStories;