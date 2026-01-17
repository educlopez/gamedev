"use client";

import { forwardRef } from "react";
import { GitHubIcon, HouseIcon } from "@/components/Icons";
import {
  MobileNavigation,
  useIsInsideMobileNavigation,
  useMobileNavigationStore,
} from "@/components/MobileNavigation";
import { Retrobutton } from "@/components/RetroBtn";
import { cn } from "@/utils/cn";

export const Header = forwardRef<HTMLDivElement, { className?: string }>(
  function Header({ className }, ref) {
    const { isOpen: mobileNavIsOpen } = useMobileNavigationStore();
    const isInsideMobileNavigation = useIsInsideMobileNavigation();

    return (
      <div
        className={cn(
          className,
          "fixed inset-x-0 top-4 z-40 flex h-20 items-center justify-between gap-12 px-4 transition sm:px-6 lg:z-30 lg:px-10"
        )}
        ref={ref}
      >
        <div
          className={cn(
            "absolute inset-x-0 top-full h-px transition",
            (isInsideMobileNavigation || !mobileNavIsOpen) && "bg-zinc-900/7.5"
          )}
        />
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
        <div className="flex items-center">
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
          <div className="hidden md:block md:h-5 md:w-px md:bg-gameboy-900/10" />
        </div>
      </div>
    );
  }
);
