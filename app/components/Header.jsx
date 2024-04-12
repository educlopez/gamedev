"use client"

import { forwardRef } from "react"
import { cn } from "@/utils/cn"

import { GitHubIcon, HouseIcon } from "@/components/Icons"
import {
  MobileNavigation,
  useIsInsideMobileNavigation,
  useMobileNavigationStore,
} from "@/components/MobileNavigation"
import { Retrobutton } from "@/components/RetroBtn"

export const Header = forwardRef(function Header({ className }, ref) {
  let { isOpen: mobileNavIsOpen } = useMobileNavigationStore()
  const isInsideMobileNavigation = useIsInsideMobileNavigation()

  return (
    <div
      ref={ref}
      className={cn(
        className,
        "fixed inset-x-0 top-4 z-40 flex h-20 items-center justify-between gap-12 px-4 transition sm:px-6 lg:z-30 lg:px-10"
      )}
    >
      <div
        className={cn(
          "absolute inset-x-0 top-full h-px transition",
          (isInsideMobileNavigation || !mobileNavIsOpen) && "bg-zinc-900/7.5"
        )}
      />
      <Retrobutton
        href="/"
        aria-label="Home"
        className="items-center hidden lg:flex"
      >
        <HouseIcon className="w-4 h-4 transition fill-gameboy-900 group-hover:fill-gameboy-900" />
        Home
      </Retrobutton>

      <div className="flex items-center gap-5 lg:hidden">
        <MobileNavigation />
      </div>
      <div className="flex items-center">
        <div className="hidden min-[416px]:contents">
          <Retrobutton
            href="https://github.com/educlopez/gamedev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon className="w-5 h-5 transition fill-gameboy-900 group-hover:fill-gameboy-900" />
            Github
          </Retrobutton>
        </div>
        <div className="hidden md:block md:h-5 md:w-px md:bg-gameboy-900/10 " />
      </div>
    </div>
  )
})
