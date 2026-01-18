import type { ReactNode } from "react";
import { memo, useCallback } from "react";

import { CircleIcon, CrossIcon } from "@/components/Icons";

type SquareProps = {
  children?: ReactNode;
  isSelected?: boolean;
  updateBoard?: (index: number) => void;
  index?: number;
  isInteractive?: boolean;
};

export const Square = memo(function Square({
  children,
  isSelected,
  updateBoard,
  index,
  isInteractive = true,
}: SquareProps) {
  const baseClasses =
    "w-20 h-20 grid place-items-center text-4xl bg-gameboy-100 relative";
  const borderClasses = isSelected
    ? "border-4 border-gameboy-900 shadow-[inset_2px_2px_0_var(--color-gameboy-400),inset_-2px_-2px_0_var(--color-gameboy-700),0_2px_4px_rgba(7,24,33,0.2)]"
    : "border-4 border-gameboy-900 shadow-[inset_2px_2px_0_var(--color-gameboy-200),inset_-2px_-2px_0_var(--color-gameboy-700)]";
  const hoverClasses = isInteractive
    ? "hover:bg-gameboy-200 hover:shadow-[inset_2px_2px_0_var(--color-gameboy-400),inset_-2px_-2px_0_var(--color-gameboy-700)] transition-all duration-75"
    : "";
  const className = `${baseClasses} ${borderClasses} ${hoverClasses}`;

  const handleClick = useCallback(() => {
    if (isInteractive && updateBoard && index !== undefined) {
      updateBoard(index);
    }
  }, [isInteractive, updateBoard, index]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (isInteractive && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        handleClick();
      }
    },
    [isInteractive, handleClick]
  );

  if (isInteractive) {
    return (
      <button
        aria-label={
          children
            ? `Square ${index}, contains ${children}`
            : `Empty square ${index}`
        }
        className={className}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        type="button"
      >
        {children === "X" ? (
          <CrossIcon aria-hidden="true" className="w-10" />
        ) : children === "O" ? (
          <CircleIcon aria-hidden="true" className="w-10" />
        ) : (
          children
        )}
      </button>
    );
  }

  return (
    <div aria-hidden="true" className={className}>
      {children === "X" ? (
        <CrossIcon className="w-10" />
      ) : children === "O" ? (
        <CircleIcon className="w-10" />
      ) : (
        children
      )}
    </div>
  );
});
