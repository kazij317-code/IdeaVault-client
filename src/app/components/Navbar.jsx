"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { BookOpen, Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import NavLink from "./NavLink";
import { FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
   const closeMenu = () => setMenuOpen(false);

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // put this AFTER all hooks
  if (isPending) return null;

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };
  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 backdrop-blur-md shadow-sm py-2"
          : "bg-slate-50 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <div ClassName="text-3xl text-blue-500">
            Idea Vault
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/ideas">Ideas</NavLink>

            {session && (
              <>
                <NavLink href="/add-idea">Add Idea</NavLink>
                <NavLink href="/my-ideas">My Ideas</NavLink>
                <NavLink href="/my-interactions">
                  My Interactions
                </NavLink>
              </>
            )}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {!session ? (
              <>
                <Link
                  href="/login"
                  className="font-medium text-slate-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>

                <Link href="/signup">
                  <Button
                    color="primary"
                    className="font-bold rounded-full px-8 shadow-lg shadow-blue-600/20"
                  >
                    Register
                  </Button>
                </Link>
              </>
            ) : (
              <div className="relative group">
                <button className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-100 transition-colors">
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
                    <p className="text-sm font-bold truncate max-w-24">
                      {session?.user?.name}
                    </p>
                    
                  </div>
                  <FaChevronDown/>
                </button>

                <div className="absolute right-0 top-12 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl hidden group-hover:flex flex-col py-2 z-50">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="font-bold text-sm">
                      Welcome back!
                    </p>
                    <p className="text-xs truncate text-slate-500">
                      {session?.user?.email}
                    </p>
                  </div>

                  <Link
                    href="/profile"
                    className="px-4 py-2 text-sm hover:bg-slate-100 flex items-center gap-3"
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-3 text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-100"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 space-y-2 bg-white border-b border-slate-200">
          <Link
            href="/" onClick={closeMenu}
            className="block px-4 py-3 text-base font-medium hover:bg-slate-50 rounded-xl"
          >
            Home
          </Link>

          <Link
            href="/ideas" onClick={closeMenu}
            className="block px-4 py-3 text-base font-medium hover:bg-slate-50 rounded-xl"
          >
            Ideas
          </Link>

          {session && (
            <>
              <Link
                href="/add-idea" onClick={closeMenu}
                className="block px-4 py-3 text-base font-medium hover:bg-slate-50 rounded-xl"
              >
                Add Idea
              </Link>

              <Link
                href="/my-ideas" onClick={closeMenu}
                className="block px-4 py-3 text-base font-medium hover:bg-slate-50 rounded-xl"
              >
                My Ideas
              </Link>
              <Link
                href="/my-interactions" onClick={closeMenu}
                className="block px-4 py-3 text-base font-medium hover:bg-slate-50 rounded-xl"
              >
                My Interactions
              </Link>
              <Link
                href="/profile" onClick={closeMenu}
                className="block px-4 py-3 text-base font-medium hover:bg-slate-50 rounded-xl"
              >
                My Profile
              </Link>
            </>
          )}

          <div className="pt-4 border-t mt-4">
            {!session ? (
              <div className="grid grid-cols-2 gap-4">
                <Link href="/login">
                  <Button
                    variant="bordered"
                    className="rounded-xl w-full"
                  >
                    Login
                  </Button>
                </Link>

                <Link href="/signup">
                  <Button
                    color="primary"
                    className="rounded-xl w-full"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            ) : (
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-3 text-base font-medium text-red-500 hover:bg-red-50 rounded-xl"
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