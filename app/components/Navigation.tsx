import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Text } from '@/components/Text'

import { GitHubIcon } from './Icons'
import { Retrobutton } from './RetroBtn'

type TopLevelNavItemProps = {
  href: string
  children: ReactNode
  target?: string
  rel?: string
}

function TopLevelNavItem({ href, children, target, rel }: TopLevelNavItemProps) {
  return (
    <li className="md:hidden">
      <Link
        href={href}
        className="block py-1 text-sm text-gameboy-700 transition hover:text-gameboy-900"
        target={target}
        rel={rel}
      >
        <Text as="p" title={String(children)}>
          {children}
        </Text>
      </Link>
    </li>
  )
}

export function Navigation(props: ComponentPropsWithoutRef<'nav'>) {
  return (
    <nav {...props}>
      <ul role="list" className="flex flex-col items-center gap-10">
        <TopLevelNavItem href="/games/tictactoe">TicTacToe</TopLevelNavItem>
        <TopLevelNavItem href="/games/memotest">Memotest</TopLevelNavItem>
        <TopLevelNavItem href="/games/wordsperminute">
          Words per minute
        </TopLevelNavItem>
        <TopLevelNavItem href="/games/whoisthatpokemon">
          Who&apos;s that pokemon
        </TopLevelNavItem>

        <li className="sticky bottom-0 z-10 mt-6 min-[416px]:hidden">
          <Retrobutton
            href="https://github.com/educlopez/gamedev"
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
          >
            <GitHubIcon className="h-5 w-5 fill-gameboy-900 transition group-hover:fill-gameboy-900 " />
            Github
          </Retrobutton>
        </li>
      </ul>
    </nav>
  )
}
