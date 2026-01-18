import { memo, useMemo } from "react";
import { checkGuess } from "../../../utils/wordleUtils";

const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
] as const;

type WordleKeyboardProps = {
  onKeyPress: (key: string) => void;
  guesses: string[];
  targetWord: string;
};

function WordleKeyboard({
  onKeyPress,
  guesses,
  targetWord,
}: WordleKeyboardProps) {
  const getKeyStatus = (
    key: string
  ): "unused" | "correct" | "present" | "absent" => {
    let status: "unused" | "correct" | "present" | "absent" = "unused";
    for (const guess of guesses) {
      const statuses = checkGuess(guess, targetWord);
      const index = guess.toUpperCase().indexOf(key);
      if (index !== -1) {
        if (statuses[index] === "correct") return "correct";
        if (statuses[index] === "present") status = "present";
        if (statuses[index] === "absent" && status === "unused")
          status = "absent";
      }
    }
    return status;
  };

  return (
    <div
      aria-label="Wordle keyboard"
      className="flex flex-col items-center gap-1"
      role="group"
    >
      {KEYS.map((row, i) => (
        <div className="flex gap-1" key={i}>
          {row.map((key) => (
            <Key
              key={key}
              keyValue={key}
              onClick={() => onKeyPress(key)}
              status={getKeyStatus(key)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default memo(WordleKeyboard);

type KeyProps = {
  keyValue: string;
  onClick: () => void;
  status: "unused" | "correct" | "present" | "absent";
};

const Key = memo(function Key({ keyValue, onClick, status }: KeyProps) {
  const baseClasses =
    "px-3 py-2.5 min-w-[2.5rem] border-4 border-gameboy-900 font-bold cursor-pointer text-sm transition-all duration-75 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gameboy-400";
  const statusClasses = {
    unused:
      "bg-gameboy-400 text-gameboy-900 shadow-[inset_2px_2px_0_var(--color-gameboy-200),inset_-2px_-2px_0_var(--color-gameboy-700)] hover:bg-gameboy-200",
    correct:
      "bg-[#86c06c] text-gameboy-900 shadow-[inset_2px_2px_0_var(--color-gameboy-400),inset_-2px_-2px_0_var(--color-gameboy-700)]",
    present:
      "bg-[#dff7ce] text-gameboy-900 shadow-[inset_2px_2px_0_var(--color-gameboy-100),inset_-2px_-2px_0_var(--color-gameboy-700)]",
    absent:
      "bg-gameboy-200 text-gameboy-900 shadow-[inset_2px_2px_0_var(--color-gameboy-200),inset_-2px_-2px_0_var(--color-gameboy-700)]",
  };

  const displayValue = useMemo(
    () => (keyValue === "Backspace" ? "←" : keyValue),
    [keyValue]
  );

  return (
    <button
      aria-label={`${keyValue} key, ${status}`}
      className={`${baseClasses} ${statusClasses[status]}`}
      onClick={onClick}
      type="button"
    >
      {displayValue}
    </button>
  );
});
