"use client";
import Image from "next/image";
import Badge from "./Badge";

const AboutImgSection = () => {
  return (
    <div className="relative w-full h-full">
      
      {/* Image Wrapper */}
      <div className="relative w-full h-full rounded-[28px] overflow-hidden">
        <Image
          src="/assets/home/aboutus.png"
          alt="About Image"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Overlapping Badge */}
      <div className="absolute bottom-0 right-0 z-20">
        <Badge />
      </div>

    </div>
  );
};

export default AboutImgSection;
