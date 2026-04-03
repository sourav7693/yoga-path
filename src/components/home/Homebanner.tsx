"use client";

import Image from "next/image";
import FormModal from "../global/FormModal";
import { CourseDoc } from "@/models/Course";

export default function HomeBanner({ courses }: { courses: CourseDoc[] }) {
  return (
    <>
      {/* =========================================
          DESKTOP & TABLET VERSION 
          (মোবাইলে হাইড থাকবে, শুধু ট্যাব ও ডেস্কটপে দেখাবে)
      ========================================= */}
      <section className="hidden md:block relative w-full mt-[-80px] bg-transparent overflow-hidden">
        {/* Full Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source
              src="/assets/new-img/theyogapath-herovideo.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Desktop Content */}
        <div className="relative z-10 w-full max-w-[1300px] mx-auto px-4 pt-40 pb-20">
          <div className="grid grid-cols-2 gap-10 items-center">
            {/* Left Side (ফাঁকা) */}
            <div></div>

            {/* Right Side Form */}
            <div className="flex justify-end w-full">
              <div className="w-full max-w-[400px]">
                <FormModal mode="inline" courses={courses} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          MOBILE VERSION 
          (শুধু মোবাইলে দেখাবে, ট্যাব ও ডেস্কটপে হাইড থাকবে)
      ========================================= */}
      <section className="block md:hidden relative w-full mt-[-40px] bg-linear-to-br from-defined-blue/20 to-defined-blue/60 overflow-hidden flex flex-col">
        {/* Mobile Top Video Banner */}
        <div className="relative w-full h-[60vh] z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source
              src="/assets/new-img/theyogapath-herovideo.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Mobile Bottom Form Area */}
        <div className="relative z-10 w-full px-4 py-10 flex justify-center">
          <Image
            src="/assets/form bg.avif"
            alt="Hero Background"
            fill
            className="object-cover"
          />        
          <div className="absolute inset-0 bg-black/30" />
          <div className="w-full max-w-[400px]">
            <FormModal mode="inline" courses={courses} />
          </div>
        </div>
      </section>
    </>
  );
}