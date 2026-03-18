"use client";

import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { SwiperOptions } from "swiper/types";
import "swiper/css";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";

interface TestimonialItem {
  name: string;
  text: string;
}
const testimonials: TestimonialItem[] = [
  {
    name: "Arpita Roy",
    text: "The online yoga classes are very well guided and easy to follow. I feel more energetic and relaxed after every session."
  },
  {
    name: "Sayan Dutta",
    text: "Joining through WhatsApp and Google Meet is very simple. The sessions are professional and beginner-friendly."
  },
  {
    name: "Soumita Sen",
    text: "Affordable pricing and excellent teaching quality. I have noticed great improvement in my flexibility and focus."
  },
  {
    name: "Rahul Chakraborty",
    text: "Practicing yoga from home has become so convenient. The instructor explains every step clearly."
  },
  {
    name: "Madhumita Ghosh",
    text: "The live sessions are interactive and motivating. I truly enjoy being part of The Yoga Path."
  },
  {
    name: "Amitava Mukherjee",
    text: "Very supportive instructor and well-structured classes. It feels like personal attention even in online mode."
  },
  {
    name: "Pooja Pal",
    text: "Regular practice has reduced my stress levels. Highly recommended for anyone looking for online yoga classes."
  }
];

const swiperConfig: SwiperOptions = {
  autoplay: { delay: 3000, disableOnInteraction: false },
  loop: true,
  spaceBetween: 10,
  slidesPerView: 4,
  breakpoints: {
    320: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 4 },
    1280: { slidesPerView: 4 }, // fixed typo
  },
};

const Testimonial: FC = () => {
  return (
    <section className="py-10 px-4 text-center bg-white">
      <div className="max-w-[1300px] mx-auto w-full">
        <p className="text-base md:text-[22px] text-[#0F222D] mb-2">
          Testimonial
        </p>

        <h2 className="text-3xl md:text-[24px] font-bold text-[#004A7E] mb-10">
          Transform Your Mind and Body with Our Online Yoga Community
        </h2>

        <Swiper className="md:px-20" modules={[Autoplay]} {...swiperConfig}>
          {testimonials.map((t: TestimonialItem, index: number) => (
            <SwiperSlide key={index}>
              <div className="group bg-gradient-to-b from-[#0052bd1a] to-[#0052bd05] rounded-xl p-6 h-[295px] flex flex-col justify-center items-center text-center transition-all duration-300 hover:bg-defined-red hover:text-white">
                <div className="mb-4 p-2 bg-white rounded-lg transition-all duration-300 group-hover:bg-white">
                  <FaRegUserCircle className="text-defined-red" size={40}/>
                </div>

                <h3 className="text-lg md:text-xl font-semibold mb-2 text-[#222] transition-colors duration-300 group-hover:text-white">
                  {t.name}
                </h3>

                <p className="text-sm md:text-base text-[#555] leading-relaxed transition-colors duration-300 group-hover:text-white">
                  {t.text}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;