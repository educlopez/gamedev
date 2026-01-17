"use client";

import { useEffect, useState } from "react";
import DialogBox from "@/components/DialogBox";
import { Retrobutton } from "@/components/RetroBtn";
import { Text } from "@/components/Text";

import WordleGrid from "./components/WordleGrid";
import WordleKeyboard from "./components/WordleKeyboard";

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;
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
] as const;

export default function Wordle() {
  const [targetWord, setTargetWord] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing"
  );

  useEffect(() => {
    // Fetch a random 5-letter word from an API or use a predefined list
    fetchWordOfTheDay();
  }, []);

  const fetchWordOfTheDay = () => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    const wordIndex = dayOfYear % WORD_LIST.length;
    const wordOfTheDay = WORD_LIST[wordIndex];
    setTargetWord(wordOfTheDay);
    console.log("Debug - Word of the day:", wordOfTheDay); // Debug log
  };

  const handleKeyPress = (key: string) => {
    if (gameStatus !== "playing") return;

    if (key === "Backspace") {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (key === "Enter") {
      if (currentGuess.length === WORD_LENGTH) {
        const newGuesses = [...guesses, currentGuess];
        setGuesses(newGuesses);

        if (currentGuess.toLowerCase() === targetWord.toLowerCase()) {
          setGameStatus("won");
        } else if (newGuesses.length === MAX_GUESSES) {
          setGameStatus("lost");
        }

        setCurrentGuess("");
      }
    } else if (currentGuess.length < WORD_LENGTH && /^[A-Za-z]$/.test(key)) {
      setCurrentGuess(currentGuess + key.toLowerCase());
    }
  };

  const resetGame = () => {
    setGuesses([]);
    setCurrentGuess("");
    setGameStatus("playing");
    fetchWordOfTheDay();
  };

  return (
    <>
      <Text as="h2" className="fade-down-ct" size="h2" title="Wordle" />
      <section className="my-10 flex flex-col items-center justify-center gap-5">
        <WordleGrid
          currentGuess={currentGuess}
          guesses={guesses}
          targetWord={targetWord}
        />
        <WordleKeyboard
          guesses={guesses}
          onKeyPress={handleKeyPress}
          targetWord={targetWord}
        />
        {gameStatus !== "playing" && (
          <DialogBox className="w-auto text-center">
            <p className="text-gameboy-900">
              {gameStatus === "won"
                ? "Congratulations! You won!"
                : `Game Over. The word was ${targetWord}.`}
            </p>
            <Retrobutton className="mt-4" onClick={resetGame}>
              Play Again
            </Retrobutton>
          </DialogBox>
        )}
      </section>
    </>
  );
}
