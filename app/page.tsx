import { Text } from "@/components/Text";
import Catridgememotest from "@/images/games/cartridge-memotest.png";
import Catridgepokemon from "@/images/games/cartridge-pokemon.png";
import Catridgetictactoe from "@/images/games/cartridge-tictactoe.png";
import Catridgewordle from "@/images/games/cartridge-wordle.png";
import Catridgewordpreminute from "@/images/games/cartridge-wordsperminute.png";

import { CartridgeSlot } from "./components/CartridgeSlot";
import DialogBox from "./components/DialogBox";

type Game = {
  id: number;
  title: string;
  name: string;
  designation: string;
  url: string;
  logo: typeof Catridgetictactoe;
  image: typeof Catridgetictactoe;
};

const Games: Game[] = [
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
];

function Home() {
  return (
    <>
      <Text as="h1" className="fade-up-ct" size="h1" title="GameDev" />

      <div className="mt-10 flex w-full flex-1 flex-col items-center justify-center px-4 text-center">
        <DialogBox
          as="p"
          className="fade-up-ct"
          message="Welcome to GameDev, select and insert one game"
        />

        <div className="fade-up-ct mt-8 w-full max-w-4xl">
          <div className="framed primary">
            <div className="grid grid-cols-2 items-center justify-center gap-4 md:grid-cols-3 lg:grid-cols-5">
              {Games.map((game, index) => {
                return (
                  <CartridgeSlot game={game} index={index} key={game.id} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
