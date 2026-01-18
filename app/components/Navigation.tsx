import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Text } from "@/components/Text";

import { GitHubIcon } from "./Icons";
import { Retrobutton } from "./RetroBtn";

type TopLevelNavItemProps = {
  href: string;
  children: ReactNode;
  target?: string;
  rel?: string;
};

function TopLevelNavItem({
  href,
  children,
  target,
  rel,
}: TopLevelNavItemProps) {
  return (
    <li className="md:hidden">
      <Link
        className="block w-full rounded-lg border-4 border-gameboy-900 bg-gameboy-100 px-4 py-3 font-bold text-gameboy-900 shadow-[inset_2px_2px_0_var(--color-gameboy-200),inset_-2px_-2px_0_var(--color-gameboy-700)] transition-all hover:bg-gameboy-200 hover:shadow-[inset_2px_2px_0_var(--color-gameboy-400),inset_-2px_-2px_0_var(--color-gameboy-700)] focus:outline-none focus:ring-2 focus:ring-gameboy-400 focus:ring-offset-2 active:shadow-[inset_1px_1px_0_var(--color-gameboy-700),inset_-1px_-1px_0_var(--color-gameboy-200)]"
        href={href}
        rel={rel}
        target={target}
      >
        <Text as="p" title={String(children)}>
          {children}
        </Text>
      </Link>
    </li>
  );
}

export function Navigation(props: ComponentPropsWithoutRef<"nav">) {
  return (
    <nav {...props}>
      <ul className="flex flex-col items-center gap-10">
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
            rel="noopener noreferrer"
            target="_blank"
            variant="secondary"
          >
            <GitHubIcon className="h-5 w-5 fill-gameboy-900 transition group-hover:fill-gameboy-900" />
            Github
          </Retrobutton>
        </li>
      </ul>
    </nav>
  );
}
