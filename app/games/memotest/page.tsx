"use client";

import Image from "next/image";
import { memo, useMemo } from "react";
import DialogBox from "@/components/DialogBox";
import { Modal } from "@/components/Modal";
import { Retrobutton } from "@/components/RetroBtn";
import { Text } from "@/components/Text";
import { IMAGES } from "@/games/memotest/data";

import { useGameState } from "./components/useGameState";

type CardProps = {
  image: string;
  isSelected: boolean;
  isGuessed: boolean;
  onClick: () => void;
};

const Card = memo(function Card({
  image,
  isSelected,
  isGuessed,
  onClick,
}: CardProps) {
  const [, url] = image.split("|");
  const isRevealed = isSelected || isGuessed;

  return (
    <li>
      <button
        aria-label={isRevealed ? "Card revealed" : "Flip card"}
        aria-pressed={isRevealed}
        className="relative h-20 w-20 cursor-pointer select-none border-4 border-gameboy-900 bg-gameboy-100 p-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-gameboy-900 disabled:cursor-not-allowed"
        disabled={isRevealed}
        onClick={onClick}
        style={{
          boxShadow: isRevealed
            ? "inset 3px 3px 0 var(--color-gameboy-400), inset -3px -3px 0 var(--color-gameboy-700)"
            : "inset 3px 3px 0 var(--color-gameboy-200), inset -3px -3px 0 var(--color-gameboy-700), 0 2px 4px rgba(7,24,33,0.2)",
        }}
        type="button"
      >
        {isRevealed ? (
          <div className="relative h-full w-full overflow-hidden">
            <Image
              alt="Memory card character"
              className="object-contain"
              height={64}
              priority
              src={url}
              width={64}
            />
          </div>
        ) : (
          <div className="pixel-bg flex h-full w-full items-center justify-center">
            <svg
              aria-hidden="true"
              className="h-12 w-12 text-gameboy-900 opacity-60"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 2h8v2H6V2zM4 6V4h2v2H4zm0 8H2V6h2v8zm2 2H4v-2h2v2zm8 0v2H6v-2h8zm2-2h-2v2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2v-2zm0-8h2v8h-2V6zm0 0V4h-2v2h2z"
                fill="currentColor"
              />
            </svg>
          </div>
        )}
      </button>
    </li>
  );
});

export default function Memotest() {
  const {
    guessed,
    selected,
    isGameWon,
    time,
    play,
    handleCardSelect,
    handleReset,
  } = useGameState();

  const showStartScreen = useMemo(() => time !== 0 && !play, [time, play]);

  const cards = useMemo(
    () =>
      IMAGES.map((image) => (
        <Card
          image={image}
          isGuessed={guessed.includes(image)}
          isSelected={selected.includes(image)}
          key={image}
          onClick={() => handleCardSelect(image)}
        />
      )),
    [guessed, selected, handleCardSelect]
  );

  return (
    <>
      <Text as="h2" className="fade-down-ct" size="h2" title="MemoTest" />

      <section className="my-10 flex justify-center">
        {showStartScreen && (
          <div className="flex flex-col items-center gap-5">
            <DialogBox
              className="w-auto text-center"
              message="Browse through the retro characters and find each one's partner in a memorization game"
            />
            <Retrobutton className="flex w-auto" onClick={handleReset}>
              Play
            </Retrobutton>
          </div>
        )}
        {play && (
          <>
            {isGameWon ? (
              <div className="flex flex-col items-center justify-center">
                <DialogBox
                  as="p"
                  className="text-gameboy-900"
                  message="Congratulations! You won the game."
                />
                <Retrobutton className="mt-4" onClick={handleReset}>
                  Reset Game
                </Retrobutton>
              </div>
            ) : (
              <div className="rounded-lg border-4 border-gameboy-900 bg-gameboy-200 p-2 shadow-[0_4px_8px_rgba(7,24,33,0.3)]">
                <ul className="grid grid-cols-4 gap-2" role="grid">
                  {cards}
                </ul>
              </div>
            )}
          </>
        )}
      </section>

      <section className="flex justify-center">
        {play && (
          <DialogBox
            className="w-auto text-center text-gameboy-900"
            message={`Remaining time: ${time}`}
          />
        )}

        {time === 0 && (
          <Modal reset={handleReset} titleTop="Game Over">
            {null}
          </Modal>
        )}
      </section>
    </>
  );
}
