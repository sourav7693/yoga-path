"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function VideoSection() {

  const videos = [
    "9E8VxKbq9Bo",
    "9E8VxKbq9Bo",
    "9E8VxKbq9Bo",
    "9E8VxKbq9Bo",
    "9E8VxKbq9Bo",
  ];

  return (
    <section className="w-full py-20" id="sucess">
      <div className="max-w-[1300px] mx-auto px-4">

        {/* Title */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
           Our Success Stories
          </h2>
          <p className="text-gray-600 mt-3 max-w-[600px]">
            Watch real experiences from our students who achieved career success through our practical and industry-focused training programs.
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={5}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
        >
          {videos.map((id, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-xl overflow-hidden shadow-lg aspect-[9/16]">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}`}
                  title="YouTube Shorts"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}