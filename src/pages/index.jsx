import Head from 'next/head';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { Square } from '@/components/Square.jsx';
import {
  TURNS,
  FADE_DOWN_ANIMATION_VARIANTS,
  FADE_IN_ANIMATION_CARD
} from '@/lib/constants.js';
import { checkWinnerFrom, checkEndGame } from '@/logic/board.js';
import { WinnerModal } from '@/components/WinnerModal.jsx';
import { saveGameToStorage, resetGameStorage } from '@/logic/storage/index.js';
import { Button } from '@/components/Button';
function Home() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const boardFromStorage = window.localStorage.getItem('board');
      if (boardFromStorage) setBoard(JSON.parse(boardFromStorage));

      const turnFromStorage = window.localStorage.getItem('turn');
      if (turnFromStorage) setTurn(turnFromStorage);
    }
  }, []);

  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage();
  };

  const updateBoard = (index) => {
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
      turn: newTurn
    });
    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false); // empate
    }
  };

  return (
    <>
      <Head>
        <title>TicTacToe</title>
        <meta
          name="description"
          content="Play the classic game of Tic Tac Toe online with a modern twist! Our web game is built using Tailwind CSS and Next.js, providing a sleek and responsive design for hours of fun."
        />
        <meta
          name="keywords"
          content="tic tac toe, online game, tailwind css, next.js, web game"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.h1
        className="text-6xl text-zinc-900 dark:text-white text-center font-bold"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        TicTacToe
      </motion.h1>

      <motion.section
        className="flex justify-center my-10"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <Square
          isSelected={turn === TURNS.X}
          variants={FADE_DOWN_ANIMATION_VARIANTS}
          onClick="-"
        >
          {TURNS.X}
        </Square>
        <Square
          isSelected={turn === TURNS.O}
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          {TURNS.O}
        </Square>
      </motion.section>
      <motion.section
        className=" grid gap-4 grid-cols-3 max-w-fit mx-auto"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        {board.map((square, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              {square}
            </Square>
          );
        })}
      </motion.section>
      <motion.div className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-10">
        <Button onClick={resetGame} variants={FADE_DOWN_ANIMATION_VARIANTS}>
          Reset Game
        </Button>
      </motion.div>
      <motion.div {...FADE_IN_ANIMATION_CARD}>
        <WinnerModal resetGame={resetGame} winner={winner} />
      </motion.div>
    </>
  );
}

export default Home;
