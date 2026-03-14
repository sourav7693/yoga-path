"use client";
import { useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import ReelForm from "./ReelForm";

const ReelHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div>
        <div className="flex justify-between">
          <h1 className="text-3xl font-extrabold text-defined-black">
            Reel Management
          </h1>
          <button
            onClick={() => setOpen(true)}
            className="text-white bg-defined-red px-4 rounded-3xl"
          >
            <IoMdCloudUpload className="inline text-2xl" />
            Upload Reel
          </button>{" "}
        </div>
        <p className="text-defined-brown">
          Manage your reels and videos from one place
        </p>
      </div>
      {open && <ReelForm closeModal={() => setOpen(false)} />}
    </>
  );
};

export default ReelHeader;
