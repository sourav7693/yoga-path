"use client";

import { useState, useEffect } from "react";
import { FiCopy, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { deleteGallery } from "@/actions/gallery";
import { useActionState } from "react";

interface GalleryDocument {
  galleryId: string;
  title: string;
  imageUrl: string;
  createdAt: Date;
}

const GalleryTable = ({ gallery }: { gallery: GalleryDocument[] }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<GalleryDocument | null>(
    null,
  );

  const [state, formAction, isPending] = useActionState(deleteGallery, null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      setDeleteModal(false);
      setItemToDelete(null);
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

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
        {gallery.map((item) => (
          <div
            key={item.galleryId}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
          >
            {/* Image */}
            <div className="relative bg-gray-100">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-auto object-cover"
              />

              {/* format badge */}
              <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                IMG
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <p className="font-bold text-sm truncate text-defined-black">
                {item.title || "Untitled"}
              </p>

              <p className="text-xs text-defined-red">
                {formatDate(item.createdAt)}
              </p>

              <div className="flex gap-2">
                {/* Copy URL */}
                <button
                  onClick={() => copyUrl(item.imageUrl)}
                  className="flex items-center justify-center gap-2 w-full text-sm bg-gray-100 hover:bg-gray-200 text-red-500 py-2 rounded-lg"
                >
                  <FiCopy size={14} />
                  Copy URL
                </button>

                {/* Delete */}
                <button
                  disabled={isPending}
                  onClick={() => {
                    setItemToDelete(item);
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

      {/* Delete Modal */}
      {deleteModal && itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl w-100 shadow-lg">
            <h2 className="text-xl font-bold text-defined-black mb-2">
              Delete Image
            </h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {itemToDelete.title || "this image"}
              </span>
              ?
            </p>

            <form action={formAction} className="flex justify-end gap-3">
              <input
                type="hidden"
                name="galleryId"
                value={itemToDelete.galleryId}
              />

              <button
                type="button"
                onClick={() => {
                  setDeleteModal(false);
                  setItemToDelete(null);
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

export default GalleryTable;
