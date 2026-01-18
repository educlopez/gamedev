"use client";

import confetti from "canvas-confetti";
import { useCallback, useEffect, useMemo, useState } from "react";
import DialogBox from "@/components/DialogBox";
import { Retrobutton } from "@/components/RetroBtn";
import { Text } from "@/components/Text";
import { WORDS } from "@/games/wordsperminute/data";

function getRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

export default function WordPerMinute() {
  const [word, setWord] = useState(() => getRandomWord());
  const [characterCount, setCharacterCount] = useState(0);
  const [buffer, setBuffer] = useState("");
  const [time, setTime] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (buffer.toLowerCase() === word.toLowerCase()) {
        setWord(getRandomWord());
        setCharacterCount((prev) => prev + word.length);
      } else {
        setErrorCount((prev) => prev + 1);
      }

      setBuffer("");
    },
    [buffer, word]
  );

  const handleStart = useCallback(() => {
    setTime(60);
    setCharacterCount(0);
    setErrorCount(0);
    setBuffer("");
    setWord(getRandomWord());
  }, []);

  useEffect(() => {
    if (time > 0) {
      const timeout = setTimeout(() => setTime((prev) => prev - 1), 1000);
      return () => clearTimeout(timeout);
    }
    if (time === 0 && characterCount > 0) {
      confetti({
        particleCount: 100,
        spread: 360,
        colors: ["#8D9571", "#1F1F1F", "#4E533E"],
      });
    }
  }, [time, characterCount]);

  const isPlaying = useMemo(() => time > 0, [time]);

  return (
    <>
      <Text
        as="h2"
        className="fade-down-ct"
        size="h2"
        title="Words per minute"
      />

      <section className="my-10 flex flex-col items-center justify-center gap-5">
        {isPlaying && (
          <DialogBox className="w-auto text-center" clean message={word} />
        )}
        {isPlaying ? (
          <>
            <form
              className="flex flex-col items-center justify-center gap-2"
              onSubmit={handleSubmit}
            >
              <label className="sr-only" htmlFor="word-input">
                Type the word above
              </label>
              <input
                aria-label="Type the word shown above"
                autoFocus
                className="w-full min-w-[200px] border-4 border-gameboy-900 bg-gameboy-100 p-3 text-center font-bold text-gameboy-900 text-lg shadow-[inset_3px_3px_0_var(--color-gameboy-200),inset_-3px_-3px_0_var(--color-gameboy-700)] transition-all placeholder:text-gameboy-700 focus:outline-none focus:ring-4 focus:ring-gameboy-400 focus:ring-offset-2"
                id="word-input"
                onChange={(e) => setBuffer(e.target.value)}
                type="text"
                value={buffer}
              />
              <Retrobutton className="mt-4" type="submit">
                Send
              </Retrobutton>
            </form>
            <DialogBox className="w-auto text-center">
              <p className="text-center text-gameboy-900">
                Characters typed: {characterCount} | Error count: {errorCount}
              </p>
              <p className="text-gameboy-900">Remaining time: {time}</p>
            </DialogBox>
          </>
        ) : (
          <>
            <DialogBox
              className="w-auto text-center"
              message="Write as fast as you can"
            />
            <Retrobutton onClick={handleStart}>Play</Retrobutton>
          </>
        )}
      </section>
    </>
  );
}
