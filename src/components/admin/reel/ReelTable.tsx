"use client";

import { ReelDocument } from "@/models/Reel";
import { useRef, useState } from "react";
import { FiCopy } from "react-icons/fi";
import { toast } from "react-toastify";
import { deleteReel } from "@/actions/reel";
import { useActionState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";

const ReelTable = ({ reels }: { reels: ReelDocument[]}) => {
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const [playing, setPlaying] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [reelToDelete, setReelToDelete] = useState<ReelDocument | null>(null);
  const [state, formAction, isPending] = useActionState(deleteReel, null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {      
      setDeleteModal(false);
      setReelToDelete(null);      
    } else {
      toast.error(state.message);
    }
  }, [state]);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);      
    } else {
      toast.error(state.message);
    }
  }, [state]);
  const togglePlay = (id: string) => {
    const video = videoRefs.current[id];
    if (!video) return;

    if (playing === id) {
      video.pause();
      setPlaying(null);
    } else {
      Object.values(videoRefs.current).forEach((v) => v?.pause());
      video.play();
      setPlaying(id);
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied");
  };

  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <>
      <div className="grid grid-cols-4 gap-6">
        {reels.map((reel: ReelDocument) => (
          <div
            key={reel.reelId}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
          >
            {/* Video */}
            <div
              onClick={() => togglePlay(reel.reelId)}
              className="relative aspect-[9/16] cursor-pointer bg-black"
            >
              <video
                ref={(el) => {
                  videoRefs.current[reel.reelId] = el;
                }}
                src={reel.videoUrl}
                className="w-full h-full object-cover"
              />

              {/* format badge */}
              <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                MP4
              </div>

              {/* play icon */}
              {playing !== reel.reelId && (
                <div className="absolute inset-0 flex items-center justify-center text-white text-3xl bg-black/20">
                  ▶
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <p className="font-bold text-sm truncate text-defined-black">
                {reel.reelName}
              </p>

              <p className="text-xs text-defined-red">
                {formatDate(reel.createdAt)}
              </p>

              <div className="flex gap-2">
                {/* Copy URL */}
                <button
                  onClick={() => copyUrl(reel.videoUrl)}
                  className="flex items-center justify-center gap-2 w-full text-sm bg-gray-100 hover:bg-gray-200 text-red-500 py-2 rounded-lg"
                >
                  <FiCopy size={14} />
                  Copy URL
                </button>

                {/* Delete */}
                <button
                  type="submit"
                  disabled={isPending}
                  onClick={() => {
                    setReelToDelete(reel);
                    setDeleteModal(true);
                  }}
                  className="flex items-center justify-center bg-red-100 hover:bg-red-200 text-red-600 px-3 rounded-lg"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {deleteModal && reelToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl w-100 shadow-lg">
            <h2 className="text-xl font-bold text-defined-black mb-2">
              Delete Reel
            </h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{reelToDelete.reelName}</span> ?
            </p>

            <form action={formAction} className="flex justify-end gap-3">
              <input type="hidden" name="reelId" value={reelToDelete.reelId} />

              <button
                type="button"
                onClick={() => {
                  setDeleteModal(false);
                  setReelToDelete(null);
                }}
                className="px-4 py-2 border rounded-2xl bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="px-4 py-2 bg-red-600 text-white rounded-2xl"
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ReelTable;
