"use client";

import { useState } from "react";
import InfoCard from "./InfoCard";
import FormModal from "../global/FormModal";
import { CourseDoc } from "@/models/Course";

export default function HomeBanner({ courses }: { courses: CourseDoc[] }) {
  const [openForm, setOpenForm] = useState(false);

  return (
    <section className="relative w-full md:mt-[-80px] mt-[-40px] md:py-4 md:pt-10 pt-18 overflow-hidden">

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/assets/new-img/theyogapath-herovideo.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay (optional but recommended) */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1300px] mx-auto px-4 md:py-10 py-8">
        
        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center md:pt-35">
          
          {/* LEFT SIDE (Empty / or future content) */}
          <div></div>

          {/* RIGHT SIDE FORM */}
          <div className="flex justify-center md:justify-end w-full">
            <div className="w-full max-w-[400px]">
              <FormModal mode="inline" courses={courses} />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Info Card */}
      {/* <div className="relative z-20">
        <InfoCard />
      </div> */}

      {/* Modal */}
      {openForm && (
        <FormModal
          mode="modal"
          onClose={() => setOpenForm(false)}
          courses={courses}
        />
      )}
    </section>
  );
}