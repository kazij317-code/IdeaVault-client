
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
    const params = new URLSearchParams(searchParams.toString())
    if (search) {
      params.set("searchTerm", search)
    } else {
      params.delete("searchTerm")
    }
    if (category && category !== "All") {
      params.set("category", category)
    } else {
      params.delete("category")
    }
    router.push(`/ideas?${params.toString()}`)
  }

   return (
    <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl shadow-sm focus-within:ring-4 focus-within:ring-blue-600/10 focus-within:border-blue-600 transition-all overflow-hidden">

      <div className="pl-5 text-slate-400">
        <Search className="w-5 h-5" />
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search for startup ideas (e.g. AI diagnostics, smart grid...)"
        className="flex-grow min-w-0 h-14 px-4 outline-none bg-transparent text-slate-700 placeholder:text-slate-400"
      />

      <div className="h-8 w-px bg-slate-200 mx-2 shrink-0"></div>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="h-14 px-4 bg-transparent outline-none text-slate-600 font-semibold cursor-pointer border-none focus:ring-0 shrink-0 text-sm md:text-base mr-2"
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
        className="h-10 px-6 mr-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shrink-0"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;