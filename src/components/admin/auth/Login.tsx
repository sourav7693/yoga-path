"use client";
import { login } from "@/actions/auth";
import Image from "next/image"
import Link from "next/link";
import { useActionState, useState } from "react";
import { sendWhatsappOtp, verifyWhatsappOtp } from "@/actions/auth";
import { IoLockOpenOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";

type LoginState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string>;
};

const Login = () => {
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);

    const [state, action, pending] = useActionState<LoginState, FormData>(
      async (_prevState, formData) => {
        return await login(formData);
      },
      { success: false, message: "", errors: {} },
    ); 

 const handleSendOtp = async () => {
   setError("");

   const formData = new FormData();
   formData.append("mobile", mobile);

   const res = await sendWhatsappOtp(formData);

   if (!res.success) {
     setError(res.message || "Something went wrong");
     return;
   }

   setStep("otp");

   // start 10 min timer
   setCooldown(600);

   const timer = setInterval(() => {
     setCooldown((prev) => {
       if (prev <= 1) {
         clearInterval(timer);
         return 0;
       }
       return prev - 1;
     });
   }, 1000);
 };

 const handleVerifyOtp = async () => {
   const formData = new FormData();
   formData.append("mobile", mobile);
   formData.append("otp", otp);

   const res = await verifyWhatsappOtp(formData);

   if (!res.success) {
     setError(res.message);
     return;
   }

   setShowOtpModal(false);
 };

 const changeNumber = () => {
   setStep("mobile");
   setOtp("");
   setCooldown(0);
 };
  return (
    <div className="bg-white flex flex-col gap-6 w-[30%] items-center justify-center p-4 rounded-2xl shadow-2xl">
      <div className="size-10 bg-defined-red/10 rounded-full p-1 flex items-center justify-center">
        <Image
          src="/admin-logo.svg"
          alt="Login"
          width={10}
          height={10}
          className="object-contain size-6"
        />
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-semibold">Yoga Path</h1>
        <p className="text-sm">Admin Dashboard Access</p>
      </div>

      <form action={action} className="flex flex-col gap-4 w-full px-2">
        <label htmlFor="email">Email Address</label>
        <div className="flex gap-2 items-center justify-start border border-gray-200 rounded-2xl px-2">
          <MdOutlineMail />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="admin@yogasiliguri.com"
            className=" p-1 outline-none w-full"
          />
        </div>
        {state.errors?.email && (
          <p className="text-defined-red text-sm">{state.errors.email}</p>
        )}
        <label htmlFor="email">Password</label>
        <div className="flex gap-2 items-center justify-start border border-gray-200 rounded-2xl px-2">
          <IoLockOpenOutline />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            className=" p-1 outline-none w-full"
          />
        </div>
        {state.errors?.password && (
          <p className="text-defined-red text-sm">{state.errors.password}</p>
        )}

        <button
          disabled={pending}
          type="submit"
          className="bg-defined-red text-white text-lg rounded-lg p-2"
        >
          {pending ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="flex flex-col gap-4 items-center justify-center">
        <button onClick={() => setShowOtpModal(true)}>
          Login With Whatsapp
        </button>
        <Link href="/" className="text-defined-red">
          🠔 Return to Website
        </Link>
        <Link href="/signup" className="text-defined-red">
          Sign Up Admin
        </Link>
      </div>
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[380px] rounded-2xl p-6 shadow-xl animate-[scaleIn_.25s_ease]">
            <h2 className="text-xl font-semibold text-center mb-4">
              Login via WhatsApp
            </h2>

            {step === "mobile" && (
              <>
                <input
                  type="tel"
                  placeholder="Enter Mobile Number"
                  className="border border-gray-200 outline-none w-full p-2 rounded-lg"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <button
                  onClick={handleSendOtp}
                  className="bg-defined-black text-white w-full mt-4 p-2 rounded-lg"
                >
                  Send OTP
                </button>
              </>
            )}

            {step === "otp" && (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="border border-gray-200 outline-none w-full p-2 rounded-lg"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <button
                  onClick={handleVerifyOtp}
                  className="bg-defined-red text-white w-full mt-4 p-2 rounded-lg"
                >
                  Verify OTP
                </button>

                <div className="flex justify-between mt-3 text-sm">
                  <button onClick={changeNumber} className="text-blue-600">
                    Change Number
                  </button>

                  {cooldown > 0 && (
                    <span className="text-gray-500">
                      {Math.floor(cooldown / 60)}:
                      {(cooldown % 60).toString().padStart(2, "0")}
                    </span>
                  )}
                </div>
              </>
            )}

            <button
              onClick={() => setShowOtpModal(false)}
              className="text-defined-brown text-sm mt-4 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login