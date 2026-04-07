"use client";

import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleWhatsapp = () => {
    const { name, mobile, email, message } = form;

    if (!name || !mobile) {
      alert("Name and mobile are required");
      return;
    }

    const text = `*New Enquiry from Yoga Path Website*

*Name:* ${name}
*Mobile:* ${mobile}
*Email:* ${email || "N/A"}
*Message:* ${message || "N/A"}`;

    const encoded = encodeURIComponent(text);
    const phone = "917908623983"; 

    const isMobile = /iPhone|Android/i.test(navigator.userAgent);
    const url = isMobile
      ? `whatsapp://send?phone=${phone}&text=${encoded}`
      : `https://web.whatsapp.com/send?phone=${phone}&text=${encoded}`;

    window.open(url, "_blank");
  };

  return (
    <section>
      <section className="w-full bg-white py-16 px-4">
        <div className="max-w-[1320px] mx-auto">

          <h2 className="text-3xl font-bold text-[#AD46FF]">Get In Touch</h2>

          <p className="mt-6 text-gray-600 max-w-4xl">
            Welcome to our Siliguri-based yoga community where tradition meets
            modern wellness. With over a decade of teaching experience, we are
            dedicated to guiding individuals toward healthier bodies and calmer
            minds.
          </p>

          <div className="w-full flex flex-col lg:flex-row gap-4 mt-10">
            <div className="bg-[#F5F5F5] rounded-xl w-full lg:w-[65%]">

              <div className="rounded-2xl p-6 flex flex-col md:flex-row flex-wrap gap-6">

                <div className="flex items-center gap-4 text-nowrap">
                  <div className="bg-[#AD46FF] text-white p-3 rounded-lg">
                    <FiPhone />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Need any help?</p>
                    <p className="font-semibold">+91 79086 23983</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-[#AD46FF] text-white p-3 rounded-lg">
                    <FiMail />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Us</p>
                    <p className="font-semibold">yogapathbypayel@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-[#AD46FF] text-white p-3 rounded-lg">
                    <FiMapPin />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold">
                      Ground Floor, Niranjan Nagar Ghogomali, Ghogomali Main Road  WB 734006
                    </p>
                  </div>
                </div>

              </div>

              <div className="rounded-2xl md:p-6 p-2 pt-0">
                <div className="bg-white md:p-6 p-2 border border-white rounded-xl">

                  <h3 className="text-[#AD46FF] font-semibold mb-4">
                    Get a call back within 15 minutes from our Health Advisor
                    for Test Booking Assistance.
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="border border-gray-300 rounded-lg p-3 outline-none w-full"
                    />

                    <input
                      type="tel"
                      name="mobile"
                      value={form.mobile}
                      onChange={handleChange}
                      placeholder="Enter your mobile number"
                      className="border border-gray-300 rounded-lg p-3 outline-none w-full"
                    />

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter Your Email address"
                      className="border border-gray-300 rounded-lg p-3 outline-none w-full"
                    />

                    <input
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Message"
                      className="border border-gray-300 rounded-lg p-3 outline-none w-full"
                    />

                    <button
                      type="button"
                      onClick={handleWhatsapp}
                      className="bg-green-500 hover:bg-green-600 transition text-white rounded-lg p-3 font-medium col-span-1 md:col-span-2 flex items-center justify-center gap-2"
                    >
                      <FaWhatsapp size={20} />
                      Send via WhatsApp
                    </button>

                  </div>
                </div>
              </div>

            </div>

            <div className="lg:w-[35%] w-full">
              <div className="w-full h-[350px] md:h-[400px] lg:h-full overflow-hidden">
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
