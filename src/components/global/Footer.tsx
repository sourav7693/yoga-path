"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  // FaCheck,
  FaWhatsapp,
} from "react-icons/fa";

import WhatsappFooter from "@/components/SvgIcon/Whatsapp";
import { IoLogoInstagram } from "react-icons/io";
// import LogoWhite from "../SvgIcon/LogoWhite";

const quickLinks = [
  { label: "» Home", href: "/" },
  { label: "» About Us", href: "#about" },
  { label: "» Our Sucess", href: "#sucess" },
  { label: "» WhyUS", href: "#whyus" },
  { label: "» Pricing", href: "#pricing" },
];

const quickLinks2 = [
  {
    label: "» Terms & Conditions",
    href: "/terms-and-condition",
  },
  {
    label: "» Privacy Policy",
    href: "/privacy-policy",
  },
  {
    label: "» Cancellation Policy",
    href: "/cancellation-policy",
  },

  {
    label: "» Refund Policy",
    href: "/refurnd-policy",
  },
  {
    label: "» Shipping Policy",
    href: "/shiping-policy",
  },
];

export default function Footer() {
  const [formData, setFormData] = useState<{ message: string }>({
    message: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const whatsappMessage = `Message: ${formData.message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    const whatsappUrl = isDesktop
      ? `https://web.whatsapp.com/send?phone=917908623983&text=${encodedMessage}`
      : `https://api.whatsapp.com/send?phone=917908623983&text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    setFormData({ message: "" });
  };

  return (
    <footer
      className="relative w-full bg-cover bg-center pb-25 "
      style={{ backgroundImage: "url('/assets/home/footerbg (1).avif')" }}
    >
      {/* <div className="absolute inset-0 bg-black/95" /> */}

      {/* TOP CTA */}

      {/* MAIN FOOTER */}
      <div className="relative z-10">
        <div className="mx-auto max-w-[1300px] px-4 py-4 md:py-12 text-gray-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
            {/* ABOUT */}
            <div className="lg:col-span-4">
              <Link href="/">
                <Image
                  src={"/assets/logo/Yoga Path Logo white text (1).png"}
                  alt="logo"
                  width={1804}
                  height={599}
                  priority
                  className="h-[3rem] md:h-[8rem] w-fit"
                />
              </Link>
              <p className="mt-4 text-[16px] leading-relaxed text-white">
                The Yoga Path provides affordable and accessible online yoga
                classes designed for all age groups. Join our live sessions via
                Google Meet with easy WhatsApp access and start your wellness
                journey from the comfort of your home. Based in Ghogomali,
                Siliguri, West Bengal – 734006.
              </p>
            </div>

            {/* LINKS 1 */}
            <div className="lg:col-span-2">
              <h4 className="mb-4 font-semibold text-white text-[22px]">
                Quick Link
              </h4>
              <ul className="space-y-3 text-[17px]">
                {quickLinks.map((link) => (
                  <li key={link.label} className="flex items-center gap-2">
                    {/* <FaCheck size={14} /> */}
                    <Link
                      href={link.href}
                      className="hover:text-defined-red  text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* LINKS 2 */}
            <div className="lg:col-span-2">
              <h4 className="mb-4 font-semibold text-white text-[22px]">
                Quick Link
              </h4>
              <ul className="space-y-3 text-[17px]">
                {quickLinks2.map((link) => (
                  <li key={link.label} className="flex items-center gap-2">
                    {/* <FaCheck size={14} /> */}
                    <Link
                      href={link.href}
                      className="hover:text-defined-red text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* LINKS 3 */}

            {/* CONTACT */}
            <div className="lg:col-span-4">
              <h4 className="mb-4 font-semibold text-white text-[22px]">
                Contact Information
              </h4>
              <ul className="space-y-3 text-[17px]">
                <li className="flex items-start gap-2 text-white">
                  <FaMapMarkerAlt size={20} className="text-white " />
                  <Link
                    href="https://maps.app.goo.gl/EwwTNkuAqEUeQhwc9"
                    target="_blank"
                  >
                    Ghogomali, Siliguri, West Bengal – 734006.
                  </Link>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <FaPhoneAlt size={16} className="text-white" />
                  <Link href="tel:+917908623983">Call Us: +91 79086 23983</Link>
                </li>

                <li className="flex items-center gap-2 text-white">
                  <FaEnvelope size={16} className="text-white" />
                  <Link href="mailto:theyogapath@gmail.com">
                    theyogapath@gmail.com
                  </Link>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <IoLogoInstagram size={20} className="text-white" />
                  <Link
                    href="https://www.instagram.com/theyogapath_bypayel"
                    target="_blank"
                    className="underline"
                  >
                    theyogapath_bypayel
                  </Link>
                </li>
              </ul>
              <div className="w-full h-[100px] border border-gray-200 mt-2 rounded-[4px]">
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14255.221916852694!2d88.44118175475909!3d26.71866062821051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e441bd69bc232b%3A0xe14ccb38a039f2de!2sGhogomali%2C%20Siliguri%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1771931926524!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: "4px" }}
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}

      <div className="relative z-10 pb-6">
        <div className="mx-auto max-w-[1300px] px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded bg-white/5 backdrop-blur-md px-6 py-4">
            <p className="text-[17px] text-white">
              Get a call back within 15 minutes. WhatsApp us 24x7
              <br />
              between 9:00 AM and 8:00 PM.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex w-full md:w-[550px] rounded-[40px] md:border md:border-white"
            >
              <div className="flex items-center w-full backdrop-blur-md rounded-l-[40px] px-3">
                <WhatsappFooter className="h-8 w-8" />
                <input
                  type="text"
                  placeholder="Message"
                  className="bg-transparent text-white px-4 py-3 w-full focus:outline-none placeholder-gray-400"
                  value={formData.message}
                  onChange={(e) => setFormData({ message: e.target.value })}
                  required
                />
              </div>

              <button className="bg-white text-gray-900 px-6 py-3 rounded-r-[40px] font-semibold hover:bg-gray-200 transition whitespace-nowrap">
                Talk Now
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* CREDIT */}
      <div
        className="relative z-10 py-4 
                flex flex-col md:flex-row 
                items-center 
                md:items-center 
                md:justify-between 
                text-gray-400 
                max-w-[1300px] mx-auto px-4"
      >
        {/* 1st Column */}
        <div className="w-full text-center md:text-left">
          <span className="text-[16px]">
            ©{" "}
            <Link href="/" className="text-defined-red font-bold">
              The Yoga Path
            </Link>{" "}
            - 2026 All rights reserved.
          </span>
        </div>

        {/* 2nd Column */}
        <div className="w-full flex justify-center md:justify-end items-center gap-2 mt-3 md:mt-0">
          <span className="text-[16px]">Developed By -</span>
          <Link href="https://rebootai.in/" target="_blank">
            <Image
              src="/assets/reboots.png"
              alt="Reboot AI"
              width={80}
              height={24}
              className="h-4 w-auto"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
