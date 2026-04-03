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

export default function GallerySection() {
  return (
    <section className="w-full py-16 px-4 bg-white">
      <div className="max-w-[1320px] mx-auto">
        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-bold text-left">
          Our Gallery
        </h2>

        {/* DESC + BUTTON */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 max-w-xl text-center md:text-left">
            A glimpse of our vibrant yoga community, capturing moments of dedication, growth, and positivity through live sessions, achievements, and peaceful practice experiences.
          </p>

          <button
            className="inline-flex items-center gap-2 
            bg-defined-purple
            text-white px-5 py-2 rounded-full font-medium 
            hover:gap-3 transition-all duration-300 shadow-md"
          >
            Explore More <FiArrowRight />
          </button>
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {images.map((img, i) => (
            <div
              key={i}
              className="relative w-full h-[200px] rounded-xl overflow-hidden"
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
