import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'

import { FADE_DOWN_ANIMATION_VARIANTS } from '@/lib/constants.js'
import { Button } from '@/components/Button'

export default function Whoisthatpokemon() {
  const [pokemon, setPokemon] = useState({})
  const [pokemonList, setPokemonList] = useState([])
  const [userGuess, setUserGuess] = useState('')
  const [guessMessage, setGuessMessage] = useState('')

  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
      const data = await res.json()
      const pokemonData = data.results
        .filter((p) => !pokemonList.includes(p.name.toLowerCase()))
        .map((p) => p.url)

      if (!pokemonData.length) {
        setGuessMessage('All pokemons have been guessed, congratulations!')
        return
      }

      const randomPokemon =
        pokemonData[Math.floor(Math.random() * pokemonData.length)]
      const pokemonRes = await fetch(randomPokemon)
      const pokemonInfo = await pokemonRes.json()
      setPokemon(pokemonInfo)
    }
    fetchPokemon()
  }, [pokemonList])

  const handleGuess = (e) => {
    setUserGuess(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (userGuess.toLowerCase() === pokemon.name.toLowerCase()) {
      setGuessMessage('Correct! You won!')
      confetti({
        particleCount: 200,
        spread: 80,
      })
      setPokemonList([...pokemonList, pokemon.name])
    } else {
      setGuessMessage('Incorrect. Try again.')
    }
    setUserGuess('')
  }
  const resetGame = () => {
    setPokemonList([])
    setGuessMessage('')
    setUserGuess('')
  }

  return (
    <>
      <Head>
        <title>Who is that Pokemon</title>
        <meta name="description" content="" />
        <meta
          name="keywords"
          content="Who's that pokemon, online game, tailwind css, next.js, web game"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.h1
        className="text-xl font-bold text-center md:text-6xl text-gameboy-900 dark:text-gameboy-400"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        Who&apos;s that pokemon
      </motion.h1>

      <motion.section
        className="flex flex-col justify-center my-10"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        {pokemon.name ? (
          <div className="flex flex-col items-center justify-center">
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/${pokemon.id}.png`}
              alt="pokemon sprite"
              width={96}
              height={96}
            />
            <p className="my-4 text-xs text-center text-gameboy-700 dark:text-gameboy-400">
              Remember, if a pokemon have spaces in her name use `-`
            </p>
            <div>
              {guessMessage ===
              'All pokemons have been guessed, congratulations!' ? (
                <div>
                  <p className="text-gameboy-700 dark:text-gameboy-400">
                    {guessMessage}
                  </p>
                  <div className="flex justify-center mt-6">
                    <Button onClick={resetGame}>Reset Game</Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Enter Pokemon name"
                    value={userGuess}
                    onChange={handleGuess}
                    className=" placeholder:text-gameboy-700 dark:placeholder:text-gameboy-400 h-8 w-full items-center gap-2 rounded-sm bg-gameboy-400 p-3 text-sm text-center text-gameboy-900 ring-1 ring-gameboy-700 transition hover:ring-gameboy-900 dark:bg-gameboy-700 dark:text-gameboy-100 dark:ring-inset dark:ring-gameboy-400 dark:hover:ring-gameboy-100 flex focus:[&:not(:focus-visible)]:outline-none"
                  />
                </form>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gameboy-700 dark:text-gameboy-400">Loading...</p>
        )}
        <div className="flex flex-row flex-wrap flex-auto mt-10">
          {pokemonList.map((pokemon) => {
            return (
              <div
                className="relative grow flex  flex-row justify-center items-center w-auto bg-gameboy-100/50 py-2 pl-2 pr-5 text-sm text-gameboy-700 ring-1 ring-gameboy-400 transition hover:ring-gameboy-700 dark:bg-gameboy-700/50 dark:text-gameboy-400 dark:ring-inset dark:ring-gameboy-400/50 dark:hover:ring-gameboy-100  focus:[&:not(:focus-visible)]:outline-none hover:z-10"
                key={pokemon}
              >
                <Image
                  src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${pokemon}.png`}
                  alt={pokemon}
                  width={48}
                  height={36}
                  className="relative left-0 bottom-2.5"
                />
                <p className="text-xs text-center capitalize">{pokemon}</p>
              </div>
            )
          })}
        </div>
      </motion.section>
    </>
  )
}
