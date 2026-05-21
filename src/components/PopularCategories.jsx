'use client';

import React from 'react';

export default function PopularCategories() {
  const categories = [
    {
      name: 'Tech',
      icon: (
        <svg className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2zM9 9h6v6H9V9z" />
        </svg>
      ),
      glowColor: 'group-hover:border-purple-500/40 dark:group-hover:border-purple-500/50 group-hover:shadow-[0_10px_25px_-5px_rgba(124,58,237,0.1)] dark:group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]',
    },
    {
      name: 'AI',
      icon: (
        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      glowColor: 'group-hover:border-blue-500/40 dark:group-hover:border-blue-500/50 group-hover:shadow-[0_10px_25px_-5px_rgba(37,99,235,0.1)] dark:group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]',
    },
    {
      name: 'Health',
      icon: (
        <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      glowColor: 'group-hover:border-emerald-500/40 dark:group-hover:border-emerald-500/50 group-hover:shadow-[0_10px_25px_-5px_rgba(5,150,105,0.1)] dark:group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]',
    },
    {
      name: 'Education',
      icon: (
        <svg className="w-6 h-6 text-pink-600 dark:text-pink-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      glowColor: 'group-hover:border-pink-500/40 dark:group-hover:border-pink-500/50 group-hover:shadow-[0_10px_25px_-5px_rgba(219,39,119,0.1)] dark:group-hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]',
    },
    {
      name: 'Finance',
      icon: (
        <svg className="w-6 h-6 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      glowColor: 'group-hover:border-amber-500/40 dark:group-hover:border-amber-500/50 group-hover:shadow-[0_10px_25px_-5px_rgba(217,119,6,0.1)] dark:group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]',
    },
    {
      name: 'Productivity',
      icon: (
        <svg className="w-6 h-6 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      glowColor: 'group-hover:border-cyan-500/40 dark:group-hover:border-cyan-500/50 group-hover:shadow-[0_10px_25px_-5px_rgba(8,145,178,0.1)] dark:group-hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]',
    },
  ];

  return (
    <section className="bg-slate-50 dark:bg-[#0b0f19] py-20 px-6 md:px-12 w-full text-center relative overflow-hidden transition-colors duration-300">
      {/* Background ambient radial lighting bloom - Only active during Dark Mode */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none hidden dark:block" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading Titles */}
        <div className="space-y-3 mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white transition-colors duration-300">
            Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">Categories</span>
          </h2>
          <p className="text-slate-500 dark:text-gray-400 text-sm md:text-base max-w-md mx-auto leading-relaxed transition-colors duration-300">
            Explore innovative startup concepts curated across key thriving industries.
          </p>
        </div>

        {/* Responsive Grid Setup */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`group relative flex flex-col items-center gap-4 p-6 bg-white dark:bg-gray-900/40 backdrop-blur-md border border-slate-200 dark:border-gray-800/60 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer ${category.glowColor}`}
            >
              {/* Soft inner glow gradient accent visible on element hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-500/[0.02] to-transparent dark:from-white/[0.02] dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

              {/* Icon Container block wrapper */}
              <div className="p-3.5 bg-slate-50 dark:bg-gray-900 border border-slate-100 dark:border-gray-800 rounded-xl group-hover:border-slate-200 dark:group-hover:border-gray-700 shadow-sm dark:shadow-inner transition-all duration-300">
                {category.icon}
              </div>

              {/* Text Item Label */}
              <span className="text-sm font-semibold tracking-wide text-slate-700 dark:text-gray-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-200">
                {category.name}
              </span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}