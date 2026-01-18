import confetti from "canvas-confetti";
import { useCallback, useEffect, useRef, useState } from "react";
import { IMAGES } from "@/games/memotest/data";

function shuffle(array: string[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function useGameState() {
  const [guessed, setGuessed] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [play, setPlay] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [time, setTime] = useState(60);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (selected.length === 2) {
      const [firstImage, secondImage] = selected;
      const firstId = firstImage.split("|")[1];
      const secondId = secondImage.split("|")[1];

      if (firstId === secondId) {
        setGuessed((prev) => prev.concat(selected));
      }

      timeoutRef.current = setTimeout(() => {
        setSelected([]);
      }, 1000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [selected]);

  useEffect(() => {
    if (guessed.length === IMAGES.length) {
      setIsGameWon(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: {
          y: 0.6,
        },
        colors: ["#8D9571", "#1F1F1F", "#4E533E"],
      });
    }
  }, [guessed]);

  useEffect(() => {
    if (time > 0 && play && !isGameWon) {
      const timeout = setTimeout(() => setTime((prev) => prev - 1), 1000);
      return () => clearTimeout(timeout);
    }
  }, [time, isGameWon, play]);

  const handleReset = useCallback(() => {
    setGuessed([]);
    setSelected([]);
    setPlay(true);
    setIsGameWon(false);
    shuffle([...IMAGES]);
    setTime(60);
  }, []);

  const handleCardSelect = useCallback(
    (image: string) => {
      if (
        selected.length < 2 &&
        !selected.includes(image) &&
        !guessed.includes(image)
      ) {
        setSelected((prev) => prev.concat(image));
      }
    },
    [selected, guessed]
  );

  return {
    guessed,
    selected,
    isGameWon,
    time,
    play,
    handleCardSelect,
    handleReset,
  };
}
