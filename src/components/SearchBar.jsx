"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("searchTerm") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (search) {
      params.set("searchTerm", search);
    } else {
      params.delete("searchTerm");
    }

    if (category && category !== "All") {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    router.push(`/ideas?${params.toString()}`);
  };

  return (
    <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white dark:bg-[#0f1319] border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-sm focus-within:ring-4 focus-within:ring-blue-600/10 dark:focus-within:ring-purple-500/10 focus-within:border-blue-600 dark:focus-within:border-purple-500 transition-all overflow-hidden">

      <div className="flex items-center w-full sm:w-auto">
        <div className="pl-4 sm:pl-5 text-slate-400 dark:text-slate-500">
          <Search className="w-5 h-5" />
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search for startup ideas (e.g. AI diagnostics, smart grid...)"
          className="flex-grow min-w-0 h-12 sm:h-14 px-4 outline-none bg-transparent text-slate-700 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm sm:text-base"
        />
      </div>

      <div className="w-full h-px sm:h-8 sm:w-px bg-slate-200 dark:bg-slate-800/60 mx-0 sm:mx-2"></div>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full sm:w-auto h-12 sm:h-14 px-4 bg-transparent outline-none text-slate-600 dark:text-slate-300 font-semibold cursor-pointer border-none focus:ring-0 shrink-0 text-sm md:text-base [&>option]:bg-white [&>option]:text-slate-900 dark:[&>option]:bg-[#0f1319] dark:[&>option]:text-white"
      >
        <option value="All">All Categories</option>
        <option value="Tech">Tech</option>
        <option value="AI">AI</option>
        <option value="Health">Health</option>
        <option value="Education">Education</option>
        <option value="Finance">Finance</option>
        <option value="Productivity">Productivity</option>
      </select>

      <button
        onClick={handleSearch}
        className="h-12 sm:h-10 w-[calc(100%-1rem)] sm:w-auto mx-2 mb-2 sm:mb-0 sm:mr-2 px-6 rounded-xl text-white font-semibold bg-gradient-to-r from-[#2b56f5] via-[#633df4] to-[#a624e5] hover:opacity-95 transition-opacity shrink-0 cursor-pointer"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;