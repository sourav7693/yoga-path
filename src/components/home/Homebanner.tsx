"use client";

import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import InfoCard from "./InfoCard";
import { useState } from "react";
import FormModal from "../global/FormModal";
import Link from "next/link";
import { CourseDoc } from "@/models/Course";

export default function HomeBanner({courses} : {courses : CourseDoc[]}) {
  const [openForm, setOpenForm] = useState(false);
  return (
    <section className="relative w-full min-h-screen md:mt-[-80px] mt-[-40px]  md:py-10 py-2 md:pt-10 pt-18">
      <Image
        src="/assets/global/homebanerbg.avif"
        alt="Banner"
        fill
        priority
        className="object-container"
      />

      <div className="relative w-full max-w-[1300px] mx-auto px-4 md:py-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 md:pt-35">
          <div className="text-white flex flex-col justify-center">
            <button className="self-start mb-6 px-6 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/90 text-sm text-defined-red">
              • Join the most trusted
            </button>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5 text-defined-blue">
              Siliguri Based Professional <br></br>{" "}
              <span className="text-defined-red">Yoga Training</span> Program
            </h1>

            <p className="max-w-[600px] text-defined-blue mb-8">
              Discover holistic wellness with our Siliguri-based yoga classes
              designed for all levels. Learn traditional techniques, improve
              flexibility, reduce stress, and build inner strength under expert
              guidance in a peaceful and supportive environment.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setOpenForm(true)}
                className="group flex items-center gap-3 bg-defined-red hover:bg-red-700 transition px-6 py-3 rounded-full"
              >
                Get Started
                <FaArrowRight className="group-hover:translate-x-1 transition" />
              </button>

              <Link
                href="#about"
                className="group flex items-center gap-3 bg-white/5 backdrop-blur-md border border-gray-100 hover:bg-white/30 transition px-6 py-3 rounded-full text-defined-blue"
              >
                Learn More
                <FaArrowRight className="group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-end w-full">
            <FormModal mode="inline" courses={courses} />
          </div>
        </div>
      </div>

      <div className=" relative z-20">
        <InfoCard />
      </div>

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
