import Image from "next/image"
import Link from "next/link"
import Catridgememotest from "@/images/games/cartridge-memotest.png"
import Catridgepokemon from "@/images/games/cartridge-pokemon.png"
import Catridgetictactoe from "@/images/games/cartridge-tictactoe.png"
import Catridgewordpreminute from "@/images/games/cartridge-wordsperminute.png"

import {
  FADE_DOWN_ANIMATION_VARIANTS,
  FADE_UP_ANIMATION_VARIANTS,
} from "@/lib/constants.js"
import { Text } from "@/components/Text"

const Games = [
  {
    title: "Tic Tac Toe",
    url: "/games/tictactoe",
    logo: Catridgetictactoe,
  },
  {
    title: "Memotest",
    url: "/games/memotest",
    logo: Catridgememotest,
  },
  {
    title: "Words per minute",
    url: "/games/wordsperminute",
    logo: Catridgewordpreminute,
  },
  {
    title: "Who is that pokemon",
    url: "/games/whoisthatpokemon",
    logo: Catridgepokemon,
  },
]

function Home() {
  return (
    <>
      <div variants={FADE_DOWN_ANIMATION_VARIANTS}>
        <Text title="GameDev" as="h1" size="h1" />
      </div>
      <div className="flex flex-col items-center justify-center flex-1 w-full px-4 mt-10 text-center">
        <div variants={FADE_UP_ANIMATION_VARIANTS}>
          <Text title="Insert Game" as="p" size="medium" />
        </div>
        <div className="grid items-center justify-center grid-cols-2 gap-5 mt-6 md:grid-cols-4">
          {Games.map((game, index) => {
            return (
              <Link
                href={game.url}
                key={index}
                className="p-3 text-gameboy-900 group"
              >
                <Text
                  as="h3"
                  className="mb-3"
                  size="small"
                  title={game.title}
                />
                <Image
                  src={game.logo}
                  alt={game.title}
                  width={193}
                  priority
                  className="transition-all shadow-xl hover:shadow-lg shadow-gameboy-400/30 hover:translate-y-3"
                />
                <p className="flex items-center justify-center h-10 pt-2 ">
                  <span className="hidden text-sm text-center transition group-hover:block">
                    Insert
                  </span>
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Home
