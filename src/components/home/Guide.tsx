"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

type Guide = {
  id: number;
  name: string;
  desc: string;
  image: string;
  bg: string;
  descColor: string;
};
const guides: Guide[] = [
  {
    id: 1,
   name: "Payel Sarakar",
    desc: "Payel Sarkar is a dedicated academic yoga teacher, combining traditional knowledge with modern techniques, guiding students worldwide towards holistic wellness and mindful living.",
    image: "/assets/new-img/about1.jpg",
    bg: "bg-[#AD46FF1A]",
    descColor: "text-defined-purple",
  },

  {
    id: 2,
    name: "Payel Sarakar",
    desc: "Payel Sarkar is a dedicated academic yoga teacher, combining traditional knowledge with modern techniques, guiding students worldwide towards holistic wellness and mindful living.",
    image: "/assets/new-img/about1.jpg",
    bg: "bg-[#16A34A1A]",
    descColor: "text-defined-green",
  },
  {
    id: 3,
    name: "Payel Sarakar",
    desc: "Payel Sarkar is a dedicated academic yoga teacher, combining traditional knowledge with modern techniques, guiding students worldwide towards holistic wellness and mindful living.",
    image: "/assets/new-img/about1.jpg",
    bg: "bg-[#F6AE3B1A]",
    descColor: "text-[#734F00]",
  },
  {
    id: 4,
    name: "Payel Sarakar",
    desc: "Payel Sarkar is a dedicated academic yoga teacher, combining traditional knowledge with modern techniques, guiding students worldwide towards holistic wellness and mindful living.",
    image: "/assets/new-img/about1.jpg",
    bg: "bg-blue-50",
    descColor: "text-green-700",
  },
];
export default function Guide() {
  const isSlider = guides.length > 3;

  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-[1320px] mx-auto text-center">
      
        <h2 className="text-2xl md:text-2xl font-bold">
          Meet Our{" "}
          <span className="text-[#AD46FF] text-3xl md:text-3xl">
            Expert Yoga Mentor and Guide
          </span>
        </h2>

       
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          With years of teaching experience, she empowers learners through
          structured guidance, helping them achieve physical balance, mental
          clarity, and spiritual growth in daily life.
        </p>

       
        <div className="mt-12">
          {isSlider ? (
           
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              autoplay={{ delay: 2500 }}
              loop={true}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {guides.map((item) => (
                <SwiperSlide key={item.id}>
                  <GuideCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
           
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((item) => (
                <GuideCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
function GuideCard({ item }: { item: Guide }) {
  return (
    <div
      className={`${item.bg} rounded-xl  md:px-12 md:py-12 py-6 px-6 text-center hover:shadow-md transition-all duration-300`}
    >
     
      <div className="flex justify-center">
        <div className="w-28 h-28 rounded-full overflow-hidden ">
          <Image
            src={item.image}
            alt={item.name}
            width={120}
            height={120}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

     
      <h3 className="mt-6 text-lg font-semibold text-gray-800">{item.name}</h3>

      <p className={`mt-2 text-sm text-justify ${item.descColor}`}>{item.desc}</p>

      
      <Link href={"/contact"}
        className="mt-6 inline-flex items-center gap-2 
bg-[linear-gradient(90deg,#AD46FF_0%,#16A34A_100%)] 
text-white font-medium px-5 py-2 rounded-full 
hover:opacity-90 hover:gap-3 
transition-all duration-300 shadow-md"
      >
        Contact Us →
      </Link>
    </div>
  );
}
