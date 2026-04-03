"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { GalleryDocument } from "@/models/Gallery";

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

export default function GallerySection({gallery} : {gallery: GalleryDocument[]}) {
  return (
    <section className="w-full py-4 lg:py-12 px-4 bg-white">
      <div className="max-w-[1320px] mx-auto">
        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-bold text-left">
          Our Gallery
        </h2>

        {/* DESC + BUTTON */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600  text-center md:text-left">
            A glimpse of our vibrant yoga community, capturing moments of dedication, growth, and positivity through live sessions, achievements, and peaceful practice experiences.
          </p>

         
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {gallery.map((img) => (
            <div
              key={img.galleryId}
              className="relative w-full h-[200px] rounded-xl overflow-hidden"
            >
              <Image
                src={img.imageUrl}
                alt={img.title || "Gallery Image"}
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
            {gallery.map((img) => (
              <SwiperSlide key={img.galleryId}>
                <div className="relative w-full h-[220px] rounded-xl overflow-hidden">
                  <Image
                    src={img.imageUrl}
                    alt={img.title || "Gallery Image"}
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
