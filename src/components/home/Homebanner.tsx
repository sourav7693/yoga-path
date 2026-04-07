"use client";

import FormModal from "../global/FormModal";
import { CourseDoc } from "@/models/Course";

export default function HomeBanner({ courses }: { courses: CourseDoc[] }) {
  // ভিডিওর HTML স্ট্রিং তৈরি করে নেওয়া
  const videoHTML = `
    <video
      autoplay
      loop
      muted
      playsinline
      preload="auto"
      class="absolute top-0 left-0 w-full h-full object-cover"
    >
      <source src="https://res.cloudinary.com/dqwnmpul2/video/upload/q_auto,f_auto/v1775566145/theyogapath-herovideo_n3daku.mp4" type="video/mp4" />
    </video>
  `;

  return (
    <>
      {/* Desktop Section */}
      <section className="hidden md:block relative w-full mt-[-80px] bg-transparent overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div dangerouslySetInnerHTML={{ __html: videoHTML }} className="w-full h-full" />
          
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
        <div className="relative w-full h-[60vh] z-0 cursor-pointer" onClick={() => {
           
            const vids = document.querySelectorAll('video');
            vids.forEach(v => v.play().catch(e => console.log(e)));
        }}>
          <div dangerouslySetInnerHTML={{ __html: videoHTML }} className="w-full h-full" />
         
          <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
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