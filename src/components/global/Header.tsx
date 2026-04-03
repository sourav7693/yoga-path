"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function TransparentHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 md:h-[70px] h-[50px] px-4">
      
      <div className="max-w-[1320px] mx-auto w-full">
        <div className="flex items-center justify-between md:h-[70px] h-[50px]">
          
          {/* Logo */}
          <div className="flex items-center mt-10 md:mt-[70px]">
            <Link href="/">
              <Image
                src={"/assets/logo/Yoga Path Logo PNG.png"}
                alt="logo"
                width={1804}
                height={299}
                priority
                className="h-[5rem] md:h-[7rem] xl:h-[9rem] w-fit"
              />
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#AD46FF] text-2xl z-[60]"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[70%] md:w-[300px] bg-white shadow-lg z-[55] transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 gap-6 mt-20">
          
          <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-medium">
            Home
          </Link>

          <Link href="/about" onClick={() => setIsOpen(false)} className="text-lg font-medium">
            About
          </Link>

          <Link href="/courses" onClick={() => setIsOpen(false)} className="text-lg font-medium">
            Courses
          </Link>

          <Link href="/media" onClick={() => setIsOpen(false)} className="text-lg font-medium">
            Media
          </Link>

          <Link href="/contact" onClick={() => setIsOpen(false)} className="text-lg font-medium">
            Contact
          </Link>

        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-[50]"
        />
      )}
    </header>
  );
}