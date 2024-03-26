import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Catridgememotest from '@/images/games/cartridge-memotest.png'
import Catridgepokemon from '@/images/games/cartridge-pokemon.png'
import Catridgetictactoe from '@/images/games/cartridge-tictactoe.png'
import Catridgewordpreminute from '@/images/games/cartridge-wordsperminute.png'
import { motion } from 'framer-motion'
import { Text } from '@/components/Text'
import {
  FADE_DOWN_ANIMATION_VARIANTS,
  FADE_UP_ANIMATION_VARIANTS,
} from '@/lib/constants.js'

const Games = [
  {
    title: 'Tic Tac Toe',
    url: '/games/tictactoe',
    logo: Catridgetictactoe,
  },
  {
    title: 'Memotest',
    url: '/games/memotest',
    logo: Catridgememotest,
  },
  {
    title: 'Words per minute',
    url: '/games/wordsperminute',
    logo: Catridgewordpreminute,
  },
  {
    title: 'Who is that pokemon',
    url: '/games/whoisthatpokemon',
    logo: Catridgepokemon,
  },
]

function Home() {
  return (
    <>
      <Head>
        <title>GameDev</title>
        <meta
          name="description"
          content="Discover a world of fun and challenge with our wide selection of mini-games. Play Who's That Pokemon, Memory, Tic Tac Toe, and more. Improve your cognitive skills and have fun at the same time. Play now!"
        />
        <meta
          name="keywords"
          content="mini games, who's that pokemon, memory, tic tac toe, cognitive skills, fun, challenge, play now"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <Text title="GameDev" as='h1' size='h1'/>
      </motion.div>
      <div className="flex flex-col items-center justify-center flex-1 w-full px-4 mt-10 text-center">
        <motion.div
          variants={FADE_UP_ANIMATION_VARIANTS}
        >
            <Text title="Insert Game" as='p' size='medium'/>
        </motion.div>
        <div className="flex flex-wrap items-center justify-center gap-5 mt-6 md:flex-nowrap">
          {Games.map((game, index) => {
            return (
              <Link
                href={game.url}
                key={index}
                className="p-3 text-gameboy-900 group"
              >
                <Text as='h3' className="mb-3" size="small" title={game.title}/>
                <motion.div whileHover={{ y: 10 }} whileTap={{ y: 10 }}>
                  <Image
                    src={game.logo}
                    alt={game.title}
                    width={193}
                    priority
                    className="shadow-xl hover:shadow-lg shadow-gameboy-400/30"
                  />
                </motion.div>
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
