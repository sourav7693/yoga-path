"use client";

import Image from "next/image";
import React from "react";

interface SubbannerProps {
  heading: string;
}

const Subbanner: React.FC<SubbannerProps> = ({ heading }) => {
  return (
    <section className="w-full flex justify-center  rounded-[25px]">
      <div className="w-full  relative mt-[-32px] md:mt-[-80px]">
        
        {/* Banner Image */}
        <div className="w-full h-[8rem] lg:h-[10vmax] xl:h-[15rem]  overflow-hidden">
          <Image
            src="/assets/global/subbanner.jpg (1).jpeg"
            alt="Sub Banner"
            width={1440}
            height={300}
            className="object-cover h-full w-full "
          />
        </div>

        {/* Heading Only */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center h-full">
          <h1 className="text-lg md:text-xl lg:text-3xl text-white font-semibold text-center text-shadow">
            {heading}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Subbanner;
