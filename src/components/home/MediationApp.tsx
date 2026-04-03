"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function MediationApp() {
  return (
    <section className="w-full bg-white md:py-12 py-6  px-4">
      <div className="max-w-[1320px] mx-auto grid lg:grid-cols-2 gap-10 items-center">
      
        <div className="text-left">
        
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-[#AD46FF]">Exciting News: Our Yoga </span>{" "}
            <span className="text-gray-700 font-medium">
              App Launching Very Soon Worldwide
            </span>
          </h2>

   
          <p className="mt-5 text-gray-600 leading-relaxed max-w-xl text-justify">
            We are thrilled to announce that The Yoga Path will soon launch its
            dedicated mobile app, making your yoga journey even more convenient
            and accessible. With easy class bookings, progress tracking, live
            sessions, and personalized guidance, the app will bring holistic
            wellness right to your fingertips anytime, anywhere across the
            globe.
          </p>

          {/* BUTTON */}
           <Link href={"/courses"}
            className="mt-6 inline-flex items-center gap-2 
            bg-[#AD46FF] text-white px-6 py-3 rounded-full 
            font-medium hover:gap-3 transition-all duration-300 shadow-md"
          >
            Explore More <FiArrowRight />
          </Link>

     
          <div className="flex gap-4 mt-6 flex-wrap">
            <Image
              src="/assets/new-img/googleplaystore.png" 
              alt="Google Play"
              width={140}
              height={45}
              className="object-contain"
            />
            <Image
              src="/assets/new-img/appstore.png" 
              alt="App Store"
              width={140}
              height={45}
              className="object-contain"
            />
          </div>
        </div>

     
        <div className="relative flex justify-center items-center md:mt-0 mt-[-160px]">
        
          <div
            className="absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px] 
            bg-defined-purple 
            rounded-full "
          ></div>

          
          <div className="relative z-10 mt-55 md:mt-35">
            <Image
              src="/assets/new-img/yoga app.avif"
              alt="Mobile App"
              width={260}
              height={520}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
