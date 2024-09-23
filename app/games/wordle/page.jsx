"use client"

import { useEffect, useState } from "react"
import { checkGuess } from "@/utils/wordleUtils"

import DialogBox from "@/components/DialogBox"
import { Retrobutton } from "@/components/RetroBtn"
import { Text } from "@/components/Text"

import WordleGrid from "./components/WordleGrid"
import WordleKeyboard from "./components/WordleKeyboard"

const WORD_LENGTH = 5
const MAX_GUESSES = 6
const WORD_LIST = [
  "react",
  "redux",
  "state",
  "props",
  "hooks",
  "async",
  "fetch",
  "route",
  "debug",
  "build",
]

export default function Wordle() {
  const [targetWord, setTargetWord] = useState("")
  const [guesses, setGuesses] = useState([])
  const [currentGuess, setCurrentGuess] = useState("")
  const [gameStatus, setGameStatus] = useState("playing")

  useEffect(() => {
    // Fetch a random 5-letter word from an API or use a predefined list
    fetchWordOfTheDay()
  }, [])

  const fetchWordOfTheDay = () => {
    const today = new Date()
    const dayOfYear = Math.floor(
      (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
    )
    const wordIndex = dayOfYear % WORD_LIST.length
    const wordOfTheDay = WORD_LIST[wordIndex]
    setTargetWord(wordOfTheDay)
    console.log("Debug - Word of the day:", wordOfTheDay) // Debug log
  }

  const handleKeyPress = (key) => {
    if (gameStatus !== "playing") return

    if (key === "Backspace") {
      setCurrentGuess(currentGuess.slice(0, -1))
    } else if (key === "Enter") {
      if (currentGuess.length === WORD_LENGTH) {
        const newGuesses = [...guesses, currentGuess]
        setGuesses(newGuesses)

        if (currentGuess.toLowerCase() === targetWord.toLowerCase()) {
          setGameStatus("won")
        } else if (newGuesses.length === MAX_GUESSES) {
          setGameStatus("lost")
        }

        setCurrentGuess("")
      }
    } else if (currentGuess.length < WORD_LENGTH && /^[A-Za-z]$/.test(key)) {
      setCurrentGuess(currentGuess + key.toLowerCase())
    }
  }

  const resetGame = () => {
    setGuesses([])
    setCurrentGuess("")
    setGameStatus("playing")
    fetchWordOfTheDay()
  }

  return (
    <>
      <Text title="Wordle" as="h2" size="h2" className="fade-down-ct" />
      <section className="flex flex-col gap-5 justify-center items-center my-10">
        <WordleGrid
          guesses={guesses}
          currentGuess={currentGuess}
          targetWord={targetWord}
        />
        <WordleKeyboard
          onKeyPress={handleKeyPress}
          guesses={guesses}
          targetWord={targetWord}
        />
        {gameStatus !== "playing" && (
          <DialogBox className="w-auto text-center">
            <p className="text-gameboy-900">
              {gameStatus === "won"
                ? "Congratulations! You won!"
                : `Game Over. The word was ${targetWord}.`}
            </p>
            <Retrobutton onClick={resetGame} className="mt-4">
              Play Again
            </Retrobutton>
          </DialogBox>
        )}
      </section>
    </>
  )
}
