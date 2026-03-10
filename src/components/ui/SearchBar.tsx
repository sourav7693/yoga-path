"use client";
import { useState } from "react";

export default function SearchBar({ placeholder, onSearch }:  {
  placeholder?: string;
  onSearch: (query: string) => void;
}) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || "Search..."}
        className="border px-3 py-2 rounded w-full"
      />

      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        Search
      </button>
    </form>
  );
}
