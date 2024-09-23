import Image from "next/image"
import Link from "next/link"
import Catridgememotest from "@/images/games/cartridge-memotest.png"
import Catridgepokemon from "@/images/games/cartridge-pokemon.png"
import Catridgetictactoe from "@/images/games/cartridge-tictactoe.png"
import Catridgewordle from "@/images/games/cartridge-wordle.png"
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
  {
    id: 5,
    title: "Wordle",
    name: "Wordle",
    designation: "Wordle",
    url: "/games/wordle",
    logo: Catridgewordle,
    image: Catridgewordle,
  },
]

function Home() {
  return (
    <>
      <Text title="GameDev" as="h1" size="h1" className="fade-up-ct" />

      <div className="flex flex-col flex-1 justify-center items-center px-4 mt-10 w-full text-center">
        <DialogBox
          as="p"
          className="fade-up-ct"
          message="Welcome to GameDev, select and insert one game"
        />

        <div className="grid grid-cols-2 gap-5 justify-center items-center mt-6 md:grid-cols-3">
          {Games.map((game, index) => {
            return (
              <Link
                href={game.url}
                key={index}
                className="p-3 group text-gameboy-900"
              >
                <h3 className="hidden mb-3 text-sm md:block">{game.title}</h3>
                <Image
                  src={game.logo}
                  alt={game.title}
                  width={193}
                  priority
                  className="shadow-xl transition-all shadow-gameboy-400/30 hover:translate-y-3 hover:shadow-lg"
                />
                <p className="flex justify-center items-center pt-2 h-10">
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
