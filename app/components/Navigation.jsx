import Link from "next/link"

import { Text } from "@/components/Text"

import { Retrobutton } from "./RetroBtn"

function TopLevelNavItem({ href, children, target, rel }) {
  return (
    <li className="md:hidden">
      <Link
        href={href}
        className="block py-1 text-sm transition text-gameboy-700 hover:text-gameboy-900"
        target={target}
        rel={rel}
      >
        <Text as="p" title={children}>
          {children}
        </Text>
      </Link>
    </li>
  )
}

export function Navigation(props) {
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
            Github
          </Retrobutton>
        </li>
      </ul>
    </nav>
  )
}
