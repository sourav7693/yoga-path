"use client";

import { useState } from "react";
import Link from "next/link";
import { MdOutlineDashboard, MdOutlineLogout } from "react-icons/md";
import { HiOutlineBookOpen } from "react-icons/hi";
import { TiUserAdd } from "react-icons/ti";
import { FaImages } from "react-icons/fa";
import { BsFillBarChartLineFill } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import Image from "next/image";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const menu = [
    {
      icon: <MdOutlineDashboard size={20} />,
      label: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      icon: <HiOutlineBookOpen size={20} />,
      label: "Courses",
      href: "/admin/manage-course",
    },
    {
      icon: <TiUserAdd size={20} />,
      label: "Leads",
      href: "/admin/manage-leads",
    },
    {
      icon: <FaImages size={20} />,
      label: "Media Library",
      href: "/admin/reel",
    },
    {
      icon: <BsFillBarChartLineFill size={20} />,
      label: "Analytics",
      href: "/admin/dashboard",
    },
    {
      icon: <IoIosSettings size={20} />,
      label: "Settings",
      href: "/admin/dashboard",
    },
    {
      icon: <MdOutlineLogout size={20} />,
      label: "Logout",
      href: "/admin/dashboard",
    },
  ];

  return (
    <aside
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`h-screen sticky top-0 bg-white border-r border-gray-200 shadow-md
        transition-all duration-300 ease-in-out
        ${isExpanded ? "w-64" : "w-20"}
      `}
    >
      <div
        className={`flex flex-col h-full transition-all duration-300
    ${isExpanded ? "p-3" : "py-3 px-2"}
  `}
      >
        <div
          className={`flex items-center mb-8 w-full transition-all duration-300 justify-center gap-3
  `}
        >
          {isExpanded ? (
            <>
              {/* Full Logo */}
              <div className="size-10 bg-defined-red/10 rounded-full p-1 flex items-center justify-center">
                <Image
                  src="/admin-logo.svg"
                  alt="Logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>

              <span className="whitespace-nowrap font-semibold text-gray-800 transition-all duration-300">
                Yoga Path CRM
              </span>
            </>
          ) : (
            <div className="size-10 bg-defined-red/10 rounded-full p-1 flex items-center justify-center">
              <Image
                src="/admin-logo.svg"
                alt="Logo"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
          )}
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-2 flex-1">
          {menu.slice(0, 5).map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isExpanded={isExpanded}
            />
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto flex flex-col gap-2">
          {menu.slice(5, 7).map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isExpanded={isExpanded}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({
  icon,
  label,
  href,
  isExpanded,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  isExpanded: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg
        text-black hover:text-white hover:bg-defined-red transition-colors duration-200"
    >
      <div className="min-w-5 flex items-center justify-center">{icon}</div>

      <span
        className={`whitespace-nowrap transition-all duration-300
          ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"}
        `}
      >
        {label}
      </span>
    </Link>
  );
}
