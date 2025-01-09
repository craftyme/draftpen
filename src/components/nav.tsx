"use client";

import Link from "next/link";
import { Logo } from "./logo";
import config from "@/config/config";

export function Nav() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center max-w-6xl">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
          <span className="font-fraunces text-[#2F363F] font-black tracking-tight">
            {config.nav.title}
          </span>
        </Link>
        <div className="flex space-x-8 text-sm text-gray-600">
          <Link
            href="/changelog"
            className="hover:text-[#3478F6] transition-colors"
          >
            Changelog
          </Link>
          <a
            href="mailto:support@draftpen.com"
            className="hover:text-[#3478F6] transition-colors"
          >
            Support
          </a>
        </div>
      </div>
    </nav>
  );
}
