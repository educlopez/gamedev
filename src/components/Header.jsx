import { forwardRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { motion, useScroll, useTransform } from 'framer-motion'

import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import {
  MobileNavigation,
  useIsInsideMobileNavigation,
  useMobileNavigationStore,
} from '@/components/MobileNavigation'
import { ModeToggle } from '@/components/ModeToggle'

function TopLevelNavItem({ href, children, target, rel }) {
  return (
    <li>
      <Link
        href={href}
        target={target}
        rel={rel}
        className="text-sm leading-5 transition text-gameboy-700 hover:text-gameboy-900 dark:text-gameboy-400 dark:hover:text-gameboy-100"
      >
        {children}
      </Link>
    </li>
  )
}

export const Header = forwardRef(function Header({ className }, ref) {
  let { isOpen: mobileNavIsOpen } = useMobileNavigationStore()
  let isInsideMobileNavigation = useIsInsideMobileNavigation()

  let { scrollY } = useScroll()
  let bgOpacityLight = useTransform(scrollY, [0, 72], [0.5, 0.9])
  let bgOpacityDark = useTransform(scrollY, [0, 72], [0.2, 0.8])

  return (
    <motion.div
      ref={ref}
      className={clsx(
        className,
        'fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:z-30 lg:px-8',
        !isInsideMobileNavigation && 'backdrop-blur-sm dark:backdrop-blur',
        isInsideMobileNavigation
          ? 'bg-gameboy-400 dark:bg-gameboy-900'
          : 'bg-gameboy-400/[var(--bg-opacity-light)] dark:bg-gameboy-900/[var(--bg-opacity-dark)]'
      )}
      style={{
        '--bg-opacity-light': bgOpacityLight,
        '--bg-opacity-dark': bgOpacityDark,
      }}
    >
      <div
        className={clsx(
          'absolute inset-x-0 top-full h-px transition',
          (isInsideMobileNavigation || !mobileNavIsOpen) &&
            'bg-zinc-900/7.5 dark:bg-white/7.5'
        )}
      />
      <Link href="/" aria-label="Home" className="hidden lg:block">
        <Logo className="h-6" />
      </Link>
      <div className="flex items-center gap-5 lg:hidden">
        <MobileNavigation />
        <Link href="/" aria-label="Home">
          <Logo className="h-6" />
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <nav className="hidden md:block">
          <ul role="list" className="flex items-center gap-8">
            <TopLevelNavItem href="/games/tictactoe">TicTacToe</TopLevelNavItem>
            <TopLevelNavItem href="/games/memotest">Memotest</TopLevelNavItem>
            <TopLevelNavItem href="/games/wordsperminute">
              Words per minute
            </TopLevelNavItem>
            <TopLevelNavItem href="/games/whoisthatpokemon">
              Who&apos;s that pokemon
            </TopLevelNavItem>
          </ul>
        </nav>
        <div className="hidden min-[416px]:contents">
          <Button
            href="https://github.com/educlopez/tic-tac-toe"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </Button>
        </div>
        <div className="hidden md:block md:h-5 md:w-px md:bg-gameboy-900/10 md:dark:bg-gameboy-100/15" />
        <div className="flex gap-4">
          <ModeToggle />
        </div>
      </div>
    </motion.div>
  )
})
