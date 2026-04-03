"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { BiCloudUpload } from "react-icons/bi";
import { createGallery } from "@/actions/gallery";
import { toast } from "react-toastify";

const GalleryForm = ({ closeModal }: { closeModal: () => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [state, formAction, isPending] = useActionState(createGallery, null);

  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);

      setPreview(null);
      closeModal();
    } else {
      toast.error(state.message);
       setPreview(null);
    }
  }, [state, closeModal]);

  const handleImageChange = (file: File) => {
    if (!file) {
      setPreview(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image");
        setPreview(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      setPreview(null);
      return;
    }

    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-175 max-h-[90vh] overflow-y-auto p-6 no-scrollbar">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Upload New Image</h2>

          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        <form
          action={formAction}
          className="flex flex-col gap-6"
          encType="multipart/form-data"
        >
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="font-bold">Image Title</label>

            <input
              name="title"
              placeholder="Yoga session moment"
              className="border p-2 rounded-xl border-[#E2E8F0] bg-[#F8FAFC] outline-none focus:ring ring-defined-red"
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-2">
            <label className="font-bold">Upload Image</label>

            <div className="flex items-center justify-center w-full">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 cursor-pointer hover:border-defined-red transition w-full min-h-[300px]"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <BiCloudUpload size={50} className="text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Upload Image</p>
                    <p className="text-xs text-gray-400">
                      JPG, PNG • Max 5MB
                    </p>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  name="image"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    e.target.files && handleImageChange(e.target.files[0])
                  }
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="bg-defined-red text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            {isPending ? "Uploading..." : "Upload Image"}
          </button>

          {state?.message && (
            <p className="text-sm text-center text-gray-500">{state.message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default GalleryForm;
