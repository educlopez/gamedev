import { memo } from "react";
import { checkGuess } from "../../../utils/wordleUtils";

type WordleGridProps = {
  guesses: string[];
  currentGuess: string;
  targetWord: string;
};

function WordleGrid({ guesses, currentGuess, targetWord }: WordleGridProps) {
  const emptyRows = Array(6 - guesses.length - 1).fill("");

  return (
    <div
      aria-label="Wordle grid"
      className="grid grid-cols-5 gap-2 rounded-lg border-4 border-gameboy-900 bg-gameboy-200 p-3 shadow-[0_4px_8px_rgba(7,24,33,0.3)]"
      role="grid"
    >
      {guesses.map((guess, i) => (
        <Row key={i} targetWord={targetWord} word={guess} />
      ))}
      {guesses.length < 6 && (
        <Row current targetWord={targetWord} word={currentGuess} />
      )}
      {emptyRows.map((_, i) => (
        <Row
          key={`empty-${i + guesses.length}`}
          targetWord={targetWord}
          word=""
        />
      ))}
    </div>
  );
}

export default memo(WordleGrid);

type RowProps = {
  word: string;
  targetWord: string;
  current?: boolean;
};

const Row = memo(function Row({ word, targetWord, current = false }: RowProps) {
  const tiles = word.padEnd(5, " ").split("");
  const statuses = checkGuess(word, targetWord);

  return (
    <div className="contents" role="row">
      {tiles.map((char, i) => (
        <Tile
          char={char}
          key={i}
          status={
            current
              ? "current"
              : (statuses[i] as "correct" | "present" | "absent" | "empty")
          }
        />
      ))}
    </div>
  );
});

type TileProps = {
  char: string;
  status: "correct" | "present" | "absent" | "empty" | "current";
};

const Tile = memo(function Tile({ char, status }: TileProps) {
  const baseClasses =
    "w-12 h-12 border-4 flex items-center justify-center text-2xl font-bold text-gameboy-900 relative";
  const statusClasses = {
    correct:
      "bg-[#86c06c] border-gameboy-700 shadow-[inset_2px_2px_0_var(--color-gameboy-400),inset_-2px_-2px_0_var(--color-gameboy-700)]",
    present:
      "bg-[#dff7ce] border-gameboy-700 shadow-[inset_2px_2px_0_var(--color-gameboy-100),inset_-2px_-2px_0_var(--color-gameboy-700)]",
    absent:
      "bg-gameboy-200 border-gameboy-700 shadow-[inset_2px_2px_0_var(--color-gameboy-200),inset_-2px_-2px_0_var(--color-gameboy-700)]",
    empty:
      "bg-gameboy-100 border-gameboy-400 shadow-[inset_2px_2px_0_var(--color-gameboy-200),inset_-2px_-2px_0_var(--color-gameboy-700)]",
    current:
      "bg-gameboy-100 border-gameboy-900 shadow-[inset_2px_2px_0_var(--color-gameboy-200),inset_-2px_-2px_0_var(--color-gameboy-700),0_0_0_2px_var(--color-gameboy-900)]",
  };

  return (
    <div
      aria-label={
        char !== " "
          ? `Letter ${char}, ${status === "current" ? "current guess" : status}`
          : "Empty tile"
      }
      className={`${baseClasses} ${statusClasses[status]}`}
      role="gridcell"
    >
      {char !== " " && char}
    </div>
  );
});
