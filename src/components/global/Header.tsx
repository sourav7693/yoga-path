"use client";

import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function TransparentHeader() {
  return (
    <header className="absolute top-0 left-0 w-full z-50 md:h-[70px] h-[35px] px-4">
      <div className="max-w-[1300px] mx-auto ">
        <div className="flex items-center justify-between md:h-[70px] h-[35px]">
          {/* Logo */}
          <div className="flex items-center mt-10 md:mt-[72px]">
            <Link href="/">
              <Image
                src={"/assets/logo/Yoga Path Logo PNG.png"}
                alt="logo"
                width={1804}
                height={299}
                priority
                className="h-[4rem] md:h-[8rem] w-fit"
              />
            </Link>
          </div>

          {/* WhatsApp */}
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/+91123456789"
              target="_blank"
              className="group flex items-center justify-center 
          md:px-4 px-3 md:py-2 py-1 rounded-full 
          bg-white/20 backdrop-blur-md 
          border border-white/90 
          mt-4 md:mt-0
          transition-all duration-300"
            >
              <FaWhatsapp className="text-2xl text-defined-red group-hover:scale-110 transition-all duration-300 mr-2" />

              <span className="text-xs md:text-sm text-defined-blue">
                +91 123456789
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
