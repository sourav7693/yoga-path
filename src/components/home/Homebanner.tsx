"use client";

import { useState, useEffect, useRef } from "react";
import FormModal from "../global/FormModal";
import { CourseDoc } from "@/models/Course";

export default function HomeBanner({ courses }: { courses: CourseDoc[] }) {
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // পেজ লোড হওয়ার ১.৫ সেকেন্ড পর অ্যানিমেশন বন্ধ করে ভিডিও প্লে করার কমান্ড
    const timer = setTimeout(() => {
      setIsVideoLoading(false);

      // Desktop Play
      if (desktopVideoRef.current) {
        desktopVideoRef.current.defaultMuted = true;
        desktopVideoRef.current.muted = true;
        desktopVideoRef.current.play().catch((e) => console.log(e));
      }

      // Mobile Play
      if (mobileVideoRef.current) {
        mobileVideoRef.current.defaultMuted = true;
        mobileVideoRef.current.muted = true;
        mobileVideoRef.current.play().catch((e) => console.log(e));
      }
    }, 1500); // 1500ms = ১.৫ সেকেন্ড পালস এফেক্ট চলবে

    return () => clearTimeout(timer);
  }, []);

  // লোডিং স্টেটে ব্যাকগ্রাউন্ড এফেক্টের জন্য ক্লাস
  const shimmerBgClasses = "bg-gray-800 animate-pulse";

  return (
    <>
      {/* ================= DESKTOP SECTION ================= */}
      <section className="hidden md:block relative w-full mt-[-80px] bg-transparent overflow-hidden">
        {/* কন্টেইনারে লোডিং ক্লাস যোগ করা হয়েছে */}
        <div className={`absolute inset-0 z-0 overflow-hidden ${isVideoLoading ? shimmerBgClasses : 'bg-gray-900'}`}>
          <video
            ref={desktopVideoRef}
            loop
            muted
            playsInline
            preload="auto"
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              isVideoLoading ? "opacity-0" : "opacity-100"
            }`}
          >
            {/* type="video/mp4" সরিয়ে দেওয়া হয়েছে যাতে Cloudinary-এর f_auto ঠিকমতো কাজ করে */}
            <source src="https://res.cloudinary.com/dqwnmpul2/video/upload/q_auto,f_auto/v1775566145/theyogapath-herovideo_n3daku.mp4" />
          </video>
          {/* কালো ওভারলে */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
        </div>

        {/* ফর্ম এরিয়া */}
        <div className="relative z-10 w-full max-w-[1300px] mx-auto px-4 pt-40 pb-20 pointer-events-none">
          <div className="grid grid-cols-2 gap-10 items-center">
            <div></div>
            <div className="flex justify-end w-full pointer-events-auto">
              <div className="w-full max-w-[400px]">
                <FormModal mode="inline" courses={courses} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MOBILE SECTION ================= */}
      <section className="block md:hidden relative w-full mt-[-40px] overflow-hidden flex flex-col">
        {/* Mobile Top Video Banner */}
        <div 
          // কন্টেইনারে লোডিং ক্লাস যোগ করা হয়েছে এবং স্পিনার div সরিয়ে দেওয়া হয়েছে
          className={`relative w-full h-[60vh] z-0 cursor-pointer overflow-hidden ${isVideoLoading ? shimmerBgClasses : 'bg-gray-200'}`}
          onClick={() => {
            // ইউজারের ম্যানুয়াল ক্লিকের জন্য ব্যাকআপ লজিক
            if (mobileVideoRef.current) {
              mobileVideoRef.current.play().catch(e => console.log(e));
            }
          }}
        >
          <video
            ref={mobileVideoRef}
            loop
            muted
            playsInline
            preload="auto"
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              isVideoLoading ? "opacity-0" : "opacity-100"
            }`}
          >
            <source src="https://res.cloudinary.com/dqwnmpul2/video/upload/q_auto,f_auto/v1775566145/theyogapath-herovideo_n3daku.mp4" />
          </video>
          
          {/* কালো ওভারলে */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
        </div>

        {/* Mobile Bottom Form Area */}
        <div className="relative z-10 w-full px-4 py-10 flex justify-center min-h-[350px] mt-4">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/form-bg.avif')" }}
          />
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />

          <div className="relative w-full max-w-[400px] pointer-events-auto">
            <FormModal mode="inline" courses={courses} />
          </div>
        </div>
      </section>
    </>
  );
}