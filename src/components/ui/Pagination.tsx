"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pagination({
  pagination,
  mode,
}: {
  pagination: {
    totalCount: number;
    currentPage: number;
    limit: number;
    totalPages: number;
  };
  mode?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) params.delete(key);
      else params.set(key, value);
    });

    router.push(`?${params.toString()}`);
  };

  const changePage = (page: number) => {
    updateParams({
      page: page === 1 ? null : page.toString(),
    });
  };

  const changeLimit = (limit: number) => {
    updateParams({
      limit: limit === 10 ? null : limit.toString(),
      page: null,
    });
  };

  const changeCategory = (category: string) => {
    updateParams({
      category: category === "all" ? null : category,
      page: null,
    });
  };

  const changeSearch = (value: string) => {
    updateParams({
      search: value || null,
      page: null,
    });
  };

  return (
    <div className="flex justify-between gap-4 mt-4 bg-[#F8FAFC] p-4 rounded-xl">
      {/* FILTERS */}
      <div className="flex items-center justify-between gap-4">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-4">
          {/* Rows per page */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Rows per page:</span>

            <select
              value={pagination.limit}
              onChange={(e) => changeLimit(Number(e.target.value))}
              className="border border-gray-200 rounded-lg px-2 py-1"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          {/* Category filter */}
          {mode && (
            <select
              defaultValue={searchParams.get("category") || "all"}
              onChange={(e) => changeCategory(e.target.value)}
              className="border border-gray-200 rounded-lg px-2 py-1"
            >
              <option value="all">All Categories</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          )}

          {/* Search */}
          <input
            type="text"
            placeholder="Search..."
            defaultValue={searchParams.get("search") || ""}
            onChange={(e) => changeSearch(e.target.value)}
            className="border border-gray-200 outline-none rounded-lg px-3 py-1"
          />
        </div>

        {/* PAGE INFO */}
        <div className="text-sm text-gray-600">
          Page {pagination.currentPage} of {pagination.totalPages}
        </div>
      </div>

      {/* PAGE CONTROLS */}
      <div className="flex items-center justify-center gap-2">
        <button
          disabled={pagination.currentPage === 1}
          onClick={() => changePage(pagination.currentPage - 1)}
          className="p-2 border border-gray-200 rounded-full disabled:opacity-40"
        >
          <FiChevronLeft />
        </button>

        {Array.from({ length: pagination.totalPages }, (_, i) => {
          const page = i + 1;

          return (
            <button
              key={page}
              onClick={() => changePage(page)}
              className={`px-3 py-1 border border-gray-200 rounded-full ${
                page === pagination.currentPage
                  ? "bg-defined-red text-white"
                  : ""
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          disabled={pagination.currentPage === pagination.totalPages}
          onClick={() => changePage(pagination.currentPage + 1)}
          className="p-2 border border-gray-200 rounded-full disabled:opacity-40"
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}
