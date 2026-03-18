"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import type {Swiper as SwiperType} from "swiper";
import { useRef, useState } from "react";
import { ReelDocument } from "@/models/Reel";

export default function VideoSection({reels} : {reels : ReelDocument[]}) {
  const swiperRef = useRef<SwiperType | null>(null);
 const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
 const [playing, setPlaying] = useState<string | null>(null);

const togglePlay = (id: string) => {
  const video = videoRefs.current[id];
  if (!video) return;

  // pause all videos
  Object.values(videoRefs.current).forEach((v) => {
    if (v && !v.paused) v.pause();
  });

  if (playing === id) {
    setPlaying(null);

    // OPTIONAL: resume autoplay when paused
    // swiperRef.current?.autoplay?.start();
  } else {
    video.play();
    setPlaying(id);

    // 🔥 STOP AUTOPLAY HERE
  (swiperRef.current as any)?.autoplay?.stop?.();  
  }
};

  return (
    <section className="w-full py-20" id="sucess">
      <div className="max-w-[1300px] mx-auto px-4">
        {/* Title */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Our Success Stories
          </h2>
          <p className="text-gray-600 mt-3 max-w-[600px]">
            Watch real experiences from our students who achieved career success
            through our practical and industry-focused training programs.
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          onSwiper={(swiper: SwiperType) => {
            swiperRef.current = swiper;
          }}
          autoplay={false}
          spaceBetween={20}
          slidesPerView={5}
          loop={false}
          onSlideChange={() => {
            Object.values(videoRefs.current).forEach((v) => {
              if (v && !v.paused) v.pause();
            });
            setPlaying(null);
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
        >
          {reels.map((reel) => (
            <SwiperSlide key={reel.reelId}>
              <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white">
                {/* Video */}
                <div className="relative aspect-[9/16] bg-black">
                  <video
                    loop
                    ref={(el) => {
                      videoRefs.current[reel.reelId] = el;
                    }}
                    src={reel.videoUrl}
                    className="w-full h-full object-cover"
                    playsInline
                  />

                  {/* Format badge */}
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    MP4
                  </div>

                  {/* Play Button */}
                  {playing !== reel.reelId && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay(reel.reelId);
                      }}
                      className="absolute inset-0 flex items-center justify-center text-white text-3xl bg-black/20"
                    >
                      ▶
                    </button>
                  )}
                </div>

                {/* Content */}
                <div className="p-3">
                  <p className="text-sm font-semibold truncate text-center text-defined-black">
                    {reel.reelName}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}