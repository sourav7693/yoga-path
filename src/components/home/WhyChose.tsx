"use client";

import React from "react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

interface FeatureCardProps {
  image: string;
  title: string;
  color: string;
  points: string[];
  author: string;
}

const WhyChoose: React.FC = () => {
  return (
    <section className="w-full py-20 bg-[#f9f9f9]" id="whyus">
      <div className="max-w-[1300px] mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">
            Why Choose Our{" "}
            <span className="text-defined-red">Yoga Classes</span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-[700px] mx-auto">
            Experience the transformative power of yoga with our comprehensive
            approach to mind and body wellness.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <FeatureCard
            image="/assets/whyus/121027193.avif"
            title="Find Calm"
            color="text-yellow-500"
            points={[
              "Reduce stress & anxiety",
              "Improves sleep quality",
              "Learn powerful breathwork",
            ]}
            author="By Payel Sarkar"
          />

          <FeatureCard
            image="/assets/whyus/121027184.avif"
            title="Get Active"
            color="text-red-500"
            points={[
              "Burn calories naturally",
              "Build core strength",
              "Maintain healthy weight",
            ]}
            author="By Payel Sarkar"
          />

          <FeatureCard
            image="/assets/whyus/121437843.avif"
            title="Build Holistic Wellness"
            color="text-cyan-500"
            points={[
              "Heal stiffness & joint pain",
              "Improve digestion & posture",
              "Rebalance lifestyle habits",
            ]}
            author="By Payel Sarkar"
          />

          <FeatureCard
            image="/assets/whyus/121320104.avif"
            title="Discover Yogic Wisdom"
            color="text-purple-500"
            points={[
              "Learn ancient meditation practices",
              "Gain spiritual clarity & emotional balance",
              "Elevate daily life through inner peace",
            ]}
            author="By Payel Sarkar"
          />
        </div>
      </div>
    </section>
  );
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  image,
  title,
  color,
  points,
  author,
}) => {
  return (
    <div className="flex flex-row items-center gap-6">

      {/* Image */}
      <div className="relative w-[140px] h-[140px] sm:w-[220px] sm:h-[220px] flex-shrink-0">
        <div className="absolute inset-0 bg-orange-100 rounded-[40px] rotate-6 -z-10"></div>
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div>
        <h3 className={`text-lg sm:text-xl font-semibold mb-4 ${color}`}>
          {title}
        </h3>

        <ul className="space-y-3 text-gray-700 text-sm sm:text-base">
          {points.map((point, index) => (
            <li key={index} className="flex items-start gap-2">
              <FaCheckCircle className="text-green-500 mt-1" />
              {point}
            </li>
          ))}
        </ul>

        <p className="mt-4 text-xs sm:text-sm text-gray-500">
          {author}
        </p>
      </div>

    </div>
  );
};

export default WhyChoose;