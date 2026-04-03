"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="w-full  md:py-10 py-4 px-4 bg-white">
      <div className="max-w-[1320px] mx-auto grid lg:grid-cols-2 gap-10 items-center">
        {/* LEFT IMAGE SECTION */}
        <div className="relative flex justify-center lg:justify-start">
          {/* BIG IMAGE */}
          <div className="relative w-[340px]  md:w-[600px] h-[600px] rounded-3xl overflow-hidden ">
            <Image
              src="/assets/new-img/about2.jpg"
              alt="Yoga Training"
              fill
              className="object-cover"
            />
          </div>

          {/* SMALL OVERLAP IMAGE */}
          <div className="absolute bottom-[-50px] right-[-10px]  w-[300px]  h-[350px] rounded-3xl overflow-hidden  border-8 border-white">
            <Image
              src="/assets/home/about2.avif"
              alt="Yoga Pose"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* RIGHT TEXT SECTION */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold leading-snug">
            <span className="text-purple-500">Transform Your Life Through</span>{" "}
            <span className="text-defined-green">
              Authentic Yoga and Healing
            </span>
          </h2>

          <p className="mt-5 text-gray-600 leading-relaxed text-sm md:text-[15px] text-justify">
            The Yoga Path is a dedicated online yoga platform based in North
            Bengal, Siliguri, committed to helping individuals achieve balance,
            wellness, and inner peace from the comfort of their homes. With over
            three years of experience in guiding students across the globe, the
            platform blends traditional yogic practices with modern
            accessibility to create a transformative learning experience. The
            journey begins with Sahaj Yoga, a beginner-friendly program designed
            for those who are new to yoga or looking to reconnect with their
            inner self. This one-month course focuses on simple yet powerful
            techniques that improve flexibility, reduce stress, and build a
            strong foundation for holistic well-being—all at an affordable fee
            of ₹799 per month.
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed text-sm md:text-[15px] text-justify">
            For those ready to deepen their practice, Yoga (Advanced Level)
            offers a more structured and intensive approach. Priced at ₹999 per
            month, this course enhances strength, mindfulness, and spiritual
            growth, helping practitioners progress confidently on their yoga
            journey. In addition to yoga courses, The Yoga Path also offers
            Sound Healing Therapy, a unique experience aimed at awakening the
            seven chakras through therapeutic sound vibrations. This 60–90
            minute session, priced at ₹4999 for couples, provides deep
            relaxation, emotional release, and energetic alignment. With a
            mission to make authentic yoga accessible worldwide, The Yoga Path
            empowers individuals to lead healthier, more mindful, and
            spiritually enriched lives.
          </p>

          {/* BUTTON */}
          <Link href='/#sucess' className="mt-6 inline-flex items-center gap-2 bg-defined-purple text-white px-6 py-3 rounded-full shadow-md hover:scale-105 transition-all duration-300">
            Our Story →
          </Link>
        </div>
      </div>
    </section>
  );
}
