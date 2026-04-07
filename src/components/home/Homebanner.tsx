"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import FormModal from "../global/FormModal";
import { CourseDoc } from "@/models/Course";

export default function HomeBanner({ courses }: { courses: CourseDoc[] }) {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // iPhone-এ Autoplay নিশ্চিত করার জন্য Force Play Trick
    const playVideo = (videoElement: HTMLVideoElement | null) => {
      if (videoElement) {
        videoElement.defaultMuted = true;
        videoElement.muted = true;
        videoElement.play().catch((error) => {
          console.log("Autoplay prevented:", error);
        });
      }
    };

    playVideo(desktopVideoRef.current);
    playVideo(mobileVideoRef.current);
  }, []);

  return (
    <>
      {/* Desktop Section */}
      <section className="hidden md:block relative w-full mt-[-80px] bg-transparent overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            ref={desktopVideoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            {/* type="video/mp4" সরিয়ে দেওয়া হয়েছে যাতে f_auto নিজে থেকে সঠিক ফরম্যাট নিতে পারে */}
            <source
              src="https://res.cloudinary.com/dqwnmpul2/video/upload/q_auto,f_auto/v1775566145/theyogapath-herovideo_n3daku.mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1300px] mx-auto px-4 pt-40 pb-20">
          <div className="grid grid-cols-2 gap-10 items-center">
            <div></div>
            <div className="flex justify-end w-full">
              <div className="w-full max-w-[400px]">
                <FormModal mode="inline" courses={courses} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Section */}
      <section className="block md:hidden relative w-full mt-[-40px] overflow-hidden flex flex-col">
        {/* Mobile Top Video Banner */}
        <div className="relative w-full h-[60vh] z-0">
          <video
            ref={mobileVideoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            controls={false}
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source
              src="https://res.cloudinary.com/dqwnmpul2/video/upload/q_auto,f_auto/v1775566145/theyogapath-herovideo_n3daku.mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative z-10 w-full px-4 py-10 flex justify-center min-h-[350px] mt-4">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/form-bg.avif')" }}
          />
          <div className="absolute inset-0 bg-black/30" />

          <div className="relative w-full max-w-[400px]">
            <FormModal mode="inline" courses={courses} />
          </div>
        </div>
      </section>
    </>
  );
}