"use client";

import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

export default function ContactSection() {
  return (
      <section>
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-[1320px] mx-auto">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-[#AD46FF]">
          Get In Touch
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-6 text-gray-600 max-w-4xl">
          Welcome to our Siliguri-based yoga community where tradition meets
          modern wellness. With over a decade of teaching experience, we are
          dedicated to guiding individuals toward healthier bodies and calmer
          minds.
        </p>

        {/* CONTACT INFO BOX */}
        <div className=" w-full flex flex-col lg:flex-row gap-4 mt-10 ">
          <div className="bg-[#F5F5F5] rounded-xl w-full lg:w-[65%]  ">

             <div className="  rounded-2xl p-6 flex flex-col md:flex-row flex-wrap gap-6">

          {/* PHONE */}
          <div className="flex items-center gap-4 text-nowrap">
            <div className="bg-[#AD46FF] text-white p-3 rounded-lg">
              <FiPhone />
            </div>
            <div>
              <p className="text-sm text-gray-500">Need any help?</p>
              <p className="font-semibold">+91 79086 23983</p>
            </div>
          </div>

          {/* EMAIL */}
          <div className="flex items-center gap-4">
            <div className="bg-[#AD46FF] text-white p-3 rounded-lg">
              <FiMail />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email Us</p>
              <p className="font-semibold">yogapathbypayel@gmail.com</p>
            </div>
          </div>

          {/* LOCATION */}
          <div className="flex items-center gap-4">
            <div className="bg-[#AD46FF] text-white p-3 rounded-lg">
              <FiMapPin />
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-semibold text-sm">
                South Ambedkar Colony, Pradhan Nagar, Siliguri,
                Dist. Darjiling – 734003, West Bengal
              </p>
            </div>
          </div>

            </div>

        {/* FORM BOX */}
        <div className=" rounded-2xl md:p-6 p-2 pt-0 ">
          
         <div className="bg-white md:p-6 p-2 border border-white rounded-xl">

             {/* FORM TITLE */}
          <h3 className="text-[#AD46FF] font-semibold mb-4">
            Get a call back within 15 minutes from our Health Advisor for Test
            Booking Assistance.
          </h3>

          {/* FORM */}
          <form className="grid md:grid-cols-2 gap-4">
            
            <input
              type="text"
              placeholder="Enter your name"
              className="border border-gray-300 rounded-lg p-3 outline-none"
            />

            <input
              type="text"
              placeholder="Enter your mobile number"
              className="border border-gray-300 rounded-lg p-3 outline-none"
            />

            <input
              type="date"
              className="border border-gray-300 rounded-lg p-3 outline-none"
            />

            <select className="border border-gray-300 rounded-lg p-3 outline-none">
              <option>choose course</option>
              <option>Yoga</option>
              <option>Meditation</option>
            </select>

            <textarea
              placeholder="Message"
              className=" border border-gray-300 rounded-lg p-3 outline-none"
            />

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className=" bg-defined-purple 
              text-white rounded-lg p-3 font-medium"
            >
              Submit
            </button>

          </form>

         </div>
        </div>

          </div>
  <div className="lg:w-[35%] w-full">

    <div className="w-full h-[350px] md:h-[400px] lg:h-full overflow-hidden ">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d114041.77496233252!2d88.451481!3d26.718661!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e441bd69bc232b%3A0xe14ccb38a039f2de!2sGhogomali%2C%20Siliguri%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1775040515858!5m2!1sen!2sin"
        className="w-full h-full border-0 rounded-2xl"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>

  </div>
          </div>

      </div>
    </section>


     </section>
    

  );
}