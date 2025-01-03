"use client";

import Link from "next/link";
import { Logo } from "./logo";

export function Nav() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center max-w-6xl">
        <Link href="/" className="flex items-center space-x-1.5">
          <Logo />
          <span className="font-fraunces text-[#2F363F] font-black tracking-tight text-base">
            Draftpen
          </span>
        </Link>
        <div className="flex space-x-8 text-sm text-gray-600">
          <Link
            href="/changelog"
            className="hover:text-[#3478F6] transition-colors"
          >
            Changelog
          </Link>
          <a href="#" className="hover:text-[#3478F6] transition-colors">
            Support
          </a>
          <a href="#" className="hover:text-[#3478F6] transition-colors">
            Blog
          </a>
        </div>
      </div>
    </nav>
  );
}
