"use client";

import confetti from "canvas-confetti";
import { useCallback, useEffect, useState } from "react";
import { Modal } from "@/components/Modal";
import { Retrobutton } from "@/components/RetroBtn";
import { Text } from "@/components/Text";
import { Square } from "@/games/tictactoe/components/Square";
import { TURNS } from "@/lib/constants";
import { checkEndGame, checkWinnerFrom } from "@/logic/board";

const STORAGE_KEY = "ticTacToeGameState";
const INITIAL_BOARD = Array(9).fill(null) as (string | null)[];

type GameState = {
  board: (string | null)[];
  turn: string;
};

function Tictactoe() {
  const [board, setBoard] = useState<(string | null)[]>(INITIAL_BOARD);
  const [turn, setTurn] = useState<string>(TURNS.X);
  const [winner, setWinner] = useState<string | null | false>(null);

  const saveGameToStorage = useCallback((gameState: GameState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch (error) {
      // Handle localStorage quota exceeded or disabled
      console.error("Failed to save game state:", error);
    }
  }, []);

  const loadGameFromStorage = useCallback((): GameState | null => {
    try {
      const gameStateString = localStorage.getItem(STORAGE_KEY);
      if (!gameStateString) return null;
      return JSON.parse(gameStateString) as GameState;
    } catch (error) {
      console.error("Failed to load game state:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    const savedGameState = loadGameFromStorage();
    if (savedGameState) {
      setBoard(savedGameState.board);
      setTurn(savedGameState.turn);
    }
  }, [loadGameFromStorage]);

  const resetGame = useCallback(() => {
    setBoard(INITIAL_BOARD);
    setTurn(TURNS.X);
    setWinner(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear game state:", error);
    }
  }, []);

  const updateBoard = useCallback(
    (index: number) => {
      if (board[index] || winner) return;

      const newBoard = [...board];
      newBoard[index] = turn;
      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;

      setBoard(newBoard);
      setTurn(newTurn);

      saveGameToStorage({
        board: newBoard,
        turn: newTurn,
      });

      const newWinner = checkWinnerFrom(newBoard);
      if (newWinner) {
        confetti({ colors: ["#8D9571", "#1F1F1F", "#4E533E"] });
        setWinner(newWinner);
      } else if (checkEndGame(newBoard)) {
        setWinner(false);
      }
    },
    [board, turn, winner, saveGameToStorage]
  );

  return (
    <>
      <Text as="h2" className="fade-down-ct" size="h2" title="TicTacToe" />
      <section className="my-10 flex justify-center gap-2">
        <div className="flex flex-col items-center gap-2">
          <span className="font-bold text-gameboy-900 text-sm">
            Current Turn
          </span>
          <div className="flex gap-1">
            <Square isInteractive={false} isSelected={turn === TURNS.X}>
              {TURNS.X}
            </Square>
            <Square isInteractive={false} isSelected={turn === TURNS.O}>
              {TURNS.O}
            </Square>
          </div>
        </div>
      </section>
      <div className="mx-auto my-10 flex justify-center">
        <div className="pixel-bg rounded-lg border-4 border-gameboy-900 bg-gameboy-200 p-3 shadow-[0_4px_8px_rgba(7,24,33,0.3)]">
          <div className="grid grid-cols-3 gap-1">
            {board.map((square, index) => {
              return (
                <Square index={index} key={index} updateBoard={updateBoard}>
                  {square}
                </Square>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-10 flex w-full flex-1 flex-col items-center justify-center px-4 text-center">
        <Retrobutton onClick={resetGame}>Reset Game</Retrobutton>
      </div>
      {winner !== null && (
        <Modal
          reset={resetGame}
          titleTop={winner === false ? "Tie" : "Winner!"}
        >
          {winner !== false && <Square>{winner}</Square>}
        </Modal>
      )}
    </>
  );
}

export default Tictactoe;
