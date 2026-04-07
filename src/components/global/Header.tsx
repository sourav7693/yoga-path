"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function TransparentHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-50 md:h-[70px] h-[50px] px-4 md:px-20">
      
      {/* Header */}
      <div className="mx-auto w-full">
        <div className="flex items-center justify-between md:h-[70px] h-[50px] md:mt-[10px]">
          
          {/* Logo (UNCHANGED) */}
          <div className="flex items-center mt-10 md:mt-[70px]">
            <Link href="/">
              <Image
                src={"/assets/logo/Yoga Path Logo PNG.png"}
                alt="logo"
                width={1804}
                height={299}
                priority
                className="h-[5rem] md:h-[7rem] xl:h-[9rem] w-auto object-contain"
              />
            </Link>
          </div>

          {/* Hamburger / Close (SAME ICON) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#AD46FF] text-2xl z-[60]"
          >
            {isOpen ? "" : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[75%] md:w-[350px] bg-white shadow-lg z-[55] transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 gap-4 mt-0">

          {/* ✅ SAME ROW: Logo + SAME ICON (NO EXTRA BUTTON LOGIC) */}
          <div className="flex items-center justify-between mb-6">
            
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Image
                src={"/assets/logo/Yoga Path Logo PNG.png"}
                alt="logo"
                width={1804}
                height={299}
                className="h-[3rem] w-auto"
              />
            </Link>

            {/* SAME TOGGLE ICON */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#AD46FF] text-2xl"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>

          </div>

          {/* Menu Links */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`text-lg font-medium px-4 py-2 rounded-lg transition-all duration-300
            ${
              pathname === "/"
                ? "bg-[#AD46FF] text-white shadow-lg"
                : "text-gray-800 hover:bg-[#AD46FF]/10 hover:shadow-md"
            }`}
          >
            Home
          </Link>

          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className={`text-lg font-medium px-4 py-2 rounded-lg transition-all duration-300
            ${
              pathname === "/about"
                ? "bg-[#AD46FF] text-white shadow-lg"
                : "text-gray-800 hover:bg-[#AD46FF]/10 hover:shadow-md"
            }`}
          >
            About
          </Link>

          <Link
            href="/courses"
            onClick={() => setIsOpen(false)}
            className={`text-lg font-medium px-4 py-2 rounded-lg transition-all duration-300
            ${
              pathname === "/courses"
                ? "bg-[#AD46FF] text-white shadow-lg"
                : "text-gray-800 hover:bg-[#AD46FF]/10 hover:shadow-md"
            }`}
          >
            Courses
          </Link>

          <Link
            href="/media"
            onClick={() => setIsOpen(false)}
            className={`text-lg font-medium px-4 py-2 rounded-lg transition-all duration-300
            ${
              pathname === "/media"
                ? "bg-[#AD46FF] text-white shadow-lg"
                : "text-gray-800 hover:bg-[#AD46FF]/10 hover:shadow-md"
            }`}
          >
            Media
          </Link>

          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className={`text-lg font-medium px-4 py-2 rounded-lg transition-all duration-300
            ${
              pathname === "/contact"
                ? "bg-[#AD46FF] text-white shadow-lg"
                : "text-gray-800 hover:bg-[#AD46FF]/10 hover:shadow-md"
            }`}
          >
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