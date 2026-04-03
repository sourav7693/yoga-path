"use client";

import { useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import GalleryForm from "./GalleryForm";

const GalleryHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <div className="flex justify-between">
          <h1 className="text-3xl font-extrabold text-defined-black">
            Gallery Management
          </h1>

          <button
            onClick={() => setOpen(true)}
            className="text-white bg-defined-red px-4 rounded-3xl"
          >
            <IoMdCloudUpload className="inline text-2xl" />
            Upload Image
          </button>
        </div>

        <p className="text-defined-brown">
          Manage your gallery images from one place
        </p>
      </div>

      {open && <GalleryForm closeModal={() => setOpen(false)} />}
    </>
  );
};

export default GalleryHeader;
