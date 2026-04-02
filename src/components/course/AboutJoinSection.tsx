"use client";

import Image from "next/image";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import FormModal from "../global/FormModal";

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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <button
              onClick={() => setOpenForm(true)}
              className="w-full px-6 py-3 rounded-full text-white 
              bg-[linear-gradient(90deg,#AD46FF_0%,#9333EA_100%)] 
              flex items-center justify-center gap-2 hover:opacity-90 transition"
            >
              Enroll Now <FiArrowRight />
            </button>

            <button
              onClick={() => setOpenForm(true)}
              className="w-full px-6 py-3 rounded-full text-white 
              bg-green-600 flex items-center justify-center gap-2 hover:bg-green-700 transition"
            >
              Join Trial @ ₹99 <FiArrowRight />
            </button>
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

          <div className="">
            <h3 className="text-xl sm:text-2xl font-bold text-[#AD46FF]">
              Who Should Join?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              {data.whoJoin.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className=" w-auto">
                    <div className="bg-green-100 text-green-600 p-2 rounded-md size-[2.5rem] flex justify-center items-center">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
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
