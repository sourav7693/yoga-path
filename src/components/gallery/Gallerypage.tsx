"use client";

import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const images = [

  "/assets/new-img/offering.png",
  "/assets/new-img/offering.png",
  "/assets/new-img/offering.png",
  "/assets/new-img/offering.png",
  "/assets/new-img/offering.png",
  "/assets/new-img/offering.png",
  "/assets/new-img/offering.png",
  "/assets/new-img/offering.png",
];

export default function Gallerypage() {
  return (
    <section className="w-full py-16 px-4 bg-white">
      <div className="max-w-[1320px] mx-auto">
       

        {/* DESKTOP GRID */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {images.map((img, i) => (
            <div
              key={i}
              className="relative w-full h-[250px] rounded-xl overflow-hidden"
            >
              <Image
                src={img}
                alt="Gallery"
                fill
                className="object-cover hover:scale-110 transition duration-500"
              />
            </div>
          ))}
        </div>

        {/* MOBILE SWIPER */}
        <div className="md:hidden mt-10">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            autoplay={{ delay: 2500 }}
            loop={true}
          >
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <div className="relative w-full h-[220px] rounded-xl overflow-hidden">
                  <Image
                    src={img}
                    alt="Gallery"
                    fill
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
