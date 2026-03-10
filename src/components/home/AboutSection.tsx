"use client";

import AboutImgSection from "./AboutImgSection";
import Check from "../SvgIcon/Check";

const AboutSection = () => {
  const highlights = [
    "Experienced Yoga Trainers With 10+ Years Expertise",
    "Small Batches For Personalized Attention",
    "Authentic Traditional And Modern Yoga Techniques",
    "Holistic Approach For Mind Body Balance",
    "Peaceful And Positive Learning Environment",
    "Trusted Yoga Center Serving Siliguri Community",
  ];

  return (
    <section className="w-full bg-white md:py-4 py-4 px-4" id="about">
      <div className="w-full max-w-[1300px] mx-auto  grid grid-cols-1  md:grid-cols-2 gap-12 items-stretch">
        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-between h-full">
          {/* Heading & Paragraph */}
          <div>
            <h2 className="md:text-[36px] text-[26px] text-defined-darkblue font-bold leading-snug mb-4">
             Empowering Holistic Wellness Through Traditional <span className="text-defined-red"> Yoga in Siliguri</span> 
            </h2>

            <p className="text-[#666666] md:text-[16px] text-[15px] leading-relaxed mb-8 text-justify">
              Welcome to our Siliguri-based yoga community where tradition meets
              modern wellness. With over a decade of teaching experience, we are
              dedicated to guiding individuals toward healthier bodies and
              calmer minds. Our classes combine classical yoga philosophy,
              asanas, pranayama, and meditation techniques to create a complete
              wellness journey. We believe yoga is not just exercise but a
              lifestyle that builds strength, flexibility, balance, and inner
              peace.<br></br><br></br>
              Every session is designed with personal attention, ensuring
              students of all ages and levels feel comfortable and confident.
              Join us to experience mindful growth, positive energy, and lasting
              transformation through authentic yoga practice.
            </p>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
            {highlights.map((text, index) => (
              <div
                key={index}
                className="flex items-start gap-3 group cursor-pointer transition-all duration-300"
              >
                {/* Icon Circle */}
                <div
                  className="flex items-center justify-center w-6 h-6  
                  transition-all duration-300 
                  "
                >
                  <Check
                    className="w-5 h-5 text-green-600 
                    transition-all duration-300 
                    group-hover:text-white"
                  />
                </div>

                {/* Text */}
                <span
                  className="text-[14px] md:text-[15px] text-defined-darkblue 
                  font-medium leading-relaxed 
                  transition-all duration-300 
                  group-hover:text-green-700"
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="h-full hidden md:block">
          <AboutImgSection />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
