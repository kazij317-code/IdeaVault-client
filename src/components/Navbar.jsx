"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import NavLink from "./NavLink";
import { FaChevronDown } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const closeMenu = () => setIsMenuOpen(false);

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isPending) return null;

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-300 border-b ${scrolled
          ? "bg-white/70 dark:bg-[#0b0f19]/70 backdrop-blur-md shadow-sm border-slate-200/50 dark:border-gray-800/50 py-2"
          : "bg-slate-50 dark:bg-[#0b0f19] border-transparent py-4"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo Branding */}
          {/* <Link href="/" className="text-2xl font-black tracking-tight text-slate-900 dark:text-white transition-colors duration-200">
            Idea<span className="text-blue-500 dark:text-blue-400">Vault</span>
          </Link> */}

          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3 group">
              <div className="p-2.5 bg-slate-100 dark:bg-gradient-to-br dark:from-purple-600/20 dark:to-blue-600/20 rounded-xl border border-slate-200 dark:border-purple-500/30 group-hover:border-purple-400 transition-colors duration-300">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Idea<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">Vault</span>
              </span>
            </div>

          </div>
          {/* Desktop Core Menu Links */}
          <div className="hidden md:flex gap-6 lg:gap-8 items-center">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/ideas">Ideas</NavLink>
            <NavLink href="/add-idea">Add Idea</NavLink>
            <NavLink href="/my-ideas">My Ideas</NavLink>
            <NavLink href="/my-interactions">My Interactions</NavLink>
          </div>

          {/* Action Center Layout */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Variable Toggle Switch Component */}
            <ThemeToggle />

            {!session ? (
              <>
                <Link
                  href="/login"
                  className="font-semibold text-sm text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Login
                </Link>

                <Link href="/signup">
                  <Button
                    color="primary"
                    className="font-bold rounded-full px-6 shadow-md shadow-blue-600/10 dark:shadow-blue-500/5 cursor-pointer text-sm"
                  >
                    Register
                  </Button>
                </Link>
              </>
            ) : (
              /* User Session Dropdown Management Wrapper */
              <div className="relative group flex items-center">
                <button className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <Image
                    width={40}
                    height={40}
                    src={
                      session?.user?.image ||
                      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=400"
                    }
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div className="text-left hidden lg:block">
                    <p className="text-sm font-bold truncate max-w-24 text-slate-900 dark:text-white">
                      {session?.user?.name}
                    </p>
                  </div>
                  <FaChevronDown className="text-slate-700 dark:text-slate-300" />
                </button>

                {/* --------------- */}
                {/* <div>
    <button
      onClick={handleSignOut}
      className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-3 text-left"
    >
      <LogOut className="w-4 h-4" />
      Log Out
    </button>
  </div> */}
                {/* --------------- */}

                <div className="absolute right-0 top-12 w-56 bg-white dark:bg-[#0f1319] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl hidden group-hover:flex flex-col py-2 z-50 transition-colors duration-300">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800/60">
                    <p className="font-bold text-sm text-slate-900 dark:text-white">
                      Welcome back!
                    </p>
                    <p className="text-xs truncate text-slate-500 dark:text-slate-400">
                      {session?.user?.email}
                    </p>
                  </div>

                  <Link
                    href="/profile"
                    className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    My Profile
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-3 text-left w-full transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Utility Controls Dashboard Toggle Trigger */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-gray-900 text-slate-700 dark:text-gray-300 border border-transparent dark:border-gray-800 cursor-pointer transition-all"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation Block Overlay Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 space-y-1 bg-white/95 dark:bg-[#0b0f19]/95 backdrop-blur-xl border-b border-slate-200 dark:border-gray-800 transition-all duration-300 animate-in slide-in-from-top-5">
          {["Home", "Ideas", "Add Idea", "My Ideas", "My Interactions"].map((item) => {
            const endpoint = item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`;
            return (
              <Link
                key={item}
                href={endpoint}
                onClick={closeMenu}
                className="block px-4 py-3 text-base font-semibold text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800/50 rounded-xl transition-all"
              >
                {item}
              </Link>
            );
          })}

          {session && (
            <Link
              href="/profile"
              onClick={closeMenu}
              className="block px-4 py-3 text-base font-semibold text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800/50 rounded-xl transition-all"
            >
              My Profile
            </Link>
          )}

          <div className="pt-4 border-t border-slate-100 dark:border-gray-800 mt-4">
            {!session ? (
              <div className="grid grid-cols-2 gap-3">
                <Link href="/login" onClick={closeMenu}>
                  <Button
                    variant="bordered"
                    className="rounded-xl w-full font-bold border-slate-200 dark:border-gray-800 text-slate-800 dark:text-white text-sm"
                  >
                    Login
                  </Button>
                </Link>

                <Link href="/signup" onClick={closeMenu}>
                  <Button
                    color="primary"
                    className="rounded-xl w-full font-bold text-sm"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            ) : (
              <button
                onClick={() => { handleSignOut(); closeMenu(); }}
                className="block w-full text-left px-4 py-3 text-base font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all cursor-pointer"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;