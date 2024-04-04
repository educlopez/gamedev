"use client"

import { forwardRef } from "react"
import Link from "next/link"
import clsx from "clsx"

import { GitHubIcon } from "@/components/Icons"
import { Logo } from "@/components/Logo"
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
      className={clsx(
        className,
        "fixed inset-x-0 top-0 z-40 flex h-20 items-center justify-between gap-12 px-4 transition sm:px-6 lg:z-30 lg:px-10"
      )}
    >
      <div
        className={clsx(
          "absolute inset-x-0 top-full h-px transition",
          (isInsideMobileNavigation || !mobileNavIsOpen) && "bg-zinc-900/7.5"
        )}
      />
      <Link href="/" aria-label="Home" className="hidden lg:block">
        <Logo className="h-6" />
      </Link>
      <div className="flex items-center gap-5 lg:hidden">
        <MobileNavigation />
      </div>
      <div className="flex items-center gap-5">
        <div className="hidden min-[416px]:contents">
          <Retrobutton
            href="https://github.com/educlopez/gamedev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon className="h-5 w-5 fill-gameboy-900 transition group-hover:fill-gameboy-900 " />{" "}
            Github
          </Retrobutton>
        </div>
        <div className="hidden md:block md:h-5 md:w-px md:bg-gameboy-900/10 " />
      </div>
    </div>
  )
})
