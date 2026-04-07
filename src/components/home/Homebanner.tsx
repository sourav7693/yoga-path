"use client";

import { useState, useEffect, useRef } from "react";
import FormModal from "../global/FormModal";
import { CourseDoc } from "@/models/Course";

export default function HomeBanner({ courses }: { courses: CourseDoc[] }) {
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoLoading(false);

      
      if (desktopVideoRef.current) {
        desktopVideoRef.current.defaultMuted = true;
        desktopVideoRef.current.muted = true;
        desktopVideoRef.current.play().catch((e) => console.log(e));
      }

      if (mobileVideoRef.current) {
        mobileVideoRef.current.defaultMuted = true;
        mobileVideoRef.current.muted = true;
        mobileVideoRef.current.play().catch((e) => console.log(e));
      }
    }, 1500); 

    return () => clearTimeout(timer);
  }, []);

  const shimmerBgClasses = "bg-gray-800 animate-pulse";

  return (
    <>
      <section className="hidden md:block relative w-full mt-[-80px] bg-transparent overflow-hidden">
       
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
            <source src="https://res.cloudinary.com/dqwnmpul2/video/upload/q_auto,f_auto/v1775566145/theyogapath-herovideo_n3daku.mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
        </div>

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

      <section className="block md:hidden relative w-full mt-[-40px] overflow-hidden flex flex-col">
       
        <div 
          className={`relative w-full h-[60vh] z-0 cursor-pointer overflow-hidden ${isVideoLoading ? shimmerBgClasses : 'bg-gray-200'}`}
          onClick={() => {
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
          
          <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
        </div>

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