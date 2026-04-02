"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
// import ResetPasswordForm from "./ResetPasswordForm"; // 👈 import form component

type User = {
  username: string;
  logout: () => Promise<void>;
};

const AdminHeader = ({ username, logout }: User) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false); // 👈 modal state
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { label: "Dashboard", href: "/admin/dashboard" },
  ];

  const isActive = (path: string | undefined) => pathname === path;

  const handleLogout = async () => {
    await logout();
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
      setDropdownOpen(false);
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [dropdownOpen]);

  return (
    <>
      <header className="w-full flex justify-between items-center md:px-10 px-4 bg-white border-b border-[#ccc] h-15 shadow">
        <div className="flex justify-center items-center gap-8 text-lg">
          {navLinks.map((links, index) => (
            <Link
              key={index}
              href={links.href}
              className={`${
                isActive(links.href)
                  ? "text-defined-green"
                  : "text-defined-darkbrown"
              } font-semibold`}
            >
              {links.label}
            </Link>
          ))}
        </div>

        {/* User Dropdown */}
        <div className="flex gap-2">
          <div className="flex flex-col items-end">
            <p className="text-lg font-medium text-defined-red">{username}</p>
            <p className="text-sm">Admin Role</p>
          </div>
          <div className="relative" ref={dropdownRef}>
            <Image
              src={"/svgs/user.svg"}
              alt="user"
              width={100}
              height={181}
              priority
              className="w-[10rem] md:w-[2.5rem] cursor-pointer hover:scale-110 transition-all duration-300"
              onClick={() => setDropdownOpen((prev) => !prev)}
            />

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                <div className="px-4 py-2 text-gray-800 font-semibold border-b border-gray-200">
                  {username}
                </div>

                {/* Forgot password */}
                <button
                  onClick={() => {
                    setShowResetModal(true);
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
                >
                  Forgot Password
                </button>
                
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>                
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md">
            <button
              onClick={() => setShowResetModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>
            {/* <ResetPasswordForm /> */}
            Reset password division has not been added yet!
          </div>
        </div>
      )}
    </>
  );
};

export default AdminHeader;
