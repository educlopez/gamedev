"use client";

import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import DialogBox from "@/components/DialogBox";
import { Modal } from "@/components/Modal";
import { Retrobutton } from "@/components/RetroBtn";
import { Text } from "@/components/Text";
import { Square } from "@/games/tictactoe/components/Square";
import { TURNS } from "@/lib/constants";
import { checkEndGame, checkWinnerFrom } from "@/logic/board";

function Tictactoe() {
  const initialBoard = Array(9).fill(null) as (string | null)[];
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<string>(TURNS.X);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const boardFromStorage = window.localStorage.getItem("board");
      if (boardFromStorage) setBoard(JSON.parse(boardFromStorage));

      const turnFromStorage = window.localStorage.getItem("turn");
      if (turnFromStorage) setTurn(turnFromStorage);
    }
  }, []);

  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState<string | null | false>(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("ticTacToeGameState");
    }
  };

  const updateBoard = (index: number) => {
    // no actualizamos esta posición
    // si ya tiene algo
    if (board[index] || winner) return;
    // actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // guardar aqui partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn,
    });
    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti({ colors: ["#8D9571", "#1F1F1F", "#4E533E"] });
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false); // empate
    }
  };

  function saveGameToStorage(gameState: {
    board: (string | null)[];
    turn: string;
  }) {
    // Convertir el estado del juego a un string
    const gameStateString = JSON.stringify(gameState);

    // Guardar el estado del juego en localStorage
    localStorage.setItem("ticTacToeGameState", gameStateString);
  }

  function loadGameFromStorage(): {
    board: (string | null)[];
    turn: string;
  } | null {
    // Obtener el estado del juego desde localStorage
    const gameStateString = localStorage.getItem("ticTacToeGameState");
    if (!gameStateString) return null;

    // Convertir el string de vuelta a un objeto
    const gameState = JSON.parse(gameStateString);

    return gameState;
  }

  function clearSavedGameState() {
    localStorage.removeItem("ticTacToeGameState");
  }

  useEffect(() => {
    const savedGameState = loadGameFromStorage();

    if (savedGameState) {
      setBoard(savedGameState.board);
      setTurn(savedGameState.turn);
    } else {
      setBoard(initialBoard);
      setTurn(TURNS.X);
    }
  }, []);

  return (
    <>
      <Text as="h2" className="fade-down-ct" size="h2" title="TicTacToe" />
      <section className="my-10 flex justify-center gap-1">
        <Square isInteractive={false} isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isInteractive={false} isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <DialogBox className="mx-auto grid max-w-fit grid-cols-3 gap-1">
        {board.map((square, index) => {
          return (
            <Square index={index} key={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </DialogBox>
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
