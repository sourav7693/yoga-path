"use client";

import Image from "next/image";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import FormModal from "../global/FormModal";
import Link from "next/link";

export interface WhoJoinItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export interface AboutJoinProps {
  image: string;
  title: string;
  description: string;
  whoJoin: WhoJoinItem[];
  courseId: string;
  courses: any[]
  offerPrice:string;
}

const AboutJoinSection = ({ data }: { data: AboutJoinProps }) => {

   const [openForm, setOpenForm] = useState(false);
  return (
    <section className="w-full py-8 lg:py-16 px-4">
      <div className="max-w-[1320px] mx-auto w-full flex flex-col lg:flex-row gap-10 items-stretch">
        <div className="flex flex-col h-full w-full lg:w-[40%]">
          <div className="relative w-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] h-full rounded-2xl overflow-hidden">
            <Image
              src={data.image}
              alt="Yoga"
              fill
              className="object-cover"
              priority
            />
          </div>

         
        </div>

        <div className="flex flex-col gap-2 w-full lg:w-[60%]">
          <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold leading-snug">
            <span className="bg-linear-to-r from-defined-purple to-defined-green bg-clip-text text-transparent">
              {data.title}
            </span>
          </h2>

          <div
            className=" text-gray-600 leading-relaxed text-xs md:text-sm"
            dangerouslySetInnerHTML={{ __html: data.description }}
          ></div>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <button
              onClick={() => setOpenForm(true)}
              className="w-full px-6 py-3 rounded-full text-white 
              bg-[linear-gradient(90deg,#AD46FF_0%,#9333EA_100%)] 
              flex items-center justify-center gap-2 hover:opacity-90 transition"
            >
              Join Course @ {data.offerPrice}<FiArrowRight />
            </button>

            <Link
              href={"/courses"}
              className="w-full px-6 py-3 rounded-full text-white 
              bg-green-600 flex items-center justify-center gap-2 hover:bg-green-700 transition"
            >
          See Other Courses
            </Link>
          </div>

        </div>
      </div>

         {openForm && (
              <FormModal
                mode="modal"
                onClose={() => setOpenForm(false)}
                courses={data.courses}
                defaultCourseId={data.courseId}
              />
            )}
    </section>
  );
};

export default AboutJoinSection;
