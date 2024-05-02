"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import confetti from "canvas-confetti"

import DialogBox from "@/components/DialogBox"
import { Retrobutton } from "@/components/RetroBtn"
import { Text } from "@/components/Text"

export default function Whoisthatpokemon() {
  const [pokemon, setPokemon] = useState({})
  const [pokemonList, setPokemonList] = useState([])
  const [userGuess, setUserGuess] = useState("")
  const [guessMessage, setGuessMessage] = useState("")
  const [correctGuesses, setCorrectGuesses] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pokemonNameLetters, setPokemonNameLetters] = useState([])

  const fetchPokemon = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`, {
        cache: "force-cache",
      })
      const data = await res.json()
      const pokemonData = data.results
        .filter((p) => !pokemonList.includes(p.name.toLowerCase()))
        .map((p) => p.url)

      if (!pokemonData.length) {
        setGuessMessage("All Pokémons have been guessed, congratulations!")
        return
      }

      const randomPokemon =
        pokemonData[Math.floor(Math.random() * pokemonData.length)]
      const pokemonRes = await fetch(randomPokemon)
      const pokemonInfo = await pokemonRes.json()
      setPokemonNameLetters(Array(pokemonInfo.name.length).fill(""))
      setPokemon(pokemonInfo)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [pokemonList])

  useEffect(() => {
    fetchPokemon()
  }, [fetchPokemon])

  // const handleGuess = (e) => {
  //   setUserGuess(e.target.value)
  // }
  // Pokemon letter

  const handleLetterChange = (e, index) => {
    const newLetters = [...pokemonNameLetters]
    newLetters[index] = e.target.value
    setPokemonNameLetters(newLetters)
    // if (e.target.nextSibling) {
    //   e.target.nextSibling.focus()
    // }
    const inputs = document.querySelectorAll("input")
    if (index < inputs.length - 1) {
      inputs[index + 1].focus()
    } else {
      const submitBtn = document.querySelector("button[type=submit]")
      submitBtn.focus()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const userGuess = pokemonNameLetters.join("")
    const inputs = document.querySelectorAll("input")
    if (userGuess.toLowerCase() === pokemon.name.toLowerCase()) {
      setGuessMessage("Correct! You won!")
      setPokemonList([...pokemonList, pokemon.name])
      setCorrectGuesses(correctGuesses + 1)
      inputs[0].focus()
      if (correctGuesses + 1 === 10) {
        setGuessMessage("You have guessed 10 correct Pokémon. Congratulations!")
        confetti({
          particleCount: 200,
          spread: 80,
          colors: ["#8D9571", "#1F1F1F", "#4E533E"],
        })
      }
    } else {
      setGuessMessage("Incorrect. Try again.")
      inputs[0].focus()
    }
    setPokemonNameLetters(Array(pokemon.name.length).fill(""))
  }
  const isAllowedKey = (key) => {
    const allowedKeys = ["Backspace", "Delete", "Tab", "Enter"]
    return /^[a-z-]{1}$/i.test(key) || allowedKeys.includes(key) || key.metaKey
  }

  const handleKeyDown = (e) => {
    if (!isAllowedKey(e.key)) {
      e.preventDefault()
    }

    if (["Backspace", "Delete"].includes(e.key)) {
      const inputs = document.querySelectorAll("input")
      const index = Array.from(inputs).indexOf(e.target)
      if (index > 0) {
        inputs[index - 1].value = ""
        inputs[index - 1].focus()
      }
    }
  }
  const handleFocus = (e) => {
    e.target.select()
  }
  const resetGame = () => {
    setPokemonList([])
    setGuessMessage("")
    setUserGuess("")
    setCorrectGuesses(0)
  }

  return (
    <>
      {/* <Head>
        <title>Who is that Pokemon</title>
        <meta name="description" content="" />
        <meta
          name="keywords"
          content="Who's that pokemon, online game, tailwind css, next.js, web game"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <Text
        title="Who's that pokemon"
        as="h2"
        size="h2"
        className="fade-down-ct"
      />
      <section className="flex flex-col justify-center my-10">
        <div className="flex flex-col items-center justify-center">
          {pokemon.name ? (
            <>
              {correctGuesses !== 10 ? (
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/${pokemon.id}.png`}
                  alt="pokemon sprite"
                  width={96}
                  height={96}
                  unoptimized
                />
              ) : (
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/25.png`}
                  alt="pokemon sprite"
                  width={96}
                  height={96}
                  unoptimized
                />
              )}
              <div>
                {guessMessage ===
                "All pokemons have been guessed, congratulations!" ? (
                  <div>
                    <p className="text-center text-gameboy-900">
                      {guessMessage}
                    </p>
                    <div className="flex justify-center mt-6">
                      <Retrobutton onClick={resetGame}>Reset Game</Retrobutton>
                    </div>
                  </div>
                ) : correctGuesses === 10 ? (
                  <div>
                    <p className="text-center text-gameboy-900">
                      {guessMessage}
                    </p>
                    <div className="flex justify-center mt-6">
                      <Retrobutton onClick={resetGame}>Reset Game</Retrobutton>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center gap-5"
                  >
                    <div className="flex flex-row gap-2">
                      {pokemonNameLetters.map((letter, index) => (
                        <input
                          key={index}
                          maxLength="1"
                          type="text"
                          placeholder="?"
                          value={letter}
                          onChange={(e) => handleLetterChange(e, index)}
                          onKeyDown={handleKeyDown}
                          onFocus={handleFocus}
                          className="w-8 h-8 p-1 text-sm text-center transition border-b-2 border-gameboy-900 bg-gameboy-100 text-gameboy-900 placeholder:text-gameboy-700 md:h-10 md:w-10 md:p-3"
                        />
                      ))}
                    </div>
                    {/* <p>{pokemon.name}</p> */}
                    <Retrobutton type="submit">Guess</Retrobutton>
                  </form>
                )}
              </div>
              <DialogBox className="w-auto text-center">
                <p className="my-4 text-xs text-center text-gameboy-900">
                  Remember, if a pokemon have spaces in her name use `-`
                </p>
                <p className="mb-4 text-center text-gameboy-900">
                  Correct Guesses: {correctGuesses} / 10
                </p>
                {correctGuesses > 0 && (
                  <div className="grid grid-flow-row grid-cols-5 gap-5 mt-10 justify-items-center">
                    {pokemonList.map((pokemon) => {
                      return (
                        <Image
                          src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${pokemon}.png`}
                          alt={pokemon}
                          key={pokemon}
                          width={48}
                          height={36}
                        />
                      )
                    })}
                  </div>
                )}
              </DialogBox>
            </>
          ) : (
            <DialogBox
              as="p"
              className="w-auto text-center text-gameboy-900"
              message="Loading..."
            />
          )}
        </div>
      </section>
    </>
  )
}
