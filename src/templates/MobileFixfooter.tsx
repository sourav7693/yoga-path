"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp() {
  return (
    <div className="md:hidden fixed left-0 bottom-34 z-50">

      <a
        href="https://wa.me/+917908623983"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center"
      >
   
        <div
          className="
            absolute left-0 flex items-center
            bg-gradient-to-r from-green-600 to-green-500
            text-white h-12
            rounded-r-full shadow-xl
            w-12 group-hover:w-52
            transition-all duration-500 ease-out
            overflow-hidden
          "
        >
          
          <span
            className="
              ml-4 opacity-0 group-hover:opacity-100
              transition-opacity duration-300 delay-200
              whitespace-nowrap text-sm font-semibold tracking-wide
            "
          >
            Chat on WhatsApp
          </span>
        </div>

       
        <div
          className="
            relative z-10 w-15 h-14 flex items-center justify-center
            bg-green-700 text-white
            rounded-r-full shadow-md
            transition-all duration-300
            group-hover:scale-105 group-active:scale-95
          "
        >
          <FaWhatsapp size={32} />
        </div>
      </a>

    </div>
  );
}