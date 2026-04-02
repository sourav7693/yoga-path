"use client";
import React from "react";

const Badge = () => {
  return (
    <div className="relative w-[170px] h-[170px] flex items-center justify-center">

      <svg viewBox="0 0 300 300" className="w-full h-full">
        {/* OUTER WHITE BORDER */}
        <circle cx="150" cy="150" r="145" fill="#ffffff" />

        {/* MAIN yellow CIRCLE */}
        <circle cx="150" cy="150" r="135" fill="#FC4456B2" />

        {/* INNER CIRCLE BORDER */}
        <circle
          cx="150"
          cy="150"
          r="95"
          fill="none"
          stroke="#ffffff"
          strokeWidth="4"
        />

        {/* CENTER STATIC TEXT */}
        <text
          x="150"
          y="165"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="64"
          fontWeight="700"

        >
          10+
        </text>

        {/* TEXT PATH */}
        <defs>
          <path
            id="circleTextPath"
            d="M150,150 m-115,0 a115,115 0 1,1 230,0 a115,115 0 1,1 -230,0"
          />
        </defs>

        {/* ROTATING TEXT ONLY */}
        <g className="origin-center animate-spin-slow">
          <text
            fill="#ffffff"
            fontSize="23"
            fontWeight="400"
            letterSpacing="1.9"
          >
            <textPath
              href="#circleTextPath"
              startOffset="40%"
              textAnchor="middle"
            >
             Years Industry Expert • Over Siliguri & North Bengal 
            </textPath>
          </text>
        </g>
      </svg>
    </div>
  );
};

export default Badge;
