import Image from "next/image"
import Link from "next/link"
import Catridgememotest from "@/images/games/cartridge-memotest.png"
import Catridgepokemon from "@/images/games/cartridge-pokemon.png"
import Catridgetictactoe from "@/images/games/cartridge-tictactoe.png"
import Catridgewordpreminute from "@/images/games/cartridge-wordsperminute.png"

import { Text } from "@/components/Text"

import DialogBox from "./components/DialogBox"

const Games = [
  {
    id: 1,
    title: "Tic Tac Toe",
    name: "Tic Tac Toe",
    designation: "Tic Tac Toe",
    url: "/games/tictactoe",
    logo: Catridgetictactoe,
    image: Catridgetictactoe,
  },
  {
    id: 2,
    title: "Memotest",
    name: "Memotest",
    designation: "Memotest",
    url: "/games/memotest",
    logo: Catridgememotest,
    image: Catridgememotest,
  },
  {
    id: 3,
    title: "Words per minute",
    name: "Words per minute",
    designation: "Words per minute",
    url: "/games/wordsperminute",
    logo: Catridgewordpreminute,
    image: Catridgewordpreminute,
  },
  {
    id: 4,
    title: "Who is that pokemon",
    name: "Who is that pokemon",
    designation: "Who is that pokemon",
    url: "/games/whoisthatpokemon",
    logo: Catridgepokemon,
    image: Catridgepokemon,
  },
]

function Home() {
  return (
    <>
      <Text title="GameDev" as="h1" size="h1" className="fade-up-ct" />

      <div className="mt-10 flex w-full flex-1 flex-col items-center justify-center px-4 text-center">
        <DialogBox
          message="Welcome to GameDev, select and insert one game"
          className="fade-up-ct"
        />

        <div className="mt-6 grid grid-cols-2 items-center justify-center gap-5 md:grid-cols-4">
          {Games.map((game, index) => {
            return (
              <Link
                href={game.url}
                key={index}
                className="group p-3 text-gameboy-900"
              >
                <h3 className="mb-3 hidden text-sm md:block">{game.title}</h3>
                <Image
                  src={game.logo}
                  alt={game.title}
                  width={193}
                  priority
                  className="shadow-xl shadow-gameboy-400/30 transition-all hover:translate-y-3 hover:shadow-lg"
                />
                <p className="flex h-10 items-center justify-center pt-2 ">
                  <span className="hidden text-center text-sm transition group-hover:block">
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
