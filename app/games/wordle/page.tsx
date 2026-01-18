"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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

  const fetchWordOfTheDay = useCallback(() => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    const wordIndex = dayOfYear % WORD_LIST.length;
    const wordOfTheDay = WORD_LIST[wordIndex];
    setTargetWord(wordOfTheDay);
  }, []);

  useEffect(() => {
    fetchWordOfTheDay();
  }, [fetchWordOfTheDay]);

  const handleKeyPress = useCallback(
    (key: string) => {
      if (gameStatus !== "playing") return;

      if (key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (key === "Enter") {
        if (currentGuess.length === WORD_LENGTH) {
          const normalizedGuess = currentGuess.toLowerCase();
          const newGuesses = [...guesses, normalizedGuess];
          setGuesses(newGuesses);

          if (normalizedGuess === targetWord.toLowerCase()) {
            setGameStatus("won");
          } else if (newGuesses.length === MAX_GUESSES) {
            setGameStatus("lost");
          }

          setCurrentGuess("");
        }
      } else if (currentGuess.length < WORD_LENGTH && /^[A-Za-z]$/.test(key)) {
        setCurrentGuess((prev) => prev + key.toLowerCase());
      }
    },
    [gameStatus, currentGuess, guesses, targetWord]
  );

  const resetGame = useCallback(() => {
    setGuesses([]);
    setCurrentGuess("");
    setGameStatus("playing");
    fetchWordOfTheDay();
  }, [fetchWordOfTheDay]);

  const showGameOver = useMemo(() => gameStatus !== "playing", [gameStatus]);

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
        {showGameOver && (
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
