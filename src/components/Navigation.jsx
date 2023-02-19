import { useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { AnimatePresence, motion, useIsPresent } from 'framer-motion'

import { remToPx } from '@/lib/remToPx'
import { Button } from '@/components/Button'
import { useIsInsideMobileNavigation } from '@/components/MobileNavigation'

function useInitialValue(value, condition = true) {
  let initialValue = useRef(value).current
  return condition ? initialValue : value
}

function TopLevelNavItem({ href, children, target, rel }) {
  return (
    <li className="md:hidden">
      <Link
        href={href}
        className="block py-1 text-sm transition text-gameboy-700 hover:text-gameboy-900 dark:text-gameboy-400 dark:hover:text-gameboy-400"
        target={target}
        rel={rel}
      >
        {children}
      </Link>
    </li>
  )
}

function NavLink({ href, tag, active, isAnchorLink = false, children }) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'flex justify-between gap-2 py-1 pr-3 text-sm transition',
        isAnchorLink ? 'pl-7' : 'pl-4',
        active
          ? 'text-gameboy-900 dark:text-gameboy-400'
          : 'text-zinc-600 hover:text-gameboy-900 dark:text-zinc-400 dark:hover:text-gameboy-400'
      )}
    >
      <span className="truncate">{children}</span>
    </Link>
  )
}

function VisibleSectionHighlight({ group, pathname }) {
  let isPresent = useIsPresent()
  let firstVisibleSectionIndex = Math.max(
    0,
    [{ id: '_top' }, ...sections].findIndex(
      (section) => section.id === visibleSections[0]
    )
  )
  let itemHeight = remToPx(2)
  let height = isPresent
    ? Math.max(1, visibleSections.length) * itemHeight
    : itemHeight
  let top =
    group.links.findIndex((link) => link.href === pathname) * itemHeight +
    firstVisibleSectionIndex * itemHeight

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"
      style={{ borderRadius: 8, height, top }}
    />
  )
}

function ActivePageMarker({ group, pathname }) {
  let itemHeight = remToPx(2)
  let offset = remToPx(0.25)
  let activePageIndex = group.links.findIndex((link) => link.href === pathname)
  let top = offset + activePageIndex * itemHeight

  return (
    <motion.div
      layout
      className="absolute w-px h-6 left-2 bg-emerald-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      style={{ top }}
    />
  )
}

export function Navigation(props) {
  return (
    <nav {...props}>
      <ul role="list">
        <TopLevelNavItem href="/games/tictactoe">TicTacToe</TopLevelNavItem>
        <TopLevelNavItem href="/games/memotest">Memotest</TopLevelNavItem>
        <TopLevelNavItem href="/games/wordsperminute">
          Words per minute
        </TopLevelNavItem>
        <TopLevelNavItem href="/games/whoisthatpokemon">
          Who&apos;s that pokemon
        </TopLevelNavItem>

        <li className="sticky bottom-0 z-10 mt-6 min-[416px]:hidden">
          <Button
            href="https://github.com/educlopez/gamedev"
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
          >
            Github
          </Button>
        </li>
      </ul>
    </nav>
  )
}
