"use client";
import { signup } from "@/actions/auth";
import Image from "next/image"
import Link from "next/link";
import { useActionState } from "react";
import { IoLockOpenOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
type SignupState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};
const Login = () => {
    const [state, action, pending] = useActionState<SignupState, FormData>(
      async (_prevState, formData) => {
        return await signup(formData);
      },
      { success: false, message: "", errors: {} },
    );

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
        <label htmlFor="name">Username</label>
        <div className="flex gap-2 items-center justify-start border border-gray-200 rounded-2xl px-2">
          <MdOutlineMail />
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Naruto Uzumaki"
            className=" p-1 outline-none w-full"
          />
        </div>
        {state?.message && <p className="text-defined-red">{state.message}</p>}
        <label htmlFor="name">Mobile</label>
        <div className="flex gap-2 items-center justify-start border border-gray-200 rounded-2xl px-2">
          <MdOutlineMail />
          <input
            type="tel"
            name="mobile"
            id="mobile"
            placeholder="9174XXXXXXX"
            className=" p-1 outline-none w-full"
          />
        </div>
        {state?.message && <p className="text-defined-red">{state.message}</p>}
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
        {state?.message && <p className="text-defined-red">{state.message}</p>}
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
        {state?.message && (
          <div className="text-defined-red">{state.message}</div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="bg-defined-red text-white text-lg rounded-lg p-2"
        >
          {pending ? "Signing up..." : "Signup New Admin"}
        </button>
      </form>

      <div className="flex flex-col gap-4 items-center justify-center">
        <Link href="/" className="text-defined-red">
          🠔 Return to Website
        </Link>
        <Link href="/login" className="text-defined-red">
          🠔 Return to Login
        </Link>
      </div>
    </div>
  );
}

export default Login