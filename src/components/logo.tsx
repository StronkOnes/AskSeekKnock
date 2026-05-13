"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/landing"
      className={cn("flex items-center justify-center p-2 group", className)}
      suppressHydrationWarning
    >
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <img
          src="/A.S.K. - Sans.png"
          alt="A.S.K. Logo"
          width="96"
          height="96"
          className="relative drop-shadow-sm transition-transform duration-blocksy group-hover:scale-105"
        />
      </div>
    </Link>
  );
}