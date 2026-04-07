"use client";

import { useEffect, useRef } from "react";
import FormModal from "../global/FormModal";
import { CourseDoc } from "@/models/Course";

export default function HomeBanner({ courses }: { courses: CourseDoc[] }) {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

useEffect(() => {
  const playVideos = () => {
    [desktopVideoRef, mobileVideoRef].forEach((ref) => {
      if (ref.current && ref.current.paused) {
        ref.current.muted = true;
        ref.current.play().catch(() => {});
      }
    });
  };


  playVideos();

  window.addEventListener("scroll", playVideos, { once: true });
  window.addEventListener("touchstart", playVideos, { once: true });

  return () => {
    window.removeEventListener("scroll", playVideos);
    window.removeEventListener("touchstart", playVideos);
  };
}, []);

  const videoProps = {
    autoPlay: true,
    loop: true,
    muted: true,
    playsInline: true,
    preload: "auto" as const,
    className: "absolute top-0 left-0 w-full h-full object-cover",
  };

  return (
    <>
      {/* Desktop */}
      <section className="hidden md:block relative w-full mt-[-80px] bg-transparent overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video ref={desktopVideoRef} {...videoProps}>
            <source
              src="https://res.cloudinary.com/dqwnmpul2/video/upload/vc_h264,q_auto/v1775566145/theyogapath-herovideo_n3daku.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
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

      {/* Mobile */}
      <section className="block md:hidden relative w-full mt-[-40px] overflow-hidden flex flex-col">
        <div className="relative w-full h-[60vh] z-0">
          <video ref={mobileVideoRef} {...videoProps}>
            <source
              src="https://res.cloudinary.com/dqwnmpul2/video/upload/vc_h264,q_auto/v1775566145/theyogapath-herovideo_n3daku.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </div>

        <div className="relative z-10 w-full px-4 py-10 flex justify-center min-h-[350px] mt-4">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/form-bg.avif')" }}
          />
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
          <div className="relative w-full max-w-[400px]">
            <FormModal mode="inline" courses={courses} />
          </div>
        </div>
      </section>
    </>
  );
}