"use client";

import { forwardRef } from "react";
import { GitHubIcon, HouseIcon } from "@/components/Icons";
import { MobileNavigation } from "@/components/MobileNavigation";
import { Retrobutton } from "@/components/RetroBtn";
import { cn } from "@/utils/cn";

export const Header = forwardRef<HTMLDivElement, { className?: string }>(
  function Header({ className }, ref) {
    return (
      <div
        className={cn(
          className,
          "fixed top-4 right-4 left-4 z-40 mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 transition sm:right-6 sm:left-6 sm:px-6 lg:right-8 lg:left-8 lg:z-30 lg:px-8"
        )}
        ref={ref}
      >
        <Retrobutton
          aria-label="Home"
          className="hidden items-center lg:flex"
          href="/"
        >
          <HouseIcon className="h-4 w-4 fill-gameboy-900 transition group-hover:fill-gameboy-900" />
          Home
        </Retrobutton>

        <div className="flex items-center gap-5 lg:hidden">
          <MobileNavigation />
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden min-[416px]:contents">
            <Retrobutton
              href="https://github.com/educlopez/gamedev"
              rel="noopener noreferrer"
              target="_blank"
            >
              <GitHubIcon className="h-5 w-5 fill-gameboy-900 transition group-hover:fill-gameboy-900" />
              Github
            </Retrobutton>
          </div>
          <div className="hidden h-8 w-px bg-gameboy-900/20 md:block" />
        </div>
      </div>
    );
  }
);
