"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { BiCloudUpload } from "react-icons/bi";
import { createReel } from "@/actions/reel";
import { toast } from "react-toastify";

const ReelForm = ({ closeModal }: { closeModal: () => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
    const [state, formAction, isPending] = useActionState(createReel, null);
  
  const [preview, setPreview] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);

      setPreview(null);
      setPlaying(false);

      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = "";
      }

      closeModal();
    } else {
      toast.error(state.message);
    }
  }, [state, closeModal]);

const handleVideoChange = (file: File) => {
  if (!file) return;

  if (!file.type.startsWith("video/")) {
    toast.error("Please upload a valid video");
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    toast.error("Video must be less than 10MB");
    return;
  }

  setPreview(URL.createObjectURL(file));
};

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setPlaying(!playing);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-175 max-h-[90vh] overflow-y-auto p-6 no-scrollbar">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Upload New Reel</h2>

          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        <form action={formAction} className="flex flex-col gap-6" encType="multipart/form-data">
          {/* Reel Title */}

          <div className="flex flex-col gap-2">
            <label className="font-bold">Reel Title</label>

            <input
              name="reelName"
              placeholder="Yoga breathing technique"
              className="border p-2 rounded-xl border-[#E2E8F0] bg-[#F8FAFC] outline-none focus:ring ring-defined-red"
            />
          </div>

          {/* Video Upload */}

          <div className="flex flex-col gap-2">
            <label className="font-bold">Reel Video</label>
            <div className="flex items-center justify-center">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 cursor-pointer hover:border-defined-red transition aspect-[9/16] w-[300px]"
              >
                {preview ? (
                  <>
                    <video
                      ref={videoRef}
                      src={preview}
                      className="absolute inset-0 w-full h-full object-cover rounded-xl"
                    />

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                      }}
                      className="absolute bottom-3 left-3 bg-black/60 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      {playing ? "Pause" : "Play"}
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center">
                    <BiCloudUpload size={50} className="text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Upload Reel Video</p>
                    <p className="text-xs text-gray-400">
                      MP4 • Max 10MB • 9:16 ratio
                    </p>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  name="video"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) =>
                    e.target.files && handleVideoChange(e.target.files[0])
                  }
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="bg-defined-red text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            {isPending ? "Uploading..." : "Upload Reel"}
          </button>

          {state?.message && (
            <p className="text-sm text-center text-gray-500">{state.message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ReelForm;
